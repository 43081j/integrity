File Integrity
===

A small collection of utilities for checking integrity of a file.

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

CRC32
==

The following inputs are supported:

- `Buffer`
- `String`
- `ArrayBuffer`
- `ReadableStream`

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
