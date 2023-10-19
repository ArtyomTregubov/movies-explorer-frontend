import React from 'react';
import FilterCheckbox from "../FilterCheckbox";
import { useLocation } from 'react-router-dom';
import "./SearchForm.css"


const SearchForm = ({getMovies}) => {
    const [searchText, setSearchText] = React.useState("");
    const [isShortMovies, setShortMovies] = React.useState(null);
    const location = useLocation();

      React.useEffect(() => {
          const searchText = location.pathname === '/movies'
            ? localStorage.getItem("searchMovie")
            : localStorage.getItem("searchFavoriteMovie")
          if (searchText) setSearchText(searchText)
    },[]);

      React.useEffect(() => {
          const isShortMovies = location.pathname === '/movies'
            ? localStorage.getItem("isShortMovies")
            : localStorage.getItem("isShortMoviesFavorite")
          if (isShortMovies) setShortMovies(isShortMovies === "true")
    },[]);

    function handleTumblerChange(){
      localStorage.setItem(location.pathname === '/movies' ? "isShortMovies" : "isShortMoviesFavorite", !isShortMovies)
      setShortMovies(!isShortMovies);
    }
      const handleChange = (e) => {
          setSearchText(e.target.value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (location.pathname === '/movies') {
            localStorage.setItem("searchMovie", searchText)
        } else {
          localStorage.setItem("searchFavoriteMovie", searchText)
        }
        await getMovies(searchText);
    };
    return (
        <form className="search-form" noValidate="" onSubmit={handleSubmit}>
            <input
                value={searchText || ""}
                onChange={handleChange}
                type="text"
                className="search-form__input"
                placeholder="Фильм"
                name="searchText"
                style={{padding: 0}}
            />
            <FilterCheckbox isShortMovies={isShortMovies} handleTumblerChange={handleTumblerChange}/>
            <span className="search-form__error"></span>
            <button type="submit" className="search-form__button">Найти</button>
        </form>
    );
};

export default SearchForm;