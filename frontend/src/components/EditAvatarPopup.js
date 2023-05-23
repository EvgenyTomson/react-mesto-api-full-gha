import { useRef } from "react";
import { defaultInputClassName, errorInputClassName } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation();

  // используем реф из-за требования брифа
  const avatar = useRef(null);

  // Переопределяем функцию закрытия попапа, чтобы перед закрытием сбросить ошибки валидации
  const onFormClose = () => {
    resetForm();
    onClose();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatar.current.value);
    avatar.current.value = '';
    resetForm();
  }

  return (
    <PopupWithForm
      name='editAvatarPopup'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onFormClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Схранение...' : 'Сохранить'}
      isValid={isValid}
    >
      <label htmlFor="avatarLink" className="popup__field">
        <input
          ref={avatar}
          type="url"
          className={inputVilidities.avatar === undefined || inputVilidities.avatar ? defaultInputClassName : errorInputClassName}
          id="avatarLink"
          name="avatar"
          required
          autoComplete="off"
          placeholder="Ссылка на аватар"
          onChange={handleChange}
          value={values.avatar || ''}
        />
        <span className="popup__error avatarLink-error" >{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
