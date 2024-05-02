import { zStopSignalNumber, zStopSignalString } from './schema'

export const isStopSignalString = (value: unknown): value is string => zStopSignalString.safeParse(value).success

export const isStopSignalNumber = (value: unknown): value is number => zStopSignalNumber.safeParse(value).success
