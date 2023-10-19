import React, {useEffect, useState} from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import './App.css'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MoviesAPI } from "../../utils/MoviesApi";
import { MainAPI, AuthAPI} from "../../utils/MainApi";
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
import InfoTooltip from "../InfoTooltip";
import ProtectedRouteElement from "../ProtectedRoute";

function App() {
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [isInfoTooltipOpen, openInfoTooltip] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isError, setErrorStatus] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      await getUserInfo();
    })();
  }, []);

      React.useEffect(() => {
      const favoriteMovies = JSON.parse(localStorage.getItem('moviesFavorite'));
      if (favoriteMovies) setFavoriteMovies([...favoriteMovies])
    }, []);

    async function getUserInfo() {
    await AuthAPI.checkToken()
      .then((userInfo) => {
          if(userInfo){
            setLoggedIn(true);
            setCurrentUser(userInfo);
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleRegister(name, email, password) {
    try {
      const userInfo = await AuthAPI.signup({
        name,
        email,
        password,
      });
      if (userInfo) {
        setStatusError(false);
        await handleLogin(password, email)
      }
    } catch (err) {
      setStatusError(true);
      handleOpenInfoTooltip();
      console.log(err);
    }
  }

  async function handleLogin(password, email, callback=null) {
    try {
      const userInfo = await AuthAPI.signin({
        password,
        email,
      });
      if (userInfo.token) {
        localStorage.setItem("token", userInfo.token);
        if (callback) callback({ email: "", password: "" });
        await getUserInfo();
      }
    } catch (err) {
      setStatusError(true);
      handleOpenInfoTooltip();
      console.log(err);
    }
  }

    function handleBurgerClick() {
    setBurgerOpen(true);
  }

  function handleClose() {
    setBurgerOpen(false);
  }

  function setStatusError(status) {
    setErrorStatus(status);
  }

  function handleOpenInfoTooltip() {
    openInfoTooltip(true);
  }

  function closeInfoRegisterTooltip() {
   openInfoTooltip(false);
    if (!isError) {
      navigate("/movies", { replace: true });
    }
  }

    function closeProfileTooltip() {
   openInfoTooltip(false);
  }

  function closeInfoTooltip() {
    openInfoTooltip(false);
  }

  function logOut() {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/", { replace: true });
  }

  async function getMovies() {
          if (!JSON.parse(localStorage.getItem('movies'))) {
            setLoading(true)
            try{
              const newMovies = await MoviesAPI.getMovies();
              const favoriteMovies = await getFavoriteMovies();
              setFavoriteMovies([...favoriteMovies])
              if(favoriteMovies) newMovies.filter(movie=> movie.isLike = (favoriteMovies.filter(elem => elem.movieId === movie.id).length > 0))
              localStorage.setItem('movies', JSON.stringify(newMovies))
              setLoading(false);
            } catch (err) {
              setLoading(false);
                console.log(err);
            }
          }
    }

    async function getFavoriteMovies() {
          if (!JSON.parse(localStorage.getItem('moviesFavorite'))) {
            try{
              const newFavoriteMovies = await MainAPI.getFavoriteMovies();
              localStorage.setItem('moviesFavorite', JSON.stringify(newFavoriteMovies))
              setFavoriteMovies(newFavoriteMovies)
              return newFavoriteMovies;
            } catch (err) {
                console.log(err);
            }
          }
    }

  async function handleSetFavoritMovie(movie, liked){
      if (liked){
        await handleLikedMovie(movie);
        const movies = JSON.parse(localStorage.getItem('movies'));
        const favoriteMovies = JSON.parse(localStorage.getItem('moviesFavorite'));
        favoriteMovies.push(movie);
        movies.filter(movie=> movie.isLike = (favoriteMovies.filter(elem => elem.id === movie.id).length > 0))
        localStorage.removeItem('movies');
        localStorage.removeItem('moviesFavorite');
        localStorage.setItem('movies', JSON.stringify(movies))
        localStorage.setItem('moviesFavorite', JSON.stringify(favoriteMovies))
        setMovies([...movies])
        setFavoriteMovies([...favoriteMovies])
      } else {
        await handleDislikedMovie(movie);
        const movies = JSON.parse(localStorage.getItem('movies'));
        let favoriteMovies = JSON.parse(localStorage.getItem('moviesFavorite'));
        favoriteMovies = favoriteMovies.filter((item) => {
          const id = item.id || item.movieId
          const expr = id != movie.id
          return expr
        })
        movies.filter(movie=> movie.isLike = !(favoriteMovies.filter(elem => elem.id === movie.id).length > 0))
        localStorage.removeItem('movies');
        localStorage.removeItem('moviesFavorite');
        localStorage.setItem('movies', JSON.stringify(movies))
        localStorage.setItem('moviesFavorite', JSON.stringify(favoriteMovies))
        setMovies([...movies])
        setFavoriteMovies([...favoriteMovies])
      }
  }

  async function handleDislikedMovie(movie) {
      try {
        const movieId = movie.movieId || movie.id
        await MainAPI.deleteMovie(movieId);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLikedMovie(movie) {
      try {
      await MainAPI.addMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.imageUrl,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateUser({ name, email }) {
    const newUserData = { ...currentUser, name, email };
    MainAPI.updateUserInfo(newUserData)
      .then(() => {
        setCurrentUser(newUserData);
        handleOpenInfoTooltip()
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                    isLandingPage={true}
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
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                        <Header
                            onBurgerClick={handleBurgerClick}
                        />
                        <Movies
                            getMovies={getMovies}
                            movies={movies}
                            setMovies={setMovies}
                            favoriteMovies={favoriteMovies}
                            setFavoriteMovies={setFavoriteMovies}
                            handleSetFavoritMovie={handleSetFavoritMovie}
                            isLoading={isLoading}
                            moviesShowed={moviesShowed}
                            setMoviesShowed={setMoviesShowed}
                        />
                        <Footer />
                      </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                      <Header
                            onBurgerClick={handleBurgerClick}
                      />
                      <SavedMovies
                          handleSetFavoritMovie={handleSetFavoritMovie}
                          isLoading={isLoading}
                          favoriteMovies={favoriteMovies}
                          getFavoriteMovies={getFavoriteMovies}
                          setFavoriteMovies={setFavoriteMovies}
                      />
                      <Footer />
                      </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                      <Header
                        onBurgerClick={handleBurgerClick}
                      />
                      <Profile
                          logOut={logOut}
                          handleUpdateUser={handleUpdateUser}
                          handleOpenInfoTooltip={handleOpenInfoTooltip}
                      />
                        <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        isError={isError}
                        onClose={closeProfileTooltip}
                        successText="Данные профиля успешно изменены!"
                      />
                    </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <>
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isError={isError}
                    onClose={closeInfoRegisterTooltip}
                    successText="Вы успешно зарегистрировались!"
                  />
                  <Register
                    onRegister={handleRegister}
                  />
                </>
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <>
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isError={isError}
                    onClose={closeInfoTooltip}
                  />
                  <Login
                    onLogin={handleLogin}
                  />
                </>
              )
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
    </CurrentUserContext.Provider>
  );
}

export default App;
