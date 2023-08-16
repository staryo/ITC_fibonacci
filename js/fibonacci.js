const inputNumber = document.getElementById('inputNumber');
const resultValue = document.getElementById('result');
const loaderElement = document.getElementById('loader');
const calculateOnServer = false
const fibonacciServerURL = 'http://localhost:3000'
let cache = {1: 1, 2: 1};

function calculateResult() {
    const number = Number(inputNumber.value);
    let result;
    resultValue.classList.add('d-none');
    loaderElement.classList.remove('d-none');

    if (calculateOnServer) {
        fetch(`${fibonacciServerURL}/calculateFibonacci?num=${number}`).then((response) => response.json()
            .then((data => ({responseStatus: response.status, body: data})))
            .then((object) => {
                if (object.responseStatus === 200) {
                    publicResults(object.body.result);
                } else {
                    publicResults(object.body.message)
                }
            })
        )
    } else {
        if (!Number.isInteger(number)) {
            publicResults('Not an integer number');
            return;
        }
        if (number <= 0) {
            publicResults('Not a positive number');
            return;
        }
        try {
            result = fibonacci(number);
        } catch (RangeError) {
            publicResults('Input number is too big');
            return;
        }
        publicResults(result);
    }
}

function publicResults(value) {
    if (value > 1_000_000) {
        value = value.toExponential(4);
    }
    resultValue.textContent = value;
    loaderElement.classList.add('d-none');
    resultValue.classList.remove('d-none');
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
inputNumber.addEventListener('change', calculateResult);
