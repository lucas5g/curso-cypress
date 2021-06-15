export const buildEnv = () => {

    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 100,
            nome: 'Usupario falso',
            token: 'Uma string muito grande'
        }
    }).as('signin')

    cy.route({
        method: 'get',
        url: '/saldo',
        response: [{
                conta_id: 999,
                conta: 'Carteira',
                saldo: '100.00'
            },
            {
                conta_id: 9909,
                conta: 'Banco',
                saldo: '1000000.00'
            }
        ]
    }).as('saldo')

    cy.route({
        method: 'get',
        url: '/contas',
        response: [
            { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
            { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
        ]
    }).as('contas')
}