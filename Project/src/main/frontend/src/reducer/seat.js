export const initalState = {
  choiceSeat: [],
  choiceUser: [],
  select_seat_loading: false,
  select_seat_done: false,
  select_seat_error: null,
  selectseat: [],
  select_infoseat_loading: false,
  select_infoseat_done: false,
  select_infoseat_error: null,
  selectinfoseat: [],
  ocuppyseat: [],
  check_seat_loading: false,
  check_seat_done: false,
  check_seat_error: null,
  price: 0,
};

export const PAGE_RESET = "PAGE_RESET";

export const SEAT_CHOICE = "SEAT_CHOICE";
export const SEAT_REMOVE = "SEAT_REMOVE";

export const USER_CHOICE = "USER_CHOICE";
export const USER_REMOVE = "USER_REMOVE";

export const SELECT_SEAT_REQUEST = "SELECT_SEAT_REQUEST";
export const SELECT_SEAT_SUCCESS = "SELECT_SEAT_SUCCESS";
export const SELECT_SEAT_FAILURE = "SELECT_SEAT_FAILURE";

export const SELECT_INFOSEAT_REQUEST = "SELECT_INFOSEAT_REQUEST";
export const SELECT_INFOSEAT_SUCCESS = "SELECT_INFOSEAT_SUCCESS";
export const SELECT_INFOSEAT_FAILURE = "SELECT_INFOSEAT_FAILURE";

export const CHECK_SEAT_REQUEST = "CHECK_SEAT_REQUEST";
export const CHECK_SEAT_SUCCESS = "CHECK_SEAT_SUCCESS";
export const CHECK_SEAT_FAILURE = "CHECK_SEAT_FAILURE";

const seat = (state = initalState, action) => {
  switch (action.type) {
    //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬

    case PAGE_RESET:
      return {
        ...state,
        choiceSeat: [],
        choiceUser: [],
        price: 0,
      };
    case SEAT_CHOICE:
      return {
        ...state,
        choiceSeat: [...state.choiceSeat, action.data],
      };

    case SEAT_REMOVE:
      return {
        ...state,
        choiceSeat: state.choiceSeat.filter(
          (seat) => seat.seat_id !== action.data
        ),
        //filter를 해서 제거해야함
      };

    case USER_CHOICE:
      return {
        ...state,
        choiceUser: [...state.choiceUser, action.data],
        price: state.price + action.price,
      };

    case USER_REMOVE:
      const array = [...state.choiceUser]; //불변성을 위해 배열 똑같이 생성
      const index = array.indexOf(action.data); //사람에 대한 index 찾기
      if (index !== -1) {
        array.splice(index, 1); //배열 제거
      }
      return {
        ...state,
        choiceUser: array, //복사
        price: state.price - action.price,
      };
    case SELECT_SEAT_REQUEST:
      return {
        ...state,
        select_seat_loading: true,
        select_seat_done: false,
        select_seat_error: null,
      };
    case SELECT_SEAT_SUCCESS:
      return {
        ...state,
        select_seat_loading: false,
        select_seat_done: true,
        select_seat_error: null,
        selectseat: action.data,
      };
    case SELECT_SEAT_FAILURE:
      return {
        ...state,
        select_seat_loading: false,
        select_seat_done: false,
        select_seat_error: null,
      };
    case SELECT_INFOSEAT_REQUEST:
      return {
        ...state,
        select_infoseat_loading: true,
        select_infoseat_done: false,
        select_infoseat_error: null,
      };
    case SELECT_INFOSEAT_SUCCESS:
      return {
        ...state,
        select_infoseat_loading: false,
        select_infoseat_done: true,
        select_infoseat_error: null,
        selectinfoseat: action.data,
      };
    case SELECT_INFOSEAT_FAILURE:
      return {
        ...state,
        select_infoseat_loading: false,
        select_infoseat_done: false,
        select_infoseat_error: null,
      };

    case CHECK_SEAT_REQUEST:
      return {
        ...state,
        check_seat_loading: true,
        check_seat_done: false,
        check_seat_error: null,
      };
    case CHECK_SEAT_SUCCESS:
      /*      let newState = { ...state };

      const result = state.choiceSeat.filter((item) => {
        return !action.data.some((other) => other.seatid === item.seat_id);
      }); //교집합 some을 이용한  seat에서 ocuppy 제거*/
      return {
        ...state,
        check_seat_loading: false,
        check_seat_done: true,
        check_seat_error: null,
        ocuppyseat: action.data /*
        ocuppyseat: newState.ocuppyseat.concat(action.data),
        choiceSeat: result,*/,
      };
    case CHECK_SEAT_FAILURE:
      return {
        ...state,
        check_seat_loading: false,
        check_seat_done: false,
        check_seat_error: null,
      };
    default:
      return state;
  }
};
export default seat;
