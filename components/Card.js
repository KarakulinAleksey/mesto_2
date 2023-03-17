import {openPopup} from "./utils.js";
const sectionPopupImage = document.querySelector('.popup_type_image');
const popupImageImageBlock = sectionPopupImage.querySelector('.popup__image');
const popupImageTitle = sectionPopupImage.querySelector('.popup__image-title');

export default class Card {
    constructor(cardTemplate, data) {
    this.cardTemplate = cardTemplate;
    this.cardName = data.name;
    this.cardLink = data.link;

    this.element = this._getTemplate(); //делаем копию темплейта

    this.elementCardImage = this.element.querySelector(".element__card-image");
    this.elementCardTitle = this.element.querySelector(".element__card-title");
    this.elementCardButtonLike = this.element.querySelector(".element__card-button-like");
    this.elementCardButtonDeleteCard = this.element.querySelector(".element__card-button-delete");

  }

  _setEventListeners() {
    this.elementCardButtonLike.addEventListener("click", () => {
      this.elementCardButtonLike.classList.toggle(
        "element__card-button-like_color_black"
      );
    });

    this.elementCardButtonDeleteCard.addEventListener("click", () => {
      const card = this.elementCardButtonDeleteCard.closest(".element__card");
      card.remove();
    });

    this.elementCardImage.addEventListener('click', () => {
      openPopup(sectionPopupImage);
      popupImageImageBlock.src = this.cardLink;
      popupImageTitle.textContent = this.cardName;
  })
  }

  _getTemplate() {
    // const elementCard = document
    //   .querySelector(this.cardTemplate)
    //   .content.querySelector(".element__card")
    //   .cloneNode(true);

    const elementCard = this.cardTemplate
    .querySelector(".element__card")
    .cloneNode(true);

    return elementCard;
  }

  generateCard() {
    this.elementCardImage.src = this.cardLink;
    this.elementCardTitle.textContent = this.cardName;
    this._setEventListeners();

    return this.element;
  }
}
