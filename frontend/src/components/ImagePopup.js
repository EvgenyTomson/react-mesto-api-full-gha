import { useEscapeClosePopup } from "../hooks/useEscapeClosePopup";

function ImagePopup({card, onClose, isOpen, onTansitionEnd}) {

  const handleOnClick = (evt) => {
    const className = evt.target.className;
    if(className.includes('popup_opened') || className.includes('popup__close')) {
      onClose();
    }
  }

  useEscapeClosePopup([isOpen, onClose]);

  return (
    <div
      className={isOpen ? "popup popup_type_big popup_opened" : "popup popup_type_big"} id="viewImagePopup"
      onClick={handleOnClick}
      onTransitionEnd={(evt) => {
        if ( !isOpen && evt.target === evt.currentTarget && evt.propertyName === 'opacity' ) onTansitionEnd();
      }}
    >
      <div className="popup__container popup__container_type_big">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно"
          />
          <figure className="popup__figure">
            <img src={card && card.link } alt={card && card.name} className="popup__image" />
            <figcaption className="popup__caption">{card && card.name}</figcaption>
          </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
