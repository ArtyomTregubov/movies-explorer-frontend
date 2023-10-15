import React from 'react';
import SearchForm from "../SearchForm";
import Preloader from "../Preloader";
import MoviesCardList from "../MoviesCardList";

import "./Movies.css"

const Movies = ({movies, getMovies, isLoading, isShortMovies, handleTumblerChange, handleDislikedMovie, handleLikedMovie}) => {
    return (
        (isLoading ?
            <div className="movies-explorer">
                <SearchForm getMovies={getMovies} isShortMovies={isShortMovies} handleTumblerChange={handleTumblerChange}/>
                <Preloader/>
            </div> :
            <div className="movies-explorer">
                <SearchForm getMovies={getMovies} isShortMovies={isShortMovies} handleTumblerChange={handleTumblerChange}/>
                <MoviesCardList
                    movies={movies}
                    handleDislikedMovie={handleDislikedMovie}
                    handleLikedMovie={handleLikedMovie}
                />
                {movies.length ?
                    <section className="more-click">
                    <button className="more-click__button" type="button">Ещё</button>
                </section> : ""
                }
        </div>)
    );
};

export default Movies;