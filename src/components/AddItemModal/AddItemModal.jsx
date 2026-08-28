import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = { name: "", imageUrl: "", weather: "" };

const validationRules = {
  name: {
    required: true,
    requiredMessage: "Please enter a garment name.",
    minLength: 2,
    minLengthMessage: "Name must be at least 2 characters long.",
    maxLength: 30,
    maxLengthMessage: "Name must be no more than 30 characters long.",
  },
  imageUrl: {
    required: true,
    requiredMessage: "Please provide an image URL.",
    pattern: /^(https?:\/\/).+/i,
    patternMessage: "Please enter a valid image URL.",
  },
  weather: {
    required: true,
    requiredMessage: "Please select a weather type.",
  },
};

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const {
    values,
    errors,
    hasSubmitted,
    handleChange,
    resetForm,
    handleSubmit: validateAndSubmit,
  } = useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    const isFormValid = validateAndSubmit(values);

    if (!isFormValid) {
      return;
    }

    onAddItem(values);
    resetForm();
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        <span className="modal__label-text">Name</span>
        <input
          type="text"
          className={`modal__input${hasSubmitted && errors.name ? " modal__input_error" : ""}`}
          name="name"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        <span className="modal__label-text">Image</span>
        <input
          type="url"
          className={`modal__input${hasSubmitted && errors.imageUrl ? " modal__input_error" : ""}`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        {hasSubmitted && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset
        className={`modal__radio-btn${hasSubmitted && errors.weather ? " modal__radio-btn_error" : ""}`}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className={`modal__radio-input${hasSubmitted && errors.weather ? " modal__radio-input_error" : ""}`}
            onChange={handleChange}
            checked={values.weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className={`modal__radio-input${hasSubmitted && errors.weather ? " modal__radio-input_error" : ""}`}
            onChange={handleChange}
            checked={values.weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className={`modal__radio-input${hasSubmitted && errors.weather ? " modal__radio-input_error" : ""}`}
            onChange={handleChange}
            checked={values.weather === "cold"}
          />{" "}
          Cold
        </label>
        {hasSubmitted && errors.weather && (
          <span className="modal__error modal__error_type_radio">
            {errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
