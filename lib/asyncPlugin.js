export default (options = {}) => tree => {
  // Accept options and set defaults
  options.foo = options.foo || {}

  return new Promise((resolve) => {
    // do something async

    // finally, resolve the promise by returning the tree
    resolve(tree)
  })
}
