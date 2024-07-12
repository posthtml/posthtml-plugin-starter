<div align="center">
  <img width="150" height="150" alt="PostHTML" src="https://posthtml.github.io/posthtml/logo.svg">
  <h1>Plugin Starter Kit</h1>
  <p>A starter project for PostHTML plugins</p>

  [![Version][npm-version-shield]][npm]
  [![Build][github-ci-shield]][github-ci]
  [![License][license-shield]][license]
  [![Downloads][npm-stats-shield]][npm-stats]
</div>

### About

This is a starter project for PostHTML plugins.

```sh
git clone https://github.com/posthtml/posthtml-plugin-starter.git
```

### Features

- [Async](#async-plugins) and [sync](#sync-plugins) examples
- Supports both ESM and CJS 
- Node.js 18+
- Tests with [`vitest`](https://vitest.dev)
- Linting with [`biome`](https://biomejs.dev/)
- Releases with [`np`](https://github.com/sindresorhus/np)
- CI with GitHub Actions

#### Async plugins

When writing an async PostHTML plugin, you must return a `Promise` that resolves the current `tree`:

```js
export default (options = {}) => tree => {
  // Accept options and set defaults
  options.foo = options.foo || {}

  return new Promise((resolve, reject) => {
    try {
      // do something async

      // finally, resolve the promise by returning the tree
      resolve(tree)
    } catch (error) {
      reject(error)
    }
  })
}
```

Note: async plugins can't be used in PostHTML's [`sync` mode](https://posthtml.org/#/core?id=posthtml-options).

#### Sync plugins

Synchronous plugins just need to return the `tree`.

You may use the `tree.walk` method to traverse the `tree` and handle nodes. 

The handling of nodes can be a function that is passed to `tree.walk`, and which must return the node:

```js
export default (options = {}) => tree => {
  options.foo = options.foo || {}

  const handleNodes = node => {
    // Write your code...

    // Return the node
    return node
  }

  return tree.walk(handleNodes)
}
```

#### Tests

The testing boilerplate includes a `process()` method which accepts 4 parameters:

- `t` the test object
- `name` the file name of the fixture/expected files, excluding extension
- `options` any options to pass to the plugin when testing
- `log` a boolean that turns on logging to console

For example, imagine we're writing a test that uses `/test/fixtures/skip-nodes.html`:

```js
test('It skips nodes defined in `skipNodes` option', t => {
  return process(t, 'skip-nodes', {skipNodes: ['a']}, true)
})
```

As you can see, the second parameter passed to the `process()` method is the fixture file name, without the `.html` extension.

##### Testing for Errors

To test errors thrown by your plugin, use the `error()` method:

```js
test('Syntax error', t => {
  return error('syntax-error', err => {
    expect(err.message).toBe('Invalid or unexpected token')
  })
})
```

Just like before, the first parameter passed to `error()` is the fixture file name, without the extension.

#### Linting

You may configure `eslint` in `.eslintrc`. See [ESLint rules](https://eslint.org/docs/rules/) for options.

#### Coverage

`@vitest/coverage-v8` defaults are used, you may [configure it](https://vitest.dev/guide/coverage.html).

#### Releases

The starter uses `np` for publishing to npm, take a look at its [configuration options](https://github.com/sindresorhus/np#config).

When publishing your first release, leave `"version": "0.0.0"` in `package.json` - you will set it through `np`'s interactive UI.

#### Continuous Integration

GitHub Actions is used for continuous integration, and you can configure it by editing the `.github/workflows/nodejs.yml` file.

A `.github/dependabot.yml` config file is also included, to help automate dependency updates.

### Other notes

- update shield icon URLs at the end of this file
- edit (or remove) the issue template
- update `package.json` fields
- update the `LICENSE` file 

_Delete all of the above text, including the separator below - what follows is some boilerplate for your plugin's `README.md`._

---

## Introduction

Describe what your plugin does. 

Optionally add a short before & after example, like so:

Input:

```html
<div filter="uppercase">Test</div>
```

Output:

```html
<div>TEST</div>
```

## Install

```
npm i posthtml posthtml-myplugin
```

## Usage

Provide clear code samples showing how to use the plugin: 

```js
import posthtml from 'posthtml'
import myplugin from 'posthtml-myplugin'

posthtml([
  myplugin()
])
  .process('<div filter="uppercase">Test</div>')
  .then(result => console.log(result.html))
```

Result:

```html
<div>TEST</div>
```

## Syntax

Most PostHTML plugins use custom HTML syntax, like custom tag names or even custom attributes. If your plugin requires using custom markup, document it here.

For example:

### Tag

Use the `<uppercase>` tag to transform all text inside it:

```xml
<uppercase>Test</uppercase>
```

The tag is removed in the output.

Result:

```html
TEST
```

### Attribute

You can use a filter by calling it as the value of the `filter` attribute:

```html
<div filter="uppercase">Test</div>
```

The `filter` attribute is removed in the output.

Result:

```html
<div>TEST</div>
```

## Options

If your plugin can be configured through options, explain what they do and how to use them. Make sure to specify what the defaults are.

For example:

### `only`

Type: `array`\
Default: `[]`

Array of filter names to use. All other filters will be disabled.

```js
import posthtml from 'posthtml'
import myplugin from 'posthtml-myplugin'

posthtml([
  myplugin({
    only: ['uppercase', 'slugify']
  })
])
  .process('<div filter="uppercase">Test</div>')
  .then(result => console.log(result.html))
```

By default, this is set to an empty array, which means that all filters can be used. 

## 3<sup>rd</sup> parties

If your plugin depends on third party libraries that require configuration, explain here what the user needs to do.

[npm]: https://www.npmjs.com/package/posthtml
[npm-version-shield]: https://img.shields.io/npm/v/posthtml.svg
[npm-stats]: http://npm-stat.com/charts.html?package=posthtml
[npm-stats-shield]: https://img.shields.io/npm/dt/posthtml.svg
[github-ci]: https://github.com/posthtml/posthtml-plugin-starter/actions/workflows/nodejs.yml
[github-ci-shield]: https://github.com/posthtml/posthtml-plugin-starter/actions/workflows/nodejs.yml/badge.svg
[license]: ./license
[license-shield]: https://img.shields.io/npm/l/posthtml.svg
