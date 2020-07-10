// get page input fields
const decimalInputElement = document.querySelector('.input__decimal')
const inputElements = document.querySelectorAll('.input input:not(.input__decimal)');

// store produced trit array for later use (populating fields)
let currentTritArray = new TritArray([0]);

function syncInputs() {
    inputElements.forEach(element => {
        element.value = tritsAs(currentTritArray, element.dataset.as);
    })
}
