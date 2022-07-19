import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../Config";
//https://api.themoviedb.org/3/movie/now_playing?api_key=16ff9cfaf11adf30614d221249ff5856
const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=16ff9cfaf11adf30614d221249ff5856`,
    fetcher
  );
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <div className="movies-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
