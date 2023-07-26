import { fillDataModal } from './buy.js';
const modalSell = document.querySelector('.modal--sell');
const overlaySell = modalSell.querySelector('.modal__overlay');
const btnXSell = modalSell.querySelector('.modal__close-btn');
const transactionInfoSell = modalSell.querySelector('.transaction-info');
const transactionNameSell = transactionInfoSell.querySelector('.transaction-info__item--name');
const transactionExchangeRateSell = transactionInfoSell.querySelector('.transaction-info__item--exchangerate').querySelector('.transaction-info__data');
const transactionCashLimitSell = transactionInfoSell.querySelector('.transaction-info__item--cashlimit').querySelector('.transaction-info__data');
const fillDataModalSell = (users, evt) => fillDataModal(users, evt, transactionNameSell, transactionExchangeRateSell, transactionCashLimitSell);

export { modalSell, overlaySell, btnXSell, fillDataModalSell };
