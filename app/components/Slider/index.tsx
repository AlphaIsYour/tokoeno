"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import "./style.css";

const images = ["/img/r1.jpg", "/img/r5.jpg", "/img/r3.jpg", "/img/r4.jpg"];

// Duplikasi gambar pertama di akhir & gambar terakhir di awal
const extendedImages = [images[images.length - 1], ...images, images[0]];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Mulai dari index ke-1 (bukan 0)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Auto-slide setiap 5 detik (5000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovering]);

  // Reset posisi saat mencapai batas kanan
  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 800); // Delay reset agar smooth
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex]);

  // Reset posisi saat mencapai batas kiri
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length);
      }, 800);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex]);

  return (
    <div
      className="slider-container relative w-335 mx-auto h-80 bg-white rounded-xl flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Container Slide */}
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `${-100 * currentIndex}%` }}
        transition={
          isTransitioning
            ? { duration: 0.8, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        {extendedImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={800}
            height={400}
            className="w-full h-80 object-cover flex-shrink-0"
            alt={`Slide ${index}`}
          />
        ))}
      </motion.div>

      {/* Tombol Navigasi */}
      <button
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md transition-all duration-300 ${
          isHovering ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-10"
        } hover:bg-gray-200`}
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </button>

      <button
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md transition-all duration-300 ${
          isHovering ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        } hover:bg-gray-200`}
        onClick={nextSlide}
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </button>

      {/* Indikator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === (currentIndex - 1) % images.length
                ? "bg-white scale-125"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
