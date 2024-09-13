(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var HTML;

var require = meteorInstall({"node_modules":{"meteor":{"htmljs":{"preamble.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/htmljs/preamble.js                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
module.export({
  HTML: () => HTML
});
let HTMLTags, Tag, Attrs, getTag, ensureTag, isTagEnsured, getSymbolName, knownHTMLElementNames, knownSVGElementNames, knownElementNames, voidElementNames, isKnownElement, isKnownSVGElement, isVoidElement, CharRef, Comment, Raw, isArray, isConstructedObject, isNully, isValidAttributeName, flattenAttributes;
module.link("./html", {
  HTMLTags(v) {
    HTMLTags = v;
  },

  Tag(v) {
    Tag = v;
  },

  Attrs(v) {
    Attrs = v;
  },

  getTag(v) {
    getTag = v;
  },

  ensureTag(v) {
    ensureTag = v;
  },

  isTagEnsured(v) {
    isTagEnsured = v;
  },

  getSymbolName(v) {
    getSymbolName = v;
  },

  knownHTMLElementNames(v) {
    knownHTMLElementNames = v;
  },

  knownSVGElementNames(v) {
    knownSVGElementNames = v;
  },

  knownElementNames(v) {
    knownElementNames = v;
  },

  voidElementNames(v) {
    voidElementNames = v;
  },

  isKnownElement(v) {
    isKnownElement = v;
  },

  isKnownSVGElement(v) {
    isKnownSVGElement = v;
  },

  isVoidElement(v) {
    isVoidElement = v;
  },

  CharRef(v) {
    CharRef = v;
  },

  Comment(v) {
    Comment = v;
  },

  Raw(v) {
    Raw = v;
  },

  isArray(v) {
    isArray = v;
  },

  isConstructedObject(v) {
    isConstructedObject = v;
  },

  isNully(v) {
    isNully = v;
  },

  isValidAttributeName(v) {
    isValidAttributeName = v;
  },

  flattenAttributes(v) {
    flattenAttributes = v;
  }

}, 0);
let Visitor, TransformingVisitor, ToHTMLVisitor, ToTextVisitor, toHTML, TEXTMODE, toText;
module.link("./visitors", {
  Visitor(v) {
    Visitor = v;
  },

  TransformingVisitor(v) {
    TransformingVisitor = v;
  },

  ToHTMLVisitor(v) {
    ToHTMLVisitor = v;
  },

  ToTextVisitor(v) {
    ToTextVisitor = v;
  },

  toHTML(v) {
    toHTML = v;
  },

  TEXTMODE(v) {
    TEXTMODE = v;
  },

  toText(v) {
    toText = v;
  }

}, 1);
const HTML = Object.assign(HTMLTags, {
  Tag,
  Attrs,
  getTag,
  ensureTag,
  isTagEnsured,
  getSymbolName,
  knownHTMLElementNames,
  knownSVGElementNames,
  knownElementNames,
  voidElementNames,
  isKnownElement,
  isKnownSVGElement,
  isVoidElement,
  CharRef,
  Comment,
  Raw,
  isArray,
  isConstructedObject,
  isNully,
  isValidAttributeName,
  flattenAttributes,
  toHTML,
  TEXTMODE,
  toText,
  Visitor,
  TransformingVisitor,
  ToHTMLVisitor,
  ToTextVisitor
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"html.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/htmljs/html.js                                                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
module.export({
  Tag: () => Tag,
  Attrs: () => Attrs,
  HTMLTags: () => HTMLTags,
  getTag: () => getTag,
  ensureTag: () => ensureTag,
  isTagEnsured: () => isTagEnsured,
  getSymbolName: () => getSymbolName,
  knownHTMLElementNames: () => knownHTMLElementNames,
  knownSVGElementNames: () => knownSVGElementNames,
  knownElementNames: () => knownElementNames,
  voidElementNames: () => voidElementNames,
  isKnownElement: () => isKnownElement,
  isKnownSVGElement: () => isKnownSVGElement,
  isVoidElement: () => isVoidElement,
  CharRef: () => CharRef,
  Comment: () => Comment,
  Raw: () => Raw,
  isArray: () => isArray,
  isConstructedObject: () => isConstructedObject,
  isNully: () => isNully,
  isValidAttributeName: () => isValidAttributeName,
  flattenAttributes: () => flattenAttributes
});

const Tag = function () {};

Tag.prototype.tagName = ''; // this will be set per Tag subclass

Tag.prototype.attrs = null;
Tag.prototype.children = Object.freeze ? Object.freeze([]) : [];
Tag.prototype.htmljsType = Tag.htmljsType = ['Tag']; // Given "p" create the function `HTML.P`.

var makeTagConstructor = function (tagName) {
  // Tag is the per-tagName constructor of a HTML.Tag subclass
  var HTMLTag = function () {
    // Work with or without `new`.  If not called with `new`,
    // perform instantiation by recursively calling this constructor.
    // We can't pass varargs, so pass no args.
    var instance = this instanceof Tag ? this : new HTMLTag();
    var i = 0;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var attrs = args.length && args[0];

    if (attrs && typeof attrs === 'object') {
      // Treat vanilla JS object as an attributes dictionary.
      if (!isConstructedObject(attrs)) {
        instance.attrs = attrs;
        i++;
      } else if (attrs instanceof Attrs) {
        var array = attrs.value;

        if (array.length === 1) {
          instance.attrs = array[0];
        } else if (array.length > 1) {
          instance.attrs = array;
        }

        i++;
      }
    } // If no children, don't create an array at all, use the prototype's
    // (frozen, empty) array.  This way we don't create an empty array
    // every time someone creates a tag without `new` and this constructor
    // calls itself with no arguments (above).


    if (i < args.length) instance.children = args.slice(i);
    return instance;
  };

  HTMLTag.prototype = new Tag();
  HTMLTag.prototype.constructor = HTMLTag;
  HTMLTag.prototype.tagName = tagName;
  return HTMLTag;
}; // Not an HTMLjs node, but a wrapper to pass multiple attrs dictionaries
// to a tag (for the purpose of implementing dynamic attributes).


function Attrs() {
  // Work with or without `new`.  If not called with `new`,
  // perform instantiation by recursively calling this constructor.
  // We can't pass varargs, so pass no args.
  var instance = this instanceof Attrs ? this : new Attrs();

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  instance.value = args;
  return instance;
}

const HTMLTags = {};

function getTag(tagName) {
  var symbolName = getSymbolName(tagName);
  if (symbolName === tagName) // all-caps tagName
    throw new Error("Use the lowercase or camelCase form of '" + tagName + "' here");
  if (!HTMLTags[symbolName]) HTMLTags[symbolName] = makeTagConstructor(tagName);
  return HTMLTags[symbolName];
}

function ensureTag(tagName) {
  getTag(tagName); // don't return it
}

function isTagEnsured(tagName) {
  return isKnownElement(tagName);
}

function getSymbolName(tagName) {
  // "foo-bar" -> "FOO_BAR"
  return tagName.toUpperCase().replace(/-/g, '_');
}

const knownHTMLElementNames = 'a abbr acronym address applet area article aside audio b base basefont bdi bdo big blockquote body br button canvas caption center cite code col colgroup command data datagrid datalist dd del details dfn dir div dl dt em embed eventsource fieldset figcaption figure font footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins isindex kbd keygen label legend li link main map mark menu meta meter nav noframes noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strike strong style sub summary sup table tbody td textarea tfoot th thead time title tr track tt u ul var video wbr'.split(' ');
const knownSVGElementNames = 'altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform circle clipPath color-profile cursor defs desc ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view vkern'.split(' ');
const knownElementNames = knownHTMLElementNames.concat(knownSVGElementNames);
const voidElementNames = 'area base br col command embed hr img input keygen link meta param source track wbr'.split(' ');
var voidElementSet = new Set(voidElementNames);
var knownElementSet = new Set(knownElementNames);
var knownSVGElementSet = new Set(knownSVGElementNames);

function isKnownElement(tagName) {
  return knownElementSet.has(tagName);
}

function isKnownSVGElement(tagName) {
  return knownSVGElementSet.has(tagName);
}

function isVoidElement(tagName) {
  return voidElementSet.has(tagName);
}

// Ensure tags for all known elements
knownElementNames.forEach(ensureTag);

function CharRef(attrs) {
  if (!(this instanceof CharRef)) // called without `new`
    return new CharRef(attrs);
  if (!(attrs && attrs.html && attrs.str)) throw new Error("HTML.CharRef must be constructed with ({html:..., str:...})");
  this.html = attrs.html;
  this.str = attrs.str;
}

CharRef.prototype.htmljsType = CharRef.htmljsType = ['CharRef'];

function Comment(value) {
  if (!(this instanceof Comment)) // called without `new`
    return new Comment(value);
  if (typeof value !== 'string') throw new Error('HTML.Comment must be constructed with a string');
  this.value = value; // Kill illegal hyphens in comment value (no way to escape them in HTML)

  this.sanitizedValue = value.replace(/^-|--+|-$/g, '');
}

Comment.prototype.htmljsType = Comment.htmljsType = ['Comment'];

function Raw(value) {
  if (!(this instanceof Raw)) // called without `new`
    return new Raw(value);
  if (typeof value !== 'string') throw new Error('HTML.Raw must be constructed with a string');
  this.value = value;
}

Raw.prototype.htmljsType = Raw.htmljsType = ['Raw'];

function isArray(x) {
  return x instanceof Array || Array.isArray(x);
}

function isConstructedObject(x) {
  // Figure out if `x` is "an instance of some class" or just a plain
  // object literal.  It correctly treats an object literal like
  // `{ constructor: ... }` as an object literal.  It won't detect
  // instances of classes that lack a `constructor` property (e.g.
  // if you assign to a prototype when setting up the class as in:
  // `Foo = function () { ... }; Foo.prototype = { ... }`, then
  // `(new Foo).constructor` is `Object`, not `Foo`).
  if (!x || typeof x !== 'object') return false; // Is this a plain object?

  let plain = false;

  if (Object.getPrototypeOf(x) === null) {
    plain = true;
  } else {
    let proto = x;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    plain = Object.getPrototypeOf(x) === proto;
  }

  return !plain && typeof x.constructor === 'function' && x instanceof x.constructor;
}

function isNully(node) {
  if (node == null) // null or undefined
    return true;

  if (isArray(node)) {
    // is it an empty array or an array of all nully items?
    for (var i = 0; i < node.length; i++) if (!isNully(node[i])) return false;

    return true;
  }

  return false;
}

function isValidAttributeName(name) {
  return /^[:_A-Za-z][:_A-Za-z0-9.\-]*/.test(name);
}

function flattenAttributes(attrs) {
  if (!attrs) return attrs;
  var isList = isArray(attrs);
  if (isList && attrs.length === 0) return null;
  var result = {};

  for (var i = 0, N = isList ? attrs.length : 1; i < N; i++) {
    var oneAttrs = isList ? attrs[i] : attrs;
    if (typeof oneAttrs !== 'object' || isConstructedObject(oneAttrs)) throw new Error("Expected plain JS object as attrs, found: " + oneAttrs);

    for (var name in oneAttrs) {
      if (!isValidAttributeName(name)) throw new Error("Illegal HTML attribute name: " + name);
      var value = oneAttrs[name];
      if (!isNully(value)) result[name] = value;
    }
  }

  return result;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"visitors.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/htmljs/visitors.js                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
module.export({
  Visitor: () => Visitor,
  TransformingVisitor: () => TransformingVisitor,
  ToTextVisitor: () => ToTextVisitor,
  ToHTMLVisitor: () => ToHTMLVisitor,
  toHTML: () => toHTML,
  TEXTMODE: () => TEXTMODE,
  toText: () => toText
});
let Tag, CharRef, Comment, Raw, isArray, getTag, isConstructedObject, flattenAttributes, isVoidElement;
module.link("./html", {
  Tag(v) {
    Tag = v;
  },

  CharRef(v) {
    CharRef = v;
  },

  Comment(v) {
    Comment = v;
  },

  Raw(v) {
    Raw = v;
  },

  isArray(v) {
    isArray = v;
  },

  getTag(v) {
    getTag = v;
  },

  isConstructedObject(v) {
    isConstructedObject = v;
  },

  flattenAttributes(v) {
    flattenAttributes = v;
  },

  isVoidElement(v) {
    isVoidElement = v;
  }

}, 0);

var IDENTITY = function (x) {
  return x;
}; // _assign is like _.extend or the upcoming Object.assign.
// Copy src's own, enumerable properties onto tgt and return
// tgt.


var _hasOwnProperty = Object.prototype.hasOwnProperty;

var _assign = function (tgt, src) {
  for (var k in src) {
    if (_hasOwnProperty.call(src, k)) tgt[k] = src[k];
  }

  return tgt;
};

const Visitor = function (props) {
  _assign(this, props);
};

Visitor.def = function (options) {
  _assign(this.prototype, options);
};

Visitor.extend = function (options) {
  var curType = this;

  var subType = function HTMLVisitorSubtype() {
    Visitor.apply(this, arguments);
  };

  subType.prototype = new curType();
  subType.extend = curType.extend;
  subType.def = curType.def;
  if (options) _assign(subType.prototype, options);
  return subType;
};

Visitor.def({
  visit: function (content
  /*, ...*/
  ) {
    if (content == null) // null or undefined.
      return this.visitNull.apply(this, arguments);

    if (typeof content === 'object') {
      if (content.htmljsType) {
        switch (content.htmljsType) {
          case Tag.htmljsType:
            return this.visitTag.apply(this, arguments);

          case CharRef.htmljsType:
            return this.visitCharRef.apply(this, arguments);

          case Comment.htmljsType:
            return this.visitComment.apply(this, arguments);

          case Raw.htmljsType:
            return this.visitRaw.apply(this, arguments);

          default:
            throw new Error("Unknown htmljs type: " + content.htmljsType);
        }
      }

      if (isArray(content)) return this.visitArray.apply(this, arguments);
      return this.visitObject.apply(this, arguments);
    } else if (typeof content === 'string' || typeof content === 'boolean' || typeof content === 'number') {
      return this.visitPrimitive.apply(this, arguments);
    } else if (typeof content === 'function') {
      return this.visitFunction.apply(this, arguments);
    }

    throw new Error("Unexpected object in htmljs: " + content);
  },
  visitNull: function (nullOrUndefined
  /*, ...*/
  ) {},
  visitPrimitive: function (stringBooleanOrNumber
  /*, ...*/
  ) {},
  visitArray: function (array
  /*, ...*/
  ) {},
  visitComment: function (comment
  /*, ...*/
  ) {},
  visitCharRef: function (charRef
  /*, ...*/
  ) {},
  visitRaw: function (raw
  /*, ...*/
  ) {},
  visitTag: function (tag
  /*, ...*/
  ) {},
  visitObject: function (obj
  /*, ...*/
  ) {
    throw new Error("Unexpected object in htmljs: " + obj);
  },
  visitFunction: function (fn
  /*, ...*/
  ) {
    throw new Error("Unexpected function in htmljs: " + fn);
  }
});
const TransformingVisitor = Visitor.extend();
TransformingVisitor.def({
  visitNull: IDENTITY,
  visitPrimitive: IDENTITY,
  visitArray: function (array) {
    var result = array;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < array.length; i++) {
      var oldItem = array[i];
      var newItem = this.visit(oldItem, ...args);

      if (newItem !== oldItem) {
        // copy `array` on write
        if (result === array) result = array.slice();
        result[i] = newItem;
      }
    }

    return result;
  },
  visitComment: IDENTITY,
  visitCharRef: IDENTITY,
  visitRaw: IDENTITY,
  visitObject: function (obj) {
    // Don't parse Markdown & RCData as HTML
    if (obj.textMode != null) {
      return obj;
    }

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if ('content' in obj) {
      obj.content = this.visit(obj.content, ...args);
    }

    if ('elseContent' in obj) {
      obj.elseContent = this.visit(obj.elseContent, ...args);
    }

    return obj;
  },
  visitFunction: IDENTITY,
  visitTag: function (tag) {
    var oldChildren = tag.children;

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    var newChildren = this.visitChildren(oldChildren, ...args);
    var oldAttrs = tag.attrs;
    var newAttrs = this.visitAttributes(oldAttrs, ...args);
    if (newAttrs === oldAttrs && newChildren === oldChildren) return tag;
    var newTag = getTag(tag.tagName).apply(null, newChildren);
    newTag.attrs = newAttrs;
    return newTag;
  },
  visitChildren: function (children) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return this.visitArray(children, ...args);
  },
  // Transform the `.attrs` property of a tag, which may be a dictionary,
  // an array, or in some uses, a foreign object (such as
  // a template tag).
  visitAttributes: function (attrs) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    if (isArray(attrs)) {
      var result = attrs;

      for (var i = 0; i < attrs.length; i++) {
        var oldItem = attrs[i];
        var newItem = this.visitAttributes(oldItem, ...args);

        if (newItem !== oldItem) {
          // copy on write
          if (result === attrs) result = attrs.slice();
          result[i] = newItem;
        }
      }

      return result;
    }

    if (attrs && isConstructedObject(attrs)) {
      throw new Error("The basic TransformingVisitor does not support " + "foreign objects in attributes.  Define a custom " + "visitAttributes for this case.");
    }

    var oldAttrs = attrs;
    var newAttrs = oldAttrs;

    if (oldAttrs) {
      var attrArgs = [null, null];
      attrArgs.push.apply(attrArgs, arguments);

      for (var k in oldAttrs) {
        var oldValue = oldAttrs[k];
        attrArgs[0] = k;
        attrArgs[1] = oldValue;
        var newValue = this.visitAttribute.apply(this, attrArgs);

        if (newValue !== oldValue) {
          // copy on write
          if (newAttrs === oldAttrs) newAttrs = _assign({}, oldAttrs);
          newAttrs[k] = newValue;
        }
      }
    }

    return newAttrs;
  },
  // Transform the value of one attribute name/value in an
  // attributes dictionary.
  visitAttribute: function (name, value, tag) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    return this.visit(value, ...args);
  }
});
const ToTextVisitor = Visitor.extend();
ToTextVisitor.def({
  visitNull: function (nullOrUndefined) {
    return '';
  },
  visitPrimitive: function (stringBooleanOrNumber) {
    var str = String(stringBooleanOrNumber);

    if (this.textMode === TEXTMODE.RCDATA) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    } else if (this.textMode === TEXTMODE.ATTRIBUTE) {
      // escape `&` and `"` this time, not `&` and `<`
      return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    } else {
      return str;
    }
  },
  visitArray: function (array) {
    var parts = [];

    for (var i = 0; i < array.length; i++) parts.push(this.visit(array[i]));

    return parts.join('');
  },
  visitComment: function (comment) {
    throw new Error("Can't have a comment here");
  },
  visitCharRef: function (charRef) {
    if (this.textMode === TEXTMODE.RCDATA || this.textMode === TEXTMODE.ATTRIBUTE) {
      return charRef.html;
    } else {
      return charRef.str;
    }
  },
  visitRaw: function (raw) {
    return raw.value;
  },
  visitTag: function (tag) {
    // Really we should just disallow Tags here.  However, at the
    // moment it's useful to stringify any HTML we find.  In
    // particular, when you include a template within `{{#markdown}}`,
    // we render the template as text, and since there's currently
    // no way to make the template be *parsed* as text (e.g. `<template
    // type="text">`), we hackishly support HTML tags in markdown
    // in templates by parsing them and stringifying them.
    return this.visit(this.toHTML(tag));
  },
  visitObject: function (x) {
    throw new Error("Unexpected object in htmljs in toText: " + x);
  },
  toHTML: function (node) {
    return toHTML(node);
  }
});
const ToHTMLVisitor = Visitor.extend();
ToHTMLVisitor.def({
  visitNull: function (nullOrUndefined) {
    return '';
  },
  visitPrimitive: function (stringBooleanOrNumber) {
    var str = String(stringBooleanOrNumber);
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  },
  visitArray: function (array) {
    var parts = [];

    for (var i = 0; i < array.length; i++) parts.push(this.visit(array[i]));

    return parts.join('');
  },
  visitComment: function (comment) {
    return '<!--' + comment.sanitizedValue + '-->';
  },
  visitCharRef: function (charRef) {
    return charRef.html;
  },
  visitRaw: function (raw) {
    return raw.value;
  },
  visitTag: function (tag) {
    var attrStrs = [];
    var tagName = tag.tagName;
    var children = tag.children;
    var attrs = tag.attrs;

    if (attrs) {
      attrs = flattenAttributes(attrs);

      for (var k in attrs) {
        if (k === 'value' && tagName === 'textarea') {
          children = [attrs[k], children];
        } else {
          var v = this.toText(attrs[k], TEXTMODE.ATTRIBUTE);
          attrStrs.push(' ' + k + '="' + v + '"');
        }
      }
    }

    var startTag = '<' + tagName + attrStrs.join('') + '>';
    var childStrs = [];
    var content;

    if (tagName === 'textarea') {
      for (var i = 0; i < children.length; i++) childStrs.push(this.toText(children[i], TEXTMODE.RCDATA));

      content = childStrs.join('');
      if (content.slice(0, 1) === '\n') // TEXTAREA will absorb a newline, so if we see one, add
        // another one.
        content = '\n' + content;
    } else {
      for (var i = 0; i < children.length; i++) childStrs.push(this.visit(children[i]));

      content = childStrs.join('');
    }

    var result = startTag + content;

    if (children.length || !isVoidElement(tagName)) {
      // "Void" elements like BR are the only ones that don't get a close
      // tag in HTML5.  They shouldn't have contents, either, so we could
      // throw an error upon seeing contents here.
      result += '</' + tagName + '>';
    }

    return result;
  },
  visitObject: function (x) {
    throw new Error("Unexpected object in htmljs in toHTML: " + x);
  },
  toText: function (node, textMode) {
    return toText(node, textMode);
  }
}); ////////////////////////////// TOHTML

function toHTML(content) {
  return new ToHTMLVisitor().visit(content);
}

const TEXTMODE = {
  STRING: 1,
  RCDATA: 2,
  ATTRIBUTE: 3
};

function toText(content, textMode) {
  if (!textMode) throw new Error("textMode required for HTML.toText");
  if (!(textMode === TEXTMODE.STRING || textMode === TEXTMODE.RCDATA || textMode === TEXTMODE.ATTRIBUTE)) throw new Error("Unknown textMode: " + textMode);
  var visitor = new ToTextVisitor({
    textMode: textMode
  });
  return visitor.visit(content);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/htmljs/preamble.js");

/* Exports */
Package._define("htmljs", exports, {
  HTML: HTML
});

})();

//# sourceURL=meteor://💻app/packages/htmljs.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvaHRtbGpzL3ByZWFtYmxlLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9odG1sanMvaHRtbC5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvaHRtbGpzL3Zpc2l0b3JzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIkhUTUwiLCJIVE1MVGFncyIsIlRhZyIsIkF0dHJzIiwiZ2V0VGFnIiwiZW5zdXJlVGFnIiwiaXNUYWdFbnN1cmVkIiwiZ2V0U3ltYm9sTmFtZSIsImtub3duSFRNTEVsZW1lbnROYW1lcyIsImtub3duU1ZHRWxlbWVudE5hbWVzIiwia25vd25FbGVtZW50TmFtZXMiLCJ2b2lkRWxlbWVudE5hbWVzIiwiaXNLbm93bkVsZW1lbnQiLCJpc0tub3duU1ZHRWxlbWVudCIsImlzVm9pZEVsZW1lbnQiLCJDaGFyUmVmIiwiQ29tbWVudCIsIlJhdyIsImlzQXJyYXkiLCJpc0NvbnN0cnVjdGVkT2JqZWN0IiwiaXNOdWxseSIsImlzVmFsaWRBdHRyaWJ1dGVOYW1lIiwiZmxhdHRlbkF0dHJpYnV0ZXMiLCJsaW5rIiwidiIsIlZpc2l0b3IiLCJUcmFuc2Zvcm1pbmdWaXNpdG9yIiwiVG9IVE1MVmlzaXRvciIsIlRvVGV4dFZpc2l0b3IiLCJ0b0hUTUwiLCJURVhUTU9ERSIsInRvVGV4dCIsIk9iamVjdCIsImFzc2lnbiIsInByb3RvdHlwZSIsInRhZ05hbWUiLCJhdHRycyIsImNoaWxkcmVuIiwiZnJlZXplIiwiaHRtbGpzVHlwZSIsIm1ha2VUYWdDb25zdHJ1Y3RvciIsIkhUTUxUYWciLCJpbnN0YW5jZSIsImkiLCJhcmdzIiwibGVuZ3RoIiwiYXJyYXkiLCJ2YWx1ZSIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJzeW1ib2xOYW1lIiwiRXJyb3IiLCJ0b1VwcGVyQ2FzZSIsInJlcGxhY2UiLCJzcGxpdCIsImNvbmNhdCIsInZvaWRFbGVtZW50U2V0IiwiU2V0Iiwia25vd25FbGVtZW50U2V0Iiwia25vd25TVkdFbGVtZW50U2V0IiwiaGFzIiwiZm9yRWFjaCIsImh0bWwiLCJzdHIiLCJzYW5pdGl6ZWRWYWx1ZSIsIngiLCJBcnJheSIsInBsYWluIiwiZ2V0UHJvdG90eXBlT2YiLCJwcm90byIsIm5vZGUiLCJuYW1lIiwidGVzdCIsImlzTGlzdCIsInJlc3VsdCIsIk4iLCJvbmVBdHRycyIsIklERU5USVRZIiwiX2hhc093blByb3BlcnR5IiwiaGFzT3duUHJvcGVydHkiLCJfYXNzaWduIiwidGd0Iiwic3JjIiwiayIsImNhbGwiLCJwcm9wcyIsImRlZiIsIm9wdGlvbnMiLCJleHRlbmQiLCJjdXJUeXBlIiwic3ViVHlwZSIsIkhUTUxWaXNpdG9yU3VidHlwZSIsImFwcGx5IiwiYXJndW1lbnRzIiwidmlzaXQiLCJjb250ZW50IiwidmlzaXROdWxsIiwidmlzaXRUYWciLCJ2aXNpdENoYXJSZWYiLCJ2aXNpdENvbW1lbnQiLCJ2aXNpdFJhdyIsInZpc2l0QXJyYXkiLCJ2aXNpdE9iamVjdCIsInZpc2l0UHJpbWl0aXZlIiwidmlzaXRGdW5jdGlvbiIsIm51bGxPclVuZGVmaW5lZCIsInN0cmluZ0Jvb2xlYW5Pck51bWJlciIsImNvbW1lbnQiLCJjaGFyUmVmIiwicmF3IiwidGFnIiwib2JqIiwiZm4iLCJvbGRJdGVtIiwibmV3SXRlbSIsInRleHRNb2RlIiwiZWxzZUNvbnRlbnQiLCJvbGRDaGlsZHJlbiIsIm5ld0NoaWxkcmVuIiwidmlzaXRDaGlsZHJlbiIsIm9sZEF0dHJzIiwibmV3QXR0cnMiLCJ2aXNpdEF0dHJpYnV0ZXMiLCJuZXdUYWciLCJhdHRyQXJncyIsInB1c2giLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwidmlzaXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJSQ0RBVEEiLCJBVFRSSUJVVEUiLCJwYXJ0cyIsImpvaW4iLCJhdHRyU3RycyIsInN0YXJ0VGFnIiwiY2hpbGRTdHJzIiwiU1RSSU5HIiwidmlzaXRvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7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cGFja2FnZXMvaHRtbGpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSFRNTFRhZ3MsXG4gIFRhZyxcbiAgQXR0cnMsXG4gIGdldFRhZyxcbiAgZW5zdXJlVGFnLFxuICBpc1RhZ0Vuc3VyZWQsXG4gIGdldFN5bWJvbE5hbWUsXG4gIGtub3duSFRNTEVsZW1lbnROYW1lcyxcbiAga25vd25TVkdFbGVtZW50TmFtZXMsXG4gIGtub3duRWxlbWVudE5hbWVzLFxuICB2b2lkRWxlbWVudE5hbWVzLFxuICBpc0tub3duRWxlbWVudCxcbiAgaXNLbm93blNWR0VsZW1lbnQsXG4gIGlzVm9pZEVsZW1lbnQsXG4gIENoYXJSZWYsXG4gIENvbW1lbnQsXG4gIFJhdyxcbiAgaXNBcnJheSxcbiAgaXNDb25zdHJ1Y3RlZE9iamVjdCxcbiAgaXNOdWxseSxcbiAgaXNWYWxpZEF0dHJpYnV0ZU5hbWUsXG4gIGZsYXR0ZW5BdHRyaWJ1dGVzLFxufSBmcm9tICcuL2h0bWwnO1xuXG5pbXBvcnQge1xuICBWaXNpdG9yLFxuICBUcmFuc2Zvcm1pbmdWaXNpdG9yLFxuICBUb0hUTUxWaXNpdG9yLFxuICBUb1RleHRWaXNpdG9yLFxuICB0b0hUTUwsXG4gIFRFWFRNT0RFLFxuICB0b1RleHRcbn0gZnJvbSAnLi92aXNpdG9ycyc7XG5cblxuLy8gd2UncmUgYWN0dWFsbHkgZXhwb3J0aW5nIHRoZSBIVE1MVGFncyBvYmplY3QuXG4vLyAgYmVjYXVzZSBpdCBpcyBkeW5hbWljYWxseSBhbHRlcmVkIGJ5IGdldFRhZy9lbnN1cmVUYWdcbmV4cG9ydCBjb25zdCBIVE1MID0gT2JqZWN0LmFzc2lnbihIVE1MVGFncywge1xuICBUYWcsXG4gIEF0dHJzLFxuICBnZXRUYWcsXG4gIGVuc3VyZVRhZyxcbiAgaXNUYWdFbnN1cmVkLFxuICBnZXRTeW1ib2xOYW1lLFxuICBrbm93bkhUTUxFbGVtZW50TmFtZXMsXG4gIGtub3duU1ZHRWxlbWVudE5hbWVzLFxuICBrbm93bkVsZW1lbnROYW1lcyxcbiAgdm9pZEVsZW1lbnROYW1lcyxcbiAgaXNLbm93bkVsZW1lbnQsXG4gIGlzS25vd25TVkdFbGVtZW50LFxuICBpc1ZvaWRFbGVtZW50LFxuICBDaGFyUmVmLFxuICBDb21tZW50LFxuICBSYXcsXG4gIGlzQXJyYXksXG4gIGlzQ29uc3RydWN0ZWRPYmplY3QsXG4gIGlzTnVsbHksXG4gIGlzVmFsaWRBdHRyaWJ1dGVOYW1lLFxuICBmbGF0dGVuQXR0cmlidXRlcyxcbiAgdG9IVE1MLFxuICBURVhUTU9ERSxcbiAgdG9UZXh0LFxuICBWaXNpdG9yLFxuICBUcmFuc2Zvcm1pbmdWaXNpdG9yLFxuICBUb0hUTUxWaXNpdG9yLFxuICBUb1RleHRWaXNpdG9yLFxufSk7XG4iLCJcbmV4cG9ydCBjb25zdCBUYWcgPSBmdW5jdGlvbiAoKSB7fTtcblRhZy5wcm90b3R5cGUudGFnTmFtZSA9ICcnOyAvLyB0aGlzIHdpbGwgYmUgc2V0IHBlciBUYWcgc3ViY2xhc3NcblRhZy5wcm90b3R5cGUuYXR0cnMgPSBudWxsO1xuVGFnLnByb3RvdHlwZS5jaGlsZHJlbiA9IE9iamVjdC5mcmVlemUgPyBPYmplY3QuZnJlZXplKFtdKSA6IFtdO1xuVGFnLnByb3RvdHlwZS5odG1sanNUeXBlID0gVGFnLmh0bWxqc1R5cGUgPSBbJ1RhZyddO1xuXG4vLyBHaXZlbiBcInBcIiBjcmVhdGUgdGhlIGZ1bmN0aW9uIGBIVE1MLlBgLlxudmFyIG1ha2VUYWdDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gIC8vIFRhZyBpcyB0aGUgcGVyLXRhZ05hbWUgY29uc3RydWN0b3Igb2YgYSBIVE1MLlRhZyBzdWJjbGFzc1xuICB2YXIgSFRNTFRhZyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgLy8gV29yayB3aXRoIG9yIHdpdGhvdXQgYG5ld2AuICBJZiBub3QgY2FsbGVkIHdpdGggYG5ld2AsXG4gICAgLy8gcGVyZm9ybSBpbnN0YW50aWF0aW9uIGJ5IHJlY3Vyc2l2ZWx5IGNhbGxpbmcgdGhpcyBjb25zdHJ1Y3Rvci5cbiAgICAvLyBXZSBjYW4ndCBwYXNzIHZhcmFyZ3MsIHNvIHBhc3Mgbm8gYXJncy5cbiAgICB2YXIgaW5zdGFuY2UgPSAodGhpcyBpbnN0YW5jZW9mIFRhZykgPyB0aGlzIDogbmV3IEhUTUxUYWc7XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGF0dHJzID0gYXJncy5sZW5ndGggJiYgYXJnc1swXTtcbiAgICBpZiAoYXR0cnMgJiYgKHR5cGVvZiBhdHRycyA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAvLyBUcmVhdCB2YW5pbGxhIEpTIG9iamVjdCBhcyBhbiBhdHRyaWJ1dGVzIGRpY3Rpb25hcnkuXG4gICAgICBpZiAoISBpc0NvbnN0cnVjdGVkT2JqZWN0KGF0dHJzKSkge1xuICAgICAgICBpbnN0YW5jZS5hdHRycyA9IGF0dHJzO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzIGluc3RhbmNlb2YgQXR0cnMpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gYXR0cnMudmFsdWU7XG4gICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBpbnN0YW5jZS5hdHRycyA9IGFycmF5WzBdO1xuICAgICAgICB9IGVsc2UgaWYgKGFycmF5Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBpbnN0YW5jZS5hdHRycyA9IGFycmF5O1xuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIElmIG5vIGNoaWxkcmVuLCBkb24ndCBjcmVhdGUgYW4gYXJyYXkgYXQgYWxsLCB1c2UgdGhlIHByb3RvdHlwZSdzXG4gICAgLy8gKGZyb3plbiwgZW1wdHkpIGFycmF5LiAgVGhpcyB3YXkgd2UgZG9uJ3QgY3JlYXRlIGFuIGVtcHR5IGFycmF5XG4gICAgLy8gZXZlcnkgdGltZSBzb21lb25lIGNyZWF0ZXMgYSB0YWcgd2l0aG91dCBgbmV3YCBhbmQgdGhpcyBjb25zdHJ1Y3RvclxuICAgIC8vIGNhbGxzIGl0c2VsZiB3aXRoIG5vIGFyZ3VtZW50cyAoYWJvdmUpLlxuICAgIGlmIChpIDwgYXJncy5sZW5ndGgpXG4gICAgICBpbnN0YW5jZS5jaGlsZHJlbiA9IGFyZ3Muc2xpY2UoaSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG4gIEhUTUxUYWcucHJvdG90eXBlID0gbmV3IFRhZztcbiAgSFRNTFRhZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBIVE1MVGFnO1xuICBIVE1MVGFnLnByb3RvdHlwZS50YWdOYW1lID0gdGFnTmFtZTtcblxuICByZXR1cm4gSFRNTFRhZztcbn07XG5cbi8vIE5vdCBhbiBIVE1ManMgbm9kZSwgYnV0IGEgd3JhcHBlciB0byBwYXNzIG11bHRpcGxlIGF0dHJzIGRpY3Rpb25hcmllc1xuLy8gdG8gYSB0YWcgKGZvciB0aGUgcHVycG9zZSBvZiBpbXBsZW1lbnRpbmcgZHluYW1pYyBhdHRyaWJ1dGVzKS5cbmV4cG9ydCBmdW5jdGlvbiBBdHRycyguLi5hcmdzKSB7XG4gIC8vIFdvcmsgd2l0aCBvciB3aXRob3V0IGBuZXdgLiAgSWYgbm90IGNhbGxlZCB3aXRoIGBuZXdgLFxuICAvLyBwZXJmb3JtIGluc3RhbnRpYXRpb24gYnkgcmVjdXJzaXZlbHkgY2FsbGluZyB0aGlzIGNvbnN0cnVjdG9yLlxuICAvLyBXZSBjYW4ndCBwYXNzIHZhcmFyZ3MsIHNvIHBhc3Mgbm8gYXJncy5cbiAgdmFyIGluc3RhbmNlID0gKHRoaXMgaW5zdGFuY2VvZiBBdHRycykgPyB0aGlzIDogbmV3IEF0dHJzO1xuXG4gIGluc3RhbmNlLnZhbHVlID0gYXJncztcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBLTk9XTiBFTEVNRU5UU1xuZXhwb3J0IGNvbnN0IEhUTUxUYWdzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWcgKHRhZ05hbWUpIHtcbiAgdmFyIHN5bWJvbE5hbWUgPSBnZXRTeW1ib2xOYW1lKHRhZ05hbWUpO1xuICBpZiAoc3ltYm9sTmFtZSA9PT0gdGFnTmFtZSkgLy8gYWxsLWNhcHMgdGFnTmFtZVxuICAgIHRocm93IG5ldyBFcnJvcihcIlVzZSB0aGUgbG93ZXJjYXNlIG9yIGNhbWVsQ2FzZSBmb3JtIG9mICdcIiArIHRhZ05hbWUgKyBcIicgaGVyZVwiKTtcblxuICBpZiAoISBIVE1MVGFnc1tzeW1ib2xOYW1lXSlcbiAgICBIVE1MVGFnc1tzeW1ib2xOYW1lXSA9IG1ha2VUYWdDb25zdHJ1Y3Rvcih0YWdOYW1lKTtcblxuICByZXR1cm4gSFRNTFRhZ3Nbc3ltYm9sTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVUYWcodGFnTmFtZSkge1xuICBnZXRUYWcodGFnTmFtZSk7IC8vIGRvbid0IHJldHVybiBpdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUYWdFbnN1cmVkICh0YWdOYW1lKSB7XG4gIHJldHVybiBpc0tub3duRWxlbWVudCh0YWdOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN5bWJvbE5hbWUgKHRhZ05hbWUpIHtcbiAgLy8gXCJmb28tYmFyXCIgLT4gXCJGT09fQkFSXCJcbiAgcmV0dXJuIHRhZ05hbWUudG9VcHBlckNhc2UoKS5yZXBsYWNlKC8tL2csICdfJyk7XG59XG5cbmV4cG9ydCBjb25zdCBrbm93bkhUTUxFbGVtZW50TmFtZXMgPSAnYSBhYmJyIGFjcm9ueW0gYWRkcmVzcyBhcHBsZXQgYXJlYSBhcnRpY2xlIGFzaWRlIGF1ZGlvIGIgYmFzZSBiYXNlZm9udCBiZGkgYmRvIGJpZyBibG9ja3F1b3RlIGJvZHkgYnIgYnV0dG9uIGNhbnZhcyBjYXB0aW9uIGNlbnRlciBjaXRlIGNvZGUgY29sIGNvbGdyb3VwIGNvbW1hbmQgZGF0YSBkYXRhZ3JpZCBkYXRhbGlzdCBkZCBkZWwgZGV0YWlscyBkZm4gZGlyIGRpdiBkbCBkdCBlbSBlbWJlZCBldmVudHNvdXJjZSBmaWVsZHNldCBmaWdjYXB0aW9uIGZpZ3VyZSBmb250IGZvb3RlciBmb3JtIGZyYW1lIGZyYW1lc2V0IGgxIGgyIGgzIGg0IGg1IGg2IGhlYWQgaGVhZGVyIGhncm91cCBociBodG1sIGkgaWZyYW1lIGltZyBpbnB1dCBpbnMgaXNpbmRleCBrYmQga2V5Z2VuIGxhYmVsIGxlZ2VuZCBsaSBsaW5rIG1haW4gbWFwIG1hcmsgbWVudSBtZXRhIG1ldGVyIG5hdiBub2ZyYW1lcyBub3NjcmlwdCBvYmplY3Qgb2wgb3B0Z3JvdXAgb3B0aW9uIG91dHB1dCBwIHBhcmFtIHByZSBwcm9ncmVzcyBxIHJwIHJ0IHJ1YnkgcyBzYW1wIHNjcmlwdCBzZWN0aW9uIHNlbGVjdCBzbWFsbCBzb3VyY2Ugc3BhbiBzdHJpa2Ugc3Ryb25nIHN0eWxlIHN1YiBzdW1tYXJ5IHN1cCB0YWJsZSB0Ym9keSB0ZCB0ZXh0YXJlYSB0Zm9vdCB0aCB0aGVhZCB0aW1lIHRpdGxlIHRyIHRyYWNrIHR0IHUgdWwgdmFyIHZpZGVvIHdicicuc3BsaXQoJyAnKTtcbi8vICh3ZSBhZGQgdGhlIFNWRyBvbmVzIGJlbG93KVxuXG5leHBvcnQgY29uc3Qga25vd25TVkdFbGVtZW50TmFtZXMgPSAnYWx0R2x5cGggYWx0R2x5cGhEZWYgYWx0R2x5cGhJdGVtIGFuaW1hdGUgYW5pbWF0ZUNvbG9yIGFuaW1hdGVNb3Rpb24gYW5pbWF0ZVRyYW5zZm9ybSBjaXJjbGUgY2xpcFBhdGggY29sb3ItcHJvZmlsZSBjdXJzb3IgZGVmcyBkZXNjIGVsbGlwc2UgZmVCbGVuZCBmZUNvbG9yTWF0cml4IGZlQ29tcG9uZW50VHJhbnNmZXIgZmVDb21wb3NpdGUgZmVDb252b2x2ZU1hdHJpeCBmZURpZmZ1c2VMaWdodGluZyBmZURpc3BsYWNlbWVudE1hcCBmZURpc3RhbnRMaWdodCBmZUZsb29kIGZlRnVuY0EgZmVGdW5jQiBmZUZ1bmNHIGZlRnVuY1IgZmVHYXVzc2lhbkJsdXIgZmVJbWFnZSBmZU1lcmdlIGZlTWVyZ2VOb2RlIGZlTW9ycGhvbG9neSBmZU9mZnNldCBmZVBvaW50TGlnaHQgZmVTcGVjdWxhckxpZ2h0aW5nIGZlU3BvdExpZ2h0IGZlVGlsZSBmZVR1cmJ1bGVuY2UgZmlsdGVyIGZvbnQgZm9udC1mYWNlIGZvbnQtZmFjZS1mb3JtYXQgZm9udC1mYWNlLW5hbWUgZm9udC1mYWNlLXNyYyBmb250LWZhY2UtdXJpIGZvcmVpZ25PYmplY3QgZyBnbHlwaCBnbHlwaFJlZiBoa2VybiBpbWFnZSBsaW5lIGxpbmVhckdyYWRpZW50IG1hcmtlciBtYXNrIG1ldGFkYXRhIG1pc3NpbmctZ2x5cGggcGF0aCBwYXR0ZXJuIHBvbHlnb24gcG9seWxpbmUgcmFkaWFsR3JhZGllbnQgcmVjdCBzZXQgc3RvcCBzdHlsZSBzdmcgc3dpdGNoIHN5bWJvbCB0ZXh0IHRleHRQYXRoIHRpdGxlIHRyZWYgdHNwYW4gdXNlIHZpZXcgdmtlcm4nLnNwbGl0KCcgJyk7XG4vLyBBcHBlbmQgU1ZHIGVsZW1lbnQgbmFtZXMgdG8gbGlzdCBvZiBrbm93biBlbGVtZW50IG5hbWVzXG5leHBvcnQgY29uc3Qga25vd25FbGVtZW50TmFtZXMgPSBrbm93bkhUTUxFbGVtZW50TmFtZXMuY29uY2F0KGtub3duU1ZHRWxlbWVudE5hbWVzKTtcblxuZXhwb3J0IGNvbnN0IHZvaWRFbGVtZW50TmFtZXMgPSAnYXJlYSBiYXNlIGJyIGNvbCBjb21tYW5kIGVtYmVkIGhyIGltZyBpbnB1dCBrZXlnZW4gbGluayBtZXRhIHBhcmFtIHNvdXJjZSB0cmFjayB3YnInLnNwbGl0KCcgJyk7XG5cblxudmFyIHZvaWRFbGVtZW50U2V0ID0gbmV3IFNldCh2b2lkRWxlbWVudE5hbWVzKTtcbnZhciBrbm93bkVsZW1lbnRTZXQgPSBuZXcgU2V0KGtub3duRWxlbWVudE5hbWVzKTtcbnZhciBrbm93blNWR0VsZW1lbnRTZXQgPSBuZXcgU2V0KGtub3duU1ZHRWxlbWVudE5hbWVzKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzS25vd25FbGVtZW50KHRhZ05hbWUpIHtcbiAgcmV0dXJuIGtub3duRWxlbWVudFNldC5oYXModGFnTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0tub3duU1ZHRWxlbWVudCh0YWdOYW1lKSB7XG4gIHJldHVybiBrbm93blNWR0VsZW1lbnRTZXQuaGFzKHRhZ05hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWb2lkRWxlbWVudCh0YWdOYW1lKSB7XG4gIHJldHVybiB2b2lkRWxlbWVudFNldC5oYXModGFnTmFtZSk7XG59XG5cblxuLy8gRW5zdXJlIHRhZ3MgZm9yIGFsbCBrbm93biBlbGVtZW50c1xua25vd25FbGVtZW50TmFtZXMuZm9yRWFjaChlbnN1cmVUYWcpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBDaGFyUmVmKGF0dHJzKSB7XG4gIGlmICghICh0aGlzIGluc3RhbmNlb2YgQ2hhclJlZikpXG4gICAgLy8gY2FsbGVkIHdpdGhvdXQgYG5ld2BcbiAgICByZXR1cm4gbmV3IENoYXJSZWYoYXR0cnMpO1xuXG4gIGlmICghIChhdHRycyAmJiBhdHRycy5odG1sICYmIGF0dHJzLnN0cikpXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJIVE1MLkNoYXJSZWYgbXVzdCBiZSBjb25zdHJ1Y3RlZCB3aXRoICh7aHRtbDouLi4sIHN0cjouLi59KVwiKTtcblxuICB0aGlzLmh0bWwgPSBhdHRycy5odG1sO1xuICB0aGlzLnN0ciA9IGF0dHJzLnN0cjtcbn1cbkNoYXJSZWYucHJvdG90eXBlLmh0bWxqc1R5cGUgPSBDaGFyUmVmLmh0bWxqc1R5cGUgPSBbJ0NoYXJSZWYnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbW1lbnQodmFsdWUpIHtcbiAgaWYgKCEgKHRoaXMgaW5zdGFuY2VvZiBDb21tZW50KSlcbiAgICAvLyBjYWxsZWQgd2l0aG91dCBgbmV3YFxuICAgIHJldHVybiBuZXcgQ29tbWVudCh2YWx1ZSk7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdIVE1MLkNvbW1lbnQgbXVzdCBiZSBjb25zdHJ1Y3RlZCB3aXRoIGEgc3RyaW5nJyk7XG5cbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAvLyBLaWxsIGlsbGVnYWwgaHlwaGVucyBpbiBjb21tZW50IHZhbHVlIChubyB3YXkgdG8gZXNjYXBlIHRoZW0gaW4gSFRNTClcbiAgdGhpcy5zYW5pdGl6ZWRWYWx1ZSA9IHZhbHVlLnJlcGxhY2UoL14tfC0tK3wtJC9nLCAnJyk7XG59XG5Db21tZW50LnByb3RvdHlwZS5odG1sanNUeXBlID0gQ29tbWVudC5odG1sanNUeXBlID0gWydDb21tZW50J107XG5cbmV4cG9ydCBmdW5jdGlvbiBSYXcodmFsdWUpIHtcbiAgaWYgKCEgKHRoaXMgaW5zdGFuY2VvZiBSYXcpKVxuICAgIC8vIGNhbGxlZCB3aXRob3V0IGBuZXdgXG4gICAgcmV0dXJuIG5ldyBSYXcodmFsdWUpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKVxuICAgIHRocm93IG5ldyBFcnJvcignSFRNTC5SYXcgbXVzdCBiZSBjb25zdHJ1Y3RlZCB3aXRoIGEgc3RyaW5nJyk7XG5cbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuUmF3LnByb3RvdHlwZS5odG1sanNUeXBlID0gUmF3Lmh0bWxqc1R5cGUgPSBbJ1JhdyddO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5ICh4KSB7XG4gIHJldHVybiB4IGluc3RhbmNlb2YgQXJyYXkgfHwgQXJyYXkuaXNBcnJheSh4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29uc3RydWN0ZWRPYmplY3QgKHgpIHtcbiAgLy8gRmlndXJlIG91dCBpZiBgeGAgaXMgXCJhbiBpbnN0YW5jZSBvZiBzb21lIGNsYXNzXCIgb3IganVzdCBhIHBsYWluXG4gIC8vIG9iamVjdCBsaXRlcmFsLiAgSXQgY29ycmVjdGx5IHRyZWF0cyBhbiBvYmplY3QgbGl0ZXJhbCBsaWtlXG4gIC8vIGB7IGNvbnN0cnVjdG9yOiAuLi4gfWAgYXMgYW4gb2JqZWN0IGxpdGVyYWwuICBJdCB3b24ndCBkZXRlY3RcbiAgLy8gaW5zdGFuY2VzIG9mIGNsYXNzZXMgdGhhdCBsYWNrIGEgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSAoZS5nLlxuICAvLyBpZiB5b3UgYXNzaWduIHRvIGEgcHJvdG90eXBlIHdoZW4gc2V0dGluZyB1cCB0aGUgY2xhc3MgYXMgaW46XG4gIC8vIGBGb28gPSBmdW5jdGlvbiAoKSB7IC4uLiB9OyBGb28ucHJvdG90eXBlID0geyAuLi4gfWAsIHRoZW5cbiAgLy8gYChuZXcgRm9vKS5jb25zdHJ1Y3RvcmAgaXMgYE9iamVjdGAsIG5vdCBgRm9vYCkuXG4gIGlmKCF4IHx8ICh0eXBlb2YgeCAhPT0gJ29iamVjdCcpKSByZXR1cm4gZmFsc2U7XG4gIC8vIElzIHRoaXMgYSBwbGFpbiBvYmplY3Q/XG4gIGxldCBwbGFpbiA9IGZhbHNlO1xuICBpZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoeCkgPT09IG51bGwpIHtcbiAgICBwbGFpbiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHByb3RvID0geDtcbiAgICB3aGlsZShPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pICE9PSBudWxsKSB7XG4gICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICAgIHBsYWluID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHgpID09PSBwcm90bztcbiAgfVxuXG4gIHJldHVybiAhcGxhaW4gJiZcbiAgICAodHlwZW9mIHguY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicpICYmXG4gICAgKHggaW5zdGFuY2VvZiB4LmNvbnN0cnVjdG9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbHkgKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT0gbnVsbClcbiAgICAvLyBudWxsIG9yIHVuZGVmaW5lZFxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChpc0FycmF5KG5vZGUpKSB7XG4gICAgLy8gaXMgaXQgYW4gZW1wdHkgYXJyYXkgb3IgYW4gYXJyYXkgb2YgYWxsIG51bGx5IGl0ZW1zP1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKylcbiAgICAgIGlmICghIGlzTnVsbHkobm9kZVtpXSkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRBdHRyaWJ1dGVOYW1lIChuYW1lKSB7XG4gIHJldHVybiAvXls6X0EtWmEtel1bOl9BLVphLXowLTkuXFwtXSovLnRlc3QobmFtZSk7XG59XG5cbi8vIElmIGBhdHRyc2AgaXMgYW4gYXJyYXkgb2YgYXR0cmlidXRlcyBkaWN0aW9uYXJpZXMsIGNvbWJpbmVzIHRoZW1cbi8vIGludG8gb25lLiAgUmVtb3ZlcyBhdHRyaWJ1dGVzIHRoYXQgYXJlIFwibnVsbHkuXCJcbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuQXR0cmlidXRlcyAoYXR0cnMpIHtcbiAgaWYgKCEgYXR0cnMpXG4gICAgcmV0dXJuIGF0dHJzO1xuXG4gIHZhciBpc0xpc3QgPSBpc0FycmF5KGF0dHJzKTtcbiAgaWYgKGlzTGlzdCAmJiBhdHRycy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBpID0gMCwgTiA9IChpc0xpc3QgPyBhdHRycy5sZW5ndGggOiAxKTsgaSA8IE47IGkrKykge1xuICAgIHZhciBvbmVBdHRycyA9IChpc0xpc3QgPyBhdHRyc1tpXSA6IGF0dHJzKTtcbiAgICBpZiAoKHR5cGVvZiBvbmVBdHRycyAhPT0gJ29iamVjdCcpIHx8XG4gICAgICAgIGlzQ29uc3RydWN0ZWRPYmplY3Qob25lQXR0cnMpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgcGxhaW4gSlMgb2JqZWN0IGFzIGF0dHJzLCBmb3VuZDogXCIgKyBvbmVBdHRycyk7XG4gICAgZm9yICh2YXIgbmFtZSBpbiBvbmVBdHRycykge1xuICAgICAgaWYgKCEgaXNWYWxpZEF0dHJpYnV0ZU5hbWUobmFtZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgSFRNTCBhdHRyaWJ1dGUgbmFtZTogXCIgKyBuYW1lKTtcbiAgICAgIHZhciB2YWx1ZSA9IG9uZUF0dHJzW25hbWVdO1xuICAgICAgaWYgKCEgaXNOdWxseSh2YWx1ZSkpXG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQge1xuICBUYWcsXG4gIENoYXJSZWYsXG4gIENvbW1lbnQsXG4gIFJhdyxcbiAgaXNBcnJheSxcbiAgZ2V0VGFnLFxuICBpc0NvbnN0cnVjdGVkT2JqZWN0LFxuICBmbGF0dGVuQXR0cmlidXRlcyxcbiAgaXNWb2lkRWxlbWVudCxcbn0gZnJvbSAnLi9odG1sJztcblxuXG52YXIgSURFTlRJVFkgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfTtcblxuLy8gX2Fzc2lnbiBpcyBsaWtlIF8uZXh0ZW5kIG9yIHRoZSB1cGNvbWluZyBPYmplY3QuYXNzaWduLlxuLy8gQ29weSBzcmMncyBvd24sIGVudW1lcmFibGUgcHJvcGVydGllcyBvbnRvIHRndCBhbmQgcmV0dXJuXG4vLyB0Z3QuXG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfYXNzaWduID0gZnVuY3Rpb24gKHRndCwgc3JjKSB7XG4gIGZvciAodmFyIGsgaW4gc3JjKSB7XG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHNyYywgaykpXG4gICAgICB0Z3Rba10gPSBzcmNba107XG4gIH1cbiAgcmV0dXJuIHRndDtcbn07XG5cbmV4cG9ydCBjb25zdCBWaXNpdG9yID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gIF9hc3NpZ24odGhpcywgcHJvcHMpO1xufTtcblxuVmlzaXRvci5kZWYgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICBfYXNzaWduKHRoaXMucHJvdG90eXBlLCBvcHRpb25zKTtcbn07XG5cblZpc2l0b3IuZXh0ZW5kID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIGN1clR5cGUgPSB0aGlzO1xuICB2YXIgc3ViVHlwZSA9IGZ1bmN0aW9uIEhUTUxWaXNpdG9yU3VidHlwZSgvKmFyZ3VtZW50cyovKSB7XG4gICAgVmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuICBzdWJUeXBlLnByb3RvdHlwZSA9IG5ldyBjdXJUeXBlO1xuICBzdWJUeXBlLmV4dGVuZCA9IGN1clR5cGUuZXh0ZW5kO1xuICBzdWJUeXBlLmRlZiA9IGN1clR5cGUuZGVmO1xuICBpZiAob3B0aW9ucylcbiAgICBfYXNzaWduKHN1YlR5cGUucHJvdG90eXBlLCBvcHRpb25zKTtcbiAgcmV0dXJuIHN1YlR5cGU7XG59O1xuXG5WaXNpdG9yLmRlZih7XG4gIHZpc2l0OiBmdW5jdGlvbiAoY29udGVudC8qLCAuLi4qLykge1xuICAgIGlmIChjb250ZW50ID09IG51bGwpXG4gICAgICAvLyBudWxsIG9yIHVuZGVmaW5lZC5cbiAgICAgIHJldHVybiB0aGlzLnZpc2l0TnVsbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGNvbnRlbnQuaHRtbGpzVHlwZSkge1xuICAgICAgICBzd2l0Y2ggKGNvbnRlbnQuaHRtbGpzVHlwZSkge1xuICAgICAgICBjYXNlIFRhZy5odG1sanNUeXBlOlxuICAgICAgICAgIHJldHVybiB0aGlzLnZpc2l0VGFnLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNhc2UgQ2hhclJlZi5odG1sanNUeXBlOlxuICAgICAgICAgIHJldHVybiB0aGlzLnZpc2l0Q2hhclJlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBjYXNlIENvbW1lbnQuaHRtbGpzVHlwZTpcbiAgICAgICAgICByZXR1cm4gdGhpcy52aXNpdENvbW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgY2FzZSBSYXcuaHRtbGpzVHlwZTpcbiAgICAgICAgICByZXR1cm4gdGhpcy52aXNpdFJhdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gaHRtbGpzIHR5cGU6IFwiICsgY29udGVudC5odG1sanNUeXBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNBcnJheShjb250ZW50KSlcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaXRBcnJheS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICByZXR1cm4gdGhpcy52aXNpdE9iamVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgfSBlbHNlIGlmICgodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB8fFxuICAgICAgICAgICAgICAgKHR5cGVvZiBjb250ZW50ID09PSAnYm9vbGVhbicpIHx8XG4gICAgICAgICAgICAgICAodHlwZW9mIGNvbnRlbnQgPT09ICdudW1iZXInKSkge1xuICAgICAgcmV0dXJuIHRoaXMudmlzaXRQcmltaXRpdmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0RnVuY3Rpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIG9iamVjdCBpbiBodG1sanM6IFwiICsgY29udGVudCk7XG5cbiAgfSxcbiAgdmlzaXROdWxsOiBmdW5jdGlvbiAobnVsbE9yVW5kZWZpbmVkLyosIC4uLiovKSB7fSxcbiAgdmlzaXRQcmltaXRpdmU6IGZ1bmN0aW9uIChzdHJpbmdCb29sZWFuT3JOdW1iZXIvKiwgLi4uKi8pIHt9LFxuICB2aXNpdEFycmF5OiBmdW5jdGlvbiAoYXJyYXkvKiwgLi4uKi8pIHt9LFxuICB2aXNpdENvbW1lbnQ6IGZ1bmN0aW9uIChjb21tZW50LyosIC4uLiovKSB7fSxcbiAgdmlzaXRDaGFyUmVmOiBmdW5jdGlvbiAoY2hhclJlZi8qLCAuLi4qLykge30sXG4gIHZpc2l0UmF3OiBmdW5jdGlvbiAocmF3LyosIC4uLiovKSB7fSxcbiAgdmlzaXRUYWc6IGZ1bmN0aW9uICh0YWcvKiwgLi4uKi8pIHt9LFxuICB2aXNpdE9iamVjdDogZnVuY3Rpb24gKG9iai8qLCAuLi4qLykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgb2JqZWN0IGluIGh0bWxqczogXCIgKyBvYmopO1xuICB9LFxuICB2aXNpdEZ1bmN0aW9uOiBmdW5jdGlvbiAoZm4vKiwgLi4uKi8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGZ1bmN0aW9uIGluIGh0bWxqczogXCIgKyBmbik7XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgVHJhbnNmb3JtaW5nVmlzaXRvciA9IFZpc2l0b3IuZXh0ZW5kKCk7XG5UcmFuc2Zvcm1pbmdWaXNpdG9yLmRlZih7XG4gIHZpc2l0TnVsbDogSURFTlRJVFksXG4gIHZpc2l0UHJpbWl0aXZlOiBJREVOVElUWSxcbiAgdmlzaXRBcnJheTogZnVuY3Rpb24gKGFycmF5LCAuLi5hcmdzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGFycmF5O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvbGRJdGVtID0gYXJyYXlbaV07XG4gICAgICB2YXIgbmV3SXRlbSA9IHRoaXMudmlzaXQob2xkSXRlbSwgLi4uYXJncyk7XG4gICAgICBpZiAobmV3SXRlbSAhPT0gb2xkSXRlbSkge1xuICAgICAgICAvLyBjb3B5IGBhcnJheWAgb24gd3JpdGVcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gYXJyYXkpXG4gICAgICAgICAgcmVzdWx0ID0gYXJyYXkuc2xpY2UoKTtcbiAgICAgICAgcmVzdWx0W2ldID0gbmV3SXRlbTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgdmlzaXRDb21tZW50OiBJREVOVElUWSxcbiAgdmlzaXRDaGFyUmVmOiBJREVOVElUWSxcbiAgdmlzaXRSYXc6IElERU5USVRZLFxuICB2aXNpdE9iamVjdDogZnVuY3Rpb24ob2JqLCAuLi5hcmdzKXtcbiAgICAvLyBEb24ndCBwYXJzZSBNYXJrZG93biAmIFJDRGF0YSBhcyBIVE1MXG4gICAgaWYgKG9iai50ZXh0TW9kZSAhPSBudWxsKXtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmICgnY29udGVudCcgaW4gb2JqKSB7XG4gICAgICBvYmouY29udGVudCA9IHRoaXMudmlzaXQob2JqLmNvbnRlbnQsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBpZiAoJ2Vsc2VDb250ZW50JyBpbiBvYmope1xuICAgICAgb2JqLmVsc2VDb250ZW50ID0gdGhpcy52aXNpdChvYmouZWxzZUNvbnRlbnQsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9LFxuICB2aXNpdEZ1bmN0aW9uOiBJREVOVElUWSxcbiAgdmlzaXRUYWc6IGZ1bmN0aW9uICh0YWcsIC4uLmFyZ3MpIHtcbiAgICB2YXIgb2xkQ2hpbGRyZW4gPSB0YWcuY2hpbGRyZW47XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gdGhpcy52aXNpdENoaWxkcmVuKG9sZENoaWxkcmVuLCAuLi5hcmdzKTtcblxuICAgIHZhciBvbGRBdHRycyA9IHRhZy5hdHRycztcbiAgICB2YXIgbmV3QXR0cnMgPSB0aGlzLnZpc2l0QXR0cmlidXRlcyhvbGRBdHRycywgLi4uYXJncyk7XG5cbiAgICBpZiAobmV3QXR0cnMgPT09IG9sZEF0dHJzICYmIG5ld0NoaWxkcmVuID09PSBvbGRDaGlsZHJlbilcbiAgICAgIHJldHVybiB0YWc7XG5cbiAgICB2YXIgbmV3VGFnID0gZ2V0VGFnKHRhZy50YWdOYW1lKS5hcHBseShudWxsLCBuZXdDaGlsZHJlbik7XG4gICAgbmV3VGFnLmF0dHJzID0gbmV3QXR0cnM7XG4gICAgcmV0dXJuIG5ld1RhZztcbiAgfSxcbiAgdmlzaXRDaGlsZHJlbjogZnVuY3Rpb24gKGNoaWxkcmVuLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRBcnJheShjaGlsZHJlbiwgLi4uYXJncyk7XG4gIH0sXG4gIC8vIFRyYW5zZm9ybSB0aGUgYC5hdHRyc2AgcHJvcGVydHkgb2YgYSB0YWcsIHdoaWNoIG1heSBiZSBhIGRpY3Rpb25hcnksXG4gIC8vIGFuIGFycmF5LCBvciBpbiBzb21lIHVzZXMsIGEgZm9yZWlnbiBvYmplY3QgKHN1Y2ggYXNcbiAgLy8gYSB0ZW1wbGF0ZSB0YWcpLlxuICB2aXNpdEF0dHJpYnV0ZXM6IGZ1bmN0aW9uIChhdHRycywgLi4uYXJncykge1xuICAgIGlmIChpc0FycmF5KGF0dHJzKSkge1xuICAgICAgdmFyIHJlc3VsdCA9IGF0dHJzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb2xkSXRlbSA9IGF0dHJzW2ldO1xuICAgICAgICB2YXIgbmV3SXRlbSA9IHRoaXMudmlzaXRBdHRyaWJ1dGVzKG9sZEl0ZW0sIC4uLmFyZ3MpO1xuICAgICAgICBpZiAobmV3SXRlbSAhPT0gb2xkSXRlbSkge1xuICAgICAgICAgIC8vIGNvcHkgb24gd3JpdGVcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBhdHRycylcbiAgICAgICAgICAgIHJlc3VsdCA9IGF0dHJzLnNsaWNlKCk7XG4gICAgICAgICAgcmVzdWx0W2ldID0gbmV3SXRlbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoYXR0cnMgJiYgaXNDb25zdHJ1Y3RlZE9iamVjdChhdHRycykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBiYXNpYyBUcmFuc2Zvcm1pbmdWaXNpdG9yIGRvZXMgbm90IHN1cHBvcnQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiZm9yZWlnbiBvYmplY3RzIGluIGF0dHJpYnV0ZXMuICBEZWZpbmUgYSBjdXN0b20gXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwidmlzaXRBdHRyaWJ1dGVzIGZvciB0aGlzIGNhc2UuXCIpO1xuICAgIH1cblxuICAgIHZhciBvbGRBdHRycyA9IGF0dHJzO1xuICAgIHZhciBuZXdBdHRycyA9IG9sZEF0dHJzO1xuICAgIGlmIChvbGRBdHRycykge1xuICAgICAgdmFyIGF0dHJBcmdzID0gW251bGwsIG51bGxdO1xuICAgICAgYXR0ckFyZ3MucHVzaC5hcHBseShhdHRyQXJncywgYXJndW1lbnRzKTtcbiAgICAgIGZvciAodmFyIGsgaW4gb2xkQXR0cnMpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gb2xkQXR0cnNba107XG4gICAgICAgIGF0dHJBcmdzWzBdID0gaztcbiAgICAgICAgYXR0ckFyZ3NbMV0gPSBvbGRWYWx1ZTtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52aXNpdEF0dHJpYnV0ZS5hcHBseSh0aGlzLCBhdHRyQXJncyk7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAvLyBjb3B5IG9uIHdyaXRlXG4gICAgICAgICAgaWYgKG5ld0F0dHJzID09PSBvbGRBdHRycylcbiAgICAgICAgICAgIG5ld0F0dHJzID0gX2Fzc2lnbih7fSwgb2xkQXR0cnMpO1xuICAgICAgICAgIG5ld0F0dHJzW2tdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3QXR0cnM7XG4gIH0sXG4gIC8vIFRyYW5zZm9ybSB0aGUgdmFsdWUgb2Ygb25lIGF0dHJpYnV0ZSBuYW1lL3ZhbHVlIGluIGFuXG4gIC8vIGF0dHJpYnV0ZXMgZGljdGlvbmFyeS5cbiAgdmlzaXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgdGFnLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXQodmFsdWUsIC4uLmFyZ3MpO1xuICB9XG59KTtcblxuXG5leHBvcnQgY29uc3QgVG9UZXh0VmlzaXRvciA9IFZpc2l0b3IuZXh0ZW5kKCk7XG5Ub1RleHRWaXNpdG9yLmRlZih7XG4gIHZpc2l0TnVsbDogZnVuY3Rpb24gKG51bGxPclVuZGVmaW5lZCkge1xuICAgIHJldHVybiAnJztcbiAgfSxcbiAgdmlzaXRQcmltaXRpdmU6IGZ1bmN0aW9uIChzdHJpbmdCb29sZWFuT3JOdW1iZXIpIHtcbiAgICB2YXIgc3RyID0gU3RyaW5nKHN0cmluZ0Jvb2xlYW5Pck51bWJlcik7XG4gICAgaWYgKHRoaXMudGV4dE1vZGUgPT09IFRFWFRNT0RFLlJDREFUQSkge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudGV4dE1vZGUgPT09IFRFWFRNT0RFLkFUVFJJQlVURSkge1xuICAgICAgLy8gZXNjYXBlIGAmYCBhbmQgYFwiYCB0aGlzIHRpbWUsIG5vdCBgJmAgYW5kIGA8YFxuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH0sXG4gIHZpc2l0QXJyYXk6IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspXG4gICAgICBwYXJ0cy5wdXNoKHRoaXMudmlzaXQoYXJyYXlbaV0pKTtcbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gIH0sXG4gIHZpc2l0Q29tbWVudDogZnVuY3Rpb24gKGNvbW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBoYXZlIGEgY29tbWVudCBoZXJlXCIpO1xuICB9LFxuICB2aXNpdENoYXJSZWY6IGZ1bmN0aW9uIChjaGFyUmVmKSB7XG4gICAgaWYgKHRoaXMudGV4dE1vZGUgPT09IFRFWFRNT0RFLlJDREFUQSB8fFxuICAgICAgICB0aGlzLnRleHRNb2RlID09PSBURVhUTU9ERS5BVFRSSUJVVEUpIHtcbiAgICAgIHJldHVybiBjaGFyUmVmLmh0bWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGFyUmVmLnN0cjtcbiAgICB9XG4gIH0sXG4gIHZpc2l0UmF3OiBmdW5jdGlvbiAocmF3KSB7XG4gICAgcmV0dXJuIHJhdy52YWx1ZTtcbiAgfSxcbiAgdmlzaXRUYWc6IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAvLyBSZWFsbHkgd2Ugc2hvdWxkIGp1c3QgZGlzYWxsb3cgVGFncyBoZXJlLiAgSG93ZXZlciwgYXQgdGhlXG4gICAgLy8gbW9tZW50IGl0J3MgdXNlZnVsIHRvIHN0cmluZ2lmeSBhbnkgSFRNTCB3ZSBmaW5kLiAgSW5cbiAgICAvLyBwYXJ0aWN1bGFyLCB3aGVuIHlvdSBpbmNsdWRlIGEgdGVtcGxhdGUgd2l0aGluIGB7eyNtYXJrZG93bn19YCxcbiAgICAvLyB3ZSByZW5kZXIgdGhlIHRlbXBsYXRlIGFzIHRleHQsIGFuZCBzaW5jZSB0aGVyZSdzIGN1cnJlbnRseVxuICAgIC8vIG5vIHdheSB0byBtYWtlIHRoZSB0ZW1wbGF0ZSBiZSAqcGFyc2VkKiBhcyB0ZXh0IChlLmcuIGA8dGVtcGxhdGVcbiAgICAvLyB0eXBlPVwidGV4dFwiPmApLCB3ZSBoYWNraXNobHkgc3VwcG9ydCBIVE1MIHRhZ3MgaW4gbWFya2Rvd25cbiAgICAvLyBpbiB0ZW1wbGF0ZXMgYnkgcGFyc2luZyB0aGVtIGFuZCBzdHJpbmdpZnlpbmcgdGhlbS5cbiAgICByZXR1cm4gdGhpcy52aXNpdCh0aGlzLnRvSFRNTCh0YWcpKTtcbiAgfSxcbiAgdmlzaXRPYmplY3Q6IGZ1bmN0aW9uICh4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBvYmplY3QgaW4gaHRtbGpzIGluIHRvVGV4dDogXCIgKyB4KTtcbiAgfSxcbiAgdG9IVE1MOiBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiB0b0hUTUwobm9kZSk7XG4gIH1cbn0pO1xuXG5cblxuZXhwb3J0IGNvbnN0IFRvSFRNTFZpc2l0b3IgPSBWaXNpdG9yLmV4dGVuZCgpO1xuVG9IVE1MVmlzaXRvci5kZWYoe1xuICB2aXNpdE51bGw6IGZ1bmN0aW9uIChudWxsT3JVbmRlZmluZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH0sXG4gIHZpc2l0UHJpbWl0aXZlOiBmdW5jdGlvbiAoc3RyaW5nQm9vbGVhbk9yTnVtYmVyKSB7XG4gICAgdmFyIHN0ciA9IFN0cmluZyhzdHJpbmdCb29sZWFuT3JOdW1iZXIpO1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7Jyk7XG4gIH0sXG4gIHZpc2l0QXJyYXk6IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspXG4gICAgICBwYXJ0cy5wdXNoKHRoaXMudmlzaXQoYXJyYXlbaV0pKTtcbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gIH0sXG4gIHZpc2l0Q29tbWVudDogZnVuY3Rpb24gKGNvbW1lbnQpIHtcbiAgICByZXR1cm4gJzwhLS0nICsgY29tbWVudC5zYW5pdGl6ZWRWYWx1ZSArICctLT4nO1xuICB9LFxuICB2aXNpdENoYXJSZWY6IGZ1bmN0aW9uIChjaGFyUmVmKSB7XG4gICAgcmV0dXJuIGNoYXJSZWYuaHRtbDtcbiAgfSxcbiAgdmlzaXRSYXc6IGZ1bmN0aW9uIChyYXcpIHtcbiAgICByZXR1cm4gcmF3LnZhbHVlO1xuICB9LFxuICB2aXNpdFRhZzogZnVuY3Rpb24gKHRhZykge1xuICAgIHZhciBhdHRyU3RycyA9IFtdO1xuXG4gICAgdmFyIHRhZ05hbWUgPSB0YWcudGFnTmFtZTtcbiAgICB2YXIgY2hpbGRyZW4gPSB0YWcuY2hpbGRyZW47XG5cbiAgICB2YXIgYXR0cnMgPSB0YWcuYXR0cnM7XG4gICAgaWYgKGF0dHJzKSB7XG4gICAgICBhdHRycyA9IGZsYXR0ZW5BdHRyaWJ1dGVzKGF0dHJzKTtcbiAgICAgIGZvciAodmFyIGsgaW4gYXR0cnMpIHtcbiAgICAgICAgaWYgKGsgPT09ICd2YWx1ZScgJiYgdGFnTmFtZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgIGNoaWxkcmVuID0gW2F0dHJzW2tdLCBjaGlsZHJlbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHYgPSB0aGlzLnRvVGV4dChhdHRyc1trXSwgVEVYVE1PREUuQVRUUklCVVRFKTtcbiAgICAgICAgICBhdHRyU3Rycy5wdXNoKCcgJyArIGsgKyAnPVwiJyArIHYgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzdGFydFRhZyA9ICc8JyArIHRhZ05hbWUgKyBhdHRyU3Rycy5qb2luKCcnKSArICc+JztcblxuICAgIHZhciBjaGlsZFN0cnMgPSBbXTtcbiAgICB2YXIgY29udGVudDtcbiAgICBpZiAodGFnTmFtZSA9PT0gJ3RleHRhcmVhJykge1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKVxuICAgICAgICBjaGlsZFN0cnMucHVzaCh0aGlzLnRvVGV4dChjaGlsZHJlbltpXSwgVEVYVE1PREUuUkNEQVRBKSk7XG5cbiAgICAgIGNvbnRlbnQgPSBjaGlsZFN0cnMuam9pbignJyk7XG4gICAgICBpZiAoY29udGVudC5zbGljZSgwLCAxKSA9PT0gJ1xcbicpXG4gICAgICAgIC8vIFRFWFRBUkVBIHdpbGwgYWJzb3JiIGEgbmV3bGluZSwgc28gaWYgd2Ugc2VlIG9uZSwgYWRkXG4gICAgICAgIC8vIGFub3RoZXIgb25lLlxuICAgICAgICBjb250ZW50ID0gJ1xcbicgKyBjb250ZW50O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgIGNoaWxkU3Rycy5wdXNoKHRoaXMudmlzaXQoY2hpbGRyZW5baV0pKTtcblxuICAgICAgY29udGVudCA9IGNoaWxkU3Rycy5qb2luKCcnKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gc3RhcnRUYWcgKyBjb250ZW50O1xuXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCB8fCAhIGlzVm9pZEVsZW1lbnQodGFnTmFtZSkpIHtcbiAgICAgIC8vIFwiVm9pZFwiIGVsZW1lbnRzIGxpa2UgQlIgYXJlIHRoZSBvbmx5IG9uZXMgdGhhdCBkb24ndCBnZXQgYSBjbG9zZVxuICAgICAgLy8gdGFnIGluIEhUTUw1LiAgVGhleSBzaG91bGRuJ3QgaGF2ZSBjb250ZW50cywgZWl0aGVyLCBzbyB3ZSBjb3VsZFxuICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgdXBvbiBzZWVpbmcgY29udGVudHMgaGVyZS5cbiAgICAgIHJlc3VsdCArPSAnPC8nICsgdGFnTmFtZSArICc+JztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICB2aXNpdE9iamVjdDogZnVuY3Rpb24gKHgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIG9iamVjdCBpbiBodG1sanMgaW4gdG9IVE1MOiBcIiArIHgpO1xuICB9LFxuICB0b1RleHQ6IGZ1bmN0aW9uIChub2RlLCB0ZXh0TW9kZSkge1xuICAgIHJldHVybiB0b1RleHQobm9kZSwgdGV4dE1vZGUpO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBUT0hUTUxcblxuZXhwb3J0IGZ1bmN0aW9uIHRvSFRNTChjb250ZW50KSB7XG4gIHJldHVybiAobmV3IFRvSFRNTFZpc2l0b3IpLnZpc2l0KGNvbnRlbnQpO1xufVxuXG4vLyBFc2NhcGluZyBtb2RlcyBmb3Igb3V0cHV0dGluZyB0ZXh0IHdoZW4gZ2VuZXJhdGluZyBIVE1MLlxuZXhwb3J0IGNvbnN0IFRFWFRNT0RFID0ge1xuICBTVFJJTkc6IDEsXG4gIFJDREFUQTogMixcbiAgQVRUUklCVVRFOiAzXG59O1xuXG5cbmV4cG9ydCBmdW5jdGlvbiB0b1RleHQoY29udGVudCwgdGV4dE1vZGUpIHtcbiAgaWYgKCEgdGV4dE1vZGUpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidGV4dE1vZGUgcmVxdWlyZWQgZm9yIEhUTUwudG9UZXh0XCIpO1xuICBpZiAoISAodGV4dE1vZGUgPT09IFRFWFRNT0RFLlNUUklORyB8fFxuICAgICAgICAgdGV4dE1vZGUgPT09IFRFWFRNT0RFLlJDREFUQSB8fFxuICAgICAgICAgdGV4dE1vZGUgPT09IFRFWFRNT0RFLkFUVFJJQlVURSkpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0ZXh0TW9kZTogXCIgKyB0ZXh0TW9kZSk7XG5cbiAgdmFyIHZpc2l0b3IgPSBuZXcgVG9UZXh0VmlzaXRvcih7dGV4dE1vZGU6IHRleHRNb2RlfSk7XG4gIHJldHVybiB2aXNpdG9yLnZpc2l0KGNvbnRlbnQpO1xufVxuIl19
