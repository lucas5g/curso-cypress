/// <reference types="cypress" />

describe('Esperas ... ', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo')
            .type('Funcionou')
    })

    it.only('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
    })
})