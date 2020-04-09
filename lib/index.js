'use strict'

module.exports = (options = {}) => tree => {
  options.foo = options.foo || {}

  const process = node => {
    // Write your code...
    return node
  }

  return tree.walk(process)
}
