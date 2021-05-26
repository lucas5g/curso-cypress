///<reference types="cypress" />
describe('Time', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '26/05/2021')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const date = new Date(2012, 3, 10, 15, 23, 50)

        cy.clock(date.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')

    })


    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1622')

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text').then(t => {
                const number = parseInt(t)
                cy.wrap(number).should('be.lte', 0)
            })

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span')
            .invoke('text').then(t => {
                const number = parseInt(t)
                cy.wrap(number).should('be.gte', 5000)
            })

    })
})