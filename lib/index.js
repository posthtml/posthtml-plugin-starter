'use strict'

module.exports = (options = {}) => tree => {
  options.foo = options.foo || {}

  const process = tree => {
    // Write your code...
    return tree
  }

  return tree.walk(process)
}
