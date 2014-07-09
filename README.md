Integrity.js
===

**Integrity.js** is a small collection of utilities for checking integrity of a file.

It makes use of the `es6-promise` polyfill to provide promise functionality.

Install
==

Node:

```
npm install integrity
```

Bower:

```
bower install integrity
```

Use
==

Node:

```
var integrity = require('integrity');
```

Bower:

```
<script src="bower_components/integrity/dist/integrity.js"></script>
```

Supported Inputs
==

All methods support the following inputs:

- `Buffer` (Node)
- `String`
- `ArrayBuffer`
- `ReadableStream` (Node)
- `File` (HTML5)

HTML5 File Example
==

```javascript
document.querySelector('#file').addEventListener('change', function(e) {
	var file = e.target.files[0],
		reader = new FileReader();

	reader.onloadend = function(e) {
		// e.target.result is an ArrayBuffer
		integrity.crc32(e.target.result).then(function(c) {
			console.log(c.toString(16));
		});
	};

	reader.readAsArrayBuffer(file);
});
```

CRC32
==

Example:

```javascript
integrity.crc32('123456789').then(function(crc) {
	console.log(crc); // 0xCBF43926
});
integrity.crc32(new Buffer('123456789')).then(function(crc) {
	console.log(crc); // 0xCBF43926
});
integrity.crc32(fs.createReadStream('test')).then(function(crc) {
	console.log(crc); // CRC32 of file 'test'
});
```
