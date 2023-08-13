const inputNumber = document.getElementById('inputNumber');
const resultValue = document.getElementById('result');
let cache = {1: 1, 2: 1};

function readInput() {
    const number = Number(inputNumber.value);
    if (!Number.isInteger(number)) {
        resultValue.textContent = 'Not an integer number';
        return;
    }
    if (number <= 0) {
        resultValue.textContent = 'Not positive number';
        return;
    }
    let result = fibonacci(number);
    if (result > 1_000_000) {
        result = result.toExponential(4);
    }
    resultValue.textContent = result;
    inputNumber.value = number;
}

function fibonacci(number) {
    if (number in cache) {
        return cache[number];
    } else {
        cache[number] = fibonacci(number - 1) + fibonacci(number - 2);
        return cache[number];
    }
}

console.log(inputNumber.value);
inputNumber.addEventListener('change', readInput);
