// "use client"
// import {useState} from 'react';

// export default function MovieCard({movie, size="normal"}){
//     const [isHovered, setIsHovered] = useState(false);
//     const [isLiked, setIsLiked] = useState(false);
//     const [isWatched, setIsWatched] = useState(false);
//     const [isWatchlisted, setIsWatchlisted] = useState(false);

//     const cardSize = size === "large"? "w-80 h-[450px]": "w-48 h-72";   
//     const imgSize = size === "large"? "h-[320px]":"h-48";

//     return(
//         <div className={`${cardSize} group relative cursor-pointer transition-all hover:scale-105`}
//             onMouseEnter={()=>setIsHovered(true)}
//             onMouseLeave={()=>setIsHovered(false)}
// >
//             <div className="relative overflow-hidden rounded-lg bg-card">
//                 <img src={movie.poster}
//                 alt={movie.title} 
//                 className={`${imgSize} w-full object-cover transition-all duration-300 ${isHovered? "scale-110":""}`}/>
//                 {isHovered && (
//                 <div className='absolute inset-0 bg-black/70'>
                            
//                 </div>
//             )}
//             </div>
//         </div>
//     )
// }

"use client"

import { useState } from "react"
import { Heart, Eye, Bookmark, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MovieCard({ movie, size = "normal" }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isWatched, setIsWatched] = useState(false)
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  const cardSize = size === "large" ? "w-80 h-[450px]" : "w-48 h-72"
  const imageSize = size === "large" ? "h-[320px]" : "h-48"

  const actualRating = movie.imdbRating ? (movie.imdbRating / 10) * 5 : 0

  const renderStars = (rating, size = "w-4 h-4") => {
    return [1, 2, 3, 4, 5].map((star) => {
      const fillPercentage = Math.max(0, Math.min(1, rating - (star - 1)))
      const isHalf = fillPercentage > 0 && fillPercentage < 1
      const isFull = fillPercentage === 1

      return (
        <div key={star} className="relative inline-block">
          <Star className={`${size} text-muted-foreground`} />
          {(isFull || isHalf) && (
            <div className="absolute inset-0 overflow-hidden" style={{ width: isHalf ? "50%" : "100%" }}>
              <Star className={`${size} fill-primary text-primary`} />
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div
      className={`${cardSize} relative group cursor-pointer transition-all duration-300 hover:scale-105`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-card">
        <img
          src={movie.poster || `/placeholder.svg?height=400&width=300&query=${movie.title} movie poster`}
          alt={movie.title}
          className={`${imageSize} w-full object-cover transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
        />

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-4 transition-all duration-300">
            {/* Top Actions */}
            <div className="flex justify-between items-start">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={isLiked ? "default" : "secondary"}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLiked(!isLiked)
                  }}
                  className="w-8 h-8 p-0"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button
                  size="sm"
                  variant={isWatched ? "default" : "secondary"}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsWatched(!isWatched)
                  }}
                  className="w-8 h-8 p-0"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={isWatchlisted ? "default" : "secondary"}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsWatchlisted(!isWatchlisted)
                  }}
                  className="w-8 h-8 p-0"
                >
                  <Bookmark className={`w-4 h-4 ${isWatchlisted ? "fill-current" : ""}`} />
                </Button>
              </div>

              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle discuss action
                }}
                className="w-8 h-8 p-0"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>

            {/* Bottom Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {movie.imdbRating && (
                  <Badge variant="secondary" className="text-xs">
                    IMDb {movie.imdbRating}
                  </Badge>
                )}
                {movie.rtRating && (
                  <Badge variant="secondary" className="text-xs">
                    🍅 {movie.rtRating}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-1">{renderStars(actualRating)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">{movie.title}</h3>
        <p className="text-muted-foreground text-xs">{movie.year}</p>
        {movie.genre && <p className="text-muted-foreground text-xs">{movie.genre}</p>}
      </div>
    </div>
  )
}
