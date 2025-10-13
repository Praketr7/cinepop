import Navigation from '@/components/Navigation'
import MovieSlider from '@/components/MovieSlider'
import Chatbot from '@/components/Chatbot'
import MovieCard from '@/components/MovieCard'
export default function HomePage(){
  return(
    <>
    <div className='min-h-screen'>
      <Navigation/>
      {/* <main max-w-8xl mx-auto>
        <section>
          <MovieSlider/>
        </section>
        <section>
          <MovieSlider/>
        </section>
        <section>
          <MovieSlider/>
        </section>
      </main>
      <Chatbot/> */}
    </div>
    </>

  )
}
