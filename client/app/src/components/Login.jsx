import React, { useState, useContext } from 'react';
import UserContext from './UserContext';

function Login() {
  const [userId, setUserId] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    // Här kan du lägga till logik för att validera userId om du vill
    setUser(userId);
  };

  return (
    <div>
      <label>
        UserId:
        <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Logga in</button>
    </div>
  );
}

export default Login;
