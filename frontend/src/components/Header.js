import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import logo from '../images/header-logo.svg';

function Header({ onGetButton }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const btn = onGetButton(location.pathname);

  return (
    <header className='header horizontal-aligned-block'>
      <img src={logo} alt='Проект Mesto. Логотип.' className='header__logo' />
      <ul className='header__nav'>
        {currentUser.loggedIn && (
          <li>
            <p className='header__nav-text'>{currentUser.email}</p>
          </li>
        )}
        <li>
          <button className='header__nav-button' onClick={btn.action}>
            {btn.name}
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
