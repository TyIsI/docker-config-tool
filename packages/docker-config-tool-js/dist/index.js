"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AddInstruction: () => AddInstruction,
  ArgInstruction: () => ArgInstruction,
  CmdInstruction: () => CmdInstruction,
  CopyInstruction: () => CopyInstruction,
  DockerConfigTool: () => DockerConfigTool,
  EntryPointInstruction: () => EntryPointInstruction,
  EnvInstruction: () => EnvInstruction,
  ExposeInstruction: () => ExposeInstruction,
  FromInstruction: () => FromInstruction,
  HealthCheckInstruction: () => HealthCheckInstruction,
  LabelInstruction: () => LabelInstruction,
  RunInstruction: () => RunInstruction,
  ShellInstruction: () => ShellInstruction,
  StopSignalInstruction: () => StopSignalInstruction,
  UserInstruction: () => UserInstruction,
  VolumeInstruction: () => VolumeInstruction,
  WorkdirInstruction: () => WorkdirInstruction
});
module.exports = __toCommonJS(src_exports);

// src/lib/shared/coerce.ts
var import_zod3 = require("zod");

// src/lib/shared/guards.ts
var import_zod2 = require("zod");

// src/lib/shared/schema.ts
var import_zod = require("zod");
var zRequiredString = (message) => import_zod.z.string().trim().regex(/.+/, message ?? "Invalid string input");
var zUnixUserGroupNumericId = import_zod.z.coerce.number({ invalid_type_error: "invalid numeric unix id" }).min(1).max(65535);
var zUnixUserGroupStringId = import_zod.z.string({ invalid_type_error: "invalid unix id string" }).refine((val) => zUnixUserGroupNumericId.safeParse(val).success);
var zUnixUserGroupId = import_zod.z.union([zUnixUserGroupNumericId, zUnixUserGroupStringId]);
var zUnixUserGroupIdComboString = import_zod.z.string({ invalid_type_error: "invalid unix id string tuple" }).regex(/\d{1,5}(:\d{1,5})/).refine((val) => val.includes(":") ? val.split(":").filter((e) => e != null && e !== "").length === 2 : true).refine((val) => val.split(":").every((e) => zUnixUserGroupNumericId.safeParse(e).success)).transform((val) => val.split(":").map((e) => Number(e)));
var zFileAccessMode = import_zod.z.union([import_zod.z.number(), import_zod.z.string()], { invalid_type_error: "invalid unix file access mode permission" }).refine((val) => /^[0-7]{3,4}$/.test(val.toString())).transform(String);
var zUIDOpt = import_zod.z.object({ uid: zUnixUserGroupId }, { invalid_type_error: "invalid unix uid opt" });
var zGIDOpt = import_zod.z.object({ gid: zUnixUserGroupId }, { invalid_type_error: "invalid unix gid opt" });
var zUIDGIDTuple = import_zod.z.union([import_zod.z.tuple([zUnixUserGroupId]), import_zod.z.tuple([zUnixUserGroupId, zUnixUserGroupId])], {
  invalid_type_error: "invalid unix uid/gid tuple"
});
var zUIDGIDObj = zUIDOpt.extend({ gid: zUnixUserGroupId.optional() });
var zRWOpt = import_zod.z.object({ rw: import_zod.z.boolean() });
var zReadWriteOpt = import_zod.z.object({ readwrite: import_zod.z.boolean() });
var zROOpt = import_zod.z.object({ ro: import_zod.z.boolean() });
var zReadOnlyOpt = import_zod.z.object({ readonly: import_zod.z.boolean() });
var zStringRecord = import_zod.z.record(import_zod.z.string(), import_zod.z.coerce.string()).refine((val) => Object.keys(val).length > 0);
var zPartialEnvVar = import_zod.z.string().regex(/^([a-zA-Z_]\w*)(=.+)?$/);
var zEnvVar = import_zod.z.string().regex(/^([a-zA-Z_]\w*)=.+$/);
var zPartialEnvVarArray = import_zod.z.array(zPartialEnvVar).nonempty();
var zEnvVarArray = import_zod.z.array(zEnvVar).nonempty();
var zPartialLabelVar = import_zod.z.string().regex(/^([a-zA-Z_.][\w.]*)(=.+)?$/);
var zLabelVar = import_zod.z.string().regex(/^([a-zA-Z_.][\w.]*)=.+$/);
var zPartialLabelVarArray = import_zod.z.array(zPartialLabelVar).nonempty();
var zLabelVarArray = import_zod.z.array(zLabelVar).nonempty();
var zNetworkProtocolTCP = import_zod.z.literal("tcp");
var zNetworkProtocolUDP = import_zod.z.literal("udp");
var zNetworkProtocols = import_zod.z.union([zNetworkProtocolTCP, zNetworkProtocolUDP]);

// src/lib/shared/guards.ts
var isTrueBoolean = (value) => import_zod2.z.literal(true).safeParse(value).success;
var isString = (value) => zRequiredString().safeParse(value).success;
var isStringArray = (value) => import_zod2.z.array(zRequiredString()).nonempty().safeParse(value).success;
var isObjectWithProperty = (value, property) => import_zod2.z.object({
  [property]: import_zod2.z.unknown()
}).required().refine((val) => Object.keys(val).length > 0).safeParse(value).success;
var isEnvVar = (value) => zEnvVar.safeParse(value).success;
var isEnvVarArray = (value) => zEnvVarArray.safeParse(value).success;
var isPartialLabelVar = (value) => zPartialLabelVar.safeParse(value).success;
var isPartialLabelVarArray = (value) => zPartialLabelVarArray.safeParse(value).success;
var isStringRecord = (value) => zStringRecord.safeParse(value).success;

// src/lib/shared/coerce.ts
var coerceString = (value) => {
  const result = import_zod3.z.coerce.string().safeParse(value);
  return result.success ? result.data : "";
};
var coerceStringArray = (value) => {
  if (isStringArray(value))
    return value;
  if (isString(value))
    return [value];
  throw new Error("Invalid string array");
};
var coerceFirstValue = (...value) => {
  const result = import_zod3.z.array(import_zod3.z.unknown()).nonempty().safeParse(value);
  if (!result.success)
    throw new Error("Not a valid array");
  const validMatches = value.filter((e) => e != null);
  if (validMatches.length === 0)
    throw new Error("No non null array elements");
  return validMatches[0];
};

// src/lib/shared/utils.ts
var generateConstructorErrorMessage = (cmdId, ...args) => {
  if (cmdId == null)
    throw new Error("Missing cmdId");
  return args.reduce(
    (c, e) => `${c} ${typeof e} ${JSON.stringify(e)}`,
    `Invalid or missing arguments while attempting to create new ${cmdId} instance:`
  );
};
var generateInvalidArgumentErrorMessage = (cmdId, ...args) => {
  if (cmdId == null)
    throw new Error("Missing cmdId");
  return args.reduce((c, e) => `${c} ${typeof e} ${JSON.stringify(e)}`, `Invalid ${cmdId} argument:`);
};
var randomString = (length) => {
  length = length ?? 1;
  return Array.from(Array(length), () => Math.round(Math.random() * Math.pow(2, 48)).toString(26)).join("");
};
var reduceZodErrors = (error) => {
  return error.issues.reduce((c, e) => {
    c.push(e.message);
    return c;
  }, []);
};

// src/lib/instructions/add/schema.ts
var import_zod4 = require("zod");
var zAddInstructionSources = import_zod4.z.union([import_zod4.z.string(), import_zod4.z.array(import_zod4.z.string())]);
var zAddInstructionDestination = import_zod4.z.string();
var zAddInstructionKeepGitDir = import_zod4.z.boolean();
var zAddInstructionChecksum = import_zod4.z.string().regex(/^sha256:[0-9a-f]{64}/, "Invalid checksum");
var zAddInstructionChown = import_zod4.z.string().regex(/^(\d{1,5}|[a-z]{4,})(:(\d{1,5}|[a-z]{4,}))?$/);
var zAddInstructionChmod = import_zod4.z.string().regex(/^[0-7]{3,4}$/).transform(Number);
var zAddInstructionLink = import_zod4.z.boolean();
var zAddInstructionExclude = import_zod4.z.string().regex(/^[/.a-z0-9_-]+/);
var zAddInstructionExcludes = import_zod4.z.array(zAddInstructionExclude);
var zAddInstructionParamObject = import_zod4.z.object({
  sources: zAddInstructionSources,
  destination: zAddInstructionDestination,
  keepGitDir: zAddInstructionKeepGitDir.optional(),
  checksum: zAddInstructionChecksum.optional(),
  chown: zAddInstructionChown.optional(),
  chmod: zAddInstructionChmod.optional(),
  link: zAddInstructionLink.optional(),
  exclude: zAddInstructionExclude.optional(),
  excludes: zAddInstructionExcludes.optional()
});
var zAddInstructionParams = import_zod4.z.union(
  [
    import_zod4.z.array(zRequiredString(), { invalid_type_error: "Invalid Add Instruction string array" }).min(2, "Not enough Add Instruction string parameters"),
    import_zod4.z.tuple([zAddInstructionParamObject], { invalid_type_error: "Invalid Add Instruction param object" })
  ],
  { invalid_type_error: "Invalid Add Instruction param" }
);

// src/lib/instructions/add/guards.ts
var isAddInstructionParamObject = (value) => {
  return zAddInstructionParamObject.safeParse(value).success;
};
var isAddInstructionSources = (value) => zAddInstructionSources.safeParse(value).success;
var isAddInstructionKeepGitDir = (value) => zAddInstructionKeepGitDir.safeParse(value).success;
var isAddInstructionChecksum = (value) => zAddInstructionChecksum.safeParse(value).success;
var isAddInstructionChown = (value) => zAddInstructionChown.safeParse(value).success;
var isAddInstructionChmod = (value) => zAddInstructionChmod.safeParse(value).success;
var isAddInstructionLink = (value) => zAddInstructionLink.safeParse(value).success;

// src/lib/instructions/add/validators.ts
var validateAddInstructionParams = (value) => {
  const result = zAddInstructionParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/instructions/add/class.ts
var AddInstruction = class {
  type = "instruction";
  sources = [];
  destination = "";
  keepGitDir = false;
  checksum;
  chown;
  chmod;
  link;
  excludes;
  constructor(...addInstructionParams) {
    const [valid, error] = validateAddInstructionParams(addInstructionParams);
    if (!valid) {
      throw new Error(generateConstructorErrorMessage("ADD", addInstructionParams, error));
    } else if (isAddInstructionParamObject(addInstructionParams[0])) {
      this.hoistAddObject(addInstructionParams[0]);
    } else if (isStringArray(addInstructionParams)) {
      const joinedParams = addInstructionParams;
      this.destination = joinedParams.splice(joinedParams.length - 1, 1)[0];
      this.sources = joinedParams;
    }
  }
  hoistAddObject(addParamsObject) {
    if (isAddInstructionSources(addParamsObject.sources))
      this.sources = coerceStringArray(addParamsObject.sources);
    if (isString(addParamsObject.destination))
      this.destination = addParamsObject.destination;
    if (isAddInstructionKeepGitDir(addParamsObject.keepGitDir))
      this.keepGitDir = addParamsObject.keepGitDir;
    if (isAddInstructionChecksum(addParamsObject.checksum))
      this.checksum = addParamsObject.checksum;
    if (isAddInstructionChown(addParamsObject.chown))
      this.chown = addParamsObject.chown;
    if (isAddInstructionChmod(addParamsObject.chmod))
      this.chmod = addParamsObject.chmod;
    if (isAddInstructionLink(addParamsObject.link))
      this.link = addParamsObject.link;
    if (isString(addParamsObject.exclude)) {
      if (this.excludes == null)
        this.excludes = [];
      this.excludes.push(addParamsObject.exclude);
    }
    if (isStringArray(addParamsObject.excludes)) {
      if (this.excludes != null)
        this.excludes = this.excludes.concat(addParamsObject.excludes);
      else
        this.excludes = addParamsObject.excludes;
    }
  }
  setKeepGitDir(keepGitDir) {
    if (!zAddInstructionKeepGitDir.optional().safeParse(keepGitDir).success)
      throw new Error(`Invalid input for setKeepGitDir: ${JSON.stringify(keepGitDir)}`);
    keepGitDir = keepGitDir ?? true;
    this.keepGitDir = keepGitDir;
    return this;
  }
  setChecksum(checksum) {
    if (!zAddInstructionChecksum.safeParse(checksum).success)
      throw new Error(`Invalid input for setChecksum: ${JSON.stringify(checksum)}`);
    this.checksum = checksum;
    return this;
  }
  setChown(chown) {
    if (!zAddInstructionChown.safeParse(chown).success)
      throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`);
    this.chown = chown;
    return this;
  }
  setChmod(chmod) {
    if (!zAddInstructionChmod.safeParse(chmod).success)
      throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`);
    this.chmod = chmod;
    return this;
  }
  setLink(link) {
    if (!zAddInstructionLink.optional().safeParse(link).success)
      throw new Error(`Invalid input for setLink: ${JSON.stringify(link)}`);
    link = link ?? true;
    this.link = link;
    return this;
  }
  addExclude(exclude) {
    if (!zAddInstructionExclude.safeParse(exclude).success)
      throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`);
    if (this.excludes == null)
      this.excludes = [];
    this.excludes.push(exclude);
    return this;
  }
  toString() {
    const result = ["ADD"];
    if (this.keepGitDir)
      result.push(`--keepGitDir`);
    if (this.checksum != null)
      result.push(`--checksum=${this.checksum}`);
    if (this.chown != null)
      result.push(`--chown=${this.chown}`);
    if (this.chmod != null)
      result.push(`--chmod=${this.chmod}`);
    if (this.link != null && this.link)
      result.push(`--link`);
    if (this.excludes != null)
      this.excludes.forEach((e) => result.push(`--exclude=${e}`));
    this.sources.forEach((s) => result.push(s));
    result.push(this.destination);
    return result.join(" ");
  }
};

// src/lib/instructions/arg/schema.ts
var import_zod5 = require("zod");
var zArgInstructionParamsObject = import_zod5.z.object({
  name: import_zod5.z.string().trim().min(2),
  value: import_zod5.z.string().trim().min(2).optional()
});
var zArgInstructionParams = import_zod5.z.union([import_zod5.z.string().trim().min(2), zArgInstructionParamsObject]);

// src/lib/instructions/arg/guards.ts
var isArgInstructionParamObject = (value) => {
  return zArgInstructionParamsObject.safeParse(value).success;
};
var isArgInstructionParams = (value) => zArgInstructionParams.safeParse(value).success;

// src/lib/instructions/arg/class.ts
var ArgInstruction = class {
  type = "instruction";
  argName;
  argValue;
  constructor(argParam) {
    if (!isArgInstructionParams(argParam))
      throw new Error(generateConstructorErrorMessage("ARG", argParam));
    if (isArgInstructionParamObject(argParam)) {
      const { name, value } = argParam;
      this.argName = name;
      if (isString(value))
        this.argValue = value;
    }
    if (isString(argParam)) {
      const [name, value] = argParam.split("=");
      this.argName = name;
      if (typeof value === "string" && value === "")
        throw new Error(generateConstructorErrorMessage(`ARG`, argParam));
      this.argValue = value;
    }
  }
  toString() {
    return `ARG ${[this.argName, this.argValue].filter((e) => e != null && e !== "").join("=")}`;
  }
};

// src/lib/instructions/cmd/class.ts
var CmdInstruction = class {
  type = "instruction";
  commands = [];
  constructor(...cmdParams) {
    if (!isStringArray(cmdParams))
      throw new Error(generateConstructorErrorMessage("CMD", cmdParams));
    this.commands = cmdParams.length === 1 ? cmdParams[0].split(" ") : cmdParams;
  }
  addCmd(cmdParam) {
    if (!isString(cmdParam))
      throw new Error(`Invalid cmd argument: ${typeof cmdParam} ${JSON.stringify(cmdParam)}`);
    this.commands.push(cmdParam);
    return this;
  }
  toString() {
    return ["CMD", JSON.stringify(this.commands)].join(" ");
  }
};

// src/lib/instructions/common/schema.ts
var import_zod6 = require("zod");
var zInstruction = import_zod6.z.object({
  type: import_zod6.z.literal("instruction"),
  toString: import_zod6.z.function().returns(import_zod6.z.string())
});

// src/lib/instructions/common/guards.ts
var isInstruction = (value) => zInstruction.safeParse(value).success;

// src/lib/instructions/copy/schema.ts
var import_zod7 = require("zod");
var zCopyInstructionSources = import_zod7.z.union([zRequiredString(), import_zod7.z.array(zRequiredString()).nonempty()]);
var zCopyInstructionDestination = zRequiredString();
var zCopyInstructionFrom = zRequiredString().min(2);
var zCopyInstructionChown = zRequiredString().min(2).regex(/^(\d{1,5}|[a-z]{4,})(:(\d{1,5}|[a-z]{4,}))?$/);
var zCopyInstructionChmod = import_zod7.z.coerce.string().trim().regex(/^[0-7]{3,4}$/);
var zCopyInstructionLink = import_zod7.z.boolean();
var zCopyInstructionParents = import_zod7.z.boolean();
var zCopyInstructionExclude = zRequiredString().regex(/^[/.a-z0-9_-]+/);
var zCopyInstructionExcludes = import_zod7.z.array(zCopyInstructionExclude);
var zCopyInstructionParamObject = import_zod7.z.object({
  sources: zCopyInstructionSources,
  destination: zCopyInstructionDestination,
  from: zCopyInstructionFrom.optional(),
  chown: zCopyInstructionChown.optional(),
  chmod: zCopyInstructionChmod.optional(),
  link: zCopyInstructionLink.optional(),
  parents: zCopyInstructionLink.optional(),
  exclude: zCopyInstructionExclude.optional(),
  excludes: zCopyInstructionExcludes.optional()
});
var zCopyInstructionParams = import_zod7.z.tuple([import_zod7.z.union([zRequiredString(), zCopyInstructionParamObject])]).rest(zRequiredString());

// src/lib/instructions/copy/guards.ts
var isCopyInstructionSources = (value) => zCopyInstructionSources.safeParse(value).success;
var isCopyInstructionDestination = (value) => zCopyInstructionDestination.safeParse(value).success;
var isCopyInstructionFrom = (value) => zCopyInstructionFrom.safeParse(value).success;
var isCopyInstructionChown = (value) => zCopyInstructionChown.safeParse(value).success;
var isCopyInstructionChmod = (value) => zCopyInstructionChmod.safeParse(value).success;
var isCopyInstructionLink = (value) => zCopyInstructionLink.safeParse(value).success;
var isCopyInstructionParents = (value) => zCopyInstructionParents.safeParse(value).success;
var isCopyInstructionExclude = (value) => zCopyInstructionExclude.safeParse(value).success;
var isCopyInstructionParamObject = (value) => zCopyInstructionParamObject.safeParse(value).success;

// src/lib/instructions/copy/validators.ts
var validateCopyInstructionLink = (value) => {
  const result = zCopyInstructionLink.optional().safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};
var validateCopyInstructionParents = (value) => {
  const result = zCopyInstructionParents.optional().safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};
var validateCopyInstructionParams = (value) => {
  const result = zCopyInstructionParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/instructions/copy/class.ts
var CopyInstruction = class {
  type = "instruction";
  sources = [];
  destination = "";
  from;
  chown;
  chmod;
  link;
  parents;
  excludes;
  constructor(...copyInstructionParams) {
    const [valid, error] = validateCopyInstructionParams(copyInstructionParams);
    if (!valid)
      throw new Error(generateConstructorErrorMessage(`COPY`, copyInstructionParams, error));
    if (isCopyInstructionParamObject(copyInstructionParams[0])) {
      this.hoistCopyObject(copyInstructionParams[0]);
    } else if (isStringArray(copyInstructionParams)) {
      const joinedParams = coerceStringArray(copyInstructionParams);
      this.destination = joinedParams.splice(joinedParams.length - 1, 1)[0];
      this.sources = joinedParams;
    }
  }
  hoistCopyObject(copyParams) {
    if (isCopyInstructionSources(copyParams.sources))
      this.sources = coerceStringArray(copyParams.sources);
    if (isCopyInstructionDestination(copyParams.destination))
      this.destination = copyParams.destination;
    if (isCopyInstructionFrom(copyParams.from))
      this.from = copyParams.from;
    if (isCopyInstructionChown(copyParams.chown))
      this.chown = copyParams.chown;
    if (isCopyInstructionChmod(copyParams.chmod))
      this.chmod = copyParams.chmod;
    if (isCopyInstructionLink(copyParams.link))
      this.link = copyParams.link;
    if (isCopyInstructionParents(copyParams.link))
      this.link = copyParams.link;
    if (isString(copyParams.exclude)) {
      if (this.excludes == null)
        this.excludes = [];
      this.excludes.push(copyParams.exclude);
    }
    if (isStringArray(copyParams.excludes)) {
      if (this.excludes != null)
        this.excludes = this.excludes.concat(copyParams.excludes);
      else
        this.excludes = copyParams.excludes;
    }
  }
  setFrom(from) {
    if (isString(from))
      this.from = from;
    if (isObjectWithProperty(from, "id"))
      this.from = from.id;
    return this;
  }
  setChown(chown) {
    if (!isCopyInstructionChown(chown))
      throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`);
    this.chown = chown;
    return this;
  }
  setChmod(chmod) {
    if (!isCopyInstructionChmod(chmod))
      throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`);
    this.chmod = chmod;
    return this;
  }
  setLink(link) {
    const [valid, error] = validateCopyInstructionLink(link);
    if (!valid)
      throw new Error(`Invalid input for setLink: ${error?.join(", ")}`);
    link = link ?? true;
    this.link = link;
    return this;
  }
  setLinked() {
    this.link = true;
    return this;
  }
  setParents(parents) {
    const [valid, error] = validateCopyInstructionParents(parents);
    if (!valid)
      throw new Error(`Invalid input for setParents: ${error?.join(", ")}`);
    parents = parents ?? true;
    this.parents = parents;
    return this;
  }
  addExclude(exclude) {
    if (!isCopyInstructionExclude(exclude))
      throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`);
    if (this.excludes == null)
      this.excludes = [];
    this.excludes.push(exclude);
    return this;
  }
  toString() {
    const result = ["COPY"];
    if (this.from != null)
      result.push(`--from=${this.from}`);
    if (this.chown != null)
      result.push(`--chown=${this.chown}`);
    if (this.chmod != null)
      result.push(`--chmod=${this.chmod}`);
    if (this.link != null && this.link)
      result.push(`--link`);
    if (this.parents != null && this.parents)
      result.push(`--parents`);
    if (this.excludes != null)
      this.excludes.forEach((e) => result.push(`--exclude=${e}`));
    this.sources.forEach((s) => result.push(s));
    result.push(this.destination);
    return result.join(" ");
  }
};

// src/lib/instructions/entrypoint/class.ts
var EntryPointInstruction = class {
  type = "instruction";
  entrypointCmds;
  constructor(...entrypointParams) {
    if (!isStringArray(entrypointParams))
      throw new Error(generateConstructorErrorMessage("ENTRYPOINT", entrypointParams));
    this.entrypointCmds = entrypointParams.length === 1 && entrypointParams[0].includes(" ") ? entrypointParams[0].split(" ") : entrypointParams;
  }
  addEntrypointArg(entrypoint) {
    if (!isString(entrypoint))
      throw new Error("Invalid entrypoint argument");
    this.entrypointCmds.push(entrypoint);
    return this;
  }
  toString() {
    return ["ENTRYPOINT", JSON.stringify(this.entrypointCmds)].join(" ");
  }
};

// src/lib/instructions/env/class.ts
var EnvInstruction = class {
  type = "instruction";
  envs = {};
  constructor(envParam) {
    if (isEnvVar(envParam)) {
      const [envKey, envVal] = envParam.split("=");
      this.envs[envKey] = envVal;
    } else if (isStringArray(envParam) && isEnvVarArray(envParam)) {
      envParam.forEach((e) => {
        const [envKey, envVal] = e.split("=");
        this.envs[envKey] = envVal;
      });
    } else if (isStringRecord(envParam)) {
      this.envs = envParam;
    } else {
      throw new Error(generateConstructorErrorMessage("ENV", envParam));
    }
  }
  addEnv(envName, envVal) {
    this.envs[envName] = coerceString(envVal);
    return this;
  }
  toString() {
    return `ENV ${Object.entries(this.envs).map(([k, v]) => [k, v.includes(" ") ? `"${v}"` : v].join("=")).join(" ")}`;
  }
};

// src/lib/instructions/expose/schema.ts
var import_zod8 = require("zod");
var zExposeInstructionPort = import_zod8.z.coerce.number().min(1).max(65535);
var zExposeInstructionProto = import_zod8.z.union([import_zod8.z.literal("tcp"), import_zod8.z.literal("udp")]);
var zExposeInstructionPortProtoString = import_zod8.z.string().regex(/^(\d{1,5})(\/(tcp|udp))?$/).refine(
  (val) => {
    const splitVal = val.split("/");
    return zExposeInstructionPort.safeParse(splitVal[0]).success && zExposeInstructionProto.safeParse(splitVal[1]).success;
  },
  { message: "Invalid port protocol combination" }
);
var zExposeInstructionPortProtoTuple = import_zod8.z.union([
  import_zod8.z.tuple([zExposeInstructionPort]),
  import_zod8.z.tuple([zExposeInstructionPort, zExposeInstructionProto])
]);
var zExposeInstructionPortProtoObject = import_zod8.z.object({
  port: zExposeInstructionPort,
  proto: zExposeInstructionProto.optional()
});
var zExposeInstructionParam = import_zod8.z.union([
  zExposeInstructionPortProtoObject,
  zExposeInstructionPortProtoTuple,
  zExposeInstructionPortProtoString,
  zExposeInstructionPort
]);
var zExposeInstructionParams = import_zod8.z.array(zExposeInstructionParam);

// src/lib/instructions/expose/guards.ts
var isExposeInstructionPortProtoString = (exposes) => {
  return zExposeInstructionPortProtoString.safeParse(exposes).success;
};
var isExposeInstructionParams = (exposes) => {
  return zExposeInstructionParams.nonempty().safeParse(exposes).success;
};
var isExposeInstructionParam = (value) => zExposeInstructionParam.safeParse(value).success;
var isExposeInstructionProto = (value) => zExposeInstructionProto.safeParse(value).success;
var isExposeInstructionPortNumber = (value) => zExposeInstructionPort.safeParse(value).success;
var isExposeInstructionPortProtoTuple = (value) => zExposeInstructionPortProtoTuple.safeParse(value).success;

// src/lib/instructions/expose/utils.ts
var coerceExposeDefinition = (value) => {
  if (!isExposeInstructionParam(value))
    throw new Error("non-coerceable value");
  let port = 0;
  let proto = "tcp";
  if (isExposeInstructionPortNumber(value)) {
    port = Number(value);
  } else if (isExposeInstructionPortProtoString(value)) {
    const splitVal = value.split("/");
    port = Number(splitVal[0]);
    if (isExposeInstructionProto(splitVal[1]))
      proto = splitVal[1];
  } else if (isExposeInstructionPortProtoTuple(value)) {
    port = Number(value[0]);
    proto = value[1];
  } else if (typeof value === "object" && value != null && !Array.isArray(value)) {
    const result = zExposeInstructionPortProtoObject.safeParse(value);
    if (result.success) {
      port = result.data.port;
      if (result.data.proto != null)
        proto = result.data.proto;
    }
  }
  return { port, proto };
};

// src/lib/instructions/expose/class.ts
var ExposeInstruction = class {
  type = "instruction";
  exposeCmds;
  constructor(...exposeParams) {
    if (!isExposeInstructionParams(exposeParams))
      throw new Error(generateConstructorErrorMessage("EXPOSE", exposeParams));
    this.exposeCmds = exposeParams.map((e) => coerceExposeDefinition(e));
  }
  addExposeParam(exposeParam) {
    if (!isExposeInstructionParam(exposeParam))
      throw new Error("Invalid parameter value for addExposeArg");
    this.exposeCmds.push(coerceExposeDefinition(exposeParam));
    return this;
  }
  toString() {
    return ["EXPOSE", ...this.exposeCmds.map(({ port, proto }) => `${port}/${proto}`)].join(" ");
  }
};

// src/lib/instructions/from/schema.ts
var import_zod9 = require("zod");
var zFromInstructionStringFromParam = import_zod9.z.string().trim().min(3).regex(/^[\w/-]+(:[\w/-]+)?/);
var zFromInstructionPlatformParam = import_zod9.z.string().trim().min(2);
var zFromInstructionAsParam = import_zod9.z.string().min(2);
var zFromInstructionObjectParam = import_zod9.z.object({
  from: zFromInstructionStringFromParam,
  platform: zFromInstructionPlatformParam.optional(),
  as: zFromInstructionAsParam.optional()
});
var zFromInstructionParams = import_zod9.z.union([zFromInstructionStringFromParam, zFromInstructionObjectParam]);

// src/lib/instructions/from/guards.ts
var isFromInstructionStringFromParam = (value) => zFromInstructionStringFromParam.safeParse(value).success;
var isFromInstructionParams = (value) => zFromInstructionParams.safeParse(value).success;
var isFromInstructionParamObject = (value) => zFromInstructionObjectParam.safeParse(value).success;
var isFromInstructionAsParam = (value) => zFromInstructionAsParam.safeParse(value).success;

// src/lib/instructions/from/class.ts
var FromInstruction = class {
  type = "instruction";
  from = "";
  platform;
  as;
  constructor(fromParam) {
    if (!isFromInstructionParams(fromParam))
      throw new Error(generateConstructorErrorMessage(`FROM`, fromParam));
    if (isString(fromParam))
      this.from = fromParam;
    if (isFromInstructionParamObject(fromParam)) {
      this.from = fromParam.from;
      if (isString(fromParam.platform))
        this.platform = fromParam.platform;
      if (isString(fromParam.as))
        this.as = fromParam.as;
    }
  }
  setAs(nameParam) {
    if (!isFromInstructionAsParam(nameParam))
      throw new Error(`Missing or invalid arguments for setAs: ${typeof nameParam} ${JSON.stringify(nameParam)}`);
    this.as = nameParam;
    return this;
  }
  toString() {
    const result = ["FROM"];
    if (isString(this.platform))
      result.push(`--platform=${this.platform}`);
    result.push(this.from);
    if (isString(this.as))
      result.push(`AS ${this.as}`);
    return result.join(" ");
  }
};

// src/lib/instructions/healthcheck/schema.ts
var import_zod10 = require("zod");
var zHealthCheckDurationParam = zRequiredString().regex(/^\d+(ms|s|m|h)/, "Invalid duration parameter");
var zHealthCheckCmdsNone = import_zod10.z.literal("NONE");
var zHealthCheckCmdsString = import_zod10.z.string().min(3);
var zHealthCheckCmdsStringArray = import_zod10.z.array(import_zod10.z.string().min(3));
var zHealthCheckCmdsParam = import_zod10.z.union(
  [zHealthCheckCmdsNone, zHealthCheckCmdsString, zHealthCheckCmdsStringArray],
  {
    invalid_type_error: "Invalid health check instruction parameter(s)"
  }
);
var zHealthCheckRetriesParam = import_zod10.z.coerce.number({ invalid_type_error: "Invalid retries parameter" });
var zHealthCheckParamsObject = import_zod10.z.object(
  {
    instruction: zHealthCheckCmdsParam,
    interval: zHealthCheckDurationParam.optional(),
    timeout: zHealthCheckDurationParam.optional(),
    startPeriod: zHealthCheckDurationParam.optional(),
    startInterval: zHealthCheckDurationParam.optional(),
    retries: zHealthCheckRetriesParam.optional()
  },
  { invalid_type_error: "Invalid health check parameters object" }
);
var zHealthCheckParams = import_zod10.z.union([
  zHealthCheckCmdsNone,
  zHealthCheckCmdsString,
  zHealthCheckCmdsStringArray,
  zHealthCheckParamsObject
]);

// src/lib/instructions/healthcheck/guards.ts
var isHealthCheckDurationParam = (value) => zHealthCheckDurationParam.safeParse(value).success;
var isHealthCheckRetriesParam = (value) => zHealthCheckRetriesParam.safeParse(value).success;
var isHealthCheckParamsObject = (value) => zHealthCheckParamsObject.safeParse(value).success;

// src/lib/instructions/healthcheck/validators.ts
var validateHealthCheckParams = (value) => {
  const result = zHealthCheckParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/instructions/healthcheck/class.ts
var HealthCheckInstruction = class {
  type = "instruction";
  instruction = [];
  interval;
  timeout;
  startPeriod;
  startInterval;
  retries;
  constructor(healthcheckParam) {
    const [success, error] = validateHealthCheckParams(healthcheckParam);
    if (!success)
      throw new Error(generateConstructorErrorMessage("HEALTHCHECK", healthcheckParam, error));
    if (isString(healthcheckParam))
      this.instruction = [healthcheckParam];
    if (isStringArray(healthcheckParam))
      this.instruction = healthcheckParam;
    if (isHealthCheckParamsObject(healthcheckParam)) {
      this.instruction = coerceStringArray(healthcheckParam.instruction);
      if (isHealthCheckDurationParam(healthcheckParam.interval))
        this.interval = healthcheckParam.interval;
      if (isHealthCheckDurationParam(healthcheckParam.timeout))
        this.timeout = healthcheckParam.timeout;
      if (isHealthCheckDurationParam(healthcheckParam.startPeriod))
        this.startPeriod = healthcheckParam.startPeriod;
      if (isHealthCheckDurationParam(healthcheckParam.startInterval))
        this.startInterval = healthcheckParam.startInterval;
      if (isHealthCheckRetriesParam(healthcheckParam.retries))
        this.retries = healthcheckParam.retries;
    }
  }
  addHealthCheckInstruction(healthCheckCmd) {
    if (!isString(healthCheckCmd))
      throw new Error(`Invalid healthcheck argument: ${JSON.stringify(healthCheckCmd)}`);
    this.instruction.push(healthCheckCmd);
    return this;
  }
  toString() {
    if (this.instruction.includes("NONE"))
      return "HEALTHCHECK NONE";
    const result = ["HEALTHCHECK"];
    if (this.interval != null)
      result.push(`--interval=${this.interval}`);
    if (this.timeout != null)
      result.push(`--timeout=${this.timeout}`);
    if (this.startPeriod != null)
      result.push(`--start-period=${this.startPeriod}`);
    if (this.startInterval != null)
      result.push(`--start-interval=${this.startInterval}`);
    if (this.retries != null)
      result.push(`--retries=${this.retries}`);
    result.push("CMD");
    result.push(JSON.stringify(this.instruction));
    return result.join(" ");
  }
};

// src/lib/instructions/label/class.ts
var LabelInstruction = class {
  type = "instruction";
  labels = {};
  constructor(labelParam) {
    if (isPartialLabelVarArray(labelParam))
      labelParam.forEach((labelItem) => this.labels[labelItem.split("=")[0]] = labelItem.split("=")[1]);
    else if (isPartialLabelVar(labelParam))
      this.labels[labelParam.split("=")[0]] = labelParam.split("=")[1];
    else if (isStringRecord(labelParam))
      this.labels = labelParam;
    else
      throw new Error(generateConstructorErrorMessage("LABEL", labelParam));
  }
  addLabel(labelParam) {
    if (!isPartialLabelVar(labelParam))
      throw new Error("Invalid label argument");
    const [labelKey, labelVal] = labelParam.split("=");
    this.labels[labelKey] = labelVal;
  }
  toString() {
    return `LABEL ${Object.entries(this.labels).map(([k, v]) => [k, `"${v}"`].join("=")).join(" ")}`;
  }
};

// src/lib/instructions/run/schema.ts
var import_zod11 = require("zod");
var zRunInstructionBooleanFields = import_zod11.z.union([
  import_zod11.z.literal("rw"),
  import_zod11.z.literal("readwrite"),
  import_zod11.z.literal("ro"),
  import_zod11.z.literal("readonly"),
  import_zod11.z.literal("required")
]);
var zRunInstructionCacheSharingTypes = import_zod11.z.union([
  import_zod11.z.literal("shared"),
  import_zod11.z.literal("private"),
  import_zod11.z.literal("locked")
]);
var zRunInstructions = import_zod11.z.union([zRequiredString(), import_zod11.z.array(zRequiredString()).nonempty()]);
var zRunInstructionMountTypeBindCommon = import_zod11.z.object({
  type: import_zod11.z.literal("bind"),
  target: import_zod11.z.string().min(3),
  from: import_zod11.z.string().min(3).optional(),
  source: import_zod11.z.string().min(3).optional()
});
var zRunInstructionMountTypeBindReadWrite = zRunInstructionMountTypeBindCommon.merge(zReadWriteOpt);
var zRunInstructionMountTypeBindRW = zRunInstructionMountTypeBindCommon.merge(zRWOpt);
var zRunInstructionMountTypeBind = import_zod11.z.union([
  zRunInstructionMountTypeBindReadWrite.strict(),
  zRunInstructionMountTypeBindRW.strict(),
  zRunInstructionMountTypeBindCommon.strict()
]);
var zRunInstructionMountTypeCacheCommon = import_zod11.z.object({
  type: import_zod11.z.literal("cache"),
  target: zRequiredString(),
  id: import_zod11.z.string().optional(),
  sharing: zRunInstructionCacheSharingTypes.optional(),
  from: zRequiredString().optional(),
  source: zRequiredString().optional(),
  mode: zFileAccessMode.optional(),
  uid: zUnixUserGroupNumericId.optional(),
  gid: zUnixUserGroupNumericId.optional()
});
var zRunInstructionMountTypeCacheReadOnly = zRunInstructionMountTypeCacheCommon.merge(zReadOnlyOpt);
var zRunInstructionMountTypeCacheRO = zRunInstructionMountTypeCacheCommon.merge(zROOpt);
var zRunInstructionMountTypeCache = import_zod11.z.union([
  zRunInstructionMountTypeCacheReadOnly.strict(),
  zRunInstructionMountTypeCacheRO.strict(),
  zRunInstructionMountTypeCacheCommon.strict()
]);
var zRunInstructionMountTypeSecret = import_zod11.z.object({
  type: import_zod11.z.literal("secret"),
  id: zRequiredString(),
  target: zRequiredString().optional(),
  required: import_zod11.z.boolean().optional(),
  mode: zFileAccessMode.optional(),
  uid: zUnixUserGroupNumericId.optional(),
  gid: zUnixUserGroupNumericId.optional()
});
var zRunInstructionMountTypeSSH = import_zod11.z.object({
  type: import_zod11.z.literal("ssh"),
  id: zRequiredString().optional(),
  target: zRequiredString().optional(),
  required: import_zod11.z.boolean().optional(),
  mode: zFileAccessMode.optional(),
  uid: zUnixUserGroupNumericId.optional(),
  gid: zUnixUserGroupNumericId.optional()
});
var zRunInstructionMountTypeTmpFS = import_zod11.z.object({
  type: import_zod11.z.literal("tmpfs"),
  target: import_zod11.z.string(),
  size: import_zod11.z.number().min(1)
});
var zRunInstructionMountType = import_zod11.z.union([
  zRunInstructionMountTypeBindReadWrite.strict(),
  zRunInstructionMountTypeBindRW.strict(),
  zRunInstructionMountTypeBindCommon.strict(),
  zRunInstructionMountTypeCacheReadOnly.strict(),
  zRunInstructionMountTypeCacheRO.strict(),
  zRunInstructionMountTypeCacheCommon.strict(),
  zRunInstructionMountTypeSSH.strict(),
  zRunInstructionMountTypeSecret.strict(),
  zRunInstructionMountTypeTmpFS.strict()
]);
var zRunInstructionNetworkType = import_zod11.z.union([import_zod11.z.literal("default"), import_zod11.z.literal("none"), import_zod11.z.literal("host")]);
var zRunInstructionSecurityType = import_zod11.z.union([import_zod11.z.literal("sandbox"), import_zod11.z.literal("insecure")]);
var zRunInstructionParamsObject = import_zod11.z.object({
  commands: zRunInstructions,
  mount: zRunInstructionMountType.optional(),
  network: zRunInstructionNetworkType.optional(),
  security: zRunInstructionSecurityType.optional()
});
var zRunInstructionParams = import_zod11.z.union([
  import_zod11.z.tuple([zRequiredString()]),
  import_zod11.z.tuple([zRequiredString()]).rest(zRequiredString()),
  import_zod11.z.tuple([import_zod11.z.array(zRequiredString()).nonempty()]),
  import_zod11.z.tuple([zRunInstructionParamsObject])
]);

// src/lib/instructions/run/guards.ts
var isRunInstructionParamsObject = (value) => zRunInstructionParamsObject.safeParse(value).success;
var isRunInstructionBooleanFields = (value) => zRunInstructionBooleanFields.safeParse(value).success;
var isRunInstructionMountParam = (value) => zRunInstructionMountType.safeParse(value).success;
var isRunInstructionNetworkParam = (value) => zRunInstructionNetworkType.safeParse(value).success;
var isRunInstructionSecurityParam = (value) => zRunInstructionSecurityType.safeParse(value).success;

// src/lib/instructions/run/utils.ts
var mapMountOptions = {
  readwrite: "rw",
  readonly: "ro"
};

// src/lib/instructions/run/validators.ts
var validateRunInstructionParams = (value) => {
  const result = zRunInstructionParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/instructions/run/class.ts
var RunInstruction = class {
  type = "instruction";
  commands = [];
  mount;
  network;
  security;
  constructor(...runParams) {
    const [valid, result] = validateRunInstructionParams(runParams);
    if (!valid)
      throw new Error(generateConstructorErrorMessage("RUN", runParams, result));
    if (isStringArray(runParams)) {
      this.commands = runParams;
    } else if (isStringArray(runParams[0])) {
      this.commands = runParams[0];
    } else if (isRunInstructionParamsObject(runParams[0])) {
      const runParamObject = runParams[0];
      this.commands = coerceStringArray(runParamObject.commands);
      if (runParamObject.mount != null && isRunInstructionMountParam(runParamObject.mount))
        this.mount = runParamObject.mount;
      if (runParamObject.network != null && isRunInstructionNetworkParam(runParamObject.network))
        this.network = runParamObject.network;
      if (runParamObject.security != null && isRunInstructionSecurityParam(runParamObject.security))
        this.security = runParamObject.security;
    }
  }
  setMount(mount) {
    if (!isRunInstructionMountParam(mount))
      throw new Error("Invalid mount type");
    this.mount = mount;
  }
  setNetwork(network) {
    if (!isRunInstructionNetworkParam(network))
      throw new Error("Invalid network type");
    this.network = network;
  }
  setSecurity(security) {
    if (!isRunInstructionSecurityParam(security))
      throw new Error("Invalid security type");
    this.security = security;
  }
  toString() {
    const result = ["RUN"];
    if (isRunInstructionMountParam(this.mount)) {
      const mountOpts = [`--mount=type=${this.mount.type}`];
      Object.entries(this.mount).filter(([k, v]) => k !== "type").forEach(([k, v]) => {
        if (isRunInstructionBooleanFields(k)) {
          if (isTrueBoolean(v))
            mountOpts.push(k in mapMountOptions ? mapMountOptions[k] : k);
        } else {
          mountOpts.push(`${k}=${coerceString(v)}`);
        }
      });
      result.push(mountOpts.join(","));
    }
    if (isRunInstructionNetworkParam(this.network))
      result.push(`--network=${coerceString(this.network)}`);
    if (isRunInstructionSecurityParam(this.security))
      result.push(`--security=${coerceString(this.security)}`);
    return [...result, ...this.commands].join(" ");
  }
};

// src/lib/instructions/shell/class.ts
var ShellInstruction = class {
  type = "instruction";
  commands;
  constructor(...shellParams) {
    if (isStringArray(shellParams)) {
      this.commands = shellParams.length === 1 ? shellParams[0].split(" ") : shellParams;
    } else {
      throw new Error(generateConstructorErrorMessage("SHELL", shellParams));
    }
  }
  addShell(shellParam) {
    if (!isString(shellParam))
      throw new Error(generateInvalidArgumentErrorMessage(`shell`, shellParam));
    this.commands.push(shellParam);
    return this;
  }
  toString() {
    return ["SHELL", JSON.stringify(this.commands)].join(" ");
  }
};

// src/lib/instructions/stopsignal/schema.ts
var import_zod12 = require("zod");
var zStopSignalString = import_zod12.z.string().toUpperCase().regex(
  /(SIG)?(ABRT|ALRM|BUS|CHLD|CLD|CONT|FPE|HUP|ILL|INT|IO|IOT|KILL|LOST|PIPE|POLL|PROF|PWR|QUIT|RTMAX|RTMIN|SEGV|STKFLT|STKSZ|STOP|SYS|TERM|TRAP|TSTP|TTIN|TTOU|UNUSED|URG|USR1|USR2|VTALRM|WINCH|XCPU|XFSZ)/
);
var zStopSignalNumber = import_zod12.z.number().min(1).max(31);

// src/lib/instructions/stopsignal/guards.ts
var isStopSignalString = (value) => zStopSignalString.safeParse(value).success;
var isStopSignalNumber = (value) => zStopSignalNumber.safeParse(value).success;

// src/lib/instructions/stopsignal/class.ts
var StopSignalInstruction = class {
  type = "instruction";
  stopsignal;
  constructor(stopsignalParam) {
    if (isStopSignalNumber(stopsignalParam))
      this.stopsignal = stopsignalParam;
    else if (isStopSignalString(stopsignalParam))
      this.stopsignal = stopsignalParam.startsWith("SIG") ? stopsignalParam : `SIG${stopsignalParam}`;
    else
      throw new Error(generateConstructorErrorMessage(`STOPSIGNAL`, stopsignalParam));
  }
  toString() {
    return ["STOPSIGNAL", this.stopsignal].join(" ");
  }
};

// src/lib/instructions/user/schema.ts
var import_zod13 = require("zod");
var zUserInstructionPrimaryParam = import_zod13.z.union([
  zUnixUserGroupIdComboString,
  zUIDGIDTuple,
  import_zod13.z.array(zUnixUserGroupNumericId).nonempty().max(2),
  zUnixUserGroupNumericId
]);
var zUserInstructionParams = import_zod13.z.union(
  [
    import_zod13.z.tuple([zUIDGIDObj], { invalid_type_error: "Invalid UIDGIDObj" }),
    import_zod13.z.tuple([zUnixUserGroupIdComboString], { invalid_type_error: "Invalid UnixUserGroupIdComboString" }),
    import_zod13.z.tuple([zUIDGIDTuple], { invalid_type_error: "Invalid UIDGIDTuple" }),
    import_zod13.z.tuple(
      [
        import_zod13.z.array(zUnixUserGroupId, {
          invalid_type_error: "Invalid UnixUserGroupId array elements"
        }).nonempty().max(2)
      ],
      {
        invalid_type_error: "Invalid UnixUserGroupId array"
      }
    ),
    import_zod13.z.tuple([zUnixUserGroupId, zUnixUserGroupId], {
      invalid_type_error: "Invalid UnixUserGroupId,UnixUserGroupId tuple"
    }),
    import_zod13.z.tuple([zUnixUserGroupId], { invalid_type_error: "Invalid UnixUserGroupId tuple" }),
    import_zod13.z.tuple([zRequiredString(), zRequiredString()], {
      invalid_type_error: "Invalid RequiredString,RequiredString tuple"
    }),
    import_zod13.z.tuple([zRequiredString()], { invalid_type_error: "Invalid RequiredString tuple" })
  ],
  { invalid_type_error: "Invalid UserInstructionParams" }
);

// src/lib/instructions/user/guards.ts
var isUserInstructionParamObject = (value) => zUIDGIDObj.safeParse(value).success;
var isUserInstructionParamTuple = (value) => zUIDGIDTuple.safeParse(value).success;

// src/lib/instructions/user/validators.ts
var validateUserInstructionParams = (value) => {
  const result = zUserInstructionParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/instructions/user/class.ts
var UserInstruction = class {
  type = "instruction";
  uid;
  gid;
  constructor(...userInstructionParams) {
    const [valid, result] = validateUserInstructionParams(userInstructionParams);
    if (!valid)
      throw new Error(generateConstructorErrorMessage("USER", userInstructionParams, result));
    if (isUserInstructionParamObject(userInstructionParams[0])) {
      this.uid = userInstructionParams[0].uid;
      if (userInstructionParams[0].gid != null)
        this.gid = userInstructionParams[0].gid;
    } else if (typeof userInstructionParams[0] === "number") {
      this.uid = userInstructionParams[0];
      if (userInstructionParams.length === 2 && userInstructionParams[1] != null)
        this.gid = userInstructionParams[1];
    } else if (typeof userInstructionParams[0] === "string") {
      if (userInstructionParams[0].includes(":")) {
        if (userInstructionParams[0].split(":").filter((e) => e != null && e !== "").length !== 2)
          throw new Error(generateConstructorErrorMessage("USER", userInstructionParams, result));
        this.uid = Number(userInstructionParams[0].split(":")[0]);
        this.gid = Number(userInstructionParams[0].split(":")[1]);
      } else {
        this.uid = Number(userInstructionParams[0]);
        if (userInstructionParams.length === 2 && userInstructionParams[1] != null)
          this.gid = userInstructionParams[1];
      }
    } else if (isUserInstructionParamTuple(userInstructionParams[0])) {
      this.uid = userInstructionParams[0][0];
      if (userInstructionParams[0][1] != null)
        this.gid = userInstructionParams[0][1];
    }
  }
  toString() {
    return ["USER", [this.uid, this.gid].join(":")].join(" ");
  }
};

// src/lib/instructions/volume/class.ts
var VolumeInstruction = class {
  type = "instruction";
  commands = [];
  constructor(...volumeParams) {
    if (!isStringArray(volumeParams))
      throw new Error(generateConstructorErrorMessage("VOLUME", volumeParams));
    this.commands = volumeParams.length === 1 ? volumeParams[0].split(" ") : volumeParams;
  }
  addVolume(volume) {
    if (!isString(volume))
      throw new Error(`Invalid volume argument: ${typeof volume} ${JSON.stringify(volume)}`);
    this.commands.push(volume);
    return this;
  }
  toString() {
    return ["VOLUME", JSON.stringify(this.commands)].join(" ");
  }
};

// src/lib/instructions/workdir/class.ts
var WorkdirInstruction = class {
  type = "instruction";
  workdir = "";
  constructor(workdirParam) {
    if (!isString(workdirParam))
      throw new Error(generateConstructorErrorMessage("WORKDIR", workdirParam));
    this.workdir = workdirParam;
  }
  toString() {
    return ["WORKDIR", this.workdir].join(" ");
  }
};

// src/lib/stage/schema.ts
var import_zod14 = require("zod");
var zStage = import_zod14.z.object({
  type: import_zod14.z.literal("stage"),
  id: import_zod14.z.string()
});
var zStageFromInstruction = zFromInstructionObjectParam.omit({ from: true }).extend({ from: zStage });
var zStageConstructorParams = import_zod14.z.union([
  zStage,
  zFromInstructionStringFromParam,
  zFromInstructionParams,
  zStageFromInstruction
]);

// src/lib/stage/guards.ts
var isStage = (value) => zStage.safeParse(value).success;
var isStageFromStage = (value) => zStageFromInstruction.safeParse(value).success;

// src/lib/stage/validators.ts
var validStageConstructorParams = (value) => {
  const result = zStageConstructorParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/stage/class.ts
var Stage = class {
  type = "stage";
  id;
  stack = [];
  constructor(fromParam) {
    const [valid, error] = validStageConstructorParams(fromParam);
    if (!valid)
      throw new Error(generateConstructorErrorMessage("FROM", fromParam, error));
    if (isFromInstructionStringFromParam(fromParam))
      fromParam = { from: fromParam };
    if (isStage(fromParam))
      fromParam = { from: fromParam.id };
    if (isStageFromStage(fromParam))
      fromParam = { ...fromParam, from: fromParam.from.id };
    this.id = coerceFirstValue(fromParam.as, randomString());
    this.appendFrom(fromParam);
  }
  appendInstruction(instructionParam) {
    if (!isInstruction(instructionParam)) {
      throw new Error("Invalid Instruction");
    }
    this.stack.push(instructionParam);
    return instructionParam;
  }
  appendAdd(...addParams) {
    return this.appendInstruction(new AddInstruction(...addParams));
  }
  appendArg(argParam) {
    return this.appendInstruction(new ArgInstruction(argParam));
  }
  appendCmd(...cmdParams) {
    return this.appendInstruction(new CmdInstruction(...cmdParams));
  }
  appendCopy(...copyInstructionParams) {
    return this.appendInstruction(new CopyInstruction(...copyInstructionParams));
  }
  appendFrom(from) {
    return this.appendInstruction(new FromInstruction(from).setAs(this.id));
  }
  appendEntryPoint(...entrypointCmds) {
    return this.appendInstruction(new EntryPointInstruction(...entrypointCmds));
  }
  appendEnv(envParam) {
    return this.appendInstruction(new EnvInstruction(envParam));
  }
  appendExpose(...exposes) {
    return this.appendInstruction(new ExposeInstruction(...exposes));
  }
  appendHealthCheck(healthcheck) {
    return this.appendInstruction(new HealthCheckInstruction(healthcheck));
  }
  appendLabel(labelParam) {
    return this.appendInstruction(new LabelInstruction(labelParam));
  }
  appendRun(...runParams) {
    return this.appendInstruction(new RunInstruction(...runParams));
  }
  appendShell(...shellParams) {
    return this.appendInstruction(new ShellInstruction(...shellParams));
  }
  appendStopSignal(stopsignalParam) {
    return this.appendInstruction(new StopSignalInstruction(stopsignalParam));
  }
  appendUser(...userInstructionParams) {
    return this.appendInstruction(new UserInstruction(...userInstructionParams));
  }
  appendVolume(...volumeParams) {
    return this.appendInstruction(new VolumeInstruction(...volumeParams));
  }
  appendWorkdir(workdir) {
    return this.appendInstruction(new WorkdirInstruction(workdir));
  }
  setId(id) {
    if (!isString(id))
      throw new Error(`Invalid id argument: ${JSON.stringify(id)}`);
    this.id = id;
    return this;
  }
  toString() {
    return this.stack.map((e) => e.toString()).join("\n\n") + "\n";
  }
};

// src/dct/class.ts
var DockerConfigTool = class {
  stack = [];
  constructor(stackParam) {
    this.stack = stackParam ?? [];
  }
  createStage(fromParam) {
    const stage = new Stage(fromParam);
    this.stack.push(stage);
    return stage;
  }
  toString() {
    if (this.stack.length === 0)
      throw new Error("Empty stack. Nothing to print.");
    return this.stack.map((e) => e.toString()).join("\n");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddInstruction,
  ArgInstruction,
  CmdInstruction,
  CopyInstruction,
  DockerConfigTool,
  EntryPointInstruction,
  EnvInstruction,
  ExposeInstruction,
  FromInstruction,
  HealthCheckInstruction,
  LabelInstruction,
  RunInstruction,
  ShellInstruction,
  StopSignalInstruction,
  UserInstruction,
  VolumeInstruction,
  WorkdirInstruction
});
