import path from 'node:path'
import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {test, expect} from 'vitest'
import posthtml from 'posthtml'
import plugin from '../lib/index.js'
import asyncPlugin from '../lib/index-async.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fixture = file => readFileSync(path.join(__dirname, 'fixtures', `${file}.html`), 'utf8').trim()
const expected = file => readFileSync(path.join(__dirname, 'expected', `${file}.html`), 'utf8').trim()

// eslint-disable-next-line
const error = (name, options, cb) => posthtml([plugin(options)]).process(fixture(name)).catch(cb)
const clean = html => html.replaceAll(/[^\S\r\n]+$/gm, '').trim()

const process = (name, options, log = false) => {
  return posthtml([plugin(options)])
    .process(fixture(name))
    .then(result => log ? console.log(result.html) : clean(result.html)) // eslint-disable-line
    .then(html => expect(html).toEqual(expected(name)))
}

test('Basic', () => {
  return process('basic')
})

test('Async plugin', () => {
  return posthtml([asyncPlugin()])
    .process(fixture('basic'))
    .then(result => expect(clean(result.html)).toEqual(expected('basic')))
})
