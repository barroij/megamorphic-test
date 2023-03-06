import { Box } from './Box'

//--------------------------------------------------------------------------------------------------
class A2 implements Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
  a = 0

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class B2 implements Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
  b1 = 0
  b2 = 0

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class C2 implements Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
  c1 = 0
  c2 = 0
  c3 = 0

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class D2 implements Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
  d1 = 0
  d2 = 0
  d3 = 0
  d4 = 0

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class E2 implements Box {
  minX: number
  minY: number
  maxX: number
  maxY: number
  e1 = 0
  e2 = 0
  e3 = 0
  e4 = 0
  e5 = 0

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

export type AnyShape2 = A2 | B2 | C2 | D2 | E2

const _box = Box.new()
//--------------------------------------------------------------------------------------------------
export class Shapes2 {
  shapes: AnyShape2[] = []

  constructor(N: number) {
    const shapes: AnyShape2[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        Box.set(_box, i, j, i + 1, j + 1)

        let shape: AnyShape2
        switch (k % 5) {
          case 0: shape = new A2(_box); break
          case 1: shape = new B2(_box); break
          case 2: shape = new C2(_box); break
          case 3: shape = new D2(_box); break
          case 4: shape = new E2(_box); break
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
