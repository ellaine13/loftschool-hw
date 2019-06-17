/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

let townsArr = [];

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    const townsAddr = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    const promise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        let result;

        xhr.open('GET', townsAddr, true);

        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) {
                return;
            }

            if (this.status != 200) {
                reject();
            } else {
                result = JSON.parse(this.responseText).sort(function(a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }

                    if (a.name > b.name) {
                        return 1;
                    }

                    return 0;
                });

                resolve(result);
            }
        };
    });

    return promise;
}

loadTowns().then(function(result) {
    // Скрываем надпись "Загрузка..."
    loadingBlock.classList.add('is-hidden');

    // Показываем блок с результатами
    filterBlock.style.display = 'block';

    // Записываем массив городов в глобальную переменную townsArr
    townsArr = result;
});

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.search(new RegExp(chunk, 'i')) == -1) {
        return false;
    }

    return true;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    filterResult.innerHTML = '';

    let fragment = document.createDocumentFragment();

    for (const town of townsArr) {
        if (isMatching(town.name, this.value)) {
            const resultItem = document.createElement('div');

            resultItem.classList.add('filter-result-item');
            resultItem.textContent = town.name;
            fragment.appendChild(resultItem);
        }
    }

    if (this.value !== '') {
        filterResult.appendChild(fragment);
    }
});

export {
    loadTowns,
    isMatching
};
