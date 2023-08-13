const inputNumber = document.getElementById('inputNumber');
const resultValue = document.getElementById('result');
let cache = {1: 1, 2: 1};

function readInput() {
    const number = Number(inputNumber.value);
    if (!Number.isInteger(number)) {
        publicResults('Not an integer number');
        return;
    }
    if (number <= 0) {
        publicResults('Not a positive number');
        return;
    }
    let result;
    try {
        result = fibonacci(number);
    } catch (RangeError) {
        publicResults('Input number is too big');
        return;
    }
    if (result > 1_000_000) {
        result = result.toExponential(4);
    }
    publicResults(result);
}

function publicResults(value) {
    resultValue.classList.remove('fade-in');
    resultValue.classList.add('fade-out');
    setTimeout(() => {
        resultValue.textContent = value;
    }, 200);
    setTimeout(() => {
        resultValue.classList.remove('fade-out');
        resultValue.classList.add('fade-in');
    }, 200);
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
