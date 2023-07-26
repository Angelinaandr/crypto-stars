import { findBalance, Currency } from './user-parameters.js';
const formBuy = document.querySelector('.modal-buy');
const formSell = document.querySelector('.modal-sell');
const paymentBuyInput = formBuy.querySelector('#payment');
const transferBuyInput = formBuy.querySelector('#transfer');
const paymentSellInput = formSell.querySelector('#payment-sell');
const transferSellInput = formSell.querySelector('#transfer-sell');

const pristineBuyForm = new Pristine(formBuy, {
  classTo: 'custom-input__error-wrapper',
  errorTextParent: 'custom-input__error-wrapper',
  errorTextClass: 'custom-input__error',
  //errorTextTag: 'span',
});

const pristineSellForm = new Pristine(formSell, {
  classTo: 'custom-input__error-wrapper',
  errorTextParent: 'custom-input__error-wrapper',
  errorTextClass: 'custom-input__error',
});


let choosenUserBuy;
let customer;
let errMessagePaymentBuy = '';

const getChoosenUserBuy = (user) => {
  choosenUserBuy = user;
};

const getCustomer = (user) => {
  customer = user;
};

const validateFormPaymentBuy = (value) => {
  const foundUserBalance = findBalance(customer, Currency.RUSSIA);
  if(value < 0) {
    errMessagePaymentBuy = 'Значение не может быть отрицательным.';
    return false;
  }
  if(value === 0) {
    errMessagePaymentBuy = '0 - недопустимое значение';
    return false;
  }
  if(value > foundUserBalance){
    errMessagePaymentBuy = 'На вашем счете недостаточно средств.';
    return false;
  }
  if(value < (choosenUserBuy.minAmount * choosenUserBuy.exchangeRate)){
    errMessagePaymentBuy = 'Указано значение меньше минимального размера сделки';
    return false;
  }
  if(value > (choosenUserBuy.balance.amount * choosenUserBuy.exchangeRate)){
    errMessagePaymentBuy = 'Указано значение больше максимального размера сделки';
    return false;
  }
  return true;
};

const getErrMessagePaymentBuy = () => errMessagePaymentBuy;

pristineBuyForm.addValidator(paymentBuyInput, validateFormPaymentBuy, getErrMessagePaymentBuy);

let errMessageTransferBuy = '';

const validateFormTransferBuy = (value) => {
  if(value < 0){
    errMessageTransferBuy = 'Значение не может быть отрицательным.';
    return false;
  }
  if(value === 0){
    errMessageTransferBuy = '0 - недопустимое значение';
    return false;
  }
  if(value > choosenUserBuy.balance.amount){
    errMessageTransferBuy = 'Указано значение больше максимального размера сделки';
    return false;
  }
  if(value < (choosenUserBuy.minAmount / choosenUserBuy.exchangeRate)){
    errMessageTransferBuy = 'Указано значение меньше минимального размера сделки';
    return false;
  }
  return true;
};

const getErrMessageTransferBuy = () => errMessageTransferBuy;

pristineBuyForm.addValidator(transferBuyInput, validateFormTransferBuy, getErrMessageTransferBuy);

let errMessagePaymentSell = '';

const validateFormPaymentSell = (value) => {
  const foundUserBalanceKeks = findBalance(customer, Currency.HTML_ACADEMY);
  if(value < 0) {
    errMessagePaymentSell = 'Значение не может быть отрицательным.';
    return false;
  }
  if(value === 0) {
    errMessagePaymentSell = '0 - недопустимое значение';
    return false;
  }
  if(value > foundUserBalanceKeks){
    errMessagePaymentSell = 'На вашем счете недостаточно средств.';
    return false;
  }
  if(value < (choosenUserBuy.minAmount / choosenUserBuy.exchangeRate)){
    errMessagePaymentSell = 'Указано значение меньше минимального размера сделки';
    return false;
  }
  if(value > (choosenUserBuy.balance.amount / choosenUserBuy.exchangeRate)){
    errMessagePaymentSell = 'Указано значение больше максимального размера сделки';
    return false;
  }
  return true;
};

const getErrMessagePaymentSell = () => errMessagePaymentSell;

pristineSellForm.addValidator(paymentSellInput, validateFormPaymentSell, getErrMessagePaymentSell);

let errMessageTransferSell = '';

const validateFormTransferSell = (value) => {
  if(value < 0){
    errMessageTransferSell = 'Значение не может быть отрицательным.';
    return false;
  }
  if(value === 0){
    errMessageTransferSell = '0 - недопустимое значение';
    return false;
  }
  if(value > choosenUserBuy.balance.amount){
    errMessageTransferSell = 'Указано значение больше максимального размера сделки';
    return false;
  }
  if(value < choosenUserBuy.minAmount){
    errMessageTransferSell = 'Указано значение меньше минимального размера сделки';
    return false;
  }
  return true;
};

const getErrMessageTransferSell = () => errMessageTransferSell;

pristineSellForm.addValidator(transferSellInput, validateFormTransferSell, getErrMessageTransferSell);

// new Pristine(formBuy);
// formBuy.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const isValid = pristineBuyForm.validate();
//   if(isValid){
//     console.log('ok');
// } else {
//   console.log('no')
// }
// })

export { getChoosenUserBuy, getCustomer };
