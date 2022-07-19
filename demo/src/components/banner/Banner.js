import React from "react";
import useSWR from "swr";
import { apikey, fetcher } from "../../Config";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[600px] bg-white page-container rounded-lg overflow-hidden">
      <Swiper grabCursor="true">
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, poster_path, overview, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full relative select-none">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt="#"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-7 bottom-7 w-full text-white">
        <h2 className="font-bold text-5xl mb-7">{title}</h2>
        <div className="mb-7 w-[50%] ">{overview}</div>
        <button
          className=" border border-white rounded-md py-4 px-14 bg-primary mr-2 flex "
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default Banner;
