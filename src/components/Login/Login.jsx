import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg'
const Login = () => {
    return (
        <div className="register">
            <section className="register__section">
                <a className="register__logo-link" href="/">
                    <img className="register__logo" src={logo} alt="Логотип"/>
                </a>
                <h2 className="register__title">Рады видеть!</h2>
                <form className="register__form" noValidate="">
                    <fieldset className="register__inputs-block">
                        <label className="register__label">
                            <p className="register__placeholder">E-mail</p>
                            <input className="register__input register__input-email" type="email" name="email" placeholder="ваша почта" required pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$" value="pochta@yandex.ru"/>
                            <span className="register__input-error " id="email-error"></span>
                        </label>
                        <label className="register__label">
                            <p className="register__placeholder">Пароль</p>
                            <input className="register__input register__input-password" type="password" name="password" placeholder="" required value=""/>
                            <span className="register__input-error " id="password-error"></span>
                        </label>
                    </fieldset>
                    <div className="register__buttons-block">
                        <p className="register__error"></p>
                        <button className="register__submit-button" type="submit" disabled="">Войти</button>
                        <div className="register__link-block">
                            <p className="register__link register__link-text">Ещё не зарегистрированы?</p>
                            <a className="register__link" href="/signup">Зарегистироваться</a>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;