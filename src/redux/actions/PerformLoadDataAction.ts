import axios from "axios";
import {
  load_data_request,
  load_data_success,
  load_data_fail,
} from "../actions/load_data_into_db_action";

export const loadDataIntoDb = (googleSheetId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(load_data_request());
      const result = await axios({
        url: "http://localhost:4000/",
        method: "post",
        data: {
          query: `mutation LoadAllTrainees($spreadsheetId: String!) {
  loadAllTrainees(spreadsheetId: $spreadsheetId)
}`,
          variables: {
            spreadsheetId: googleSheetId,
          },
        },
      });
      dispatch(load_data_success(result.data.data.LoadAllTrainees));
    } catch (err) {
      console.log(err);
      dispatch(load_data_fail(err));
    }
  };
};
