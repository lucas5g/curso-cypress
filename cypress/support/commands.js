Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get('#alert').click()

    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})