import "./style.css";

const billInput = document.querySelector("#bill-input");
const peopleInput = document.querySelector("#people-input");
const customInput = document.querySelector(".custom__input");
const tipPercentage = document.querySelectorAll(".selector");

const resetBtn = document.querySelector(".reset__btn");
const error = document.querySelector(".cant__zero");

const tipAmount = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#total-amount");
resetBtn.disabled = true;

// Reseting inputs value and defaulting tip percentenge button (on 15%)

resetBtn.addEventListener("click", (event) => {
  billInput.value = "";
  billInput.placeholder = "0";
  customInput.value = "Custom";
  peopleInput.value = "";
  peopleInput.placeholder = "0";
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";

  tipPercentage.forEach((tipBtn) => {
    tipBtn.classList.remove("active");
  });

  resetBtn.classList.remove("active");
  resetBtn.disabled = true;
  error.classList.add("hidden");
  peopleInput.classList.remove("error__line");

  // tipPercentage[2].classList.add("active");
});

// Tip percentage buttons clickable and
tipPercentage.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    tipPercentage.forEach((tipBtn) => {
      tipBtn.classList.remove("active");
    });

    if (event.target.classList.contains("custom__input")) {
      event.target.parentElement.classList.add("active");
    } else {
      event.target.classList.add("active");
    }

    calculateTip();
  });
});

// Tip Calculator
const calculateTip = () => {
  // Check if inputs are empty and if not, active reset button
  if (
    billInput.value !== "" ||
    customInput.value !== "" ||
    peopleInput !== ""
  ) {
    resetBtn.classList.add("active");
    resetBtn.disabled = false;
  } else {
    resetBtn.classList.remove("active");
  }

  const billValue = parseFloat(billInput.value);
  const peopleNumber = parseFloat(peopleInput.value);

  // Check if number of people is 0, and add error if it is
  if (peopleNumber === 0) {
    error.classList.remove("hidden");
    peopleInput.classList.add("error__line");
  } else {
    error.classList.add("hidden");
    peopleInput.classList.remove("error__line");
  }

  const customInputActive = document.querySelector(".custom__btn.active");
  let activeTipPercentage = parseFloat(
    document.querySelector(".selector.active").dataset.percent
  );

  // Check if custom tip is active and take it's value insted
  if (customInputActive) {
    activeTipPercentage = parseFloat(customInput.value);
  }

  // Calculate and round od 2 decimals
  const totalTip =
    Math.round(
      ((activeTipPercentage / 100) * billValue + Number.EPSILON) * 100
    ) / 100;
  const tipPerPerson =
    Math.round((totalTip / peopleNumber + Number.EPSILON) * 100) / 100;

  const splitBill = billValue / peopleNumber;
  const totalPerPerson =
    Math.round((splitBill + tipPerPerson + Number.EPSILON) * 100) / 100;

  // Put results into HTML element
  // Check if result is NaN or people number equals to 0
  if (isNaN(tipPerPerson) || isNaN(totalPerPerson) || peopleNumber === 0) {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  } else {
    tipAmount.textContent = `$${parseFloat(tipPerPerson).toFixed(2)}`;
    totalAmount.textContent = `$${parseFloat(totalPerPerson).toFixed(2)}`;
  }
};

const isNumber = (value) => {
  // Allow Exceptions
  if (
    value === "Backspace" ||
    value === "ArrowLeft" ||
    value === "ArrowRight" ||
    value === "."
  ) {
    return true;
  }

  const regex = /^[0-9]+$/;

  return regex.test(value);
};

// Prevent alphabetical characters from being entered
billInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
customInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});
peopleInput.addEventListener("keydown", (event) => {
  if (!isNumber(event.key)) {
    event.preventDefault();
  }
});

//Listeners for any changes in inputs and buttons
billInput.addEventListener("keyup", (event) => {
  calculateTip();
});
customInput.addEventListener("keyup", (event) => {
  calculateTip();
});
peopleInput.addEventListener("keyup", (event) => {
  calculateTip();
});

// Delete starting value when focus on input
billInput.addEventListener("focus", function () {
  billInput.value = "";
});
peopleInput.addEventListener("focus", function () {
  peopleInput.value = "";
});
customInput.addEventListener("focus", function () {
  customInput.value = "";
});
