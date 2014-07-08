<<<<<<< HEAD
File Integrity
===

A small (nKB) collection of utilities for checking integrity of a file.

It makes use of the `es6-promise` polyfill to provide promise functionality.

Install
==

Node:

```
npm install fi
```

Bower:

```
bower install fi
```

Use
==

Node:

```
var fi = require('fi');
```

Bower:

```
<script src="bower_components/fi/dist/fi.js"></script>
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
fi.crc32('123456789').then(function(crc) {
	console.log(crc); // 0xCBF43926
});
fi.crc32(new Buffer('123456789')).then(function(crc) {
	console.log(crc); // 0xCBF43926
});
fi.crc32(fs.createReadStream('test')).then(function(crc) {
	console.log(crc); // CRC32 of file 'test'
});
```
=======
integrity
=========

Data integrity checking utilities for Node and the browser
>>>>>>> 7fb6e1a651294a4fdb4a14c70f97838ca0f3736c
