import React from 'react';
import SearchForm from "../SearchForm";
// import Preloader from "../Preloader";
import MoviesCardList from "../MoviesCardList";

import "./Movies.css"

const Movies = () => {
    return (
        <div className="movies-explorer">
            <SearchForm />
            {/*<Preloader/>*/}
            <MoviesCardList/>
            <section className="more-click">
                <button className="more-click__button" type="button">Ещё</button>
            </section>
        </div>
    );
};

export default Movies;