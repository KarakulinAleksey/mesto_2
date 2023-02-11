const sectionProfile = document.querySelector('.profile');
const buttonEditProfile = sectionProfile.querySelector('.profile__button-edit');
let nameLabelSectionProfile = sectionProfile.querySelector('.profile__label-name');
let professionLabelSectionProfile = sectionProfile.querySelector('.profile__label-profession');

const sectionPopupEditProfile = document.querySelector('.popup_type_edit_profile');
const inputNamePopupEditProfile = sectionPopupEditProfile.querySelector('.popup__input_type_name');
const inputProfessionPopupEditProfile = sectionPopupEditProfile.querySelector('.popup__input_type_profession');
const buttonSubmitPopupEditProfile = sectionPopupEditProfile.querySelector('.popup__button-submit');
const buttonExitPopupEditProfile = sectionPopupEditProfile.querySelector('.popup__button-exit');

function closePopup(){
 sectionPopupEditProfile.classList.remove('popup_opened');
}

function openPopup(){
  sectionPopupEditProfile.classList.add('popup_opened');
}

function handleFormSubmit(evt){
  evt.preventDefault();

  nameLabelSectionProfile.textContent = inputNamePopupEditProfile.value;
  professionLabelSectionProfile.textContent = inputProfessionPopupEditProfile.value;
  closePopup();
}

buttonEditProfile.addEventListener('click', function(){
  inputNamePopupEditProfile.value = nameLabelSectionProfile.textContent;
  inputProfessionPopupEditProfile.value = professionLabelSectionProfile.textContent;
  openPopup()
});

buttonExitPopupEditProfile.addEventListener('click', closePopup);
buttonSubmitPopupEditProfile.addEventListener('click', handleFormSubmit);


