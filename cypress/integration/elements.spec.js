/// <reference types="cypress" />

describe('Work with basics elements', () => {
    it('Text', () => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')


        cy.get('.facilAchar')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        cy.contains('Cuidado')
    })
})