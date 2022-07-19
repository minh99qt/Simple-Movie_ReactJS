import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import { apikey, fetcher } from "../Config";
import useDebounce from "../hooks/useDebounce";

const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const page = 6;
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`
  );
  const searchDebounce = useDebounce(search, 500);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const { data } = useSWR(url, fetcher);
  const loading = !data;
  useEffect(() => {
    if (searchDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&page=${nextPage}`
      );
    }
  }, [searchDebounce, nextPage]);

  const movies = data?.results || [];
  return (
    <div className="py-10 page-container select-none">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-700 text-white outline-none "
            placeholder="Type here to seach . . ."
            onChange={handleSearch}
          />
        </div>
        <button className="p-4 bg-primary text-white ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent mx-auto mb-4 animate-spin border-primary"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="flex justify-center items-center mt-10 text-white gap-x-5">
        <span
          className="cursor-pointer"
          onClick={() => setNextPage(nextPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        {new Array(page).fill(0).map((item, index) => (
          <span
            className="cursor-pointer inline-block p-3 bg-primary leading-none py-2 px-3 rounded-sm"
            onClick={() => setNextPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}

        <span
          className="cursor-pointer "
          onClick={() => setNextPage(nextPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
