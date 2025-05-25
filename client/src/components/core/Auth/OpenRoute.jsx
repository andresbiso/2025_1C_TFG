// This will prevent authenticated users from accessing this route.
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
}

OpenRoute.propTypes = {
  children: PropTypes.node,
};

export default OpenRoute;
