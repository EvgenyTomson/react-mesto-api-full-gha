import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
  // const isLiked = card.likes.some(i => i._id === currentUser._id);
  const isLiked = card.likes.some(id => id === currentUser._id);

  // Открытие попапа с картинкой:
  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {isOwn && <button className="card__delete" type="button" aria-label="Удалить карточку" onClick={handleDeleteClick} />}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button
            className={isLiked ? "card__like card__like_active" : "card__like"}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;
