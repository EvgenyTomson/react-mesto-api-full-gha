import PopupWithForm from "./PopupWithForm";

function DeleteOwnCardPopup({isOpen, onClose, onCardDelete, cardToDelete, isLoading}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём удаляемую карточку во внешний обработчик
    onCardDelete(cardToDelete);
  }

  return (
    <PopupWithForm
      name='deleteOwnCardPopup'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      isValid={true}
      // дополнительный класс для заголовка попапа, т.к. в макете другой отступ у данного попапа
      extraTitleClass="popup__title_type_delete"
    />
  )
}

export default DeleteOwnCardPopup;
