from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from PIL import Image
import io
import base64

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def str_to_bin(data: str) -> str:
    return ''.join(format(ord(c), '08b') for c in data)

def bin_to_str(bin_data: str) -> str:
    chars = [bin_data[i:i+8] for i in range(0, len(bin_data), 8)]
    return ''.join(chr(int(c, 2)) for c in chars)

def hide_data_in_image(image: Image.Image, data: str) -> Image.Image:
    binary_data = str_to_bin(data) + '1111111111111110'  # delimiter
    img = image.convert('RGB')
    pixels = img.load()
    width, height = img.size
    data_index = 0

    for y in range(height):
        for x in range(width):
            if data_index >= len(binary_data):
                return img
            r, g, b = pixels[x, y]
            r = (r & ~1) | int(binary_data[data_index])
            pixels[x, y] = (r, g, b)
            data_index += 1
    return img

def extract_data_from_image(image: Image.Image) -> str:
    img = image.convert('RGB')
    pixels = img.load()
    width, height = img.size
    binary_data = ""

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            binary_data += str(r & 1)
            if binary_data.endswith('1111111111111110'):
                return bin_to_str(binary_data[:-16])
    return bin_to_str(binary_data)

@app.post("/uploadfile")
async def upload_file(file: UploadFile = File(...), data: str = Form(...)):
    if not data:
        return JSONResponse(status_code=400, content={"error": "No data provided to hide."})
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        new_image = hide_data_in_image(image, data)

        buf = io.BytesIO()
        new_image.save(buf, format="PNG")
        buf.seek(0)

       
        return StreamingResponse(buf, media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=stego_image.png"})
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

@app.post("/extractfile")
async def extract_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        hidden_data = extract_data_from_image(image)
        return {"hidden_data": hidden_data}
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

@app.get("/")
def read_root():
    return {"message": "Welcome to Steganography API backend"}
