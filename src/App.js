import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Profile from "./pages/Profile";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };

  return (
    <div className="App">
      <Navbar isAuth={isAuth} signUserOut={signUserOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route path="/profile" element={<Profile isAuth={isAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
