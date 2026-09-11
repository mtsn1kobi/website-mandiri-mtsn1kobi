import React, { useState, useEffect } from "react";

// 1. Define your slide data
const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
    title: "Explore the Mountains",
    subtitle: "Discover breathtaking trails and unforgettable views.",
    buttonText: "Start Journey",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    title: "Relax on the Beach",
    subtitle: "Crystal clear waters and white sandy shores await you.",
    buttonText: "Book Now",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=1920&q=80",
    title: "Wander the Cities",
    subtitle: "Experience the culture, architecture, and nightlife.",
    buttonText: "Discover More",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Changes slide every 5 seconds

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden group">
      {/* Slides Track: Flexbox holds slides side-by-side. 
          We use a tiny inline style for the dynamic translateX, 
          but ALL visual styling is pure Tailwind. */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg max-w-4xl">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md text-gray-200">
                {slide.subtitle}
              </p>
              <button className="mt-8 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-colors shadow-lg transform hover:scale-105">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white" // Active dot is wider
                : "w-2 bg-white/50 hover:bg-white/80" // Inactive dot is smaller
            }`}
          />
        ))}
      </div>
    </div>
  );
}
