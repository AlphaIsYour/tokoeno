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

interface Event {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
}

// Skeleton Loading
const SkeletonSlider = () => {
  return (
    <div className="slider-container relative w-full sm:w-335 mx-auto h-48 sm:h-80 bg-gray-200 animate-shimmer rounded-xl overflow-hidden">
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
    </div>
  );
};

const Slider = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Gagal ambil events");
        const data = await res.json();
        console.log("[SLIDER_EVENTS]", data);
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const images = events.map((event) => event.imageUrl);
  const extendedImages = events.length
    ? [images[images.length - 1], ...images, images[0]]
    : [];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && !loading) nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovering, loading]);

  useEffect(() => {
    if (events.length && currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 800);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, events.length, extendedImages.length]);

  // Reset batas kiri
  useEffect(() => {
    if (events.length && currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length);
      }, 800);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, events.length, images.length]);

  // Skeleton kalau loading atau kosong
  if (loading || !events.length) {
    return <SkeletonSlider />;
  }

  return (
    <div
      className="slider-container relative w-full sm:w-335 mx-auto h-48 sm:h-80 bg-white rounded-xl flex items-center justify-center overflow-hidden"
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
            className="w-full h-48 sm:h-80 object-cover flex-shrink-0"
            alt={`Slide ${index}`}
          />
        ))}
      </motion.div>

      {/* Tombol Navigasi */}
      <button
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md transition-all duration-300 ${
          isHovering ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-10"
        } hover:bg-gray-200`}
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </button>

      <button
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md transition-all duration-300 ${
          isHovering ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        } hover:bg-gray-200`}
        onClick={nextSlide}
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </button>

      {/* Indikator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
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
