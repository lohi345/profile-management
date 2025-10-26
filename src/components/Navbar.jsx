import { Link, NavLink } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand with icon */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/dashboard"
        >
          <FaUserPlus className="me-2" />
          User Management
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary ms-lg-3" to="/add">
                + Add User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
