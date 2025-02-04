let display = document.getElementById("display");
let buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let operator = null;
let firstOperand = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    handleInput(value);
  });
});

document.addEventListener("keyup", (event) => {
  const key = event.key;
  let value = key;

  if (key === "Enter") value = "=";
  if (key === "Backspace") value = "C";

  const button = Array.from(buttons).find(
    (btn) => btn.getAttribute("data-value") === value
  );

  // Simulate button click
  if (button) {
    event.preventDefault(); // prevent default behavior (e.g., scrolling)
    button.click();
  }
});

function handleInput(value) {
  if (value === "C") {
    currentInput = "";
    operator = null;
    firstOperand = null;
  } else if (value === "=") {
    if (firstOperand !== null && operator !== null) {
      const secondOperand = parseFloat(currentInput);
      const result = calculate(firstOperand, secondOperand, operator);
      if (isNaN(result) || !isFinite(result)) {
        currentInput = "Error";
      } else {
        currentInput = String(result);
      }

      firstOperand = null;
      operator = null;
    }
  } else if (["+", "-", "*", "/"].includes(value)) {
    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
      operator = value;
      currentInput = "";
    }
  } else {
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
  }

  display.value = currentInput;
}

function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return b;
  }
}
