import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const defaultValues = { email: "", password: "" };

function LoginModal({ isOpen, onClose, onLogin, onRegisterClick }) {
  const { values, handleChange } = useFormWithValidation(defaultValues, {});

  const submit = (event) => {
    event.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      name="login"
      formClassName="modal__form_type_login"
      secondaryButtonText="or Sign Up"
      onSecondaryButtonClick={onRegisterClick}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submit}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
