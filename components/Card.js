
const elementCardImage = elementCard.querySelector('.element__card-image');
const elementCardTitle = elementCard.querySelector('.element__card-title');
const elementCardButtonDeleteCard = elementCard.querySelector('.element__card-button-delete');
const elementCardButtonLike = elementCard.querySelector('.element__card-button-like');

class Card {
  constructor(cardTemplate, cardName, cardLink){
    this.cardTemplate = cardTemplate;
    this.cardName = cardName;
    this.cardLink = cardLink;

  }



  getTemplate(){
    const elementCard = this.cardTemplate.querySelector('.element__card').cloneNode(true);
    return elementCard;
  }
}
