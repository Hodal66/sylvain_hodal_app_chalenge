import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import NavBar from "./components/NavBar";
import AllCountries from "./pages/allcountriesPage/AllCountries";
import SignUp from "./pages/signInPage/SignUp";
import SignIn from "./pages/signInPage/SignIn";
import CreateComment from "./pages/FunsAndComents/CreateComment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exactry path="/" element={<Home />} />
          <Route path="/allcountries" element={<AllCountries />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create-comments" element={<CreateComment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
