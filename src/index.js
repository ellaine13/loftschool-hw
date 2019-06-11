/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешён через указанное количество секунд

 Пример:
   delayPromise(3) // вернёт promise, который будет разрешён через 3 секунды
 */
function delayPromise(seconds) {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('result');
        }, seconds * 1000);
    });

    return promise;
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешён с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    var promise = new Promise(function() {
        
    });

    return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
