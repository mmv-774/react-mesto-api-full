import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register({ title, submitCaption, onSubmit }) {
  return (
    <AuthForm title={title} submitCaption={submitCaption} onSubmit={onSubmit}>
      <p className='auth__text'>
        Уже зарегистрированы?{' '}
        <Link className='auth__link animated-element' to='/sign-in'>
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
