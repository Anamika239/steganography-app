# Secure Image Data Hiding with Steganography

A FastAPI-based application that allows users to hide secret messages inside images and extract them later using steganography techniques. Ideal for secure, private communication and cybersecurity education.
<img width="1454" alt="Screenshot 2025-06-17 at 8 12 48 PM" src="https://github.com/user-attachments/assets/94af56dc-a329-4eb3-9a1e-6b9e6f982238" />

---

## Features

- Hide secret messages in PNG images
- Extract hidden data from stego-images
- API-based interface (upload/download)
- Fast and lightweight using FastAPI and Pillow

  
---

## Tech Stack

- Python 3.9+
- FastAPI
- Pillow (for image handling)
- io & StreamingResponse (for efficient in-memory processing)

---

## Project Structure

<img width="256" alt="Screenshot 2025-06-17 at 8 03 28 PM" src="https://github.com/user-attachments/assets/b71d58e0-0357-41be-b9ed-c50c91f570e1" />


---
---
---


### API Endpoints
POST /uploadfile
Hide text inside an image.

Input: Image file (PNG) + Text data (Form)

Output: Downloadable stego image

POST /extractfile
Extract hidden text from a stego image.

- Input: Stego image file (PNG)
- Output: Extracted text (JSON)

<img width="524" alt="Screenshot 2025-06-17 at 8 13 21 PM" src="https://github.com/user-attachments/assets/a53e99f3-aa62-4527-9288-f745c0fabcf7" />

### Example Use Cases
- Secure personal messages
- Embedding watermarks or metadata
- Teaching cryptography or cybersecurity

<img width="1273" alt="Screenshot 2025-06-17 at 8 12 15 PM" src="https://github.com/user-attachments/assets/9780e09b-a4af-49e9-bfbf-763b26b2e411" />

<img width="1412" alt="Screenshot 2025-06-17 at 8 17 37 PM" src="https://github.com/user-attachments/assets/6ef912e2-cba3-483a-bc42-7f84634599eb" />


### Examples

<img width="1428" alt="Screenshot 2025-06-17 at 8 11 42 PM" src="https://github.com/user-attachments/assets/2101a5cc-55ef-4486-ac8c-b7684b51215c" />


### Author
Anamika Laxmi Prasad
CSE @ NIT Jaipur


---

Let me know if you want to add a sample command, screenshots, or hosting instructions.








