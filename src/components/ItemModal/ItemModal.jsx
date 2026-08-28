import "./ItemModal.css";
import { useContext } from "react";
import close from "../../assets/closewht.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ onClose, card, name, isOpen, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const cardOwnerId = card.owner?._id || card.owner;
  const isOwn = currentUser && String(cardOwnerId) === String(currentUser._id);

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete-btn"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
