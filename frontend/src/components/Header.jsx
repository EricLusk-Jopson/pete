import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useIsMobile } from "../contextProviders/useIsMobile";

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
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
        <h3>
          {isMobile
            ? user
              ? `${user.username}`
              : location.pathname.slice(1) === "register"
              ? "Create An Account"
              : "Log In And Compete"
            : user
            ? `Welcome ${user.username}`
            : `Log in to get started`}
        </h3>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link className="nav-link" to="/create">
                <button className="btn btn-important">
                  {isMobile ? <FaPlus /> : "Create New Game"}
                </button>
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                {isMobile ? <FaSignOutAlt /> : "Log Out"}
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-link" to="/login">
                <button className="btn btn-important">
                  {isMobile ? <FaSignInAlt /> : "Log In"}
                </button>
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/register">
                <button className="btn">
                  {isMobile ? <FaUserCircle /> : "Sign Up"}
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
