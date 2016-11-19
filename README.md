# Nunjucks tag `spaceless`

[![nunjucks-tag-spaceless on npm](https://badge.fury.io/js/nunjucks-tag-spaceless.svg)](https://www.npmjs.com/package/nunjucks-tag-spaceless)
[![Build Status](https://travis-ci.org/jbmoelker/nunjucks-tag-spaceless.svg?branch=master)](https://travis-ci.org/jbmoelker/nunjucks-tag-spaceless)
[![Coverage Status](https://coveralls.io/repos/github/jbmoelker/nunjucks-tag-spaceless/badge.svg?branch=master)](https://coveralls.io/github/jbmoelker/nunjucks-tag-spaceless?branch=master)

[Nunjucks](https://mozilla.github.io/nunjucks/) [tag](https://mozilla.github.io/nunjucks/templating.html#tags) to remove whitespace *between HTML tags*, not whitespace within HTML tags or whitespace in plain text.

This tag is based on and compatible with the
[Twig `spaceless` tag](http://twig.sensiolabs.org/doc/tags/spaceless.html),
[Swig `spaceless` tag](https://voorhoede.github.io/swig/docs/tags/#spaceless)
and [Django `spaceless` tag](https://docs.djangoproject.com/en/dev/ref/templates/builtins/#spaceless).


## Install

```bash
$ npm install --save nunjucks-tag-spaceless
```

## Usage

Install as [custom tag extension](https://mozilla.github.io/nunjucks/api.html#custom-tags):

```javascript
var nunjucks = require('nunjucks');
var SpacelessExtension = require('nunjucks-tag-spaceless');

var env = new nunjucks.Environment();
env.addExtension('spaceless', new SpacelessExtension());
```

Use in template:

```jinja
{% spaceless %}

    <div>
        <strong> text </strong>
    </div>

{% endspaceless %}
```
Outputs `<div><strong> text </strong></div>`

[more examples](test.js)


Note: `spaceless` will yield unexpected results if you use [custom syntax](https://mozilla.github.io/nunjucks/api.html#customizing-syntax) containing `>` and `<` symbols.


## Support

Same support as Nunjucks:
* Node >= v0.10
* all modern browsers
* IE8 requires [es5-shim](https://github.com/es-shims/es5-shim)


## License

[MIT Licensed](LICENSE) © [Jasper Moelker](https://twitter.com/jbmoelker)
