import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { defaultInputClassName, errorInputClassName } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation(true);

  // Переопределяем функцию закрытия попапа, чтобы перед закрытием сбросить ошибки валидации
  const onFormClose = () => {
    resetForm(true);
    onClose();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    resetForm(true, {name: currentUser.name, about: currentUser.about});
  }, [currentUser, isOpen, resetForm]);

  return (
    <PopupWithForm
      name='profileEditPopup'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onFormClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isValid}
    >
      <label htmlFor="inputName" className="popup__field">
        <input
          type="text"
          className={inputVilidities.name === undefined || inputVilidities.name ? defaultInputClassName : errorInputClassName}
          name="name"
          required
          autoComplete="off"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="popup__error" >{errors.name}</span>
      </label>
      <label htmlFor="inputJob" className="popup__field">
        <input
          type="text"
          className={inputVilidities.about === undefined || inputVilidities.about ? defaultInputClassName : errorInputClassName}
          name="about"
          required
          autoComplete="off"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values.about || ''}
        />
        <span className="popup__error inputJob-error" >{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
