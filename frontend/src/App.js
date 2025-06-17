import React, { useState } from "react";

function App() {
  const [hideFile, setHideFile] = useState(null);
  const [hideText, setHideText] = useState("");
  const [hiddenImageURL, setHiddenImageURL] = useState(null);

  const [extractFile, setExtractFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  // Hide data handler
  const handleHideSubmit = async (e) => {
    e.preventDefault();
    if (!hideFile || !hideText) {
      alert("Select image and enter text to hide");
      return;
    }

    const formData = new FormData();
    formData.append("file", hideFile);
    formData.append("data", hideText);

    try {
      const res = await fetch("http://localhost:8000/uploadfile", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to hide data");
      }
      const blob = await res.blob();
      setHiddenImageURL(URL.createObjectURL(blob));
    } catch (err) {
      alert(err.message);
    }
  };

  // Extract data handler
  const handleExtractSubmit = async (e) => {
    e.preventDefault();
    if (!extractFile) {
      alert("Select stego image to extract");
      return;
    }

    const formData = new FormData();
    formData.append("file", extractFile);

    try {
      const res = await fetch("http://localhost:8000/extractfile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setExtractedText(data.hidden_data);
      } else {
        throw new Error(data.error || "Failed to extract data");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Hide Data in Image</h2>
      <form onSubmit={handleHideSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setHideFile(e.target.files[0])}
          required
        />
        <br />
        <textarea
          placeholder="Enter message to hide"
          value={hideText}
          onChange={(e) => setHideText(e.target.value)}
          rows={4}
          cols={40}
          required
        />
        <br />
        <button type="submit">Upload & Hide</button>
      </form>

      {hiddenImageURL && (
        <div>
          <h3>Image with Hidden Data</h3>
          <img
            src={hiddenImageURL}
            alt="Stego"
            style={{ maxWidth: "300px", marginTop: 10 }}
          />
          <a href={hiddenImageURL} download="stego_image.png">
            Download Image
          </a>
        </div>
      )}

      <hr />

      <h2>Extract Data from Image</h2>
      <form onSubmit={handleExtractSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setExtractFile(e.target.files[0])}
          required
        />
        <br />
        <button type="submit">Upload & Extract</button>
      </form>

      {extractedText && (
        <div>
          <h3>Extracted Message:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
