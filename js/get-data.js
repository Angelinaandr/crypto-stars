import { renderUsers } from './list.js';
import { initTabsListenersMapList, hideMap } from './controls-map-list.js';
import { initTabsListenersBuySell } from './controls-buy-sell.js';
import { toggleCheckedCustom } from './toggle-verified.js';
import { initMap } from './map.js';
import { openModalBuy } from './modal-open-close.js';
import { showUserParameters } from './user-parameters.js';
//import { displayPoints } from './map.js';
fetch('https://cryptostar.grading.pages.academy/user')
  .then((response) => response.json())
  .then((data) => {
    console.log(data, 'data');
    showUserParameters(data);

  });

fetch('https://cryptostar.grading.pages.academy/contractors')
  .then((response) => response.json())
  .then((users) => { //Вызвать одну функцию
    console.log(users); //users
    renderUsers(users);
    initMap();
    initTabsListenersBuySell(users);
    initTabsListenersMapList(users);
    hideMap();
    toggleCheckedCustom(users);
    openModalBuy(users);
  }
  );
