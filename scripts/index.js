'use strict';
//Лучше всего работать с одинарным или обратными кавычками
//потому что если будут какие-нибудь параметры в вёрстке
//(пр. <div class="wrap">), то первая двойная кавычка параметра
//закроет строчку и будут ошибки
let str1 = 'Привет, Мир!';

const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7],[3, 10],[7, 14]],
    deadlinePercent: [20, 17, 15]
}

const startButton = document.querySelector('.start-button');
const mainForm = document.querySelector('.main-form');
const firstScreen = document.querySelector('.first-screen');
const formCalculate = document.querySelector('.form-calculate');
const endButton = document.querySelector('.end-button');
const total = document.querySelector('.total');
const fastRange = document.querySelector('.fast-range');
const totalPriceSum = document.querySelector('.total_price__sum');

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function priceCalculation(elem) {
    let result = 0,
        index = 0,
        options = [];

    if (elem.name === 'whichSite') {
        for(const item of formCalculate.elements) {
            if(item.type === 'checkbox') {
                if(item.value === 'mobileTemplates') {
                    item.disabled = true;
                }
                item.checked = false;
            }
        }
        hideElem(fastRange);
    }

    for (const item of formCalculate.elements) {
        if(item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);
        } else if(item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }
    options.forEach((key) => {
        if(typeof(DATA[key]) === 'number') {
            if(key === 'sendOrder') {
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if(key === 'desktopTemplates') {
                result += DATA.price[index] * DATA.desktopTemplates[index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    });
    result += DATA.price[index];

    totalPriceSum.textContent = result;
}

function handlerCallBackForm(event) {
    const target = event.target;
    if(target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange)
                        : hideElem(fastRange);
    }
    if(target.classList.contains('calc-handler')) {
        if(target.value === 'adapt' && target.checked) {
            for(const elem of formCalculate.elements) {
                if(elem.value === 'mobileTemplates') {
                    elem.disabled = false;
                    break;
                }
            }
        } else {
            for(const elem of formCalculate.elements) {
                if(elem.value === 'mobileTemplates' && target.value === 'adapt') {
                    elem.disabled = true;
                    elem.checked = false;
                    break;
                }
            }
        }
        priceCalculation(target);
    }
}

startButton.addEventListener('click', () => {
    showElem(mainForm);
    hideElem(firstScreen);
});

endButton.addEventListener('click', () => {
    for(const elem of formCalculate.elements) {
        if(elem.tagName === 'FIELDSET') {
            hideElem(elem);
        }
    }
    showElem(total);
});

formCalculate.addEventListener('change', handlerCallBackForm);