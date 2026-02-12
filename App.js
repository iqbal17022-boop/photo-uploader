import React, { useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, { name: file.name, url: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div className="App"
         onDrop={handleDrop}
         onDragOver={(e) => e.preventDefault()}>
      <h1>My Photo Website</h1>

      <div className="upload-section">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
        />
        <p>Drag & Drop photos here or click to select</p>
      </div>

      <div className="gallery">
        {images.map((img, i) => (
          <div key={i} className="card">
            <img src={img.url} alt={img.name} />
            <a href={img.url} download={img.name}>
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
