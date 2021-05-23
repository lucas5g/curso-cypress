/// <reference types="cypress" />

describe('Cyprees basics', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Should visit a page and assert title', () => {
        cy.title()
            .should('equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should(title => {
                console.log('teste')
                console.log(title)
            })


        let syncTitle
        cy.title().then(title => {
            syncTitle = title
            cy.get('#formNome').type(title)
        })

        cy.get('#elementosForm\\:sugestoes')
            .then(el => {
                cy.wrap(el).type(syncTitle)
            })

    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

    it.only('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)


    })
})