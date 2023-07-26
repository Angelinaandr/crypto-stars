import { makeElOfList } from './list.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const cityCenter = {
  lat: 59.92749,
  lng: 30.31127
};

const iconConfig = {
  url: './img/pin.svg',
  urlVerified:'./img/pin-verified.svg',
  width: 30,
  height: 30,
  anchorX: 15,
  anchorY: 30,
};

const makeIcon = (url) => {
  const icon = L.icon({
    iconUrl: url,
    iconSize: [iconConfig.width, iconConfig.height],
    iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
  });
  return icon;
};

const map = L.map('map');

const initMap = () => {
  map.setView(cityCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};


const markerGroupVerified = L.layerGroup().addTo(map);
const markerGroupUnVerified = L.layerGroup().addTo(map);
const isCash = (user) => {
  for(let i = 0; i < user.paymentMethods.length; i++){
    if(user.paymentMethods[i].provider === 'Cash in person'){
      return true;
    }
  }
};

const getSellersForCash = (users) => users.filter((user) => user.paymentMethods !== undefined && isCash(user)) ;
const getVerifiedOrNot = (users, condition) => getSellersForCash(users).filter((user) => user.isVerified === condition);

const createCustomPopup = (point) => {
  const baloonTemplate = document.querySelector('#map-baloon__template').content.querySelector('.user-card');
  const popupElement = baloonTemplate.cloneNode(true);
  const headerUserName = popupElement.querySelector('.user-card__user-name');
  const paymentList = popupElement.querySelector('.user-card__badges-list');
  if(point.isVerified === false){
    headerUserName.removeChild(popupElement.querySelector('svg'));
  }
  headerUserName.querySelector('#name-in-popup').textContent = `Пользователь ${point.userName}`;

  popupElement.querySelector('#currency-in-popup').textContent = point.balance.currency;
  popupElement.querySelector('#rate-in-popup').textContent = point.exchangeRate;

  if(point.status === 'seller'){
    popupElement.querySelector('#limit-in-popup').textContent = `${Math.floor(point.minAmount * point.exchangeRate)} ₽ - ${Math.floor(point.balance.amount * point.exchangeRate)} ₽`;
    makeElOfList(paymentList, point.paymentMethods);
  }else {
    popupElement.querySelector('#limit-in-popup').textContent = `${point.minAmount} ₽ - ${point.balance.amount} ₽`;
    paymentList.removeChild(popupElement.querySelector('.users-list__badges-list'));
  }
  return popupElement;
};

const createPoints = (sellers, markerGroup, url) => {
  sellers.forEach((seller) => {
    const lat = seller.coords.lat;
    const lng = seller.coords.lng;

    const marker = L.marker({
      lat,
      lng
    },
    {
      icon: makeIcon(url)
    });
    marker
      .addTo(markerGroup)
      .bindPopup(createCustomPopup(seller));
  });
};

const createPointsUnverified = (users) => {
  const sellers = getVerifiedOrNot(users, false);
  createPoints(sellers, markerGroupUnVerified, iconConfig.url);
};

const createPointsVerified = (users) => {
  const verifiedSellers = getVerifiedOrNot(users, true);
  createPoints(verifiedSellers, markerGroupVerified, iconConfig.urlVerified);
};

map.on('popupopen', () => {
  document.body.classList.add('scroll-lock');
});
map.on('popupclose', () => {
  document.body.classList.remove('scroll-lock');
});


export {createPointsUnverified, createPointsVerified, initMap, markerGroupUnVerified };
