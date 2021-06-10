import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()

    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, passwd) => {
    cy.visit('https://barrigareact.wcaquino.me')
    cy.get(loc.login.user).type('lucas@mail.com')
    cy.get(loc.login.password).type('qweqwe')
    cy.get(loc.login.btn).click()
    cy.get(loc.message).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.menu.settings).click()
    cy.get(loc.menu.reset).click()
})

Cypress.Commands.add('getToken', (email, senha) => {
    cy.request({
            method: 'post',
            url: '/signin',
            body: {
                email,
                senha
            }
        }).then(response => {
            console.log(response)
        }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken('lucas@mail.com', 'qweqwe')
        .then(token => {

            cy.request({
                method: 'get',
                url: '/reset',
                headers: { Authorization: `JWT ${token}` }
            }).its('status').should('be.equal', 200)
        })
})

Cypress.Commands.add('getContaByName', name => {
    cy.getToken('lucas@mail.com', 'qweqwe').then(token => {
        cy.request({
            method: 'get',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: name
            }
        }).then(res => {
            return res.body[0].id
        })
    })
})