import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Logout from "./Auth/Logout";
import { useToken } from "./authApi";
import JobsList from "./Jobs/JobsList";



function App() {
  const [token, login, logout, signup] = useToken();
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return (
    <>
      <BrowserRouter basename={basename}>
        <Nav token={token} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* LOGIN */}
          <Route path="logout" element={<Logout logout={logout} />} />
          <Route path="login" element={<Login token={token} login={login} />} />
          <Route path="signup" element={<Signup token={token} signup={signup} />}
          />
          
          {/* JOBS */}
          <Route path="jobs" element={<JobsList token={token}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;