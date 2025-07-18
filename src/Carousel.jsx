import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { images, uploadedImages } from "./images";

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const imageCount = uploadedImages.length;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % imageCount);
      }, 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [paused, imageCount]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % imageCount);
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="carousel-slider"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {uploadedImages.map((img, i) => (
          <div className="carousel-slide" key={i}>
            {/* <img src={img} alt={`Slide ${i}`} /> */}
            <img src={`/Images/${img}`} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>

      {/* Transparent Arrows */}
      <button className="carousel-arrow left" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel-arrow right" onClick={handleNext}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
