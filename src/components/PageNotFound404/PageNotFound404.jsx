import React from 'react';
import './PageNotFound404.css';
const PageNotFound404 = () => {
    return (
        <div className="notFound">
            <h2 className="notFound__text">404</h2>
            <h3 className="notFound__message">Страница не найдена</h3>
            <a className="notFound__link" href="/">Назад</a>
        </div>
    );
};

export default PageNotFound404;