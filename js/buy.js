import { calculateLimitForBayer, calculateLimitForSeller } from './list.js';
import { getChoosenUserBuy } from './validate.js';
const modalBuy = document.querySelector('.modal--buy');
const overlayBuy = modalBuy.querySelector('.modal__overlay');
const btnXBuy = modalBuy.querySelector('.modal__close-btn');
const paymentInput = modalBuy.querySelector('#payment');
const transferedMoneyInput = modalBuy.querySelector('#transfer');

const transactionInfoBuy = modalBuy.querySelector('.transaction-info');
const transactionNameBuy = transactionInfoBuy.querySelector('.transaction-info__item--name');
const transactionExchangeRate = transactionInfoBuy.querySelector('.transaction-info__item--exchangerate').querySelector('.transaction-info__data');
const transactionCashLimit = transactionInfoBuy.querySelector('.transaction-info__item--cashlimit').querySelector('.transaction-info__data');

const convertMoneyRubToKeks = ({exchangeRate}) => {
  paymentInput.addEventListener('input', () => {
    transferedMoneyInput.value = (paymentInput.value / exchangeRate).toFixed(2);
  });
};

const convertMoneyKeksToRub = ({exchangeRate}) => {
  transferedMoneyInput.addEventListener('input', () => {
    paymentInput.value = (exchangeRate * transferedMoneyInput.value).toFixed(2);
  });
};

const fillDataModal = (users, evt, nameField, rateField, cashLimitField) => {
  const targetUserFromList = evt.target.closest('[data-customer-id]');
  const userFromData = users.find((customer) => customer.id === targetUserFromList.dataset.customerId);
  nameField.textContent = userFromData.userName;
  rateField.textContent = userFromData.exchangeRate;
  switch(userFromData.status) {
    case 'seller':
      cashLimitField.textContent = calculateLimitForSeller(userFromData.minAmount, userFromData.exchangeRate, userFromData.balance);
      break;
    case 'buyer':
      cashLimitField.textContent = calculateLimitForBayer(userFromData.minAmount, userFromData.balance);
      break;
  }
  convertMoneyRubToKeks(userFromData);
  convertMoneyKeksToRub(userFromData);
  getChoosenUserBuy(userFromData);
};

const fillDataModalBuy = (users, evt) => fillDataModal(users, evt,transactionNameBuy, transactionExchangeRate, transactionCashLimit);

export { fillDataModal, modalBuy, overlayBuy, btnXBuy, fillDataModalBuy };
