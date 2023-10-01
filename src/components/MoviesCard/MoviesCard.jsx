import React from 'react';

import './MoviesCard.css'
import likeRed from '../../images/likeRed.svg'

const MoviesCard = () => {
    return (
        <article className="movie">
        <a className="movie__trailer-link" href="https://www.youtube.com/watch?v=UXcqcdYABFw" target="_blank" rel="noreferrer">
            <img className="movie__image" src="https://api.nomoreparties.co/uploads/stones_in_exile_b2f1b8f4b7.jpeg" alt="«Роллинг Стоунз» в изгнании"/>
        </a>
        <div className="movie__info">
            <figcaption className="movie__figcaption">
                <h2 className="movie__title">«Роллинг Стоунз» в изгнании</h2>
                <h3 className="movie__duration">1ч 1м</h3>
            </figcaption>
            <button className="movie__like-button" name="movie__like-button" type="button">
                <img className="movie__like-image" src={likeRed} alt="Кнопка лайка"/>
            </button>
        </div>
        </article>
    );
};

export default MoviesCard;