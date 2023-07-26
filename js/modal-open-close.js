import { usersList } from './list.js';
import { isEscapeKey } from './utils.js';
import { fillDataModalBuy, modalBuy, overlayBuy, btnXBuy } from './buy.js';
import { fillDataModalSell } from './sell.js';

const closeModal = (modal) => {
  modal.setAttribute('style', 'display: none;');
  document.body.classList.remove('scroll-lock');
  //reset fields
};


const onEscClick = (event, modal) => {
  if(isEscapeKey(event)){
    event.preventDefault();
    closeModal(modal);
    document.removeEventListener('keydown', () => onEscClick(event, modal));
  }
};


const onOverlayClick = (e, modal, overlay) => {
  e.preventDefault();
  closeModal(modal);
  overlay.removeEventListener('click', () => onOverlayClick(e, modal, overlay));
};

const openModal = (users, modal, btnX, overlay) => {
  const buttonsChange = usersList.querySelectorAll('.btn--greenborder');
  buttonsChange.forEach((button) => {
    button.addEventListener('click', (evt) => {
      modal.removeAttribute('style');
      document.body.classList.add('scroll-lock');
      document.addEventListener('keydown', (event) => onEscClick(event, modal));
      overlay.addEventListener('click', (e) => onOverlayClick(e, modal, overlay));
      btnX.addEventListener('click', () => closeModal(modal));
      fillDataModalBuy(users, evt);
      fillDataModalSell(users, evt);
    });
  });
};

const openModalBuy = (users) => openModal(users, modalBuy, btnXBuy, overlayBuy );
// const openModalFilteredUsers = () => {

// }

export { openModal, openModalBuy };
