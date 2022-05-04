import { useState, useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoToolTip from './InfoTooltip.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/api.js';
import { handleResponse } from '../utils/utils.js';
import { register, authorize, tokenCheck } from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipProps, setInfoTooltipProps] = useState({});

  const history = useHistory();

  useEffect(() => {
    handleResponse(api.getUserInfo(), (res) => setCurrentUser(res));
  }, []);

  useEffect(() => {
    handleResponse(api.getCards(), (res) => setCards(res));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      handleResponse(tokenCheck(jwt), (res) => {
        setLoggedIn(true);
        setCurrentUserEmail(res.data.email);
      });
    }
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleUpdateUser(executor) {
    handleResponse(executor, (res) => {
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleUpdateUserInfo(userInfo) {
    handleUpdateUser(api.patchUserInfo(userInfo));
  }

  function handleUpdateUserAvatar({ avatar }) {
    handleUpdateUser(api.patchAvatar(avatar));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    handleResponse(api.setLike(card._id, isLiked), (res) => {
      setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
    });
  }

  function handleCardDelete(card) {
    handleResponse(api.deleteCard(card._id), () => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleAddPlace(card) {
    handleResponse(api.postNewCard(card), (res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    });
  }

  function handleRegister({ email, password }) {
    return register(email, password)
      .then((res) => {
        setInfoTooltipProps({ isSuccess: true, message: 'Вы успешно зарегистрировались!' });
        history.push('/sign-in');
      })
      .catch((error) => {
        setInfoTooltipProps({ isSuccess: false, message: error });
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleLogin({ email, password }) {
    return authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setCurrentUserEmail(email);
        }
      })
      .catch((error) => {
        setInfoTooltipProps({ isSuccess: false, message: error });
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function getHeaderButton(location) {
    switch (location) {
      case '/sign-in':
        return {
          name: 'Регистрация',
          action: () => history.push('/sign-up'),
        };
      case '/sign-up':
        return {
          name: 'Войти',
          action: () => history.push('/sign-in'),
        };
      default:
        return {
          name: 'Выйти',
          action: () => signOut(),
        };
    }
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={{ ...currentUser, email: currentUserEmail, loggedIn }}>
        <Header onGetButton={getHeaderButton} />
        <Switch>
          <ProtectedRoute exact path='/' redirectPath='/sign-in' redirectCondition={!loggedIn}>
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUserInfo}
            />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateUserAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </ProtectedRoute>
          <ProtectedRoute exact path='/sign-in' redirectPath='/' redirectCondition={loggedIn}>
            <Login title='Вход' submitCaption='Войти' onSubmit={handleLogin} />
          </ProtectedRoute>
          <ProtectedRoute exact path='/sign-up' redirectPath='/' redirectCondition={loggedIn}>
            <Register title='Регистрация' submitCaption='Зарегистрироваться' onSubmit={handleRegister} />
          </ProtectedRoute>
        </Switch>
        <InfoToolTip
          isSuccess={infoTooltipProps.isSuccess}
          message={infoTooltipProps.message}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        ></InfoToolTip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
