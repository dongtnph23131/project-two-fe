import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import { Toaster } from "./components/ui/toaster";
import PrivateRoute from "./router/PrivateRouter";
const user = JSON.parse(localStorage.getItem("user")!);
const router = createBrowserRouter([
  {
    path: "",
    element: <PrivateRoute user={user} />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: "signin", element: <SigninPage /> },
  { path: "signup", element: <SignupPage /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
