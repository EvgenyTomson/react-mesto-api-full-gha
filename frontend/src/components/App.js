import { useEffect, useState } from "react";
import { CurrentUserContext, initialUserData } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import DeleteOwnCardPopup from "./DeleteOwnCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import LoaderPopup from "./LoaderPopup";
import Main from "./Main";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState(initialUserData);
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // Показываем лоадер во время загрузки первоначальных данных с сервера:
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isNewCardLoading, setIsNewCardLoading] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tootipMessage, setTootipMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(loggedIn && currentEmail) {
      setIsLoaderOpen(true);
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, initialCardsData]) => {
          setCurrentUser(userData);
          setCards(initialCardsData);
        })
        .catch(err => console.error(err))
        .finally(() => {
          setIsLoaderOpen(false);
        }
      )
    }
  },[loggedIn, currentEmail]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleUpdateUser = (userData) => {
    setIsProfileLoading(true);
    api.editUserData(userData)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsProfileLoading(false);
      })
  };

  const handleUpdateAvatar = (avatarUrl) => {
    setIsAvatarLoading(true);
    api.editUserAvatar(avatarUrl)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsAvatarLoading(false);
      })
  };

  // Карточки:
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleOnTransitionEnd = () => {
    setSelectedCard(null);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(id => id === currentUser._id);
    api.toggleCardLikeStatus(card._id, isLiked)
      .then((updatedCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map(c => c._id === card._id ? updatedCard : c);
        setCards(newCards);
      })
      .catch(error => {
        console.error(error);
      })
  };

  const handleCardDelete = (card) => {
    setIsDeleteLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, исключая из него удаляемую карточку
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsDeleteLoading(false);
      })
  };

  const handleAddPlaceSubmit = (cardData) => {
    setIsNewCardLoading(true);
    api.addNewCard(cardData)
      .then(updatedCardData => {
        setCards([updatedCardData, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsNewCardLoading(false);
      })
  };

  // попап удаления карточки:
  const openDeletePopup = (card) => {
    setCardToDelete(card);
    setIsDeletePopupOpen(true);
  }

  const onUserLogin = (email) => {
    setLoggedIn(true);
    setCurrentEmail(email);
    navigate("/", {replace: true});
  }

  const tokenCheck = () => {
    const id = localStorage.getItem('token');

    if(id) {
      auth.reEnter()
        .then((data) => {
          onUserLogin(data.email);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  const showErrorTooltip = () => {
    setIsRegistrationSuccess(false);
    setTootipMessage('Что-то пошло не так! Попробуйте ещё раз.');
    setIsTooltipOpen(true);
  };

  const onLogin = (formData) => {
    setIsLoaderOpen(true);
    auth.signin(formData)
      .then((data) => {
        if (data._id) {
          localStorage.setItem('token', data._id);
          onUserLogin(formData.email);
        }
      })
      .catch((error) => {
        console.error(error);
        showErrorTooltip();
      })
      .finally(() => {
        setIsLoaderOpen(false);
      })
  };

  const signOut = () => {
    auth.logoutUser()
    .then(() => {
      localStorage.removeItem('token');
      setCurrentEmail('');
      navigate("/sign-in", {replace: true});
    })
    .catch((error) => {
      console.error(error);
      showErrorTooltip();
    })
  }

  const handleRegister = (formData) => {
    setIsLoaderOpen(true);
    auth.signup(formData)
      .then(() => {
        setIsRegistrationSuccess(true);
        setTootipMessage('Вы успешно зарегистрировались!');
        setIsTooltipOpen(true);
      })
      .catch((error) => {
        console.error(error);
        showErrorTooltip();
      })
      .finally(() => {
        setIsLoaderOpen(false);
      })
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
    isRegistrationSuccess && navigate("/sign-in", {replace: true});
    setIsRegistrationSuccess(false);
    setTootipMessage('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header signOut={signOut} currentEmail={currentEmail} />

        <Routes>
          <Route path="/"
            element={<ProtectedRoute
              element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={openDeletePopup}
                />
              }
              loggedIn={loggedIn}
            />}
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>

        <Footer />

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isProfileLoading}
        />

        {/* Попап добавления нового места */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isNewCardLoading}
        />

        {/* Попап изменения аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isAvatarLoading}
        />

        {/* Попап подтверждения удаления карточки: */}
        <DeleteOwnCardPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          cardToDelete={cardToDelete}
          isLoading={isDeleteLoading}
        />

        {/* Попап показа изображения из карточки */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          onTansitionEnd={handleOnTransitionEnd}
        />

        {/* Попап результатов регистрации / логина */}
        <InfoTooltip
          isSuccess={isRegistrationSuccess}
          isOpen={isTooltipOpen}
          onClose={closeTooltip}
          tootipMessage={tootipMessage}
        />

        {/* Попап индикатора загрузки */}
        <LoaderPopup
          isOpen={isLoaderOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
