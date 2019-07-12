/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

var cookies = {},
    filterCookies;

filterNameInput.addEventListener('keyup', function() {
    cookiesFilter();

    if (filterNameInput.value == '') {
        createTable(cookies);
    } else {
        createTable(filterCookies);
    }
});

function cookiesFilter() {
    filterCookies = {};

    for (var cookie in cookies) {
        if (cookies.hasOwnProperty(cookie) && isInclude(cookie, filterNameInput.value) || isInclude(cookies[cookie], filterNameInput.value)) {
            filterCookies[cookie] = cookies[cookie];
        }
    }
}

function isInclude(full, chunk) {
    return full.toUpperCase().includes(chunk.toUpperCase());
}

window.addEventListener('load', () => {
    cookies = parseCookie();
    createTable(cookies);
});

function createTable(tableCookies) {
    listTable.textContent = '';

    for (var cookie in tableCookies) {
        if (tableCookies.hasOwnProperty(cookie)) {
            listTable.appendChild(document.createElement('tr'));
            listTable.lastChild.appendChild(document.createElement('td')).textContent = cookie;
            listTable.lastChild.appendChild(document.createElement('td')).textContent = tableCookies[cookie];
            listTable.lastChild.appendChild(document.createElement('td')).appendChild(document.createElement('button')).textContent = 'Удалить';
            listTable.lastChild.lastChild.firstChild.addEventListener('click', () => {
                delete cookies[cookie];
                delete tableCookies[cookie];
                deleteCookie(cookie);
                createTable(tableCookies);
            });
        }
    }
}

function deleteCookie(cookieName) {
    var cookieDate = new Date();

    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = cookieName += '=; expires=' + cookieDate.toGMTString();
}

addButton.addEventListener('click', () => {
    if (addNameInput.value != '' && addValueInput.value != '') {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        cookies = parseCookie();
        cookies[addNameInput.value] = addValueInput.value;

        if (cookies.hasOwnProperty(addNameInput.value) && !isInclude(addValueInput.value, filterNameInput.value)) {
            delete filterCookies[addNameInput.value];
            createTable(filterCookies);
        } else if (isInclude(addNameInput.value, filterNameInput.value) || isInclude(addValueInput.value, filterNameInput.value)) {
            cookiesFilter();
            createTable(filterCookies);
        }
    }
});

function parseCookie() {
    if (document.cookie) {
        return document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');

            prev[name] = value;

            return prev;
        }, {});
    }
}

