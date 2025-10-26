"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "./MovieCard"

export default function MovieSlider({ title, movies, size = "normal", viewAllLink }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const sliderRef = useRef(null)

  const scroll = (direction) => {
    const slider = sliderRef.current
    if (!slider) return

    const scrollAmount = size === "large" ? 400 : 250
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(slider.scrollWidth - slider.clientWidth, scrollPosition + scrollAmount)

    slider.scrollTo({ left: newPosition, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = sliderRef.current
    ? scrollPosition < sliderRef.current.scrollWidth - sliderRef.current.clientWidth
    : true

  return (
    <div className="relative group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-bold text-foreground ${size === "large" ? "text-3xl" : "text-xl"}`}>{title}</h2>
        {viewAllLink && (
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}

        {/* Movies Slider */}
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <div key={index} className="flex-shrink-0">
              <MovieCard movie={movie} size={size} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
