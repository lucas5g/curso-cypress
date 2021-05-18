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

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it.only('Uso do timeout', () => {
        // cy.get('#buttonDom').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', { timeout: 10000 })
            .should('have.length', 2)
    })

})