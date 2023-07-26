
const userTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
const usersList = document.querySelector('.users-list__table-body');
const fragment = document.createDocumentFragment();
const calculateLimitForSeller = (minAmount, exchangeRate, balance) => `${Math.floor(minAmount * exchangeRate)} ₽ - ${Math.floor(balance.amount * exchangeRate)} ₽`;
const calculateLimitForBayer = (minAmount, balance) => `${minAmount} ₽ - ${balance.amount} ₽`;
const makeElOfList = (parent, arrayPayMethods) => {
  parent.innerHTML = '';
  const fargmentList = document.createDocumentFragment();
  arrayPayMethods.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('users-list__badges-item');
    li.classList.add('badge');
    li.textContent = item.provider;
    fargmentList.appendChild(li);
  });
  parent.appendChild(fargmentList);
};
//renderUsers
const renderUsers = (users) => {
  usersList.innerHTML = '';
  users.forEach(({balance, isVerified, exchangeRate, userName, status, minAmount, paymentMethods, id}) => {
    const userElement = userTemplate.cloneNode(true);
    const userListName = userElement.querySelector('.users-list__table-name');
    const userTablePayments = userElement.querySelector('.users-list__table-payments');
    const userListPayments = userTablePayments.querySelector('.users-list__badges-list');
    userElement.dataset.customerId = id;

    if(isVerified === false){
      userListName.removeChild(userElement.querySelector('svg'));
    }
    if(status === 'seller'){
      userElement.querySelector('.users-list__table-cashlimit').textContent = calculateLimitForSeller(minAmount, exchangeRate, balance);
      makeElOfList(userListPayments, paymentMethods);
    }else {
      userElement.querySelector('.users-list__table-cashlimit').textContent = calculateLimitForBayer(minAmount, balance);
      userTablePayments.removeChild(userElement.querySelector('.users-list__badges-list'));
    }
    userListName.querySelector('span').textContent = userName;
    userElement.querySelector('.users-list__table-exchangerate').textContent = exchangeRate;
    userElement.querySelector('.users-list__table-currency').textContent = balance.currency;
    fragment.appendChild(userElement);
  });
  usersList.appendChild(fragment);
};


//usersList.appendChild(userElement);

export { renderUsers, makeElOfList, usersList, calculateLimitForBayer, calculateLimitForSeller };
