import { useState } from 'react';
import LogoutButton from './components/LogoutButton';
import { login, signup} from './components/AuthState';
import Header from "./components/Header";
import Board from './components/Board';
function App() {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [oassword, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const user = await login(email, password);
    setUser(user);
  };

  const handleSignup = async

}

export default App
