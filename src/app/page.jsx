"use client";

import Navigation from '@/components/Navigation'
import MovieSlider from '@/components/MovieSlider'
import Chatbot from '@/components/Chatbot'
import MovieCard from '@/components/MovieCard'
import {useState, useEffect} from 'react'

const favoritesMovies = [
  {
    title: "Pulp Fiction",
    year: "1994",
    genre: "Crime",
    poster: "/pulp-fiction-poster.png",
    imdbRating: "8.9",
    rtRating: "92",
    rating: 5,
  },
  {
    title: "The Godfather",
    year: "1972",
    genre: "Crime",
    poster: "/the-godfather-poster.png",
    imdbRating: "9.2",
    rtRating: "97",
    rating: 5,
  },
  {
    title: "Dune: Part Two",
    year: "2024",
    genre: "Sci-Fi",
    poster: "/dune-part-two-poster.png",
    imdbRating: "8.8",
    rtRating: "93",
    rating: 5,
  },
  {
    title: "Oppenheimer",
    year: "2023",
    genre: "Biography",
    poster: "/oppenheimer-inspired-poster.png",
    imdbRating: "8.4",
    rtRating: "93",
    rating: 5,
  },
]


export default function HomePage() {

const [trendingMovies, setTrendingMovies] = useState([])

useEffect(()=>{
  async function fetchTrendingMovies(){
    try{
      const res = await fetch("/api/movies");
      if(!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      setTrendingMovies(data);
    } catch(err){
      console.error();
    }
  }
  fetchTrendingMovies();
}, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-[100rem] mx-auto sm:px-6 lg:px-8 py-8 space-y-12">
        <section>
          <MovieSlider title="Trending Now" movies={trendingMovies} size="large" viewAllLink="/trending" />
        </section>

        {/* <section>
          <MovieSlider title="Recommended for You" movies={recommendedMovies} viewAllLink="/recommended" />
        </section> */}

        <section>
          <MovieSlider title="Favorites Worth Rewatching" movies={favoritesMovies} viewAllLink="/favorites" />
        </section>

        {/* <section>
          <MovieSlider title="Your Watchlist" movies={watchlistMovies} viewAllLink="/watchlist" />
        </section> */}
      </main>

      <Chatbot />
    </div>
  )
}