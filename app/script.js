"use strict";

// get inputs and outputs

//inputs
let bill = document.querySelector("#amount");
let people = document.querySelector("#people");
let custom = document.querySelector("#custom");
let focus = document.querySelectorAll("input");

//outputs
let tip = document.querySelector(".tip-amount");
let total = document.querySelector(".total");

// buttons
let display = document.querySelectorAll(".percentage");
let reset = document.querySelector(".reset");

// error handlers
let appError = document.querySelectorAll(".error");

// set focus status
for (let i = 0; i < focus.length; i++) {
  focus[i].addEventListener("click", function () {
    let field = document.querySelectorAll(".field");
    for (let i = 0; i < focus.length; i++) {
      if (i == 2) continue;
      field[i].classList.remove("active-input");
      focus[i].classList.remove("active-input");
    }
    if (i == 0) {
      field[i].classList.toggle("active-input");
    } else if (i == 1) {
      focus[i].classList.toggle("active-input");
    } else {
      field[1].classList.toggle("active-input");
    }
  });
}

//handling errors function
let isError = function () {
  let msg = `Can't be zero`;
  let cond = true;
  if (!bill.value && !people.value) {
    appError[0].textContent = msg;
    appError[1].textContent = msg;
  } else if (!bill.value) {
    appError[0].textContent = msg;
    appError[1].textContent = "";
  } else if (!people.value) {
    appError[1].textContent = msg;
    appError[0].textContent = "";
  } else {
    appError[0].textContent = "";
    appError[1].textContent = "";
    cond = false;
  }
  return cond;
};

// Display result function
let displayResult = (percentage, index) => {
  // checking for errors
  if (isError()) {
    isError();
  } else {
    // calculating result
    let tipResult =
      (parseFloat(bill.value) * (percentage / 100)) / people.value;
    let totalResult = parseFloat(bill.value) / people.value + tipResult;

    //outputing results
    tip.textContent = tipResult.toFixed(2);
    total.textContent = totalResult.toFixed(2);

    // remove highlight
    for (let i = 0; i < display.length; i++) {
      display[i].classList.remove("active-button");
    }
    // activate reset
    reset.classList.add("active-button");
    // highlight selected buttom
    try {
      display[index].classList.toggle("active-button");
    } catch (error) {}
  }
};

// reset function
let appReset = function () {
  people.value = "";
  bill.value = "";
  custom.value = "";
  tip.textContent = "0.00";
  total.textContent = "0.00";
  reset.classList.remove("active-button");
  for (let i = 0; i < display.length; i++) {
    display[i].classList.remove("active-button");
  }
  appError[0].textContent = "";
  appError[1].textContent = "";
};

// show displayResult onClick
for (let i = 0; i < display.length; i++) {
  display[i].addEventListener("click", function () {
    displayResult(parseInt(display[i].textContent), i);
  });
}

// reset onClick
reset.addEventListener("click", appReset);

// custom percentage
custom.addEventListener("input", function (i) {
  let value = i.target.value;
  displayResult(value);
});
