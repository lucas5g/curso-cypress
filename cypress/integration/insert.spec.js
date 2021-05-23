describe('Validation', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('cadastrar', () => {

        cy.get('#formCadastrar')
            .click()

        cy.get('#formNome')
            .type('Lucas')

        cy.get('#formCadastrar')
            .click()

        cy.get('[data-cy=dataSobrenome]')
            .type('Sousa')

        cy.get('#formCadastrar')
            .click()

    })
})