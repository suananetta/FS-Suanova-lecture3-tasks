// Данные код не трогать
// ----------------------------------------
const URLS = {
    navigation: 'navigation',
    user: 'user',
    cart: 'cart',
    checkAvailableCart: 'checkAvailableCart',
    favoriteGoods: 'favoriteGoods',
}


// функция используется как имитатор запросов
function request(url, cb) {
    setTimeout(() => {
        switch (url) {
            case URLS.navigation:
                cb(['Главная', 'Товары', 'О нас', 'Реклама']);
                break;
            case URLS.user:
                cb({
                    id: '0',
                    firstName: 'Иван',
                    lastName: 'Петров',
                });
                break;
            case URLS.cart:
                cb([
                    {id: '0', name: 'Пылесос'},
                    {id: '1', name: 'Фен'},
                    {id: '2', name: 'Телевизор'},
                    {id: '3', name: 'Радио'},
                ]);
                break;
            case URLS.checkAvailableCart:
                cb(['0', '2']);
                break;
            case URLS.favoriteGoods:
                cb([
                    {id: '4', name: 'Подушки'},
                    {id: '5', name: 'Корм для кота'},
                    {id: '6', name: 'Настольные игры'},
                ]);
                break;
            default:
                cb(new Error('4044'))
        }
    }, 100)
}

// ----------------------------------------


async function getPageInformation() {
    const pageInfo = {};

    try {
        await request(URLS.navigation, (nav) => {nav? pageInfo.navigation = nav : ''});
        await request(URLS.user, (user) => user? pageInfo.user = user : '');
        await request(URLS.cart, (cart) => cart? pageInfo.user.cart = cart : '');
        await request(URLS.checkAvailableCart, (available) => available? pageInfo.user.cart = pageInfo.user.cart.filter(({id}) => available.includes(id)) : '');
        await request(URLS.favoriteGoods, (favGoods) => favGoods? pageInfo.user.favGoods = favGoods : '');
    } catch (error) {
        console.log(error);
    }
    
    return pageInfo;
}

// должно вывести актуальную информацию страницы
console.log(getPageInformation())
