/// <reference types="cypress" />

describe('Cyprees basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title()
            .should('equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should(title => {
                console.log('teste')
                console.log(title)
            })

    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})