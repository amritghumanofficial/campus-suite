import { useState } from "react";
import { registerUser } from "../data/authService";
import logo from "../assets/logo.png";

function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please fill in all fields!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password,
      confirmPassword: confirmPassword,
    };

    const result = registerUser(userData);

    if (result.success === false) {
      setError(result.message);
      return;
    }

    setError("");
    setSuccess("Account created successfully!");

    setTimeout(function () {
      onRegister(result.user);
    }, 1500);
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
          <h3>Create Account</h3>

          <p>
            Create your Campus Suite account
          </p>
        </div>

        {/* Error */}
        {error !== "" && (
          <div className="login-error">
             {error}
          </div>
        )}

        {/* Success */}
        {success !== "" && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        {/* Register Form */}
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="e.g. Rahul Sharma"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setError("");
              }}
              disabled={success !== ""}
            />
          </div>

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
              disabled={success !== ""}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              disabled={success !== ""}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              disabled={success !== ""}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="login-button"
            disabled={success !== ""}
          >
            {success !== "" ? "Registering..." : "Register Now"}
          </button>

        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-4">

          <div className="flex-grow-1 border-top"></div>

          <span className="mx-3 text-muted">
            OR
          </span>

          <div className="flex-grow-1 border-top"></div>

        </div>

        {/* Login */}
        <div className="d-flex justify-content-between align-items-center">

          <p className="mb-0">
            Already have an account?
          </p>

          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={onSwitchToLogin}
            disabled={success !== ""}
          >
            Login Here
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;
