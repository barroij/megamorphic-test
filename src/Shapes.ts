import { Box } from './Box'

//--------------------------------------------------------------------------------------------------
class A implements Box {
  a = 0
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class B implements Box {
  b1 = 0
  b2 = 0
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class C implements Box {
  c1 = 0
  c2 = 0
  c3 = 0
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class D implements Box {
  d1 = 0
  d2 = 0
  d3 = 0
  d4 = 0
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

//--------------------------------------------------------------------------------------------------
class E implements Box {
  e1 = 0
  e2 = 0
  e3 = 0
  e4 = 0
  e5 = 0
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor(box: Box) {
    this.minX = box.minX
    this.minY = box.minY
    this.maxX = box.maxX
    this.maxY = box.maxY
  }
}

type AnyShape = A | B | C | D | E

const _box = Box.new()
//--------------------------------------------------------------------------------------------------
export class Shapes {
  shapes: AnyShape[] = []

  constructor(N: number) {
    const shapes: AnyShape[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        Box.set(_box, i, j, i + 1, j + 1)

        let shape: AnyShape
        switch (k % 5) {
          case 0: shape = new A(_box); break
          case 1: shape = new B(_box); break
          case 2: shape = new C(_box); break
          case 3: shape = new D(_box); break
          case 4: shape = new E(_box); break
          default: throw new Error()
        } // prettier-ignor
        
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
