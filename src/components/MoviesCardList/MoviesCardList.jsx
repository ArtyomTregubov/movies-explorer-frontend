import React from 'react';
import MoviesCard from "../MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = ({movies, isFavoritMovies = false, handleLikedMovie=null, handleDislikedMovie}) => {
    return (
        <section className="movies">
            {movies.map((movie) => {
                movie.imageUrl = isFavoritMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`
                const id = isFavoritMovies ? movie.movieId : movie.id;
              return (
                <MoviesCard
                    key={id}
                    nameRU={movie.nameRU}
                    time={movie.duration}
                    trailerLink={movie.trailerLink}
                    image={movie.imageUrl}
                    isFavoritMovies={isFavoritMovies}
                    handleLikedMovie={handleLikedMovie}
                    handleDislikedMovie={handleDislikedMovie}
                    movie={movie}
                    isLike={movie.isLike}
                />
              );
            })}
        </section>
    );
};

export default MoviesCardList;