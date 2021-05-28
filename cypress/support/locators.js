const locators = {
    login: {
        user: '[data-test=email]',
        password: '[data-test=passwd]',
        btn: '.btn'

    },
    menu: {
        settings: '[data-test=menu-settings]',
        contas: '[href="/contas"]',
        reset: '[href="/reset"]'
    },
    contas: {
        nome: '[data-test=nome]',
        btn: '.btn',
        btnUpdate: '//table//td[contains(., "Conta de teste")]/..//i[@class="far fa-edit"]'
    },
    message: '.toast-message'
}

export default locators