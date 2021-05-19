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

    it('Uso do timeout', () => {
        // cy.get('#buttonDom').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', { timeout: 10000 })
            .should('have.length', 2)
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    const obj = { a: 1, b: 2 }
    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').then($el => {
            // cy.get('#lista li span').then($el => {
            expect($el).have.length(1)
                // expect($el).to.have.length(1)
        })


        // cy.get('#lista li span')
        //     .should('have.length', 1)

    })

})