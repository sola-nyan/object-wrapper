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
// set value
const set1 = ow.setPropVal('a.b.c[1]', 'modify')
// set and get old value
const set2 = ow.setPropVal('a.b.c[1]', 'modify2', true)
// get value
const get1 = ow.getPropVal('a.b.c[1]')

console.log(set1) // undefined
console.log(set2) // modify
console.log(get1) // modify2

```