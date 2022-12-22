import { useState, useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../contextProviders/useIsMobile";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const onCancel = (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      password: "",
    });
    navigate("/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="form-container">
        {!isMobile && (
          <section className="heading">
            <h1>Log In</h1>
            <p>Log in and compete</p>
          </section>
        )}
        <section className={`form form-mobile-${isMobile}`}>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control password"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-form btn-block btn-important"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="form-group">
            <button type="cancel" className="btn btn-block" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
