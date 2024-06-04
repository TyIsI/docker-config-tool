// src/lib/shared/utils.ts
var generateErrorMessage = (baseErrorMessage, ...args) => {
  return args.reduce((c, e) => `${c} ${typeof e} ${JSON.stringify(e)}`, baseErrorMessage);
};
var generateConstructorErrorMessage = (cmdId, ...args) => {
  if (cmdId == null)
    throw new Error("Missing cmdId");
  return generateErrorMessage(
    `Invalid or missing arguments while attempting to create new ${cmdId} instance:`,
    ...args
  );
};
var generateInvalidArgumentErrorMessage = (cmdId, ...args) => {
  if (cmdId == null)
    throw new Error("Missing cmdId");
  return generateErrorMessage(`Invalid ${cmdId} argument:`, ...args);
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
var getCommonPath = (cwd, testPath) => {
  for (let i = 0; i < cwd.length; i++) {
    if (cwd.at(i) !== testPath.at(i))
      return testPath.substring(0, i);
  }
  return cwd;
};

// src/lib/common/classes/instructions/base/class.ts
var AbstractBaseInstruction = class {
  type = "instruction";
  output = [];
};

// src/lib/common/classes/instructions/buildable/class.ts
var AbstractBuildableInstruction = class extends AbstractBaseInstruction {
  buildable = true;
  onBuild = false;
  setOnBuild(onBuild) {
    if (onBuild != null && typeof onBuild !== "boolean")
      throw new Error(generateInvalidArgumentErrorMessage(this.instruction, onBuild));
    onBuild = onBuild ?? true;
    this.onBuild = onBuild;
  }
};

// src/lib/shared/guards.ts
import { z as z2 } from "zod";

// src/lib/shared/schema.ts
import { z } from "zod";

// src/lib/shared/matching.ts
var substVar = "\\$\\{.+\\}";
var ImageRefRegExParts = "^((" + substVar + `|([\\w-]+(\\.[\\w-]+)*(:\\d{1,5})?))\\/)?(${substVar}\\/|([\\w-]+\\/)*)?(${substVar}|[\\w.-]+)((:[\\w/.-]+)|(@sha\\d{3}:[\\w/.-]+)|([:@]${substVar}))?$`;
var DockerImageReferenceRE = new RegExp(ImageRefRegExParts);

// src/lib/shared/schema.ts
var zRequiredString = (message) => z.string().trim().regex(/.+/, message ?? "Invalid string input");
var zUnixUserGroupNumericId = z.coerce.number({ invalid_type_error: "invalid numeric unix id" }).min(1).max(65535);
var zUnixUserGroupStringId = z.string({ invalid_type_error: "invalid unix id string" }).refine((val) => zUnixUserGroupNumericId.safeParse(val).success);
var zUnixUserGroupId = z.union([zUnixUserGroupNumericId, zUnixUserGroupStringId]);
var zUnixUserGroupIdComboString = z.string({ invalid_type_error: "invalid unix id string tuple" }).regex(/\d{1,5}(:\d{1,5})/).refine((val) => val.includes(":") ? val.split(":").filter((e) => e != null && e !== "").length === 2 : true).refine((val) => val.split(":").every((e) => zUnixUserGroupNumericId.safeParse(e).success)).transform((val) => val.split(":").map((e) => Number(e)));
var zFileAccessMode = z.union([z.number(), z.string()], { invalid_type_error: "invalid unix file access mode permission" }).refine((val) => /^[0-7]{3,4}$/.test(val.toString())).transform(String);
var zUIDOpt = z.object({ uid: zUnixUserGroupId }, { invalid_type_error: "invalid unix uid opt" });
var zGIDOpt = z.object({ gid: zUnixUserGroupId }, { invalid_type_error: "invalid unix gid opt" });
var zUIDGIDTuple = z.union([z.tuple([zUnixUserGroupId]), z.tuple([zUnixUserGroupId, zUnixUserGroupId])], {
  invalid_type_error: "invalid unix uid/gid tuple"
});
var zUIDGIDObj = zUIDOpt.extend({ gid: zUnixUserGroupId.optional() });
var zRWOpt = z.object({ rw: z.boolean() });
var zReadWriteOpt = z.object({ readwrite: z.boolean() });
var zROOpt = z.object({ ro: z.boolean() });
var zReadOnlyOpt = z.object({ readonly: z.boolean() });
var zStringRecord = z.record(z.string(), z.coerce.string()).refine((val) => Object.keys(val).length > 0);
var zPartialEnvVar = z.string().regex(/^([a-zA-Z_]\w*)(=.+)?$/);
var zEnvVar = z.string().regex(/^([a-zA-Z_]\w*)=.+$/);
var zPartialEnvVarArray = z.array(zPartialEnvVar).nonempty();
var zEnvVarArray = z.array(zEnvVar).nonempty();
var zPartialLabelVar = z.string().regex(/^([a-zA-Z_.][\w.]*)(=.+)?$/);
var zLabelVar = z.string().regex(/^([a-zA-Z_.][\w.]*)=.+$/);
var zPartialLabelVarArray = z.array(zPartialLabelVar).nonempty();
var zLabelVarArray = z.array(zLabelVar).nonempty();
var zNetworkProtocolTCP = z.literal("tcp");
var zNetworkProtocolUDP = z.literal("udp");
var zNetworkProtocols = z.union([zNetworkProtocolTCP, zNetworkProtocolUDP]);
var zDockerImageReference = zRequiredString("Empty docker image resource location").min(2, "Docker image reference should be at least 2 characters").regex(DockerImageReferenceRE, "Invalid docker image reference");

// src/lib/shared/guards.ts
var isDockerImageReference = (value) => zDockerImageReference.safeParse(value).success;
var isTrueBoolean = (value) => z2.literal(true).safeParse(value).success;
var isString = (value) => zRequiredString().safeParse(value).success;
var isStringArray = (value) => z2.array(zRequiredString()).nonempty().safeParse(value).success;
var isObjectWithProperty = (value, property) => z2.object({
  [property]: z2.unknown()
}).required().refine((val) => Object.keys(val).length > 0).safeParse(value).success;
var isEnvVar = (value) => zEnvVar.safeParse(value).success;
var isEnvVarArray = (value) => zEnvVarArray.safeParse(value).success;
var isPartialLabelVar = (value) => zPartialLabelVar.safeParse(value).success;
var isPartialLabelVarArray = (value) => zPartialLabelVarArray.safeParse(value).success;
var isStringRecord = (value) => zStringRecord.safeParse(value).success;

// src/lib/instructions/arg/schema.ts
import { z as z3 } from "zod";
var zArgInstructionParamsObject = z3.object({
  name: z3.string().trim().min(2),
  value: z3.string().trim().min(2).optional()
});
var zArgInstructionParams = z3.union([z3.string().trim().min(2), zArgInstructionParamsObject]);

// src/lib/instructions/arg/guards.ts
var isArgInstructionParamObject = (value) => {
  return zArgInstructionParamsObject.safeParse(value).success;
};
var isArgInstructionParams = (value) => zArgInstructionParams.safeParse(value).success;

// src/lib/instructions/arg/class.ts
var ArgInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "ARG";
  argName;
  argValue;
  constructor(argParam) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    if (typeof this.argName !== "string" || this.argName === "")
      throw new Error(generateInvalidArgumentErrorMessage("ARG", "Invalid argname"));
    output.push(
      [this.argName, this.argValue != null && this.argValue !== "" ? this.argValue : null].filter((e) => e != null).join("=")
    );
    return output.join(" ");
  }
};

// src/lib/common/classes/instructions/schema.ts
import { z as z7 } from "zod";

// src/lib/common/classes/instructions/generic/schema.ts
import { z as z5 } from "zod";

// src/lib/common/classes/instructions/base/schema.ts
import { z as z4 } from "zod";
var zNopInstruction = z4.literal("# NOP");
var zAddInstruction = z4.literal("ADD");
var zArgInstruction = z4.literal("ARG");
var zCmdInstruction = z4.literal("CMD");
var zCopyInstruction = z4.literal("COPY");
var zEntryPointInstruction = z4.literal("ENTRYPOINT");
var zEnvInstruction = z4.literal("ENV");
var zExposeInstruction = z4.literal("EXPOSE");
var zFromInstruction = z4.literal("FROM");
var zHealthCheckInstruction = z4.literal("HEALTHCHECK");
var zLabelInstruction = z4.literal("LABEL");
var zRunInstruction = z4.literal("RUN");
var zShellInstruction = z4.literal("SHELL");
var zStopSignalInstruction = z4.literal("STOPSIGNAL");
var zUserInstruction = z4.literal("USER");
var zVolumeInstruction = z4.literal("VOLUME");
var zWorkDirInstruction = z4.literal("WORKDIR");
var zValidInstructions = z4.union([
  zNopInstruction,
  zAddInstruction,
  zArgInstruction,
  zCmdInstruction,
  zCopyInstruction,
  zEntryPointInstruction,
  zEnvInstruction,
  zExposeInstruction,
  zFromInstruction,
  zHealthCheckInstruction,
  zLabelInstruction,
  zRunInstruction,
  zShellInstruction,
  zStopSignalInstruction,
  zUserInstruction,
  zVolumeInstruction,
  zWorkDirInstruction
]);
var zBaseInstruction = z4.object({
  type: z4.literal("instruction"),
  instruction: zValidInstructions,
  toString: z4.function().args().returns(z4.string())
});

// src/lib/common/classes/instructions/generic/schema.ts
var zGenericInstruction = zBaseInstruction.extend({
  buildable: z5.literal(false)
});

// src/lib/common/classes/instructions/buildable/schema.ts
import { z as z6 } from "zod";
var zBuildableInstruction = zBaseInstruction.extend({
  buildable: z6.literal(true),
  setOnBuild: z6.function().args(z6.boolean().optional()).returns(z6.void())
});

// src/lib/common/classes/instructions/schema.ts
var zInstruction = z7.union([zGenericInstruction, zBuildableInstruction]);

// src/lib/common/classes/instructions/guards.ts
var isInstruction = (value) => zInstruction.safeParse(value).success;

// src/lib/shared/coerce.ts
import { z as z8 } from "zod";
var coerceString = (value) => {
  return z8.coerce.string().parse(value);
};
var coerceStringArray = (value) => {
  if (!isStringArray(value) && !isString(value))
    throw new Error("Invalid string array");
  return isStringArray(value) ? value : [value];
};

// src/lib/instructions/add/schema.ts
import { z as z9 } from "zod";
var zAddInstructionSources = z9.union([z9.string(), z9.array(z9.string())]);
var zAddInstructionDestination = z9.string();
var zAddInstructionKeepGitDir = z9.boolean();
var zAddInstructionChecksum = z9.string().regex(/^sha256:[0-9a-f]{64}/, "Invalid checksum");
var zAddInstructionChown = z9.string().regex(/^(\d{1,5}|[a-z]{4,})(:(\d{1,5}|[a-z]{4,}))?$/);
var zAddInstructionChmod = z9.string().regex(/^[0-7]{3,4}$/).transform(Number);
var zAddInstructionLink = z9.boolean();
var zAddInstructionExclude = z9.string().regex(/^[/.a-z0-9_-]+/);
var zAddInstructionExcludes = z9.array(zAddInstructionExclude);
var zAddInstructionParamObject = z9.object({
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
var zAddInstructionParams = z9.union(
  [
    z9.array(zRequiredString(), { invalid_type_error: "Invalid Add Instruction string array" }).min(2, "Not enough Add Instruction string parameters"),
    z9.tuple([zAddInstructionParamObject], { invalid_type_error: "Invalid Add Instruction param object" })
  ],
  { invalid_type_error: "Invalid Add Instruction param" }
);

// src/lib/instructions/add/guards.ts
var isAddInstructionParamObject = (value) => {
  return zAddInstructionParamObject.safeParse(value).success;
};
var isAddInstructionSources = (value) => zAddInstructionSources.safeParse(value).success;
var isAddInstructionKeepGitDir = (value) => zAddInstructionKeepGitDir.safeParse(value).success;
var isOptionalAddInstructionKeepGitDir = (value) => zAddInstructionKeepGitDir.optional().safeParse(value).success;
var isAddInstructionChecksum = (value) => zAddInstructionChecksum.safeParse(value).success;
var isAddInstructionChown = (value) => zAddInstructionChown.safeParse(value).success;
var isAddInstructionChmod = (value) => zAddInstructionChmod.safeParse(value).success;
var isAddInstructionLink = (value) => zAddInstructionLink.safeParse(value).success;
var isOptionalAddInstructionLink = (value) => zAddInstructionLink.optional().safeParse(value).success;
var isAddInstructionExclude = (value) => zAddInstructionExclude.safeParse(value).success;
var isAddInstructionExcludes = (value) => zAddInstructionExcludes.safeParse(value).success;

// src/lib/instructions/add/validators.ts
var validateAddInstructionParams = (value) => {
  const result = zAddInstructionParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/instructions/add/class.ts
var AddInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "ADD";
  sources = [];
  destination = "";
  keepGitDir = false;
  checksum;
  chown;
  chmod;
  link;
  excludes;
  constructor(...addInstructionParams) {
    super();
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
    if (isAddInstructionExclude(addParamsObject.exclude)) {
      if (this.excludes == null)
        this.excludes = [];
      this.excludes.push(addParamsObject.exclude);
    }
    if (isAddInstructionExcludes(addParamsObject.excludes)) {
      if (this.excludes != null)
        this.excludes = this.excludes.concat(addParamsObject.excludes);
      else
        this.excludes = addParamsObject.excludes;
    }
  }
  setKeepGitDir(keepGitDir) {
    if (!isOptionalAddInstructionKeepGitDir(keepGitDir))
      throw new Error(`Invalid input for setKeepGitDir: ${JSON.stringify(keepGitDir)}`);
    keepGitDir = keepGitDir ?? true;
    this.keepGitDir = keepGitDir;
    return this;
  }
  setChecksum(checksum) {
    if (!isAddInstructionChecksum(checksum))
      throw new Error(`Invalid input for setChecksum: ${JSON.stringify(checksum)}`);
    this.checksum = checksum;
    return this;
  }
  setChown(chown) {
    if (!isAddInstructionChown(chown))
      throw new Error(`Invalid input for setChown: ${JSON.stringify(chown)}`);
    this.chown = chown;
    return this;
  }
  setChmod(chmod) {
    if (!isAddInstructionChmod(chmod))
      throw new Error(`Invalid input for setChmod: ${JSON.stringify(chmod)}`);
    this.chmod = chmod;
    return this;
  }
  setLink(link) {
    if (!isOptionalAddInstructionLink(link))
      throw new Error(`Invalid input for setLink: ${JSON.stringify(link)}`);
    link = link ?? true;
    this.link = link;
    return this;
  }
  addExclude(exclude) {
    if (!isAddInstructionExclude(exclude))
      throw new Error(`Invalid input for addExclude: "${JSON.stringify(exclude)}"`);
    if (this.excludes == null)
      this.excludes = [];
    this.excludes.push(exclude);
    return this;
  }
  toString() {
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    if (this.keepGitDir)
      output.push(`--keepGitDir`);
    if (this.checksum != null)
      output.push(`--checksum=${this.checksum}`);
    if (this.chown != null)
      output.push(`--chown=${this.chown}`);
    if (this.chmod != null)
      output.push(`--chmod=${this.chmod}`);
    if (this.link != null && this.link)
      output.push(`--link`);
    if (this.excludes != null)
      this.excludes.forEach((e) => output.push(`--exclude=${e}`));
    this.sources.forEach((s) => output.push(s));
    output.push(this.destination);
    return output.join(" ");
  }
};

// src/lib/instructions/cmd/class.ts
var CmdInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "CMD";
  commands = [];
  constructor(...cmdParams) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push(JSON.stringify(this.commands));
    return output.join(" ");
  }
};

// src/lib/stage/schema.ts
import { z as z11 } from "zod";

// src/lib/instructions/from/schema.ts
import { z as z10 } from "zod";
var zFromInstructionPlatformParam = zRequiredString().min(2);
var zFromInstructionAsParam = zRequiredString().min(2);
var zFromInstructionObjectParam = z10.object({
  from: zDockerImageReference,
  platform: zFromInstructionPlatformParam.optional(),
  as: zFromInstructionAsParam.optional()
});
var zFromInstructionParams = z10.union([zDockerImageReference, zFromInstructionObjectParam]);

// src/lib/stage/schema.ts
var zStage = z11.object({
  type: z11.literal("stage"),
  id: z11.string()
});
var zStageFromInstructionObjectParam = zFromInstructionObjectParam.omit({ from: true }).extend({ from: zStage });
var zStageParams = z11.union([
  zDockerImageReference,
  zFromInstructionObjectParam,
  zStage,
  zStageFromInstructionObjectParam
]);

// src/lib/stage/guards.ts
var isStage = (value) => zStage.safeParse(value).success;
var isStageParam = (value) => zStage.safeParse(value).success;
var isStageFromInstructionObjectParam = (value) => zStageFromInstructionObjectParam.safeParse(value).success;

// src/lib/instructions/copy/schema.ts
import { z as z12 } from "zod";
var zCopyInstructionSources = z12.union([zRequiredString(), z12.array(zRequiredString()).nonempty()]);
var zCopyInstructionDestination = zRequiredString();
var zCopyInstructionFrom = z12.union([zDockerImageReference, zStage]);
var zCopyInstructionChown = zRequiredString().min(2).regex(/^(\d{1,5}|[a-z]{4,})(:(\d{1,5}|[a-z]{4,}))?$/);
var zCopyInstructionChmod = z12.coerce.string().trim().regex(/^[0-7]{3,4}$/);
var zCopyInstructionLink = z12.boolean();
var zCopyInstructionParents = z12.boolean();
var zCopyInstructionExclude = zRequiredString().regex(/^[/.a-z0-9_-]+/);
var zCopyInstructionExcludes = z12.array(zCopyInstructionExclude);
var zCopyInstructionParamObject = z12.object({
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
var zCopyInstructionParams = z12.tuple([z12.union([zRequiredString(), zCopyInstructionParamObject])]).rest(zRequiredString());

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
var CopyInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "COPY";
  sources = [];
  destination = "";
  from;
  chown;
  chmod;
  link;
  parents;
  excludes;
  constructor(...copyInstructionParams) {
    super();
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
      this.from = isStageParam(copyParams.from) ? copyParams.from.id : copyParams.from;
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
    if (this.onBuild)
      throw new Error(`COPY does not support ONBUILD with from parameter`);
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    if (this.from != null) {
      if (this.onBuild)
        throw new Error(`COPY does not support ONBUILD with from parameter`);
      output.push(`--from=${this.from}`);
    }
    if (this.chown != null)
      output.push(`--chown=${this.chown}`);
    if (this.chmod != null)
      output.push(`--chmod=${this.chmod}`);
    if (this.link != null && this.link)
      output.push(`--link`);
    if (this.parents != null && this.parents)
      output.push(`--parents`);
    if (this.excludes != null)
      this.excludes.forEach((e) => output.push(`--exclude=${e}`));
    this.sources.forEach((s) => output.push(s));
    output.push(this.destination);
    return output.join(" ");
  }
};

// src/lib/instructions/entrypoint/class.ts
var EntryPointInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "ENTRYPOINT";
  entrypointCmds;
  constructor(...entrypointParams) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push(JSON.stringify(this.entrypointCmds));
    return output.join(" ");
  }
};

// src/lib/instructions/env/class.ts
var EnvInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "ENV";
  envs = {};
  constructor(envParam) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    Object.entries(this.envs).map(([k, v]) => [k, v.includes(" ") ? `"${v}"` : v].join("=")).forEach((e) => output.push(e));
    return output.join(" ");
  }
};

// src/lib/instructions/expose/schema.ts
import { z as z13 } from "zod";
var zExposeInstructionPort = z13.coerce.number().min(1).max(65535);
var zExposeInstructionProto = z13.union([z13.literal("tcp"), z13.literal("udp")]);
var zExposeInstructionPortProtoString = z13.string().regex(/^(\d{1,5})(\/(tcp|udp))?$/).refine(
  (val) => {
    const splitVal = val.split("/");
    return zExposeInstructionPort.safeParse(splitVal[0]).success && zExposeInstructionProto.safeParse(splitVal[1]).success;
  },
  { message: "Invalid port protocol combination" }
);
var zExposeInstructionPortProtoTuple = z13.union([
  z13.tuple([zExposeInstructionPort]),
  z13.tuple([zExposeInstructionPort, zExposeInstructionProto])
]);
var zExposeInstructionPortProtoObject = z13.object({
  port: zExposeInstructionPort,
  proto: zExposeInstructionProto.optional()
});
var zExposeInstructionParam = z13.union([
  zExposeInstructionPortProtoObject,
  zExposeInstructionPortProtoTuple,
  zExposeInstructionPortProtoString,
  zExposeInstructionPort
]);
var zExposeInstructionParams = z13.array(zExposeInstructionParam);

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
var ExposeInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "EXPOSE";
  exposeCmds;
  constructor(...exposeParams) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    this.exposeCmds.map(({ port, proto }) => `${port}/${proto}`).forEach((e) => output.push(e));
    return output.join(" ");
  }
};

// src/lib/common/classes/instructions/generic/class.ts
var AbstractGenericInstruction = class extends AbstractBaseInstruction {
  buildable = false;
};

// src/lib/instructions/from/guards.ts
var isFromInstructionParams = (value) => zFromInstructionParams.safeParse(value).success;
var isFromInstructionObjectParam = (value) => zFromInstructionObjectParam.safeParse(value).success;
var isFromInstructionAsParam = (value) => zFromInstructionAsParam.safeParse(value).success;

// src/lib/instructions/from/class.ts
var FromInstruction = class extends AbstractGenericInstruction {
  type = "instruction";
  instruction = "FROM";
  from = "";
  platform;
  as;
  constructor(fromParam) {
    super();
    if (!isFromInstructionParams(fromParam))
      throw new Error(generateConstructorErrorMessage(`FROM`, fromParam));
    if (isString(fromParam))
      this.from = fromParam;
    if (isFromInstructionObjectParam(fromParam)) {
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
    const output = [this.instruction];
    if (isString(this.platform))
      output.push(`--platform=${this.platform}`);
    output.push(this.from);
    if (isString(this.as))
      output.push(`AS ${this.as}`);
    return output.join(" ");
  }
};

// src/lib/instructions/healthcheck/schema.ts
import { z as z14 } from "zod";
var zHealthCheckDurationParam = zRequiredString().regex(/^\d+(ms|s|m|h)/, "Invalid duration parameter");
var zHealthCheckCmdsNone = z14.literal("NONE");
var zHealthCheckCmdsString = z14.string().min(3);
var zHealthCheckCmdsStringArray = z14.array(z14.string().min(3));
var zHealthCheckCmdsParam = z14.union(
  [zHealthCheckCmdsNone, zHealthCheckCmdsString, zHealthCheckCmdsStringArray],
  {
    invalid_type_error: "Invalid health check instruction parameter(s)"
  }
);
var zHealthCheckRetriesParam = z14.coerce.number({ invalid_type_error: "Invalid retries parameter" });
var zHealthCheckParamsObject = z14.object(
  {
    cmds: zHealthCheckCmdsParam,
    interval: zHealthCheckDurationParam.optional(),
    timeout: zHealthCheckDurationParam.optional(),
    startPeriod: zHealthCheckDurationParam.optional(),
    startInterval: zHealthCheckDurationParam.optional(),
    retries: zHealthCheckRetriesParam.optional()
  },
  { invalid_type_error: "Invalid health check parameters object" }
);
var zHealthCheckParams = z14.union([
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
var HealthCheckInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "HEALTHCHECK";
  cmds = [];
  interval;
  timeout;
  startPeriod;
  startInterval;
  retries;
  constructor(healthcheckParam) {
    super();
    const [success, error] = validateHealthCheckParams(healthcheckParam);
    if (!success)
      throw new Error(generateConstructorErrorMessage("HEALTHCHECK", healthcheckParam, error));
    if (isString(healthcheckParam))
      this.cmds = [healthcheckParam];
    if (isStringArray(healthcheckParam))
      this.cmds = healthcheckParam;
    if (isHealthCheckParamsObject(healthcheckParam)) {
      this.cmds = coerceStringArray(healthcheckParam.cmds);
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
    this.cmds.push(healthCheckCmd);
    return this;
  }
  toString() {
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    if (this.cmds.includes("NONE"))
      return "HEALTHCHECK NONE";
    if (this.interval != null)
      output.push(`--interval=${this.interval}`);
    if (this.timeout != null)
      output.push(`--timeout=${this.timeout}`);
    if (this.startPeriod != null)
      output.push(`--start-period=${this.startPeriod}`);
    if (this.startInterval != null)
      output.push(`--start-interval=${this.startInterval}`);
    if (this.retries != null)
      output.push(`--retries=${this.retries}`);
    output.push("CMD");
    output.push(JSON.stringify(this.cmds));
    return output.join(" ");
  }
};

// src/lib/instructions/label/class.ts
var LabelInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "LABEL";
  labels = {};
  constructor(labelParam) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    Object.entries(this.labels).map(([k, v]) => [k, `"${v}"`].join("=")).forEach((e) => output.push(e));
    return output.join(" ");
  }
};

// src/lib/instructions/run/coerce.ts
var coerceRunInstructionMountParam = (value) => {
  if ("from" in value) {
    const { from } = value;
    if (isDockerImageReference(from))
      value.from = from;
    if (isStage(from))
      value.from = from.id;
    if (isStageFromInstructionObjectParam(from))
      value.from = from.from.id;
  }
  return value;
};

// src/lib/instructions/run/schema.ts
import { z as z15 } from "zod";
var zRunInstructionBooleanFields = z15.union([
  z15.literal("rw"),
  z15.literal("readwrite"),
  z15.literal("ro"),
  z15.literal("readonly"),
  z15.literal("required")
]);
var zRunInstructionCacheSharingTypes = z15.union([
  z15.literal("shared"),
  z15.literal("private"),
  z15.literal("locked")
]);
var zRunInstructions = z15.union([zRequiredString(), z15.array(zRequiredString()).nonempty()]);
var zRunInstructionMountFrom = z15.union([zDockerImageReference, zStage]);
var zRunInstructionMountTypeBindCommon = z15.object({
  type: z15.literal("bind"),
  target: z15.string().min(3),
  from: zRunInstructionMountFrom.optional(),
  source: z15.string().min(3).optional()
});
var zRunInstructionMountTypeBindReadWrite = zRunInstructionMountTypeBindCommon.merge(zReadWriteOpt);
var zRunInstructionMountTypeBindRW = zRunInstructionMountTypeBindCommon.merge(zRWOpt);
var zRunInstructionMountTypeBind = z15.union([
  zRunInstructionMountTypeBindReadWrite.strict(),
  zRunInstructionMountTypeBindRW.strict(),
  zRunInstructionMountTypeBindCommon.strict()
]);
var zRunInstructionMountTypeCacheCommon = z15.object({
  type: z15.literal("cache"),
  target: zRequiredString(),
  id: z15.string().optional(),
  sharing: zRunInstructionCacheSharingTypes.optional(),
  from: zRunInstructionMountFrom.optional(),
  source: zRequiredString().optional(),
  mode: zFileAccessMode.optional(),
  uid: zUnixUserGroupNumericId.optional(),
  gid: zUnixUserGroupNumericId.optional()
});
var zRunInstructionMountTypeCacheReadOnly = zRunInstructionMountTypeCacheCommon.merge(zReadOnlyOpt);
var zRunInstructionMountTypeCacheRO = zRunInstructionMountTypeCacheCommon.merge(zROOpt);
var zRunInstructionMountTypeCache = z15.union([
  zRunInstructionMountTypeCacheReadOnly.strict(),
  zRunInstructionMountTypeCacheRO.strict(),
  zRunInstructionMountTypeCacheCommon.strict()
]);
var zRunInstructionMountTypeUnixCommon = z15.object({
  id: zRequiredString().optional(),
  target: zRequiredString().optional(),
  required: z15.boolean().optional(),
  mode: zFileAccessMode.optional(),
  uid: zUnixUserGroupNumericId.optional(),
  gid: zUnixUserGroupNumericId.optional()
});
var zRunInstructionMountTypeSecret = zRunInstructionMountTypeUnixCommon.extend({
  type: z15.literal("secret")
});
var zRunInstructionMountTypeSSH = zRunInstructionMountTypeUnixCommon.extend({
  type: z15.literal("ssh")
});
var zRunInstructionMountTypeTmpFS = z15.object({
  type: z15.literal("tmpfs"),
  target: z15.string(),
  size: z15.number().min(1)
});
var zRunInstructionMountType = z15.union([
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
var zRunInstructionNetworkType = z15.union([z15.literal("default"), z15.literal("none"), z15.literal("host")]);
var zRunInstructionSecurityType = z15.union([z15.literal("sandbox"), z15.literal("insecure")]);
var zRunInstructionParamsObject = z15.object({
  commands: zRunInstructions,
  mount: zRunInstructionMountType.optional(),
  network: zRunInstructionNetworkType.optional(),
  security: zRunInstructionSecurityType.optional()
});
var zRunInstructionParams = z15.union([
  z15.tuple([zRequiredString()]),
  z15.tuple([zRequiredString()]).rest(zRequiredString()),
  z15.tuple([z15.array(zRequiredString()).nonempty()]),
  z15.tuple([zRunInstructionParamsObject])
]);

// src/lib/instructions/run/guards.ts
var isRunInstructionParamsObject = (value) => zRunInstructionParamsObject.safeParse(value).success;
var isRunInstructionBooleanFields = (value) => zRunInstructionBooleanFields.safeParse(value).success;
var isRunInstructionMountTypeBind = (value) => zRunInstructionMountTypeBind.safeParse(value).success;
var isRunInstructionMountTypeCache = (value) => zRunInstructionMountTypeCache.safeParse(value).success;
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
var RunInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "RUN";
  commands = [];
  mountOpts = [];
  network;
  security;
  constructor(...runParams) {
    super();
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
        this.mountOpts.push(coerceRunInstructionMountParam(runParamObject.mount));
      if (runParamObject.network != null && isRunInstructionNetworkParam(runParamObject.network))
        this.network = runParamObject.network;
      if (runParamObject.security != null && isRunInstructionSecurityParam(runParamObject.security))
        this.security = runParamObject.security;
    }
  }
  setMount(mount) {
    if (!isRunInstructionMountParam(mount))
      throw new Error("Invalid mount type");
    if ((isRunInstructionMountTypeBind(mount) || isRunInstructionMountTypeCache(mount)) && this.onBuild)
      throw new Error(`ONBUILD is not supported with from RUN mount option`);
    this.mountOpts.push(coerceRunInstructionMountParam(mount));
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    if (this.mountOpts.length > 0 && this.mountOpts.every((mountOpt) => isRunInstructionMountParam(mountOpt))) {
      this.mountOpts.forEach((mountOpt) => {
        if ((isRunInstructionMountTypeBind(mountOpt) || isRunInstructionMountTypeCache(mountOpt)) && this.onBuild)
          throw new Error(`ONBUILD is not supported with from RUN mount option`);
        const mountOptsArray = [`--mount=type=${mountOpt.type}`];
        Object.entries(mountOpt).filter(([k, v]) => k !== "type").forEach(([k, v]) => {
          if (isRunInstructionBooleanFields(k)) {
            if (isTrueBoolean(v))
              mountOptsArray.push(k in mapMountOptions ? mapMountOptions[k] : k);
          } else {
            mountOptsArray.push(`${k}=${coerceString(v)}`);
          }
        });
        output.push(mountOptsArray.join(","));
      });
    }
    if (isRunInstructionNetworkParam(this.network))
      output.push(`--network=${coerceString(this.network)}`);
    if (isRunInstructionSecurityParam(this.security))
      output.push(`--security=${coerceString(this.security)}`);
    output.push(...this.commands);
    return output.join(" ");
  }
};

// src/lib/instructions/shell/class.ts
var ShellInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "SHELL";
  commands;
  constructor(...shellParams) {
    super();
    if (!isStringArray(shellParams))
      throw new Error(generateConstructorErrorMessage("SHELL", shellParams));
    this.commands = shellParams.length === 1 ? shellParams[0].split(" ") : shellParams;
  }
  addShell(shellParam) {
    if (!isString(shellParam))
      throw new Error(generateInvalidArgumentErrorMessage(`shell`, shellParam));
    this.commands.push(shellParam);
    return this;
  }
  toString() {
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push(JSON.stringify(this.commands));
    return output.join(" ");
  }
};

// src/lib/instructions/stopsignal/schema.ts
import { z as z16 } from "zod";
var zStopSignalString = z16.string().toUpperCase().regex(
  /(SIG)?(ABRT|ALRM|BUS|CHLD|CLD|CONT|FPE|HUP|ILL|INT|IO|IOT|KILL|LOST|PIPE|POLL|PROF|PWR|QUIT|RTMAX|RTMIN|SEGV|STKFLT|STKSZ|STOP|SYS|TERM|TRAP|TSTP|TTIN|TTOU|UNUSED|URG|USR1|USR2|VTALRM|WINCH|XCPU|XFSZ)/
);
var zStopSignalNumber = z16.number().min(1).max(31);

// src/lib/instructions/stopsignal/guards.ts
var isStopSignalString = (value) => zStopSignalString.safeParse(value).success;
var isStopSignalNumber = (value) => zStopSignalNumber.safeParse(value).success;

// src/lib/instructions/stopsignal/class.ts
var StopSignalInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "STOPSIGNAL";
  stopsignal;
  constructor(stopsignalParam) {
    super();
    if (isStopSignalNumber(stopsignalParam))
      this.stopsignal = `SIG${stopsignalParam}`;
    else if (isStopSignalString(stopsignalParam))
      this.stopsignal = stopsignalParam.startsWith("SIG") ? stopsignalParam : `SIG${stopsignalParam}`;
    else
      throw new Error(generateConstructorErrorMessage(`STOPSIGNAL`, stopsignalParam));
  }
  toString() {
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push(this.stopsignal);
    return output.join(" ");
  }
};

// src/lib/instructions/user/schema.ts
import { z as z17 } from "zod";
var zUserInstructionPrimaryParam = z17.union([
  zUnixUserGroupIdComboString,
  zUIDGIDTuple,
  z17.array(zUnixUserGroupNumericId).nonempty().max(2),
  zUnixUserGroupNumericId
]);
var zUserInstructionParams = z17.union(
  [
    z17.tuple([zUIDGIDObj], { invalid_type_error: "Invalid UIDGIDObj" }),
    z17.tuple([zUnixUserGroupIdComboString], { invalid_type_error: "Invalid UnixUserGroupIdComboString" }),
    z17.tuple([zUIDGIDTuple], { invalid_type_error: "Invalid UIDGIDTuple" }),
    z17.tuple(
      [
        z17.array(zUnixUserGroupId, {
          invalid_type_error: "Invalid UnixUserGroupId array elements"
        }).nonempty().max(2)
      ],
      {
        invalid_type_error: "Invalid UnixUserGroupId array"
      }
    ),
    z17.tuple([zUnixUserGroupId, zUnixUserGroupId], {
      invalid_type_error: "Invalid UnixUserGroupId,UnixUserGroupId tuple"
    }),
    z17.tuple([zUnixUserGroupId], { invalid_type_error: "Invalid UnixUserGroupId tuple" }),
    z17.tuple([zRequiredString(), zRequiredString()], {
      invalid_type_error: "Invalid RequiredString,RequiredString tuple"
    }),
    z17.tuple([zRequiredString()], { invalid_type_error: "Invalid RequiredString tuple" })
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
var UserInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "USER";
  uid;
  gid;
  constructor(...userInstructionParams) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push([this.uid, this.gid].join(":"));
    return output.join(" ");
  }
};

// src/lib/instructions/volume/class.ts
var VolumeInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "VOLUME";
  commands = [];
  constructor(...volumeParams) {
    super();
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
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push(JSON.stringify(this.commands));
    return output.join(" ");
  }
};

// src/lib/instructions/workdir/class.ts
var WorkDirInstruction = class extends AbstractBuildableInstruction {
  type = "instruction";
  instruction = "WORKDIR";
  workdir = "";
  constructor(workdirParam) {
    super();
    if (!isString(workdirParam))
      throw new Error(generateConstructorErrorMessage("WORKDIR", workdirParam));
    this.workdir = workdirParam;
  }
  toString() {
    const output = [this.instruction];
    if (this.onBuild)
      output.unshift("ONBUILD");
    output.push(this.workdir);
    return output.join(" ");
  }
};

// src/lib/stage/coerce.ts
var coerceStageFromInstructionObjectParam = (stageParam) => {
  if (isDockerImageReference(stageParam))
    return { from: stageParam };
  if (isFromInstructionObjectParam(stageParam))
    return stageParam;
  if (isStageParam(stageParam))
    return { from: stageParam.id };
  if (isStageFromInstructionObjectParam(stageParam))
    return { ...stageParam, from: stageParam.from.id };
  throw new Error("Could not coerce invalid stageParam");
};

// src/lib/stage/validators.ts
var validStageParams = (value) => {
  const result = zStageParams.safeParse(value);
  return result.success ? [true, value] : [false, reduceZodErrors(result.error)];
};

// src/lib/stage/class.ts
import { createHash } from "node:crypto";
var Stage = class {
  type = "stage";
  id = this.getRandomId();
  stack = [];
  constructor(stageParam) {
    const [valid, result] = validStageParams(stageParam);
    if (!valid)
      throw new Error(generateConstructorErrorMessage("STAGE", stageParam, result));
    stageParam = coerceStageFromInstructionObjectParam(stageParam);
    if (stageParam.as != null)
      this.id = stageParam.as;
    else
      stageParam.as = this.id;
    this.withFrom(stageParam);
  }
  getRandomId() {
    const stack = new Error("getRandomId").stack;
    if (stack == null)
      return this.forceRandomId();
    const cwd = process.cwd();
    const parsedStack = stack?.split("\n").slice(1).filter((e) => !/node:internal|node_modules|at new Promise/.test(e)).map((e) => /\(.+\)/.test(e) ? e.replace(/.+\((.+)\)/, "$1") : e).map((e) => e.replace(/^\s+at\s/, "")).map((e) => e.replace(/file:\/\//, "")).map((e) => e.replace(`${getCommonPath(cwd, e)}/`, ""));
    const hash = createHash("sha256");
    parsedStack.forEach((e) => hash.update(e));
    return `stage-${hash.digest("hex").substring(0, 8)}`;
  }
  forceRandomId() {
    return `stage-${randomString()}`;
  }
  withInstruction(instructionParam) {
    if (!isInstruction(instructionParam)) {
      throw new Error("Invalid Instruction");
    }
    this.stack.push(instructionParam);
    return instructionParam;
  }
  withAdd(...addParams) {
    return this.withInstruction(new AddInstruction(...addParams));
  }
  withArg(argParam) {
    return this.withInstruction(new ArgInstruction(argParam));
  }
  withCmd(...cmdParams) {
    return this.withInstruction(new CmdInstruction(...cmdParams));
  }
  withCopy(...copyInstructionParams) {
    return this.withInstruction(new CopyInstruction(...copyInstructionParams));
  }
  withFrom(from) {
    return this.withInstruction(new FromInstruction(from));
  }
  withEntryPoint(...entrypointCmds) {
    return this.withInstruction(new EntryPointInstruction(...entrypointCmds));
  }
  withEnv(envParam) {
    return this.withInstruction(new EnvInstruction(envParam));
  }
  withExpose(...exposes) {
    return this.withInstruction(new ExposeInstruction(...exposes));
  }
  withHealthCheck(healthcheck) {
    return this.withInstruction(new HealthCheckInstruction(healthcheck));
  }
  withLabel(labelParam) {
    return this.withInstruction(new LabelInstruction(labelParam));
  }
  withRun(...runParams) {
    return this.withInstruction(new RunInstruction(...runParams));
  }
  withShell(...shellParams) {
    return this.withInstruction(new ShellInstruction(...shellParams));
  }
  withStopSignal(stopsignalParam) {
    return this.withInstruction(new StopSignalInstruction(stopsignalParam));
  }
  withUser(...userInstructionParams) {
    return this.withInstruction(new UserInstruction(...userInstructionParams));
  }
  withVolume(...volumeParams) {
    return this.withInstruction(new VolumeInstruction(...volumeParams));
  }
  withWorkDir(workdir) {
    return this.withInstruction(new WorkDirInstruction(workdir));
  }
  setId(id) {
    if (!isString(id))
      throw new Error(`Invalid id argument: ${JSON.stringify(id)}`);
    this.id = id;
    if (!("setAs" in this.stack[0]) || typeof this.stack[0].setAs !== "function")
      throw new Error(`First instruction is not FROM`);
    this.stack[0].setAs(id);
    return this;
  }
  toString() {
    return this.stack.map((e) => e.toString()).join("\n\n");
  }
};

// src/dct/class.ts
var DockerConfigTool = class {
  args = [];
  stack = [];
  constructor(stackParam) {
    this.stack = stackParam ?? [];
  }
  withArg(arg) {
    const argInstruction = new ArgInstruction(arg);
    this.args.push(argInstruction);
    return this;
  }
  withStage(fromParam) {
    const stage = new Stage(fromParam);
    this.stack.push(stage);
    return stage;
  }
  toString() {
    if (this.stack.length === 0)
      throw new Error("Empty stack. Nothing to print.");
    return (this.args.length > 0 ? [...this.args, ...this.stack] : this.stack).map((e) => {
      return e.toString();
    }).join("\n\n");
  }
};
export {
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
  Stage,
  StopSignalInstruction,
  UserInstruction,
  VolumeInstruction,
  WorkDirInstruction
};
