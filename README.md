# Description

A micro library for TypeScript, access object property to set/get value.

# How to use

1. install
```
npm install @solanyan/object-wrapper
```
2. access object property to set/get value like this
```
import ObjectWrapper from @solanyan/object-wrapper

const data = {
  a: {
    b: {
      c: [0, 1, 2],
    },
  },
}

const ow = new ObjectWrapper(data)
// get wrapped object
const get1 = ow.getPropVal(undefined)
// get value (object(array) value)
const get2 = ow.getPropVal('a.b.c')
// get value (primitive value)
const get3 = ow.getPropVal('a.b.c[1]')

console.log(get1) // { a: { b: { c: [Array] } } }
console.log(`${get1.a.b.c[0]} ${get1.a.b.c[1]} ${get1.a.b.c[2]}`) // 0 1 2
console.log(get3) // 1

// set value
const set1 = ow.setPropVal('a.b.c[1]', 'modify')
// set and get old value
const set2 = ow.setPropVal('a.b.c[1]', 'modify2', true)

console.log(`${get2[0]} ${get2[1]} ${get2[2]}`) // 0 modify2 2
console.log(set1) // undefined
console.log(set2) // modify
console.log(get3) // 1
```