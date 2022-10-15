import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadDataIntoDb } from "../../redux/actions/PerformLoadDataAction";

const ImportTraineeDetailsFromGoogleSheet = (props: any) => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    // dispatch(loadDataIntoDb(id));
    props.loadData(id);
  };
  return (
    <div className="w-full h-full flex justify-center items-center mt-24 bg-blue-500">
      <form className="w-1/3 h-1/3">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Enter Google sheet URL
          </label>
          <input
            value={id}
            onChange={handleChange}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 
            bg-blue-300
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Enter google sheet url to load your data into database"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Load Data to Database
        </button>
      </form>
    </div>
  );
};
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     loadData: (todoId: string) => dispatch(loadDataIntoDb(todoId)),
//   };
// };

export default ImportTraineeDetailsFromGoogleSheet;
// export default connect(mapDispatchToProps)(ImportTraineeDetailsFromGoogleSheet);
