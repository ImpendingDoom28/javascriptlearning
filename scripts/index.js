//Лучше всего работать с одинарным или обратными кавычками
//потому что если будут какие-нибудь параметры в вёрстке
//(пр. <div class="wrap">), то первая двойная кавычка параметра
//закроет строчку и будут ошибки
let str1 = 'Привет, Мир!';

const startButton = document.querySelector('.start-button');
const mainForm = document.querySelector('.main-form');
const firstScreen = document.querySelector('.first-screen');
const formCalculate = document.querySelector('.form-calculate');
const endButton = document.querySelector('.end-button');
const total = document.querySelector('.total');

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function handlerCallBackForm(event) {
    const target = event.target;
    if(target.classList.contains('want-faster')) {
        target.checked ? showElem(document.querySelector('.fast-range'))
                        : hideElem(document.querySelector('.fast-range'))
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
