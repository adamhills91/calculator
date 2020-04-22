const calculator = {
  displayNum: "0",
  inputOne: null,
  inputTwo: null,
};

function updateDisplay() {
  const display = document.querySelector("#display");
  display.value = calculator.displayNum;
}

const keys = document.querySelector("#buttons");

keys.addEventListener("click", e => {
  const target = e.target;
  if (target.classList.contains('operator')) {
    inputOperator(target.innerHTML);
  } else if (target.classList.contains('decimal')) {
    inputDecimal(target.innerHTML);
  } else if (target.classList.contains('reset')) {
    resetCalcuator();
  } else if (!target.matches('button')) {
    return;
  } else {
    inputNum(target.innerHTML);
  }
  updateDisplay();
});

window.addEventListener("keydown", e => {
  const target = e.key;
  const buttons = document.querySelectorAll("button");
  let selectedButton;
  if (target === "*") {
    selectedButton = buttons[i];
  } else if (target === "/") {
    console.log("÷");
  } else if (target === "Escape") {
    console.log("clear")
  } else {
    for (let i = 0; i < buttons.length; i++) {
      if (target === buttons[i].innerHTML) {
        let selectedButton = buttons[i];
      }
    }
  }

  switch (target) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
    case "Enter":
      inputOperator(target);
      updateDisplay();
      break;
    case ".":
      inputDecimal(target);
      updateDisplay();
      break;
    case "Escape":
      resetCalcuator();
      updateDisplay();
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      inputNum(target);
      updateDisplay();
      break;
  }
});


function inputNum(num) {
  const displayNum = calculator.displayNum;
  const waitingForSecondNum = calculator.waitingForSecondNum;
  if (waitingForSecondNum === true) {
    calculator.displayNum = num;
    calculator.waitingForSecondNum = false;
  }
  else {
    if (displayNum === '0') {
      calculator.displayNum = num;
    } else {
      calculator.displayNum = displayNum + num;
    }
  }
};

function inputDecimal(digit) {
  if (calculator.waitingForSecondNum === true) return;

  if (!calculator.displayNum.includes(digit)) {
    calculator.displayNum += digit;
  }
};

function inputOperator(nextOperator) {
  const inputOne = calculator.inputOne;
  const displayNum = calculator.displayNum;
  const operator = calculator.operator;
  const inputNum = parseFloat(displayNum);

  if (operator && calculator.waitingForSecondNum) {
    calculator.operator = nextOperator;
    return;
  }

  if (inputOne === null) {
    calculator.inputOne = inputNum;
  } else if (operator) {
    const currentValue = inputOne || 0;
    const result = performCalculation(operator, currentValue, inputNum);
    calculator.displayNum = String(result);
    calculator.inputOne = result;
  }

  calculator.waitingForSecondNum = true;
  calculator.operator = nextOperator;
};

function performCalculation(operator, inputOne, inputTwo) {
  switch (operator) {
    case "÷":
    case "/":
      return inputOne / inputTwo;
    case "×":
    case "*":
      return inputOne * inputTwo;
    case "+":
      return inputOne + inputTwo;
    case "-":
      return inputOne - inputTwo;
    case "=":
    case "Enter":
      return inputTwo;
  }
};

function resetCalcuator() {
  calculator.displayNum = "0";
  calculator.inputOne = null;
  calculator.waitingForSecondNum = false;
  calculator.operator = null;
};

