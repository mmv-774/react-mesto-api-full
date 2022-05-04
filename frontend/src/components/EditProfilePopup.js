import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile-popup'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__fieldset form__fieldset_type_input'>
        <label htmlFor='user-name' className='form__label'>
          <input
            type='text'
            required
            id='user-name'
            name='user-name'
            placeholder='Ваше имя'
            minLength={2}
            maxLength={40}
            className='form__input user-name-input'
            value={name}
            onChange={handleNameChange}
          />
          <span className='form__input-error user-name-input-error' />
        </label>
        <label htmlFor='user-profession' className='form__label'>
          <input
            type='text'
            required
            id='user-profession'
            name='user-profession'
            placeholder='Ваша профессия'
            minLength={2}
            maxLength={200}
            className='form__input user-profession-input'
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className='form__input-error user-profession-input-error' />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
