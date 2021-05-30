const locators = {
    login: {
        user: '[data-test=email]',
        password: '[data-test=passwd]',
        btn: '.btn'

    },
    menu: {
        home: '[data-test=menu-home]',
        settings: '[data-test=menu-settings]',
        contas: '[href="/contas"]',
        reset: '[href="/reset"]',
        movimentacao: '[data-test=menu-movimentacao]',
        extrato: '[data-test=menu-extrato]'
    },
    contas: {
        nome: '[data-test=nome]',
        btn: '.btn',
        btnUpdate: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    movimentacao: {
        descricao: '[data-test=descricao]',
        valor: '[data-test=valor]',
        interessado: '[data-test=envolvido]',
        conta: '[data-test=conta]',
        btnSalvar: '.btn-primary',
        status: '[data-test=status]'
    },
    extrato: {
        linhas: '.list-group > li',
        xpBusca: (desc, value) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${value}')]`,
        xpDelete: conta => `//li[contains(., '${conta}')]//i[contains(@class, 'far fa-trash-alt')]`,
        edit: conta => `//li[contains(., '${conta}')]//i[contains(@class, 'fas fa-edit')]`,
        //li[contains(.,'Movimentacao 1, calculo saldo')]//i[contains(@class, 'fas fa-edit')]
    },
    saldo: {
        xpSaldoConta: nome => `//tr[contains(.,'${nome}')]/td[2]`
    },
    message: '.toast-message'
}

export default locators