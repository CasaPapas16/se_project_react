import "./Header.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logo from "../../assets/logo.svg";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  onRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" alt="WTWR logo" src={logo} />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch className="header__toggle" />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <span className="header__avatar header__avatar_placeholder">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button type="button" onClick={onLoginClick}>
            Log in
          </button>
          <button type="button" onClick={onRegisterClick}>
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
