import { Box } from './Box'
import { v8natives } from './v8natives'

//--------------------------------------------------------------------------------------------------
type A2 = Box & { a: number }
function newA2(minX: number, minY: number, maxX: number, maxY: number): A2 {
  return {
    minX,
    minY,
    maxX,
    maxY,
    a: 0,
  }
}

//--------------------------------------------------------------------------------------------------
type B2 = Box & { b1: number; b2: number }
function newB2(minX: number, minY: number, maxX: number, maxY: number): B2 {
  return {
    minX,
    minY,
    maxX,
    maxY,
    b1: 0,
    b2: 0,
  }
}

//--------------------------------------------------------------------------------------------------
type C2 = Box & { c1: number; c2: number; c3: number }
function newC2(minX: number, minY: number, maxX: number, maxY: number): C2 {
  return {
    minX,
    minY,
    maxX,
    maxY,
    c1: 0,
    c2: 0,
    c3: 0,
  }
}

//--------------------------------------------------------------------------------------------------
type D2 = Box & { d1: number; d2: number; d3: number; d4: number }
function newD2(minX: number, minY: number, maxX: number, maxY: number): D2 {
  return {
    minX,
    minY,
    maxX,
    maxY,
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
  }
}

//--------------------------------------------------------------------------------------------------
type E2 = Box & { e1: number; e2: number; e3: number; e4: number; e5: number }
function newE2(minX: number, minY: number, maxX: number, maxY: number): E2 {
  return {
    minX,
    minY,
    maxX,
    maxY,
    e1: 0,
    e2: 0,
    e3: 0,
    e4: 0,
    e5: 0,
  }
}



export function v8info_obj2() {
  if (!v8natives.isNative()) {
    console.log('v8natives.isNative() is false. Cannot log v8info')
  }

  console.log('------------------------')
  console.log('A2')
  v8natives.debugPrint(newA2(0, 0, 0, 0))

  console.log('------------------------')
  console.log('B2')
  v8natives.debugPrint(newB2(0, 0, 0, 0))

  console.log('------------------------')
  console.log('C2')
  v8natives.debugPrint(newC2(0, 0, 0, 0))

  console.log('------------------------')
  console.log('D2')
  v8natives.debugPrint(newD2(0, 0, 0, 0))

  console.log('------------------------')
  console.log('E2')
  v8natives.debugPrint(newE2(0, 0, 0, 0))
}

type AnyObj2 = A2 | B2 | C2 | D2 | E2

//--------------------------------------------------------------------------------------------------
export class Objs2 {
  objs: AnyObj2[] = []

  constructor(N: number, classCount: number) {
    const objs: AnyObj2[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        let obj: AnyObj2
        switch (k % classCount) {
          case 0: obj = newA2(i, j, i + 1, j + 1); break
          case 1: obj = newB2(i, j, i + 1, j + 1); break
          case 2: obj = newC2(i, j, i + 1, j + 1); break
          case 3: obj = newD2(i, j, i + 1, j + 1); break
          case 4: obj = newE2(i, j, i + 1, j + 1); break
          default: throw new Error()
        } // prettier-ignore

        k++
        objs.push(obj)
      }
    }

    this.objs = objs
  }

  computeBigBox(): Box {
    const { objs } = this
    const box = Box.new()
    const len = objs.length
    for (let i = 0; i < len; ++i) {
      Box.expandByBox(box, objs[i])
    }
    return box
  }
}
