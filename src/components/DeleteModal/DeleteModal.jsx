import "./DeleteModal.css";
import close from "../../assets/closex.png";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal modal_type_delete ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close button" />
        </button>
        <h2 className="delete-modal__title">
          Are you sure you want to delete this item?
        </h2>
        <p className="delete-modal__message">This action is irreversible.</p>
        <div className="delete-modal__actions">
          <button
            className="delete-modal__confirm"
            type="button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="delete-modal__cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
