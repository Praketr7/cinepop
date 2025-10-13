"use client"
import {useState} from 'react';

export default function MovieCard({movie, size="normal"}){
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);

    const cardSize = size === "large"? "w-80 h-[450px]": "w-48 h-72";   
    const imgSize = size === "large"? "h-[320px]":"h-48";

    return(
        <div className={`${cardSize} group relative cursor-pointer transition-all hover:scale-105`}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
>
            <div className="relative overflow-hidden rounded-lg bg-card">
                <img src={movie.poster}
                alt={movie.title} 
                className={`${imgSize} w-full object-cover transition-all duration-300 ${isHovered? "scale-110":""}`}/>
                {isHovered && (
                <div className='absolute inset-0 bg-black/70'>
                            
                </div>
            )}
            </div>
        </div>
    )
}