import React from 'react';
import './Profile.css'
const Profile = ({isSwitched, handleSwitch}) => {

    return (
    <form className="profile register" noValidate="">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <fieldset className="profile__inputs-block">
            <label className="profile__label">
                <p className="profile__placeholder">Имя</p>
                <input className="profile__input" type="text" name="name" placeholder="ваше имя" required="" minLength="2" maxLength="30" pattern="^[A-Za-zА-Яа-яЁё\-\s]+$" value="Виталий"/>
                <span className="register__input-error " id="name-error"></span>
            </label>
            <label className="profile__label">
                <p className="profile__placeholder">E-mail</p>
                <input className="profile__input" type="email" name="email" placeholder="ваша почта" required="" pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$" value="pochta@yandex.ru"/>
                <span className="register__input-error " id="email-error"></span>
            </label>
        </fieldset>
        {
            isSwitched
                ?
            <div className="save__buttons-block">
                <p className="save__error"></p>
                <button className="save__submit-button" type="submit" disabled="">Сохранить</button>
            </div>
                :
            <div className="profile__buttons-block">
            <p className="register__error profile__error"></p>
                <button className="profile__edit-button profile__edit-button_disabled" type="button" disabled="" onClick={handleSwitch}>Редактировать</button>
            <a href="/">
                <button className="profile__signout-button">Выйти из аккаунта</button>
            </a>
            </div>
        }
    </form>
    );
};

export default Profile;