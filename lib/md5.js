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
		var hasher = new md5.ArrayBuffer(),
			result = new Promise(function(resolve, reject) {
				common.calculate(
					buff,
					function(slice) {
						hasher.append(slice);
					},
					function(err) {
						if(err) {
							return reject();
						}
						resolve(hasher.end());
					}
				);
			});

		return result;
	};
});
