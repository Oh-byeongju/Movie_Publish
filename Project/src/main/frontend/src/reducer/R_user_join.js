/*
 23-01-08 회원가입 시 필요한 리듀서 작성(오병주)
 23-01-13 아이디 중복확인 함수 생성(오병주)
 23-01-18 회원가입 구현(오병주)
*/
export const USER_ID_REQUEST = "USER_ID_REQUEST";
export const USER_ID_SUCCESS = "USER_ID_SUCCESS";
export const USER_ID_FAILURE = "USER_ID_FAILURE";
export const USER_ID_RESET = "USER_ID_RESET";
export const USER_JOIN_REQUEST = "USER_JOIN_REQUEST";
export const USER_JOIN_SUCCESS = "USER_JOIN_SUCCESS";
export const USER_JOIN_FAILURE = "USER_JOIN_FAILURE";

const initalState = {
  ID_loading: false,
  ID_done: false,
  ID_error: null,
  ID_status: '',
  JOIN_loading: false,
  JOIN_done: false,
  JOIN_error: null,
  JOIN_status: ''
};

const R_user_join = (state = initalState, action) => {
  switch (action.type) {
    // 아이디 중복 확인 케이스들
    case USER_ID_REQUEST:
      return {
        ...state,
        ID_loading: true,
        ID_done: false,
        ID_error: null,
      };
    case USER_ID_SUCCESS:
      return {
        ...state,
        ID_loading: false,
        ID_done: true,
        ID_error: null,
        ID_status: action.data
      };
    case USER_ID_FAILURE:
      return {
        ...state,
        ID_loading: false,
        ID_done: false,
        ID_error: action.error,
        ID_status: action.data
      };
    case USER_ID_RESET:
      return {
        ...state,
        ID_loading: false,
        ID_done: false,
        ID_error: null,
        ID_status: ''
      };
    // 회원가입 케이스들
    case USER_JOIN_REQUEST:
      return {
        ...state,
        JOIN_loading: true,
        JOIN_done: false,
        JOIN_error: null,
      };
    case USER_JOIN_SUCCESS:
      return {
        ...state,
        JOIN_loading: false,
        JOIN_done: true,
        JOIN_error: null,
        JOIN_status: action.data
      };
    case USER_JOIN_FAILURE:
      return {
        ...state,
        JOIN_loading: false,
        JOIN_done: false,
        JOIN_error: action.error,
        JOIN_status: action.data
      };
    default:
      return state;
  }
};

export default R_user_join;
