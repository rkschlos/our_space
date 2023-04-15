import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Logout from "./Auth/Logout";
import { useToken } from "./authApi";
import JobsList from "./Jobs/JobsList";
import PostsList from "./Forum/Components/PostsList";
import PostForm from "./Forum/Api/Forms/PostForm";
import ListView from "./Forum/Views/ListView";
import DetailView from "./Forum/Views/DetailView";
import CommentForm from "./Forum/Api/Forms/CommentForm";



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
          {/* FORUM */}
          <Route path="forum" element={<ListView token={token} />} />
          <Route path="posts/:post_id" element={<DetailView token={token} />} />
          <Route
            path="posts/:post_id/comment/form"
            element={<CommentForm token={token} />}
          />
          <Route path="posts" element={<PostsList token={token} />} />
          <Route path="posts/new" element={<PostForm token={token} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;