import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import deleteIcon from '../../images/delete.svg';

const MoviesCard = (
    {
        isFavoritMovies,
        nameRU,
        time,
        trailerLink,
        image,
        movie,
        handleSetFavoritMovie,
        favoriteMovies
    }
) => {
    const { pathname } = useLocation();
    const [favorite, setFavorite] = useState(false);
    function getDuration(mins) {
        return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
    }

      useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedFilm = favoriteMovies.filter((obj) => {
        return obj.movieId == movie.id || obj.id == movie.id;
      });
      if (savedFilm.length > 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [pathname, favoriteMovies, movie.id]);


    return (
        <article className="movie">
        <a className="movie__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
            <img className="movie__image" src={image} alt={nameRU}/>
        </a>
        <div className="movie__info">
            <figcaption className="movie__figcaption">
                <h2 className="movie__title">{nameRU}</h2>
                <h3 className="movie__duration">{getDuration(time)}</h3>
            </figcaption>
            <button
                onClick={isFavoritMovies ? async () => {
                  await handleSetFavoritMovie(movie, false)
                }
                  : async () => {
                  await handleSetFavoritMovie(movie, !favorite) }
            }
                className="movie__like-button"
                name="movie__like-button"
                type="button"
            >
                <img
                    className="movie__like-image"
                    src={pathname !== '/saved-movies' ? favorite ? like : dislike : deleteIcon}
                    alt={pathname !== '/saved-movies' ? favorite ? "Кнопка лайка" : "Кнопка удаления" : "Кнопка удаления"}
                />
            </button>
        </div>
        </article>
    );
};

export default MoviesCard;