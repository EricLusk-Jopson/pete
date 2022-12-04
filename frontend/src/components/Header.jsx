import React from "react";
import logo from "../logo1.png";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        {user ? `Welcome ${user.username}` : `Log in to get started`}
        {/* <img src={logo} alt="pete logo" /> */}
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link className="nav-link" to="/create">
                <button className="btn">Create New Game</button>
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/login">
                <button className="btn">Log In</button>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                <button className="btn">Sign Up</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
