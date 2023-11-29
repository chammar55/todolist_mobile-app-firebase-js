// firebase cdn for connectivity
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// chammar5255@gmail.com
// link of my realtime dataset on firebase
const appSettings = {
  databaseURL:
    "https://playground-7f0e8-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// connect over project to firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", () => {
  let inputValue = inputFieldEl.value;
  //   push the input value to firebase
  push(shoppingListInDB, inputValue);
  clearInputFieldEl();
});

// fetching data from firebase
onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    // firebase gives us data in object from
    // convert that object into Array
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here...";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

// let scrimbaUsers = {
//   "00": "sindra@scimba.com",
//   "01": "per@scrimba.com",
//   "02": "frode@scrimba.com",
// };

// let scrimbaUsersEmails = Object.values(scrimbaUsers);
// let scrimbaUsersIDs = Object.keys(scrimbaUsers);
// let scrimbaUsersEntries = Object.entries(scrimbaUsers);

// console.log(scrimbaUsersEntries);
