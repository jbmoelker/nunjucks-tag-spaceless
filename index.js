'use strict';

var nunjucks = require( 'nunjucks' );

// based on implementations in other engines
// twig spaceless	https://github.com/twigphp/Twig/blob/f0a4fa/lib/Twig/Node/Spaceless.php#L19
// swig spaceless 	https://github.com/paularmstrong/swig/blob/v1.4.2/lib/tags/spaceless.js
// django spaceless https://github.com/django/django/blob/e43ea36/django/template/defaulttags.py#L405
// 					https://github.com/django/django/blob/4ff389d/django/utils/html.py#L186

var TAG_NAME = 'spaceless';
var END_TAG_NAME = 'end' + TAG_NAME;

var WHITESPACE_AT_START = /^\s+/;
var WHITESPACE_BETWEEN_TAGS = />\s+</g;
var WHITESPACE_AT_END = /\s+$/;

module.exports = function SpacelessExtension() {

	this.tags = [TAG_NAME];

	this.parse = function(parser, nodes) {
		var token = parser.nextToken();

		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(token.value);

		var body = parser.parseUntilBlocks(END_TAG_NAME);

		parser.advanceAfterBlockEnd();

		return new nodes.CallExtension(this, 'run', args, [body]);
	};

	this.run = function(context) {
		var args = Array.prototype.slice.call( arguments, 1 );

		var body = args.pop();
		var params = args.pop();

		var result = body()
			.replace(WHITESPACE_AT_START, '')
			.replace(WHITESPACE_BETWEEN_TAGS, '><')
			.replace(WHITESPACE_AT_END, '');

		return ( params && params.safe === true ) ? new nunjucks.runtime.SafeString( result ) : result;
	};
};
