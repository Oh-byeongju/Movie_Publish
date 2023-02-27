import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import {
  ALLMOVIE_REQUEST,
  ALLMOVIE_SUCCESS,
  ALLMOVIE_FAILURE,
  MOVIE_SEARCH_REQUEST,
  MOVIE_SEARCH_FAILURE,
  MOVIE_SEARCH_SUCCESS,
  DETAIL_MOVIE_REQUEST,
  DETAIL_MOVIE_SUCCESS,
  DETAIL_MOVIE_FAILURE,
  DETAIL_COMMENT_RECENT_REQUEST,
  DETAIL_COMMENT_RECENT_SUCCESS,
  DETAIL_COMMENT_RECENT_FAILURE,
  DETAIL_COMMENT_LIKE_REQUEST,
  DETAIL_COMMENT_LIKE_SUCCESS,
  DETAIL_COMMENT_LIKE_FAILURE
} from "../reducer/movie";
import { http } from "../lib/http";

// 전체 영화 불러오는 함수
function* AllMovieLoad(action) {
  const result = yield call(LoadAllMovie, action.data);
  const allmoviedata = result.data.map((mv) => ({
    id: mv.mid, //영화번호
    dir: mv.mdir, //감독
    date: mv.mdate, //개봉일
    time: mv.mtime, //러닝타임
    genre: mv.mgenre, //장르
    story: mv.mstory,
    title: mv.mtitle, //제목
    rating: mv.mrating, //연령
    imagepath: mv.mimagepath,
    likes: mv.mlikes,
    score: mv.mscore,
    like: mv.mlike
  }));
  //네트워크에서 200으로 받아서 수정했음
  if (result.status === 200) {
    yield put({
      type: ALLMOVIE_SUCCESS,
      data: allmoviedata,
    });
  } else {
    yield put({
      type: ALLMOVIE_FAILURE,
      data: result.status,
    });
  }
}

// 백엔드 호출
async function LoadAllMovie(data) {
  return await http.get("/movie/normal/allmovie", {
    params: {
      uid: data
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 사용자 영화 검색을 위한 함수
function* SearchMovieLoad(action) {
  const result = yield call(SearchMovie, action.data);
  if (result.status === 200) {
    const allmoviedata = result.data.map((mv) => ({
      id: mv.mid, //영화번호
      dir: mv.mdir, //감독
      date: mv.mdate, //개봉일
      time: mv.mtime, //러닝타임
      genre: mv.mgenre, //장르
      story: mv.mstory,
      title: mv.mtitle, //제목
      rating: mv.mrating, //연령
      imagepath: mv.mimagepath,
      likes: mv.mlikes,
      score: mv.mscore,
      like: mv.mlike
    }));
    //네트워크에서 200으로 받아서 수정했음
    yield put({
      type: MOVIE_SEARCH_SUCCESS,
      data: allmoviedata,
    });
  } else {
    yield put({
      type: MOVIE_SEARCH_FAILURE,
      data: result.status,
    });
  }
}

// 백엔드 호출
async function SearchMovie(data) {
  return await http
    .get(`/movie/normal/searchmovie`, {
      params: {
        title: data.title,
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 세부내용 검색을 위한 함수
function* DetailMovieLoad(action) {
  const result = yield call(DetailMovie, action.data);
  if (result.status === 200) {
    yield put({
      type: DETAIL_MOVIE_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: DETAIL_MOVIE_FAILURE,
      data: result.data,
    });
  }
}

// 백엔드 호출
async function DetailMovie(data) {
  return await http
    .get(`/movie/normal${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 관람평을 최신순으로 들고오는 함수
function* DetailCommentRecentLoad(action) {
  const result = yield call(CommentRecent, action.data);
  
  if (result.status === 200) {
    const allComment = result.data.map((cm) => ({
      umid: cm.umid,
      umscore: cm.umscore,
      umcomment: cm.umcomment,
      umcommenttime: cm.umcommenttime,
      uid: cm.uid,
      upcnt: cm.upcnt,
      like: cm.like
    }));
    yield put({
      type: DETAIL_COMMENT_RECENT_SUCCESS,
      data: allComment,
    });
  } 
  else {
    yield put({
      type: DETAIL_COMMENT_RECENT_FAILURE,
      data: result.data
    });
  }
}

// 관람평 최신순 백엔드 호출
async function CommentRecent(data) {
  return await http
    .get(`/movie/normal/recentcomment${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 영화 관람평을 공감순으로 들고오는 함수
function* DetailCommentLikeLoad(action) {
  const result = yield call(CommentLike, action.data);

  if (result.status === 200) {
    const allComment = result.data.map((cm) => ({
      umid: cm.umid,
      umscore: cm.umscore,
      umcomment: cm.umcomment,
      umcommenttime: cm.umcommenttime,
      uid: cm.uid,
      upcnt: cm.upcnt,
      like: cm.like
    }));
    yield put({
      type: DETAIL_COMMENT_LIKE_SUCCESS,
      data: allComment,
    });
  } 
  else {
    yield put({
      type: DETAIL_COMMENT_LIKE_FAILURE,
      data: result.data
    });
  }
}

// 관람평 공감순 백엔드 호출
async function CommentLike(data) {
  return await http
    .get(`/movie/normal/likecomment${data.pathname}`, {
      params: {
        uid: data.uid
      }
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* allMovie() {
  yield takeLatest(ALLMOVIE_REQUEST, AllMovieLoad);
}

function* selectedMovie() {
  yield takeLatest(MOVIE_SEARCH_REQUEST, SearchMovieLoad);
}

function* detailMovie() {
  yield takeLatest(DETAIL_MOVIE_REQUEST, DetailMovieLoad);
}

function* detailCommentRecent() {
  yield takeLatest(DETAIL_COMMENT_RECENT_REQUEST, DetailCommentRecentLoad);
}

function* detailCommentLike() {
  yield takeLatest(DETAIL_COMMENT_LIKE_REQUEST, DetailCommentLikeLoad);
}

export default function* movieSaga() {
  yield all([fork(allMovie), fork(selectedMovie), fork(detailMovie), fork(detailCommentRecent), fork(detailCommentLike)]);
}
