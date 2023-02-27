/*
 23-01-19 로그인 구현(오병주)
 23-01-24 로그인 상태확인 구현(오병주)
 23-01-27 로그아웃 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_STATUS_REQUEST,
  USER_LOGIN_STATUS_FAILURE,
  USER_LOGIN_STATUS_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from "../reducer/R_user_login";
import { http } from "../lib/http";

// 로그인 함수
function* UserLogin(action) {
  const result = yield call(Login, action.data);
  if (result.status === 200) {
    yield put({
      type: USER_LOGIN_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: USER_LOGIN_FAILURE,
      data: result.data,
    });
  }
}

// 디비에 로그인 정보를 전달하고 토큰을 리턴
async function Login(data) {
  return await http
    .post("/member/normal/login", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 로그인 상태 확인 함수
function* UserCheck() {
  const result = yield call(Check);
  if (result.status === 200) {
    yield put({
      type: USER_LOGIN_STATUS_SUCCESS,
      data: result.data,
    });
  } else {
    yield put({
      type: USER_LOGIN_STATUS_FAILURE,
      data: result.data,
    });
  }
}

// 로그인 상태를 확인 하기 위해 쿠키를 전달함(백엔드 연결)
async function Check() {
  return await http
    .get("/member/normal/login_status")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 로그아웃 함수
function* UserLogout() {
  const result = yield call(Checkout);
  if (result.status === 204) {
    yield put({
      type: USER_LOGOUT_SUCCESS,
    });
  } else {
    yield put({
      type: USER_LOGOUT_FAILURE,
    });
  }
}

// 로그아웃을 처리하기 위해 쿠키를 전달함(백엔드 연결)
async function Checkout() {
  return await http
    .post("/member/normal/logout")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* USER_LOGIN() {
  yield takeLatest(USER_LOGIN_REQUEST, UserLogin);
}

function* USER_STATUS() {
  yield takeLatest(USER_LOGIN_STATUS_REQUEST, UserCheck);
}

function* USER_LOGOUT() {
  yield takeLatest(USER_LOGOUT_REQUEST, UserLogout);
}

export default function* S_user_login() {
  yield all([fork(USER_LOGIN), fork(USER_STATUS), fork(USER_LOGOUT)]);
}
