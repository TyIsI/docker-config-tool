import { isNetworkProtocolTCP, isNetworkProtocolUDP, isNetworkProtocols } from '../../guards'

describe(`DCT`, () => {
    describe(`lib`, () => {
        describe(`shared`, () => {
            describe(`guards`, () => {
                describe(`isNetworkProtocol`, () => {
                    test(`pass - simple - tcp`, () => {
                        expect(isNetworkProtocolTCP('tcp')).toBeTruthy()
                    })

                    test(`pass - simple - udp`, () => {
                        expect(isNetworkProtocolUDP('udp')).toBeTruthy()
                    })

                    test(`pass - complex - tcp`, () => {
                        expect(isNetworkProtocols('tcp')).toBeTruthy()
                    })

                    test(`pass - complex - udp`, () => {
                        expect(isNetworkProtocols('udp')).toBeTruthy()
                    })
                })
            })
        })
    })
})
