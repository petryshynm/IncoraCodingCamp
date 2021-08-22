import { getS, openModal, inputValidation } from './utils';
import { Validation } from '../classes/Validation';

const renderTotalPrice = (user, selector) => {
    const currentTotalPrice = user.cart.storage.reduce((sum, {
        product,
        amount
    }) => sum + amount * product.price, 0);
    getS(selector).textContent = `${currentTotalPrice} UAH`;
}

const renderUserInfo = (user, role) => {
    getS('.user-info__role').textContent = role;
    getS('.user-info__name span').textContent = user.name;
    getS('.user-info__balance span').textContent = `${user.balance} UAH`;
}

const renderProducts = (user, products) => {
    const productsList = getS('.products .prod-container__list');
    productsList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} UAH - ${product.totalAmount}`;
        li.onclick = () => {
            openModal('.cart-modal');
            getS('.cart-modal__product').textContent = product.name;
            getS('.cart-modal__btn').onclick = () => {
                const amount = getS('.cart-modal__amount');
                if (inputValidation(Validation.isNumber(+amount.value, 0), amount)) {
                    user.cart.addProduct(product, +amount.value);
                    getS('.cart-modal').style.display = 'none';
                    amount.value = 0;
                    renderCart(user);
                }
            };
        };
        productsList.append(li);
    });
}

const renderCart = (user) => {
    const cartList = getS('.cart  .prod-container__list');
    cartList.innerHTML = '';
    user.cart.storage.forEach(({
        product,
        amount
    }) => {
        const li = document.createElement('li');
        li.innerHTML = `${product.name} - ${amount}<span class="cross">X</span>`
        cartList.append(li);
        li.querySelector('.cart .cross').onclick = (e) => {
            const productName = e.target.parentNode.textContent.split(' - ')[0];
            user.cart.removeProduct(productName);
            renderCart(user);
        };
    });

    renderTotalPrice(user, '.cart__total-price span');
}

export {renderTotalPrice, renderUserInfo, renderProducts, renderCart}