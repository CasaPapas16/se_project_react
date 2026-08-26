import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{currentUser?.name}</p>
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <button
        className="sidebar__edit-button"
        type="button"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
      <button
        className="sidebar__sign-out-button"
        type="button"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </aside>
  );
}
