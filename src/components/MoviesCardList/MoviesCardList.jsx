import React from 'react';
import MoviesCard from "../MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = ({isLike}) => {
    return (
        <section className="movies">
            <MoviesCard isLike={isLike}/>
            <MoviesCard isLike={isLike}/>
            <MoviesCard isLike={isLike}/>
            <MoviesCard isLike={isLike}/>
            <MoviesCard isLike={isLike}/>
            <MoviesCard isLike={isLike}/>
            <MoviesCard isLike={isLike}/>
        </section>
    );
};

export default MoviesCardList;