import { zNetworkProtocolTCP, zNetworkProtocolUDP } from './schema'
import { type NetworkProtocolTCP, type NetworkProtocolUDP } from './types'

export const networkProtocolTCP: NetworkProtocolTCP = zNetworkProtocolTCP.value
export const networkProtocolUDP: NetworkProtocolUDP = zNetworkProtocolUDP.value

export const defaultNetworkProtocol: NetworkProtocolTCP = networkProtocolTCP

export const validNetworkProtocols: string[] = [networkProtocolTCP, networkProtocolUDP]
