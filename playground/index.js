/* eslint-disable no-console */
import ObjectWrapper from '../dist/index.es.js'

const data = {
  a: {
    b: {
      c: [0, 1, 2],
    },
  },
}

const ow = new ObjectWrapper(data)
// set value
const set1 = ow.setPropVal('a.b.c[1]', 'modify')
// set and get old value
const set2 = ow.setPropVal('a.b.c[1]', 'modify2', true)
// get value
const get1 = ow.getPropVal('a.b.c[1]')

console.log(set1)
console.log(set2)
console.log(get1)

// error
// const get2 = ow.getPropVal('not.exists.property')
// console.log(get2)
