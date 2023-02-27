export const initalState = {
  allmovie_loading: false,
  allmovie_done: false,
  allmovie_error: null,
  movie_search_loading: false,
  movie_search_done: false,
  movie_search_error: null,
  detail_movie_loading: false,
  detail_movie_done: false,
  detail_movie_error: null,
  detail_comment_recent_loading: false,
  detail_comment_recent_done: false,
  detail_comment_recent_error: null,
  detail_comment_like_loading: false,
  detail_comment_like_done: false,
  detail_comment_like_error: null,
  allMovie: [],
  detailMovie: [],
  detailComment: []
};

// 전체 영화 리스트
export const ALLMOVIE_REQUEST = "ALLMOVIE_REQUEST";
export const ALLMOVIE_SUCCESS = "ALLMOVIE_SUCCESS";
export const ALLMOVIE_FAILURE = "ALLMOVIE_FAILURE";

// 검색한 영화 리스트
export const MOVIE_SEARCH_REQUEST = "MOVIE_SEARCH_REQUEST";
export const MOVIE_SEARCH_SUCCESS = "MOVIE_SEARCH_SUCCESS";
export const MOVIE_SEARCH_FAILURE = "MOVIE_SEARCH_FAILURE";

// 영화 세부정보 리스트
export const DETAIL_MOVIE_REQUEST = "DETAIL_MOVIE_REQUEST";
export const DETAIL_MOVIE_SUCCESS = "DETAIL_MOVIE_SUCCESS";
export const DETAIL_MOVIE_FAILURE = "DETAIL_MOVIE_FAILURE";

// 영화 관람평 최신순 조회 리스트
export const DETAIL_COMMENT_RECENT_REQUEST = "DETAIL_COMMENT_RECENT_REQUEST";
export const DETAIL_COMMENT_RECENT_SUCCESS = "DETAIL_COMMENT_RECENT_SUCCESS";
export const DETAIL_COMMENT_RECENT_FAILURE = "DETAIL_COMMENT_RECENT_FAILURE";

// 영화 관람평 공감순 조회 리스트
export const DETAIL_COMMENT_LIKE_REQUEST = "DETAIL_COMMENT_LIKE_REQUEST";
export const DETAIL_COMMENT_LIKE_SUCCESS = "DETAIL_COMMENT_LIKE_SUCCESS";
export const DETAIL_COMMENT_LIKE_FAILURE = "DETAIL_COMMENT_LIKE_FAILURE";

const movie = (state = initalState, action) => {
  switch (action.type) {
    // 전체 영화 케이스들
    case ALLMOVIE_REQUEST:
      return {
        ...state, 
        allmovie_loading: true,
        allmovie_done: false,
        allmovie_error: null
      };

    case ALLMOVIE_SUCCESS:
      return {
        ...state,
        allmovie_loading: false,
        allmovie_done: true,
        allmovie_error: null,
        allMovie: action.data
      };

    case ALLMOVIE_FAILURE:
      return {
        ...state,
        allmovie_loading: false,
        allmovie_done: false,
        allmovie_error: action.error
      };
    // 영화 검색 케이스들
    case MOVIE_SEARCH_REQUEST:
      return {
        ...state, 
        movie_search_loading: true,
        movie_search_done: false,
        movie_search_error: null
      };

    case MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        movie_search_loading: false,
        movie_search_done: true,
        movie_search_error: null,
        allMovie: action.data
      };

    case MOVIE_SEARCH_FAILURE:
      return {
        ...state,
        movie_search_loading: false,
        movie_search_done: false,
        movie_search_error: action.error,
        allMovie: []
      };
    // 영화 세부정보 케이스들
    case DETAIL_MOVIE_REQUEST:
      return {
        ...state, 
        detail_movie_loading: true,
        detail_movie_done: false,
        detail_movie_error: null
      };
    case DETAIL_MOVIE_SUCCESS:
      return {
        ...state,
        detail_movie_loading: false,
        detail_movie_done: true,
        detail_movie_error: null,
        detailMovie: action.data
      };
    case DETAIL_MOVIE_FAILURE:
      return {
        ...state,
        detail_movie_loading: false,
        detail_movie_done: false,
        detail_movie_error: action.error
      };
    // 영화 관람평 최신순 조회 케이스
    case DETAIL_COMMENT_RECENT_REQUEST:
      return {
        ...state, 
        detail_comment_recent_loading: true,
        detail_comment_recent_done: false,
        detail_comment_recent_error: null,
      };
    case DETAIL_COMMENT_RECENT_SUCCESS:
      return {
        ...state,
        detail_comment_recent_loading: false,
        detail_comment_recent_done: true,
        detail_comment_recent_error: null,
        detailComment: action.data
      };
    case DETAIL_COMMENT_RECENT_FAILURE:
      return {
        ...state,
        detail_comment_recent_loading: false,
        detail_comment_recent_done: false,
        detail_comment_recent_error: action.error,
        detailComment: []
      };
    // 영화 관람평 공감순 조회 케이스
    case DETAIL_COMMENT_LIKE_REQUEST:
      return {
        ...state, 
        detail_comment_like_loading: true,
        detail_comment_like_done: false,
        detail_comment_like_error: null,
      };
    case DETAIL_COMMENT_LIKE_SUCCESS:
      return {
        ...state,
        detail_comment_like_loading: false,
        detail_comment_like_done: true,
        detail_comment_like_error: null,
        detailComment: action.data
      };
    case DETAIL_COMMENT_LIKE_FAILURE:
      return {
        ...state,
        detail_comment_like_loading: false,
        detail_comment_like_done: false,
        detail_comment_like_error: action.error,
        detailComment: []
      };
    default:
      return state;
  }
};
export default movie;
