import { useState, useEffect } from 'react';
import LogoutButton from './components/LogoutButton';
import { login, signup} from './components/AuthState';
import Header from "./components/Header";
import Board from './components/Board';
import AuthForm from './components/AuthForm';

import { Navigate, Routes, Route } from "react-router-dom";
import Upgrade from "./pages/Upgrade";
import UpgradeSuccess from './pages/UpgradeSuccess';

import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser({
          userId: decoded.userId,
          isPro: decoded.isPro,
          token,
        });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        setUser(null);
      }
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

  if (!user) {
    return (
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
    );
  }

  return (
    <>
    <Header onLogout={handleLogout} />

    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/upgrade" element={<Upgrade />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/upgrade-success" element={<UpgradeSuccess />} />
    </Routes>
    </>
  ); 
  }

export default App;
