import logo from "../../assets/logo.png";

function Navbar({ user, onLogout }) {
  const userName = user?.fullName || "Admin";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className="navbar navbar-dark bg-dark px-3 py-2 shadow-sm">
      <div className="container-fluid p-0">

        {/* Logo */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Campus Suite"
            className="img-fluid"
            style={{
              width: "200px",
              height: "50px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* User Section */}
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 px-3 py-1 rounded-pill">

            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: "28px",
                height: "28px",
                fontSize: "13px",
              }}
            >
              {userInitial}
            </div>

            <span className="text-light small d-none d-sm-inline">
              Welcome{" "}
              <strong className="text-info">
                {userName}
              </strong>
            </span>

          </div>

          {/* Logout */}
          {onLogout && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger rounded-pill"
              onClick={onLogout}
              title="Logout"
            >
              🚪
              <span className="d-none d-md-inline ms-1">
                Logout
              </span>
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
