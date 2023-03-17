export default class FormValidator {
  constructor(validationConfig){
    this._formSelector = validationConfig.formSelector, //форма попапа
    this._inputSelector = validationConfig.inputSelector, //проверяемые инпуты
    this._submitButtonSelector = validationConfig.submitButtonSelector, //кнопка сохранить
    this._inactiveButtonClass = validationConfig.inactiveButtonClass, //класс деактивации кнопки сохранить
    this._inputErrorClass = validationConfig.inputErrorClass, //класс изменяет цвет рамки при ошибки валидации
    this._errorClass = validationConfig.errorClass //класс стилизует сообщение ошибки

  }

  _showInputError (
    formElement,
    formInput,
    inputErrorClass,
    errorMesanger
  ) {
    const formInputError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(inputErrorClass);
    formInputError.classList.add(this._errorClass);
    formInputError.textContent = errorMesanger;
  };

  _hideInputError (formElement, formInput, inputErrorClass) {
    const formInputError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(inputErrorClass);
    formInputError.classList.remove(this._errorClass);
    formInputError.textContent = "";
  };

  _isValid (formElement, formInput){
    if (!formInput.validity.valid) {
      this._showInputError(
        formElement,
        formInput,
        this._inputErrorClass,
        formInput.validationMessage
      );
    } else {
      this._hideInputError(formElement, formInput, this._inputErrorClass);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonSubmitState (
    inputList,
    submitButton,
    inactiveButtonClass
  ) {
    if (this._hasInvalidInput(inputList)) {
      // submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute("disabled", true);
    } else {
      // submitButton.classList.remove(inactiveButtonClass);
      submitButton.removeAttribute("disabled");
    }
  };

  _setInputsFormEventListeners (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass
  ) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const formSubmitButton = formElement.querySelector(submitButtonSelector);
    this._toggleButtonSubmitState(inputList, formSubmitButton, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonSubmitState(
          inputList,
          formSubmitButton,
          inactiveButtonClass
        );
      });
    });
  };

  enableValidation () {
    const formsList = Array.from(document.querySelectorAll(this._formSelector));
    formsList.forEach((form) => {
      this._setInputsFormEventListeners(form, this._inputSelector,
                                        this._submitButtonSelector,
                                        this._inactiveButtonClass);
    });
  };
}
