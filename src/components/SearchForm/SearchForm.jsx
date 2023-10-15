import React from 'react';
import FilterCheckbox from "../FilterCheckbox";

import "./SearchForm.css"

const SearchForm = ({getMovies, isShortMovies, handleTumblerChange}) => {
    const [searchText, setSearchText] = React.useState("");
      const handleChange = (e) => {
        setSearchText(e.target.value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        getMovies(searchText);
    };
    return (
        <form className="search-form" noValidate="" onSubmit={handleSubmit}>
            <input
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