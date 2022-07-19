import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, apikey } from "../Config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movies/MovieCard";
const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`,
    fetcher
  );

  if (!data) return null;
  console.log("data", data);
  return (
    <div className="w-full h-screen relative mb-10 select-none">
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div
        className=" w-full h-screen bg-cover bg-no-repeat "
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
        }}
      ></div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-center text-3xl font-bold text-white">
        {data.title}
      </h1>
      {data.genres.length > 0 && (
        <div className="flex items-center gap-x-5 justify-center mt-10">
          {data.genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p
        className="text-center leading-relaxed max-w-[800px] mx-auto text-white
      mt-10"
      >
        {data.overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  console.log(movieId);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (cast && cast.length < 0) return null;
  return (
    <>
      <h2 className="text-center text-4xl mt-10 text-white font-medium">
        CAST
      </h2>
      <div className="grid grid-cols-8 gap-5 ">
        {cast.slice(0, 8).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-[150px] h-[150px] object-cover rounded-lg mt-10"
            />
            <div className="text-white text-center py-2">{item.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideos() {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apikey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="">
      <h2 className="text-center text-4xl text-white py-10 font-medium">
        Trailer
      </h2>
      <div className="grid grid-cols-2 gap-20">
        {results.slice(0, 2).map((item) => (
          <div key={item.id} className="w-full aspect-video">
            <iframe
              width="700"
              height="350"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="Love"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullcreen
            ></iframe>
            <div
              key={item.id}
              className=" mt-5  text-2xl  mx-auto text-primary py-2 text-center"
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  //
}
function MovieSimilar() {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apikey}`,
    fetcher
  );

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10 ">
      <h2 className="text-4xl font-medium mb-10 text-white text-center">
        Similar movies
      </h2>
      <div className="movies-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
