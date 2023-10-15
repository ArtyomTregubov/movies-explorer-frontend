import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg'
const Login = ({onLogin}) => {

    const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
          return;
        }
        await onLogin(formValue.password, formValue.email, setFormValue);
    };

    return (
        <div className="register">
            <section className="register__section">
                <a className="register__logo-link" href="/">
                    <img className="register__logo" src={logo} alt="Логотип"/>
                </a>
                <h2 className="register__title">Рады видеть!</h2>
                <form
                    onSubmit={handleSubmit}
                    className="register__form"
                    noValidate=""
                >
                    <fieldset className="register__inputs-block">
                        <label className="register__label">
                            <p className="register__placeholder">E-mail</p>
                            <input
                                value={formValue.email}
                                onChange={handleChange}
                                className="register__input register__input-email"
                                type="email"
                                name="email"
                                placeholder="ваша почта"
                                required pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                            />
                            <span className="register__input-error " id="email-error"></span>
                        </label>
                        <label className="register__label">
                            <p className="register__placeholder">Пароль</p>
                            <input
                                value={formValue.password}
                                onChange={handleChange}
                                className="register__input register__input-password"
                                type="password"
                                name="password"
                                placeholder=""
                                required
                            />
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