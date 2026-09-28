import { useState } from "react";
import { loginUser } from "../data/authService";
import logo from "../assets/logo.png";

function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
        setError("Email and password are required.");
      return;
    }

    const result = loginUser(email, password);

    if (result.success === false) {
      setError(result.message);
      return;
    }

    setError("");
    onLogin(result.user);
  }

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}
        <div className="login-logo-wrapper">
          <img
            src={logo}
            alt="Campus Suite"
            className="login-logo"
          />
        </div>

        {/* Heading */}
        <div className="login-heading">
          <h3>Welcome Back</h3>

          <p>
            Sign in to your Campus Suite account
          </p>
        </div>

        {/* Error */}
        {error !== "" && (
          <div className="login-error">
             {error}
          </div>
        )}

        {/* Form */}
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="admin@college.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <div className="password-group">

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "👁️" : "🙈"}
              </button>

            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="login-button"
          >
            Login Now
          </button>

        </form>

                  {/* Divider */}
<div className="login-divider d-flex align-items-center">
  <div className="flex-grow-1 border-top"></div>

  <span className="mx-3 text-muted">
    OR
  </span>

  <div className="flex-grow-1 border-top"></div>
</div>

{/* Register */}
<div className="d-flex justify-content-between align-items-center">

  <p className="mb-0">
    Don't have an account?
  </p>

  <button
    type="button"
    className="btn btn-link p-0 text-decoration-none"
    onClick={onSwitchToRegister}
  >
    Create an Account
  </button>

</div>


      </div>

    </div>
  );
}

export default LoginPage;
