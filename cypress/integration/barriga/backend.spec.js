///<reference types="cypress" />

// import loc from "../../support/locators"
// import '../../support/commandsContas'

describe('Should test at a functional a level', () => {

    before(() => {

            // cy.resetApp()
        })
        // beforeEach(() => {
        //     cy.get(loc.menu.home).click()
        // })
    it.only('Should create an account ', () => {
        cy.request({
                method: 'post',
                url: 'https://barrigarest.wcaquino.me/signin',
                body: {
                    email: 'lucas@mail.com',
                    senha: 'qweqwe'
                }
            }).then(response => {
                console.log(response)
            }).its('body.token').should('not.be.empty')
            .then(token => {
                cy.request({
                        method: 'post',
                        url: 'https://barrigarest.wcaquino.me/contas',
                        headers: { Authorization: `JWT ${token}` },
                        body: {
                            nome: 'Conta via rest23'
                        }
                    }).then(res => console.log(res))
                    .as('response')
            })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome')
        })
    })

    it('Should update an account', () => {

    })

    it('Should not create an account with same name', () => {

    })

    it('Should create a transaction', () => {

    })

    it.only('Shoul get balance', () => {



    })

    it('Should remove a transaction', () => {

    })
})