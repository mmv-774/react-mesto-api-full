import AuthForm from './AuthForm';

function Login({ title, submitCaption, onSubmit }) {
  return <AuthForm title={title} submitCaption={submitCaption} onSubmit={onSubmit} />;
}

export default Login;
