const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let currentInput = '';
let operator = '';
let firstOperand = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            handleOperator(button.dataset.value);
        } else {
            handleNumber(button.dataset.value);
        }
    });
});

equalsButton.addEventListener('click', calculate);

clearButton.addEventListener('click', () => {
    display.textContent = '0';
    currentInput = '';
    operator = '';
    firstOperand = '';
    shouldResetDisplay = false;
});

function handleNumber(value) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent += value;
    }
    currentInput += value;
}

function handleOperator(value) {
    if (firstOperand === '') {
        firstOperand = currentInput;
        currentInput = '';
        operator = value;
        shouldResetDisplay = false;
    } else if (operator) {
        calculate();
        operator = value;
        firstOperand = display.textContent;
        currentInput = '';
        shouldResetDisplay = true;
    }
}

function calculate() {
    if (operator && firstOperand !== '' && currentInput !== '') {
        const result = eval(`${firstOperand} ${operator} ${currentInput}`);
        display.textContent = result;
        currentInput = result;
        operator = '';
        firstOperand = '';
        shouldResetDisplay = true;
    }
}
