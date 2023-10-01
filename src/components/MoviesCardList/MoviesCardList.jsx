import React, {Children} from 'react';
import MoviesCard from "../MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = () => {
    return (
        <section className="movies">
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
            <MoviesCard/>
        </section>
    );
};

export default MoviesCardList;