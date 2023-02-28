import {
  SELECT_SEAT_SUCCESS,
  SELECT_SEAT_FAILURE,
  SELECT_SEAT_REQUEST,
  SELECT_INFOSEAT_FAILURE,
  SELECT_INFOSEAT_REQUEST,
  SELECT_INFOSEAT_SUCCESS,
  CHECK_SEAT_REQUEST,
  CHECK_SEAT_SUCCESS,
  CHECK_SEAT_FAILURE,
} from "../reducer/seat";
import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { http } from "../lib/http";
async function selectSeatApi(data) {
  return await http
    .get("/seat/normal/infoseat", {
      params: {
        id: data.id,
        miid: data.miid,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectSeat(action) {
  const result = yield call(selectSeatApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_SEAT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_SEAT_FAILURE,
      data: result.status,
    });
  }
}

async function selectInfoSeatApi(data) {
  return await http
    .get("/seat/normal/movieinfoseat", {
      params: {
        miid: data,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* selectInfoSeat(action) {
  const result = yield call(selectInfoSeatApi, action.data);
  if (result.status === 200) {
    yield put({
      type: SELECT_INFOSEAT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("실패");
    yield put({
      type: SELECT_INFOSEAT_FAILURE,
      data: result.status,
    });
  }
}

async function checkSeatApi(data) {
  return await http
    .post("/seat/normal/rediss", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* checkSeat(action) {
  const result = yield call(checkSeatApi, action.data);
  console.log(result);

  if (result.status === 200) {
    yield put({
      type: CHECK_SEAT_SUCCESS,
      data: result.data,
    });
  } else {
    alert("점유된 좌석입니다.");
    console.log(action.data);
    yield put({
      type: CHECK_SEAT_FAILURE,
    });
  }
}
function* selectSeatSaga() {
  yield takeLatest(SELECT_SEAT_REQUEST, selectSeat);
}

function* selectInfoSeatSaga() {
  yield takeLatest(SELECT_INFOSEAT_REQUEST, selectInfoSeat);
}
function* checkSeatSaga() {
  yield takeLatest(CHECK_SEAT_REQUEST, checkSeat);
}
export default function* seatSaga() {
  yield all([
    fork(selectSeatSaga),
    fork(selectInfoSeatSaga),
    fork(checkSeatSaga),
  ]);
}
