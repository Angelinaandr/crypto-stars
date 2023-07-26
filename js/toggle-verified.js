import { renderUsers } from './list.js';
import { filterMeta, filterUsers } from './controls-buy-sell.js';
import { markerGroupUnVerified, createPointsUnverified } from './map.js';
import { openModal } from './modal-open-close.js';
const checkedUsersInput = document.querySelector('#checked-users');

const toggleVerifiedMap = (users) => {
  if(checkedUsersInput.checked === true){
    markerGroupUnVerified.clearLayers();
  } else {
    createPointsUnverified(users);
  }
};

const toggleCheckedCustom = (users) => {
  checkedUsersInput.addEventListener('change', () => {
    filterMeta.isVerified = checkedUsersInput.checked;
    const filteredUsers = filterUsers(users, filterMeta);
    renderUsers(filteredUsers);
    toggleVerifiedMap(users);
    const modalNow = filterMeta.isSellOrBuy();
    const overlayNow = filterMeta.overlay();
    const btnXNow = filterMeta.btnX();
    openModal(filteredUsers, modalNow, btnXNow, overlayNow);
  });
};

export { toggleCheckedCustom, toggleVerifiedMap };
