(function(root, factory) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		define(['exports', 'es6-promise', 'common', 'spark-md5'], factory);
	} else if(typeof exports === 'object') {
		factory(exports, require('es6-promise'), require('./common'), require('spark-md5'));
	} else {
		factory((root.integrity_md5 = {}), {Promise: Promise}, integrity_common, SparkMD5);
	}
})(this, function(exports, Promise, common, md5) {
	'use strict';

	Promise = Promise.Promise;

	exports.md5 = function(buff) {
		var result = new Promise(function(resolve, reject) {
			var hasher = new md5.ArrayBuffer(),
				sliceSize = 64,
				offset;

			var processSlice = function(slice) {
				hasher.append(slice);
			};

			var end = function() {
				return hasher.end();
			};

			if(typeof buff === 'string') {
				buff = common.stringToBuffer(buff);
			}

			if(typeof Buffer === 'function' && Buffer.isBuffer(buff)) {
				buff = common.bufferToArrayBuffer(buff);
			}

			if(buff.readable === true && typeof buff.on === 'function') {
				buff.on('data', function(slice) {
					processSlice(common.bufferToArrayBuffer(slice));
				});
				buff.on('end', function() {
					resolve(end());
				});
			} else {
				if(!(buff instanceof ArrayBuffer)) {
					reject();
					return;
				}
				for(var i = 0, max = Math.ceil((buff.byteLength || buff.length) / sliceSize); i < max; i++) {
					offset = i * sliceSize;
					processSlice(buff.slice(offset, offset + sliceSize));
				}
				resolve(end());
			}
		});

		return result;
	};
});
