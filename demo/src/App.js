import { Fragment } from "react";
// import Banner from "./components/banner/Banner";
// import Header from "./components/layout/Header";
// import HomePage from "./page/HomePage";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./page/HomePage";
import MovieDetailPage from "./page/MovieDetailPage";
import MoviePage from "./page/MoviePage";
function App() {
  return (
    <Fragment className="App">
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movie/:movieId"
            element={<MovieDetailPage></MovieDetailPage>}
          ></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
