export default names => {
  return names instanceof Array
    ? names.map(name => __DICTIONARY__[name])
    : __DICTIONARY__[names]
}