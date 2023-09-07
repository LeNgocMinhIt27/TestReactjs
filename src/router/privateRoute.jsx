import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ role, roles, element }) => {
  const { logged, currentUser } = useSelector((state) => state.auth);

  if (!logged) {
    return <Navigate to="/login" />;
  }
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};
export const GuestOnlyRoute = (props) => {
  const { logged } = useSelector((state) => state.auth);
  if (!logged) {
    return props.element;
  }
  return <Navigate to="/loai" />;
};
export default PrivateRoute;
