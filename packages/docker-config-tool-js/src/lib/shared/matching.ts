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
    `(${substVar}|[a-zA-Z]\\w+[\\w.-]+)` + // Image
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
