import { Box } from './Box'
import { v8natives } from './v8natives'

//--------------------------------------------------------------------------------------------------
type A = Box & { a: number }
function newA(minX: number, minY: number, maxX: number, maxY: number): A {
  return {
    a: 0,
    minX,
    minY,
    maxX,
    maxY,
  }
}

//--------------------------------------------------------------------------------------------------
type B = Box & { b1: number; b2: number }
function newB(minX: number, minY: number, maxX: number, maxY: number): B {
  return {
    b1: 0,
    b2: 0,
    minX,
    minY,
    maxX,
    maxY,
  }
}

//--------------------------------------------------------------------------------------------------
type C = Box & { c1: number; c2: number; c3: number }
function newC(minX: number, minY: number, maxX: number, maxY: number): C {
  return {
    c1: 0,
    c2: 0,
    c3: 0,
    minX,
    minY,
    maxX,
    maxY,
  }
}

//--------------------------------------------------------------------------------------------------
type D = Box & { d1: number; d2: number; d3: number; d4: number }
function newD(minX: number, minY: number, maxX: number, maxY: number): D {
  return {
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
    minX,
    minY,
    maxX,
    maxY,
  }
}

//--------------------------------------------------------------------------------------------------
type E = Box & { e1: number; e2: number; e3: number; e4: number; e5: number }
function newE(minX: number, minY: number, maxX: number, maxY: number): E {
  return {
    e1: 0,
    e2: 0,
    e3: 0,
    e4: 0,
    e5: 0,
    minX,
    minY,
    maxX,
    maxY,
  }
}

if (v8natives.haveSameMap(newA(0, 0, 0, 0), newB(0, 0, 0, 0))) {
  throw new Error('newA() and newB() should NOT have the same Map')
}

type AnyShape = A | B | C | D | E

const _box = Box.new()
//--------------------------------------------------------------------------------------------------
export class Shapes {
  shapes: AnyShape[] = []

  constructor(N: number, classCount: number) {
    const shapes: AnyShape[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        Box.set(_box, i, j, i + 1, j + 1)

        let shape: AnyShape
        switch (k % classCount) {
          case 0: shape = newA(i, j, i + 1, j + 1); break
          case 1: shape = newB(i, j, i + 1, j + 1); break
          case 2: shape = newC(i, j, i + 1, j + 1); break
          case 3: shape = newD(i, j, i + 1, j + 1); break
          case 4: shape = newE(i, j, i + 1, j + 1); break
          default: throw new Error()
        } // prettier-ignore

        k++
        shapes.push(shape)
      }
    }

    this.shapes = shapes
  }

  computeBigBox(): Box {
    const { shapes } = this
    const box = Box.new()
    const len = shapes.length
    for (let i = 0; i < len; ++i) {
      Box.expandByBox(box, shapes[i])
    }
    return box
  }
}
