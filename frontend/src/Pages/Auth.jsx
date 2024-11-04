import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_AUTH;

const Signup = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("login");
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '' // New state for confirm password
  });
  const { username, email, password, confirmPassword } = auth;
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    
    // Validate input fields
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (type === 'signup' && !username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (type === 'signup' && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Set errors state if any validation errors exist
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return; // Exit if there are errors
    }

    // Proceed with form submission
    setLoading(true); 
    try {
      let response;
      const requestData = { username, email, password };
      if (type === "signup") {
        response = await axios.post("/user/signup", requestData);
        alert("Signup successful");
      } else {
        response = await axios.post("/user/login", requestData);
        alert("Login successful");
      }

      // Store token and name in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);

      // Reset form and errors
      setAuth({
        username: "",
        email: "",
        password: "",
        confirmPassword: "" // Reset confirm password on successful signup
      });
      setErrors({}); // Clear errors only on successful submission
      navigate("/");

    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      if (type === "signup") {
        alert("Email already exists");
      } else {
        alert("User not found");
      }
      // Reset form values on error, but keep errors
      setAuth({
        username: "",
        email: "",
        password: "",
        confirmPassword: "" // Reset on error
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <p className="text-2xl font-semibold mb-4 text-center">
          {type === 'login' ? 'Login' : 'Signup'}
        </p>

        {type === 'signup' && (
          <LabeledInput
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
            error={errors.username}
          />
        )}

        <LabeledInput
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setAuth({ ...auth, email: e.target.value })}
          error={errors.email}
        />
        <LabeledInput
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          error={errors.password}
        />
        {type === 'signup' && (
          <LabeledInput
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            onChange={(e) => setAuth({ ...auth, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
          />
        )}

        {type === "login" && (
          <Link className="text-red-600 hover:underline block text-center mb-4" to="/email">
            Forgot Password?
          </Link>
        )}

        {loading ? ( 
          <Spinner />
        ) : (
          <Button type="submit" name={type === 'login' ? 'Login' : 'Signup'} />
        )}

        <p className="text-center mt-4">
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <span className="text-red-600 cursor-pointer" onClick={() => setType("signup")}>
                <b>Sign up</b>
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="text-red-600 cursor-pointer" onClick={() => setType("login")}>
                <b>Login</b>
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

function LabeledInput({ type, placeholder, id, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {placeholder}
      </label>
      <input
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600 sm:text-sm ${error ? 'border-red-500' : ''}`}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        required
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Button({ type, name }) {
  return (
    <button
      className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
      type={type}
    >
      {name}
    </button>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Signup;
