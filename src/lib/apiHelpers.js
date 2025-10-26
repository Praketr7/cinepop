export async function fetchTMDB(){
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`);
    if(!res.ok){
        throw new Error("Failed to fetch tmdb data");
    }
    const data = await res.json();

    return data.results.map(movie=>({
        id: movie.id,
        title: movie.title,
        year: movie.release_date.split('-')[0],
        poster: movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: null,
        rating: movie.vote_average/2,
    }))
}
export async function fetchOMDB(title, year){
    const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${process.env.OMDB_API_KEY}`)
    const data = await res.json();
    const imdb = data.imdbRating || "N/A";
    const rtObj = data.Ratings?.find((r) => r.Source === "Rotten Tomatoes");
    const rt = rtObj ? rtObj.Value : "N/A";
    return {imdb, rt};
}