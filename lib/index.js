export default (options = {}) => tree => {
  // Accept options and set defaults
  options.foo = options.foo || {}

  const process = node => {
    // Write your code...

    // Return the node
    return node
  }

  return tree.walk(process)
}
