
import {initialCards} from "./initialCard.js";
import FormValidator from "./FormValidator.js";
import Card from "./card.js";
import { closePopup, openPopup, setClosePopupEventListener } from "./utils.js";

const parameterObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const sectionProfile = document.querySelector('.profile');
const buttonEditProfile = sectionProfile.querySelector('.profile__button-edit');
const buttonAddCard = sectionProfile.querySelector('.profile__button-add');
const nameLabelSectionProfile = sectionProfile.querySelector('.profile__label-name');
const professionLabelSectionProfile = sectionProfile.querySelector('.profile__label-profession');

const sectionPopupEditProfile = document.querySelector('.popup_type_edit_profile');
const formPopupEditProfile = document.querySelector('.popup__form');
const inputNamePopupEditProfile = sectionPopupEditProfile.querySelector('.popup__input_type_name');
const inputProfessionPopupEditProfile = sectionPopupEditProfile.querySelector('.popup__input_type_profession');
const buttonSubmitPopupEditProfile = sectionPopupEditProfile.querySelector('.popup_button-submit_type_edit-profile');
const buttonExitPopupEditProfile = sectionPopupEditProfile.querySelector('.popup_button-exit_type_edit-profile');

const sectionPopupAddCard = document.querySelector('.popup_type_add_card');
const inputNameCardPopupAddCard = sectionPopupAddCard.querySelector('.popup__input_type_name-card');
const inputAddressCardPopupAddCard = sectionPopupAddCard.querySelector('.popup__input_type_address-card');
const buttonSubmitPopupAddCard = sectionPopupAddCard.querySelector('.popup_button-submit_type_add-card');
const buttonExitPopupAddCard = sectionPopupAddCard.querySelector('.popup_button-exit_type_add-card');

const sectionPopupImage = document.querySelector('.popup_type_image');
const popupImageImageBlock = sectionPopupImage.querySelector('.popup__image');
const popupImageTitle = sectionPopupImage.querySelector('.popup__image-title');
const buttonExitPopupImage = sectionPopupImage.querySelector('.popup_button-exit_type_image');

const cardTemplate = document.querySelector('#card').content;
// const elementCard = cardTemplate.querySelector('.element__card');
const sectionElement = document.querySelector('.element');

const formValidator = new FormValidator(parameterObject);
formValidator.enableValidation();

const renderCard = (conteainer, cardTemplate, cardName, cardLink) => {
  const card = new Card(cardTemplate, cardName, cardLink);
  const cardElementt = card.generateCard();
  conteainer.prepend(cardElementt);
}

initialCards.forEach((item)=>{
  // renderCard(sectionElement, '#card', item);
  renderCard(sectionElement, cardTemplate, item);
});


function handleFormSubmit(evt){
  evt.preventDefault();

  nameLabelSectionProfile.textContent = inputNamePopupEditProfile.value;
  professionLabelSectionProfile.textContent = inputProfessionPopupEditProfile.value;
  closePopup(sectionPopupEditProfile);
}

buttonEditProfile.addEventListener('click', function(){
  inputNamePopupEditProfile.value = nameLabelSectionProfile.textContent;
  inputProfessionPopupEditProfile.value = professionLabelSectionProfile.textContent;
  openPopup(sectionPopupEditProfile);
});

buttonExitPopupEditProfile.addEventListener('click', () => closePopup(sectionPopupEditProfile));
buttonSubmitPopupEditProfile.addEventListener('click', handleFormSubmit);

buttonAddCard.addEventListener('click', () => openPopup(sectionPopupAddCard));
buttonExitPopupAddCard.addEventListener('click', () => closePopup(sectionPopupAddCard));

buttonSubmitPopupAddCard.addEventListener('click', (evt) => {
  evt.preventDefault();
  const dataCard = {
    name: inputNameCardPopupAddCard.value,
    link: inputAddressCardPopupAddCard.value
  }

  renderCard(sectionElement, cardTemplate, dataCard);
  closePopup(sectionPopupAddCard);
})

buttonExitPopupImage.addEventListener('click', () => closePopup(sectionPopupImage));

//вешаем обработчики для закрытия попапов при клике вне формы(не сработает для popup_type_image)
const formList = Array.from(document.querySelectorAll('.popup'));
formList.forEach((popupElement)=>{
  const popupForm = popupElement.querySelector('.popup__form');
  setClosePopupEventListener(popupElement, popupForm);
})
