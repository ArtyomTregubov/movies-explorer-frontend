import React from 'react';
import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";

const SavedMovies = () => {
    return (
        <main className="movies-explorer">
            <SearchForm />
            <MoviesCardList isLike={false}/>
        </main>
    );
};

export default SavedMovies;