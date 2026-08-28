import "./ModalWithForm.css";
import close from "../../assets/closex.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  formClassName,
  secondaryButtonText,
  onSecondaryButtonClick,
  onSubmit,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close button" />
        </button>
        <form
          onSubmit={onSubmit}
          className={`modal__form ${formClassName || ""}`}
          name={name}
        >
          {children}
          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
