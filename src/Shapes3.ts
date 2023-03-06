import { Box } from './Box'

//--------------------------------------------------------------------------------------------------
class A3 {
  a = 0
}

//--------------------------------------------------------------------------------------------------
class B3 {
  b1 = 0
  b2 = 0
}

//--------------------------------------------------------------------------------------------------
class C3 {
  c1 = 0
  c2 = 0
  c3 = 0
}

//--------------------------------------------------------------------------------------------------
class D3 {
  d1 = 0
  d2 = 0
  d3 = 0
  d4 = 0
}

//--------------------------------------------------------------------------------------------------
class E3 {
  e1 = 0
  e2 = 0
  e3 = 0
  e4 = 0
  e5 = 0
}

export type AnyShape3 = A3 | B3 | C3 | D3 | E3

const _box = Box.new()

//--------------------------------------------------------------------------------------------------
export class Shapes3 {
  shapes: AnyShape3[] = []
  boxes: number[] = []

  constructor(N: number, classCount: number) {
    const shapes: AnyShape3[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        Box.set(_box, i, j, i + 1, j + 1)

        let shape: AnyShape3
        switch (k % classCount) {
          case 0: shape = new A3(); break
          case 1: shape = new B3(); break
          case 2: shape = new C3(); break
          case 3: shape = new D3(); break
          case 4: shape = new E3(); break
          default: throw new Error()
        } // prettier-ignore
        
        k++
        shapes.push(shape)
        this.boxes.push(_box.minX, _box.minY, _box.maxX, _box.maxY)
      }
    }

    this.shapes = shapes
  }

  computeBigBox(): Box {
    const { shapes, boxes } = this
    const box = Box.new()
    const len = shapes.length
    for (let i = 0; i < len; ++i) {
      Box.expandByBoxBuf(box, boxes, i * 4)
    }
    return box
  }
}
