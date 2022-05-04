import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className='card'>
      <img className='card__photo' src={card.link} alt={card.name} onClick={handleClick} />
      <button type='button' className='card__btn card__btn_action_delete' hidden={!isOwn} onClick={handleDeleteClick} />
      <div className='card__description'>
        <h3 className='card__title'>{card.name}</h3>
        <div className='card__like-container'>
          <button
            type='button'
            className={`card__btn card__btn_action_like ${isLiked && 'card__btn_active_like'}`}
            onClick={handleLikeClick}
          />
          <span className='card__like-count'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
