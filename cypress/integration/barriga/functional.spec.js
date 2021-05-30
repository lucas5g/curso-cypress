///<reference types="cypress" />

import loc from "../../support/locators"
import '../../support/commandsContas'

describe('Should test at a functional a level', () => {

    before(() => {
            cy.visit('https://barrigareact.wcaquino.me')

            // cy.login()
            cy.resetApp()
                // cy.resetApp()
        })
        // beforeEach(() => {
        //     cy.get(loc.menu.home).click()
        // })
    it('Should create an account ', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
            // cy.get(loc.menu.settings).click()
            // cy.get(loc.menu.contas).click()
            // cy.get(loc.contas.nome).type('Conta de teste')
            // cy.get(loc.contas.btn).click()

        cy.get(loc.message).should('contain', 'inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.contas.btnUpdate('Conta para alterar')).click()
        cy.get(loc.contas.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.contas.btn).click()
        cy.get(loc.message).should('contain', 'Conta atualizada com sucesso')

    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()
        cy.get(loc.contas.nome).type('Conta mesmo nome')
        cy.get(loc.contas.btn).click()
        cy.get(loc.message).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.menu.movimentacao).click()
        cy.get(loc.movimentacao.descricao).type('desc')
        cy.get(loc.movimentacao.valor).type('123')
        cy.get(loc.movimentacao.interessado).type('Inter')
        cy.get(loc.movimentacao.conta).select('Conta para movimentações')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btnSalvar).click()
        cy.get(loc.message).should('contain', 'sucesso')

        cy.get(loc.extrato.linhas).should('have.length', 7)
        cy.xpath(loc.extrato.xpBusca('desc', '123')).should('exist')
    })

    it.only('Shoul get balance', () => {
        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.xpSaldoConta('Conta para saldo'))
            .should('contain', '534,00')
        cy.get(loc.menu.extrato).click()

        cy.xpath(loc.extrato.edit('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.movimentacao.descricao).should('have.value', 'Movimentacao 1, calculo saldo')
            // cy.wait(2000)
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btnSalvar).click()
        cy.get(loc.message).should('contain', 'sucesso')

        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.xpSaldoConta('Conta para saldo')).should('contain', '4.034,00')



    })

    it('Should remove a transaction', () => {
        cy.get(loc.menu.extrato).click()
        cy.xpath(loc.extrato.xpDelete('Movimentacao para exclusao')).click()
        cy.get(loc.message).should('contain', 'sucesso')
    })
})