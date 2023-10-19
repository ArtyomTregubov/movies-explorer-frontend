import React from 'react';
import SearchForm from "../SearchForm";
import Preloader from "../Preloader";
import MoviesCardList from "../MoviesCardList";
import "./Movies.css"
import {MOVIES_COUNT_ON_PAGE, SHORT_MOVIE_DURATION_40} from "../../utils/const";

const Movies = ({handleSetFavoritMovie, movies, setMovies, favoriteMovies, isLoading, getMovies,
                moviesShowed, setMoviesShowed}) => {

    const [moviesCount, setMoviesCount] = React.useState([]);

    const [isNotFound, setNotFound] = React.useState(false);

    React.useEffect(() => {
      setMoviesCount(getMoviesCount());
      const handlerResize = () => setMoviesCount(getMoviesCount());
      window.addEventListener('resize', handlerResize);

      return () => {
        window.removeEventListener('resize', handlerResize);
      };
    }, []);

    function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    Object.keys(MOVIES_COUNT_ON_PAGE)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth >= +key) {
          countCards = MOVIES_COUNT_ON_PAGE[key];
        }
      });

    return countCards;
  }
    function handleMore() {
    const spliceMovies = movies;
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, moviesCount[0]));
    setMoviesShowed(newMoviesShowed);
    setMovies(spliceMovies);
  }

    async function getFilteredMovies(text){

        if(!text) return;
          setNotFound(false)
          await getMovies();
          let movies = JSON.parse(localStorage.getItem('movies'));
          movies = movies.filter((movie) => {
            const condition = localStorage.getItem("isShortMovies") === "true";
             if (condition) {
               const textRU = movie.nameRU.toLowerCase().includes(text);
               const textEN = movie.nameEN.toLowerCase().includes(text);
               const time = movie.duration <= SHORT_MOVIE_DURATION_40;
               return (textRU || textEN) && time;
             }
             return movie.nameRU.toLowerCase().includes(text) || movie.nameEN.toLowerCase().includes(text);
         });
          if (movies.length === 0) {
            setNotFound(true)
            return;
          }
          if (movies.length <= moviesCount[0]){
            setMovies([...new Set(movies)]);
            setMoviesShowed([...new Set(movies)]);
          return;
          }

          const spliceMovies = movies;
          const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, moviesCount[0]));
          setMovies([...new Set(spliceMovies)]);
          setMoviesShowed([...new Set(newMoviesShowed)]);
    }

    return (
        <main className="movies-explorer">
            <SearchForm
                getMovies={getFilteredMovies}
            />
            {isLoading && <Preloader />}
          {isNotFound ? <span style={{alignSelf: "center", fontSize: "18px", fontFamily: "'Inter', 'Arial', sans-serif"}}>Ничего не найдено</span>
            : <MoviesCardList
                    movies={moviesShowed}
                    handleSetFavoritMovie={handleSetFavoritMovie}
                    favoriteMovies={favoriteMovies}
                />}
                {!isLoading && movies.length ?
                    <section className="more-click">
                    <button
                      onClick={handleMore}
                      className="more-click__button"
                      type="button"
                    >Ещё</button>
                </section> : ""}


        </main>
    );
};

export default Movies;