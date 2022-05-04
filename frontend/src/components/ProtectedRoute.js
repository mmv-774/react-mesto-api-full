import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ ...props }) {
  return <Route>{props.redirectCondition ? <Redirect to={props.redirectPath} /> : props.children}</Route>;
}

export default ProtectedRoute;
