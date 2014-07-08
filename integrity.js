(function(root, factory) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		define(['exports', 'lib/crc32'], factory);
	} else if(typeof exports === 'object') {
		factory(exports, require('./lib/crc32'));
	} else {
		factory((root.integrity = {}), root.integrity_crc32);
	}
})(this, function(exports, crc32) {
	exports.crc32 = crc32.crc32;
});
