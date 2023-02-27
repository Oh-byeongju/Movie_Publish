import { all, fork } from "redux-saga/effects";
import S_user_join from "./S_user_join";
import ticketSaga from "./ticket";
import S_user_login from "./S_user_login";
import movieSaga from "./movie";
import S_user_movie from "./S_user_movie";
import seatSaga from "./seat";
//사가 파일 추가 시 rootSaga 안에 fork해주면 됨
export default function* rootSaga() {
  yield all([
    fork(S_user_join),
    fork(ticketSaga),
    fork(S_user_login),
    fork(movieSaga),
    fork(S_user_movie),
    fork(seatSaga),
  ]);
}
