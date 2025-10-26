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
    title: "Goodfellas",
    year: "1990",
    genre: "Crime",
    poster: "/placeholder-oubu4.png",
    imdbRating: "8.7",
    rtRating: "96",
    rating: 5,
  },
  {
    title: "Casino",
    year: "1995",
    genre: "Crime",
    poster: "/placeholder-725iz.png",
    imdbRating: "8.2",
    rtRating: "80",
    rating: 4,
  },
]

const watchlistMovies = [
  {
    title: "Killers of the Flower Moon",
    year: "2023",
    genre: "Crime",
    poster: "/killers-of-the-flower-moon-poster.png",
    imdbRating: "7.6",
    rtRating: "93",
    rating: 0,
  },
  {
    title: "The Zone of Interest",
    year: "2023",
    genre: "Drama",
    poster: "/zone-of-interest-poster.png",
    imdbRating: "7.4",
    rtRating: "92",
    rating: 0,
  },
  {
    title: "Poor Things",
    year: "2023",
    genre: "Comedy",
    poster: "/poor-things-poster.png",
    imdbRating: "7.9",
    rtRating: "92",
    rating: 0,
  },
  {
    title: "American Fiction",
    year: "2023",
    genre: "Comedy",
    poster: "/placeholder-p7iap.png",
    imdbRating: "7.5",
    rtRating: "92",
    rating: 0,
  },
]


const recommendedMovies = [
  {
    title: "Killers of the Flower Moon",
    year: "2023",
    genre: "Crime",
    poster: "/killers-of-the-flower-moon-poster.png",
    imdbRating: "7.6",
    rtRating: "93",
    rating: 0,
  },
  {
    title: "The Zone of Interest",
    year: "2023",
    genre: "Drama",
    poster: "/zone-of-interest-poster.png",
    imdbRating: "7.4",
    rtRating: "92",
    rating: 0,
  },
  {
    title: "Poor Things",
    year: "2023",
    genre: "Comedy",
    poster: "/poor-things-poster.png",
    imdbRating: "7.9",
    rtRating: "92",
    rating: 0,
  },
  {
    title: "American Fiction",
    year: "2023",
    genre: "Comedy",
    poster: "/placeholder-p7iap.png",
    imdbRating: "7.5",
    rtRating: "92",
    rating: 0,
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

        <section>
          <MovieSlider title="Recommended for You" movies={recommendedMovies} viewAllLink="/recommended" />
        </section>

        <section>
          <MovieSlider title="Favorites Worth Rewatching" movies={favoritesMovies} viewAllLink="/favorites" />
        </section>

        <section>
          <MovieSlider title="Your Watchlist" movies={watchlistMovies} viewAllLink="/watchlist" />
        </section>
      </main>

      <Chatbot />
    </div>
  )
}