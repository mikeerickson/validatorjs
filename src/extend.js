// Based on jquery's extend function
function extend() {
	var src, copy, name, options, clone;
	var target = arguments[0] || {};
	var i = 1;
	var length = arguments.length;

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( copy && typeof copy === "object" ) {
					clone = src && typeof src === "object" ? src : {};

					// Never move original objects, clone them
					target[ name ] = extend( clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}