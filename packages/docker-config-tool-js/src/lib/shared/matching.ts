const substVar = '\\$\\{.+\\}'

const ImageRefRegExParts =
    '^' +
    // Host with optional port
    '(' +
    '(' +
    substVar +
    '|' +
    `([\\w-]+(\\.[\\w-]+)*(:\\d{1,5})?)` +
    ')' +
    '\\/)?' +
    `(${substVar}\\/|([\\w-]+\\/)*)?` + // Path
    `(${substVar}|[\\w.-]+)` + // Image
    // Tag OR Digest
    '(' +
    '(:[\\w/.-]+)' + // Tag
    '|' +
    `(@sha\\d{3}:[\\w/.-]+)` + // Digest
    '|' +
    `([:@]${substVar})` + // Either as var
    ')?' +
    '$'

export const DockerImageReferenceRE = new RegExp(ImageRefRegExParts)
