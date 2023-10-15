import React from 'react';
import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";

const SavedMovies = ({favoritMovies, getFavoritMovies, isShortMovies, handleTumblerChange, handleDislikedMovie}) => {
    return (
        <main className="movies-explorer">
            <SearchForm
                getMovies={getFavoritMovies}
                isShortMovies={isShortMovies}
                handleTumblerChange={handleTumblerChange}/>
            <MoviesCardList
                movies={favoritMovies}
                isFavoritMovies={true}
                handleDislikedMovie={handleDislikedMovie}
            />
        </main>
    );
};

export default SavedMovies;