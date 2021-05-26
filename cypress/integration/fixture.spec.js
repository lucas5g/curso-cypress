///<reference types="cypress" />
describe('Fixtures tests', () => {
    it('Get data form fixture file', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.fixture('userData').as('usuario')
            .then((user) => {

                cy.get('#formNome').type(user.nome)
                cy.get('#formSobrenome').type(user.sobrenome)
                cy.get(`[name=formSexo][value=${user.sexo}]`).click()
                cy.get(`[name=formComidaFavorita][value=${user.comida}]`).click()
                cy.get('#formEscolaridade').select(user.escolaridade)
                cy.get('#formEsportes').select(user.esporte)
            })
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

    })

})