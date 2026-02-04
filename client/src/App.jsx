import { useState, useEffect } from 'react';
import LogoutButton from './components/LogoutButton';
import { login, signup} from './components/AuthState';
import Header from "./components/Header";
import Board from './components/Board';
import AuthForm from './components/AuthForm';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./pages/Board";
import Upgrade from "./pages/Upgrade";

function App() {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
    const user = await login(email, password);
    setUser(user);
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    alert(err.message);
  }
  };

  const handleSignup = async (email,password) => {
    try {
      const user = await signup(email, password);
      setUser(user);
  } catch(err) {
    console.error("SIGNUP ERROR:", err.message);
    alert(err.message);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white">
      {user ? (
        <div>
          <Header onLogout={handleLogout} />
          <Board />
        </div>  
      ) : (
        <AuthForm
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onLogin={handleLogin}
          onSignUp={handleSignup}
        />
      )}
    </div>
  );

}

export default App;
