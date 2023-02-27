/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserJoin from "./pages/UserJoin";
import Reserve from "./pages/Reserve";
import Movie from "./pages/Movie";
import MovieDetail from "./pages/MovieDetail";
import StoryChange from "./pages/StoryChange";

// TopButton과 Footer가 있어야 하는 페이지이면 Layout 사이에 넣고 아니면 따로 빼기
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/UserLogin" element={<UserLogin />}></Route>
        <Route path="/UserJoin" element={<UserJoin />}></Route>
        <Route path="/Reserve" exact element={<Reserve />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/moviedetail/:id" element={<MovieDetail />}></Route>
        <Route path="/StoryChange" element={<StoryChange />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
// <Route path="/Notice/free/:id" element={<NoticeFreeLook/>}></Route> 추후 쿼리 스트링 사용시 쓰기(양식)
