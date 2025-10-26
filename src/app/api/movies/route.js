import {fetchTMDB, fetchOMDB} from "@/lib/apiHelpers"
export async function GET(){
    try{
        const movies = await fetchTMDB();
        const moviesWithRatings = await Promise.all(
            movies.map(async (movie)=>{
                const {imdb, rt} = await fetchOMDB(movie.title, movie.year);
                return {...movie, imdbRating: imdb, rtRating: rt};
            })
        ); 
        return new Response(JSON.stringify(moviesWithRatings, {status:200}))
    } catch(err){
        console.error(err);
        return new Response(JSON.stringify({error: "Failed to fetch movies"}, {status:500}))
    }
}
