import React from 'react';

import './MoviesCard.css';
import like from '../../images/like.svg';
import dislike from '../../images/dislike.svg';
import deleteIcon from '../../images/delete.svg';

const MoviesCard = (
    {
        isLike,
        isFavoritMovies,
        nameRU,
        time,
        trailerLink,
        image,
        handleLikedMovie,
        movie,
        handleDislikedMovie
    }
) => {
    const [duration, setDuration] = React.useState("")
    function getDuration(duration) {
        const m = duration % 60;
        const h = (duration-m)/60;
        duration = (h < 10 ? "" : "") + h.toString() + "ч " + (m < 10 ? "0" : "") + m.toString() + "м";
        setDuration(duration)
    }
      React.useEffect(() => {
        getDuration(time)
      }, [duration, time]);

    let icon, alt_like, callback;
    if (isFavoritMovies) {
        icon = deleteIcon;
        alt_like = "Кнопка удаления"
        callback = async () => await handleDislikedMovie(movie)
    } else {
        icon = isLike ? like : dislike
        alt_like = isLike ? "Кнопка лайка" : "Кнопка удаления";
        callback = isLike ? async () => await handleDislikedMovie(movie) : async () => await handleLikedMovie(movie)
    }

    return (
        <article className="movie">
        <a className="movie__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
            <img className="movie__image" src={image} alt={nameRU}/>
        </a>
        <div className="movie__info">
            <figcaption className="movie__figcaption">
                <h2 className="movie__title">{nameRU}</h2>
                <h3 className="movie__duration">{duration}</h3>
            </figcaption>
            <button
                onClick={callback}
                className="movie__like-button"
                name="movie__like-button"
                type="button"
            >
                <img
                    className="movie__like-image"
                    src={icon}
                    alt={alt_like}
                />
            </button>
        </div>
        </article>
    );
};

export default MoviesCard;