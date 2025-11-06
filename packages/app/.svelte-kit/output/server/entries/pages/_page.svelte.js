import { e as escape_html } from "../../chunks/async.js";
import { c as bind_props, s as spread_props, d as attributes, e as ensure_array_like, a as attr_style, b as attr_class } from "../../chunks/index2.js";
import { t } from "../../chunks/i18n.svelte.js";
import { m as moduleStore } from "../../chunks/modules.svelte.js";
import { clsx } from "clsx";
import { c as cn, i as isMobile, C as Card, a as Card_header, b as Card_title, d as Card_content } from "../../chunks/card.js";
import { L as Label, I as Input, B as Button, R as Root$2, a as Dialog_content, b as Dialog_header, c as Dialog_title, D as Dialog_trigger } from "../../chunks/label.js";
import { ContextMenu, Dialog } from "bits-ui";
import { h as hasContext, g as getContext, c as setContext, d as save } from "../../chunks/context.js";
import { c as clsx$1, a as attr } from "../../chunks/attributes.js";
import { selectionFeedback } from "@tauri-apps/plugin-haptics";
import { M as on } from "../../chunks/events.js";
import { i as is_array, h as get_prototype_of, o as object_prototype } from "../../chunks/equality.js";
import { R as Root$1, S as Select_trigger, a as Select_content, b as Select_item } from "../../chunks/index3.js";
import { D as Dialog_description } from "../../chunks/dialog-description.js";
import { D as Dialog_close } from "../../chunks/dialog-close.js";
const empty = [];
function snapshot(value, skip_warning = false, no_tojson = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty, null, no_tojson);
}
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element = value[i];
        if (i in value) {
          copy[i] = clone(element, cloned, path, paths, null, no_tojson);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key in value) {
        copy[key] = clone(
          // @ts-expect-error
          value[key],
          cloned,
          path,
          paths,
          null,
          no_tojson
        );
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function" && !no_tojson) {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
async function tick() {
}
function Context_menu_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      portalProps,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      ContextMenu.Portal($$renderer3, spread_props([
        portalProps,
        {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            ContextMenu.Content($$renderer4, spread_props([
              {
                "data-slot": "context-menu-content",
                class: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h---bits-context-menu-content-available-height origin---bits-context-menu-content-transform-origin z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md", className)
              },
              restProps,
              {
                get ref() {
                  return ref;
                },
                set ref($$value) {
                  ref = $$value;
                  $$settled = false;
                }
              }
            ]));
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Context_menu_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      inset,
      variant = "default",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      ContextMenu.Item($$renderer3, spread_props([
        {
          "data-slot": "context-menu-item",
          "data-inset": inset,
          "data-variant": variant,
          class: cn("hover:bg-accent hover:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 dark:data-[variant=destructive]:hover:bg-destructive/20 data-[variant=destructive]:hover:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)
        },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Context_menu_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ref = null, $$slots, $$events, ...restProps } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      ContextMenu.Trigger($$renderer3, spread_props([
        { "data-slot": "context-menu-trigger" },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
ContextMenu.Sub;
const Root = ContextMenu.Root;
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const CLASS_VALUE_PRIMITIVE_TYPES = ["string", "number", "bigint", "boolean"];
function isClassValue(value) {
  if (value === null || value === void 0)
    return true;
  if (CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof value))
    return true;
  if (Array.isArray(value))
    return value.every((item) => isClassValue(item));
  if (typeof value === "object") {
    if (Object.getPrototypeOf(value) !== Object.prototype)
      return false;
    return true;
  }
  return false;
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
function boxWith(getter, setter) {
  const derived = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived;
      },
      set current(v) {
        setter(v);
      }
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    }
  };
}
function boxFrom(value) {
  if (box.isBox(value)) return value;
  if (isFunction(value)) return box.with(value);
  return box(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce(
    (acc, [key, b]) => {
      if (!box.isBox(b)) {
        return Object.assign(acc, { [key]: b });
      }
      if (box.isWritableBox(b)) {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          set(v) {
            b.current = v;
          }
        });
      } else {
        Object.defineProperty(acc, key, {
          get() {
            return b.current;
          }
        });
      }
      return acc;
    },
    {}
  );
}
function toReadonlyBox(b) {
  if (!box.isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function composeHandlers(...handlers) {
  return function(e) {
    for (const handler of handlers) {
      if (!handler)
        continue;
      if (e.defaultPrevented)
        return;
      if (typeof handler === "function") {
        handler.call(this, e);
      } else {
        handler.current?.call(this, e);
      }
    }
  };
}
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
function index(style, options) {
  if (typeof style !== "string") {
    throw new TypeError("First argument must be a string");
  }
  if (!style) return [];
  options = options || {};
  var lineno = 1;
  var column = 1;
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column = ~i ? str.length - i : column + str.length;
  }
  function position() {
    var start = { line: lineno, column };
    return function(node) {
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }
  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column };
    this.source = options.source;
  }
  Position.prototype.content = style;
  function error(msg) {
    var err = new Error(
      options.source + ":" + lineno + ":" + column + ": " + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = style;
    if (options.silent) ;
    else {
      throw err;
    }
  }
  function match(re) {
    var m = re.exec(style);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m;
  }
  function whitespace() {
    match(WHITESPACE_REGEX);
  }
  function comments(rules) {
    var c;
    rules = rules || [];
    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }
  function comment() {
    var pos = position();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
    var i = 2;
    while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
      ++i;
    }
    i += 2;
    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error("End of comment missing");
    }
    var str = style.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    style = style.slice(i);
    column += 2;
    return pos({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  function declaration() {
    var pos = position();
    var prop = match(PROPERTY_REGEX);
    if (!prop) return;
    comment();
    if (!match(COLON_REGEX)) return error("property missing ':'");
    var val = match(VALUE_REGEX);
    var ret = pos({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    });
    match(SEMICOLON_REGEX);
    return ret;
  }
  function declarations() {
    var decls = [];
    comments(decls);
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    return decls;
  }
  whitespace();
  return declarations();
}
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
function StyleToObject(style, iterator) {
  let styleObject = null;
  if (!style || typeof style !== "string") {
    return styleObject;
  }
  const declarations = index(style);
  const hasIterator = typeof iterator === "function";
  declarations.forEach((declaration) => {
    if (declaration.type !== "declaration") {
      return;
    }
    const { property, value } = declaration;
    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      styleObject = styleObject || {};
      styleObject[property] = value;
    }
  });
  return styleObject;
}
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char))
    return void 0;
  return char !== char.toLowerCase();
}
function splitByCase(str) {
  const parts = [];
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = STR_SPLITTERS.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function pascalCase(str) {
  if (!str)
    return "";
  return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
  return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function cssToStyleObj(css) {
  if (!css)
    return {};
  const styleObj = {};
  function iterator(name, value) {
    if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
      styleObj[pascalCase(name)] = value;
      return;
    }
    if (name.startsWith("--")) {
      styleObj[name] = value;
      return;
    }
    styleObj[camelCase(name)] = value;
  }
  StyleToObject(css, iterator);
  return styleObj;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
    }
    if (!str.match(regex))
      return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
  }
  return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
}
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)"
};
styleToString(srOnlyStyles);
function isEventHandler(key) {
  return key.length > 2 && key.startsWith("on") && key[2] === key[2]?.toLowerCase();
}
function mergeProps(...args) {
  const result = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];
      const aIsFunction = typeof a === "function";
      const bIsFunction = typeof b === "function";
      if (aIsFunction && typeof bIsFunction && isEventHandler(key)) {
        const aHandler = a;
        const bHandler = b;
        result[key] = composeHandlers(aHandler, bHandler);
      } else if (aIsFunction && bIsFunction) {
        result[key] = executeCallbacks(a, b);
      } else if (key === "class") {
        const aIsClassValue = isClassValue(a);
        const bIsClassValue = isClassValue(b);
        if (aIsClassValue && bIsClassValue) {
          result[key] = clsx(a, b);
        } else if (aIsClassValue) {
          result[key] = clsx(a);
        } else if (bIsClassValue) {
          result[key] = clsx(b);
        }
      } else if (key === "style") {
        const aIsObject = typeof a === "object";
        const bIsObject = typeof b === "object";
        const aIsString = typeof a === "string";
        const bIsString = typeof b === "string";
        if (aIsObject && bIsObject) {
          result[key] = { ...a, ...b };
        } else if (aIsObject && bIsString) {
          const parsedStyle = cssToStyleObj(b);
          result[key] = { ...a, ...parsedStyle };
        } else if (aIsString && bIsObject) {
          const parsedStyle = cssToStyleObj(a);
          result[key] = { ...parsedStyle, ...b };
        } else if (aIsString && bIsString) {
          const parsedStyleA = cssToStyleObj(a);
          const parsedStyleB = cssToStyleObj(b);
          result[key] = { ...parsedStyleA, ...parsedStyleB };
        } else if (aIsObject) {
          result[key] = a;
        } else if (bIsObject) {
          result[key] = b;
        } else if (aIsString) {
          result[key] = a;
        } else if (bIsString) {
          result[key] = b;
        }
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
  }
  if (typeof result.style === "object") {
    result.style = styleToString(result.style).replaceAll("\n", " ");
  }
  if (result.hidden !== true) {
    result.hidden = void 0;
    delete result.hidden;
  }
  if (result.disabled !== true) {
    result.disabled = void 0;
    delete result.disabled;
  }
  return result;
}
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
function createSubscriber(_) {
  return () => {
  };
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const { window: window2 = defaultWindow, document: document2 = window2?.document } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement();
function runWatcher(sources, flush, effect, options = {}) {
  const { lazy = false } = options;
}
function watch(sources, effect, options) {
  runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
  runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
class Context {
  #name;
  #key;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(name) {
    this.#name = name;
    this.#key = Symbol(name);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#key;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return hasContext(this.#key);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const context = getContext(this.#key);
    if (context === void 0) {
      throw new Error(`Context "${this.#name}" not found`);
    }
    return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(fallback) {
    const context = getContext(this.#key);
    if (context === void 0) {
      return fallback;
    }
    return context;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(context) {
    return setContext(this.#key, context);
  }
}
function useRefById({ id, ref, deps = () => true, onRefChange, getRootNode }) {
  watch([() => id.current, deps], ([_id]) => {
    const rootNode = getRootNode?.() ?? document;
    const node = rootNode?.getElementById(_id);
    if (node) ref.current = node;
    else ref.current = null;
    onRefChange?.(ref.current);
  });
}
function afterSleep(ms, cb) {
  return setTimeout(cb, ms);
}
function afterTick(fn) {
  tick().then(fn);
}
function noop() {
}
const TRANSITIONS = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
};
const VELOCITY_THRESHOLD = 0.4;
const CLOSE_THRESHOLD = 0.25;
const SCROLL_LOCK_TIMEOUT = 100;
const BORDER_RADIUS = 8;
const NESTED_DISPLACEMENT = 16;
const WINDOW_TOP_OFFSET = 26;
const DRAG_CLASS = "vaul-dragging";
const cache = /* @__PURE__ */ new WeakMap();
function set(el, styles, ignoreCache = false) {
  if (!el || !(el instanceof HTMLElement))
    return;
  let originalStyles = {};
  Object.entries(styles).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value);
      return;
    }
    originalStyles[key] = el.style[key];
    el.style[key] = value;
  });
  if (ignoreCache)
    return;
  cache.set(el, originalStyles);
}
function reset(el, prop) {
  if (!el || !(el instanceof HTMLElement))
    return;
  let originalStyles = cache.get(el);
  if (!originalStyles)
    return;
  {
    el.style[prop] = originalStyles[prop];
  }
}
const isVertical = (direction) => {
  switch (direction) {
    case "top":
    case "bottom":
      return true;
    case "left":
    case "right":
      return false;
    default:
      return direction;
  }
};
function getTranslate(element, direction) {
  if (!element) {
    return null;
  }
  const style = window.getComputedStyle(element);
  const transform = (
    // @ts-expect-error - shh
    style.transform || style.webkitTransform || style.mozTransform
  );
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    return parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
  }
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
function dampenValue(v) {
  return 8 * (Math.log(v + 1) - 2);
}
function assignStyle(element, style) {
  if (!element)
    return () => {
    };
  const prevStyle = element.style.cssText;
  Object.assign(element.style, style);
  return () => {
    element.style.cssText = prevStyle;
  };
}
function chain$1(...fns) {
  return (...args) => {
    for (const fn of fns) {
      if (typeof fn === "function") {
        fn(...args);
      }
    }
  };
}
function useSnapPoints({
  snapPoints,
  drawerNode,
  overlayNode,
  fadeFromIndex,
  setOpenTime,
  direction,
  container,
  snapToSequentialPoint,
  activeSnapPoint,
  open,
  isReleasing
}) {
  let windowDimensions = typeof window !== "undefined" ? {} : void 0;
  const isLastSnapPoint = activeSnapPoint.current === snapPoints.current?.[snapPoints.current.length - 1] || null;
  const activeSnapPointIndex = snapPoints.current?.findIndex((snapPoint) => snapPoint === activeSnapPoint.current);
  const shouldFade = snapPoints.current && snapPoints.current.length > 0 && (fadeFromIndex.current || fadeFromIndex.current === 0) && !Number.isNaN(fadeFromIndex.current) && snapPoints.current[fadeFromIndex.current] === activeSnapPoint.current || !snapPoints.current;
  const snapPointsOffset = (() => {
    open.current;
    const containerSize = container.current ? {
      width: container.current.getBoundingClientRect().width,
      height: container.current.getBoundingClientRect().height
    } : typeof window !== "undefined" ? { width: window.innerWidth, height: window.innerHeight } : { width: 0, height: 0 };
    return snapPoints.current?.map((snapPoint) => {
      const isPx = typeof snapPoint === "string";
      let snapPointAsNumber = 0;
      if (isPx) {
        snapPointAsNumber = parseInt(snapPoint, 10);
      }
      if (isVertical(direction.current)) {
        const height = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.height : 0;
        if (windowDimensions) {
          return direction.current === "bottom" ? containerSize.height - height : -containerSize.height + height;
        }
        return height;
      }
      const width = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.width : 0;
      if (windowDimensions) {
        return direction.current === "right" ? containerSize.width - width : -containerSize.width + width;
      }
      return width;
    }) ?? [];
  })();
  const activeSnapPointOffset = (() => {
    if (activeSnapPointIndex !== null) {
      if (activeSnapPointIndex !== void 0) {
        return snapPointsOffset[activeSnapPointIndex];
      }
    }
    return null;
  })();
  function onSnapPointChange(activeSnapPointIndex2) {
    if (snapPoints.current && activeSnapPointIndex2 === snapPointsOffset.length - 1) {
      setOpenTime(/* @__PURE__ */ new Date());
    }
  }
  function snapToPoint(dimension) {
    const newSnapPointIndex = snapPointsOffset?.findIndex((snapPointDim) => snapPointDim === dimension) ?? null;
    onSnapPointChange(newSnapPointIndex);
    set(drawerNode(), {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: isVertical(direction.current) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
    });
    if (snapPointsOffset && newSnapPointIndex !== snapPointsOffset.length - 1 && fadeFromIndex.current !== void 0 && newSnapPointIndex !== fadeFromIndex.current && newSnapPointIndex < fadeFromIndex.current) {
      set(overlayNode(), {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        opacity: "0"
      });
    } else {
      set(overlayNode(), {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        opacity: "1"
      });
    }
    activeSnapPoint.current = snapPoints.current?.[Math.max(newSnapPointIndex, 0)];
  }
  watch([() => activeSnapPoint.current, () => open.current], () => {
    const releasing = isReleasing();
    if (!activeSnapPoint.current || releasing) return;
    const newIndex = snapPoints.current?.findIndex((snapPoint) => snapPoint === activeSnapPoint.current) ?? -1;
    if (snapPointsOffset && newIndex !== -1 && typeof snapPointsOffset[newIndex] === "number") {
      if (snapPointsOffset[newIndex] === activeSnapPoint.current) return;
      snapToPoint(snapPointsOffset[newIndex]);
    }
  });
  function onRelease({ draggedDistance, closeDrawer, velocity, dismissible }) {
    if (fadeFromIndex.current === void 0) return;
    const dir = direction.current;
    const currentPosition = dir === "bottom" || dir === "right" ? (activeSnapPointOffset ?? 0) - draggedDistance : (activeSnapPointOffset ?? 0) + draggedDistance;
    const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex.current - 1;
    const isFirst = activeSnapPointIndex === 0;
    const hasDraggedUp = draggedDistance > 0;
    if (isOverlaySnapPoint) {
      set(overlayNode(), {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      });
    }
    if (!snapToSequentialPoint.current && velocity > 2 && !hasDraggedUp) {
      if (dismissible) {
        closeDrawer();
      } else {
        snapToPoint(snapPointsOffset[0]);
      }
      return;
    }
    if (!snapToSequentialPoint.current && velocity > 2 && hasDraggedUp && snapPointsOffset && snapPoints.current) {
      snapToPoint(snapPointsOffset[snapPoints.current.length - 1]);
      return;
    }
    const closestSnapPoint = snapPointsOffset?.reduce((prev, curr) => {
      if (typeof prev !== "number" || typeof curr !== "number") return prev;
      return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
    });
    const dim = isVertical(dir) ? window.innerHeight : window.innerWidth;
    if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * 0.4) {
      const dragDirection = hasDraggedUp ? 1 : -1;
      if (dragDirection > 0 && isLastSnapPoint && snapPoints.current) {
        snapToPoint(snapPointsOffset[snapPoints.current.length - 1]);
        return;
      }
      if (isFirst && dragDirection < 0 && dismissible) {
        closeDrawer();
      }
      if (activeSnapPointIndex === null) return;
      snapToPoint(snapPointsOffset[activeSnapPointIndex + dragDirection]);
      return;
    }
    snapToPoint(closestSnapPoint);
  }
  function onDrag({ draggedDistance }) {
    if (activeSnapPointOffset === null) return;
    const dir = direction.current;
    const newValue = isBottomOrRight(dir) ? activeSnapPointOffset - draggedDistance : activeSnapPointOffset + draggedDistance;
    const lastSnapPoint = snapPointsOffset[snapPointsOffset.length - 1];
    if (isBottomOrRight(dir) && newValue < lastSnapPoint) return;
    if (!isBottomOrRight(dir) && newValue > lastSnapPoint) return;
    set(drawerNode(), {
      transform: isVertical(dir) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
    });
  }
  function getPercentageDragged(absDraggedDistance, isDraggingDown) {
    if (!snapPoints.current || typeof activeSnapPointIndex !== "number" || !snapPointsOffset || fadeFromIndex.current === void 0) {
      return null;
    }
    const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex.current - 1;
    const isOverlaySnapPointOrHigher = activeSnapPointIndex >= fadeFromIndex.current;
    if (isOverlaySnapPointOrHigher && isDraggingDown) {
      return 0;
    }
    if (isOverlaySnapPoint && !isDraggingDown) {
      return 1;
    }
    if (!shouldFade && !isOverlaySnapPoint) {
      return null;
    }
    const targetSnapPointIndex = isOverlaySnapPoint ? activeSnapPointIndex + 1 : activeSnapPointIndex - 1;
    const snapPointDistance = isOverlaySnapPoint ? snapPointsOffset[targetSnapPointIndex] - snapPointsOffset[targetSnapPointIndex - 1] : snapPointsOffset[targetSnapPointIndex + 1] - snapPointsOffset[targetSnapPointIndex];
    const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
    if (isOverlaySnapPoint) {
      return 1 - percentageDragged;
    } else {
      return percentageDragged;
    }
  }
  return {
    get isLastSnapPoint() {
      return isLastSnapPoint;
    },
    get shouldFade() {
      return shouldFade;
    },
    get activeSnapPointIndex() {
      return activeSnapPointIndex;
    },
    get snapPointsOffset() {
      return snapshot(snapPointsOffset);
    },
    getPercentageDragged,
    onRelease,
    onDrag
  };
}
function isBottomOrRight(direction) {
  if (direction === "bottom" || direction === "right") return true;
  return false;
}
const isBrowser = typeof document !== "undefined";
function isMobileFirefox() {
  const userAgent = navigator.userAgent;
  return typeof window !== "undefined" && (/Firefox/.test(userAgent) && /Mobile/.test(userAgent) || // Android Firefox
  /FxiOS/.test(userAgent));
}
function isMac() {
  return testPlatform(/^Mac/);
}
function isIPhone() {
  return testPlatform(/^iPhone/);
}
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isIPad() {
  return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : void 0;
}
const KEYBOARD_BUFFER = 24;
function chain(...callbacks) {
  return (...args) => {
    for (let callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
const visualViewport = isBrowser && window.visualViewport;
function isScrollable(node) {
  let style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
function getScrollParent(node) {
  if (isScrollable(node)) {
    node = node.parentElement;
  }
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }
  return node || document.scrollingElement || document.documentElement;
}
const nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
let preventScrollCount = 0;
let restore;
function usePreventScroll(opts) {
  watch(opts.isDisabled, () => {
    if (opts.isDisabled()) {
      return;
    }
    preventScrollCount++;
    if (preventScrollCount === 1) {
      if (isIOS()) {
        restore = preventScrollMobileSafari();
      }
    }
    return () => {
      preventScrollCount--;
      if (preventScrollCount === 0) {
        restore?.();
      }
    };
  });
}
function preventScrollMobileSafari() {
  let scrollable;
  let lastY = 0;
  const onTouchStart = (e) => {
    scrollable = getScrollParent(e.target);
    if (scrollable === document.documentElement && scrollable === document.body) {
      return;
    }
    lastY = e.changedTouches[0].pageY;
  };
  let onTouchMove = (e) => {
    if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
      e.preventDefault();
      return;
    }
    let y = e.changedTouches[0].pageY;
    let scrollTop = scrollable.scrollTop;
    let bottom = scrollable.scrollHeight - scrollable.clientHeight;
    if (bottom === 0) {
      return;
    }
    if (scrollTop <= 0 && y > lastY || scrollTop >= bottom && y < lastY) {
      e.preventDefault();
    }
    lastY = y;
  };
  let onTouchEnd = (e) => {
    let target = e.target;
    if (isInput(target) && target !== document.activeElement) {
      e.preventDefault();
      target.style.transform = "translateY(-2000px)";
      target.focus();
      requestAnimationFrame(() => {
        target.style.transform = "";
      });
    }
  };
  const onFocus = (e) => {
    let target = e.target;
    if (isInput(target)) {
      target.style.transform = "translateY(-2000px)";
      requestAnimationFrame(() => {
        target.style.transform = "";
        if (visualViewport) {
          if (visualViewport.height < window.innerHeight) {
            requestAnimationFrame(() => {
              scrollIntoView(target);
            });
          } else {
            visualViewport.addEventListener("resize", () => scrollIntoView(target), { once: true });
          }
        }
      });
    }
  };
  let onWindowScroll = () => {
    window.scrollTo(0, 0);
  };
  let scrollX = window.pageXOffset;
  let scrollY = window.pageYOffset;
  let restoreStyles = chain(setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
  window.scrollTo(0, 0);
  let removeEvents = chain(on(document, "touchstart", onTouchStart, { passive: false, capture: true }), on(document, "touchmove", onTouchMove, { passive: false, capture: true }), on(document, "touchend", onTouchEnd, { passive: false, capture: true }), on(document, "focus", onFocus, { capture: true }), on(window, "scroll", onWindowScroll));
  return () => {
    restoreStyles();
    removeEvents();
    window.scrollTo(scrollX, scrollY);
  };
}
function setStyle(element, style, value) {
  let cur = element.style[style];
  element.style[style] = value;
  return () => {
    element.style[style] = cur;
  };
}
function scrollIntoView(target) {
  let root = document.scrollingElement || document.documentElement;
  while (target && target !== root) {
    let scrollable = getScrollParent(target);
    if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== target) {
      let scrollableTop = scrollable.getBoundingClientRect().top;
      let targetTop = target.getBoundingClientRect().top;
      let targetBottom = target.getBoundingClientRect().bottom;
      const keyboardHeight = scrollable.getBoundingClientRect().bottom + KEYBOARD_BUFFER;
      if (targetBottom > keyboardHeight) {
        scrollable.scrollTop += targetTop - scrollableTop;
      }
    }
    target = scrollable.parentElement;
  }
}
function isInput(target) {
  return target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
let previousBodyPosition = null;
function usePositionFixed({
  open,
  modal,
  nested,
  hasBeenOpened,
  preventScrollRestoration,
  noBodyStyles
}) {
  let activeUrl = typeof window !== "undefined" ? window.location.href : "";
  let scrollPos = 0;
  function setPositionFixed() {
    if (!isSafari()) return;
    if (previousBodyPosition === null && open.current && !noBodyStyles.current) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height,
        right: "unset"
      };
      const { scrollX, innerHeight } = window;
      document.body.style.setProperty("position", "fixed", "important");
      Object.assign(document.body.style, {
        top: `${-scrollPos}px`,
        left: `${-scrollX}px`,
        right: "0px",
        height: "auto"
      });
      window.setTimeout(
        () => window.requestAnimationFrame(() => {
          const bottomBarHeight = innerHeight - window.innerHeight;
          if (bottomBarHeight && scrollPos >= innerHeight) {
            document.body.style.top = `${-(scrollPos + bottomBarHeight)}px`;
          }
        }),
        300
      );
    }
  }
  function restorePositionSetting() {
    if (!isSafari()) return;
    if (previousBodyPosition !== null && !noBodyStyles.current) {
      const y = -parseInt(document.body.style.top, 10);
      const x = -parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, previousBodyPosition);
      window.requestAnimationFrame(() => {
        if (preventScrollRestoration.current && activeUrl !== window.location.href) {
          activeUrl = window.location.href;
          return;
        }
        window.scrollTo(x, y);
      });
      previousBodyPosition = null;
    }
  }
  watch([() => modal.current, () => activeUrl], () => {
    if (!modal.current) return;
    return () => {
      if (typeof document === "undefined") return;
      const hasDrawerOpened = !!document.querySelector("[data-vaul-drawer]");
      if (hasDrawerOpened) return;
      restorePositionSetting();
    };
  });
  watch(
    [
      () => open.current,
      () => hasBeenOpened(),
      () => activeUrl,
      () => modal.current,
      () => nested.current
    ],
    () => {
      if (nested.current || !hasBeenOpened()) return;
      if (open.current) {
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
        !isStandalone && setPositionFixed();
        if (!modal.current) {
          window.setTimeout(
            () => {
              restorePositionSetting();
            },
            500
          );
        }
      } else {
        restorePositionSetting();
      }
    }
  );
  return { restorePositionSetting };
}
const DrawerContext = new Context("Drawer.Root");
function useDrawerRoot(opts) {
  let hasBeenOpened = false;
  let isDragging = false;
  let justReleased = false;
  let overlayNode = null;
  let drawerNode = null;
  let openTime = null;
  let dragStartTime = null;
  let dragEndTime = null;
  let lastTimeDragPrevented = null;
  let isAllowedToDrag = false;
  let nestedOpenChangeTimer = null;
  let pointerStart = 0;
  let keyboardIsOpen = box(false);
  let shouldAnimate = !opts.open.current;
  let previousDiffFromInitial = 0;
  let drawerHeight = 0;
  let drawerWidth = 0;
  let initialDrawerHeight = 0;
  let isReleasing = false;
  const snapPointsState = useSnapPoints({
    snapPoints: opts.snapPoints,
    drawerNode: () => drawerNode,
    activeSnapPoint: opts.activeSnapPoint,
    container: opts.container,
    direction: opts.direction,
    fadeFromIndex: opts.fadeFromIndex,
    overlayNode: () => overlayNode,
    setOpenTime: (time) => {
      openTime = time;
    },
    snapToSequentialPoint: opts.snapToSequentialPoint,
    open: opts.open,
    isReleasing: () => isReleasing
  });
  usePreventScroll({
    isDisabled: () => !opts.open.current || isDragging || !opts.modal.current || justReleased || !hasBeenOpened || !opts.repositionInputs.current || !opts.disablePreventScroll.current
  });
  const { restorePositionSetting } = usePositionFixed({ ...opts, hasBeenOpened: () => hasBeenOpened });
  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }
  function onPress(event) {
    if (!opts.dismissible.current && !opts.snapPoints.current) return;
    if (drawerNode && !drawerNode.contains(event.target)) return;
    drawerHeight = drawerNode?.getBoundingClientRect().height || 0;
    drawerWidth = drawerNode?.getBoundingClientRect().width || 0;
    isDragging = true;
    dragStartTime = /* @__PURE__ */ new Date();
    if (isIOS()) {
      on(window, "touchend", () => isAllowedToDrag = false, { once: true });
    }
    event.target.setPointerCapture(event.pointerId);
    pointerStart = isVertical(opts.direction.current) ? event.pageY : event.pageX;
  }
  function shouldDrag(el, isDraggingInDirection) {
    let element = el;
    const highlightedText = window.getSelection()?.toString();
    const swipeAmount = drawerNode ? getTranslate(drawerNode, opts.direction.current) : null;
    const date = /* @__PURE__ */ new Date();
    if (element.tagName === "SELECT") return false;
    if (element.hasAttribute("data-vaul-no-drag") || element.closest("[data-vaul-no-drag]")) {
      return false;
    }
    if (opts.direction.current === "right" || opts.direction.current === "left") {
      return true;
    }
    if (openTime && date.getTime() - openTime.getTime() < 500) {
      return false;
    }
    if (swipeAmount !== null) {
      if (opts.direction.current === "bottom" ? swipeAmount > 0 : swipeAmount < 0) {
        return true;
      }
    }
    if (highlightedText && highlightedText.length > 0) {
      return false;
    }
    if (lastTimeDragPrevented && date.getTime() - lastTimeDragPrevented.getTime() < opts.scrollLockTimeout.current && swipeAmount === 0) {
      lastTimeDragPrevented = date;
      return false;
    }
    if (isDraggingInDirection) {
      lastTimeDragPrevented = date;
      return false;
    }
    while (element) {
      if (element.scrollHeight > element.clientHeight) {
        if (element.scrollTop !== 0) {
          lastTimeDragPrevented = /* @__PURE__ */ new Date();
          return false;
        }
        if (element.getAttribute("role") === "dialog") {
          return true;
        }
      }
      element = element.parentNode;
    }
    return true;
  }
  function onDrag(event) {
    if (!drawerNode || !isDragging) return;
    const directionMultiplier = opts.direction.current === "bottom" || opts.direction.current === "right" ? 1 : -1;
    const draggedDistance = (pointerStart - (isVertical(opts.direction.current) ? event.pageY : event.pageX)) * directionMultiplier;
    const isDraggingInDirection = draggedDistance > 0;
    const noCloseSnapPointsPreCondition = opts.snapPoints.current && !opts.dismissible.current && !isDraggingInDirection;
    if (noCloseSnapPointsPreCondition && snapPointsState.activeSnapPointIndex === 0) return;
    const absDraggedDistance = Math.abs(draggedDistance);
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    const drawerDimension = opts.direction.current === "bottom" || opts.direction.current === "top" ? drawerHeight : drawerWidth;
    let percentageDragged = absDraggedDistance / drawerDimension;
    const snapPointPercentageDragged = snapPointsState.getPercentageDragged(absDraggedDistance, isDraggingInDirection);
    if (snapPointPercentageDragged !== null) {
      percentageDragged = snapPointPercentageDragged;
    }
    if (noCloseSnapPointsPreCondition && percentageDragged >= 1) {
      return;
    }
    if (!isAllowedToDrag && !shouldDrag(event.target, isDraggingInDirection)) return;
    drawerNode.classList.add(DRAG_CLASS);
    isAllowedToDrag = true;
    set(drawerNode, { transition: "none" });
    set(overlayNode, { transition: "none" });
    if (opts.snapPoints.current) {
      snapPointsState.onDrag({ draggedDistance });
    }
    if (isDraggingInDirection && !opts.snapPoints.current) {
      const dampenedDraggedDistance = dampenValue(draggedDistance);
      const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
      set(drawerNode, {
        transform: isVertical(opts.direction.current) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
      });
      return;
    }
    const opacityValue = 1 - percentageDragged;
    if (snapPointsState.shouldFade || opts.fadeFromIndex.current && snapPointsState.activeSnapPointIndex === opts.fadeFromIndex.current - 1) {
      opts.onDrag.current?.(event, percentageDragged);
      set(overlayNode, { opacity: `${opacityValue}`, transition: "none" }, true);
    }
    if (wrapper && overlayNode && opts.shouldScaleBackground.current) {
      const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
      const borderRadiusValue = 8 - percentageDragged * 8;
      const translateValue = Math.max(0, 14 - percentageDragged * 14);
      set(
        wrapper,
        {
          borderRadius: `${borderRadiusValue}px`,
          transform: isVertical(opts.direction.current) ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)` : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
          transition: "none"
        },
        true
      );
    }
    if (!opts.snapPoints.current) {
      const translateValue = absDraggedDistance * directionMultiplier;
      set(drawerNode, {
        transform: isVertical(opts.direction.current) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
      });
    }
  }
  function onDialogOpenChange(o) {
    if (!opts.dismissible.current && !o) return;
    if (o) {
      hasBeenOpened = true;
    } else {
      closeDrawer(true);
    }
    opts.open.current = o;
  }
  function onVisualViewportChange() {
    if (!drawerNode || !opts.repositionInputs.current) return;
    const focusedElement = document.activeElement;
    if (isInput(focusedElement) || keyboardIsOpen.current) {
      const visualViewportHeight = window.visualViewport?.height || 0;
      const totalHeight = window.innerHeight;
      let diffFromInitial = totalHeight - visualViewportHeight;
      const drawerHeight2 = drawerNode.getBoundingClientRect().height || 0;
      const isTallEnough = drawerHeight2 > totalHeight * 0.8;
      if (!initialDrawerHeight) {
        initialDrawerHeight = drawerHeight2;
      }
      const offsetFromTop = drawerNode.getBoundingClientRect().top;
      if (Math.abs(previousDiffFromInitial - diffFromInitial) > 60) {
        keyboardIsOpen.current = !keyboardIsOpen.current;
      }
      if (opts.snapPoints.current && opts.snapPoints.current.length > 0 && snapPointsState.snapPointsOffset && snapPointsState.activeSnapPointIndex) {
        const activeSnapPointHeight = snapPointsState.snapPointsOffset[snapPointsState.activeSnapPointIndex] || 0;
        diffFromInitial += activeSnapPointHeight;
      }
      previousDiffFromInitial = diffFromInitial;
      if (drawerHeight2 > visualViewportHeight || keyboardIsOpen.current) {
        const height = drawerNode.getBoundingClientRect().height;
        let newDrawerHeight = height;
        if (height > visualViewportHeight) {
          newDrawerHeight = visualViewportHeight - (isTallEnough ? offsetFromTop : WINDOW_TOP_OFFSET);
        }
        if (opts.fixed.current) {
          drawerNode.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
        } else {
          drawerNode.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`;
        }
      } else if (!isMobileFirefox()) {
        drawerNode.style.height = `${initialDrawerHeight}px`;
      }
      if (opts.snapPoints.current && opts.snapPoints.current.length > 0 && !keyboardIsOpen.current) {
        drawerNode.style.bottom = `0px`;
      } else {
        drawerNode.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
      }
    }
  }
  watch(
    [
      () => snapPointsState.activeSnapPointIndex,
      () => opts.snapPoints.current,
      () => snapPointsState.snapPointsOffset,
      () => drawerNode
    ],
    () => {
      if (!window.visualViewport) return;
      return on(window.visualViewport, "resize", onVisualViewportChange);
    }
  );
  function cancelDrag() {
    if (!isDragging || !drawerNode) return;
    drawerNode.classList.remove(DRAG_CLASS);
    isAllowedToDrag = false;
    isDragging = false;
    dragEndTime = /* @__PURE__ */ new Date();
  }
  function closeDrawer(fromWithin) {
    cancelDrag();
    opts.onClose?.current();
    if (!fromWithin) {
      handleOpenChange(false);
      opts.open.current = false;
    }
    window.setTimeout(
      () => {
        if (opts.snapPoints.current && opts.snapPoints.current.length > 0) {
          opts.activeSnapPoint.current = opts.snapPoints.current[0];
        }
      },
      TRANSITIONS.DURATION * 1e3
    );
  }
  function resetDrawer() {
    if (!drawerNode) return;
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    const currentSwipeAmount = getTranslate(drawerNode, opts.direction.current);
    set(drawerNode, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
    });
    set(overlayNode, {
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      opacity: "1"
    });
    if (opts.shouldScaleBackground.current && currentSwipeAmount && currentSwipeAmount > 0 && opts.open.current) {
      set(
        wrapper,
        {
          borderRadius: `${BORDER_RADIUS}px`,
          overflow: "hidden",
          ...isVertical(opts.direction.current) ? {
            transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
            transformOrigin: "top"
          } : {
            transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
            transformOrigin: "left"
          },
          transitionProperty: "transform, border-radius",
          transitionDuration: `${TRANSITIONS.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
        },
        true
      );
    }
  }
  function onRelease(event) {
    isReleasing = true;
    handleRelease(event);
    afterTick(() => {
      isReleasing = false;
    });
  }
  function handleRelease(event) {
    if (!isDragging || !drawerNode) return;
    drawerNode.classList.remove(DRAG_CLASS);
    isAllowedToDrag = false;
    isDragging = false;
    dragEndTime = /* @__PURE__ */ new Date();
    const swipeAmount = getTranslate(drawerNode, opts.direction.current);
    if (!event || event.target && !shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) {
      return;
    }
    if (dragStartTime === null) return;
    const timeTaken = dragEndTime.getTime() - dragStartTime.getTime();
    const distMoved = pointerStart - (isVertical(opts.direction.current) ? event.pageY : event.pageX);
    const velocity = Math.abs(distMoved) / timeTaken;
    if (velocity > 0.05) {
      justReleased = true;
      setTimeout(
        () => {
          justReleased = false;
        },
        200
      );
    }
    if (opts.snapPoints.current) {
      const directionMultiplier = opts.direction.current === "bottom" || opts.direction.current === "right" ? 1 : -1;
      snapPointsState.onRelease({
        draggedDistance: distMoved * directionMultiplier,
        closeDrawer,
        velocity,
        dismissible: opts.dismissible.current
      });
      opts.onRelease.current?.(event, true);
      return;
    }
    if (opts.direction.current === "bottom" || opts.direction.current === "right" ? distMoved > 0 : distMoved < 0) {
      resetDrawer();
      opts.onRelease.current?.(event, true);
      return;
    }
    if (velocity > VELOCITY_THRESHOLD) {
      closeDrawer();
      opts.onRelease.current?.(event, false);
      return;
    }
    const visibleDrawerHeight = Math.min(drawerNode.getBoundingClientRect().height ?? 0, window.innerHeight);
    const visibleDrawerWidth = Math.min(drawerNode.getBoundingClientRect().width ?? 0, window.innerWidth);
    const isHorizontalSwipe = opts.direction.current === "left" || opts.direction.current === "right";
    if (Math.abs(swipeAmount) >= (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) * opts.closeThreshold.current) {
      closeDrawer();
      opts.onRelease.current?.(event, false);
      return;
    }
    opts.onRelease.current?.(event, true);
    resetDrawer();
  }
  watch(() => opts.open.current, () => {
    if (opts.open.current) {
      set(document.documentElement, { scrollBehavior: "auto" });
      openTime = /* @__PURE__ */ new Date();
    }
    return () => {
      reset(document.documentElement, "scrollBehavior");
    };
  });
  function onNestedOpenChange(o) {
    const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
    const initialTranslate = o ? -NESTED_DISPLACEMENT : 0;
    if (nestedOpenChangeTimer) {
      window.clearTimeout(nestedOpenChangeTimer);
    }
    set(drawerNode, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: isVertical(opts.direction.current) ? `scale(${scale}) translate3d(0, ${initialTranslate}px, 0)` : `scale(${scale}) translate3d(${initialTranslate}px, 0, 0)`
    });
    if (!o && drawerNode) {
      nestedOpenChangeTimer = window.setTimeout(
        () => {
          const translateValue = getTranslate(drawerNode, opts.direction.current);
          set(drawerNode, {
            transition: "none",
            transform: isVertical(opts.direction.current) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
          });
        },
        500
      );
    }
  }
  function onNestedDrag(_event, percentageDragged) {
    if (percentageDragged < 0) return;
    const initialScale = (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth;
    const newScale = initialScale + percentageDragged * (1 - initialScale);
    const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT;
    set(drawerNode, {
      transform: isVertical(opts.direction.current) ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)` : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
      transition: "none"
    });
  }
  function onNestedRelease(_event, o) {
    const dim = isVertical(opts.direction.current) ? window.innerHeight : window.innerWidth;
    const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
    const translate = o ? -NESTED_DISPLACEMENT : 0;
    if (o) {
      set(drawerNode, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        transform: isVertical(opts.direction.current) ? `scale(${scale}) translate3d(0, ${translate}px, 0)` : `scale(${scale}) translate3d(${translate}px, 0, 0)`
      });
    }
  }
  let bodyStyles;
  function handleOpenChange(o) {
    opts.onOpenChange.current?.(o);
    if (o && !opts.nested.current) {
      bodyStyles = document.body.style.cssText;
    } else if (!o && !opts.nested.current) {
      afterSleep(TRANSITIONS.DURATION * 1e3, () => {
        document.body.style.cssText = bodyStyles;
      });
    }
    if (!o && !opts.nested.current) {
      restorePositionSetting();
    }
    setTimeout(
      () => {
        opts.onAnimationEnd.current?.(o);
      },
      TRANSITIONS.DURATION * 1e3
    );
    if (o && !opts.modal.current) {
      if (typeof window !== "undefined") {
        window.requestAnimationFrame(() => {
          document.body.style.pointerEvents = "auto";
        });
      }
    }
    if (!o) {
      document.body.style.pointerEvents = "auto";
    }
  }
  watch(() => opts.modal.current, () => {
    if (!opts.modal.current) {
      window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      });
    }
  });
  function setOverlayNode(node) {
    overlayNode = node;
  }
  function setDrawerNode(node) {
    drawerNode = node;
  }
  return DrawerContext.set({
    ...opts,
    keyboardIsOpen,
    closeDrawer,
    setDrawerNode,
    setOverlayNode,
    onDrag,
    onNestedDrag,
    onNestedOpenChange,
    onNestedRelease,
    onRelease,
    onPress,
    onDialogOpenChange,
    get shouldAnimate() {
      return shouldAnimate;
    },
    get isDragging() {
      return isDragging;
    },
    get overlayNode() {
      return overlayNode;
    },
    get drawerNode() {
      return drawerNode;
    },
    get snapPointsOffset() {
      return snapPointsState.snapPointsOffset;
    },
    get shouldFade() {
      return snapPointsState.shouldFade;
    },
    restorePositionSetting,
    handleOpenChange
  });
}
function Drawer$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      onOpenChange = noop,
      onDrag = noop,
      onRelease = noop,
      snapPoints,
      shouldScaleBackground = false,
      setBackgroundColorOnScale = true,
      closeThreshold = CLOSE_THRESHOLD,
      scrollLockTimeout = SCROLL_LOCK_TIMEOUT,
      dismissible = true,
      handleOnly = false,
      fadeFromIndex = snapPoints && snapPoints.length - 1,
      activeSnapPoint = null,
      onActiveSnapPointChange = noop,
      fixed = false,
      modal = true,
      onClose = noop,
      nested = false,
      noBodyStyles = false,
      direction = "bottom",
      snapToSequentialPoint = false,
      preventScrollRestoration = false,
      repositionInputs = true,
      onAnimationEnd = noop,
      container = null,
      autoFocus = false,
      disablePreventScroll = true,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = useDrawerRoot({
      open: box.with(() => open, (o) => {
        open = o;
        rootState.handleOpenChange(o);
      }),
      closeThreshold: box.with(() => closeThreshold),
      scrollLockTimeout: box.with(() => scrollLockTimeout),
      snapPoints: box.with(() => snapPoints),
      fadeFromIndex: box.with(() => fadeFromIndex),
      nested: box.with(() => nested),
      shouldScaleBackground: box.with(() => shouldScaleBackground),
      activeSnapPoint: box.with(() => activeSnapPoint, (v) => {
        activeSnapPoint = v;
        onActiveSnapPointChange(v);
      }),
      onRelease: box.with(() => onRelease),
      onDrag: box.with(() => onDrag),
      onClose: box.with(() => onClose),
      dismissible: box.with(() => dismissible),
      direction: box.with(() => direction),
      fixed: box.with(() => fixed),
      modal: box.with(() => modal),
      handleOnly: box.with(() => handleOnly),
      noBodyStyles: box.with(() => noBodyStyles),
      preventScrollRestoration: box.with(() => preventScrollRestoration),
      setBackgroundColorOnScale: box.with(() => setBackgroundColorOnScale),
      repositionInputs: box.with(() => repositionInputs),
      autoFocus: box.with(() => autoFocus),
      snapToSequentialPoint: box.with(() => snapToSequentialPoint),
      container: box.with(() => container),
      disablePreventScroll: box.with(() => disablePreventScroll),
      onOpenChange: box.with(() => onOpenChange),
      onAnimationEnd: box.with(() => onAnimationEnd)
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      var bind_get = () => rootState.open.current;
      var bind_set = (o) => {
        rootState.onDialogOpenChange(o);
      };
      $$renderer3.push(`<!---->`);
      Dialog.Root($$renderer3, spread_props([
        {
          get open() {
            return bind_get();
          },
          set open($$value) {
            bind_set($$value);
          }
        },
        restProps
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open, activeSnapPoint });
  });
}
globalThis.vaulIdCounter ??= { current: 0 };
function useId(prefix = "vaul-svelte") {
  globalThis.vaulIdCounter.current++;
  return `${prefix}-${globalThis.vaulIdCounter.current}`;
}
function useScaleBackground() {
  const ctx = DrawerContext.get();
  let timeoutId = null;
  const initialBackgroundColor = typeof document !== "undefined" ? document.body.style.backgroundColor : "";
  function getScale() {
    return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
  }
  watch(
    [
      () => ctx.open.current,
      () => ctx.shouldScaleBackground.current,
      () => ctx.setBackgroundColorOnScale.current
    ],
    () => {
      if (ctx.open.current && ctx.shouldScaleBackground.current) {
        if (timeoutId) clearTimeout(timeoutId);
        const wrapper = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[data-vaul-drawer-wrapper]");
        if (!wrapper) return;
        chain$1(
          ctx.setBackgroundColorOnScale.current && !ctx.noBodyStyles.current ? assignStyle(document.body, { background: "black" }) : noop,
          assignStyle(wrapper, {
            transformOrigin: isVertical(ctx.direction.current) ? "top" : "left",
            transitionProperty: "transform, border-radius",
            transitionDuration: `${TRANSITIONS.DURATION}s`,
            transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
          })
        );
        const wrapperStylesCleanup = assignStyle(wrapper, {
          borderRadius: `${BORDER_RADIUS}px`,
          overflow: "hidden",
          ...isVertical(ctx.direction.current) ? {
            transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
          } : {
            transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
          }
        });
        return () => {
          wrapperStylesCleanup();
          timeoutId = window.setTimeout(
            () => {
              if (initialBackgroundColor) {
                document.body.style.background = initialBackgroundColor;
              } else {
                document.body.style.removeProperty("background");
              }
            },
            TRANSITIONS.DURATION * 1e3
          );
        };
      }
    }
  );
}
function useDrawerContent(opts) {
  const ctx = DrawerContext.get();
  let mounted = false;
  useRefById({
    id: opts.id,
    ref: opts.ref,
    deps: () => [mounted, ctx.open.current],
    onRefChange: (node) => {
      if (!mounted) {
        ctx.setDrawerNode(null);
      } else {
        ctx.setDrawerNode(node);
      }
    }
  });
  let delayedSnapPoints = false;
  let pointerStart = null;
  let lastKnownPointerEvent = null;
  let wasBeyondThePoint = false;
  const hasSnapPoints = ctx.snapPoints.current && ctx.snapPoints.current.length > 0;
  useScaleBackground();
  function isDeltaInDirection(delta, direction, threshold = 0) {
    if (wasBeyondThePoint) return true;
    const deltaY = Math.abs(delta.y);
    const deltaX = Math.abs(delta.x);
    const isDeltaX = deltaX > deltaY;
    const dFactor = ["bottom", "right"].includes(direction) ? 1 : -1;
    if (direction === "left" || direction === "right") {
      const isReverseDirection = delta.x * dFactor < 0;
      if (!isReverseDirection && deltaX >= 0 && deltaX <= threshold) {
        return isDeltaX;
      }
    } else {
      const isReverseDirection = delta.y * dFactor < 0;
      if (!isReverseDirection && deltaY >= 0 && deltaY <= threshold) {
        return !isDeltaX;
      }
    }
    wasBeyondThePoint = true;
    return true;
  }
  watch([() => hasSnapPoints, () => ctx.open.current], () => {
    if (hasSnapPoints && ctx.open.current) {
      window.requestAnimationFrame(() => {
        delayedSnapPoints = true;
      });
    } else {
      delayedSnapPoints = false;
    }
  });
  function handleOnPointerUp(e) {
    pointerStart = null;
    wasBeyondThePoint = false;
    ctx.onRelease(e);
  }
  function onpointerdown(e) {
    if (ctx.handleOnly.current) return;
    opts.onpointerdown.current?.(e);
    pointerStart = { x: e.pageX, y: e.pageY };
    ctx.onPress(e);
  }
  function onOpenAutoFocus(e) {
    opts.onOpenAutoFocus.current?.(e);
    if (!ctx.autoFocus.current) {
      e.preventDefault();
    }
  }
  function onInteractOutside(e) {
    opts.onInteractOutside.current?.(e);
    if (!ctx.modal.current || e.defaultPrevented) {
      e.preventDefault();
      return;
    }
    if (ctx.keyboardIsOpen.current) {
      ctx.keyboardIsOpen.current = false;
    }
  }
  function onFocusOutside(e) {
    if (!ctx.modal.current) {
      e.preventDefault();
      return;
    }
  }
  function onpointermove(e) {
    lastKnownPointerEvent = e;
    if (ctx.handleOnly.current) return;
    opts.onpointermove.current?.(e);
    if (!pointerStart) return;
    const yPosition = e.pageY - pointerStart.y;
    const xPosition = e.pageX - pointerStart.x;
    const swipeStartThreshold = e.pointerType === "touch" ? 10 : 2;
    const delta = { x: xPosition, y: yPosition };
    const isAllowedToSwipe = isDeltaInDirection(delta, ctx.direction.current, swipeStartThreshold);
    if (isAllowedToSwipe) {
      ctx.onDrag(e);
    } else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
      pointerStart = null;
    }
  }
  function onpointerup(e) {
    opts.onpointerup.current?.(e);
    pointerStart = null;
    wasBeyondThePoint = false;
    ctx.onRelease(e);
  }
  function onpointerout(e) {
    opts.onpointerout.current?.(e);
    handleOnPointerUp(lastKnownPointerEvent);
  }
  function oncontextmenu(e) {
    opts.oncontextmenu.current?.(e);
    if (lastKnownPointerEvent) {
      handleOnPointerUp(lastKnownPointerEvent);
    }
  }
  const props = {
    id: opts.id.current,
    "data-vaul-drawer-direction": ctx.direction.current,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": delayedSnapPoints ? "true" : "false",
    "data-vaul-snap-points": ctx.open.current && hasSnapPoints ? "true" : "false",
    "data-vaul-custom-container": ctx.container.current ? "true" : "false",
    "data-vaul-animate": ctx.shouldAnimate ? "true" : "false",
    onpointerdown,
    onOpenAutoFocus,
    onInteractOutside,
    onFocusOutside,
    onpointerup,
    onpointermove,
    onpointerout,
    oncontextmenu,
    preventScroll: ctx.modal.current
  };
  return {
    get props() {
      return props;
    },
    ctx,
    setMounted: (value) => {
      mounted = value;
    }
  };
}
function Mounted($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { onMounted } = $$props;
  });
}
function Drawer_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      onOpenAutoFocus = noop,
      onInteractOutside = noop,
      onFocusOutside = noop,
      oncontextmenu = noop,
      onpointerdown = noop,
      onpointerup = noop,
      onpointerout = noop,
      onpointermove = noop,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = useDrawerContent({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v),
      oncontextmenu: box.with(() => oncontextmenu ?? noop),
      onInteractOutside: box.with(() => onInteractOutside),
      onpointerdown: box.with(() => onpointerdown ?? noop),
      onpointermove: box.with(() => onpointermove ?? noop),
      onpointerout: box.with(() => onpointerout ?? noop),
      onpointerup: box.with(() => onpointerup ?? noop),
      onOpenAutoFocus: box.with(() => onOpenAutoFocus),
      onFocusOutside: box.with(() => onFocusOutside)
    });
    const snapPointsOffset = contentState.ctx.snapPointsOffset;
    const styleProp = snapPointsOffset && snapPointsOffset.length > 0 ? {
      "--snap-point-height": `${snapPointsOffset[contentState.ctx.activeSnapPointIndex ?? 0]}px`
    } : {};
    const mergedProps = mergeProps(restProps, contentState.props, { style: styleProp });
    $$renderer2.push(`<!---->`);
    Dialog.Content($$renderer2, spread_props([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mergedProps,
      {
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!----> `);
          Mounted($$renderer3, { onMounted: contentState.setMounted });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
    $$renderer2.push(`<!---->`);
    bind_props($$props, { ref });
  });
}
function useDrawerOverlay(opts) {
  const ctx = DrawerContext.get();
  let mounted = false;
  useRefById({
    id: opts.id,
    ref: opts.ref,
    deps: () => mounted,
    onRefChange: (node) => {
      if (!mounted) {
        ctx.setOverlayNode(null);
      } else {
        ctx.setOverlayNode(node);
      }
    }
  });
  const hasSnapPoints = ctx.snapPoints.current && ctx.snapPoints.current.length > 0;
  const shouldRender = ctx.modal.current;
  const props = {
    id: opts.id.current,
    onmouseup: ctx.onRelease,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": ctx.open.current && hasSnapPoints ? "true" : "false",
    "data-vaul-snap-points-overlay": ctx.open.current && ctx.shouldFade ? "true" : "false",
    "data-vaul-animate": ctx.shouldAnimate ? "true" : "false"
  };
  return {
    get props() {
      return props;
    },
    get shouldRender() {
      return shouldRender;
    },
    setMounted: (value) => {
      mounted = value;
    }
  };
}
function Drawer_overlay$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id = useId(),
      ref = null,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const overlayState = useDrawerOverlay({
      id: box.with(() => id),
      ref: box.with(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, overlayState.props);
    if (overlayState.shouldRender) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      Dialog.Overlay($$renderer2, spread_props([
        mergedProps,
        {
          children: ($$renderer3) => {
            Mounted($$renderer3, { onMounted: overlayState.setMounted });
            $$renderer3.push(`<!----> `);
            children?.($$renderer3);
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        }
      ]));
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Drawer_portal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ctx = DrawerContext.get();
    let {
      to = ctx.container.current ?? void 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<!---->`);
    Dialog.Portal($$renderer2, spread_props([{ to }, restProps]));
    $$renderer2.push(`<!---->`);
  });
}
const Trigger = Dialog.Trigger;
Dialog.Title;
Dialog.Description;
const Close = Dialog.Close;
function Drawer_close($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ref = null, $$slots, $$events, ...restProps } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Close($$renderer3, spread_props([
        { "data-slot": "drawer-close" },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Drawer_overlay($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Drawer_overlay$1($$renderer3, spread_props([
        {
          "data-slot": "drawer-overlay",
          class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
        },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Drawer_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      portalProps,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Drawer_portal($$renderer3, spread_props([
        portalProps,
        {
          children: ($$renderer4) => {
            Drawer_overlay($$renderer4, {});
            $$renderer4.push(`<!----> <!---->`);
            Drawer_content$1($$renderer4, spread_props([
              {
                "data-slot": "drawer-content",
                class: cn("group/drawer-content bg-background fixed z-50 flex h-auto flex-col", "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b", "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t", "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm", "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm", className)
              },
              restProps,
              {
                get ref() {
                  return ref;
                },
                set ref($$value) {
                  ref = $$value;
                  $$settled = false;
                },
                children: ($$renderer5) => {
                  $$renderer5.push(`<div class="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block"></div> `);
                  children?.($$renderer5);
                  $$renderer5.push(`<!---->`);
                },
                $$slots: { default: true }
              }
            ]));
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Drawer_footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      "data-slot": "drawer-footer",
      class: clsx$1(cn("mt-auto flex flex-col gap-2 p-4", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function Drawer_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ref = null, $$slots, $$events, ...restProps } = $$props;
    let timer = null;
    function handlePointerDown() {
      timer = setTimeout(
        () => {
          ref?.click?.();
          selectionFeedback();
        },
        500
      );
    }
    function handlePointerUp() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Trigger($$renderer3, spread_props([
        { "data-slot": "drawer-trigger" },
        restProps,
        {
          onpointerdown: handlePointerDown,
          onpointerup: handlePointerUp,
          onpointerleave: handlePointerUp,
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Drawer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      shouldScaleBackground = true,
      open = false,
      activeSnapPoint = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Drawer$1($$renderer3, spread_props([
        { shouldScaleBackground },
        restProps,
        {
          get open() {
            return open;
          },
          set open($$value) {
            open = $$value;
            $$settled = false;
          },
          get activeSnapPoint() {
            return activeSnapPoint;
          },
          set activeSnapPoint($$value) {
            activeSnapPoint = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open, activeSnapPoint });
  });
}
function ModuleCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { module } = $$props;
    let isEditing = false;
    let editColor = module.color;
    let enabledLabels = [];
    let isLabelsLoading = false;
    let addLabelSelection = "";
    const availableLabels = moduleStore.getLabels(module.moduleId);
    async function loadLabels() {
      isLabelsLoading = true;
      const rows = await moduleStore.getEnabledLabels(module.moduleId);
      const labelDefs = moduleStore.getLabels(module.moduleId);
      const byId = new Map(labelDefs.map((l) => [l.id, l]));
      enabledLabels = rows.map((r) => {
        const def = byId.get(r.linkId);
        return {
          userLinkId: r.id,
          linkId: r.linkId,
          name: def?.name ?? r.linkId
        };
      });
      isLabelsLoading = false;
    }
    async function removeLabel(userLinkId) {
      await moduleStore.removeLink(userLinkId);
      await loadLabels();
      await moduleStore.loadModuleCards();
    }
    async function save2() {
      await moduleStore.editModuleCard(module.moduleId, { color: editColor });
      if (!isMobile) isEditing = false;
    }
    function cancelEdit() {
      if (!isMobile) isEditing = false;
      editColor = module.color;
    }
    function enterEdit() {
      isEditing = true;
      loadLabels();
    }
    const actions = [
      { name: "Edit", variant: "outline", action: enterEdit },
      {
        name: "Remove",
        variant: "destructive",
        action: () => moduleStore.removeModuleCard(module.moduleId)
      }
    ];
    function card($$renderer3) {
      $$renderer3.push(`<a${attr("href", `/module/${module.moduleId}`)} draggable="false"><div class="relative select-none"><div class="absolute h-full w-0.35rem opacity-30 blur-md"${attr_style(`background-color: ${module.color}; shadow: 0 0 12px 4px ${module.color};`)}></div> <!---->`);
      Card($$renderer3, {
        class: "relative z-10 gap-1 b-l-0.35em b-background rounded-md bg-secondary px-3 py-3 pl-2",
        style: `border-left-color: ${module.color};`,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Card_header($$renderer4, {
            class: "px-0",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Card_title($$renderer5, {
                class: "w-max rounded-lg bg-background px-3 py-2",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->${escape_html(module.name)}`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Card_content($$renderer4, {
            class: "px-0",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="pointer-events-none flex flex-col gap-2"><!--[-->`);
              const each_array = ensure_array_like(module.labels);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let label = each_array[$$index];
                if (label.component) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<!---->`);
                  label.component($$renderer5, spread_props([label.parameters ?? {}]));
                  $$renderer5.push(`<!---->`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]-->`);
              }
              $$renderer5.push(`<!--]--></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></a>`);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (isMobile) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!---->`);
        Drawer($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Drawer_trigger($$renderer4, {
              children: ($$renderer5) => {
                card($$renderer5);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <!---->`);
            Drawer_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Drawer_footer($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<div class="w-full flex flex-col gap-8"><div class="px-2">`);
                    card($$renderer6);
                    $$renderer6.push(`<!----></div> <div class="flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                    Label($$renderer6, {
                      for: "color-mobile",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("color", "Color"))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Input($$renderer6, {
                      id: "color-mobile",
                      type: "color",
                      get value() {
                        return editColor;
                      },
                      set value($$value) {
                        editColor = $$value;
                        $$settled = false;
                      }
                    });
                    $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2"><div class="text-sm font-medium">${escape_html(t("labels", "Labels"))}</div> `);
                    if (isLabelsLoading) {
                      $$renderer6.push("<!--[-->");
                      $$renderer6.push(`<div class="text-xs text-muted">${escape_html(t("labelsLoading", "Loading labels..."))}</div>`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push(`<div class="flex flex-col gap-2">`);
                      if (enabledLabels.length === 0) {
                        $$renderer6.push("<!--[-->");
                        $$renderer6.push(`<div class="text-xs text-muted">${escape_html(t("noLabelsAdded", "No labels added yet."))}</div>`);
                      } else {
                        $$renderer6.push("<!--[!-->");
                      }
                      $$renderer6.push(`<!--]--> <!--[-->`);
                      const each_array_1 = ensure_array_like(enabledLabels);
                      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                        let l = each_array_1[$$index_1];
                        $$renderer6.push(`<div class="flex items-center justify-between b b-border rounded-md px-2 py-1 text-sm"><span>${escape_html(l.name)}</span> `);
                        Button($$renderer6, {
                          "aria-label": t("module.labels.remove.aria", "Remove label"),
                          variant: "outline",
                          class: "size-7 p-0",
                          onclick: () => removeLabel(l.userLinkId),
                          children: ($$renderer7) => {
                            $$renderer7.push(`<div class="i-fluent:delete-16-regular size-4"></div>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!----></div>`);
                      }
                      $$renderer6.push(`<!--]--> <!---->`);
                      Root$1($$renderer6, {
                        type: "single",
                        get value() {
                          return addLabelSelection;
                        },
                        set value($$value) {
                          addLabelSelection = $$value;
                          $$settled = false;
                        },
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->`);
                          Select_trigger($$renderer7, {
                            class: "w-full",
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(addLabelSelection ? t("module.labels.addAnother", "Add another label...") : t("module.labels.add", "Add label..."))}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!----> <!---->`);
                          Select_content($$renderer7, {
                            children: ($$renderer8) => {
                              if (availableLabels.length === 0) {
                                $$renderer8.push("<!--[-->");
                                $$renderer8.push(`<!---->`);
                                Select_item($$renderer8, {
                                  value: "",
                                  disabled: true,
                                  children: ($$renderer9) => {
                                    $$renderer9.push(`<!---->${escape_html(t("noLabels", "No labels available"))}`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer8.push(`<!---->`);
                              } else {
                                $$renderer8.push("<!--[!-->");
                                $$renderer8.push(`<!--[-->`);
                                const each_array_2 = ensure_array_like(availableLabels);
                                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                                  let opt = each_array_2[$$index_2];
                                  $$renderer8.push(`<!---->`);
                                  Select_item($$renderer8, {
                                    value: opt.id,
                                    children: ($$renderer9) => {
                                      $$renderer9.push(`<!---->${escape_html(opt.name)}`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer8.push(`<!---->`);
                                }
                                $$renderer8.push(`<!--]-->`);
                              }
                              $$renderer8.push(`<!--]-->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!---->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----></div>`);
                    }
                    $$renderer6.push(`<!--]--></div> <div class="mt-2 flex flex-col gap-2"><!---->`);
                    Drawer_close($$renderer6, {
                      class: "w-full",
                      children: ($$renderer7) => {
                        Button($$renderer7, {
                          class: "w-full",
                          onclick: save2,
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(t("save", "Save"))}`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Drawer_close($$renderer6, {
                      class: "w-full",
                      children: ($$renderer7) => {
                        Button($$renderer7, {
                          variant: "destructive",
                          class: "w-full",
                          onclick: () => moduleStore.removeModuleCard(module.moduleId),
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(t("remove", "Remove"))}`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----></div></div></div>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<!---->`);
        Root($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Context_menu_trigger($$renderer4, {
              children: ($$renderer5) => {
                card($$renderer5);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <!---->`);
            Context_menu_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!--[-->`);
                const each_array_3 = ensure_array_like(actions);
                for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                  let { name, variant, action } = each_array_3[$$index_3];
                  $$renderer5.push(`<!---->`);
                  Context_menu_item($$renderer5, {
                    variant: variant === "destructive" ? "destructive" : void 0,
                    onclick: action,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(name)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                }
                $$renderer5.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      }
      $$renderer3.push(`<!--]--> `);
      if (!isMobile && isEditing) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!---->`);
        Root$2($$renderer3, {
          open: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_header($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    Dialog_title($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("module.edit", "Edit Module Card"))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                Label($$renderer5, {
                  for: "color-desktop",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("color", "Color"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "color-desktop",
                  type: "color",
                  get value() {
                    return editColor;
                  },
                  set value($$value) {
                    editColor = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="flex flex-col gap-2"><div class="text-sm font-medium">${escape_html(t("labels", "Labels"))}</div> `);
                if (isLabelsLoading) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="text-xs text-muted">${escape_html(t("labelsLoading", "Loading labels..."))}</div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  $$renderer5.push(`<div class="flex flex-col gap-2">`);
                  if (enabledLabels.length === 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="text-xs text-muted">${escape_html(t("noLabelsAdded", "No labels added yet."))}</div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> <!--[-->`);
                  const each_array_4 = ensure_array_like(enabledLabels);
                  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
                    let l = each_array_4[$$index_4];
                    $$renderer5.push(`<div class="flex items-center justify-between b b-border rounded-md px-2 py-1 text-sm"><span>${escape_html(l.name)}</span> `);
                    Button($$renderer5, {
                      "aria-label": t("module.labels.remove.aria", "Remove label"),
                      variant: "outline",
                      class: "size-7 p-0",
                      onclick: () => removeLabel(l.userLinkId),
                      children: ($$renderer6) => {
                        $$renderer6.push(`<div class="i-fluent:delete-16-regular size-4"></div>`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----></div>`);
                  }
                  $$renderer5.push(`<!--]--> <!---->`);
                  Root$1($$renderer5, {
                    type: "single",
                    get value() {
                      return addLabelSelection;
                    },
                    set value($$value) {
                      addLabelSelection = $$value;
                      $$settled = false;
                    },
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->`);
                      Select_trigger($$renderer6, {
                        class: "w-full",
                        children: ($$renderer7) => {
                          $$renderer7.push(`<!---->${escape_html(addLabelSelection ? t("module.labels.addAnother", "Add another label...") : t("module.labels.add", "Add label..."))}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!----> <!---->`);
                      Select_content($$renderer6, {
                        children: ($$renderer7) => {
                          if (availableLabels.length === 0) {
                            $$renderer7.push("<!--[-->");
                            $$renderer7.push(`<!---->`);
                            Select_item($$renderer7, {
                              value: "",
                              disabled: true,
                              children: ($$renderer8) => {
                                $$renderer8.push(`<!---->${escape_html(t("noLabels", "No labels available"))}`);
                              },
                              $$slots: { default: true }
                            });
                            $$renderer7.push(`<!---->`);
                          } else {
                            $$renderer7.push("<!--[!-->");
                            $$renderer7.push(`<!--[-->`);
                            const each_array_5 = ensure_array_like(availableLabels);
                            for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
                              let opt = each_array_5[$$index_5];
                              $$renderer7.push(`<!---->`);
                              Select_item($$renderer7, {
                                value: opt.id,
                                children: ($$renderer8) => {
                                  $$renderer8.push(`<!---->${escape_html(opt.name)}`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer7.push(`<!---->`);
                            }
                            $$renderer7.push(`<!--]-->`);
                          }
                          $$renderer7.push(`<!--]-->`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer6.push(`<!---->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----></div>`);
                }
                $$renderer5.push(`<!--]--></div> <div class="mt-2 flex gap-2">`);
                Button($$renderer5, {
                  variant: "outline",
                  onclick: cancelEdit,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("cancel", "Cancel"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  onclick: save2,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("save", "Save"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function Shortcut($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      shortcut,
      class: className = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let isEditing = false;
    let editIcon = shortcut.icon;
    let editColor = shortcut.color;
    async function save2() {
      await moduleStore.editShortcut(shortcut.id, { icon: editIcon, color: editColor });
      isEditing = false;
    }
    function cancelEdit() {
      isEditing = false;
      editIcon = shortcut.icon;
      editColor = shortcut.color;
    }
    const actions = [
      {
        name: t("edit", "Edit"),
        variant: "outline",
        action: () => {
          isEditing = true;
        }
      },
      {
        name: t("remove", "Remove"),
        variant: "destructive",
        action: () => moduleStore.removeLink(shortcut.id)
      }
    ];
    function sc($$renderer3) {
      $$renderer3.push(`<button${attributes(
        {
          "aria-label": t("shortcut.card.aria", "Shortcut"),
          class: `shortcut border border-accent size-15 rounded-2xl p-4 ${className}`,
          style: `--color: ${shortcut.color}`,
          ...restProps
        },
        "svelte-1wxeq4y"
      )}><div${attr_class(`icon size-full ${shortcut.icon}`, "svelte-1wxeq4y")}></div></button>`);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (isMobile) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!---->`);
        Drawer($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Drawer_trigger($$renderer4, {
              children: ($$renderer5) => {
                sc($$renderer5);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <!---->`);
            Drawer_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Drawer_footer($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<div class="w-full flex flex-col gap-6"><div class="flex flex-col gap-4"><div class="flex flex-col gap-2">`);
                    Label($$renderer6, {
                      for: "icon-mobile",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("icon", "Icon"))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Input($$renderer6, {
                      id: "icon-mobile",
                      get value() {
                        return editIcon;
                      },
                      set value($$value) {
                        editIcon = $$value;
                        $$settled = false;
                      }
                    });
                    $$renderer6.push(`<!----></div> <div class="flex flex-col gap-2">`);
                    Label($$renderer6, {
                      for: "color-mobile",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("color", "Color"))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Input($$renderer6, {
                      id: "color-mobile",
                      type: "color",
                      get value() {
                        return editColor;
                      },
                      set value($$value) {
                        editColor = $$value;
                        $$settled = false;
                      }
                    });
                    $$renderer6.push(`<!----></div> <div class="mt-2 flex flex-col gap-2"><!---->`);
                    Drawer_close($$renderer6, {
                      class: "w-full",
                      children: ($$renderer7) => {
                        Button($$renderer7, {
                          class: "w-full",
                          onclick: save2,
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(t("save", "Save"))}`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Drawer_close($$renderer6, {
                      class: "w-full",
                      children: ($$renderer7) => {
                        Button($$renderer7, {
                          variant: "destructive",
                          class: "w-full",
                          onclick: () => moduleStore.removeLink(shortcut.id),
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(t("remove", "Remove"))}`);
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----></div></div></div>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<!---->`);
        Root($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Context_menu_trigger($$renderer4, {
              children: ($$renderer5) => {
                sc($$renderer5);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <!---->`);
            Context_menu_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!--[-->`);
                const each_array = ensure_array_like(actions);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let { name, variant, action } = each_array[$$index];
                  $$renderer5.push(`<!---->`);
                  Context_menu_item($$renderer5, {
                    variant: variant === "destructive" ? "destructive" : void 0,
                    onclick: action,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(name)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                }
                $$renderer5.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      }
      $$renderer3.push(`<!--]--> `);
      if (!isMobile && isEditing) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<!---->`);
        Root$2($$renderer3, {
          open: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_content($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_header($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    Dialog_title($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(t("shortcut.edit", "Edit Shortcut"))}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="flex flex-col gap-2">`);
                Label($$renderer5, {
                  for: "icon-desktop",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("icon", "Icon"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "icon-desktop",
                  get value() {
                    return editIcon;
                  },
                  set value($$value) {
                    editIcon = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "color-desktop",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("color", "Color"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "color-desktop",
                  type: "color",
                  get value() {
                    return editColor;
                  },
                  set value($$value) {
                    editColor = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <div class="mt-2 flex gap-2">`);
                Button($$renderer5, {
                  variant: "outline",
                  onclick: cancelEdit,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("cancel", "Cancel"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  onclick: save2,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("save", "Save"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let addModuleValue = "";
    let addModuleColor = "#FFFFFF";
    const addModuleValueTrigger = moduleStore.modules.find((m) => m.id === addModuleValue)?.name ?? t("home.selectModule", "Select a module");
    function addModule() {
      if (!addModuleValue) return;
      moduleStore.addModuleCard(addModuleValue, addModuleColor);
      addModuleValue = "";
      addModuleColor = "#FFFFFF";
    }
    let addShortcutModule = "";
    let addShortcutLink = "";
    let addShortcutIcon = "";
    let addShortcutColor = "#FFFFFF";
    let addShortcutParameters = {};
    const addShortcutModuleTrigger = moduleStore.modules.find((m) => m.id === addShortcutModule)?.name ?? t("home.selectModule", "Select a module");
    const addShortcutLinkTrigger = moduleStore.modules.find((m) => m.id === addShortcutModule)?.links.find((l) => l.id === addShortcutLink)?.name ?? t("home.selectShortcut", "Select a shortcut");
    const addShortcutLinkDefinition = moduleStore.modules.find((m) => m.id === addShortcutModule)?.links.find((l) => l.id === addShortcutLink && l.type === "shortcut") ?? null;
    const addShortcutDescription = addShortcutLinkDefinition?.description ?? "";
    const addShortcutParameterDefinitions = Array.isArray(addShortcutLinkDefinition?.parameters) ? addShortcutLinkDefinition.parameters : [];
    const isAddShortcutReady = Boolean(addShortcutModule && addShortcutLink && addShortcutIcon && addShortcutLinkDefinition);
    function resetShortcutParameters() {
      addShortcutParameters = {};
    }
    function addShortcut() {
      if (!isAddShortcutReady) return;
      moduleStore.addShortcut(addShortcutModule, addShortcutLink, Object.fromEntries(Object.entries(addShortcutParameters).map(([key, value]) => [key, typeof value === "string" ? value.trim() : ""])), addShortcutIcon, addShortcutColor, moduleStore.shortcuts.length);
      addShortcutModule = "";
      addShortcutLink = "";
      addShortcutIcon = "";
      addShortcutColor = "#FFFFFF";
      resetShortcutParameters();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-col gap-0"><div class="flex flex-row items-center justify-between px-5 pb-3"><h1 class="text-2xl font-bold">${escape_html(t("home.heading", "Organized"))}</h1> <a href="/settings"${attr("aria-label", t("home.settings.aria", "Settings"))} draggable="false"><div class="i-fluent:settings-16-filled size-7"></div></a></div> <div class="mx-2 my-2 flex justify-center"><div class="grid grid-cols-[repeat(auto-fill,5rem)] w-full justify-center justify-items-center gap-row-5"><!--[-->`);
      const each_array = ensure_array_like(moduleStore.shortcuts);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let shortcut = each_array[$$index];
        Shortcut($$renderer3, { shortcut, onclick: () => shortcut.call(shortcut.parameters) });
      }
      $$renderer3.push(`<!--]--> <!---->`);
      Root$2($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_trigger($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<button class="size-15 b-3 rounded-2xl b-dashed p-3"${attr("aria-label", t("home.shortcuts.add.aria", "Add new shortcut"))}><div class="i-fluent:add-12-filled size-6 color-muted"></div></button>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Dialog_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("home.shortcuts.add.title", "Add Shortcut"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="w-full flex flex-col gap-4"><!---->`);
              Root$1($$renderer5, {
                type: "single",
                get value() {
                  return addShortcutModule;
                },
                set value($$value) {
                  addShortcutModule = $$value;
                  $$settled = false;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Select_trigger($$renderer6, {
                    class: "w-full",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(addShortcutModuleTrigger)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Select_content($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!--[-->`);
                      const each_array_1 = ensure_array_like(moduleStore.moduleCards);
                      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                        let module = each_array_1[$$index_1];
                        $$renderer7.push(`<!---->`);
                        Select_item($$renderer7, {
                          value: module.moduleId,
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(module.name)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              if (addShortcutModule) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<!---->`);
                Root$1($$renderer5, {
                  type: "single",
                  get value() {
                    return addShortcutLink;
                  },
                  set value($$value) {
                    addShortcutLink = $$value;
                    $$settled = false;
                  },
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    Select_trigger($$renderer6, {
                      class: "w-full",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(addShortcutLinkTrigger)}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Select_content($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!--[-->`);
                        const each_array_2 = ensure_array_like(moduleStore.getActions(addShortcutModule));
                        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                          let link = each_array_2[$$index_2];
                          $$renderer7.push(`<!---->`);
                          Select_item($$renderer7, {
                            value: link.id,
                            children: ($$renderer8) => {
                              $$renderer8.push(`<!---->${escape_html(link.name)}`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer7.push(`<!---->`);
                        }
                        $$renderer7.push(`<!--]-->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                if (addShortcutLink) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<!---->`);
                  Dialog_description($$renderer5, {
                    class: "text-muted",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(addShortcutDescription)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  if (addShortcutParameterDefinitions.length > 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="flex flex-col gap-3"><!--[-->`);
                    const each_array_3 = ensure_array_like(addShortcutParameterDefinitions);
                    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                      let parameter = each_array_3[$$index_3];
                      $$renderer5.push(`<div class="flex flex-col gap-2">`);
                      Label($$renderer5, {
                        for: `shortcut-param-${parameter.id}`,
                        children: ($$renderer6) => {
                          $$renderer6.push(`<!---->${escape_html(parameter.name)}`);
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push(`<!----> `);
                      Input($$renderer5, {
                        id: `shortcut-param-${parameter.id}`,
                        type: parameter.type === "number" ? "number" : "text",
                        value: addShortcutParameters[parameter.id] ?? "",
                        placeholder: parameter.defaultValue != null ? String(parameter.defaultValue) : ""
                      });
                      $$renderer5.push(`<!----></div>`);
                    }
                    $$renderer5.push(`<!--]--></div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> `);
                  Label($$renderer5, {
                    for: "icon",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(t("home.shortcuts.add.iconLabel", "Icon"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    type: "text",
                    id: "icon",
                    placeholder: "i-fluent:document-16-filled",
                    get value() {
                      return addShortcutIcon;
                    },
                    set value($$value) {
                      addShortcutIcon = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----> `);
                  Label($$renderer5, {
                    for: "color",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->${escape_html(t("home.shortcuts.add.colorLabel", "Color"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    type: "color",
                    id: "color",
                    get value() {
                      return addShortcutColor;
                    },
                    set value($$value) {
                      addShortcutColor = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!---->`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]-->`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <!---->`);
              Dialog_close($$renderer5, {
                disabled: !isAddShortcutReady,
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    onclick: addShortcut,
                    class: "w-full",
                    disabled: !isAddShortcutReady,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("home.shortcuts.add.cta", "Add Shortcut"))}`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="mx-4 mt-4 flex flex-col gap-4"><!--[-->`);
      $$renderer3.async_block([], async ($$renderer4) => {
        const each_array_4 = ensure_array_like((await save(moduleStore.moduleCards))());
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let module = each_array_4[$$index_4];
          ModuleCard($$renderer4, { module });
        }
      });
      $$renderer3.push(`<!--]--> <!---->`);
      Root$2($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_trigger($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="flex flex-row items-center gap-3 b-3 rounded-md b-dashed p-3 text-muted"><div class="i-fluent:add-12-filled size-6"></div> <div>${escape_html(t("home.modules.add.trigger", "Add Module"))}</div></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Dialog_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("home.modules.add.title", "Add Module"))}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="w-full flex flex-col gap-4"><!---->`);
              Root$1($$renderer5, {
                type: "single",
                get value() {
                  return addModuleValue;
                },
                set value($$value) {
                  addModuleValue = $$value;
                  $$settled = false;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Select_trigger($$renderer6, {
                    class: "w-full",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(addModuleValueTrigger)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Select_content($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!--[-->`);
                      const each_array_5 = ensure_array_like(moduleStore.modules.filter((m) => !moduleStore.moduleCards.find((mc) => mc.moduleId === m.id)));
                      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
                        let module = each_array_5[$$index_5];
                        $$renderer7.push(`<!---->`);
                        Select_item($$renderer7, {
                          value: module.id,
                          children: ($$renderer8) => {
                            $$renderer8.push(`<!---->${escape_html(module.name)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer7.push(`<!---->`);
                      }
                      $$renderer7.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              if (addModuleValue) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<!---->`);
                Dialog_description($$renderer5, {
                  class: "text-muted",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(moduleStore.modules.find((m) => m.id === addModuleValue)?.description)}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Label($$renderer5, {
                  for: "color",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->${escape_html(t("color", "Color"))}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "color",
                  id: "color",
                  get value() {
                    return addModuleColor;
                  },
                  set value($$value) {
                    addModuleColor = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!---->`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <!---->`);
              Dialog_close($$renderer5, {
                disabled: !addModuleValue,
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    onclick: addModule,
                    class: "w-full",
                    disabled: !addModuleValue,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(t("home.modules.add.cta", "Add Module"))}`);
                    },
                    $$slots: { default: true }
                  });
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
