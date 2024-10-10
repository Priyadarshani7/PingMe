import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center mb-4">Sign in with Google to Continue</p>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
