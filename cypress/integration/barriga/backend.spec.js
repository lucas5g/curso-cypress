///<reference types="cypress" />

// import loc from "../../support/locators"
// import '../../support/commandsContas'

describe('Should test at a functional a level', () => {

    let token
    before(() => {

        cy.getToken('lucas@mail.com', 'qweqwe')
            .then(res => {
                token = res
            })
            // cy.resetApp()
    })
    beforeEach(() => {
        cy.resetRest()
    })
    it('Should create an account ', () => {

        cy.request({
                method: 'post',
                url: '/contas',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta via rest23'
                }
            }).then(res => console.log(res))
            .as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome')
        })
    })

    it('Should update an account', () => {
        cy.request({
            method: 'get',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {

            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'put',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')
        })

        cy.get('@response')
            .its('status').should('equal', 200)
    })

    it('Should not create an account with same name', () => {
        cy.request({
            method: 'get',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {

            cy.request({
                url: '/contas',
                method: 'post',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta mesmo nome'
                },
                failOnStatusCode: false
            }).as('response')
        })

        cy.get('@response')
            .then(res => {
                // console.log(res)
                expect(res.status).equal(400)
                expect(res.body.error).equal("Já existe uma conta com esse nome!")
            })
    })

    it('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(id => {
                cy.request({
                        method: 'post',
                        url: '/transacoes',
                        headers: { Authorization: `JWT ${token}` },
                        body: {
                            conta_id: id,
                            data_pagamento: Cypress.dayjs().add(1, 'day').format('DD/MM/YYYY'),
                            data_transacao: Cypress.dayjs().format('DD/MM/YYYY'),
                            descricao: 'desc',
                            envolvido: 'inter',
                            status: true,
                            tipo: 'REC',
                            valor: '789'
                        },
                        failOnStatusCode: false

                    }).as('response')
                    .then(res => {
                        console.log(res)
                    })
            })
        cy.get('@response')
            .its('status').should('equal', 201)

        cy.get('@response')
            .its('body.id').should('exist')
    })

    it('Shoul get balance', () => {

        cy.request({
            method: 'get',
            url: '/transacoes/',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'put',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: Cypress.dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('equal', 200)
        })
        cy.request({
            url: '/saldo',
            method: 'get',
            headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            const conta = res.body.find(c => {
                return c.conta === 'Conta para saldo'
            })

            expect(conta.saldo).equal('4034.00')
        })


    })

    it.only('Should remove a transaction', () => {
        cy.request({
            method: 'get',
            url: '/transacoes/',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                method: 'delete',
                url: `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
            }).its('status').should('equal', 204)
        })
    })
})