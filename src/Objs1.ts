import { Box } from './Box'
import { v8natives } from './v8natives'

//--------------------------------------------------------------------------------------------------
type A1 = Box & { a: number }
function newA(minX: number, minY: number, maxX: number, maxY: number): A1 {
  return {
    a: 0,
    minX,
    minY,
    maxX,
    maxY,
  }
}

//--------------------------------------------------------------------------------------------------
type B1 = Box & { b1: number; b2: number }
function newB(minX: number, minY: number, maxX: number, maxY: number): B1 {
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
type C1 = Box & { c1: number; c2: number; c3: number }
function newC(minX: number, minY: number, maxX: number, maxY: number): C1 {
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
type D1 = Box & { d1: number; d2: number; d3: number; d4: number }
function newD(minX: number, minY: number, maxX: number, maxY: number): D1 {
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
type E1 = Box & { e1: number; e2: number; e3: number; e4: number; e5: number }
function newE(minX: number, minY: number, maxX: number, maxY: number): E1 {
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

export function v8info_obj1() {
  console.log('------------------------')
  console.log('A')
  v8natives.debugPrint(newA(0, 0, 0, 0))
  
  console.log('------------------------')
  console.log('B')
  v8natives.debugPrint(newB(0, 0, 0, 0))
  
  console.log('------------------------')
  console.log('C')
  v8natives.debugPrint(newC(0, 0, 0, 0))
  
  console.log('------------------------')
  console.log('D')
  v8natives.debugPrint(newD(0, 0, 0, 0))
  
  console.log('------------------------')
  console.log('E')
  v8natives.debugPrint(newE(0, 0, 0, 0))
}


type AnyObj1 = A1 | B1 | C1 | D1 | E1

//--------------------------------------------------------------------------------------------------
export class Objs1 {
  objs: AnyObj1[] = []

  constructor(N: number, classCount: number) {
    const objs: AnyObj1[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        let obj: AnyObj1
        switch (k % classCount) {
          case 0: obj = newA(i, j, i + 1, j + 1); break
          case 1: obj = newB(i, j, i + 1, j + 1); break
          case 2: obj = newC(i, j, i + 1, j + 1); break
          case 3: obj = newD(i, j, i + 1, j + 1); break
          case 4: obj = newE(i, j, i + 1, j + 1); break
          default: throw new Error(`k % classCount = ${k % classCount}`)
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
