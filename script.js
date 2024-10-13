function nofi(obj) {
    const main = document.getElementById('nofi');
    const icons = {
        success: 'fa-check',
        error: 'fa-info',
        warning: 'fa-exclamation',
    }
    if (main) {
        const el = document.createElement('div');
        el.classList.add('nofi');
        el.classList.add('nofi--' + obj.type);

        el.innerHTML = `
            <div class="nofi__icon">
                <i class="fa-solid ${icons[obj.type]}"></i>
            </div>
            <div class="nofi__content">
                <div class="nofi__content__title">
                    ${obj.type}
                </div>
                <div class="nofi__content__msg">
                    ${obj.msg}
                </div>
            </div>
            <div class="nofi__close">
                <i class="fa-solid fa-x"></i>
            </div>
        `;

        main.appendChild(el);
        setTimeout(() => {
            main.removeChild(main.firstElementChild);
        }, 3500);
    }
}

function checkValidNumber(numberInput) {
    const number = Number(numberInput);
    if (!isNaN(number)) {
        return true;
    } else {
        return false;
    }
}

function handleClicking() {
    const firstParameter = document.getElementById('firstParameter').value;
    const secondParameter = document.getElementById('secondParameter').value;

    if (firstParameter === '' && secondParameter === '') {
        nofi({
            type: 'error',
            msg: 'Both parameters are empty!'
        });
        return;
    }

    if (firstParameter === '') {
        nofi({
            type: 'error',
            msg: 'First parameter is empty!'
        });
        return;
    }

    if (secondParameter === '') {
        nofi({
            type: 'error',
            msg: 'Second parameter is empty!'
        });
        return;
    }

    const validFirst = checkValidNumber(firstParameter);
    const validSecond = checkValidNumber(secondParameter);

    if (!validFirst && !validSecond) {
        nofi({
            type: 'warning',
            msg: 'Both parameters are not valid numbers!'
        });
        return;
    }

    if (!validFirst) {
        nofi({
            type: 'warning',
            msg: 'First parameter is not a valid number!'
        });
        return;
    }

    if (!validSecond) {
        nofi({
            type: 'warning',
            msg: 'Second parameter is not a valid number!'
        });
        return;
    }

    const addition = document.getElementById('addition');
    const subtraction = document.getElementById('substraction');
    const multiplication = document.getElementById('multiplication');
    const division = document.getElementById('division');

    if (!addition.checked && !subtraction.checked && !multiplication.checked && !division.checked) {
        nofi({
            type: 'error',
            msg: 'No operation is selected!'
        });
        return;
    }

    if (addition.checked) {
        const result = Number(firstParameter) + Number(secondParameter);
        document.getElementById('result').value = result;

    } else if (subtraction.checked) {
        const result = Number(firstParameter) - Number(secondParameter);
        document.getElementById('result').value = result;

    } else if (multiplication.checked) {
        const result = Number(firstParameter) * Number(secondParameter);
        document.getElementById('result').value = result;


    } else {
        if (Number(secondParameter) === 0) {
            nofi({
                type: 'error',
                msg: 'Division by zero is not allowed!'
            });
            return;
        }
        const result = Number(firstParameter) / Number(secondParameter);
        document.getElementById('result').value = result;
    }

    nofi({
        type: 'success',
        msg: 'Calculation is done!'
    });
}

const button = document.getElementById('calculate');
button.addEventListener('click', handleClicking);
