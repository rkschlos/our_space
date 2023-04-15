import { Navigate } from 'react-router-dom';

function Logout(props) {
  props.logout();
  return <Navigate to="/" />;
}

export default Logout;