var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/outvariant/lib/index.mjs
function serializePositional(positional, flag) {
  switch (flag) {
    case "s":
      return positional;
    case "d":
    case "i":
      return Number(positional);
    case "j":
      return JSON.stringify(positional);
    case "o": {
      if (typeof positional === "string") {
        return positional;
      }
      const json = JSON.stringify(positional);
      if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
        return positional;
      }
      return json;
    }
  }
}
function format(message, ...positionals) {
  if (positionals.length === 0) {
    return message;
  }
  let positionalIndex = 0;
  let formattedMessage = message.replace(
    POSITIONALS_EXP,
    (match, isEscaped, _, flag) => {
      const positional = positionals[positionalIndex];
      const value = serializePositional(positional, flag);
      if (!isEscaped) {
        positionalIndex++;
        return value;
      }
      return match;
    }
  );
  if (positionalIndex < positionals.length) {
    formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
  }
  formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
  return formattedMessage;
}
function cleanErrorStack(error) {
  if (!error.stack) {
    return;
  }
  const nextStack = error.stack.split("\n");
  nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
  error.stack = nextStack.join("\n");
}
var POSITIONALS_EXP, STACK_FRAMES_TO_IGNORE, InvariantError, invariant;
var init_lib = __esm({
  "node_modules/outvariant/lib/index.mjs"() {
    POSITIONALS_EXP = /(%?)(%([sdjo]))/g;
    STACK_FRAMES_TO_IGNORE = 2;
    InvariantError = class extends Error {
      constructor(message, ...positionals) {
        super(message);
        this.message = message;
        this.name = "Invariant Violation";
        this.message = format(message, ...positionals);
        cleanErrorStack(this);
      }
    };
    invariant = (predicate, message, ...positionals) => {
      if (!predicate) {
        throw new InvariantError(message, ...positionals);
      }
    };
    invariant.as = (ErrorConstructor, predicate, message, ...positionals) => {
      if (!predicate) {
        const isConstructor = ErrorConstructor.prototype.name != null;
        const error = isConstructor ? new ErrorConstructor(format(message, positionals)) : ErrorConstructor(format(message, positionals));
        throw error;
      }
    };
  }
});

// node_modules/@codesandbox/sandpack-client/dist/utils-52664384.mjs
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function nullthrows(value, err) {
  if (err === void 0) {
    err = "Value is nullish";
  }
  invariant(value != null, createError(err));
  return value;
}
function createPackageJSON(dependencies, devDependencies, entry) {
  if (dependencies === void 0) {
    dependencies = {};
  }
  if (devDependencies === void 0) {
    devDependencies = {};
  }
  if (entry === void 0) {
    entry = "/index.js";
  }
  return JSON.stringify({
    name: "sandpack-project",
    main: entry,
    dependencies,
    devDependencies
  }, null, 2);
}
function addPackageJSONIfNeeded(files, dependencies, devDependencies, entry) {
  var _a2, _b;
  var normalizedFilesPath = normalizePath(files);
  var packageJsonFile = normalizedFilesPath["/package.json"];
  if (!packageJsonFile) {
    nullthrows(dependencies, DEPENDENCY_ERROR_MESSAGE);
    nullthrows(entry, ENTRY_ERROR_MESSAGE);
    normalizedFilesPath["/package.json"] = {
      code: createPackageJSON(dependencies, devDependencies, entry)
    };
    return normalizedFilesPath;
  }
  if (packageJsonFile) {
    var packageJsonContent = JSON.parse(packageJsonFile.code);
    nullthrows(!(!dependencies && !packageJsonContent.dependencies), ENTRY_ERROR_MESSAGE);
    if (dependencies) {
      packageJsonContent.dependencies = __assign(__assign({}, (_a2 = packageJsonContent.dependencies) !== null && _a2 !== void 0 ? _a2 : {}), dependencies !== null && dependencies !== void 0 ? dependencies : {});
    }
    if (devDependencies) {
      packageJsonContent.devDependencies = __assign(__assign({}, (_b = packageJsonContent.devDependencies) !== null && _b !== void 0 ? _b : {}), devDependencies !== null && devDependencies !== void 0 ? devDependencies : {});
    }
    if (entry) {
      packageJsonContent.main = entry;
    }
    normalizedFilesPath["/package.json"] = {
      code: JSON.stringify(packageJsonContent, null, 2)
    };
  }
  return normalizedFilesPath;
}
function extractErrorDetails(msg) {
  var _a2;
  if (msg.title === "SyntaxError") {
    var title = msg.title, path = msg.path, message = msg.message, line = msg.line, column = msg.column;
    return { title, path, message, line, column };
  }
  var relevantStackFrame = getRelevantStackFrame((_a2 = msg.payload) === null || _a2 === void 0 ? void 0 : _a2.frames);
  if (!relevantStackFrame) {
    return { message: msg.message };
  }
  var errorInCode = getErrorInOriginalCode(relevantStackFrame);
  var errorLocation = getErrorLocation(relevantStackFrame);
  var errorMessage = formatErrorMessage(relevantStackFrame._originalFileName, msg.message, errorLocation, errorInCode);
  return {
    message: errorMessage,
    title: msg.title,
    path: relevantStackFrame._originalFileName,
    line: relevantStackFrame._originalLineNumber,
    column: relevantStackFrame._originalColumnNumber
  };
}
function getRelevantStackFrame(frames) {
  if (!frames) {
    return;
  }
  return frames.find(function(frame) {
    return !!frame._originalFileName;
  });
}
function getErrorLocation(errorFrame) {
  return errorFrame ? " (".concat(errorFrame._originalLineNumber, ":").concat(errorFrame._originalColumnNumber, ")") : "";
}
function getErrorInOriginalCode(errorFrame) {
  var lastScriptLine = errorFrame._originalScriptCode[errorFrame._originalScriptCode.length - 1];
  var numberOfLineNumberCharacters = lastScriptLine.lineNumber.toString().length;
  var leadingCharacterOffset = 2;
  var barSeparatorCharacterOffset = 3;
  var extraLineLeadingSpaces = leadingCharacterOffset + numberOfLineNumberCharacters + barSeparatorCharacterOffset + errorFrame._originalColumnNumber;
  return errorFrame._originalScriptCode.reduce(function(result, scriptLine) {
    var leadingChar = scriptLine.highlight ? ">" : " ";
    var lineNumber = scriptLine.lineNumber.toString().length === numberOfLineNumberCharacters ? "".concat(scriptLine.lineNumber) : " ".concat(scriptLine.lineNumber);
    var extraLine = scriptLine.highlight ? "\n" + " ".repeat(extraLineLeadingSpaces) + "^" : "";
    return result + // accumulator
    "\n" + leadingChar + // > or " "
    " " + lineNumber + // line number on equal number of characters
    " | " + scriptLine.content + // code
    extraLine;
  }, "");
}
function formatErrorMessage(filePath, message, location, errorInCode) {
  return "".concat(filePath, ": ").concat(message).concat(location, "\n").concat(errorInCode);
}
var extendStatics, __assign, SandpackLogLevel, createError, DEPENDENCY_ERROR_MESSAGE, ENTRY_ERROR_MESSAGE, normalizePath;
var init_utils_52664384 = __esm({
  "node_modules/@codesandbox/sandpack-client/dist/utils-52664384.mjs"() {
    init_lib();
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    (function(SandpackLogLevel2) {
      SandpackLogLevel2[SandpackLogLevel2["None"] = 0] = "None";
      SandpackLogLevel2[SandpackLogLevel2["Error"] = 10] = "Error";
      SandpackLogLevel2[SandpackLogLevel2["Warning"] = 20] = "Warning";
      SandpackLogLevel2[SandpackLogLevel2["Info"] = 30] = "Info";
      SandpackLogLevel2[SandpackLogLevel2["Debug"] = 40] = "Debug";
    })(SandpackLogLevel || (SandpackLogLevel = {}));
    createError = function(message) {
      return "[sandpack-client]: ".concat(message);
    };
    DEPENDENCY_ERROR_MESSAGE = '"dependencies" was not specified - provide either a package.json or a "dependencies" value';
    ENTRY_ERROR_MESSAGE = '"entry" was not specified - provide either a package.json with the "main" field or an "entry" value';
    normalizePath = function(path) {
      if (typeof path === "string") {
        return path.startsWith("/") ? path : "/".concat(path);
      }
      if (Array.isArray(path)) {
        return path.map(function(p) {
          return p.startsWith("/") ? p : "/".concat(p);
        });
      }
      if (typeof path === "object" && path !== null) {
        return Object.entries(path).reduce(function(acc, _a2) {
          var key = _a2[0], content = _a2[1];
          var fileName = key.startsWith("/") ? key : "/".concat(key);
          acc[fileName] = content;
          return acc;
        }, {});
      }
      return null;
    };
  }
});

// node_modules/@codesandbox/nodebox/build/index.mjs
function serializePositional2(positional, flag) {
  switch (flag) {
    case "s":
      return positional;
    case "d":
    case "i":
      return Number(positional);
    case "j":
      return JSON.stringify(positional);
    case "o": {
      if (typeof positional === "string") {
        return positional;
      }
      const json = JSON.stringify(positional);
      if (json === "{}" || json === "[]" || /^\[object .+?\]$/.test(json)) {
        return positional;
      }
      return json;
    }
  }
}
function format2(message, ...positionals) {
  if (positionals.length === 0) {
    return message;
  }
  let positionalIndex = 0;
  let formattedMessage = message.replace(
    POSITIONALS_EXP2,
    (match, isEscaped, _, flag) => {
      const positional = positionals[positionalIndex];
      const value = serializePositional2(positional, flag);
      if (!isEscaped) {
        positionalIndex++;
        return value;
      }
      return match;
    }
  );
  if (positionalIndex < positionals.length) {
    formattedMessage += ` ${positionals.slice(positionalIndex).join(" ")}`;
  }
  formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
  return formattedMessage;
}
function cleanErrorStack2(error) {
  if (!error.stack) {
    return;
  }
  const nextStack = error.stack.split("\n");
  nextStack.splice(1, STACK_FRAMES_TO_IGNORE2);
  error.stack = nextStack.join("\n");
}
function createDebug(scope) {
  return function debug3(message, ...data) {
    if (FLAG === "true") {
      const direction = () => {
        if (message.includes("sender"))
          return `${GREEN}sender`;
        if (message.includes("receiver"))
          return `${RED}receiver`;
        return "";
      };
      const cleanMessage = message.replace(/\[.+\]:/, "");
      console.debug(`${COLOR_SCOPE[scope]}${scope}:${direction()}${DEFAULT}:${cleanMessage}`, ...data);
    }
  };
}
var __create2, __defProp2, __getOwnPropDesc2, __getOwnPropNames2, __getProtoOf2, __hasOwnProp2, __defNormalProp2, __commonJS2, __copyProps2, __toESM2, __publicField2, __accessCheck2, __privateGet2, __privateAdd2, __privateSet2, __privateMethod2, require_pad, require_fingerprint_browser, require_getRandomValue_browser, require_cuid, require_createDeferredExecutor, require_DeferredPromise, require_build, require_MemoryLeakError, require_Emitter, require_lib, import_cuid, POSITIONALS_EXP2, STACK_FRAMES_TO_IGNORE2, InvariantError2, invariant2, import_deferred_promise, FLAG, DEFAULT, GREEN, RED, BLUE, YELLOW, MAGENTA, CYAN, COLOR_SCOPE, debug, MessageSender, import_deferred_promise3, import_cuid2, FileSystemApi, import_strict_event_emitter, ShellApi, ShellProcess, import_deferred_promise2, TIMEOUT, PreviewApi, DEFAULT_RUNTIME_URL, debug2, Nodebox, INJECT_MESSAGE_TYPE, PREVIEW_LOADED_MESSAGE_TYPE;
var init_build = __esm({
  "node_modules/@codesandbox/nodebox/build/index.mjs"() {
    __create2 = Object.create;
    __defProp2 = Object.defineProperty;
    __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    __getOwnPropNames2 = Object.getOwnPropertyNames;
    __getProtoOf2 = Object.getPrototypeOf;
    __hasOwnProp2 = Object.prototype.hasOwnProperty;
    __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    __publicField2 = (obj, key, value) => {
      __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    __accessCheck2 = (obj, member, msg) => {
      if (!member.has(obj))
        throw TypeError("Cannot " + msg);
    };
    __privateGet2 = (obj, member, getter) => {
      __accessCheck2(obj, member, "read from private field");
      return getter ? getter.call(obj) : member.get(obj);
    };
    __privateAdd2 = (obj, member, value) => {
      if (member.has(obj))
        throw TypeError("Cannot add the same private member more than once");
      member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
    };
    __privateSet2 = (obj, member, value, setter) => {
      __accessCheck2(obj, member, "write to private field");
      setter ? setter.call(obj, value) : member.set(obj, value);
      return value;
    };
    __privateMethod2 = (obj, member, method) => {
      __accessCheck2(obj, member, "access private method");
      return method;
    };
    require_pad = __commonJS2({
      "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js"(exports, module) {
        module.exports = function pad(num, size) {
          var s = "000000000" + num;
          return s.substr(s.length - size);
        };
      }
    });
    require_fingerprint_browser = __commonJS2({
      "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.browser.js"(exports, module) {
        var pad = require_pad();
        var env = typeof window === "object" ? window : self;
        var globalCount = Object.keys(env).length;
        var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
        var clientId = pad((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
        module.exports = function fingerprint() {
          return clientId;
        };
      }
    });
    require_getRandomValue_browser = __commonJS2({
      "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.browser.js"(exports, module) {
        var getRandomValue;
        var crypto = typeof window !== "undefined" && (window.crypto || window.msCrypto) || typeof self !== "undefined" && self.crypto;
        if (crypto) {
          lim = Math.pow(2, 32) - 1;
          getRandomValue = function() {
            return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);
          };
        } else {
          getRandomValue = Math.random;
        }
        var lim;
        module.exports = getRandomValue;
      }
    });
    require_cuid = __commonJS2({
      "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js"(exports, module) {
        var fingerprint = require_fingerprint_browser();
        var pad = require_pad();
        var getRandomValue = require_getRandomValue_browser();
        var c = 0;
        var blockSize = 4;
        var base = 36;
        var discreteValues = Math.pow(base, blockSize);
        function randomBlock() {
          return pad((getRandomValue() * discreteValues << 0).toString(base), blockSize);
        }
        function safeCounter() {
          c = c < discreteValues ? c : 0;
          c++;
          return c - 1;
        }
        function cuid3() {
          var letter = "c", timestamp = (/* @__PURE__ */ new Date()).getTime().toString(base), counter2 = pad(safeCounter().toString(base), blockSize), print = fingerprint(), random = randomBlock() + randomBlock();
          return letter + timestamp + counter2 + print + random;
        }
        cuid3.slug = function slug() {
          var date = (/* @__PURE__ */ new Date()).getTime().toString(36), counter2 = safeCounter().toString(36).slice(-4), print = fingerprint().slice(0, 1) + fingerprint().slice(-1), random = randomBlock().slice(-2);
          return date.slice(-2) + counter2 + print + random;
        };
        cuid3.isCuid = function isCuid(stringToCheck) {
          if (typeof stringToCheck !== "string")
            return false;
          if (stringToCheck.startsWith("c"))
            return true;
          return false;
        };
        cuid3.isSlug = function isSlug(stringToCheck) {
          if (typeof stringToCheck !== "string")
            return false;
          var stringLength = stringToCheck.length;
          if (stringLength >= 7 && stringLength <= 10)
            return true;
          return false;
        };
        cuid3.fingerprint = fingerprint;
        module.exports = cuid3;
      }
    });
    require_createDeferredExecutor = __commonJS2({
      "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/createDeferredExecutor.js"(exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.createDeferredExecutor = void 0;
        function createDeferredExecutor() {
          const executor = (resolve, reject) => {
            executor.state = "pending";
            executor.resolve = (data) => {
              if (executor.state !== "pending") {
                return;
              }
              executor.result = data;
              const onFulfilled = (value) => {
                executor.state = "fulfilled";
                return value;
              };
              return resolve(data instanceof Promise ? data : Promise.resolve(data).then(onFulfilled));
            };
            executor.reject = (reason) => {
              if (executor.state !== "pending") {
                return;
              }
              queueMicrotask(() => {
                executor.state = "rejected";
              });
              return reject(executor.rejectionReason = reason);
            };
          };
          return executor;
        }
        exports.createDeferredExecutor = createDeferredExecutor;
      }
    });
    require_DeferredPromise = __commonJS2({
      "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/DeferredPromise.js"(exports) {
        "use strict";
        var _executor, _DeferredPromise4_instances, decorate_fn, _a2;
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.DeferredPromise = void 0;
        var createDeferredExecutor_1 = require_createDeferredExecutor();
        var DeferredPromise4 = (_a2 = class extends Promise {
          constructor(executor = null) {
            const deferredExecutor = (0, createDeferredExecutor_1.createDeferredExecutor)();
            super((originalResolve, originalReject) => {
              deferredExecutor(originalResolve, originalReject);
              executor?.(deferredExecutor.resolve, deferredExecutor.reject);
            });
            __privateAdd(this, _DeferredPromise4_instances);
            __privateAdd(this, _executor);
            __publicField(this, "resolve");
            __publicField(this, "reject");
            __privateSet(this, _executor, deferredExecutor);
            this.resolve = __privateGet(this, _executor).resolve;
            this.reject = __privateGet(this, _executor).reject;
          }
          get state() {
            return __privateGet(this, _executor).state;
          }
          get rejectionReason() {
            return __privateGet(this, _executor).rejectionReason;
          }
          then(onFulfilled, onRejected) {
            return __privateMethod(this, _DeferredPromise4_instances, decorate_fn).call(this, super.then(onFulfilled, onRejected));
          }
          catch(onRejected) {
            return __privateMethod(this, _DeferredPromise4_instances, decorate_fn).call(this, super.catch(onRejected));
          }
          finally(onfinally) {
            return __privateMethod(this, _DeferredPromise4_instances, decorate_fn).call(this, super.finally(onfinally));
          }
        }, _executor = new WeakMap(), _DeferredPromise4_instances = new WeakSet(), decorate_fn = function(promise) {
          return Object.defineProperties(promise, {
            resolve: { configurable: true, value: this.resolve },
            reject: { configurable: true, value: this.reject }
          });
        }, _a2);
        exports.DeferredPromise = DeferredPromise4;
      }
    });
    require_build = __commonJS2({
      "../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/index.js"(exports) {
        "use strict";
        var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() {
              return m[k];
            } };
          }
          Object.defineProperty(o, k2, desc);
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        });
        var __exportStar = exports && exports.__exportStar || function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
              __createBinding(exports2, m, p);
        };
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(require_createDeferredExecutor(), exports);
        __exportStar(require_DeferredPromise(), exports);
      }
    });
    require_MemoryLeakError = __commonJS2({
      "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/MemoryLeakError.js"(exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.MemoryLeakError = void 0;
        var MemoryLeakError = class extends Error {
          constructor(emitter, type, count) {
            super(`Possible EventEmitter memory leak detected. ${count} ${type.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`);
            __publicField(this, "emitter");
            __publicField(this, "type");
            __publicField(this, "count");
            this.emitter = emitter;
            this.type = type;
            this.count = count;
            this.name = "MaxListenersExceededWarning";
          }
        };
        exports.MemoryLeakError = MemoryLeakError;
      }
    });
    require_Emitter = __commonJS2({
      "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/Emitter.js"(exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.Emitter = void 0;
        var MemoryLeakError_1 = require_MemoryLeakError();
        var _events, _maxListeners, _hasWarnedAboutPotentialMemortyLeak, _getListeners, getListeners_fn, _removeListener, removeListener_fn, _wrapOnceListener, wrapOnceListener_fn, _internalEmit, internalEmit_fn;
        var _Emitter = class {
          constructor() {
            __privateAdd2(this, _getListeners);
            __privateAdd2(this, _removeListener);
            __privateAdd2(this, _wrapOnceListener);
            __privateAdd2(this, _internalEmit);
            __privateAdd2(this, _events, void 0);
            __privateAdd2(this, _maxListeners, void 0);
            __privateAdd2(this, _hasWarnedAboutPotentialMemortyLeak, void 0);
            __privateSet2(this, _events, /* @__PURE__ */ new Map());
            __privateSet2(this, _maxListeners, _Emitter.defaultMaxListeners);
            __privateSet2(this, _hasWarnedAboutPotentialMemortyLeak, false);
          }
          static listenerCount(emitter, eventName) {
            return emitter.listenerCount(eventName);
          }
          setMaxListeners(maxListeners) {
            __privateSet2(this, _maxListeners, maxListeners);
            return this;
          }
          getMaxListeners() {
            return __privateGet2(this, _maxListeners);
          }
          eventNames() {
            return Array.from(__privateGet2(this, _events).keys());
          }
          emit(eventName, ...data) {
            const listeners = __privateMethod2(this, _getListeners, getListeners_fn).call(this, eventName);
            listeners.forEach((listener) => {
              listener.apply(this, data);
            });
            return listeners.length > 0;
          }
          addListener(eventName, listener) {
            __privateMethod2(this, _internalEmit, internalEmit_fn).call(this, "newListener", eventName, listener);
            const nextListeners = __privateMethod2(this, _getListeners, getListeners_fn).call(this, eventName).concat(listener);
            __privateGet2(this, _events).set(eventName, nextListeners);
            if (__privateGet2(this, _maxListeners) > 0 && this.listenerCount(eventName) > __privateGet2(this, _maxListeners) && !__privateGet2(this, _hasWarnedAboutPotentialMemortyLeak)) {
              __privateSet2(this, _hasWarnedAboutPotentialMemortyLeak, true);
              const memoryLeakWarning = new MemoryLeakError_1.MemoryLeakError(this, eventName, this.listenerCount(eventName));
              console.warn(memoryLeakWarning);
            }
            return this;
          }
          on(eventName, listener) {
            return this.addListener(eventName, listener);
          }
          once(eventName, listener) {
            return this.addListener(eventName, __privateMethod2(this, _wrapOnceListener, wrapOnceListener_fn).call(this, eventName, listener));
          }
          prependListener(eventName, listener) {
            const listeners = __privateMethod2(this, _getListeners, getListeners_fn).call(this, eventName);
            if (listeners.length > 0) {
              const nextListeners = [listener].concat(listeners);
              __privateGet2(this, _events).set(eventName, nextListeners);
            } else {
              __privateGet2(this, _events).set(eventName, listeners.concat(listener));
            }
            return this;
          }
          prependOnceListener(eventName, listener) {
            return this.prependListener(eventName, __privateMethod2(this, _wrapOnceListener, wrapOnceListener_fn).call(this, eventName, listener));
          }
          removeListener(eventName, listener) {
            const listeners = __privateMethod2(this, _getListeners, getListeners_fn).call(this, eventName);
            if (listeners.length > 0) {
              __privateMethod2(this, _removeListener, removeListener_fn).call(this, listeners, listener);
              __privateGet2(this, _events).set(eventName, listeners);
              __privateMethod2(this, _internalEmit, internalEmit_fn).call(this, "removeListener", eventName, listener);
            }
            return this;
          }
          off(eventName, listener) {
            return this.removeListener(eventName, listener);
          }
          removeAllListeners(eventName) {
            if (eventName) {
              __privateGet2(this, _events).delete(eventName);
            } else {
              __privateGet2(this, _events).clear();
            }
            return this;
          }
          listeners(eventName) {
            return Array.from(__privateMethod2(this, _getListeners, getListeners_fn).call(this, eventName));
          }
          listenerCount(eventName) {
            return __privateMethod2(this, _getListeners, getListeners_fn).call(this, eventName).length;
          }
          rawListeners(eventName) {
            return this.listeners(eventName);
          }
        };
        var Emitter2 = _Emitter;
        _events = /* @__PURE__ */ new WeakMap();
        _maxListeners = /* @__PURE__ */ new WeakMap();
        _hasWarnedAboutPotentialMemortyLeak = /* @__PURE__ */ new WeakMap();
        _getListeners = /* @__PURE__ */ new WeakSet();
        getListeners_fn = function(eventName) {
          return __privateGet2(this, _events).get(eventName) || [];
        };
        _removeListener = /* @__PURE__ */ new WeakSet();
        removeListener_fn = function(listeners, listener) {
          const index = listeners.indexOf(listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
          return [];
        };
        _wrapOnceListener = /* @__PURE__ */ new WeakSet();
        wrapOnceListener_fn = function(eventName, listener) {
          const onceListener = (...data) => {
            this.removeListener(eventName, onceListener);
            listener.apply(this, data);
          };
          return onceListener;
        };
        _internalEmit = /* @__PURE__ */ new WeakSet();
        internalEmit_fn = function(internalEventName, eventName, listener) {
          this.emit(
            internalEventName,
            ...[eventName, listener]
          );
        };
        __publicField2(Emitter2, "defaultMaxListeners", 10);
        exports.Emitter = Emitter2;
      }
    });
    require_lib = __commonJS2({
      "../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/index.js"(exports) {
        "use strict";
        var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() {
              return m[k];
            } };
          }
          Object.defineProperty(o, k2, desc);
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        });
        var __exportStar = exports && exports.__exportStar || function(m, exports2) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
              __createBinding(exports2, m, p);
        };
        Object.defineProperty(exports, "__esModule", { value: true });
        __exportStar(require_Emitter(), exports);
        __exportStar(require_MemoryLeakError(), exports);
      }
    });
    import_cuid = __toESM2(require_cuid());
    POSITIONALS_EXP2 = /(%?)(%([sdjo]))/g;
    STACK_FRAMES_TO_IGNORE2 = 2;
    InvariantError2 = class extends Error {
      constructor(message, ...positionals) {
        super(message);
        this.message = message;
        this.name = "Invariant Violation";
        this.message = format2(message, ...positionals);
        cleanErrorStack2(this);
      }
    };
    invariant2 = (predicate, message, ...positionals) => {
      if (!predicate) {
        throw new InvariantError2(message, ...positionals);
      }
    };
    invariant2.as = (ErrorConstructor, predicate, message, ...positionals) => {
      if (!predicate) {
        const isConstructor = ErrorConstructor.prototype.name != null;
        const error = isConstructor ? new ErrorConstructor(format2(message, positionals)) : ErrorConstructor(format2(message, positionals));
        throw error;
      }
    };
    import_deferred_promise = __toESM2(require_build());
    FLAG = window.localStorage["CSB_EMULATOR_DEBUG"];
    DEFAULT = "\x1B[0m";
    GREEN = "\x1B[32;1m";
    RED = "\x1B[31m";
    BLUE = "\x1B[34m";
    YELLOW = "\x1B[33;1m";
    MAGENTA = "\x1B[35;1m";
    CYAN = "\x1B[36;1m";
    COLOR_SCOPE = {
      preview: YELLOW,
      emulator: MAGENTA,
      runtime: CYAN,
      bridge: BLUE,
      "runtime:worker": CYAN
    };
    debug = createDebug("emulator");
    MessageSender = class {
      constructor(target) {
        __publicField(this, "emitter");
        __publicField(this, "channel");
        __publicField(this, "receiverPort");
        __publicField(this, "receiverReadyPromise");
        this.target = target;
        this.emitter = new EventTarget();
        this.channel = new MessageChannel();
        this.receiverPort = this.channel.port1;
        const receiverReadyPromise = new import_deferred_promise.DeferredPromise();
        const handshakeListener = (message) => {
          if (message.data.type === "internal/ready") {
            debug("[message-sender]: runtime is ready");
            receiverReadyPromise.resolve();
          }
        };
        window.addEventListener("message", handshakeListener);
        receiverReadyPromise.then(() => {
          window.removeEventListener("message", handshakeListener);
        });
        this.receiverReadyPromise = receiverReadyPromise;
        this.receiverPort.onmessage = (evt) => {
          const data = evt.data;
          if (data.type != null) {
            debug('[message-sender]: emitting "%s" event...', data.type, data.payload);
            this.emitter.dispatchEvent(new MessageEvent(data.type, { data: data.payload }));
          }
        };
      }
      async handshake() {
        const handshakePromise = new import_deferred_promise.DeferredPromise();
        await this.receiverReadyPromise;
        debug("[message-sender]: sending handshake");
        this.target.postMessage(
          {
            type: "internal/handshake"
          },
          "*",
          [this.channel.port2]
        );
        this.on("internal/handshake/done", () => {
          handshakePromise.resolve();
          clearTimeout(rejectionTimeout);
        });
        const rejectionTimeout = setTimeout(() => {
          handshakePromise.reject(new Error("MessageSender: Handshake timeout"));
        }, 5e3);
        return handshakePromise;
      }
      on(event, listener, options) {
        debug('[message-sender]: add listener "%s"', event);
        this.emitter.addEventListener(
          event,
          (message) => {
            if (message instanceof MessageEvent) {
              listener(message);
            }
          },
          options
        );
      }
      off(event, listener, options) {
        this.emitter.removeEventListener(event, listener, options);
      }
      async send(event, ...data) {
        const operationPromise = new import_deferred_promise.DeferredPromise();
        const operationId = (0, import_cuid.default)();
        const payload = data[0] || {};
        debug('[message-sender]: send "%s" (%s)', event, operationId, payload);
        this.receiverPort.postMessage({ type: event, payload: { operationId, payload } });
        debug('[message-sender]: adding done listener for "%s" (%s)', event, operationId);
        const handleOperationDone = (doneEvent) => {
          const { data: data2 } = doneEvent;
          if (data2.operationId === operationId) {
            const listenerPayload = data2.listenerPayload || {};
            debug('[message-sender]: resolving "%s (%s) promise!', event, operationId);
            operationPromise.resolve({
              ...listenerPayload,
              operationId: data2.operationId
            });
          }
        };
        const handleOperationFailed = (failEvent) => {
          const { data: data2 } = failEvent;
          if (data2.operationId === operationId) {
            debug('[message-sender]: rejecting "%s (%s) promise!', event, operationId);
            operationPromise.reject(data2.error);
          }
        };
        this.on("internal/operation/done", handleOperationDone);
        this.on("internal/operation/failed", handleOperationFailed);
        return operationPromise.finally(() => {
          this.emitter.removeEventListener("internal/operation/done", handleOperationDone);
          this.emitter.removeEventListener("internal/operation/failed", handleOperationFailed);
        });
      }
    };
    import_deferred_promise3 = __toESM2(require_build());
    import_cuid2 = __toESM2(require_cuid());
    FileSystemApi = class {
      constructor(channel) {
        this.channel = channel;
      }
      async init(files) {
        await this.channel.send("fs/init", { files });
      }
      async readFile(path, encoding) {
        const response = await this.channel.send("fs/readFile", { path, encoding }).catch((error) => {
          throw new Error(format2('Failed to read file at path "%s"', path), { cause: error });
        });
        if (!response) {
          throw new Error("File not found");
        }
        return response.data;
      }
      async writeFile(path, content, options) {
        let encoding = void 0;
        let recursive = false;
        if (typeof options === "object") {
          encoding = options.encoding;
          recursive = !!options.recursive;
        } else if (typeof options === "string") {
          encoding = options;
        }
        await this.channel.send("fs/writeFile", { path, content, encoding, recursive }).catch((error) => {
          throw new Error(format2('Failed to write file at path "%s"', path), { cause: error });
        });
      }
      async readdir(path) {
        const response = await this.channel.send("fs/readdir", { path }).catch((error) => {
          throw new Error(format2('Failed to read directory at path "%s"', path), { cause: error });
        });
        if (!response) {
          throw new Error("Directory not found");
        }
        return response.data;
      }
      async mkdir(path, options) {
        const recursive = !!options?.recursive;
        await this.channel.send("fs/mkdir", { path, recursive }).catch((error) => {
          throw new Error(format2('Failed to make directory at path "%s"', path), { cause: error });
        });
      }
      async stat(path) {
        const response = await this.channel.send("fs/stat", { path }).catch((error) => {
          throw new Error(format2('Failed to stat file at path "%s"', path), { cause: error });
        });
        if (!response) {
          throw new Error("File not found");
        }
        return response.data;
      }
      async rm(path, options) {
        const { force, recursive } = options || {};
        await this.channel.send("fs/rm", { path, force, recursive }).catch((error) => {
          throw new Error(format2('Failed to remove file at path "%s"', path), { cause: error });
        });
      }
      async watch(includes, excludes, listener) {
        const watcherId = (0, import_cuid2.default)();
        await this.channel.send("fs/watch", { watcherId, includes, excludes });
        this.channel.on("fs/watch-event", ({ data }) => {
          if (data.watcherId === watcherId && listener) {
            const evt = { ...data };
            delete evt.watcherId;
            listener(evt);
          }
        });
        return {
          dispose: () => this.channel.send("fs/unwatch", { watcherId })
        };
      }
    };
    import_strict_event_emitter = __toESM2(require_lib());
    ShellApi = class {
      constructor(channel) {
        this.channel = channel;
      }
      create() {
        return new ShellProcess(this.channel);
      }
    };
    ShellProcess = class {
      constructor(channel) {
        __publicField(this, "id");
        __publicField(this, "state");
        __publicField(this, "stdout");
        __publicField(this, "stderr");
        __publicField(this, "stdin");
        this.channel = channel;
        this.state = "running";
        this.stdout = new import_strict_event_emitter.Emitter();
        this.stderr = new import_strict_event_emitter.Emitter();
        this.stdin = {
          write: (data) => {
            if (!this.id) {
              throw new Error("Failed to write to stdin, no process is currently running");
            }
            return this.channel.send("shell/stdin", { data, workerId: this.id });
          }
        };
        this.forwardStdEvents();
      }
      forwardStdEvents() {
        this.channel.on("worker/tty", (message) => {
          const { data } = message;
          if (data.workerId !== this.id) {
            return;
          }
          switch (data.payload.type) {
            case "out": {
              this.stdout.emit("data", data.payload.data);
              break;
            }
            case "err": {
              this.stderr.emit("data", data.payload.data);
              break;
            }
          }
        });
      }
      async runCommand(command, args, options = {}) {
        invariant2(!this.id, 'Failed to run "runCommand" on a ShellProcess: there is already a process running.');
        const shellInfo = await this.channel.send("shell/runCommand", { command, args, options });
        invariant2(shellInfo, 'Failed to run "runCommand" on a ShellProcess: was not able to retrieve a running process.');
        this.id = shellInfo.id;
        this.state = "running";
        return shellInfo;
      }
      async on(message, listener) {
        switch (message) {
          case "progress": {
            this.channel.on("worker/progress", ({ data }) => {
              listener(data.status);
            });
            return;
          }
          case "exit": {
            this.channel.on("worker/exit", ({ data }) => {
              if (data.workerId === this.id) {
                listener(data.exitCode, data.error);
              }
            });
            return;
          }
        }
      }
      async kill() {
        invariant2(
          this.id,
          'Failed to run "kill" on a ShellProcess: there is no process running. Did you forget to run it?'
        );
        this.state = "idle";
        await this.channel.send("shell/exit", { id: this.id }).catch((error) => {
          throw new Error(format2('Failed to kill shell with ID "%s"', this.id), { cause: error });
        });
        this.id = void 0;
      }
    };
    import_deferred_promise2 = __toESM2(require_build());
    TIMEOUT = 2e4;
    PreviewApi = class {
      constructor(channel) {
        this.channel = channel;
      }
      async waitFor(payload, predicate, timeout = TIMEOUT) {
        const readyPromise = new import_deferred_promise2.DeferredPromise();
        const rejectTimeout = setTimeout(() => {
          readyPromise.reject();
        }, timeout);
        const previewInformation = await this.channel.send("preview/get/info", payload).catch((error) => {
          readyPromise.reject(
            new Error(
              format2(
                'Failed to look up preview information for shell ID "%s" (port: %d)',
                payload.sourceShellId,
                payload.port
              )
            )
          );
        });
        const foundPreview = previewInformation && predicate(previewInformation);
        if (foundPreview) {
          readyPromise.resolve({
            url: previewInformation.url,
            port: previewInformation.port,
            sourceShellId: previewInformation.sourceShellId
          });
        }
        this.channel.on("preview/port/ready", ({ data }) => {
          if (!foundPreview && predicate(data)) {
            readyPromise.resolve({
              url: data.url,
              port: data.port,
              sourceShellId: data.sourceShellId
            });
          }
        });
        return readyPromise.finally(() => {
          clearTimeout(rejectTimeout);
        });
      }
      async getByShellId(sourceShellId, timeout) {
        return this.waitFor({ sourceShellId }, (data) => data.sourceShellId === sourceShellId, timeout).catch((error) => {
          throw new Error(format2('Failed to get shell by ID "%s"', sourceShellId), { cause: error });
        });
      }
      async waitForPort(port, timeout) {
        return this.waitFor({ port }, (data) => data.port === port, timeout).catch((error) => {
          throw new Error(format2("Failed to await port %d", port), { cause: error });
        });
      }
    };
    DEFAULT_RUNTIME_URL = "https://nodebox-runtime.codesandbox.io";
    debug2 = createDebug("emulator");
    Nodebox = class {
      constructor(options) {
        __publicField(this, "channel", null);
        __publicField(this, "isConnected");
        __publicField(this, "url");
        __publicField(this, "fileSystemApi", null);
        __publicField(this, "shellApi", null);
        __publicField(this, "previewApi", null);
        this.options = options;
        invariant2(
          this.options.iframe,
          'Failed to create a Nodebox: expected "iframe" argument to be a reference to an <iframe> element but got %j',
          this.options.iframe
        );
        this.url = this.options.runtimeUrl || DEFAULT_RUNTIME_URL;
        this.isConnected = false;
      }
      async connect() {
        const { iframe, cdnUrl } = this.options;
        debug2("[message-sender]: Connecting to node emulator...");
        const connectionPromise = new import_deferred_promise3.DeferredPromise();
        if (!this.url) {
          connectionPromise.reject(
            new Error("Nodebox URL is missing. Did you forget to provide it when creating this Nodebox instance?")
          );
        }
        invariant2(
          iframe.contentWindow,
          "Failed to create a MessageChannel with the Nodebox iframe: no content window found"
        );
        this.channel = new MessageSender(iframe.contentWindow);
        const frameLoadPromise = new import_deferred_promise3.DeferredPromise();
        iframe.setAttribute("src", this.url);
        iframe.addEventListener(
          "load",
          () => {
            frameLoadPromise.resolve();
          },
          { once: true }
        );
        iframe.addEventListener(
          "error",
          (event) => {
            frameLoadPromise.reject(event.error);
          },
          { once: true }
        );
        await frameLoadPromise;
        debug2("[message-sender]: IFrame loaded...");
        await this.channel.handshake();
        debug2("[message-sender]: Handshake completed...");
        this.channel.send("connect", {
          cdnUrl
        });
        this.channel.on("runtime/ready", () => {
          connectionPromise.resolve();
        });
        return connectionPromise.then(() => {
          debug2("[message-sender]: Connected to runtime...");
          this.isConnected = true;
        });
      }
      get fs() {
        invariant2(
          this.isConnected,
          'Failed to access the File System API: consumer is not connected. Did you forget to run "connect()"?'
        );
        if (this.fileSystemApi) {
          return this.fileSystemApi;
        }
        this.fileSystemApi = new FileSystemApi(this.channel);
        return this.fileSystemApi;
      }
      get shell() {
        invariant2(
          this.isConnected,
          'Failed to access the Shell API: consumer is not connected. Did you forget to run "connect()"?'
        );
        if (this.shellApi) {
          return this.shellApi;
        }
        this.shellApi = new ShellApi(this.channel);
        return this.shellApi;
      }
      get preview() {
        invariant2(
          this.isConnected,
          'Failed to access the Preview API: consumer is not connected. Did you forget to run "connect()"?'
        );
        if (this.previewApi) {
          return this.previewApi;
        }
        this.previewApi = new PreviewApi(this.channel);
        return this.previewApi;
      }
    };
    INJECT_MESSAGE_TYPE = "INJECT_AND_INVOKE";
    PREVIEW_LOADED_MESSAGE_TYPE = "PREVIEW_LOADED";
  }
});

// node_modules/dequal/dist/index.mjs
function find(iter, tar, key) {
  for (key of iter.keys()) {
    if (dequal(key, tar)) return key;
  }
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len;
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!bar.has(tmp)) return false;
      }
      return true;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len[0];
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!dequal(len[1], bar.get(tmp))) {
          return false;
        }
      }
      return true;
    }
    if (ctor === ArrayBuffer) {
      foo = new Uint8Array(foo);
      bar = new Uint8Array(bar);
    } else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo.getInt8(len) === bar.getInt8(len)) ;
      }
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo[len] === bar[len]) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}
var has;
var init_dist = __esm({
  "node_modules/dequal/dist/index.mjs"() {
    has = Object.prototype.hasOwnProperty;
  }
});

// node_modules/@codesandbox/sandpack-client/dist/base-80a1f760.mjs
var SandpackClient;
var init_base_80a1f760 = __esm({
  "node_modules/@codesandbox/sandpack-client/dist/base-80a1f760.mjs"() {
    init_dist();
    SandpackClient = /** @class */
    (function() {
      function SandpackClient2(iframeSelector, sandboxSetup, options) {
        if (options === void 0) {
          options = {};
        }
        this.status = "idle";
        this.options = options;
        this.sandboxSetup = sandboxSetup;
        this.iframeSelector = iframeSelector;
      }
      SandpackClient2.prototype.updateOptions = function(options) {
        if (!dequal(this.options, options)) {
          this.options = options;
          this.updateSandbox();
        }
      };
      SandpackClient2.prototype.updateSandbox = function(_sandboxSetup, _isInitializationCompile) {
        if (_sandboxSetup === void 0) {
          _sandboxSetup = this.sandboxSetup;
        }
        throw Error("Method not implemented");
      };
      SandpackClient2.prototype.destroy = function() {
        throw Error("Method not implemented");
      };
      SandpackClient2.prototype.dispatch = function(_message) {
        throw Error("Method not implemented");
      };
      SandpackClient2.prototype.listen = function(_listener) {
        throw Error("Method not implemented");
      };
      return SandpackClient2;
    })();
  }
});

// node_modules/@codesandbox/sandpack-client/dist/consoleHook-59e792cb.mjs
function isCommand(char) {
  return /[a-zA-Z.]/.test(char);
}
function isAlpha(char) {
  return /[a-zA-Z]/.test(char);
}
function isWhitespace(char) {
  return /\s/.test(char);
}
function isOperator(char) {
  return /[&|]/.test(char);
}
function isArgument(char) {
  return /-/.test(char);
}
function isString(char) {
  return /["']/.test(char);
}
function isEnvVar(char) {
  return isAlpha(char) && char === char.toUpperCase();
}
function tokenize(input) {
  var current = 0;
  var tokens = [];
  function parseCommand() {
    var value = "";
    while (isCommand(input[current]) && current < input.length) {
      value += input[current];
      current++;
    }
    return { type: TokenType.Command, value };
  }
  function parseOperator() {
    var value = "";
    while (isOperator(input[current]) && current < input.length) {
      value += input[current];
      current++;
    }
    return operators.get(value);
  }
  function parseArgument() {
    var value = "";
    while ((isArgument(input[current]) || isAlpha(input[current])) && current < input.length) {
      value += input[current];
      current++;
    }
    return { type: TokenType.Argument, value };
  }
  function parseString() {
    var openCloseQuote = input[current];
    var value = input[current];
    current++;
    while (input[current] !== openCloseQuote && current < input.length) {
      value += input[current];
      current++;
    }
    value += input[current];
    current++;
    return { type: TokenType.String, value };
  }
  function parseEnvVars() {
    var value = {};
    var parseSingleEnv = function() {
      var key = "";
      var pair = "";
      while (input[current] !== "=" && current < input.length) {
        key += input[current];
        current++;
      }
      if (input[current] === "=") {
        current++;
      }
      while (input[current] !== " " && current < input.length) {
        pair += input[current];
        current++;
      }
      value[key] = pair;
    };
    while (isEnvVar(input[current]) && current < input.length) {
      parseSingleEnv();
      current++;
    }
    return { type: TokenType.EnvVar, value };
  }
  while (current < input.length) {
    var currentChar = input[current];
    if (isWhitespace(currentChar)) {
      current++;
      continue;
    }
    switch (true) {
      case isEnvVar(currentChar):
        tokens.push(parseEnvVars());
        break;
      case isCommand(currentChar):
        tokens.push(parseCommand());
        break;
      case isOperator(currentChar):
        tokens.push(parseOperator());
        break;
      case isArgument(currentChar):
        tokens.push(parseArgument());
        break;
      case isString(currentChar):
        tokens.push(parseString());
        break;
      default:
        throw new Error("Unknown character: ".concat(currentChar));
    }
  }
  return tokens;
}
function generateRandomId() {
  var now = Date.now();
  var randomNumber = Math.round(Math.random() * 1e4);
  var count = counter += 1;
  return (+"".concat(now).concat(randomNumber).concat(count)).toString(16);
}
var EventEmitter, TokenType, operators, counter, writeBuffer, readBuffer, fromBundlerFilesToFS, findStartScriptPackageJson, getMessageFromError, consoleHook;
var init_consoleHook_59e792cb = __esm({
  "node_modules/@codesandbox/sandpack-client/dist/consoleHook-59e792cb.mjs"() {
    init_lib();
    init_utils_52664384();
    EventEmitter = /** @class */
    (function() {
      function EventEmitter2() {
        this.listeners = {};
        this.listenersCount = 0;
        this.channelId = Math.floor(Math.random() * 1e6);
        this.listeners = [];
      }
      EventEmitter2.prototype.cleanup = function() {
        this.listeners = {};
        this.listenersCount = 0;
      };
      EventEmitter2.prototype.dispatch = function(message) {
        Object.values(this.listeners).forEach(function(listener) {
          return listener(message);
        });
      };
      EventEmitter2.prototype.listener = function(listener) {
        var _this = this;
        if (typeof listener !== "function") {
          return function() {
            return;
          };
        }
        var listenerId = this.listenersCount;
        this.listeners[listenerId] = listener;
        this.listenersCount++;
        return function() {
          delete _this.listeners[listenerId];
        };
      };
      return EventEmitter2;
    })();
    (function(TokenType2) {
      TokenType2["OR"] = "OR";
      TokenType2["AND"] = "AND";
      TokenType2["PIPE"] = "PIPE";
      TokenType2["Command"] = "Command";
      TokenType2["Argument"] = "Argument";
      TokenType2["String"] = "String";
      TokenType2["EnvVar"] = "EnvVar";
    })(TokenType || (TokenType = {}));
    operators = /* @__PURE__ */ new Map([
      ["&&", { type: TokenType.AND }],
      ["||", { type: TokenType.OR }],
      ["|", { type: TokenType.PIPE }],
      ["-", { type: TokenType.Argument }]
    ]);
    counter = 0;
    writeBuffer = function(content) {
      if (typeof content === "string") {
        return new TextEncoder().encode(content);
      } else {
        return content;
      }
    };
    readBuffer = function(content) {
      if (typeof content === "string") {
        return content;
      } else {
        return new TextDecoder().decode(content);
      }
    };
    fromBundlerFilesToFS = function(files) {
      return Object.entries(files).reduce(function(acc, _a2) {
        var key = _a2[0], value = _a2[1];
        acc[key] = writeBuffer(value.code);
        return acc;
      }, {});
    };
    findStartScriptPackageJson = function(packageJson) {
      var scripts2 = {};
      var possibleKeys = ["dev", "start"];
      try {
        scripts2 = JSON.parse(packageJson).scripts;
      } catch (e) {
        throw createError("Could not parse package.json file: " + e.message);
      }
      invariant(scripts2, "Failed to start. Please provide a `start` or `dev` script on the package.json");
      var _loop_1 = function(index2) {
        if (possibleKeys[index2] in scripts2) {
          var script = possibleKeys[index2];
          var candidate = scripts2[script];
          var env_1 = {};
          var command_1 = "";
          var args_1 = [];
          tokenize(candidate).forEach(function(item) {
            var commandNotFoundYet = command_1 === "";
            if (item.type === TokenType.EnvVar) {
              env_1 = item.value;
            }
            if (item.type === TokenType.Command && commandNotFoundYet) {
              command_1 = item.value;
            }
            if (item.type === TokenType.Argument || !commandNotFoundYet && item.type === TokenType.Command) {
              args_1.push(item.value);
            }
          });
          return { value: [command_1, args_1, { env: env_1 }] };
        }
      };
      for (var index = 0; index < possibleKeys.length; index++) {
        var state_1 = _loop_1(index);
        if (typeof state_1 === "object")
          return state_1.value;
      }
      throw createError("Failed to start. Please provide a `start` or `dev` script on the package.json");
    };
    getMessageFromError = function(error) {
      if (typeof error === "string")
        return error;
      if (typeof error === "object" && "message" in error) {
        return error.message;
      }
      return createError("The server could not be reached. Make sure that the node script is running and that a port has been started.");
    };
    consoleHook = `var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};function r(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var e={},n={};!function(t){t.__esModule=!0,t.default=["log","debug","info","warn","error","table","clear","time","timeEnd","count","assert","command","result"]}(n);var a,o={},i={};(a=i).__esModule=!0,a.default=function(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+"-"+Date.now()};var u={},s={__esModule:!0};s.update=s.state=void 0,s.update=function(t){s.state=t};var f={},c={};!function(r){var e=t&&t.__assign||function(){return e=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var a in r=arguments[e])Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);return t},e.apply(this,arguments)};r.__esModule=!0,r.initialState=void 0,r.initialState={timings:{},count:{}};var n=function(){return"undefined"!=typeof performance&&performance.now?performance.now():Date.now()};r.default=function(t,a){var o,i,u;switch(void 0===t&&(t=r.initialState),a.type){case"COUNT":var s=t.count[a.name]||0;return e(e({},t),{count:e(e({},t.count),(o={},o[a.name]=s+1,o))});case"TIME_START":return e(e({},t),{timings:e(e({},t.timings),(i={},i[a.name]={start:n()},i))});case"TIME_END":var f=t.timings[a.name],c=n(),l=c-f.start;return e(e({},t),{timings:e(e({},t.timings),(u={},u[a.name]=e(e({},f),{end:c,time:l}),u))});default:return t}}}(c),function(r){var e=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};r.__esModule=!0;var n=e(c),a=s;r.default=function(t){a.update(n.default(a.state,t))}}(f);var l={__esModule:!0};l.timeEnd=l.timeStart=l.count=void 0,l.count=function(t){return{type:"COUNT",name:t}},l.timeStart=function(t){return{type:"TIME_START",name:t}},l.timeEnd=function(t){return{type:"TIME_END",name:t}};var d=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};u.__esModule=!0,u.stop=u.start=void 0;var p=s,h=d(f),m=l;u.start=function(t){h.default(m.timeStart(t))},u.stop=function(t){var r=null===p.state||void 0===p.state?void 0:p.state.timings[t];return r&&!r.end?(h.default(m.timeEnd(t)),{method:"log",data:[t+": "+p.state.timings[t].time+"ms"]}):{method:"warn",data:["Timer '"+t+"' does not exist"]}};var y={},v=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};y.__esModule=!0,y.increment=void 0;var _=s,b=v(f),g=l;y.increment=function(t){return b.default(g.count(t)),{method:"log",data:[t+": "+_.state.count[t]]}};var M={},T=t&&t.__spreadArrays||function(){for(var t=0,r=0,e=arguments.length;r<e;r++)t+=arguments[r].length;var n=Array(t),a=0;for(r=0;r<e;r++)for(var o=arguments[r],i=0,u=o.length;i<u;i++,a++)n[a]=o[i];return n};M.__esModule=!0,M.test=void 0,M.test=function(t){for(var r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];return!t&&(0===r.length&&r.push("console.assert"),{method:"error",data:T(["Assertion failed:"],r)})},function(r){var e=t&&t.__assign||function(){return e=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var a in r=arguments[e])Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);return t},e.apply(this,arguments)},n=t&&t.__createBinding||(Object.create?function(t,r,e,n){void 0===n&&(n=e),Object.defineProperty(t,n,{enumerable:!0,get:function(){return r[e]}})}:function(t,r,e,n){void 0===n&&(n=e),t[n]=r[e]}),a=t&&t.__setModuleDefault||(Object.create?function(t,r){Object.defineProperty(t,"default",{enumerable:!0,value:r})}:function(t,r){t.default=r}),o=t&&t.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var e in t)"default"!==e&&Object.prototype.hasOwnProperty.call(t,e)&&n(r,t,e);return a(r,t),r},s=t&&t.__spreadArrays||function(){for(var t=0,r=0,e=arguments.length;r<e;r++)t+=arguments[r].length;var n=Array(t),a=0;for(r=0;r<e;r++)for(var o=arguments[r],i=0,u=o.length;i<u;i++,a++)n[a]=o[i];return n},f=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};r.__esModule=!0;var c=f(i),l=o(u),d=o(y),p=o(M);r.default=function(t,r,n){var a=n||c.default();switch(t){case"clear":return{method:t,id:a};case"count":return!!(o="string"==typeof r[0]?r[0]:"default")&&e(e({},d.increment(o)),{id:a});case"time":case"timeEnd":var o;return!!(o="string"==typeof r[0]?r[0]:"default")&&("time"===t?(l.start(o),!1):e(e({},l.stop(o)),{id:a}));case"assert":if(0!==r.length){var i=p.test.apply(p,s([r[0]],r.slice(1)));if(i)return e(e({},i),{id:a})}return!1;case"error":return{method:t,id:a,data:r.map((function(t){try{return t.stack||t}catch(r){return t}}))};default:return{method:t,id:a,data:r}}}}(o);var S={},O={};!function(t){var r;t.__esModule=!0,function(t){t[t.infinity=0]="infinity",t[t.minusInfinity=1]="minusInfinity",t[t.minusZero=2]="minusZero"}(r||(r={})),t.default={type:"Arithmetic",lookup:Number,shouldTransform:function(t,r){return"number"===t&&(r===1/0||r===-1/0||function(t){return 1/t==-1/0}(r))},toSerializable:function(t){return t===1/0?r.infinity:t===-1/0?r.minusInfinity:r.minusZero},fromSerializable:function(t){return t===r.infinity?1/0:t===r.minusInfinity?-1/0:t===r.minusZero?-0:t}}}(O);var w={};!function(t){t.__esModule=!0,t.default={type:"Function",lookup:Function,shouldTransform:function(t,r){return"function"==typeof r},toSerializable:function(t){var r="";try{r=t.toString().substring(r.indexOf("{")+1,r.lastIndexOf("}"))}catch(t){}return{name:t.name,body:r,proto:Object.getPrototypeOf(t).constructor.name}},fromSerializable:function(t){try{var r=function(){};return"string"==typeof t.name&&Object.defineProperty(r,"name",{value:t.name,writable:!1}),"string"==typeof t.body&&Object.defineProperty(r,"body",{value:t.body,writable:!1}),"string"==typeof t.proto&&(r.constructor={name:t.proto}),r}catch(r){return t}}}}(w);var A={};!function(t){var r;function e(t){for(var r={},e=0,n=t.attributes;e<n.length;e++){var a=n[e];r[a.name]=a.value}return r}t.__esModule=!0,t.default={type:"HTMLElement",shouldTransform:function(t,r){return r&&r.children&&"string"==typeof r.innerHTML&&"string"==typeof r.tagName},toSerializable:function(t){return{tagName:t.tagName.toLowerCase(),attributes:e(t),innerHTML:t.innerHTML}},fromSerializable:function(t){try{var e=(r||(r=document.implementation.createHTMLDocument("sandbox"))).createElement(t.tagName);e.innerHTML=t.innerHTML;for(var n=0,a=Object.keys(t.attributes);n<a.length;n++){var o=a[n];try{e.setAttribute(o,t.attributes[o])}catch(t){}}return e}catch(r){return t}}}}(A);var j={};!function(r){var e=t&&t.__assign||function(){return e=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++)for(var a in r=arguments[e])Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a]);return t},e.apply(this,arguments)};r.__esModule=!0,r.default={type:"Map",shouldTransform:function(t,r){return r&&r.constructor&&"Map"===r.constructor.name},toSerializable:function(t){var r={};return t.forEach((function(t,e){var n="object"==typeof e?JSON.stringify(e):e;r[n]=t})),{name:"Map",body:r,proto:Object.getPrototypeOf(t).constructor.name}},fromSerializable:function(t){var r=t.body,n=e({},r);return"string"==typeof t.proto&&(n.constructor={name:t.proto}),n}}}(j);var z={};!function(t){t.__esModule=!0;var r="@t",e=/^#*@(t|r)$/,n=(0,eval)("this"),a="function"==typeof ArrayBuffer,o="function"==typeof Map,i="function"==typeof Set,u=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"],s=Array.prototype.slice,f={serialize:function(t){return JSON.stringify(t)},deserialize:function(t){return JSON.parse(t)}},c=function(){function t(t,r){this.references=t,this.transforms=r,this.transformsMap=this._makeTransformsMap(),this.circularCandidates=[],this.circularCandidatesDescrs=[],this.circularRefCount=0}return t._createRefMark=function(t){var r=Object.create(null);return r["@r"]=t,r},t.prototype._createCircularCandidate=function(t,r,e){this.circularCandidates.push(t),this.circularCandidatesDescrs.push({parent:r,key:e,refIdx:-1})},t.prototype._applyTransform=function(t,e,n,a){var o=Object.create(null),i=a.toSerializable(t);return"object"==typeof i&&this._createCircularCandidate(t,e,n),o[r]=a.type,o.data=this._handleValue((function(){return i}),e,n),o},t.prototype._handleArray=function(t){for(var r=[],e=function(e){r[e]=n._handleValue((function(){return t[e]}),r,e)},n=this,a=0;a<t.length;a++)e(a);return r},t.prototype._handlePlainObject=function(t){var r,n,a=Object.create(null),o=function(r){if(Reflect.has(t,r)){var n=e.test(r)?"#"+r:r;a[n]=i._handleValue((function(){return t[r]}),a,n)}},i=this;for(var u in t)o(u);var s=null===(n=null===(r=null==t?void 0:t.__proto__)||void 0===r?void 0:r.constructor)||void 0===n?void 0:n.name;return s&&"Object"!==s&&(a.constructor={name:s}),a},t.prototype._handleObject=function(t,r,e){return this._createCircularCandidate(t,r,e),Array.isArray(t)?this._handleArray(t):this._handlePlainObject(t)},t.prototype._ensureCircularReference=function(r){var e=this.circularCandidates.indexOf(r);if(e>-1){var n=this.circularCandidatesDescrs[e];return-1===n.refIdx&&(n.refIdx=n.parent?++this.circularRefCount:0),t._createRefMark(n.refIdx)}return null},t.prototype._handleValue=function(t,r,e){try{var n=t(),a=typeof n,o="object"===a&&null!==n;if(o){var i=this._ensureCircularReference(n);if(i)return i}var u=this._findTransform(a,n);return u?this._applyTransform(n,r,e,u):o?this._handleObject(n,r,e):n}catch(t){try{return this._handleValue((function(){return t instanceof Error?t:new Error(t)}),r,e)}catch(t){return null}}},t.prototype._makeTransformsMap=function(){if(o){var t=new Map;return this.transforms.forEach((function(r){r.lookup&&t.set(r.lookup,r)})),t}},t.prototype._findTransform=function(t,r){if(o&&r&&r.constructor&&(null==(a=this.transformsMap.get(r.constructor))?void 0:a.shouldTransform(t,r)))return a;for(var e=0,n=this.transforms;e<n.length;e++){var a;if((a=n[e]).shouldTransform(t,r))return a}},t.prototype.transform=function(){for(var r=this,e=[this._handleValue((function(){return r.references}),null,null)],n=0,a=this.circularCandidatesDescrs;n<a.length;n++){var o=a[n];o.refIdx>0&&(e[o.refIdx]=o.parent[o.key],o.parent[o.key]=t._createRefMark(o.refIdx))}return e},t}(),l=function(){function t(t,r){this.activeTransformsStack=[],this.visitedRefs=Object.create(null),this.references=t,this.transformMap=r}return t.prototype._handlePlainObject=function(t){var r=Object.create(null);for(var n in"constructor"in t&&(t.constructor&&"string"==typeof t.constructor.name||(t.constructor={name:"Object"})),t)t.hasOwnProperty(n)&&(this._handleValue(t[n],t,n),e.test(n)&&(r[n.substring(1)]=t[n],delete t[n]));for(var a in r)t[a]=r[a]},t.prototype._handleTransformedObject=function(t,e,n){var a=t[r],o=this.transformMap[a];if(!o)throw new Error("Can't find transform for \\""+a+'" type.');this.activeTransformsStack.push(t),this._handleValue(t.data,t,"data"),this.activeTransformsStack.pop(),e[n]=o.fromSerializable(t.data)},t.prototype._handleCircularSelfRefDuringTransform=function(t,r,e){var n=this.references;Object.defineProperty(r,e,{val:void 0,configurable:!0,enumerable:!0,get:function(){return void 0===this.val&&(this.val=n[t]),this.val},set:function(t){this.val=t}})},t.prototype._handleCircularRef=function(t,r,e){this.activeTransformsStack.includes(this.references[t])?this._handleCircularSelfRefDuringTransform(t,r,e):(this.visitedRefs[t]||(this.visitedRefs[t]=!0,this._handleValue(this.references[t],this.references,t)),r[e]=this.references[t])},t.prototype._handleValue=function(t,e,n){if("object"==typeof t&&null!==t){var a=t["@r"];if(void 0!==a)this._handleCircularRef(a,e,n);else if(t[r])this._handleTransformedObject(t,e,n);else if(Array.isArray(t))for(var o=0;o<t.length;o++)this._handleValue(t[o],t,o);else this._handlePlainObject(t)}},t.prototype.transform=function(){return this.visitedRefs[0]=!0,this._handleValue(this.references[0],this.references,0),this.references[0]},t}(),d=[{type:"[[NaN]]",shouldTransform:function(t,r){return"number"===t&&isNaN(r)},toSerializable:function(){return""},fromSerializable:function(){return NaN}},{type:"[[undefined]]",shouldTransform:function(t){return"undefined"===t},toSerializable:function(){return""},fromSerializable:function(){}},{type:"[[Date]]",lookup:Date,shouldTransform:function(t,r){return r instanceof Date},toSerializable:function(t){return t.getTime()},fromSerializable:function(t){var r=new Date;return r.setTime(t),r}},{type:"[[RegExp]]",lookup:RegExp,shouldTransform:function(t,r){return r instanceof RegExp},toSerializable:function(t){var r={src:t.source,flags:""};return t.globalThis&&(r.flags+="g"),t.ignoreCase&&(r.flags+="i"),t.multiline&&(r.flags+="m"),r},fromSerializable:function(t){return new RegExp(t.src,t.flags)}},{type:"[[Error]]",lookup:Error,shouldTransform:function(t,r){return r instanceof Error},toSerializable:function(t){var r,e;return t.stack||null===(e=(r=Error).captureStackTrace)||void 0===e||e.call(r,t),{name:t.name,message:t.message,stack:t.stack}},fromSerializable:function(t){var r=new(n[t.name]||Error)(t.message);return r.stack=t.stack,r}},{type:"[[ArrayBuffer]]",lookup:a&&ArrayBuffer,shouldTransform:function(t,r){return a&&r instanceof ArrayBuffer},toSerializable:function(t){var r=new Int8Array(t);return s.call(r)},fromSerializable:function(t){if(a){var r=new ArrayBuffer(t.length);return new Int8Array(r).set(t),r}return t}},{type:"[[TypedArray]]",shouldTransform:function(t,r){if(a)return ArrayBuffer.isView(r)&&!(r instanceof DataView);for(var e=0,o=u;e<o.length;e++){var i=o[e];if("function"==typeof n[i]&&r instanceof n[i])return!0}return!1},toSerializable:function(t){return{ctorName:t.constructor.name,arr:s.call(t)}},fromSerializable:function(t){return"function"==typeof n[t.ctorName]?new n[t.ctorName](t.arr):t.arr}},{type:"[[Map]]",lookup:o&&Map,shouldTransform:function(t,r){return o&&r instanceof Map},toSerializable:function(t){var r=[];return t.forEach((function(t,e){r.push(e),r.push(t)})),r},fromSerializable:function(t){if(o){for(var r=new Map,e=0;e<t.length;e+=2)r.set(t[e],t[e+1]);return r}for(var n=[],a=0;a<t.length;a+=2)n.push([t[e],t[e+1]]);return n}},{type:"[[Set]]",lookup:i&&Set,shouldTransform:function(t,r){return i&&r instanceof Set},toSerializable:function(t){var r=[];return t.forEach((function(t){r.push(t)})),r},fromSerializable:function(t){if(i){for(var r=new Set,e=0;e<t.length;e++)r.add(t[e]);return r}return t}}],p=function(){function t(t){this.transforms=[],this.transformsMap=Object.create(null),this.serializer=t||f,this.addTransforms(d)}return t.prototype.addTransforms=function(t){for(var r=0,e=t=Array.isArray(t)?t:[t];r<e.length;r++){var n=e[r];if(this.transformsMap[n.type])throw new Error('Transform with type "'+n.type+'" was already added.');this.transforms.push(n),this.transformsMap[n.type]=n}return this},t.prototype.removeTransforms=function(t){for(var r=0,e=t=Array.isArray(t)?t:[t];r<e.length;r++){var n=e[r],a=this.transforms.indexOf(n);a>-1&&this.transforms.splice(a,1),delete this.transformsMap[n.type]}return this},t.prototype.encode=function(t){var r=new c(t,this.transforms).transform();return this.serializer.serialize(r)},t.prototype.decode=function(t){var r=this.serializer.deserialize(t);return new l(r,this.transformsMap).transform()},t}();t.default=p}(z);var E=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};S.__esModule=!0,S.Decode=P=S.Encode=void 0;var k=E(O),C=E(w),D=E(A),I=E(j),N=E(z),R=[D.default,C.default,k.default,I.default],x=new N.default;x.addTransforms(R);var P=S.Encode=function(t){return JSON.parse(x.encode(t))};S.Decode=function(t){return x.decode(JSON.stringify(t))},function(r){var e=t&&t.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};r.__esModule=!0;var a=e(n),i=e(o),u=S;r.default=function(t,r,e){void 0===e&&(e=!0);for(var n=t,o={pointers:{},src:{npm:"https://npmjs.com/package/console-feed",github:"https://github.com/samdenty99/console-feed"}},s=function(t){var a=n[t];n[t]=function(){a.apply(this,arguments);var n=[].slice.call(arguments);setTimeout((function(){var a=i.default(t,n);if(a){var o=a;e&&(o=u.Encode(a)),r(o,a)}}))},o.pointers[t]=a},f=0,c=a.default;f<c.length;f++)s(c[f]);return n.feed=o,n}}(e),r(e)(window.console,(function(t){var r=P(t);parent.postMessage({type:"console",codesandbox:!0,log:Array.isArray(r)?r[0]:r,channelId:scope.channelId},"*")}));
`;
  }
});

// node_modules/@codesandbox/sandpack-client/dist/clients/node/index.mjs
var node_exports = {};
__export(node_exports, {
  SandpackNode: () => SandpackNode
});
function loadPreviewIframe(iframe, url) {
  return __awaiter(this, void 0, void 0, function() {
    var contentWindow, TIME_OUT, MAX_MANY_TIRES, tries, timeout;
    return __generator(this, function(_a2) {
      contentWindow = iframe.contentWindow;
      nullthrows(contentWindow, "Failed to await preview iframe: no content window found");
      TIME_OUT = 9e4;
      MAX_MANY_TIRES = 20;
      tries = 0;
      return [2, new Promise(function(resolve, reject) {
        var triesToSetUrl = function() {
          var onLoadPage = function() {
            clearTimeout(timeout);
            tries = MAX_MANY_TIRES;
            resolve();
            iframe.removeEventListener("load", onLoadPage);
          };
          if (tries >= MAX_MANY_TIRES) {
            reject(createError("Could not able to connect to preview."));
            return;
          }
          iframe.setAttribute("src", url);
          timeout = setTimeout(function() {
            triesToSetUrl();
            iframe.removeEventListener("load", onLoadPage);
          }, TIME_OUT);
          tries = tries + 1;
          iframe.addEventListener("load", onLoadPage);
        };
        iframe.addEventListener("error", function() {
          return reject(new Error("Iframe error"));
        });
        iframe.addEventListener("abort", function() {
          return reject(new Error("Aborted"));
        });
        triesToSetUrl();
      })];
    });
  });
}
function setupHistoryListeners(_a2) {
  var scope = _a2.scope;
  var origHistoryProto = window.history.__proto__;
  var historyList = [];
  var historyPosition = 0;
  var dispatchMessage = function(url) {
    parent.postMessage({
      type: "urlchange",
      url,
      back: historyPosition > 0,
      forward: historyPosition < historyList.length - 1,
      channelId: scope.channelId
    }, "*");
  };
  function pushHistory(url, state) {
    historyList.splice(historyPosition + 1);
    historyList.push({ url, state });
    historyPosition = historyList.length - 1;
  }
  Object.assign(window.history, {
    go: function(delta) {
      var newPos = historyPosition + delta;
      if (newPos >= 0 && newPos <= historyList.length - 1) {
        historyPosition = newPos;
        var _a3 = historyList[historyPosition], url = _a3.url, state = _a3.state;
        origHistoryProto.replaceState.call(window.history, state, "", url);
        var newURL = document.location.href;
        dispatchMessage(newURL);
        window.dispatchEvent(new PopStateEvent("popstate", { state }));
      }
    },
    back: function() {
      window.history.go(-1);
    },
    forward: function() {
      window.history.go(1);
    },
    pushState: function(state, title, url) {
      origHistoryProto.replaceState.call(window.history, state, title, url);
      pushHistory(url, state);
      dispatchMessage(document.location.href);
    },
    replaceState: function(state, title, url) {
      origHistoryProto.replaceState.call(window.history, state, title, url);
      historyList[historyPosition] = { state, url };
      dispatchMessage(document.location.href);
    }
  });
  function handleMessage(_a3) {
    var data = _a3.data;
    if (data.type === "urlback") {
      history.back();
    } else if (data.type === "urlforward") {
      history.forward();
    } else if (data.type === "refresh") {
      document.location.reload();
    }
  }
  window.addEventListener("message", handleMessage);
}
function watchResize(_a2) {
  var scope = _a2.scope;
  var lastHeight = 0;
  function getDocumentHeight() {
    if (typeof window === "undefined")
      return 0;
    var body = document.body;
    var html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight, html.offsetHeight);
  }
  function sendResizeEvent() {
    var height = getDocumentHeight();
    if (lastHeight !== height) {
      window.parent.postMessage({
        type: "resize",
        height,
        codesandbox: true,
        channelId: scope.channelId
      }, "*");
    }
    lastHeight = height;
  }
  sendResizeEvent();
  var throttle;
  var observer = new MutationObserver(function() {
    if (throttle === void 0) {
      sendResizeEvent();
      throttle = setTimeout(function() {
        throttle = void 0;
      }, 300);
    }
  });
  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  });
  setInterval(sendResizeEvent, 300);
}
var setPreviewIframeProperties, scripts, injectScriptToIframe, SandpackNode;
var init_node = __esm({
  "node_modules/@codesandbox/sandpack-client/dist/clients/node/index.mjs"() {
    init_utils_52664384();
    init_build();
    init_base_80a1f760();
    init_consoleHook_59e792cb();
    init_lib();
    init_dist();
    setPreviewIframeProperties = function(iframe, options) {
      iframe.style.border = "0";
      iframe.style.width = options.width || "100%";
      iframe.style.height = options.height || "100%";
      iframe.style.overflow = "hidden";
      iframe.allow = "cross-origin-isolated";
    };
    scripts = [
      { code: setupHistoryListeners.toString(), id: "historyListener" },
      {
        code: "function consoleHook({ scope }) {" + consoleHook + "\n};",
        id: "consoleHook"
      },
      { code: watchResize.toString(), id: "watchResize" }
    ];
    injectScriptToIframe = function(iframe, channelId) {
      scripts.forEach(function(_a2) {
        var _b;
        var code = _a2.code, id = _a2.id;
        var message = {
          uid: id,
          type: INJECT_MESSAGE_TYPE,
          code: "exports.activate = ".concat(code),
          scope: { channelId }
        };
        (_b = iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(message, "*");
      });
    };
    SandpackNode = /** @class */
    (function(_super) {
      __extends(SandpackNode2, _super);
      function SandpackNode2(selector, sandboxInfo, options) {
        if (options === void 0) {
          options = {};
        }
        var _this = _super.call(this, selector, sandboxInfo, __assign(__assign({}, options), { bundlerURL: options.bundlerURL })) || this;
        _this._modulesCache = /* @__PURE__ */ new Map();
        _this.messageChannelId = generateRandomId();
        _this._initPromise = null;
        _this.emitter = new EventEmitter();
        _this.manageIframes(selector);
        _this.emulator = new Nodebox({
          iframe: _this.emulatorIframe,
          runtimeUrl: _this.options.bundlerURL
        });
        _this.updateSandbox(sandboxInfo);
        return _this;
      }
      SandpackNode2.prototype._init = function(files) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, this.emulator.connect()];
              case 1:
                _a2.sent();
                return [4, this.emulator.fs.init(files)];
              case 2:
                _a2.sent();
                return [4, this.globalListeners()];
              case 3:
                _a2.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.compile = function(files) {
        return __awaiter(this, void 0, void 0, function() {
          var shellId, err_1;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                _a2.trys.push([0, 5, , 6]);
                this.status = "initializing";
                this.dispatch({ type: "start", firstLoad: true });
                if (!this._initPromise) {
                  this._initPromise = this._init(files);
                }
                return [4, this._initPromise];
              case 1:
                _a2.sent();
                this.dispatch({ type: "connected" });
                return [4, this.createShellProcessFromTask(files)];
              case 2:
                shellId = _a2.sent().id;
                return [4, this.createPreviewURLFromId(shellId)];
              case 3:
                _a2.sent();
                return [4, this.setLocationURLIntoIFrame()];
              case 4:
                _a2.sent();
                this.dispatchDoneMessage();
                return [3, 6];
              case 5:
                err_1 = _a2.sent();
                this.dispatch({
                  type: "action",
                  action: "notification",
                  notificationType: "error",
                  title: getMessageFromError(err_1)
                });
                this.dispatch({ type: "done", compilatonError: true });
                return [3, 6];
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.createShellProcessFromTask = function(files) {
        return __awaiter(this, void 0, void 0, function() {
          var packageJsonContent;
          var _a2;
          var _this = this;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                packageJsonContent = readBuffer(files["/package.json"]);
                this.emulatorCommand = findStartScriptPackageJson(packageJsonContent);
                this.emulatorShellProcess = this.emulator.shell.create();
                return [4, this.emulatorShellProcess.on("exit", function(exitCode) {
                  _this.dispatch({
                    type: "action",
                    action: "notification",
                    notificationType: "error",
                    title: createError("Error: process.exit(".concat(exitCode, ") called."))
                  });
                })];
              case 1:
                _b.sent();
                return [4, this.emulatorShellProcess.on("progress", function(data) {
                  var _a3, _b2;
                  if (data.state === "command_running" || data.state === "starting_command") {
                    _this.dispatch({
                      type: "shell/progress",
                      data: __assign(__assign({}, data), { command: [
                        (_a3 = _this.emulatorCommand) === null || _a3 === void 0 ? void 0 : _a3[0],
                        (_b2 = _this.emulatorCommand) === null || _b2 === void 0 ? void 0 : _b2[1].join(" ")
                      ].join(" ") })
                    });
                    _this.status = "installing-dependencies";
                    return;
                  }
                  _this.dispatch({ type: "shell/progress", data });
                })];
              case 2:
                _b.sent();
                this.emulatorShellProcess.stdout.on("data", function(data) {
                  _this.dispatch({ type: "stdout", payload: { data, type: "out" } });
                });
                this.emulatorShellProcess.stderr.on("data", function(data) {
                  _this.dispatch({ type: "stdout", payload: { data, type: "err" } });
                });
                return [4, (_a2 = this.emulatorShellProcess).runCommand.apply(_a2, this.emulatorCommand)];
              case 3:
                return [2, _b.sent()];
            }
          });
        });
      };
      SandpackNode2.prototype.createPreviewURLFromId = function(id) {
        var _a2;
        return __awaiter(this, void 0, void 0, function() {
          var url;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                this.iframePreviewUrl = void 0;
                return [4, this.emulator.preview.getByShellId(id)];
              case 1:
                url = _b.sent().url;
                this.iframePreviewUrl = url + ((_a2 = this.options.startRoute) !== null && _a2 !== void 0 ? _a2 : "");
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.manageIframes = function(selector) {
        var _a2;
        if (typeof selector === "string") {
          var element = document.querySelector(selector);
          nullthrows(element, "The element '".concat(selector, "' was not found"));
          this.iframe = document.createElement("iframe");
          element === null || element === void 0 ? void 0 : element.appendChild(this.iframe);
        } else {
          this.iframe = selector;
        }
        setPreviewIframeProperties(this.iframe, this.options);
        nullthrows(this.iframe.parentNode, "The given iframe does not have a parent.");
        this.emulatorIframe = document.createElement("iframe");
        this.emulatorIframe.classList.add("sp-bridge-frame");
        (_a2 = this.iframe.parentNode) === null || _a2 === void 0 ? void 0 : _a2.appendChild(this.emulatorIframe);
      };
      SandpackNode2.prototype.setLocationURLIntoIFrame = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                if (!this.iframePreviewUrl) return [3, 2];
                return [4, loadPreviewIframe(this.iframe, this.iframePreviewUrl)];
              case 1:
                _a2.sent();
                _a2.label = 2;
              case 2:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.dispatchDoneMessage = function() {
        this.status = "done";
        this.dispatch({ type: "done", compilatonError: false });
        if (this.iframePreviewUrl) {
          this.dispatch({
            type: "urlchange",
            url: this.iframePreviewUrl,
            back: false,
            forward: false
          });
        }
      };
      SandpackNode2.prototype.globalListeners = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                window.addEventListener("message", function(event) {
                  if (event.data.type === PREVIEW_LOADED_MESSAGE_TYPE) {
                    injectScriptToIframe(_this.iframe, _this.messageChannelId);
                  }
                  if (event.data.type === "urlchange" && event.data.channelId === _this.messageChannelId) {
                    _this.dispatch({
                      type: "urlchange",
                      url: event.data.url,
                      back: event.data.back,
                      forward: event.data.forward
                    });
                  } else if (event.data.channelId === _this.messageChannelId) {
                    _this.dispatch(event.data);
                  }
                });
                return [4, this.emulator.fs.watch(["*"], [
                  ".next",
                  "node_modules",
                  "build",
                  "dist",
                  "vendor",
                  ".config",
                  ".vuepress"
                ], function(message) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var event, path, type, _a3, content, newContent, err_2;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          if (!message)
                            return [
                              2
                              /*return*/
                            ];
                          event = message;
                          path = "newPath" in event ? event.newPath : "path" in event ? event.path : "";
                          return [4, this.emulator.fs.stat(path)];
                        case 1:
                          type = _b.sent().type;
                          if (type !== "file")
                            return [2, null];
                          _b.label = 2;
                        case 2:
                          _b.trys.push([2, 10, , 11]);
                          _a3 = event.type;
                          switch (_a3) {
                            case "change":
                              return [3, 3];
                            case "create":
                              return [3, 3];
                            case "remove":
                              return [3, 5];
                            case "rename":
                              return [3, 6];
                            case "close":
                              return [3, 8];
                          }
                          return [3, 9];
                        case 3:
                          return [4, this.emulator.fs.readFile(event.path, "utf8")];
                        case 4:
                          content = _b.sent();
                          this.dispatch({
                            type: "fs/change",
                            path: event.path,
                            content
                          });
                          this._modulesCache.set(event.path, writeBuffer(content));
                          return [3, 9];
                        case 5:
                          this.dispatch({
                            type: "fs/remove",
                            path: event.path
                          });
                          this._modulesCache.delete(event.path);
                          return [3, 9];
                        case 6:
                          this.dispatch({
                            type: "fs/remove",
                            path: event.oldPath
                          });
                          this._modulesCache.delete(event.oldPath);
                          return [4, this.emulator.fs.readFile(event.newPath, "utf8")];
                        case 7:
                          newContent = _b.sent();
                          this.dispatch({
                            type: "fs/change",
                            path: event.newPath,
                            content: newContent
                          });
                          this._modulesCache.set(event.newPath, writeBuffer(newContent));
                          return [3, 9];
                        case 8:
                          return [3, 9];
                        case 9:
                          return [3, 11];
                        case 10:
                          err_2 = _b.sent();
                          this.dispatch({
                            type: "action",
                            action: "notification",
                            notificationType: "error",
                            title: getMessageFromError(err_2)
                          });
                          return [3, 11];
                        case 11:
                          return [
                            2
                            /*return*/
                          ];
                      }
                    });
                  });
                })];
              case 1:
                _a2.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.restartShellProcess = function() {
        var _a2;
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                if (!(this.emulatorShellProcess && this.emulatorCommand)) return [3, 3];
                this.dispatch({ type: "start", firstLoad: true });
                this.status = "initializing";
                return [4, this.emulatorShellProcess.kill()];
              case 1:
                _b.sent();
                (_a2 = this.iframe) === null || _a2 === void 0 ? void 0 : _a2.removeAttribute("attr");
                this.emulator.fs.rm("/node_modules/.vite", {
                  recursive: true,
                  force: true
                });
                return [4, this.compile(Object.fromEntries(this._modulesCache))];
              case 2:
                _b.sent();
                _b.label = 3;
              case 3:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.updateSandbox = function(setup) {
        var _this = this;
        var _a2;
        var modules = fromBundlerFilesToFS(setup.files);
        if (((_a2 = this.emulatorShellProcess) === null || _a2 === void 0 ? void 0 : _a2.state) === "running") {
          Object.entries(modules).forEach(function(_a3) {
            var key = _a3[0], value = _a3[1];
            if (!_this._modulesCache.get(key) || readBuffer(value) !== readBuffer(_this._modulesCache.get(key))) {
              _this.emulator.fs.writeFile(key, value, { recursive: true });
            }
          });
          return;
        }
        this.dispatch({
          codesandbox: true,
          modules,
          template: setup.template,
          type: "compile"
        });
        Object.entries(modules).forEach(function(_a3) {
          var key = _a3[0], value = _a3[1];
          _this._modulesCache.set(key, writeBuffer(value));
        });
      };
      SandpackNode2.prototype.dispatch = function(message) {
        var _a2, _b;
        return __awaiter(this, void 0, void 0, function() {
          var _c;
          return __generator(this, function(_d) {
            switch (_d.label) {
              case 0:
                _c = message.type;
                switch (_c) {
                  case "compile":
                    return [3, 1];
                  case "refresh":
                    return [3, 2];
                  case "urlback":
                    return [3, 4];
                  case "urlforward":
                    return [3, 4];
                  case "shell/restart":
                    return [3, 5];
                  case "shell/openPreview":
                    return [3, 6];
                }
                return [3, 7];
              case 1:
                this.compile(message.modules);
                return [3, 8];
              case 2:
                return [4, this.setLocationURLIntoIFrame()];
              case 3:
                _d.sent();
                return [3, 8];
              case 4:
                (_b = (_a2 = this.iframe) === null || _a2 === void 0 ? void 0 : _a2.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(message, "*");
                return [3, 8];
              case 5:
                this.restartShellProcess();
                return [3, 8];
              case 6:
                window.open(this.iframePreviewUrl, "_blank");
                return [3, 8];
              case 7:
                this.emitter.dispatch(message);
                _d.label = 8;
              case 8:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackNode2.prototype.listen = function(listener) {
        return this.emitter.listener(listener);
      };
      SandpackNode2.prototype.destroy = function() {
        this.emulatorIframe.remove();
        this.emitter.cleanup();
      };
      return SandpackNode2;
    })(SandpackClient);
  }
});

// node_modules/static-browser-server/out/lib/main.js
var require_main = __commonJS({
  "node_modules/static-browser-server/out/lib/main.js"(exports, module) {
    "use strict";
    var __create3 = Object.create;
    var __defProp3 = Object.defineProperty;
    var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __getProtoOf3 = Object.getPrototypeOf;
    var __hasOwnProp3 = Object.prototype.hasOwnProperty;
    var __commonJS3 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp3(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps3 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames3(from))
          if (!__hasOwnProp3.call(to, key) && key !== except)
            __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM3 = (mod, isNodeMode, target) => (target = mod != null ? __create3(__getProtoOf3(mod)) : {}, __copyProps3(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp3(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps3(__defProp3({}, "__esModule", { value: true }), mod);
    var require_db2 = __commonJS3({
      "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json"(exports2, module2) {
        module2.exports = {
          "application/1d-interleaved-parityfec": {
            source: "iana"
          },
          "application/3gpdash-qoe-report+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/3gpp-ims+xml": {
            source: "iana",
            compressible: true
          },
          "application/3gpphal+json": {
            source: "iana",
            compressible: true
          },
          "application/3gpphalforms+json": {
            source: "iana",
            compressible: true
          },
          "application/a2l": {
            source: "iana"
          },
          "application/ace+cbor": {
            source: "iana"
          },
          "application/activemessage": {
            source: "iana"
          },
          "application/activity+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-costmap+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-costmapfilter+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-directory+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-endpointcost+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-endpointcostparams+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-endpointprop+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-endpointpropparams+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-error+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-networkmap+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-networkmapfilter+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-updatestreamcontrol+json": {
            source: "iana",
            compressible: true
          },
          "application/alto-updatestreamparams+json": {
            source: "iana",
            compressible: true
          },
          "application/aml": {
            source: "iana"
          },
          "application/andrew-inset": {
            source: "iana",
            extensions: ["ez"]
          },
          "application/applefile": {
            source: "iana"
          },
          "application/applixware": {
            source: "apache",
            extensions: ["aw"]
          },
          "application/at+jwt": {
            source: "iana"
          },
          "application/atf": {
            source: "iana"
          },
          "application/atfx": {
            source: "iana"
          },
          "application/atom+xml": {
            source: "iana",
            compressible: true,
            extensions: ["atom"]
          },
          "application/atomcat+xml": {
            source: "iana",
            compressible: true,
            extensions: ["atomcat"]
          },
          "application/atomdeleted+xml": {
            source: "iana",
            compressible: true,
            extensions: ["atomdeleted"]
          },
          "application/atomicmail": {
            source: "iana"
          },
          "application/atomsvc+xml": {
            source: "iana",
            compressible: true,
            extensions: ["atomsvc"]
          },
          "application/atsc-dwd+xml": {
            source: "iana",
            compressible: true,
            extensions: ["dwd"]
          },
          "application/atsc-dynamic-event-message": {
            source: "iana"
          },
          "application/atsc-held+xml": {
            source: "iana",
            compressible: true,
            extensions: ["held"]
          },
          "application/atsc-rdt+json": {
            source: "iana",
            compressible: true
          },
          "application/atsc-rsat+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rsat"]
          },
          "application/atxml": {
            source: "iana"
          },
          "application/auth-policy+xml": {
            source: "iana",
            compressible: true
          },
          "application/bacnet-xdd+zip": {
            source: "iana",
            compressible: false
          },
          "application/batch-smtp": {
            source: "iana"
          },
          "application/bdoc": {
            compressible: false,
            extensions: ["bdoc"]
          },
          "application/beep+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/calendar+json": {
            source: "iana",
            compressible: true
          },
          "application/calendar+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xcs"]
          },
          "application/call-completion": {
            source: "iana"
          },
          "application/cals-1840": {
            source: "iana"
          },
          "application/captive+json": {
            source: "iana",
            compressible: true
          },
          "application/cbor": {
            source: "iana"
          },
          "application/cbor-seq": {
            source: "iana"
          },
          "application/cccex": {
            source: "iana"
          },
          "application/ccmp+xml": {
            source: "iana",
            compressible: true
          },
          "application/ccxml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["ccxml"]
          },
          "application/cdfx+xml": {
            source: "iana",
            compressible: true,
            extensions: ["cdfx"]
          },
          "application/cdmi-capability": {
            source: "iana",
            extensions: ["cdmia"]
          },
          "application/cdmi-container": {
            source: "iana",
            extensions: ["cdmic"]
          },
          "application/cdmi-domain": {
            source: "iana",
            extensions: ["cdmid"]
          },
          "application/cdmi-object": {
            source: "iana",
            extensions: ["cdmio"]
          },
          "application/cdmi-queue": {
            source: "iana",
            extensions: ["cdmiq"]
          },
          "application/cdni": {
            source: "iana"
          },
          "application/cea": {
            source: "iana"
          },
          "application/cea-2018+xml": {
            source: "iana",
            compressible: true
          },
          "application/cellml+xml": {
            source: "iana",
            compressible: true
          },
          "application/cfw": {
            source: "iana"
          },
          "application/city+json": {
            source: "iana",
            compressible: true
          },
          "application/clr": {
            source: "iana"
          },
          "application/clue+xml": {
            source: "iana",
            compressible: true
          },
          "application/clue_info+xml": {
            source: "iana",
            compressible: true
          },
          "application/cms": {
            source: "iana"
          },
          "application/cnrp+xml": {
            source: "iana",
            compressible: true
          },
          "application/coap-group+json": {
            source: "iana",
            compressible: true
          },
          "application/coap-payload": {
            source: "iana"
          },
          "application/commonground": {
            source: "iana"
          },
          "application/conference-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/cose": {
            source: "iana"
          },
          "application/cose-key": {
            source: "iana"
          },
          "application/cose-key-set": {
            source: "iana"
          },
          "application/cpl+xml": {
            source: "iana",
            compressible: true,
            extensions: ["cpl"]
          },
          "application/csrattrs": {
            source: "iana"
          },
          "application/csta+xml": {
            source: "iana",
            compressible: true
          },
          "application/cstadata+xml": {
            source: "iana",
            compressible: true
          },
          "application/csvm+json": {
            source: "iana",
            compressible: true
          },
          "application/cu-seeme": {
            source: "apache",
            extensions: ["cu"]
          },
          "application/cwt": {
            source: "iana"
          },
          "application/cybercash": {
            source: "iana"
          },
          "application/dart": {
            compressible: true
          },
          "application/dash+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mpd"]
          },
          "application/dash-patch+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mpp"]
          },
          "application/dashdelta": {
            source: "iana"
          },
          "application/davmount+xml": {
            source: "iana",
            compressible: true,
            extensions: ["davmount"]
          },
          "application/dca-rft": {
            source: "iana"
          },
          "application/dcd": {
            source: "iana"
          },
          "application/dec-dx": {
            source: "iana"
          },
          "application/dialog-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/dicom": {
            source: "iana"
          },
          "application/dicom+json": {
            source: "iana",
            compressible: true
          },
          "application/dicom+xml": {
            source: "iana",
            compressible: true
          },
          "application/dii": {
            source: "iana"
          },
          "application/dit": {
            source: "iana"
          },
          "application/dns": {
            source: "iana"
          },
          "application/dns+json": {
            source: "iana",
            compressible: true
          },
          "application/dns-message": {
            source: "iana"
          },
          "application/docbook+xml": {
            source: "apache",
            compressible: true,
            extensions: ["dbk"]
          },
          "application/dots+cbor": {
            source: "iana"
          },
          "application/dskpp+xml": {
            source: "iana",
            compressible: true
          },
          "application/dssc+der": {
            source: "iana",
            extensions: ["dssc"]
          },
          "application/dssc+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xdssc"]
          },
          "application/dvcs": {
            source: "iana"
          },
          "application/ecmascript": {
            source: "iana",
            compressible: true,
            extensions: ["es", "ecma"]
          },
          "application/edi-consent": {
            source: "iana"
          },
          "application/edi-x12": {
            source: "iana",
            compressible: false
          },
          "application/edifact": {
            source: "iana",
            compressible: false
          },
          "application/efi": {
            source: "iana"
          },
          "application/elm+json": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/elm+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.cap+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/emergencycalldata.comment+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.control+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.deviceinfo+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.ecall.msd": {
            source: "iana"
          },
          "application/emergencycalldata.providerinfo+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.serviceinfo+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.subscriberinfo+xml": {
            source: "iana",
            compressible: true
          },
          "application/emergencycalldata.veds+xml": {
            source: "iana",
            compressible: true
          },
          "application/emma+xml": {
            source: "iana",
            compressible: true,
            extensions: ["emma"]
          },
          "application/emotionml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["emotionml"]
          },
          "application/encaprtp": {
            source: "iana"
          },
          "application/epp+xml": {
            source: "iana",
            compressible: true
          },
          "application/epub+zip": {
            source: "iana",
            compressible: false,
            extensions: ["epub"]
          },
          "application/eshop": {
            source: "iana"
          },
          "application/exi": {
            source: "iana",
            extensions: ["exi"]
          },
          "application/expect-ct-report+json": {
            source: "iana",
            compressible: true
          },
          "application/express": {
            source: "iana",
            extensions: ["exp"]
          },
          "application/fastinfoset": {
            source: "iana"
          },
          "application/fastsoap": {
            source: "iana"
          },
          "application/fdt+xml": {
            source: "iana",
            compressible: true,
            extensions: ["fdt"]
          },
          "application/fhir+json": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/fhir+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/fido.trusted-apps+json": {
            compressible: true
          },
          "application/fits": {
            source: "iana"
          },
          "application/flexfec": {
            source: "iana"
          },
          "application/font-sfnt": {
            source: "iana"
          },
          "application/font-tdpfr": {
            source: "iana",
            extensions: ["pfr"]
          },
          "application/font-woff": {
            source: "iana",
            compressible: false
          },
          "application/framework-attributes+xml": {
            source: "iana",
            compressible: true
          },
          "application/geo+json": {
            source: "iana",
            compressible: true,
            extensions: ["geojson"]
          },
          "application/geo+json-seq": {
            source: "iana"
          },
          "application/geopackage+sqlite3": {
            source: "iana"
          },
          "application/geoxacml+xml": {
            source: "iana",
            compressible: true
          },
          "application/gltf-buffer": {
            source: "iana"
          },
          "application/gml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["gml"]
          },
          "application/gpx+xml": {
            source: "apache",
            compressible: true,
            extensions: ["gpx"]
          },
          "application/gxf": {
            source: "apache",
            extensions: ["gxf"]
          },
          "application/gzip": {
            source: "iana",
            compressible: false,
            extensions: ["gz"]
          },
          "application/h224": {
            source: "iana"
          },
          "application/held+xml": {
            source: "iana",
            compressible: true
          },
          "application/hjson": {
            extensions: ["hjson"]
          },
          "application/http": {
            source: "iana"
          },
          "application/hyperstudio": {
            source: "iana",
            extensions: ["stk"]
          },
          "application/ibe-key-request+xml": {
            source: "iana",
            compressible: true
          },
          "application/ibe-pkg-reply+xml": {
            source: "iana",
            compressible: true
          },
          "application/ibe-pp-data": {
            source: "iana"
          },
          "application/iges": {
            source: "iana"
          },
          "application/im-iscomposing+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/index": {
            source: "iana"
          },
          "application/index.cmd": {
            source: "iana"
          },
          "application/index.obj": {
            source: "iana"
          },
          "application/index.response": {
            source: "iana"
          },
          "application/index.vnd": {
            source: "iana"
          },
          "application/inkml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["ink", "inkml"]
          },
          "application/iotp": {
            source: "iana"
          },
          "application/ipfix": {
            source: "iana",
            extensions: ["ipfix"]
          },
          "application/ipp": {
            source: "iana"
          },
          "application/isup": {
            source: "iana"
          },
          "application/its+xml": {
            source: "iana",
            compressible: true,
            extensions: ["its"]
          },
          "application/java-archive": {
            source: "apache",
            compressible: false,
            extensions: ["jar", "war", "ear"]
          },
          "application/java-serialized-object": {
            source: "apache",
            compressible: false,
            extensions: ["ser"]
          },
          "application/java-vm": {
            source: "apache",
            compressible: false,
            extensions: ["class"]
          },
          "application/javascript": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["js", "mjs"]
          },
          "application/jf2feed+json": {
            source: "iana",
            compressible: true
          },
          "application/jose": {
            source: "iana"
          },
          "application/jose+json": {
            source: "iana",
            compressible: true
          },
          "application/jrd+json": {
            source: "iana",
            compressible: true
          },
          "application/jscalendar+json": {
            source: "iana",
            compressible: true
          },
          "application/json": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["json", "map"]
          },
          "application/json-patch+json": {
            source: "iana",
            compressible: true
          },
          "application/json-seq": {
            source: "iana"
          },
          "application/json5": {
            extensions: ["json5"]
          },
          "application/jsonml+json": {
            source: "apache",
            compressible: true,
            extensions: ["jsonml"]
          },
          "application/jwk+json": {
            source: "iana",
            compressible: true
          },
          "application/jwk-set+json": {
            source: "iana",
            compressible: true
          },
          "application/jwt": {
            source: "iana"
          },
          "application/kpml-request+xml": {
            source: "iana",
            compressible: true
          },
          "application/kpml-response+xml": {
            source: "iana",
            compressible: true
          },
          "application/ld+json": {
            source: "iana",
            compressible: true,
            extensions: ["jsonld"]
          },
          "application/lgr+xml": {
            source: "iana",
            compressible: true,
            extensions: ["lgr"]
          },
          "application/link-format": {
            source: "iana"
          },
          "application/load-control+xml": {
            source: "iana",
            compressible: true
          },
          "application/lost+xml": {
            source: "iana",
            compressible: true,
            extensions: ["lostxml"]
          },
          "application/lostsync+xml": {
            source: "iana",
            compressible: true
          },
          "application/lpf+zip": {
            source: "iana",
            compressible: false
          },
          "application/lxf": {
            source: "iana"
          },
          "application/mac-binhex40": {
            source: "iana",
            extensions: ["hqx"]
          },
          "application/mac-compactpro": {
            source: "apache",
            extensions: ["cpt"]
          },
          "application/macwriteii": {
            source: "iana"
          },
          "application/mads+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mads"]
          },
          "application/manifest+json": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["webmanifest"]
          },
          "application/marc": {
            source: "iana",
            extensions: ["mrc"]
          },
          "application/marcxml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mrcx"]
          },
          "application/mathematica": {
            source: "iana",
            extensions: ["ma", "nb", "mb"]
          },
          "application/mathml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mathml"]
          },
          "application/mathml-content+xml": {
            source: "iana",
            compressible: true
          },
          "application/mathml-presentation+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-associated-procedure-description+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-deregister+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-envelope+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-msk+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-msk-response+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-protection-description+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-reception-report+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-register+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-register-response+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-schedule+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbms-user-service-description+xml": {
            source: "iana",
            compressible: true
          },
          "application/mbox": {
            source: "iana",
            extensions: ["mbox"]
          },
          "application/media-policy-dataset+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mpf"]
          },
          "application/media_control+xml": {
            source: "iana",
            compressible: true
          },
          "application/mediaservercontrol+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mscml"]
          },
          "application/merge-patch+json": {
            source: "iana",
            compressible: true
          },
          "application/metalink+xml": {
            source: "apache",
            compressible: true,
            extensions: ["metalink"]
          },
          "application/metalink4+xml": {
            source: "iana",
            compressible: true,
            extensions: ["meta4"]
          },
          "application/mets+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mets"]
          },
          "application/mf4": {
            source: "iana"
          },
          "application/mikey": {
            source: "iana"
          },
          "application/mipc": {
            source: "iana"
          },
          "application/missing-blocks+cbor-seq": {
            source: "iana"
          },
          "application/mmt-aei+xml": {
            source: "iana",
            compressible: true,
            extensions: ["maei"]
          },
          "application/mmt-usd+xml": {
            source: "iana",
            compressible: true,
            extensions: ["musd"]
          },
          "application/mods+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mods"]
          },
          "application/moss-keys": {
            source: "iana"
          },
          "application/moss-signature": {
            source: "iana"
          },
          "application/mosskey-data": {
            source: "iana"
          },
          "application/mosskey-request": {
            source: "iana"
          },
          "application/mp21": {
            source: "iana",
            extensions: ["m21", "mp21"]
          },
          "application/mp4": {
            source: "iana",
            extensions: ["mp4s", "m4p"]
          },
          "application/mpeg4-generic": {
            source: "iana"
          },
          "application/mpeg4-iod": {
            source: "iana"
          },
          "application/mpeg4-iod-xmt": {
            source: "iana"
          },
          "application/mrb-consumer+xml": {
            source: "iana",
            compressible: true
          },
          "application/mrb-publish+xml": {
            source: "iana",
            compressible: true
          },
          "application/msc-ivr+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/msc-mixer+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/msword": {
            source: "iana",
            compressible: false,
            extensions: ["doc", "dot"]
          },
          "application/mud+json": {
            source: "iana",
            compressible: true
          },
          "application/multipart-core": {
            source: "iana"
          },
          "application/mxf": {
            source: "iana",
            extensions: ["mxf"]
          },
          "application/n-quads": {
            source: "iana",
            extensions: ["nq"]
          },
          "application/n-triples": {
            source: "iana",
            extensions: ["nt"]
          },
          "application/nasdata": {
            source: "iana"
          },
          "application/news-checkgroups": {
            source: "iana",
            charset: "US-ASCII"
          },
          "application/news-groupinfo": {
            source: "iana",
            charset: "US-ASCII"
          },
          "application/news-transmission": {
            source: "iana"
          },
          "application/nlsml+xml": {
            source: "iana",
            compressible: true
          },
          "application/node": {
            source: "iana",
            extensions: ["cjs"]
          },
          "application/nss": {
            source: "iana"
          },
          "application/oauth-authz-req+jwt": {
            source: "iana"
          },
          "application/oblivious-dns-message": {
            source: "iana"
          },
          "application/ocsp-request": {
            source: "iana"
          },
          "application/ocsp-response": {
            source: "iana"
          },
          "application/octet-stream": {
            source: "iana",
            compressible: false,
            extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
          },
          "application/oda": {
            source: "iana",
            extensions: ["oda"]
          },
          "application/odm+xml": {
            source: "iana",
            compressible: true
          },
          "application/odx": {
            source: "iana"
          },
          "application/oebps-package+xml": {
            source: "iana",
            compressible: true,
            extensions: ["opf"]
          },
          "application/ogg": {
            source: "iana",
            compressible: false,
            extensions: ["ogx"]
          },
          "application/omdoc+xml": {
            source: "apache",
            compressible: true,
            extensions: ["omdoc"]
          },
          "application/onenote": {
            source: "apache",
            extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
          },
          "application/opc-nodeset+xml": {
            source: "iana",
            compressible: true
          },
          "application/oscore": {
            source: "iana"
          },
          "application/oxps": {
            source: "iana",
            extensions: ["oxps"]
          },
          "application/p21": {
            source: "iana"
          },
          "application/p21+zip": {
            source: "iana",
            compressible: false
          },
          "application/p2p-overlay+xml": {
            source: "iana",
            compressible: true,
            extensions: ["relo"]
          },
          "application/parityfec": {
            source: "iana"
          },
          "application/passport": {
            source: "iana"
          },
          "application/patch-ops-error+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xer"]
          },
          "application/pdf": {
            source: "iana",
            compressible: false,
            extensions: ["pdf"]
          },
          "application/pdx": {
            source: "iana"
          },
          "application/pem-certificate-chain": {
            source: "iana"
          },
          "application/pgp-encrypted": {
            source: "iana",
            compressible: false,
            extensions: ["pgp"]
          },
          "application/pgp-keys": {
            source: "iana",
            extensions: ["asc"]
          },
          "application/pgp-signature": {
            source: "iana",
            extensions: ["asc", "sig"]
          },
          "application/pics-rules": {
            source: "apache",
            extensions: ["prf"]
          },
          "application/pidf+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/pidf-diff+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/pkcs10": {
            source: "iana",
            extensions: ["p10"]
          },
          "application/pkcs12": {
            source: "iana"
          },
          "application/pkcs7-mime": {
            source: "iana",
            extensions: ["p7m", "p7c"]
          },
          "application/pkcs7-signature": {
            source: "iana",
            extensions: ["p7s"]
          },
          "application/pkcs8": {
            source: "iana",
            extensions: ["p8"]
          },
          "application/pkcs8-encrypted": {
            source: "iana"
          },
          "application/pkix-attr-cert": {
            source: "iana",
            extensions: ["ac"]
          },
          "application/pkix-cert": {
            source: "iana",
            extensions: ["cer"]
          },
          "application/pkix-crl": {
            source: "iana",
            extensions: ["crl"]
          },
          "application/pkix-pkipath": {
            source: "iana",
            extensions: ["pkipath"]
          },
          "application/pkixcmp": {
            source: "iana",
            extensions: ["pki"]
          },
          "application/pls+xml": {
            source: "iana",
            compressible: true,
            extensions: ["pls"]
          },
          "application/poc-settings+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/postscript": {
            source: "iana",
            compressible: true,
            extensions: ["ai", "eps", "ps"]
          },
          "application/ppsp-tracker+json": {
            source: "iana",
            compressible: true
          },
          "application/problem+json": {
            source: "iana",
            compressible: true
          },
          "application/problem+xml": {
            source: "iana",
            compressible: true
          },
          "application/provenance+xml": {
            source: "iana",
            compressible: true,
            extensions: ["provx"]
          },
          "application/prs.alvestrand.titrax-sheet": {
            source: "iana"
          },
          "application/prs.cww": {
            source: "iana",
            extensions: ["cww"]
          },
          "application/prs.cyn": {
            source: "iana",
            charset: "7-BIT"
          },
          "application/prs.hpub+zip": {
            source: "iana",
            compressible: false
          },
          "application/prs.nprend": {
            source: "iana"
          },
          "application/prs.plucker": {
            source: "iana"
          },
          "application/prs.rdf-xml-crypt": {
            source: "iana"
          },
          "application/prs.xsf+xml": {
            source: "iana",
            compressible: true
          },
          "application/pskc+xml": {
            source: "iana",
            compressible: true,
            extensions: ["pskcxml"]
          },
          "application/pvd+json": {
            source: "iana",
            compressible: true
          },
          "application/qsig": {
            source: "iana"
          },
          "application/raml+yaml": {
            compressible: true,
            extensions: ["raml"]
          },
          "application/raptorfec": {
            source: "iana"
          },
          "application/rdap+json": {
            source: "iana",
            compressible: true
          },
          "application/rdf+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rdf", "owl"]
          },
          "application/reginfo+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rif"]
          },
          "application/relax-ng-compact-syntax": {
            source: "iana",
            extensions: ["rnc"]
          },
          "application/remote-printing": {
            source: "iana"
          },
          "application/reputon+json": {
            source: "iana",
            compressible: true
          },
          "application/resource-lists+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rl"]
          },
          "application/resource-lists-diff+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rld"]
          },
          "application/rfc+xml": {
            source: "iana",
            compressible: true
          },
          "application/riscos": {
            source: "iana"
          },
          "application/rlmi+xml": {
            source: "iana",
            compressible: true
          },
          "application/rls-services+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rs"]
          },
          "application/route-apd+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rapd"]
          },
          "application/route-s-tsid+xml": {
            source: "iana",
            compressible: true,
            extensions: ["sls"]
          },
          "application/route-usd+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rusd"]
          },
          "application/rpki-ghostbusters": {
            source: "iana",
            extensions: ["gbr"]
          },
          "application/rpki-manifest": {
            source: "iana",
            extensions: ["mft"]
          },
          "application/rpki-publication": {
            source: "iana"
          },
          "application/rpki-roa": {
            source: "iana",
            extensions: ["roa"]
          },
          "application/rpki-updown": {
            source: "iana"
          },
          "application/rsd+xml": {
            source: "apache",
            compressible: true,
            extensions: ["rsd"]
          },
          "application/rss+xml": {
            source: "apache",
            compressible: true,
            extensions: ["rss"]
          },
          "application/rtf": {
            source: "iana",
            compressible: true,
            extensions: ["rtf"]
          },
          "application/rtploopback": {
            source: "iana"
          },
          "application/rtx": {
            source: "iana"
          },
          "application/samlassertion+xml": {
            source: "iana",
            compressible: true
          },
          "application/samlmetadata+xml": {
            source: "iana",
            compressible: true
          },
          "application/sarif+json": {
            source: "iana",
            compressible: true
          },
          "application/sarif-external-properties+json": {
            source: "iana",
            compressible: true
          },
          "application/sbe": {
            source: "iana"
          },
          "application/sbml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["sbml"]
          },
          "application/scaip+xml": {
            source: "iana",
            compressible: true
          },
          "application/scim+json": {
            source: "iana",
            compressible: true
          },
          "application/scvp-cv-request": {
            source: "iana",
            extensions: ["scq"]
          },
          "application/scvp-cv-response": {
            source: "iana",
            extensions: ["scs"]
          },
          "application/scvp-vp-request": {
            source: "iana",
            extensions: ["spq"]
          },
          "application/scvp-vp-response": {
            source: "iana",
            extensions: ["spp"]
          },
          "application/sdp": {
            source: "iana",
            extensions: ["sdp"]
          },
          "application/secevent+jwt": {
            source: "iana"
          },
          "application/senml+cbor": {
            source: "iana"
          },
          "application/senml+json": {
            source: "iana",
            compressible: true
          },
          "application/senml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["senmlx"]
          },
          "application/senml-etch+cbor": {
            source: "iana"
          },
          "application/senml-etch+json": {
            source: "iana",
            compressible: true
          },
          "application/senml-exi": {
            source: "iana"
          },
          "application/sensml+cbor": {
            source: "iana"
          },
          "application/sensml+json": {
            source: "iana",
            compressible: true
          },
          "application/sensml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["sensmlx"]
          },
          "application/sensml-exi": {
            source: "iana"
          },
          "application/sep+xml": {
            source: "iana",
            compressible: true
          },
          "application/sep-exi": {
            source: "iana"
          },
          "application/session-info": {
            source: "iana"
          },
          "application/set-payment": {
            source: "iana"
          },
          "application/set-payment-initiation": {
            source: "iana",
            extensions: ["setpay"]
          },
          "application/set-registration": {
            source: "iana"
          },
          "application/set-registration-initiation": {
            source: "iana",
            extensions: ["setreg"]
          },
          "application/sgml": {
            source: "iana"
          },
          "application/sgml-open-catalog": {
            source: "iana"
          },
          "application/shf+xml": {
            source: "iana",
            compressible: true,
            extensions: ["shf"]
          },
          "application/sieve": {
            source: "iana",
            extensions: ["siv", "sieve"]
          },
          "application/simple-filter+xml": {
            source: "iana",
            compressible: true
          },
          "application/simple-message-summary": {
            source: "iana"
          },
          "application/simplesymbolcontainer": {
            source: "iana"
          },
          "application/sipc": {
            source: "iana"
          },
          "application/slate": {
            source: "iana"
          },
          "application/smil": {
            source: "iana"
          },
          "application/smil+xml": {
            source: "iana",
            compressible: true,
            extensions: ["smi", "smil"]
          },
          "application/smpte336m": {
            source: "iana"
          },
          "application/soap+fastinfoset": {
            source: "iana"
          },
          "application/soap+xml": {
            source: "iana",
            compressible: true
          },
          "application/sparql-query": {
            source: "iana",
            extensions: ["rq"]
          },
          "application/sparql-results+xml": {
            source: "iana",
            compressible: true,
            extensions: ["srx"]
          },
          "application/spdx+json": {
            source: "iana",
            compressible: true
          },
          "application/spirits-event+xml": {
            source: "iana",
            compressible: true
          },
          "application/sql": {
            source: "iana"
          },
          "application/srgs": {
            source: "iana",
            extensions: ["gram"]
          },
          "application/srgs+xml": {
            source: "iana",
            compressible: true,
            extensions: ["grxml"]
          },
          "application/sru+xml": {
            source: "iana",
            compressible: true,
            extensions: ["sru"]
          },
          "application/ssdl+xml": {
            source: "apache",
            compressible: true,
            extensions: ["ssdl"]
          },
          "application/ssml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["ssml"]
          },
          "application/stix+json": {
            source: "iana",
            compressible: true
          },
          "application/swid+xml": {
            source: "iana",
            compressible: true,
            extensions: ["swidtag"]
          },
          "application/tamp-apex-update": {
            source: "iana"
          },
          "application/tamp-apex-update-confirm": {
            source: "iana"
          },
          "application/tamp-community-update": {
            source: "iana"
          },
          "application/tamp-community-update-confirm": {
            source: "iana"
          },
          "application/tamp-error": {
            source: "iana"
          },
          "application/tamp-sequence-adjust": {
            source: "iana"
          },
          "application/tamp-sequence-adjust-confirm": {
            source: "iana"
          },
          "application/tamp-status-query": {
            source: "iana"
          },
          "application/tamp-status-response": {
            source: "iana"
          },
          "application/tamp-update": {
            source: "iana"
          },
          "application/tamp-update-confirm": {
            source: "iana"
          },
          "application/tar": {
            compressible: true
          },
          "application/taxii+json": {
            source: "iana",
            compressible: true
          },
          "application/td+json": {
            source: "iana",
            compressible: true
          },
          "application/tei+xml": {
            source: "iana",
            compressible: true,
            extensions: ["tei", "teicorpus"]
          },
          "application/tetra_isi": {
            source: "iana"
          },
          "application/thraud+xml": {
            source: "iana",
            compressible: true,
            extensions: ["tfi"]
          },
          "application/timestamp-query": {
            source: "iana"
          },
          "application/timestamp-reply": {
            source: "iana"
          },
          "application/timestamped-data": {
            source: "iana",
            extensions: ["tsd"]
          },
          "application/tlsrpt+gzip": {
            source: "iana"
          },
          "application/tlsrpt+json": {
            source: "iana",
            compressible: true
          },
          "application/tnauthlist": {
            source: "iana"
          },
          "application/token-introspection+jwt": {
            source: "iana"
          },
          "application/toml": {
            compressible: true,
            extensions: ["toml"]
          },
          "application/trickle-ice-sdpfrag": {
            source: "iana"
          },
          "application/trig": {
            source: "iana",
            extensions: ["trig"]
          },
          "application/ttml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["ttml"]
          },
          "application/tve-trigger": {
            source: "iana"
          },
          "application/tzif": {
            source: "iana"
          },
          "application/tzif-leap": {
            source: "iana"
          },
          "application/ubjson": {
            compressible: false,
            extensions: ["ubj"]
          },
          "application/ulpfec": {
            source: "iana"
          },
          "application/urc-grpsheet+xml": {
            source: "iana",
            compressible: true
          },
          "application/urc-ressheet+xml": {
            source: "iana",
            compressible: true,
            extensions: ["rsheet"]
          },
          "application/urc-targetdesc+xml": {
            source: "iana",
            compressible: true,
            extensions: ["td"]
          },
          "application/urc-uisocketdesc+xml": {
            source: "iana",
            compressible: true
          },
          "application/vcard+json": {
            source: "iana",
            compressible: true
          },
          "application/vcard+xml": {
            source: "iana",
            compressible: true
          },
          "application/vemmi": {
            source: "iana"
          },
          "application/vividence.scriptfile": {
            source: "apache"
          },
          "application/vnd.1000minds.decision-model+xml": {
            source: "iana",
            compressible: true,
            extensions: ["1km"]
          },
          "application/vnd.3gpp-prose+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp-prose-pc3ch+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp-v2x-local-service-information": {
            source: "iana"
          },
          "application/vnd.3gpp.5gnas": {
            source: "iana"
          },
          "application/vnd.3gpp.access-transfer-events+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.bsf+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.gmop+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.gtpc": {
            source: "iana"
          },
          "application/vnd.3gpp.interworking-data": {
            source: "iana"
          },
          "application/vnd.3gpp.lpp": {
            source: "iana"
          },
          "application/vnd.3gpp.mc-signalling-ear": {
            source: "iana"
          },
          "application/vnd.3gpp.mcdata-affiliation-command+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcdata-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcdata-payload": {
            source: "iana"
          },
          "application/vnd.3gpp.mcdata-service-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcdata-signalling": {
            source: "iana"
          },
          "application/vnd.3gpp.mcdata-ue-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcdata-user-profile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-affiliation-command+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-floor-request+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-location-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-service-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-signed+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-ue-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-ue-init-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcptt-user-profile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-location-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-service-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-transmission-request+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-ue-config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mcvideo-user-profile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.mid-call+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.ngap": {
            source: "iana"
          },
          "application/vnd.3gpp.pfcp": {
            source: "iana"
          },
          "application/vnd.3gpp.pic-bw-large": {
            source: "iana",
            extensions: ["plb"]
          },
          "application/vnd.3gpp.pic-bw-small": {
            source: "iana",
            extensions: ["psb"]
          },
          "application/vnd.3gpp.pic-bw-var": {
            source: "iana",
            extensions: ["pvb"]
          },
          "application/vnd.3gpp.s1ap": {
            source: "iana"
          },
          "application/vnd.3gpp.sms": {
            source: "iana"
          },
          "application/vnd.3gpp.sms+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.srvcc-ext+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.srvcc-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.state-and-event-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp.ussd+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp2.bcmcsinfo+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.3gpp2.sms": {
            source: "iana"
          },
          "application/vnd.3gpp2.tcap": {
            source: "iana",
            extensions: ["tcap"]
          },
          "application/vnd.3lightssoftware.imagescal": {
            source: "iana"
          },
          "application/vnd.3m.post-it-notes": {
            source: "iana",
            extensions: ["pwn"]
          },
          "application/vnd.accpac.simply.aso": {
            source: "iana",
            extensions: ["aso"]
          },
          "application/vnd.accpac.simply.imp": {
            source: "iana",
            extensions: ["imp"]
          },
          "application/vnd.acucobol": {
            source: "iana",
            extensions: ["acu"]
          },
          "application/vnd.acucorp": {
            source: "iana",
            extensions: ["atc", "acutc"]
          },
          "application/vnd.adobe.air-application-installer-package+zip": {
            source: "apache",
            compressible: false,
            extensions: ["air"]
          },
          "application/vnd.adobe.flash.movie": {
            source: "iana"
          },
          "application/vnd.adobe.formscentral.fcdt": {
            source: "iana",
            extensions: ["fcdt"]
          },
          "application/vnd.adobe.fxp": {
            source: "iana",
            extensions: ["fxp", "fxpl"]
          },
          "application/vnd.adobe.partial-upload": {
            source: "iana"
          },
          "application/vnd.adobe.xdp+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xdp"]
          },
          "application/vnd.adobe.xfdf": {
            source: "iana",
            extensions: ["xfdf"]
          },
          "application/vnd.aether.imp": {
            source: "iana"
          },
          "application/vnd.afpc.afplinedata": {
            source: "iana"
          },
          "application/vnd.afpc.afplinedata-pagedef": {
            source: "iana"
          },
          "application/vnd.afpc.cmoca-cmresource": {
            source: "iana"
          },
          "application/vnd.afpc.foca-charset": {
            source: "iana"
          },
          "application/vnd.afpc.foca-codedfont": {
            source: "iana"
          },
          "application/vnd.afpc.foca-codepage": {
            source: "iana"
          },
          "application/vnd.afpc.modca": {
            source: "iana"
          },
          "application/vnd.afpc.modca-cmtable": {
            source: "iana"
          },
          "application/vnd.afpc.modca-formdef": {
            source: "iana"
          },
          "application/vnd.afpc.modca-mediummap": {
            source: "iana"
          },
          "application/vnd.afpc.modca-objectcontainer": {
            source: "iana"
          },
          "application/vnd.afpc.modca-overlay": {
            source: "iana"
          },
          "application/vnd.afpc.modca-pagesegment": {
            source: "iana"
          },
          "application/vnd.age": {
            source: "iana",
            extensions: ["age"]
          },
          "application/vnd.ah-barcode": {
            source: "iana"
          },
          "application/vnd.ahead.space": {
            source: "iana",
            extensions: ["ahead"]
          },
          "application/vnd.airzip.filesecure.azf": {
            source: "iana",
            extensions: ["azf"]
          },
          "application/vnd.airzip.filesecure.azs": {
            source: "iana",
            extensions: ["azs"]
          },
          "application/vnd.amadeus+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.amazon.ebook": {
            source: "apache",
            extensions: ["azw"]
          },
          "application/vnd.amazon.mobi8-ebook": {
            source: "iana"
          },
          "application/vnd.americandynamics.acc": {
            source: "iana",
            extensions: ["acc"]
          },
          "application/vnd.amiga.ami": {
            source: "iana",
            extensions: ["ami"]
          },
          "application/vnd.amundsen.maze+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.android.ota": {
            source: "iana"
          },
          "application/vnd.android.package-archive": {
            source: "apache",
            compressible: false,
            extensions: ["apk"]
          },
          "application/vnd.anki": {
            source: "iana"
          },
          "application/vnd.anser-web-certificate-issue-initiation": {
            source: "iana",
            extensions: ["cii"]
          },
          "application/vnd.anser-web-funds-transfer-initiation": {
            source: "apache",
            extensions: ["fti"]
          },
          "application/vnd.antix.game-component": {
            source: "iana",
            extensions: ["atx"]
          },
          "application/vnd.apache.arrow.file": {
            source: "iana"
          },
          "application/vnd.apache.arrow.stream": {
            source: "iana"
          },
          "application/vnd.apache.thrift.binary": {
            source: "iana"
          },
          "application/vnd.apache.thrift.compact": {
            source: "iana"
          },
          "application/vnd.apache.thrift.json": {
            source: "iana"
          },
          "application/vnd.api+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.aplextor.warrp+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.apothekende.reservation+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.apple.installer+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mpkg"]
          },
          "application/vnd.apple.keynote": {
            source: "iana",
            extensions: ["key"]
          },
          "application/vnd.apple.mpegurl": {
            source: "iana",
            extensions: ["m3u8"]
          },
          "application/vnd.apple.numbers": {
            source: "iana",
            extensions: ["numbers"]
          },
          "application/vnd.apple.pages": {
            source: "iana",
            extensions: ["pages"]
          },
          "application/vnd.apple.pkpass": {
            compressible: false,
            extensions: ["pkpass"]
          },
          "application/vnd.arastra.swi": {
            source: "iana"
          },
          "application/vnd.aristanetworks.swi": {
            source: "iana",
            extensions: ["swi"]
          },
          "application/vnd.artisan+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.artsquare": {
            source: "iana"
          },
          "application/vnd.astraea-software.iota": {
            source: "iana",
            extensions: ["iota"]
          },
          "application/vnd.audiograph": {
            source: "iana",
            extensions: ["aep"]
          },
          "application/vnd.autopackage": {
            source: "iana"
          },
          "application/vnd.avalon+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.avistar+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.balsamiq.bmml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["bmml"]
          },
          "application/vnd.balsamiq.bmpr": {
            source: "iana"
          },
          "application/vnd.banana-accounting": {
            source: "iana"
          },
          "application/vnd.bbf.usp.error": {
            source: "iana"
          },
          "application/vnd.bbf.usp.msg": {
            source: "iana"
          },
          "application/vnd.bbf.usp.msg+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.bekitzur-stech+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.bint.med-content": {
            source: "iana"
          },
          "application/vnd.biopax.rdf+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.blink-idb-value-wrapper": {
            source: "iana"
          },
          "application/vnd.blueice.multipass": {
            source: "iana",
            extensions: ["mpm"]
          },
          "application/vnd.bluetooth.ep.oob": {
            source: "iana"
          },
          "application/vnd.bluetooth.le.oob": {
            source: "iana"
          },
          "application/vnd.bmi": {
            source: "iana",
            extensions: ["bmi"]
          },
          "application/vnd.bpf": {
            source: "iana"
          },
          "application/vnd.bpf3": {
            source: "iana"
          },
          "application/vnd.businessobjects": {
            source: "iana",
            extensions: ["rep"]
          },
          "application/vnd.byu.uapi+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.cab-jscript": {
            source: "iana"
          },
          "application/vnd.canon-cpdl": {
            source: "iana"
          },
          "application/vnd.canon-lips": {
            source: "iana"
          },
          "application/vnd.capasystems-pg+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.cendio.thinlinc.clientconf": {
            source: "iana"
          },
          "application/vnd.century-systems.tcp_stream": {
            source: "iana"
          },
          "application/vnd.chemdraw+xml": {
            source: "iana",
            compressible: true,
            extensions: ["cdxml"]
          },
          "application/vnd.chess-pgn": {
            source: "iana"
          },
          "application/vnd.chipnuts.karaoke-mmd": {
            source: "iana",
            extensions: ["mmd"]
          },
          "application/vnd.ciedi": {
            source: "iana"
          },
          "application/vnd.cinderella": {
            source: "iana",
            extensions: ["cdy"]
          },
          "application/vnd.cirpack.isdn-ext": {
            source: "iana"
          },
          "application/vnd.citationstyles.style+xml": {
            source: "iana",
            compressible: true,
            extensions: ["csl"]
          },
          "application/vnd.claymore": {
            source: "iana",
            extensions: ["cla"]
          },
          "application/vnd.cloanto.rp9": {
            source: "iana",
            extensions: ["rp9"]
          },
          "application/vnd.clonk.c4group": {
            source: "iana",
            extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
          },
          "application/vnd.cluetrust.cartomobile-config": {
            source: "iana",
            extensions: ["c11amc"]
          },
          "application/vnd.cluetrust.cartomobile-config-pkg": {
            source: "iana",
            extensions: ["c11amz"]
          },
          "application/vnd.coffeescript": {
            source: "iana"
          },
          "application/vnd.collabio.xodocuments.document": {
            source: "iana"
          },
          "application/vnd.collabio.xodocuments.document-template": {
            source: "iana"
          },
          "application/vnd.collabio.xodocuments.presentation": {
            source: "iana"
          },
          "application/vnd.collabio.xodocuments.presentation-template": {
            source: "iana"
          },
          "application/vnd.collabio.xodocuments.spreadsheet": {
            source: "iana"
          },
          "application/vnd.collabio.xodocuments.spreadsheet-template": {
            source: "iana"
          },
          "application/vnd.collection+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.collection.doc+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.collection.next+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.comicbook+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.comicbook-rar": {
            source: "iana"
          },
          "application/vnd.commerce-battelle": {
            source: "iana"
          },
          "application/vnd.commonspace": {
            source: "iana",
            extensions: ["csp"]
          },
          "application/vnd.contact.cmsg": {
            source: "iana",
            extensions: ["cdbcmsg"]
          },
          "application/vnd.coreos.ignition+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.cosmocaller": {
            source: "iana",
            extensions: ["cmc"]
          },
          "application/vnd.crick.clicker": {
            source: "iana",
            extensions: ["clkx"]
          },
          "application/vnd.crick.clicker.keyboard": {
            source: "iana",
            extensions: ["clkk"]
          },
          "application/vnd.crick.clicker.palette": {
            source: "iana",
            extensions: ["clkp"]
          },
          "application/vnd.crick.clicker.template": {
            source: "iana",
            extensions: ["clkt"]
          },
          "application/vnd.crick.clicker.wordbank": {
            source: "iana",
            extensions: ["clkw"]
          },
          "application/vnd.criticaltools.wbs+xml": {
            source: "iana",
            compressible: true,
            extensions: ["wbs"]
          },
          "application/vnd.cryptii.pipe+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.crypto-shade-file": {
            source: "iana"
          },
          "application/vnd.cryptomator.encrypted": {
            source: "iana"
          },
          "application/vnd.cryptomator.vault": {
            source: "iana"
          },
          "application/vnd.ctc-posml": {
            source: "iana",
            extensions: ["pml"]
          },
          "application/vnd.ctct.ws+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.cups-pdf": {
            source: "iana"
          },
          "application/vnd.cups-postscript": {
            source: "iana"
          },
          "application/vnd.cups-ppd": {
            source: "iana",
            extensions: ["ppd"]
          },
          "application/vnd.cups-raster": {
            source: "iana"
          },
          "application/vnd.cups-raw": {
            source: "iana"
          },
          "application/vnd.curl": {
            source: "iana"
          },
          "application/vnd.curl.car": {
            source: "apache",
            extensions: ["car"]
          },
          "application/vnd.curl.pcurl": {
            source: "apache",
            extensions: ["pcurl"]
          },
          "application/vnd.cyan.dean.root+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.cybank": {
            source: "iana"
          },
          "application/vnd.cyclonedx+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.cyclonedx+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.d2l.coursepackage1p0+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.d3m-dataset": {
            source: "iana"
          },
          "application/vnd.d3m-problem": {
            source: "iana"
          },
          "application/vnd.dart": {
            source: "iana",
            compressible: true,
            extensions: ["dart"]
          },
          "application/vnd.data-vision.rdz": {
            source: "iana",
            extensions: ["rdz"]
          },
          "application/vnd.datapackage+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dataresource+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dbf": {
            source: "iana",
            extensions: ["dbf"]
          },
          "application/vnd.debian.binary-package": {
            source: "iana"
          },
          "application/vnd.dece.data": {
            source: "iana",
            extensions: ["uvf", "uvvf", "uvd", "uvvd"]
          },
          "application/vnd.dece.ttml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["uvt", "uvvt"]
          },
          "application/vnd.dece.unspecified": {
            source: "iana",
            extensions: ["uvx", "uvvx"]
          },
          "application/vnd.dece.zip": {
            source: "iana",
            extensions: ["uvz", "uvvz"]
          },
          "application/vnd.denovo.fcselayout-link": {
            source: "iana",
            extensions: ["fe_launch"]
          },
          "application/vnd.desmume.movie": {
            source: "iana"
          },
          "application/vnd.dir-bi.plate-dl-nosuffix": {
            source: "iana"
          },
          "application/vnd.dm.delegation+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dna": {
            source: "iana",
            extensions: ["dna"]
          },
          "application/vnd.document+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dolby.mlp": {
            source: "apache",
            extensions: ["mlp"]
          },
          "application/vnd.dolby.mobile.1": {
            source: "iana"
          },
          "application/vnd.dolby.mobile.2": {
            source: "iana"
          },
          "application/vnd.doremir.scorecloud-binary-document": {
            source: "iana"
          },
          "application/vnd.dpgraph": {
            source: "iana",
            extensions: ["dpg"]
          },
          "application/vnd.dreamfactory": {
            source: "iana",
            extensions: ["dfac"]
          },
          "application/vnd.drive+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ds-keypoint": {
            source: "apache",
            extensions: ["kpxx"]
          },
          "application/vnd.dtg.local": {
            source: "iana"
          },
          "application/vnd.dtg.local.flash": {
            source: "iana"
          },
          "application/vnd.dtg.local.html": {
            source: "iana"
          },
          "application/vnd.dvb.ait": {
            source: "iana",
            extensions: ["ait"]
          },
          "application/vnd.dvb.dvbisl+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.dvbj": {
            source: "iana"
          },
          "application/vnd.dvb.esgcontainer": {
            source: "iana"
          },
          "application/vnd.dvb.ipdcdftnotifaccess": {
            source: "iana"
          },
          "application/vnd.dvb.ipdcesgaccess": {
            source: "iana"
          },
          "application/vnd.dvb.ipdcesgaccess2": {
            source: "iana"
          },
          "application/vnd.dvb.ipdcesgpdd": {
            source: "iana"
          },
          "application/vnd.dvb.ipdcroaming": {
            source: "iana"
          },
          "application/vnd.dvb.iptv.alfec-base": {
            source: "iana"
          },
          "application/vnd.dvb.iptv.alfec-enhancement": {
            source: "iana"
          },
          "application/vnd.dvb.notif-aggregate-root+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.notif-container+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.notif-generic+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.notif-ia-msglist+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.notif-ia-registration-request+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.notif-ia-registration-response+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.notif-init+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.dvb.pfr": {
            source: "iana"
          },
          "application/vnd.dvb.service": {
            source: "iana",
            extensions: ["svc"]
          },
          "application/vnd.dxr": {
            source: "iana"
          },
          "application/vnd.dynageo": {
            source: "iana",
            extensions: ["geo"]
          },
          "application/vnd.dzr": {
            source: "iana"
          },
          "application/vnd.easykaraoke.cdgdownload": {
            source: "iana"
          },
          "application/vnd.ecdis-update": {
            source: "iana"
          },
          "application/vnd.ecip.rlp": {
            source: "iana"
          },
          "application/vnd.eclipse.ditto+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ecowin.chart": {
            source: "iana",
            extensions: ["mag"]
          },
          "application/vnd.ecowin.filerequest": {
            source: "iana"
          },
          "application/vnd.ecowin.fileupdate": {
            source: "iana"
          },
          "application/vnd.ecowin.series": {
            source: "iana"
          },
          "application/vnd.ecowin.seriesrequest": {
            source: "iana"
          },
          "application/vnd.ecowin.seriesupdate": {
            source: "iana"
          },
          "application/vnd.efi.img": {
            source: "iana"
          },
          "application/vnd.efi.iso": {
            source: "iana"
          },
          "application/vnd.emclient.accessrequest+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.enliven": {
            source: "iana",
            extensions: ["nml"]
          },
          "application/vnd.enphase.envoy": {
            source: "iana"
          },
          "application/vnd.eprints.data+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.epson.esf": {
            source: "iana",
            extensions: ["esf"]
          },
          "application/vnd.epson.msf": {
            source: "iana",
            extensions: ["msf"]
          },
          "application/vnd.epson.quickanime": {
            source: "iana",
            extensions: ["qam"]
          },
          "application/vnd.epson.salt": {
            source: "iana",
            extensions: ["slt"]
          },
          "application/vnd.epson.ssf": {
            source: "iana",
            extensions: ["ssf"]
          },
          "application/vnd.ericsson.quickcall": {
            source: "iana"
          },
          "application/vnd.espass-espass+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.eszigno3+xml": {
            source: "iana",
            compressible: true,
            extensions: ["es3", "et3"]
          },
          "application/vnd.etsi.aoc+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.asic-e+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.etsi.asic-s+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.etsi.cug+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvcommand+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvdiscovery+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvprofile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvsad-bc+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvsad-cod+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvsad-npvr+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvservice+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvsync+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.iptvueprofile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.mcid+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.mheg5": {
            source: "iana"
          },
          "application/vnd.etsi.overload-control-policy-dataset+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.pstn+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.sci+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.simservs+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.timestamp-token": {
            source: "iana"
          },
          "application/vnd.etsi.tsl+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.etsi.tsl.der": {
            source: "iana"
          },
          "application/vnd.eu.kasparian.car+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.eudora.data": {
            source: "iana"
          },
          "application/vnd.evolv.ecig.profile": {
            source: "iana"
          },
          "application/vnd.evolv.ecig.settings": {
            source: "iana"
          },
          "application/vnd.evolv.ecig.theme": {
            source: "iana"
          },
          "application/vnd.exstream-empower+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.exstream-package": {
            source: "iana"
          },
          "application/vnd.ezpix-album": {
            source: "iana",
            extensions: ["ez2"]
          },
          "application/vnd.ezpix-package": {
            source: "iana",
            extensions: ["ez3"]
          },
          "application/vnd.f-secure.mobile": {
            source: "iana"
          },
          "application/vnd.familysearch.gedcom+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.fastcopy-disk-image": {
            source: "iana"
          },
          "application/vnd.fdf": {
            source: "iana",
            extensions: ["fdf"]
          },
          "application/vnd.fdsn.mseed": {
            source: "iana",
            extensions: ["mseed"]
          },
          "application/vnd.fdsn.seed": {
            source: "iana",
            extensions: ["seed", "dataless"]
          },
          "application/vnd.ffsns": {
            source: "iana"
          },
          "application/vnd.ficlab.flb+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.filmit.zfc": {
            source: "iana"
          },
          "application/vnd.fints": {
            source: "iana"
          },
          "application/vnd.firemonkeys.cloudcell": {
            source: "iana"
          },
          "application/vnd.flographit": {
            source: "iana",
            extensions: ["gph"]
          },
          "application/vnd.fluxtime.clip": {
            source: "iana",
            extensions: ["ftc"]
          },
          "application/vnd.font-fontforge-sfd": {
            source: "iana"
          },
          "application/vnd.framemaker": {
            source: "iana",
            extensions: ["fm", "frame", "maker", "book"]
          },
          "application/vnd.frogans.fnc": {
            source: "iana",
            extensions: ["fnc"]
          },
          "application/vnd.frogans.ltf": {
            source: "iana",
            extensions: ["ltf"]
          },
          "application/vnd.fsc.weblaunch": {
            source: "iana",
            extensions: ["fsc"]
          },
          "application/vnd.fujifilm.fb.docuworks": {
            source: "iana"
          },
          "application/vnd.fujifilm.fb.docuworks.binder": {
            source: "iana"
          },
          "application/vnd.fujifilm.fb.docuworks.container": {
            source: "iana"
          },
          "application/vnd.fujifilm.fb.jfi+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.fujitsu.oasys": {
            source: "iana",
            extensions: ["oas"]
          },
          "application/vnd.fujitsu.oasys2": {
            source: "iana",
            extensions: ["oa2"]
          },
          "application/vnd.fujitsu.oasys3": {
            source: "iana",
            extensions: ["oa3"]
          },
          "application/vnd.fujitsu.oasysgp": {
            source: "iana",
            extensions: ["fg5"]
          },
          "application/vnd.fujitsu.oasysprs": {
            source: "iana",
            extensions: ["bh2"]
          },
          "application/vnd.fujixerox.art-ex": {
            source: "iana"
          },
          "application/vnd.fujixerox.art4": {
            source: "iana"
          },
          "application/vnd.fujixerox.ddd": {
            source: "iana",
            extensions: ["ddd"]
          },
          "application/vnd.fujixerox.docuworks": {
            source: "iana",
            extensions: ["xdw"]
          },
          "application/vnd.fujixerox.docuworks.binder": {
            source: "iana",
            extensions: ["xbd"]
          },
          "application/vnd.fujixerox.docuworks.container": {
            source: "iana"
          },
          "application/vnd.fujixerox.hbpl": {
            source: "iana"
          },
          "application/vnd.fut-misnet": {
            source: "iana"
          },
          "application/vnd.futoin+cbor": {
            source: "iana"
          },
          "application/vnd.futoin+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.fuzzysheet": {
            source: "iana",
            extensions: ["fzs"]
          },
          "application/vnd.genomatix.tuxedo": {
            source: "iana",
            extensions: ["txd"]
          },
          "application/vnd.gentics.grd+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.geo+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.geocube+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.geogebra.file": {
            source: "iana",
            extensions: ["ggb"]
          },
          "application/vnd.geogebra.slides": {
            source: "iana"
          },
          "application/vnd.geogebra.tool": {
            source: "iana",
            extensions: ["ggt"]
          },
          "application/vnd.geometry-explorer": {
            source: "iana",
            extensions: ["gex", "gre"]
          },
          "application/vnd.geonext": {
            source: "iana",
            extensions: ["gxt"]
          },
          "application/vnd.geoplan": {
            source: "iana",
            extensions: ["g2w"]
          },
          "application/vnd.geospace": {
            source: "iana",
            extensions: ["g3w"]
          },
          "application/vnd.gerber": {
            source: "iana"
          },
          "application/vnd.globalplatform.card-content-mgt": {
            source: "iana"
          },
          "application/vnd.globalplatform.card-content-mgt-response": {
            source: "iana"
          },
          "application/vnd.gmx": {
            source: "iana",
            extensions: ["gmx"]
          },
          "application/vnd.google-apps.document": {
            compressible: false,
            extensions: ["gdoc"]
          },
          "application/vnd.google-apps.presentation": {
            compressible: false,
            extensions: ["gslides"]
          },
          "application/vnd.google-apps.spreadsheet": {
            compressible: false,
            extensions: ["gsheet"]
          },
          "application/vnd.google-earth.kml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["kml"]
          },
          "application/vnd.google-earth.kmz": {
            source: "iana",
            compressible: false,
            extensions: ["kmz"]
          },
          "application/vnd.gov.sk.e-form+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.gov.sk.e-form+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.gov.sk.xmldatacontainer+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.grafeq": {
            source: "iana",
            extensions: ["gqf", "gqs"]
          },
          "application/vnd.gridmp": {
            source: "iana"
          },
          "application/vnd.groove-account": {
            source: "iana",
            extensions: ["gac"]
          },
          "application/vnd.groove-help": {
            source: "iana",
            extensions: ["ghf"]
          },
          "application/vnd.groove-identity-message": {
            source: "iana",
            extensions: ["gim"]
          },
          "application/vnd.groove-injector": {
            source: "iana",
            extensions: ["grv"]
          },
          "application/vnd.groove-tool-message": {
            source: "iana",
            extensions: ["gtm"]
          },
          "application/vnd.groove-tool-template": {
            source: "iana",
            extensions: ["tpl"]
          },
          "application/vnd.groove-vcard": {
            source: "iana",
            extensions: ["vcg"]
          },
          "application/vnd.hal+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.hal+xml": {
            source: "iana",
            compressible: true,
            extensions: ["hal"]
          },
          "application/vnd.handheld-entertainment+xml": {
            source: "iana",
            compressible: true,
            extensions: ["zmm"]
          },
          "application/vnd.hbci": {
            source: "iana",
            extensions: ["hbci"]
          },
          "application/vnd.hc+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.hcl-bireports": {
            source: "iana"
          },
          "application/vnd.hdt": {
            source: "iana"
          },
          "application/vnd.heroku+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.hhe.lesson-player": {
            source: "iana",
            extensions: ["les"]
          },
          "application/vnd.hl7cda+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/vnd.hl7v2+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/vnd.hp-hpgl": {
            source: "iana",
            extensions: ["hpgl"]
          },
          "application/vnd.hp-hpid": {
            source: "iana",
            extensions: ["hpid"]
          },
          "application/vnd.hp-hps": {
            source: "iana",
            extensions: ["hps"]
          },
          "application/vnd.hp-jlyt": {
            source: "iana",
            extensions: ["jlt"]
          },
          "application/vnd.hp-pcl": {
            source: "iana",
            extensions: ["pcl"]
          },
          "application/vnd.hp-pclxl": {
            source: "iana",
            extensions: ["pclxl"]
          },
          "application/vnd.httphone": {
            source: "iana"
          },
          "application/vnd.hydrostatix.sof-data": {
            source: "iana",
            extensions: ["sfd-hdstx"]
          },
          "application/vnd.hyper+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.hyper-item+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.hyperdrive+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.hzn-3d-crossword": {
            source: "iana"
          },
          "application/vnd.ibm.afplinedata": {
            source: "iana"
          },
          "application/vnd.ibm.electronic-media": {
            source: "iana"
          },
          "application/vnd.ibm.minipay": {
            source: "iana",
            extensions: ["mpy"]
          },
          "application/vnd.ibm.modcap": {
            source: "iana",
            extensions: ["afp", "listafp", "list3820"]
          },
          "application/vnd.ibm.rights-management": {
            source: "iana",
            extensions: ["irm"]
          },
          "application/vnd.ibm.secure-container": {
            source: "iana",
            extensions: ["sc"]
          },
          "application/vnd.iccprofile": {
            source: "iana",
            extensions: ["icc", "icm"]
          },
          "application/vnd.ieee.1905": {
            source: "iana"
          },
          "application/vnd.igloader": {
            source: "iana",
            extensions: ["igl"]
          },
          "application/vnd.imagemeter.folder+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.imagemeter.image+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.immervision-ivp": {
            source: "iana",
            extensions: ["ivp"]
          },
          "application/vnd.immervision-ivu": {
            source: "iana",
            extensions: ["ivu"]
          },
          "application/vnd.ims.imsccv1p1": {
            source: "iana"
          },
          "application/vnd.ims.imsccv1p2": {
            source: "iana"
          },
          "application/vnd.ims.imsccv1p3": {
            source: "iana"
          },
          "application/vnd.ims.lis.v2.result+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ims.lti.v2.toolproxy+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ims.lti.v2.toolproxy.id+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ims.lti.v2.toolsettings+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ims.lti.v2.toolsettings.simple+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.informedcontrol.rms+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.informix-visionary": {
            source: "iana"
          },
          "application/vnd.infotech.project": {
            source: "iana"
          },
          "application/vnd.infotech.project+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.innopath.wamp.notification": {
            source: "iana"
          },
          "application/vnd.insors.igm": {
            source: "iana",
            extensions: ["igm"]
          },
          "application/vnd.intercon.formnet": {
            source: "iana",
            extensions: ["xpw", "xpx"]
          },
          "application/vnd.intergeo": {
            source: "iana",
            extensions: ["i2g"]
          },
          "application/vnd.intertrust.digibox": {
            source: "iana"
          },
          "application/vnd.intertrust.nncp": {
            source: "iana"
          },
          "application/vnd.intu.qbo": {
            source: "iana",
            extensions: ["qbo"]
          },
          "application/vnd.intu.qfx": {
            source: "iana",
            extensions: ["qfx"]
          },
          "application/vnd.iptc.g2.catalogitem+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.iptc.g2.conceptitem+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.iptc.g2.knowledgeitem+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.iptc.g2.newsitem+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.iptc.g2.newsmessage+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.iptc.g2.packageitem+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.iptc.g2.planningitem+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ipunplugged.rcprofile": {
            source: "iana",
            extensions: ["rcprofile"]
          },
          "application/vnd.irepository.package+xml": {
            source: "iana",
            compressible: true,
            extensions: ["irp"]
          },
          "application/vnd.is-xpr": {
            source: "iana",
            extensions: ["xpr"]
          },
          "application/vnd.isac.fcs": {
            source: "iana",
            extensions: ["fcs"]
          },
          "application/vnd.iso11783-10+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.jam": {
            source: "iana",
            extensions: ["jam"]
          },
          "application/vnd.japannet-directory-service": {
            source: "iana"
          },
          "application/vnd.japannet-jpnstore-wakeup": {
            source: "iana"
          },
          "application/vnd.japannet-payment-wakeup": {
            source: "iana"
          },
          "application/vnd.japannet-registration": {
            source: "iana"
          },
          "application/vnd.japannet-registration-wakeup": {
            source: "iana"
          },
          "application/vnd.japannet-setstore-wakeup": {
            source: "iana"
          },
          "application/vnd.japannet-verification": {
            source: "iana"
          },
          "application/vnd.japannet-verification-wakeup": {
            source: "iana"
          },
          "application/vnd.jcp.javame.midlet-rms": {
            source: "iana",
            extensions: ["rms"]
          },
          "application/vnd.jisp": {
            source: "iana",
            extensions: ["jisp"]
          },
          "application/vnd.joost.joda-archive": {
            source: "iana",
            extensions: ["joda"]
          },
          "application/vnd.jsk.isdn-ngn": {
            source: "iana"
          },
          "application/vnd.kahootz": {
            source: "iana",
            extensions: ["ktz", "ktr"]
          },
          "application/vnd.kde.karbon": {
            source: "iana",
            extensions: ["karbon"]
          },
          "application/vnd.kde.kchart": {
            source: "iana",
            extensions: ["chrt"]
          },
          "application/vnd.kde.kformula": {
            source: "iana",
            extensions: ["kfo"]
          },
          "application/vnd.kde.kivio": {
            source: "iana",
            extensions: ["flw"]
          },
          "application/vnd.kde.kontour": {
            source: "iana",
            extensions: ["kon"]
          },
          "application/vnd.kde.kpresenter": {
            source: "iana",
            extensions: ["kpr", "kpt"]
          },
          "application/vnd.kde.kspread": {
            source: "iana",
            extensions: ["ksp"]
          },
          "application/vnd.kde.kword": {
            source: "iana",
            extensions: ["kwd", "kwt"]
          },
          "application/vnd.kenameaapp": {
            source: "iana",
            extensions: ["htke"]
          },
          "application/vnd.kidspiration": {
            source: "iana",
            extensions: ["kia"]
          },
          "application/vnd.kinar": {
            source: "iana",
            extensions: ["kne", "knp"]
          },
          "application/vnd.koan": {
            source: "iana",
            extensions: ["skp", "skd", "skt", "skm"]
          },
          "application/vnd.kodak-descriptor": {
            source: "iana",
            extensions: ["sse"]
          },
          "application/vnd.las": {
            source: "iana"
          },
          "application/vnd.las.las+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.las.las+xml": {
            source: "iana",
            compressible: true,
            extensions: ["lasxml"]
          },
          "application/vnd.laszip": {
            source: "iana"
          },
          "application/vnd.leap+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.liberty-request+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.llamagraphics.life-balance.desktop": {
            source: "iana",
            extensions: ["lbd"]
          },
          "application/vnd.llamagraphics.life-balance.exchange+xml": {
            source: "iana",
            compressible: true,
            extensions: ["lbe"]
          },
          "application/vnd.logipipe.circuit+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.loom": {
            source: "iana"
          },
          "application/vnd.lotus-1-2-3": {
            source: "iana",
            extensions: ["123"]
          },
          "application/vnd.lotus-approach": {
            source: "iana",
            extensions: ["apr"]
          },
          "application/vnd.lotus-freelance": {
            source: "iana",
            extensions: ["pre"]
          },
          "application/vnd.lotus-notes": {
            source: "iana",
            extensions: ["nsf"]
          },
          "application/vnd.lotus-organizer": {
            source: "iana",
            extensions: ["org"]
          },
          "application/vnd.lotus-screencam": {
            source: "iana",
            extensions: ["scm"]
          },
          "application/vnd.lotus-wordpro": {
            source: "iana",
            extensions: ["lwp"]
          },
          "application/vnd.macports.portpkg": {
            source: "iana",
            extensions: ["portpkg"]
          },
          "application/vnd.mapbox-vector-tile": {
            source: "iana",
            extensions: ["mvt"]
          },
          "application/vnd.marlin.drm.actiontoken+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.marlin.drm.conftoken+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.marlin.drm.license+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.marlin.drm.mdcf": {
            source: "iana"
          },
          "application/vnd.mason+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.maxar.archive.3tz+zip": {
            source: "iana",
            compressible: false
          },
          "application/vnd.maxmind.maxmind-db": {
            source: "iana"
          },
          "application/vnd.mcd": {
            source: "iana",
            extensions: ["mcd"]
          },
          "application/vnd.medcalcdata": {
            source: "iana",
            extensions: ["mc1"]
          },
          "application/vnd.mediastation.cdkey": {
            source: "iana",
            extensions: ["cdkey"]
          },
          "application/vnd.meridian-slingshot": {
            source: "iana"
          },
          "application/vnd.mfer": {
            source: "iana",
            extensions: ["mwf"]
          },
          "application/vnd.mfmp": {
            source: "iana",
            extensions: ["mfm"]
          },
          "application/vnd.micro+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.micrografx.flo": {
            source: "iana",
            extensions: ["flo"]
          },
          "application/vnd.micrografx.igx": {
            source: "iana",
            extensions: ["igx"]
          },
          "application/vnd.microsoft.portable-executable": {
            source: "iana"
          },
          "application/vnd.microsoft.windows.thumbnail-cache": {
            source: "iana"
          },
          "application/vnd.miele+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.mif": {
            source: "iana",
            extensions: ["mif"]
          },
          "application/vnd.minisoft-hp3000-save": {
            source: "iana"
          },
          "application/vnd.mitsubishi.misty-guard.trustweb": {
            source: "iana"
          },
          "application/vnd.mobius.daf": {
            source: "iana",
            extensions: ["daf"]
          },
          "application/vnd.mobius.dis": {
            source: "iana",
            extensions: ["dis"]
          },
          "application/vnd.mobius.mbk": {
            source: "iana",
            extensions: ["mbk"]
          },
          "application/vnd.mobius.mqy": {
            source: "iana",
            extensions: ["mqy"]
          },
          "application/vnd.mobius.msl": {
            source: "iana",
            extensions: ["msl"]
          },
          "application/vnd.mobius.plc": {
            source: "iana",
            extensions: ["plc"]
          },
          "application/vnd.mobius.txf": {
            source: "iana",
            extensions: ["txf"]
          },
          "application/vnd.mophun.application": {
            source: "iana",
            extensions: ["mpn"]
          },
          "application/vnd.mophun.certificate": {
            source: "iana",
            extensions: ["mpc"]
          },
          "application/vnd.motorola.flexsuite": {
            source: "iana"
          },
          "application/vnd.motorola.flexsuite.adsi": {
            source: "iana"
          },
          "application/vnd.motorola.flexsuite.fis": {
            source: "iana"
          },
          "application/vnd.motorola.flexsuite.gotap": {
            source: "iana"
          },
          "application/vnd.motorola.flexsuite.kmr": {
            source: "iana"
          },
          "application/vnd.motorola.flexsuite.ttc": {
            source: "iana"
          },
          "application/vnd.motorola.flexsuite.wem": {
            source: "iana"
          },
          "application/vnd.motorola.iprm": {
            source: "iana"
          },
          "application/vnd.mozilla.xul+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xul"]
          },
          "application/vnd.ms-3mfdocument": {
            source: "iana"
          },
          "application/vnd.ms-artgalry": {
            source: "iana",
            extensions: ["cil"]
          },
          "application/vnd.ms-asf": {
            source: "iana"
          },
          "application/vnd.ms-cab-compressed": {
            source: "iana",
            extensions: ["cab"]
          },
          "application/vnd.ms-color.iccprofile": {
            source: "apache"
          },
          "application/vnd.ms-excel": {
            source: "iana",
            compressible: false,
            extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
          },
          "application/vnd.ms-excel.addin.macroenabled.12": {
            source: "iana",
            extensions: ["xlam"]
          },
          "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
            source: "iana",
            extensions: ["xlsb"]
          },
          "application/vnd.ms-excel.sheet.macroenabled.12": {
            source: "iana",
            extensions: ["xlsm"]
          },
          "application/vnd.ms-excel.template.macroenabled.12": {
            source: "iana",
            extensions: ["xltm"]
          },
          "application/vnd.ms-fontobject": {
            source: "iana",
            compressible: true,
            extensions: ["eot"]
          },
          "application/vnd.ms-htmlhelp": {
            source: "iana",
            extensions: ["chm"]
          },
          "application/vnd.ms-ims": {
            source: "iana",
            extensions: ["ims"]
          },
          "application/vnd.ms-lrm": {
            source: "iana",
            extensions: ["lrm"]
          },
          "application/vnd.ms-office.activex+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ms-officetheme": {
            source: "iana",
            extensions: ["thmx"]
          },
          "application/vnd.ms-opentype": {
            source: "apache",
            compressible: true
          },
          "application/vnd.ms-outlook": {
            compressible: false,
            extensions: ["msg"]
          },
          "application/vnd.ms-package.obfuscated-opentype": {
            source: "apache"
          },
          "application/vnd.ms-pki.seccat": {
            source: "apache",
            extensions: ["cat"]
          },
          "application/vnd.ms-pki.stl": {
            source: "apache",
            extensions: ["stl"]
          },
          "application/vnd.ms-playready.initiator+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ms-powerpoint": {
            source: "iana",
            compressible: false,
            extensions: ["ppt", "pps", "pot"]
          },
          "application/vnd.ms-powerpoint.addin.macroenabled.12": {
            source: "iana",
            extensions: ["ppam"]
          },
          "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
            source: "iana",
            extensions: ["pptm"]
          },
          "application/vnd.ms-powerpoint.slide.macroenabled.12": {
            source: "iana",
            extensions: ["sldm"]
          },
          "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
            source: "iana",
            extensions: ["ppsm"]
          },
          "application/vnd.ms-powerpoint.template.macroenabled.12": {
            source: "iana",
            extensions: ["potm"]
          },
          "application/vnd.ms-printdevicecapabilities+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ms-printing.printticket+xml": {
            source: "apache",
            compressible: true
          },
          "application/vnd.ms-printschematicket+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ms-project": {
            source: "iana",
            extensions: ["mpp", "mpt"]
          },
          "application/vnd.ms-tnef": {
            source: "iana"
          },
          "application/vnd.ms-windows.devicepairing": {
            source: "iana"
          },
          "application/vnd.ms-windows.nwprinting.oob": {
            source: "iana"
          },
          "application/vnd.ms-windows.printerpairing": {
            source: "iana"
          },
          "application/vnd.ms-windows.wsd.oob": {
            source: "iana"
          },
          "application/vnd.ms-wmdrm.lic-chlg-req": {
            source: "iana"
          },
          "application/vnd.ms-wmdrm.lic-resp": {
            source: "iana"
          },
          "application/vnd.ms-wmdrm.meter-chlg-req": {
            source: "iana"
          },
          "application/vnd.ms-wmdrm.meter-resp": {
            source: "iana"
          },
          "application/vnd.ms-word.document.macroenabled.12": {
            source: "iana",
            extensions: ["docm"]
          },
          "application/vnd.ms-word.template.macroenabled.12": {
            source: "iana",
            extensions: ["dotm"]
          },
          "application/vnd.ms-works": {
            source: "iana",
            extensions: ["wps", "wks", "wcm", "wdb"]
          },
          "application/vnd.ms-wpl": {
            source: "iana",
            extensions: ["wpl"]
          },
          "application/vnd.ms-xpsdocument": {
            source: "iana",
            compressible: false,
            extensions: ["xps"]
          },
          "application/vnd.msa-disk-image": {
            source: "iana"
          },
          "application/vnd.mseq": {
            source: "iana",
            extensions: ["mseq"]
          },
          "application/vnd.msign": {
            source: "iana"
          },
          "application/vnd.multiad.creator": {
            source: "iana"
          },
          "application/vnd.multiad.creator.cif": {
            source: "iana"
          },
          "application/vnd.music-niff": {
            source: "iana"
          },
          "application/vnd.musician": {
            source: "iana",
            extensions: ["mus"]
          },
          "application/vnd.muvee.style": {
            source: "iana",
            extensions: ["msty"]
          },
          "application/vnd.mynfc": {
            source: "iana",
            extensions: ["taglet"]
          },
          "application/vnd.nacamar.ybrid+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.ncd.control": {
            source: "iana"
          },
          "application/vnd.ncd.reference": {
            source: "iana"
          },
          "application/vnd.nearst.inv+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.nebumind.line": {
            source: "iana"
          },
          "application/vnd.nervana": {
            source: "iana"
          },
          "application/vnd.netfpx": {
            source: "iana"
          },
          "application/vnd.neurolanguage.nlu": {
            source: "iana",
            extensions: ["nlu"]
          },
          "application/vnd.nimn": {
            source: "iana"
          },
          "application/vnd.nintendo.nitro.rom": {
            source: "iana"
          },
          "application/vnd.nintendo.snes.rom": {
            source: "iana"
          },
          "application/vnd.nitf": {
            source: "iana",
            extensions: ["ntf", "nitf"]
          },
          "application/vnd.noblenet-directory": {
            source: "iana",
            extensions: ["nnd"]
          },
          "application/vnd.noblenet-sealer": {
            source: "iana",
            extensions: ["nns"]
          },
          "application/vnd.noblenet-web": {
            source: "iana",
            extensions: ["nnw"]
          },
          "application/vnd.nokia.catalogs": {
            source: "iana"
          },
          "application/vnd.nokia.conml+wbxml": {
            source: "iana"
          },
          "application/vnd.nokia.conml+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.nokia.iptv.config+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.nokia.isds-radio-presets": {
            source: "iana"
          },
          "application/vnd.nokia.landmark+wbxml": {
            source: "iana"
          },
          "application/vnd.nokia.landmark+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.nokia.landmarkcollection+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.nokia.n-gage.ac+xml": {
            source: "iana",
            compressible: true,
            extensions: ["ac"]
          },
          "application/vnd.nokia.n-gage.data": {
            source: "iana",
            extensions: ["ngdat"]
          },
          "application/vnd.nokia.n-gage.symbian.install": {
            source: "iana",
            extensions: ["n-gage"]
          },
          "application/vnd.nokia.ncd": {
            source: "iana"
          },
          "application/vnd.nokia.pcd+wbxml": {
            source: "iana"
          },
          "application/vnd.nokia.pcd+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.nokia.radio-preset": {
            source: "iana",
            extensions: ["rpst"]
          },
          "application/vnd.nokia.radio-presets": {
            source: "iana",
            extensions: ["rpss"]
          },
          "application/vnd.novadigm.edm": {
            source: "iana",
            extensions: ["edm"]
          },
          "application/vnd.novadigm.edx": {
            source: "iana",
            extensions: ["edx"]
          },
          "application/vnd.novadigm.ext": {
            source: "iana",
            extensions: ["ext"]
          },
          "application/vnd.ntt-local.content-share": {
            source: "iana"
          },
          "application/vnd.ntt-local.file-transfer": {
            source: "iana"
          },
          "application/vnd.ntt-local.ogw_remote-access": {
            source: "iana"
          },
          "application/vnd.ntt-local.sip-ta_remote": {
            source: "iana"
          },
          "application/vnd.ntt-local.sip-ta_tcp_stream": {
            source: "iana"
          },
          "application/vnd.oasis.opendocument.chart": {
            source: "iana",
            extensions: ["odc"]
          },
          "application/vnd.oasis.opendocument.chart-template": {
            source: "iana",
            extensions: ["otc"]
          },
          "application/vnd.oasis.opendocument.database": {
            source: "iana",
            extensions: ["odb"]
          },
          "application/vnd.oasis.opendocument.formula": {
            source: "iana",
            extensions: ["odf"]
          },
          "application/vnd.oasis.opendocument.formula-template": {
            source: "iana",
            extensions: ["odft"]
          },
          "application/vnd.oasis.opendocument.graphics": {
            source: "iana",
            compressible: false,
            extensions: ["odg"]
          },
          "application/vnd.oasis.opendocument.graphics-template": {
            source: "iana",
            extensions: ["otg"]
          },
          "application/vnd.oasis.opendocument.image": {
            source: "iana",
            extensions: ["odi"]
          },
          "application/vnd.oasis.opendocument.image-template": {
            source: "iana",
            extensions: ["oti"]
          },
          "application/vnd.oasis.opendocument.presentation": {
            source: "iana",
            compressible: false,
            extensions: ["odp"]
          },
          "application/vnd.oasis.opendocument.presentation-template": {
            source: "iana",
            extensions: ["otp"]
          },
          "application/vnd.oasis.opendocument.spreadsheet": {
            source: "iana",
            compressible: false,
            extensions: ["ods"]
          },
          "application/vnd.oasis.opendocument.spreadsheet-template": {
            source: "iana",
            extensions: ["ots"]
          },
          "application/vnd.oasis.opendocument.text": {
            source: "iana",
            compressible: false,
            extensions: ["odt"]
          },
          "application/vnd.oasis.opendocument.text-master": {
            source: "iana",
            extensions: ["odm"]
          },
          "application/vnd.oasis.opendocument.text-template": {
            source: "iana",
            extensions: ["ott"]
          },
          "application/vnd.oasis.opendocument.text-web": {
            source: "iana",
            extensions: ["oth"]
          },
          "application/vnd.obn": {
            source: "iana"
          },
          "application/vnd.ocf+cbor": {
            source: "iana"
          },
          "application/vnd.oci.image.manifest.v1+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oftn.l10n+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.contentaccessdownload+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.contentaccessstreaming+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.cspg-hexbinary": {
            source: "iana"
          },
          "application/vnd.oipf.dae.svg+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.dae.xhtml+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.mippvcontrolmessage+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.pae.gem": {
            source: "iana"
          },
          "application/vnd.oipf.spdiscovery+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.spdlist+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.ueprofile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oipf.userprofile+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.olpc-sugar": {
            source: "iana",
            extensions: ["xo"]
          },
          "application/vnd.oma-scws-config": {
            source: "iana"
          },
          "application/vnd.oma-scws-http-request": {
            source: "iana"
          },
          "application/vnd.oma-scws-http-response": {
            source: "iana"
          },
          "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.drm-trigger+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.imd+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.ltkm": {
            source: "iana"
          },
          "application/vnd.oma.bcast.notification+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.provisioningtrigger": {
            source: "iana"
          },
          "application/vnd.oma.bcast.sgboot": {
            source: "iana"
          },
          "application/vnd.oma.bcast.sgdd+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.sgdu": {
            source: "iana"
          },
          "application/vnd.oma.bcast.simple-symbol-container": {
            source: "iana"
          },
          "application/vnd.oma.bcast.smartcard-trigger+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.sprov+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.bcast.stkm": {
            source: "iana"
          },
          "application/vnd.oma.cab-address-book+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.cab-feature-handler+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.cab-pcc+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.cab-subs-invite+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.cab-user-prefs+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.dcd": {
            source: "iana"
          },
          "application/vnd.oma.dcdc": {
            source: "iana"
          },
          "application/vnd.oma.dd2+xml": {
            source: "iana",
            compressible: true,
            extensions: ["dd2"]
          },
          "application/vnd.oma.drm.risd+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.group-usage-list+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.lwm2m+cbor": {
            source: "iana"
          },
          "application/vnd.oma.lwm2m+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.lwm2m+tlv": {
            source: "iana"
          },
          "application/vnd.oma.pal+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.poc.detailed-progress-report+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.poc.final-report+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.poc.groups+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.poc.invocation-descriptor+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.poc.optimized-progress-report+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.push": {
            source: "iana"
          },
          "application/vnd.oma.scidm.messages+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oma.xcap-directory+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.omads-email+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/vnd.omads-file+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/vnd.omads-folder+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/vnd.omaloc-supl-init": {
            source: "iana"
          },
          "application/vnd.onepager": {
            source: "iana"
          },
          "application/vnd.onepagertamp": {
            source: "iana"
          },
          "application/vnd.onepagertamx": {
            source: "iana"
          },
          "application/vnd.onepagertat": {
            source: "iana"
          },
          "application/vnd.onepagertatp": {
            source: "iana"
          },
          "application/vnd.onepagertatx": {
            source: "iana"
          },
          "application/vnd.openblox.game+xml": {
            source: "iana",
            compressible: true,
            extensions: ["obgx"]
          },
          "application/vnd.openblox.game-binary": {
            source: "iana"
          },
          "application/vnd.openeye.oeb": {
            source: "iana"
          },
          "application/vnd.openofficeorg.extension": {
            source: "apache",
            extensions: ["oxt"]
          },
          "application/vnd.openstreetmap.data+xml": {
            source: "iana",
            compressible: true,
            extensions: ["osm"]
          },
          "application/vnd.opentimestamps.ots": {
            source: "iana"
          },
          "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawing+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
            source: "iana",
            compressible: false,
            extensions: ["pptx"]
          },
          "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slide": {
            source: "iana",
            extensions: ["sldx"]
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
            source: "iana",
            extensions: ["ppsx"]
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.template": {
            source: "iana",
            extensions: ["potx"]
          },
          "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            source: "iana",
            compressible: false,
            extensions: ["xlsx"]
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
            source: "iana",
            extensions: ["xltx"]
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.theme+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.vmldrawing": {
            source: "iana"
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            source: "iana",
            compressible: false,
            extensions: ["docx"]
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
            source: "iana",
            extensions: ["dotx"]
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-package.core-properties+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.openxmlformats-package.relationships+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oracle.resource+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.orange.indata": {
            source: "iana"
          },
          "application/vnd.osa.netdeploy": {
            source: "iana"
          },
          "application/vnd.osgeo.mapguide.package": {
            source: "iana",
            extensions: ["mgp"]
          },
          "application/vnd.osgi.bundle": {
            source: "iana"
          },
          "application/vnd.osgi.dp": {
            source: "iana",
            extensions: ["dp"]
          },
          "application/vnd.osgi.subsystem": {
            source: "iana",
            extensions: ["esa"]
          },
          "application/vnd.otps.ct-kip+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.oxli.countgraph": {
            source: "iana"
          },
          "application/vnd.pagerduty+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.palm": {
            source: "iana",
            extensions: ["pdb", "pqa", "oprc"]
          },
          "application/vnd.panoply": {
            source: "iana"
          },
          "application/vnd.paos.xml": {
            source: "iana"
          },
          "application/vnd.patentdive": {
            source: "iana"
          },
          "application/vnd.patientecommsdoc": {
            source: "iana"
          },
          "application/vnd.pawaafile": {
            source: "iana",
            extensions: ["paw"]
          },
          "application/vnd.pcos": {
            source: "iana"
          },
          "application/vnd.pg.format": {
            source: "iana",
            extensions: ["str"]
          },
          "application/vnd.pg.osasli": {
            source: "iana",
            extensions: ["ei6"]
          },
          "application/vnd.piaccess.application-licence": {
            source: "iana"
          },
          "application/vnd.picsel": {
            source: "iana",
            extensions: ["efif"]
          },
          "application/vnd.pmi.widget": {
            source: "iana",
            extensions: ["wg"]
          },
          "application/vnd.poc.group-advertisement+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.pocketlearn": {
            source: "iana",
            extensions: ["plf"]
          },
          "application/vnd.powerbuilder6": {
            source: "iana",
            extensions: ["pbd"]
          },
          "application/vnd.powerbuilder6-s": {
            source: "iana"
          },
          "application/vnd.powerbuilder7": {
            source: "iana"
          },
          "application/vnd.powerbuilder7-s": {
            source: "iana"
          },
          "application/vnd.powerbuilder75": {
            source: "iana"
          },
          "application/vnd.powerbuilder75-s": {
            source: "iana"
          },
          "application/vnd.preminet": {
            source: "iana"
          },
          "application/vnd.previewsystems.box": {
            source: "iana",
            extensions: ["box"]
          },
          "application/vnd.proteus.magazine": {
            source: "iana",
            extensions: ["mgz"]
          },
          "application/vnd.psfs": {
            source: "iana"
          },
          "application/vnd.publishare-delta-tree": {
            source: "iana",
            extensions: ["qps"]
          },
          "application/vnd.pvi.ptid1": {
            source: "iana",
            extensions: ["ptid"]
          },
          "application/vnd.pwg-multiplexed": {
            source: "iana"
          },
          "application/vnd.pwg-xhtml-print+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.qualcomm.brew-app-res": {
            source: "iana"
          },
          "application/vnd.quarantainenet": {
            source: "iana"
          },
          "application/vnd.quark.quarkxpress": {
            source: "iana",
            extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
          },
          "application/vnd.quobject-quoxdocument": {
            source: "iana"
          },
          "application/vnd.radisys.moml+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-audit+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-audit-conf+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-audit-conn+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-audit-dialog+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-audit-stream+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-conf+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog-base+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog-fax-detect+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog-group+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog-speech+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.radisys.msml-dialog-transform+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.rainstor.data": {
            source: "iana"
          },
          "application/vnd.rapid": {
            source: "iana"
          },
          "application/vnd.rar": {
            source: "iana",
            extensions: ["rar"]
          },
          "application/vnd.realvnc.bed": {
            source: "iana",
            extensions: ["bed"]
          },
          "application/vnd.recordare.musicxml": {
            source: "iana",
            extensions: ["mxl"]
          },
          "application/vnd.recordare.musicxml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["musicxml"]
          },
          "application/vnd.renlearn.rlprint": {
            source: "iana"
          },
          "application/vnd.resilient.logic": {
            source: "iana"
          },
          "application/vnd.restful+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.rig.cryptonote": {
            source: "iana",
            extensions: ["cryptonote"]
          },
          "application/vnd.rim.cod": {
            source: "apache",
            extensions: ["cod"]
          },
          "application/vnd.rn-realmedia": {
            source: "apache",
            extensions: ["rm"]
          },
          "application/vnd.rn-realmedia-vbr": {
            source: "apache",
            extensions: ["rmvb"]
          },
          "application/vnd.route66.link66+xml": {
            source: "iana",
            compressible: true,
            extensions: ["link66"]
          },
          "application/vnd.rs-274x": {
            source: "iana"
          },
          "application/vnd.ruckus.download": {
            source: "iana"
          },
          "application/vnd.s3sms": {
            source: "iana"
          },
          "application/vnd.sailingtracker.track": {
            source: "iana",
            extensions: ["st"]
          },
          "application/vnd.sar": {
            source: "iana"
          },
          "application/vnd.sbm.cid": {
            source: "iana"
          },
          "application/vnd.sbm.mid2": {
            source: "iana"
          },
          "application/vnd.scribus": {
            source: "iana"
          },
          "application/vnd.sealed.3df": {
            source: "iana"
          },
          "application/vnd.sealed.csf": {
            source: "iana"
          },
          "application/vnd.sealed.doc": {
            source: "iana"
          },
          "application/vnd.sealed.eml": {
            source: "iana"
          },
          "application/vnd.sealed.mht": {
            source: "iana"
          },
          "application/vnd.sealed.net": {
            source: "iana"
          },
          "application/vnd.sealed.ppt": {
            source: "iana"
          },
          "application/vnd.sealed.tiff": {
            source: "iana"
          },
          "application/vnd.sealed.xls": {
            source: "iana"
          },
          "application/vnd.sealedmedia.softseal.html": {
            source: "iana"
          },
          "application/vnd.sealedmedia.softseal.pdf": {
            source: "iana"
          },
          "application/vnd.seemail": {
            source: "iana",
            extensions: ["see"]
          },
          "application/vnd.seis+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.sema": {
            source: "iana",
            extensions: ["sema"]
          },
          "application/vnd.semd": {
            source: "iana",
            extensions: ["semd"]
          },
          "application/vnd.semf": {
            source: "iana",
            extensions: ["semf"]
          },
          "application/vnd.shade-save-file": {
            source: "iana"
          },
          "application/vnd.shana.informed.formdata": {
            source: "iana",
            extensions: ["ifm"]
          },
          "application/vnd.shana.informed.formtemplate": {
            source: "iana",
            extensions: ["itp"]
          },
          "application/vnd.shana.informed.interchange": {
            source: "iana",
            extensions: ["iif"]
          },
          "application/vnd.shana.informed.package": {
            source: "iana",
            extensions: ["ipk"]
          },
          "application/vnd.shootproof+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.shopkick+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.shp": {
            source: "iana"
          },
          "application/vnd.shx": {
            source: "iana"
          },
          "application/vnd.sigrok.session": {
            source: "iana"
          },
          "application/vnd.simtech-mindmapper": {
            source: "iana",
            extensions: ["twd", "twds"]
          },
          "application/vnd.siren+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.smaf": {
            source: "iana",
            extensions: ["mmf"]
          },
          "application/vnd.smart.notebook": {
            source: "iana"
          },
          "application/vnd.smart.teacher": {
            source: "iana",
            extensions: ["teacher"]
          },
          "application/vnd.snesdev-page-table": {
            source: "iana"
          },
          "application/vnd.software602.filler.form+xml": {
            source: "iana",
            compressible: true,
            extensions: ["fo"]
          },
          "application/vnd.software602.filler.form-xml-zip": {
            source: "iana"
          },
          "application/vnd.solent.sdkm+xml": {
            source: "iana",
            compressible: true,
            extensions: ["sdkm", "sdkd"]
          },
          "application/vnd.spotfire.dxp": {
            source: "iana",
            extensions: ["dxp"]
          },
          "application/vnd.spotfire.sfs": {
            source: "iana",
            extensions: ["sfs"]
          },
          "application/vnd.sqlite3": {
            source: "iana"
          },
          "application/vnd.sss-cod": {
            source: "iana"
          },
          "application/vnd.sss-dtf": {
            source: "iana"
          },
          "application/vnd.sss-ntf": {
            source: "iana"
          },
          "application/vnd.stardivision.calc": {
            source: "apache",
            extensions: ["sdc"]
          },
          "application/vnd.stardivision.draw": {
            source: "apache",
            extensions: ["sda"]
          },
          "application/vnd.stardivision.impress": {
            source: "apache",
            extensions: ["sdd"]
          },
          "application/vnd.stardivision.math": {
            source: "apache",
            extensions: ["smf"]
          },
          "application/vnd.stardivision.writer": {
            source: "apache",
            extensions: ["sdw", "vor"]
          },
          "application/vnd.stardivision.writer-global": {
            source: "apache",
            extensions: ["sgl"]
          },
          "application/vnd.stepmania.package": {
            source: "iana",
            extensions: ["smzip"]
          },
          "application/vnd.stepmania.stepchart": {
            source: "iana",
            extensions: ["sm"]
          },
          "application/vnd.street-stream": {
            source: "iana"
          },
          "application/vnd.sun.wadl+xml": {
            source: "iana",
            compressible: true,
            extensions: ["wadl"]
          },
          "application/vnd.sun.xml.calc": {
            source: "apache",
            extensions: ["sxc"]
          },
          "application/vnd.sun.xml.calc.template": {
            source: "apache",
            extensions: ["stc"]
          },
          "application/vnd.sun.xml.draw": {
            source: "apache",
            extensions: ["sxd"]
          },
          "application/vnd.sun.xml.draw.template": {
            source: "apache",
            extensions: ["std"]
          },
          "application/vnd.sun.xml.impress": {
            source: "apache",
            extensions: ["sxi"]
          },
          "application/vnd.sun.xml.impress.template": {
            source: "apache",
            extensions: ["sti"]
          },
          "application/vnd.sun.xml.math": {
            source: "apache",
            extensions: ["sxm"]
          },
          "application/vnd.sun.xml.writer": {
            source: "apache",
            extensions: ["sxw"]
          },
          "application/vnd.sun.xml.writer.global": {
            source: "apache",
            extensions: ["sxg"]
          },
          "application/vnd.sun.xml.writer.template": {
            source: "apache",
            extensions: ["stw"]
          },
          "application/vnd.sus-calendar": {
            source: "iana",
            extensions: ["sus", "susp"]
          },
          "application/vnd.svd": {
            source: "iana",
            extensions: ["svd"]
          },
          "application/vnd.swiftview-ics": {
            source: "iana"
          },
          "application/vnd.sycle+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.syft+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.symbian.install": {
            source: "apache",
            extensions: ["sis", "sisx"]
          },
          "application/vnd.syncml+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["xsm"]
          },
          "application/vnd.syncml.dm+wbxml": {
            source: "iana",
            charset: "UTF-8",
            extensions: ["bdm"]
          },
          "application/vnd.syncml.dm+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["xdm"]
          },
          "application/vnd.syncml.dm.notification": {
            source: "iana"
          },
          "application/vnd.syncml.dmddf+wbxml": {
            source: "iana"
          },
          "application/vnd.syncml.dmddf+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["ddf"]
          },
          "application/vnd.syncml.dmtnds+wbxml": {
            source: "iana"
          },
          "application/vnd.syncml.dmtnds+xml": {
            source: "iana",
            charset: "UTF-8",
            compressible: true
          },
          "application/vnd.syncml.ds.notification": {
            source: "iana"
          },
          "application/vnd.tableschema+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.tao.intent-module-archive": {
            source: "iana",
            extensions: ["tao"]
          },
          "application/vnd.tcpdump.pcap": {
            source: "iana",
            extensions: ["pcap", "cap", "dmp"]
          },
          "application/vnd.think-cell.ppttc+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.tmd.mediaflex.api+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.tml": {
            source: "iana"
          },
          "application/vnd.tmobile-livetv": {
            source: "iana",
            extensions: ["tmo"]
          },
          "application/vnd.tri.onesource": {
            source: "iana"
          },
          "application/vnd.trid.tpt": {
            source: "iana",
            extensions: ["tpt"]
          },
          "application/vnd.triscape.mxs": {
            source: "iana",
            extensions: ["mxs"]
          },
          "application/vnd.trueapp": {
            source: "iana",
            extensions: ["tra"]
          },
          "application/vnd.truedoc": {
            source: "iana"
          },
          "application/vnd.ubisoft.webplayer": {
            source: "iana"
          },
          "application/vnd.ufdl": {
            source: "iana",
            extensions: ["ufd", "ufdl"]
          },
          "application/vnd.uiq.theme": {
            source: "iana",
            extensions: ["utz"]
          },
          "application/vnd.umajin": {
            source: "iana",
            extensions: ["umj"]
          },
          "application/vnd.unity": {
            source: "iana",
            extensions: ["unityweb"]
          },
          "application/vnd.uoml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["uoml"]
          },
          "application/vnd.uplanet.alert": {
            source: "iana"
          },
          "application/vnd.uplanet.alert-wbxml": {
            source: "iana"
          },
          "application/vnd.uplanet.bearer-choice": {
            source: "iana"
          },
          "application/vnd.uplanet.bearer-choice-wbxml": {
            source: "iana"
          },
          "application/vnd.uplanet.cacheop": {
            source: "iana"
          },
          "application/vnd.uplanet.cacheop-wbxml": {
            source: "iana"
          },
          "application/vnd.uplanet.channel": {
            source: "iana"
          },
          "application/vnd.uplanet.channel-wbxml": {
            source: "iana"
          },
          "application/vnd.uplanet.list": {
            source: "iana"
          },
          "application/vnd.uplanet.list-wbxml": {
            source: "iana"
          },
          "application/vnd.uplanet.listcmd": {
            source: "iana"
          },
          "application/vnd.uplanet.listcmd-wbxml": {
            source: "iana"
          },
          "application/vnd.uplanet.signal": {
            source: "iana"
          },
          "application/vnd.uri-map": {
            source: "iana"
          },
          "application/vnd.valve.source.material": {
            source: "iana"
          },
          "application/vnd.vcx": {
            source: "iana",
            extensions: ["vcx"]
          },
          "application/vnd.vd-study": {
            source: "iana"
          },
          "application/vnd.vectorworks": {
            source: "iana"
          },
          "application/vnd.vel+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.verimatrix.vcas": {
            source: "iana"
          },
          "application/vnd.veritone.aion+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.veryant.thin": {
            source: "iana"
          },
          "application/vnd.ves.encrypted": {
            source: "iana"
          },
          "application/vnd.vidsoft.vidconference": {
            source: "iana"
          },
          "application/vnd.visio": {
            source: "iana",
            extensions: ["vsd", "vst", "vss", "vsw"]
          },
          "application/vnd.visionary": {
            source: "iana",
            extensions: ["vis"]
          },
          "application/vnd.vividence.scriptfile": {
            source: "iana"
          },
          "application/vnd.vsf": {
            source: "iana",
            extensions: ["vsf"]
          },
          "application/vnd.wap.sic": {
            source: "iana"
          },
          "application/vnd.wap.slc": {
            source: "iana"
          },
          "application/vnd.wap.wbxml": {
            source: "iana",
            charset: "UTF-8",
            extensions: ["wbxml"]
          },
          "application/vnd.wap.wmlc": {
            source: "iana",
            extensions: ["wmlc"]
          },
          "application/vnd.wap.wmlscriptc": {
            source: "iana",
            extensions: ["wmlsc"]
          },
          "application/vnd.webturbo": {
            source: "iana",
            extensions: ["wtb"]
          },
          "application/vnd.wfa.dpp": {
            source: "iana"
          },
          "application/vnd.wfa.p2p": {
            source: "iana"
          },
          "application/vnd.wfa.wsc": {
            source: "iana"
          },
          "application/vnd.windows.devicepairing": {
            source: "iana"
          },
          "application/vnd.wmc": {
            source: "iana"
          },
          "application/vnd.wmf.bootstrap": {
            source: "iana"
          },
          "application/vnd.wolfram.mathematica": {
            source: "iana"
          },
          "application/vnd.wolfram.mathematica.package": {
            source: "iana"
          },
          "application/vnd.wolfram.player": {
            source: "iana",
            extensions: ["nbp"]
          },
          "application/vnd.wordperfect": {
            source: "iana",
            extensions: ["wpd"]
          },
          "application/vnd.wqd": {
            source: "iana",
            extensions: ["wqd"]
          },
          "application/vnd.wrq-hp3000-labelled": {
            source: "iana"
          },
          "application/vnd.wt.stf": {
            source: "iana",
            extensions: ["stf"]
          },
          "application/vnd.wv.csp+wbxml": {
            source: "iana"
          },
          "application/vnd.wv.csp+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.wv.ssp+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.xacml+json": {
            source: "iana",
            compressible: true
          },
          "application/vnd.xara": {
            source: "iana",
            extensions: ["xar"]
          },
          "application/vnd.xfdl": {
            source: "iana",
            extensions: ["xfdl"]
          },
          "application/vnd.xfdl.webform": {
            source: "iana"
          },
          "application/vnd.xmi+xml": {
            source: "iana",
            compressible: true
          },
          "application/vnd.xmpie.cpkg": {
            source: "iana"
          },
          "application/vnd.xmpie.dpkg": {
            source: "iana"
          },
          "application/vnd.xmpie.plan": {
            source: "iana"
          },
          "application/vnd.xmpie.ppkg": {
            source: "iana"
          },
          "application/vnd.xmpie.xlim": {
            source: "iana"
          },
          "application/vnd.yamaha.hv-dic": {
            source: "iana",
            extensions: ["hvd"]
          },
          "application/vnd.yamaha.hv-script": {
            source: "iana",
            extensions: ["hvs"]
          },
          "application/vnd.yamaha.hv-voice": {
            source: "iana",
            extensions: ["hvp"]
          },
          "application/vnd.yamaha.openscoreformat": {
            source: "iana",
            extensions: ["osf"]
          },
          "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
            source: "iana",
            compressible: true,
            extensions: ["osfpvg"]
          },
          "application/vnd.yamaha.remote-setup": {
            source: "iana"
          },
          "application/vnd.yamaha.smaf-audio": {
            source: "iana",
            extensions: ["saf"]
          },
          "application/vnd.yamaha.smaf-phrase": {
            source: "iana",
            extensions: ["spf"]
          },
          "application/vnd.yamaha.through-ngn": {
            source: "iana"
          },
          "application/vnd.yamaha.tunnel-udpencap": {
            source: "iana"
          },
          "application/vnd.yaoweme": {
            source: "iana"
          },
          "application/vnd.yellowriver-custom-menu": {
            source: "iana",
            extensions: ["cmp"]
          },
          "application/vnd.youtube.yt": {
            source: "iana"
          },
          "application/vnd.zul": {
            source: "iana",
            extensions: ["zir", "zirz"]
          },
          "application/vnd.zzazz.deck+xml": {
            source: "iana",
            compressible: true,
            extensions: ["zaz"]
          },
          "application/voicexml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["vxml"]
          },
          "application/voucher-cms+json": {
            source: "iana",
            compressible: true
          },
          "application/vq-rtcpxr": {
            source: "iana"
          },
          "application/wasm": {
            source: "iana",
            compressible: true,
            extensions: ["wasm"]
          },
          "application/watcherinfo+xml": {
            source: "iana",
            compressible: true,
            extensions: ["wif"]
          },
          "application/webpush-options+json": {
            source: "iana",
            compressible: true
          },
          "application/whoispp-query": {
            source: "iana"
          },
          "application/whoispp-response": {
            source: "iana"
          },
          "application/widget": {
            source: "iana",
            extensions: ["wgt"]
          },
          "application/winhlp": {
            source: "apache",
            extensions: ["hlp"]
          },
          "application/wita": {
            source: "iana"
          },
          "application/wordperfect5.1": {
            source: "iana"
          },
          "application/wsdl+xml": {
            source: "iana",
            compressible: true,
            extensions: ["wsdl"]
          },
          "application/wspolicy+xml": {
            source: "iana",
            compressible: true,
            extensions: ["wspolicy"]
          },
          "application/x-7z-compressed": {
            source: "apache",
            compressible: false,
            extensions: ["7z"]
          },
          "application/x-abiword": {
            source: "apache",
            extensions: ["abw"]
          },
          "application/x-ace-compressed": {
            source: "apache",
            extensions: ["ace"]
          },
          "application/x-amf": {
            source: "apache"
          },
          "application/x-apple-diskimage": {
            source: "apache",
            extensions: ["dmg"]
          },
          "application/x-arj": {
            compressible: false,
            extensions: ["arj"]
          },
          "application/x-authorware-bin": {
            source: "apache",
            extensions: ["aab", "x32", "u32", "vox"]
          },
          "application/x-authorware-map": {
            source: "apache",
            extensions: ["aam"]
          },
          "application/x-authorware-seg": {
            source: "apache",
            extensions: ["aas"]
          },
          "application/x-bcpio": {
            source: "apache",
            extensions: ["bcpio"]
          },
          "application/x-bdoc": {
            compressible: false,
            extensions: ["bdoc"]
          },
          "application/x-bittorrent": {
            source: "apache",
            extensions: ["torrent"]
          },
          "application/x-blorb": {
            source: "apache",
            extensions: ["blb", "blorb"]
          },
          "application/x-bzip": {
            source: "apache",
            compressible: false,
            extensions: ["bz"]
          },
          "application/x-bzip2": {
            source: "apache",
            compressible: false,
            extensions: ["bz2", "boz"]
          },
          "application/x-cbr": {
            source: "apache",
            extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
          },
          "application/x-cdlink": {
            source: "apache",
            extensions: ["vcd"]
          },
          "application/x-cfs-compressed": {
            source: "apache",
            extensions: ["cfs"]
          },
          "application/x-chat": {
            source: "apache",
            extensions: ["chat"]
          },
          "application/x-chess-pgn": {
            source: "apache",
            extensions: ["pgn"]
          },
          "application/x-chrome-extension": {
            extensions: ["crx"]
          },
          "application/x-cocoa": {
            source: "nginx",
            extensions: ["cco"]
          },
          "application/x-compress": {
            source: "apache"
          },
          "application/x-conference": {
            source: "apache",
            extensions: ["nsc"]
          },
          "application/x-cpio": {
            source: "apache",
            extensions: ["cpio"]
          },
          "application/x-csh": {
            source: "apache",
            extensions: ["csh"]
          },
          "application/x-deb": {
            compressible: false
          },
          "application/x-debian-package": {
            source: "apache",
            extensions: ["deb", "udeb"]
          },
          "application/x-dgc-compressed": {
            source: "apache",
            extensions: ["dgc"]
          },
          "application/x-director": {
            source: "apache",
            extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
          },
          "application/x-doom": {
            source: "apache",
            extensions: ["wad"]
          },
          "application/x-dtbncx+xml": {
            source: "apache",
            compressible: true,
            extensions: ["ncx"]
          },
          "application/x-dtbook+xml": {
            source: "apache",
            compressible: true,
            extensions: ["dtb"]
          },
          "application/x-dtbresource+xml": {
            source: "apache",
            compressible: true,
            extensions: ["res"]
          },
          "application/x-dvi": {
            source: "apache",
            compressible: false,
            extensions: ["dvi"]
          },
          "application/x-envoy": {
            source: "apache",
            extensions: ["evy"]
          },
          "application/x-eva": {
            source: "apache",
            extensions: ["eva"]
          },
          "application/x-font-bdf": {
            source: "apache",
            extensions: ["bdf"]
          },
          "application/x-font-dos": {
            source: "apache"
          },
          "application/x-font-framemaker": {
            source: "apache"
          },
          "application/x-font-ghostscript": {
            source: "apache",
            extensions: ["gsf"]
          },
          "application/x-font-libgrx": {
            source: "apache"
          },
          "application/x-font-linux-psf": {
            source: "apache",
            extensions: ["psf"]
          },
          "application/x-font-pcf": {
            source: "apache",
            extensions: ["pcf"]
          },
          "application/x-font-snf": {
            source: "apache",
            extensions: ["snf"]
          },
          "application/x-font-speedo": {
            source: "apache"
          },
          "application/x-font-sunos-news": {
            source: "apache"
          },
          "application/x-font-type1": {
            source: "apache",
            extensions: ["pfa", "pfb", "pfm", "afm"]
          },
          "application/x-font-vfont": {
            source: "apache"
          },
          "application/x-freearc": {
            source: "apache",
            extensions: ["arc"]
          },
          "application/x-futuresplash": {
            source: "apache",
            extensions: ["spl"]
          },
          "application/x-gca-compressed": {
            source: "apache",
            extensions: ["gca"]
          },
          "application/x-glulx": {
            source: "apache",
            extensions: ["ulx"]
          },
          "application/x-gnumeric": {
            source: "apache",
            extensions: ["gnumeric"]
          },
          "application/x-gramps-xml": {
            source: "apache",
            extensions: ["gramps"]
          },
          "application/x-gtar": {
            source: "apache",
            extensions: ["gtar"]
          },
          "application/x-gzip": {
            source: "apache"
          },
          "application/x-hdf": {
            source: "apache",
            extensions: ["hdf"]
          },
          "application/x-httpd-php": {
            compressible: true,
            extensions: ["php"]
          },
          "application/x-install-instructions": {
            source: "apache",
            extensions: ["install"]
          },
          "application/x-iso9660-image": {
            source: "apache",
            extensions: ["iso"]
          },
          "application/x-iwork-keynote-sffkey": {
            extensions: ["key"]
          },
          "application/x-iwork-numbers-sffnumbers": {
            extensions: ["numbers"]
          },
          "application/x-iwork-pages-sffpages": {
            extensions: ["pages"]
          },
          "application/x-java-archive-diff": {
            source: "nginx",
            extensions: ["jardiff"]
          },
          "application/x-java-jnlp-file": {
            source: "apache",
            compressible: false,
            extensions: ["jnlp"]
          },
          "application/x-javascript": {
            compressible: true
          },
          "application/x-keepass2": {
            extensions: ["kdbx"]
          },
          "application/x-latex": {
            source: "apache",
            compressible: false,
            extensions: ["latex"]
          },
          "application/x-lua-bytecode": {
            extensions: ["luac"]
          },
          "application/x-lzh-compressed": {
            source: "apache",
            extensions: ["lzh", "lha"]
          },
          "application/x-makeself": {
            source: "nginx",
            extensions: ["run"]
          },
          "application/x-mie": {
            source: "apache",
            extensions: ["mie"]
          },
          "application/x-mobipocket-ebook": {
            source: "apache",
            extensions: ["prc", "mobi"]
          },
          "application/x-mpegurl": {
            compressible: false
          },
          "application/x-ms-application": {
            source: "apache",
            extensions: ["application"]
          },
          "application/x-ms-shortcut": {
            source: "apache",
            extensions: ["lnk"]
          },
          "application/x-ms-wmd": {
            source: "apache",
            extensions: ["wmd"]
          },
          "application/x-ms-wmz": {
            source: "apache",
            extensions: ["wmz"]
          },
          "application/x-ms-xbap": {
            source: "apache",
            extensions: ["xbap"]
          },
          "application/x-msaccess": {
            source: "apache",
            extensions: ["mdb"]
          },
          "application/x-msbinder": {
            source: "apache",
            extensions: ["obd"]
          },
          "application/x-mscardfile": {
            source: "apache",
            extensions: ["crd"]
          },
          "application/x-msclip": {
            source: "apache",
            extensions: ["clp"]
          },
          "application/x-msdos-program": {
            extensions: ["exe"]
          },
          "application/x-msdownload": {
            source: "apache",
            extensions: ["exe", "dll", "com", "bat", "msi"]
          },
          "application/x-msmediaview": {
            source: "apache",
            extensions: ["mvb", "m13", "m14"]
          },
          "application/x-msmetafile": {
            source: "apache",
            extensions: ["wmf", "wmz", "emf", "emz"]
          },
          "application/x-msmoney": {
            source: "apache",
            extensions: ["mny"]
          },
          "application/x-mspublisher": {
            source: "apache",
            extensions: ["pub"]
          },
          "application/x-msschedule": {
            source: "apache",
            extensions: ["scd"]
          },
          "application/x-msterminal": {
            source: "apache",
            extensions: ["trm"]
          },
          "application/x-mswrite": {
            source: "apache",
            extensions: ["wri"]
          },
          "application/x-netcdf": {
            source: "apache",
            extensions: ["nc", "cdf"]
          },
          "application/x-ns-proxy-autoconfig": {
            compressible: true,
            extensions: ["pac"]
          },
          "application/x-nzb": {
            source: "apache",
            extensions: ["nzb"]
          },
          "application/x-perl": {
            source: "nginx",
            extensions: ["pl", "pm"]
          },
          "application/x-pilot": {
            source: "nginx",
            extensions: ["prc", "pdb"]
          },
          "application/x-pkcs12": {
            source: "apache",
            compressible: false,
            extensions: ["p12", "pfx"]
          },
          "application/x-pkcs7-certificates": {
            source: "apache",
            extensions: ["p7b", "spc"]
          },
          "application/x-pkcs7-certreqresp": {
            source: "apache",
            extensions: ["p7r"]
          },
          "application/x-pki-message": {
            source: "iana"
          },
          "application/x-rar-compressed": {
            source: "apache",
            compressible: false,
            extensions: ["rar"]
          },
          "application/x-redhat-package-manager": {
            source: "nginx",
            extensions: ["rpm"]
          },
          "application/x-research-info-systems": {
            source: "apache",
            extensions: ["ris"]
          },
          "application/x-sea": {
            source: "nginx",
            extensions: ["sea"]
          },
          "application/x-sh": {
            source: "apache",
            compressible: true,
            extensions: ["sh"]
          },
          "application/x-shar": {
            source: "apache",
            extensions: ["shar"]
          },
          "application/x-shockwave-flash": {
            source: "apache",
            compressible: false,
            extensions: ["swf"]
          },
          "application/x-silverlight-app": {
            source: "apache",
            extensions: ["xap"]
          },
          "application/x-sql": {
            source: "apache",
            extensions: ["sql"]
          },
          "application/x-stuffit": {
            source: "apache",
            compressible: false,
            extensions: ["sit"]
          },
          "application/x-stuffitx": {
            source: "apache",
            extensions: ["sitx"]
          },
          "application/x-subrip": {
            source: "apache",
            extensions: ["srt"]
          },
          "application/x-sv4cpio": {
            source: "apache",
            extensions: ["sv4cpio"]
          },
          "application/x-sv4crc": {
            source: "apache",
            extensions: ["sv4crc"]
          },
          "application/x-t3vm-image": {
            source: "apache",
            extensions: ["t3"]
          },
          "application/x-tads": {
            source: "apache",
            extensions: ["gam"]
          },
          "application/x-tar": {
            source: "apache",
            compressible: true,
            extensions: ["tar"]
          },
          "application/x-tcl": {
            source: "apache",
            extensions: ["tcl", "tk"]
          },
          "application/x-tex": {
            source: "apache",
            extensions: ["tex"]
          },
          "application/x-tex-tfm": {
            source: "apache",
            extensions: ["tfm"]
          },
          "application/x-texinfo": {
            source: "apache",
            extensions: ["texinfo", "texi"]
          },
          "application/x-tgif": {
            source: "apache",
            extensions: ["obj"]
          },
          "application/x-ustar": {
            source: "apache",
            extensions: ["ustar"]
          },
          "application/x-virtualbox-hdd": {
            compressible: true,
            extensions: ["hdd"]
          },
          "application/x-virtualbox-ova": {
            compressible: true,
            extensions: ["ova"]
          },
          "application/x-virtualbox-ovf": {
            compressible: true,
            extensions: ["ovf"]
          },
          "application/x-virtualbox-vbox": {
            compressible: true,
            extensions: ["vbox"]
          },
          "application/x-virtualbox-vbox-extpack": {
            compressible: false,
            extensions: ["vbox-extpack"]
          },
          "application/x-virtualbox-vdi": {
            compressible: true,
            extensions: ["vdi"]
          },
          "application/x-virtualbox-vhd": {
            compressible: true,
            extensions: ["vhd"]
          },
          "application/x-virtualbox-vmdk": {
            compressible: true,
            extensions: ["vmdk"]
          },
          "application/x-wais-source": {
            source: "apache",
            extensions: ["src"]
          },
          "application/x-web-app-manifest+json": {
            compressible: true,
            extensions: ["webapp"]
          },
          "application/x-www-form-urlencoded": {
            source: "iana",
            compressible: true
          },
          "application/x-x509-ca-cert": {
            source: "iana",
            extensions: ["der", "crt", "pem"]
          },
          "application/x-x509-ca-ra-cert": {
            source: "iana"
          },
          "application/x-x509-next-ca-cert": {
            source: "iana"
          },
          "application/x-xfig": {
            source: "apache",
            extensions: ["fig"]
          },
          "application/x-xliff+xml": {
            source: "apache",
            compressible: true,
            extensions: ["xlf"]
          },
          "application/x-xpinstall": {
            source: "apache",
            compressible: false,
            extensions: ["xpi"]
          },
          "application/x-xz": {
            source: "apache",
            extensions: ["xz"]
          },
          "application/x-zmachine": {
            source: "apache",
            extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
          },
          "application/x400-bp": {
            source: "iana"
          },
          "application/xacml+xml": {
            source: "iana",
            compressible: true
          },
          "application/xaml+xml": {
            source: "apache",
            compressible: true,
            extensions: ["xaml"]
          },
          "application/xcap-att+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xav"]
          },
          "application/xcap-caps+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xca"]
          },
          "application/xcap-diff+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xdf"]
          },
          "application/xcap-el+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xel"]
          },
          "application/xcap-error+xml": {
            source: "iana",
            compressible: true
          },
          "application/xcap-ns+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xns"]
          },
          "application/xcon-conference-info+xml": {
            source: "iana",
            compressible: true
          },
          "application/xcon-conference-info-diff+xml": {
            source: "iana",
            compressible: true
          },
          "application/xenc+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xenc"]
          },
          "application/xhtml+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xhtml", "xht"]
          },
          "application/xhtml-voice+xml": {
            source: "apache",
            compressible: true
          },
          "application/xliff+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xlf"]
          },
          "application/xml": {
            source: "iana",
            compressible: true,
            extensions: ["xml", "xsl", "xsd", "rng"]
          },
          "application/xml-dtd": {
            source: "iana",
            compressible: true,
            extensions: ["dtd"]
          },
          "application/xml-external-parsed-entity": {
            source: "iana"
          },
          "application/xml-patch+xml": {
            source: "iana",
            compressible: true
          },
          "application/xmpp+xml": {
            source: "iana",
            compressible: true
          },
          "application/xop+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xop"]
          },
          "application/xproc+xml": {
            source: "apache",
            compressible: true,
            extensions: ["xpl"]
          },
          "application/xslt+xml": {
            source: "iana",
            compressible: true,
            extensions: ["xsl", "xslt"]
          },
          "application/xspf+xml": {
            source: "apache",
            compressible: true,
            extensions: ["xspf"]
          },
          "application/xv+xml": {
            source: "iana",
            compressible: true,
            extensions: ["mxml", "xhvml", "xvml", "xvm"]
          },
          "application/yang": {
            source: "iana",
            extensions: ["yang"]
          },
          "application/yang-data+json": {
            source: "iana",
            compressible: true
          },
          "application/yang-data+xml": {
            source: "iana",
            compressible: true
          },
          "application/yang-patch+json": {
            source: "iana",
            compressible: true
          },
          "application/yang-patch+xml": {
            source: "iana",
            compressible: true
          },
          "application/yin+xml": {
            source: "iana",
            compressible: true,
            extensions: ["yin"]
          },
          "application/zip": {
            source: "iana",
            compressible: false,
            extensions: ["zip"]
          },
          "application/zlib": {
            source: "iana"
          },
          "application/zstd": {
            source: "iana"
          },
          "audio/1d-interleaved-parityfec": {
            source: "iana"
          },
          "audio/32kadpcm": {
            source: "iana"
          },
          "audio/3gpp": {
            source: "iana",
            compressible: false,
            extensions: ["3gpp"]
          },
          "audio/3gpp2": {
            source: "iana"
          },
          "audio/aac": {
            source: "iana"
          },
          "audio/ac3": {
            source: "iana"
          },
          "audio/adpcm": {
            source: "apache",
            extensions: ["adp"]
          },
          "audio/amr": {
            source: "iana",
            extensions: ["amr"]
          },
          "audio/amr-wb": {
            source: "iana"
          },
          "audio/amr-wb+": {
            source: "iana"
          },
          "audio/aptx": {
            source: "iana"
          },
          "audio/asc": {
            source: "iana"
          },
          "audio/atrac-advanced-lossless": {
            source: "iana"
          },
          "audio/atrac-x": {
            source: "iana"
          },
          "audio/atrac3": {
            source: "iana"
          },
          "audio/basic": {
            source: "iana",
            compressible: false,
            extensions: ["au", "snd"]
          },
          "audio/bv16": {
            source: "iana"
          },
          "audio/bv32": {
            source: "iana"
          },
          "audio/clearmode": {
            source: "iana"
          },
          "audio/cn": {
            source: "iana"
          },
          "audio/dat12": {
            source: "iana"
          },
          "audio/dls": {
            source: "iana"
          },
          "audio/dsr-es201108": {
            source: "iana"
          },
          "audio/dsr-es202050": {
            source: "iana"
          },
          "audio/dsr-es202211": {
            source: "iana"
          },
          "audio/dsr-es202212": {
            source: "iana"
          },
          "audio/dv": {
            source: "iana"
          },
          "audio/dvi4": {
            source: "iana"
          },
          "audio/eac3": {
            source: "iana"
          },
          "audio/encaprtp": {
            source: "iana"
          },
          "audio/evrc": {
            source: "iana"
          },
          "audio/evrc-qcp": {
            source: "iana"
          },
          "audio/evrc0": {
            source: "iana"
          },
          "audio/evrc1": {
            source: "iana"
          },
          "audio/evrcb": {
            source: "iana"
          },
          "audio/evrcb0": {
            source: "iana"
          },
          "audio/evrcb1": {
            source: "iana"
          },
          "audio/evrcnw": {
            source: "iana"
          },
          "audio/evrcnw0": {
            source: "iana"
          },
          "audio/evrcnw1": {
            source: "iana"
          },
          "audio/evrcwb": {
            source: "iana"
          },
          "audio/evrcwb0": {
            source: "iana"
          },
          "audio/evrcwb1": {
            source: "iana"
          },
          "audio/evs": {
            source: "iana"
          },
          "audio/flexfec": {
            source: "iana"
          },
          "audio/fwdred": {
            source: "iana"
          },
          "audio/g711-0": {
            source: "iana"
          },
          "audio/g719": {
            source: "iana"
          },
          "audio/g722": {
            source: "iana"
          },
          "audio/g7221": {
            source: "iana"
          },
          "audio/g723": {
            source: "iana"
          },
          "audio/g726-16": {
            source: "iana"
          },
          "audio/g726-24": {
            source: "iana"
          },
          "audio/g726-32": {
            source: "iana"
          },
          "audio/g726-40": {
            source: "iana"
          },
          "audio/g728": {
            source: "iana"
          },
          "audio/g729": {
            source: "iana"
          },
          "audio/g7291": {
            source: "iana"
          },
          "audio/g729d": {
            source: "iana"
          },
          "audio/g729e": {
            source: "iana"
          },
          "audio/gsm": {
            source: "iana"
          },
          "audio/gsm-efr": {
            source: "iana"
          },
          "audio/gsm-hr-08": {
            source: "iana"
          },
          "audio/ilbc": {
            source: "iana"
          },
          "audio/ip-mr_v2.5": {
            source: "iana"
          },
          "audio/isac": {
            source: "apache"
          },
          "audio/l16": {
            source: "iana"
          },
          "audio/l20": {
            source: "iana"
          },
          "audio/l24": {
            source: "iana",
            compressible: false
          },
          "audio/l8": {
            source: "iana"
          },
          "audio/lpc": {
            source: "iana"
          },
          "audio/melp": {
            source: "iana"
          },
          "audio/melp1200": {
            source: "iana"
          },
          "audio/melp2400": {
            source: "iana"
          },
          "audio/melp600": {
            source: "iana"
          },
          "audio/mhas": {
            source: "iana"
          },
          "audio/midi": {
            source: "apache",
            extensions: ["mid", "midi", "kar", "rmi"]
          },
          "audio/mobile-xmf": {
            source: "iana",
            extensions: ["mxmf"]
          },
          "audio/mp3": {
            compressible: false,
            extensions: ["mp3"]
          },
          "audio/mp4": {
            source: "iana",
            compressible: false,
            extensions: ["m4a", "mp4a"]
          },
          "audio/mp4a-latm": {
            source: "iana"
          },
          "audio/mpa": {
            source: "iana"
          },
          "audio/mpa-robust": {
            source: "iana"
          },
          "audio/mpeg": {
            source: "iana",
            compressible: false,
            extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
          },
          "audio/mpeg4-generic": {
            source: "iana"
          },
          "audio/musepack": {
            source: "apache"
          },
          "audio/ogg": {
            source: "iana",
            compressible: false,
            extensions: ["oga", "ogg", "spx", "opus"]
          },
          "audio/opus": {
            source: "iana"
          },
          "audio/parityfec": {
            source: "iana"
          },
          "audio/pcma": {
            source: "iana"
          },
          "audio/pcma-wb": {
            source: "iana"
          },
          "audio/pcmu": {
            source: "iana"
          },
          "audio/pcmu-wb": {
            source: "iana"
          },
          "audio/prs.sid": {
            source: "iana"
          },
          "audio/qcelp": {
            source: "iana"
          },
          "audio/raptorfec": {
            source: "iana"
          },
          "audio/red": {
            source: "iana"
          },
          "audio/rtp-enc-aescm128": {
            source: "iana"
          },
          "audio/rtp-midi": {
            source: "iana"
          },
          "audio/rtploopback": {
            source: "iana"
          },
          "audio/rtx": {
            source: "iana"
          },
          "audio/s3m": {
            source: "apache",
            extensions: ["s3m"]
          },
          "audio/scip": {
            source: "iana"
          },
          "audio/silk": {
            source: "apache",
            extensions: ["sil"]
          },
          "audio/smv": {
            source: "iana"
          },
          "audio/smv-qcp": {
            source: "iana"
          },
          "audio/smv0": {
            source: "iana"
          },
          "audio/sofa": {
            source: "iana"
          },
          "audio/sp-midi": {
            source: "iana"
          },
          "audio/speex": {
            source: "iana"
          },
          "audio/t140c": {
            source: "iana"
          },
          "audio/t38": {
            source: "iana"
          },
          "audio/telephone-event": {
            source: "iana"
          },
          "audio/tetra_acelp": {
            source: "iana"
          },
          "audio/tetra_acelp_bb": {
            source: "iana"
          },
          "audio/tone": {
            source: "iana"
          },
          "audio/tsvcis": {
            source: "iana"
          },
          "audio/uemclip": {
            source: "iana"
          },
          "audio/ulpfec": {
            source: "iana"
          },
          "audio/usac": {
            source: "iana"
          },
          "audio/vdvi": {
            source: "iana"
          },
          "audio/vmr-wb": {
            source: "iana"
          },
          "audio/vnd.3gpp.iufp": {
            source: "iana"
          },
          "audio/vnd.4sb": {
            source: "iana"
          },
          "audio/vnd.audiokoz": {
            source: "iana"
          },
          "audio/vnd.celp": {
            source: "iana"
          },
          "audio/vnd.cisco.nse": {
            source: "iana"
          },
          "audio/vnd.cmles.radio-events": {
            source: "iana"
          },
          "audio/vnd.cns.anp1": {
            source: "iana"
          },
          "audio/vnd.cns.inf1": {
            source: "iana"
          },
          "audio/vnd.dece.audio": {
            source: "iana",
            extensions: ["uva", "uvva"]
          },
          "audio/vnd.digital-winds": {
            source: "iana",
            extensions: ["eol"]
          },
          "audio/vnd.dlna.adts": {
            source: "iana"
          },
          "audio/vnd.dolby.heaac.1": {
            source: "iana"
          },
          "audio/vnd.dolby.heaac.2": {
            source: "iana"
          },
          "audio/vnd.dolby.mlp": {
            source: "iana"
          },
          "audio/vnd.dolby.mps": {
            source: "iana"
          },
          "audio/vnd.dolby.pl2": {
            source: "iana"
          },
          "audio/vnd.dolby.pl2x": {
            source: "iana"
          },
          "audio/vnd.dolby.pl2z": {
            source: "iana"
          },
          "audio/vnd.dolby.pulse.1": {
            source: "iana"
          },
          "audio/vnd.dra": {
            source: "iana",
            extensions: ["dra"]
          },
          "audio/vnd.dts": {
            source: "iana",
            extensions: ["dts"]
          },
          "audio/vnd.dts.hd": {
            source: "iana",
            extensions: ["dtshd"]
          },
          "audio/vnd.dts.uhd": {
            source: "iana"
          },
          "audio/vnd.dvb.file": {
            source: "iana"
          },
          "audio/vnd.everad.plj": {
            source: "iana"
          },
          "audio/vnd.hns.audio": {
            source: "iana"
          },
          "audio/vnd.lucent.voice": {
            source: "iana",
            extensions: ["lvp"]
          },
          "audio/vnd.ms-playready.media.pya": {
            source: "iana",
            extensions: ["pya"]
          },
          "audio/vnd.nokia.mobile-xmf": {
            source: "iana"
          },
          "audio/vnd.nortel.vbk": {
            source: "iana"
          },
          "audio/vnd.nuera.ecelp4800": {
            source: "iana",
            extensions: ["ecelp4800"]
          },
          "audio/vnd.nuera.ecelp7470": {
            source: "iana",
            extensions: ["ecelp7470"]
          },
          "audio/vnd.nuera.ecelp9600": {
            source: "iana",
            extensions: ["ecelp9600"]
          },
          "audio/vnd.octel.sbc": {
            source: "iana"
          },
          "audio/vnd.presonus.multitrack": {
            source: "iana"
          },
          "audio/vnd.qcelp": {
            source: "iana"
          },
          "audio/vnd.rhetorex.32kadpcm": {
            source: "iana"
          },
          "audio/vnd.rip": {
            source: "iana",
            extensions: ["rip"]
          },
          "audio/vnd.rn-realaudio": {
            compressible: false
          },
          "audio/vnd.sealedmedia.softseal.mpeg": {
            source: "iana"
          },
          "audio/vnd.vmx.cvsd": {
            source: "iana"
          },
          "audio/vnd.wave": {
            compressible: false
          },
          "audio/vorbis": {
            source: "iana",
            compressible: false
          },
          "audio/vorbis-config": {
            source: "iana"
          },
          "audio/wav": {
            compressible: false,
            extensions: ["wav"]
          },
          "audio/wave": {
            compressible: false,
            extensions: ["wav"]
          },
          "audio/webm": {
            source: "apache",
            compressible: false,
            extensions: ["weba"]
          },
          "audio/x-aac": {
            source: "apache",
            compressible: false,
            extensions: ["aac"]
          },
          "audio/x-aiff": {
            source: "apache",
            extensions: ["aif", "aiff", "aifc"]
          },
          "audio/x-caf": {
            source: "apache",
            compressible: false,
            extensions: ["caf"]
          },
          "audio/x-flac": {
            source: "apache",
            extensions: ["flac"]
          },
          "audio/x-m4a": {
            source: "nginx",
            extensions: ["m4a"]
          },
          "audio/x-matroska": {
            source: "apache",
            extensions: ["mka"]
          },
          "audio/x-mpegurl": {
            source: "apache",
            extensions: ["m3u"]
          },
          "audio/x-ms-wax": {
            source: "apache",
            extensions: ["wax"]
          },
          "audio/x-ms-wma": {
            source: "apache",
            extensions: ["wma"]
          },
          "audio/x-pn-realaudio": {
            source: "apache",
            extensions: ["ram", "ra"]
          },
          "audio/x-pn-realaudio-plugin": {
            source: "apache",
            extensions: ["rmp"]
          },
          "audio/x-realaudio": {
            source: "nginx",
            extensions: ["ra"]
          },
          "audio/x-tta": {
            source: "apache"
          },
          "audio/x-wav": {
            source: "apache",
            extensions: ["wav"]
          },
          "audio/xm": {
            source: "apache",
            extensions: ["xm"]
          },
          "chemical/x-cdx": {
            source: "apache",
            extensions: ["cdx"]
          },
          "chemical/x-cif": {
            source: "apache",
            extensions: ["cif"]
          },
          "chemical/x-cmdf": {
            source: "apache",
            extensions: ["cmdf"]
          },
          "chemical/x-cml": {
            source: "apache",
            extensions: ["cml"]
          },
          "chemical/x-csml": {
            source: "apache",
            extensions: ["csml"]
          },
          "chemical/x-pdb": {
            source: "apache"
          },
          "chemical/x-xyz": {
            source: "apache",
            extensions: ["xyz"]
          },
          "font/collection": {
            source: "iana",
            extensions: ["ttc"]
          },
          "font/otf": {
            source: "iana",
            compressible: true,
            extensions: ["otf"]
          },
          "font/sfnt": {
            source: "iana"
          },
          "font/ttf": {
            source: "iana",
            compressible: true,
            extensions: ["ttf"]
          },
          "font/woff": {
            source: "iana",
            extensions: ["woff"]
          },
          "font/woff2": {
            source: "iana",
            extensions: ["woff2"]
          },
          "image/aces": {
            source: "iana",
            extensions: ["exr"]
          },
          "image/apng": {
            compressible: false,
            extensions: ["apng"]
          },
          "image/avci": {
            source: "iana",
            extensions: ["avci"]
          },
          "image/avcs": {
            source: "iana",
            extensions: ["avcs"]
          },
          "image/avif": {
            source: "iana",
            compressible: false,
            extensions: ["avif"]
          },
          "image/bmp": {
            source: "iana",
            compressible: true,
            extensions: ["bmp"]
          },
          "image/cgm": {
            source: "iana",
            extensions: ["cgm"]
          },
          "image/dicom-rle": {
            source: "iana",
            extensions: ["drle"]
          },
          "image/emf": {
            source: "iana",
            extensions: ["emf"]
          },
          "image/fits": {
            source: "iana",
            extensions: ["fits"]
          },
          "image/g3fax": {
            source: "iana",
            extensions: ["g3"]
          },
          "image/gif": {
            source: "iana",
            compressible: false,
            extensions: ["gif"]
          },
          "image/heic": {
            source: "iana",
            extensions: ["heic"]
          },
          "image/heic-sequence": {
            source: "iana",
            extensions: ["heics"]
          },
          "image/heif": {
            source: "iana",
            extensions: ["heif"]
          },
          "image/heif-sequence": {
            source: "iana",
            extensions: ["heifs"]
          },
          "image/hej2k": {
            source: "iana",
            extensions: ["hej2"]
          },
          "image/hsj2": {
            source: "iana",
            extensions: ["hsj2"]
          },
          "image/ief": {
            source: "iana",
            extensions: ["ief"]
          },
          "image/jls": {
            source: "iana",
            extensions: ["jls"]
          },
          "image/jp2": {
            source: "iana",
            compressible: false,
            extensions: ["jp2", "jpg2"]
          },
          "image/jpeg": {
            source: "iana",
            compressible: false,
            extensions: ["jpeg", "jpg", "jpe"]
          },
          "image/jph": {
            source: "iana",
            extensions: ["jph"]
          },
          "image/jphc": {
            source: "iana",
            extensions: ["jhc"]
          },
          "image/jpm": {
            source: "iana",
            compressible: false,
            extensions: ["jpm"]
          },
          "image/jpx": {
            source: "iana",
            compressible: false,
            extensions: ["jpx", "jpf"]
          },
          "image/jxr": {
            source: "iana",
            extensions: ["jxr"]
          },
          "image/jxra": {
            source: "iana",
            extensions: ["jxra"]
          },
          "image/jxrs": {
            source: "iana",
            extensions: ["jxrs"]
          },
          "image/jxs": {
            source: "iana",
            extensions: ["jxs"]
          },
          "image/jxsc": {
            source: "iana",
            extensions: ["jxsc"]
          },
          "image/jxsi": {
            source: "iana",
            extensions: ["jxsi"]
          },
          "image/jxss": {
            source: "iana",
            extensions: ["jxss"]
          },
          "image/ktx": {
            source: "iana",
            extensions: ["ktx"]
          },
          "image/ktx2": {
            source: "iana",
            extensions: ["ktx2"]
          },
          "image/naplps": {
            source: "iana"
          },
          "image/pjpeg": {
            compressible: false
          },
          "image/png": {
            source: "iana",
            compressible: false,
            extensions: ["png"]
          },
          "image/prs.btif": {
            source: "iana",
            extensions: ["btif"]
          },
          "image/prs.pti": {
            source: "iana",
            extensions: ["pti"]
          },
          "image/pwg-raster": {
            source: "iana"
          },
          "image/sgi": {
            source: "apache",
            extensions: ["sgi"]
          },
          "image/svg+xml": {
            source: "iana",
            compressible: true,
            extensions: ["svg", "svgz"]
          },
          "image/t38": {
            source: "iana",
            extensions: ["t38"]
          },
          "image/tiff": {
            source: "iana",
            compressible: false,
            extensions: ["tif", "tiff"]
          },
          "image/tiff-fx": {
            source: "iana",
            extensions: ["tfx"]
          },
          "image/vnd.adobe.photoshop": {
            source: "iana",
            compressible: true,
            extensions: ["psd"]
          },
          "image/vnd.airzip.accelerator.azv": {
            source: "iana",
            extensions: ["azv"]
          },
          "image/vnd.cns.inf2": {
            source: "iana"
          },
          "image/vnd.dece.graphic": {
            source: "iana",
            extensions: ["uvi", "uvvi", "uvg", "uvvg"]
          },
          "image/vnd.djvu": {
            source: "iana",
            extensions: ["djvu", "djv"]
          },
          "image/vnd.dvb.subtitle": {
            source: "iana",
            extensions: ["sub"]
          },
          "image/vnd.dwg": {
            source: "iana",
            extensions: ["dwg"]
          },
          "image/vnd.dxf": {
            source: "iana",
            extensions: ["dxf"]
          },
          "image/vnd.fastbidsheet": {
            source: "iana",
            extensions: ["fbs"]
          },
          "image/vnd.fpx": {
            source: "iana",
            extensions: ["fpx"]
          },
          "image/vnd.fst": {
            source: "iana",
            extensions: ["fst"]
          },
          "image/vnd.fujixerox.edmics-mmr": {
            source: "iana",
            extensions: ["mmr"]
          },
          "image/vnd.fujixerox.edmics-rlc": {
            source: "iana",
            extensions: ["rlc"]
          },
          "image/vnd.globalgraphics.pgb": {
            source: "iana"
          },
          "image/vnd.microsoft.icon": {
            source: "iana",
            compressible: true,
            extensions: ["ico"]
          },
          "image/vnd.mix": {
            source: "iana"
          },
          "image/vnd.mozilla.apng": {
            source: "iana"
          },
          "image/vnd.ms-dds": {
            compressible: true,
            extensions: ["dds"]
          },
          "image/vnd.ms-modi": {
            source: "iana",
            extensions: ["mdi"]
          },
          "image/vnd.ms-photo": {
            source: "apache",
            extensions: ["wdp"]
          },
          "image/vnd.net-fpx": {
            source: "iana",
            extensions: ["npx"]
          },
          "image/vnd.pco.b16": {
            source: "iana",
            extensions: ["b16"]
          },
          "image/vnd.radiance": {
            source: "iana"
          },
          "image/vnd.sealed.png": {
            source: "iana"
          },
          "image/vnd.sealedmedia.softseal.gif": {
            source: "iana"
          },
          "image/vnd.sealedmedia.softseal.jpg": {
            source: "iana"
          },
          "image/vnd.svf": {
            source: "iana"
          },
          "image/vnd.tencent.tap": {
            source: "iana",
            extensions: ["tap"]
          },
          "image/vnd.valve.source.texture": {
            source: "iana",
            extensions: ["vtf"]
          },
          "image/vnd.wap.wbmp": {
            source: "iana",
            extensions: ["wbmp"]
          },
          "image/vnd.xiff": {
            source: "iana",
            extensions: ["xif"]
          },
          "image/vnd.zbrush.pcx": {
            source: "iana",
            extensions: ["pcx"]
          },
          "image/webp": {
            source: "apache",
            extensions: ["webp"]
          },
          "image/wmf": {
            source: "iana",
            extensions: ["wmf"]
          },
          "image/x-3ds": {
            source: "apache",
            extensions: ["3ds"]
          },
          "image/x-cmu-raster": {
            source: "apache",
            extensions: ["ras"]
          },
          "image/x-cmx": {
            source: "apache",
            extensions: ["cmx"]
          },
          "image/x-freehand": {
            source: "apache",
            extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
          },
          "image/x-icon": {
            source: "apache",
            compressible: true,
            extensions: ["ico"]
          },
          "image/x-jng": {
            source: "nginx",
            extensions: ["jng"]
          },
          "image/x-mrsid-image": {
            source: "apache",
            extensions: ["sid"]
          },
          "image/x-ms-bmp": {
            source: "nginx",
            compressible: true,
            extensions: ["bmp"]
          },
          "image/x-pcx": {
            source: "apache",
            extensions: ["pcx"]
          },
          "image/x-pict": {
            source: "apache",
            extensions: ["pic", "pct"]
          },
          "image/x-portable-anymap": {
            source: "apache",
            extensions: ["pnm"]
          },
          "image/x-portable-bitmap": {
            source: "apache",
            extensions: ["pbm"]
          },
          "image/x-portable-graymap": {
            source: "apache",
            extensions: ["pgm"]
          },
          "image/x-portable-pixmap": {
            source: "apache",
            extensions: ["ppm"]
          },
          "image/x-rgb": {
            source: "apache",
            extensions: ["rgb"]
          },
          "image/x-tga": {
            source: "apache",
            extensions: ["tga"]
          },
          "image/x-xbitmap": {
            source: "apache",
            extensions: ["xbm"]
          },
          "image/x-xcf": {
            compressible: false
          },
          "image/x-xpixmap": {
            source: "apache",
            extensions: ["xpm"]
          },
          "image/x-xwindowdump": {
            source: "apache",
            extensions: ["xwd"]
          },
          "message/cpim": {
            source: "iana"
          },
          "message/delivery-status": {
            source: "iana"
          },
          "message/disposition-notification": {
            source: "iana",
            extensions: [
              "disposition-notification"
            ]
          },
          "message/external-body": {
            source: "iana"
          },
          "message/feedback-report": {
            source: "iana"
          },
          "message/global": {
            source: "iana",
            extensions: ["u8msg"]
          },
          "message/global-delivery-status": {
            source: "iana",
            extensions: ["u8dsn"]
          },
          "message/global-disposition-notification": {
            source: "iana",
            extensions: ["u8mdn"]
          },
          "message/global-headers": {
            source: "iana",
            extensions: ["u8hdr"]
          },
          "message/http": {
            source: "iana",
            compressible: false
          },
          "message/imdn+xml": {
            source: "iana",
            compressible: true
          },
          "message/news": {
            source: "iana"
          },
          "message/partial": {
            source: "iana",
            compressible: false
          },
          "message/rfc822": {
            source: "iana",
            compressible: true,
            extensions: ["eml", "mime"]
          },
          "message/s-http": {
            source: "iana"
          },
          "message/sip": {
            source: "iana"
          },
          "message/sipfrag": {
            source: "iana"
          },
          "message/tracking-status": {
            source: "iana"
          },
          "message/vnd.si.simp": {
            source: "iana"
          },
          "message/vnd.wfa.wsc": {
            source: "iana",
            extensions: ["wsc"]
          },
          "model/3mf": {
            source: "iana",
            extensions: ["3mf"]
          },
          "model/e57": {
            source: "iana"
          },
          "model/gltf+json": {
            source: "iana",
            compressible: true,
            extensions: ["gltf"]
          },
          "model/gltf-binary": {
            source: "iana",
            compressible: true,
            extensions: ["glb"]
          },
          "model/iges": {
            source: "iana",
            compressible: false,
            extensions: ["igs", "iges"]
          },
          "model/mesh": {
            source: "iana",
            compressible: false,
            extensions: ["msh", "mesh", "silo"]
          },
          "model/mtl": {
            source: "iana",
            extensions: ["mtl"]
          },
          "model/obj": {
            source: "iana",
            extensions: ["obj"]
          },
          "model/step": {
            source: "iana"
          },
          "model/step+xml": {
            source: "iana",
            compressible: true,
            extensions: ["stpx"]
          },
          "model/step+zip": {
            source: "iana",
            compressible: false,
            extensions: ["stpz"]
          },
          "model/step-xml+zip": {
            source: "iana",
            compressible: false,
            extensions: ["stpxz"]
          },
          "model/stl": {
            source: "iana",
            extensions: ["stl"]
          },
          "model/vnd.collada+xml": {
            source: "iana",
            compressible: true,
            extensions: ["dae"]
          },
          "model/vnd.dwf": {
            source: "iana",
            extensions: ["dwf"]
          },
          "model/vnd.flatland.3dml": {
            source: "iana"
          },
          "model/vnd.gdl": {
            source: "iana",
            extensions: ["gdl"]
          },
          "model/vnd.gs-gdl": {
            source: "apache"
          },
          "model/vnd.gs.gdl": {
            source: "iana"
          },
          "model/vnd.gtw": {
            source: "iana",
            extensions: ["gtw"]
          },
          "model/vnd.moml+xml": {
            source: "iana",
            compressible: true
          },
          "model/vnd.mts": {
            source: "iana",
            extensions: ["mts"]
          },
          "model/vnd.opengex": {
            source: "iana",
            extensions: ["ogex"]
          },
          "model/vnd.parasolid.transmit.binary": {
            source: "iana",
            extensions: ["x_b"]
          },
          "model/vnd.parasolid.transmit.text": {
            source: "iana",
            extensions: ["x_t"]
          },
          "model/vnd.pytha.pyox": {
            source: "iana"
          },
          "model/vnd.rosette.annotated-data-model": {
            source: "iana"
          },
          "model/vnd.sap.vds": {
            source: "iana",
            extensions: ["vds"]
          },
          "model/vnd.usdz+zip": {
            source: "iana",
            compressible: false,
            extensions: ["usdz"]
          },
          "model/vnd.valve.source.compiled-map": {
            source: "iana",
            extensions: ["bsp"]
          },
          "model/vnd.vtu": {
            source: "iana",
            extensions: ["vtu"]
          },
          "model/vrml": {
            source: "iana",
            compressible: false,
            extensions: ["wrl", "vrml"]
          },
          "model/x3d+binary": {
            source: "apache",
            compressible: false,
            extensions: ["x3db", "x3dbz"]
          },
          "model/x3d+fastinfoset": {
            source: "iana",
            extensions: ["x3db"]
          },
          "model/x3d+vrml": {
            source: "apache",
            compressible: false,
            extensions: ["x3dv", "x3dvz"]
          },
          "model/x3d+xml": {
            source: "iana",
            compressible: true,
            extensions: ["x3d", "x3dz"]
          },
          "model/x3d-vrml": {
            source: "iana",
            extensions: ["x3dv"]
          },
          "multipart/alternative": {
            source: "iana",
            compressible: false
          },
          "multipart/appledouble": {
            source: "iana"
          },
          "multipart/byteranges": {
            source: "iana"
          },
          "multipart/digest": {
            source: "iana"
          },
          "multipart/encrypted": {
            source: "iana",
            compressible: false
          },
          "multipart/form-data": {
            source: "iana",
            compressible: false
          },
          "multipart/header-set": {
            source: "iana"
          },
          "multipart/mixed": {
            source: "iana"
          },
          "multipart/multilingual": {
            source: "iana"
          },
          "multipart/parallel": {
            source: "iana"
          },
          "multipart/related": {
            source: "iana",
            compressible: false
          },
          "multipart/report": {
            source: "iana"
          },
          "multipart/signed": {
            source: "iana",
            compressible: false
          },
          "multipart/vnd.bint.med-plus": {
            source: "iana"
          },
          "multipart/voice-message": {
            source: "iana"
          },
          "multipart/x-mixed-replace": {
            source: "iana"
          },
          "text/1d-interleaved-parityfec": {
            source: "iana"
          },
          "text/cache-manifest": {
            source: "iana",
            compressible: true,
            extensions: ["appcache", "manifest"]
          },
          "text/calendar": {
            source: "iana",
            extensions: ["ics", "ifb"]
          },
          "text/calender": {
            compressible: true
          },
          "text/cmd": {
            compressible: true
          },
          "text/coffeescript": {
            extensions: ["coffee", "litcoffee"]
          },
          "text/cql": {
            source: "iana"
          },
          "text/cql-expression": {
            source: "iana"
          },
          "text/cql-identifier": {
            source: "iana"
          },
          "text/css": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["css"]
          },
          "text/csv": {
            source: "iana",
            compressible: true,
            extensions: ["csv"]
          },
          "text/csv-schema": {
            source: "iana"
          },
          "text/directory": {
            source: "iana"
          },
          "text/dns": {
            source: "iana"
          },
          "text/ecmascript": {
            source: "iana"
          },
          "text/encaprtp": {
            source: "iana"
          },
          "text/enriched": {
            source: "iana"
          },
          "text/fhirpath": {
            source: "iana"
          },
          "text/flexfec": {
            source: "iana"
          },
          "text/fwdred": {
            source: "iana"
          },
          "text/gff3": {
            source: "iana"
          },
          "text/grammar-ref-list": {
            source: "iana"
          },
          "text/html": {
            source: "iana",
            compressible: true,
            extensions: ["html", "htm", "shtml"]
          },
          "text/jade": {
            extensions: ["jade"]
          },
          "text/javascript": {
            source: "iana",
            compressible: true
          },
          "text/jcr-cnd": {
            source: "iana"
          },
          "text/jsx": {
            compressible: true,
            extensions: ["jsx"]
          },
          "text/less": {
            compressible: true,
            extensions: ["less"]
          },
          "text/markdown": {
            source: "iana",
            compressible: true,
            extensions: ["markdown", "md"]
          },
          "text/mathml": {
            source: "nginx",
            extensions: ["mml"]
          },
          "text/mdx": {
            compressible: true,
            extensions: ["mdx"]
          },
          "text/mizar": {
            source: "iana"
          },
          "text/n3": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["n3"]
          },
          "text/parameters": {
            source: "iana",
            charset: "UTF-8"
          },
          "text/parityfec": {
            source: "iana"
          },
          "text/plain": {
            source: "iana",
            compressible: true,
            extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
          },
          "text/provenance-notation": {
            source: "iana",
            charset: "UTF-8"
          },
          "text/prs.fallenstein.rst": {
            source: "iana"
          },
          "text/prs.lines.tag": {
            source: "iana",
            extensions: ["dsc"]
          },
          "text/prs.prop.logic": {
            source: "iana"
          },
          "text/raptorfec": {
            source: "iana"
          },
          "text/red": {
            source: "iana"
          },
          "text/rfc822-headers": {
            source: "iana"
          },
          "text/richtext": {
            source: "iana",
            compressible: true,
            extensions: ["rtx"]
          },
          "text/rtf": {
            source: "iana",
            compressible: true,
            extensions: ["rtf"]
          },
          "text/rtp-enc-aescm128": {
            source: "iana"
          },
          "text/rtploopback": {
            source: "iana"
          },
          "text/rtx": {
            source: "iana"
          },
          "text/sgml": {
            source: "iana",
            extensions: ["sgml", "sgm"]
          },
          "text/shaclc": {
            source: "iana"
          },
          "text/shex": {
            source: "iana",
            extensions: ["shex"]
          },
          "text/slim": {
            extensions: ["slim", "slm"]
          },
          "text/spdx": {
            source: "iana",
            extensions: ["spdx"]
          },
          "text/strings": {
            source: "iana"
          },
          "text/stylus": {
            extensions: ["stylus", "styl"]
          },
          "text/t140": {
            source: "iana"
          },
          "text/tab-separated-values": {
            source: "iana",
            compressible: true,
            extensions: ["tsv"]
          },
          "text/troff": {
            source: "iana",
            extensions: ["t", "tr", "roff", "man", "me", "ms"]
          },
          "text/turtle": {
            source: "iana",
            charset: "UTF-8",
            extensions: ["ttl"]
          },
          "text/ulpfec": {
            source: "iana"
          },
          "text/uri-list": {
            source: "iana",
            compressible: true,
            extensions: ["uri", "uris", "urls"]
          },
          "text/vcard": {
            source: "iana",
            compressible: true,
            extensions: ["vcard"]
          },
          "text/vnd.a": {
            source: "iana"
          },
          "text/vnd.abc": {
            source: "iana"
          },
          "text/vnd.ascii-art": {
            source: "iana"
          },
          "text/vnd.curl": {
            source: "iana",
            extensions: ["curl"]
          },
          "text/vnd.curl.dcurl": {
            source: "apache",
            extensions: ["dcurl"]
          },
          "text/vnd.curl.mcurl": {
            source: "apache",
            extensions: ["mcurl"]
          },
          "text/vnd.curl.scurl": {
            source: "apache",
            extensions: ["scurl"]
          },
          "text/vnd.debian.copyright": {
            source: "iana",
            charset: "UTF-8"
          },
          "text/vnd.dmclientscript": {
            source: "iana"
          },
          "text/vnd.dvb.subtitle": {
            source: "iana",
            extensions: ["sub"]
          },
          "text/vnd.esmertec.theme-descriptor": {
            source: "iana",
            charset: "UTF-8"
          },
          "text/vnd.familysearch.gedcom": {
            source: "iana",
            extensions: ["ged"]
          },
          "text/vnd.ficlab.flt": {
            source: "iana"
          },
          "text/vnd.fly": {
            source: "iana",
            extensions: ["fly"]
          },
          "text/vnd.fmi.flexstor": {
            source: "iana",
            extensions: ["flx"]
          },
          "text/vnd.gml": {
            source: "iana"
          },
          "text/vnd.graphviz": {
            source: "iana",
            extensions: ["gv"]
          },
          "text/vnd.hans": {
            source: "iana"
          },
          "text/vnd.hgl": {
            source: "iana"
          },
          "text/vnd.in3d.3dml": {
            source: "iana",
            extensions: ["3dml"]
          },
          "text/vnd.in3d.spot": {
            source: "iana",
            extensions: ["spot"]
          },
          "text/vnd.iptc.newsml": {
            source: "iana"
          },
          "text/vnd.iptc.nitf": {
            source: "iana"
          },
          "text/vnd.latex-z": {
            source: "iana"
          },
          "text/vnd.motorola.reflex": {
            source: "iana"
          },
          "text/vnd.ms-mediapackage": {
            source: "iana"
          },
          "text/vnd.net2phone.commcenter.command": {
            source: "iana"
          },
          "text/vnd.radisys.msml-basic-layout": {
            source: "iana"
          },
          "text/vnd.senx.warpscript": {
            source: "iana"
          },
          "text/vnd.si.uricatalogue": {
            source: "iana"
          },
          "text/vnd.sosi": {
            source: "iana"
          },
          "text/vnd.sun.j2me.app-descriptor": {
            source: "iana",
            charset: "UTF-8",
            extensions: ["jad"]
          },
          "text/vnd.trolltech.linguist": {
            source: "iana",
            charset: "UTF-8"
          },
          "text/vnd.wap.si": {
            source: "iana"
          },
          "text/vnd.wap.sl": {
            source: "iana"
          },
          "text/vnd.wap.wml": {
            source: "iana",
            extensions: ["wml"]
          },
          "text/vnd.wap.wmlscript": {
            source: "iana",
            extensions: ["wmls"]
          },
          "text/vtt": {
            source: "iana",
            charset: "UTF-8",
            compressible: true,
            extensions: ["vtt"]
          },
          "text/x-asm": {
            source: "apache",
            extensions: ["s", "asm"]
          },
          "text/x-c": {
            source: "apache",
            extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
          },
          "text/x-component": {
            source: "nginx",
            extensions: ["htc"]
          },
          "text/x-fortran": {
            source: "apache",
            extensions: ["f", "for", "f77", "f90"]
          },
          "text/x-gwt-rpc": {
            compressible: true
          },
          "text/x-handlebars-template": {
            extensions: ["hbs"]
          },
          "text/x-java-source": {
            source: "apache",
            extensions: ["java"]
          },
          "text/x-jquery-tmpl": {
            compressible: true
          },
          "text/x-lua": {
            extensions: ["lua"]
          },
          "text/x-markdown": {
            compressible: true,
            extensions: ["mkd"]
          },
          "text/x-nfo": {
            source: "apache",
            extensions: ["nfo"]
          },
          "text/x-opml": {
            source: "apache",
            extensions: ["opml"]
          },
          "text/x-org": {
            compressible: true,
            extensions: ["org"]
          },
          "text/x-pascal": {
            source: "apache",
            extensions: ["p", "pas"]
          },
          "text/x-processing": {
            compressible: true,
            extensions: ["pde"]
          },
          "text/x-sass": {
            extensions: ["sass"]
          },
          "text/x-scss": {
            extensions: ["scss"]
          },
          "text/x-setext": {
            source: "apache",
            extensions: ["etx"]
          },
          "text/x-sfv": {
            source: "apache",
            extensions: ["sfv"]
          },
          "text/x-suse-ymp": {
            compressible: true,
            extensions: ["ymp"]
          },
          "text/x-uuencode": {
            source: "apache",
            extensions: ["uu"]
          },
          "text/x-vcalendar": {
            source: "apache",
            extensions: ["vcs"]
          },
          "text/x-vcard": {
            source: "apache",
            extensions: ["vcf"]
          },
          "text/xml": {
            source: "iana",
            compressible: true,
            extensions: ["xml"]
          },
          "text/xml-external-parsed-entity": {
            source: "iana"
          },
          "text/yaml": {
            compressible: true,
            extensions: ["yaml", "yml"]
          },
          "video/1d-interleaved-parityfec": {
            source: "iana"
          },
          "video/3gpp": {
            source: "iana",
            extensions: ["3gp", "3gpp"]
          },
          "video/3gpp-tt": {
            source: "iana"
          },
          "video/3gpp2": {
            source: "iana",
            extensions: ["3g2"]
          },
          "video/av1": {
            source: "iana"
          },
          "video/bmpeg": {
            source: "iana"
          },
          "video/bt656": {
            source: "iana"
          },
          "video/celb": {
            source: "iana"
          },
          "video/dv": {
            source: "iana"
          },
          "video/encaprtp": {
            source: "iana"
          },
          "video/ffv1": {
            source: "iana"
          },
          "video/flexfec": {
            source: "iana"
          },
          "video/h261": {
            source: "iana",
            extensions: ["h261"]
          },
          "video/h263": {
            source: "iana",
            extensions: ["h263"]
          },
          "video/h263-1998": {
            source: "iana"
          },
          "video/h263-2000": {
            source: "iana"
          },
          "video/h264": {
            source: "iana",
            extensions: ["h264"]
          },
          "video/h264-rcdo": {
            source: "iana"
          },
          "video/h264-svc": {
            source: "iana"
          },
          "video/h265": {
            source: "iana"
          },
          "video/iso.segment": {
            source: "iana",
            extensions: ["m4s"]
          },
          "video/jpeg": {
            source: "iana",
            extensions: ["jpgv"]
          },
          "video/jpeg2000": {
            source: "iana"
          },
          "video/jpm": {
            source: "apache",
            extensions: ["jpm", "jpgm"]
          },
          "video/jxsv": {
            source: "iana"
          },
          "video/mj2": {
            source: "iana",
            extensions: ["mj2", "mjp2"]
          },
          "video/mp1s": {
            source: "iana"
          },
          "video/mp2p": {
            source: "iana"
          },
          "video/mp2t": {
            source: "iana",
            extensions: ["ts"]
          },
          "video/mp4": {
            source: "iana",
            compressible: false,
            extensions: ["mp4", "mp4v", "mpg4"]
          },
          "video/mp4v-es": {
            source: "iana"
          },
          "video/mpeg": {
            source: "iana",
            compressible: false,
            extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
          },
          "video/mpeg4-generic": {
            source: "iana"
          },
          "video/mpv": {
            source: "iana"
          },
          "video/nv": {
            source: "iana"
          },
          "video/ogg": {
            source: "iana",
            compressible: false,
            extensions: ["ogv"]
          },
          "video/parityfec": {
            source: "iana"
          },
          "video/pointer": {
            source: "iana"
          },
          "video/quicktime": {
            source: "iana",
            compressible: false,
            extensions: ["qt", "mov"]
          },
          "video/raptorfec": {
            source: "iana"
          },
          "video/raw": {
            source: "iana"
          },
          "video/rtp-enc-aescm128": {
            source: "iana"
          },
          "video/rtploopback": {
            source: "iana"
          },
          "video/rtx": {
            source: "iana"
          },
          "video/scip": {
            source: "iana"
          },
          "video/smpte291": {
            source: "iana"
          },
          "video/smpte292m": {
            source: "iana"
          },
          "video/ulpfec": {
            source: "iana"
          },
          "video/vc1": {
            source: "iana"
          },
          "video/vc2": {
            source: "iana"
          },
          "video/vnd.cctv": {
            source: "iana"
          },
          "video/vnd.dece.hd": {
            source: "iana",
            extensions: ["uvh", "uvvh"]
          },
          "video/vnd.dece.mobile": {
            source: "iana",
            extensions: ["uvm", "uvvm"]
          },
          "video/vnd.dece.mp4": {
            source: "iana"
          },
          "video/vnd.dece.pd": {
            source: "iana",
            extensions: ["uvp", "uvvp"]
          },
          "video/vnd.dece.sd": {
            source: "iana",
            extensions: ["uvs", "uvvs"]
          },
          "video/vnd.dece.video": {
            source: "iana",
            extensions: ["uvv", "uvvv"]
          },
          "video/vnd.directv.mpeg": {
            source: "iana"
          },
          "video/vnd.directv.mpeg-tts": {
            source: "iana"
          },
          "video/vnd.dlna.mpeg-tts": {
            source: "iana"
          },
          "video/vnd.dvb.file": {
            source: "iana",
            extensions: ["dvb"]
          },
          "video/vnd.fvt": {
            source: "iana",
            extensions: ["fvt"]
          },
          "video/vnd.hns.video": {
            source: "iana"
          },
          "video/vnd.iptvforum.1dparityfec-1010": {
            source: "iana"
          },
          "video/vnd.iptvforum.1dparityfec-2005": {
            source: "iana"
          },
          "video/vnd.iptvforum.2dparityfec-1010": {
            source: "iana"
          },
          "video/vnd.iptvforum.2dparityfec-2005": {
            source: "iana"
          },
          "video/vnd.iptvforum.ttsavc": {
            source: "iana"
          },
          "video/vnd.iptvforum.ttsmpeg2": {
            source: "iana"
          },
          "video/vnd.motorola.video": {
            source: "iana"
          },
          "video/vnd.motorola.videop": {
            source: "iana"
          },
          "video/vnd.mpegurl": {
            source: "iana",
            extensions: ["mxu", "m4u"]
          },
          "video/vnd.ms-playready.media.pyv": {
            source: "iana",
            extensions: ["pyv"]
          },
          "video/vnd.nokia.interleaved-multimedia": {
            source: "iana"
          },
          "video/vnd.nokia.mp4vr": {
            source: "iana"
          },
          "video/vnd.nokia.videovoip": {
            source: "iana"
          },
          "video/vnd.objectvideo": {
            source: "iana"
          },
          "video/vnd.radgamettools.bink": {
            source: "iana"
          },
          "video/vnd.radgamettools.smacker": {
            source: "iana"
          },
          "video/vnd.sealed.mpeg1": {
            source: "iana"
          },
          "video/vnd.sealed.mpeg4": {
            source: "iana"
          },
          "video/vnd.sealed.swf": {
            source: "iana"
          },
          "video/vnd.sealedmedia.softseal.mov": {
            source: "iana"
          },
          "video/vnd.uvvu.mp4": {
            source: "iana",
            extensions: ["uvu", "uvvu"]
          },
          "video/vnd.vivo": {
            source: "iana",
            extensions: ["viv"]
          },
          "video/vnd.youtube.yt": {
            source: "iana"
          },
          "video/vp8": {
            source: "iana"
          },
          "video/vp9": {
            source: "iana"
          },
          "video/webm": {
            source: "apache",
            compressible: false,
            extensions: ["webm"]
          },
          "video/x-f4v": {
            source: "apache",
            extensions: ["f4v"]
          },
          "video/x-fli": {
            source: "apache",
            extensions: ["fli"]
          },
          "video/x-flv": {
            source: "apache",
            compressible: false,
            extensions: ["flv"]
          },
          "video/x-m4v": {
            source: "apache",
            extensions: ["m4v"]
          },
          "video/x-matroska": {
            source: "apache",
            compressible: false,
            extensions: ["mkv", "mk3d", "mks"]
          },
          "video/x-mng": {
            source: "apache",
            extensions: ["mng"]
          },
          "video/x-ms-asf": {
            source: "apache",
            extensions: ["asf", "asx"]
          },
          "video/x-ms-vob": {
            source: "apache",
            extensions: ["vob"]
          },
          "video/x-ms-wm": {
            source: "apache",
            extensions: ["wm"]
          },
          "video/x-ms-wmv": {
            source: "apache",
            compressible: false,
            extensions: ["wmv"]
          },
          "video/x-ms-wmx": {
            source: "apache",
            extensions: ["wmx"]
          },
          "video/x-ms-wvx": {
            source: "apache",
            extensions: ["wvx"]
          },
          "video/x-msvideo": {
            source: "apache",
            extensions: ["avi"]
          },
          "video/x-sgi-movie": {
            source: "apache",
            extensions: ["movie"]
          },
          "video/x-smv": {
            source: "apache",
            extensions: ["smv"]
          },
          "x-conference/x-cooltalk": {
            source: "apache",
            extensions: ["ice"]
          },
          "x-shader/x-fragment": {
            compressible: true
          },
          "x-shader/x-vertex": {
            compressible: true
          }
        };
      }
    });
    var require_mime_db2 = __commonJS3({
      "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js"(exports2, module2) {
        module2.exports = require_db2();
      }
    });
    var main_exports = {};
    __export2(main_exports, {
      PreviewController: () => PreviewController2,
      getExtension: () => getExtension2,
      joinFilepath: () => joinFilepath,
      normalizeFilepath: () => normalizeFilepath
    });
    module.exports = __toCommonJS(main_exports);
    var CHANNEL_NAME2 = "$CSB_RELAY";
    var import_mime_db2 = __toESM3(require_mime_db2());
    var extensionMap2 = /* @__PURE__ */ new Map();
    var entries2 = Object.entries(import_mime_db2.default);
    for (const [mimetype, entry] of entries2) {
      const extensions = entry.extensions;
      if (extensions?.length) {
        for (const ext of extensions) {
          extensionMap2.set(ext, mimetype);
        }
      }
    }
    var EXTENSIONS_MAP2 = extensionMap2;
    var counter2 = 0;
    function generateRandomId2() {
      const now = Date.now();
      const randomNumber = Math.round(Math.random() * 1e4);
      const count = counter2 += 1;
      return (+`${now}${randomNumber}${count}`).toString(16);
    }
    function normalizeFilepath(filepath) {
      const split = filepath.split("/").filter(Boolean);
      const normalized = split.join("/");
      return "/" + normalized;
    }
    function joinFilepath(filepath, addition) {
      return normalizeFilepath(filepath + "/" + addition);
    }
    function getExtension2(filepath) {
      const parts = filepath.split(".");
      if (parts.length <= 1) {
        return "";
      } else {
        const ext = parts[parts.length - 1];
        return ext;
      }
    }
    var PreviewController2 = class {
      constructor(options) {
        this.initPromise = null;
        this.baseUrl = new URL(options.baseUrl);
        this.getFileContent = options.getFileContent;
        this.indexFiles = options.indexFiles ?? ["index.html", "index.html"];
      }
      async getIndexAtPath(filepath) {
        for (const index of this.indexFiles) {
          try {
            const content = await this.getFileContent(
              joinFilepath(filepath, index)
            );
            return content;
          } catch (err) {
          }
        }
        throw new Error("No index file not found");
      }
      async handleWorkerRequest(request) {
        if (!this.initPromise) {
          throw new Error("Init promise is null");
        }
        const [previewRoot, port] = await this.initPromise;
        try {
          const filepath = normalizeFilepath(
            new URL(request.url, previewRoot).pathname
          );
          let body = null;
          const headers = {};
          try {
            body = await this.getFileContent(filepath);
          } catch (err) {
          }
          if (body == null) {
            body = await this.getIndexAtPath(filepath);
            headers["Content-Type"] = "text/html; charset=utf-8";
          }
          if (body == null) {
            throw new Error("File not found");
          }
          if (!headers["Content-Type"]) {
            const extension = getExtension2(filepath);
            const foundMimetype = EXTENSIONS_MAP2.get(extension);
            if (foundMimetype) {
              headers["Content-Type"] = foundMimetype;
            }
          }
          const responseMessage = {
            $channel: CHANNEL_NAME2,
            $type: "preview/response",
            id: request.id,
            headers,
            status: 200,
            body
          };
          port.postMessage(responseMessage);
        } catch (err) {
          const responseMessage = {
            $channel: CHANNEL_NAME2,
            $type: "preview/response",
            id: request.id,
            headers: {
              ["Content-Type"]: "text/html; charset=utf-8"
            },
            status: 404,
            body: "File not found"
          };
          port.postMessage(responseMessage);
        }
      }
      getRelayUrl(previewUrl) {
        const relayUrl = new URL(previewUrl);
        relayUrl.pathname = "/__csb_relay/";
        return relayUrl.toString();
      }
      async _initPreview() {
        const id = generateRandomId2();
        const previewUrl = new URL(this.baseUrl);
        previewUrl.hostname = id + "-" + previewUrl.hostname;
        previewUrl.pathname = "/";
        const relayUrl = this.getRelayUrl(previewUrl.toString());
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", relayUrl.toString());
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        const channel = new MessageChannel();
        const iframeContentWindow = iframe.contentWindow;
        if (!iframeContentWindow) {
          throw new Error("Could not get iframe contentWindow");
        }
        return new Promise((resolve) => {
          const port = channel.port1;
          port.onmessage = (evt) => {
            if (typeof evt.data === "object" && evt.data.$channel === CHANNEL_NAME2) {
              switch (evt.data.$type) {
                case "preview/ready":
                  resolve([previewUrl.toString(), port, iframe]);
                  break;
                case "preview/request":
                  this.handleWorkerRequest(evt.data);
                  break;
              }
            }
          };
          iframe.onload = () => {
            const initMsg = {
              $channel: CHANNEL_NAME2,
              $type: "preview/init"
            };
            iframeContentWindow.postMessage(initMsg, "*", [channel.port2]);
          };
        });
      }
      /**
       * Initialize a preview and return the url at which the preview is being served
       **/
      initPreview() {
        if (!this.initPromise) {
          this.initPromise = this._initPreview();
        }
        return this.initPromise.then((v) => v[0]);
      }
      destroy() {
        if (this.initPromise) {
          const p = this.initPromise;
          p.then((val) => {
            val[1].close();
            const url = this.getRelayUrl(val[0]);
            const foundElements = document.body.querySelectorAll(`src="${url}"`);
            foundElements.forEach((el) => el.remove());
          });
          this.initPromise = null;
        }
      }
    };
  }
});

// node_modules/@codesandbox/sandpack-client/dist/index-599aeaf7.mjs
var index_599aeaf7_exports = {};
__export(index_599aeaf7_exports, {
  SandpackStatic: () => SandpackStatic
});
var import_static_browser_server, insertHtmlAfterRegex, readBuffer2, validateHtml, SandpackStatic;
var init_index_599aeaf7 = __esm({
  "node_modules/@codesandbox/sandpack-client/dist/index-599aeaf7.mjs"() {
    init_utils_52664384();
    import_static_browser_server = __toESM(require_main(), 1);
    init_consoleHook_59e792cb();
    init_base_80a1f760();
    init_lib();
    init_dist();
    insertHtmlAfterRegex = function(regex, content, insertable) {
      var match = regex.exec(content);
      if (match && match.length >= 1) {
        var offset = match.index + match[0].length;
        var prefix = content.substring(0, offset);
        var suffix = content.substring(offset);
        return prefix + insertable + suffix;
      }
    };
    readBuffer2 = function(content) {
      if (typeof content === "string") {
        return content;
      } else {
        return new TextDecoder().decode(content);
      }
    };
    validateHtml = function(content) {
      var contentString = readBuffer2(content);
      var domParser = new DOMParser();
      var doc = domParser.parseFromString(contentString, "text/html");
      if (!doc.documentElement.getAttribute("lang")) {
        doc.documentElement.setAttribute("lang", "en");
      }
      var html = doc.documentElement.outerHTML;
      return "<!DOCTYPE html>\n".concat(html);
    };
    SandpackStatic = /** @class */
    (function(_super) {
      __extends(SandpackStatic2, _super);
      function SandpackStatic2(selector, sandboxSetup, options) {
        if (options === void 0) {
          options = {};
        }
        var _a2;
        var _this = _super.call(this, selector, sandboxSetup, options) || this;
        _this.files = /* @__PURE__ */ new Map();
        _this.status = "initializing";
        _this.emitter = new EventEmitter();
        _this.previewController = new import_static_browser_server.PreviewController({
          baseUrl: (_a2 = options.bundlerURL) !== null && _a2 !== void 0 ? _a2 : "https://preview.sandpack-static-server.codesandbox.io",
          // filepath is always normalized to start with / and not end with a slash
          getFileContent: function(filepath) {
            var content = _this.files.get(filepath);
            if (!content) {
              throw new Error("File not found");
            }
            if (filepath.endsWith(".html") || filepath.endsWith(".htm")) {
              try {
                content = validateHtml(content);
                content = _this.injectProtocolScript(content);
                content = _this.injectExternalResources(content, options.externalResources);
                content = _this.injectScriptIntoHead(content, {
                  script: consoleHook,
                  scope: { channelId: generateRandomId() }
                });
              } catch (err) {
                console.error("Runtime injection failed", err);
              }
            }
            return content;
          }
        });
        if (typeof selector === "string") {
          _this.selector = selector;
          var element = document.querySelector(selector);
          _this.element = element;
          _this.iframe = document.createElement("iframe");
        } else {
          _this.element = selector;
          _this.iframe = selector;
        }
        if (!_this.iframe.getAttribute("sandbox")) {
          _this.iframe.setAttribute("sandbox", "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock");
          _this.iframe.setAttribute("allow", "accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-read; clipboard-write; xr-spatial-tracking;");
        }
        _this.eventListener = _this.eventListener.bind(_this);
        if (typeof window !== "undefined") {
          window.addEventListener("message", _this.eventListener);
        }
        _this.updateSandbox();
        return _this;
      }
      SandpackStatic2.prototype.injectContentIntoHead = function(content, contentToInsert) {
        var _a2;
        content = readBuffer2(content);
        content = (_a2 = insertHtmlAfterRegex(/<head[^<>]*>/g, content, "\n" + contentToInsert)) !== null && _a2 !== void 0 ? _a2 : contentToInsert + "\n" + content;
        return content;
      };
      SandpackStatic2.prototype.injectProtocolScript = function(content) {
        var scriptToInsert = '<script>\n  window.addEventListener("message", (message) => {\n    if(message.data.type === "refresh") {\n      window.location.reload();\n    }\n  })\n<\/script>';
        return this.injectContentIntoHead(content, scriptToInsert);
      };
      SandpackStatic2.prototype.injectExternalResources = function(content, externalResources) {
        if (externalResources === void 0) {
          externalResources = [];
        }
        var tagsToInsert = externalResources.map(function(resource) {
          var match = resource.match(/\.([^.]*)$/);
          var fileType = match === null || match === void 0 ? void 0 : match[1];
          if (fileType === "css" || resource.includes("fonts.googleapis")) {
            return '<link rel="stylesheet" href="'.concat(resource, '">');
          }
          if (fileType === "js") {
            return '<script src="'.concat(resource, '"><\/script>');
          }
          throw new Error("Unable to determine file type for external resource: ".concat(resource));
        }).join("\n");
        return this.injectContentIntoHead(content, tagsToInsert);
      };
      SandpackStatic2.prototype.injectScriptIntoHead = function(content, opts) {
        var script = opts.script, _a2 = opts.scope, scope = _a2 === void 0 ? {} : _a2;
        var scriptToInsert = "\n    <script>\n      const scope = ".concat(JSON.stringify(scope), ";\n      ").concat(script, "\n    <\/script>\n    ").trim();
        return this.injectContentIntoHead(content, scriptToInsert);
      };
      SandpackStatic2.prototype.updateSandbox = function(setup, _isInitializationCompile) {
        if (setup === void 0) {
          setup = this.sandboxSetup;
        }
        var modules = fromBundlerFilesToFS(setup.files);
        this.dispatch({
          codesandbox: true,
          modules,
          template: setup.template,
          type: "compile"
        });
      };
      SandpackStatic2.prototype.compile = function(files) {
        return __awaiter(this, void 0, void 0, function() {
          var previewUrl, htmlPath, keys, i, key, contentBuf, contentStr, injected, blob, url;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                // keep local copy of files
                this.files = new Map(Object.entries(files));
                // Try to locate an HTML entry (prefer /index.html)
                htmlPath = null;
                if (files["/index.html"]) {
                  htmlPath = "/index.html";
                } else if (files["index.html"]) {
                  htmlPath = "index.html";
                } else {
                  keys = Object.keys(files);
                  for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    if (key.toLowerCase().endsWith('.html') || key.toLowerCase().endsWith('.htm')) {
                      htmlPath = key;
                      break;
                    }
                  }
                }
                if (!htmlPath) {
                  try {
                    this.iframe.setAttribute('srcdoc', '');
                  } catch (e) {}
                  this.status = 'done';
                  this.dispatch({ type: 'done', compilatonError: false });
                  this.dispatch({ type: 'urlchange', url: '', back: false, forward: false });
                  return [2 /*return*/];
                }
                contentBuf = files[htmlPath];
                contentStr = typeof contentBuf === 'string' ? contentBuf : new TextDecoder().decode(contentBuf);
                injected = contentStr;
                try {
                  injected = validateHtml(injected);
                  injected = this.injectProtocolScript(injected);
                  injected = this.injectExternalResources(injected, this.sandboxSetup && this.sandboxSetup.externalResources);
                  injected = this.injectScriptIntoHead(injected, { script: consoleHook, scope: { channelId: generateRandomId() } });
                } catch (err) {
                  console.error('Runtime injection failed', err);
                }
                try {
                  this.iframe.removeAttribute('src');
                  this.iframe.setAttribute('srcdoc', injected);
                } catch (e) {
                  try {
                    blob = new Blob([injected], { type: 'text/html' });
                    url = URL.createObjectURL(blob);
                    this.iframe.setAttribute('src', url);
                  } catch (e2) {
                    console.error('Failed to set iframe content', e2);
                  }
                }
                this.status = 'done';
                this.dispatch({ type: 'done', compilatonError: false });
                this.dispatch({ type: 'urlchange', url: 'local://preview', back: false, forward: false });
                return [2 /*return*/];
            }
          });
        });
      };
      SandpackStatic2.prototype.eventListener = function(evt) {
        if (evt.source !== this.iframe.contentWindow) {
          return;
        }
        var message = evt.data;
        if (!message.codesandbox) {
          return;
        }
        this.dispatch(message);
      };
      SandpackStatic2.prototype.dispatch = function(message) {
        var _a2;
        switch (message.type) {
          case "compile":
            this.compile(message.modules);
            break;
          default:
            (_a2 = this.iframe.contentWindow) === null || _a2 === void 0 ? void 0 : _a2.postMessage(message, "*");
            this.emitter.dispatch(message);
        }
      };
      SandpackStatic2.prototype.listen = function(listener) {
        return this.emitter.listener(listener);
      };
      SandpackStatic2.prototype.destroy = function() {
        this.emitter.cleanup();
        if (typeof window !== "undefined") {
          window.removeEventListener("message", this.eventListener);
        }
      };
      return SandpackStatic2;
    })(SandpackClient);
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports, module) {
    module.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/ace+json": {
        source: "iana",
        compressible: true
      },
      "application/ace-groupcomm+cbor": {
        source: "iana"
      },
      "application/ace-trl+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/aif+cbor": {
        source: "iana"
      },
      "application/aif+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-cdni+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-cdnifilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-propmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-propmapparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-tips+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-tipsparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/appinstaller": {
        compressible: false,
        extensions: ["appinstaller"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/appx": {
        compressible: false,
        extensions: ["appx"]
      },
      "application/appxbundle": {
        compressible: false,
        extensions: ["appxbundle"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/automationml-aml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["aml"]
      },
      "application/automationml-amlx+zip": {
        source: "iana",
        compressible: false,
        extensions: ["amlx"]
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/bufr": {
        source: "iana"
      },
      "application/c2pa": {
        source: "iana"
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/ce+cbor": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/cid-edhoc+cbor-seq": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/city+json-seq": {
        source: "iana"
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-eap": {
        source: "iana"
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/concise-problem-details+cbor": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cose-x509": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwl": {
        source: "iana",
        extensions: ["cwl"]
      },
      "application/cwl+json": {
        source: "iana",
        compressible: true
      },
      "application/cwl+yaml": {
        source: "iana"
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana",
        extensions: ["dcm"]
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dpop+jwt": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/eat+cwt": {
        source: "iana"
      },
      "application/eat+jwt": {
        source: "iana"
      },
      "application/eat-bun+cbor": {
        source: "iana"
      },
      "application/eat-bun+json": {
        source: "iana",
        compressible: true
      },
      "application/eat-ucs+cbor": {
        source: "iana"
      },
      "application/eat-ucs+json": {
        source: "iana",
        compressible: true
      },
      "application/ecmascript": {
        source: "apache",
        compressible: true,
        extensions: ["ecma"]
      },
      "application/edhoc+cbor-seq": {
        source: "iana"
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.legacyesn+json": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/entity-statement+jwt": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geopose+json": {
        source: "iana",
        compressible: true
      },
      "application/geoxacml+json": {
        source: "iana",
        compressible: true
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gnap-binding-jws": {
        source: "iana"
      },
      "application/gnap-binding-jwsd": {
        source: "iana"
      },
      "application/gnap-binding-rotation-jws": {
        source: "iana"
      },
      "application/gnap-binding-rotation-jwsd": {
        source: "iana"
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/grib": {
        source: "iana"
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "iana",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "apache",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/jscontact+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jsonpath": {
        source: "iana"
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+jwt": {
        source: "iana"
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/linkset": {
        source: "iana"
      },
      "application/linkset+json": {
        source: "iana",
        compressible: true
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/logout+jwt": {
        source: "iana"
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4", "mpg4", "mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msix": {
        compressible: false,
        extensions: ["msix"]
      },
      "application/msixbundle": {
        compressible: false,
        extensions: ["msixbundle"]
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: true,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/ohttp-keys": {
        source: "iana"
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg", "one", "onea"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["sig", "asc"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/private-token-issuer-directory": {
        source: "iana"
      },
      "application/private-token-request": {
        source: "iana"
      },
      "application/private-token-response": {
        source: "iana"
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/provided-claims+jwt": {
        source: "iana"
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.implied-document+xml": {
        source: "iana",
        compressible: true
      },
      "application/prs.implied-executable": {
        source: "iana"
      },
      "application/prs.implied-object+json": {
        source: "iana",
        compressible: true
      },
      "application/prs.implied-object+json-seq": {
        source: "iana"
      },
      "application/prs.implied-object+yaml": {
        source: "iana"
      },
      "application/prs.implied-structure": {
        source: "iana"
      },
      "application/prs.mayfile": {
        source: "iana"
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.vcfbzip2": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsf"]
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "apache"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resolve-response+jwt": {
        source: "iana"
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-checklist": {
        source: "iana"
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-signed-tal": {
        source: "iana"
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "apache"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana",
        extensions: ["sql"]
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/sslkeylogfile": {
        source: "iana"
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/st2110-41": {
        source: "iana"
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/stratum": {
        source: "iana"
      },
      "application/swid+cbor": {
        source: "iana"
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tm+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/toc+cbor": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        source: "iana",
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/trust-chain+json": {
        source: "iana",
        compressible: true
      },
      "application/trust-mark+jwt": {
        source: "iana"
      },
      "application/trust-mark-delegation+jwt": {
        source: "iana"
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/uccs+cbor": {
        source: "iana"
      },
      "application/ujcs+json": {
        source: "iana",
        compressible: true
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vc": {
        source: "iana"
      },
      "application/vc+cose": {
        source: "iana"
      },
      "application/vc+jwt": {
        source: "iana"
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.1ob": {
        source: "iana"
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3a+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ach+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc8+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.5gsa2x": {
        source: "iana"
      },
      "application/vnd.3gpp.5gsa2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gsv2x": {
        source: "iana"
      },
      "application/vnd.3gpp.5gsv2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.crs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.current-location-discovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-msgstore-ctrl-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-regroup+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-regroup+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-regroup+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.pinapp-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.seal-group-doc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-network-qos-management-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-ue-config-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-unicast-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.seal-user-profile-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.v2x": {
        source: "iana"
      },
      "application/vnd.3gpp.vae-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acm.addressxfer+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.acm.chatbot+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "apache",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "apache"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.parquet": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.apexlang": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "apache"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autodesk.fbx": {
        extensions: ["fbx"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.belightsoft.lhzd+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.belightsoft.lhzl+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bzip3": {
        source: "iana"
      },
      "application/vnd.c3voc.schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.cncf.helm.chart.content.v1.tar+gzip": {
        source: "iana"
      },
      "application/vnd.cncf.helm.chart.provenance.v1.prov": {
        source: "iana"
      },
      "application/vnd.cncf.helm.config.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datalog": {
        source: "iana"
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.dcmp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dcmp"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.eln+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.erofs": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "apache",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.fdsn.stationxml+xml": {
        source: "iana",
        charset: "XML-BASED",
        compressible: true
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.freelog.comic": {
        source: "iana"
      },
      "application/vnd.frogans.fnc": {
        source: "apache",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "apache",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.ga4gh.passport+jwt": {
        source: "iana"
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.genozip": {
        source: "iana"
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gentoo.catmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gentoo.ebuild": {
        source: "iana"
      },
      "application/vnd.gentoo.eclass": {
        source: "iana"
      },
      "application/vnd.gentoo.gpkg": {
        source: "iana"
      },
      "application/vnd.gentoo.manifest": {
        source: "iana"
      },
      "application/vnd.gentoo.pkgmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gentoo.xpak": {
        source: "iana"
      },
      "application/vnd.geo+json": {
        source: "apache",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.pinboard": {
        source: "iana"
      },
      "application/vnd.geogebra.slides": {
        source: "iana",
        extensions: ["ggs"]
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.gnu.taler.exchange+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gnu.taler.merchant+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.google-apps.audio": {},
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.drawing": {
        compressible: false,
        extensions: ["gdraw"]
      },
      "application/vnd.google-apps.drive-sdk": {
        compressible: false
      },
      "application/vnd.google-apps.file": {},
      "application/vnd.google-apps.folder": {
        compressible: false
      },
      "application/vnd.google-apps.form": {
        compressible: false,
        extensions: ["gform"]
      },
      "application/vnd.google-apps.fusiontable": {},
      "application/vnd.google-apps.jam": {
        compressible: false,
        extensions: ["gjam"]
      },
      "application/vnd.google-apps.mail-layout": {},
      "application/vnd.google-apps.map": {
        compressible: false,
        extensions: ["gmap"]
      },
      "application/vnd.google-apps.photo": {},
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.script": {
        compressible: false,
        extensions: ["gscript"]
      },
      "application/vnd.google-apps.shortcut": {},
      "application/vnd.google-apps.site": {
        compressible: false,
        extensions: ["gsite"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-apps.unknown": {},
      "application/vnd.google-apps.video": {},
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdcf"]
      },
      "application/vnd.gpxsee.map+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.hsl": {
        source: "iana"
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "apache"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "apache",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "apache"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.ipfs.ipns-record": {
        source: "iana"
      },
      "application/vnd.ipld.car": {
        source: "iana"
      },
      "application/vnd.ipld.dag-cbor": {
        source: "iana"
      },
      "application/vnd.ipld.dag-json": {
        source: "iana"
      },
      "application/vnd.ipld.raw": {
        source: "iana"
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kdl": {
        source: "iana"
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.keyman.kmp+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.keyman.kmx": {
        source: "iana"
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.ldev.productlicensing": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.mdl": {
        source: "iana"
      },
      "application/vnd.mdl-mbsdf": {
        source: "iana"
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.medicalholodeck.recordxr": {
        source: "iana"
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mermaid": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.modl": {
        source: "iana"
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-visio.viewer": {
        extensions: ["vdx"]
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msgpack": {
        source: "iana"
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nato.bindingdataobject+cbor": {
        source: "iana"
      },
      "application/vnd.nato.bindingdataobject+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nato.bindingdataobject+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bdo"]
      },
      "application/vnd.nato.openxmlformats-package.iepd+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "apache",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oai.workflows": {
        source: "iana"
      },
      "application/vnd.oai.workflows+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oai.workflows+yaml": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.base": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "apache",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-master-template": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.onvif.metadata": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openvpi.dspx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.procrate.brushset": {
        extensions: ["brushset"]
      },
      "application/vnd.procreate.brush": {
        extensions: ["brush"]
      },
      "application/vnd.procreate.dream": {
        extensions: ["drm"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.pt.mundusmundi": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtm"]
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.relpipe": {
        source: "iana"
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sketchometry": {
        source: "iana"
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.smintio.portals.archive": {
        source: "iana"
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sybyl.mol2": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uic.osdm+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml", "uo"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veraison.tsm-report+cbor": {
        source: "iana"
      },
      "application/vnd.veraison.tsm-report+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw", "vsdx", "vtx"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vocalshaper.vsp4": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.wasmflow.wafl": {
        source: "iana"
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordlift": {
        source: "iana"
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xarin.cpj": {
        source: "iana"
      },
      "application/vnd.xecrets-encrypted": {
        source: "iana"
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/voucher-jws+json": {
        source: "iana",
        compressible: true
      },
      "application/vp": {
        source: "iana"
      },
      "application/vp+cose": {
        source: "iana"
      },
      "application/vp+jwt": {
        source: "iana"
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blender": {
        extensions: ["blend"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-compressed": {
        extensions: ["rar"]
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-ipynb+json": {
        compressible: true,
        extensions: ["ipynb"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zip-compressed": {
        extensions: ["zip"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yaml": {
        source: "iana"
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+cbor": {
        source: "iana"
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-sid+json": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zip+dotlottie": {
        extensions: ["lottie"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana",
        extensions: ["adts", "aac"]
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flac": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/matroska": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/midi-clip": {
        source: "iana"
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a", "m4b"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "apache"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        source: "iana",
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp", "dib"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/dpx": {
        source: "iana",
        extensions: ["dpx"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/j2c": {
        source: "iana"
      },
      "image/jaii": {
        source: "iana",
        extensions: ["jaii"]
      },
      "image/jais": {
        source: "iana",
        extensions: ["jais"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpg", "jpeg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm", "jpgm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxl": {
        source: "iana",
        extensions: ["jxl"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false,
        extensions: ["jfif"]
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif", "btf"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.clip": {
        source: "iana"
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "iana",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-adobe-dng": {
        extensions: ["dng"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-emf": {
        source: "iana"
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-wmf": {
        source: "iana"
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/bhttp": {
        source: "iana"
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/mls": {
        source: "iana"
      },
      "message/news": {
        source: "apache"
      },
      "message/ohttp-req": {
        source: "iana"
      },
      "message/ohttp-res": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime", "mht", "mhtml"]
      },
      "message/s-http": {
        source: "apache"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "apache"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/jt": {
        source: "iana",
        extensions: ["jt"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/prc": {
        source: "iana",
        extensions: ["prc"]
      },
      "model/step": {
        source: "iana",
        extensions: ["step", "stp", "stpnc", "p21", "210"]
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/u3d": {
        source: "iana",
        extensions: ["u3d"]
      },
      "model/vnd.bary": {
        source: "iana",
        extensions: ["bary"]
      },
      "model/vnd.cld": {
        source: "iana",
        extensions: ["cld"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana",
        extensions: ["pyo", "pyox"]
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usda": {
        source: "iana",
        extensions: ["usda"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "apache"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/hl7v2": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["md", "markdown"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/prs.texi": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.exchangeable": {
        source: "iana"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "apache"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.vcf": {
        source: "iana"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vnd.zoo.kcl": {
        source: "iana"
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/wgsl": {
        source: "iana",
        extensions: ["wgsl"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/evc": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/h266": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/lottie+json": {
        source: "iana",
        compressible: true
      },
      "video/matroska": {
        source: "iana"
      },
      "video/matroska-3d": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts", "m2t", "m2ts", "mts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.planar": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "apache"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports, module) {
    module.exports = require_db();
  }
});

// node_modules/@codesandbox/sandpack-client/dist/clients/runtime/index.mjs
var runtime_exports = {};
__export(runtime_exports, {
  SandpackRuntime: () => SandpackRuntime
});
function getTemplate(pkg, modules) {
  if (!pkg) {
    return "static";
  }
  var _a2 = pkg.dependencies, dependencies = _a2 === void 0 ? {} : _a2, _b = pkg.devDependencies, devDependencies = _b === void 0 ? {} : _b;
  var totalDependencies = __spreadArray(__spreadArray([], Object.keys(dependencies), true), Object.keys(devDependencies), true);
  var moduleNames = Object.keys(modules);
  var adonis = ["@adonisjs/framework", "@adonisjs/core"];
  if (totalDependencies.some(function(dep) {
    return adonis.indexOf(dep) > -1;
  })) {
    return "adonis";
  }
  var nuxt = ["nuxt", "nuxt-edge", "nuxt-ts", "nuxt-ts-edge", "nuxt3"];
  if (totalDependencies.some(function(dep) {
    return nuxt.indexOf(dep) > -1;
  })) {
    return "nuxt";
  }
  if (totalDependencies.indexOf("next") > -1) {
    return "next";
  }
  var apollo = [
    "apollo-server",
    "apollo-server-express",
    "apollo-server-hapi",
    "apollo-server-koa",
    "apollo-server-lambda",
    "apollo-server-micro"
  ];
  if (totalDependencies.some(function(dep) {
    return apollo.indexOf(dep) > -1;
  })) {
    return "apollo";
  }
  if (totalDependencies.indexOf("mdx-deck") > -1) {
    return "mdx-deck";
  }
  if (totalDependencies.indexOf("gridsome") > -1) {
    return "gridsome";
  }
  if (totalDependencies.indexOf("vuepress") > -1) {
    return "vuepress";
  }
  if (totalDependencies.indexOf("ember-cli") > -1) {
    return "ember";
  }
  if (totalDependencies.indexOf("sapper") > -1) {
    return "sapper";
  }
  if (totalDependencies.indexOf("gatsby") > -1) {
    return "gatsby";
  }
  if (totalDependencies.indexOf("quasar") > -1) {
    return "quasar";
  }
  if (totalDependencies.indexOf("@docusaurus/core") > -1) {
    return "docusaurus";
  }
  if (totalDependencies.indexOf("remix") > -1) {
    return "remix";
  }
  if (totalDependencies.indexOf("astro") > -1) {
    return "node";
  }
  if (moduleNames.some(function(m) {
    return m.endsWith(".re");
  })) {
    return "reason";
  }
  var parcel = ["parcel-bundler", "parcel"];
  if (totalDependencies.some(function(dep) {
    return parcel.indexOf(dep) > -1;
  })) {
    return "parcel";
  }
  var dojo = ["@dojo/core", "@dojo/framework"];
  if (totalDependencies.some(function(dep) {
    return dojo.indexOf(dep) > -1;
  })) {
    return "@dojo/cli-create-app";
  }
  if (totalDependencies.indexOf("@nestjs/core") > -1 || totalDependencies.indexOf("@nestjs/common") > -1) {
    return "nest";
  }
  if (totalDependencies.indexOf("react-styleguidist") > -1) {
    return "styleguidist";
  }
  if (totalDependencies.indexOf("react-scripts") > -1) {
    return "create-react-app";
  }
  if (totalDependencies.indexOf("react-scripts-ts") > -1) {
    return "create-react-app-typescript";
  }
  if (totalDependencies.indexOf("@angular/core") > -1) {
    return "angular-cli";
  }
  if (totalDependencies.indexOf("preact-cli") > -1) {
    return "preact-cli";
  }
  if (totalDependencies.indexOf("@sveltech/routify") > -1 || totalDependencies.indexOf("@roxi/routify") > -1) {
    return "node";
  }
  if (totalDependencies.indexOf("vite") > -1) {
    return "node";
  }
  if (totalDependencies.indexOf("@frontity/core") > -1) {
    return "node";
  }
  if (totalDependencies.indexOf("svelte") > -1) {
    return "svelte";
  }
  if (totalDependencies.indexOf("vue") > -1) {
    return "vue-cli";
  }
  if (totalDependencies.indexOf("cx") > -1) {
    return "cxjs";
  }
  var nodeDeps = [
    "express",
    "koa",
    "nodemon",
    "ts-node",
    "@tensorflow/tfjs-node",
    "webpack-dev-server",
    "snowpack"
  ];
  if (totalDependencies.some(function(dep) {
    return nodeDeps.indexOf(dep) > -1;
  })) {
    return "node";
  }
  if (Object.keys(dependencies).length >= MAX_CLIENT_DEPENDENCY_COUNT) {
    return "node";
  }
  return void 0;
}
function getExtension(filepath) {
  var parts = filepath.split(".");
  if (parts.length <= 1) {
    return "";
  } else {
    var ext = parts[parts.length - 1];
    return ext;
  }
}
var import_mime_db, Protocol, IFrameProtocol, extensionMap, entries, _a$1, mimetype, entry, extensions, ext, _b, extensions_1, _i, entries_1, EXTENSIONS_MAP, CHANNEL_NAME, MAX_CLIENT_DEPENDENCY_COUNT, _a, SUFFIX_PLACEHOLDER, BUNDLER_URL, SandpackRuntime;
var init_runtime = __esm({
  "node_modules/@codesandbox/sandpack-client/dist/clients/runtime/index.mjs"() {
    init_utils_52664384();
    init_dist();
    init_base_80a1f760();
    import_mime_db = __toESM(require_mime_db(), 1);
    init_lib();
    Protocol = /** @class */
    (function() {
      function Protocol2(type, handleMessage, protocol) {
        var _this = this;
        this.type = type;
        this.handleMessage = handleMessage;
        this.protocol = protocol;
        this._disposeMessageListener = this.protocol.channelListen(function(msg) {
          return __awaiter(_this, void 0, void 0, function() {
            var message, result, response, err_1, response;
            return __generator(this, function(_a2) {
              switch (_a2.label) {
                case 0:
                  if (!(msg.type === this.getTypeId() && msg.method)) return [3, 4];
                  message = msg;
                  _a2.label = 1;
                case 1:
                  _a2.trys.push([1, 3, , 4]);
                  return [4, this.handleMessage(message)];
                case 2:
                  result = _a2.sent();
                  response = {
                    type: this.getTypeId(),
                    msgId: message.msgId,
                    result
                  };
                  this.protocol.dispatch(response);
                  return [3, 4];
                case 3:
                  err_1 = _a2.sent();
                  response = {
                    type: this.getTypeId(),
                    msgId: message.msgId,
                    error: {
                      message: err_1.message
                    }
                  };
                  this.protocol.dispatch(response);
                  return [3, 4];
                case 4:
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        });
      }
      Protocol2.prototype.getTypeId = function() {
        return "protocol-".concat(this.type);
      };
      Protocol2.prototype.dispose = function() {
        this._disposeMessageListener();
      };
      return Protocol2;
    })();
    IFrameProtocol = /** @class */
    (function() {
      function IFrameProtocol2(iframe, origin) {
        this.globalListeners = {};
        this.globalListenersCount = 0;
        this.channelListeners = {};
        this.channelListenersCount = 0;
        this.channelId = Math.floor(Math.random() * 1e6);
        this.frameWindow = iframe.contentWindow;
        this.origin = origin;
        this.globalListeners = [];
        this.channelListeners = [];
        this.eventListener = this.eventListener.bind(this);
        if (typeof window !== "undefined") {
          window.addEventListener("message", this.eventListener);
        }
      }
      IFrameProtocol2.prototype.cleanup = function() {
        window.removeEventListener("message", this.eventListener);
        this.globalListeners = {};
        this.channelListeners = {};
        this.globalListenersCount = 0;
        this.channelListenersCount = 0;
      };
      IFrameProtocol2.prototype.register = function() {
        if (!this.frameWindow) {
          return;
        }
        this.frameWindow.postMessage({
          type: "register-frame",
          origin: document.location.origin,
          id: this.channelId
        }, this.origin);
      };
      IFrameProtocol2.prototype.dispatch = function(message) {
        if (!this.frameWindow) {
          return;
        }
        this.frameWindow.postMessage(__assign({ $id: this.channelId, codesandbox: true }, message), this.origin);
      };
      IFrameProtocol2.prototype.globalListen = function(listener) {
        var _this = this;
        if (typeof listener !== "function") {
          return function() {
            return;
          };
        }
        var listenerId = this.globalListenersCount;
        this.globalListeners[listenerId] = listener;
        this.globalListenersCount++;
        return function() {
          delete _this.globalListeners[listenerId];
        };
      };
      IFrameProtocol2.prototype.channelListen = function(listener) {
        var _this = this;
        if (typeof listener !== "function") {
          return function() {
            return;
          };
        }
        var listenerId = this.channelListenersCount;
        this.channelListeners[listenerId] = listener;
        this.channelListenersCount++;
        return function() {
          delete _this.channelListeners[listenerId];
        };
      };
      IFrameProtocol2.prototype.eventListener = function(evt) {
        if (evt.source !== this.frameWindow) {
          return;
        }
        var message = evt.data;
        if (!message.codesandbox) {
          return;
        }
        Object.values(this.globalListeners).forEach(function(listener) {
          return listener(message);
        });
        if (message.$id !== this.channelId) {
          return;
        }
        Object.values(this.channelListeners).forEach(function(listener) {
          return listener(message);
        });
      };
      return IFrameProtocol2;
    })();
    extensionMap = /* @__PURE__ */ new Map();
    entries = Object.entries(import_mime_db.default);
    for (_i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
      _a$1 = entries_1[_i], mimetype = _a$1[0], entry = _a$1[1];
      if (!entry.extensions) {
        continue;
      }
      extensions = entry.extensions;
      if (extensions.length) {
        for (_b = 0, extensions_1 = extensions; _b < extensions_1.length; _b++) {
          ext = extensions_1[_b];
          extensionMap.set(ext, mimetype);
        }
      }
    }
    EXTENSIONS_MAP = extensionMap;
    CHANNEL_NAME = "$CSB_RELAY";
    MAX_CLIENT_DEPENDENCY_COUNT = 50;
    SUFFIX_PLACEHOLDER = "-{{suffix}}";
    BUNDLER_URL = "https://".concat((_a = "2.19.8") === null || _a === void 0 ? void 0 : _a.replace(/\./g, "-")).concat(SUFFIX_PLACEHOLDER, "-sandpack.codesandbox.io/");
    SandpackRuntime = /** @class */
    (function(_super) {
      __extends(SandpackRuntime2, _super);
      function SandpackRuntime2(selector, sandboxSetup, options) {
        if (options === void 0) {
          options = {};
        }
        var _this = _super.call(this, selector, sandboxSetup, options) || this;
        _this.getTranspilerContext = function() {
          return new Promise(function(resolve) {
            var unsubscribe = _this.listen(function(message) {
              if (message.type === "transpiler-context") {
                resolve(message.data);
                unsubscribe();
              }
            });
            _this.dispatch({ type: "get-transpiler-context" });
          });
        };
        _this.getTranspiledFiles = function() {
          return new Promise(function(resolve) {
            var unsubscribe = _this.listen(function(message) {
              if (message.type === "all-modules") {
                resolve(message.data);
                unsubscribe();
              }
            });
            _this.dispatch({ type: "get-modules" });
          });
        };
        _this.bundlerURL = _this.createBundlerURL();
        _this.bundlerState = void 0;
        _this.errors = [];
        _this.status = "initializing";
        if (typeof selector === "string") {
          _this.selector = selector;
          var element = document.querySelector(selector);
          nullthrows(element, "The element '".concat(selector, "' was not found"));
          _this.element = element;
          _this.iframe = document.createElement("iframe");
          _this.initializeElement();
        } else {
          _this.element = selector;
          _this.iframe = selector;
        }
        if (!_this.iframe.getAttribute("sandbox")) {
          _this.iframe.setAttribute("sandbox", "allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock");
          _this.iframe.setAttribute("allow", "accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; clipboard-read; clipboard-write; xr-spatial-tracking;");
        }
        _this.setLocationURLIntoIFrame();
        _this.iframeProtocol = new IFrameProtocol(_this.iframe, _this.bundlerURL);
        _this.unsubscribeGlobalListener = _this.iframeProtocol.globalListen(function(mes) {
          if (mes.type !== "initialized" || !_this.iframe.contentWindow) {
            return;
          }
          _this.iframeProtocol.register();
          if (_this.options.fileResolver) {
            _this.fileResolverProtocol = new Protocol("fs", function(data) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  if (data.method === "isFile") {
                    return [2, this.options.fileResolver.isFile(data.params[0])];
                  } else if (data.method === "readFile") {
                    return [2, this.options.fileResolver.readFile(data.params[0])];
                  } else {
                    throw new Error("Method not supported");
                  }
                });
              });
            }, _this.iframeProtocol);
          }
          _this.updateSandbox(_this.sandboxSetup, true);
        });
        _this.unsubscribeChannelListener = _this.iframeProtocol.channelListen(function(mes) {
          switch (mes.type) {
            case "start": {
              _this.errors = [];
              break;
            }
            case "status": {
              _this.status = mes.status;
              break;
            }
            case "action": {
              if (mes.action === "show-error") {
                _this.errors = __spreadArray(__spreadArray([], _this.errors, true), [extractErrorDetails(mes)], false);
              }
              break;
            }
            case "done": {
              _this.status = "done";
              break;
            }
            case "state": {
              _this.bundlerState = mes.state;
              break;
            }
          }
        });
        if (options.experimental_enableServiceWorker) {
          _this.serviceWorkerHandshake();
        }
        return _this;
      }
      SandpackRuntime2.prototype.createBundlerURL = function() {
        var _a2;
        var bundlerURL = this.options.bundlerURL || BUNDLER_URL;
        if (this.options.bundlerURL) {
          return bundlerURL;
        }
        if (this.options.teamId) {
          bundlerURL = bundlerURL.replace("https://", "https://" + this.options.teamId + "-") + "?cache=".concat(Date.now());
        }
        if (this.options.experimental_enableServiceWorker) {
          var suffixes = [];
          suffixes.push(Math.random().toString(36).slice(4));
          bundlerURL = bundlerURL.replace(SUFFIX_PLACEHOLDER, "-".concat((_a2 = this.options.experimental_stableServiceWorkerId) !== null && _a2 !== void 0 ? _a2 : suffixes.join("-")));
        } else {
          bundlerURL = bundlerURL.replace(SUFFIX_PLACEHOLDER, "");
        }
        return bundlerURL;
      };
      SandpackRuntime2.prototype.serviceWorkerHandshake = function() {
        var _this = this;
        var channel = new MessageChannel();
        var iframeContentWindow = this.iframe.contentWindow;
        if (!iframeContentWindow) {
          throw new Error("Could not get iframe contentWindow");
        }
        var port = channel.port1;
        port.onmessage = function(evt) {
          if (typeof evt.data === "object" && evt.data.$channel === CHANNEL_NAME) {
            switch (evt.data.$type) {
              case "preview/ready":
                break;
              case "preview/request":
                _this.handleWorkerRequest(evt.data, port);
                break;
            }
          }
        };
        var sendMessage = function() {
          var initMsg = {
            $channel: CHANNEL_NAME,
            $type: "preview/init"
          };
          iframeContentWindow.postMessage(initMsg, "*", [channel.port2]);
          _this.iframe.removeEventListener("load", sendMessage);
        };
        this.iframe.addEventListener("load", sendMessage);
      };
      SandpackRuntime2.prototype.handleWorkerRequest = function(request, port) {
        return __awaiter(this, void 0, void 0, function() {
          var notFound, filepath_1, headers, files, file, modulesFromManager, body, extension, foundMimetype, responseMessage, err_1;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                notFound = function() {
                  var responseMessage2 = {
                    $channel: CHANNEL_NAME,
                    $type: "preview/response",
                    id: request.id,
                    headers: {
                      "Content-Type": "text/html; charset=utf-8"
                    },
                    status: 404,
                    body: "File not found"
                  };
                  port.postMessage(responseMessage2);
                };
                _a2.label = 1;
              case 1:
                _a2.trys.push([1, 4, , 5]);
                filepath_1 = new URL(request.url, this.bundlerURL).pathname;
                headers = {};
                files = this.getFiles();
                file = files[filepath_1];
                if (!!file) return [3, 3];
                return [4, this.getTranspiledFiles()];
              case 2:
                modulesFromManager = _a2.sent();
                file = modulesFromManager.find(function(item) {
                  return item.path.endsWith(filepath_1);
                });
                if (!file) {
                  notFound();
                  return [
                    2
                    /*return*/
                  ];
                }
                _a2.label = 3;
              case 3:
                body = file.code;
                if (!headers["Content-Type"]) {
                  extension = getExtension(filepath_1);
                  foundMimetype = EXTENSIONS_MAP.get(extension);
                  if (foundMimetype) {
                    headers["Content-Type"] = foundMimetype;
                  }
                }
                responseMessage = {
                  $channel: CHANNEL_NAME,
                  $type: "preview/response",
                  id: request.id,
                  headers,
                  status: 200,
                  body
                };
                port.postMessage(responseMessage);
                return [3, 5];
              case 4:
                err_1 = _a2.sent();
                console.error(err_1);
                notFound();
                return [3, 5];
              case 5:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      SandpackRuntime2.prototype.setLocationURLIntoIFrame = function() {
        var _a2;
        var urlSource = this.options.startRoute ? new URL(this.options.startRoute, this.bundlerURL).toString() : this.bundlerURL;
        (_a2 = this.iframe.contentWindow) === null || _a2 === void 0 ? void 0 : _a2.location.replace(urlSource);
        this.iframe.src = urlSource;
      };
      SandpackRuntime2.prototype.destroy = function() {
        this.unsubscribeChannelListener();
        this.unsubscribeGlobalListener();
        this.iframeProtocol.cleanup();
      };
      SandpackRuntime2.prototype.updateOptions = function(options) {
        if (!dequal(this.options, options)) {
          this.options = options;
          this.updateSandbox();
        }
      };
      SandpackRuntime2.prototype.updateSandbox = function(sandboxSetup, isInitializationCompile) {
        var _a2, _b, _c, _d;
        if (sandboxSetup === void 0) {
          sandboxSetup = this.sandboxSetup;
        }
        this.sandboxSetup = __assign(__assign({}, this.sandboxSetup), sandboxSetup);
        var files = this.getFiles();
        var modules = Object.keys(files).reduce(function(prev, next) {
          var _a3;
          return __assign(__assign({}, prev), (_a3 = {}, _a3[next] = {
            code: files[next].code,
            path: next
          }, _a3));
        }, {});
        var packageJSON = JSON.parse(createPackageJSON(this.sandboxSetup.dependencies, this.sandboxSetup.devDependencies, this.sandboxSetup.entry));
        try {
          packageJSON = JSON.parse(files["/package.json"].code);
        } catch (e) {
          console.error(createError("could not parse package.json file: " + e.message));
        }
        var normalizedModules = Object.keys(files).reduce(function(prev, next) {
          var _a3;
          return __assign(__assign({}, prev), (_a3 = {}, _a3[next] = {
            content: files[next].code,
            path: next
          }, _a3));
        }, {});
        this.dispatch(__assign(__assign({}, this.options), { type: "compile", codesandbox: true, version: 3, isInitializationCompile, modules, reactDevTools: this.options.reactDevTools, externalResources: this.options.externalResources || [], hasFileResolver: Boolean(this.options.fileResolver), disableDependencyPreprocessing: this.sandboxSetup.disableDependencyPreprocessing, experimental_enableServiceWorker: this.options.experimental_enableServiceWorker, template: this.sandboxSetup.template || getTemplate(packageJSON, normalizedModules), showOpenInCodeSandbox: (_a2 = this.options.showOpenInCodeSandbox) !== null && _a2 !== void 0 ? _a2 : true, showErrorScreen: (_b = this.options.showErrorScreen) !== null && _b !== void 0 ? _b : true, showLoadingScreen: (_c = this.options.showLoadingScreen) !== null && _c !== void 0 ? _c : false, skipEval: this.options.skipEval || false, clearConsoleDisabled: !this.options.clearConsoleOnFirstCompile, logLevel: (_d = this.options.logLevel) !== null && _d !== void 0 ? _d : SandpackLogLevel.Info, customNpmRegistries: this.options.customNpmRegistries, teamId: this.options.teamId, sandboxId: this.options.sandboxId }));
      };
      SandpackRuntime2.prototype.dispatch = function(message) {
        if (message.type === "refresh") {
          this.setLocationURLIntoIFrame();
          if (this.options.experimental_enableServiceWorker) {
            this.serviceWorkerHandshake();
          }
        }
        this.iframeProtocol.dispatch(message);
      };
      SandpackRuntime2.prototype.listen = function(listener) {
        return this.iframeProtocol.channelListen(listener);
      };
      SandpackRuntime2.prototype.getCodeSandboxURL = function() {
        var files = this.getFiles();
        var paramFiles = Object.keys(files).reduce(function(prev, next) {
          var _a2;
          return __assign(__assign({}, prev), (_a2 = {}, _a2[next.replace("/", "")] = {
            content: files[next].code,
            isBinary: false
          }, _a2));
        }, {});
        return fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
          method: "POST",
          body: JSON.stringify({ files: paramFiles }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(function(x) {
          return x.json();
        }).then(function(res) {
          return {
            sandboxId: res.sandbox_id,
            editorUrl: "https://codesandbox.io/s/".concat(res.sandbox_id),
            embedUrl: "https://codesandbox.io/embed/".concat(res.sandbox_id)
          };
        });
      };
      SandpackRuntime2.prototype.getFiles = function() {
        var sandboxSetup = this.sandboxSetup;
        if (sandboxSetup.files["/package.json"] === void 0) {
          return addPackageJSONIfNeeded(sandboxSetup.files, sandboxSetup.dependencies, sandboxSetup.devDependencies, sandboxSetup.entry);
        }
        return this.sandboxSetup.files;
      };
      SandpackRuntime2.prototype.initializeElement = function() {
        this.iframe.style.border = "0";
        this.iframe.style.width = this.options.width || "100%";
        this.iframe.style.height = this.options.height || "100%";
        this.iframe.style.overflow = "hidden";
        nullthrows(this.element.parentNode, "The given iframe does not have a parent.");
        this.element.parentNode.replaceChild(this.iframe, this.element);
      };
      return SandpackRuntime2;
    })(SandpackClient);
  }
});

// node_modules/@codesandbox/sandpack-client/dist/index.mjs
init_utils_52664384();
init_utils_52664384();
init_lib();
function loadSandpackClient(iframeSelector, sandboxSetup, options) {
  var _a2;
  if (options === void 0) {
    options = {};
  }
  return __awaiter(this, void 0, void 0, function() {
    var template, Client, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          template = (_a2 = sandboxSetup.template) !== null && _a2 !== void 0 ? _a2 : "parcel";
          _b = template;
          switch (_b) {
            case "node":
              return [3, 1];
            case "static":
              return [3, 3];
          }
          return [3, 5];
        case 1:
          return [4, Promise.resolve().then(() => (init_node(), node_exports)).then(function(m) {
            return m.SandpackNode;
          })];
        case 2:
          Client = _c.sent();
          return [3, 7];
        case 3:
          return [4, Promise.resolve().then(() => (init_index_599aeaf7(), index_599aeaf7_exports)).then(function(m) {
            return m.SandpackStatic;
          })];
        case 4:
          Client = _c.sent();
          return [3, 7];
        case 5:
          return [4, Promise.resolve().then(() => (init_runtime(), runtime_exports)).then(function(m) {
            return m.SandpackRuntime;
          })];
        case 6:
          Client = _c.sent();
          _c.label = 7;
        case 7:
          return [2, new Client(iframeSelector, sandboxSetup, options)];
      }
    });
  });
}
export {
  SandpackLogLevel,
  addPackageJSONIfNeeded,
  createError,
  createPackageJSON,
  extractErrorDetails,
  loadSandpackClient,
  normalizePath,
  nullthrows
};
/*! Bundled license information:

static-browser-server/out/lib/main.js:
  (*! Bundled license information:
  
  mime-db/index.js:
    (*!
     * mime-db
     * Copyright(c) 2014 Jonathan Ong
     * Copyright(c) 2015-2022 Douglas Christopher Wilson
     * MIT Licensed
     *)
  *)

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=sandpack-client.mjs.map
