import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const defaultValues = { name: "", avatar: "", email: "", password: "" };

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange, handleSubmit } = useFormWithValidation(
    defaultValues,
    {},
  );

  const submit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submit}
    >
      <label className="modal__label" htmlFor="register-name">
        Name
        <input
          className="modal__input"
          id="register-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL
        <input
          className="modal__input"
          id="register-avatar"
          name="avatar"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-email">
        Email
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
