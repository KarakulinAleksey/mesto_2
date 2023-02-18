// import initialCards from "../utils/initialCsrds.js";
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const sectionProfile = document.querySelector('.profile');
const buttonEditProfile = sectionProfile.querySelector('.profile__button-edit');
const buttonAddCard = sectionProfile.querySelector('.profile__button-add');
let nameLabelSectionProfile = sectionProfile.querySelector('.profile__label-name');
let professionLabelSectionProfile = sectionProfile.querySelector('.profile__label-profession');

const sectionPopupEditProfile = document.querySelector('.popup_type_edit_profile');
const inputNamePopupEditProfile = sectionPopupEditProfile.querySelector('.popup__input_type_name');
const inputProfessionPopupEditProfile = sectionPopupEditProfile.querySelector('.popup__input_type_profession');
const buttonSubmitPopupEditProfile = sectionPopupEditProfile.querySelector('.popup_button-submit_type_edit-profile');
const buttonExitPopupEditProfile = sectionPopupEditProfile.querySelector('.popup_button-exit_type_edit-profile');

const sectionPopupAddCard = document.querySelector('.popup_type_add_card');
const inputNameCardPopupAddCard = sectionPopupAddCard.querySelector('.popup__input_type_name-card');
const inputAddressCardPopupAddCard = sectionPopupAddCard.querySelector('.popup__input_type_address-card');
const buttonSubmitPopupAddCard = sectionPopupAddCard.querySelector('.popup_button-submit_type_add-card');
const buttonExitPopupAddCard = sectionPopupAddCard.querySelector('.popup_button-exit_type_add-card');

const cardTemplate = document.querySelector('#card').content;
const elementCard = cardTemplate.querySelector('.element__card');
const sectionElement = document.querySelector('.element');

const createCard = (cardName, cardLink) => {
  const elementCard = cardTemplate.querySelector('.element__card').cloneNode(true);
  const elementCardImage = elementCard.querySelector('.element__card-image');
  const elementCardTitle = elementCard.querySelector('.element__card-title');
  elementCardImage.src = cardLink;
  elementCardTitle.textContent = cardName;
  return elementCard;
}

const renderCard = (conteainer, cardName, cardLink) => {
  conteainer.prepend(createCard(cardName, cardLink));
}

initialCards.forEach((item)=>{
  renderCard(sectionElement, item.name, item.link);
});


function closePopup(elementPopup){
 elementPopup.classList.remove('popup_opened');
}

function openPopup(elementPopup){
  elementPopup.classList.add('popup_opened');
}

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

  renderCard(sectionElement, inputNameCardPopupAddCard.value, inputAddressCardPopupAddCard.value);
  closePopup(sectionPopupAddCard);
})
