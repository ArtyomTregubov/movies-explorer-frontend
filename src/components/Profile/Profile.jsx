import React from 'react';
import './Profile.css'
const Profile = () => {
    return (
    <form className="profile register" noValidate="">
        <h2 className="profile__title">Привет, Иван Иванов!</h2>
        <fieldset className="profile__inputs-block">
            <label className="profile__label">
                <p className="profile__placeholder">Имя</p>
                <input className="profile__input" type="text" name="name" placeholder="Ваше имя" required="" minLength="2" maxLength="30" pattern="^[A-Za-zА-Яа-яЁё\-\s]+$" value="Иван Иванов"/>
                <span className="register__input-error " id="name-error"></span>
            </label>
            <label className="profile__label">
                <p className="profile__placeholder">E-mail</p>
                <input className="profile__input" type="email" name="email" placeholder="Ваш email" required="" pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$" value="Ivanov@mail.ru"/>
                <span className="register__input-error " id="email-error"></span>
            </label>
        </fieldset>
        <div className="profile__buttons-block">
            <p className="register__error profile__error"></p>
            <button className="profile__edit-button profile__edit-button_disabled" type="submit" disabled="">Редактировать</button>
            <a href="#">
                <button className="profile__signout-button">Выйти из аккаунта</button>
            </a>
        </div>
    </form>
    );
};

export default Profile;