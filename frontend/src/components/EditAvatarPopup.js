import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar-popup'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__fieldset form__fieldset_type_input'>
        <label htmlFor='avatar-link' className='form__label'>
          <input
            type='url'
            required
            id='avatar-link'
            name='avatar-link'
            placeholder='Ссылка на картинку'
            className='form__input avatar-link-input'
            ref={avatarRef}
          />
          <span className='form__input-error avatar-link-input-error' />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
