import { z } from 'zod'

export const zStopSignalString = z
    .string()
    .toUpperCase()
    .regex(
        /(SIG)?(ABRT|ALRM|BUS|CHLD|CLD|CONT|FPE|HUP|ILL|INT|IO|IOT|KILL|LOST|PIPE|POLL|PROF|PWR|QUIT|RTMAX|RTMIN|SEGV|STKFLT|STKSZ|STOP|SYS|TERM|TRAP|TSTP|TTIN|TTOU|UNUSED|URG|USR1|USR2|VTALRM|WINCH|XCPU|XFSZ)/
    )

export const zStopSignalNumber = z.number().min(1).max(31)
