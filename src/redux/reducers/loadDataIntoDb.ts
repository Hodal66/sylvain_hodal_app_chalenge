import { LOAD_DATA_INTO_DB_FAIL, LOAD_DATA_INTO_DB_REQUEST, LOAD_DATA_INTO_DB_SUCCESS } from "../index";
LOAD_DATA_INTO_DB_SUCCESS

const initialState = {
  Loading: false,
  message: "",
  error:""
};

 const loadDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_DATA_INTO_DB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_DATA_INTO_DB_SUCCESS:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case LOAD_DATA_INTO_DB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loadDataReducer;
