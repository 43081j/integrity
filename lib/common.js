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
	'use strict';

	var stringToBuffer = function(str) {
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

	var bufferToArrayBuffer = function(buff) {
		var ab, view;

		if(typeof Buffer !== 'function' || !Buffer.isBuffer(buff)) {
			return buff;
		}

		ab = new ArrayBuffer(buff.length);
		view = new Uint8Array(ab);

		for(var i = 0, max = buff.length; i < max; i++) {
			view[i] = buff[i];
		}

		return ab;
	};

	var arrayBufferToBuffer = function(ab) {
		var buffer = new Buffer(ab.byteLength),
			v = new Uint8Array(ab);
		for(var i = 0, max = buffer.length; i < max; i++) {
			buffer[i] = v[i];
		}
		return buffer;
	};

	var calculate = function(buff, process, end) {
		var sliceSize = 64,
			offset;

		if(typeof buff === 'string') {
			buff = stringToBuffer(buff);
		}

		if(typeof Buffer === 'function' && Buffer.isBuffer(buff)) {
			buff = bufferToArrayBuffer(buff);
		}

		if(buff.readable === true && typeof buff.on === 'function') {
			buff.on('data', function(slice) {
				process(bufferToArrayBuffer(slice));
			});
			buff.on('end', function() {
				end();
			});
		} else {
			if(!(buff instanceof ArrayBuffer)) {
				end(true);
				return;
			}
			for(var i = 0, max = Math.ceil((buff.byteLength || buff.length) / sliceSize); i < max; i++) {
				offset = i * sliceSize;
				process(buff.slice(offset, offset + sliceSize));
			}
			end();
		}
	};

	exports.stringToBuffer = stringToBuffer;
	exports.bufferToArrayBuffer = bufferToArrayBuffer;
	exports.arrayBufferToBuffer = arrayBufferToBuffer;
	exports.calculate = calculate;
});
