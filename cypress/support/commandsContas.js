import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.menu.settings).click()
    cy.get(loc.menu.contas).click()

})

Cypress.Commands.add('inserirConta', conta => {
    cy.get(loc.contas.nome).type(conta)
    cy.get(loc.contas.btn).click()
})