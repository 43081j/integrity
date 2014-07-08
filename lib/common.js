(function(root, factory) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		define(['exports'], factory);
	} else if(typeof exports === 'object') {
		factory(exports);
	} else {
		factory((root.integrity_common = {}));
	}
})(this, function(exports) {
	exports.stringToBuffer = function(str) {
		var buff, bytes;

		if(typeof Buffer === 'function') {
			return new Buffer(str);
		}

        buff = new ArrayBuffer(str.length);
		bytes = new Uint8Array(buff);

        for(var i = 0, max = str.length; i < max; i++) {
            bytes[i] = str.charCodeAt(i);
        }

        return buff;
	};
});
