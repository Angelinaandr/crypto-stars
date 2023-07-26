const switchTabs = (target, tabs) => {
  if(!target.matches('.is-active')){
    tabs.forEach((tab) => {
      tab.classList.remove('is-active');
    });
    target.classList.add('is-active');
  }
};

const initTabsListeners = (tabs, switchTab, users) => {
  tabs.forEach((tab) => {

    tab.addEventListener('click', (event) => switchTab(event, tabs, users));
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';


export { switchTabs, initTabsListeners, isEscapeKey };
