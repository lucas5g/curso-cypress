///<reference types="cypress" />

import loc from "../../support/locators"
import '../../support/commandsContas'
import { buildEnv } from '../../support/buildEnv'

describe('Should test at a functional a level', () => {

    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('lucas@mail.com', 'qweqqwe')

        cy.get(loc.menu.home).click()
    })
    it('Should create an account ', () => {

        cy.route({
            method: 'post',
            url: '/contas',
            response: { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
        }).as('saveConta')
        cy.route({
            method: 'get',
            url: '/contas',
            response: [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
            ]
        }).as('contas')
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.message).should('contain', 'inserida com sucesso')
    })

    it('Should update an account', () => {

        cy.route({
            method: 'put',
            url: '/contas/**',
            response: { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
        })

        cy.acessarMenuConta()
        cy.xpath(loc.contas.btnUpdate('Banco')).click()
        cy.get(loc.contas.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.contas.btn).click()
        cy.get(loc.message).should('contain', 'Conta atualizada com sucesso')

    })

    it.only('Should not create an account with same name', () => {
        cy.route({
            method: 'post',
            url: '/contas',
            response: { error: 'Já existe uma conta com esse nome!' },
            status: 400
        }).as('saveContaMesmoNome')

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

    it('Shoul get balance', () => {
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