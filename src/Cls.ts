import { v8natives } from './v8natives'

export class BoxCls {
  minX: number
  minY: number
  maxX: number
  maxY: number

  //------------------------------------------------------------------------------------------------
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  //------------------------------------------------------------------------------------------------
  static new(): BoxCls {
    return new BoxCls(Infinity, Infinity, -Infinity, -Infinity)
  }

  //------------------------------------------------------------------------------------------------
  expandByBox(other: BoxCls): void {
    const { minX, minY, maxX, maxY } = other
    if (minX < this.minX) { this.minX = minX }
    if (minY < this.minY) { this.minY = minY }
    if (maxX > this.maxX) { this.maxX = maxX }
    if (maxY > this.maxY) { this.maxY = maxY }
  } // prettier-ignore
}

//--------------------------------------------------------------------------------------------------
class A4 extends BoxCls {
  a: number
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super(minX, minY, maxX, maxY)
    this.a = 0
  }
}

//--------------------------------------------------------------------------------------------------
class B4 extends BoxCls {
  b1: number
  b2: number
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super(minX, minY, maxX, maxY)
    this.b1 = 0
    this.b2 = 0
  }
}

//--------------------------------------------------------------------------------------------------
class C4 extends BoxCls {
  c1: number
  c2: number
  c3: number
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super(minX, minY, maxX, maxY)
    this.c1 = 0
    this.c2 = 0
    this.c3 = 0
  }
}

//--------------------------------------------------------------------------------------------------
class D4 extends BoxCls {
  d1: number
  d2: number
  d3: number
  d4: number
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super(minX, minY, maxX, maxY)
    this.d1 = 0
    this.d2 = 0
    this.d3 = 0
    this.d4 = 0
  }
}

//--------------------------------------------------------------------------------------------------
class E4 extends BoxCls {
  e1: number
  e2: number
  e3: number
  e4: number
  e5: number
  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    super(minX, minY, maxX, maxY)
    this.e1 = 0
    this.e2 = 0
    this.e3 = 0
    this.e4 = 0
    this.e5 = 0
  }
}

export function v8info_cls() {
  if (!v8natives.isNative()) {
    console.log('v8natives.isNative() is false. Cannot log v8info')
  }

  console.log('------------------------')
  console.log('A4')
  v8natives.debugPrint(new A4(0, 0, 0, 0))

  console.log('------------------------')
  console.log('B4')
  v8natives.debugPrint(new B4(0, 0, 0, 0))

  console.log('------------------------')
  console.log('C4')
  v8natives.debugPrint(new C4(0, 0, 0, 0))

  console.log('------------------------')
  console.log('D4')
  v8natives.debugPrint(new D4(0, 0, 0, 0))

  console.log('------------------------')
  console.log('E4')
  v8natives.debugPrint(new E4(0, 0, 0, 0))
}

type AnyObj4 = A4 | B4 | C4 | D4 | E4

//--------------------------------------------------------------------------------------------------
export class Cls {
  objs: AnyObj4[] = []

  constructor(N: number, classCount: number) {
    const objs: AnyObj4[] = []

    let k = 0
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        let obj: AnyObj4
        switch (k % classCount) {
          case 0: obj = new A4(i, j, i + 1, j + 1); break
          case 1: obj = new B4(i, j, i + 1, j + 1); break
          case 2: obj = new C4(i, j, i + 1, j + 1); break
          case 3: obj = new D4(i, j, i + 1, j + 1); break
          case 4: obj = new E4(i, j, i + 1, j + 1); break
          default: throw new Error()
        } // prettier-ignore

        k++
        objs.push(obj)
      }
    }

    this.objs = objs
  }

  computeBigBox(): BoxCls {
    const { objs } = this
    const box = BoxCls.new()
    const len = objs.length
    for (let i = 0; i < len; ++i) {
      box.expandByBox(objs[i])
    }
    return box
  }
}
