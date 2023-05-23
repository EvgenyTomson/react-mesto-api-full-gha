import { defaultInputClassName, errorInputClassName } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const { values, handleChange, errors, isValid, resetForm, inputVilidities } = useFormWithValidation();

  // Переопределяем функцию закрытия попапа, чтобы перед закрытием сбросить ошибки валидации
  const onFormClose = () => {
    resetForm();
    onClose();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace(values);
    resetForm();
  }

  return (
    <PopupWithForm
      name='newPlacePopup'
      title='Новое место'
      isOpen={isOpen}
      onClose={onFormClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isValid}
    >
      <label htmlFor="placeName" className="popup__field">
        <input
          type="text"
          className={inputVilidities.name === undefined || inputVilidities.name ? defaultInputClassName : errorInputClassName}
          name="name"
          required
          autoComplete="off"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="popup__error placeName-error" >{errors.name}</span>
      </label>
      <label htmlFor="placeLink" className="popup__field">
        <input
          type="url"
          className={inputVilidities.link === undefined || inputVilidities.link ? defaultInputClassName : errorInputClassName}
          name="link"
          required
          autoComplete="off"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={values.link || ''}
        />
        <span className="popup__error placeLink-error" >{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
