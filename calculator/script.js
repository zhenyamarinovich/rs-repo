class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;

    this.negative = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && String(this.currentOperand).includes(".")) return;
    if (this.negative === false) {
      if(this.currentOperand === -0){
        this.currentOperand = "-0" + number.toString();
      } else{
        this.currentOperand = this.currentOperand.toString() + number.toString();
      }
     
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
      this.currentOperand = -this.currentOperand;
      this.negative = false;
    }
  }

  chooseOperation(operation) {
    let prevOperation = undefined;
    let prevNumber = undefined;
    if (this.currentOperand === "" && operation !== "-") return;

    if (operation === "√") {
      prevOperation = this.operation;
      prevNumber = this.previousOperand;
      this.operation = operation;
      this.compute();
      this.currentOperand = this.currentOperand;
      /*this.previousOperand = "";*/
    }

    if (operation === "-" && this.operation !== undefined &&
    this.currentOperand === "") {
      this.negative = true;
    } else if (
      operation === "-" &&
      this.previousOperand === "" &&
      this.currentOperand === ""
    ) {
      this.negative = true;
    } else if (prevNumber !== undefined) {
      this.operation = prevOperation;
      this.previousOperand = prevNumber;
      this.compute();
    } else {
      if (this.previousOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (this.operation === "√") {
      if (current < 0) {
        this.currentOperandTextElement.innerText = "Error";
      } else {
        computation = Math.sqrt(current);
      }
    } else {
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "÷":
          if (current === 0) {
            this.currentOperandTextElement.innerText = "Division by zero";
          } else {
            computation = prev / current;
          }
          break;
        case "*":
          computation = prev * current;
          break;
        case "^":
          computation = Math.pow(prev, current);
          break;
        default:
          return;
      }
    }
    if(!this.isInteger(computation)){
    let fixComputation = computation.toFixed(5);
    let i=fixComputation.length -1;
    let countZero = 0;
    while(fixComputation[i] == 0){
      countZero++;
      i--;
    }
    this.currentOperand = fixComputation.slice(0,fixComputation.length - countZero);
    } else{
      this.currentOperand = computation;
    }
    this.operation = undefined;
    this.previousOperand = "";
  }

  isInteger(num) {
    return (num ^ 0) === num;
  }

  getDisplayNumber(number) {
    let stringNumber = "";
    if(number === "-0" || number === -0){
      stringNumber = "-0";
    } else if(number === "-0."){
      stringNumber = "-0.";
    }else{
      stringNumber = number.toString();
    }
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (this.currentOperand === "" && this.negative === true) {
      this.currentOperandTextElement.innerText = "-";
    } else {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(
        this.currentOperand
      );
    }

    if (this.operation == "√") {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )}`;
    } else if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
console.log(operationButtons);
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
//console.log(numberButtons);
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
  calculator.clear();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
