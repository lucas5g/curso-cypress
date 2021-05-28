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