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


    cy.route({
        method: 'get',
        url: '/extrato/**',
        response: [{
                conta: 'Conta para movimentacoes',
                id: 31434,
                descricao: 'Movimentacao para exclusao',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '-1500.00',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
            {
                conta: 'Conta para movimentacoes',
                id: 31434,
                descricao: 'Movimentacao para exclusao',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '-1500.00',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
            {
                conta: 'Conta para movimentacoes',
                id: 31434,
                descricao: 'Movimentacao para exclusao',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '-1500.00',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
            {
                conta: 'Conta para movimentacoes',
                id: 31434,
                descricao: 'Movimentacao para exclusao',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '-1500.00',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
            {
                conta: 'Conta para movimentacoes 1',
                id: 31434,
                descricao: 'Movimentacao para exclusao',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '-1500.00',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
            {
                conta: 'Conta para saldo',
                id: 31434,
                descricao: 'Movimentacao 1, calculo saldo',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '-1500.00',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
            {
                conta: 'Conta para movimentacoes 3',
                id: 31434,
                descricao: 'desc',
                envolvido: 'aaaa',
                observacao: null,
                tipo: 'desp',
                data_transacao: '2019-11-13',
                data_pagamento: '2019-11-13',
                valor: '123',
                status: true,
                conta_id: 42007,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            }

        ]
    })
}