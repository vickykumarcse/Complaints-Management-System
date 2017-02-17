/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/**
 * jQuery Masonry v2.1.08
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */

/*jshint browser: true, curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true */
/*global jQuery: false */


(function( window, $, undefined ){

  'use strict';

  /*
   * smartresize: debounced resize event for jQuery
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery.smartresize.js
   *
   * Copyright 2011 @louis_remi
   * Licensed under the MIT license.
   */

  var $event = $.event,
      resizeTimeout;

  $event.special.smartresize = {
    setup: function() {
      $(this).bind( "resize", $event.special.smartresize.handler );
    },
    teardown: function() {
      $(this).unbind( "resize", $event.special.smartresize.handler );
    },
    handler: function( event, execAsap ) {
      // Save the context
      var context = this,
          args = arguments;

      // set correct event type
      event.type = "smartresize";

      if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
      resizeTimeout = setTimeout(function() {
        $event.dispatch.apply( context, args );

      }, execAsap === "execAsap"? 0 : 100 );
    }
  };

  $.fn.smartresize = function( fn ) {
    return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
  };



// ========================= Masonry ===============================


  // our "Widget" object constructor
  $.Mason = function( options, element ){
    this.element = $( element );

    this._create( options );
    this._init();
  };

  $.Mason.settings = {
    isResizable: true,
    isAnimated: false,
    animationOptions: {
      queue: false,
      duration: 500
    },
    gutterWidth: 0,
    isRTL: false,
    isFitWidth: false,
    containerStyle: {
      position: 'relative'
    }
  };

  $.Mason.prototype = {

    _filterFindBricks: function( $elems ) {
      var selector = this.options.itemSelector;
      // if there is a selector
      // filter/find appropriate item elements
      return !selector ? $elems : $elems.filter( selector ).add( $elems.find( selector ) );
    },

    _getBricks: function( $elems ) {
      var $bricks = this._filterFindBricks( $elems )
        .css({ position: 'absolute' })
        .addClass('masonry-brick');
      return $bricks;
    },
    
    // sets up widget
    _create : function( options ) {
      
      this.options = $.extend( true, {}, $.Mason.settings, options );
      this.styleQueue = [];

      // get original styles in case we re-apply them in .destroy()
      var elemStyle = this.element[0].style;
      this.originalStyle = {
        // get height
        height: elemStyle.height || ''
      };
      // get other styles that will be overwritten
      var containerStyle = this.options.containerStyle;
      for ( var prop in containerStyle ) {
        this.originalStyle[ prop ] = elemStyle[ prop ] || '';
      }

      this.element.css( containerStyle );

      this.horizontalDirection = this.options.isRTL ? 'right' : 'left';

      var x = this.element.css( 'padding-' + this.horizontalDirection );
      var y = this.element.css( 'padding-top' );
      this.offset = {
        x: x ? parseInt( x, 10 ) : 0,
        y: y ? parseInt( y, 10 ) : 0
      };
      
      this.isFluid = this.options.columnWidth && typeof this.options.columnWidth === 'function';

      // add masonry class first time around
      var instance = this;
      setTimeout( function() {
        instance.element.addClass('masonry');
      }, 0 );
      
      // bind resize method
      if ( this.options.isResizable ) {
        $(window).bind( 'smartresize.masonry', function() { 
          instance.resize();
        });
      }


      // need to get bricks
      this.reloadItems();

    },
  
    // _init fires when instance is first created
    // and when instance is triggered again -> $el.masonry();
    _init : function( callback ) {
      this._getColumns();
      this._reLayout( callback );
    },

    option: function( key, value ){
      // set options AFTER initialization:
      // signature: $('#foo').bar({ cool:false });
      if ( $.isPlainObject( key ) ){
        this.options = $.extend(true, this.options, key);
      } 
    },
    
    // ====================== General Layout ======================

    // used on collection of atoms (should be filtered, and sorted before )
    // accepts atoms-to-be-laid-out to start with
    layout : function( $bricks, callback ) {

      // place each brick
      for (var i=0, len = $bricks.length; i < len; i++) {
        this._placeBrick( $bricks[i] );
      }
      
      // set the size of the container
      var containerSize = {};
      containerSize.height = Math.max.apply( Math, this.colYs );
      if ( this.options.isFitWidth ) {
        var unusedCols = 0;
        i = this.cols;
        // count unused columns
        while ( --i ) {
          if ( this.colYs[i] !== 0 ) {
            break;
          }
          unusedCols++;
        }
        // fit container to columns that have been used;
        containerSize.width = (this.cols - unusedCols) * this.columnWidth - this.options.gutterWidth;
      }
      this.styleQueue.push({ $el: this.element, style: containerSize });

      // are we animating the layout arrangement?
      // use plugin-ish syntax for css or animate
      var styleFn = !this.isLaidOut ? 'css' : (
            this.options.isAnimated ? 'animate' : 'css'
          ),
          animOpts = this.options.animationOptions;

      // process styleQueue
      var obj;
      for (i=0, len = this.styleQueue.length; i < len; i++) {
        obj = this.styleQueue[i];
        obj.$el[ styleFn ]( obj.style, animOpts );
      }

      // clear out queue for next time
      this.styleQueue = [];

      // provide $elems as context for the callback
      if ( callback ) {
        callback.call( $bricks );
      }
      
      this.isLaidOut = true;
    },
    
    // calculates number of columns
    // i.e. this.columnWidth = 200
    _getColumns : function() {
      var container = this.options.isFitWidth ? this.element.parent() : this.element,
          containerWidth = container.width();

                         // use fluid columnWidth function if there
      this.columnWidth = this.isFluid ? this.options.columnWidth( containerWidth ) :
                    // if not, how about the explicitly set option?
                    this.options.columnWidth ||
                    // or use the size of the first item
                    this.$bricks.outerWidth(true) ||
                    // if there's no items, use size of container
                    containerWidth;

      this.columnWidth += this.options.gutterWidth;

      this.cols = Math.floor( ( containerWidth + this.options.gutterWidth ) / this.columnWidth );
      this.cols = Math.max( this.cols, 1 );

    },

    // layout logic
    _placeBrick: function( brick ) {
      var $brick = $(brick),
          colSpan, groupCount, groupY, groupColY, j;

      //how many columns does this brick span
      colSpan = Math.ceil( $brick.outerWidth(true) / this.columnWidth );
      colSpan = Math.min( colSpan, this.cols );

      if ( colSpan === 1 ) {
        // if brick spans only one column, just like singleMode
        groupY = this.colYs;
      } else {
        // brick spans more than one column
        // how many different places could this brick fit horizontally
        groupCount = this.cols + 1 - colSpan;
        groupY = [];

        // for each group potential horizontal position
        for ( j=0; j < groupCount; j++ ) {
          // make an array of colY values for that one group
          groupColY = this.colYs.slice( j, j+colSpan );
          // and get the max value of the array
          groupY[j] = Math.max.apply( Math, groupColY );
        }

      }

      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, groupY ),
          shortCol = 0;
      
      // Find index of short column, the first from the left
      for (var i=0, len = groupY.length; i < len; i++) {
        if ( groupY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }

      // position the brick
      var position = {
        top: minimumY + this.offset.y
      };
      // position.left or position.right
      position[ this.horizontalDirection ] = this.columnWidth * shortCol + this.offset.x;
      this.styleQueue.push({ $el: $brick, style: position });

      // apply setHeight to necessary columns
      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.colYs[ shortCol + i ] = setHeight;
      }

    },
    
    
    resize: function() {
      var prevColCount = this.cols;
      // get updated colCount
      this._getColumns();
      if ( this.isFluid || this.cols !== prevColCount ) {
        // if column count has changed, trigger new layout
        this._reLayout();
      }
    },
    
    
    _reLayout : function( callback ) {
      // reset columns
      var i = this.cols;
      this.colYs = [];
      while (i--) {
        this.colYs.push( 0 );
      }
      // apply layout logic to all bricks
      this.layout( this.$bricks, callback );
    },
    
    // ====================== Convenience methods ======================
    
    // goes through all children again and gets bricks in proper order
    reloadItems : function() {
      this.$bricks = this._getBricks( this.element.children() );
    },
    
    
    reload : function( callback ) {
      this.reloadItems();
      this._init( callback );
    },
    

    // convienence method for working with Infinite Scroll
    appended : function( $content, isAnimatedFromBottom, callback ) {
      if ( isAnimatedFromBottom ) {
        // set new stuff to the bottom
        this._filterFindBricks( $content ).css({ top: this.element.height() });
        var instance = this;
        setTimeout( function(){
          instance._appended( $content, callback );
        }, 1 );
      } else {
        this._appended( $content, callback );
      }
    },
    
    _appended : function( $content, callback ) {
      var $newBricks = this._getBricks( $content );
      // add new bricks to brick pool
      this.$bricks = this.$bricks.add( $newBricks );
      this.layout( $newBricks, callback );
    },
    
    // removes elements from Masonry widget
    remove : function( $content ) {
      this.$bricks = this.$bricks.not( $content );
      $content.remove();
    },
    
    // destroys widget, returns elements and container back (close) to original style
    destroy : function() {

      this.$bricks
        .removeClass('masonry-brick')
        .each(function(){
          this.style.position = '';
          this.style.top = '';
          this.style.left = '';
        });
      
      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var prop in this.originalStyle ) {
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }

      this.element
        .unbind('.masonry')
        .removeClass('masonry')
        .removeData('masonry');
      
      $(window).unbind('.masonry');

    }
    
  };
  
  
  // ======================= imagesLoaded Plugin ===============================
  /*!
   * jQuery imagesLoaded plugin v1.1.0
   * http://github.com/desandro/imagesloaded
   *
   * MIT License. by Paul Irish et al.
   */


  // $('#my-container').imagesLoaded(myFunction)
  // or
  // $('img').imagesLoaded(myFunction)

  // execute a callback when all images have loaded.
  // needed because .load() doesn't work on cached images

  // callback function gets image collection as argument
  //  `this` is the container

  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };


  // helper function for logging errors
  // $.error breaks jQuery chaining
  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };
  
  // =======================  Plugin bridge  ===============================
  // leverages data method to either create or return $.Mason constructor
  // A bit from jQuery UI
  //   https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js
  // A bit from jcarousel 
  //   https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

  $.fn.masonry = function( options ) {
    if ( typeof options === 'string' ) {
      // call method
      var args = Array.prototype.slice.call( arguments, 1 );

      this.each(function(){
        var instance = $.data( this, 'masonry' );
        if ( !instance ) {
          logError( "cannot call methods on masonry prior to initialization; " +
            "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for masonry instance" );
          return;
        }
        // apply method
        instance[ options ].apply( instance, args );
      });
    } else {
      this.each(function() {
        var instance = $.data( this, 'masonry' );
        if ( instance ) {
          // apply options & init
          instance.option( options || {} );
          instance._init();
        } else {
          // initialize new instance
          $.data( this, 'masonry', new $.Mason( options, this ) );
        }
      });
    }
    return this;
  };

})( window, jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(this);

  var ActionCable = this.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            throw new Error("Existing connection must be closed before opening");
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error, error1;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {
  $(function() {
    return $('#complains').imagesLoaded(function() {
      return $('#complains').masonry({
        itemSelector: '.box',
        isFitWidth: true
      });
    });
  });

}).call(this);
var lock = new Auth0Lock('CRdqay4hYX0j7jqfIUe5s1yex6KaaENX', 'nikita-rails.auth0.com', {
    auth: {
      redirectUrl: 'http://localhost:3000/auth/auth0/callback',
      responseType: 'code',
      params: {
        scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  });
function signin() {
 	lock.show();
}
;
/*!
 * lock.min.js v10.9.1
 * 
 * Author: Auth0 <support@auth0.com> (http://auth0.com)
 * Date: 1/10/2017, 3:12:29 PM
 * License: MIT
 * 
 */

!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}(function(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))switch(typeof t[e]){case"function":break;case"object":t[e]=function(e){var n=e.slice(1),o=t[e[0]];return function(t,e,r){o.apply(this,[t,e,r].concat(n))}}(t[e]);break;default:t[e]=t[t[e]]}return t}([function(t,e,n){(function(t){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}var o=n(154),r=e(o);"function"==typeof t.window.define&&t.window.define.amd?t.window.define("auth0Lock",function(){return r.default}):t.window&&(t.window.Auth0Lock=r.default)}).call(e,function(){return this}())},function(t,e,n){"use strict";t.exports=n(21)},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,o,r,i){var a=wt(t,st.default.fromJS({clientBaseUrl:b(o,n),tenantBaseUrl:T(o,n),languageBaseUrl:C(o,n),auth:v(o),clientID:e,domain:n,emitEventFn:i,hookRunner:r,useTenantInfo:o.__useTenantInfo||!1,oidcConformant:o.oidcConformant||!1,hashCleanup:o.hashCleanup!==!1,allowedConnections:st.default.fromJS(o.allowedConnections||[]),ui:L(t,o),defaultADUsernameFromEmailPrefix:o.defaultADUsernameFromEmailPrefix!==!1}));return a=Mt.initI18n(a)}function a(t){return t.get("id")}function u(t){return jt(t,"clientID")}function s(t){return jt(t,"domain")}function c(t){return jt(t,"clientBaseUrl")}function l(t){return jt(t,"tenantBaseUrl")}function p(t){return jt(t,"useTenantInfo")}function d(t){return jt(t,"oidcConformant")}function M(t){return jt(t,"languageBaseUrl")}function f(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return t=bt(t,"submitting",e),t=I(t),t=n&&!e?h(t,n):N(t)}function g(t){return zt(t,"submitting",!1)}function h(t,e){return bt(t,"globalError",e)}function y(t){return zt(t,"globalError","")}function N(t){return Tt(t,"globalError")}function m(t,e){return bt(t,"globalSuccess",e)}function D(t){return zt(t,"globalSuccess","")}function I(t){return Tt(t,"globalSuccess")}function j(t){return zt(t,"render",!1)}function w(t){return Tt(t,"render")}function L(t,e){var n=!e.container&&(void 0===e.closable||!!e.closable),o=e.theme||{},r=o.labeledSubmitButton,i=o.logo,a=o.primaryColor,u=o.authButtons,s=null!==e.avatar,c=e.avatar&&"function"==typeof e.avatar.url&&"function"==typeof e.avatar.displayName&&e.avatar,l=c||yt;return new st.default.fromJS({containerID:e.container||"auth0-lock-container-"+t,appendContainer:!e.container,autoclose:void 0!==e.autoclose&&(n&&e.autoclose),autofocus:void 0===e.autofocus?!(e.container||(0,ct.isSmallScreen)()):!!e.autofocus,avatar:s,avatarProvider:l,logo:"string"==typeof i?i:void 0,closable:n,labeledSubmitButton:void 0===r||!!r,language:void 0===e.language?"en":(0,gt.default)(e.language||"").toLowerCase(),dict:"object"===rt(e.languageDictionary)?e.languageDictionary:{},disableWarnings:void 0!==e.disableWarnings&&!!e.disableWarnings,mobile:void 0!==e.mobile&&!!e.mobile,popupOptions:void 0===e.popupOptions?{}:e.popupOptions,primaryColor:"string"==typeof a?a:void 0,rememberLastLogin:void 0===e.rememberLastLogin||!!e.rememberLastLogin,authButtonsTheme:"object"===("undefined"==typeof u?"undefined":rt(u))?u:{}})}function v(t){var e=t.auth||{},n=e.audience,o=e.connectionScopes,r=e.params,i=e.redirect,a=e.redirectUrl,u=e.responseMode,s=e.responseType,c=e.sso,l=e.state,p=e.nonce,d=t.oidcConformant;if(n="string"==typeof n?n:void 0,o="object"===("undefined"==typeof o?"undefined":rt(o))?o:{},r="object"===("undefined"==typeof r?"undefined":rt(r))?r:{},a="string"==typeof a&&a?a:null,i="boolean"!=typeof i||i,u="string"==typeof u?u:void 0,l="string"==typeof l?l:void 0,p="string"==typeof p?p:void 0,s="string"==typeof s?s:a?"code":"token",a=a||window.location.href,c="boolean"!=typeof c||c,"openid profile"===(0,gt.default)(r.scope||"")&&O(t,"Usage of scope 'openid profile' is not recommended. See https://auth0.com/docs/scopes for more details."),d&&!i&&s.indexOf("id_token")>-1)throw new Error("It is not posible to request an 'id_token' while using popup mode.");return d||r.scope||(r.scope="openid"),st.default.fromJS({audience:n,connectionScopes:o,params:r,redirect:i,redirectUrl:a,responseMode:u,responseType:s,sso:c,state:l,nonce:p})}function z(t,e){return st.default.fromJS(e).merge(jt(t,"auth")).toJS()}function b(t,e){if(t.clientBaseUrl&&"string"==typeof t.clientBaseUrl)return t.clientBaseUrl;if(t.configurationBaseUrl&&"string"==typeof t.configurationBaseUrl)return t.configurationBaseUrl;if(t.assetsUrl&&"string"==typeof t.assetsUrl)return t.assetsUrl;var n="https://"+e,o=(0,pt.parseUrl)(n).hostname,r=".auth0.com",i="https://cdn.auth0.com";if((0,lt.endsWith)(o,r)){var a=o.split(".");return a.length>3?"https://cdn."+a[a.length-3]+r:i}return n}function T(t,e){if(t.configurationBaseUrl&&"string"==typeof t.configurationBaseUrl)return(0,at.default)(t.configurationBaseUrl,"info-v1.js");if(t.assetsUrl&&"string"==typeof t.assetsUrl)return t.assetsUrl;var e,n="https://"+e,o=(0,pt.parseUrl)(n).hostname,r=".auth0.com",i="https://cdn.auth0.com",a=o.split("."),u=a[0];return(0,lt.endsWith)(o,r)?(e=a.length>3?"https://cdn."+a[a.length-3]+r:i,(0,at.default)(e,"tenants","v1",u+".js")):(0,at.default)(n,"info-v1.js")}function C(t,e){return t.languageBaseUrl&&"string"==typeof t.languageBaseUrl?t.languageBaseUrl:t.assetsUrl&&"string"==typeof t.assetsUrl?t.assetsUrl:"https://cdn.auth0.com"}function E(t){return bt(t,"render",!0)}function k(t,e){return bt(t,"loggedIn",e)}function S(t){return zt(t,"loggedIn",!1)}function x(t){return jt(t,"defaultADUsernameFromEmailPrefix",!0)}function O(t,e){var n=ut.Map.isMap(t)?!_t.disableWarnings(t):!t.disableWarnings;n&&console&&console.warn&&console.warn(e)}function A(t,e){var n=ut.Map.isMap(t)?!_t.disableWarnings(t):!t.disableWarnings;n&&console&&console.error&&console.error(e)}function _(t){return zt(t,"allowedConnections")||jt(t,"allowedConnections")}function U(t){for(var e=arguments.length,n=Array(e>2?e-2:0),o=2;o<e;o++)n[o-2]=arguments[o];var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;if(1===arguments.length)return zt(t,"connections",(0,ut.Map)()).filter(function(t,e){return"unknown"!==e}).valueSeq().flatten(!0);var i=zt(t,["connections",r],(0,ut.List)());return n.length>0?i.filter(function(t){return~n.indexOf(t.get("strategy"))}):i}function Y(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return U.apply(void 0,[t,e].concat(o)).get(0)}function Q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=U(t);return 1===n.count()&&(!e||n.getIn([0,"type"])===e)}function P(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=U(t).count(),o=arguments.length,r=Array(o>2?o-2:0),i=2;i<o;i++)r[i-2]=arguments[i];var a=U.apply(void 0,[t,e].concat(r)).count();return n>0&&n===a}function B(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return R.apply(void 0,[t,e].concat(o))>0}function R(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return U.apply(void 0,[t,e].concat(o)).count()}function G(t,e){return U(t).find(function(t){return t.get("name")===e})}function Z(t,e){return!!G(t,e)}function W(t){var e=_(t),n=0===e.count()?function(t){return 0}:function(t){return e.indexOf(t.get("name"))};return bt(t,"connections",(0,Dt.clientConnections)(t).map(function(t){return t.filter(function(t){return n(t)>=0}).sort(function(t,e){return n(t)-n(e)})}))}function H(t,e){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return jt(t,"hookRunner").apply(void 0,[e,t].concat(o))}function V(t,e){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];setTimeout(function(){var n=jt(t,"emitEventFn"),r=n.apply(void 0,[e].concat(o));if("unrecoverable_error"===e&&!r)throw new(Function.prototype.bind.apply(Error,[null].concat(o)))},0)}function F(t,e,n){if(0===e.status)return Mt.str(t,["error","login","lock.network"]);if("rule_error"===e.code)return e.description||Mt.str(t,["error","login","lock.fallback"]);var o={code:"lock.invalid_code",email:"lock.invalid_email_password",username:"lock.invalid_username_password"},r=e.error||e.code;return"invalid_user_password"===r&&o[n]&&(r=o[n]),"a0.mfa_registration_required"===r&&(r="lock.mfa_registration_required"),"a0.mfa_invalid_code"===r&&(r="lock.mfa_invalid_code"),Mt.str(t,["error","login",r])||Mt.str(t,["error","login","lock.fallback"])}function J(t,e){return e&&setTimeout(function(){return V(t,"unrecoverable_error",e)},17),vt(t,"stopped",!0)}function q(t){return jt(t,"stopped")}function X(t){return jt(t,"hashCleanup")}function K(t,e){V(t,"hash_parsed",e)}function $(t,e){V(t,"authenticated",e)}function tt(t,e){V(t,"authorization_error",e)}function et(t,e){V(t,"unrecoverable_error",e)}function nt(t){return(0,Dt.hasFreeSubscription)(t)||!1}function ot(t,e){if(e||(e={}),e.allowedConnections&&(t=bt(t,"allowedConnections",st.default.fromJS(e.allowedConnections))),e.socialButtonStyle){var n=(0,mt.processSocialOptions)(e);t=Et(t,"socialButtonStyle",n.socialButtonStyle)}if(e.flashMessage){var o="success"===e.flashMessage.type?"globalSuccess":"globalError";t=bt(t,o,e.flashMessage.text)}return e.auth&&e.auth.params&&(t=bt(t,"authParams",st.default.fromJS(e.auth.params))),e.theme&&(e.theme.primaryColor&&(t=bt(t,["ui","primaryColor"],e.theme.primaryColor)),e.theme.logo&&(t=bt(t,["ui","logo"],e.theme.logo))),(e.language||e.languageDictionary)&&(e.language&&(t=bt(t,["ui","language"],e.language)),e.languageDictionary&&(t=bt(t,["ui","dict"],e.languageDictionary)),t=Mt.initI18n(t)),"boolean"==typeof e.rememberLastLogin&&(t=bt(t,"rememberLastLogin",e.rememberLastLogin)),t}e.__esModule=!0,e.reset=e.auth=e.ui=void 0;var rt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.setup=i,e.id=a,e.clientID=u,e.domain=s,e.clientBaseUrl=c,e.tenantBaseUrl=l,e.useTenantInfo=p,e.oidcConformant=d,e.languageBaseUrl=M,e.setSubmitting=f,e.submitting=g,e.setGlobalError=h,e.globalError=y,e.clearGlobalError=N,e.setGlobalSuccess=m,e.globalSuccess=D,e.clearGlobalSuccess=I,e.rendering=j,e.stopRendering=w,e.withAuthOptions=z,e.extractTenantBaseUrlOption=T,e.render=E,e.setLoggedIn=k,e.loggedIn=S,e.defaultADUsernameFromEmailPrefix=x,e.warn=O,e.error=A,e.allowedConnections=_,e.connections=U,e.connection=Y,e.hasOneConnection=Q,e.hasOnlyConnections=P,e.hasSomeConnections=B,e.countConnections=R,e.findConnection=G,e.hasConnection=Z,e.filterConnections=W,e.runHook=H,e.emitEvent=V,e.loginErrorMessage=F,e.stop=J,e.hasStopped=q,e.hashCleanup=X,e.emitHashParsedEvent=K,e.emitAuthenticatedEvent=$,e.emitAuthorizationErrorEvent=tt,e.emitUnrecoverableErrorEvent=et,e.showBadge=nt,e.overrideOptions=ot;var it=n(24),at=r(it),ut=n(9),st=r(ut),ct=n(159),lt=n(101),pt=n(355),dt=n(13),Mt=o(dt),ft=n(32),gt=r(ft),ht=n(306),yt=o(ht),Nt=n(18),mt=n(42),Dt=n(148),It=(0,Nt.dataFns)(["core"]),jt=It.get,wt=It.init,Lt=(It.remove,It.reset),vt=It.set,zt=It.tget,bt=It.tset,Tt=It.tremove,Ct=(0,Nt.dataFns)(["social"]),Et=Ct.tset,kt=(0,Nt.dataFns)(["core","ui"]),St=kt.get,xt=(kt.set,(0,Nt.dataFns)(["core","transient","ui"])),Ot=xt.get,At=(xt.set,function(t,e){return Ot(t,e)||St(t,e)}),_t=e.ui={containerID:function(t){return At(t,"containerID")},appendContainer:function(t){return At(t,"appendContainer")},autoclose:function(t){return At(t,"autoclose")},autofocus:function(t){return At(t,"autofocus")},avatar:function(t){return At(t,"avatar")},avatarProvider:function(t){return At(t,"avatarProvider")},closable:function(t){return At(t,"closable")},dict:function(t){return At(t,"dict")},disableWarnings:function(t){return At(t,"disableWarnings")},labeledSubmitButton:function(t){return At(t,"labeledSubmitButton")},language:function(t){return At(t,"language")},logo:function(t){return At(t,"logo")},mobile:function(t){return At(t,"mobile")},popupOptions:function(t){return At(t,"popupOptions")},primaryColor:function(t){return At(t,"primaryColor")},authButtonsTheme:function(t){return At(t,"authButtonsTheme")},rememberLastLogin:function(t){return zt(t,"rememberLastLogin",At(t,"rememberLastLogin"))}},Ut=(0,Nt.dataFns)(["core","auth"]),Yt=Ut.get;e.auth={connectionScopes:function(t){return Yt(t,"connectionScopes")},params:function(t){return zt(t,"authParams")||Yt(t,"params")},redirect:function(t){return Yt(t,"redirect")},redirectUrl:function(t){return Yt(t,"redirectUrl")},responseType:function(t){return Yt(t,"responseType")},sso:function(t){return Yt(t,"sso")}};e.reset=Lt},function(t,e,n){"use strict";function o(t,e,n,o,i,a,u,s){if(r(e),!t){var c;if(void 0===e)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,o,i,a,u,s],p=0;c=new Error(e.replace(/%s/g,function(){return l[p++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var r=function(t){};t.exports=o},function(t,e){"use strict";function n(t){for(var e=arguments.length-1,n="Minified React error #"+t+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+t,o=0;o<e;o++)n+="&args[]="+encodeURIComponent(arguments[o+1]);n+=" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";var r=new Error(n);throw r.name="Invariant Violation",r.framesToPop=1,r}t.exports=n},[361,20],function(t,e,n){"use strict";function o(t,e){return 1===t.nodeType&&t.getAttribute(f)===String(e)||8===t.nodeType&&t.nodeValue===" react-text: "+e+" "||8===t.nodeType&&t.nodeValue===" react-empty: "+e+" "}function r(t){for(var e;e=t._renderedComponent;)t=e;return t}function i(t,e){var n=r(t);n._hostNode=e,e[h]=n}function a(t){var e=t._hostNode;e&&(delete e[h],t._hostNode=null)}function u(t,e){if(!(t._flags&g.hasCachedChildNodes)){var n=t._renderedChildren,a=e.firstChild;t:for(var u in n)if(n.hasOwnProperty(u)){var s=n[u],c=r(s)._domID;if(0!==c){for(;null!==a;a=a.nextSibling)if(o(a,c)){i(s,a);continue t}p("32",c)}}t._flags|=g.hasCachedChildNodes}}function s(t){if(t[h])return t[h];for(var e=[];!t[h];){if(e.push(t),!t.parentNode)return null;t=t.parentNode}for(var n,o;t&&(o=t[h]);t=e.pop())n=o,e.length&&u(o,t);return n}function c(t){var e=s(t);return null!=e&&e._hostNode===t?e:null}function l(t){if(void 0===t._hostNode?p("33"):void 0,t._hostNode)return t._hostNode;for(var e=[];!t._hostNode;)e.push(t),t._hostParent?void 0:p("34"),t=t._hostParent;for(;e.length;t=e.pop())u(t,t._hostNode);return t._hostNode}var p=n(4),d=n(36),M=n(116),f=(n(3),d.ID_ATTRIBUTE_NAME),g=M,h="__reactInternalInstance$"+Math.random().toString(36).slice(2),y={getClosestInstanceFromNode:s,getInstanceFromNode:c,getNodeFromInstance:l,precacheChildNodes:u,precacheNode:i,uncacheNode:a};t.exports=y},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n){for(var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(t){return(0,S.default)(t).length>0},r=t.getIn(["field",e,"value"]),i=t.getIn(["field",e,"showInvalid"],!1),u=arguments.length,s=Array(u>4?u-4:0),c=4;c<u;c++)s[c-4]=arguments[c];var l=a.apply(void 0,[o,n].concat(s));return t.mergeIn(["field",e],l,(0,E.Map)({value:n,showInvalid:i&&r===n}))}function a(t,e){if("function"!=typeof t)return(0,E.Map)({valid:!0});for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];var i=t.apply(void 0,[e].concat(o));return i&&"object"===("undefined"==typeof i?"undefined":b(i))?(0,E.Map)({valid:i.valid,invalidHint:i.hint}):(0,E.Map)({valid:!!i})}function u(t,e,n,o){var r=!0,i=!o,a=void 0;if(n.forEach(function(t){r=r&&t.get("label")&&"string"==typeof t.get("label")&&t.get("value")&&"string"==typeof t.get("value"),i||t.get("value")!==o||(a=t,i=!0)}),!r||!n.size){var u=new Error('The options provided for the "'+e+'" field are invalid, they must have the following format: {label: "non-empty string", value: "non-empty string"} and there has to be at least one option.');return u.code="invalid_select_field",_.stop(t,u)}return a||(a=(0,E.Map)({})),t.mergeIn(["field",e],a,(0,E.Map)({options:n,showInvalid:!1,valid:!a.isEmpty()}))}function s(t,e,n){return t.mergeIn(["field",e],n.merge((0,E.Map)({valid:!0,showInvalid:!1})))}function c(t,e){return t.getIn(["field",e,"valid"])}function l(t,e){return t.getIn(["field",e,"invalidHint"],"")}function p(t,e){return t.getIn(["field",e,"showInvalid"],!1)&&!t.getIn(["field",e,"valid"])}function d(t,e){return t.setIn(["field",e,"showInvalid"],!c(t,e))}function M(t){return t.update("field",function(t){return t&&t.map(function(t){return t.set("showInvalid",!1)})})}function f(t,e,n){return t.setIn(["field",e,"showInvalid"],n)}function g(t,e){var n=void 0;return n=e&&0!==e.length?e.map(function(t){return["field",t]}):["field"],n.reduce(function(t,e){return t.removeIn(e)},t)}function h(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new E.Map({});return t.getIn(["field",e],n)}function y(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return h(t,e).get("value",n)}function N(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return h(t,e).get("label",n)}function m(t){return t.getIn(["field","phoneNumber","value"],"")}function D(t){return y(t,"email")}function I(t){return y(t,"vcode")}function j(t){return y(t,"password")}function w(t){return y(t,"username")}function L(t){return y(t,"mfa_code")}function v(t){return!!t.getIn(["field","selecting"])}function z(t){var e=t.getIn(["field","selecting","name"]);return v(t)?C.default.createElement(O.default,{model:t,name:e,icon:t.getIn(["field","selecting","icon"]),iconUrl:t.getIn(["field","selecting","iconUrl"]),items:t.getIn(["field",e,"options"])}):null}e.__esModule=!0;var b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.setField=i,e.registerOptionField=u,e.setOptionField=s,e.isFieldValid=c,e.getFieldInvalidHint=l,e.isFieldVisiblyInvalid=p,e.showInvalidField=d,e.hideInvalidFields=M,e.setFieldShowInvalid=f,e.clearFields=g,e.getField=h,e.getFieldValue=y,e.getFieldLabel=N,e.phoneNumber=m,e.email=D,e.vcode=I,e.password=j,e.username=w,e.mfaCode=L,e.isSelecting=v,e.renderOptionSelection=z;var T=n(1),C=r(T),E=n(9),k=n(32),S=r(k),x=n(335),O=r(x),A=n(2),_=o(A)},function(t,e){"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function o(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;var o=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==o.join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}var r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;t.exports=o()?Object.assign:function(t,e){for(var o,a,u=n(t),s=1;s<arguments.length;s++){o=Object(arguments[s]);for(var c in o)r.call(o,c)&&(u[c]=o[c]);if(Object.getOwnPropertySymbols){a=Object.getOwnPropertySymbols(o);for(var l=0;l<a.length;l++)i.call(o,a[l])&&(u[a[l]]=o[a[l]])}}return u}},function(t,e,n){var o,r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(a,u){"object"===i(e)&&"undefined"!=typeof t?t.exports=u():(o=u,r="function"==typeof o?o.call(e,n,e,t):o,!(void 0!==r&&(t.exports=r)))}(void 0,function(){"use strict";function t(t,e){e&&(t.prototype=Object.create(e.prototype)),t.prototype.constructor=t}function e(t){return a(t)?t:E(t)}function n(t){return u(t)?t:k(t)}function o(t){return s(t)?t:S(t)}function r(t){return a(t)&&!c(t)?t:x(t)}function a(t){return!(!t||!t[ln])}function u(t){return!(!t||!t[pn])}function s(t){return!(!t||!t[dn])}function c(t){return u(t)||s(t)}function l(t){return!(!t||!t[Mn])}function p(t){return t.value=!1,t}function d(t){t&&(t.value=!0)}function M(){}function f(t,e){e=e||0;for(var n=Math.max(0,t.length-e),o=new Array(n),r=0;r<n;r++)o[r]=t[r+e];return o}function g(t){return void 0===t.size&&(t.size=t.__iterate(y)),t.size}function h(t,e){if("number"!=typeof e){var n=e>>>0;if(""+n!==e||4294967295===n)return NaN;e=n}return e<0?g(t)+e:e}function y(){return!0}function N(t,e,n){return(0===t||void 0!==n&&t<=-n)&&(void 0===e||void 0!==n&&e>=n)}function m(t,e){return I(t,e,0)}function D(t,e){return I(t,e,e)}function I(t,e,n){return void 0===t?n:t<0?Math.max(0,e+t):void 0===e?t:Math.min(e,t)}function j(t){this.next=t}function w(t,e,n,o){var r=0===t?e:1===t?n:[e,n];return o?o.value=r:o={value:r,done:!1},o}function L(){return{value:void 0,done:!0}}function v(t){return!!T(t)}function z(t){return t&&"function"==typeof t.next}function b(t){var e=T(t);return e&&e.call(t)}function T(t){var e=t&&(Ln&&t[Ln]||t[vn]);if("function"==typeof e)return e}function C(t){return t&&"number"==typeof t.length}function E(t){return null===t||void 0===t?Q():a(t)?t.toSeq():R(t)}function k(t){return null===t||void 0===t?Q().toKeyedSeq():a(t)?u(t)?t.toSeq():t.fromEntrySeq():P(t)}function S(t){return null===t||void 0===t?Q():a(t)?u(t)?t.entrySeq():t.toIndexedSeq():B(t)}function x(t){return(null===t||void 0===t?Q():a(t)?u(t)?t.entrySeq():t:B(t)).toSetSeq()}function O(t){this._array=t,this.size=t.length}function A(t){var e=Object.keys(t);this._object=t,this._keys=e,this.size=e.length}function _(t){this._iterable=t,this.size=t.length||t.size}function U(t){this._iterator=t,this._iteratorCache=[]}function Y(t){return!(!t||!t[bn])}function Q(){return Tn||(Tn=new O([]))}function P(t){var e=Array.isArray(t)?new O(t).fromEntrySeq():z(t)?new U(t).fromEntrySeq():v(t)?new _(t).fromEntrySeq():"object"===("undefined"==typeof t?"undefined":i(t))?new A(t):void 0;if(!e)throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: "+t);return e}function B(t){var e=G(t);if(!e)throw new TypeError("Expected Array or iterable object of values: "+t);return e}function R(t){var e=G(t)||"object"===("undefined"==typeof t?"undefined":i(t))&&new A(t);if(!e)throw new TypeError("Expected Array or iterable object of values, or keyed object: "+t);return e}function G(t){return C(t)?new O(t):z(t)?new U(t):v(t)?new _(t):void 0}function Z(t,e,n,o){var r=t._cache;if(r){for(var i=r.length-1,a=0;a<=i;a++){var u=r[n?i-a:a];if(e(u[1],o?u[0]:a,t)===!1)return a+1}return a}return t.__iterateUncached(e,n)}function W(t,e,n,o){var r=t._cache;if(r){var i=r.length-1,a=0;return new j(function(){var t=r[n?i-a:a];return a++>i?L():w(e,o?t[0]:a-1,t[1])})}return t.__iteratorUncached(e,n)}function H(t,e){return e?V(e,t,"",{"":t}):F(t)}function V(t,e,n,o){return Array.isArray(e)?t.call(o,n,S(e).map(function(n,o){return V(t,n,o,e)})):J(e)?t.call(o,n,k(e).map(function(n,o){return V(t,n,o,e)})):e}function F(t){return Array.isArray(t)?S(t).map(F).toList():J(t)?k(t).map(F).toMap():t}function J(t){return t&&(t.constructor===Object||void 0===t.constructor)}function q(t,e){if(t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1;if("function"==typeof t.valueOf&&"function"==typeof e.valueOf){if(t=t.valueOf(),e=e.valueOf(),t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1}return!("function"!=typeof t.equals||"function"!=typeof e.equals||!t.equals(e))}function X(t,e){if(t===e)return!0;if(!a(e)||void 0!==t.size&&void 0!==e.size&&t.size!==e.size||void 0!==t.__hash&&void 0!==e.__hash&&t.__hash!==e.__hash||u(t)!==u(e)||s(t)!==s(e)||l(t)!==l(e))return!1;if(0===t.size&&0===e.size)return!0;var n=!c(t);if(l(t)){var o=t.entries();return e.every(function(t,e){var r=o.next().value;return r&&q(r[1],t)&&(n||q(r[0],e))})&&o.next().done}var r=!1;if(void 0===t.size)if(void 0===e.size)"function"==typeof t.cacheResult&&t.cacheResult();else{r=!0;var i=t;t=e,e=i}var p=!0,d=e.__iterate(function(e,o){if(n?!t.has(e):r?!q(e,t.get(o,Nn)):!q(t.get(o,Nn),e))return p=!1,!1});return p&&t.size===d}function K(t,e){if(!(this instanceof K))return new K(t,e);if(this._value=t,this.size=void 0===e?1/0:Math.max(0,e),0===this.size){if(Cn)return Cn;Cn=this}}function $(t,e){if(!t)throw new Error(e)}function tt(t,e,n){if(!(this instanceof tt))return new tt(t,e,n);if($(0!==n,"Cannot step a Range by 0"),t=t||0,void 0===e&&(e=1/0),n=void 0===n?1:Math.abs(n),e<t&&(n=-n),this._start=t,this._end=e,this._step=n,this.size=Math.max(0,Math.ceil((e-t)/n-1)+1),0===this.size){if(En)return En;En=this}}function et(){throw TypeError("Abstract")}function nt(){}function ot(){}function rt(){}function it(t){return t>>>1&1073741824|3221225471&t}function at(t){if(t===!1||null===t||void 0===t)return 0;if("function"==typeof t.valueOf&&(t=t.valueOf(),t===!1||null===t||void 0===t))return 0;if(t===!0)return 1;var e="undefined"==typeof t?"undefined":i(t);if("number"===e){if(t!==t||t===1/0)return 0;var n=0|t;for(n!==t&&(n^=4294967295*t);t>4294967295;)t/=4294967295,n^=t;return it(n)}if("string"===e)return t.length>Yn?ut(t):st(t);if("function"==typeof t.hashCode)return t.hashCode();if("object"===e)return ct(t);if("function"==typeof t.toString)return st(t.toString());throw new Error("Value type "+e+" cannot be hashed.")}function ut(t){var e=Bn[t];return void 0===e&&(e=st(t),Pn===Qn&&(Pn=0,Bn={}),Pn++,Bn[t]=e),e}function st(t){for(var e=0,n=0;n<t.length;n++)e=31*e+t.charCodeAt(n)|0;return it(e)}function ct(t){var e;if(An&&(e=kn.get(t),void 0!==e))return e;if(e=t[Un],void 0!==e)return e;if(!On){if(e=t.propertyIsEnumerable&&t.propertyIsEnumerable[Un],void 0!==e)return e;if(e=lt(t),void 0!==e)return e}if(e=++_n,1073741824&_n&&(_n=0),An)kn.set(t,e);else{if(void 0!==xn&&xn(t)===!1)throw new Error("Non-extensible objects are not allowed as keys.");if(On)Object.defineProperty(t,Un,{enumerable:!1,configurable:!1,writable:!1,value:e});else if(void 0!==t.propertyIsEnumerable&&t.propertyIsEnumerable===t.constructor.prototype.propertyIsEnumerable)t.propertyIsEnumerable=function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments)},t.propertyIsEnumerable[Un]=e;else{if(void 0===t.nodeType)throw new Error("Unable to set a non-enumerable property on object.");t[Un]=e}}return e}function lt(t){if(t&&t.nodeType>0)switch(t.nodeType){case 1:return t.uniqueID;case 9:return t.documentElement&&t.documentElement.uniqueID}}function pt(t){$(t!==1/0,"Cannot perform this action with an infinite size.")}function dt(t){return null===t||void 0===t?wt():Mt(t)&&!l(t)?t:wt().withMutations(function(e){var o=n(t);pt(o.size),o.forEach(function(t,n){return e.set(n,t)})})}function Mt(t){return!(!t||!t[Rn])}function ft(t,e){this.ownerID=t,this.entries=e}function gt(t,e,n){this.ownerID=t,this.bitmap=e,this.nodes=n}function ht(t,e,n){this.ownerID=t,this.count=e,this.nodes=n}function yt(t,e,n){this.ownerID=t,this.keyHash=e,this.entries=n}function Nt(t,e,n){this.ownerID=t,this.keyHash=e,this.entry=n}function mt(t,e,n){this._type=e,this._reverse=n,this._stack=t._root&&It(t._root)}function Dt(t,e){return w(t,e[0],e[1])}function It(t,e){return{node:t,index:0,__prev:e}}function jt(t,e,n,o){var r=Object.create(Gn);return r.size=t,r._root=e,r.__ownerID=n,r.__hash=o,r.__altered=!1,r}function wt(){return Zn||(Zn=jt(0))}function Lt(t,e,n){var o,r;if(t._root){var i=p(mn),a=p(Dn);if(o=vt(t._root,t.__ownerID,0,void 0,e,n,i,a),!a.value)return t;r=t.size+(i.value?n===Nn?-1:1:0)}else{if(n===Nn)return t;r=1,o=new ft(t.__ownerID,[[e,n]])}return t.__ownerID?(t.size=r,t._root=o,t.__hash=void 0,t.__altered=!0,t):o?jt(r,o):wt()}function vt(t,e,n,o,r,i,a,u){return t?t.update(e,n,o,r,i,a,u):i===Nn?t:(d(u),d(a),new Nt(e,o,[r,i]))}function zt(t){return t.constructor===Nt||t.constructor===yt}function bt(t,e,n,o,r){if(t.keyHash===o)return new yt(e,o,[t.entry,r]);var i,a=(0===n?t.keyHash:t.keyHash>>>n)&yn,u=(0===n?o:o>>>n)&yn,s=a===u?[bt(t,e,n+gn,o,r)]:(i=new Nt(e,o,r),a<u?[t,i]:[i,t]);return new gt(e,1<<a|1<<u,s)}function Tt(t,e,n,o){t||(t=new M);for(var r=new Nt(t,at(n),[n,o]),i=0;i<e.length;i++){var a=e[i];r=r.update(t,0,void 0,a[0],a[1])}return r}function Ct(t,e,n,o){for(var r=0,i=0,a=new Array(n),u=0,s=1,c=e.length;u<c;u++,s<<=1){var l=e[u];void 0!==l&&u!==o&&(r|=s,a[i++]=l)}return new gt(t,r,a)}function Et(t,e,n,o,r){for(var i=0,a=new Array(hn),u=0;0!==n;u++,n>>>=1)a[u]=1&n?e[i++]:void 0;return a[o]=r,new ht(t,i+1,a)}function kt(t,e,o){for(var r=[],i=0;i<o.length;i++){var u=o[i],s=n(u);a(u)||(s=s.map(function(t){return H(t)})),r.push(s)}return Ot(t,e,r)}function St(t,e,n){return t&&t.mergeDeep&&a(e)?t.mergeDeep(e):q(t,e)?t:e}function xt(t){return function(e,n,o){if(e&&e.mergeDeepWith&&a(n))return e.mergeDeepWith(t,n);var r=t(e,n,o);return q(e,r)?e:r}}function Ot(t,e,n){return n=n.filter(function(t){return 0!==t.size}),0===n.length?t:0!==t.size||t.__ownerID||1!==n.length?t.withMutations(function(t){for(var o=e?function(n,o){t.update(o,Nn,function(t){return t===Nn?n:e(t,n,o)})}:function(e,n){t.set(n,e)},r=0;r<n.length;r++)n[r].forEach(o)}):t.constructor(n[0])}function At(t,e,n,o){var r=t===Nn,i=e.next();if(i.done){var a=r?n:t,u=o(a);return u===a?t:u}$(r||t&&t.set,"invalid keyPath");var s=i.value,c=r?Nn:t.get(s,Nn),l=At(c,e,n,o);return l===c?t:l===Nn?t.remove(s):(r?wt():t).set(s,l)}function _t(t){return t-=t>>1&1431655765,t=(858993459&t)+(t>>2&858993459),t=t+(t>>4)&252645135,t+=t>>8,t+=t>>16,127&t}function Ut(t,e,n,o){var r=o?t:f(t);return r[e]=n,r}function Yt(t,e,n,o){var r=t.length+1;if(o&&e+1===r)return t[e]=n,t;for(var i=new Array(r),a=0,u=0;u<r;u++)u===e?(i[u]=n,a=-1):i[u]=t[u+a];return i}function Qt(t,e,n){var o=t.length-1;if(n&&e===o)return t.pop(),t;for(var r=new Array(o),i=0,a=0;a<o;a++)a===e&&(i=1),r[a]=t[a+i];return r}function Pt(t){var e=Wt();if(null===t||void 0===t)return e;if(Bt(t))return t;var n=o(t),r=n.size;return 0===r?e:(pt(r),r>0&&r<hn?Zt(0,r,gn,null,new Rt(n.toArray())):e.withMutations(function(t){t.setSize(r),n.forEach(function(e,n){return t.set(n,e)})}))}function Bt(t){return!(!t||!t[Fn])}function Rt(t,e){this.array=t,this.ownerID=e}function Gt(t,e){function n(t,e,n){return 0===e?o(t,n):r(t,e,n)}function o(t,n){var o=n===u?s&&s.array:t&&t.array,r=n>i?0:i-n,c=a-n;return c>hn&&(c=hn),function(){if(r===c)return Xn;var t=e?--c:r++;return o&&o[t]}}function r(t,o,r){var u,s=t&&t.array,c=r>i?0:i-r>>o,l=(a-r>>o)+1;return l>hn&&(l=hn),function(){for(;;){if(u){var t=u();if(t!==Xn)return t;u=null}if(c===l)return Xn;var i=e?--l:c++;u=n(s&&s[i],o-gn,r+(i<<o))}}}var i=t._origin,a=t._capacity,u=Kt(a),s=t._tail;return n(t._root,t._level,0)}function Zt(t,e,n,o,r,i,a){var u=Object.create(Jn);return u.size=e-t,u._origin=t,u._capacity=e,u._level=n,u._root=o,u._tail=r,u.__ownerID=i,u.__hash=a,u.__altered=!1,u}function Wt(){return qn||(qn=Zt(0,0,gn))}function Ht(t,e,n){if(e=h(t,e),e!==e)return t;if(e>=t.size||e<0)return t.withMutations(function(t){e<0?qt(t,e).set(0,n):qt(t,0,e+1).set(e,n)});e+=t._origin;var o=t._tail,r=t._root,i=p(Dn);return e>=Kt(t._capacity)?o=Vt(o,t.__ownerID,0,e,n,i):r=Vt(r,t.__ownerID,t._level,e,n,i),i.value?t.__ownerID?(t._root=r,t._tail=o,t.__hash=void 0,t.__altered=!0,t):Zt(t._origin,t._capacity,t._level,r,o):t}function Vt(t,e,n,o,r,i){var a=o>>>n&yn,u=t&&a<t.array.length;if(!u&&void 0===r)return t;
var s;if(n>0){var c=t&&t.array[a],l=Vt(c,e,n-gn,o,r,i);return l===c?t:(s=Ft(t,e),s.array[a]=l,s)}return u&&t.array[a]===r?t:(d(i),s=Ft(t,e),void 0===r&&a===s.array.length-1?s.array.pop():s.array[a]=r,s)}function Ft(t,e){return e&&t&&e===t.ownerID?t:new Rt(t?t.array.slice():[],e)}function Jt(t,e){if(e>=Kt(t._capacity))return t._tail;if(e<1<<t._level+gn){for(var n=t._root,o=t._level;n&&o>0;)n=n.array[e>>>o&yn],o-=gn;return n}}function qt(t,e,n){void 0!==e&&(e|=0),void 0!==n&&(n|=0);var o=t.__ownerID||new M,r=t._origin,i=t._capacity,a=r+e,u=void 0===n?i:n<0?i+n:r+n;if(a===r&&u===i)return t;if(a>=u)return t.clear();for(var s=t._level,c=t._root,l=0;a+l<0;)c=new Rt(c&&c.array.length?[void 0,c]:[],o),s+=gn,l+=1<<s;l&&(a+=l,r+=l,u+=l,i+=l);for(var p=Kt(i),d=Kt(u);d>=1<<s+gn;)c=new Rt(c&&c.array.length?[c]:[],o),s+=gn;var f=t._tail,g=d<p?Jt(t,u-1):d>p?new Rt([],o):f;if(f&&d>p&&a<i&&f.array.length){c=Ft(c,o);for(var h=c,y=s;y>gn;y-=gn){var N=p>>>y&yn;h=h.array[N]=Ft(h.array[N],o)}h.array[p>>>gn&yn]=f}if(u<i&&(g=g&&g.removeAfter(o,0,u)),a>=d)a-=d,u-=d,s=gn,c=null,g=g&&g.removeBefore(o,0,a);else if(a>r||d<p){for(l=0;c;){var m=a>>>s&yn;if(m!==d>>>s&yn)break;m&&(l+=(1<<s)*m),s-=gn,c=c.array[m]}c&&a>r&&(c=c.removeBefore(o,s,a-l)),c&&d<p&&(c=c.removeAfter(o,s,d-l)),l&&(a-=l,u-=l)}return t.__ownerID?(t.size=u-a,t._origin=a,t._capacity=u,t._level=s,t._root=c,t._tail=g,t.__hash=void 0,t.__altered=!0,t):Zt(a,u,s,c,g)}function Xt(t,e,n){for(var r=[],i=0,u=0;u<n.length;u++){var s=n[u],c=o(s);c.size>i&&(i=c.size),a(s)||(c=c.map(function(t){return H(t)})),r.push(c)}return i>t.size&&(t=t.setSize(i)),Ot(t,e,r)}function Kt(t){return t<hn?0:t-1>>>gn<<gn}function $t(t){return null===t||void 0===t?ne():te(t)?t:ne().withMutations(function(e){var o=n(t);pt(o.size),o.forEach(function(t,n){return e.set(n,t)})})}function te(t){return Mt(t)&&l(t)}function ee(t,e,n,o){var r=Object.create($t.prototype);return r.size=t?t.size:0,r._map=t,r._list=e,r.__ownerID=n,r.__hash=o,r}function ne(){return Kn||(Kn=ee(wt(),Wt()))}function oe(t,e,n){var o,r,i=t._map,a=t._list,u=i.get(e),s=void 0!==u;if(n===Nn){if(!s)return t;a.size>=hn&&a.size>=2*i.size?(r=a.filter(function(t,e){return void 0!==t&&u!==e}),o=r.toKeyedSeq().map(function(t){return t[0]}).flip().toMap(),t.__ownerID&&(o.__ownerID=r.__ownerID=t.__ownerID)):(o=i.remove(e),r=u===a.size-1?a.pop():a.set(u,void 0))}else if(s){if(n===a.get(u)[1])return t;o=i,r=a.set(u,[e,n])}else o=i.set(e,a.size),r=a.set(a.size,[e,n]);return t.__ownerID?(t.size=o.size,t._map=o,t._list=r,t.__hash=void 0,t):ee(o,r)}function re(t,e){this._iter=t,this._useKeys=e,this.size=t.size}function ie(t){this._iter=t,this.size=t.size}function ae(t){this._iter=t,this.size=t.size}function ue(t){this._iter=t,this.size=t.size}function se(t){var e=Ce(t);return e._iter=t,e.size=t.size,e.flip=function(){return t},e.reverse=function(){var e=t.reverse.apply(this);return e.flip=function(){return t.reverse()},e},e.has=function(e){return t.includes(e)},e.includes=function(e){return t.has(e)},e.cacheResult=Ee,e.__iterateUncached=function(e,n){var o=this;return t.__iterate(function(t,n){return e(n,t,o)!==!1},n)},e.__iteratorUncached=function(e,n){if(e===wn){var o=t.__iterator(e,n);return new j(function(){var t=o.next();if(!t.done){var e=t.value[0];t.value[0]=t.value[1],t.value[1]=e}return t})}return t.__iterator(e===jn?In:jn,n)},e}function ce(t,e,n){var o=Ce(t);return o.size=t.size,o.has=function(e){return t.has(e)},o.get=function(o,r){var i=t.get(o,Nn);return i===Nn?r:e.call(n,i,o,t)},o.__iterateUncached=function(o,r){var i=this;return t.__iterate(function(t,r,a){return o(e.call(n,t,r,a),r,i)!==!1},r)},o.__iteratorUncached=function(o,r){var i=t.__iterator(wn,r);return new j(function(){var r=i.next();if(r.done)return r;var a=r.value,u=a[0];return w(o,u,e.call(n,a[1],u,t),r)})},o}function le(t,e){var n=Ce(t);return n._iter=t,n.size=t.size,n.reverse=function(){return t},t.flip&&(n.flip=function(){var e=se(t);return e.reverse=function(){return t.flip()},e}),n.get=function(n,o){return t.get(e?n:-1-n,o)},n.has=function(n){return t.has(e?n:-1-n)},n.includes=function(e){return t.includes(e)},n.cacheResult=Ee,n.__iterate=function(e,n){var o=this;return t.__iterate(function(t,n){return e(t,n,o)},!n)},n.__iterator=function(e,n){return t.__iterator(e,!n)},n}function pe(t,e,n,o){var r=Ce(t);return o&&(r.has=function(o){var r=t.get(o,Nn);return r!==Nn&&!!e.call(n,r,o,t)},r.get=function(o,r){var i=t.get(o,Nn);return i!==Nn&&e.call(n,i,o,t)?i:r}),r.__iterateUncached=function(r,i){var a=this,u=0;return t.__iterate(function(t,i,s){if(e.call(n,t,i,s))return u++,r(t,o?i:u-1,a)},i),u},r.__iteratorUncached=function(r,i){var a=t.__iterator(wn,i),u=0;return new j(function(){for(;;){var i=a.next();if(i.done)return i;var s=i.value,c=s[0],l=s[1];if(e.call(n,l,c,t))return w(r,o?c:u++,l,i)}})},r}function de(t,e,n){var o=dt().asMutable();return t.__iterate(function(r,i){o.update(e.call(n,r,i,t),0,function(t){return t+1})}),o.asImmutable()}function Me(t,e,n){var o=u(t),r=(l(t)?$t():dt()).asMutable();t.__iterate(function(i,a){r.update(e.call(n,i,a,t),function(t){return t=t||[],t.push(o?[a,i]:i),t})});var i=Te(t);return r.map(function(e){return ve(t,i(e))})}function fe(t,e,n,o){var r=t.size;if(void 0!==e&&(e|=0),void 0!==n&&(n===1/0?n=r:n|=0),N(e,n,r))return t;var i=m(e,r),a=D(n,r);if(i!==i||a!==a)return fe(t.toSeq().cacheResult(),e,n,o);var u,s=a-i;s===s&&(u=s<0?0:s);var c=Ce(t);return c.size=0===u?u:t.size&&u||void 0,!o&&Y(t)&&u>=0&&(c.get=function(e,n){return e=h(this,e),e>=0&&e<u?t.get(e+i,n):n}),c.__iterateUncached=function(e,n){var r=this;if(0===u)return 0;if(n)return this.cacheResult().__iterate(e,n);var a=0,s=!0,c=0;return t.__iterate(function(t,n){if(!s||!(s=a++<i))return c++,e(t,o?n:c-1,r)!==!1&&c!==u}),c},c.__iteratorUncached=function(e,n){if(0!==u&&n)return this.cacheResult().__iterator(e,n);var r=0!==u&&t.__iterator(e,n),a=0,s=0;return new j(function(){for(;a++<i;)r.next();if(++s>u)return L();var t=r.next();return o||e===jn?t:e===In?w(e,s-1,void 0,t):w(e,s-1,t.value[1],t)})},c}function ge(t,e,n){var o=Ce(t);return o.__iterateUncached=function(o,r){var i=this;if(r)return this.cacheResult().__iterate(o,r);var a=0;return t.__iterate(function(t,r,u){return e.call(n,t,r,u)&&++a&&o(t,r,i)}),a},o.__iteratorUncached=function(o,r){var i=this;if(r)return this.cacheResult().__iterator(o,r);var a=t.__iterator(wn,r),u=!0;return new j(function(){if(!u)return L();var t=a.next();if(t.done)return t;var r=t.value,s=r[0],c=r[1];return e.call(n,c,s,i)?o===wn?t:w(o,s,c,t):(u=!1,L())})},o}function he(t,e,n,o){var r=Ce(t);return r.__iterateUncached=function(r,i){var a=this;if(i)return this.cacheResult().__iterate(r,i);var u=!0,s=0;return t.__iterate(function(t,i,c){if(!u||!(u=e.call(n,t,i,c)))return s++,r(t,o?i:s-1,a)}),s},r.__iteratorUncached=function(r,i){var a=this;if(i)return this.cacheResult().__iterator(r,i);var u=t.__iterator(wn,i),s=!0,c=0;return new j(function(){var t,i,l;do{if(t=u.next(),t.done)return o||r===jn?t:r===In?w(r,c++,void 0,t):w(r,c++,t.value[1],t);var p=t.value;i=p[0],l=p[1],s&&(s=e.call(n,l,i,a))}while(s);return r===wn?t:w(r,i,l,t)})},r}function ye(t,e){var o=u(t),r=[t].concat(e).map(function(t){return a(t)?o&&(t=n(t)):t=o?P(t):B(Array.isArray(t)?t:[t]),t}).filter(function(t){return 0!==t.size});if(0===r.length)return t;if(1===r.length){var i=r[0];if(i===t||o&&u(i)||s(t)&&s(i))return i}var c=new O(r);return o?c=c.toKeyedSeq():s(t)||(c=c.toSetSeq()),c=c.flatten(!0),c.size=r.reduce(function(t,e){if(void 0!==t){var n=e.size;if(void 0!==n)return t+n}},0),c}function Ne(t,e,n){var o=Ce(t);return o.__iterateUncached=function(o,r){function i(t,c){var l=this;t.__iterate(function(t,r){return(!e||c<e)&&a(t)?i(t,c+1):o(t,n?r:u++,l)===!1&&(s=!0),!s},r)}var u=0,s=!1;return i(t,0),u},o.__iteratorUncached=function(o,r){var i=t.__iterator(o,r),u=[],s=0;return new j(function(){for(;i;){var t=i.next();if(t.done===!1){var c=t.value;if(o===wn&&(c=c[1]),e&&!(u.length<e)||!a(c))return n?t:w(o,s++,c,t);u.push(i),i=c.__iterator(o,r)}else i=u.pop()}return L()})},o}function me(t,e,n){var o=Te(t);return t.toSeq().map(function(r,i){return o(e.call(n,r,i,t))}).flatten(!0)}function De(t,e){var n=Ce(t);return n.size=t.size&&2*t.size-1,n.__iterateUncached=function(n,o){var r=this,i=0;return t.__iterate(function(t,o){return(!i||n(e,i++,r)!==!1)&&n(t,i++,r)!==!1},o),i},n.__iteratorUncached=function(n,o){var r,i=t.__iterator(jn,o),a=0;return new j(function(){return(!r||a%2)&&(r=i.next(),r.done)?r:a%2?w(n,a++,e):w(n,a++,r.value,r)})},n}function Ie(t,e,n){e||(e=ke);var o=u(t),r=0,i=t.toSeq().map(function(e,o){return[o,e,r++,n?n(e,o,t):e]}).toArray();return i.sort(function(t,n){return e(t[3],n[3])||t[2]-n[2]}).forEach(o?function(t,e){i[e].length=2}:function(t,e){i[e]=t[1]}),o?k(i):s(t)?S(i):x(i)}function je(t,e,n){if(e||(e=ke),n){var o=t.toSeq().map(function(e,o){return[e,n(e,o,t)]}).reduce(function(t,n){return we(e,t[1],n[1])?n:t});return o&&o[0]}return t.reduce(function(t,n){return we(e,t,n)?n:t})}function we(t,e,n){var o=t(n,e);return 0===o&&n!==e&&(void 0===n||null===n||n!==n)||o>0}function Le(t,n,o){var r=Ce(t);return r.size=new O(o).map(function(t){return t.size}).min(),r.__iterate=function(t,e){for(var n,o=this.__iterator(jn,e),r=0;!(n=o.next()).done&&t(n.value,r++,this)!==!1;);return r},r.__iteratorUncached=function(t,r){var i=o.map(function(t){return t=e(t),b(r?t.reverse():t)}),a=0,u=!1;return new j(function(){var e;return u||(e=i.map(function(t){return t.next()}),u=e.some(function(t){return t.done})),u?L():w(t,a++,n.apply(null,e.map(function(t){return t.value})))})},r}function ve(t,e){return Y(t)?e:t.constructor(e)}function ze(t){if(t!==Object(t))throw new TypeError("Expected [K, V] tuple: "+t)}function be(t){return pt(t.size),g(t)}function Te(t){return u(t)?n:s(t)?o:r}function Ce(t){return Object.create((u(t)?k:s(t)?S:x).prototype)}function Ee(){return this._iter.cacheResult?(this._iter.cacheResult(),this.size=this._iter.size,this):E.prototype.cacheResult.call(this)}function ke(t,e){return t>e?1:t<e?-1:0}function Se(t){var n=b(t);if(!n){if(!C(t))throw new TypeError("Expected iterable or array-like: "+t);n=b(e(t))}return n}function xe(t,e){var n,o=function(i){if(i instanceof o)return i;if(!(this instanceof o))return new o(i);if(!n){n=!0;var a=Object.keys(t);_e(r,a),r.size=a.length,r._name=e,r._keys=a,r._defaultValues=t}this._map=dt(i)},r=o.prototype=Object.create($n);return r.constructor=o,o}function Oe(t,e,n){var o=Object.create(Object.getPrototypeOf(t));return o._map=e,o.__ownerID=n,o}function Ae(t){return t._name||t.constructor.name||"Record"}function _e(t,e){try{e.forEach(Ue.bind(void 0,t))}catch(t){}}function Ue(t,e){Object.defineProperty(t,e,{get:function(){return this.get(e)},set:function(t){$(this.__ownerID,"Cannot set on an immutable record."),this.set(e,t)}})}function Ye(t){return null===t||void 0===t?Re():Qe(t)&&!l(t)?t:Re().withMutations(function(e){var n=r(t);pt(n.size),n.forEach(function(t){return e.add(t)})})}function Qe(t){return!(!t||!t[to])}function Pe(t,e){return t.__ownerID?(t.size=e.size,t._map=e,t):e===t._map?t:0===e.size?t.__empty():t.__make(e)}function Be(t,e){var n=Object.create(eo);return n.size=t?t.size:0,n._map=t,n.__ownerID=e,n}function Re(){return no||(no=Be(wt()))}function Ge(t){return null===t||void 0===t?He():Ze(t)?t:He().withMutations(function(e){var n=r(t);pt(n.size),n.forEach(function(t){return e.add(t)})})}function Ze(t){return Qe(t)&&l(t)}function We(t,e){var n=Object.create(oo);return n.size=t?t.size:0,n._map=t,n.__ownerID=e,n}function He(){return ro||(ro=We(ne()))}function Ve(t){return null===t||void 0===t?qe():Fe(t)?t:qe().unshiftAll(t)}function Fe(t){return!(!t||!t[io])}function Je(t,e,n,o){var r=Object.create(ao);return r.size=t,r._head=e,r.__ownerID=n,r.__hash=o,r.__altered=!1,r}function qe(){return uo||(uo=Je(0))}function Xe(t,e){var n=function(n){t.prototype[n]=e[n]};return Object.keys(e).forEach(n),Object.getOwnPropertySymbols&&Object.getOwnPropertySymbols(e).forEach(n),t}function Ke(t,e){return e}function $e(t,e){return[e,t]}function tn(t){return function(){return!t.apply(this,arguments)}}function en(t){return function(){return-t.apply(this,arguments)}}function nn(t){return"string"==typeof t?JSON.stringify(t):String(t)}function on(){return f(arguments)}function rn(t,e){return t<e?1:t>e?-1:0}function an(t){if(t.size===1/0)return 0;var e=l(t),n=u(t),o=e?1:0,r=t.__iterate(n?e?function(t,e){o=31*o+sn(at(t),at(e))|0}:function(t,e){o=o+sn(at(t),at(e))|0}:e?function(t){o=31*o+at(t)|0}:function(t){o=o+at(t)|0});return un(r,o)}function un(t,e){return e=Sn(e,3432918353),e=Sn(e<<15|e>>>-15,461845907),e=Sn(e<<13|e>>>-13,5),e=(e+3864292196|0)^t,e=Sn(e^e>>>16,2246822507),e=Sn(e^e>>>13,3266489909),e=it(e^e>>>16)}function sn(t,e){return t^e+2654435769+(t<<6)+(t>>2)|0}var cn=Array.prototype.slice;t(n,e),t(o,e),t(r,e),e.isIterable=a,e.isKeyed=u,e.isIndexed=s,e.isAssociative=c,e.isOrdered=l,e.Keyed=n,e.Indexed=o,e.Set=r;var ln="@@__IMMUTABLE_ITERABLE__@@",pn="@@__IMMUTABLE_KEYED__@@",dn="@@__IMMUTABLE_INDEXED__@@",Mn="@@__IMMUTABLE_ORDERED__@@",fn="delete",gn=5,hn=1<<gn,yn=hn-1,Nn={},mn={value:!1},Dn={value:!1},In=0,jn=1,wn=2,Ln="function"==typeof Symbol&&Symbol.iterator,vn="@@iterator",zn=Ln||vn;j.prototype.toString=function(){return"[Iterator]"},j.KEYS=In,j.VALUES=jn,j.ENTRIES=wn,j.prototype.inspect=j.prototype.toSource=function(){return this.toString()},j.prototype[zn]=function(){return this},t(E,e),E.of=function(){return E(arguments)},E.prototype.toSeq=function(){return this},E.prototype.toString=function(){return this.__toString("Seq {","}")},E.prototype.cacheResult=function(){return!this._cache&&this.__iterateUncached&&(this._cache=this.entrySeq().toArray(),this.size=this._cache.length),this},E.prototype.__iterate=function(t,e){return Z(this,t,e,!0)},E.prototype.__iterator=function(t,e){return W(this,t,e,!0)},t(k,E),k.prototype.toKeyedSeq=function(){return this},t(S,E),S.of=function(){return S(arguments)},S.prototype.toIndexedSeq=function(){return this},S.prototype.toString=function(){return this.__toString("Seq [","]")},S.prototype.__iterate=function(t,e){return Z(this,t,e,!1)},S.prototype.__iterator=function(t,e){return W(this,t,e,!1)},t(x,E),x.of=function(){return x(arguments)},x.prototype.toSetSeq=function(){return this},E.isSeq=Y,E.Keyed=k,E.Set=x,E.Indexed=S;var bn="@@__IMMUTABLE_SEQ__@@";E.prototype[bn]=!0,t(O,S),O.prototype.get=function(t,e){return this.has(t)?this._array[h(this,t)]:e},O.prototype.__iterate=function(t,e){for(var n=this._array,o=n.length-1,r=0;r<=o;r++)if(t(n[e?o-r:r],r,this)===!1)return r+1;return r},O.prototype.__iterator=function(t,e){var n=this._array,o=n.length-1,r=0;return new j(function(){return r>o?L():w(t,r,n[e?o-r++:r++])})},t(A,k),A.prototype.get=function(t,e){return void 0===e||this.has(t)?this._object[t]:e},A.prototype.has=function(t){return this._object.hasOwnProperty(t)},A.prototype.__iterate=function(t,e){for(var n=this._object,o=this._keys,r=o.length-1,i=0;i<=r;i++){var a=o[e?r-i:i];if(t(n[a],a,this)===!1)return i+1}return i},A.prototype.__iterator=function(t,e){var n=this._object,o=this._keys,r=o.length-1,i=0;return new j(function(){var a=o[e?r-i:i];return i++>r?L():w(t,a,n[a])})},A.prototype[Mn]=!0,t(_,S),_.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);var n=this._iterable,o=b(n),r=0;if(z(o))for(var i;!(i=o.next()).done&&t(i.value,r++,this)!==!1;);return r},_.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var n=this._iterable,o=b(n);if(!z(o))return new j(L);var r=0;return new j(function(){var e=o.next();return e.done?e:w(t,r++,e.value)})},t(U,S),U.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);for(var n=this._iterator,o=this._iteratorCache,r=0;r<o.length;)if(t(o[r],r++,this)===!1)return r;for(var i;!(i=n.next()).done;){var a=i.value;if(o[r]=a,t(a,r++,this)===!1)break}return r},U.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var n=this._iterator,o=this._iteratorCache,r=0;return new j(function(){if(r>=o.length){var e=n.next();if(e.done)return e;o[r]=e.value}return w(t,r,o[r++])})};var Tn;t(K,S),K.prototype.toString=function(){return 0===this.size?"Repeat []":"Repeat [ "+this._value+" "+this.size+" times ]"},K.prototype.get=function(t,e){return this.has(t)?this._value:e},K.prototype.includes=function(t){return q(this._value,t)},K.prototype.slice=function(t,e){var n=this.size;return N(t,e,n)?this:new K(this._value,D(e,n)-m(t,n))},K.prototype.reverse=function(){return this},K.prototype.indexOf=function(t){return q(this._value,t)?0:-1},K.prototype.lastIndexOf=function(t){return q(this._value,t)?this.size:-1},K.prototype.__iterate=function(t,e){for(var n=0;n<this.size;n++)if(t(this._value,n,this)===!1)return n+1;return n},K.prototype.__iterator=function(t,e){var n=this,o=0;return new j(function(){return o<n.size?w(t,o++,n._value):L()})},K.prototype.equals=function(t){return t instanceof K?q(this._value,t._value):X(t)};var Cn;t(tt,S),tt.prototype.toString=function(){return 0===this.size?"Range []":"Range [ "+this._start+"..."+this._end+(1!==this._step?" by "+this._step:"")+" ]"},tt.prototype.get=function(t,e){return this.has(t)?this._start+h(this,t)*this._step:e},tt.prototype.includes=function(t){var e=(t-this._start)/this._step;return e>=0&&e<this.size&&e===Math.floor(e)},tt.prototype.slice=function(t,e){return N(t,e,this.size)?this:(t=m(t,this.size),e=D(e,this.size),e<=t?new tt(0,0):new tt(this.get(t,this._end),this.get(e,this._end),this._step))},tt.prototype.indexOf=function(t){var e=t-this._start;if(e%this._step===0){var n=e/this._step;if(n>=0&&n<this.size)return n}return-1},tt.prototype.lastIndexOf=function(t){return this.indexOf(t)},tt.prototype.__iterate=function(t,e){for(var n=this.size-1,o=this._step,r=e?this._start+n*o:this._start,i=0;i<=n;i++){if(t(r,i,this)===!1)return i+1;r+=e?-o:o}return i},tt.prototype.__iterator=function(t,e){var n=this.size-1,o=this._step,r=e?this._start+n*o:this._start,i=0;return new j(function(){var a=r;return r+=e?-o:o,i>n?L():w(t,i++,a)})},tt.prototype.equals=function(t){return t instanceof tt?this._start===t._start&&this._end===t._end&&this._step===t._step:X(this,t)};var En;t(et,e),t(nt,et),t(ot,et),t(rt,et),et.Keyed=nt,et.Indexed=ot,et.Set=rt;var kn,Sn="function"==typeof Math.imul&&Math.imul(4294967295,2)===-2?Math.imul:function(t,e){t|=0,e|=0;var n=65535&t,o=65535&e;return n*o+((t>>>16)*o+n*(e>>>16)<<16>>>0)|0},xn=Object.isExtensible,On=function(){try{return Object.defineProperty({},"@",{}),!0}catch(t){return!1}}(),An="function"==typeof WeakMap;An&&(kn=new WeakMap);var _n=0,Un="__immutablehash__";"function"==typeof Symbol&&(Un=Symbol(Un));var Yn=16,Qn=255,Pn=0,Bn={};t(dt,nt),dt.of=function(){var t=cn.call(arguments,0);return wt().withMutations(function(e){for(var n=0;n<t.length;n+=2){if(n+1>=t.length)throw new Error("Missing value for key: "+t[n]);e.set(t[n],t[n+1])}})},dt.prototype.toString=function(){return this.__toString("Map {","}")},dt.prototype.get=function(t,e){return this._root?this._root.get(0,void 0,t,e):e},dt.prototype.set=function(t,e){return Lt(this,t,e)},dt.prototype.setIn=function(t,e){return this.updateIn(t,Nn,function(){return e})},dt.prototype.remove=function(t){return Lt(this,t,Nn)},dt.prototype.deleteIn=function(t){return this.updateIn(t,function(){return Nn})},dt.prototype.update=function(t,e,n){return 1===arguments.length?t(this):this.updateIn([t],e,n)},dt.prototype.updateIn=function(t,e,n){n||(n=e,e=void 0);var o=At(this,Se(t),e,n);return o===Nn?void 0:o},dt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._root=null,this.__hash=void 0,this.__altered=!0,this):wt()},dt.prototype.merge=function(){return kt(this,void 0,arguments)},dt.prototype.mergeWith=function(t){var e=cn.call(arguments,1);return kt(this,t,e)},dt.prototype.mergeIn=function(t){var e=cn.call(arguments,1);return this.updateIn(t,wt(),function(t){return"function"==typeof t.merge?t.merge.apply(t,e):e[e.length-1]})},dt.prototype.mergeDeep=function(){return kt(this,St,arguments)},dt.prototype.mergeDeepWith=function(t){var e=cn.call(arguments,1);return kt(this,xt(t),e)},dt.prototype.mergeDeepIn=function(t){var e=cn.call(arguments,1);return this.updateIn(t,wt(),function(t){return"function"==typeof t.mergeDeep?t.mergeDeep.apply(t,e):e[e.length-1]})},dt.prototype.sort=function(t){return $t(Ie(this,t))},dt.prototype.sortBy=function(t,e){return $t(Ie(this,e,t))},dt.prototype.withMutations=function(t){var e=this.asMutable();return t(e),e.wasAltered()?e.__ensureOwner(this.__ownerID):this},dt.prototype.asMutable=function(){return this.__ownerID?this:this.__ensureOwner(new M)},dt.prototype.asImmutable=function(){return this.__ensureOwner()},dt.prototype.wasAltered=function(){return this.__altered},dt.prototype.__iterator=function(t,e){return new mt(this,t,e)},dt.prototype.__iterate=function(t,e){var n=this,o=0;return this._root&&this._root.iterate(function(e){return o++,t(e[1],e[0],n)},e),o},dt.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?jt(this.size,this._root,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},dt.isMap=Mt;var Rn="@@__IMMUTABLE_MAP__@@",Gn=dt.prototype;Gn[Rn]=!0,Gn[fn]=Gn.remove,Gn.removeIn=Gn.deleteIn,ft.prototype.get=function(t,e,n,o){for(var r=this.entries,i=0,a=r.length;i<a;i++)if(q(n,r[i][0]))return r[i][1];return o},ft.prototype.update=function(t,e,n,o,r,i,a){for(var u=r===Nn,s=this.entries,c=0,l=s.length;c<l&&!q(o,s[c][0]);c++);var p=c<l;if(p?s[c][1]===r:u)return this;if(d(a),(u||!p)&&d(i),!u||1!==s.length){if(!p&&!u&&s.length>=Wn)return Tt(t,s,o,r);var M=t&&t===this.ownerID,g=M?s:f(s);return p?u?c===l-1?g.pop():g[c]=g.pop():g[c]=[o,r]:g.push([o,r]),M?(this.entries=g,this):new ft(t,g)}},gt.prototype.get=function(t,e,n,o){void 0===e&&(e=at(n));var r=1<<((0===t?e:e>>>t)&yn),i=this.bitmap;return 0===(i&r)?o:this.nodes[_t(i&r-1)].get(t+gn,e,n,o)},gt.prototype.update=function(t,e,n,o,r,i,a){void 0===n&&(n=at(o));var u=(0===e?n:n>>>e)&yn,s=1<<u,c=this.bitmap,l=0!==(c&s);if(!l&&r===Nn)return this;var p=_t(c&s-1),d=this.nodes,M=l?d[p]:void 0,f=vt(M,t,e+gn,n,o,r,i,a);if(f===M)return this;if(!l&&f&&d.length>=Hn)return Et(t,d,c,u,f);if(l&&!f&&2===d.length&&zt(d[1^p]))return d[1^p];if(l&&f&&1===d.length&&zt(f))return f;var g=t&&t===this.ownerID,h=l?f?c:c^s:c|s,y=l?f?Ut(d,p,f,g):Qt(d,p,g):Yt(d,p,f,g);return g?(this.bitmap=h,this.nodes=y,this):new gt(t,h,y)},ht.prototype.get=function(t,e,n,o){void 0===e&&(e=at(n));var r=(0===t?e:e>>>t)&yn,i=this.nodes[r];return i?i.get(t+gn,e,n,o):o},ht.prototype.update=function(t,e,n,o,r,i,a){void 0===n&&(n=at(o));var u=(0===e?n:n>>>e)&yn,s=r===Nn,c=this.nodes,l=c[u];if(s&&!l)return this;var p=vt(l,t,e+gn,n,o,r,i,a);if(p===l)return this;var d=this.count;if(l){if(!p&&(d--,d<Vn))return Ct(t,c,d,u)}else d++;var M=t&&t===this.ownerID,f=Ut(c,u,p,M);return M?(this.count=d,this.nodes=f,this):new ht(t,d,f)},yt.prototype.get=function(t,e,n,o){for(var r=this.entries,i=0,a=r.length;i<a;i++)if(q(n,r[i][0]))return r[i][1];return o},yt.prototype.update=function(t,e,n,o,r,i,a){void 0===n&&(n=at(o));var u=r===Nn;if(n!==this.keyHash)return u?this:(d(a),d(i),bt(this,t,e,n,[o,r]));for(var s=this.entries,c=0,l=s.length;c<l&&!q(o,s[c][0]);c++);var p=c<l;if(p?s[c][1]===r:u)return this;if(d(a),(u||!p)&&d(i),u&&2===l)return new Nt(t,this.keyHash,s[1^c]);var M=t&&t===this.ownerID,g=M?s:f(s);return p?u?c===l-1?g.pop():g[c]=g.pop():g[c]=[o,r]:g.push([o,r]),M?(this.entries=g,this):new yt(t,this.keyHash,g)},Nt.prototype.get=function(t,e,n,o){return q(n,this.entry[0])?this.entry[1]:o},Nt.prototype.update=function(t,e,n,o,r,i,a){var u=r===Nn,s=q(o,this.entry[0]);return(s?r===this.entry[1]:u)?this:(d(a),u?void d(i):s?t&&t===this.ownerID?(this.entry[1]=r,this):new Nt(t,this.keyHash,[o,r]):(d(i),bt(this,t,e,at(o),[o,r])))},ft.prototype.iterate=yt.prototype.iterate=function(t,e){for(var n=this.entries,o=0,r=n.length-1;o<=r;o++)if(t(n[e?r-o:o])===!1)return!1},gt.prototype.iterate=ht.prototype.iterate=function(t,e){for(var n=this.nodes,o=0,r=n.length-1;o<=r;o++){var i=n[e?r-o:o];if(i&&i.iterate(t,e)===!1)return!1}},Nt.prototype.iterate=function(t,e){return t(this.entry)},t(mt,j),mt.prototype.next=function(){for(var t=this._type,e=this._stack;e;){var n,o=e.node,r=e.index++;if(o.entry){if(0===r)return Dt(t,o.entry)}else if(o.entries){if(n=o.entries.length-1,r<=n)return Dt(t,o.entries[this._reverse?n-r:r])}else if(n=o.nodes.length-1,r<=n){var i=o.nodes[this._reverse?n-r:r];if(i){if(i.entry)return Dt(t,i.entry);e=this._stack=It(i,e)}continue}e=this._stack=this._stack.__prev}return L()};var Zn,Wn=hn/4,Hn=hn/2,Vn=hn/4;t(Pt,ot),Pt.of=function(){return this(arguments)},Pt.prototype.toString=function(){return this.__toString("List [","]")},Pt.prototype.get=function(t,e){if(t=h(this,t),t>=0&&t<this.size){t+=this._origin;var n=Jt(this,t);return n&&n.array[t&yn]}return e},Pt.prototype.set=function(t,e){return Ht(this,t,e)},Pt.prototype.remove=function(t){return this.has(t)?0===t?this.shift():t===this.size-1?this.pop():this.splice(t,1):this},Pt.prototype.insert=function(t,e){return this.splice(t,0,e)},Pt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=this._origin=this._capacity=0,this._level=gn,this._root=this._tail=null,this.__hash=void 0,this.__altered=!0,this):Wt()},Pt.prototype.push=function(){var t=arguments,e=this.size;return this.withMutations(function(n){qt(n,0,e+t.length);for(var o=0;o<t.length;o++)n.set(e+o,t[o])})},Pt.prototype.pop=function(){return qt(this,0,-1)},Pt.prototype.unshift=function(){var t=arguments;return this.withMutations(function(e){qt(e,-t.length);for(var n=0;n<t.length;n++)e.set(n,t[n])})},Pt.prototype.shift=function(){return qt(this,1)},Pt.prototype.merge=function(){return Xt(this,void 0,arguments)},Pt.prototype.mergeWith=function(t){var e=cn.call(arguments,1);return Xt(this,t,e)},Pt.prototype.mergeDeep=function(){return Xt(this,St,arguments)},Pt.prototype.mergeDeepWith=function(t){var e=cn.call(arguments,1);return Xt(this,xt(t),e)},Pt.prototype.setSize=function(t){return qt(this,0,t)},Pt.prototype.slice=function(t,e){var n=this.size;return N(t,e,n)?this:qt(this,m(t,n),D(e,n))},Pt.prototype.__iterator=function(t,e){var n=0,o=Gt(this,e);return new j(function(){var e=o();return e===Xn?L():w(t,n++,e)})},Pt.prototype.__iterate=function(t,e){for(var n,o=0,r=Gt(this,e);(n=r())!==Xn&&t(n,o++,this)!==!1;);return o},Pt.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Zt(this._origin,this._capacity,this._level,this._root,this._tail,t,this.__hash):(this.__ownerID=t,this)},Pt.isList=Bt;var Fn="@@__IMMUTABLE_LIST__@@",Jn=Pt.prototype;Jn[Fn]=!0,Jn[fn]=Jn.remove,Jn.setIn=Gn.setIn,Jn.deleteIn=Jn.removeIn=Gn.removeIn,Jn.update=Gn.update,Jn.updateIn=Gn.updateIn,Jn.mergeIn=Gn.mergeIn,Jn.mergeDeepIn=Gn.mergeDeepIn,Jn.withMutations=Gn.withMutations,Jn.asMutable=Gn.asMutable,Jn.asImmutable=Gn.asImmutable,Jn.wasAltered=Gn.wasAltered,Rt.prototype.removeBefore=function(t,e,n){if(n===e?1<<e:0===this.array.length)return this;var o=n>>>e&yn;if(o>=this.array.length)return new Rt([],t);var r,i=0===o;if(e>0){var a=this.array[o];if(r=a&&a.removeBefore(t,e-gn,n),r===a&&i)return this}if(i&&!r)return this;var u=Ft(this,t);if(!i)for(var s=0;s<o;s++)u.array[s]=void 0;return r&&(u.array[o]=r),u},Rt.prototype.removeAfter=function(t,e,n){if(n===(e?1<<e:0)||0===this.array.length)return this;var o=n-1>>>e&yn;if(o>=this.array.length)return this;var r;if(e>0){var i=this.array[o];if(r=i&&i.removeAfter(t,e-gn,n),r===i&&o===this.array.length-1)return this}var a=Ft(this,t);return a.array.splice(o+1),r&&(a.array[o]=r),a};var qn,Xn={};t($t,dt),$t.of=function(){return this(arguments)},$t.prototype.toString=function(){return this.__toString("OrderedMap {","}")},$t.prototype.get=function(t,e){var n=this._map.get(t);return void 0!==n?this._list.get(n)[1]:e},$t.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._map.clear(),this._list.clear(),this):ne()},$t.prototype.set=function(t,e){return oe(this,t,e)},$t.prototype.remove=function(t){return oe(this,t,Nn)},$t.prototype.wasAltered=function(){return this._map.wasAltered()||this._list.wasAltered()},$t.prototype.__iterate=function(t,e){var n=this;return this._list.__iterate(function(e){return e&&t(e[1],e[0],n)},e)},$t.prototype.__iterator=function(t,e){return this._list.fromEntrySeq().__iterator(t,e)},$t.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t),n=this._list.__ensureOwner(t);return t?ee(e,n,t,this.__hash):(this.__ownerID=t,this._map=e,this._list=n,this)},$t.isOrderedMap=te,$t.prototype[Mn]=!0,$t.prototype[fn]=$t.prototype.remove;var Kn;t(re,k),re.prototype.get=function(t,e){return this._iter.get(t,e)},re.prototype.has=function(t){return this._iter.has(t)},re.prototype.valueSeq=function(){return this._iter.valueSeq()},re.prototype.reverse=function(){var t=this,e=le(this,!0);return this._useKeys||(e.valueSeq=function(){return t._iter.toSeq().reverse()}),e},re.prototype.map=function(t,e){var n=this,o=ce(this,t,e);return this._useKeys||(o.valueSeq=function(){return n._iter.toSeq().map(t,e)}),o},re.prototype.__iterate=function(t,e){var n,o=this;return this._iter.__iterate(this._useKeys?function(e,n){return t(e,n,o)}:(n=e?be(this):0,function(r){return t(r,e?--n:n++,o)}),e)},re.prototype.__iterator=function(t,e){if(this._useKeys)return this._iter.__iterator(t,e);var n=this._iter.__iterator(jn,e),o=e?be(this):0;return new j(function(){var r=n.next();return r.done?r:w(t,e?--o:o++,r.value,r)})},re.prototype[Mn]=!0,t(ie,S),ie.prototype.includes=function(t){return this._iter.includes(t)},ie.prototype.__iterate=function(t,e){var n=this,o=0;return this._iter.__iterate(function(e){return t(e,o++,n)},e)},ie.prototype.__iterator=function(t,e){var n=this._iter.__iterator(jn,e),o=0;return new j(function(){var e=n.next();return e.done?e:w(t,o++,e.value,e)})},t(ae,x),ae.prototype.has=function(t){return this._iter.includes(t)},ae.prototype.__iterate=function(t,e){var n=this;return this._iter.__iterate(function(e){return t(e,e,n)},e)},ae.prototype.__iterator=function(t,e){var n=this._iter.__iterator(jn,e);return new j(function(){var e=n.next();return e.done?e:w(t,e.value,e.value,e)})},t(ue,k),ue.prototype.entrySeq=function(){return this._iter.toSeq()},ue.prototype.__iterate=function(t,e){var n=this;return this._iter.__iterate(function(e){if(e){ze(e);var o=a(e);return t(o?e.get(1):e[1],o?e.get(0):e[0],n)}},e)},ue.prototype.__iterator=function(t,e){var n=this._iter.__iterator(jn,e);return new j(function(){for(;;){var e=n.next();if(e.done)return e;var o=e.value;if(o){ze(o);var r=a(o);return w(t,r?o.get(0):o[0],r?o.get(1):o[1],e)}}})},ie.prototype.cacheResult=re.prototype.cacheResult=ae.prototype.cacheResult=ue.prototype.cacheResult=Ee,t(xe,nt),xe.prototype.toString=function(){return this.__toString(Ae(this)+" {","}")},xe.prototype.has=function(t){return this._defaultValues.hasOwnProperty(t)},xe.prototype.get=function(t,e){if(!this.has(t))return e;var n=this._defaultValues[t];return this._map?this._map.get(t,n):n},xe.prototype.clear=function(){if(this.__ownerID)return this._map&&this._map.clear(),this;var t=this.constructor;return t._empty||(t._empty=Oe(this,wt()))},xe.prototype.set=function(t,e){if(!this.has(t))throw new Error('Cannot set unknown key "'+t+'" on '+Ae(this));if(this._map&&!this._map.has(t)){var n=this._defaultValues[t];if(e===n)return this}var o=this._map&&this._map.set(t,e);return this.__ownerID||o===this._map?this:Oe(this,o)},xe.prototype.remove=function(t){if(!this.has(t))return this;var e=this._map&&this._map.remove(t);return this.__ownerID||e===this._map?this:Oe(this,e)},xe.prototype.wasAltered=function(){return this._map.wasAltered()},xe.prototype.__iterator=function(t,e){var o=this;return n(this._defaultValues).map(function(t,e){return o.get(e)}).__iterator(t,e)},xe.prototype.__iterate=function(t,e){var o=this;return n(this._defaultValues).map(function(t,e){return o.get(e)}).__iterate(t,e)},xe.prototype.__ensureOwner=function(t){
if(t===this.__ownerID)return this;var e=this._map&&this._map.__ensureOwner(t);return t?Oe(this,e,t):(this.__ownerID=t,this._map=e,this)};var $n=xe.prototype;$n[fn]=$n.remove,$n.deleteIn=$n.removeIn=Gn.removeIn,$n.merge=Gn.merge,$n.mergeWith=Gn.mergeWith,$n.mergeIn=Gn.mergeIn,$n.mergeDeep=Gn.mergeDeep,$n.mergeDeepWith=Gn.mergeDeepWith,$n.mergeDeepIn=Gn.mergeDeepIn,$n.setIn=Gn.setIn,$n.update=Gn.update,$n.updateIn=Gn.updateIn,$n.withMutations=Gn.withMutations,$n.asMutable=Gn.asMutable,$n.asImmutable=Gn.asImmutable,t(Ye,rt),Ye.of=function(){return this(arguments)},Ye.fromKeys=function(t){return this(n(t).keySeq())},Ye.prototype.toString=function(){return this.__toString("Set {","}")},Ye.prototype.has=function(t){return this._map.has(t)},Ye.prototype.add=function(t){return Pe(this,this._map.set(t,!0))},Ye.prototype.remove=function(t){return Pe(this,this._map.remove(t))},Ye.prototype.clear=function(){return Pe(this,this._map.clear())},Ye.prototype.union=function(){var t=cn.call(arguments,0);return t=t.filter(function(t){return 0!==t.size}),0===t.length?this:0!==this.size||this.__ownerID||1!==t.length?this.withMutations(function(e){for(var n=0;n<t.length;n++)r(t[n]).forEach(function(t){return e.add(t)})}):this.constructor(t[0])},Ye.prototype.intersect=function(){var t=cn.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return r(t)});var e=this;return this.withMutations(function(n){e.forEach(function(e){t.every(function(t){return t.includes(e)})||n.remove(e)})})},Ye.prototype.subtract=function(){var t=cn.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return r(t)});var e=this;return this.withMutations(function(n){e.forEach(function(e){t.some(function(t){return t.includes(e)})&&n.remove(e)})})},Ye.prototype.merge=function(){return this.union.apply(this,arguments)},Ye.prototype.mergeWith=function(t){var e=cn.call(arguments,1);return this.union.apply(this,e)},Ye.prototype.sort=function(t){return Ge(Ie(this,t))},Ye.prototype.sortBy=function(t,e){return Ge(Ie(this,e,t))},Ye.prototype.wasAltered=function(){return this._map.wasAltered()},Ye.prototype.__iterate=function(t,e){var n=this;return this._map.__iterate(function(e,o){return t(o,o,n)},e)},Ye.prototype.__iterator=function(t,e){return this._map.map(function(t,e){return e}).__iterator(t,e)},Ye.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t);return t?this.__make(e,t):(this.__ownerID=t,this._map=e,this)},Ye.isSet=Qe;var to="@@__IMMUTABLE_SET__@@",eo=Ye.prototype;eo[to]=!0,eo[fn]=eo.remove,eo.mergeDeep=eo.merge,eo.mergeDeepWith=eo.mergeWith,eo.withMutations=Gn.withMutations,eo.asMutable=Gn.asMutable,eo.asImmutable=Gn.asImmutable,eo.__empty=Re,eo.__make=Be;var no;t(Ge,Ye),Ge.of=function(){return this(arguments)},Ge.fromKeys=function(t){return this(n(t).keySeq())},Ge.prototype.toString=function(){return this.__toString("OrderedSet {","}")},Ge.isOrderedSet=Ze;var oo=Ge.prototype;oo[Mn]=!0,oo.__empty=He,oo.__make=We;var ro;t(Ve,ot),Ve.of=function(){return this(arguments)},Ve.prototype.toString=function(){return this.__toString("Stack [","]")},Ve.prototype.get=function(t,e){var n=this._head;for(t=h(this,t);n&&t--;)n=n.next;return n?n.value:e},Ve.prototype.peek=function(){return this._head&&this._head.value},Ve.prototype.push=function(){if(0===arguments.length)return this;for(var t=this.size+arguments.length,e=this._head,n=arguments.length-1;n>=0;n--)e={value:arguments[n],next:e};return this.__ownerID?(this.size=t,this._head=e,this.__hash=void 0,this.__altered=!0,this):Je(t,e)},Ve.prototype.pushAll=function(t){if(t=o(t),0===t.size)return this;pt(t.size);var e=this.size,n=this._head;return t.reverse().forEach(function(t){e++,n={value:t,next:n}}),this.__ownerID?(this.size=e,this._head=n,this.__hash=void 0,this.__altered=!0,this):Je(e,n)},Ve.prototype.pop=function(){return this.slice(1)},Ve.prototype.unshift=function(){return this.push.apply(this,arguments)},Ve.prototype.unshiftAll=function(t){return this.pushAll(t)},Ve.prototype.shift=function(){return this.pop.apply(this,arguments)},Ve.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._head=void 0,this.__hash=void 0,this.__altered=!0,this):qe()},Ve.prototype.slice=function(t,e){if(N(t,e,this.size))return this;var n=m(t,this.size),o=D(e,this.size);if(o!==this.size)return ot.prototype.slice.call(this,t,e);for(var r=this.size-n,i=this._head;n--;)i=i.next;return this.__ownerID?(this.size=r,this._head=i,this.__hash=void 0,this.__altered=!0,this):Je(r,i)},Ve.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Je(this.size,this._head,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},Ve.prototype.__iterate=function(t,e){if(e)return this.reverse().__iterate(t);for(var n=0,o=this._head;o&&t(o.value,n++,this)!==!1;)o=o.next;return n},Ve.prototype.__iterator=function(t,e){if(e)return this.reverse().__iterator(t);var n=0,o=this._head;return new j(function(){if(o){var e=o.value;return o=o.next,w(t,n++,e)}return L()})},Ve.isStack=Fe;var io="@@__IMMUTABLE_STACK__@@",ao=Ve.prototype;ao[io]=!0,ao.withMutations=Gn.withMutations,ao.asMutable=Gn.asMutable,ao.asImmutable=Gn.asImmutable,ao.wasAltered=Gn.wasAltered;var uo;e.Iterator=j,Xe(e,{toArray:function(){pt(this.size);var t=new Array(this.size||0);return this.valueSeq().__iterate(function(e,n){t[n]=e}),t},toIndexedSeq:function(){return new ie(this)},toJS:function(){return this.toSeq().map(function(t){return t&&"function"==typeof t.toJS?t.toJS():t}).__toJS()},toJSON:function(){return this.toSeq().map(function(t){return t&&"function"==typeof t.toJSON?t.toJSON():t}).__toJS()},toKeyedSeq:function(){return new re(this,!0)},toMap:function(){return dt(this.toKeyedSeq())},toObject:function(){pt(this.size);var t={};return this.__iterate(function(e,n){t[n]=e}),t},toOrderedMap:function(){return $t(this.toKeyedSeq())},toOrderedSet:function(){return Ge(u(this)?this.valueSeq():this)},toSet:function(){return Ye(u(this)?this.valueSeq():this)},toSetSeq:function(){return new ae(this)},toSeq:function(){return s(this)?this.toIndexedSeq():u(this)?this.toKeyedSeq():this.toSetSeq()},toStack:function(){return Ve(u(this)?this.valueSeq():this)},toList:function(){return Pt(u(this)?this.valueSeq():this)},toString:function(){return"[Iterable]"},__toString:function(t,e){return 0===this.size?t+e:t+" "+this.toSeq().map(this.__toStringMapper).join(", ")+" "+e},concat:function(){var t=cn.call(arguments,0);return ve(this,ye(this,t))},includes:function(t){return this.some(function(e){return q(e,t)})},entries:function(){return this.__iterator(wn)},every:function(t,e){pt(this.size);var n=!0;return this.__iterate(function(o,r,i){if(!t.call(e,o,r,i))return n=!1,!1}),n},filter:function(t,e){return ve(this,pe(this,t,e,!0))},find:function(t,e,n){var o=this.findEntry(t,e);return o?o[1]:n},forEach:function(t,e){return pt(this.size),this.__iterate(e?t.bind(e):t)},join:function(t){pt(this.size),t=void 0!==t?""+t:",";var e="",n=!0;return this.__iterate(function(o){n?n=!1:e+=t,e+=null!==o&&void 0!==o?o.toString():""}),e},keys:function(){return this.__iterator(In)},map:function(t,e){return ve(this,ce(this,t,e))},reduce:function(t,e,n){pt(this.size);var o,r;return arguments.length<2?r=!0:o=e,this.__iterate(function(e,i,a){r?(r=!1,o=e):o=t.call(n,o,e,i,a)}),o},reduceRight:function(t,e,n){var o=this.toKeyedSeq().reverse();return o.reduce.apply(o,arguments)},reverse:function(){return ve(this,le(this,!0))},slice:function(t,e){return ve(this,fe(this,t,e,!0))},some:function(t,e){return!this.every(tn(t),e)},sort:function(t){return ve(this,Ie(this,t))},values:function(){return this.__iterator(jn)},butLast:function(){return this.slice(0,-1)},isEmpty:function(){return void 0!==this.size?0===this.size:!this.some(function(){return!0})},count:function(t,e){return g(t?this.toSeq().filter(t,e):this)},countBy:function(t,e){return de(this,t,e)},equals:function(t){return X(this,t)},entrySeq:function(){var t=this;if(t._cache)return new O(t._cache);var e=t.toSeq().map($e).toIndexedSeq();return e.fromEntrySeq=function(){return t.toSeq()},e},filterNot:function(t,e){return this.filter(tn(t),e)},findEntry:function(t,e,n){var o=n;return this.__iterate(function(n,r,i){if(t.call(e,n,r,i))return o=[r,n],!1}),o},findKey:function(t,e){var n=this.findEntry(t,e);return n&&n[0]},findLast:function(t,e,n){return this.toKeyedSeq().reverse().find(t,e,n)},findLastEntry:function(t,e,n){return this.toKeyedSeq().reverse().findEntry(t,e,n)},findLastKey:function(t,e){return this.toKeyedSeq().reverse().findKey(t,e)},first:function(){return this.find(y)},flatMap:function(t,e){return ve(this,me(this,t,e))},flatten:function(t){return ve(this,Ne(this,t,!0))},fromEntrySeq:function(){return new ue(this)},get:function(t,e){return this.find(function(e,n){return q(n,t)},void 0,e)},getIn:function(t,e){for(var n,o=this,r=Se(t);!(n=r.next()).done;){var i=n.value;if(o=o&&o.get?o.get(i,Nn):Nn,o===Nn)return e}return o},groupBy:function(t,e){return Me(this,t,e)},has:function(t){return this.get(t,Nn)!==Nn},hasIn:function(t){return this.getIn(t,Nn)!==Nn},isSubset:function(t){return t="function"==typeof t.includes?t:e(t),this.every(function(e){return t.includes(e)})},isSuperset:function(t){return t="function"==typeof t.isSubset?t:e(t),t.isSubset(this)},keyOf:function(t){return this.findKey(function(e){return q(e,t)})},keySeq:function(){return this.toSeq().map(Ke).toIndexedSeq()},last:function(){return this.toSeq().reverse().first()},lastKeyOf:function(t){return this.toKeyedSeq().reverse().keyOf(t)},max:function(t){return je(this,t)},maxBy:function(t,e){return je(this,e,t)},min:function(t){return je(this,t?en(t):rn)},minBy:function(t,e){return je(this,e?en(e):rn,t)},rest:function(){return this.slice(1)},skip:function(t){return this.slice(Math.max(0,t))},skipLast:function(t){return ve(this,this.toSeq().reverse().skip(t).reverse())},skipWhile:function(t,e){return ve(this,he(this,t,e,!0))},skipUntil:function(t,e){return this.skipWhile(tn(t),e)},sortBy:function(t,e){return ve(this,Ie(this,e,t))},take:function(t){return this.slice(0,Math.max(0,t))},takeLast:function(t){return ve(this,this.toSeq().reverse().take(t).reverse())},takeWhile:function(t,e){return ve(this,ge(this,t,e))},takeUntil:function(t,e){return this.takeWhile(tn(t),e)},valueSeq:function(){return this.toIndexedSeq()},hashCode:function(){return this.__hash||(this.__hash=an(this))}});var so=e.prototype;so[ln]=!0,so[zn]=so.values,so.__toJS=so.toArray,so.__toStringMapper=nn,so.inspect=so.toSource=function(){return this.toString()},so.chain=so.flatMap,so.contains=so.includes,Xe(n,{flip:function(){return ve(this,se(this))},mapEntries:function(t,e){var n=this,o=0;return ve(this,this.toSeq().map(function(r,i){return t.call(e,[i,r],o++,n)}).fromEntrySeq())},mapKeys:function(t,e){var n=this;return ve(this,this.toSeq().flip().map(function(o,r){return t.call(e,o,r,n)}).flip())}});var co=n.prototype;co[pn]=!0,co[zn]=so.entries,co.__toJS=so.toObject,co.__toStringMapper=function(t,e){return JSON.stringify(e)+": "+nn(t)},Xe(o,{toKeyedSeq:function(){return new re(this,!1)},filter:function(t,e){return ve(this,pe(this,t,e,!1))},findIndex:function(t,e){var n=this.findEntry(t,e);return n?n[0]:-1},indexOf:function(t){var e=this.keyOf(t);return void 0===e?-1:e},lastIndexOf:function(t){var e=this.lastKeyOf(t);return void 0===e?-1:e},reverse:function(){return ve(this,le(this,!1))},slice:function(t,e){return ve(this,fe(this,t,e,!1))},splice:function(t,e){var n=arguments.length;if(e=Math.max(0|e,0),0===n||2===n&&!e)return this;t=m(t,t<0?this.count():this.size);var o=this.slice(0,t);return ve(this,1===n?o:o.concat(f(arguments,2),this.slice(t+e)))},findLastIndex:function(t,e){var n=this.findLastEntry(t,e);return n?n[0]:-1},first:function(){return this.get(0)},flatten:function(t){return ve(this,Ne(this,t,!1))},get:function(t,e){return t=h(this,t),t<0||this.size===1/0||void 0!==this.size&&t>this.size?e:this.find(function(e,n){return n===t},void 0,e)},has:function(t){return t=h(this,t),t>=0&&(void 0!==this.size?this.size===1/0||t<this.size:this.indexOf(t)!==-1)},interpose:function(t){return ve(this,De(this,t))},interleave:function(){var t=[this].concat(f(arguments)),e=Le(this.toSeq(),S.of,t),n=e.flatten(!0);return e.size&&(n.size=e.size*t.length),ve(this,n)},keySeq:function(){return tt(0,this.size)},last:function(){return this.get(-1)},skipWhile:function(t,e){return ve(this,he(this,t,e,!1))},zip:function(){var t=[this].concat(f(arguments));return ve(this,Le(this,on,t))},zipWith:function(t){var e=f(arguments);return e[0]=this,ve(this,Le(this,t,e))}}),o.prototype[dn]=!0,o.prototype[Mn]=!0,Xe(r,{get:function(t,e){return this.has(t)?t:e},includes:function(t){return this.has(t)},keySeq:function(){return this.valueSeq()}}),r.prototype.has=so.includes,r.prototype.contains=r.prototype.includes,Xe(k,n.prototype),Xe(S,o.prototype),Xe(x,r.prototype),Xe(nt,n.prototype),Xe(ot,o.prototype),Xe(rt,r.prototype);var lo={Iterable:e,Seq:E,Collection:et,Map:dt,OrderedMap:$t,List:Pt,Stack:Ve,Set:Ye,OrderedSet:Ge,Record:xe,Range:tt,Repeat:K,is:q,fromJS:H};return lo})},function(t,e){"use strict";var n=!("undefined"==typeof window||!window.document||!window.document.createElement),o={canUseDOM:n,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:n&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:n&&!!window.screen,isInWorker:!n};t.exports=o},function(t,e,n){(function(t){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return t=$(t,P.default.fromJS(l(e))),t=_(t)}function a(t,e){var n=void 0===t[e]||"boolean"==typeof t[e];return n||R.warn(t,"The `"+e+"` option will be ignored, because it is not a booelan."),n}function u(t,e,n){var o=void 0===t[e]||n.indexOf(t[e])>-1;return o||R.warn(t,"The `"+e+"` option will be ignored, because it is not one of the following allowed values: "+n.map(function(t){return JSON.stringify(t)}).join(", ")+"."),o}function s(t,e){var n=void 0===t[e]||"string"==typeof t[e]&&(0,F.default)(t[e]).length>0;return n||R.warn(t,"The `"+e+"` option will be ignored, because it is not a non-empty string."),n}function c(e,n){var o=void 0===e[n]||t.Array.isArray(e[n]);return o||R.warn(e,"The `"+n+"` option will be ignored, because it is not an array."),o}function l(e){var n=e.additionalSignUpFields,o=e.defaultDatabaseConnection,r=e.forgotPasswordLink,i=e.loginAfterSignUp,l=e.mustAcceptTerms,d=e.signUpLink,M=e.usernameStyle,f=p(e),g=f.initialScreen,h=f.screens;return u(e,"usernameStyle",["email","username"])||(M=void 0),s(e,"defaultDatabaseConnection")||(o=void 0),s(e,"forgotPasswordLink")||(r=void 0),s(e,"signUpLink")||(d=void 0),a(e,"mustAcceptTerms")||(l=void 0),c(e,"additionalSignUpFields")?n&&(n=n.reduce(function(n,o){var r=o.icon,i=o.name,a=o.options,u=o.placeholder,s=o.prefill,c=o.type,l=o.validator,p=!0,d=["email","username","password"];("string"!=typeof i||!i.match(/^[a-zA-Z0-9_]+$/)||d.indexOf(i)>-1)&&(R.warn(e,"Ignoring an element of `additionalSignUpFields` because it does not contain valid `name` property. Every element of `additionalSignUpFields` must be an object with a `name` property that is a non-empty string consisting of letters, numbers and underscores. The following names are reserved, and therefore, cannot be used: "+d.join(", ")+"."),p=!1),"string"==typeof u&&u||(R.warn(e,"Ignoring an element of `additionalSignUpFields` because it does not contain a valid `placeholder` property. Every element of `additionalSignUpFields` must have a `placeholder` property that is a non-empty string."),p=!1),void 0==r||"string"==typeof r&&r||(R.warn(e,"When provided, the `icon` property of an element of `additionalSignUpFields` must be a non-empty string."),r=void 0),void 0==s||"string"==typeof s&&s||"function"==typeof s||(R.warn(e,"When provided, the `prefill` property of an element of `additionalSignUpFields` must be a non-empty string or a function."),s=void 0);var M=["select","text"];return void 0==c||"string"==typeof c&&M.indexOf(c)!==-1||(R.warn(e,'When provided, the `type` property of an element of `additionalSignUpFields` must be one of the following strings: "'+M.join('", "')+'".'),c=void 0),void 0!=l&&"select"===c&&(R.warn(e,'Elements of `additionalSignUpFields` with a "select" `type` cannot specify a `validator` function, all of its `options` are assumed to be valid.'),l=void 0),void 0!=l&&"function"!=typeof l&&(R.warn(e,"When provided, the `validator` property of an element of `additionalSignUpFields` must be a function."),l=void 0),void 0!=a&&"select"!=c&&(R.warn(e,'The `options` property can only by provided for an element of `additionalSignUpFields` when its `type` equals to "select"'),a=void 0),(void 0!=a&&!t.Array.isArray(a)&&"function"!=typeof a||"select"===c&&void 0===a)&&(R.warn(e,'Ignoring an element of `additionalSignUpFields` because it has a "select" `type` but does not specify an `options` property that is an Array or a function.'),p=!1),p?n.concat([{icon:r,name:i,options:a,placeholder:u,prefill:s,type:c,validator:l}]):n},[]),n=P.default.fromJS(n).map(function(t){return t.filter(function(t){return void 0!==t})})):n=void 0,i=i!==!1,(0,Q.Map)({additionalSignUpFields:n,defaultConnectionName:o,forgotPasswordLink:r,initialScreen:g,loginAfterSignUp:i,mustAcceptTerms:l,screens:h,signUpLink:d,usernameStyle:M}).filter(function(t){return"undefined"!=typeof t}).toJS()}function p(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{allowLogin:!0,allowSignUp:!0,allowForgotPassword:!0,initialScreen:void 0},n=t.allowForgotPassword,o=t.allowLogin,r=t.allowSignUp,i=t.initialScreen,s=[];return(o===!0||!a(t,"allowLogin")&&e.allowLogin||void 0===o&&e.allowLogin)&&s.push("login"),(r===!0||!a(t,"allowSignUp")&&e.allowSignUp||void 0===r&&e.allowSignUp)&&s.push("signUp"),(n===!0||!a(t,"allowForgotPassword")&&e.allowForgotPassword||void 0===n&&e.allowForgotPassword)&&s.push("forgotPassword"),s.push("mfaLogin"),u(t,"initialScreen",s)||(i=void 0),void 0===i&&(i=e.initialScreen||s[0]),{initialScreen:i,screens:new Q.List(s)}}function d(t,e){var n=p(e,{allowLogin:I(t).contains("login"),allowSignUp:I(t).contains("signUp"),allowForgotPassword:I(t).contains("forgotPassword"),initialScreen:K(t,"initialScreen")}),o=n.initialScreen,r=n.screens;return t=et(t,"initialScreen",o),t=et(t,"screens",r)}function M(t){var e=f(t);return e&&R.findConnection(t,e)}function f(t){return K(t,"defaultConnectionName")}function g(t){return(0,J.defaultDirectory)(t)||M(t)||R.connection(t,"database")}function h(t){return(g(t)||(0,Q.Map)()).get("name")}function y(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return K(t,"forgotPasswordLink",e)}function N(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return K(t,"signUpLink",e)}function m(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return t=R.clearGlobalError(t),t=R.clearGlobalSuccess(t),t=(0,G.clearFields)(t,n),et(t,"screen",e)}function D(t){var e=tt(t,"screen"),n=j(t),o=[e,n,"login","signUp","forgotPassword","mfaLogin"],r=o.filter(function(e){return C(t,e)});return r[0]}function I(t){return tt(t,"screens")||K(t,"screens",new Q.List)}function j(t){return tt(t,"initialScreen")||K(t,"initialScreen")}function w(t,e){return j(t)===e}function L(t){return(g(t)||(0,Q.Map)()).toJS().requireUsername}function v(t){return R.hasSomeConnections(t,"database")?L(t)?K(t,"usernameStyle","any"):"email":R.hasSomeConnections(t,"enterprise")&&(0,q.findADConnectionWithoutDomain)(t)?"username":"email"}function z(t){return"email"===v(t)}function b(t){return(0,G.getFieldValue)(t,z(t)?"email":"username")}function T(t){return L(t)||"username"===K(t,"usernameStyle","email")}function C(t,e){var n=(g(t)||(0,Q.Map)()).toJS(),o=n.allowForgot,r=n.allowSignup;return!(o===!1&&"forgotPassword"===e)&&!(r===!1&&"signUp"===e)&&I(t).contains(e)}function E(t){return K(t,"loginAfterSignUp")}function k(t){return(g(t)||(0,Q.Map)()).get("passwordPolicy","none")}function S(t){return K(t,"additionalSignUpFields",(0,Q.List)())}function x(t){return K(t,"mustAcceptTerms",!1)}function O(t){return!x(t)||tt(t,"termsAccepted",!1)}function A(t){return et(t,"termsAccepted",!O(t))}function _(t){return S(t).reduce(function(t,e){return"select"===e.get("type")?U(t,e):Y(t,e)},t)}function U(t,e){var n=e.get("name"),o=["additionalSignUpField",n],r=e.get("prefill"),i=e.get("options"),a="function"==typeof r?void 0:r||"",u="function"==typeof i?void 0:i,s=function(t){return void 0!==a&&void 0!==u?(0,G.registerOptionField)(t,n,P.default.fromJS(u),a):t};return void 0===a&&(t=(0,H.default)(t,o.concat("prefill"),{recoverResult:"",successFn:function(t,e){return a=e,s(t)},syncFn:function(t,e){return r(e)}})),void 0===u&&(t=(0,H.default)(t,o.concat("options"),{successFn:function(t,e){return u=e,s(t)},syncFn:function(t,e){return i(e)}})),void 0!==a&&void 0!==u&&(t=(0,G.registerOptionField)(t,n,P.default.fromJS(u),a)),t}function Y(t,e){var n=e.get("name"),o=["additionalSignUpField",n,"prefill"],r=e.get("prefill"),i=e.get("validator"),a="function"==typeof r?void 0:r||"";return t=void 0===a?(0,H.default)(t,o,{recoverResult:"",successFn:function(t,e){return(0,G.setField)(t,n,e,i)},syncFn:function(t,e){return r(e)}}):(0,G.setField)(t,n,a,i)}e.__esModule=!0,e.initDatabase=i,e.overrideDatabaseOptions=d,e.defaultDatabaseConnection=M,e.defaultDatabaseConnectionName=f,e.databaseConnection=g,e.databaseConnectionName=h,e.forgotPasswordLink=y,e.signUpLink=N,e.setScreen=m,e.getScreen=D,e.availableScreens=I,e.getInitialScreen=j,e.hasInitialScreen=w,e.databaseConnectionRequiresUsername=L,e.databaseUsernameStyle=v,e.databaseLogInWithEmail=z,e.databaseUsernameValue=b,e.authWithUsername=T,e.hasScreen=C,e.shouldAutoLogin=E,e.passwordStrengthPolicy=k,e.additionalSignUpFields=S,e.mustAcceptTerms=x,e.termsAccepted=O,e.toggleTermsAcceptance=A,e.resolveAdditionalSignUpFields=_;var Q=n(9),P=r(Q),B=n(2),R=o(B),G=n(7),Z=n(18),W=n(50),H=r(W),V=n(32),F=r(V),J=n(91),q=n(25),X=(0,Z.dataFns)(["database"]),K=X.get,$=X.initNS,tt=X.tget,et=X.tset}).call(e,function(){return this}())},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n){i(t+"-"+e,function(t,o,r){var i=p(r,"lock",e),a=p(o,"lock",e);i!=a&&n(i)})}function i(t,e){m.addWatch(t,e)}function a(t){m.removeWatch(t)}function u(){return m.swap.apply(m,arguments)}function s(t,e,n,o){for(var r=arguments.length,i=Array(r>4?r-4:0),a=4;a<r;a++)i[a-4]=arguments[a];return t.updateIn([e,n],new N.Map({}),function(t){return o.apply(void 0,[t].concat(i))})}function c(t,e,n,o){return t.setIn([e,n],o)}function l(t){for(var e=arguments.length,n=Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];return t.apply(void 0,[m.deref()].concat(n))}function p(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return t.getIn([e,n])}function d(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return t.removeIn([e,n])}function M(t,e){return t.get(e,(0,N.Map)()).toList()}function f(t,e,n){for(var o=arguments.length,r=Array(o>3?o-3:0),i=3;i<o;i++)r[i-3]=arguments[i];return t.update(e,function(t){return n.apply(void 0,[t].concat(r))})}function g(){return m.deref()}e.__esModule=!0,e.observe=r,e.subscribe=i,e.unsubscribe=a,e.swap=u,e.updateEntity=s,e.setEntity=c,e.read=l,e.getEntity=p,e.removeEntity=d,e.getCollection=M,e.updateCollection=f,e.getState=g;var h=n(350),y=o(h),N=n(9),m=(0,y.default)(new N.Map({}))},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return y.format.apply(void 0,[b(t,["strings"].concat(e),"")].concat(o))}function a(t,e){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];var a=i.apply(void 0,[t,e].concat(o));return a?f.default.createElement("span",{dangerouslySetInnerHTML:{__html:a}}):null}function u(t,e){return b(t,["strings"].concat(e),(0,g.Map)()).toJS()}function s(t){var e=I.ui.language(t),n=I.ui.dict(t),o=h.default.fromJS(L.default),r=C[e]||(0,g.Map)({});return r.isEmpty()?(r=n,t=(0,m.default)(t,"i18n",{syncFn:function(n,o){return l(t,e,o)},successFn:function(t,r){p(e,r);var i=h.default.fromJS(r).mergeDeep(n);return c(t,i.toJS(),L.default),T(t,"strings",o.mergeDeep(i))}})):c(t,r.toJS(),L.default),r=o.mergeDeep(r).mergeDeep(n),T(t,"strings",r)}function c(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";Object.keys(n).forEach(function(r){e.hasOwnProperty(r)?"object"===d(n[r])&&c(t,e[r],n[r],""+o+r+"."):I.warn(t,"language does not have property "+o+r)})}function l(t,e,n){(0,v.load)({method:"registerLanguageDictionary",url:I.languageBaseUrl(t)+"/js/lock/10.9.1/"+e+".js",check:function(t){return t&&t===e},cb:function(t,e,o){n(t,o)}})}function p(t,e){C[t]=h.default.fromJS(e)}e.__esModule=!0;var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.str=i,e.html=a,e.group=u,e.initI18n=s;var M=n(1),f=r(M),g=n(9),h=r(g),y=n(89),N=n(50),m=r(N),D=n(2),I=o(D),j=n(18),w=n(337),L=r(w),v=n(100),z=(0,j.dataFns)(["i18n"]),b=z.get,T=z.set,C=[];p("en",L.default),(0,v.preload)({method:"registerLanguageDictionary",cb:p})},function(t,e,n){"use strict";var o=null;t.exports={debugTool:o}},function(t,e,n){"use strict";function o(t,e){return e.reduce(function(e,n){return t[n]&&(e[n]=t[n]),e},{})}function r(t){var e=[];for(var n in t)e.push(t[n]);return e}function i(){var t=r(arguments);return t.unshift({}),M.get().apply(void 0,t)}function a(t,e){return{base:e?o(t,e):t,with:function(t,e){return t=e?o(t,e):t,i(this.base,t)}}}function u(t,e){return Object.keys(t).reduce(function(n,o){return e.indexOf(o)===-1&&(n[o]=t[o]),n},{})}function s(t){for(var e,n="",o=0,r=!0,i=!0;o<t.length;)e=t.charCodeAt(o),!i&&e>=65&&e<=90||!r&&e>=48&&e<=57?(n+="_",n+=t[o].toLowerCase()):n+=t[o].toLowerCase(),r=e>=48&&e<=57,i=e>=65&&e<=90,o++;return n}function c(t){var e=t.split("_");return e.reduce(function(t,e){return t+e.charAt(0).toUpperCase()+e.slice(1)},e.shift())}function l(t,e){return e=e||[],Object.keys(t).reduce(function(n,o){var r=e.indexOf(o)===-1?s(o):o;return n[r]="object"===d(t[o])?l(t[o]):t[o],n},{})}function p(t,e){return e=e||[],Object.keys(t).reduce(function(n,o){var r=e.indexOf(o)===-1?c(o):o;return n[r]="object"===d(t[o])?p(t[o]):t[o],n},{})}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M=n(173);t.exports={toSnakeCase:l,toCamelCase:p,blacklist:u,merge:a,pick:o,extend:i}},function(t,e,n){"use strict";function o(){b.ReactReconcileTransaction&&I?void 0:l("123")}function r(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=d.getPooled(),this.reconcileTransaction=b.ReactReconcileTransaction.getPooled(!0)}function i(t,e,n,r,i,a){return o(),I.batchedUpdates(t,e,n,r,i,a)}function a(t,e){return t._mountOrder-e._mountOrder}function u(t){var e=t.dirtyComponentsLength;e!==y.length?l("124",e,y.length):void 0,y.sort(a),N++;for(var n=0;n<e;n++){var o=y[n],r=o._pendingCallbacks;o._pendingCallbacks=null;var i;if(f.logTopLevelRenders){var u=o;o._currentElement.type.isReactTopLevelWrapper&&(u=o._renderedComponent),i="React update: "+u.getName(),console.time(i)}if(g.performUpdateIfNecessary(o,t.reconcileTransaction,N),i&&console.timeEnd(i),r)for(var s=0;s<r.length;s++)t.callbackQueue.enqueue(r[s],o.getPublicInstance())}}function s(t){return o(),I.isBatchingUpdates?(y.push(t),void(null==t._updateBatchNumber&&(t._updateBatchNumber=N+1))):void I.batchedUpdates(s,t)}function c(t,e){I.isBatchingUpdates?void 0:l("125"),m.enqueue(t,e),D=!0}var l=n(4),p=n(8),d=n(113),M=n(30),f=n(119),g=n(37),h=n(56),y=(n(3),[]),N=0,m=d.getPooled(),D=!1,I=null,j={initialize:function(){this.dirtyComponentsLength=y.length},close:function(){this.dirtyComponentsLength!==y.length?(y.splice(0,this.dirtyComponentsLength),v()):y.length=0}},w={initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}},L=[j,w];p(r.prototype,h,{getTransactionWrappers:function(){return L},destructor:function(){this.dirtyComponentsLength=null,d.release(this.callbackQueue),this.callbackQueue=null,b.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(t,e,n){return h.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,t,e,n)}}),M.addPoolingTo(r);var v=function(){for(;y.length||D;){if(y.length){var t=r.getPooled();t.perform(u,null,t),r.release(t)}if(D){D=!1;var e=m;m=d.getPooled(),e.notifyAll(),d.release(e)}}},z={injectReconcileTransaction:function(t){t?void 0:l("126"),b.ReactReconcileTransaction=t},injectBatchingStrategy:function(t){t?void 0:l("127"),"function"!=typeof t.batchedUpdates?l("128"):void 0,"boolean"!=typeof t.isBatchingUpdates?l("129"):void 0,I=t}},b={ReactReconcileTransaction:null,batchedUpdates:i,enqueueUpdate:s,flushBatchedUpdates:v,injection:z,asap:c};t.exports=b},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var i=n(2),a=(o(i),n(13)),u=o(a),s=function(){function t(e){r(this,t),this.name=e}return t.prototype.backHandler=function(){return null},t.prototype.escHandler=function(){return null},t.prototype.submitButtonLabel=function(t){return u.str(t,["submitLabel"])},t.prototype.submitHandler=function(){return null},t.prototype.renderAuxiliaryPane=function(){return null},t.prototype.renderTabs=function(){return!1},t.prototype.renderTerms=function(){return null},t}();e.default=s},function(t,e,n){"use strict";function o(t){function e(t,e){return t.concat("object"===("undefined"==typeof e?"undefined":r(e))?e:[e])}function n(t){return function(n,o){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return n.getIn(e(t,o),r)}}function o(t){return function(n,o,r){return n.setIn(e(t,o),r)}}function a(t){return function(n,o){return n.removeIn(e(t,o))}}var u=t.concat(["transient"]);return{get:n(t),set:o(t),remove:a(t),tget:n(u),tset:o(u),tremove:a(u),reset:function(t){return t.map(function(t){return i.Map.isMap(t)?t.remove("transient"):t})},init:function(e,n){return new i.Map({id:e}).setIn(t,n)},initNS:function(e,n){return e.setIn(t,n)}}}e.__esModule=!0;var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.dataFns=o;var i=n(9)},function(t,e,n){"use strict";function o(t,e,n,o){this.dispatchConfig=t,this._targetInst=e,this.nativeEvent=n;var r=this.constructor.Interface;for(var i in r)if(r.hasOwnProperty(i)){var u=r[i];u?this[i]=u(n):"target"===i?this.target=o:this[i]=n[i]}var s=null!=n.defaultPrevented?n.defaultPrevented:n.returnValue===!1;return s?this.isDefaultPrevented=a.thatReturnsTrue:this.isDefaultPrevented=a.thatReturnsFalse,this.isPropagationStopped=a.thatReturnsFalse,this}var r=n(8),i=n(30),a=n(20),u=(n(5),"function"==typeof Proxy,["dispatchConfig","_targetInst","nativeEvent","isDefaultPrevented","isPropagationStopped","_dispatchListeners","_dispatchInstances"]),s={type:null,target:null,currentTarget:a.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};r(o.prototype,{preventDefault:function(){this.defaultPrevented=!0;
var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():"unknown"!=typeof t.returnValue&&(t.returnValue=!1),this.isDefaultPrevented=a.thatReturnsTrue)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():"unknown"!=typeof t.cancelBubble&&(t.cancelBubble=!0),this.isPropagationStopped=a.thatReturnsTrue)},persist:function(){this.isPersistent=a.thatReturnsTrue},isPersistent:a.thatReturnsFalse,destructor:function(){var t=this.constructor.Interface;for(var e in t)this[e]=null;for(var n=0;n<u.length;n++)this[u[n]]=null}}),o.Interface=s,o.augmentClass=function(t,e){var n=this,o=function(){};o.prototype=n.prototype;var a=new o;r(a,t.prototype),t.prototype=a,t.prototype.constructor=t,t.Interface=r({},n.Interface,e),t.augmentClass=n.augmentClass,i.addPoolingTo(t,i.fourArgumentPooler)},i.addPoolingTo(o,i.fourArgumentPooler),t.exports=o},function(t,e){"use strict";function n(t){return function(){return t}}var o=function(){};o.thatReturns=n,o.thatReturnsFalse=n(!1),o.thatReturnsTrue=n(!0),o.thatReturnsNull=n(null),o.thatReturnsThis=function(){return this},o.thatReturnsArgument=function(t){return t},t.exports=o},function(t,e,n){"use strict";var o=n(40),r=n(290),i=n(85),a=n(295),u=n(291),s=n(292),c=n(38),l=n(293),p=n(299),d=n(143),M=(n(23),c.createElement),f=c.createFactory,g=c.cloneElement,h=o,y={Children:{map:r.map,forEach:r.forEach,count:r.count,toArray:r.toArray,only:d},Component:i,PureComponent:a,createElement:M,cloneElement:g,isValidElement:c.isValidElement,PropTypes:l,createClass:u.createClass,createFactory:f,createMixin:function(t){return t},DOM:s,version:p,__spread:h};t.exports=y},function(t,e){"use strict";var n={current:null};t.exports=n},[361,59],function(t,e,n){var o,r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(i,a,u){"undefined"!=typeof t&&t.exports?t.exports=u():(o=u,r="function"==typeof o?o.call(e,n,e,t):o,!(void 0!==r&&(t.exports=r)))}("urljoin",void 0,function(){function t(t,e){return t=t.replace(/:\//g,"://"),t=t.replace(/([^:\s])\/+/g,"$1/"),t=t.replace(/\/(\?|&|#[^!])/g,"$1"),t=t.replace(/(\?.+)\?/g,"$1&")}return function(){var e=arguments,n={};"object"===i(arguments[0])&&(e=arguments[0],n=arguments[1]||{});var o=[].slice.call(e,0).join("/");return t(o,n)}})},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return x(t,L.default.fromJS(a(e)))}function a(t){var e=t.defaultEnterpriseConnection;return void 0!=e&&"string"!=typeof e&&(z.warn(options,"The `defaultEnterpriseConnection` option will be ignored, because it is not a string."),e=void 0),void 0===e?{}:{defaultConnectionName:e}}function u(t){var e=s(t);return e&&g(t,e)}function s(t){return S(t,"defaultConnectionName")}function c(t){if(j(t)){var e=O(t,"hrdEmail","");return l(t,e)||h(t)}return u(t)||g(t)}function l(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=(0,C.emailDomain)(e);return!!o&&z.connections.apply(z,[t,"enterprise"].concat(n)).find(function(t){return t.get("domains").contains(o)})}function p(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return!!l(t,e,n)}function d(t){return m(t)?z.connections(t,"enterprise").getIn([0,"domains",0]):(0,C.emailDomain)(O(t,"hrdEmail"))}function M(t){return!f(t)&&z.hasOneConnection(t,"enterprise")?z.connections(t,"enterprise").get(0):null}function f(t){return z.hasSomeConnections(t,"enterprise","ad","auth0-adldap")}function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return z.connections(t,"enterprise","ad","auth0-adldap").find(function(t){return t.get("domains").isEmpty()&&(!e||t.get("name")===e)})}function h(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return z.connections(t,"enterprise","ad","auth0-adldap").find(function(t){return!e||t.get("name")===e})}function y(t){return void 0!==N(t)}function N(t){var e=t.getIn(["sso","connection"]),n=t.getIn(["sso","strategy"]);return e&&L.default.Map({name:e,strategy:n})}function m(t){return f(t)&&1===z.connections(t).count()}function D(t,e){return p(t,e,["ad","auth0-adldap"])}function I(t,e){if(e){var n=z.defaultADUsernameFromEmailPrefix(t)?(0,C.emailLocalPart)(e):e;t=(0,E.setUsername)(t,n,"username",!1),t=_(t,"hrdEmail",e)}else t=A(t,"hrdEmail");return _(t,"hrd",!!e)}function j(t){return O(t,"hrd",m(t))}e.__esModule=!0,e.STRATEGIES=void 0,e.initEnterprise=i,e.defaultEnterpriseConnection=u,e.defaultEnterpriseConnectionName=s,e.enterpriseActiveFlowConnection=c,e.matchConnection=l,e.isEnterpriseDomain=p,e.enterpriseDomain=d,e.quickAuthConnection=M,e.isADEnabled=f,e.findADConnectionWithoutDomain=g,e.isInCorpNetwork=y,e.corpNetworkConnection=N,e.isSingleHRDConnection=m,e.isHRDDomain=D,e.toggleHRD=I,e.isHRDActive=j;var w=n(9),L=r(w),v=n(2),z=o(v),b=n(7),T=(o(b),n(18)),C=n(28),E=n(95),k=(0,T.dataFns)(["enterprise"]),S=k.get,x=k.initNS,O=k.tget,A=k.tremove,_=k.tset;e.STRATEGIES={ad:"AD / LDAP",adfs:"ADFS","auth0-adldap":"AD/LDAP",custom:"Custom Auth","google-apps":"Google Apps",ip:"IP Address",mscrm:"Dynamics CRM",office365:"Office365",pingfederate:"Ping Federate",samlp:"SAML",sharepoint:"SharePoint Apps",waad:"Windows Azure AD"}},function(t,e,n){(function(t){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,o,r,i){var a=z.setup(t,e,n,o,r,i);return a=(0,L.syncRemoteData)(a),(0,b.img)(z.ui.logo(a)||T.defaultProps.logo),j.default.setupClient(t,e,n,z.withAuthOptions(a,m({},o,{popupOptions:z.ui.popupOptions(a)}))),a=z.runHook(a,"didInitialize",o),(0,w.swap)(w.setEntity,"lock",t,a),a}function a(){var e=t.location.hash,n=(0,w.read)(w.getCollection,"lock"),o=n.filter(function(t){return!z.hashCleanup(t)}).size>0;n.forEach(function(n){z.auth.redirect(n)&&u(n,e,function(e){e&&!o&&(t.location.hash="")})})}function u(t,e,n){j.default.parseHash(z.id(t),e,function(e,o){e?z.emitHashParsedEvent(t,e):z.emitHashParsedEvent(t,o),e?z.emitAuthorizationErrorEvent(t,e):o&&z.emitAuthenticatedEvent(t,o),n(!(!e&&!o))})}function s(t,e){var n=(0,w.read)(w.getEntity,"lock",t);if(!n)throw new Error("The Lock can't be opened again after it has been destroyed");if(z.rendering(n))return!1;if(e.flashMessage){if(!e.flashMessage.type||["error","success"].indexOf(e.flashMessage.type)===-1)return z.emitUnrecoverableErrorEvent(n,"'flashMessage' must provide a valid type ['error','success']");if(!e.flashMessage.text)return z.emitUnrecoverableErrorEvent(n,"'flashMessage' must provide a text")}return z.emitEvent(n,"show"),(0,w.swap)(w.updateEntity,"lock",t,function(t){return t=z.overrideOptions(t,e),t=z.filterConnections(t),t=z.runHook(t,"willShow",e),z.render(t)}),!0}function c(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=(0,w.read)(w.getEntity,"lock",t);(z.ui.closable(o)||e)&&z.rendering(o)&&(z.emitEvent(o,"hide"),z.ui.appendContainer(o)?((0,w.swap)(w.updateEntity,"lock",t,z.stopRendering),setTimeout(function(){(0,w.swap)(w.updateEntity,"lock",t,function(t){return t=(0,C.hideInvalidFields)(t),t=z.reset(t)}),o=(0,w.read)(w.getEntity,"lock",t),n(o)},1e3)):((0,w.swap)(w.updateEntity,"lock",t,function(t){return t=(0,C.hideInvalidFields)(t),t=z.reset(t)}),n(o)))}function l(t){(0,w.swap)(w.updateEntity,"lock",t,z.stopRendering),(0,w.swap)(w.removeEntity,"lock",t)}function p(t,e){return(0,w.swap)(w.updateEntity,"lock",t,e)}function d(t){var e=(0,w.read)(w.getEntity,"lock",t);e.get("isLoadingPanePinned")||(0,w.swap)(w.updateEntity,"lock",t,function(t){return t.set("isLoadingPanePinned",!0)})}function M(t){(0,w.swap)(w.updateEntity,"lock",t,function(t){return t.set("isLoadingPanePinned",!1)})}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments[2];(0,w.swap)(w.updateEntity,"lock",t,function(t){var n=e.reduce(function(e,n){return e&&(0,C.isFieldValid)(t,n)},!0);return n?z.setSubmitting(t,!0):e.reduce(function(t,e){return(0,C.showInvalidField)(t,e)},t)});var o=(0,w.read)(w.getEntity,"lock",t);z.submitting(o)&&n(o)}function g(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(t,e,n,o){return o()};f(t,e,function(r){j.default.logIn(t,n,z.auth.params(r).toJS(),function(n,r){n?setTimeout(function(){return y(t,e,n,o)},250):h(t,r)})})}function h(t,e){var n=(0,w.read)(w.getEntity,"lock",t);z.ui.autoclose(n)?c(t,!1,function(t){return z.emitAuthenticatedEvent(t,e)}):((0,w.swap)(w.updateEntity,"lock",t,function(t){return t=z.setSubmitting(t,!1),z.setLoggedIn(t,!0)}),z.emitAuthenticatedEvent(n,e))}function y(t,e,n,o){o(t,n,e,function(){return setTimeout(function(){var o=(0,w.read)(w.getEntity,"lock",t),r=z.loginErrorMessage(o,n,N(e));["blocked_user","rule_error","lock.unauthorized"].indexOf(n.code)>-1&&z.emitAuthorizationErrorEvent(o,n),(0,w.swap)(w.updateEntity,"lock",t,z.setSubmitting,!1,r)},0)}),(0,w.swap)(w.updateEntity,"lock",t,z.setSubmitting,!1)}function N(t){if(t)return~t.indexOf("vcode")?"code":~t.indexOf("username")?"username":~t.indexOf("email")?"email":void 0}e.__esModule=!0;var m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};e.setupLock=i,e.handleAuthCallback=a,e.openLock=s,e.closeLock=c,e.removeLock=l,e.updateLock=p,e.pinLoadingPane=d,e.unpinLoadingPane=M,e.validateAndSubmit=f,e.logIn=g,e.logInSuccess=h;var D=n(9),I=(r(D),n(60)),j=r(I),w=n(12),L=n(322),v=n(2),z=o(v),b=n(160),T=n(156),C=n(7)}).call(e,function(){return this}())},function(t,e){(function(e){"use strict";function n(t){e.window.location=t}function o(){return e.window.document}function r(){return e.window}t.exports={redirect:n,getDocument:o,getWindow:r}}).call(e,function(){return this}())},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=p.exec((0,c.default)(t.toLowerCase()));return e&&e[0]}function i(t,e){return(0,l.setField)(t,"email",e,r)}function a(t){var e=p.exec((0,c.default)(t.toLowerCase()));return e?e.slice(-2)[0]:""}function u(t){var e=a(t);return e?t.slice(0,-1-e.length):t}e.__esModule=!0,e.validateEmail=r,e.setEmail=i,e.emailDomain=a,e.emailLocalPart=u;var s=n(32),c=o(s),l=n(7),p=(n(101),/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)},function(t,e){"use strict";function n(t,e,n,o){if(t&&s(t[e])!==n)throw new Error(o)}function o(t,e,n){if(("undefined"==typeof t?"undefined":s(t))!==e)throw new Error(n)}function r(t,e,n){if(e.indexOf(t)===-1)throw new Error(n)}function i(t,e,i){if(e.optional&&!t||o(t,e.type,e.message),"object"===e.type&&i)for(var a=Object.keys(i),u=0;u<a.length;u++){var s=a[u];i[s].optional&&!t[s]||i[s].condition&&!i[s].condition(t)||(n(t,s,i[s].type,i[s].message),i[s].values&&r(t[s],i[s].values,i[s].value_message))}}function a(t){return this.supportsIsArray()?Array.isArray(t):"[object Array]"===c.call(t)}function u(){return null!=Array.isArray}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=Object.prototype.toString;t.exports={check:i,attribute:n,variable:o,value:r,isArray:a,supportsIsArray:u}},[360,4,3],3,function(t,e){"use strict";function n(t){return t.replace(/^\s*|\s*$/g,"")}e=t.exports=n,e.left=function(t){return t.replace(/^\s*/,"")},e.right=function(t){return t.replace(/\s*$/,"")}},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.closeHandler=M.closeLock,e.key="auxiliarypane",e.lock=t,g.loggedIn(t)?l.default.createElement(N,e):null}e.__esModule=!0,e.renderSignedInConfirmation=s;var c=n(1),l=r(c),p=n(97),d=r(p),M=n(26),f=n(2),g=o(f),h=n(13),y=o(h),N=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.handleClose=function(){var t=this.props,e=t.closeHandler,n=t.lock;e(g.id(n))},e.prototype.render=function(){var t=this.props.lock,e=g.ui.closable(t)?this.handleClose.bind(this):void 0;return l.default.createElement(d.default,{closeHandler:e},l.default.createElement("p",null,y.html(t,["success","logIn"])))},e}(l.default.Component);e.default=N,N.propTypes={closeHandler:l.default.PropTypes.func.isRequired,lock:l.default.PropTypes.object.isRequired}},function(t,e,n){"use strict";function o(t){return function(e,n){var o;return e||n?(!e&&n.err&&(e=n.err,n=null),e?(o={original:e},e.response&&e.response.statusCode&&(o.statusCode=e.response.statusCode),e.response&&e.response.statusText&&(o.statusText=e.response.statusText),e.response&&e.response.body&&(e=e.response.body),e.err&&(e=e.err),o.code=e.error||e.code||e.error_code||e.status||null,o.description=e.error_description||e.description||e.error||e.details||e.err||null,e.name&&(o.name=e.name),e.policy&&(o.policy=e.policy),t(o)):t(null,n.type&&"text/html"===n.type?n.text:i.toCamelCase(n.body||n))):t(r.buildResponse("generic_error","Something went wrong"))}}var r=n(104),i=n(15);t.exports=o},function(t,e,n){"use strict";function o(t){if(h){var e=t.node,n=t.children;if(n.length)for(var o=0;o<n.length;o++)y(e,n[o],null);else null!=t.html?p(e,t.html):null!=t.text&&M(e,t.text)}}function r(t,e){t.parentNode.replaceChild(e.node,t),o(e)}function i(t,e){h?t.children.push(e):t.node.appendChild(e.node)}function a(t,e){h?t.html=e:p(t.node,e)}function u(t,e){h?t.text=e:M(t.node,e)}function s(){return this.node.nodeName}function c(t){return{node:t,children:[],html:null,text:null,toString:s}}var l=n(69),p=n(58),d=n(77),M=n(132),f=1,g=11,h="undefined"!=typeof document&&"number"==typeof document.documentMode||"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent&&/\bEdge\/\d/.test(navigator.userAgent),y=d(function(t,e,n){e.node.nodeType===g||e.node.nodeType===f&&"object"===e.node.nodeName.toLowerCase()&&(null==e.node.namespaceURI||e.node.namespaceURI===l.html)?(o(e),t.insertBefore(e.node,n)):(t.insertBefore(e.node,n),o(e))});c.insertTreeBefore=y,c.replaceChildWithTree=r,c.queueChild=i,c.queueHTML=a,c.queueText=u,t.exports=c},function(t,e,n){"use strict";function o(t,e){return(t&e)===e}var r=n(4),i=(n(3),{MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,injectDOMPropertyConfig:function(t){var e=i,n=t.Properties||{},a=t.DOMAttributeNamespaces||{},s=t.DOMAttributeNames||{},c=t.DOMPropertyNames||{},l=t.DOMMutationMethods||{};t.isCustomAttribute&&u._isCustomAttributeFunctions.push(t.isCustomAttribute);for(var p in n){u.properties.hasOwnProperty(p)?r("48",p):void 0;var d=p.toLowerCase(),M=n[p],f={attributeName:d,attributeNamespace:null,propertyName:p,mutationMethod:null,mustUseProperty:o(M,e.MUST_USE_PROPERTY),hasBooleanValue:o(M,e.HAS_BOOLEAN_VALUE),hasNumericValue:o(M,e.HAS_NUMERIC_VALUE),hasPositiveNumericValue:o(M,e.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:o(M,e.HAS_OVERLOADED_BOOLEAN_VALUE)};if(f.hasBooleanValue+f.hasNumericValue+f.hasOverloadedBooleanValue<=1?void 0:r("50",p),s.hasOwnProperty(p)){var g=s[p];f.attributeName=g}a.hasOwnProperty(p)&&(f.attributeNamespace=a[p]),c.hasOwnProperty(p)&&(f.propertyName=c[p]),l.hasOwnProperty(p)&&(f.mutationMethod=l[p]),u.properties[p]=f}}}),a=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",u={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:a,ATTRIBUTE_NAME_CHAR:a+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",properties:{},getPossibleStandardName:null,_isCustomAttributeFunctions:[],isCustomAttribute:function(t){for(var e=0;e<u._isCustomAttributeFunctions.length;e++){var n=u._isCustomAttributeFunctions[e];if(n(t))return!0}return!1},injection:i};t.exports=u},function(t,e,n){"use strict";function o(){r.attachRefs(this,this._currentElement)}var r=n(247),i=(n(14),n(5),{mountComponent:function(t,e,n,r,i,a){var u=t.mountComponent(e,n,r,i,a);return t._currentElement&&null!=t._currentElement.ref&&e.getReactMountReady().enqueue(o,t),u},getHostNode:function(t){return t.getHostNode()},unmountComponent:function(t,e){r.detachRefs(t,t._currentElement),t.unmountComponent(e)},receiveComponent:function(t,e,n,i){var a=t._currentElement;if(e!==a||i!==t._context){var u=r.shouldUpdateRefs(a,e);u&&r.detachRefs(t,a),t.receiveComponent(e,n,i),u&&t._currentElement&&null!=t._currentElement.ref&&n.getReactMountReady().enqueue(o,t)}},performUpdateIfNecessary:function(t,e,n){t._updateBatchNumber===n&&t.performUpdateIfNecessary(e)}});t.exports=i},function(t,e,n){"use strict";function o(t){return void 0!==t.ref}function r(t){return void 0!==t.key}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=n(40),u=n(22),s=(n(23),n(141),Object.prototype.hasOwnProperty),c=n(139),l={key:!0,ref:!0,__self:!0,__source:!0},p=function(t,e,n,o,r,i,a){var u={$$typeof:c,type:t,key:e,ref:n,props:a,_owner:i};return u};p.createElement=function(t,e,n){var i,a={},c=null,d=null,M=null,f=null;if(null!=e){o(e)&&(d=e.ref),r(e)&&(c=""+e.key),M=void 0===e.__self?null:e.__self,f=void 0===e.__source?null:e.__source;for(i in e)s.call(e,i)&&!l.hasOwnProperty(i)&&(a[i]=e[i])}var g=arguments.length-2;if(1===g)a.children=n;else if(g>1){for(var h=Array(g),y=0;y<g;y++)h[y]=arguments[y+2];a.children=h}if(t&&t.defaultProps){var N=t.defaultProps;for(i in N)void 0===a[i]&&(a[i]=N[i])}return p(t,c,d,M,f,u.current,a)},p.createFactory=function(t){var e=p.createElement.bind(null,t);return e.type=t,e},p.cloneAndReplaceKey=function(t,e){var n=p(t.type,e,t.ref,t._self,t._source,t._owner,t.props);return n},p.cloneElement=function(t,e,n){var i,c=a({},t.props),d=t.key,M=t.ref,f=t._self,g=t._source,h=t._owner;if(null!=e){o(e)&&(M=e.ref,h=u.current),r(e)&&(d=""+e.key);var y;t.type&&t.type.defaultProps&&(y=t.type.defaultProps);for(i in e)s.call(e,i)&&!l.hasOwnProperty(i)&&(void 0===e[i]&&void 0!==y?c[i]=y[i]:c[i]=e[i])}var N=arguments.length-2;if(1===N)c.children=n;else if(N>1){for(var m=Array(N),D=0;D<N;D++)m[D]=arguments[D+2];c.children=m}return p(t.type,d,M,f,g,h,c)},p.isValidElement=function(t){return"object"===("undefined"==typeof t?"undefined":i(t))&&null!==t&&t.$$typeof===c},t.exports=p},4,8,function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=(0,I.read)(I.getEntity,"lock",t),o=(0,C.databaseLogInWithEmail)(n)?"email":"username",r=T.getFieldValue(n,o),i={connection:(0,C.databaseConnectionName)(n),username:r,password:T.getFieldValue(n,"password")},a=[o,"password"],u=T.getFieldValue(n,"mfa_code");e&&(i.mfa_code=u,a.push("mfa_code")),(0,L.logIn)(t,a,i,function(t,e,n,o){return"a0.mfa_required"===e.error?m(t):o()})}function a(t){var e=(0,I.read)(I.getEntity,"lock",t),n=["email","password"];(0,C.databaseConnectionRequiresUsername)(e)&&n.push("username"),(0,C.additionalSignUpFields)(e).forEach(function(t){return n.push(t.get("name"))}),(0,L.validateAndSubmit)(t,n,function(e){var n={connection:(0,C.databaseConnectionName)(e),email:T.getFieldValue(e,"email"),password:T.getFieldValue(e,"password"),autoLogin:(0,C.shouldAutoLogin)(e)};(0,C.databaseConnectionRequiresUsername)(e)&&(n.username=T.getFieldValue(e,"username")),(0,C.additionalSignUpFields)(e).isEmpty()||(n.user_metadata={},(0,C.additionalSignUpFields)(e).forEach(function(t){n.user_metadata[t.get("name")]=T.getFieldValue(e,t.get("name"))})),w.default.signUp(t,n,function(e){for(var n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];e?setTimeout(function(){return s(t,e)},250):u.apply(void 0,[t].concat(o))})})}function u(t,e,n){var o=(0,I.read)(I.getEntity,"lock",t);if((0,C.shouldAutoLogin)(o)){(0,I.swap)(I.updateEntity,"lock",t,function(t){return t.set("signedUp",!0)});var r={connection:(0,C.databaseConnectionName)(o),username:T.email(o),password:T.password(o)};return n&&(r.popupHandler=n),w.default.logIn(t,r,z.auth.params(o).toJS(),function(e){for(var n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];e?setTimeout(function(){return c(t,e)},250):L.logInSuccess.apply(void 0,[t].concat(o))})}var i=z.ui.autoclose(o);i?(0,L.closeLock)(t,!1):(0,I.swap)(I.updateEntity,"lock",t,function(t){return z.setSubmitting(t,!1).set("signedUp",!0)})}function s(t,e){var n=(0,I.read)(I.getEntity,"lock",t),o={PasswordDictionaryError:"password_dictionary_error",PasswordNoUserInfoError:"password_no_user_info_error",PasswordStrengthError:"password_strength_error"},r="invalid_password"===e.code&&o[e.description]||e.code,i=k.str(n,["error","signUp",r])||k.str(n,["error","signUp","lock.fallback"]);(0,I.swap)(I.updateEntity,"lock",t,z.setSubmitting,!1,i)}function c(t,e){(0,I.swap)(I.updateEntity,"lock",t,function(t){if((0,C.hasScreen)(t,"login")){var n=z.loginErrorMessage(t,e);return z.setSubmitting((0,C.setScreen)(t,"login"),!1,n)}var o=new Error("Autologin failed and no the login screen is not allowed.");return o.code="autologin_error",o.origin=e,z.setSubmitting(z.stop(t,o),!1)})}function l(t){(0,L.validateAndSubmit)(t,["email"],function(e){var n={connection:(0,C.databaseConnectionName)(e),email:T.getFieldValue(e,"email")};w.default.resetPassword(t,n,function(e){e?setTimeout(function(){return d(t,e)},250):p(t)})})}function p(t){var e=(0,I.read)(I.getEntity,"lock",t);(0,C.hasScreen)(e,"login")?((0,I.swap)(I.updateEntity,"lock",t,function(t){return(0,C.setScreen)(z.setSubmitting(t,!1),"login")}),setTimeout(function(){var n=k.str(e,["success","forgotPassword"]);(0,I.swap)(I.updateEntity,"lock",t,z.setGlobalSuccess,n)},500)):z.ui.autoclose(e)?(0,L.closeLock)(t):(0,I.swap)(I.updateEntity,"lock",t,function(t){return z.setSubmitting(t,!1).set("passwordResetted",!0)})}function d(t,e){var n=(0,I.read)(I.getEntity,"lock",t),o=k.str(n,["error","forgotPassword",e.code])||k.str(n,["error","forgotPassword","lock.fallback"]);(0,I.swap)(I.updateEntity,"lock",t,z.setSubmitting,!1,o)}function M(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["password"];(0,I.swap)(I.updateEntity,"lock",t,C.setScreen,"login",e)}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["password"];(0,I.swap)(I.updateEntity,"lock",t,C.setScreen,"signUp",e)}function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["password"];(0,I.swap)(I.updateEntity,"lock",t,C.setScreen,"forgotPassword",e)}function h(t){return M(t)}function y(t){return M(t)}function N(t){(0,I.swap)(I.updateEntity,"lock",t,C.toggleTermsAcceptance)}function m(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["mfa_code"];(0,I.swap)(I.updateEntity,"lock",t,C.setScreen,"mfaLogin",e)}e.__esModule=!0,e.logIn=i,e.signUp=a,e.resetPassword=l,e.showLoginActivity=M,e.showSignUpActivity=f,e.showResetPasswordActivity=g,e.cancelResetPassword=h,e.cancelMFALogin=y,e.toggleTermsAcceptance=N,e.showLoginMFAActivity=m;var D=n(9),I=(r(D),n(12)),j=n(60),w=r(j),L=n(26),v=n(2),z=o(v),b=n(7),T=o(b),C=n(11),E=n(13),k=o(E)},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){return D(t,d.default.fromJS(u(e)))}function a(t){return["oauth1","oauth2"].indexOf(t.get("strategy"))!==-1?t.get("name"):h[t.get("strategy")]}function u(t){var e={},n=t.socialButtonStyle;return["big","small"].indexOf(n)>-1&&(e.socialButtonStyle=n),e}function s(t){return f.connections(t,"social")}function c(t){return f.ui.authButtonsTheme(t)}function l(t,e){var n=m(t,"socialButtonStyle")||N(t,"socialButtonStyle");return n?"big"===n:f.connections(t,"social").count()<=e}e.__esModule=!0,e.STRATEGIES=void 0,e.initSocial=i,e.displayName=a,e.processSocialOptions=u,e.socialConnections=s,e.authButtonsTheme=c,e.useBigButtons=l;var p=n(9),d=r(p),M=n(2),f=o(M),g=n(18),h=e.STRATEGIES={amazon:"Amazon",aol:"Aol",baidu:"ç™¾åº¦",bitbucket:"Bitbucket",box:"Box",dropbox:"Dropbox",dwolla:"Dwolla",ebay:"ebay",exact:"Exact",facebook:"Facebook",fitbit:"Fitbit",github:"GitHub","google-openid":"Google OpenId","google-oauth2":"Google",instagram:"Instagram",linkedin:"LinkedIn",miicard:"miiCard",paypal:"PayPal",planningcenter:"Planning Center",renren:"äººäºº",salesforce:"Salesforce","salesforce-community":"Salesforce Community","salesforce-sandbox":"Salesforce (sandbox)",shopify:"Shopify",soundcloud:"Soundcloud",thecity:"The City","thecity-sandbox":"The City (sandbox)",thirtysevensignals:"37 Signals",twitter:"Twitter",vkontakte:"vKontakte",windowslive:"Microsoft Account",wordpress:"Wordpress",yahoo:"Yahoo!",yammer:"Yammer",yandex:"Yandex",weibo:"æ–°æµªå¾®åš"},y=(0,g.dataFns)(["social"]),N=y.get,m=y.tget,D=y.initNS},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var u=n(1),s=o(u),c=function(t){function e(){return r(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.render=function(){var t=this.props,e=t.before,n=t.focused,o=t.invalidHint,r=t.isValid,i=t.name,a=t.icon,u="auth0-lock-input-block auth0-lock-input-"+i;r||(u+=" auth0-lock-error");var c="auth0-lock-input-wrap";n&&r&&(c+=" auth0-lock-focused");var l=null;"string"==typeof a?l=s.default.createElement("span",{dangerouslySetInnerHTML:{__html:a}}):a&&(l=a),l&&(c+=" auth0-lock-input-wrap-with-icon");var p=!r&&o?s.default.createElement("div",{className:"auth0-lock-error-msg"},s.default.createElement("span",null,o)):null;return s.default.createElement("div",{className:u},e,s.default.createElement("div",{className:c},l,this.props.children),p)},e}(s.default.Component);e.default=c,c.propTypes={before:s.default.PropTypes.element,children:s.default.PropTypes.oneOfType([s.default.PropTypes.element.isRequired,s.default.PropTypes.arrayOf(s.default.PropTypes.element).isRequired]),focused:s.default.PropTypes.bool,invalidHint:s.default.PropTypes.string,isValid:s.default.PropTypes.bool.isRequired,name:s.default.PropTypes.string.isRequired,svg:s.default.PropTypes.string}},function(t,e,n){"use strict";t.exports=n(115)},function(t,e,n){"use strict";function o(t){return"button"===t||"input"===t||"select"===t||"textarea"===t}function r(t,e,n){switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":return!(!n.disabled||!o(e));default:return!1}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=n(4),u=n(70),s=n(71),c=n(75),l=n(125),p=n(126),d=(n(3),{}),M=null,f=function(t,e){t&&(s.executeDispatchesInOrder(t,e),t.isPersistent()||t.constructor.release(t))},g=function(t){return f(t,!0)},h=function(t){return f(t,!1)},y=function(t){return"."+t._rootNodeID},N={injection:{injectEventPluginOrder:u.injectEventPluginOrder,injectEventPluginsByName:u.injectEventPluginsByName},putListener:function(t,e,n){"function"!=typeof n?a("94",e,"undefined"==typeof n?"undefined":i(n)):void 0;var o=y(t),r=d[e]||(d[e]={});r[o]=n;var s=u.registrationNameModules[e];s&&s.didPutListener&&s.didPutListener(t,e,n)},getListener:function(t,e){var n=d[e];if(r(e,t._currentElement.type,t._currentElement.props))return null;var o=y(t);return n&&n[o]},deleteListener:function(t,e){var n=u.registrationNameModules[e];n&&n.willDeleteListener&&n.willDeleteListener(t,e);var o=d[e];if(o){var r=y(t);delete o[r]}},deleteAllListeners:function(t){var e=y(t);for(var n in d)if(d.hasOwnProperty(n)&&d[n][e]){var o=u.registrationNameModules[n];o&&o.willDeleteListener&&o.willDeleteListener(t,n),delete d[n][e]}},extractEvents:function(t,e,n,o){for(var r,i=u.plugins,a=0;a<i.length;a++){var s=i[a];if(s){var c=s.extractEvents(t,e,n,o);c&&(r=l(r,c))}}return r},enqueueEvents:function(t){t&&(M=l(M,t))},processEventQueue:function(t){var e=M;M=null,t?p(e,g):p(e,h),M?a("95"):void 0,c.rethrowCaughtError()},__purge:function(){d={}},__getListenerBank:function(){return d}};t.exports=N},function(t,e,n){"use strict";function o(t,e,n){var o=e.dispatchConfig.phasedRegistrationNames[n];return y(t,o)}function r(t,e,n){var r=o(t,n,e);r&&(n._dispatchListeners=g(n._dispatchListeners,r),n._dispatchInstances=g(n._dispatchInstances,t))}function i(t){t&&t.dispatchConfig.phasedRegistrationNames&&f.traverseTwoPhase(t._targetInst,r,t)}function a(t){if(t&&t.dispatchConfig.phasedRegistrationNames){var e=t._targetInst,n=e?f.getParentInstance(e):null;f.traverseTwoPhase(n,r,t)}}function u(t,e,n){if(n&&n.dispatchConfig.registrationName){var o=n.dispatchConfig.registrationName,r=y(t,o);r&&(n._dispatchListeners=g(n._dispatchListeners,r),n._dispatchInstances=g(n._dispatchInstances,t))}}function s(t){t&&t.dispatchConfig.registrationName&&u(t._targetInst,null,t)}function c(t){h(t,i)}function l(t){h(t,a)}function p(t,e,n,o){f.traverseEnterLeave(n,o,u,t,e)}function d(t){h(t,s)}var M=n(45),f=n(71),g=n(125),h=n(126),y=(n(5),M.getListener),N={accumulateTwoPhaseDispatches:c,accumulateTwoPhaseDispatchesSkipTarget:l,accumulateDirectDispatches:d,accumulateEnterLeaveDispatches:p};t.exports=N},function(t,e){"use strict";var n={remove:function(t){t._reactInternalInstance=void 0},get:function(t){return t._reactInternalInstance},has:function(t){return void 0!==t._reactInternalInstance},set:function(t,e){t._reactInternalInstance=e}};t.exports=n},function(t,e,n){"use strict";function o(t,e,n,o){return r.call(this,t,e,n,o)}var r=n(19),i=n(80),a={view:function(t){if(t.view)return t.view;var e=i(t);if(e.window===e)return e;var n=e.ownerDocument;return n?n.defaultView||n.parentWindow:window},detail:function(t){return t.detail||0}};r.augmentClass(o,a),
t.exports=o},function(t,e){"use strict";function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function r(t){if(l===setTimeout)return setTimeout(t,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function i(t){if(p===clearTimeout)return clearTimeout(t);if((p===o||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(e){try{return p.call(null,t)}catch(e){return p.call(this,t)}}}function a(){g&&M&&(g=!1,M.length?f=M.concat(f):h=-1,f.length&&u())}function u(){if(!g){var t=r(a);g=!0;for(var e=f.length;e;){for(M=f,f=[];++h<e;)M&&M[h].run();h=-1,e=f.length}M=null,g=!1,i(t)}}function s(t,e){this.fun=t,this.array=e}function c(){}var l,p,d=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(t){l=n}try{p="function"==typeof clearTimeout?clearTimeout:o}catch(t){p=o}}();var M,f=[],g=!1,h=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];f.push(new s(t,e)),1!==f.length||g||r(u)},s.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){(function(t){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t,e){return e.reduce(function(t,e){return t.deleteIn(N(e))},t)}function i(t,e){return"ok"===m(t,e)}function a(t){var e=j(h(t,[],(0,l.Map)()));return e.length>0&&e.reduce(function(e,n){return e&&!s(t,n)},!0)}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=j(r(h(t,[],(0,l.Map)()),e));return n.length>0&&n.reduce(function(e,n){return e||"error"===m(t,n)},!1)}function s(t,e){return["loading","pending","waiting"].indexOf(m(t,e))>-1}function c(t,e,n){var o=D(t,e,"error");if("sso"!==e){var r=new Error("An error ocurred when fetching data.");r.code="sync",r.origin=n,o=M.stop(o,r)}return o}e.__esModule=!0,e.go=void 0,e.isSuccess=i,e.isDone=a,e.hasError=u;var l=n(9),p=n(18),d=n(2),M=o(d),f=n(12),g=(0,p.dataFns)(["sync"]),h=g.get,y=g.set;e.default=function(t,e,n){if(void 0!==h(t,e))return t;var o=n.waitFn?"waiting":!n.conditionFn||n.conditionFn(t)?"pending":"no";return y(t,e,(0,l.Map)({conditionFn:n.conditionFn,errorFn:n.errorFn,recoverResult:n.recoverResult,syncStatus:o,successFn:n.successFn,syncFn:n.syncFn,timeout:n.timeout||6e3,waitFn:n.waitFn}))};var N=function(e){return(t.Array.isArray(e)?e:[e]).concat(["syncStatus"])},m=function(t,e){return h(t,N(e))},D=function(t,e,n){return y(t,N(e),n)},I=function(t,e,n){return h(t,e).get(n)},j=function t(e){return e.reduce(function(e,n,o){var r=l.Map.isMap(n)&&n.has("syncStatus")?[o]:[],i=l.Map.isMap(n)?t(n).map(function(t){return[o].concat(t)}):[];return e.concat.apply(e,[r].concat([i]))},[])},w=function(t,e){var n=j(h(t,[],(0,l.Map)()));return n.reduce(function(t,n){if("function"!=typeof I(t,n,"syncFn"))return t;if("pending"===m(t,n))!function(){t=D(t,n,"loading");var o=!1;I(t,n,"syncFn")(t,function(r,i){o||(o=!0,setTimeout(function(){(0,f.swap)(f.updateEntity,"lock",e,function(e){var o=I(t,n,"errorFn");r&&"function"==typeof o&&setTimeout(function(){return o(e,r)},0);var a=I(e,n,"recoverResult");return r&&void 0===a?c(e,n,r):(e=D(e,n,"ok"),I(e,n,"successFn")(e,r?a:i))})},0))})}();else if("waiting"===m(t,n)&&I(t,n,"waitFn")(t)){var o=I(t,n,"conditionFn");t=D(t,n,!o||o(t)?"pending":"no")}return t},t)};e.go=function(t){(0,f.observe)("sync",t,function(e){setTimeout(function(){return(0,f.swap)(f.updateEntity,"lock",t,w,t)},0)})}}).call(e,function(){return this}())},function(t,e){"use strict";function n(t){this.disableWarnings=t.disableWarnings}n.prototype.warning=function(t){this.disableWarnings||console.warn(t)},t.exports=n},function(t,e,n){"use strict";var o=n(102),r=n(181),i=n(182),a=n(105);t.exports={Authentication:o,Management:r,WebAuth:i,version:a.raw}},function(t,e,n){var o,r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};(function(){function n(t){function e(e,n,o,r,i,a){for(;i>=0&&i<a;i+=t){var u=r?r[i]:i;o=n(o,e[u],u,e)}return o}return function(n,o,r,i){o=L(o,i,4);var a=!k(n)&&w.keys(n),u=(a||n).length,s=t>0?0:u-1;return arguments.length<3&&(r=n[a?a[s]:s],s+=t),e(n,o,r,a,s,u)}}function a(t){return function(e,n,o){n=v(n,o);for(var r=E(e),i=t>0?0:r-1;i>=0&&i<r;i+=t)if(n(e[i],i,e))return i;return-1}}function u(t,e,n){return function(o,r,i){var a=0,u=E(o);if("number"==typeof i)t>0?a=i>=0?i:Math.max(i+u,a):u=i>=0?Math.min(i+1,u):i+u+1;else if(n&&i&&u)return i=n(o,r),o[i]===r?i:-1;if(r!==r)return i=e(g.call(o,a,u),w.isNaN),i>=0?i+a:-1;for(i=t>0?a:u-1;i>=0&&i<u;i+=t)if(o[i]===r)return i;return-1}}function s(t,e){var n=_.length,o=t.constructor,r=w.isFunction(o)&&o.prototype||d,i="constructor";for(w.has(t,i)&&!w.contains(e,i)&&e.push(i);n--;)i=_[n],i in t&&t[i]!==r[i]&&!w.contains(e,i)&&e.push(i)}var c=this,l=c._,p=Array.prototype,d=Object.prototype,M=Function.prototype,f=p.push,g=p.slice,h=d.toString,y=d.hasOwnProperty,N=Array.isArray,m=Object.keys,D=M.bind,I=Object.create,j=function(){},w=function t(e){return e instanceof t?e:this instanceof t?void(this._wrapped=e):new t(e)};"undefined"!=typeof t&&t.exports&&(e=t.exports=w),e._=w,w.VERSION="1.8.3";var L=function(t,e,n){if(void 0===e)return t;switch(null==n?3:n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)};case 4:return function(n,o,r,i){return t.call(e,n,o,r,i)}}return function(){return t.apply(e,arguments)}},v=function(t,e,n){return null==t?w.identity:w.isFunction(t)?L(t,e,n):w.isObject(t)?w.matcher(t):w.property(t)};w.iteratee=function(t,e){return v(t,e,1/0)};var z=function(t,e){return function(n){var o=arguments.length;if(o<2||null==n)return n;for(var r=1;r<o;r++)for(var i=arguments[r],a=t(i),u=a.length,s=0;s<u;s++){var c=a[s];e&&void 0!==n[c]||(n[c]=i[c])}return n}},b=function(t){if(!w.isObject(t))return{};if(I)return I(t);j.prototype=t;var e=new j;return j.prototype=null,e},T=function(t){return function(e){return null==e?void 0:e[t]}},C=Math.pow(2,53)-1,E=T("length"),k=function(t){var e=E(t);return"number"==typeof e&&e>=0&&e<=C};w.each=w.forEach=function(t,e,n){e=L(e,n);var o,r;if(k(t))for(o=0,r=t.length;o<r;o++)e(t[o],o,t);else{var i=w.keys(t);for(o=0,r=i.length;o<r;o++)e(t[i[o]],i[o],t)}return t},w.map=w.collect=function(t,e,n){e=v(e,n);for(var o=!k(t)&&w.keys(t),r=(o||t).length,i=Array(r),a=0;a<r;a++){var u=o?o[a]:a;i[a]=e(t[u],u,t)}return i},w.reduce=w.foldl=w.inject=n(1),w.reduceRight=w.foldr=n(-1),w.find=w.detect=function(t,e,n){var o;if(o=k(t)?w.findIndex(t,e,n):w.findKey(t,e,n),void 0!==o&&o!==-1)return t[o]},w.filter=w.select=function(t,e,n){var o=[];return e=v(e,n),w.each(t,function(t,n,r){e(t,n,r)&&o.push(t)}),o},w.reject=function(t,e,n){return w.filter(t,w.negate(v(e)),n)},w.every=w.all=function(t,e,n){e=v(e,n);for(var o=!k(t)&&w.keys(t),r=(o||t).length,i=0;i<r;i++){var a=o?o[i]:i;if(!e(t[a],a,t))return!1}return!0},w.some=w.any=function(t,e,n){e=v(e,n);for(var o=!k(t)&&w.keys(t),r=(o||t).length,i=0;i<r;i++){var a=o?o[i]:i;if(e(t[a],a,t))return!0}return!1},w.contains=w.includes=w.include=function(t,e,n,o){return k(t)||(t=w.values(t)),("number"!=typeof n||o)&&(n=0),w.indexOf(t,e,n)>=0},w.invoke=function(t,e){var n=g.call(arguments,2),o=w.isFunction(e);return w.map(t,function(t){var r=o?e:t[e];return null==r?r:r.apply(t,n)})},w.pluck=function(t,e){return w.map(t,w.property(e))},w.where=function(t,e){return w.filter(t,w.matcher(e))},w.findWhere=function(t,e){return w.find(t,w.matcher(e))},w.max=function(t,e,n){var o,r,i=-(1/0),a=-(1/0);if(null==e&&null!=t){t=k(t)?t:w.values(t);for(var u=0,s=t.length;u<s;u++)o=t[u],o>i&&(i=o)}else e=v(e,n),w.each(t,function(t,n,o){r=e(t,n,o),(r>a||r===-(1/0)&&i===-(1/0))&&(i=t,a=r)});return i},w.min=function(t,e,n){var o,r,i=1/0,a=1/0;if(null==e&&null!=t){t=k(t)?t:w.values(t);for(var u=0,s=t.length;u<s;u++)o=t[u],o<i&&(i=o)}else e=v(e,n),w.each(t,function(t,n,o){r=e(t,n,o),(r<a||r===1/0&&i===1/0)&&(i=t,a=r)});return i},w.shuffle=function(t){for(var e,n=k(t)?t:w.values(t),o=n.length,r=Array(o),i=0;i<o;i++)e=w.random(0,i),e!==i&&(r[i]=r[e]),r[e]=n[i];return r},w.sample=function(t,e,n){return null==e||n?(k(t)||(t=w.values(t)),t[w.random(t.length-1)]):w.shuffle(t).slice(0,Math.max(0,e))},w.sortBy=function(t,e,n){return e=v(e,n),w.pluck(w.map(t,function(t,n,o){return{value:t,index:n,criteria:e(t,n,o)}}).sort(function(t,e){var n=t.criteria,o=e.criteria;if(n!==o){if(n>o||void 0===n)return 1;if(n<o||void 0===o)return-1}return t.index-e.index}),"value")};var S=function(t){return function(e,n,o){var r={};return n=v(n,o),w.each(e,function(o,i){var a=n(o,i,e);t(r,o,a)}),r}};w.groupBy=S(function(t,e,n){w.has(t,n)?t[n].push(e):t[n]=[e]}),w.indexBy=S(function(t,e,n){t[n]=e}),w.countBy=S(function(t,e,n){w.has(t,n)?t[n]++:t[n]=1}),w.toArray=function(t){return t?w.isArray(t)?g.call(t):k(t)?w.map(t,w.identity):w.values(t):[]},w.size=function(t){return null==t?0:k(t)?t.length:w.keys(t).length},w.partition=function(t,e,n){e=v(e,n);var o=[],r=[];return w.each(t,function(t,n,i){(e(t,n,i)?o:r).push(t)}),[o,r]},w.first=w.head=w.take=function(t,e,n){if(null!=t)return null==e||n?t[0]:w.initial(t,t.length-e)},w.initial=function(t,e,n){return g.call(t,0,Math.max(0,t.length-(null==e||n?1:e)))},w.last=function(t,e,n){if(null!=t)return null==e||n?t[t.length-1]:w.rest(t,Math.max(0,t.length-e))},w.rest=w.tail=w.drop=function(t,e,n){return g.call(t,null==e||n?1:e)},w.compact=function(t){return w.filter(t,w.identity)};var x=function t(e,n,o,r){for(var i=[],a=0,u=r||0,s=E(e);u<s;u++){var c=e[u];if(k(c)&&(w.isArray(c)||w.isArguments(c))){n||(c=t(c,n,o));var l=0,p=c.length;for(i.length+=p;l<p;)i[a++]=c[l++]}else o||(i[a++]=c)}return i};w.flatten=function(t,e){return x(t,e,!1)},w.without=function(t){return w.difference(t,g.call(arguments,1))},w.uniq=w.unique=function(t,e,n,o){w.isBoolean(e)||(o=n,n=e,e=!1),null!=n&&(n=v(n,o));for(var r=[],i=[],a=0,u=E(t);a<u;a++){var s=t[a],c=n?n(s,a,t):s;e?(a&&i===c||r.push(s),i=c):n?w.contains(i,c)||(i.push(c),r.push(s)):w.contains(r,s)||r.push(s)}return r},w.union=function(){return w.uniq(x(arguments,!0,!0))},w.intersection=function(t){for(var e=[],n=arguments.length,o=0,r=E(t);o<r;o++){var i=t[o];if(!w.contains(e,i)){for(var a=1;a<n&&w.contains(arguments[a],i);a++);a===n&&e.push(i)}}return e},w.difference=function(t){var e=x(arguments,!0,!0,1);return w.filter(t,function(t){return!w.contains(e,t)})},w.zip=function(){return w.unzip(arguments)},w.unzip=function(t){for(var e=t&&w.max(t,E).length||0,n=Array(e),o=0;o<e;o++)n[o]=w.pluck(t,o);return n},w.object=function(t,e){for(var n={},o=0,r=E(t);o<r;o++)e?n[t[o]]=e[o]:n[t[o][0]]=t[o][1];return n},w.findIndex=a(1),w.findLastIndex=a(-1),w.sortedIndex=function(t,e,n,o){n=v(n,o,1);for(var r=n(e),i=0,a=E(t);i<a;){var u=Math.floor((i+a)/2);n(t[u])<r?i=u+1:a=u}return i},w.indexOf=u(1,w.findIndex,w.sortedIndex),w.lastIndexOf=u(-1,w.findLastIndex),w.range=function(t,e,n){null==e&&(e=t||0,t=0),n=n||1;for(var o=Math.max(Math.ceil((e-t)/n),0),r=Array(o),i=0;i<o;i++,t+=n)r[i]=t;return r};var O=function(t,e,n,o,r){if(!(o instanceof e))return t.apply(n,r);var i=b(t.prototype),a=t.apply(i,r);return w.isObject(a)?a:i};w.bind=function(t,e){if(D&&t.bind===D)return D.apply(t,g.call(arguments,1));if(!w.isFunction(t))throw new TypeError("Bind must be called on a function");var n=g.call(arguments,2),o=function o(){return O(t,o,e,this,n.concat(g.call(arguments)))};return o},w.partial=function(t){var e=g.call(arguments,1),n=function n(){for(var o=0,r=e.length,i=Array(r),a=0;a<r;a++)i[a]=e[a]===w?arguments[o++]:e[a];for(;o<arguments.length;)i.push(arguments[o++]);return O(t,n,this,this,i)};return n},w.bindAll=function(t){var e,n,o=arguments.length;if(o<=1)throw new Error("bindAll must be passed function names");for(e=1;e<o;e++)n=arguments[e],t[n]=w.bind(t[n],t);return t},w.memoize=function(t,e){var n=function n(o){var r=n.cache,i=""+(e?e.apply(this,arguments):o);return w.has(r,i)||(r[i]=t.apply(this,arguments)),r[i]};return n.cache={},n},w.delay=function(t,e){var n=g.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},w.defer=w.partial(w.delay,w,1),w.throttle=function(t,e,n){var o,r,i,a=null,u=0;n||(n={});var s=function(){u=n.leading===!1?0:w.now(),a=null,i=t.apply(o,r),a||(o=r=null)};return function(){var c=w.now();u||n.leading!==!1||(u=c);var l=e-(c-u);return o=this,r=arguments,l<=0||l>e?(a&&(clearTimeout(a),a=null),u=c,i=t.apply(o,r),a||(o=r=null)):a||n.trailing===!1||(a=setTimeout(s,l)),i}},w.debounce=function(t,e,n){var o,r,i,a,u,s=function s(){var c=w.now()-a;c<e&&c>=0?o=setTimeout(s,e-c):(o=null,n||(u=t.apply(i,r),o||(i=r=null)))};return function(){i=this,r=arguments,a=w.now();var c=n&&!o;return o||(o=setTimeout(s,e)),c&&(u=t.apply(i,r),i=r=null),u}},w.wrap=function(t,e){return w.partial(e,t)},w.negate=function(t){return function(){return!t.apply(this,arguments)}},w.compose=function(){var t=arguments,e=t.length-1;return function(){for(var n=e,o=t[e].apply(this,arguments);n--;)o=t[n].call(this,o);return o}},w.after=function(t,e){return function(){if(--t<1)return e.apply(this,arguments)}},w.before=function(t,e){var n;return function(){return--t>0&&(n=e.apply(this,arguments)),t<=1&&(e=null),n}},w.once=w.partial(w.before,2);var A=!{toString:null}.propertyIsEnumerable("toString"),_=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];w.keys=function(t){if(!w.isObject(t))return[];if(m)return m(t);var e=[];for(var n in t)w.has(t,n)&&e.push(n);return A&&s(t,e),e},w.allKeys=function(t){if(!w.isObject(t))return[];var e=[];for(var n in t)e.push(n);return A&&s(t,e),e},w.values=function(t){for(var e=w.keys(t),n=e.length,o=Array(n),r=0;r<n;r++)o[r]=t[e[r]];return o},w.mapObject=function(t,e,n){e=v(e,n);for(var o,r=w.keys(t),i=r.length,a={},u=0;u<i;u++)o=r[u],a[o]=e(t[o],o,t);return a},w.pairs=function(t){for(var e=w.keys(t),n=e.length,o=Array(n),r=0;r<n;r++)o[r]=[e[r],t[e[r]]];return o},w.invert=function(t){for(var e={},n=w.keys(t),o=0,r=n.length;o<r;o++)e[t[n[o]]]=n[o];return e},w.functions=w.methods=function(t){var e=[];for(var n in t)w.isFunction(t[n])&&e.push(n);return e.sort()},w.extend=z(w.allKeys),w.extendOwn=w.assign=z(w.keys),w.findKey=function(t,e,n){e=v(e,n);for(var o,r=w.keys(t),i=0,a=r.length;i<a;i++)if(o=r[i],e(t[o],o,t))return o},w.pick=function(t,e,n){var o,r,i={},a=t;if(null==a)return i;w.isFunction(e)?(r=w.allKeys(a),o=L(e,n)):(r=x(arguments,!1,!1,1),o=function(t,e,n){return e in n},a=Object(a));for(var u=0,s=r.length;u<s;u++){var c=r[u],l=a[c];o(l,c,a)&&(i[c]=l)}return i},w.omit=function(t,e,n){if(w.isFunction(e))e=w.negate(e);else{var o=w.map(x(arguments,!1,!1,1),String);e=function(t,e){return!w.contains(o,e)}}return w.pick(t,e,n)},w.defaults=z(w.allKeys,!0),w.create=function(t,e){var n=b(t);return e&&w.extendOwn(n,e),n},w.clone=function(t){return w.isObject(t)?w.isArray(t)?t.slice():w.extend({},t):t},w.tap=function(t,e){return e(t),t},w.isMatch=function(t,e){var n=w.keys(e),o=n.length;if(null==t)return!o;for(var r=Object(t),i=0;i<o;i++){var a=n[i];if(e[a]!==r[a]||!(a in r))return!1}return!0};var U=function t(e,n,o,r){if(e===n)return 0!==e||1/e===1/n;if(null==e||null==n)return e===n;e instanceof w&&(e=e._wrapped),n instanceof w&&(n=n._wrapped);var a=h.call(e);if(a!==h.call(n))return!1;switch(a){case"[object RegExp]":case"[object String]":return""+e==""+n;case"[object Number]":return+e!==+e?+n!==+n:0===+e?1/+e===1/n:+e===+n;case"[object Date]":case"[object Boolean]":return+e===+n}var u="[object Array]"===a;if(!u){if("object"!=("undefined"==typeof e?"undefined":i(e))||"object"!=("undefined"==typeof n?"undefined":i(n)))return!1;var s=e.constructor,c=n.constructor;if(s!==c&&!(w.isFunction(s)&&s instanceof s&&w.isFunction(c)&&c instanceof c)&&"constructor"in e&&"constructor"in n)return!1}o=o||[],r=r||[];for(var l=o.length;l--;)if(o[l]===e)return r[l]===n;if(o.push(e),r.push(n),u){if(l=e.length,l!==n.length)return!1;for(;l--;)if(!t(e[l],n[l],o,r))return!1}else{var p,d=w.keys(e);if(l=d.length,w.keys(n).length!==l)return!1;for(;l--;)if(p=d[l],!w.has(n,p)||!t(e[p],n[p],o,r))return!1}return o.pop(),r.pop(),!0};w.isEqual=function(t,e){return U(t,e)},w.isEmpty=function(t){return null==t||(k(t)&&(w.isArray(t)||w.isString(t)||w.isArguments(t))?0===t.length:0===w.keys(t).length)},w.isElement=function(t){return!(!t||1!==t.nodeType)},w.isArray=N||function(t){return"[object Array]"===h.call(t)},w.isObject=function(t){var e="undefined"==typeof t?"undefined":i(t);return"function"===e||"object"===e&&!!t},w.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){w["is"+t]=function(e){return h.call(e)==="[object "+t+"]"}}),w.isArguments(arguments)||(w.isArguments=function(t){return w.has(t,"callee")}),"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":i(Int8Array))&&(w.isFunction=function(t){return"function"==typeof t||!1}),w.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},w.isNaN=function(t){return w.isNumber(t)&&t!==+t},w.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"===h.call(t)},w.isNull=function(t){return null===t},w.isUndefined=function(t){return void 0===t},w.has=function(t,e){return null!=t&&y.call(t,e)},w.noConflict=function(){return c._=l,this},w.identity=function(t){return t},w.constant=function(t){return function(){return t}},w.noop=function(){},w.property=T,w.propertyOf=function(t){return null==t?function(){}:function(e){return t[e]}},w.matcher=w.matches=function(t){return t=w.extendOwn({},t),function(e){return w.isMatch(e,t)}},w.times=function(t,e,n){var o=Array(Math.max(0,t));e=L(e,n,1);for(var r=0;r<t;r++)o[r]=e(r);return o},w.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))},w.now=Date.now||function(){return(new Date).getTime()};var Y={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Q=w.invert(Y),P=function(t){var e=function(e){return t[e]},n="(?:"+w.keys(t).join("|")+")",o=RegExp(n),r=RegExp(n,"g");return function(t){return t=null==t?"":""+t,o.test(t)?t.replace(r,e):t}};w.escape=P(Y),w.unescape=P(Q),w.result=function(t,e,n){var o=null==t?void 0:t[e];return void 0===o&&(o=n),w.isFunction(o)?o.call(t):o};var B=0;w.uniqueId=function(t){var e=++B+"";return t?t+e:e},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var R=/(.)^/,G={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Z=/\\|'|\r|\n|\u2028|\u2029/g,W=function(t){return"\\"+G[t]};w.template=function(t,e,n){!e&&n&&(e=n),e=w.defaults({},e,w.templateSettings);var o=RegExp([(e.escape||R).source,(e.interpolate||R).source,(e.evaluate||R).source].join("|")+"|$","g"),r=0,i="__p+='";t.replace(o,function(e,n,o,a,u){return i+=t.slice(r,u).replace(Z,W),r=u+e.length,n?i+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":o?i+="'+\n((__t=("+o+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),e}),i+="';\n",e.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(e.variable||"obj","_",i)}catch(t){throw t.source=i,t}var u=function(t){return a.call(this,t,w)},s=e.variable||"obj";return u.source="function("+s+"){\n"+i+"}",u},w.chain=function(t){var e=w(t);return e._chain=!0,e};var H=function(t,e){return t._chain?w(e).chain():e};w.mixin=function(t){w.each(w.functions(t),function(e){var n=w[e]=t[e];w.prototype[e]=function(){var t=[this._wrapped];return f.apply(t,arguments),H(this,n.apply(w,t))}})},w.mixin(w),w.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=p[t];w.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!==t&&"splice"!==t||0!==n.length||delete n[0],H(this,n)}}),w.each(["concat","join","slice"],function(t){var e=p[t];w.prototype[t]=function(){return H(this,e.apply(this._wrapped,arguments))}}),w.prototype.value=function(){return this._wrapped},w.prototype.valueOf=w.prototype.toJSON=w.prototype.value,w.prototype.toString=function(){return""+this._wrapped},o=[],r=function(){return w}.apply(e,o),!(void 0!==r&&(t.exports=r))}).call(void 0)},function(t,e,n){"use strict";function o(t){return Object.prototype.hasOwnProperty.call(t,g)||(t[g]=M++,p[t[g]]={}),p[t[g]]}var r,i=n(8),a=n(70),u=n(239),s=n(124),c=n(129),l=n(81),p={},d=!1,M=0,f={topAbort:"abort",topAnimationEnd:c("animationend")||"animationend",topAnimationIteration:c("animationiteration")||"animationiteration",topAnimationStart:c("animationstart")||"animationstart",topBlur:"blur",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",topTouchStart:"touchstart",topTransitionEnd:c("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},g="_reactListenersID"+String(Math.random()).slice(2),h=i({},u,{ReactEventListener:null,injection:{injectReactEventListener:function(t){t.setHandleTopLevel(h.handleTopLevel),h.ReactEventListener=t}},setEnabled:function(t){h.ReactEventListener&&h.ReactEventListener.setEnabled(t)},isEnabled:function(){return!(!h.ReactEventListener||!h.ReactEventListener.isEnabled())},listenTo:function(t,e){for(var n=e,r=o(n),i=a.registrationNameDependencies[t],u=0;u<i.length;u++){var s=i[u];r.hasOwnProperty(s)&&r[s]||("topWheel"===s?l("wheel")?h.ReactEventListener.trapBubbledEvent("topWheel","wheel",n):l("mousewheel")?h.ReactEventListener.trapBubbledEvent("topWheel","mousewheel",n):h.ReactEventListener.trapBubbledEvent("topWheel","DOMMouseScroll",n):"topScroll"===s?l("scroll",!0)?h.ReactEventListener.trapCapturedEvent("topScroll","scroll",n):h.ReactEventListener.trapBubbledEvent("topScroll","scroll",h.ReactEventListener.WINDOW_HANDLE):"topFocus"===s||"topBlur"===s?(l("focus",!0)?(h.ReactEventListener.trapCapturedEvent("topFocus","focus",n),h.ReactEventListener.trapCapturedEvent("topBlur","blur",n)):l("focusin")&&(h.ReactEventListener.trapBubbledEvent("topFocus","focusin",n),h.ReactEventListener.trapBubbledEvent("topBlur","focusout",n)),r.topBlur=!0,r.topFocus=!0):f.hasOwnProperty(s)&&h.ReactEventListener.trapBubbledEvent(s,f[s],n),r[s]=!0)}},trapBubbledEvent:function(t,e,n){return h.ReactEventListener.trapBubbledEvent(t,e,n)},trapCapturedEvent:function(t,e,n){return h.ReactEventListener.trapCapturedEvent(t,e,n)},supportsEventPageXY:function(){if(!document.createEvent)return!1;var t=document.createEvent("MouseEvent");return null!=t&&"pageX"in t},ensureScrollValueMonitoring:function(){if(void 0===r&&(r=h.supportsEventPageXY()),!r&&!d){var t=s.refreshScrollValues;h.ReactEventListener.monitorScrollValue(t),d=!0}}});t.exports=h},function(t,e,n){"use strict";function o(t,e,n,o){return r.call(this,t,e,n,o)}var r=n(48),i=n(124),a=n(79),u={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:a,button:function t(e){var t=e.button;return"which"in e?t:2===t?2:4===t?1:0},buttons:null,relatedTarget:function(t){return t.relatedTarget||(t.fromElement===t.srcElement?t.toElement:t.fromElement)},pageX:function(t){return"pageX"in t?t.pageX:t.clientX+i.currentScrollLeft},pageY:function(t){return"pageY"in t?t.pageY:t.clientY+i.currentScrollTop}};r.augmentClass(o,u),t.exports=o},function(t,e,n){"use strict";var o=n(4),r=(n(3),{}),i={reinitializeTransaction:function(){this.transactionWrappers=this.getTransactionWrappers(),this.wrapperInitData?this.wrapperInitData.length=0:this.wrapperInitData=[],this._isInTransaction=!1},_isInTransaction:!1,getTransactionWrappers:null,isInTransaction:function(){return!!this._isInTransaction},perform:function(t,e,n,r,i,a,u,s){this.isInTransaction()?o("27"):void 0;var c,l;try{this._isInTransaction=!0,c=!0,this.initializeAll(0),l=t.call(e,n,r,i,a,u,s),c=!1}finally{try{if(c)try{this.closeAll(0)}catch(t){}else this.closeAll(0)}finally{this._isInTransaction=!1}}return l},initializeAll:function(t){for(var e=this.transactionWrappers,n=t;n<e.length;n++){var o=e[n];try{this.wrapperInitData[n]=r,this.wrapperInitData[n]=o.initialize?o.initialize.call(this):null}finally{if(this.wrapperInitData[n]===r)try{this.initializeAll(n+1)}catch(t){}}}},closeAll:function(t){this.isInTransaction()?void 0:o("28");for(var e=this.transactionWrappers,n=t;n<e.length;n++){var i,a=e[n],u=this.wrapperInitData[n];try{i=!0,u!==r&&a.close&&a.close.call(this,u),i=!1}finally{if(i)try{this.closeAll(n+1)}catch(t){}}}this.wrapperInitData.length=0}};t.exports=i},function(t,e){"use strict";function n(t){var e=""+t,n=r.exec(e);if(!n)return e;var o,i="",a=0,u=0;for(a=n.index;a<e.length;a++){switch(e.charCodeAt(a)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 39:o="&#x27;";break;case 60:o="&lt;";break;case 62:o="&gt;";break;default:continue}u!==a&&(i+=e.substring(u,a)),u=a+1,i+=o}return u!==a?i+e.substring(u,a):i}function o(t){return"boolean"==typeof t||"number"==typeof t?""+t:n(t)}var r=/["'&<>]/;t.exports=o},function(t,e,n){"use strict";var o,r=n(10),i=n(69),a=/^[ \r\n\t\f]/,u=/<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/,s=n(77),c=s(function(t,e){if(t.namespaceURI!==i.svg||"innerHTML"in t)t.innerHTML=e;else{o=o||document.createElement("div"),o.innerHTML="<svg>"+e+"</svg>";for(var n=o.firstChild;n.firstChild;)t.appendChild(n.firstChild)}});if(r.canUseDOM){var l=document.createElement("div");l.innerHTML=" ",""===l.innerHTML&&(c=function(t,e){if(t.parentNode&&t.parentNode.replaceChild(t,t),a.test(e)||"<"===e[0]&&u.test(e)){t.innerHTML=String.fromCharCode(65279)+e;var n=t.firstChild;1===n.data.length?t.removeChild(n):n.deleteData(0,1)}else t.innerHTML=e}),l=null}t.exports=c},20,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var i=n(52),a=(o(i),n(326)),u=o(a),s=n(327),c=o(s),l=function(){function t(){r(this,t),this.clients={}}return t.prototype.setupClient=function(t,e,n,o){var r=window.location.host===n;o.popup=!!r&&o.popup,o.oidcConformant=o.oidcConformant||!1,r||!o.oidcConformant?this.clients[t]=new u.default(e,n,o):this.clients[t]=new c.default(e,n,o)},t.prototype.logIn=function(t,e,n,o){this.clients[t].logIn(e,n,o)},t.prototype.signOut=function(t,e){this.clients[t].logout(e)},t.prototype.signUp=function(t,e,n){this.clients[t].signUp(e,n)},t.prototype.resetPassword=function(t,e,n){this.clients[t].resetPassword(e,n)},t.prototype.startPasswordless=function(t,e,n){this.clients[t].startPasswordless(e,n)},t.prototype.parseHash=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments[2];return this.clients[t].parseHash(decodeURIComponent(e),n)},t.prototype.getUserInfo=function(t,e,n){return this.clients[t].getUserInfo(e,n)},t.prototype.getSSOData=function(t){for(var e,n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];return(e=this.clients[t]).getSSOData.apply(e,o)},t.prototype.getUserCountry=function(t,e){return this.clients[t].getUserCountry(function(t,n){return e(t,n&&n.countryCode)})},t}();e.default=new l},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){(0,u.swap)(u.updateEntity,"lock",t,a.skipQuickAuth,!0)}function i(t,e,n){var o=(0,u.read)(u.getEntity,"lock",t),r=l.auth.connectionScopes(o),i=r.get(e.get("name")),a={connection:e.get("name"),connection_scope:i?i.toJS():[]};l.auth.redirect(o)||"facebook"!==e.get("strategy")||(a.display="popup"),n&&(a.login_hint=n),(0,s.logIn)(t,[],a)}e.__esModule=!0,e.skipQuickAuth=r,e.logIn=i;var a=n(155),u=n(12),s=n(26),c=n(2),l=o(c)},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.BackButton=e.CloseButton=void 0;var r=n(1),i=o(r),a={back:'<svg enable-background="new 0 0 24 24" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polyline fill="none" points="12.5,21 3.5,12 12.5,3 " stroke="#000000" stroke-miterlimit="10" stroke-width="2"></polyline> <line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" x1="22" x2="3.5" y1="12" y2="12"></line> </svg>',close:'<svg enable-background="new 0 0 128 128" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#373737" points="123.5429688,11.59375 116.4765625,4.5185547 64.0019531,56.9306641 11.5595703,4.4882813     4.4882813,11.5595703 56.9272461,63.9970703 4.4570313,116.4052734 11.5244141,123.4814453 63.9985352,71.0683594     116.4423828,123.5117188 123.5126953,116.4414063 71.0732422,64.0019531   "></polygon></g></svg>'},u=function(t){var e=t.name,n=t.onClick,o=t.svg;return i.default.createElement("span",{className:"auth0-lock-"+e+"-button",dangerouslySetInnerHTML:{__html:o},onClick:function(t){t.preventDefault(),n()}})};u.propTypes={name:i.default.PropTypes.string.isRequired,onClick:i.default.PropTypes.func.isRequired,svg:i.default.PropTypes.string.isRequired};var s=e.CloseButton=function(t){var e=t.onClick;return i.default.createElement(u,{name:"close",svg:a.close,onClick:e})};s.propTypes={onClick:i.default.PropTypes.func.isRequired};var c=e.BackButton=function(t){var e=t.onClick;return i.default.createElement(u,{name:"back",svg:a.back,onClick:e})};c.propTypes={onClick:i.default.PropTypes.func.isRequired}},function(t,e){"use strict";function n(t){return null!==t&&"object"===("undefined"==typeof t?"undefined":o(t))}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=n},function(t,e){"use strict";function n(t){return Object.keys(t).reduce(function(e,n){return"undefined"!=typeof t[n]&&e.push(n+"="+encodeURIComponent(t[n])),e},[]).join("&")}function o(t){return t.split("&").reduce(function(t,e){var n=e.split("=");return t[n[0]]=n[1],t},{})}t.exports={build:n,parse:o}},function(t,e,n){
"use strict";function o(t){this.request=t,this.method=t.method,this.url=t.url,this.body=t._data,this.headers=t._header}function r(t){this.request=t}function i(t){this._sendTelemetry=t._sendTelemetry!==!1||t._sendTelemetry,this._telemetryInfo=t._telemetryInfo||null,this.headers=t.headers||{}}var a=n(162),u=n(103),s=n(105);o.prototype.abort=function(){this.request.abort()},o.prototype.getMethod=function(){return this.method},o.prototype.getBody=function(){return this.body},o.prototype.getUrl=function(){return this.url},o.prototype.getHeaders=function(){return this.headers},r.prototype.set=function(t,e){return this.request=this.request.set(t,e),this},r.prototype.send=function(t){return this.request=this.request.send(t),this},r.prototype.withCredentials=function(){return this.request=this.request.withCredentials(),this},r.prototype.end=function(t){return this.request=this.request.end(t),new o(this.request)},i.prototype.setCommonConfiguration=function(t,e){if(e=e||{},e.noHeaders)return t;var n=this.headers;t=t.set("Content-Type","application/json");for(var o=Object.keys(this.headers),r=0;r<o.length;r++)t=t.set(o[r],n[o[r]]);return this._sendTelemetry&&(t=t.set("Auth0-Client",this.getTelemetryData())),t},i.prototype.getTelemetryData=function(){var t=this._telemetryInfo||{name:"auth0.js",version:s.raw},e=JSON.stringify(t);return u.encode(e)},i.prototype.get=function(t,e){return new r(this.setCommonConfiguration(a.get(t),e))},i.prototype.post=function(t,e){return new r(this.setCommonConfiguration(a.post(t),e))},i.prototype.patch=function(t,e){return new r(this.setCommonConfiguration(a.patch(t),e))},t.exports=i},63,function(t,e,n){"use strict";var o=n(53),r=[" ","!",'"',"#","\\$","%","&","'","\\(","\\)","\\*","\\+",",","-","\\.","/",":",";","<","=",">","\\?","@","\\[","\\\\","\\]","\\^","_","`","{","\\|","}","~"].join("|"),i=new RegExp(r);t.exports={validate:function(t){if(!o.isObject(t))throw new Error("options should be an object");if(!o.isArray(t.expressions)||o.isEmpty(t.expressions))throw new Error("contains expects expressions to be a non-empty array");var e=t.expressions.every(function(t){return o.isFunction(t.explain)&&o.isFunction(t.test)});if(!e)throw new Error("contains expressions are invalid: An explain and a test function should be provided");return!0},explain:function(t){return{message:"Should contain:",code:"shouldContain",items:t.expressions.map(function(t){return t.explain()})}},missing:function(t,e){var n=t.expressions.map(function(t){var n=t.explain();return n.verified=t.test(e),n}),o=n.every(function(t){return t.verified});return{message:"Should contain:",code:"shouldContain",verified:o,items:n}},assert:function(t,e){return!!e&&t.expressions.every(function(t){var n=t.test(e);return n})},charsets:{upperCase:{explain:function(){return{message:"upper case letters (A-Z)",code:"upperCase"}},test:function(t){return/[A-Z]/.test(t)}},lowerCase:{explain:function(){return{message:"lower case letters (a-z)",code:"lowerCase"}},test:function(t){return/[a-z]/.test(t)}},specialCharacters:{explain:function(){return{message:"special characters (e.g. !@#$%^&*)",code:"specialCharacters"}},test:function(t){return i.test(t)}},numbers:{explain:function(){return{message:"numbers (i.e. 0-9)",code:"numbers"}},test:function(t){return/\d/.test(t)}}}}},function(t,e,n){"use strict";function o(t,e){return Array.isArray(e)&&(e=e[1]),e?e.nextSibling:t.firstChild}function r(t,e,n){l.insertTreeBefore(t,e,n)}function i(t,e,n){Array.isArray(e)?u(t,e[0],e[1],n):g(t,e,n)}function a(t,e){if(Array.isArray(e)){var n=e[1];e=e[0],s(t,e,n),t.removeChild(n)}t.removeChild(e)}function u(t,e,n,o){for(var r=e;;){var i=r.nextSibling;if(g(t,r,o),r===n)break;r=i}}function s(t,e,n){for(;;){var o=e.nextSibling;if(o===n)break;t.removeChild(o)}}function c(t,e,n){var o=t.parentNode,r=t.nextSibling;r===e?n&&g(o,document.createTextNode(n),r):n?(f(r,n),s(o,r,e)):s(o,t,e)}var l=n(35),p=n(217),d=(n(6),n(14),n(77)),M=n(58),f=n(132),g=d(function(t,e,n){t.insertBefore(e,n)}),h=p.dangerouslyReplaceNodeWithMarkup,y={dangerouslyReplaceNodeWithMarkup:h,replaceDelimitedText:c,processUpdates:function(t,e){for(var n=0;n<e.length;n++){var u=e[n];switch(u.type){case"INSERT_MARKUP":r(t,u.content,o(t,u.afterNode));break;case"MOVE_EXISTING":i(t,u.fromNode,o(t,u.afterNode));break;case"SET_MARKUP":M(t,u.content);break;case"TEXT_CONTENT":f(t,u.content);break;case"REMOVE_NODE":a(t,u.fromNode)}}}};t.exports=y},function(t,e){"use strict";var n={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};t.exports=n},function(t,e,n){"use strict";function o(){if(u)for(var t in s){var e=s[t],n=u.indexOf(t);if(n>-1?void 0:a("96",t),!c.plugins[n]){e.extractEvents?void 0:a("97",t),c.plugins[n]=e;var o=e.eventTypes;for(var i in o)r(o[i],e,i)?void 0:a("98",i,t)}}}function r(t,e,n){c.eventNameDispatchConfigs.hasOwnProperty(n)?a("99",n):void 0,c.eventNameDispatchConfigs[n]=t;var o=t.phasedRegistrationNames;if(o){for(var r in o)if(o.hasOwnProperty(r)){var u=o[r];i(u,e,n)}return!0}return!!t.registrationName&&(i(t.registrationName,e,n),!0)}function i(t,e,n){c.registrationNameModules[t]?a("100",t):void 0,c.registrationNameModules[t]=e,c.registrationNameDependencies[t]=e.eventTypes[n].dependencies}var a=n(4),u=(n(3),null),s={},c={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:null,injectEventPluginOrder:function(t){u?a("101"):void 0,u=Array.prototype.slice.call(t),o()},injectEventPluginsByName:function(t){var e=!1;for(var n in t)if(t.hasOwnProperty(n)){var r=t[n];s.hasOwnProperty(n)&&s[n]===r||(s[n]?a("102",n):void 0,s[n]=r,e=!0)}e&&o()},getPluginModuleForEvent:function(t){var e=t.dispatchConfig;if(e.registrationName)return c.registrationNameModules[e.registrationName]||null;if(void 0!==e.phasedRegistrationNames){var n=e.phasedRegistrationNames;for(var o in n)if(n.hasOwnProperty(o)){var r=c.registrationNameModules[n[o]];if(r)return r}}return null},_resetEventPlugins:function(){u=null;for(var t in s)s.hasOwnProperty(t)&&delete s[t];c.plugins.length=0;var e=c.eventNameDispatchConfigs;for(var n in e)e.hasOwnProperty(n)&&delete e[n];var o=c.registrationNameModules;for(var r in o)o.hasOwnProperty(r)&&delete o[r]}};t.exports=c},function(t,e,n){"use strict";function o(t){return"topMouseUp"===t||"topTouchEnd"===t||"topTouchCancel"===t}function r(t){return"topMouseMove"===t||"topTouchMove"===t}function i(t){return"topMouseDown"===t||"topTouchStart"===t}function a(t,e,n,o){var r=t.type||"unknown-event";t.currentTarget=y.getNodeFromInstance(o),e?g.invokeGuardedCallbackWithCatch(r,n,t):g.invokeGuardedCallback(r,n,t),t.currentTarget=null}function u(t,e){var n=t._dispatchListeners,o=t._dispatchInstances;if(Array.isArray(n))for(var r=0;r<n.length&&!t.isPropagationStopped();r++)a(t,e,n[r],o[r]);else n&&a(t,e,n,o);t._dispatchListeners=null,t._dispatchInstances=null}function s(t){var e=t._dispatchListeners,n=t._dispatchInstances;if(Array.isArray(e)){for(var o=0;o<e.length&&!t.isPropagationStopped();o++)if(e[o](t,n[o]))return n[o]}else if(e&&e(t,n))return n;return null}function c(t){var e=s(t);return t._dispatchInstances=null,t._dispatchListeners=null,e}function l(t){var e=t._dispatchListeners,n=t._dispatchInstances;Array.isArray(e)?f("103"):void 0,t.currentTarget=e?y.getNodeFromInstance(n):null;var o=e?e(t):null;return t.currentTarget=null,t._dispatchListeners=null,t._dispatchInstances=null,o}function p(t){return!!t._dispatchListeners}var d,M,f=n(4),g=n(75),h=(n(3),n(5),{injectComponentTree:function(t){d=t},injectTreeTraversal:function(t){M=t}}),y={isEndish:o,isMoveish:r,isStartish:i,executeDirectDispatch:l,executeDispatchesInOrder:u,executeDispatchesInOrderStopAtTrue:c,hasDispatches:p,getInstanceFromNode:function(t){return d.getInstanceFromNode(t)},getNodeFromInstance:function(t){return d.getNodeFromInstance(t)},isAncestor:function(t,e){return M.isAncestor(t,e)},getLowestCommonAncestor:function(t,e){return M.getLowestCommonAncestor(t,e)},getParentInstance:function(t){return M.getParentInstance(t)},traverseTwoPhase:function(t,e,n){return M.traverseTwoPhase(t,e,n)},traverseEnterLeave:function(t,e,n,o,r){return M.traverseEnterLeave(t,e,n,o,r)},injection:h};t.exports=y},function(t,e){"use strict";function n(t){var e=/[=:]/g,n={"=":"=0",":":"=2"},o=(""+t).replace(e,function(t){return n[t]});return"$"+o}function o(t){var e=/(=0|=2)/g,n={"=0":"=","=2":":"},o="."===t[0]&&"$"===t[1]?t.substring(2):t.substring(1);return(""+o).replace(e,function(t){return n[t]})}var r={escape:n,unescape:o};t.exports=r},function(t,e,n){"use strict";function o(t){null!=t.checkedLink&&null!=t.valueLink?u("87"):void 0}function r(t){o(t),null!=t.value||null!=t.onChange?u("88"):void 0}function i(t){o(t),null!=t.checked||null!=t.onChange?u("89"):void 0}function a(t){if(t){var e=t.getName();if(e)return" Check the render method of `"+e+"`."}return""}var u=n(4),s=n(21),c=n(245),l=(n(3),n(5),{button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0}),p={value:function(t,e,n){return!t[e]||l[t.type]||t.onChange||t.readOnly||t.disabled?null:new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.")},checked:function(t,e,n){return!t[e]||t.onChange||t.readOnly||t.disabled?null:new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")},onChange:s.PropTypes.func},d={},M={checkPropTypes:function(t,e,n){for(var o in p){if(p.hasOwnProperty(o))var r=p[o](e,o,t,"prop",null,c);if(r instanceof Error&&!(r.message in d)){d[r.message]=!0;a(n)}}},getValue:function(t){return t.valueLink?(r(t),t.valueLink.value):t.value},getChecked:function(t){return t.checkedLink?(i(t),t.checkedLink.value):t.checked},executeOnChange:function(t,e){return t.valueLink?(r(t),t.valueLink.requestChange(e.target.value)):t.checkedLink?(i(t),t.checkedLink.requestChange(e.target.checked)):t.onChange?t.onChange.call(void 0,e):void 0}};t.exports=M},function(t,e,n){"use strict";var o=n(4),r=(n(3),!1),i={replaceNodeWithMarkup:null,processChildrenUpdates:null,injection:{injectEnvironment:function(t){r?o("104"):void 0,i.replaceNodeWithMarkup=t.replaceNodeWithMarkup,i.processChildrenUpdates=t.processChildrenUpdates,r=!0}}};t.exports=i},function(t,e,n){"use strict";function o(t,e,n){try{e(n)}catch(t){null===r&&(r=t)}}var r=null,i={invokeGuardedCallback:o,invokeGuardedCallbackWithCatch:o,rethrowCaughtError:function(){if(r){var t=r;throw r=null,t}}};t.exports=i},function(t,e,n){"use strict";function o(t){c.enqueueUpdate(t)}function r(t){var e="undefined"==typeof t?"undefined":a(t);if("object"!==e)return e;var n=t.constructor&&t.constructor.name||e,o=Object.keys(t);return o.length>0&&o.length<20?n+" (keys: "+o.join(", ")+")":n}function i(t,e){var n=s.get(t);if(!n){return null}return n}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=n(4),s=(n(22),n(47)),c=(n(14),n(16)),l=(n(3),n(5),{isMounted:function(t){var e=s.get(t);return!!e&&!!e._renderedComponent},enqueueCallback:function(t,e,n){l.validateCallback(e,n);var r=i(t);return r?(r._pendingCallbacks?r._pendingCallbacks.push(e):r._pendingCallbacks=[e],void o(r)):null},enqueueCallbackInternal:function(t,e){t._pendingCallbacks?t._pendingCallbacks.push(e):t._pendingCallbacks=[e],o(t)},enqueueForceUpdate:function(t){var e=i(t,"forceUpdate");e&&(e._pendingForceUpdate=!0,o(e))},enqueueReplaceState:function(t,e){var n=i(t,"replaceState");n&&(n._pendingStateQueue=[e],n._pendingReplaceState=!0,o(n))},enqueueSetState:function(t,e){var n=i(t,"setState");if(n){var r=n._pendingStateQueue||(n._pendingStateQueue=[]);r.push(e),o(n)}},enqueueElementInternal:function(t,e,n){t._pendingElement=e,t._context=n,o(t)},validateCallback:function(t,e){t&&"function"!=typeof t?u("122",e,r(t)):void 0}});t.exports=l},function(t,e){"use strict";var n=function(t){return"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,n,o,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,o,r)})}:t};t.exports=n},function(t,e){"use strict";function n(t){var e,n=t.keyCode;return"charCode"in t?(e=t.charCode,0===e&&13===n&&(e=13)):e=n,e>=32||13===e?e:0}t.exports=n},function(t,e){"use strict";function n(t){var e=this,n=e.nativeEvent;if(n.getModifierState)return n.getModifierState(t);var o=r[t];return!!o&&!!n[o]}function o(t){return n}var r={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};t.exports=o},function(t,e){"use strict";function n(t){var e=t.target||t.srcElement||window;return e.correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}t.exports=n},function(t,e,n){"use strict";function o(t,e){if(!i.canUseDOM||e&&!("addEventListener"in document))return!1;var n="on"+t,o=n in document;if(!o){var a=document.createElement("div");a.setAttribute(n,"return;"),o="function"==typeof a[n]}return!o&&r&&"wheel"===t&&(o=document.implementation.hasFeature("Events.wheel","3.0")),o}var r,i=n(10);i.canUseDOM&&(r=document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0),t.exports=o},function(t,e){"use strict";function n(t,e){var n=null===t||t===!1,r=null===e||e===!1;if(n||r)return n===r;var i="undefined"==typeof t?"undefined":o(t),a="undefined"==typeof e?"undefined":o(e);return"string"===i||"number"===i?"string"===a||"number"===a:"object"===a&&t.type===e.type&&t.key===e.key}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=n},function(t,e,n){"use strict";var o=(n(8),n(20)),r=(n(5),o);t.exports=r},function(t,e){"use strict";function n(t,e){return t===e?0!==t||0!==e||1/t===1/e:t!==t&&e!==e}function o(t,e){if(n(t,e))return!0;if("object"!==("undefined"==typeof t?"undefined":r(t))||null===t||"object"!==("undefined"==typeof e?"undefined":r(e))||null===e)return!1;var o=Object.keys(t),a=Object.keys(e);if(o.length!==a.length)return!1;for(var u=0;u<o.length;u++)if(!i.call(e,o[u])||!n(t[o[u]],e[o[u]]))return!1;return!0}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=Object.prototype.hasOwnProperty;t.exports=o},function(t,e,n){"use strict";function o(t,e,n){this.props=t,this.context=e,this.refs=u,this.updater=n||a}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=n(39),a=n(87),u=(n(141),n(88));n(31),n(23);o.prototype.isReactComponent={},o.prototype.setState=function(t,e){"object"!==("undefined"==typeof t?"undefined":r(t))&&"function"!=typeof t&&null!=t?i("85"):void 0,this.updater.enqueueSetState(this,t),e&&this.updater.enqueueCallback(this,e,"setState")},o.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this),t&&this.updater.enqueueCallback(this,t,"forceUpdate")};t.exports=o},function(t,e,n){"use strict";function o(t){var e=Function.prototype.toString,n=Object.prototype.hasOwnProperty,o=RegExp("^"+e.call(n).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");try{var r=e.call(t);return o.test(r)}catch(t){return!1}}function r(t){var e=c(t);if(e){var n=e.childIDs;l(t),n.forEach(r)}}function i(t,e,n){return"\n    in "+(t||"Unknown")+(e?" (at "+e.fileName.replace(/^.*[\\\/]/,"")+":"+e.lineNumber+")":n?" (created by "+n+")":"")}function a(t){return null==t?"#empty":"string"==typeof t||"number"==typeof t?"#text":"string"==typeof t.type?t.type:t.type.displayName||t.type.name||"Unknown"}function u(t){var e,n=z.getDisplayName(t),o=z.getElement(t),r=z.getOwnerID(t);return r&&(e=z.getDisplayName(r)),i(n,o&&o._source,e)}var s,c,l,p,d,M,f,g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=n(39),y=n(22),N=(n(31),n(23),"function"==typeof Array.from&&"function"==typeof Map&&o(Map)&&null!=Map.prototype&&"function"==typeof Map.prototype.keys&&o(Map.prototype.keys)&&"function"==typeof Set&&o(Set)&&null!=Set.prototype&&"function"==typeof Set.prototype.keys&&o(Set.prototype.keys));if(N){var m=new Map,D=new Set;s=function(t,e){m.set(t,e)},c=function(t){return m.get(t)},l=function(t){m.delete(t)},p=function(){return Array.from(m.keys())},d=function(t){D.add(t)},M=function(t){D.delete(t)},f=function(){return Array.from(D.keys())}}else{var I={},j={},w=function(t){return"."+t},L=function(t){return parseInt(t.substr(1),10)};s=function(t,e){var n=w(t);I[n]=e},c=function(t){var e=w(t);return I[e]},l=function(t){var e=w(t);delete I[e]},p=function(){return Object.keys(I).map(L)},d=function(t){var e=w(t);j[e]=!0},M=function(t){var e=w(t);delete j[e]},f=function(){return Object.keys(j).map(L)}}var v=[],z={onSetChildren:function(t,e){var n=c(t);n?void 0:h("144"),n.childIDs=e;for(var o=0;o<e.length;o++){var r=e[o],i=c(r);i?void 0:h("140"),null==i.childIDs&&"object"===g(i.element)&&null!=i.element?h("141"):void 0,i.isMounted?void 0:h("71"),null==i.parentID&&(i.parentID=t),i.parentID!==t?h("142",r,i.parentID,t):void 0}},onBeforeMountComponent:function(t,e,n){var o={element:e,parentID:n,text:null,childIDs:[],isMounted:!1,updateCount:0};s(t,o)},onBeforeUpdateComponent:function(t,e){var n=c(t);n&&n.isMounted&&(n.element=e)},onMountComponent:function(t){var e=c(t);e?void 0:h("144"),e.isMounted=!0;var n=0===e.parentID;n&&d(t)},onUpdateComponent:function(t){var e=c(t);e&&e.isMounted&&e.updateCount++},onUnmountComponent:function(t){var e=c(t);if(e){e.isMounted=!1;var n=0===e.parentID;n&&M(t)}v.push(t)},purgeUnmountedComponents:function(){if(!z._preventPurging){for(var t=0;t<v.length;t++){var e=v[t];r(e)}v.length=0}},isMounted:function(t){var e=c(t);return!!e&&e.isMounted},getCurrentStackAddendum:function(t){var e="";if(t){var n=a(t),o=t._owner;e+=i(n,t._source,o&&o.getName())}var r=y.current,u=r&&r._debugID;return e+=z.getStackAddendumByID(u)},getStackAddendumByID:function(t){for(var e="";t;)e+=u(t),t=z.getParentID(t);return e},getChildIDs:function(t){var e=c(t);return e?e.childIDs:[]},getDisplayName:function(t){var e=z.getElement(t);return e?a(e):null},getElement:function(t){var e=c(t);return e?e.element:null},getOwnerID:function(t){var e=z.getElement(t);return e&&e._owner?e._owner._debugID:null},getParentID:function(t){var e=c(t);return e?e.parentID:null},getSource:function(t){var e=c(t),n=e?e.element:null,o=null!=n?n._source:null;return o},getText:function(t){var e=z.getElement(t);return"string"==typeof e?e:"number"==typeof e?""+e:null},getUpdateCount:function(t){var e=c(t);return e?e.updateCount:0},getRootIDs:f,getRegisteredIDs:p};t.exports=z},function(t,e,n){"use strict";function o(t,e){}var r=(n(23),{isMounted:function(t){return!1},enqueueCallback:function(t,e){},enqueueForceUpdate:function(t){o(t,"forceUpdate")},enqueueReplaceState:function(t,e){o(t,"replaceState")},enqueueSetState:function(t,e){o(t,"setState")}});t.exports=r},function(t,e,n){"use strict";var o={};t.exports=o},function(t,e,n){(function(t,o){"use strict";function r(t,n){var o={seen:[],stylize:a};return arguments.length>=3&&(o.depth=arguments[2]),arguments.length>=4&&(o.colors=arguments[3]),g(n)?o.showHidden=n:n&&e._extend(o,n),I(o.showHidden)&&(o.showHidden=!1),I(o.depth)&&(o.depth=2),I(o.colors)&&(o.colors=!1),I(o.customInspect)&&(o.customInspect=!0),o.colors&&(o.stylize=i),s(o,t,o.depth)}function i(t,e){var n=r.styles[e];return n?"["+r.colors[n][0]+"m"+t+"["+r.colors[n][1]+"m":t}function a(t,e){return t}function u(t){var e={};return t.forEach(function(t,n){e[t]=!0}),e}function s(t,n,o){if(t.customInspect&&n&&z(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var r=n.inspect(o,t);return m(r)||(r=s(t,r,o)),r}var i=c(t,n);if(i)return i;var a=Object.keys(n),g=u(a);if(t.showHidden&&(a=Object.getOwnPropertyNames(n)),v(n)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return l(n);if(0===a.length){if(z(n)){var h=n.name?": "+n.name:"";return t.stylize("[Function"+h+"]","special")}if(j(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(L(n))return t.stylize(Date.prototype.toString.call(n),"date");if(v(n))return l(n)}var y="",N=!1,D=["{","}"];if(f(n)&&(N=!0,D=["[","]"]),z(n)){var I=n.name?": "+n.name:"";y=" [Function"+I+"]"}if(j(n)&&(y=" "+RegExp.prototype.toString.call(n)),L(n)&&(y=" "+Date.prototype.toUTCString.call(n)),v(n)&&(y=" "+l(n)),0===a.length&&(!N||0==n.length))return D[0]+y+D[1];if(o<0)return j(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special");t.seen.push(n);var w;return w=N?p(t,n,o,g,a):a.map(function(e){return d(t,n,o,g,e,N)}),t.seen.pop(),M(w,y,D)}function c(t,e){if(I(e))return t.stylize("undefined","undefined");if(m(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}return N(e)?t.stylize(""+e,"number"):g(e)?t.stylize(""+e,"boolean"):h(e)?t.stylize("null","null"):void 0}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function p(t,e,n,o,r){for(var i=[],a=0,u=e.length;a<u;++a)k(e,String(a))?i.push(d(t,e,n,o,String(a),!0)):i.push("");return r.forEach(function(r){r.match(/^\d+$/)||i.push(d(t,e,n,o,r,!0))}),i}function d(t,e,n,o,r,i){var a,u,c;if(c=Object.getOwnPropertyDescriptor(e,r)||{value:e[r]},c.get?u=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(u=t.stylize("[Setter]","special")),k(o,r)||(a="["+r+"]"),u||(t.seen.indexOf(c.value)<0?(u=h(n)?s(t,c.value,null):s(t,c.value,n-1),u.indexOf("\n")>-1&&(u=i?u.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+u.split("\n").map(function(t){return"   "+t}).join("\n"))):u=t.stylize("[Circular]","special")),I(a)){if(i&&r.match(/^\d+$/))return u;a=JSON.stringify(""+r),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=t.stylize(a,"string"))}return a+": "+u}function M(t,e,n){var o=0,r=t.reduce(function(t,e){return o++,e.indexOf("\n")>=0&&o++,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0);return r>60?n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1]:n[0]+e+" "+t.join(", ")+" "+n[1]}function f(t){return Array.isArray(t)}function g(t){return"boolean"==typeof t}function h(t){return null===t}function y(t){return null==t}function N(t){return"number"==typeof t}function m(t){return"string"==typeof t}function D(t){return"symbol"===("undefined"==typeof t?"undefined":S(t))}function I(t){return void 0===t}function j(t){return w(t)&&"[object RegExp]"===T(t)}function w(t){return"object"===("undefined"==typeof t?"undefined":S(t))&&null!==t}function L(t){return w(t)&&"[object Date]"===T(t)}function v(t){return w(t)&&("[object Error]"===T(t)||t instanceof Error)}function z(t){return"function"==typeof t}function b(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"===("undefined"==typeof t?"undefined":S(t))||"undefined"==typeof t}function T(t){return Object.prototype.toString.call(t)}function C(t){return t<10?"0"+t.toString(10):t.toString(10)}function E(){var t=new Date,e=[C(t.getHours()),C(t.getMinutes()),C(t.getSeconds())].join(":");return[t.getDate(),_[t.getMonth()],e].join(" ")}function k(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x=/%[sdj%]/g;e.format=function(t){if(!m(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(r(arguments[n]));return e.join(" ")}for(var n=1,o=arguments,i=o.length,a=String(t).replace(x,function(t){if("%%"===t)return"%";if(n>=i)return t;switch(t){case"%s":return String(o[n++]);case"%d":return Number(o[n++]);case"%j":try{return JSON.stringify(o[n++])}catch(t){return"[Circular]"}default:return t}}),u=o[n];n<i;u=o[++n])a+=h(u)||!w(u)?" "+u:" "+r(u);return a},e.deprecate=function(n,r){function i(){if(!a){if(o.throwDeprecation)throw new Error(r);o.traceDeprecation?console.trace(r):console.error(r),a=!0}return n.apply(this,arguments)}if(I(t.process))return function(){return e.deprecate(n,r).apply(this,arguments)};if(o.noDeprecation===!0)return n;var a=!1;return i};var O,A={};e.debuglog=function(t){if(I(O)&&(O={NODE_ENV:"production"}.NODE_DEBUG||""),t=t.toUpperCase(),!A[t])if(new RegExp("\\b"+t+"\\b","i").test(O)){var n=o.pid;A[t]=function(){var o=e.format.apply(e,arguments);console.error("%s %d: %s",t,n,o)}}else A[t]=function(){};return A[t]},e.inspect=r,r.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},r.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=f,e.isBoolean=g,e.isNull=h,e.isNullOrUndefined=y,e.isNumber=N,e.isString=m,e.isSymbol=D,e.isUndefined=I,e.isRegExp=j,e.isObject=w,e.isDate=L,e.isError=v,e.isFunction=z,e.isPrimitive=b,e.isBuffer=n(305);var _=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.log=function(){console.log("%s - %s",E(),e.format.apply(e,arguments))},e.inherits=n(304),e._extend=function(t,e){if(!e||!w(e))return t;for(var n=Object.keys(e),o=n.length;o--;)t[n[o]]=e[n[o]];return t}}).call(e,function(){return this}(),n(49))},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t,e){(0,c.swap)(c.updateEntity,"lock",t,l.toggleHRD,e)}function i(t){(0,c.swap)(c.updateEntity,"lock",t,function(t){return t=(0,l.toggleHRD)(t,!1),t=(0,p.hideInvalidFields)(t)})}function a(t){var e=(0,c.read)(c.getEntity,"lock",t),n=(0,p.getFieldValue)(e,(0,h.databaseLogInWithEmail)(e)?"email":"username"),o=(0,l.matchConnection)(e,n);return o&&!(0,l.isHRDActive)(e)?s(t,o):void u(t)}function u(t){var e=(0,c.read)(c.getEntity,"lock",t),n=(0,l.isHRDActive)(e)||!(0,h.databaseLogInWithEmail)(e)?"username":"email",o=(0,p.getFieldValue)(e,n),r=(0,l.enterpriseActiveFlowConnection)(e),i=g.defaultADUsernameFromEmailPrefix(e)?(0,d.emailLocalPart)(o):o;(0,M.logIn)(t,["password",n],{connection:r?r.get("name"):null,username:i,password:(0,p.getFieldValue)(e,"password"),login_hint:i})}function s(t,e){var n=(0,c.read)(c.getEntity,"lock",t),o=(0,h.databaseLogInWithEmail)(n)?"email":"username";(0,M.logIn)(t,[o],{connection:e.get("name"),login_hint:(0,p.getFieldValue)(n,o)})}e.__esModule=!0,e.startHRD=r,e.cancelHRD=i,e.logIn=a;var c=n(12),l=n(25),p=n(7),d=n(28),M=n(26),f=n(2),g=o(f),h=n(11)},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==t.username)return null;var e=M({},j,t),n=j.username.min,o=j.username.max;return e.username.min=parseInt(e.username.min,10)||n,e.username.max=parseInt(e.username.max,10)||o,e.username.min>e.username.max&&(e.username.min=n,e.username.max=o),e}function a(t,e,n){return D(t,u(e,n))}function u(t,e){return new g.default.fromJS({connections:s(t,e),defaultDirectory:e.defaultDirectory||null})}function s(t,e){var n=w.toJS(),o=Object.keys(e.connections).filter(function(t){return"passwordless"!=t}),r=null;return e.clientsConnections&&e.clientsConnections[t]&&(r=e.clientsConnections[t]),o.forEach(function(t){var o,i=e.connections[t].map(function(e){return c(t,e)}).filter(function(t){return null===r||r.indexOf(t.name)!==-1});(o=n[t]).push.apply(o,i)}),n}function c(t,e){var n={name:e.name,strategy:e.strategy,type:t};return"database"===t&&(e.validation&&e.validation.passwordPolicy&&(n.passwordPolicy=e.validation.passwordPolicy),n.passwordPolicy=n.passwordPolicy||"none",n.allowSignup="boolean"!=typeof e.showSignup||e.showSignup,n.allowForgot="boolean"!=typeof e.showForgot||e.showForgot,n.requireUsername="boolean"==typeof e.requiresUsername&&e.requiresUsername,n.validation=i(e.validation)),"enterprise"===t&&(n.domains=e.domains),n}function l(t){return I(t,"connections",w)}function p(t){var e=d(t);return e&&N.findConnection(t,e)}function d(t){return I(t,"defaultDirectory",null)}e.__esModule=!0;var M=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};e.initTenant=a,e.tenantConnections=l,e.defaultDirectory=p,e.defaultDirectoryName=d;var f=n(9),g=r(f),h=n(18),y=n(2),N=o(y),m=(0,h.dataFns)(["client"]),D=m.initNS,I=m.get,j={username:{min:1,max:15}},w=g.default.fromJS({database:[],enterprise:[],passwordless:[],social:[],unknown:[]})},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){return(0,j.isEnterpriseDomain)(t,(0,I.databaseUsernameValue)(t))}function u(t){return(0,I.authWithUsername)(t)&&!isADEnabled(t)?"username":"email"}function s(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];return T.hasOnlyConnections.apply(T,[t,e].concat(o))&&!T.hasSomeConnections(t,"passwordless")}function c(t){return(0,L.useBigButtons)(t,s(t,"social")?5:3)}function l(t){var e=T.hasSomeConnections(t,"database"),n=T.hasSomeConnections(t,"social"),o=T.hasSomeConnections(t,"enterprise");if(e||n||o){if(!e&&(0,I.hasInitialScreen)(t,"forgotPassword")){var r=new Error('The `initialScreen` option was set to "forgotPassword" but no database connection is available.');r.code="unavailable_initial_screen",t=T.stop(t,r)}else if(!e&&!n&&(0,I.hasInitialScreen)(t,"signUp")){var i=new Error('The `initialScreen` option was set to "signUp" but no database or social connection is available.');i.code="unavailable_initial_screen",t=T.stop(t,i)}}else{var a=new Error("At least one database, enterprise or social connection needs to be available.");a.code="no_connection",t=T.stop(t,a)}return(0,w.defaultDirectoryName)(t)&&!(0,w.defaultDirectory)(t)&&T.error(t,"The account's default directory \""+(0,w.defaultDirectoryName)(t)+'" is not enabled.'),(0,I.defaultDatabaseConnectionName)(t)&&!(0,I.defaultDatabaseConnection)(t)&&T.warn(t,'The provided default database connection "'+(0,I.defaultDatabaseConnectionName)(t)+'" is not enabled.'),(0,j.defaultEnterpriseConnectionName)(t)&&!(0,j.defaultEnterpriseConnection)(t)&&T.warn(t,'The provided default enterprise connection "'+(0,j.defaultEnterpriseConnectionName)(t)+'" is not enabled or does not allow email/password authentication.'),t}e.__esModule=!0,e.isSSOEnabled=a,e.usernameStyle=u,e.hasOnlyClassicConnections=s,e.useBigSocialButtons=c;var p=n(154),d=(r(p),n(328)),M=r(d),f=n(331),g=r(f),h=n(329),y=r(h),N=n(310),m=r(N),D=n(150),I=n(11),j=n(25),w=n(91),L=n(42),v=n(28),z=n(95),b=n(2),T=o(b),C=n(316),E=r(C),k=n(315),S=r(k),x=n(317),O=r(x),A=n(155),_=n(321),U=r(_),Y=n(320),Q=r(Y),P=n(324),B=r(P),R=n(50),G=(n(7),
n(12)),Z=function(){function t(){i(this,t)}return t.prototype.didInitialize=function(t,e){t=(0,L.initSocial)(t,e),t=(0,I.initDatabase)(t,e),t=(0,j.initEnterprise)(t,e);var n=e.prefill||{},o=n.email,r=n.username;return"string"==typeof o&&(t=(0,v.setEmail)(t,o)),"string"==typeof r&&(t=(0,z.setUsername)(t,r,"username",!1)),t},t.prototype.didReceiveClientSettings=function(t){return l(t)},t.prototype.willShow=function(t,e){return t=(0,I.overrideDatabaseOptions)(t,e),(0,R.isSuccess)(t,"client")&&(t=l(t)),t},t.prototype.render=function(e){if(!(0,R.isDone)(e)||e.get("isLoadingPanePinned"))return new U.default;if(T.hasStopped(e))return new Q.default;if((0,I.hasScreen)(e,"login")){if(!(0,A.hasSkippedQuickAuth)(e)&&T.ui.rememberLastLogin(e)&&(0,I.hasInitialScreen)(e,"login")){if((0,j.isInCorpNetwork)(e))return new E.default;var n=(0,D.lastUsedConnection)(e);if(n&&(0,R.isSuccess)(e,"sso")&&T.hasConnection(e,n.get("name")))return new B.default}if((0,j.quickAuthConnection)(e))return new O.default;if((0,j.isHRDActive)(e))return new S.default}var o=t.SCREENS[(0,I.getScreen)(e)];return o?new o:(setTimeout(function(){var t=new Error("Internal error");t.code="internal_error",t.description="Couldn't find a screen \""+(0,I.getScreen)(e)+'"',(0,G.swap)(G.updateEntity,"lock",T.id(e),T.stop,t)},0),new Q.default)},t}();Z.SCREENS={login:M.default,forgotPassword:m.default,signUp:g.default,mfaLogin:y.default},e.default=new Z},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=n(1),c=r(s),l=n(344),p=r(l),d=n(7),M=o(d),f=n(12),g=n(2),h=o(g),y=n(28),N=n(145),m=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.componentDidMount=function(){var t=this.props.lock;h.ui.avatar(t)&&M.email(t)&&(0,N.requestAvatar)(h.id(t),M.email(t))},e.prototype.handleChange=function(t){var e=this.props.lock;h.ui.avatar(e)&&(0,N.debouncedRequestAvatar)(h.id(e),t.target.value),(0,f.swap)(f.updateEntity,"lock",h.id(e),y.setEmail,t.target.value)},e.prototype.render=function(){var t=this.props,e=t.i18n,n=t.lock,o=t.placeholder,r=M.getFieldValue(n,"email");return c.default.createElement(p.default,{value:r,invalidHint:e.str(r?"invalidErrorHint":"blankErrorHint"),isValid:!M.isFieldVisiblyInvalid(n,"email"),onChange:this.handleChange.bind(this),placeholder:o})},e}(c.default.Component);e.default=m,m.propTypes={i18n:c.default.PropTypes.object.isRequired,invalidHint:c.default.PropTypes.string,lock:c.default.PropTypes.object.isRequired,placeholder:c.default.PropTypes.string.isRequired}},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=n(1),c=r(s),l=n(98),p=r(l),d=n(7),M=o(d),f=n(12),g=n(2),h=o(g),y=n(336),N=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.handleChange=function(t){var e=this.props,n=e.lock,o=e.policy;(0,f.swap)(f.updateEntity,"lock",h.id(n),y.setPassword,t.target.value,o)},e.prototype.render=function(){var t=this.props,e=t.i18n,n=t.lock,o=t.placeholder,r=t.policy,i=t.strengthMessages;return c.default.createElement(p.default,{value:M.getFieldValue(n,"password"),invalidHint:e.str("blankErrorHint"),isValid:!M.isFieldVisiblyInvalid(n,"password"),onChange:this.handleChange.bind(this),placeholder:o,strengthMessages:i,disabled:h.submitting(n),policy:r})},e}(c.default.Component);e.default=N,N.propTypes={i18n:c.default.PropTypes.object.isRequired,lock:c.default.PropTypes.object.isRequired,onChange:c.default.PropTypes.func,placeholder:c.default.PropTypes.string.isRequired,policy:c.default.PropTypes.string,strengthMessages:c.default.PropTypes.object}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M.username;if(!e||null==n)return(0,d.default)(t).length>0;var o=(0,d.default)(t.toLowerCase());if(o.length<n.min)return!1;if(o.length>n.max)return!1;var r=f.exec(o);return r&&r[0]}function i(t){var e=(0,l.databaseConnection)(t).getIn(["validation","username"]);return e?e.toJS():null}function a(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"username",o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=o?i(t):null,l=function(t){switch(n){case"email":return(0,c.validateEmail)(t);case"username":return r(t,o,a);default:return u(t)?(0,c.validateEmail)(t):r(t,o,a)}};return(0,s.setField)(t,"username",e,l)}function u(t){return t.indexOf("@")>-1}e.__esModule=!0,e.getUsernameValidation=i,e.setUsername=a,e.usernameLooksLikeEmail=u;var s=n(7),c=n(28),l=n(11),p=n(32),d=o(p),M={username:{min:1,max:15}},f=/^[a-zA-Z0-9_]+$/},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=n(1),c=r(s),l=n(348),p=r(l),d=n(7),M=o(d),f=n(12),g=n(2),h=o(g),y=n(95),N=n(145),m=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.componentDidMount=function(){var t=this.props.lock;h.ui.avatar(t)&&M.username(t)&&(0,N.requestAvatar)(h.id(t),M.username(t))},e.prototype.handleChange=function(t){var e=this.props,n=e.lock,o=e.validateFormat,r=e.usernameStyle;h.ui.avatar(n)&&(0,N.debouncedRequestAvatar)(h.id(n),t.target.value),(0,f.swap)(f.updateEntity,"lock",h.id(n),y.setUsername,t.target.value,r,o)},e.prototype.render=function(){var t=this.props,e=t.i18n,n=t.lock,o=t.placeholder,r=t.validateFormat,i=M.getFieldValue(n,"username"),a=r?(0,y.getUsernameValidation)(n):{},u=function(t){return t?(0,y.usernameLooksLikeEmail)(t)||!r?"invalidErrorHint":"usernameFormatErrorHint":"blankErrorHint"},s=function(t){var n=u(t);return"usernameFormatErrorHint"===n&&r&&null!=a?e.str(n,a.min,a.max):e.str(n)};return c.default.createElement(p.default,{value:i,invalidHint:s(i),isValid:!M.isFieldVisiblyInvalid(n,"username"),onChange:this.handleChange.bind(this),placeholder:o})},e}(c.default.Component);e.default=m,m.propTypes={i18n:c.default.PropTypes.object.isRequired,lock:c.default.PropTypes.object.isRequired,placeholder:c.default.PropTypes.string.isRequired,validateFormat:c.default.PropTypes.bool.isRequired,usernameStyle:c.default.PropTypes.oneOf(["any","email","username"])},m.defaultProps={validateFormat:!1,usernameStyle:"username"}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},i=n(1),a=o(i),u=n(340),s=o(u),c='<svg width="56px" height="56px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="checkmark"> <circle cx="26" cy="26" r="25" fill="none" class="checkmark__circle"></circle> <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" class="checkmark__check"></path> </svg>',l=function(t){return a.default.createElement(s.default,r({svg:c},t))};e.default=l},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var n={};for(var o in t)e.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0,e.icon=void 0;var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},c=n(1),l=o(c),p=n(43),d=o(p),M=n(346),f=o(M),g=e.icon='<svg width="11px" height="14px" viewBox="0 0 13 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="auth0-lock-icon auth0-lock-icon-box"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-288.000000, -1508.000000)" fill="#888888"><path d="M299,1523.998 L290,1523.998 C288.896,1523.998 288,1523.102 288,1521.999 L288,1515.999 C288,1514.895 288.896,1513.998 290,1513.998 L290,1513.998 L290,1512.499 C290,1510.015 292.015,1507.999 294.5,1507.999 C296.985,1507.999 299,1510.015 299,1512.499 L299,1513.999 C300.104,1513.999 301,1514.895 301,1515.999 L301,1521.999 C301,1523.103 300.104,1523.998 299,1523.998 L299,1523.998 Z M298,1512.499 C298,1510.566 296.433,1508.999 294.5,1508.999 C292.567,1508.999 291,1510.566 291,1512.499 L291,1513.998 L298,1513.998 L298,1512.499 L298,1512.499 Z M300,1515.999 C300,1515.446 299.552,1514.998 299,1514.998 L290,1514.998 C289.447,1514.998 289,1515.446 289,1515.999 L289,1521.999 C289,1522.551 289.447,1522.998 290,1522.998 L299,1522.998 C299.552,1522.998 300,1522.551 300,1521.999 L300,1515.999 L300,1515.999 Z M294.5,1520.998 C294.224,1520.998 294,1520.774 294,1520.498 L294,1517.498 C294,1517.223 294.224,1516.999 294.5,1516.999 C294.776,1516.999 295,1517.223 295,1517.498 L295,1520.498 C295,1520.774 294.776,1520.998 294.5,1520.998 L294.5,1520.998 Z"></path></g></g></svg>',h=function(t){function e(n){i(this,e);var o=a(this,t.call(this,n));return o.state={},o}return u(e,t),e.prototype.focus=function(){this.refs.input&&this.refs.input.focus()},e.prototype.hasFocus=function(){return this.state.focused},e.prototype.render=function(){var t=this.props,e=t.invalidHint,n=t.isValid,o=(t.onChange,t.policy),i=t.strengthMessages,a=t.value,u=r(t,["invalidHint","isValid","onChange","policy","strengthMessages","value"]),c=this.state,p=c.focused,M=c.changing,h=o&&p&&M?l.default.createElement(f.default,{messages:i,password:a,policy:o}):null;return l.default.createElement(d.default,{before:h,focused:p,invalidHint:o?void 0:e,isValid:n,name:"password",icon:g},l.default.createElement("input",s({ref:"input",type:"password",name:"password",className:"auth0-lock-input",autoComplete:"off",autoCapitalize:"off",onChange:this.handleOnChange.bind(this),onFocus:this.handleFocus.bind(this),onBlur:this.handleBlur.bind(this),value:a},u)))},e.prototype.handleOnChange=function(t){var e=this.state;e.changing=!0,this.setState(e),this.props.onChange&&this.props.onChange(t)},e.prototype.handleFocus=function(){this.setState({focused:!0})},e.prototype.handleBlur=function(){this.setState({focused:!1})},e}(l.default.Component);h.propTypes={invalidHint:l.default.PropTypes.string.isRequired,isValid:l.default.PropTypes.bool.isRequired,onChange:l.default.PropTypes.func.isRequired,placeholder:l.default.PropTypes.string,policy:l.default.PropTypes.string,strengthMessages:l.default.PropTypes.object,value:l.default.PropTypes.string.isRequired},e.default=h},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(1),i=o(r),a=n(157),u=o(a),s=function(t){var e=t.alternativeLabel,n=t.alternativeClickHandler,o=t.buttonLabel,r=t.buttonClickHandler,a=t.header,s=t.strategy,c=t.buttonIcon,l=t.primaryColor,p=t.foregroundColor,d=e?i.default.createElement("p",{className:"auth0-lock-alternative"},i.default.createElement("a",{className:"auth0-lock-alternative-link",href:"#",onClick:function(t){t.preventDefault(),n(t)}},e)):null;return i.default.createElement("div",{className:"auth0-lock-last-login-pane"},a,i.default.createElement(u.default,{label:o,onClick:function(t){t.preventDefault(),r(t)},strategy:s,primaryColor:l,foregroundColor:p,icon:c}),d,i.default.createElement("div",{className:"auth0-loading-container"},i.default.createElement("div",{className:"auth0-loading"})))};s.propTypes={alternativeLabel:i.default.PropTypes.string,alternativeClickHandler:function(t,e,n){for(var o=arguments.length,r=Array(o>3?o-3:0),a=3;a<o;a++)r[a-3]=arguments[a];if(void 0!==t.alternativeLabel){var u;return(u=i.default.PropTypes.func).isRequired.apply(u,[t,e,n].concat(r))}},buttonLabel:i.default.PropTypes.string.isRequired,buttonClickHandler:i.default.PropTypes.func.isRequired,header:i.default.PropTypes.element,strategy:i.default.PropTypes.string.isRequired},e.default=s},function(t,e,n){(function(t){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(e){var n=e.cb,o=e.check,r=e.method,i=e.url;u[r]||(u[r]=[],t.Auth0[r]=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];u[r]=u[r].filter(function(t){return!t.check.apply(t,e)||(setTimeout(function(){return t.cb.apply(t,[null].concat(e))},0),!1)})}),u[r].push({cb:n,check:o,url:i});var a=u[r].reduce(function(t,e){return t+(e.url===i?1:0)},0);if(!(a>1)){var s=t.document.createElement("script");s.src=i,t.document.getElementsByTagName("head")[0].appendChild(s);var c=function(t){u[r]=u[r].filter(function(e){return e.url!==t||(setTimeout(function(){return e.cb({})},0),!1)})},l=setTimeout(function(){return c(i)},5e3);s.addEventListener("load",function(){return clearTimeout(l)}),s.addEventListener("error",function(){clearTimeout(l),c(i)})}}function i(e){var n=e.method,o=e.cb;t.Auth0[n]=o}e.__esModule=!0,e.load=r,e.preload=i;var a=n(52);o(a);t.Auth0||(t.Auth0={});var u={}}).call(e,function(){return this}())},function(t,e){"use strict";function n(t,e){return e.toLowerCase().indexOf(t.toLowerCase())>-1}function o(t,e){return 0===t.indexOf(e)}function r(t,e){return t.indexOf(e,t.length-e.length)!==-1}e.__esModule=!0,e.matches=n,e.startsWith=o,e.endsWith=r},function(t,e,n){"use strict";function o(t){s.check(t,{type:"object",message:"options parameter is not valid"},{domain:{type:"string",message:"domain option is required"},clientID:{type:"string",message:"clientID option is required"},responseType:{optional:!0,type:"string",message:"responseType is not valid"},responseMode:{optional:!0,type:"string",message:"responseMode is not valid"},redirectUri:{optional:!0,type:"string",message:"redirectUri is not valid"},scope:{optional:!0,type:"string",message:"scope is not valid"},audience:{optional:!0,type:"string",message:"audience is not valid"},_disableDeprecationWarnings:{optional:!0,type:"boolean",message:"_disableDeprecationWarnings option is not valid"},_sendTelemetry:{optional:!0,type:"boolean",message:"_sendTelemetry option is not valid"},_telemetryInfo:{optional:!0,type:"object",message:"_telemetryInfo option is not valid"}}),this.baseOptions=t,this.baseOptions._sendTelemetry=this.baseOptions._sendTelemetry!==!1||this.baseOptions._sendTelemetry,this.baseOptions.rootUrl="https://"+this.baseOptions.domain,this.request=new i(this.baseOptions),this.passwordless=new d(this.request,this.baseOptions),this.dbConnection=new M(this.request,this.baseOptions),this.warn=new p({disableWarnings:!!t._disableDeprecationWarnings})}var r=n(24),i=n(65),a=n(64),u=n(15),s=n(29),c=n(34),l=n(174),p=n(51),d=n(170),M=n(169);o.prototype.buildAuthorizeUrl=function(t){var e,n;return s.check(t,{type:"object",message:"options parameter is not valid"}),e=u.merge(this.baseOptions,["clientID","responseType","responseMode","redirectUri","scope","audience"]).with(t),s.check(e,{type:"object",message:"options parameter is not valid"},{clientID:{type:"string",message:"clientID option is required"},redirectUri:{type:"string",message:"redirectUri option is required"},responseType:{type:"string",message:"responseType option is required"},nonce:{type:"string",message:"nonce option is required",condition:function(t){return t.responseType.indexOf("code")===-1&&t.responseType.indexOf("id_token")!==-1}},state:{type:"string",message:"state option is required",condition:function(t){return t.responseType.indexOf("code")===-1}},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),this.baseOptions._sendTelemetry&&(e.auth0Client=this.request.getTelemetryData()),e.connection_scope&&s.isArray(e.connection_scope)&&(e.connection_scope=e.connection_scope.join(",")),e=u.toSnakeCase(e,["auth0Client"]),e=l.oauthAuthorizeParams(e),n=a.build(e),r(this.baseOptions.rootUrl,"authorize","?"+n)},o.prototype.buildLogoutUrl=function(t){var e,n;return s.check(t,{optional:!0,type:"object",message:"options parameter is not valid"}),e=u.merge(this.baseOptions,["clientID"]).with(t||{}),this.baseOptions._sendTelemetry&&(e.auth0Client=this.request.getTelemetryData()),e=u.toSnakeCase(e,["auth0Client","returnTo"]),n=a.build(e),r(this.baseOptions.rootUrl,"v2","logout","?"+n)},o.prototype.loginWithDefaultDirectory=function(t,e){return s.check(t,{type:"object",message:"options parameter is not valid"},{username:{type:"string",message:"username option is required"},password:{type:"string",message:"password option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),t.grantType="password",this.oauthToken(t,e)},o.prototype.login=function(t,e){return s.check(t,{type:"object",message:"options parameter is not valid"},{username:{type:"string",message:"username option is required"},password:{type:"string",message:"password option is required"},realm:{type:"string",message:"realm option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),t.grantType="http://auth0.com/oauth/grant-type/password-realm",this.oauthToken(t,e)},o.prototype.oauthToken=function(t,e){var n,o;return s.check(t,{type:"object",message:"options parameter is not valid"}),s.check(e,{type:"function",message:"cb parameter is not valid"}),n=r(this.baseOptions.rootUrl,"oauth","token"),o=u.merge(this.baseOptions,["clientID","scope","audience"]).with(t),s.check(o,{type:"object",message:"options parameter is not valid"},{clientID:{type:"string",message:"clientID option is required"},grantType:{type:"string",message:"grantType option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),o=u.toSnakeCase(o,["auth0Client"]),o=l.oauthTokenParams(o),o.grant_type=o.grant_type,this.request.post(n).send(o).end(c(e))},o.prototype.loginWithResourceOwner=function(t,e){var n,o;return this.warn.warning("`loginWithResourceOwner` will be soon deprecated, user `login` instead."),s.check(t,{type:"object",message:"options parameter is not valid"},{username:{type:"string",message:"username option is required"},password:{type:"string",message:"password option is required"},connection:{type:"string",message:"connection option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),s.check(e,{type:"function",message:"cb parameter is not valid"}),n=r(this.baseOptions.rootUrl,"oauth","ro"),o=u.merge(this.baseOptions,["clientID","scope","audience"]).with(t),o=u.toSnakeCase(o,["auth0Client"]),o.grant_type=o.grant_type||"password",this.request.post(n).send(o).end(c(e))},o.prototype.getSSOData=function(t,e){var n,o="";return this.warn.warning("`getSSOData` will be soon deprecated."),"function"==typeof t&&(e=t,t=!1),s.check(t,{type:"boolean",message:"withActiveDirectories parameter is not valid"}),s.check(e,{type:"function",message:"cb parameter is not valid"}),t&&(o="?"+a.build({ldaps:1,client_id:this.baseOptions.clientID})),n=r(this.baseOptions.rootUrl,"user","ssodata",o),this.request.get(n,{noHeaders:!0}).withCredentials().end(c(e))},o.prototype.userInfo=function(t,e){var n;return s.check(t,{type:"string",message:"accessToken parameter is not valid"}),s.check(e,{type:"function",message:"cb parameter is not valid"}),n=r(this.baseOptions.rootUrl,"userinfo"),this.request.get(n).set("Authorization","Bearer "+t).end(c(e))},o.prototype.delegation=function(t,e){var n,o;return this.warn.warning("`delegation` will be soon deprecated."),s.check(t,{type:"object",message:"options parameter is not valid"},{grant_type:{type:"string",message:"grant_type option is required"}}),s.check(e,{type:"function",message:"cb parameter is not valid"}),n=r(this.baseOptions.rootUrl,"delegation"),o=u.merge(this.baseOptions,["clientID"]).with(t),o=u.toSnakeCase(o,["auth0Client"]),this.request.post(n).send(o).end(c(e))},o.prototype.getUserCountry=function(t){var e;return s.check(t,{type:"function",message:"cb parameter is not valid"}),e=r(this.baseOptions.rootUrl,"user","geoloc","country"),this.request.get(e).end(c(t))},t.exports=o},function(t,e,n){"use strict";function o(t){var e=t.length%4,n=4-e;return 0===e?t:t+new Array(1+n).join("=")}function r(t){for(var e=new Array(t.length),n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function i(t){for(var e="",n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return e}function a(t){return s.fromByteArray(r(t)).replace(/\+/g,"-").replace(/\//g,"_")}function u(t){return t=o(t).replace(/\-/g,"+").replace(/_/g,"/"),i(s.toByteArray(t))}var s=n(161);t.exports={encode:a,decode:u}},function(t,e){"use strict";function n(t,e){return{error:t,errorDescription:e}}function o(t){return n("invalid_token",t)}t.exports={buildResponse:n,invalidJwt:o}},function(t,e){"use strict";t.exports={raw:"8.0.4"}},function(t,e,n){"use strict";function o(t){t=t||{},this.namespace=t.namespace||a,this.keyLength=t.keyLength||32}var r=n(176),i=n(177),a="com.auth0.auth.";o.prototype.process=function(t){var e;return t.responseType.indexOf("code")!==-1?t:t.responseType.indexOf("id_token")!==-1&&t.nonce?t:(e=this.generateTransaction(t.appState,t.state,t.nonce),t.state=e.state,t.responseType.indexOf("id_token")!==-1&&(t.nonce=e.nonce),t)},o.prototype.generateTransaction=function(t,e,n){var o,n;return o=e||r.randomString(this.keyLength),n=n||r.randomString(this.keyLength),i.setItem(this.namespace+o,{nonce:n,appState:t}),{state:o,nonce:n}},o.prototype.getStoredTransaction=function(t){var e;return e=i.getItem(this.namespace+t),i.removeItem(this.namespace+t),e},t.exports=o},function(t,e,n){"use strict";var o=n(188),r={addClass:function(t,e){return/\s/.test(e)?o(!1):void 0,e&&(t.classList?t.classList.add(e):r.hasClass(t,e)||(t.className=t.className+" "+e)),t},removeClass:function(t,e){return/\s/.test(e)?o(!1):void 0,e&&(t.classList?t.classList.remove(e):r.hasClass(t,e)&&(t.className=t.className.replace(new RegExp("(^|\\s)"+e+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,""))),t},conditionClass:function(t,e,n){return(n?r.addClass:r.removeClass)(t,e)},hasClass:function(t,e){return/\s/.test(e)?o(!1):void 0,t.classList?!!e&&t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}};t.exports=r},function(t,e,n){var o,r,i,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(n,u){"object"===a(e)?t.exports=e=u():(r=[],o=u,i="function"==typeof o?o.apply(e,r):o,!(void 0!==i&&(t.exports=i)))}(void 0,function(){var t=t||function(t,e){var n=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),o={},r=o.lib={},i=r.Base=function(){return{extend:function(t){var e=n(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),a=r.WordArray=i.extend({init:function(t,n){t=this.words=t||[],n!=e?this.sigBytes=n:this.sigBytes=4*t.length},toString:function(t){return(t||s).stringify(this)},concat:function(t){var e=this.words,n=t.words,o=this.sigBytes,r=t.sigBytes;if(this.clamp(),o%4)for(var i=0;i<r;i++){var a=n[i>>>2]>>>24-i%4*8&255;e[o+i>>>2]|=a<<24-(o+i)%4*8}else for(var i=0;i<r;i+=4)e[o+i>>>2]=n[i>>>2];return this.sigBytes+=r,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-n%4*8,e.length=t.ceil(n/4)},clone:function t(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var n,o=[],r=function(e){var e=e,n=987654321,o=4294967295;return function(){n=36969*(65535&n)+(n>>16)&o,e=18e3*(65535&e)+(e>>16)&o;var r=(n<<16)+e&o;return r/=4294967296,r+=.5,r*(t.random()>.5?1:-1)}},i=0;i<e;i+=4){var u=r(4294967296*(n||t.random()));n=987654071*u(),o.push(4294967296*u()|0)}return new a.init(o,e)}}),u=o.enc={},s=u.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,o=[],r=0;r<n;r++){var i=e[r>>>2]>>>24-r%4*8&255;o.push((i>>>4).toString(16)),o.push((15&i).toString(16))}return o.join("")},parse:function(t){for(var e=t.length,n=[],o=0;o<e;o+=2)n[o>>>3]|=parseInt(t.substr(o,2),16)<<24-o%8*4;return new a.init(n,e/2)}},c=u.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,o=[],r=0;r<n;r++){var i=e[r>>>2]>>>24-r%4*8&255;o.push(String.fromCharCode(i))}return o.join("")},parse:function(t){for(var e=t.length,n=[],o=0;o<e;o++)n[o>>>2]|=(255&t.charCodeAt(o))<<24-o%4*8;return new a.init(n,e)}},l=u.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},p=r.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n=this._data,o=n.words,r=n.sigBytes,i=this.blockSize,u=4*i,s=r/u;s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0);var c=s*i,l=t.min(4*c,r);if(c){for(var p=0;p<c;p+=i)this._doProcessBlock(o,p);var d=o.splice(0,c);n.sigBytes-=l}return new a.init(d,l)},clone:function t(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),d=(r.Hasher=p.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){p.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){t&&this._append(t);var e=this._doFinalize();return e},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new d.HMAC.init(t,n).finalize(e)}}}),o.algo={});return o}(Math);return t})},function(t,e,n){"use strict";function o(t){var e=t.length%4,n=4-e;return 0===e?t:t+new Array(1+n).join("=")}function r(t){for(var e="",n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return e}function i(t){for(var e=new Array(t.length),n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function a(t){for(var e="",n=0;n<t.length;n++){var o=t[n].toString(16);e+=2===o.length?o:"0"+o}return e}function u(t){return l.fromByteArray(i(t)).replace(/\+/g,"-").replace(/\//g,"_")}function s(t){return t=o(t).replace(/\-/g,"+").replace(/_/g,"/"),r(l.toByteArray(t))}function c(t){return a(l.toByteArray(o(t)))}var l=n(189);t.exports={encodeString:u,decodeToString:s,byteArrayToString:r,stringToByteArray:i,padding:o,byteArrayToHex:a,decodeToHEX:c}},function(t,e,n){"use strict";function o(t){if(t=t||{},this.jwksCache=t.jwksCache||new s,this.expectedAlg=t.expectedAlg||"RS256",this.issuer=t.issuer,this.audience=t.audience,this.leeway=t.leeway||0,this.__disableExpirationCheck=t.__disableExpirationCheck||!1,this.leeway<0||this.leeway>60)throw new u.ConfigurationError("The leeway should be positive and lower than a minute.");if(c.indexOf(this.expectedAlg)===-1)throw new u.ConfigurationError("Algorithm "+this.expectedAlg+" is not supported. (Expected algs: ["+c.join(",")+"])")}var r=n(201),i=n(109),a=n(200),u=n(199),s=n(198),c=["RS256"];o.prototype.verify=function(t,e,n){var o=this.decode(t);if(o instanceof Error)return n(o,!1);var r=o.encoded.header+"."+o.encoded.payload,a=i.decodeToHEX(o.encoded.signature),s=o.header.alg,l=o.header.kid,p=o.payload.aud,d=o.payload.iss,M=o.payload.exp,f=o.payload.iat,g=o.payload.nonce||null;if(this.issuer!==d)return n(new u.TokenValidationError("Issuer "+d+" is not valid."),!1);if(this.audience!==p)return n(new u.TokenValidationError("Audience "+p+" is not valid."),!1);if(this.expectedAlg!==s)return n(new u.TokenValidationError("Algorithm "+s+" is not supported. (Expected algs: ["+c.join(",")+"])"),!1);if(g!==e)return n(new u.TokenValidationError("Nonce does not match."),!1);var h=this.verifyExpAndIat(M,f);return h?n(h,!1):void this.getRsaVerifier(d,l,function(t,e){return t?n(t):void(e.verify(r,a)?n(null,o.payload):n(new u.TokenValidationError("Invalid signature.")))})},o.prototype.verifyExpAndIat=function(t,e){if(this.__disableExpirationCheck)return null;var n=new Date,o=new Date(0);if(o.setUTCSeconds(t+this.leeway),n>o)return new u.TokenValidationError("Expired token.");var r=new Date(0);return r.setUTCSeconds(e-this.leeway),n<r?new u.TokenValidationError("The token was issued in the future. Please check your computed clock."):null},o.prototype.getRsaVerifier=function(t,e,n){var o=this,i=t+e;if(this.jwksCache.has(i)){var u=this.jwksCache.get(i);n(null,new r(u.modulus,u.exp))}else a.getJWKS({iss:t,kid:e},function(t,e){t&&n(t),o.jwksCache.set(i,e),n(null,new r(e.modulus,e.exp))})},o.prototype.decode=function(t){var e,n,o=t.split(".");if(3!==o.length)return new u.TokenValidationError("Cannot decode a malformed JWT");try{e=JSON.parse(i.decodeToString(o[0])),n=JSON.parse(i.decodeToString(o[1]))}catch(t){return new u.TokenValidationError("Token header or payload is not valid JSON")}return{header:e,payload:n,encoded:{
header:o[0],payload:o[1],signature:o[2]}}},t.exports=o},function(t,e,n){"use strict";var o=n(67).charsets,r=o.upperCase,i=o.lowerCase,a=o.numbers,u=o.specialCharacters,s=n(206),c=new s({length:{minLength:1}}),l=new s({length:{minLength:6}}),p=new s({length:{minLength:8},contains:{expressions:[i,r,a]}}),d=new s({length:{minLength:8},containsAtLeast:{atLeast:3,expressions:[i,r,a,u]}}),M=new s({length:{minLength:10},containsAtLeast:{atLeast:3,expressions:[i,r,a,u]},identicalChars:{max:2}}),f={none:c,low:l,fair:p,good:d,excellent:M};t.exports=function(t){var e=f[t]||f.none;return{check:function(t){return e.check(t)},assert:function(t){return e.assert(t)},missing:function(t){return e.missing(t)},missingAsMarkdown:function(t){return e.missingAsMarkdown(t)},explain:function(){return e.explain()},toString:function(){return e.toString()}}},t.exports.PasswordPolicy=s,t.exports.charsets=o},function(t,e){"use strict";function n(t,e){return t+e.charAt(0).toUpperCase()+e.substring(1)}var o={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridColumn:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},r=["Webkit","ms","Moz","O"];Object.keys(o).forEach(function(t){r.forEach(function(e){o[n(e,t)]=o[t]})});var i={background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}},a={isUnitlessNumber:o,shorthandPropertyExpansions:i};t.exports=a},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=n(4),i=n(30),a=(n(3),function(){function t(e){o(this,t),this._callbacks=null,this._contexts=null,this._arg=e}return t.prototype.enqueue=function(t,e){this._callbacks=this._callbacks||[],this._callbacks.push(t),this._contexts=this._contexts||[],this._contexts.push(e)},t.prototype.notifyAll=function(){var t=this._callbacks,e=this._contexts,n=this._arg;if(t&&e){t.length!==e.length?r("24"):void 0,this._callbacks=null,this._contexts=null;for(var o=0;o<t.length;o++)t[o].call(e[o],n);t.length=0,e.length=0}},t.prototype.checkpoint=function(){return this._callbacks?this._callbacks.length:0},t.prototype.rollback=function(t){this._callbacks&&this._contexts&&(this._callbacks.length=t,this._contexts.length=t)},t.prototype.reset=function(){this._callbacks=null,this._contexts=null},t.prototype.destructor=function(){this.reset()},t}());t.exports=i.addPoolingTo(a)},function(t,e,n){"use strict";function o(t){return!!c.hasOwnProperty(t)||!s.hasOwnProperty(t)&&(u.test(t)?(c[t]=!0,!0):(s[t]=!0,!1))}function r(t,e){return null==e||t.hasBooleanValue&&!e||t.hasNumericValue&&isNaN(e)||t.hasPositiveNumericValue&&e<1||t.hasOverloadedBooleanValue&&e===!1}var i=n(36),a=(n(6),n(14),n(272)),u=(n(5),new RegExp("^["+i.ATTRIBUTE_NAME_START_CHAR+"]["+i.ATTRIBUTE_NAME_CHAR+"]*$")),s={},c={},l={createMarkupForID:function(t){return i.ID_ATTRIBUTE_NAME+"="+a(t)},setAttributeForID:function(t,e){t.setAttribute(i.ID_ATTRIBUTE_NAME,e)},createMarkupForRoot:function(){return i.ROOT_ATTRIBUTE_NAME+'=""'},setAttributeForRoot:function(t){t.setAttribute(i.ROOT_ATTRIBUTE_NAME,"")},createMarkupForProperty:function(t,e){var n=i.properties.hasOwnProperty(t)?i.properties[t]:null;if(n){if(r(n,e))return"";var o=n.attributeName;return n.hasBooleanValue||n.hasOverloadedBooleanValue&&e===!0?o+'=""':o+"="+a(e)}return i.isCustomAttribute(t)?null==e?"":t+"="+a(e):null},createMarkupForCustomAttribute:function(t,e){return o(t)&&null!=e?t+"="+a(e):""},setValueForProperty:function(t,e,n){var o=i.properties.hasOwnProperty(e)?i.properties[e]:null;if(o){var a=o.mutationMethod;if(a)a(t,n);else{if(r(o,n))return void this.deleteValueForProperty(t,e);if(o.mustUseProperty)t[o.propertyName]=n;else{var u=o.attributeName,s=o.attributeNamespace;s?t.setAttributeNS(s,u,""+n):o.hasBooleanValue||o.hasOverloadedBooleanValue&&n===!0?t.setAttribute(u,""):t.setAttribute(u,""+n)}}}else if(i.isCustomAttribute(e))return void l.setValueForAttribute(t,e,n)},setValueForAttribute:function(t,e,n){if(o(e)){null==n?t.removeAttribute(e):t.setAttribute(e,""+n)}},deleteValueForAttribute:function(t,e){t.removeAttribute(e)},deleteValueForProperty:function(t,e){var n=i.properties.hasOwnProperty(e)?i.properties[e]:null;if(n){var o=n.mutationMethod;if(o)o(t,void 0);else if(n.mustUseProperty){var r=n.propertyName;n.hasBooleanValue?t[r]=!1:t[r]=""}else t.removeAttribute(n.attributeName)}else i.isCustomAttribute(e)&&t.removeAttribute(e)}};t.exports=l},function(t,e,n){"use strict";var o=n(6),r=n(237),i=n(122),a=n(37),u=n(16),s=n(250),c=n(266),l=n(127),p=n(273);n(5);r.inject();var d={findDOMNode:c,render:i.render,unmountComponentAtNode:i.unmountComponentAtNode,version:s,unstable_batchedUpdates:u.batchedUpdates,unstable_renderSubtreeIntoContainer:p};"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject&&__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({ComponentTree:{getClosestInstanceFromNode:o.getClosestInstanceFromNode,getNodeFromInstance:function(t){return t._renderedComponent&&(t=l(t)),t?o.getNodeFromInstance(t):null}},Mount:i,Reconciler:a});t.exports=d},function(t,e){"use strict";var n={hasCachedChildNodes:1};t.exports=n},function(t,e,n){"use strict";function o(){if(this._rootNodeID&&this._wrapperState.pendingUpdate){this._wrapperState.pendingUpdate=!1;var t=this._currentElement.props,e=u.getValue(t);null!=e&&r(this,Boolean(t.multiple),e)}}function r(t,e,n){var o,r,i=s.getNodeFromInstance(t).options;if(e){for(o={},r=0;r<n.length;r++)o[""+n[r]]=!0;for(r=0;r<i.length;r++){var a=o.hasOwnProperty(i[r].value);i[r].selected!==a&&(i[r].selected=a)}}else{for(o=""+n,r=0;r<i.length;r++)if(i[r].value===o)return void(i[r].selected=!0);i.length&&(i[0].selected=!0)}}function i(t){var e=this._currentElement.props,n=u.executeOnChange(e,t);return this._rootNodeID&&(this._wrapperState.pendingUpdate=!0),c.asap(o,this),n}var a=n(8),u=n(73),s=n(6),c=n(16),l=(n(5),!1),p={getHostProps:function(t,e){return a({},e,{onChange:t._wrapperState.onChange,value:void 0})},mountWrapper:function(t,e){var n=u.getValue(e);t._wrapperState={pendingUpdate:!1,initialValue:null!=n?n:e.defaultValue,listeners:null,onChange:i.bind(t),wasMultiple:Boolean(e.multiple)},void 0===e.value||void 0===e.defaultValue||l||(l=!0)},getSelectValueContext:function(t){return t._wrapperState.initialValue},postUpdateWrapper:function(t){var e=t._currentElement.props;t._wrapperState.initialValue=void 0;var n=t._wrapperState.wasMultiple;t._wrapperState.wasMultiple=Boolean(e.multiple);var o=u.getValue(e);null!=o?(t._wrapperState.pendingUpdate=!1,r(t,Boolean(e.multiple),o)):n!==Boolean(e.multiple)&&(null!=e.defaultValue?r(t,Boolean(e.multiple),e.defaultValue):r(t,Boolean(e.multiple),e.multiple?[]:""))}};t.exports=p},function(t,e){"use strict";var n,o={injectEmptyComponentFactory:function(t){n=t}},r={create:function(t){return n(t)}};r.injection=o,t.exports=r},function(t,e){"use strict";var n={logTopLevelRenders:!1};t.exports=n},function(t,e,n){"use strict";function o(t){return u?void 0:a("111",t.type),new u(t)}function r(t){return new s(t)}function i(t){return t instanceof s}var a=n(4),u=(n(3),null),s=null,c={injectGenericComponentClass:function(t){u=t},injectTextComponentClass:function(t){s=t}},l={createInternalComponent:o,createInstanceForText:r,isTextComponent:i,injection:c};t.exports=l},function(t,e,n){"use strict";function o(t){return i(document.documentElement,t)}var r=n(232),i=n(276),a=n(136),u=n(137),s={hasSelectionCapabilities:function(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&("input"===e&&"text"===t.type||"textarea"===e||"true"===t.contentEditable)},getSelectionInformation:function(){var t=u();return{focusedElem:t,selectionRange:s.hasSelectionCapabilities(t)?s.getSelection(t):null}},restoreSelection:function(t){var e=u(),n=t.focusedElem,r=t.selectionRange;e!==n&&o(n)&&(s.hasSelectionCapabilities(n)&&s.setSelection(n,r),a(n))},getSelection:function(t){var e;if("selectionStart"in t)e={start:t.selectionStart,end:t.selectionEnd};else if(document.selection&&t.nodeName&&"input"===t.nodeName.toLowerCase()){var n=document.selection.createRange();n.parentElement()===t&&(e={start:-n.moveStart("character",-t.value.length),end:-n.moveEnd("character",-t.value.length)})}else e=r.getOffsets(t);return e||{start:0,end:0}},setSelection:function(t,e){var n=e.start,o=e.end;if(void 0===o&&(o=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(o,t.value.length);else if(document.selection&&t.nodeName&&"input"===t.nodeName.toLowerCase()){var i=t.createTextRange();i.collapse(!0),i.moveStart("character",n),i.moveEnd("character",o-n),i.select()}else r.setOffsets(t,e)}};t.exports=s},function(t,e,n){"use strict";function o(t,e){for(var n=Math.min(t.length,e.length),o=0;o<n;o++)if(t.charAt(o)!==e.charAt(o))return o;return t.length===e.length?-1:n}function r(t){return t?t.nodeType===O?t.documentElement:t.firstChild:null}function i(t){return t.getAttribute&&t.getAttribute(k)||""}function a(t,e,n,o,r){var i;if(I.logTopLevelRenders){var a=t._currentElement.props.child,u=a.type;i="React mount: "+("string"==typeof u?u:u.displayName||u.name),console.time(i)}var s=L.mountComponent(t,n,null,m(t,e),r,0);i&&console.timeEnd(i),t._renderedComponent._topLevelWrapper=t,Q._mountImageIntoNode(s,e,t,o,n)}function u(t,e,n,o){var r=z.ReactReconcileTransaction.getPooled(!n&&D.useCreateElement);r.perform(a,null,t,e,r,n,o),z.ReactReconcileTransaction.release(r)}function s(t,e,n){for(L.unmountComponent(t,n),e.nodeType===O&&(e=e.documentElement);e.lastChild;)e.removeChild(e.lastChild)}function c(t){var e=r(t);if(e){var n=N.getInstanceFromNode(e);return!(!n||!n._hostParent)}}function l(t){return!(!t||t.nodeType!==x&&t.nodeType!==O&&t.nodeType!==A)}function p(t){var e=r(t),n=e&&N.getInstanceFromNode(e);return n&&!n._hostParent?n:null}function d(t){var e=p(t);return e?e._hostContainerInfo._topLevelWrapper:null}var M=n(4),f=n(35),g=n(36),h=n(21),y=n(54),N=(n(22),n(6)),m=n(226),D=n(228),I=n(119),j=n(47),w=(n(14),n(242)),L=n(37),v=n(76),z=n(16),b=n(135),T=n(130),C=(n(3),n(58)),E=n(82),k=(n(5),g.ID_ATTRIBUTE_NAME),S=g.ROOT_ATTRIBUTE_NAME,x=1,O=9,A=11,_={},U=1,Y=function(){this.rootID=U++};Y.prototype.isReactComponent={},Y.prototype.render=function(){return this.props.child},Y.isReactTopLevelWrapper=!0;var Q={TopLevelWrapper:Y,_instancesByReactRootID:_,scrollMonitor:function(t,e){e()},_updateRootComponent:function(t,e,n,o,r){return Q.scrollMonitor(o,function(){v.enqueueElementInternal(t,e,n),r&&v.enqueueCallbackInternal(t,r)}),t},_renderNewRootComponent:function(t,e,n,o){l(e)?void 0:M("37"),y.ensureScrollValueMonitoring();var r=T(t,!1);z.batchedUpdates(u,r,e,n,o);var i=r._instance.rootID;return _[i]=r,r},renderSubtreeIntoContainer:function(t,e,n,o){return null!=t&&j.has(t)?void 0:M("38"),Q._renderSubtreeIntoContainer(t,e,n,o)},_renderSubtreeIntoContainer:function(t,e,n,o){v.validateCallback(o,"ReactDOM.render"),h.isValidElement(e)?void 0:M("39","string"==typeof e?" Instead of passing a string like 'div', pass React.createElement('div') or <div />.":"function"==typeof e?" Instead of passing a class like Foo, pass React.createElement(Foo) or <Foo />.":null!=e&&void 0!==e.props?" This may be caused by unintentionally loading two independent copies of React.":"");var a,u=h.createElement(Y,{child:e});if(t){var s=j.get(t);a=s._processChildContext(s._context)}else a=b;var l=d(n);if(l){var p=l._currentElement,f=p.props.child;if(E(f,e)){var g=l._renderedComponent.getPublicInstance(),y=o&&function(){o.call(g)};return Q._updateRootComponent(l,u,a,n,y),g}Q.unmountComponentAtNode(n)}var N=r(n),m=N&&!!i(N),D=c(n),I=m&&!l&&!D,w=Q._renderNewRootComponent(u,n,I,a)._renderedComponent.getPublicInstance();return o&&o.call(w),w},render:function(t,e,n){return Q._renderSubtreeIntoContainer(null,t,e,n)},unmountComponentAtNode:function(t){l(t)?void 0:M("40");var e=d(t);if(!e){c(t),1===t.nodeType&&t.hasAttribute(S);return!1}return delete _[e._instance.rootID],z.batchedUpdates(s,e,t,!1),!0},_mountImageIntoNode:function(t,e,n,i,a){if(l(e)?void 0:M("41"),i){var u=r(e);if(w.canReuseMarkup(t,u))return void N.precacheNode(n,u);var s=u.getAttribute(w.CHECKSUM_ATTR_NAME);u.removeAttribute(w.CHECKSUM_ATTR_NAME);var c=u.outerHTML;u.setAttribute(w.CHECKSUM_ATTR_NAME,s);var p=t,d=o(p,c),g=" (client) "+p.substring(d-20,d+20)+"\n (server) "+c.substring(d-20,d+20);e.nodeType===O?M("42",g):void 0}if(e.nodeType===O?M("43"):void 0,a.useCreateElement){for(;e.lastChild;)e.removeChild(e.lastChild);f.insertTreeBefore(e,t,null)}else C(e,t),N.precacheNode(n,e.firstChild)}};t.exports=Q},function(t,e,n){"use strict";var o=n(4),r=n(21),i=(n(3),{HOST:0,COMPOSITE:1,EMPTY:2,getType:function(t){return null===t||t===!1?i.EMPTY:r.isValidElement(t)?"function"==typeof t.type?i.COMPOSITE:i.HOST:void o("26",t)}});t.exports=i},function(t,e){"use strict";var n={currentScrollLeft:0,currentScrollTop:0,refreshScrollValues:function(t){n.currentScrollLeft=t.x,n.currentScrollTop=t.y}};t.exports=n},function(t,e,n){"use strict";function o(t,e){return null==e?r("30"):void 0,null==t?e:Array.isArray(t)?Array.isArray(e)?(t.push.apply(t,e),t):(t.push(e),t):Array.isArray(e)?[t].concat(e):[t,e]}var r=n(4);n(3);t.exports=o},function(t,e){"use strict";function n(t,e,n){Array.isArray(t)?t.forEach(e,n):t&&e.call(n,t)}t.exports=n},function(t,e,n){"use strict";function o(t){for(var e;(e=t._renderedNodeType)===r.COMPOSITE;)t=t._renderedComponent;return e===r.HOST?t._renderedComponent:e===r.EMPTY?null:void 0}var r=n(123);t.exports=o},function(t,e,n){"use strict";function o(){return!i&&r.canUseDOM&&(i="textContent"in document.documentElement?"textContent":"innerText"),i}var r=n(10),i=null;t.exports=o},function(t,e,n){"use strict";function o(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n["ms"+t]="MS"+e,n["O"+t]="o"+e.toLowerCase(),n}function r(t){if(u[t])return u[t];if(!a[t])return t;var e=a[t];for(var n in e)if(e.hasOwnProperty(n)&&n in s)return u[t]=e[n];return""}var i=n(10),a={animationend:o("Animation","AnimationEnd"),animationiteration:o("Animation","AnimationIteration"),animationstart:o("Animation","AnimationStart"),transitionend:o("Transition","TransitionEnd")},u={},s={};i.canUseDOM&&(s=document.createElement("div").style,"AnimationEvent"in window||(delete a.animationend.animation,delete a.animationiteration.animation,delete a.animationstart.animation),"TransitionEvent"in window||delete a.transitionend.transition),t.exports=r},function(t,e,n){"use strict";function o(t){if(t){var e=t.getName();if(e)return" Check the render method of `"+e+"`."}return""}function r(t){return"function"==typeof t&&"undefined"!=typeof t.prototype&&"function"==typeof t.prototype.mountComponent&&"function"==typeof t.prototype.receiveComponent}function i(t,e){var n;if(null===t||t===!1)n=l.create(i);else if("object"===("undefined"==typeof t?"undefined":a(t))){var s=t,c=s.type;if("function"!=typeof c&&"string"!=typeof c){var M="";M+=o(s._owner),u("130",null==c?c:"undefined"==typeof c?"undefined":a(c),M)}"string"==typeof s.type?n=p.createInternalComponent(s):r(s.type)?(n=new s.type(s),n.getHostNode||(n.getHostNode=n.getNativeNode)):n=new d(s)}else"string"==typeof t||"number"==typeof t?n=p.createInstanceForText(t):u("131","undefined"==typeof t?"undefined":a(t));return n._mountIndex=0,n._mountImage=null,n}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=n(4),s=n(8),c=n(224),l=n(118),p=n(120),d=(n(270),n(3),n(5),function(t){this.construct(t)});s(d.prototype,c,{_instantiateReactComponent:i}),t.exports=i},function(t,e){"use strict";function n(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return"input"===e?!!o[t.type]:"textarea"===e}var o={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};t.exports=n},function(t,e,n){"use strict";var o=n(10),r=n(57),i=n(58),a=function(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&3===n.nodeType)return void(n.nodeValue=e)}t.textContent=e};o.canUseDOM&&("textContent"in document.documentElement||(a=function(t,e){return 3===t.nodeType?void(t.nodeValue=e):void i(t,r(e))})),t.exports=a},function(t,e,n){"use strict";function o(t,e){return t&&"object"===("undefined"==typeof t?"undefined":a(t))&&null!=t.key?l.escape(t.key):e.toString(36)}function r(t,e,n,i){var M="undefined"==typeof t?"undefined":a(t);if("undefined"!==M&&"boolean"!==M||(t=null),null===t||"string"===M||"number"===M||"object"===M&&t.$$typeof===s)return n(i,t,""===e?p+o(t,0):e),1;var f,g,h=0,y=""===e?p:e+d;if(Array.isArray(t))for(var N=0;N<t.length;N++)f=t[N],g=y+o(f,N),h+=r(f,g,n,i);else{var m=c(t);if(m){var D,I=m.call(t);if(m!==t.entries)for(var j=0;!(D=I.next()).done;)f=D.value,g=y+o(f,j++),h+=r(f,g,n,i);else for(;!(D=I.next()).done;){var w=D.value;w&&(f=w[1],g=y+l.escape(w[0])+d+o(f,0),h+=r(f,g,n,i))}}else if("object"===M){var L="",v=String(t);u("31","[object Object]"===v?"object with keys {"+Object.keys(t).join(", ")+"}":v,L)}}return h}function i(t,e,n){return null==t?0:r(t,"",e,n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=n(4),s=(n(22),n(238)),c=n(269),l=(n(3),n(72)),p=(n(5),"."),d=":";t.exports=i},function(t,e,n){"use strict";var o=n(20),r={listen:function(t,e,n){return t.addEventListener?(t.addEventListener(e,n,!1),{remove:function(){t.removeEventListener(e,n,!1)}}):t.attachEvent?(t.attachEvent("on"+e,n),{remove:function(){t.detachEvent("on"+e,n)}}):void 0},capture:function(t,e,n){return t.addEventListener?(t.addEventListener(e,n,!0),{remove:function(){t.removeEventListener(e,n,!0)}}):{remove:o}},registerDefault:function(){}};t.exports=r},88,function(t,e){"use strict";function n(t){try{t.focus()}catch(t){}}t.exports=n},function(t,e){"use strict";function n(){if("undefined"==typeof document)return null;try{return document.activeElement||document.body}catch(t){return document.body}}t.exports=n},72,function(t,e){"use strict";var n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;t.exports=n},function(t,e,n){"use strict";var o={};t.exports=o},function(t,e,n){"use strict";var o=!1;t.exports=o},function(t,e){"use strict";function n(t){var e=t&&(o&&t[o]||t[r]);if("function"==typeof e)return e}var o="function"==typeof Symbol&&Symbol.iterator,r="@@iterator";t.exports=n},function(t,e,n){"use strict";function o(t){return i.isValidElement(t)?void 0:r("143"),t}var r=n(39),i=n(38);n(31);t.exports=o},function(t,e,n){"use strict";function o(t,e){return t&&"object"===("undefined"==typeof t?"undefined":a(t))&&null!=t.key?l.escape(t.key):e.toString(36)}function r(t,e,n,i){var M="undefined"==typeof t?"undefined":a(t);if("undefined"!==M&&"boolean"!==M||(t=null),null===t||"string"===M||"number"===M||"object"===M&&t.$$typeof===s)return n(i,t,""===e?p+o(t,0):e),1;var f,g,h=0,y=""===e?p:e+d;if(Array.isArray(t))for(var N=0;N<t.length;N++)f=t[N],g=y+o(f,N),h+=r(f,g,n,i);else{var m=c(t);if(m){var D,I=m.call(t);if(m!==t.entries)for(var j=0;!(D=I.next()).done;)f=D.value,g=y+o(f,j++),h+=r(f,g,n,i);else for(;!(D=I.next()).done;){var w=D.value;w&&(f=w[1],g=y+l.escape(w[0])+d+o(f,0),h+=r(f,g,n,i))}}else if("object"===M){var L="",v=String(t);u("31","[object Object]"===v?"object with keys {"+Object.keys(t).join(", ")+"}":v,L)}}return h}function i(t,e,n){return null==t?0:r(t,"",e,n)}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=n(39),s=(n(22),n(139)),c=n(142),l=(n(31),n(138)),p=(n(23),"."),d=":";t.exports=i},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t,e){if(m[e])return a(t,e,m[e].url,m[e].displayName,!0);var n=g.ui.avatarProvider((0,s.read)(s.getEntity,"lock",t)).toJS();(0,s.swap)(s.updateEntity,"lock",t,function(t){return t=N(t,"syncStatus","loading"),t=N(t,"src",e)});var o=void 0,r=void 0;n.url(e,function(n,a){return n?u(t,e):void p.img(a,function(n,a){return n?u(t,e):(o=a.src,void(void 0!==r&&i(t,e,o,r)))})}),n.displayName(e,function(n,a){return n?u(t):(r=a,void(void 0!==o&&i(t,e,o,r)))})}function i(t,e,n,o){m[e]={url:n,displayName:o},a(t,e,n,o)}function a(t,e,n,o){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4];(0,s.swap)(s.updateEntity,"lock",t,function(t){return(r||y(t,"src")===e)&&(t=N(t,"syncStatus","ok"),t=N(t,"url",n),t=N(t,"src",e),t=N(t,"displayName",o)),t})}function u(t,e){(0,s.swap)(s.updateEntity,"lock",t,function(t){return"src"===y(t,"src")?N(t,"syncStatus","error"):t})}e.__esModule=!0,e.debouncedRequestAvatar=void 0,e.requestAvatar=r;var s=n(12),c=n(18),l=n(160),p=o(l),d=n(352),M=o(d),f=n(2),g=o(f),h=(0,c.dataFns)(["avatar"]),y=h.tget,N=h.tset,m={};e.debouncedRequestAvatar=M.debounce(r,300)},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=n(1),c=r(s),l=n(41),p=n(2),d=o(p),M=n(11),f=n(26),g=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.render=function(){var t=this.props,e=t.lock,n=t.loginLabel,o=t.signUpLink,r=t.signUpLabel,i="login"===(0,M.getScreen)(e);return c.default.createElement("div",{className:"auth0-lock-tabs-container"},c.default.createElement("ul",{className:"auth0-lock-tabs"},c.default.createElement(h,{label:n,current:i,clickHandler:this.handleLoginClick.bind(this)}),c.default.createElement(h,{label:r,current:!i,clickHandler:this.handleSignUpClick.bind(this),clickWithHrefHandler:this.handleSignUpWithHrefClick.bind(this),href:o})))},e.prototype.handleLoginClick=function(){(0,l.showLoginActivity)(d.id(this.props.lock))},e.prototype.handleSignUpClick=function(){this.props.signUpLink&&(0,f.closeLock)(d.id(this.props.lock),!0),(0,l.showSignUpActivity)(d.id(this.props.lock))},e.prototype.handleSignUpWithHrefClick=function(){(0,f.closeLock)(d.id(this.props.lock),!0)},e}(c.default.Component);e.default=g,g.propTypes={lock:c.default.PropTypes.object.isRequired,loginLabel:c.default.PropTypes.string.isRequired,signUpLabel:c.default.PropTypes.string.isRequired,signUpLink:c.default.PropTypes.string};var h=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.handleClick=function(t){this.props.href?this.props.clickWithHrefHandler():(t.preventDefault(),this.props.clickHandler())},e.prototype.render=function(){var t=this.props,e=t.current,n=t.href,o=t.label,r=e?"auth0-lock-tabs-current":"";return c.default.createElement("li",{className:r},c.default.createElement("a",{href:n||"#",onClick:this.handleClick.bind(this)},o))},e}(c.default.Component)},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(1),i=o(r),a=n(98);e.default=function(t){var e=t.children;return i.default.createElement("div",{className:"auth0-sso-notice-container"},i.default.createElement("span",{dangerouslySetInnerHTML:{__html:a.icon}})," "," ",i.default.createElement("span",{className:"auth0-sso-notice"},e))}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){return["free","dev"].indexOf(w(t,["tenant","subscription"]))>-1}function i(t,e,n){var o=a(t,e).get("connections",(0,h.List)());return o.find(u(n))||(0,h.Map)()}function a(t,e){return t.getIn(["client","strategies"],(0,h.List)()).find(u(e))||(0,h.Map)()}function u(t){return function(e){return e.get("name")===t}}function s(t){return"auth0"===t?"database":"email"===t||"sms"===t?"passwordless":m.STRATEGIES[t]?"social":D.STRATEGIES[t]?"enterprise":["oauth1","oauth2"].indexOf(t)!==-1?"social":"unknown"}function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==t.username)return null;var e=g({},L,t),n=L.username.min,o=L.username.max;return e.username.min=parseInt(e.username.min,10)||n,e.username.max=parseInt(e.username.max,10)||o,e.username.min>e.username.max&&(e.username.min=n,e.username.max=o),e}function l(t,e){return j(t,p(e))}function p(t){return new y.default.fromJS({id:t.id,tenant:{name:t.tenant,subscription:t.subscription},connections:d(t)})}function d(t){for(var e=v.toJS(),n=function(){var n,r=t.strategies[o],i=s(r.name);if("passwordless"===i)return"continue";var a=r.connections.map(function(t){return M(i,r.name,t)});(n=e[i]).push.apply(n,a)},o=0;o<(t.strategies||[]).length;o++){n()}return e}function M(t,e,n){var o={name:n.name,strategy:e,type:t};if("database"===t&&(o.passwordPolicy=n.passwordPolicy||"none",o.allowSignup="boolean"!=typeof n.showSignup||n.showSignup,o.allowForgot="boolean"!=typeof n.showForgot||n.showForgot,o.requireUsername="boolean"==typeof n.requires_username&&n.requires_username,o.validation=c(n.validation)),"enterprise"===t){var r=n.domain_aliases||[];n.domain&&r.unshift(n.domain),o.domains=r}return o}function f(t){return w(t,"connections",v)}e.__esModule=!0;var g=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};e.hasFreeSubscription=r,e.connection=i,e.initClient=l,e.clientConnections=f;var h=n(9),y=o(h),N=n(18),m=n(42),D=n(25),I=(0,N.dataFns)(["client"]),j=I.initNS,w=I.get,L={username:{min:1,max:15}},v=y.default.fromJS({database:[],enterprise:[],passwordless:[],social:[],unknown:[]})},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var r=n(1),i=o(r),a=function(){return i.default.createElement("div",{className:"auth0-lock-pane-separator"})};e.default=a},function(t,e,n){"use strict";function o(t){return t.getIn(["sso","lastUsedConnection"])}function r(t){return t.getIn(["sso","lastUsedUsername"],"")}e.__esModule=!0,e.lastUsedConnection=o,e.lastUsedUsername=r;n(9)},function(t,e){"use strict";function n(t){if(!t)return t;if("User closed the popup window"===t.status)return{code:"lock.popup_closed",error:"lock.popup_closed",description:"Popup window closed."};if("unauthorized"===t.code)return t.description&&"access_denied"!==t.description?"user is blocked"===t.description?{code:"blocked_user",error:"blocked_user",description:t.description}:{code:"rule_error",error:"rule_error",description:t.description}:{code:"lock.unauthorized",error:"lock.unauthorized",description:t.description||"Permissions were not granted."};var e={error:t.code?t.code:t.statusCode||t.error,description:t.description||t.code};return void 0===e.error&&void 0===e.description?t:e}function o(t,e){return t?function(t){return e(n(t))}:function(t,o){return e(n(t),o)}}e.__esModule=!0,e.normalizeError=n,e.loginCallback=o},function(t,e,n){"use strict";function o(t,e,n,o){for(var r=arguments.length,i=Array(r>4?r-4:0),a=4;a<r;a++)i[a-4]=arguments[a];u.swap.apply(void 0,[u.updateEntity,"lock",t,s.setField,e,n,o].concat(i))}function r(t,e,n,o){(0,u.swap)(u.updateEntity,"lock",t,function(t){return t.setIn(["field","selecting","name"],e).setIn(["field","selecting","iconUrl"],n).setIn(["field","selecting","icon"],o)})}function i(t,e,n){(0,u.swap)(u.updateEntity,"lock",t,function(t){return(0,s.setOptionField)(t.deleteIn(["field","selecting"]),e,n)})}function a(t){(0,u.swap)(u.updateEntity,"lock",t,function(t){return t.deleteIn(["field","selecting"])})}e.__esModule=!0,e.changeField=o,e.startOptionSelection=r,e.selectOption=i,e.cancelOptionSelection=a;var u=(n(9),n(12)),s=n(7)},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var s=n(1),c=r(s),l=n(157),p=r(l),d=n(2),M=o(d),f=n(61),g=n(42),h=function(t){function e(){return i(this,e),a(this,t.apply(this,arguments))}return u(e,t),e.prototype.render=function(){var t=this.props,e=t.bigButtons,n=t.instructions,o=t.labelFn,r=t.lock,i=t.showLoading,a=t.signUp,u=n||null,s=u&&c.default.createElement("p",null,u),l=(0,g.authButtonsTheme)(r),d=(0,g.socialConnections)(r).map(function(t){var n=l.get(t.get("name")),i=n&&n.get("displayName"),u=n&&n.get("primaryColor"),s=n&&n.get("foregroundColor"),d=n&&n.get("icon");return c.default.createElement(p.default,{isBig:e,key:t.get("name"),label:o(a?"signUpWithLabel":"loginWithLabel",i||(0,g.displayName)(t)),onClick:function(){return(0,f.logIn)(M.id(r),t)},strategy:t.get("strategy"),primaryColor:u,foregroundColor:s,icon:d})}),h=i&&c.default.createElement("div",{className:"auth0-loading-container"},c.default.createElement("div",{className:"auth0-loading"}));return c.default.createElement("div",{className:"auth-lock-social-buttons-pane"},s,c.default.createElement("div",{className:"auth0-lock-social-buttons-container"},d),h)},e}(c.default.Component);e.default=h,h.propTypes={bigButtons:c.default.PropTypes.bool.isRequired,instructions:c.default.PropTypes.any,labelFn:c.default.PropTypes.func.isRequired,lock:c.default.PropTypes.object.isRequired,showLoading:c.default.PropTypes.bool.isRequired,signUp:c.default.PropTypes.bool.isRequired},h.defaultProps={showLoading:!1}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(){var t="auth0-lock-style",e=document.getElementById(t);if(!e){var n=document.getElementsByTagName("head")[0];e=document.createElement("style"),e.type="text/css",e.setAttribute("id",t),n.appendChild(e)}e.styleSheet?e.styleSheet.cssText=d:e.innerHTML=d}e.__esModule=!0;var s=n(318),c=o(s),l=n(92),p=o(l),d='/* normalize.css v3.0.2 | MIT License | git.io/normalize */ .auth0-lock html {   font-family: sans-serif; /* 1 */   -ms-text-size-adjust: 100%; /* 2 */   -webkit-text-size-adjust: 100%; /* 2 */ } .auth0-lock body {   margin: 0; } .auth0-lock article, .auth0-lock aside, .auth0-lock details, .auth0-lock figcaption, .auth0-lock figure, .auth0-lock footer, .auth0-lock header, .auth0-lock hgroup, .auth0-lock main, .auth0-lock menu, .auth0-lock nav, .auth0-lock section, .auth0-lock summary {   display: block; } .auth0-lock audio, .auth0-lock canvas, .auth0-lock progress, .auth0-lock video {   display: inline-block; /* 1 */   vertical-align: baseline; /* 2 */ } .auth0-lock audio:not([controls]) {   display: none;   height: 0; } .auth0-lock [hidden], .auth0-lock template {   display: none; } .auth0-lock a {   background-color: transparent; } .auth0-lock a:active, .auth0-lock a:hover {   outline: 0; } .auth0-lock abbr[title] {   border-bottom: 1px dotted; } .auth0-lock b, .auth0-lock strong {   font-weight: bold; } .auth0-lock dfn {   font-style: italic; } .auth0-lock h1 {   font-size: 2em;   margin: 0.67em 0; } .auth0-lock mark {   background: #ff0;   color: #000; } .auth0-lock small {   font-size: 80%; } .auth0-lock sub, .auth0-lock sup {   font-size: 75%;   line-height: 0;   position: relative;   vertical-align: baseline; } .auth0-lock sup {   top: -0.5em; } .auth0-lock sub {   bottom: -0.25em; } .auth0-lock img {   border: 0; } .auth0-lock svg:not(:root) {   overflow: hidden; } .auth0-lock figure {   margin: 1em 40px; } .auth0-lock hr {   box-sizing: content-box;   height: 0; } .auth0-lock pre {   overflow: auto; } .auth0-lock code, .auth0-lock kbd, .auth0-lock pre, .auth0-lock samp {   font-family: monospace, monospace;   font-size: 1em; } .auth0-lock button, .auth0-lock input, .auth0-lock optgroup, .auth0-lock select, .auth0-lock textarea {   color: inherit; /* 1 */   font: inherit; /* 2 */   margin: 0; /* 3 */ } .auth0-lock button {   overflow: visible; } .auth0-lock button, .auth0-lock select {   text-transform: none; } .auth0-lock button, .auth0-lock html input[type="button"], .auth0-lock input[type="reset"], .auth0-lock input[type="submit"] {   -webkit-appearance: button; /* 2 */   cursor: pointer; /* 3 */ } .auth0-lock button[disabled], .auth0-lock html input[disabled] {   cursor: default; } .auth0-lock button::-moz-focus-inner, .auth0-lock input::-moz-focus-inner {   border: 0;   padding: 0; } .auth0-lock input {   line-height: normal; } .auth0-lock input[type="checkbox"], .auth0-lock input[type="radio"] {   box-sizing: border-box; /* 1 */   padding: 0; /* 2 */ } .auth0-lock input[type="number"]::-webkit-inner-spin-button, .auth0-lock input[type="number"]::-webkit-outer-spin-button {   height: auto; } .auth0-lock input[type="search"] {   -webkit-appearance: textfield; /* 1 */ /* 2 */   box-sizing: content-box; } .auth0-lock input[type="search"]::-webkit-search-cancel-button, .auth0-lock input[type="search"]::-webkit-search-decoration {   -webkit-appearance: none; } .auth0-lock fieldset {   border: 1px solid #c0c0c0;   margin: 0 2px;   padding: 0.35em 0.625em 0.75em; } .auth0-lock legend {   border: 0; /* 1 */   padding: 0; /* 2 */ } .auth0-lock textarea {   overflow: auto; } .auth0-lock optgroup {   font-weight: bold; } .auth0-lock table {   border-collapse: collapse;   border-spacing: 0; } .auth0-lock td, .auth0-lock th {   padding: 0; } .auth0-lock-social-button-icon {   background-repeat: no-repeat;   background-size: 50%;   background-position: center center; } .auth0-lock-social-button[data-provider="amazon"] {   background-color: #f90; } .auth0-lock-social-button[data-provider="aol"] {   background-color: #ff0b00; } .auth0-lock-social-button[data-provider="baidu"] {   background-color: #2529d8; } .auth0-lock-social-button[data-provider="bitbucket"] {   background-color: #205081; } .auth0-lock-social-button[data-provider="dropbox"] {   background-color: #007ee5; } .auth0-lock-social-button[data-provider="ebay"] {   background-color: #0064d2; } .auth0-lock-social-button[data-provider="facebook"] {   background-color: #3b5998; } .auth0-lock-social-button[data-provider^="google"] {   background-color: #4285f4; } .auth0-lock-social-button[data-provider="instagram"] {   background-color: #3f729b; } .auth0-lock-social-button[data-provider="linkedin"] {   background-color: #0077b5; } .auth0-lock-social-button[data-provider="github"] {   background-color: #333; } .auth0-lock-social-button[data-provider="oauth2"] {   background-color: #eb5424; } .auth0-lock-social-button[data-provider="paypal"] {   background-color: #009cde; } .auth0-lock-social-button[data-provider^="salesforce"] {   background-color: #1798c1; } .auth0-lock-social-button[data-provider="shopify"] {   background-color: #96bf48; } .auth0-lock-social-button[data-provider="soundcloud"] {   background-color: #f80; } .auth0-lock-social-button[data-provider="renren"] {   background-color: #0056b5; } .auth0-lock-social-button[data-provider="exact"] {   background-color: #ed1c24; } .auth0-lock-social-button[data-provider="twitter"] {   background-color: #55acee; } .auth0-lock-social-button[data-provider=""] {   background-color: #c7eaff; } .auth0-lock-social-button[data-provider="yandex"] {   background-color: #fc0; } .auth0-lock-social-button[data-provider^="thecity"] {   background-color: #767571; } .auth0-lock-social-button[data-provider="planningcenter"] {   background-color: #4e4e4e; } .auth0-lock-social-button[data-provider="thirtysevensignals"] {   background-color: #6ac071; } .auth0-lock-social-button[data-provider="fitbit"] {   background-color: #4cc2c4; } .auth0-lock-social-button[data-provider="wordpress"] {   background-color: #21759b; } .auth0-lock-social-button[data-provider="yahoo"] {   background-color: #410093; } .auth0-lock-social-button[data-provider="box"] {   background-color: #267bb6; } .auth0-lock-social-button[data-provider="vkontakte"] {   background-color: #45668e; } .auth0-lock-social-button[data-provider="dwolla"] {   background-color: #f5891f; } .auth0-lock-social-button[data-provider="miicard"] {   background-color: #3fb7ff; } .auth0-lock-social-button[data-provider="yammer"] {   background-color: #0072c6; } .auth0-lock-social-button[data-provider="weibo"] {   background-color: #dd4b39; } .auth0-lock-social-button[data-provider^="windows"], .auth0-lock-social-button[data-provider^="microsoft"] {   background-color: #00a1f1; } .auth0-lock-social-button[data-provider^=amazon] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjcycHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDcyIDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+YW1hem9uPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImFtYXpvbiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjA2Myw1MC4zMTMgQzEsNTAuNDM4IDAuOTM4LDUwLjU2MyAwLjkzOCw1MC42ODggQzAuOTM4LDUwLjg3NiAxLjA2Myw1MS4xMjYgMS4zMTMsNTEuMzEzIEM2LjAwMSw1NS41NjMgMTEuMzEzLDU4LjgxMyAxNy4yNTEsNjEuMTI2IEMyMy4xODksNjMuNDM5IDI5LjUwMSw2NC42MjYgMzYuMTI2LDY0LjYyNiBDNDAuNDM5LDY0LjYyNiA0NC44NzYsNjQuMDAxIDQ5LjM3Niw2Mi44MTMgQzUzLjkzOSw2MS42MjUgNTguMDAxLDU5LjkzOCA2MS42ODksNTcuNzUgQzYyLjg3Nyw1Ny4wNjIgNjMuODc3LDU2LjQzNyA2NC42MjcsNTUuODc1IEM2NS4xOSw1NS40MzcgNjUuMzE1LDU0LjkzNyA2NC45NCw1NC40MzcgQzY0LjYyNyw1My45MzcgNjQuMTI3LDUzLjgxMiA2My40NCw1NC4wNjIgQzYzLjMxNSw1NC4xMjUgNjMuMDAyLDU0LjI1IDYyLjYyNyw1NC40MzcgQzYyLjE4OSw1NC42MjUgNjEuODc3LDU0Ljc1IDYxLjY4OSw1NC44MTIgQzUzLjUwMSw1Ny45MzcgNDUuMjUxLDU5LjUgMzYuODc2LDU5LjUgQzI0LjM3Niw1OS41IDEyLjc1MSw1Ni40MzcgMi4wNjMsNTAuMjUgQzEuNjI1LDQ5LjkzNyAxLjI1LDQ5LjkzNyAxLjA2Myw1MC4zMTMgTDEuMDYzLDUwLjMxMyBaIE0yMC4zMTMsMzIuMDYzIEMyMC4zMTMsMzUuNzUxIDIxLjM3NiwzOC42MjYgMjMuNTAxLDQwLjYyNiBDMjUuNjI2LDQyLjY4OSAyOC4zMTQsNDMuNjg5IDMxLjU2NCw0My42ODkgQzMzLjc1Miw0My42ODkgMzUuNTAyLDQzLjUwMSAzNi45MzksNDMuMDY0IEMzOS4yNTIsNDIuNDM5IDQxLjYyNyw0MC44MTQgNDQuMDAyLDM4LjE4OSBDNDQuMTksMzguMzc3IDQ0LjUwMiwzOC44MTQgNDQuODc3LDM5LjQzOSBDNDUuMzE1LDQwLjA2NCA0NS42MjcsNDAuNTAyIDQ1LjgxNSw0MC42ODkgTDQ2LjgxNSw0MS42ODkgQzQ3LjI1Myw0Mi4xODkgNDcuNzUzLDQyLjY4OSA0OC4zNzgsNDMuMTg5IEM0OS4wNjYsNDMuNTAyIDQ5LjY5MSw0My40MzkgNTAuMTkxLDQzLjA2NCBDNTAuNTA0LDQyLjgxNCA1Mi40NDEsNDEuMTI2IDU2LjAwNCwzOC4wNjQgQzU2LjMxNywzNy44MTQgNTYuNTA0LDM3LjUwMSA1Ni41MDQsMzcuMTg5IEM1Ni41MDQsMzYuODc3IDU2LjM3OSwzNi41MDEgNTYuMTI5LDM2LjEyNiBDNTUuNDQxLDM1LjI1MSA1NC45NDEsMzQuNjI2IDU0LjYyOSwzNC4xODggQzU0LjMxNiwzMy44MTMgNTQuMDA0LDMzLjEyNSA1My42OTEsMzIuMTg4IEM1My4zNzgsMzEuMzEzIDUzLjI1MywzMC4yNSA1My4yNTMsMjkuMTg4IEw1My4yNTMsMTMuNjg4IEM1My4yNTMsMTMuNSA1My4xOSwxMi45MzggNTMuMTksMTIuMDYzIEM1My4xMjcsMTEuMTI1IDUzLjA2NSwxMC41IDUyLjk0LDEwLjI1IEw1Mi41NjUsOC43NSBDNTIuNDQsOCA1Mi4yNTIsNy40MzcgNTIuMDAyLDcuMDYyIEM1MS44MTQsNi42ODcgNTEuNTAyLDYuMjQ5IDUxLjEyNyw1Ljc0OSBDNTAuODE0LDUuMzExIDUwLjM3Nyw0LjgxMSA0OS45MzksNC4zNzQgQzQ3LjI1MSwxLjg3NCA0My40MzksMC42MjQgMzguNTY0LDAuNjI0IEwzNi45MzksMC42MjQgQzMzLjE4OSwwLjgxMiAyOS44NzYsMS44NzQgMjcuMDAxLDMuNjg3IEMyNC4xODgsNS41IDIyLjM3Niw4LjMxMiAyMS42ODgsMTIuMTI1IEMyMS42MjUsMTIuMzEzIDIxLjYyNSwxMi40MzggMjEuNjI1LDEyLjU2MyBDMjEuNjI1LDEzLjE4OCAyMiwxMy41NjMgMjIuNjg4LDEzLjc1MSBMMzAuMDYzLDE0LjYyNiBDMzAuNzUxLDE0LjUwMSAzMS4xODgsMTQuMDAxIDMxLjMxMywxMy4xODggQzMxLjYyNiwxMS44MTMgMzIuMzEzLDEwLjc1IDMzLjMxMyw5LjkzOCBDMzQuMzc2LDkuMTg4IDM1LjU2Myw4Ljc1IDM2LjkzOCw4LjYyNSBMMzcuNTAxLDguNjI1IEMzOS4zNzYsOC42MjUgNDAuODE0LDkuMjUgNDEuNjg5LDEwLjU2MyBDNDIuMzE0LDExLjUwMSA0Mi42MjcsMTMuMzEzIDQyLjYyNywxNi4wNjMgTDQyLjYyNywxNy4xMjYgQzQwLjAwMiwxNy4zNzYgMzguMTI3LDE3LjUwMSAzNi45MzksMTcuNjI2IEMzMy42MjYsMTguMDY0IDMwLjc1MSwxOC43NTEgMjguNDM5LDE5Ljc1MSBDMjUuOTM5LDIwLjgxNCAyMy45MzksMjIuMzc2IDIyLjUwMSwyNC41MDEgQzIxLjA2MywyNi41NjQgMjAuMzEzLDI5LjEyNiAyMC4zMTMsMzIuMDY0IEwyMC4zMTMsMzIuMDYzIFogTTMxLjMxMywzMC43NSBDMzEuMzEzLDI3LjEyNSAzMy4xODgsMjQuNzUgMzYuOTM4LDIzLjY4NyBDMzguMjUxLDIzLjMxMiA0MC4xMjYsMjMuMTI0IDQyLjYyNiwyMy4xMjQgTDQyLjYyNiwyNC43NDkgQzQyLjYyNiwyNi4xMjQgNDIuNTYzLDI3LjEyNCA0Mi41NjMsMjcuNjg3IEM0Mi41NjMsMjguMzEyIDQyLjQzOCwyOS4wNjIgNDIuMTg4LDMwIEM0MS45MzgsMzEgNDEuNjI1LDMxLjg3NSA0MS4xMjUsMzIuNjg4IEM0MC4xMjUsMzQuNTAxIDM4Ljc1LDM1LjY4OCAzNi45MzcsMzYuMTI2IEMzNi44NzQsMzYuMTI2IDM2Ljc0OSwzNi4xODkgMzYuNDk5LDM2LjE4OSBDMzYuMjQ5LDM2LjI1MiAzNi4wNjEsMzYuMjUyIDM1LjkzNiwzNi4yNTIgQzM0LjU2MSwzNi4yNTIgMzMuNDM2LDM1Ljc1MiAzMi41NjEsMzQuNzUyIEMzMS43NDgsMzMuNzUyIDMxLjMxMSwzMi40MzkgMzEuMzExLDMwLjc1MiBMMzEuMzEzLDMwLjc1IFogTTU4LjE4OCw1MS4zNzUgQzU4LjE4OCw1MS40MzggNTguMTI1LDUxLjUgNTguMTI1LDUxLjU2MyBDNTguMTI1LDUxLjYyNiA1OC4xMjUsNTEuNzUxIDU4LjE4OCw1MS44MTMgQzU4LjMxMyw1MS44NzYgNTguNTAxLDUxLjkzOCA1OC43NTEsNTEuOTM4IEM1OS42MjYsNTEuODEzIDYwLjYyNiw1MS42ODggNjEuNjg5LDUxLjU2MyBDNjIuNjI3LDUxLjUgNjMuNTAyLDUxLjQzOCA2NC4yNTIsNTEuNDM4IEM2Ni4xOSw1MS40MzggNjcuMzc3LDUxLjY4OCA2Ny44MTUsNTIuMTg4IEM2OC4wMDMsNTIuNDM4IDY4LjA2NSw1Mi43NTEgNjguMDY1LDUzLjI1MSBDNjguMDY1LDU0LjY4OSA2Ny4zMTUsNTcuMjUxIDY1LjY5LDYxLjAwMSBDNjUuNTY1LDYxLjMxNCA2NS42MjcsNjEuNTY0IDY1Ljg3OCw2MS42ODkgQzY2LjAwMyw2MS43NTIgNjYuMDY2LDYxLjc1MiA2Ni4xMjgsNjEuNzUyIEM2Ni4zMTYsNjEuNzUyIDY2LjUwMyw2MS42MjcgNjYuNzUzLDYxLjUwMiBDNjguMTkxLDYwLjI1MiA2OS4zMTYsNTguNjI3IDcwLjEyOCw1Ni41NjQgQzcwLjk0MSw1NC41NjQgNzEuMzE2LDUyLjgxNCA3MS4zMTYsNTEuMzE0IEw3MS4zMTYsNTAuODc2IEM3MS4zMTYsNTAuMzc2IDcxLjI1Myw0OS45MzggNzEuMDY2LDQ5LjY4OCBDNzAuNjkxLDQ5LjI1IDY5LjU2Niw0OC45MzggNjcuNjI4LDQ4Ljc1IEM2Ny4yNTMsNDguNjg3IDY2LjgxNSw0OC42MjUgNjYuNDQsNDguNjg3IEM2NC44NzcsNDguNzUgNjMuMzE1LDQ4LjkzNyA2MS42OSw0OS4zNzUgQzYwLjY5LDQ5LjYyNSA1OS42OSw1MC4xMjUgNTguNjI3LDUwLjg3NSBDNTguNDM5LDUxIDU4LjMxNCw1MS4xODggNTguMTg5LDUxLjM3NSBMNTguMTg4LDUxLjM3NSBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="); } .auth0-lock-social-button[data-provider^=aol] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjkxcHgiIGhlaWdodD0iMzZweCIgdmlld0JveD0iMCAwIDkxIDM2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+YW9sPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImFvbCIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00OS45MzgsNy43NSBDNTguMDAxLDcuNzUgNjQuMDYzLDE0IDY0LjA2MywyMS43NSBDNjQuMDYzLDI5Ljg3NSA1Ny43NSwzNS42ODggNDkuOTM4LDM1LjY4OCBDNDIuMTg4LDM1LjY4OCAzNS44NzUsMjkuODc1IDM1Ljg3NSwyMS43NSBDMzUuODc1LDE0IDQxLjkzOCw3Ljc1IDQ5LjkzOCw3Ljc1IEw0OS45MzgsNy43NSBaIE00OS45MzgsMTUuMTg4IEM0Ni41LDE1LjE4OCA0My42MjUsMTguMDYzIDQzLjYyNSwyMS43NTEgQzQzLjYyNSwyNS4zNzYgNDYuNSwyOC4zMTQgNDkuOTM4LDI4LjMxNCBDNTMuNDM4LDI4LjMxNCA1Ni4yNTEsMjUuMzc2IDU2LjI1MSwyMS43NTEgQzU2LjI1MSwxOC4wNjMgNTMuNDM4LDE1LjEyNiA0OS45MzgsMTUuMTg4IEw0OS45MzgsMTUuMTg4IFogTTkwLjEyNSwzMC44MTMgQzkwLjEyNSwyOC4xMjUgODcuOTM3LDI1LjkzOCA4NS4yNSwyNS45MzggQzgyLjU2MywyNS45MzggODAuMzc1LDI4LjEyNiA4MC4zNzUsMzAuODEzIEM4MC4zNzUsMzMuNSA4Mi41NjMsMzUuNjg4IDg1LjI1LDM1LjY4OCBDODcuOTM3LDM1LjY4OCA5MC4xMjUsMzMuNSA5MC4xMjUsMzAuODEzIEw5MC4xMjUsMzAuODEzIFogTTc1LjkzOCwzNC44MTMgTDc1LjkzOCwwLjEyNSBMNjguMjUsMC4xMjUgTDY4LjI1LDM0LjgxMyBMNzUuOTM4LDM0LjgxMyBMNzUuOTM4LDM0LjgxMyBaIE0wLjY4OCwzNC44MTMgTDEwLjUwMSwzNC44MTMgTDEyLjEyNiwyOS44NzUgTDI0LjI1MSwyOS44NzUgTDI1Ljg3NiwzNC44MTMgTDM1LjYyNiwzNC44MTMgTDIxLjg3NiwwLjEyNSBMMTQuNjg4LDAuMTI1IEwwLjY4OCwzNC44MTMgWiBNMjEuODc1LDIyLjY4OCBMMTguMzEyLDExLjA2MyBMMTQuNjg3LDIyLjY4OCBMMjEuODc1LDIyLjY4OCBMMjEuODc1LDIyLjY4OCBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="); } .auth0-lock-social-button[data-provider^=baidu] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjU5cHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDU5IDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+YmFpZHU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iYmFpZHUiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMC4xMjUsMjQgQzAuMDYyLDI0LjQzOCAwLDI0Ljg3NSAwLDI1LjMxMyBDMCwyNS45MzggMC4wNjMsMjYuNjI2IDAuMjUsMjcuMzc2IEMwLjUsMjguNjI2IDAuOTM4LDI5Ljg3NiAxLjYyNSwzMS4wNjQgQzIuMjUsMzIuMjUyIDMuMTg4LDMzLjE4OSA0LjUsMzMuODE0IEM1LjMxMywzNC4yNTIgNi4yNSwzNC41MDIgNy4yNSwzNC41MDIgQzcuODEzLDM0LjUwMiA4LjMxMywzNC40MzkgOC44NzUsMzQuMzE0IEMxMC41LDMzLjkzOSAxMS43NSwzMy4yNTEgMTIuNjg4LDMyLjE4OSBDMTMuNjg4LDMxLjE4OSAxNC4yNTEsMjkuOTM5IDE0LjUwMSwyOC41MDEgQzE0Ljc1MSwyNy4xMjYgMTQuODc2LDI2LjAwMSAxNC44NzYsMjUuMTI2IEwxNC44NzYsMjQuNzUxIEMxNC44NzYsMjQuMDAxIDE0LjgxMywyMy4zMTMgMTQuNjI2LDIyLjYyNiBDMTQuNTAxLDIxLjAwMSAxMy42MjYsMTkuMzc2IDEyLjA2MywxNy42MjYgQzEwLjU2MywxNi4xMjYgOC45MzgsMTUuMzEzIDcuMTI1LDE1LjMxMyBMNi41NjIsMTUuMzEzIEw1Ljk5OSwxNS40MzggQzUuNjI0LDE1LjUwMSA1LjEyNCwxNS42ODggNC41NjEsMTYuMDYzIEMzLjkzNiwxNi4zNzYgMy4zNzMsMTYuODEzIDIuNzQ4LDE3LjM3NiBDMi4xMjMsMTcuOTM5IDEuNjIzLDE4LjgxNCAxLjEyMywxOS45MzkgQzAuNjIzLDIxLjEyNyAwLjMxLDIyLjQzOSAwLjEyMywyNC4wMDIgTDAuMTI1LDI0IFogTTQuMjUsNTUuMTI1IEw0LjkzOCw1Ny4zMTMgQzUuMzc2LDU4Ljc1MSA2LjM3Niw2MC4yNTEgNy44NzYsNjEuNjg4IEM5LjMxNCw2My4wNjMgMTEuMDAxLDYzLjgxMyAxMy4wMDEsNjMuODEzIEwxMy4xODksNjMuODEzIEMxMy44NzcsNjMuOTM4IDE0LjYyNyw2NC4wMDEgMTUuNTAyLDYzLjkzOCBDMTYuMzE1LDYzLjkzOCAxNy4yNTIsNjMuODc1IDE4LjMxNSw2My44MTMgQzIwLjM3OCw2My41NjMgMjEuNzUzLDYzLjM3NSAyMi41MDMsNjMuMjUgQzIzLjI1Myw2My4xMjUgMjMuODE2LDYzLjA2MiAyNC4yNTMsNjIuOTM3IEwyNS44NzgsNjIuNjg3IEMyNi44MTYsNjIuNDk5IDI3Ljk0MSw2Mi40MzcgMjkuMzc4LDYyLjQzNyBMMzAuMjUzLDYyLjQzNyBDMzIuMTI4LDYyLjUgMzMuODE2LDYyLjc1IDM1LjMxNiw2My4yNSBDMzcuOTQxLDY0LjEyNSA0MC4zMTYsNjQuNTYzIDQyLjUwNCw2NC41NjMgQzQ0LjY5Miw2NC41NjMgNDYuMzc5LDY0LjMxMyA0Ny41NjcsNjMuODEzIEM0OC43NTUsNjMuMzEzIDQ5LjgxNyw2Mi42ODggNTAuNzU1LDYxLjgxMyBDNTEuNjkzLDYwLjkzOCA1Mi4yNTUsNjAuMzEzIDUyLjUwNSw1OS45MzggQzUyLjc1NSw1OS41NjMgNTIuOTQzLDU5LjI1IDUzLjAwNSw1OSBMNTMuMzgsNTggQzUzLjU2OCw1Ny4zNzUgNTMuODE4LDU2LjU2MiA1My45NDMsNTUuNSBDNTQuMTMxLDU0LjQzNyA1NC4xOTMsNTMuMzc1IDU0LjE5Myw1Mi4xODcgQzU0LjE5Myw1MC45OTkgNTMuOTQzLDQ5LjgxMiA1My4zOCw0OC40OTkgQzUyLjc1NSw0Ny4yNDkgNTEuOTQyLDQ2LjE4NiA1MC44MTcsNDUuMzc0IEM0OC41MDQsNDMuNDk5IDQ2LjE5Miw0MS40OTkgNDQuMDY3LDM5LjI0OSBDNDEuODc5LDM2Ljk5OSA0MC40NDIsMzUuNDM2IDM5Ljc1NCwzNC42MjQgQzM5LjEyOSwzMy44MTEgMzguNjI5LDMzLjEyNCAzOC4yNTQsMzIuNjI0IEMzNi43NTQsMzAuMzExIDM1LjA2NiwyOC42ODYgMzMuMTkxLDI3LjY4NiBDMzEuNzUzLDI2LjkzNiAzMC4zMTYsMjYuNTYxIDI5LjAwMywyNi41NjEgQzI4LjYyOCwyNi41NjEgMjguMzE1LDI2LjU2MSAyNy44NzgsMjYuNjI0IEMyNi4yNTMsMjYuODc0IDI0LjY5LDI3LjQzNyAyMy4zMTUsMjguMzc0IEMyMS45NCwyOS4zMTEgMjAuODc3LDMwLjQzNyAyMC4xMjcsMzEuODEyIEMxOS4yNTIsMzMuMzEyIDE4LjE4OSwzNC42ODcgMTYuOTM5LDM2IEMxNS43NTEsMzcuMzEzIDE0LjU2NCwzOC40MzggMTMuNTY0LDM5LjMxMyBDMTIuNTAxLDQwLjE4OCAxMS45MzksNDAuNjg4IDExLjgxNCw0MC43NTEgTDEwLjE4OSw0Mi4wNjQgQzkuMDY0LDQzLjAwMiA4LjA2NCw0My45MzkgNy4wNjQsNDUuMDAyIEM2LjEyNiw0Ni4wMDIgNS4zMTQsNDcuNDQgNC42MjYsNDkuMzE1IEM0LjE4OCw1MC41MDMgMy45MzgsNTEuNjI4IDMuOTM4LDUyLjg3OCBDMy45MzgsNTMuNjI4IDQuMDYzLDU0LjM3OCA0LjI1MSw1NS4xMjggTDQuMjUsNTUuMTI1IFogTTEzLjMxMyw0OC41IEwxMy44MTMsNDcuMTg3IEMxNC4xMjYsNDYuMzEyIDE0Ljc1MSw0NS40MzcgMTUuNzUxLDQ0LjU2MiBDMTYuNzUxLDQzLjY4NyAxNy44NzYsNDMuMjQ5IDE5LjEyNiw0My4yNDkgTDIzLjUwMSw0My4yNDkgTDIzLjUwMSwzNy45MzYgTDI3LjEyNiwzNy45OTkgTDI3LjEyNiw1Ny42MjQgTDE5LjAwMSw1Ny42MjQgQzE2LjU2Myw1Ny4xMjQgMTQuODc2LDU1LjkzNiAxMy45MzgsNTQuMTI0IEMxMy40MzgsNTIuODc0IDEzLjE4OCw1MS41NjEgMTMuMTg4LDUwLjI0OSBDMTMuMTg4LDQ5LjY4NiAxMy4yNTEsNDkuMDYxIDEzLjMxMyw0OC40OTkgTDEzLjMxMyw0OC41IFogTTE0Ljg3NSwxMC41IEMxNC44NzUsMTMuMTg4IDE1LjUsMTUuNTYzIDE2Ljg3NSwxNy40MzggQzE4LjE4OCwxOS4zNzYgMTkuODEzLDIwLjMxMyAyMS43NSwyMC4zMTMgQzIzLjY4NywyMC4zMTMgMjUuMzEzLDE5LjM3NSAyNi42MjUsMTcuNDM4IEMyOCwxNS41NjMgMjguNjg4LDEzLjE4OCAyOC42ODgsMTAuNSBDMjguNjg4LDcuNzUgMjgsNS40MzcgMjYuNjI1LDMuNSBDMjUuMzEyLDEuNTYyIDIzLjY4NywwLjYyNSAyMS43NSwwLjYyNSBDMTkuODEzLDAuNjI1IDE4LjE4NywxLjU2MyAxNi44NzUsMy41IEMxNS41LDUuNDM4IDE0Ljg3NSw3Ljc1IDE0Ljg3NSwxMC41IEwxNC44NzUsMTAuNSBaIE0xNy4xMjUsNTEuNjI1IEwxNy40MzgsNTIuMzEzIEMxNy41NjMsNTIuODEzIDE3LjkzOCw1My4yNTEgMTguMzc2LDUzLjY4OCBDMTguODc2LDU0LjE4OCAxOS41MDEsNTQuMzc2IDIwLjE4OSw1NC4zNzYgTDIzLjQzOSw1NC4zNzYgTDIzLjQzOSw0Ni4zNzYgTDE5Ljg3Niw0Ni4zNzYgQzE4LjY4OCw0Ni43NTEgMTcuODEzLDQ3LjUwMSAxNy40MzgsNDguNjI2IEMxNy4xMjUsNDkuMzc2IDE3LDUwLjAwMSAxNyw1MC42MjYgQzE3LDUwLjkzOSAxNy4wNjMsNTEuMzE0IDE3LjEyNSw1MS42MjYgTDE3LjEyNSw1MS42MjUgWiBNMjkuMTI1LDU0LjA2MyBMMjkuMTI1LDQzLjY4OCBMMzIuOTM4LDQzLjYyNSBMMzIuOTM4LDUyLjkzOCBMMzMuMDAxLDUzLjE4OCBDMzMuMTI2LDUzLjMxMyAzMy4yNTEsNTMuNTAxIDMzLjUwMSw1My43NTEgQzMzLjc1MSw1My45MzkgMzQuMDY0LDU0LjA2NCAzNC40MzksNTQuMTI2IEwzOC4yNTIsNTQuMTI2IEwzOC4yNTIsNDMuNjg4IEw0Mi4zMTUsNDMuNjg4IEw0Mi4zMTUsNTcuNTYzIEwzMi45NCw1Ny41NjMgTDMyLjAwMiw1Ny4yNSBDMzEuMzc3LDU3LjA2MiAzMC43NTIsNTYuNjI1IDMwLjA2NCw1Ni4wNjIgQzI5LjQzOSw1NS40OTkgMjkuMTI2LDU0LjgxMiAyOS4xMjYsNTQuMDYyIEwyOS4xMjUsNTQuMDYzIFogTTMyLjUsMTEuMDYzIEMzMi40MzcsMTEuNzUxIDMyLjM3NSwxMi4zNzYgMzIuMzc1LDEzLjAwMSBDMzIuNDM4LDE0LjgxNCAzMi43NSwxNi40MzkgMzMuNDM4LDE3Ljc1MSBDMzQuMjUxLDE5LjYyNiAzNS44NzYsMjAuNjg5IDM4LjI1MSwyMS4wNjQgQzM4LjU2NCwyMS4wNjQgMzguODc2LDIxLjEyNyAzOS4xODksMjEuMTI3IEM0MS4xMjcsMjEuMDY0IDQyLjgxNCwyMC4xODkgNDQuMzE0LDE4LjU2NCBDNDUuOTM5LDE2LjU2NCA0Ny4wMDIsMTQuNDM5IDQ3LjM3NywxMi4wNjQgQzQ3LjM3NywxMS42ODkgNDcuNDQsMTEuMzE0IDQ3LjQ0LDEwLjkzOSBDNDcuNDQsOS4zMTQgNDYuODc3LDcuNjg5IDQ1LjgxNSw2LjAwMSBDNDQuNTAyLDMuOTM4IDQyLjk0LDIuNjg4IDQxLjA2NSwyLjMxMyBDNDAuODE1LDIuMjUgNDAuNTAyLDIuMjUgNDAuMjUyLDIuMjUgQzM4Ljc1MiwyLjI1IDM3LjI1MiwzLjEyNSAzNS42MjcsNC44NzUgQzMzLjc1Miw2LjkzOCAzMi43NTIsOSAzMi41MDIsMTEuMDYzIEwzMi41LDExLjA2MyBaIE00My44NzUsMjkuNjI1IEM0My44NzUsMzAuODc1IDQzLjkzOCwzMS44NzUgNDQuMTI1LDMyLjY4OCBDNDQuMjUsMzMuNTYzIDQ0LjUsMzQuNTAxIDQ1LDM1LjU2MyBDNDUuNDM4LDM2LjU2MyA0Ni4yNSwzNy4zNzYgNDcuNDM4LDM3Ljg3NiBDNDguNTAxLDM4LjMxNCA0OS44MTMsMzguNTY0IDUxLjQzOCwzOC41NjQgTDUxLjgxMywzOC41NjQgQzUyLjYyNiwzOC41NjQgNTMuMzc2LDM4LjUwMSA1NC4wNjMsMzguMzE0IEM1NC43NTEsMzguMDY0IDU1LjMxMywzNy44MTQgNTUuNzUxLDM3LjQzOSBDNTYuMjUxLDM3LjA2NCA1Ni42MjYsMzYuNjI2IDU3LjAwMSwzNi4yNTEgQzU3LjM3NiwzNS44MTMgNTcuNjI2LDM1LjMxMyA1Ny44MTQsMzQuNzUxIEM1OC4wMDIsMzQuMTI2IDU4LjE4OSwzMy42MjYgNTguMzE0LDMzLjE4OCBDNTguNDM5LDMyLjc1IDU4LjUwMiwzMi4yNSA1OC41NjQsMzEuNTYzIEM1OC42MjYsMzAuODc2IDU4LjYyNywzMC40MzggNTguNjI3LDMwLjEyNSBMNTguNjI3LDI3LjkzNyBDNTguNjI3LDI3LjM3NCA1OC41MDIsMjYuNjI0IDU4LjI1MiwyNS44MTIgQzU4LjAwMiwyNSA1Ny41NjQsMjQuMTg3IDU3LjA2NCwyMy4yNDkgQzU2LjUwMSwyMi4zMTEgNTUuNjg5LDIxLjU2MSA1NC42MjYsMjAuOTM2IEM1My41NjMsMjAuMzExIDUyLjI1MSwxOS45OTggNTAuODEzLDE5Ljk5OCBDNDYuMTg4LDE5Ljk5OCA0My44NzUsMjMuMTg2IDQzLjg3NSwyOS42MjMgTDQzLjg3NSwyOS42MjUgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=bitbucket] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI5NXB4IiB2aWV3Qm94PSIwIDAgMjU2IDI5NSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5Hcm91cDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMjgsNC42MDc0MjQwN2UtMDYgTDEyOCw0LjYwNzQyNDA3ZS0wNiBDNTcuNzMxODgxOCw0LjYwNzQyNDA3ZS0wNiAwLjAxMTYzOTUwNTEsMTguODIxODE1NyAwLjAxMTYzOTUwNTEsNDIuNjYyNzgxOCBDMC4wMTE2Mzk1MDUxLDQ4LjkzNjcyMjcgMTUuMDY5MDkzLDEzOC4wMjY2NjUgMjEuMzQzMDMzOSwxNzMuMTYwNzE1IEMyMy44NTI2MDU2LDE4OS40NzI5NjYgNjUuMjYwNjA4NSwyMTIuMDU5MTQ2IDEyOCwyMTIuMDU5MTQ2IEwxMjgsMjEyLjA1OTE0NiBDMTkwLjczOTM4NiwyMTIuMDU5MTQ2IDIzMC44OTI1OTEsMTg5LjQ3Mjk2NiAyMzQuNjU2OTcyLDE3My4xNjA3MTUgQzI0MC45MzA5MDEsMTM4LjAyNjY2NSAyNTUuOTg4MzU1LDQ4LjkzNjcyMjcgMjU1Ljk4ODM1NSw0Mi42NjI3ODE4IEMyNTQuNzMzNTY5LDE4LjgyMTgxNTcgMTk4LjI2ODExMiw0LjYwNzQyNDA3ZS0wNiAxMjgsNC42MDc0MjQwN2UtMDYgTDEyOCw0LjYwNzQyNDA3ZS0wNiBMMTI4LDQuNjA3NDI0MDdlLTA2IFogTTEyOCwxODMuMTk5MDI1IEMxMDUuNDEzODIsMTgzLjE5OTAyNSA4Ny44NDY3ODg4LDE2NS42MzE5ODggODcuODQ2Nzg4OCwxNDMuMDQ1ODA4IEM4Ny44NDY3ODg4LDEyMC40NTk2MjggMTA1LjQxMzgyLDEwMi44OTI2MDcgMTI4LDEwMi44OTI2MDcgQzE1MC41ODYxNjksMTAyLjg5MjYwNyAxNjguMTUzMjA1LDEyMC40NTk2MjggMTY4LjE1MzIwNSwxNDMuMDQ1ODA4IEMxNjguMTUzMjA1LDE2NC4zNzcyMDMgMTUwLjU4NjE2OSwxODMuMTk5MDI1IDEyOCwxODMuMTk5MDI1IEwxMjgsMTgzLjE5OTAyNSBMMTI4LDE4My4xOTkwMjUgWiBNMTI4LDU1LjIxMDY2MzYgQzgyLjgyNzYzMzcsNTUuMjEwNjYzNiA0Ni40Mzg3ODU5LDQ3LjY4MTkzNjggNDYuNDM4Nzg1OSwzNy42NDM2Mzg0IEM0Ni40Mzg3ODU5LDI3LjYwNTMyODMgODIuODI3NjMzNywyMC4wNzY2MDE2IDEyOCwyMC4wNzY2MDE2IEMxNzMuMTcyMzQ5LDIwLjA3NjYwMTYgMjA5LjU2MTIwOCwyNy42MDUzMjgzIDIwOS41NjEyMDgsMzcuNjQzNjM4NCBDMjA5LjU2MTIwOCw0Ny42ODE5MzY4IDE3My4xNzIzNDksNTUuMjEwNjYzNiAxMjgsNTUuMjEwNjYzNiBMMTI4LDU1LjIxMDY2MzYgTDEyOCw1NS4yMTA2NjM2IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjIwLjYwODE3NiwyMDcuMDM5OTkxIEMyMTguMDk4NTkyLDIwNy4wMzk5OTEgMjE2Ljg0MzgwNywyMDguMjk0Nzc3IDIxNi44NDM4MDcsMjA4LjI5NDc3NyBDMjE2Ljg0MzgwNywyMDguMjk0Nzc3IDE4NS40NzQxMTQsMjMzLjM5MDU0MSAxMjkuMDA4NjU3LDIzMy4zOTA1NDEgQzcyLjU0MzIxMTMsMjMzLjM5MDU0MSA0MS4xNzM1MDY5LDIwOC4yOTQ3NzcgNDEuMTczNTA2OSwyMDguMjk0Nzc3IEM0MS4xNzM1MDY5LDIwOC4yOTQ3NzcgMzguNjYzOTM1MSwyMDcuMDM5OTkxIDM3LjQwOTE0OTMsMjA3LjAzOTk5MSBDMzQuODk5NTY2LDIwNy4wMzk5OTEgMzIuMzg5OTk0MywyMDguMjk0Nzc3IDMyLjM4OTk5NDMsMjEyLjA1OTE0NiBMMzIuMzg5OTk0MywyMTMuMzEzOTMyIEMzNy40MDkxNDkzLDIzOS42NjQ0ODIgNDEuMTczNTA2OSwyNTguNDg2MjkzIDQxLjE3MzUwNjksMjYwLjk5NTg2NCBDNDQuOTM3ODc2LDI3OS44MTc2ODcgODIuNTgxNTA5OCwyOTQuODc1MTQxIDEyNy43NTM4NzEsMjk0Ljg3NTE0MSBMMTI3Ljc1Mzg3MSwyOTQuODc1MTQxIEMxNzIuOTI2MjMyLDI5NC44NzUxNDEgMjEwLjU2OTg2NiwyNzkuODE3Njg3IDIxNC4zMzQyMzUsMjYwLjk5NTg2NCBDMjE0LjMzNDIzNSwyNTguNDg2MjkzIDIxOC4wOTg1OTIsMjM5LjY2NDQ4MiAyMjMuMTE3NzQ3LDIxMy4zMTM5MzIgTDIyMy4xMTc3NDcsMjEyLjA1OTE0NiBDMjI0LjM3MjUzMywyMDkuNTQ5NTYzIDIyMy4xMTc3NDcsMjA3LjAzOTk5MSAyMjAuNjA4MTc2LDIwNy4wMzk5OTEgTDIyMC42MDgxNzYsMjA3LjAzOTk5MSBMMjIwLjYwODE3NiwyMDcuMDM5OTkxIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iMTI4IiBjeT0iMTQxLjc5MTA4IiByPSIyMC4wNzY2MDUiPjwvY2lyY2xlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");   background-size: 45%; } .auth0-lock-social-button[data-provider^=box] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY1cHgiIGhlaWdodD0iMzZweCIgdmlld0JveD0iMCAwIDY1IDM2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Ym94PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImJveCIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNC41NjMsMTAuODc1IEM0MS40MzgsMTAuODc1IDQ3LjAwMSwxNi40MzggNDcuMDAxLDIzLjI1IEM0Ny4wMDEsMzAuMTI1IDQxLjQzOCwzNS42ODggMzQuNTYzLDM1LjY4OCBDMjkuODEzLDM1LjY4OCAyNS42ODgsMzMgMjMuNTYzLDI5LjA2MyBDMjEuNSwzMy4wMDEgMTcuMzc1LDM1LjY4OCAxMi42MjUsMzUuNjg4IEM1LjgxMiwzNS42ODggMC4zMTIsMzAuMjUgMC4xODcsMjMuNSBMMC4xODcsMjMuNSBMMC4xODcsMi44NzUgQzAuMjUsMS41IDEuMzEyLDAuNDM3IDIuNjg3LDAuNDM3IEM0LjA2MiwwLjQzNyA1LjEyNSwxLjUgNS4xODcsMi44NzUgTDUuMTg3LDIuODc1IEw1LjE4NywxMy4zMTMgQzcuMjUsMTEuNzUgOS44MTIsMTAuODc1IDEyLjYyNSwxMC44NzUgQzE3LjM3NSwxMC44NzUgMjEuNSwxMy41IDIzLjU2MywxNy40MzggQzI1LjY4OCwxMy41IDI5LjgxMywxMC44NzUgMzQuNTYzLDEwLjg3NSBMMzQuNTYzLDEwLjg3NSBaIE0xMi42MjUsMzAuNjg4IEMxNi43NSwzMC42ODggMjAuMDYzLDI3LjM3NSAyMC4wNjMsMjMuMjUgQzIwLjA2MywxOS4xODcgMTYuNzUsMTUuODEyIDEyLjYyNSwxNS44MTIgQzguNSwxNS44MTIgNS4xODcsMTkuMTg3IDUuMTg3LDIzLjI1IEM1LjE4NywyNy4zNzUgOC41LDMwLjY4OCAxMi42MjUsMzAuNjg4IEwxMi42MjUsMzAuNjg4IFogTTM0LjU2MywzMC42ODggQzM4LjY4OCwzMC42ODggNDIuMDAxLDI3LjM3NSA0Mi4wMDEsMjMuMjUgQzQyLjAwMSwxOS4xODcgMzguNjg4LDE1LjgxMiAzNC41NjMsMTUuODEyIEMzMC40MzgsMTUuODEyIDI3LjEyNSwxOS4xODcgMjcuMTI1LDIzLjI1IEMyNy4xMjUsMjcuMzc1IDMwLjQzOCwzMC42ODggMzQuNTYzLDMwLjY4OCBMMzQuNTYzLDMwLjY4OCBaIE02My42ODgsMzEuNzUgTDYzLjY4OCwzMS44MTMgQzY0LjQzOCwzMi44NzYgNjQuMjUxLDM0LjM3NiA2My4xODgsMzUuMTg4IEM2Mi4wNjMsMzYuMDYzIDYwLjU2MywzNS44MTMgNTkuNjg4LDM0Ljc1IEw1NC4yNSwyNy40MzcgTDQ4Ljc1LDM0Ljc1IEM0Ny44NzUsMzUuODEzIDQ2LjM3NSwzNi4wNjMgNDUuMzEyLDM1LjE4OCBDNDQuMTg3LDM0LjM3NSA0My45OTksMzIuODc1IDQ0Ljc0OSwzMS44MTMgTDUxLjEyNCwyMy4yNSBMNDQuNzQ5LDE0Ljc1IEM0My45OTksMTMuNjg3IDQ0LjE4NiwxMi4xMjUgNDUuMzEyLDExLjMxMiBDNDYuMzc1LDEwLjQ5OSA0Ny44NzUsMTAuNzQ5IDQ4Ljc1LDExLjgxMiBMNTQuMjUsMTkuMTI1IEw1OS42ODgsMTEuODEyIEM2MC41NjMsMTAuNzQ5IDYyLjA2MywxMC40OTkgNjMuMTg4LDExLjMxMiBDNjQuMjUxLDEyLjEyNSA2NC40MzgsMTMuNjg3IDYzLjY4OCwxNC43NSBMNTcuMzEzLDIzLjI1IEw2My42ODgsMzEuNzUgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=dropbox] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY2cHgiIGhlaWdodD0iNjNweCIgdmlld0JveD0iMCAwIDY2IDYzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZHJvcGJveDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJkcm9wYm94IiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAuMjUsMzMuODEzIEwyMC4xMjUsNDUuNjI2IEwzMy4xMjUsMzUuNjI2IEw0Ni4xMjUsNDUuNjI2IEw2NS43NSwzMy44MTMgTDUzLjEyNSwyMi45MzggTDY1Ljc1LDEyLjM3NSBMNDYuNDM3LDAgTDMzLjEyNCwxMS4xMjUgTDIwLjEyNCwwIEwwLjI0OSwxMyBMMTMuOTM3LDIzLjM3NSBMMC4yNSwzMy44MTMgWiBNMTMuODc1LDQ5Ljg3NSBMMzIuOTM4LDYyLjYyNSBMMzIuOTM4LDM5Ljg3NSBMMzIuODc1LDM5LjgxMiBMMTkuODc1LDQ5Ljc1IEwxMy44NzUsNDYuMTg3IEwxMy44NzUsNDkuODc1IEwxMy44NzUsNDkuODc1IFogTTE0LjE4OCwyMy4yNSBMMzMuMTI2LDExLjY4NyBMNTEuOTM5LDIyLjU2MiBMMzMuMDAxLDM1LjA2MiBMMTQuMTg4LDIzLjI1IFogTTMyLjkzOCw2Mi42MjUgTDUyLjQzOCw0OS45MzcgTDUyLjQzOCw0NS44NzQgTDQ2LjA2Myw0OS43NDkgTDMzLjEyNSwzOS44MTEgTDMzLDM5Ljg3NCBMMzIuOTM4LDYyLjYyNSBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="); } .auth0-lock-social-button[data-provider^=dwolla] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDQwIDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZHdvbGxhPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImR3b2xsYSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMDAwMDAwLCAwLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMSw1NSBDMSw1OC4zMTMgMiw2MC45MzggNC4wNjMsNjIuODc1IEM2LjEyNiw2NC43NSA4LjkzOCw2NS4yNSAxMi41NjMsNjQuMzc1IEMxMy4zNzYsNjQuMTg3IDE0LjQzOCw2My43NSAxNS44MTMsNjMuMDYyIEwxOC4wNjMsNjEuODc0IEwyMy44MTMsNTkuMzc0IEMyMy45MzgsNTkuMzc0IDI0LjM3Niw1OS4xMjQgMjUuMjUxLDU4Ljc0OSBDMjYuMDY0LDU4LjM3NCAyNi44MTQsNTguMDYxIDI3LjUwMSw1Ny44MTEgQzI5LjEyNiw1Ny4xMjMgMzAuNDM5LDU2LjU2MSAzMS4zNzYsNTYuMDYxIEMzMi4xODksNTUuNjg2IDMzLjMxNCw1NS4wNjEgMzQuODE0LDU0LjEyMyBDMzYuMTI3LDUzLjMxIDM3LjEyNyw1Mi40MzUgMzcuODE0LDUxLjYyMyBDMzguNTY0LDUwLjgxIDM5LjEyNyw0OS42ODUgMzkuNjI3LDQ4LjMxIEM0MC4xOSw0Ny4wNiA0MC41MDIsNDUuNTYgNDAuNTAyLDQzLjk5NyBDNDAuNTAyLDQyLjY4NCA0MC4zMTQsNDEuNDM0IDQwLjAwMiw0MC4yNDcgQzM5LjY4OSwzOC45OTcgMzkuMzc3LDM3Ljk5NyAzOS4wMDIsMzcuMTIyIEMzOC42ODksMzYuMjQ3IDM4LjEyNywzNS4zMDkgMzcuMzc3LDM0LjE4NCBDMzYuNTY0LDMzLjA1OSAzNi4wMDIsMzIuMjQ2IDM1LjU2NCwzMS43NDYgQzM1LjEyNiwzMS4yNDYgMzQuNDM5LDMwLjQzMyAzMy40MzksMjkuMzcxIEMzMi40MzksMjguMjQ2IDMxLjg3NiwyNy41NTggMzEuNTY0LDI3LjI0NiBDMzEuMzc2LDI2Ljk5NiAzMC42ODksMjYuMjQ2IDI5LjU2NCwyNC45MzMgQzI4LjQzOSwyMy42ODMgMjcuNjg5LDIyLjgwOCAyNy4zNzYsMjIuMzcgQzI3LjAwMSwyMS45OTUgMjYuNDM4LDIxLjE4MiAyNS42MjYsMTkuOTk1IEMyNC44MTQsMTguODA4IDI0LjMxMywxNy44NyAyNC4wMDEsMTcuMDU3IEMyMy43NTEsMTYuMjQ0IDIzLjQzOCwxNS4yNDQgMjMuMTg4LDE0LjA1NyBDMjIuOTM4LDEyLjgwNyAyMi44NzUsMTEuNjE5IDIyLjg3NSwxMC4zNjkgQzIzLDcuMTgxIDI0LjM3NSw0Ljc0NCAyNywzLjA1NiBDMjguMTI1LDIuNDkzIDI4LjY4OCwxLjkzMSAyOC42ODgsMS40OTMgQzI4LjUsMC43NDMgMjcuOTM4LDAuNjE4IDI3LjEyNSwxLjA1NSBDMjUuOTM3LDEuNzQzIDI0LjA2MiwyLjU1NSAyMS42MjUsMy42MTggTDE3LjE4Nyw1LjU1NiBMMTQuMTg3LDYuOTMxIEMxMy42ODcsNy4xMTkgMTMuMDYyLDcuMzY5IDEyLjMxMiw3LjY4MSBDMTEuNTYyLDguMDU2IDExLjA2Miw4LjI0NCAxMC44NzQsOC4zMDYgQzEwLjQ5OSw4LjQ5NCA5LjU2MSw4Ljk5NCA3Ljk5OSw5LjkzMSBDNi43NDksMTAuNjgxIDUuODExLDExLjM2OSA1LjMxMSwxMS45OTQgQzMuODExLDEzLjQ5NCAyLjg3MywxNS40MzIgMi42MjMsMTcuODA3IEMxLjkzNSwyMi42ODIgMy45MzYsMjcuOTk1IDguNjIzLDMzLjYyIEM4Ljk5OCwzNC4wNTggMTAuMjQ4LDM1LjU1OCAxMi40MzYsMzguMTIgQzEzLjg3NCwzOS43NDUgMTQuOTk5LDQxLjE4MyAxNS45MzYsNDIuNDk1IEMxNS41NjEsNDIuNjgzIDEyLjkzNiw0My44NyA4LjEyMyw0NS45MzMgQzcuMDYsNDYuMzcxIDUuODczLDQ2Ljk5NiA0LjYyMyw0Ny44MDggQzIuMTg1LDQ5LjM3MSAwLjk5OCw1MS43NDYgMC45OTgsNTQuOTk2IEwxLDU1IFoiIGlkPSJTaGFwZSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+");   background-size: 30%; } .auth0-lock-social-button[data-provider^=ebay] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjkwcHgiIGhlaWdodD0iMzlweCIgdmlld0JveD0iMCAwIDkwIDM5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZWJheTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJlYmF5IiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMS4wMDAwMDAsIDAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLDIzLjY4OCBDMSwyNS42MjYgMS4xODgsMjcuMTg4IDEuNjI1LDI4LjUwMSBDMiwyOS43NTEgMi44MTMsMzAuOTM5IDQsMzIuMDY0IEM1LjE4NywzMy4xODkgNy4wNjMsMzQuMDAyIDkuNTYzLDM0LjU2NCBDMTIuMDYzLDM1LjA2NCAxNS4zMTMsMzUuMzc3IDE5LjI1MSwzNS4zNzcgQzIyLjc1MSwzNS4zNzcgMjUuOTM5LDM1LjA2NCAyOC44MTQsMzQuMzc3IEMzMC4wNjQsMzQuMTI3IDMxLjI1MiwzMy43NTIgMzIuNDM5LDMzLjE4OSBMMzIuNDM5LDI3LjUwMSBMMjQuNjg5LDI3LjUwMSBDMjQuNjg5LDMwLjA2NCAyMi44NzYsMzEuMzc2IDE5LjI1MSwzMS4zNzYgQzE3LjkzOCwzMS4zNzYgMTYuODc2LDMxLjE4OCAxNi4wNjMsMzAuODEzIEMxNS4yNSwzMC40MzggMTQuNjg4LDI5Ljg3NSAxNC4zNzUsMjkuMDYzIEMxNC4wNjIsMjguMzEzIDEzLjg3NSwyNy42ODggMTMuODEyLDI3LjEyNSBDMTMuNjg3LDI2LjYyNSAxMy42ODcsMjUuODc1IDEzLjY4NywyNSBMMzIuNDM3LDI1IEwzMi40MzcsMTQuNjg3IEMzMS42MjQsMTQuMjQ5IDMwLjM3NCwxMy44NzQgMjguNjg3LDEzLjU2MiBDMjYuMTI0LDEyLjk5OSAyMi45OTksMTIuNjg3IDE5LjI0OSwxMi42ODcgQzE2LjA2MSwxMi42ODcgMTMuMzExLDEyLjg3NSAxMC45OTksMTMuMzEyIEM4Ljc0OSwxMy42ODcgNi45MzYsMTQuMjUgNS42ODYsMTQuODc1IEM0LjM3MywxNS40MzggMy4zNzMsMTYuMzEzIDIuNjg2LDE3LjMxMyBDMS45OTksMTguMzEzIDEuNTYxLDE5LjMxMyAxLjMxMSwyMC4zMTMgQzEuMTIzLDIxLjI1MSAwLjk5OCwyMi4zNzYgMC45OTgsMjMuNjg4IEwxLDIzLjY4OCBaIE0xMy42ODgsMjEuNTYzIEMxMy42ODgsMjAuODc1IDEzLjY4OCwyMC4zMTMgMTMuNzUxLDE5LjkzOCBDMTMuODE0LDE5LjYyNSAxNC4wMDEsMTkuMDYzIDE0LjMxNCwxOC40MzggQzE0LjYyNywxNy43NSAxNS4xODksMTcuMjUgMTYuMDAyLDE2LjkzOCBDMTYuODE1LDE2LjYyNiAxNy45NCwxNi41IDE5LjI1MiwxNi41IEMyMC42MjcsMTYuNSAyMS44MTUsMTYuNjI1IDIyLjY5LDE2LjkzOCBDMjMuNTY1LDE3LjI1MSAyNC4xMjgsMTcuNjg4IDI0LjQ0LDE4LjMxMyBDMjQuNzUzLDE5LjAwMSAyNC44NzgsMTkuNTAxIDI0Ljk0LDE5LjgxMyBDMjUuMDY1LDIwLjE4OCAyNS4wNjUsMjAuNzUxIDI1LjA2NSwyMS41NjMgTDEzLjY5LDIxLjU2MyBMMTMuNjg4LDIxLjU2MyBaIE0zMi40MzgsMzMuMTg4IEMzMi41MDEsMzMuMTg4IDMyLjYyNiwzMy4xMjUgMzIuNjg4LDMzLjA2MyBDMzUuODEzLDMxLjUgMzcuMzc2LDI5LjY4OCAzNy40MzgsMjcuNSBMMzIuNDM4LDI3LjUgTDMyLjQzOCwzMy4xODggTDMyLjQzOCwzMy4xODggWiBNMzIuNDM4LDMzLjE4OCBMMzIuNDM4LDM4LjI1MSBMMzkuMDAxLDM4LjI1MSBMMzkuMDAxLDM1LjU2MyBMMzkuMDY0LDM1LjU2MyBDNDAuMjUyLDM3LjY4OCA0Mi4xODksMzguNzUxIDQ0Ljg3NywzOC43NTEgQzQ2LjI1MiwzOC43NTEgNDcuNDQsMzguNTAxIDQ4LjMxNSwzNy45MzggQzQ5LjI1MywzNy40MzggNDkuOTQsMzYuNjI1IDUwLjQ0LDM1LjYyNSBDNTAuODc4LDM0LjU2MiA1MS4xOSwzMy41NjIgNTEuMzc4LDMyLjYyNSBDNTEuNTY2LDMxLjYyNSA1MS42OTEsMzAuNSA1MS43NTMsMjkuMTI1IEM0OC41MDMsMjguMzc1IDQ2Ljg3OCwyNS43NSA0Ni44NzgsMjEuMzEyIEM0Ni44NzgsMTguMjQ5IDQ3Ljc1MywxNi4wNjIgNDkuNDQxLDE0LjgxMiBDNDguMzE2LDEzLjY4NyA0Ni44NzgsMTMuMTI0IDQ1LjA2NiwxMy4xMjQgQzQyLjYyOCwxMy4xMjQgNDAuNzUzLDE0LjA2MiAzOS4zNzgsMTUuOTM3IEwzOS4yNTMsMTUuOTM3IEwzOS4yNTMsMi45OTkgTDMyLjQ0LDIuOTk5IEwzMi40NCwxNC42ODcgQzM0LjY5LDE1LjY4NyAzNi4xOSwxNyAzNi44MTUsMTguNjI1IEMzNy4zNzgsMjAgMzcuNjksMjEuNjI1IDM3LjY5LDIzLjUgQzM3LjY5LDI0IDM3LjYyNywyNC41IDM3LjYyNywyNSBMMzIuNDM5LDI1IEwzMi40MzksMjcuNSBMMzcuNDM5LDI3LjUgQzM3LjM3NiwyOS42ODggMzUuODE0LDMxLjUgMzIuNjg5LDMzLjA2MyBDMzIuNjI2LDMzLjEyNiAzMi41MDEsMzMuMTg4IDMyLjQzOSwzMy4xODggTDMyLjQzOCwzMy4xODggWiBNMzIuNDM4LDI1IEwzNy42MjYsMjUgQzM3LjYyNiwyNC41IDM3LjY4OSwyNCAzNy42ODksMjMuNSBDMzcuNjg5LDIxLjYyNSAzNy4zNzYsMjAgMzYuODE0LDE4LjYyNSBDMzYuMTg5LDE3IDM0LjY4OSwxNS42ODcgMzIuNDM5LDE0LjY4NyBMMzIuNDM5LDI1IEwzMi40MzgsMjUgWiBNMzkuMjUsMjUuNjg4IEMzOS4yNSwyNC4xMjUgMzkuMzEzLDIyLjkzOCAzOS4zMTMsMjIuMjUgQzM5LjM3NiwyMS41IDM5LjUwMSwyMC42ODcgMzkuNjI2LDE5LjgxMiBDMzkuNzUxLDE4LjkzNyA0MC4wNjQsMTguMjQ5IDQwLjQzOSwxNy45MzcgQzQwLjg3NywxNy41NjIgNDEuMzc3LDE3LjM3NCA0Mi4wNjQsMTcuMzc0IEM0Mi44MTQsMTcuMzc0IDQzLjM3NywxNy41NjIgNDMuODE0LDE3Ljg3NCBDNDQuMTg5LDE4LjI0OSA0NC41MDIsMTguODEyIDQ0LjYyNywxOS42ODcgQzQ0LjgxNSwyMC41NjIgNDQuOTQsMjEuMzc1IDQ0Ljk0LDIyLjA2MiBDNDUuMDAzLDIyLjc1IDQ1LjA2NSwyMy44NzUgNDUuMDY1LDI1LjM3NSBMNDUuMDY1LDI1LjY4OCBDNDUuMDY1LDI5LjAwMSA0NC44MTUsMzEuMjUxIDQ0LjQ0LDMyLjU2MyBDNDQuMDY1LDMzLjg3NSA0My4zMTUsMzQuNTAxIDQyLjA2NSwzNC41MDEgQzQwLjk0LDM0LjUwMSA0MC4xOSwzMy44NzYgMzkuODE1LDMyLjU2MyBDMzkuNDQsMzEuMjUgMzkuMjUyLDI5IDM5LjI1MiwyNS42ODggTDM5LjI1LDI1LjY4OCBaIE00Ni44NzUsMjEuMzEzIEM0Ni44NzUsMjUuNzUxIDQ4LjUsMjguMzc2IDUxLjc1LDI5LjEyNiBMNTEuNzUsMjUuODEzIEM1MS44MTMsMjQgNTEuODEzLDIyLjYyNSA1MS43NSwyMS43NSBDNTEuNjg3LDIwLjg3NSA1MS41LDE5LjY4NyA1MS4xMjUsMTguMTg3IEM1MC43NSwxNi42ODcgNTAuMTg3LDE1LjU2MiA0OS40MzcsMTQuODEyIEM0Ny43NDksMTYuMDYyIDQ2Ljg3NCwxOC4yNSA0Ni44NzQsMjEuMzEyIEw0Ni44NzUsMjEuMzEzIFogTTQ3LjM3NSwxMS4xODggTDU0LjI1LDExLjE4OCBDNTQuMjUsOS45MzggNTQuMzc1LDkgNTQuNjg4LDguMzEzIEM1NS4wMDEsNy42MjYgNTUuNjg4LDcuMzEzIDU2LjgxMyw3LjMxMyBDNTcuOTM4LDcuMzEzIDU4LjY4OCw3LjYyNiA1OS4wNjMsOC4yNTEgQzU5LjQzOCw4LjgxNCA1OS42MjYsOS43NTEgNTkuNjI2LDExLjAwMSBMNTkuNjI2LDEyLjkzOSBMNTguMDYzLDEyLjkzOSBDNTMuOTM4LDEyLjkzOSA1MS4wNjMsMTMuNTY0IDQ5LjQzOCwxNC44MTQgQzUwLjE4OCwxNS41NjQgNTAuNzUxLDE2LjY4OSA1MS4xMjYsMTguMTg5IEM1MS41MDEsMTkuNjg5IDUxLjY4OSwyMC44NzcgNTEuNzUxLDIxLjc1MiBMNTEuNzUxLDI5LjEyNyBDNTIuMDY0LDI5LjE5IDUyLjYyNiwyOS4xOSA1My40MzksMjkuMTkgQzU2LjI1MiwyOS4xOSA1OC40MzksMjguMDAyIDU5LjgxNCwyNS41MDIgTDU5LjkzOSwyNS41MDIgTDYwLjI1MiwyOC44MTUgTDY2LjY5LDI4LjgxNSBDNjYuNjksMjguNDQgNjYuNjI3LDI3Ljc1MiA2Ni41NjUsMjYuNjI3IEM2Ni40NCwyNS41NjQgNjYuNDQsMjQuNzUyIDY2LjQ0LDI0LjE4OSBMNjYuNDQsMTcuNjI2IEw1OS41NjUsMy42ODggQzU3LjYyNywzLjU2MyA1Ni42MjcsMy41IDU2LjQ0LDMuNSBDNTMuNTY1LDMuNSA1MS40NCw0LjA2MyA0OS45NCw1LjEyNSBDNDguMjUyLDYuMTg4IDQ3LjM3Nyw4LjI1IDQ3LjM3NywxMS4xODggTDQ3LjM3NSwxMS4xODggWiBNNTMuNjI1LDIxIEM1My4xODcsMjAuNjI1IDUzLjE4NywyMC4xODcgNTMuNjg4LDE5Ljc1IEM1NC4xODksMTkuMzEzIDU0LjI1MSwxOC45MzcgNTQuMDAxLDE4Ljc1IEM1My42ODgsMTguNTYyIDUzLjg3NiwxOC4zMTIgNTQuNDM5LDE4LjA2MiBDNTQuOTM5LDE3LjgxMiA1NS4xODksMTcuNjI0IDU1LjAwMiwxNy41NjIgQzU0Ljg3NywxNy40MzcgNTUuMDY1LDE3LjMxMiA1NS42OSwxNy4xODcgQzU2LjMxNSwxNy4wNjIgNTYuNTY1LDE2Ljk5OSA1Ni41NjUsMTYuOTk5IEw1Ny41MDMsMTYuODc0IEM1Ny42MjgsMTYuODc0IDU4LjAwMywxNi44NzQgNTguNTY2LDE2LjgxMSBMNTkuNjI5LDE2LjgxMSBMNTkuNjI5LDE4LjA2MSBDNTkuNjkyLDE4Ljc0OSA1OS42OTIsMTkuMjQ5IDU5LjYyOSwxOS42MjQgQzU5LjYyOSwxOS45MzcgNTkuNjI5LDIwLjQzNyA1OS41NjYsMjEuMTI0IEM1OS41MDMsMjEuNzQ5IDU5LjQ0MSwyMi4zMTIgNTkuMjUzLDIyLjYyNCBDNTkuMTI4LDIyLjk5OSA1OC45NCwyMy4zNzQgNTguNjksMjMuODEyIEM1OC40NCwyNC4xODcgNTguMDY1LDI0LjUgNTcuNjksMjQuNjg3IEM1Ny4yNTIsMjQuODc1IDU2LjgxNSwyNSA1Ni4yNTIsMjUgQzU0LjUwMiwyNSA1My42MjcsMjMuNjg3IDUzLjYyNywyMSBMNTMuNjI1LDIxIFogTTU3Ljg3NSwwLjM3NSBMNTkuNTYzLDMuNjg4IEM2Mi4zMTMsNC4wNjMgNjQuMTI2LDQuOTM4IDY1LjA2Myw2LjI1MSBDNjUuOTM4LDcuNjI2IDY2LjQzOCw5LjQzOSA2Ni40MzgsMTEuODE0IEw2Ni40MzgsMTcuNjI3IEw2OS4xODgsMjMuMzE1IEw2OS4xODgsMzUuNTAzIEw3OC4xODgsMzUuNTAzIEw3OC4xODgsMjMuMzE1IEw5MC4yNTEsMC4zNzcgTDgxLjEyNiwwLjM3NyBMNzQuMTI2LDE1LjE5IEw2Ny43NTEsMC4zNzcgTDU3Ljg3NiwwLjM3NyBMNTcuODc1LDAuMzc1IFogTTU5LjU2MywzLjY4OCBMNjYuNDM4LDE3LjYyNiBMNjYuNDM4LDExLjgxMyBDNjYuNDM4LDkuNDM4IDY1LjkzOCw3LjYyNSA2NS4wNjMsNi4yNSBDNjQuMTI1LDQuOTM3IDYyLjMxMyw0LjA2MiA1OS41NjMsMy42ODcgTDU5LjU2MywzLjY4OCBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");   background-size: 70%; } .auth0-lock-social-button[data-provider^=exact] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQzcHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDQzIDMyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZXhhY3Q8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iZXhhY3QiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAuMDQ5LDEuMDA4IEMxNC4wMTIsMC44IDI3Ljk3NCwwLjgyOSA0MS45MzcsMC45NzggQzQyLjAyNCwzLjcxOCA0Mi4yMjYsOS4xOTggNDIuMzEzLDExLjkzOSBDMjguNTI0LDEyLjQ0NSAxNC43MDYsMTIuMjA3IDAuODg4LDEyLjI5NyBDMC41OTksOC41NDQgMC4zMSw0Ljc5MSAwLjA1LDEuMDA5IEwwLjA1LDEuMDA5IEwwLjA1LDEuMDA5IEwwLjA0OSwxLjAwOCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLjIyMywyMC4yMTkgQzE0LjA0MSwyMC4yNDkgMjcuOTQ2LDE5LjI5NiA0MS43NjQsMjAuNjM2IEM0Mi4xMTEsMjQuMTUxIDQyLjExMSwyNy43MjUgNDIuMTQsMzEuMjY5IEMyOC4yMzUsMzEuMjM5IDE0LjM1OSwzMS4yMzkgMC40NTQsMzEuMjEgQzAuMzY3LDI3LjU0NyAwLjI4MSwyMy44ODMgMC4yMjMsMjAuMjIgTDAuMjIzLDIwLjIyIEwwLjIyMywyMC4yMiBMMC4yMjMsMjAuMjE5IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");   background-size: 30%; } .auth0-lock-social-button[data-provider^=facebook] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjM2cHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDM2IDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZmFjZWJvb2s8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iZmFjZWJvb2siIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMC45MzgsMzUgTDEwLjc1MSwzNSBMMTAuNzUxLDY0LjYyNSBMMjMuMDY0LDY0LjYyNSBMMjMuMDY0LDM1IEwzNS4zNzcsMzUgTDM1LjM3NywyMi43NSBMMjMuMDY0LDIyLjc1IEwyMy4wNjQsMTYuNSBDMjMuMDY0LDE1LjQzNyAyMy4zMTQsMTQuNjI1IDIzLjgxNCwxMy44NzUgQzI0LjM3NywxMy4xODcgMjQuOTM5LDEyLjg3NSAyNS41NjQsMTIuODc1IEwzNS4zNzcsMTIuODc1IEwzNS4zNzcsMC42MjUgTDI1LjU2NCwwLjYyNSBDMjEuNDM5LDAuNjI1IDE4LjAwMSwyLjE4OCAxNS4xMjYsNS4zMTMgQzEyLjE4OCw4LjQzOCAxMC43NTEsMTIuMTg4IDEwLjc1MSwxNi42MjYgTDEwLjc1MSwyMi43NTEgTDAuOTM4LDIyLjc1MSBMMC45MzgsMzUuMDAxIEwwLjkzOCwzNSBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");   background-size: 25%; } .auth0-lock-social-button[data-provider^=fitbit] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYwcHgiIGhlaWdodD0iNTlweCIgdmlld0JveD0iMCAwIDYwIDU5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Zml0Yml0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImZpdGJpdCIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zOC4zNzUsNDIgQzM4LjM3NSw0NC40MzggNDAuMzEzLDQ2LjMxMyA0Mi44MTMsNDYuMzEzIEM0NS4yNTEsNDYuMzEzIDQ3LjI1MSw0NC4zNzUgNDcuMzEzLDQyIEM0Ny4zMTMsMzkuNjI1IDQ1LjI1LDM3LjU2MiA0Mi43NSwzNy42MjUgQzQwLjMxMiwzNy42MjUgMzguMzc1LDM5LjUgMzguMzc1LDQyIEwzOC4zNzUsNDIgWiBNNjAsMjkuNSBDNjAsMjYuOTM3IDU4LjE4NywyNS4xMjUgNTUuNjg3LDI1LjEyNSBDNTMuMTg3LDI1LjA2MiA1MS4xMjQsMjcuMDYzIDUxLjEyNCwyOS40MzggQzUxLjE4NywzMS44MTMgNTMuMTg3LDMzLjgxMyA1NS41NjIsMzMuODEzIEM1OC4wNjIsMzMuODc2IDYwLDMxLjkzOCA2MCwyOS41IEw2MCwyOS41IFogTTM4LjM3NSwxNi45MzggQzM4LjM3NSwxOS4zNzYgNDAuMzc1LDIxLjMxMyA0Mi44MTMsMjEuMzEzIEM0NS4yNTEsMjEuMjUgNDcuMjUxLDE5LjI1IDQ3LjMxMywxNi45MzggQzQ3LjMxMywxNC42MjUgNDUuMjUsMTIuNTYzIDQyLjg3NSwxMi41NjMgQzQwLjM3NSwxMi41IDM4LjM3NSwxNC40MzggMzguMzc1LDE2LjkzOCBMMzguMzc1LDE2LjkzOCBaIE0wLDI5LjQzOCBDMCwzMS44NzYgMiwzMy44MTMgNC4zNzUsMzMuODEzIEM2Ljg3NSwzMy44MTMgOC44NzUsMzEuNzUgOC44NzUsMjkuMzc1IEM4LjgxMiwyNyA2LjgxMiwyNS4xMjUgNC4zNzUsMjUuMTI1IEMxLjgxMiwyNS4xMjUgMCwyNi45MzggMCwyOS40MzggTDAsMjkuNDM4IFogTTM4LjM3NSwyOS40MzggQzM4LjM3NSwzMS44MTMgNDAuMzc1LDMzLjgxMyA0Mi44MTMsMzMuODEzIEM0NS4yNTEsMzMuODEzIDQ3LjMxMywzMS43NSA0Ny4zMTMsMjkuMzc1IEM0Ny4yNSwyNyA0NS4yNSwyNS4xMjUgNDIuODEzLDI1LjEyNSBDNDAuMjUsMjUuMTI1IDM4LjM3NSwyNi45MzggMzguMzc1LDI5LjQzOCBMMzguMzc1LDI5LjQzOCBaIE0yMS42MjUsMjkuNSBDMjEuNjI1LDI3IDE5LjgxMiwyNS4xMjUgMTcuMzEyLDI1LjEyNSBDMTQuNzQ5LDI1LjA2MiAxMi43NDksMjYuOTM4IDEyLjY4NywyOS40MzggQzEyLjY4NywzMS43NTEgMTQuODEyLDMzLjgxMyAxNy4yNSwzMy44MTMgQzE5LjYyNSwzMy44MTMgMjEuNTYzLDMxLjg3NSAyMS42MjUsMjkuNSBMMjEuNjI1LDI5LjUgWiBNMjkuOTM4LDI1LjEyNSBDMjcuNSwyNS4xMjUgMjUuNSwyNy4wNjMgMjUuNTYzLDI5LjQzOCBDMjUuNTYzLDMxLjg3NiAyNy41NjMsMzMuODEzIDMwLjAwMSwzMy44MTMgQzMyLjQzOSwzMy44MTMgMzQuNDM5LDMxLjg3NSAzNC40MzksMjkuNSBDMzQuNTAyLDI3IDMyLjUwMSwyNS4xMjUgMjkuOTM5LDI1LjEyNSBMMjkuOTM4LDI1LjEyNSBaIE0zMCw4LjY4OCBDMzIuNSw4LjY4OCAzNC40MzgsNi43NSAzNC40MzgsNC4zMTMgQzM0LjM3NSwyIDMyLjMxMyw4Ljg4MTc4NDJlLTE2IDMwLDAuMDYzIEMyNy42MjUsMC4wNjMgMjUuNTYyLDIuMDYzIDI1LjU2Miw0LjQzOCBDMjUuNjI1LDYuNzUxIDI3LjYyNSw4LjY4OCAzMCw4LjY4OCBMMzAsOC42ODggWiBNMzAsNTguODEzIEMzMi40MzgsNTguODEzIDM0LjQzOCw1Ni44NzUgMzQuNDM4LDU0LjQzOCBDMzQuNDM4LDUyLjEyNSAzMi40MzgsNTAuMTg4IDMwLDUwLjE4OCBDMjcuNjI1LDUwLjEyNSAyNS41NjIsNTIuMTg4IDI1LjU2Miw1NC41MDEgQzI1LjU2Miw1Ni44NzYgMjcuNTYyLDU4Ljc1MSAzMCw1OC44MTQgTDMwLDU4LjgxMyBaIE0zNC40MzgsNDEuOTM4IEMzNC40MzgsMzkuNjI1IDMyLjQzOCwzNy42MjUgMzAsMzcuNjI1IEMyNy42ODcsMzcuNjI1IDI1LjYyNSwzOS42MjUgMjUuNTYyLDQxLjkzOCBDMjUuNTYyLDQ0LjI1MSAyNy42MjUsNDYuMzEzIDMwLjA2Miw0Ni4zMTMgQzMyLjQzNyw0Ni4yNSAzNC40MzcsNDQuMzEzIDM0LjQzNyw0MS45MzggTDM0LjQzOCw0MS45MzggWiBNMTIuODc1LDQyIEMxMi44NzUsNDQuNDM4IDE0Ljc1LDQ2LjMxMyAxNy4xODgsNDYuMzEzIEMxOS42MjYsNDYuMzEzIDIxLjU2Myw0NC4zNzUgMjEuNTYzLDQyIEMyMS41NjMsMzkuNjI1IDE5LjYyNSwzNy42MjUgMTcuMjUsMzcuNjI1IEMxNC42ODcsMzcuNjI1IDEyLjg3NSwzOS41IDEyLjg3NSw0MiBMMTIuODc1LDQyIFogTTMwLDEyLjYyNSBDMjcuNSwxMi42ODggMjUuNjI1LDE0LjUgMjUuNTYyLDE2Ljg3NSBDMjUuNTYyLDE5LjI1IDI3LjUsMjEuMTg4IDI5LjkzNywyMS4xODggQzMyLjUsMjEuMTg4IDM0LjQzNywxOS4zMTMgMzQuNDM3LDE2Ljg3NSBDMzQuMzc0LDE0LjUgMzIuNDM3LDEyLjYyNSAyOS45OTksMTIuNjI1IEwzMCwxMi42MjUgWiBNMTcuMjUsMjEuMTg4IEMxOS43NSwyMS4xODggMjEuNTYzLDE5LjM3NSAyMS41NjMsMTYuODc1IEMyMS41NjMsMTQuNDM3IDE5Ljc1LDEyLjY4NyAxNy4yNSwxMi42MjUgQzE0Ljc1LDEyLjYyNSAxMi42ODcsMTQuNjI1IDEyLjc1LDE2LjkzOCBDMTIuODEzLDE5LjMxMyAxNC44MTMsMjEuMTg4IDE3LjI1LDIxLjE4OCBMMTcuMjUsMjEuMTg4IFoiIGlkPSJTaGFwZSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"); } .auth0-lock-social-button[data-provider^=github] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDY0IDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Z2l0aHViPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImdpdGh1YiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjQzNzY5NDk5ZS0xNSwzMi4yNSBDOC40Mzc2OTQ5OWUtMTUsMzYuNTYzIDAuODc1LDQwLjc1IDIuNTYzLDQ0LjYyNSBDNS45MzgsNTIuNjI1IDExLjU2Myw1OC4zMTMgMTkuNTAxLDYxLjc1IEMyMy40MzksNjMuNDM4IDI3LjU2NCw2NC4zMTMgMzEuOTM5LDY0LjMxMyBDMzYuMzE0LDY0LjMxMyA0MC40MzksNjMuNDM4IDQ0LjM3Nyw2MS43NSBDNTIuMTksNTguMzc1IDU3Ljg3Nyw1Mi42ODcgNjEuMzE1LDQ0LjYyNSBDNjMuMDAzLDQwLjYyNSA2My44NzgsMzYuNDM3IDYzLjg3OCwzMi4yNSBDNjMuODc4LDI4IDYzLjAwMywyMy44NzUgNjEuMzE1LDE5LjgxMiBDNTcuODc3LDExLjgxMiA1Mi4xOSw2LjE4NyA0NC4zNzcsMi44NzQgQzQwLjQzOSwxLjEyNCAzNi4zMTQsMC4zMTEgMzEuOTM5LDAuMzExIEMyNy41NjQsMC4zMTEgMjMuNDM5LDEuMTI0IDE5LjUwMSwyLjg3NCBDMTEuNTYzLDYuMjQ5IDUuOTM4LDExLjg3NCAyLjU2MywxOS44MTIgQzAuODc1LDIzLjc1IDAsMjcuODc1IDAsMzIuMjUgTDguNDM3Njk0OTllLTE1LDMyLjI1IFogTTUsMzIuMjUgQzUsMjguNjI1IDUuNjg4LDI1LjEyNSA3LjEyNSwyMS43NSBDOC41NjMsMTguNSAxMC41LDE1LjYyNSAxMi44NzUsMTMuMTg3IEMxNS4zNzUsMTAuNzQ5IDE4LjI1LDguODEyIDIxLjQzOCw3LjQzNyBDMjQuOTM4LDUuOTk5IDI4LjQzOCw1LjMxMiAzMS45MzgsNS4zMTIgQzM1LjUwMSw1LjMxMiAzOC45MzgsNiA0Mi4zNzYsNy40MzcgQzQ1LjY4OSw4Ljg3NSA0OC41NjQsMTAuNzUgNTAuOTM5LDEzLjE4NyBDNTMuNDM5LDE1LjYyNSA1NS4zMTQsMTguNSA1Ni42ODksMjEuNzUgQzU4LjEyNywyNS4xMjUgNTguODE0LDI4LjYyNSA1OC44MTQsMzIuMjUgQzU4LjgxNCwzOC4xODggNTcuMDY0LDQzLjU2MyA1My41NjQsNDguMjUgQzUwLjAwMSw1MyA0NS40MzksNTYuMzEzIDM5LjkzOSw1OC4zMTMgTDM5LjkzOSw1My4xODggQzM5LjkzOSw1MC42ODggMzkuMDY0LDQ4LjgxMyAzNy4zMTQsNDcuNjI1IEMzOS40MzksNDcuNDM3IDQxLjM3Nyw0NyA0My4xMjcsNDYuMzc1IEM0NS4yNTIsNDUuNjI1IDQ2Ljk0LDQ0LjU2MiA0OC4xOSw0My4xODcgQzUwLjU2NSw0MC43NDkgNTEuNjksMzcuMTI0IDUxLjY5LDMyLjM3NCBDNTEuNjksMjkuMTg2IDUwLjYyNywyNi40MzYgNDguNTAyLDI0LjE4NiBDNDkuNDQsMjEuNjIzIDQ5LjM3NywxOC45MzYgNDguMTg5LDE1Ljk5OCBMNDcuNDM5LDE1LjkzNSBDNDYuODE0LDE1LjgxIDQ1Ljg3NiwxNi4wNiA0NC41MDEsMTYuNTYgQzQzLjAwMSwxNy4xMjMgNDEuNTAxLDE3Ljk5OCAzOS44MTMsMTkuMTIzIEMzNy4xODgsMTguNDM1IDM0LjU2MywxOC4wNiAzMi4wNjMsMTguMDYgQzI5LjU2MywxOC4wNiAyNywxOC40MzUgMjQuMzc1LDE5LjEyMyBDMjIuMzEyLDE3Ljc0OCAyMC41LDE2LjgxIDE4LjgxMiwxNi4zMSBDMTguMTg3LDE2LjA2IDE3LjYyNCwxNS45OTcgMTcuMTg3LDE1Ljk5NyBMMTUuOTM3LDE1Ljk5NyBDMTQuNzQ5LDE4LjkzNSAxNC42MjQsMjEuNjIyIDE1LjYyNCwyNC4xODUgQzEzLjQ5OSwyNi40MzUgMTIuNDM2LDI5LjE4NSAxMi40MzYsMzIuMzczIEMxMi40MzYsMzguNDk4IDE0LjM3NCw0Mi43NDggMTguMjQ5LDQ1LjEyMyBDMTkuNzQ5LDQ2LjA2MSAyMS42MjQsNDYuNzQ4IDIzLjgxMiw0Ny4xMjMgQzI0LjkzNyw0Ny4zNzMgMjUuOTM3LDQ3LjU2MSAyNi44MTIsNDcuNjIzIEMyNS4xMjQsNDguNzQ4IDI0LjI0OSw1MC42MjMgMjQuMjQ5LDUzLjE4NiBMMjQuMjQ5LDU4LjMxMSBDMTguNTYxLDU2LjMxMSAxMy45MzYsNTIuOTk4IDEwLjM3NCw0OC4zNzMgQzYuODExLDQzLjYyMyA0Ljk5OSwzOC4yNDggNC45OTksMzIuMjQ4IEw1LDMyLjI1IFoiIGlkPSJTaGFwZSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"); } .auth0-lock-social-button[data-provider^=google] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjU3cHgiIGhlaWdodD0iNThweCIgdmlld0JveD0iMCAwIDU3IDU4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Z29vZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Imdvb2dsZSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yOS4wMDQsMzQuNDE0IEwyOS4wMDQsMjMuODEyIEw1NS42OCwyMy44MTIgQzU2LjA4LDI1LjYwOCA1Ni4zOTIsMjcuMjg4IDU2LjM5MiwyOS42NTQgQzU2LjM5Miw0NS45MjggNDUuNDc2LDU3LjQ5OCAyOS4wMzIsNTcuNDk4IEMxMy4zLDU3LjQ5OCAwLjUzMiw0NC43MyAwLjUzMiwyOC45OTggQzAuNTMyLDEzLjI2NiAxMy4zLDAuNDk4IDI5LjAzMiwwLjQ5OCBDMzYuNzI4LDAuNDk4IDQzLjE2OCwzLjMyIDQ4LjA5OCw3LjkzNiBMNDAuMDA0LDE1LjgwMiBDMzcuOTUyLDEzLjg2NCAzNC4zNiwxMS41ODQgMjkuMDMyLDExLjU4NCBDMTkuNTk4LDExLjU4NCAxMS45MDQsMTkuNDIyIDExLjkwNCwyOS4wMjYgQzExLjkwNCwzOC42MyAxOS42LDQ2LjQ2OCAyOS4wMzIsNDYuNDY4IEMzOS45NDgsNDYuNDY4IDQzLjk2NiwzOC45MTYgNDQuNzA2LDM0LjQ0IEwyOS4wMDIsMzQuNDQgTDI5LjAwMiwzNC40MTIgTDI5LjAwNCwzNC40MTQgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=instagram] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDY0IDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aW5zdGFncmFtPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Imluc3RhZ3JhbSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMDAwMDAwLCAwLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDYuMDYzLDIzLjY4OCBDNDcuOTM4LDI2LjMxMyA0OS4wNjMsMjkuNTYzIDQ5LjA2MywzMy4xMjYgQzQ5LjA2Myw0Mi4xMjYgNDEuODEzLDQ5LjM3NiAzMi44MTMsNDkuMzc2IEMyMy44MTMsNDkuMzc2IDE2LjUsNDIuMTI2IDE2LjUsMzMuMTI2IEMxNi41LDI5LjU2MyAxNy42MjUsMjYuMzEzIDE5LjUsMjMuNjg4IEwxLDIzLjY4OCBMMSw1Mi4yNTEgQzEsNTkuMTg5IDYuNjI1LDY0LjgxNCAxMy41NjMsNjQuODE0IEw1Mi4wNjMsNjQuODE0IEM1OS4wMDEsNjQuODE0IDY0LjY4OCw1OS4xODkgNjQuNjg4LDUyLjI1MSBMNjQuNjg4LDIzLjY4OCBMNDYuMDYzLDIzLjY4OCBMNDYuMDYzLDIzLjY4OCBaIE02NC42ODgsMTMuMzc1IEM2NC42ODgsNi40MzcgNTksMC44MTIgNTIuMDYzLDAuODEyIEwxNy42ODgsMC44MTIgTDE3LjY4OCwxNi42ODcgTDE1LjA2MywxNi42ODcgTDE1LjA2MywwLjgxMiBMMTMuMzEzLDAuODEyIEwxMy4zMTMsMTYuNjg3IEwxMC43NSwxNi42ODcgTDEwLjc1LDEuMTI0IEMxMC4xMjUsMS4zMTIgOS41LDEuNDk5IDguODc1LDEuNzQ5IEw4Ljg3NSwxNi42ODcgTDYuMzEyLDE2LjY4NyBMNi4zMTIsMy4xMjQgQzMuMTI0LDUuNDM3IDAuOTk5LDkuMTg3IDAuOTk5LDEzLjM3NCBMMC45OTksMjEuNjg3IEwyMS4xODcsMjEuNjg3IEMyNC4xMjUsMTguNjg3IDI4LjI1LDE2LjgxMiAzMi44MTIsMTYuODEyIEMzNy4zMTIsMTYuODEyIDQxLjQzNywxOC42ODcgNDQuMzc1LDIxLjY4NyBMNjQuNjg4LDIxLjY4NyBMNjQuNjg4LDEzLjM3NCBMNjQuNjg4LDEzLjM3NSBaIE01OC45MzgsOC4xMjUgTDU4LjkzOCwxNS4wNjMgQzU4LjkzOCwxNi4xODggNTgsMTcuMDYzIDU2Ljg3NSwxNy4wNjMgTDUwLjA2MiwxNy4wNjMgQzQ4Ljk5OSwxNy4wNjMgNDguMDYyLDE2LjE4OCA0OC4wNjIsMTUuMDYzIEw0OC4wNjIsOC4xMjUgQzQ4LjA2Miw3IDQ5LDYuMDYyIDUwLjA2Miw2LjA2MiBMNTYuODc1LDYuMDYyIEM1OCw2LjA2MiA1OC45MzgsNyA1OC45MzgsOC4xMjUgTDU4LjkzOCw4LjEyNSBaIE0yMC4yNSwzMy4xMjUgQzIwLjI1LDQwIDI1Ljg3NSw0NS42MjUgMzIuODEzLDQ1LjYyNSBDMzkuNjg4LDQ1LjYyNSA0NS4zMTMsNDAgNDUuMzEzLDMzLjEyNSBDNDUuMzEzLDI5LjM3NSA0My42ODgsMjYgNDEuMDYzLDIzLjY4NyBDNDAuMTI1LDIyLjg3NCAzOS4xMjUsMjIuMTg3IDM4LDIxLjY4NyBDMzYuMzc1LDIwLjkzNyAzNC42MjUsMjAuNTYyIDMyLjgxMiwyMC41NjIgQzMwLjkzNywyMC41NjIgMjkuMTg3LDIwLjkzNyAyNy42MjQsMjEuNjg3IEMyNi40OTksMjIuMTg3IDI1LjQzNiwyMi44NzUgMjQuNDk5LDIzLjY4NyBDMjEuODc0LDI2IDIwLjI0OSwyOS4zNzUgMjAuMjQ5LDMzLjEyNSBMMjAuMjUsMzMuMTI1IFogTTIzLjU2MywzMy4xMjUgQzIzLjU2MywyOCAyNy42ODgsMjMuODEyIDMyLjgxMywyMy44MTIgQzM3LjkzOCwyMy44MTIgNDIuMTI2LDI4IDQyLjEyNiwzMy4xMjUgQzQyLjEyNiwzOC4yNSAzNy45MzgsNDIuMzc1IDMyLjgxMyw0Mi4zNzUgQzI3LjY4OCw0Mi4zNzUgMjMuNTYzLDM4LjI1IDIzLjU2MywzMy4xMjUgTDIzLjU2MywzMy4xMjUgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=linkedin] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY3cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDY3IDY0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bGlua2VkaW48L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0ibGlua2VkaW4iIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMC42ODcsNy4zNzUgQzAuNjg3LDkuNSAxLjM3NSwxMS4yNSAyLjg3NSwxMi42ODggQzQuMzEzLDE0LjA2MyA2LjE4OCwxNC44MTMgOC41NjMsMTQuODEzIEw4LjYyNiwxNC44MTMgQzExLjA2NCwxNC44MTMgMTMuMDAxLDE0LjA2MyAxNC41MDEsMTIuNjg4IEMxNS45MzksMTEuMzEzIDE2LjY4OSw5LjYyNSAxNi42ODksNy41NjMgQzE2LjY4OSw1LjMxMyAxNS45MzksMy40MzggMTQuNDM5LDIuMDYzIEMxMy4wMDEsMC42ODggMTEuMDY0LDguODgxNzg0MmUtMTYgOC43NTEsOC44ODE3ODQyZS0xNiBDNi4zNzYsOC44ODE3ODQyZS0xNiA0LjQzOCwwLjY4OCAyLjkzOCwyLjA2MyBDMS40MzgsMy41MDEgMC42ODgsNS4yNTEgMC42ODgsNy4zNzYgTDAuNjg3LDcuMzc1IFogTTEuNSw2My4zNzUgTDE1Ljc1LDYzLjM3NSBMMTUuNzUsMjAuNjI1IEwxLjUsMjAuNjI1IEwxLjUsNjMuMzc1IEwxLjUsNjMuMzc1IFogTTIzLjU2Myw2My4zNzUgQzIzLjY4OCw1MC41IDIzLjc1MSw0MC41IDIzLjc1MSwzMy4zNzUgQzIzLjc1MSwyNi4yNSAyMy42ODgsMjIgMjMuNTYzLDIwLjYyNSBMMzcuODEzLDIwLjYyNSBMMzcuODEzLDI2LjY4OCBMMzcuNzUsMjYuODEzIEwzNy44MTMsMjYuODEzIEwzNy44MTMsMjYuNjg4IEM0MC44NzYsMjEuOTM4IDQ1LjE4OCwxOS41NjMgNTAuNjg4LDE5LjU2MyBDNTUuNTYzLDE5LjU2MyA1OS41MDEsMjEuMjUxIDYyLjUwMSwyNC41MDEgQzY1LjUwMSwyNy43NTEgNjcuMDAxLDMyLjU2NCA2Ny4wMDEsMzguODc2IEw2Ny4wMDEsNjMuMzc2IEw1Mi43NTEsNjMuMzc2IEw1Mi43NTEsNDAuNTAxIEM1Mi43NTEsMzQuMDYzIDUwLjM3NiwzMC44NzYgNDUuNjI2LDMwLjg3NiBDNDMuNzUxLDMwLjg3NiA0Mi4yNTEsMzEuMzc2IDQxLjA2MywzMi4zNzYgQzM5LjgxMywzMy4zNzYgMzguOTM4LDM0LjU2NCAzOC4zMTMsMzYuMDY0IEMzOCwzNi44NzcgMzcuODEzLDM4LjAwMiAzNy44MTMsMzkuNTAyIEwzNy44MTMsNjMuMzc3IEwyMy41NjMsNjMuMzc3IEwyMy41NjMsNjMuMzc1IFoiIGlkPSJTaGFwZSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"); } .auth0-lock-social-button[data-provider^=miicard] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjkxcHgiIGhlaWdodD0iNjFweCIgdmlld0JveD0iMCAwIDkxIDYxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bWlpY2FyZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJtaWljYXJkIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTQxLjUsNS42ODggQzY0LjE4OCwyLjU2MyA3NywwLjg3NSA3Ny42MjUsMC44NzUgQzc5LjQzOCwwLjg3NSA4MC44NzUsMS4zMTMgODIuNDM4LDIuMzc1IEM4My44MTMsMy4zNzUgODUuMDAxLDUuMTg4IDg1LjM3Niw2LjgxMyBDODUuNjg5LDguMzc2IDkwLjMxNCw0Mi41NjMgOTAuMzE0LDQzLjUwMSBDOTAuMzE0LDQ3LjE4OSA4Ny40MzksNTAuNTY0IDgzLjgxNCw1MS4xMjYgQzgwLjgxNCw1MS42MjYgMTMuMTg5LDYwLjc1MSAxMi41NjQsNjAuNzUxIEM5LjE4OSw2MC43NTEgNi4zMTQsNTguNjI2IDUuMTg5LDU1LjM3NiBDNS4wMDEsNTQuOTM4IDQuMTI2LDQ4LjYyNiAyLjUwMSwzNi44MTMgQzAuMjUxLDIwLjU2MyAwLjA2MywxOC43NSAwLjA2MywxNy43NSBDMC4xMjYsMTYuNSAwLjQzOCwxNS41NjIgMC45MzgsMTQuNSBDMS45MzgsMTIuNjg3IDMuNzUxLDExLjE4NyA1LjY4OCwxMC42ODcgQzYuMDYzLDEwLjU2MiAyMi4xODgsOC4zMTIgNDEuNTAxLDUuNjg3IEw0MS41LDUuNjg4IFogTTYyLjU2Myw4LjE4OCBDNjEuMzEzLDcuODEzIDYwLjEyNSw4LjA2MyA1OS4xODgsOS4wMDEgQzU4LjMxMyw5Ljg3NiA1OC4wNjMsMTEuMDAxIDU4LjQzOCwxMi4zMTQgQzU4LjY4OCwxMy4xODkgNTkuNTYzLDE0LjA2NCA2MC4zNzYsMTQuMjUyIEM2MS42ODksMTQuNjI3IDYzLjAwMSwxNC4zMTUgNjMuODc2LDEzLjM3NyBDNjUuMzE0LDExLjY4OSA2NC42MjYsOC44NzcgNjIuNTYzLDguMTg5IEw2Mi41NjMsOC4xODggWiBNNzguNjI1LDguMTg4IEM3Ny4zMTIsNy44MTMgNzYuMTI1LDguMDYzIDc1LjI1LDkuMDAxIEM3NC4zMTIsOS44NzYgNzQuMDYyLDExLjAwMSA3NC40MzcsMTIuMzE0IEM3NC42ODcsMTMuMTg5IDc1LjU2MiwxNC4wNjQgNzYuMzc1LDE0LjI1MiBDNzcuNzUsMTQuNjI3IDc5LjA2MywxNC4zMTUgNzkuODc1LDEzLjM3NyBDODEuMzc1LDExLjY4OSA4MC42ODgsOC44NzcgNzguNjI1LDguMTg5IEw3OC42MjUsOC4xODggWiBNMjQuMzEzLDE4LjU2MyBDMjMuOTM4LDE4LjQzOCAyMy4wNjMsMTguMzEzIDIyLjI1LDE4LjMxMyBDMTguNTYyLDE4LjE4OCAxNS42ODcsMTkuNjg4IDEzLjU2MiwyMi45MzggQzEzLjM3NCwyMy4yNTEgMTMuMzc0LDIzLjE4OCAxMy4xODcsMjAuMDYzIEwxMy4xMjQsMTguODEzIEwxMC44MTEsMTguODEzIEM4LjgxMSwxOC44NzYgOC40OTgsMTguODc2IDguNTYxLDE5LjA2MyBDOC42MjQsMTkuMTI2IDguNjI0LDI1LjM3NiA4LjY4NiwzMi44NzYgTDguNzQ5LDQ2LjUwMSBMMTMuODc0LDQ2LjUwMSBMMTMuOTk5LDI4LjA2MyBMMTQuMjQ5LDI3LjQzOCBDMTQuODEyLDI2LjA2MyAxNS4zNzQsMjUuMjUgMTYuMTI0LDI0LjQzOCBDMTguMDYyLDIyLjUgMjAuNjI0LDIyLjA2MyAyMi44MTIsMjMuMTg4IEMyNC4xMjUsMjMuODEzIDI1LjEyNSwyNS4yNTEgMjUuNjg3LDI3LjA2MyBDMjUuODc1LDI3LjkzOCAyNS44NzUsMjguMTI2IDI1LjkzNywzNy4yNTEgTDI2LDQ2LjU2NCBMMzEuMDYzLDQ2LjU2NCBMMzEuMTI2LDM3LjI1MSBDMzEuMTI2LDI4LjAwMSAzMS4xMjYsMjguMDAxIDMxLjM3NiwyNy4yNTEgQzMxLjg3NiwyNS43NTEgMzMuMDY0LDI0LjI1MSAzNC4yNTEsMjMuNTAxIEMzNS40MzksMjIuNjg4IDM3LjEyNiwyMi40MzggMzguNTAxLDIyLjY4OCBDNDAuNjI2LDIzLjEyNiA0Mi4wNjQsMjQuNjI2IDQyLjgxNCwyNy4zMTMgQzQzLjA2NCwyOC4xODggNDMuMDY0LDI4LjMxMyA0My4xMjcsMzcuMzc2IEw0My4xOSw0Ni41MDEgTDQ4LjMxNSw0Ni41MDEgTDQ4LjMxNSwzNy41NjMgQzQ4LjMxNSwyOC4xODggNDguMjUyLDI3LjY4OCA0Ny43NTIsMjUuNjg4IEM0Ni44MTQsMjEuODc1IDQ0LjYyNywxOS40MzggNDEuMzE0LDE4LjUgQzQwLjI1MSwxOC4yNSAzNy41NjQsMTguMjUgMzYuNTAxLDE4LjUgQzM1LjQzOCwxOC44MTMgMzQuMjUxLDE5LjMxMyAzMy4zMTMsMTkuOTM4IEMzMi4zNzUsMjAuNjI2IDMwLjkzOCwyMi4xMjYgMzAuMzEzLDIzLjAwMSBMMjkuODc1LDIzLjY4OSBMMjkuNSwyMi44NzYgQzI4LjQzNywyMC42ODggMjYuNSwxOS4xMjYgMjQuMzEyLDE4LjU2MyBMMjQuMzEzLDE4LjU2MyBaIE02NC4xMjUsMzIuNjg4IEw2NC4xMjUsMTguODc1IEw2MS41LDE4LjgxMiBDNTkuNSwxOC44MTIgNTguOTM3LDE4LjgxMiA1OC44NzUsMTguOTM3IEM1OC44MTMsMTkuMDYyIDU4LjgxMiwyNS4yNSA1OC44MTIsMzIuODEyIEw1OC44NzUsNDYuNSBMNjQuMTI1LDQ2LjUgTDY0LjEyNSwzMi42ODcgTDY0LjEyNSwzMi42ODggWiBNODAuMTI1LDMyLjY4OCBMODAuMTI1LDE4Ljg3NSBMNzcuNTYyLDE4LjgxMiBDNzUuNDk5LDE4LjgxMiA3NC45MzcsMTguODEyIDc0Ljg3NCwxOC45MzcgTDc0Ljg3NCw0Ni41IEw4MC4xMjQsNDYuNSBMODAuMTI0LDMyLjY4NyBMODAuMTI1LDMyLjY4OCBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="); } .auth0-lock-social-button[data-provider^=oauth2] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxNTAuMSAxNjcuOCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTUwLjEgMTY3LjgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIzMSwxMzUuOCAzMC45LDEzNS44IDc1LjEsMTY3LjggMTE5LjIsMTM1LjggNzUuMSwxMDMuNyAJIi8+DQoJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTMuNyw1MS45TDMuNyw1MS45Qy02LjYsODMuNiw1LjMsMTE3LjIsMzEsMTM1LjhsMCwwbDE2LjktNTEuOUwzLjcsNTEuOWw1NC41LDBMNzUuMSwwbDAsMEgyMC41TDMuNyw1MS45eg0KCQkiLz4NCgk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTQ2LjUsNTEuOUwxNDYuNSw1MS45TDE0Ni41LDUxLjlMMTI5LjYsMEg3NS4xbDAsMGwxNi45LDUxLjlMMTQ2LjUsNTEuOWwtNDQuMSwzMi4xbDE2LjgsNTEuOQ0KCQlDMTQ2LjIsMTE2LjIsMTU2LjMsODIsMTQ2LjUsNTEuOXoiLz4NCjwvZz4NCjwvc3ZnPg0K"); } .auth0-lock-social-button[data-provider^=paypal] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYzcHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDYzIDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+cGF5cGFsPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InBheXBhbCIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDU3LjY4OCBMMTYuNDM4LDU3LjY4OCBMMjAuNTAxLDM4Ljc1IEwzMi4xODksMzguNzUgQzM3LjkzOSwzOC43NSA0Mi44NzcsMzcuMTI1IDQ3LjEyNywzMy43NSBDNTEuMzc3LDMwLjQzNyA1NC4xMjcsMjUuODc1IDU1LjM3NywyMC4wNjIgQzU2LjAwMiwxNi43NDkgNTYuMDAyLDEzLjg3NCA1NS4zNzcsMTEuNDM3IEM1NC43NTIsOSA1My42MjcsNi45OTkgNTIuMDY0LDUuMzc0IEM1MC40MzksMy44MTEgNDguNjI2LDIuNjI0IDQ2LjYyNiwxLjgxMSBDNDQuNjI2LDEuMDYxIDQyLjU2MywwLjY4NiA0MC40MzgsMC42ODYgTDEyLjQzOCwwLjY4NiBMMCw1Ny42ODggWiBNNi4zNzUsNjQuNjg4IEw3LjEyNSw2MS41NjMgTDIwLjkzOCw2MS41NjMgTDI0LjkzOCw0Mi42ODggTDM2LjY4OCw0Mi42ODggQzQyLjM3Niw0Mi42ODggNDcuMzc2LDQxIDUxLjYyNiwzNy42ODggQzU1Ljg3NiwzNC4zNzYgNTguNjI2LDI5LjgxMyA1OS44MTQsMjQgQzYwLjc1MiwxOS44NzUgNjAuNTAyLDE2LjI1IDU5LjA2NCwxMy4xMjUgQzYyLjEyNywxNi42ODggNjMuMDAyLDIxLjM3NSA2MS44MTQsMjcuMTI1IEM2MC41NjQsMzIuOTM4IDU3LjgxNCwzNy41IDUzLjU2NCw0MC44MTMgQzQ5LjM3Niw0NC4xMjYgNDQuMzc2LDQ1LjgxMyAzOC42MjYsNDUuODEzIEwyNi44NzYsNDUuODEzIEwyMi44NzYsNjQuNjg4IEw2LjM3Niw2NC42ODggTDYuMzc1LDY0LjY4OCBaIE0yMi44NzUsMjcuODc1IEwyNi4zNzUsMTIuMjUgTDM0LjM3NSwxMi4yNSBDMzUuNzUsMTIuMjUgMzYuOTM4LDEyLjYyNSAzNy45MzgsMTMuMzc1IEMzOC45MzgsMTQuMTI1IDM5LjYyNiwxNS4xMjUgMzkuOTM4LDE2LjM3NSBDMzkuMzEzLDE2LjI1IDM4LjkzOCwxNi4xODcgMzguODc1LDE2LjE4NyBMMzAuODc1LDE2LjE4NyBMMjguMTg3LDI3Ljg3NSBMMjIuODc0LDI3Ljg3NSBMMjIuODc1LDI3Ljg3NSBaIE0zMC44NzUsMjcuODEzIEwzMi43NSwxOS4zMTMgTDQwLjA2MywxOS4zMTMgQzQwLjA2MywxOS4zNzYgNDAuMDYzLDE5LjUwMSA0MCwxOS42ODggQzM5LjkzNywxOS44NzUgMzkuOTM3LDIwLjAwMSAzOS45MzcsMjAuMDYzIEMzOS40MzcsMjIuMTg4IDM4LjM3NCwyMy45MzggMzYuNTYyLDI1LjQzOCBDMzQuODEyLDI2LjkzOCAzMi44NzQsMjcuNzUxIDMwLjg3NCwyNy44MTMgTDMwLjg3NSwyNy44MTMgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=planningcenter] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYzcHgiIGhlaWdodD0iNjNweCIgdmlld0JveD0iMCAwIDYzIDYzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+cGxhbm5pbmdjZW50ZXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0icGxhbm5pbmdjZW50ZXIiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNNC4zMTMsNjEuNSBMNi4zMTMsNjIuNDM4IEwzMS40MzgsNjIuNDM4IEM1OC43NTEsNjIuNDM4IDU4LjMxMyw2Mi41MDEgNjAuNjg4LDU5LjkzOCBDNjEuMzc2LDU5LjE4OCA2Mi4xMjYsNTcuODEzIDYyLjM3Niw1Ni44MTMgQzYyLjY4OSw1NS42MjUgNjIuODc2LDQ3IDYyLjg3NiwzMS41NjMgQzYyLjg3NiwxMi4yNSA2Mi43NTEsNy43NSA2Mi4xODgsNS44NzUgQzYxLjU2MywzLjYyNSA2MCwxLjgxMiA1OC4wNjMsMC43NSBDNTcuMzc1LDAuMzc1IDQ5LjUsMC4yNSAzMS41NjMsMC4yNSBDNC4xODgsMC4yNSA0Ljg3NSwwLjE4NyAyLjYyNSwyLjYyNSBDMC4xODcsNS4xODggMC4xODcsNS4xMjUgMC4xODcsMzEuNzUgTDAuMTg3LDU2LjM3NSBMMS4yNSw1OC4zNzUgQzIsNTkuODc1IDIuODEzLDYwLjY4OCA0LjMxMyw2MS41IEw0LjMxMyw2MS41IFogTTIwLDU0LjEyNSBDMTkuNzUsNTUuMTg4IDE5LjY4Nyw1NS4xODggMTMuODc1LDU1LjE4OCBDMTAuNjg3LDU1LjE4OCA3LjkzNyw1NS4wNjMgNy44MTIsNTQuODc1IEM3LjYyNCw1NC43NSA3LjQ5OSw0NC4xODcgNy40OTksMzEuNSBMNy40OTksOC40MzcgTDU1LjE4Nyw4LjQzNyBMNTUuMTg3LDU1LjE4NyBMNDMuNDM3LDU1LjE4NyBMNDIuNTYyLDUzLjQ5OSBDNDEuNDM3LDUxLjI0OSA0MC4zNzQsNTAuOTk5IDMwLjM3NCw1MS4xODYgQzIxLjQzNiw1MS4zMTEgMjAuNjI0LDUxLjU2MSAxOS45OTksNTQuMTI0IEwyMCw1NC4xMjUgWiBNMjkuMzc1LDQ1LjM3NSBDMzAuNjI1LDQ2LjI1IDMxLjY4OCw0Ni4zMTMgMzMuMDYzLDQ1LjYyNSBDMzQuNjI2LDQ0LjgxMiAzNC43NTEsNDQuMzc1IDM0Ljc1MSwzOS44NzUgQzM0Ljc1MSwzNy41NjIgMzQuOTM5LDM1LjY4NyAzNS4xMjYsMzUuNjg3IEMzNS4zNzYsMzUuNjg3IDM3LjE4OSwzNi41NjIgMzkuMjUxLDM3LjY4NyBDNDEuMjUxLDM4Ljg3NSA0My40MzksMzkuNzUgNDMuOTM5LDM5Ljc1IEM0NS42MjcsMzkuNzUgNDcuNTY0LDM3LjQzNyA0Ny4zNzcsMzUuNjg3IEM0Ny4yNTIsMzQuMjQ5IDQ2Ljg3NywzMy45OTkgNDMuMDAyLDMxLjg3NCBDMzguMTg5LDI5LjI0OSAzOC4xMjcsMjkuNjI0IDQzLjgxNSwyNi40MzYgQzQ2LjYyOCwyNC45MzYgNDcuMjUzLDI0LjMxMSA0Ny4zNzgsMjMuMzExIEM0Ny41NjYsMjEuODExIDQ1LjM3OCwxOC44NzMgNDQuMTI4LDE4Ljg3MyBDNDMuNjksMTguODczIDQxLjM3OCwxOS45MzYgMzkuMDAzLDIxLjE4NiBMMzQuNzUzLDIzLjQ5OSBMMzQuNzUzLDE5LjI0OSBDMzQuNzUzLDEzLjgxMSAzNC40NCwxMy4zMTEgMzEuMTI4LDEzLjQ5OSBMMjguNjI4LDEzLjYyNCBMMjguMzc4LDE4LjQ5OSBMMjguMTI4LDIzLjQzNyBMMjQuMzc4LDIxLjEyNCBDMTkuNTAzLDE4LjI0OSAxOC41MDMsMTguMTg2IDE2LjY5LDIwLjk5OSBDMTUuMDAyLDIzLjQ5OSAxNS4xOSwyMy45OTkgMTguNTAzLDI1Ljg3NCBDMTkuODE2LDI2LjU2MiAyMS42MjgsMjcuNjI0IDIyLjYyOCwyOC4yNDkgTDI0LjM3OCwyOS4zNzQgTDIwLjMxNSwzMS44MTIgQzE4LjA2NSwzMy4xODcgMTYuMDAyLDM0LjU2MiAxNS43NTIsMzQuODc1IEMxNS4zMTQsMzUuMzc1IDE1LjUwMiwzNiAxNi41NjUsMzcuNjI1IEMxOC4zMTUsNDAuNDM4IDE5LjYyOCw0MC41IDI0LjEyOCwzNy42ODggQzI1Ljk0MSwzNi41NjMgMjcuNjkxLDM1LjY4OCAyNy45NDEsMzUuNjg4IEMyOC4xOTEsMzUuNjg4IDI4LjM3OSwzNy41NjMgMjguMzc5LDQwLjE4OCBDMjguMzc5LDQ0LjM3NiAyOC40NDIsNDQuNzUxIDI5LjM3OSw0NS4zNzYgTDI5LjM3NSw0NS4zNzUgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=renren] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjYxcHgiIGhlaWdodD0iMzVweCIgdmlld0JveD0iMCAwIDYxIDM1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+cmVucmVuPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InJlbnJlbiIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMC4zNzUsMC40MzggQzIwLjY4OCw3LjEyNiAxOS41LDEzLjAwMSAyMS43NSwxOC41MDEgQzIyLjYyNSwyMC41NjQgMjMuODEzLDIyLjU2NCAyNS4zMTMsMjQuMjUxIEMyOS42ODgsMjkuMjUxIDMyLjE4OCwyOC44NzYgMzYuNDM4LDIzLjU2MyBDNDEuODEzLDE2Ljc1IDQwLjAwMSw5IDQwLjMxMywwLjU2MyBDMzcuNDM4LDIuMTI2IDM0LjkzOCwzLjA2MyAzMi45MzgsNC42ODggQzMwLjkzOCw2LjI1MSAyOS44NzUsNi40MzggMjcuODc1LDQuNjI1IEMyNiwyLjkzNyAyMy4zNzUsMi4wNjIgMjAuMzc1LDAuNDM3IEwyMC4zNzUsMC40MzggWiBNNC4xMjUsMjguMTg4IEMxMy44NzUsMjMuMzEzIDE1LjI1LDEzLjEyNSAxMy42ODgsMS4zNzUgQzEuNjI1LDMuMTg4IC0zLjgxMiwxOC4xODggNC4xMjUsMjguMTg4IEw0LjEyNSwyOC4xODggWiBNNDcuMTg4LDEuMjUgQzQ3LjE4OCw1LjkzOCA0Ni43NSwxMC41NjMgNDcuMzEzLDE1IEM0Ny45MzgsMjAuMTI1IDUwLjYyNiwyNC4zNzUgNTUuMDYzLDI3LjM3NSBDNTYuNDM4LDI4LjMxMyA1Ny4xMjYsMjguMTI1IDU4LjA2MywyNi42ODcgQzY0LjE4OCwxNi44MTIgNTguODc2LDMuODc0IDQ3LjE4OCwxLjI0OSBMNDcuMTg4LDEuMjUgWiBNNDMuNjg4LDI0LjQzOCBDNDEuNjI1LDI3LjAwMSAzOS4yNSwyOS45MzggMzYuNzUsMzMuMDYzIEM0MS41LDM1LjE4OCA0Ni4xODgsMzUuMDYzIDUwLjc1LDMzLjA2MyBDNDguMjUsMzAuMDYzIDQ1Ljg3NSwyNy4xMjUgNDMuNjg3LDI0LjQzOCBMNDMuNjg4LDI0LjQzOCBaIE0yNC4xODgsMzMuMDYzIEMyMS42MjUsMjkuODc1IDE5LjMxMywyNy4wNjMgMTcuMjUsMjQuNSBDMTUuMDYyLDI3LjEyNSAxMi43NSwzMC4wNjMgMTAuMzEyLDMzLjA2MyBDMTUsMzUuMDYzIDE5LjY4NywzNS4xMjYgMjQuMTg3LDMzLjA2MyBMMjQuMTg4LDMzLjA2MyBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="); } .auth0-lock-social-button[data-provider^=salesforce] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjVweCIgdmlld0JveD0iMCAwIDY0IDY1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2FsZXNmb3JjZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJzYWxlc2ZvcmNlIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMTUuODc1IEMwLDE2LjEyNSAwLjA2MywxNi41IDAuMTI1LDE3IEwxMC42MjUsNjEgQzEwLjg3NSw2Mi4wNjMgMTEuNDM4LDYyLjkzOCAxMi4zMTMsNjMuNjI1IEMxMy4xODgsNjQuMjUgMTQuMTg4LDY0LjYyNSAxNS4yNTEsNjQuNjI1IEMxNS44NzYsNjQuNjI1IDE2LjU2NCw2NC41NjIgMTcuMjUxLDY0LjM3NSBDMTguMDAxLDY0LjI1IDE4LjgxNCw2NC4wNjIgMTkuNzUxLDYzLjc1IEMyMC42ODksNjMuNSAyMS4zMTQsNjMuMzEyIDIxLjc1MSw2My4xODcgQzE4LjAwMSw2MS45MzcgMTQuOTM4LDYwLjYyNCAxMi41NjMsNTkuMzEyIEwxNy42MjYsNDcuODc0IEMxOS4zNzYsNDkuNDk5IDIxLjYyNiw1MC43NDkgMjQuMzE0LDUxLjc0OSBDMjcuMDAyLDUyLjY4NyAyOS41NjQsNTMuMTg3IDMyLjA2NCw1My4xODcgQzM0LjAwMiw1My4xODcgMzUuNjg5LDUyLjYyNCAzNy4xODksNTEuNjI0IEMzOC42ODksNTAuNjI0IDM5LjQzOSw0OS4xODYgMzkuNDM5LDQ3LjMxMSBDMzkuNDM5LDQ2LjEyMyAzOS4wNjQsNDQuOTM2IDM4LjMxNCw0My44MTEgQzM3LjU2NCw0Mi42ODYgMzYuNTY0LDQxLjY4NiAzNS4zNzYsNDAuODExIEMzNC4xMjYsMzkuOTM2IDMzLjAwMSwzOS4yNDggMzEuODc2LDM4LjY4NiBDMzAuNzUxLDM4LjA2MSAyOS42MjYsMzcuNTYxIDI4LjQzOCwzNy4xMjMgQzE3LjYyNSwzMi45MzUgMTIuMjUsMjYuODczIDEyLjI1LDE4Ljk5OCBDMTIuMjUsMTQuODczIDEzLjU2MywxMS4zMSAxNi4yNSw4LjI0OCBMMy42MjUsMTEuMjQ4IEMyLjU2MiwxMS40OTggMS42ODcsMTIuMDYxIDEsMTIuOTM2IEMwLjMxMywxMy44MTEgMCwxNC44MTEgMCwxNS44NzQgTDAsMTUuODc1IFogTTI2LjgxMywxOC44MTMgQzI2LjgxMywyMi4zMTMgMzAuNDM4LDI1LjMxMyAzNy43NTEsMjcuNzUxIEM0Mi42MjYsMjkuMzc2IDQ2LjU2NCwzMS42ODkgNDkuNTY0LDM0Ljc1MSBDNTIuNTY0LDM3LjgxMyA1NC4wNjQsNDEuNjg5IDU0LjA2NCw0Ni40MzkgQzU0LjA2NCw0OS45MzkgNTMuMDY0LDUzLjE4OSA1MS4wNjQsNTYuMTg5IEw2MC4zNzcsNTQuMDAxIEM2MS40NCw1My43NTEgNjIuMzE1LDUzLjE4OCA2My4wMDIsNTIuMzEzIEM2My42ODksNTEuNDM4IDY0LjAwMiw1MC40MzggNjQuMDAyLDQ5LjM3NSBDNjQuMDAyLDQ5LjEyNSA2My45MzksNDguNzUgNjMuODc3LDQ4LjI1IEw1My4zNzcsNC4yNSBDNTMuMTI3LDMuMTg3IDUyLjU2NCwyLjMxMiA1MS42ODksMS42MjUgQzUwLjgxNCwwLjkzOCA0OS44MTQsMC42MjUgNDguNzUxLDAuNjI1IEM0OC4xODgsMC42MjUgNDcuMjUxLDAuNzUgNDYuMDYzLDEgQzQ0LjgxMywxLjI1IDQzLjMxMywxLjYyNSA0MS41LDIuMTg4IEMzOS42MjUsMi42ODggMzguNjg3LDIuOTM4IDM4LjU2MiwyLjkzOCBDNDIuNjg3LDMuNTYzIDQ2LjYyNSw0LjkzOCA1MC41LDYuOTM4IEw0Ni41NjIsMTcuODEzIEM0NS40MzcsMTYuNjI1IDQzLjU2MiwxNS42MjUgNDAuOTM3LDE0Ljg3NSBDMzguMzc0LDE0LjEyNSAzNS45OTksMTMuNzUgMzMuOTM3LDEzLjc1IEMzMi4xODcsMTMuNzUgMzAuNTYyLDE0LjE4OCAyOS4wNjIsMTUuMDYzIEMyNy41NjIsMTUuOTM4IDI2LjgxMiwxNy4xODggMjYuODEyLDE4LjgxMyBMMjYuODEzLDE4LjgxMyBaIiBpZD0iU2hhcGUiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="); } .auth0-lock-social-button[data-provider^=shopify] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjU1cHgiIGhlaWdodD0iNjNweCIgdmlld0JveD0iMCAwIDU1IDYzIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c2hvcGlmeTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJzaG9waWZ5IiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIxLjEyNSwxLjY4OCBDMjQuMTI1LDAuMTg4IDI1LjgxMywwLjEyNSAyNy4zNzUsMS4zNzUgQzI4LDEuODc1IDI5LjE4OCwyLjQzOCAzMC4wNjMsMi41NjMgQzMxLjc1MSwyLjkzOCAzNC4yNTEsNS40MzggMzQuODEzLDcuMTg4IEMzNS4xMjYsOC4xMjYgMzUuMzc2LDguMjUxIDM2LjY4OCw4LjAwMSBDMzcuOTM4LDcuNzUxIDM4LjQzOCw3LjkzOCA0MC4xMjYsOS42MjYgQzQxLjg3NiwxMS4zNzYgNDIuNTAxLDExLjY4OSA0NC45MzksMTEuODc2IEM0Ny4xODksMTIuMTI2IDQ3LjY4OSwxMi4zMTQgNDcuODc3LDEzLjE4OSBDNDguMDAyLDEzLjgxNCA0OC44NzcsMTkuNDM5IDQ5LjgxNSwyNS44MTQgQzUwLjc1MywzMi4xODkgNTIuMTksNDEuNzUyIDUyLjk0LDQ3LjEyNyBDNTMuNzUzLDUyLjQ0IDU0LjM3OCw1Ny4xMjcgNTQuMzc4LDU3LjU2NSBDNTQuMzc4LDU4LjEyOCA1Mi4zMTUsNTguNzUzIDQ1LjAwMyw2MC4zMTUgTDM1LjU2NSw2Mi4zNzggTDE4LjMxNSw1OS4xMjggQzguNzUyLDU3LjM3OCAwLjgxNSw1NS43NTMgMC42MjcsNTUuNTY1IEMwLjM3Nyw1NS4zNzcgMC43NTIsNTEuMDAyIDEuNDQsNDUuODE1IEMyLjEyOCw0MC42OSAzLjEyOCwzMy4wMDIgMy42MjgsMjguNzUyIEM1LjEyOCwxNi43NTIgNC41NjYsMTguMDY0IDguNjkxLDE2LjgxNCBMMTIuMTI5LDE1LjY4OSBMMTMuNTA0LDEyLjAwMSBDMTUuMzE3LDYuODc2IDE3Ljk0MiwzLjMxMyAyMS4xMjksMS42ODggTDIxLjEyNSwxLjY4OCBaIE0yNC4xODgsNC40MzggTDI1LjkzOCwyLjg3NSBMMjQuNTYzLDIuODc1IEMyMi4xODgsMi44NzUgMTkuMzc1LDUuMDYzIDE3LjMxMyw4LjY4OCBDMTYuMTg4LDEwLjYyNiAxNS4wNjMsMTMuOTM4IDE1LjM3NSwxNC4yNTEgQzE1LjU2MywxNC40MzkgMTYuNSwxNC4yNTEgMTcuNjI1LDE0LjAwMSBDMTkuMzc1LDEzLjU2MyAxOS42MjUsMTMuMjUxIDIwLjEyNSwxMS40MzggQzIwLjkzOCw4LjMxMyAyMi4yNSw2LjA2MyAyNC4xODgsNC40MzggTDI0LjE4OCw0LjQzOCBaIE0yOC4zNzUsMjIuNTYzIEMyOC4xMjUsMjIuMzEzIDI2LjUsMjIgMjQuODEyLDIxLjkzOCBDMTcuMzEyLDIxLjUgMTEuOTM3LDI2LjAwMSAxMS44NzQsMzIuODEzIEMxMS44NzQsMzUuOTM4IDEyLjgxMiwzNy44NzYgMTUuNDk5LDM5Ljg3NiBDMjEuMzEyLDQ0LjUwMSAxNy42ODcsNDkuMDY0IDExLjQ5OSw0NS4wMDEgQzEwLjEyNCw0NC4xMjYgMTAuMTI0LDQ0LjE4OCA5LjI0OSw0Ny4wMDEgQzguNTYxLDQ5LjI1MSA4LjU2MSw0OS4yNTEgOS45OTksNTAuNTAxIEMxMC44MTIsNTEuMTg5IDEyLjYyNCw1Mi4wMDEgMTQuMTI0LDUyLjQzOSBDMjAuNDM3LDU0LjMxNCAyNS41NjIsNTEuMDAxIDI2LjI0OSw0NC42MjYgQzI2LjY4Nyw0MC43NTEgMjUuMTI0LDM3LjkzOCAyMC43NDksMzQuNzUxIEMxOC42MjQsMzMuMTg4IDE4LjEyNCwzMi41NjMgMTguMTI0LDMxLjM3NiBDMTguMTI0LDI5LjMxMyAxOS45MzcsMjguMzEzIDIyLjg3NCwyOC42MjYgQzI0LjEyNCwyOC43NTEgMjUuNDk5LDI5LjAwMSAyNS44NzQsMjkuMTg5IEMyNi40MzcsMjkuMzc3IDI2Ljg3NCwyOC43NTEgMjcuNzQ5LDI2LjE4OSBDMjguMzEyLDI0LjMxNCAyOC41NjIsMjIuNzUxIDI4LjM3NCwyMi41NjQgTDI4LjM3NSwyMi41NjMgWiIgaWQ9IlNoYXBlIiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="); } .auth0-lock-social-button[data-provider^=soundcloud] .auth0-lock-social-button-icon {   background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9Ijc0cHgiIGhlaWdodD0iMzZweCIgdmlld0JveD0iMCAwIDc0IDM2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy40ICgxNTU4OCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+c291bmRjbG91ZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPgogICAgICAgIDxnIGlkPSJzb3VuZGNsb3VkIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsMjYuMjUgQzAsMjkuMTI1IDAuMjUsMzAuNjg4IDAuODEzLDMxIEMxLjA2MywzMC44NzUgMS4zMTMsMzAuMTg3IDEuNTAxLDI5IEMxLjY4OSwyNy43NSAxLjgxNCwyNi44NzUgMS44MTQsMjYuMjUgQzEuODE0LDI1LjY4NyAxLjY4OSwyNC44MTIgMS41MDEsMjMuNTYyIEMxLjMxMywyMi4zMTIgMS4wNjMsMjEuNjI0IDAuODEzLDIxLjQzNyBDMC41NjMsMjEuNjI1IDAuMzc1LDIyLjI1IDAuMjUsMjMuNDM3IEMwLjA2MiwyNC42MjUgMCwyNS41NjIgMCwyNi4yNSBMMCwyNi4yNSBaIE00LjEyNSwyNi4yNSBDNC4xMjUsMjcuMzEzIDQuMTg4LDI4LjgxMyA0LjQzOCwzMC44NzUgQzQuNjI2LDMyLjg3NSA0Ljc1MSwzNC4xMjUgNC44MTMsMzQuNTYzIEM0LjgxMywzNC44NzYgNC45MzgsMzUuMDYzIDUuMTg4LDM1LjA2MyBDNS4zNzYsMzUuMDYzIDUuNTAxLDM0Ljg3NSA1LjU2MywzNC41NjMgQzUuNjI2LDM0LjA2MyA1Ljc1MSwzMi44MTMgNi4wMDEsMzAuODEzIEM2LjE4OSwyOC44MTMgNi4zMTQsMjcuMzEzIDYuMzE0LDI2LjI1IEM2LjMxNCwyNiA2LjA2NCwyMy4xMjUgNS41NjQsMTcuNjI1IEM1LjUwMSwxNy4zNzUgNS4zNzYsMTcuMjUgNS4xODksMTcuMjUgQzQuOTM5LDE3LjI1IDQuODE0LDE3LjM3NSA0LjgxNCwxNy42MjUgQzQuNzUxLDE4LjEyNSA0LjYyNiwxOS40MzggNC40MzksMjEuNTYzIEM0LjE4OSwyMy42MjYgNC4xMjYsMjUuMTg4IDQuMTI2LDI2LjI1MSBMNC4xMjUsMjYuMjUgWiBNOS4yNSwyNi4yNSBDOS4yNSwyNy4zNzUgOS4zNzUsMjkgOS42MjUsMzEuMjUgQzkuODEzLDMzLjQzOCA5LjkzOCwzNC42ODggOS45MzgsMzUgQzkuOTM4LDM1LjMxMiAxMC4wNjMsMzUuNSAxMC4zNzYsMzUuNSBDMTAuNjg5LDM1LjUgMTAuODc2LDM1LjMxMiAxMC44NzYsMzUgQzExLjM3NiwyOS44MTIgMTEuNTY0LDI2LjkzNyAxMS41NjQsMjYuMjUgQzExLjU2NCwyNS42MjUgMTEuMzc2LDIyLjg3NSAxMC44NzYsMTguMDYyIEMxMC44NzYsMTcuNjg3IDEwLjY4OCwxNy40OTkgMTAuMzc2LDE3LjQ5OSBDMTAuMDY0LDE3LjQ5OSA5LjkzOCwxNy42ODcgOS45MzgsMTguMDYyIEM5LjkzOCwxOC4zMTIgOS44MTMsMTkuNDM3IDkuNjI1LDIxLjU2MiBDOS4zNzUsMjMuNjg3IDkuMjUsMjUuMjUgOS4yNSwyNi4yNSBMOS4yNSwyNi4yNSBaIE0xNS4xODgsMjYuMjUgQzE1LjE4OCwyNi4zNzUgMTUuMzc2LDI5LjI1IDE1Ljc1MSwzNC45MzggQzE1Ljc1MSwzNS4zMTMgMTUuOTM5LDM1LjU2MyAxNi4zMTQsMzUuNTYzIEMxNi43NTIsMzUuNTYzIDE2LjkzOSwzNS4zMTMgMTYuOTM5LDM0LjkzOCBDMTYuOTM5LDM0LjYyNSAxNy4wNjQsMzMuMzc1IDE3LjI1MiwzMS4xODggQzE3LjUwMiwyOSAxNy42MjcsMjcuMzc1IDE3LjYyNywyNi4yNSBDMTcuNjI3LDI0LjEyNSAxNy41MDIsMjEgMTcuMzE0LDE2LjkzNyBDMTcuMTI2LDEyLjg3NCAxNy4wMDEsMTAuNDk5IDE2LjkzOSw5LjgxMiBDMTYuOTM5LDkuMzc0IDE2Ljc1MSw5LjE4NyAxNi4zMTQsOS4xODcgQzE1LjkzOSw5LjE4NyAxNS43NTEsOS4zNzUgMTUuNzUxLDkuODEyIEMxNS42ODgsMTEuMDYyIDE1LjYyNiwxMi44MTIgMTUuNTAxLDE1LjA2MiBDMTUuNDM4LDE3LjI1IDE1LjMxMywxOS4zMTIgMTUuMjUxLDIxLjEyNSBDMTUuMTg5LDIyLjkzOCAxNS4xODgsMjQuNjI1IDE1LjE4OCwyNi4yNSBMMTUuMTg4LDI2LjI1IFogTTIxLjE4OCwyNi4yNSBDMjEuMTg4LDI3LjM3NSAyMS4yNTEsMjguOTM4IDIxLjQzOCwzMSBDMjEuNTYzLDMzLjA2MyAyMS42MjYsMzQuMzEzIDIxLjYyNiwzNC43NSBDMjEuNjg5LDM1LjMxMyAyMi4wMDEsMzUuNTYzIDIyLjM3NiwzNS41NjMgQzIyLjgxNCwzNS41NjMgMjMuMDY0LDM1LjMxMyAyMy4xODksMzQuNzUgQzIzLjE4OSwzNC4xODcgMjMuMzE0LDMyLjg3NSAyMy40MzksMzAuODc1IEMyMy42MjcsMjguODc1IDIzLjY4OSwyNy4zMTIgMjMuNjg5LDI2LjI1IEMyMy42ODksMjMuOTM3IDIzLjYyNiwyMC42ODcgMjMuNDM5LDE2LjM3NSBDMjMuMzE0LDEyLjA2MiAyMy4xODksOS4xODcgMjMuMTg5LDcuODEyIEMyMy4wNjQsNy4zMTIgMjIuODE0LDcuMDYyIDIyLjM3Niw3LjA2MiBDMjIuMDAxLDcuMDYyIDIxLjY4OCw3LjMxMiAyMS42MjYsNy44MTIgQzIxLjU2Myw4Ljg3NSAyMS41MDEsMTEuNjI1IDIxLjM3NiwxNi4wNjIgQzIxLjI1MSwyMC40OTkgMjEuMTg4LDIzLjkzNyAyMS4xODgsMjYuMjUgTDIxLjE4OCwyNi4yNSBaIE0yNy4yNSwyNi4yNSBDMjcuMjUsMjYuMzc1IDI3LjM3NSwyOS4xMjUgMjcuNjI1LDM0LjYyNSBDMjcuNzUsMzUuMjUgMjguMDYzLDM1LjU2MyAyOC41NjMsMzUuNTYzIEMyOS4wNjMsMzUuNTYzIDI5LjM3NiwzNS4yNSAyOS40MzgsMzQuNTYzIEwyOS40MzgsMzQuNjI2IEMyOS42ODgsMjkuMTI2IDI5LjgxMywyNi4zNzYgMjkuODEzLDI2LjI1MSBDMjkuODEzLDI0LjU2MyAyOS44MTMsMjIuNzUxIDI5Ljc1LDIwLjgxMyBDMjkuNjg3LDE4LjkzOCAyOS42ODcsMTYuNzUgMjkuNjI1LDE0LjQzOCBDMjkuNTYyLDEyLjA2MyAyOS41LDEwLjI1IDI5LjQzNyw5IEMyOS4zNzQsOC4zNzUgMjkuMDYyLDggMjguNTYyLDggQzI4LjA2Miw4IDI3Ljc0OSw4LjM3NSAyNy42MjQsOSBDMjcuNjI0LDEwLjI1IDI3LjU2MSwxMi4wNjMgMjcuNDk5LDE0LjQzOCBDMjcuNDM2LDE2Ljc1MSAyNy4zNzQsMTguOTM4IDI3LjMxMSwyMC44MTMgQzI3LjMxMSwyMi43NTEgMjcuMjQ4LDI0LjU2MyAyNy4yNDgsMjYuMjUxIEwyNy4yNSwyNi4yNSBaIE0zMy4zNzUsMjYuMzEzIEMzMy4zNzUsMjYuMzc2IDMzLjUsMjkuMDYzIDMzLjc1LDM0LjQzOCBDMzMuODEzLDM1LjE4OCAzNC4xMjUsMzUuNTYzIDM0Ljc1LDM1LjU2MyBDMzUuMzc1LDM1LjU2MyAzNS42ODgsMzUuMTg4IDM1Ljc1LDM0LjQzOCBDMzYuMDYzLDI5LjA2MyAzNi4xODgsMjYuMzc1IDM2LjE4OCwyNi4zMTMgQzM2LjE4OCwyNi4xODggMzYuMDYzLDE4LjY4OCAzNS43NSwzLjg3NSBDMzUuNjg3LDMuMTI1IDM1LjM3NSwyLjY4NyAzNC43NSwyLjY4NyBDMzQuMTI1LDIuNjg3IDMzLjgxMiwzLjEyNSAzMy43NSwzLjg3NSBDMzMuNSwxOC42ODggMzMuMzc1LDI2LjE4OCAzMy4zNzUsMjYuMzEzIEwzMy4zNzUsMjYuMzEzIFogTTM4LjQzOCwxMi43NSBDMzguNDM4LDE2LjI1IDM4LjUwMSwyMC4xODggMzguNTAxLDI0LjQzOCBMMzguNTAxLDM0LjM3NiBDMzguNTAxLDM0LjY4OSAzOC42MjYsMzUuMDAxIDM4LjgxNCwzNS4yNTEgQzM5LjAwMiwzNS41MDEgMzkuMjUyLDM1LjYyNiAzOS41MDIsMzUuNjI2IEw2NC42MjcsMzUuNjI2IEM2Ny4xMjcsMzUuNjI2IDY5LjI1MiwzNC42MjYgNzEuMDY1LDMyLjY4OCBDNzIuODE1LDMwLjc1IDczLjY5LDI4LjM3NSA3My42OSwyNS42MjUgQzczLjY5LDIyLjg3NSA3Mi43NTIsMjAuNSA3MS4wMDIsMTguNTYyIEM2OS4yNTIsMTYuNjI0IDY3LjEyNywxNS42MjQgNjQuNjI3LDE1LjYyNCBDNjMuNTAyLDE1LjYyNCA2Mi4zMTQsMTUuOTM3IDYxLjEyNywxNi40OTkgQzYwLjc1MiwxMS45MzYgNTkuMDY0LDguMTI0IDU2LjAwMiw1LjA2MSBDNTIuOTM5LDEuOTM2IDQ5LjMxNCwwLjQzNiA0NS4xODksMC40MzYgQzQ0LjgxNCwwLjQzNiA0NC4yNTEsMC40MzYgNDMuNjI2LDAuNTYxIEM0Mi45MzgsMC42MjQgNDIuMTg4LDAuNzQ5IDQxLjQzOCwwLjg3NCBDNDAuNjI1LDEuMDYyIDM5Ljg3NSwxLjMxMiAzOS4zMTMsMS42MjQgQzM4Ljc1LDEuOTk5IDM4LjUsMi4zNzQgMzguNSwyLjc0OSBDMzguNSw1Ljg3NCAzOC40MzcsOS4xODcgMzguNDM3LDEyLjc0OSBMMzguNDM4LDEyLjc1I
;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
