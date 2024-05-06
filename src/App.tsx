import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import { Toaster } from "./components/ui/toaster";
import PrivateRoute from "./router/PrivateRouter";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
