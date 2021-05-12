it('sem teste aind', () => {})

const getSomething = () => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(11)
        }, 1000)
    })
}

const system = () => {
    console.log('init')
    const prom = getSomething()
    prom.then(some => {
        console.log(`Something is ${some}`)
    })
    console.log('end')
}

system()