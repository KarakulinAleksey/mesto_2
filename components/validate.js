const enableValidation=({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass})=>{
  const formElement = document.querySelector(formSelector);
  const formInput = formElement.querySelector(inputSelector);
  const formSubmitButton = formElement.querySelector(submitButtonSelector);
  const formInputError = formElement.querySelector(`.${formInput.id}-error`);

  const showInputError = (formInput, inputErrorClass, errorMesanger)=>{
    formInput.classList.add(inputErrorClass);
    formInputError.classList.add(errorClass);
    formInputError.textContent = errorMesanger;
  }

  const hideInputError = (formInput, inputErrorClass)=>{
    formInput.classList.remove(inputErrorClass);
    formInputError.classList.remove(errorClass);
  }

  const isValid = ()=>{
    if (!formInput.validity.valid){
      showInputError(formInput, inputErrorClass, formInput.validationMessage)
    } else {
      hideInputError(formInput, inputErrorClass);
    }
  }

  formInput.addEventListener('input', isValid)
}



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
