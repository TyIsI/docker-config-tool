import { z } from 'zod';

interface Instruction {
    type: 'instruction';
    toString: () => string;
}
type Instructions = Instruction[];

interface ArgInstructionParamsObject {
    name: string;
    value?: string;
}
type ArgInstructionParams = string | ArgInstructionParamsObject;
interface IArgInstruction extends Instruction {
}

declare class ArgInstruction implements IArgInstruction {
    type: "instruction";
    argName?: string;
    argValue?: string;
    constructor(argParam: ArgInstructionParams);
    toString(): string;
}

declare const zFromInstructionObjectParam: z.ZodObject<{
    from: z.ZodString;
    platform: z.ZodOptional<z.ZodString>;
    as: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from: string;
    platform?: string | undefined;
    as?: string | undefined;
}, {
    from: string;
    platform?: string | undefined;
    as?: string | undefined;
}>;
declare const zFromInstructionParams: z.ZodUnion<[z.ZodString, z.ZodObject<{
    from: z.ZodString;
    platform: z.ZodOptional<z.ZodString>;
    as: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from: string;
    platform?: string | undefined;
    as?: string | undefined;
}, {
    from: string;
    platform?: string | undefined;
    as?: string | undefined;
}>]>;

type FromInstructionObjectParam = z.infer<typeof zFromInstructionObjectParam>;
type FromInstructionParams = z.infer<typeof zFromInstructionParams>;
interface IFromInstruction extends Instruction {
    setAs: (nameParam: string) => this;
}

declare const zAddInstructionParamObject: z.ZodObject<{
    sources: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    destination: z.ZodString;
    keepGitDir: z.ZodOptional<z.ZodBoolean>;
    checksum: z.ZodOptional<z.ZodString>;
    chown: z.ZodOptional<z.ZodString>;
    chmod: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    link: z.ZodOptional<z.ZodBoolean>;
    exclude: z.ZodOptional<z.ZodString>;
    excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sources: (string | string[]) & (string | string[] | undefined);
    destination: string;
    keepGitDir?: boolean | undefined;
    checksum?: string | undefined;
    chown?: string | undefined;
    chmod?: number | undefined;
    link?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}, {
    sources: (string | string[]) & (string | string[] | undefined);
    destination: string;
    keepGitDir?: boolean | undefined;
    checksum?: string | undefined;
    chown?: string | undefined;
    chmod?: string | undefined;
    link?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}>;
declare const zAddInstructionParams: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodTuple<[z.ZodObject<{
    sources: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    destination: z.ZodString;
    keepGitDir: z.ZodOptional<z.ZodBoolean>;
    checksum: z.ZodOptional<z.ZodString>;
    chown: z.ZodOptional<z.ZodString>;
    chmod: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    link: z.ZodOptional<z.ZodBoolean>;
    exclude: z.ZodOptional<z.ZodString>;
    excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sources: (string | string[]) & (string | string[] | undefined);
    destination: string;
    keepGitDir?: boolean | undefined;
    checksum?: string | undefined;
    chown?: string | undefined;
    chmod?: number | undefined;
    link?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}, {
    sources: (string | string[]) & (string | string[] | undefined);
    destination: string;
    keepGitDir?: boolean | undefined;
    checksum?: string | undefined;
    chown?: string | undefined;
    chmod?: string | undefined;
    link?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}>], null>]>;

type AddInstructionParamObject = z.input<typeof zAddInstructionParamObject>;
type AddInstructionParams = z.input<typeof zAddInstructionParams>;
interface IAddInstruction extends Instruction {
    setKeepGitDir: (keepGitDir?: boolean) => this;
    setChecksum: (checksum: string) => this;
    setChown: (chown: string) => this;
    setChmod: (chmod: string) => this;
    setLink: (link?: boolean) => this;
    addExclude: (exclude: string) => this;
}

type CmdInstructionParams = string[];
interface ICmdInstruction extends Instruction {
    addCmd: (cmd: string) => ICmdInstruction;
}

declare const zCopyInstructionSources: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "atleastone">]>;
declare const zCopyInstructionDestination: z.ZodString;
declare const zCopyInstructionFrom: z.ZodUnion<[z.ZodString, z.ZodObject<{
    type: z.ZodLiteral<"stage">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "stage";
    id: string;
}, {
    type: "stage";
    id: string;
}>]>;
declare const zCopyInstructionChown: z.ZodString;
declare const zCopyInstructionChmod: z.ZodString;
declare const zCopyInstructionLink: z.ZodBoolean;
declare const zCopyInstructionParents: z.ZodBoolean;
declare const zCopyInstructionExclude: z.ZodString;
declare const zCopyInstructionExcludes: z.ZodArray<z.ZodString, "many">;
declare const zCopyInstructionParamObject: z.ZodObject<{
    sources: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "atleastone">]>;
    destination: z.ZodString;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    chown: z.ZodOptional<z.ZodString>;
    chmod: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodBoolean>;
    parents: z.ZodOptional<z.ZodBoolean>;
    exclude: z.ZodOptional<z.ZodString>;
    excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sources: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    destination: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    chown?: string | undefined;
    chmod?: string | undefined;
    link?: boolean | undefined;
    parents?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}, {
    sources: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    destination: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    chown?: string | undefined;
    chmod?: string | undefined;
    link?: boolean | undefined;
    parents?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}>;
declare const zCopyInstructionParams: z.ZodTuple<[z.ZodUnion<[z.ZodString, z.ZodObject<{
    sources: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "atleastone">]>;
    destination: z.ZodString;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    chown: z.ZodOptional<z.ZodString>;
    chmod: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodBoolean>;
    parents: z.ZodOptional<z.ZodBoolean>;
    exclude: z.ZodOptional<z.ZodString>;
    excludes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    sources: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    destination: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    chown?: string | undefined;
    chmod?: string | undefined;
    link?: boolean | undefined;
    parents?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}, {
    sources: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    destination: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    chown?: string | undefined;
    chmod?: string | undefined;
    link?: boolean | undefined;
    parents?: boolean | undefined;
    exclude?: string | undefined;
    excludes?: string[] | undefined;
}>]>], z.ZodString>;

type CopyInstructionSources = z.infer<typeof zCopyInstructionSources>;
type CopyInstructionDestination = z.infer<typeof zCopyInstructionDestination>;
type CopyInstructionFrom = z.infer<typeof zCopyInstructionFrom>;
type CopyInstructionChown = z.infer<typeof zCopyInstructionChown>;
type CopyInstructionChmod = z.infer<typeof zCopyInstructionChmod>;
type CopyInstructionLink = z.infer<typeof zCopyInstructionLink>;
type CopyInstructionParents = z.infer<typeof zCopyInstructionParents>;
type CopyInstructionExclude = z.infer<typeof zCopyInstructionExclude>;
type CopyInstructionExcludes = z.infer<typeof zCopyInstructionExcludes>;
type CopyInstructionParamObject = z.infer<typeof zCopyInstructionParamObject>;
type CopyInstructionParams = z.infer<typeof zCopyInstructionParams>;
interface ICopyInstruction extends Instruction {
    setFrom: (from: string | IStage) => this;
    setChown: (chown: string) => this;
    setChmod: (chmod: string) => this;
    setLink: (link?: boolean) => this;
    setLinked: () => this;
    setParents: (parents?: boolean) => this;
    addExclude: (exclude: string) => this;
}

type EntryPointInstructionParams = string[];
interface IEntryPointInstruction extends Instruction {
    addEntrypointArg: (entrypoint: string) => IEntryPointInstruction;
}

type EnvInstructionParamsObject = Record<string, string>;
type EnvInstructionParams = string | string[] | EnvInstructionParamsObject;
interface IEnvInstruction extends Instruction {
}

declare const zUnixUserGroupId: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>;
declare const zNetworkProtocols: z.ZodUnion<[z.ZodLiteral<"tcp">, z.ZodLiteral<"udp">]>;

type NetworkProtocols = z.infer<typeof zNetworkProtocols>;
type UnixUserGroupId = z.infer<typeof zUnixUserGroupId>;

type ExposePortType = number | string;
interface ExposePortDefinition {
    port: ExposePortType;
    proto?: NetworkProtocols;
}
type ExposePortDefinitionTuple = [ExposePortType, NetworkProtocols?];
type ExposeInstructionParam = string | number | ExposePortDefinition | ExposePortDefinitionTuple;
type ExposeInstructionParams = ExposeInstructionParam[];
interface IExposeInstruction extends Instruction {
}

declare const zHealthCheckDurationParam: z.ZodString;
declare const zHealthCheckCmdsNone: z.ZodLiteral<"NONE">;
declare const zHealthCheckCmdsString: z.ZodString;
declare const zHealthCheckCmdsStringArray: z.ZodArray<z.ZodString, "many">;
declare const zHealthCheckCmdsParam: z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodString, z.ZodArray<z.ZodString, "many">]>;
declare const zHealthCheckRetriesParam: z.ZodNumber;
declare const zHealthCheckParamsObject: z.ZodObject<{
    instruction: z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    interval: z.ZodOptional<z.ZodString>;
    timeout: z.ZodOptional<z.ZodString>;
    startPeriod: z.ZodOptional<z.ZodString>;
    startInterval: z.ZodOptional<z.ZodString>;
    retries: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    instruction: (string | string[]) & (string | string[] | undefined);
    interval?: string | undefined;
    timeout?: string | undefined;
    startPeriod?: string | undefined;
    startInterval?: string | undefined;
    retries?: number | undefined;
}, {
    instruction: (string | string[]) & (string | string[] | undefined);
    interval?: string | undefined;
    timeout?: string | undefined;
    startPeriod?: string | undefined;
    startInterval?: string | undefined;
    retries?: number | undefined;
}>;
declare const zHealthCheckParams: z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodObject<{
    instruction: z.ZodUnion<[z.ZodLiteral<"NONE">, z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    interval: z.ZodOptional<z.ZodString>;
    timeout: z.ZodOptional<z.ZodString>;
    startPeriod: z.ZodOptional<z.ZodString>;
    startInterval: z.ZodOptional<z.ZodString>;
    retries: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    instruction: (string | string[]) & (string | string[] | undefined);
    interval?: string | undefined;
    timeout?: string | undefined;
    startPeriod?: string | undefined;
    startInterval?: string | undefined;
    retries?: number | undefined;
}, {
    instruction: (string | string[]) & (string | string[] | undefined);
    interval?: string | undefined;
    timeout?: string | undefined;
    startPeriod?: string | undefined;
    startInterval?: string | undefined;
    retries?: number | undefined;
}>]>;

type HealthCheckDurationParam = z.infer<typeof zHealthCheckDurationParam>;
type HealthCheckCmdsNone = z.infer<typeof zHealthCheckCmdsNone>;
type HealthCheckCmdsString = z.infer<typeof zHealthCheckCmdsString>;
type HealthCheckCmdsStringArray = z.infer<typeof zHealthCheckCmdsStringArray>;
type HealthCheckCmdsParam = z.infer<typeof zHealthCheckCmdsParam>;
type HealthCheckRetriesParam = z.infer<typeof zHealthCheckRetriesParam>;
type HealthCheckParamsObject = z.infer<typeof zHealthCheckParamsObject>;
type HealthCheckParams = z.infer<typeof zHealthCheckParams>;
interface IHealthCheckInstruction extends Instruction {
    addHealthCheckInstruction: (healthCheckCmd: HealthCheckCmdsString) => this;
}

type LabelInstructionParamsObject = Record<string, string>;
type LabelInstructionParams = string | string[] | LabelInstructionParamsObject;
interface ILabelInstruction extends Instruction {
    addLabel: (labelParam: string) => void;
}

declare const zRunInstructionBooleanFields: z.ZodUnion<[z.ZodLiteral<"rw">, z.ZodLiteral<"readwrite">, z.ZodLiteral<"ro">, z.ZodLiteral<"readonly">, z.ZodLiteral<"required">]>;
declare const zRunInstructionCacheSharingTypes: z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>;
declare const zRunInstructions: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "atleastone">]>;
declare const zRunInstructionMountTypeBindCommon: z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    target: z.ZodString;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    source: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "bind";
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>;
declare const zRunInstructionMountTypeBindReadWrite: z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    readwrite: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "bind";
    readwrite: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    readwrite: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>;
declare const zRunInstructionMountTypeBindRW: z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    rw: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "bind";
    rw: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    rw: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>;
declare const zRunInstructionMountTypeBind: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    readwrite: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "bind";
    readwrite: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    readwrite: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    rw: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "bind";
    rw: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    rw: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    target: z.ZodString;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    source: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "bind";
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>]>;
declare const zRunInstructionMountTypeCacheCommon: z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    target: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    source: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "cache";
    target: string;
    id?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "cache";
    target: string;
    id?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>;
declare const zRunInstructionMountTypeCacheReadOnly: z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    readonly: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "cache";
    readonly: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | undefined;
}, {
    type: "cache";
    readonly: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | number | undefined;
}>;
declare const zRunInstructionMountTypeCacheRO: z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    ro: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "cache";
    ro: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | undefined;
}, {
    type: "cache";
    ro: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | number | undefined;
}>;
declare const zRunInstructionMountTypeCache: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    readonly: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "cache";
    readonly: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | undefined;
}, {
    type: "cache";
    readonly: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    ro: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "cache";
    ro: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | undefined;
}, {
    type: "cache";
    ro: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    target: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    source: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type: "cache";
    target: string;
    id?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "cache";
    target: string;
    id?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>]>;
declare const zRunInstructionMountTypeSecret: z.ZodObject<{
    type: z.ZodLiteral<"secret">;
    id: z.ZodString;
    target: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "secret";
    id: string;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "secret";
    id: string;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>;
declare const zRunInstructionMountTypeSSH: z.ZodObject<{
    type: z.ZodLiteral<"ssh">;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "ssh";
    id?: string | undefined;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "ssh";
    id?: string | undefined;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>;
declare const zRunInstructionMountTypeTmpFS: z.ZodObject<{
    type: z.ZodLiteral<"tmpfs">;
    target: z.ZodString;
    size: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "tmpfs";
    target: string;
    size: number;
}, {
    type: "tmpfs";
    target: string;
    size: number;
}>;
declare const zRunInstructionMountType: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    readwrite: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "bind";
    readwrite: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    readwrite: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    rw: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "bind";
    rw: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    rw: boolean;
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"bind">;
    target: z.ZodString;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    source: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    type: "bind";
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}, {
    type: "bind";
    target: string;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    readonly: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "cache";
    readonly: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | undefined;
}, {
    type: "cache";
    readonly: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodString;
    source: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    ro: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    type: "cache";
    ro: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | undefined;
}, {
    type: "cache";
    ro: boolean;
    target: string;
    uid?: number | undefined;
    gid?: number | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    id?: string | undefined;
    source?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    mode?: string | number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"cache">;
    target: z.ZodString;
    id: z.ZodOptional<z.ZodString>;
    sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
    from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>]>>;
    source: z.ZodOptional<z.ZodString>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type: "cache";
    target: string;
    id?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "cache";
    target: string;
    id?: string | undefined;
    sharing?: "shared" | "private" | "locked" | undefined;
    from?: string | {
        type: "stage";
        id: string;
    } | undefined;
    source?: string | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"ssh">;
    id: z.ZodOptional<z.ZodString>;
    target: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type: "ssh";
    id?: string | undefined;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "ssh";
    id?: string | undefined;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"secret">;
    id: z.ZodString;
    target: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
    uid: z.ZodOptional<z.ZodNumber>;
    gid: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type: "secret";
    id: string;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}, {
    type: "secret";
    id: string;
    target?: string | undefined;
    required?: boolean | undefined;
    mode?: string | number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"tmpfs">;
    target: z.ZodString;
    size: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "tmpfs";
    target: string;
    size: number;
}, {
    type: "tmpfs";
    target: string;
    size: number;
}>]>;
declare const zRunInstructionNetworkType: z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"none">, z.ZodLiteral<"host">]>;
declare const zRunInstructionSecurityType: z.ZodUnion<[z.ZodLiteral<"sandbox">, z.ZodLiteral<"insecure">]>;
declare const zRunInstructionParamsObject: z.ZodObject<{
    commands: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "atleastone">]>;
    mount: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"bind">;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        readwrite: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }, {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bind">;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        rw: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }, {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bind">;
        target: z.ZodString;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        source: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }, {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"cache">;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        id: z.ZodOptional<z.ZodString>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        readonly: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    }, {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"cache">;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        id: z.ZodOptional<z.ZodString>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        ro: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    }, {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"cache">;
        target: z.ZodString;
        id: z.ZodOptional<z.ZodString>;
        sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        source: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }, {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ssh">;
        id: z.ZodOptional<z.ZodString>;
        target: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }, {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"secret">;
        id: z.ZodString;
        target: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }, {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tmpfs">;
        target: z.ZodString;
        size: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "tmpfs";
        target: string;
        size: number;
    }, {
        type: "tmpfs";
        target: string;
        size: number;
    }>]>>;
    network: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"none">, z.ZodLiteral<"host">]>>;
    security: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"sandbox">, z.ZodLiteral<"insecure">]>>;
}, "strip", z.ZodTypeAny, {
    commands: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    mount?: {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    } | {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    } | {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "tmpfs";
        target: string;
        size: number;
    } | undefined;
    network?: "default" | "none" | "host" | undefined;
    security?: "sandbox" | "insecure" | undefined;
}, {
    commands: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    mount?: {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    } | {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    } | {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "tmpfs";
        target: string;
        size: number;
    } | undefined;
    network?: "default" | "none" | "host" | undefined;
    security?: "sandbox" | "insecure" | undefined;
}>;
declare const zRunInstructionParams: z.ZodUnion<[z.ZodTuple<[z.ZodString], null>, z.ZodTuple<[z.ZodString], z.ZodString>, z.ZodTuple<[z.ZodArray<z.ZodString, "atleastone">], null>, z.ZodTuple<[z.ZodObject<{
    commands: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "atleastone">]>;
    mount: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<"bind">;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        readwrite: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }, {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bind">;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        rw: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }, {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bind">;
        target: z.ZodString;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        source: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }, {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"cache">;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        id: z.ZodOptional<z.ZodString>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        readonly: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    }, {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"cache">;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        id: z.ZodOptional<z.ZodString>;
        target: z.ZodString;
        source: z.ZodOptional<z.ZodString>;
        sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        ro: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    }, {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"cache">;
        target: z.ZodString;
        id: z.ZodOptional<z.ZodString>;
        sharing: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"shared">, z.ZodLiteral<"private">, z.ZodLiteral<"locked">]>>;
        from: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            type: z.ZodLiteral<"stage">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "stage";
            id: string;
        }, {
            type: "stage";
            id: string;
        }>]>>;
        source: z.ZodOptional<z.ZodString>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }, {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ssh">;
        id: z.ZodOptional<z.ZodString>;
        target: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }, {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"secret">;
        id: z.ZodString;
        target: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        mode: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, string | number, string | number>, string, string | number>>;
        uid: z.ZodOptional<z.ZodNumber>;
        gid: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }, {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"tmpfs">;
        target: z.ZodString;
        size: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "tmpfs";
        target: string;
        size: number;
    }, {
        type: "tmpfs";
        target: string;
        size: number;
    }>]>>;
    network: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"default">, z.ZodLiteral<"none">, z.ZodLiteral<"host">]>>;
    security: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"sandbox">, z.ZodLiteral<"insecure">]>>;
}, "strip", z.ZodTypeAny, {
    commands: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    mount?: {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    } | {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | undefined;
    } | {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "tmpfs";
        target: string;
        size: number;
    } | undefined;
    network?: "default" | "none" | "host" | undefined;
    security?: "sandbox" | "insecure" | undefined;
}, {
    commands: (string | [string, ...string[]]) & (string | [string, ...string[]] | undefined);
    mount?: {
        type: "bind";
        readwrite: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        rw: boolean;
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "bind";
        target: string;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
    } | {
        type: "cache";
        readonly: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    } | {
        type: "cache";
        ro: boolean;
        target: string;
        uid?: number | undefined;
        gid?: number | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        id?: string | undefined;
        source?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        mode?: string | number | undefined;
    } | {
        type: "cache";
        target: string;
        id?: string | undefined;
        sharing?: "shared" | "private" | "locked" | undefined;
        from?: string | {
            type: "stage";
            id: string;
        } | undefined;
        source?: string | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "ssh";
        id?: string | undefined;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "secret";
        id: string;
        target?: string | undefined;
        required?: boolean | undefined;
        mode?: string | number | undefined;
        uid?: number | undefined;
        gid?: number | undefined;
    } | {
        type: "tmpfs";
        target: string;
        size: number;
    } | undefined;
    network?: "default" | "none" | "host" | undefined;
    security?: "sandbox" | "insecure" | undefined;
}>], null>]>;

type RunInstructionBooleanFields = z.input<typeof zRunInstructionBooleanFields>;
type RunInstructionCacheSharingTypes = z.input<typeof zRunInstructionCacheSharingTypes>;
type RunInstructionMountTypeBindCommon = z.input<typeof zRunInstructionMountTypeBindCommon>;
type RunInstructionMountTypeBindReadWrite = z.input<typeof zRunInstructionMountTypeBindReadWrite>;
type RunInstructionMountTypeBindRW = z.input<typeof zRunInstructionMountTypeBindRW>;
type RunInstructionMountTypeBind = z.input<typeof zRunInstructionMountTypeBind>;
type RunInstructionMountTypeCacheCommon = z.input<typeof zRunInstructionMountTypeCacheCommon>;
type RunInstructionMountTypeCacheReadOnly = z.input<typeof zRunInstructionMountTypeCacheReadOnly>;
type RunInstructionMountTypeCacheRO = z.input<typeof zRunInstructionMountTypeCacheRO>;
type RunInstructionMountTypeCache = z.input<typeof zRunInstructionMountTypeCache>;
type RunInstructionMountTypeSecret = z.input<typeof zRunInstructionMountTypeSecret>;
type RunInstructionMountTypeSSH = z.input<typeof zRunInstructionMountTypeSSH>;
type RunInstructionMountTypeTmpFS = z.input<typeof zRunInstructionMountTypeTmpFS>;
type RunInstructionMountType = z.input<typeof zRunInstructionMountType>;
type RunInstructionNetworkType = z.input<typeof zRunInstructionNetworkType>;
type RunInstructionParams = z.input<typeof zRunInstructionParams>;
type RunInstructionParamsObject = z.input<typeof zRunInstructionParamsObject>;
type RunInstructionSecurityType = z.input<typeof zRunInstructionSecurityType>;
type RunInstructions = z.input<typeof zRunInstructions>;
interface IRunInstruction extends Instruction {
    setMount: (mount: RunInstructionMountType) => void;
    setNetwork: (network: RunInstructionNetworkType) => void;
    setSecurity: (security: RunInstructionSecurityType) => void;
}

type ShellInstructionParams = string[];
interface IShellInstruction extends Instruction {
    addShell: (shell: string) => this;
}

declare const zStopSignalString: z.ZodString;
declare const zStopSignalNumber: z.ZodNumber;

type StopSignalInstructionParams = string | number;
type StopSignalString = z.infer<typeof zStopSignalString>;
type StopSignalNumber = z.infer<typeof zStopSignalNumber>;
interface IStopSignalInstruction extends Instruction {
}

declare const zUserInstructionPrimaryParam: z.ZodUnion<[z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, number[], string>, z.ZodUnion<[z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>], null>, z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>, z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>], null>]>, z.ZodArray<z.ZodNumber, "atleastone">, z.ZodNumber]>;
declare const zUserInstructionParams: z.ZodUnion<[z.ZodTuple<[z.ZodObject<{
    uid: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>;
    gid: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>>;
}, "strip", z.ZodTypeAny, {
    uid: string | number;
    gid?: string | number | undefined;
}, {
    uid: string | number;
    gid?: string | number | undefined;
}>], null>, z.ZodTuple<[z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, number[], string>], null>, z.ZodTuple<[z.ZodUnion<[z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>], null>, z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>, z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>], null>]>], null>, z.ZodTuple<[z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>, "atleastone">], null>, z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>, z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>], null>, z.ZodTuple<[z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, string, string>]>], null>, z.ZodTuple<[z.ZodString, z.ZodString], null>, z.ZodTuple<[z.ZodString], null>]>;

type UserInstructionPrimaryParam = z.input<typeof zUserInstructionPrimaryParam>;
type UserInstructionParams = z.input<typeof zUserInstructionParams>;
interface IUserInstruction extends Instruction {
}

type VolumeInstructionParams = string[];
interface IVolumeInstruction extends Instruction {
}

interface IWorkDirInstruction extends Instruction {
}

declare const zStage: z.ZodObject<{
    type: z.ZodLiteral<"stage">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "stage";
    id: string;
}, {
    type: "stage";
    id: string;
}>;
declare const zStageFromInstructionObjectParam: z.ZodObject<{
    platform: z.ZodOptional<z.ZodString>;
    as: z.ZodOptional<z.ZodString>;
    from: z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    from: {
        type: "stage";
        id: string;
    };
    platform?: string | undefined;
    as?: string | undefined;
}, {
    from: {
        type: "stage";
        id: string;
    };
    platform?: string | undefined;
    as?: string | undefined;
}>;
declare const zStageParams: z.ZodUnion<[z.ZodString, z.ZodObject<{
    from: z.ZodString;
    platform: z.ZodOptional<z.ZodString>;
    as: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from: string;
    platform?: string | undefined;
    as?: string | undefined;
}, {
    from: string;
    platform?: string | undefined;
    as?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"stage">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "stage";
    id: string;
}, {
    type: "stage";
    id: string;
}>, z.ZodObject<{
    platform: z.ZodOptional<z.ZodString>;
    as: z.ZodOptional<z.ZodString>;
    from: z.ZodObject<{
        type: z.ZodLiteral<"stage">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "stage";
        id: string;
    }, {
        type: "stage";
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    from: {
        type: "stage";
        id: string;
    };
    platform?: string | undefined;
    as?: string | undefined;
}, {
    from: {
        type: "stage";
        id: string;
    };
    platform?: string | undefined;
    as?: string | undefined;
}>]>;

interface IStage {
    type: 'stage';
    id: string;
    stack: Instructions;
    withInstruction: <T = Instruction>(instructionParam: T) => T;
    withAdd: (...addParams: AddInstructionParams) => IAddInstruction;
    withArg: (argParam: ArgInstructionParams) => IArgInstruction;
    withCmd: (...cmdParams: CmdInstructionParams) => ICmdInstruction;
    withCopy: (...copyParams: CopyInstructionParams) => ICopyInstruction;
    withEntryPoint: (...entryPointParams: EntryPointInstructionParams) => IEntryPointInstruction;
    withEnv: (envParam: EnvInstructionParams) => IEnvInstruction;
    withExpose: (...exposeParams: ExposeInstructionParams) => IExposeInstruction;
    withHealthCheck: (healthCheckParam: HealthCheckParams) => IHealthCheckInstruction;
    withLabel: (labelParam: LabelInstructionParams) => ILabelInstruction;
    withRun: (...runParams: RunInstructionParams) => IRunInstruction;
    withShell: (...shellParams: ShellInstructionParams) => IShellInstruction;
    withStopSignal: (stopsignalParam: StopSignalInstructionParams) => IStopSignalInstruction;
    withUser: (...userParams: UserInstructionParams) => IUserInstruction;
    withVolume: (...volumeParams: VolumeInstructionParams) => IVolumeInstruction;
    withWorkDir: (workdirParam: string) => IWorkDirInstruction;
    setId: (id: string) => this;
    toString: () => string;
}
type StageFromInstructionObjectParam = z.infer<typeof zStageFromInstructionObjectParam>;
type StageParam = z.infer<typeof zStage>;
type StageParams = z.infer<typeof zStageParams>;

interface IDockerConfigTool {
    withArg: (arg: ArgInstructionParams) => this;
    withStage: (from: FromInstructionParams | StageFromInstructionObjectParam | IStage) => IStage;
    toString: () => string;
}

declare class DockerConfigTool implements IDockerConfigTool {
    args: ArgInstruction[];
    stack: IStage[];
    constructor(stackParam?: IStage[]);
    withArg(arg: ArgInstructionParams): this;
    withStage(fromParam: FromInstructionParams | StageFromInstructionObjectParam | IStage): IStage;
    toString(): string;
}

declare class AddInstruction implements IAddInstruction {
    type: "instruction";
    sources: string[];
    destination: string;
    keepGitDir: boolean;
    checksum?: string;
    chown?: string;
    chmod?: string;
    link?: boolean;
    excludes?: string[];
    constructor(...addInstructionParams: AddInstructionParams);
    private hoistAddObject;
    setKeepGitDir(keepGitDir?: boolean): this;
    setChecksum(checksum: string): this;
    setChown(chown: string): this;
    setChmod(chmod: string): this;
    setLink(link?: boolean): this;
    addExclude(exclude: string): this;
    toString(): string;
}

declare class CmdInstruction implements ICmdInstruction {
    type: "instruction";
    commands: string[];
    constructor(...cmdParams: CmdInstructionParams);
    addCmd(cmdParam: string): this;
    toString(): string;
}

declare class CopyInstruction implements ICopyInstruction {
    type: "instruction";
    sources: string[];
    destination: string;
    from?: string;
    chown?: string;
    chmod?: string;
    link?: boolean;
    parents?: boolean;
    excludes?: string[];
    constructor(...copyInstructionParams: CopyInstructionParams);
    private hoistCopyObject;
    setFrom(from: string | IStage): this;
    setChown(chown: string): this;
    setChmod(chmod: string): this;
    setLink(link?: boolean): this;
    setLinked(): this;
    setParents(parents?: boolean): this;
    addExclude(exclude: string): this;
    toString(): string;
}

declare class EntryPointInstruction implements IEntryPointInstruction {
    type: "instruction";
    entrypointCmds: string[];
    constructor(...entrypointParams: EntryPointInstructionParams);
    addEntrypointArg(entrypoint: string): this;
    toString(): string;
}

declare class EnvInstruction implements IEnvInstruction {
    type: "instruction";
    envs: Record<string, string>;
    constructor(envParam: EnvInstructionParams);
    addEnv(envName: string, envVal: unknown): this;
    toString(): string;
}

declare class ExposeInstruction implements IExposeInstruction {
    type: "instruction";
    exposeCmds: ExposePortDefinition[];
    constructor(...exposeParams: ExposeInstructionParams);
    addExposeParam(exposeParam: ExposeInstructionParam): this;
    toString(): string;
}

declare class FromInstruction implements IFromInstruction {
    type: "instruction";
    from: string;
    platform?: string;
    as?: string;
    constructor(fromParam: FromInstructionParams);
    setAs(nameParam: string): this;
    toString(): string;
}

declare class HealthCheckInstruction implements IHealthCheckInstruction {
    type: "instruction";
    instruction: string[];
    interval: string | undefined;
    timeout: string | undefined;
    startPeriod: string | undefined;
    startInterval: string | undefined;
    retries: number | undefined;
    constructor(healthcheckParam: HealthCheckParams);
    addHealthCheckInstruction(healthCheckCmd: HealthCheckCmdsString): this;
    toString(): string;
}

declare class LabelInstruction implements ILabelInstruction {
    type: "instruction";
    labels: Record<string, string>;
    constructor(labelParam: LabelInstructionParams);
    addLabel(labelParam: string): void;
    toString(): string;
}

declare class RunInstruction implements IRunInstruction {
    type: "instruction";
    commands: string[];
    mount?: RunInstructionMountType;
    network?: RunInstructionNetworkType;
    security?: RunInstructionSecurityType;
    constructor(...runParams: RunInstructionParams);
    setMount(mount: RunInstructionMountType): void;
    setNetwork(network: RunInstructionNetworkType): void;
    setSecurity(security: RunInstructionSecurityType): void;
    toString(): string;
}

declare class ShellInstruction implements IShellInstruction {
    type: "instruction";
    commands: string[];
    constructor(...shellParams: ShellInstructionParams);
    addShell(shellParam: string): this;
    toString(): string;
}

declare class StopSignalInstruction implements IStopSignalInstruction {
    type: "instruction";
    stopsignal: string | number;
    constructor(stopsignalParam: StopSignalInstructionParams);
    toString(): string;
}

declare class UserInstruction implements IUserInstruction {
    type: "instruction";
    uid?: UnixUserGroupId;
    gid?: UnixUserGroupId;
    constructor(...userInstructionParams: UserInstructionParams);
    toString(): string;
}

declare class VolumeInstruction implements IVolumeInstruction {
    type: "instruction";
    commands: string[];
    constructor(...volumeParams: VolumeInstructionParams);
    addVolume(volume: string): this;
    toString(): string;
}

declare class WorkDirInstruction implements IWorkDirInstruction {
    type: "instruction";
    workdir: string;
    constructor(workdirParam: string);
    toString(): string;
}

declare class Stage implements IStage {
    type: "stage";
    id: string;
    stack: Instruction[];
    constructor(stageParam: StageParams);
    getRandomId(): string;
    withInstruction<T = Instruction>(instructionParam: T): T;
    withAdd(...addParams: AddInstructionParams): IAddInstruction;
    withArg(argParam: ArgInstructionParams): IArgInstruction;
    withCmd(...cmdParams: CmdInstructionParams): ICmdInstruction;
    withCopy(...copyInstructionParams: CopyInstructionParams): ICopyInstruction;
    withFrom(from: FromInstructionParams): IFromInstruction;
    withEntryPoint(...entrypointCmds: EntryPointInstructionParams): IEntryPointInstruction;
    withEnv(envParam: EnvInstructionParams): IEnvInstruction;
    withExpose(...exposes: ExposeInstructionParams): IExposeInstruction;
    withHealthCheck(healthcheck: HealthCheckParams): IHealthCheckInstruction;
    withLabel(labelParam: LabelInstructionParams): ILabelInstruction;
    withRun(...runParams: RunInstructionParams): IRunInstruction;
    withShell(...shellParams: ShellInstructionParams): IShellInstruction;
    withStopSignal(stopsignalParam: StopSignalInstructionParams): IStopSignalInstruction;
    withUser(...userInstructionParams: UserInstructionParams): IUserInstruction;
    withVolume(...volumeParams: VolumeInstructionParams): IVolumeInstruction;
    withWorkDir(workdir: string): IWorkDirInstruction;
    setId(id: string): this;
    toString(): string;
}

export { AddInstruction, type AddInstructionParamObject, type AddInstructionParams, ArgInstruction, type ArgInstructionParams, type ArgInstructionParamsObject, CmdInstruction, type CmdInstructionParams, CopyInstruction, type CopyInstructionChmod, type CopyInstructionChown, type CopyInstructionDestination, type CopyInstructionExclude, type CopyInstructionExcludes, type CopyInstructionFrom, type CopyInstructionLink, type CopyInstructionParamObject, type CopyInstructionParams, type CopyInstructionParents, type CopyInstructionSources, DockerConfigTool, EntryPointInstruction, type EntryPointInstructionParams, EnvInstruction, type EnvInstructionParams, type EnvInstructionParamsObject, ExposeInstruction, type ExposeInstructionParam, type ExposeInstructionParams, type ExposePortDefinition, type ExposePortDefinitionTuple, FromInstruction, type FromInstructionObjectParam, type FromInstructionParams, type HealthCheckCmdsNone, type HealthCheckCmdsParam, type HealthCheckCmdsString, type HealthCheckCmdsStringArray, type HealthCheckDurationParam, HealthCheckInstruction, type HealthCheckParams, type HealthCheckParamsObject, type HealthCheckRetriesParam, type IAddInstruction, type IArgInstruction, type ICmdInstruction, type ICopyInstruction, type IDockerConfigTool, type IEntryPointInstruction, type IEnvInstruction, type IExposeInstruction, type IFromInstruction, type IHealthCheckInstruction, type ILabelInstruction, type IRunInstruction, type IShellInstruction, type IStage, type IStopSignalInstruction, type IUserInstruction, type IVolumeInstruction, type IWorkDirInstruction, LabelInstruction, type LabelInstructionParams, type LabelInstructionParamsObject, RunInstruction, type RunInstructionBooleanFields, type RunInstructionCacheSharingTypes, type RunInstructionMountType, type RunInstructionMountTypeBind, type RunInstructionMountTypeBindCommon, type RunInstructionMountTypeBindRW, type RunInstructionMountTypeBindReadWrite, type RunInstructionMountTypeCache, type RunInstructionMountTypeCacheCommon, type RunInstructionMountTypeCacheRO, type RunInstructionMountTypeCacheReadOnly, type RunInstructionMountTypeSSH, type RunInstructionMountTypeSecret, type RunInstructionMountTypeTmpFS, type RunInstructionNetworkType, type RunInstructionParams, type RunInstructionParamsObject, type RunInstructionSecurityType, type RunInstructions, ShellInstruction, type ShellInstructionParams, Stage, type StageFromInstructionObjectParam, type StageParam, type StageParams, StopSignalInstruction, type StopSignalInstructionParams, type StopSignalNumber, type StopSignalString, UserInstruction, type UserInstructionParams, type UserInstructionPrimaryParam, VolumeInstruction, type VolumeInstructionParams, WorkDirInstruction };
