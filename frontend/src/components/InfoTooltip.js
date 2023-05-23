import successImage from '../img/success.png';
import failImage from '../img/fail.png';
import { useEscapeClosePopup } from '../hooks/useEscapeClosePopup';

function InfoTooltip({isSuccess, isOpen, onClose, tootipMessage}) {

  const handleOnClick = (evt) => {
    const className = evt.target.className;
    if(className.includes('popup_opened') || className.includes('popup__close')) {
      onClose();
    }
  }

  useEscapeClosePopup([isOpen, onClose]);

  return (
    <div
      className={isOpen ? "popup popup_opened" : "popup"}
      onClick={handleOnClick}
    >
      <div className="popup__container">
        <div className="popup__form popup__form_type_tooltip">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно редактирования"
          />
          <img
            className="popup__tooltipImage"
            src={isSuccess ? successImage : failImage}
            alt={isSuccess ? "Успех" : "Ошибка"}
          />
          <h2 className={"popup__title popup__title_type_tooltip"}>
            {tootipMessage}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;
