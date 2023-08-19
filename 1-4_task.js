
/* задача 1 - Создайте функцию задержки потока delay, 
которая принимает время в миллисекундах и
не даёт выполняться другим задачам. 
Использовать встроенный объект Date */

function delay (ms) {
    let startTime = Date.now();
    let currentTime;

    do {
        currentTime = Date.now();
    }
        while(currentTime - startTime < ms) 
}

delay(3000);
console.log(1);
delay(5000);
console.log(2);
delay(7000);
console.log(3);

/* задача 2 - Создайте функцию picky, которая будет принимать 3
аргумента - время актуальности значений функции в миллисекундах; функцию, значение
которой нужно получить; колбэк, который примет результат функции и сработает, если
результат ещё актуален */

let getCustomerID = () => {
    return '123';
}

let requestSuccess = (id) => {
    console.log(`Customer${id} request is done`);
}

function picky(ms, fn, cb) {
    let start = Date.now();
    delay(5000);
    // delay(1000);
    fn();
    let end = Date.now();
  
    new Promise((resolve, reject) => {
    if(end - start < ms) {
      resolve(cb(fn()));
    } else {
      reject (console.log('Request failed'));
    }
    })
}

picky(3000, getCustomerID, requestSuccess);

/* задача 3 - встроенная функция setTimeout использует колбэк-функции. Создайте альтернативу,
использующую промисы. Создайте функцию wait, которая должна возвращать промис,
который перейдет в состояние «выполнен» через ms миллисекунд, так чтобы мы могли
добавить к нему .then */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
wait(1000).then(console.log('fghgh'));

/* задача 4 - На лекции мы рассмотрели один из методов Promise API, который позволяет дождаться
выполнения всех промисов - Promise.all. Повторите его поведение, создав функцию all.
Функция принимает массив из промисов promises, и возвращает один промис, который
завершится после выполнения всех promises. В возвращенном промисе результаты
хранятся в виде массива. Что нужно учесть при реализации:
- Порядок элементов в массиве результата в точности соответствует порядку исходных
промисов
- Если любой из промисов завершится с ошибкой, то промис, возвращенный функцией
all, немедленно завершается с этой ошибкой
*/

let promises1 = [
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000))
]

let result1 = all(promises1);

let promises2 = [
    new Promise((resolve, reject) => setTimeout(() => reject('error'), 1000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000))
]

let result2 = all(promises2);

function all(promises) {
  let results = [];
  let counter = 0;
  let promise = new Promise((resolve, reject) => {
        promises.forEach((item, index) => {
            if(item == 'error') {
                return 
            } else {
                item.then((res) => {
                    results[index] = res;
                    counter++;
                    if(counter === promises.length) {
                        resolve(console.log(results));
                    }
                  
                })
                .catch((error) => {
                    reject(console.log(error));
                })
            }
            
        });
    })
}


