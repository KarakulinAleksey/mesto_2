const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const showInputError = (
    formElement,
    formInput,
    inputErrorClass,
    errorMesanger
  ) => {
    const formInputError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(inputErrorClass);
    formInputError.classList.add(errorClass);
    formInputError.textContent = errorMesanger;
  };

  const hideInputError = (formElement, formInput, inputErrorClass) => {
    const formInputError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(inputErrorClass);
    formInputError.classList.remove(errorClass);
    formInputError.textContent = "";
  };
  //валидируем форму и выводин текст ошибки
  const isValid = (formElement, formInput) => {
    if (!formInput.validity.valid) {
      showInputError(
        formElement,
        formInput,
        inputErrorClass,
        formInput.validationMessage
      );
    } else {
      hideInputError(formElement, formInput, inputErrorClass);
    }
  };
  //проверка на не валидность одного из всех инпутов на форме
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //дизактивация кнопки
  const toggleButtonSubmitState = (
    inputList,
    submitButton,
    inactiveButtonClass
  ) => {
    if (hasInvalidInput(inputList)) {
      // submitButton.classList.add(inactiveButtonClass);
      submitButton.setAttribute("disabled", true);
    } else {
      // submitButton.classList.remove(inactiveButtonClass);
      submitButton.removeAttribute("disabled");
    }
  };

  //вешаем обработчики событий на все инпуты и кнопку отправки на форме
  const setInputsFormEventListeners = (
    formElement,
    inputSelector,
    submitButtonSelector
  ) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const formSubmitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonSubmitState(inputList, formSubmitButton, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonSubmitState(
          inputList,
          formSubmitButton,
          inactiveButtonClass
        );
      });
    });
  };

  //переберём все формы
  const enableValidation = (formSelector, inputSelector) => {
    const formsList = Array.from(document.querySelectorAll(formSelector));
    formsList.forEach((form) => {
      setInputsFormEventListeners(form, inputSelector, submitButtonSelector);
    });
  };

  enableValidation(formSelector, inputSelector);
};

const parameterObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

enableValidation(parameterObject);
