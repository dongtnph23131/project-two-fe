import { useState } from "react";
import { Navigate } from "react-router";

const PrivateRoute = (props: any) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")!));
  return user ? props.children : <Navigate to="/signin" />;
};

export default PrivateRoute;
