import logo from "../../assets/logo.png";

function Footer({ onNavigate }) {
  return (
    <footer className="bg-dark text-white py-3">

      <div className="container">

        <div className="d-flex align-items-center justify-content-between">

          {/* Left - Logo */}
          <div>
            <img
              src={logo}
              alt="Campus Suite"
              style={{
                width: "160px",
                height: "40px",
                objectFit: "contain",
              }}
            />
          </div>


          {/* Center - Copyright */}
          <div className="text-center">
            <p className="mb-0 text-nowrap">
              © 2026 Student Management System | Created by{" "}
              <a
                href="https://amritghuman.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fw-bold text-decoration-none"
              >
                Amritpal Singh
              </a>
            </p>
          </div>


          {/* Right - Pages */}
          <div className="text-end text-nowrap">

            <button
              className="btn btn-link text-white text-decoration-none p-0 me-2"
              onClick={() => onNavigate("privacy")}
            >
              Privacy Policy | 
            </button>

            <button
              className="btn btn-link text-white text-decoration-none p-0 me-2"
              onClick={() => onNavigate("terms")}
            >
              Terms | 
            </button>

            <button
              className="btn btn-link text-white text-decoration-none p-0"
              onClick={() => onNavigate("support")}
            >
              Support
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
