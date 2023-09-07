import { Navigate } from "react-router-dom";
import { logoutAction } from "../stores/auth";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutAction());
  return <Navigate to="/login" />;
};
export default Logout;
