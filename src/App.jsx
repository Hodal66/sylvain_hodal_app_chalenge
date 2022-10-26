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
import { Provider } from "react-redux";
import store from "./redux/store";
// import ImportTraineeDetailsFromGoogleSheet from "./pages/importMultipleTrainee/ImportTraineeDetailsFromGoogleSheet";
import {ImportTraineeDetailsFromGoogleSheet} from "./pages/importMultipleTrainee/ImportTraineeDetailsFromGoogleSheet"
function App() {
  return (
    <div className="h-screen w-full font-popins">
      <Provider store = {store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exactry path="/" element={<Home />} />
            <Route path="/allcountries" element={<AllCountries />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/import_trainee"
              element={<ImportTraineeDetailsFromGoogleSheet />}
            />
            <Route path="/gallery/:countryId" element={<Gallery />} />
            <Route
              path="/funfact-detail/:countryId"
              element={<CountryFunFactDetail />}
            />

            <Route path="/country" element={<Countries />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
