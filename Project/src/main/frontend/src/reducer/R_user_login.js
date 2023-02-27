/*
 23-01-19 로그인 구현(오병주)
 23-01-24 로그인 상태확인 구현(오병주)
 23-01-27 로그아웃 구현(오병주)
*/
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_RESET = "USER_LOGIN_RESET";
export const USER_LOGIN_STATUS_REQUEST = "USER_LOGIN_STATUS_REQUEST";
export const USER_LOGIN_STATUS_SUCCESS = "USER_LOGIN_STATUS_SUCCESS";
export const USER_LOGIN_STATUS_FAILURE = "USER_LOGIN_STATUS_FAILURE";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

const initalState = {
  LOGIN_loading: false,
  LOGIN_done: false,
  LOGIN_error: null,
  LOGIN_data: {uid: 'No_login', uname : ''},
  LOGIN_STATUS_loading: false,
  LOGIN_STATUS_done: false,
  LOGIN_STATUS_error: null,
  LOGOUT_loading: false,
  LOGOUT_done: false,
  LOGOUT_error: null
};

const R_user_login = (state = initalState, action) => {
  switch (action.type) {
    // 로그인 케이스들
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        LOGIN_loading: true,
        LOGIN_done: false,
        LOGIN_error: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        LOGIN_loading: false,
        LOGIN_done: true,
        LOGIN_error: null,
        LOGIN_data: action.data
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        LOGIN_loading: false,
        LOGIN_done: false,
        LOGIN_error: action.data,
        LOGIN_data: {uname : 'error!!'}
      };
    case USER_LOGIN_RESET:
      return {
        ...state,
        LOGIN_loading: false,
        LOGIN_done: false,
        LOGIN_error: null,
        LOGIN_data: {uid: 'No_login', uname : ''}
      };
    // 로그인 상태확인 케이스들
    case USER_LOGIN_STATUS_REQUEST:
      return {
        ...state,
        LOGIN_STATUS_loading: true,
        LOGIN_STATUS_done: false,
        LOGIN_STATUS_error: null,
      };
    case USER_LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        LOGIN_STATUS_loading: false,
        LOGIN_STATUS_done: true,
        LOGIN_STATUS_error: null,
        LOGIN_data: action.data
      };
    case USER_LOGIN_STATUS_FAILURE:
      return {
        ...state,
        LOGIN_STATUS_loading: false,
        LOGIN_STATUS_done: false,
        LOGIN_STATUS_error: action.data,
      };
    // 로그아웃 케이스들
    case USER_LOGOUT_REQUEST:
      return {
      ...state,
      LOGOUT_loading: true,
      LOGOUT_done: false,
      LOGOUT_error: null,
    };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        LOGOUT_loading: false,
        LOGOUT_done: true,
        LOGOUT_error: null,
        LOGIN_data: {uid: 'No_login', uname : ''}
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        LOGOUT_loading: false,
        LOGOUT_done: false,
        LOGOUT_error: action.data,
        LOGIN_data: {uid: 'No_login', uname : ''}
      };
    default:
      return state;
  }
};

export default R_user_login;
