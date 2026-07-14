import "./ItemModal.css";
import close from "../../assets/closewht.png";

function ItemModal({ activeModal, onClose, card, name, isOpen, onDelete }) {
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
          <button className="modal__delete-btn" onClick={() => onDelete(card)}>Delete item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
