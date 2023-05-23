import { defaultRegisterInputClassName, errorRegisterInputClassName } from "../utils/constants";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function Login({onLogin}) {

  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
    resetForm();
  }

  return (
    <section className="register">
      <form action="#" className="register__form" name="login" noValidate onSubmit={handleSubmit} >
        <h2 className="register__title">Вход</h2>
        <label htmlFor="email" className="register__field">
          <input
            type="email"
            className={inputVilidities.email === undefined || inputVilidities.email ? defaultRegisterInputClassName : errorRegisterInputClassName}
            name="email"
            required
            autoComplete="off"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
          />
          <span className="register__error" >{errors.email}</span>
        </label>
        <label htmlFor="password" className="register__field">
          <input
            type="password"
            className={inputVilidities.password === undefined || inputVilidities.password ? defaultRegisterInputClassName : errorRegisterInputClassName}
            name="password"
            required
            autoComplete="off"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className="register__error" >{errors.password}</span>
        </label>
        <button
          className={isValid ? "register__submit": "register__submit register__submit_disabled"}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </section>
  )
}

export default Login;
