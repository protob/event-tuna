import Vue from 'vue'

Vue.prototype.$hashCode = (str) =>
  str
    .split('')
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    )

Vue.prototype.$formatName = (name) => {
  return name
    .split('+')
    .join(' ')
    .toUpperCase()
}
Vue.prototype.$uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}
