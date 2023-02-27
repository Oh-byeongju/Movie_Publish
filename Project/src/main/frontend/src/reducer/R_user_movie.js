/*
 23-01-19 유저 좋아요 toggle 구현(오병주)
 23-02-12 유저 관람평 작성 구현(오병주)
 23-02-24 유저 관람평 좋아요 구현(오병주)
 23-02-25 유저 관람평 작성 수정(오병주)
*/
export const USER_MLIKE_REQUEST = "USER_MLIKE_REQUEST"
export const USER_MLIKE_SUCCESS = "USER_MLIKE_SUCCESS"
export const USER_MLIKE_FAILURE = "USER_MLIKE_FAILURE"
export const USER_COMMENT_WRITE_REQUEST = "USER_COMMENT_WRITE_REQUEST"
export const USER_COMMENT_WRITE_SUCCESS = "USER_COMMENT_WRITE_SUCCESS"
export const USER_COMMENT_WRITE_FAILURE = "USER_COMMENT_WRITE_FAILURE"
export const USER_COMMENT_WRITE_RESET = "USER_COMMENT_WRITE_RESET"
export const USER_COMMENT_LIKE_REQUEST = "USER_COMMENT_LIKE_REQUEST"
export const USER_COMMENT_LIKE_SUCCESS = "USER_COMMENT_LIKE_SUCCESS"
export const USER_COMMENT_LIKE_FAILURE = "USER_COMMENT_LIKE_FAILURE"
export const USER_COMMENT_DELETE_REQUEST = "USER_COMMENT_DELETE_REQUEST"
export const USER_COMMENT_DELETE_SUCCESS = "USER_COMMENT_DELETE_SUCCESS"
export const USER_COMMENT_DELETE_FAILURE = "USER_COMMENT_DELETE_FAILURE"

const initalState = {
  MLIKE_loading: false,
  MLIKE_done: false,
  MLIKE_error: false,
	COMMENT_WRITE_loading: false,
  COMMENT_WRITE_done: false,
  COMMENT_WRITE_error: false,
	WRITE_code: '',
	COMMENT_LIKE_loading: false,
  COMMENT_LIKE_done: false,
  COMMENT_LIKE_error: false,
	COMMENT_DELETE_loading: false,
  COMMENT_DELETE_done: false,
  COMMENT_DELETE_error: false
};

const R_user_movie = (state = initalState, action) => {
	switch (action.type) {
		// 영화 좋아요 누르는 케이스들
		case USER_MLIKE_REQUEST:
			return {
				...state,
				MLIKE_loading: true,
				MLIKE_done: false,
				MLIKE_error: false
			};
		case USER_MLIKE_SUCCESS:
			return {
				...state,
				MLIKE_loading: false,
				MLIKE_done: true,
				MLIKE_error: false
			};
		case USER_MLIKE_FAILURE:
			return {
				...state,
				MLIKE_loading: false,
				MLIKE_done: false,
				MLIKE_error: true,
			};
		// 영화 관람평 작성 케이스들
		case USER_COMMENT_WRITE_REQUEST:
			return {
				...state,
				COMMENT_WRITE_loading: true,
				COMMENT_WRITE_done: false,
				COMMENT_WRITE_error: false
			};
		case USER_COMMENT_WRITE_SUCCESS:
			return {
				...state,
				COMMENT_WRITE_loading: false,
				COMMENT_WRITE_done: true,
				COMMENT_WRITE_error: false,
				WRITE_code: action.data
			};
		case USER_COMMENT_WRITE_FAILURE:
			return {
				...state,
				COMMENT_WRITE_loading: false,
				COMMENT_WRITE_done: false,
				COMMENT_WRITE_error: true,
				WRITE_code: action.data
			};
		case USER_COMMENT_WRITE_RESET:
			return {
				...state,
				COMMENT_WRITE_loading: false,
				COMMENT_WRITE_done: false,
				COMMENT_WRITE_error: false,
				WRITE_code: ''
			};
		// 영화 관람평 좋아요 케이스들
		case USER_COMMENT_LIKE_REQUEST:
			return {
				...state,
				COMMENT_LIKE_loading: true,
				COMMENT_LIKE_done: false,
				COMMENT_LIKE_error: false
			};
		case USER_COMMENT_LIKE_SUCCESS:
			return {
				...state,
				COMMENT_LIKE_loading: false,
				COMMENT_LIKE_done: true,
				COMMENT_LIKE_error: false,
			};
		case USER_COMMENT_LIKE_FAILURE:
			return {
				...state,
				COMMENT_LIKE_loading: false,
				COMMENT_LIKE_done: false,
				COMMENT_LIKE_error: true,
			};
		// 영화 관람평 삭제 케이스들
		case USER_COMMENT_DELETE_REQUEST:
			return {
				...state,
				COMMENT_DELETE_loading: true,
				COMMENT_DELETE_done: false,
				COMMENT_DELETE_error: false
			};
		case USER_COMMENT_DELETE_SUCCESS:
			return {
				...state,
				COMMENT_DELETE_loading: false,
				COMMENT_DELETE_done: true,
				COMMENT_DELETE_error: false,
			};
		case USER_COMMENT_DELETE_FAILURE:
			return {
				...state,
				COMMENT_DELETE_loading: false,
				COMMENT_DELETE_done: false,
				COMMENT_DELETE_error: true,
			};
		default:
      return state;
	}
}

export default R_user_movie;