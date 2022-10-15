import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';
import TestTailwind from "./components/TestTailwind";
import FilterTrainee from './pages/FilterTeainee/FilterTrainee';
import './index.css'
import ImportTraineeDetailsFromGoogleSheet from './pages/importMultipleTrainee/ImportTraineeDetailsFromGoogleSheet';

// function App() {
//   return (
//     <Router>
//       <TestTailwind />
//     </Router>
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Counter = React.lazy(() => import("./components/Counter/Counter"));

function App() {
  return (
    <Routes>
      <Route path="/test_redux" element={<Counter />} />
      <Route path="/test_tailwind" element={<TestTailwind />} />
      <Route path="/filter_trainee" element={<FilterTrainee />} />
      <Route
        path="/import_trainee"
        element={<ImportTraineeDetailsFromGoogleSheet />}
      />
    </Routes>
  );
}

export default App;
