const getS = selector => document.querySelector(selector);

const wrapErrors = (func) => {
    if (!func.__wrapped__) {
        func.__wrapped__ = function () {
            try {
                return func.apply(this, arguments);
            } catch (err) {
                getS('.error-modal__explanation').textContent = err.message;
                openModal('.error-modal')
            }
        };
    }

    return func.__wrapped__;
}

const inputValidation = wrapErrors((condition, element) => {
    if (!condition) {
        element.style.border = '2px solid red';
    } else {
        element.style.border = 'none';
    }
    return condition
});

const closeModal = (modalSelector) => {
    const modal = getS(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modal.querySelectorAll('input').forEach((input) => input.value = '');
};

const openModal = (modalSelector) => {
    const modal = getS(modalSelector);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

const modalWindow = (selector) => {
    const modal = getS(selector);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(selector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display == 'flex') {
            closeModal(selector);
        }
    });
}


export { getS, wrapErrors, inputValidation, closeModal, openModal, modalWindow};