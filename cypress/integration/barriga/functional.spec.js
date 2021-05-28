///<reference types="cypress" />

import loc from "../../support/locators"


describe('Should test at a functional a level', () => {

    before(() => {
        cy.login()
        cy.resetApp()
    })
    it('Should create an account ', () => {
        cy.get(loc.menu.settings).click()
        cy.get(loc.menu.contas).click()
        cy.get(loc.contas.nome).type('Conta de teste')
        cy.get(loc.contas.btn).click()

        cy.get(loc.message).should('contain', 'inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.get(loc.menu.settings).click()
        cy.get(loc.menu.contas).click()
        cy.xpath(loc.contas.btnUpdate).click()
        cy.get(loc.contas.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.contas.btn).click()
        cy.get(loc.message).should('contain', 'Conta atualizada com sucesso')

    })



})