function ImagePopup({ card, onClose }) {
  return (
    <div id='photo-popup' className={`photo popup photo-popup ${card && 'popup_opened'}`}>
      <figure className='photo__figure'>
        <button type='button' className='popup__btn animated-element popup__close' onClick={onClose} />
        <img className='photo__img' src={card ? card.link : '#'} alt={card ? card.name : 'Изображение карточки'} />
        <figcaption className='photo__caption'>{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
