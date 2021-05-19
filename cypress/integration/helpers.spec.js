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
})