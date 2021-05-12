/// <reference types="cypress" />
it('Equality', () => {
    const a = 1

    expect(a).equal(1)
    expect(a, 'Deveria ser 1').equal(1)

    expect('a').not.equal('b')

    expect(true).be.true
    expect(false).not.be.true
})

it('Object Equalidade', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).not.empty
})

it('Types', () => {
    const num = 1
    const str = 'String'


    expect(num).a('number')
    expect(str).a('string')
})

it('String', () => {
    const str = 'String de test'

    expect(str).to.be.equal('String de test')
    expect(str).to.have.length(14)
    expect(str).to.contains('de')
    expect(str).to.match(/de/)
    expect(str).to.match(/^String/)
    expect(str).to.match(/test$/)
    expect(str).match(/.{14}/)
    expect(str).match(/\w+2/)
})