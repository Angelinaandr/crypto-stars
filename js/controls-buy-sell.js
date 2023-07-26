import { renderUsers } from './list.js';
import { switchTabs, initTabsListeners } from './utils.js';
import { openModal } from './modal-open-close.js';
import { modalBuy,overlayBuy, btnXBuy } from './buy.js';
import { modalSell, overlaySell, btnXSell } from './sell.js';

const tabsControlsBuySell = document.querySelector('.tabs--toggle-buy-sell');
const tabsBuySell = tabsControlsBuySell.querySelector('.tabs__controls').querySelectorAll('.tabs__control');

const filterMeta = {
  status : 'seller', //BUY/SELL status=buyer/seller
  isVerified : false, //TRUE/FALSE,
  isMatch : function(userStatus, userIsVerified){
    if(this.isVerified){
      return userStatus === this.status && userIsVerified;
    }else{
      return userStatus === this.status;
    }
  },
  isSellOrBuy: function(){
    if(this.status === 'seller'){
      return modalBuy;
    } else {
      return modalSell;
    }
  },
  btnX : function(){
    if(this.status === 'seller'){
      return btnXBuy;
    } else {
      return btnXSell;
    }
  },
  overlay: function(){
    if(this.status === 'seller'){

      return overlayBuy;
    } else {
      return overlaySell;
    }
  }
};

const changeFilterMeta = (target) => {
  if(target.textContent === 'Купить'){
    filterMeta.status = 'seller';
  } else {
    filterMeta.status = 'buyer';
  }
};

const filterUsers = (users) => users.filter(({status, isVerified}) => filterMeta.isMatch(status, isVerified));

const switchTabsBuySell = (event, tabs, users) => {
  const target = event.target;
  // //switchTabs(target);
  // if(!target.matches('.is-active')){
  //   tabs.forEach((tab) => {
  //     tab.classList.remove('is-active');
  //   });
  //   target.classList.add('is-active'); //switchTabs
  switchTabs(target, tabs);
  changeFilterMeta(target);
  const filteredUsers = filterUsers(users);
  renderUsers(filteredUsers);
  const modalNow = filterMeta.isSellOrBuy();
  const overlayNow = filterMeta.overlay();
  const btnXNow = filterMeta.btnX();
  openModal(filteredUsers, modalNow, btnXNow, overlayNow );
};

const initTabsListenersBuySell = (users) => {
  initTabsListeners(tabsBuySell, switchTabsBuySell, users);
};

// const toggleCheckedCustom = (users) => {
//   checkedUsersInput.addEventListener('change', () => {
//     filterMeta.isVerified = checkedUsersInput.checked;
//     const filteredUsers = filterUsers(users, filterMeta);
//     renderUsers(filteredUsers);
//   });
// };

export { initTabsListenersBuySell, tabsBuySell, filterMeta, filterUsers };
