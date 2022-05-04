import { useState } from 'react';

function AuthForm({ title, submitCaption, onSubmit, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <>
      <div className='auth horizontal-aligned-block'>
        <form name='register-form' className='form form_asgmt_auth' onSubmit={handleSubmit}>
          <h2 className='form__title form__title_asgmt_auth'>{title}</h2>
          <fieldset className='form__fieldset form__fieldset_type_input form__fieldset_type_input_asgmt_auth'>
            <label htmlFor='user-email' className='form__label'>
              <input
                type='email'
                required
                id='user-email'
                name='user-email'
                placeholder='Email'
                className='form__input form__input_asgmt_auth'
                value={email}
                onChange={handleChangeEmail}
              />
            </label>
            <label htmlFor='user-pass' className='form__label'>
              <input
                type='password'
                id='user-pass'
                name='user-pass'
                placeholder='Пароль'
                className='form__input form__input_asgmt_auth'
                required={true}
                autoComplete='on'
                value={password}
                onChange={handleChangePassword}
              />
            </label>
          </fieldset>
          <fieldset className='form__fieldset form__fieldset_type_handler form__fieldset_type_handler_asgmt_auth'>
            <button type='submit' className='form__handler form__handler_asgmt_auth'>
              {submitCaption}
            </button>
          </fieldset>
        </form>
        {children}
      </div>
    </>
  );
}

export default AuthForm;
