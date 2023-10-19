import React from 'react';
import MoviesCard from "../MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = ({movies, favoriteMovies, isFavoritMovies = false, handleSetFavoritMovie}) => {
    return (
        <section className="movies">
            {movies.map((movie) => {
                movie.imageUrl = `https://api.nomoreparties.co${movie.image.url}`
                const id = movie.id;
                movie.isLike= movie.isLike || false;
              return (
                <MoviesCard
                    key={id}
                    nameRU={movie.nameRU}
                    time={movie.duration}
                    trailerLink={movie.trailerLink}
                    image={movie.imageUrl}
                    isFavoritMovies={isFavoritMovies}
                    handleSetFavoritMovie={handleSetFavoritMovie}
                    movie={movie}
                    favoriteMovies={favoriteMovies}
                />
              );
            })}
        </section>
    );
};

export default MoviesCardList;