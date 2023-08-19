const completionFlags = [];

async function asyncActions() {
    // ========== Начало зоны редактирования ===============
    let promise = new Promise((resolve) => resolve());

    promise.then(() => action('2'));
    action('1');
    setTimeout(() => action('4'), 0);
    promise.then(() => action('3'));
    // console.log(completionFlags);
    // ========== Конец зоны редактирования ===============
}

function action(pos) {
    completionFlags.push(pos);
}

asyncActions();
console.log(completionFlags);