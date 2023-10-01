import React from 'react';

import "./FilterCheckbox.css"

const FilterCheckbox = () => {
    return (
        <>
            <label className="search-form__checkbox checkbox">
                <input type="checkbox" className="checkbox__system-checkbox" name="areShortiesSeleted"/>
                <span className="checkbox__custom-checkbox"></span>
                <span className="checkbox__label">Короткометражки</span>
            </label>
        </>
    );
};

export default FilterCheckbox;