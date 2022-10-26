import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import NavBar from "./components/NavBar";
import AllCountries from "./pages/allcountriesPage/AllCountries";
import SignUp from "./pages/signInPage/SignUp";
import SignIn from "./pages/signInPage/SignIn";
import Gallery from "./pages/GalleryCountry/Gallery";
import Countries from "./components/Country";
import CountryFunFactDetail from "./pages/FunFactDetail/CountryFanFactDetail";

function App() {
  return (
    <div className="h-screen w-full font-popins">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exactry path="/" element={<Home />} />
            <Route path="/allcountries" element={<AllCountries />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/gallery/:countryId" element={<Gallery />} />
            <Route
              path="/funfact-detail/:countryId"
              element={<CountryFunFactDetail />}
            />
            <Route path="/country" element={<Countries />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
