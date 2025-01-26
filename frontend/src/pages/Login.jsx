import { useNavigate } from 'react-router-dom';
import { login } from '../auth/authService';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import { useState } from 'react';

const Login = () => {
  const { user, updateUser } = useUser(); // Obține utilizatorul și funcția de actualizare din context
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateUser({ [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        const response = await login(user); // login returnează token-ul
        if (response) {
            localStorage.setItem("accessToken", response.accessToken); // Setează token-ul în localStorage
            updateUser({
                id: response.id,
                name: response.name,
                token: response.accessToken,
                profile_picture: response.profile_picture,
            });
            navigate("/homepage");
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.message || "An unexpected error occurred!");
    }
};


  return (
    <div className="login-container">
      <h1>Login!</h1>
      <form className="login-form">
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <div className='l_button' onClick={handleClick}>Login</div>
        <Link to="/registration" className="link">
          Don’t have an account?
        </Link>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
