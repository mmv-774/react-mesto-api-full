function PopupWithForm({ title, name, isOpen, submitCaption, onClose, onSubmit, children }) {
  return (
    <div id={`${name}`} className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <button type='button' className='popup__btn animated-element popup__close' onClick={onClose}></button>
        <form name={`${name}`} className='form' onSubmit={onSubmit}>
          <h2 className='form__title'>{title}</h2>
          {children}
          <fieldset className='form__fieldset form__fieldset_type_handler'>
            <button type='submit' className='form__handler form__submit-handler'>
              {submitCaption || 'Сохранить'}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
