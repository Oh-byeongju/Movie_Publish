import {
  SELECT_THEATER_REQUEST,
  SELECT_DAY_REQUEST,
  SELECT_MOVIETHEATER_TO_DAY_REQUEST,
  SELECT_THEATER_TO_MOVIE_REQUEST,
  SELECT_DAYMOVIE_TO_THEATER_REQUEST,
  SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
  MOVIE_DATA,
  THEATER_DATA,
  DAY_DATA,
  SCHEDULE_DATA,
} from "../../reducer/ticket";
export function f1(data, dispatch) {
  dispatch({
    type: SELECT_THEATER_REQUEST,
    data: data.movie.id, //mid
  });
  dispatch({
    type: SELECT_DAY_REQUEST,
    data: data.movie.id, //,mid
  });
  dispatch({
    type: SELECT_MOVIETHEATER_TO_DAY_REQUEST,
    data: {
      mid: data.movie.id,
      tid: data.theater.tid,
    },
  });
  dispatch({
    type: SELECT_THEATER_TO_MOVIE_REQUEST,
    data: data.theater.tid, //tid
  });
  dispatch({
    //영화+날짜
    type: SELECT_DAYMOVIE_TO_THEATER_REQUEST,
    data: {
      miday: data.Day.miday,
      mid: data.movie.id,
    },
  });
  dispatch({
    type: SELECT_DAYTHEATER_TO_MOVIE_REQUEST,
    data: {
      miday: data.Day.miday,
      tid: data.theater.tid,
    },
  });
  dispatch({
    type: MOVIE_DATA,
    data: data.movie,
  });
  dispatch({
    type: THEATER_DATA,
    data: data.theater,
  });
  dispatch({
    type: DAY_DATA,
    data: data.Day,
  });
  dispatch({
    type: SCHEDULE_DATA,
    data: data.schedule,
  });
}
