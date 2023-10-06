import React from 'react';

import "./FilterCheckbox.css"

const FilterCheckbox = () => {
    const [isShortMovies, setShortMovies] = React.useState(true);
    function handleTumblerChange() {
        const isChecked = !isShortMovies;
        setShortMovies(isChecked);
  }
    return (
        <>
            <label className="search-form__checkbox checkbox" onChange={handleTumblerChange}>
                <input type="checkbox" className="checkbox__system-checkbox" name="areShortiesSeleted" checked={false}/>
                <span className={isShortMovies ? `checkbox__custom-checkbox checkbox__custom-checkbox--on`
                    : `checkbox__custom-checkbox checkbox__custom-checkbox--off`}></span>
                <span className="checkbox__label">Короткометражки</span>
            </label>
        </>
    );
};

export default FilterCheckbox;