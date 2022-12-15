let num1 = [];
let num2 = [];
let num1_clean = 0;
let num2_clean = 0;
let operation = "Empty";
let phase_1 = Boolean(true);
let phase_2 = Boolean(false);
let result = 0;
let result_calculated = Boolean(false);
let clear_count = 0;

document.addEventListener("DOMContentLoaded", function () {
  let viewspace = document.querySelector("#viewspace");
  let clear_btn = document.querySelector("#clear");
  let equals = document.querySelector("#equals");
  let polarity_switch = document.querySelector("#change-polarity");
  viewspace.innerHTML = "0";

  clear_btn.onclick = clear;
  equals.onclick = () => {
    console.log("Operation: " + operation);
    cleanNumbers(num1, num2);
    if (phase_2) {
      switch (operation) {
        case "add":
          add();
          break;
        case "subtract":
          subtract();
          break;
        case "multiply":
          multiply();
          break;
        case "divide":
          divide();
      }
      console.log(result);
      viewspace.innerHTML = result.toLocaleString();
      num1 = num2;
      num2 = [];
      phase_2 = false;
      result_calculated = true;
    }
  };

  polarity_switch.onclick = () => {
    if (phase_1) {
      if (num1[0] === "-") {
        num1.shift();
      } else {
        num1.unshift("-");
      }
    } else {
      if (num2[0] === "-") {
        num2.shift();
      } else {
        num2.unshift("-");
      }
    }
    viewspace.innerHTML = result;
  };

  document
    .querySelectorAll(".grid-item.numerical-btn")
    .forEach(function (button) {
      button.onclick = function () {
        if (phase_1) {
          num1.push(button.dataset.value);
          console.log("Number 1: " + num1);
          viewspace.innerHTML = parseInt(num1.join("")).toLocaleString();
        } else {
          num2.push(button.dataset.value);
          console.log("Number 2: " + num2);
          viewspace.innerHTML = parseInt(num2.join("")).toLocaleString();
        }
        clear_btn.innerHTML = "C";
      };
    });

  document
    .querySelectorAll(".grid-item.operator-btn")
    .forEach(function (button) {
      button.onclick = function () {
        operation = button.dataset.value;
        console.log("Operation: " + operation);
        phase_1 = false;
        phase_2 = true;
      };
    });

  function clear() {
    if (phase_1 && clear_count != 1) {
      console.log("clearing 1");
      num1 = [];
      clear_count++;
    } else if (phase_2 && clear_count != 1) {
      console.log("clearing 2");
      num2 = [];
      clear_count++;
    } else if (viewspace.innerHTML == result || clear_count >= 1) {
      console.log("full clearing");
      num1 = [];
      num2 = [];
      phase_1 = true;
      clear_count = 0;
      result_calculated = false;
    }
    viewspace.innerHTML = "0";
    clear_btn.innerHTML = "AC";
    operation = null;
    num1_clean = 0;
    num2_clean = 0;
  }

  function add() {
    result = num1_clean + num2_clean;
  }

  function multiply() {
    result = num1_clean * num2_clean;
  }

  function subtract() {
    result = num1_clean - num2_clean;
  }

  function divide() {
    result = num1_clean / num2_clean;
  }

  function cleanNumbers(num1, num2) {
    num1_clean = parseInt(num1.join(""));
    num2_clean = parseInt(num2);
  }
});
