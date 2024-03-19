import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext'; // Importera AuthContext

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useContext(AuthContext); // Använd setUserId från AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:5000/api/login', {
      username,
      password,
    });

    localStorage.setItem('token', response.data.token);
    setUserId(response.data.userId); // Sätt userId när användaren loggar in
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Logga in</button>
    </form>
  );
}

export default Login;
