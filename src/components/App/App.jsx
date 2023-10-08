import React from "react";
import { Route, Routes } from "react-router-dom";

import './App.css'

import Main from "../Main";
import Header from "../Header";
import Footer from "../Footer";
import Register from "../Register";
import Login from "../Login";
import PageNotFound404 from "../PageNotFound404";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Profile from "../Profile";
import BurgerMenu from "../BurgerMenu";

function App() {

  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [isSwitched, setSwitched] = React.useState(false);
  function handleSwitch(e){
      e.preventDefault();
      setSwitched(!isSwitched);
  }

    function handleBurgerClick() {
    setBurgerOpen(true);
  }

  function handleClose() {
    setBurgerOpen(false);
  }

  return (
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                    loggedIn={false}
                    onBurgerClick={handleBurgerClick}
                />
                <Main/>
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header
                    onBurgerClick={handleBurgerClick}
                />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header
                    onBurgerClick={handleBurgerClick}
                />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header
                    onBurgerClick={handleBurgerClick}
                />
                <Profile isSwitched={isSwitched} handleSwitch={handleSwitch}/>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Register/>
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Login/>
              </>
            }
          />
          <Route path="*" element={
                <PageNotFound404/>
            } />
        </Routes>
        <BurgerMenu
            isOpen={isBurgerOpen}
            onClose={handleClose}
        />
      </div>
  );
}

export default App;
