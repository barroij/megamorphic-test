import { forEachIJ, getTime, makeVec } from '../Utils'
import { v8natives } from '../v8natives'
import { VecArr, VecObj } from './Vec'
import { XfArr } from './XfArr'
import { XfBuf } from './XfBuf'
import { XfCls } from './XfCls'
import { XfCls2 } from './XfCls2'
import { XfF64 } from './XfF64'
import { XfObj } from './XfObj'

type ValueOfArray<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never

const opModes = ['transform', 'compose'] as const
type OptMode = ValueOfArray<typeof opModes>

const scaleX = 1.3
const scaleY = 1.3
const cos = Math.cos(1.5)
const sin = Math.cos(1.5)
const Xx = scaleX * cos
const Xy = scaleX * sin
const Yx = -scaleY * sin
const Yy = scaleY * cos
const Tx = 53.12
const Ty = 55.15

export function test_Mat() {
  let opMode: OptMode = 'transform'

  const args = process.argv.slice(2)
  if (args[1]) {
    opMode = args[1] as any
  }
  if (opModes.indexOf(opMode) === -1) {
    throw new Error(`invalid OptMode ${opMode}`)
  }

  let cb: () => void

  if (opMode === 'transform') {
    cb = getCB_Transform(args)
  } else if (opMode === 'compose') {
    cb = getCB_Compose(args)
  } else {
    throw new Error('unknown opMode')
  }

  const runCount = 200
  const t = getTime(cb, runCount)
  console.log(`${args.join(' ')} : ${t} ms.`)
}

function getCB_Transform(args: string[]): () => void {
  const N = 1000

  const oneXfModes = ['oneObj', 'oneArr', 'oneF64'] as const
  const rightModes = ['arrVec', 'arrArr', 'bufArr', 'bufF64'] as const
  const newModes = ['default', 'force'] as const

  type XfMode = ValueOfArray<typeof oneXfModes>
  type RightMode = ValueOfArray<typeof rightModes>
  type NewMode = ValueOfArray<typeof newModes>

  let oneXfMode: XfMode = oneXfModes[0]
  let rightMode: RightMode = rightModes[0]
  let newMode: NewMode = newModes[0]

  if (args[2]) { oneXfMode = args[2] as any } // prettier-ignore
  if (args[3]) { rightMode = args[3] as any } // prettier-ignore
  if (args[4]) {   newMode = args[4] as any } // prettier-ignore

  if (oneXfModes.indexOf(oneXfMode) === -1) { throw new Error(`invalid oneXfMode ${oneXfMode}`) } // prettier-ignore
  if (rightModes.indexOf(rightMode) === -1) { throw new Error(`invalid rightMode ${rightMode}`) } // prettier-ignore
  if (  newModes.indexOf(newMode  ) === -1) { throw new Error(`invalid newMode ${newMode}`    ) } // prettier-ignore

  const xfType = oneXfMode === 'oneObj' ? XfObj : oneXfMode === 'oneArr' ? XfArr : XfF64
  const xfs = [
    (newMode === 'default' ? xfType.new : xfType.newForceDouble)(2, 0, 0, 3, 52, 55) as any,
    (newMode === 'default' ? xfType.new : xfType.newForceDouble)(2, 0, 0, 3, Tx, Ty) as any,
    (newMode === 'default' ? xfType.new : xfType.newForceDouble)(2.2, 0, 0, 3, Tx, Ty) as any,
    (newMode === 'default' ? xfType.new : xfType.newForceDouble)(2.2, 0, 0, 3.3, Tx, Ty) as any,
    (newMode === 'default' ? xfType.new : xfType.newForceDouble)(Xx, Xy, Yx, Yy, Tx, Ty) as any,
  ]

  function logSameShapes() {
    let sameShapes = true
    for (let i = 0; i < xfs.length; ++i) {
      for (let j = +1; j < xfs.length; ++j) {
        if (v8natives.haveSameMap(xfs[i], xfs[j]) === false) {
          sameShapes = false
          break
        }
      }
    }
    sameShapes
    //console.log(sameShapes)
  }
  logSameShapes()

  if (rightMode === 'arrVec') {
    const vecs: VecObj[] = []
    forEachIJ(N, (i, j) => {
      vecs.push(makeVec(i + 0.1, j - 0.2))
    })
    return () => {
      {
        for (const xf1 of xfs) xfType.transformArrVecObj(xf1, vecs)
      }
    }
  } else if (rightMode === 'arrArr') {
    const vecs: VecArr[] = []
    forEachIJ(N, (i, j) => {
      vecs.push([i + 0.1, j - 0.2])
    })
    return () => {
      {
        for (const xf1 of xfs) xfType.transformArrVecArr(xf1, vecs)
      }
    }
  } else if (rightMode === 'bufArr') {
    const vecs: number[] = []
    forEachIJ(N, (i, j) => {
      vecs.push(i + 0.1, j - 0.2)
    })

    return () => {
      {
        for (const xf1 of xfs) xfType.transformBuf(xf1, vecs)
      }
    }
  } else if (rightMode === 'bufF64') {
    const vecs = new Float64Array(2 * N * N)
    let k = 0
    forEachIJ(N, (i, j) => {
      vecs[k++] = i + 0.1
      vecs[k++] = j - 0.2
    })

    return () => {
      {
        for (const xf1 of xfs) xfType.transformBuf(xf1, vecs)
      }
    }
  } else {
    throw new Error('unknown rightMode')
  }
}

function getCB_Compose(args: string[]): () => void {
  const xfModes = ['objArr', 'clsArr', 'cl2Arr', 'arrArr', 'f64Arr', 'bufArr', 'bufF64'] as const
  type XfMode = ValueOfArray<typeof xfModes>

  const newModes = ['default', 'force'] as const
  type NewMode = ValueOfArray<typeof newModes>

  let xfMode: XfMode = xfModes[0]
  let newMode: NewMode = newModes[0]

  if (args[2]) {  xfMode = args[2] as any } // prettier-ignore
  if (args[3]) { newMode = args[3] as any } // prettier-ignore
  if (   xfModes.indexOf(xfMode   ) === -1) { throw new Error(`invalid xfMode ${xfMode}`      ) } // prettier-ignore
  if (  newModes.indexOf(newMode  ) === -1) { throw new Error(`invalid newMode ${newMode}`    ) } // prettier-ignore

  const N = 500
  if (
    xfMode === 'objArr' ||
    xfMode === 'arrArr' ||
    xfMode === 'f64Arr' ||
    xfMode === 'clsArr' ||
    xfMode === 'cl2Arr'
  ) {
    const xfType =
      xfMode === 'objArr'
        ? XfObj
        : xfMode === 'arrArr'
        ? XfArr
        : xfMode === 'f64Arr'
        ? XfF64
        : xfMode === 'clsArr'
        ? XfCls
        : XfCls2
    const newXf = newMode === 'default' ? xfType.new : xfType.newForceDouble
    const leftXfs = [] as any[]
    const rightXfs = [] as any[]
    const outXfs = [] as any[]
    forEachIJ(N, (i, j) => {
      leftXfs.push(newXf(i + 1, 0, j - 1, 0, i, j))
      leftXfs.push(newXf(i + 1.1, -0, j - 1.1, -0, i + 0.1, j + 0.1))

      rightXfs.push(newXf(i + 1.1, -0, j - 1.1, -0, i + 0.1, j + 0.1))
      rightXfs.push(newXf(i + 1, 0, j - 1, 0, i, j))

      outXfs.push(newXf(0.1, 0.1, 0.1, 0.1, 0.1, 0.1) as any)
      outXfs.push(newXf(0.1, 0.1, 0.1, 0.1, 0.1, 0.1) as any)
    })
    /* v8natives.debugPrint(leftXfs[0])
    v8natives.debugPrint(rightXfs[0])
    console.log('################################################################')
    xfType.compose(outXfs[0], leftXfs[0], rightXfs[0])
    v8natives.debugPrint(leftXfs[0])
    v8natives.debugPrint(rightXfs[0])
    console.log('################################################################')*/
    return () => {
      {
        let leftK = 0
        let rightK = 0
        let outK = 0
        forEachIJ(N, (_i, _j) => {
          xfType.compose(outXfs[outK], leftXfs[leftK], rightXfs[rightK])
          outK += 1
          leftK += 1
          rightK += 1
          xfType.compose(outXfs[outK], leftXfs[leftK], rightXfs[rightK])
          outK += 1
          leftK += 1
          rightK += 1
        })
      }
    }
  } else if (xfMode === 'bufArr' || xfMode === 'bufF64') {
    let leftXfs: number[] | Float64Array
    let rightXfs: number[] | Float64Array
    let outXfs: number[] | Float64Array
    if (xfMode === 'bufArr') {
      const l = [] as number[]
      const r = [] as number[]
      const o = [] as number[]
      forEachIJ(N, (i, j) => {
        l.push(i + 1, 0, j - 1, 0, i, j)
        l.push(i + 1.1, -0, j - 1.1, -0, i + 0.1, j + 0.1)

        r.push(i + 1.1, -0, j - 1.1, -0, i + 0.1, j + 0.1)
        r.push(i + 1, 0, j - 1, 0, i, j)

        o.push(0.1, 0.1, 0.1, 0.1, 0.1, 0.1)
        o.push(0.1, 0.1, 0.1, 0.1, 0.1, 0.1)
      })
      leftXfs = l
      rightXfs = r
      outXfs = o
    } else {
      const l = new Float64Array(N * N * 6 * 2)
      const r = new Float64Array(N * N * 6 * 2)
      const o = new Float64Array(N * N * 6 * 2)
      let leftK = 0
      let rightK = 0
      let outK = 0
      forEachIJ(N, (i, j) => {
        l[leftK++] = i + 1
        l[leftK++] = 0
        l[leftK++] = j - 1
        l[leftK++] = 0
        l[leftK++] = i
        l[leftK++] = j

        l[leftK++] = i + 1.1
        l[leftK++] = -0
        l[leftK++] = j - 1.1
        l[leftK++] = -0
        l[leftK++] = i + 0.1
        l[leftK++] = j + 0.1

        r[rightK++] = i + 1.1
        r[rightK++] = -0
        r[rightK++] = j - 1.1
        r[rightK++] = -0
        r[rightK++] = i + 0.1
        r[rightK++] = j + 0.1

        r[rightK++] = i + 1
        r[rightK++] = 0
        r[rightK++] = j - 1
        r[rightK++] = 0
        r[rightK++] = i
        r[rightK++] = j

        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1

        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
        o[outK++] = 0.1
      })
      leftXfs = l
      rightXfs = r
      outXfs = o
    }
    return () => {
      {
        let out_off = 0
        let left_off = 0
        let right_off = 0
        forEachIJ(N, (_i, _j) => {
          XfBuf.compose(outXfs, out_off, leftXfs, left_off, rightXfs, right_off)
          out_off += 6
          left_off += 6
          right_off += 6
          XfBuf.compose(outXfs, out_off, leftXfs, left_off, rightXfs, right_off)
          out_off += 6
          left_off += 6
          right_off += 6
        })
      }
    }
  } else {
    throw new Error('unknown leftMode')
  }

  return () => {}
}
