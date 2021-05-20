///<reference types="cypress" />
describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = {
            name: 'Lucas',
            age: 20
        }

        expect(obj)
            .have.property('name')

        cy.wrap(obj)
            .should('have.property', 'name')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').type('funciona ?')

        cy.get('#formNome').then($el => {
            cy.wrap($el).type('funciona via cypress')
        })


        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple')
            .then(() => console.log('Encontrei o primeiro'))
            // promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList')
            .then(() => console.log('Encontrei o segundo'))
    })


    it('Its..', () => {
        const obj = { name: 'User', age: 20 }
        cy.wrap(obj).should('have.property', 'name', 'User')
        cy.wrap(obj).its('name').should('be.equal', 'User')

        const obj2 = {
            name: 'Lucas',
            age: 20,
            address: {
                street: 'Alvaro ferreira Cardoso'
            }
        }

        cy.wrap(obj2)
            .its('address')
            .should('have.property', 'street')

        cy.wrap(obj2)
            .its('address.street')
            .should('contain', 'ferreira')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title()
            .its('length')
            .should('be.equal', 20)
    })

    it.only('Invoke...', () => {
        const getValue = () => 5

        const sum = (a, b) => a + b

        cy.wrap({ fn: getValue })
            .invoke('fn')
            .should('be.equal', 5)


        cy.wrap({ fn: sum })
            .invoke('fn', 5, 9)
            .should('be.equal', 14)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome')
            .invoke('val', 'Texto via invoke')

        cy.window()
            .invoke('alert', 'Dá pra ver?')

        cy.get('#resultado')
            .invoke('html', '<input type="button", value="Hacker" />')
    })
})