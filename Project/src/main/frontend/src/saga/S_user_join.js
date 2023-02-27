/*
 23-01-08 회원가입 시 필요한 사가 파일 작성(오병주)
 23-01-13 아이디 중복확인 함수 생성(오병주)
 23-01-18 회원가입 구현(오병주) 
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_ID_FAILURE,
  USER_ID_SUCCESS,
  USER_ID_REQUEST,
  USER_JOIN_REQUEST,
  USER_JOIN_SUCCESS,
  USER_JOIN_FAILURE,
} from "../reducer/R_user_join";
import { http } from "../lib/http";

// 아이디 중복검사 함수
function* IDcheck(action) {
  const result = yield call(idexsits, action.data); // idexsits(action.data); 이런 것
  if (result.status === 204) {
    yield put({
      type: USER_ID_SUCCESS,
      data: result.status,
    });
  } else {
    yield put({
      type: USER_ID_FAILURE,
      data: result.status,
    });
  }
}

// 디비에서 데이터 select 하고 바로 리턴해줌(아이디 중복 검사)
async function idexsits(data) {
  return await http
    .get("/member/normal/id", {
      params: {
        uid: data,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

// 회원가입 함수
function* UserSignUp(action) {
  const result = yield call(SignUp, action.data);
  if (result.status === 204) {
    yield put({
      type: USER_JOIN_SUCCESS,
      data: result.status,
    });
  } else {
    yield put({
      type: USER_JOIN_FAILURE,
      data: result.status,
    });
  }
}

// 디비에 회원정보를 전달하고 저장
async function SignUp(data) {
  return await http
    .post("/member/normal/signup", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

function* USER_ID() {
  yield takeLatest(USER_ID_REQUEST, IDcheck);
}

function* USER_JOIN() {
  yield takeLatest(USER_JOIN_REQUEST, UserSignUp);
}

export default function* S_user_join() {
  yield all([fork(USER_ID), fork(USER_JOIN)]);
}
