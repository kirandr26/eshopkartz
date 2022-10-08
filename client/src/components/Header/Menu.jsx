import { NavLink } from "react-router-dom";

const userRoute = (
  <ul className="navbar-nav">
    <li className="nav-item active">
      <NavLink
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        to={"/user/dashboard"}
      >
        Account
      </NavLink>
      <ul>
        <li>
          <NavLink className="dropdown-item" to={"/#"}>
            User Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to={"/"}>
            Logout
          </NavLink>
        </li>
      </ul>
    </li>
  </ul>
);

const authRoute = (
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink className="nav-link" to={"/login"}>
        Login
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={"/register"}>
        Register
      </NavLink>
    </li>
  </ul>
);

const adminRoute = (
  <ul className="navbar-nav">
    <li className="nav-item active">
      <NavLink
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        to={"/admin/dashboard"}
      >
        Account
      </NavLink>
      <ul>
        <li>
          <NavLink className="dropdown-item" to={"/#"}>
            Admin Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="dropdown-item" to={"/"}>
            Logout
          </NavLink>
        </li>
      </ul>
    </li>
  </ul>
);

const commonRoute = (
  <ul className="navbar-nav">
    <li className="nav-item active">
      <NavLink className="nav-link" to={"/"}>
        Home
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={"/about"}>
        About
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={"/contact"}>
        Contact
      </NavLink>
    </li>
  </ul>
);

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to={"/"}>
          E-Cartz
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  justify-content-end"
          id="navbarNav"
        >
          {commonRoute}
          {authRoute}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
