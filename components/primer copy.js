const page = document.querySelector(".page");
const content = page.querySelector(".content");
const elementsList = page.querySelector(".elements__list");

const profile = content.querySelector(".profile");
const profileFigure = profile.querySelector(".profile__figure");

//!--------------------------------------------------------------кнопки прифиля-----------------------------------------------------\\
const profileEditButton = profileFigure.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

//!--------------------------------------------------------------текст профиля------------------------------------------------------\\
const profileInfo = profileFigure.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileText = profileInfo.querySelector(".profile__text");

//!--------------------------------------------------------------попап профиль------------------------------------------------------\\
const popupEditProfile = page.querySelector(".popup_type_edit-profile"); //*попап с фоном
const popupContainerEditProfile = popupEditProfile.querySelector(".popup__container_type_edit-profile"); //* белая форма заполнения

const popupEditProfileButtonExit = popupEditProfile.querySelector( ".popup__form-button-exit"); //* кнопка закрытия попапа
const popupFormEditProfile = popupContainerEditProfile.querySelector(".popup__form_edit-profile"); //* для отправки данных (тег form)

const popupFormInputUserName = popupFormEditProfile.querySelector(".popup__form-input_type_name"); //* инпут с именем
const popupFormInputProfession = popupFormEditProfile.querySelector(".popup__form-input_type_profession"); //* инпут с профессией

//!--------------------------------------------------------------попап новое место--------------------------------------------------\\
const popupNewMesto = page.querySelector(".popup_type_new-mesto"); //*попап с фоном
const popupContainerNewMesto = popupNewMesto.querySelector(".popup__container_type_new-mesto"); //* белая форма заполнения

const popupNewMestoButtonExit = popupContainerNewMesto.querySelector(".popup__form-button-exit"); //* кнопка закрытия попапа
const popupFormNewMesto = popupContainerNewMesto.querySelector(".popup__form_type_new-mesto"); //* для отправки данных (тег form)

const popupFormInputCartName = popupFormNewMesto.querySelector(".popup__form-input_type_cart-name"); //* инпут с именем карты
const popupFormInputCartLink = popupFormNewMesto.querySelector(".popup__form-input_type_cart-link"); //* инпут с ссылкой на изображение

//!--------------------------------------------------------------попап просмотр изображения--------------------------------------------------\\
const popupTypeViewer = page.querySelector(".popup_type_viewer"); //* попап с фоном
const popupContainerTypeViewer = popupTypeViewer.querySelector(".popup__container_type_viewer");
const popupTypeViewerButton = popupTypeViewer.querySelector(".popup__form-button-exit"); //* кнопка закрытия попапа
const popupTypeViewerImage = popupTypeViewer.querySelector(".popup__image"); //* картинка внутри попапа
const elementsImage = elementsList.querySelectorAll(".elements__image"); //* изображение для открытия попапа
const popupCaption = popupTypeViewer.querySelector(".popup__caption"); //* подпись картинки
const cartTitle = elementsList.querySelectorAll(".elements__title") //* название картинки
const arrCartTitle = Array.from(cartTitle);

//?--------------функции открытия-закрытия---------------\\
function showPopup(popup) {
  popup.classList.add("popup_show");
  document.addEventListener('keydown', handleESC);
}

function closePopup (popup){
  popup.classList.remove("popup_show");
  document.removeEventListener('keydown', handleESC);
}


//----------------функция закрытия попапа при нажатии на esc-------\\

function handleESC(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_show'));
  };
}

//----------------функция закрытия попапа при нажатии за пределами формы попапа-------\\

function setClosePopupEventListener(namePopup, formPopup){
  namePopup.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
    const evtTarget = evt.target;
    if (!formPopup.contains(evtTarget)){
      closePopup(namePopup);
    }
  });
}

//?---------------открытие-закрытие попапа профиля------------------------------------\\
profileEditButton.addEventListener("click", function(){
  showPopup(popupEditProfile);
  popupFormInputUserName.value = profileTitle.textContent;
  popupFormInputProfession.value = profileText.textContent;
});
popupEditProfileButtonExit.addEventListener("click", function(){closePopup(popupEditProfile)});

setClosePopupEventListener(popupEditProfile,popupFormEditProfile);


//?---------------открытие-закрытие попапа новое место-----------------------------------\\
profileAddButton.addEventListener("click", function(){showPopup(popupNewMesto)});
popupNewMestoButtonExit.addEventListener("click", function(){closePopup(popupNewMesto)});

setClosePopupEventListener(popupNewMesto,popupFormNewMesto);

//?----------------------------------открытие-закрытие попапа просмотра изображения  --------------------------------\\
popupTypeViewerButton.addEventListener("click", function(){closePopup(popupTypeViewer)});
setClosePopupEventListener(popupTypeViewer,popupContainerTypeViewer);

//?--------------отправка формы попапа профиля-----------------------------------\\
popupFormEditProfile.addEventListener("submit", handleProfileSubmit);

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupFormInputUserName.value;
  profileText.textContent = popupFormInputProfession.value;
  closePopup(popupEditProfile);
}

//?--------------отправка формы попапа новое место-----------------------------------\\
popupFormNewMesto.addEventListener("submit", formSubmitNewMesto);

function formSubmitNewMesto(evt) {
  evt.preventDefault();
  const cartLink = popupFormInputCartLink.value;
  const cartName = popupFormInputCartName.value;

  renderCard(cartName, cartLink, elementsList);

  evt.target.reset();


  const button = popupFormNewMesto.querySelector(".popup__form-button-save");
  button.classList.add("popup__form-button-save_type_unable");
  button.disabled = true;

  closePopup(popupNewMesto);
}

//---------------------функция создания новой карточки------------------------\\\
function createCart(name, link){
  const cartTemlate = page.querySelector("#cart-template").content;
  const element = cartTemlate.querySelector(".elements__element").cloneNode(true);
  const cartImageTemp = element.querySelector(".elements__image");
  const cartTitleTemp = element.querySelector(".elements__title");

  cartImageTemp.src = link;
  cartImageTemp.alt = name;
  cartTitleTemp.textContent = name;

  //*--------------добавление событие кнопки likee-----------------------------------\\
  const newLike = element.querySelector(".elements__image-likee");
  newLike.addEventListener("click", function (evt) {
    const evtTarget = evt.target;
    evtTarget.classList.toggle("elements__image-like_active");
  });

  //*--------------добавление событие кнопки удаления-----------------------------------\\
  const elementButtonRemove = element.querySelector(".elements__button-remove");
  elementButtonRemove.addEventListener("click", function (evt) {
    element.remove();
  });

  //*-----------добавление события новой картинки-----------------------------\\
  cartImageTemp.addEventListener("click", function(evt){
    const evtTarget = evt.target;
    popupTypeViewerImage.src = evtTarget.src;
    popupCaption.textContent = cartTitleTemp.textContent;
    popupTypeViewerImage.alt = evtTarget.alt;
    showPopup(popupTypeViewer);
  });

  return element;
}

//-------------------функция добавления карточки в контейнер-------------------------------\\
function renderCard(nameTitle, linkImg, conteiner){
  conteiner.prepend(createCart(nameTitle, linkImg));
}
