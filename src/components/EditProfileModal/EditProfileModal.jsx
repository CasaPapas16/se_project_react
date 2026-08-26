import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const defaultValues = { name: "", avatar: "" };

const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    required: true,
    pattern: /^(https?:\/\/).+/i,
  },
};

function EditProfileModal({ isOpen, onClose, currentUser, onUpdateProfile }) {
  const {
    values,
    errors,
    hasSubmitted,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const submit = (event) => {
    event.preventDefault();
    if (handleSubmit(values)) {
      onUpdateProfile(values);
    }
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save changes"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submit}
    >
      <label className="modal__label" htmlFor="edit-profile-name">
        Name
        <input
          className={`modal__input${hasSubmitted && errors.name ? " modal__input_error" : ""}`}
          id="edit-profile-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label" htmlFor="edit-profile-avatar">
        Avatar URL
        <input
          className={`modal__input${hasSubmitted && errors.avatar ? " modal__input_error" : ""}`}
          id="edit-profile-avatar"
          name="avatar"
          type="url"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
