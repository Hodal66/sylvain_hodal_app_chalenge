import { LOAD_DATA_INTO_DB_REQUEST, LOAD_DATA_INTO_DB_FAIL, LOAD_DATA_INTO_DB_SUCCESS} from "../index"

export const load_data_request = ()=>{
    return {
      type: LOAD_DATA_INTO_DB_REQUEST,
    };
}

export const load_data_success = (statusMessage:string) => {
  return {
    type: LOAD_DATA_INTO_DB_SUCCESS,
    payload: statusMessage
  };
};


export const load_data_fail = (error:any) => {
  return {
    type: LOAD_DATA_INTO_DB_FAIL,
    payload: error.errors[0].message,
  };
};

