var nunjucks = require('nunjucks');
var SpacelessExtension = require('./');
var test = require('tape');

var env = new nunjucks.Environment([], { autoescape: false });
env.addExtension('spaceless', new SpacelessExtension());

// based on tests on other engines
// twig tests	https://github.com/twigphp/Twig/blob/f0a4fa/test/Twig/Tests/Fixtures/tags/spaceless/simple.test
// swig tests	https://github.com/paularmstrong/swig/blob/70a1c8/tests/tags/spaceless.test.js
// django tests	https://github.com/django/django/blob/ecb59c/tests/template_tests/syntax_tests/test_spaceless.py

test('Removes whitespace between HTML tags', function (t) {
	t.equal(env.renderString('{% spaceless %}<div>\n\t \t\n</div>{% endspaceless %}'), '<div></div>');
	t.equal(env.renderString('{% spaceless %}<textarea>\n\t \t\n</textarea>{% endspaceless %}'), '<textarea></textarea>');
	t.equal(env.renderString('{% spaceless %}<pre>\n\t \t\n</pre>{% endspaceless %}'), '<pre></pre>');
	t.end();
});

test('Removes whitespace around HTML tags', function (t) {
	t.equal(env.renderString('{% spaceless %}\n\n\t\t  <div></div>\n\t {% endspaceless %}'), '<div></div>');
	t.end();
});

test('Maintains whitespace outside `spaceless` tags', function (t) {
	t.equal(env.renderString('\n\n\t\t  {% spaceless %}<div></div>{% endspaceless %} \t\n'), '\n\n\t\t  <div></div> \t\n');
	t.end();
});

test('Maintains whitespace between HTML tag and text', function (t) {
	t.equal(env.renderString('{% spaceless %}<div>\n\t <i>\n\t text </i> \t\n</div>{% endspaceless %}'), '<div><i>\n\t text </i></div>');
	t.equal(env.renderString('{% spaceless %}<pre>\n\t <i>\n\t text </i> \t\n</pre>{% endspaceless %}'), '<pre><i>\n\t text </i></pre>');
	t.end();
});

test('Maintains whitespace inside tag', function (t) {
	t.equal(env.renderString('{% spaceless %}<input name=" spaceless "  value="  "  required="  ">{% endspaceless %}'),'<input name=" spaceless "  value="  "  required="  ">');
	t.end();
});
