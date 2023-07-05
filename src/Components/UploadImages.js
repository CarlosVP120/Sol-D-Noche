import React from "react";
import { useToast, Box, keyframes } from "@chakra-ui/react";
import "./UploadImages.css";
import { useState } from "react";
import { useRef } from "react";

const UploadImages = ({ modalOpen, setModalOpen, product, setProduct }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        files[i]["url"] = URL.createObjectURL(files[i]);
        setImages((prev) => [...prev, files[i]]);
      }
    }
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((e, i) => i !== index));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        files[i]["url"] = URL.createObjectURL(files[i]);
        setImages((prev) => [...prev, files[i]]);
      }
    }
  };

  // Function to uplaod all images to Amazon S3
  const uploadToAmazonS3 = async (images) => {
    const urls = [];

    for (let i = 0; i < images.length; i++) {
      // Get Secure URL from Amazon S3
      // Delete the URL field of each image
      delete images[i].url;

      let { url } = await fetch("http://localhost:8080/s3Url").then((res) =>
        res.json()
      );

      // Post the image to Amazon S3
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: images[i],
      });

      const imageUrl = url.split("?")[0];
      urls.push(imageUrl);
    }

    // Update the product with the image urls
    console.log(urls);
    setProduct({ ...product, images: urls });
  };

  const uploadImages = () => {
    // handleImageDrop(images);
    console.log(images);
    uploadToAmazonS3(images);
    toast({
      title: "Imágenes Agregadas",
      status: "success",
      isClosable: true,
      position: "top-center",
    });
    setModalOpen(!modalOpen);
  };

  const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

  const appearAnimation = `${appear} 0.3s ease-in-out`;

  return (
    <Box animation={appearAnimation} zIndex={1000} pos="fixed" top="0" left="0">
      <div className="ModalBody">
        <div className="card">
          <div className="close-div" onClick={() => setModalOpen(!modalOpen)}>
            <svg
              width="35"
              height="35"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="close-button"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="top">
            <p>Drag & Drop your images here</p>
          </div>
          <div
            className="drag-area"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {isDragging ? (
              <span className="select">Drop the images here</span>
            ) : (
              <>
                Drag & Drop the images here or
                <span className="select" role="button" onClick={selectFiles}>
                  Select Images
                </span>
              </>
            )}

            <input
              name="file"
              type="file"
              multiple
              ref={fileInputRef}
              onChange={onFileSelect}
            ></input>
          </div>

          <div className="container">
            {images.map((images, index) => (
              <div className="image" key={index}>
                <span className="delete" onClick={() => deleteImage(index)}>
                  &times;
                </span>
                <img src={images.url} alt={images.name} />
              </div>
            ))}
          </div>

          <button type="button" className="upload" onClick={uploadImages}>
            Upload
          </button>
        </div>
      </div>
    </Box>
  );
};

export default UploadImages;
