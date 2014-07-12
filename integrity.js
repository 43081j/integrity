(function(root, factory) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		define(['exports', 'lib/crc32', 'lib/md5'], factory);
	} else if(typeof exports === 'object') {
		factory(exports, require('./lib/crc32'), require('./lib/md5'));
	} else {
		factory((root.integrity = {}), root.integrity_crc32, root.integrity_md5);
	}
})(this, function(exports, crc32, md5) {
	'use strict';
	exports.crc32 = crc32.crc32;
	exports.md5 = md5.md5;
});
