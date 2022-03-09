const radioInputs = document.querySelectorAll('.funding-amount__form-input');
const amount = document.getElementById('another-amount');
const priceValues = [];
let checkedInput = document.getElementById('q100');
checkedInput.checked = true;
radioInputs.forEach(input => priceValues.push(input.value));

amount.addEventListener('input', (e) => {
    if (!amount.validity.valid) amount.value = '';
    if (priceValues.includes(amount.value)) {
        checkedInput = document.getElementById(`q${amount.value}`);
        checkedInput.checked = true;
    } else {
        radioInputs.forEach((radio) => radio.checked = false);
    }
});

radioInputs.forEach((radio) => {
    radio.addEventListener('input', (e) => {
        amount.value = radio.value;
    });
});