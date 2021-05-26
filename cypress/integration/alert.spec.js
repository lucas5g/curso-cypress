describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })
    beforeEach(() => {
        cy.reload()
    })

    it.only('Alert', () => {
        // cy.get('#alert')
        //     .click()

        // cy.on('window:alert', msg => {
        //     console.log(msg)
        //     expect(msg).eq('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert Simples')

    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alert')

        cy.on('window:alert', stub)

        cy.get('#alert').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            })

    })

    it('Alert', () => {
        cy.get('#confirm')
            .click()

        cy.on('window:confirm', msg => {
            expect(msg).equal('Confirm Simples')
        })


        cy.on('window:alert', msg => {
            expect(msg).equal('Confirmado')
        })
    })

    it('Deny', () => {
        cy.get('#confirm')
            .click()

        cy.on('window:confirm', msg => {
            expect(msg).equal('Confirm Simples')
            return false
        })


        cy.on('window:alert', msg => {
            expect(msg).equal('Negado')
        })


    })

    it('Prompt', () => {

        cy.window().then(win => {
            cy.stub(win, 'prompt')
                .returns('42')
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })

        cy.on('window:alert', msg => {
            expect(msg).equal(':D')
        })

        cy.get('#prompt')
            .click()

    })

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })

        cy.get('#formNome').type('Lucas')
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })

        cy.get('[data-cy=dataSobrenome]').type('Aquino')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)')
            .should('contain', 'Cadastrado!')

    })
})