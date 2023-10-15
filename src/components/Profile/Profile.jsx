import React from 'react';
import './Profile.css'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const Profile = ({isSwitched, handleSwitch, logOut, handleUpdateUser}) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

    function onChangeName(e) {
    setName(e.target.value);
  }
    function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
    function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
      name,
      email,
    });
  }

    return (
    <form
        onSubmit={handleSubmit}
        className="profile register"
        noValidate=""
    >
        <h2 className="profile__title">Привет, {name}!</h2>
        <fieldset className="profile__inputs-block">
            <label className="profile__label">
                <p className="profile__placeholder">Имя</p>
                <input
                    onChange={onChangeName || ""}
                    className="profile__input"
                    type="text"
                    name="name"
                    placeholder="ваше имя"
                    required minLength="2"
                    maxLength="30"
                    value={name || ""}
                />
                <span className="register__input-error " id="name-error"></span>
            </label>
            <label className="profile__label">
                <p className="profile__placeholder">E-mail</p>
                <input
                    onChange={handleChangeEmail}
                    className="profile__input"
                    type="email" name="email"
                    placeholder="ваша почта"
                    required
                    pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                    value={email || ""}
                />
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
                <button
                    onClick={logOut}
                    className="profile__signout-button"
                >Выйти из аккаунта</button>
            </a>
            </div>
        }
    </form>
    );
};

export default Profile;