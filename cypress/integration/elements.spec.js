/// <reference types="cypress" />

describe('Work with basics elements', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })

    it('Text', () => {
        cy.get('.facilAchar')
            .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        cy.contains('Cuidado')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        cy.reload()
    })
    it.only('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')
            // cyt


        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 10 })
            .should('have.value', 'acerto')
    })


    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')


        cy.get('[name="formSexo"]')
            .should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name="formComidaFavorita"]')
            .click({ multiple: true })

        cy.get('#formComidaPizza')
            .should('not.be.checked')

        // cy.get('#formComidaVegetariana')
        //     .should('be.checked')
    })

    it.only('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
    })

    it.only('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])
    })
})