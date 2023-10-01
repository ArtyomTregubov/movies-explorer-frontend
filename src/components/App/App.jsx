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

function App() {

  return (
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={false}/>
                <Main/>
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header />
                <Movies/>
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header />
                <SavedMovies/>
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile/>
                <Footer />
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
      </div>
  );
}

export default App;
