import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css"

function Nav(props) {
  const { token } = props;
  const [user, setUser] = useState({});
  // const location = useLocation();

  useEffect(() => {
    async function getMe() {
      const url = `${process.env.REACT_APP_OURSPACE_HOST}/users/me`;
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    }
    if (token) {
      getMe();
    }
  }, [token]);

  // if(["login", "signup", "Login", "Signup"].some(path => location.pathname.includes(path))){
  //   return null
  // }
  return (
    <nav className={styles.navbar}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          OurSpace
        </NavLink>
        <div>
          <ul className={styles.ul}>
            {token ? (
              <>
                {/* Whatever you want to show when people are logged in */}
                <NavLink className={styles.li} to="/logout" role="button">
                  Logout {user.username}
                </NavLink>
                {/* <NavLink className="dropdown-item" to="/profile/new" role="button">
                  Profile Form
                </NavLink> */}
                
                <NavLink className={styles.li} to="jobs" role="button">
                  Jobs
                </NavLink>
                <NavLink className={styles.li} to="forum" role="button">
                  Forum
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className={styles.li} to="/login" role="button">
                  Login
                </NavLink>
                <NavLink className={styles.li} to="/signup" role="button">
                  Signup
                </NavLink>
                <NavLink className={styles.li} to="jobs" role="button">
                  Jobs
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
