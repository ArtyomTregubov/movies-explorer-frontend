import React from 'react';
import "./Header.css"
import logo from "../../images/logo.svg";
import logoAccount from "../../images/accountLogo.svg";
const Header = ({ loggedIn = true } ) => {
    return (
        (loggedIn ?
        <header className="header_autorized">
                <a className="header__logo-link" href="#">
                    <img className="header__logo" src={logo} alt="Логотип"/>
                </a>
                <div className="header__navigation">
                    <nav className="navigation">
                        <div className="navigation__links-movies">
                            <a className="navigation__link navigation__link-movies" href="/movies">Фильмы</a>
                            <a className="navigation__link" href="/saved-movies">Сохранённые фильмы</a>
                        </div>
                        <div className="navigation__links-account">
                            <a className="navigation__account-button navigation__link" href="/profile">Аккаунт
                                <button className="navigation__account-logo">
                                    <img src={logoAccount} alt="Логотип аккаунта"/>
                                </button>
                            </a>
                            <button className="navigation__account-burger"></button>
                        </div>
                    </nav>
                </div>
            </header>
                :
        <header class="header">
            <a class="header__logo-link" href="#">
                <img class="header__logo" src={logo} alt="Логотип"/>
            </a>
            <div class="header__button-block">
                <a class="header__link" href="/signup">Регистрация</a>
                <a class="header__button" href="/signin">Войти</a>
            </div>
        </header>
        )
    );
};

export default Header;