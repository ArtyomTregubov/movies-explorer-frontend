import React from "react";
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [isSwitched, setSwitched] = React.useState(false);
  const [isInfoTooltipOpen, openInfoTooltip] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isError, setErrorStatus] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isShortMovies, setShortMovies] = React.useState(false);
  const [promptText, setPrompt] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [favoritMovies, setFavoritMovies] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        const userInfo = await AuthAPI.checkToken();
        if (userInfo) {
          localStorage.setItem("email", userInfo.email);
          setLoggedIn(true);
          setCurrentUser(userInfo);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [loggedIn]);

  React.useEffect(() => {
      if (!loggedIn) return;
    (async () => {
      try {
        const movies = await MainAPI.getFavoriteMovies();
        if (movies.length) {
          setFavoritMovies([...movies])
        }
      } catch (err) {
        console.log(err);
      }
    })();
  },[loggedIn]);

  function getMovies(prompt="") {
      if (!loggedIn) return;
      setLoading(true)
    prompt = prompt.toLowerCase();
      setPrompt(prompt)
    MoviesAPI.getMovies()
      .then((newMovies) => {
         newMovies = newMovies.filter((movie) => {
             movie.isLike = (favoritMovies.filter(elem => elem.movieId === movie.id).length > 0)
             if (isShortMovies)
               return (movie.nameRU.toLowerCase().includes(prompt) || movie.nameEN.toLowerCase().includes(prompt)) && movie.duration <= 40;
             return movie.nameRU.toLowerCase().includes(prompt) || movie.nameEN.toLowerCase().includes(prompt);
         });
        setMovies([...newMovies]);
        setLoading(false);
      })
      .catch((err) => {
          setLoading(false);
          console.log(err)
      });
  }

  function getFavoritMovies(prompt="") {
      if (!loggedIn) return;
      setLoading(true)
      prompt = prompt.toLowerCase();
      setPrompt(prompt)
    MainAPI.getFavoriteMovies()
      .then((newMovies) => {
         newMovies = newMovies.filter((movie) => {
             if (isShortMovies)
               return (movie.nameRU.toLowerCase().includes(prompt) || movie.nameEN.toLowerCase().includes(prompt)) && movie.duration <= 40;
             return movie.nameRU.toLowerCase().includes(prompt) || movie.nameEN.toLowerCase().includes(prompt);
         });
        setFavoritMovies([...newMovies]);
        setLoading(false);
      })
      .catch((err) => {
          setLoading(false);
          console.log(err)
      });
  }

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

  function setStatusError(status) {
    setErrorStatus(status);
  }

  function handleOpenInfoTooltip() {
    openInfoTooltip(true);
  }

  function closeInfoRegisterTooltip() {
   openInfoTooltip(false);
    if (!isError) {
      navigate("/signin", { replace: true });
    }
  }

  function closeInfoTooltip() {
    openInfoTooltip(false);
  }

  async function handleRegister(name, email, password) {
    try {
      await AuthAPI.signup({
        name,
        email,
        password,
      });
      setStatusError(false);
      handleOpenInfoTooltip();
    } catch (err) {
      setStatusError(true);
      handleOpenInfoTooltip();
      console.log(err);
    }
  }

  async function handleLogin(password, email, callback) {
    try {
      const userInfo = await AuthAPI.signin({
        password,
        email,
      });
      if (userInfo.token) {
        localStorage.setItem("token", userInfo.token);
        localStorage.setItem("email", email);
        callback({ email: "", password: "" });
        handleLogIn();
        setLoading(true)
         MainAPI.getFavoriteMovies()
          .then((newMovies) => {
            setFavoritMovies([...newMovies]);
            setLoading(false);
          })
          .catch((err) => {
              setLoading(false);
              console.log(err)
          });
          }
    } catch (err) {
      setStatusError(true);
      handleOpenInfoTooltip();
      console.log(err);
      setLoading(false)
    }
  }

  function handleLogIn() {
    setLoggedIn(true);
  }
  function logOut() {
      setLoggedIn(false);
      localStorage.clear();
  }

    function handleTumblerChange() {
        setShortMovies(!isShortMovies);
  }

  async function handleDislikedMovie(movie) {
      try {
        await MainAPI.deleteMovie(movie.movieId || movie.id);
        getFavoritMovies(promptText)
        getMovies(promptText)
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLikedMovie({country, director, duration, year, description, image, trailerLink, id, imageUrl,
                                     nameRU, nameEN}) {
      try {
      await MainAPI.addMovie({
        country,
        director,
        duration,
        year,
        description,
        image: imageUrl,
        trailerLink,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU,
        nameEN,
      });
      getFavoritMovies(promptText)
      getMovies(promptText)
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateUser({ name, email }) {
    const newUserData = { ...currentUser, name, email };
    MainAPI.updateUserInfo(newUserData)
      .then(() => {
        setCurrentUser(newUserData);
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
                            movies={movies}
                            getMovies={getMovies}
                            isLoading={isLoading}
                            isShortMovies={isShortMovies}
                            handleTumblerChange={handleTumblerChange}
                            handleDislikedMovie={handleDislikedMovie}
                            handleLikedMovie={handleLikedMovie}
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
                          favoritMovies={favoritMovies}
                          getFavoritMovies={getFavoritMovies}
                          isShortMovies={isShortMovies}
                          handleTumblerChange={handleTumblerChange}
                          handleDislikedMovie={handleDislikedMovie}
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
                          isSwitched={isSwitched}
                          handleSwitch={handleSwitch}
                          logOut={logOut}
                          handleUpdateUser={handleUpdateUser}
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
