export function closePopup(elementPopup){
  elementPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleESC);
 }

export function openPopup(elementPopup){
   elementPopup.classList.add('popup_opened');
   document.addEventListener('keydown', handleESC);
 }

 function handleESC(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

export function setClosePopupEventListener(popup, formPopup){
  popup.addEventListener('click', function(evt){   //закрытие попапа при клике за пределами формы
    const evtTarget = evt.target;
    if (!formPopup.contains(evtTarget)){
      closePopup(popup);
    }
  });
}
