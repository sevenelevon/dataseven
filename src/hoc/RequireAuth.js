import { useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const RequireAuth = () => {
  const location = useLocation();
  const isAuthenticated = Cookies.get("id");
  const { pathname } = window.location;
  if (pathname === '/') {
    return <Navigate to="/about/us" />
  } else {
    if (!isAuthenticated) {
      return <Navigate to="/authentication/sign-in" state={{ from: location }} />;
    } else {
      return <Navigate to="/dashboard" state={{ from: location }} />;
    }
  }

};

const RequireAuthRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = Cookies.get("id");
  
  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" replace />;
  } else {
    return children;
  }
};

const RequireDashboardRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = Cookies.get("id");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return children;
  }
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
RequireAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
RequireDashboardRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RequireAuth, RequireAuthRoute, RequireDashboardRoute };
