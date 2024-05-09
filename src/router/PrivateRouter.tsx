import { Navigate, Outlet } from "react-router";
const PrivateRoute = ({ user }: any) => {
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
