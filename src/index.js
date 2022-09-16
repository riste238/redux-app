import store from './store.js';
import * as action_creators  from './action_creators.js';


let tbody = document.querySelector('tbody');
let btnAccounts = document.querySelector('#accounts');
let btnAddAccounts = document.querySelector('#add-accounts');
let accountsView = document.querySelector('#accountsView');
let addAccountsView = document.querySelector('#addAccountsView');
let saveAccountBtn = document.querySelector('#saveAccountBtn');


window.addEventListener('load',function(){
    store.dispatch(action_creators.START());
});

store.subscribe(function(){
    displayAccounts();
    changeView();

})

function displayAccounts(){
    let accounts = store.getState().accounts;
    let text = '';
    for (let i = 0; i < accounts.length; i++) {
       let account = accounts[i];
       text += `
        <tr>
        <td>${account.id}</td>
        <td>${account.name}</td>
        <td>${account.phone}</td>
        <td>${account.email}</td>
        <td><button class="btn btn-danger delete" data-id="${account.id}">Delete</button></td>
        </tr>
       `
        
    }
    tbody.innerHTML = text;

    let allDeleteBtns = document.querySelectorAll('.delete');

    for (let i = 0; i < allDeleteBtns.length; i++) {
            const btn = allDeleteBtns[i];

            btn.addEventListener('click', deleteAccount);
         }

}
  function deleteAccount(id){
    let idDelete = this.getAttribute('data-id');

    store.dispatch(action_creators.DELETE_ACCOUNT(idDelete))
  }
  


btnAddAccounts.addEventListener('click',function(){
    store.dispatch(action_creators.DISPLAY_ADD_ACCOUNTS_ACTION()); 
})

btnAccounts.addEventListener('click',function(){
 store.dispatch(action_creators.DISPLAY_ACCOUNTS_ACTION());
})

saveAccountBtn.addEventListener('click',function(){
    store.dispatch(action_creators.ADD_NEW_ACCOUNT({
        id: document.querySelector('[placeholder="id"]').value, 
        name: document.querySelector('[placeholder="name"]').value, 
        phone: document.querySelector('[placeholder="phone"]').value, 
        email: document.querySelector('[placeholder="email"]').value
    }));
    store.dispatch(action_creators.DISPLAY_ACCOUNTS_ACTION());
     document.querySelector('[placeholder="id"]').value= ""; 
     document.querySelector('[placeholder="name"]').value = "";
    document.querySelector('[placeholder="phone"]').value = ""; 
    document.querySelector('[placeholder="email"]').value ="";
})

function changeView(){
   let view = store.getState().display;
    if(view == 1){
        accountsView.style.display = 'block';
        addAccountsView.style.display = 'none';
    }
    else {
        accountsView.style.display = 'none';
        addAccountsView.style.display = 'block';
    }
}
