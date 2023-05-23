import { Link, Route, Routes } from 'react-router-dom';
import logo from '../img/logo.svg';
import { useState } from 'react';

function Header({signOut, currentEmail}) {

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const handleBurgerClick = () => {
    setIsBurgerOpened(!isBurgerOpened);
  }

  const handleLogout = () => {
    setIsBurgerOpened(false);
    signOut();
  }

  return (
    <header className={isBurgerOpened ? "header header_type_burger" : "header"}>
      <div className={isBurgerOpened ? "header__wrapper header__wrapper_burger" : "header__wrapper"}>
        <img src={logo} alt=" Логотип Место." className="header__logo" />
        <Routes>
          <Route
            path='/'
            element={
              <button
                className={isBurgerOpened ? "header__burger header__burger_opened" : "header__burger"}
                onClick={handleBurgerClick}
              >
              </button>
            }
          />
          <Route path='/*' element={null} />
        </Routes>
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <div className={isBurgerOpened ? "header__menu header__menu_active" : "header__menu"}>
              <span className="header__email">
                {currentEmail}
              </span>
              <button
                className="header__logout"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          }
        />
        <Route path='/sign-in' element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
        <Route path='/sign-up' element={<Link to="/sign-in" className="header__link">Вoйти</Link>} />
      </Routes>
    </header>
  )
};

export default Header;
