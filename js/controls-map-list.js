import { switchTabs, initTabsListeners } from './utils.js';
import { createPointsVerified, createPointsUnverified } from './map.js';
import { toggleVerifiedMap } from './toggle-verified.js';
const tabsControlsListMap = document.querySelector('.tabs--toggle-list-map');
const buttonsListMap = tabsControlsListMap.querySelector('.tabs__controls').querySelectorAll('.tabs__control');
const headerUsersList = document.querySelector('.users-list');
const mapContainer = document.querySelector('#map-container');


mapContainer.removeAttribute('style');
const switchTabsMapList = (event, tabs, users) => {
  const target = event.target;
  switchTabs(target, tabs);
  if(target.textContent === 'Карта'){
    headerUsersList.classList.add('visually-hidden');
    mapContainer.removeAttribute('style');
    createPointsVerified(users);
    createPointsUnverified(users);
    toggleVerifiedMap(users);
    //console.log(mapContainer.textContent);
  } else {
    headerUsersList.classList.remove('visually-hidden');
    mapContainer.style.display = 'none';
  }
};

const initTabsListenersMapList = (users) => {
  initTabsListeners(buttonsListMap, switchTabsMapList, users);
  //createPoints(users);
};

const hideMap = () => {
  mapContainer.style.display = 'none';
};

export { initTabsListenersMapList , hideMap};
