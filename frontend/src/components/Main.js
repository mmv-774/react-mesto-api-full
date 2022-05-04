import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile horizontal-aligned-block'>
        <div className='profile__avatar-overlay'>
          <img className='profile__avatar' src={`${currentUser.avatar}`} alt='Аватар пользователя.' />
          <button className='profile__btn profile__btn_action_avatar-edit' onClick={onEditAvatar}></button>
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser.name}</h1>
          <button
            type='button'
            className='profile__btn profile__btn_action_edit animated-element'
            onClick={onEditProfile}
          ></button>
          <p className='profile__subtitle'>{currentUser.about}</p>
        </div>
        <button
          type='button'
          className='profile__btn profile__btn_action_add animated-element'
          onClick={onAddPlace}
        ></button>
      </section>
      <div className='cards horizontal-aligned-block'>
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={card._id}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
