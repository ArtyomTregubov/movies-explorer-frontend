import React from 'react';
import FilterCheckbox from "../FilterCheckbox";

import "./SearchForm.css"

const SearchForm = () => {
    return (
        <form className="search-form" noValidate="">
            <input type="text" className="search-form__input" placeholder="Фильм" name="searchText" required="" value=""/>
            <FilterCheckbox/>
            <span className="search-form__error"></span>
            <button type="submit" className="search-form__button">Найти</button>
        </form>
    );
};

export default SearchForm;