import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'card-popup'}
      isOpen={isOpen}
      submitCaption={'Создать'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__fieldset form__fieldset_type_input'>
        <label htmlFor='card-name' className='form__label'>
          <input
            type='text'
            required
            id='card-name'
            name='card-name'
            placeholder='Название'
            minLength={2}
            maxLength={30}
            className='form__input card-name-input'
            value={name}
            onChange={handleNameChange}
          />
          <span className='form__input-error card-name-input-error' />
        </label>
        <label htmlFor='card-link' className='form__label'>
          <input
            type='url'
            required
            id='card-link'
            name='card-link'
            placeholder='Ссылка на картинку'
            className='form__input card-link-input'
            value={link}
            onChange={handleLinkChange}
          />
          <span className='form__input-error card-link-input-error' />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
