import { expect, it } from 'vitest'
import { ObjectWrapper } from '../src/index'


/**
 * module output test.
 */
it('Object write defined property', () => {
    const emptyObj = {
        test: '',
        nest: {
            test: ''
        }
    }
    const mapper = new ObjectWrapper(emptyObj)
    mapper.setPropVal('test', 'a')
    mapper.setPropVal('nest.test', 'b')

    expect(emptyObj).toEqual({
        test: 'a',
        nest: {
            test: 'b'
        }
    })
})

/**
 * module output test.
 */
it('Object write undefined property', () => {
    const emptyObj = {}
    const mapper = new ObjectWrapper(emptyObj)
    mapper.setPropVal('nest.test', undefined)
    mapper.setPropVal('nest.array[2]', '3rd')

    expect(emptyObj).toEqual({
        nest: {
            test: undefined,
            array: [undefined, undefined, '3rd']
        }
    })
})

