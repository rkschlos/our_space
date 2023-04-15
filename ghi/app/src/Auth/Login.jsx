import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login(props) {
  const { token, login } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const error = await login(username, password);
    setError(error);
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      { error ? <div dangerouslySetInnerHTML={{__html: error}} /> : null }
      <input required name="username" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      <input required name="password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
      <button>Login</button>
    </form>
  )
}


export default Login;