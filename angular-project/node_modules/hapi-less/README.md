# hapi-less
A LessCSS plugin for hapijs

## Installation
```
npm install hapi-less
```

## Usage
```javascript
server.pack.register({
	plugin: require('hapi-less'),
	options: {
		home: __dirname + '/../app/styles',
		route: '/styles/{filename*}',
	    less: {
		    compress: true
		}
	}
}, function (err) {

	if (err) {
		console.log('Failed loading hapi-less');
	}
});
```

options is an object with these keys:
```
home: root folder of the less files. mandatory.
route: hapi route to bind, must have a {filename*} somewhere. optional, defaults to '/styles/{filename*}'.
less: parameters to pass to less. optional.
```

If you want to print errors to console, then create the server like this:
```javascript
var server = new Hapi.Server('localhost', 8080, {debug: {request: ['hapi-less']}});
```
hapi-less logs all errors under the 'hapi-less' and 'error' tags.

## License

hapi-less is distributed under the [MIT license](https://raw.github.com/asafyish/hapi-less/master/LICENSE).