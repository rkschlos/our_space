import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css'

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
    <form onSubmit={handleSubmit} className={styles.form_card}>
      { error ? <div dangerouslySetInnerHTML={{__html: error}} /> : null }
      <div className={styles.input_card}>
      <input className={styles.input}required name="username" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      </div>
      <div className={styles.input_card}>
      <input className={styles.input} required name="password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
      </div>
      <button className={styles.submitButton}>Login</button>
    </form>
  )
}


export default Login;