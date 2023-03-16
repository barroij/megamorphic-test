import { BoxArr } from './BoxArr'
import { BoxBuf } from './BoxBuf'
import { BoxF64 } from './BoxF64'
import { BoxObj } from './BoxObj'
import { BufArr } from './BufArr'
import { BufF64 } from './BufF64'
import { BoxObjArr } from './BoxObjArr'
import { BoxArrArr } from './BoxArrArr'
import { getTime } from '../Utils'

type ValueOfArray<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType>
  ? ElementType
  : never

const leftModes = ['oneObj', 'oneArr', 'oneF64', 'objArr', 'arrArr', 'bufArr', 'bufF64'] as const
type LeftMode = ValueOfArray<typeof leftModes>

const rightModes = ['objArr', 'arrArr', 'bufArr', 'bufF64'] as const
type RightMode = ValueOfArray<typeof rightModes>

const opModes = ['expand', 'expand_flat', 'intersect', 'intersect_flat'] as const
type OptMode = ValueOfArray<typeof opModes>

export function test_Box() {
  const N = 1000
  const runCount = 100

  let leftMode: LeftMode = 'objArr'
  let rightMode: RightMode = 'objArr'
  let opMode: OptMode = 'expand'

  const args = process.argv.slice(2)
  if (args[1]) {
    leftMode = args[1] as any
  }
  if (args[2]) {
    rightMode = args[2] as any
  }
  if (args[3]) {
    opMode = args[3] as any
  }
  if (leftModes.indexOf(leftMode) === -1) {
    throw new Error(`invalid leftMode ${leftMode}`)
  }
  if (rightModes.indexOf(rightMode) === -1) {
    throw new Error(`invalid rightMode ${rightMode}`)
  }
  if (opModes.indexOf(opMode) === -1) {
    throw new Error(`invalid opMode ${opMode}`)
  }

  let cb: () => void
  const C = N * N
  if (leftMode === 'oneObj') {
    const leftBbox = BoxObj.new()
    if (rightMode === 'objArr') {
      const { boxes: rightBoxes } = new BoxObjArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.expandByBox(leftBbox, rightBoxes[i])
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.intersectsWithBox(leftBbox, rightBoxes[i])
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.expand(leftBbox, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.intersects(leftBbox, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : () => {}
    } else if (rightMode === 'arrArr') {
      const { boxes: rightBoxes } = new BoxArrArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.expandByBoxBuf(leftBbox, rightBoxes[i], 0)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.intersectsWithBoxBuf(leftBbox, rightBoxes[i], 0)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.expand(leftBbox, b[0], b[1], b[2], b[3])
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.intersects(leftBbox, b[0], b[1], b[2], b[3])
              }
            }
          : () => {}
    } else if (rightMode === 'bufArr' || rightMode === 'bufF64') {
      const { boxes: rightBoxes } = rightMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.expandByBoxBuf(leftBbox, rightBoxes, off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.intersectsWithBoxBuf(leftBbox, rightBoxes, off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.expand(
                  leftBbox,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.intersects(
                  leftBbox,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : () => {}
    } else {
      throw new Error('unknown rightMode')
    }
  } else if (leftMode === 'oneArr') {
    const leftBbox = BoxArr.new()
    if (rightMode === 'objArr') {
      const { boxes: rightBoxes } = new BoxObjArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxArr.expandByBox(leftBbox, rightBoxes[i])
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxArr.intersectsWithBox(leftBbox, rightBoxes[i])
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxArr.expand(leftBbox, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxArr.intersects(leftBbox, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : () => {}
    } else if (rightMode === 'arrArr') {
      const { boxes: rightBoxes } = new BoxArrArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxArr.expandByBoxBuf(leftBbox, rightBoxes[i], 0)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxArr.intersectsWithBoxBuf(leftBbox, rightBoxes[i], 0)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxArr.expand(leftBbox, b[0], b[1], b[2], b[3])
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxArr.intersects(leftBbox, b[0], b[1], b[2], b[3])
              }
            }
          : () => {}
    } else if (rightMode === 'bufArr' || rightMode === 'bufF64') {
      const { boxes: rightBoxes } = rightMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.expandByBoxBuf(leftBbox, rightBoxes, off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.intersectsWithBoxBuf(leftBbox, rightBoxes, off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.expand(
                  leftBbox,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.intersects(
                  leftBbox,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : () => {}
    } else {
      throw new Error('unknown rightMode')
    }
  } else if (leftMode === 'oneF64') {
    const leftBbox = BoxF64.new()
    if (rightMode === 'objArr') {
      const { boxes: rightBoxes } = new BoxObjArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxF64.expandByBox(leftBbox, rightBoxes[i])
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxF64.intersectsWithBox(leftBbox, rightBoxes[i])
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxF64.expand(leftBbox, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxF64.intersects(leftBbox, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : () => {}
    } else if (rightMode === 'arrArr') {
      const { boxes: rightBoxes } = new BoxArrArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxF64.expandByBoxBuf(leftBbox, rightBoxes[i], 0)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxF64.intersectsWithBoxBuf(leftBbox, rightBoxes[i], 0)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxF64.expand(leftBbox, b[0], b[1], b[2], b[3])
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxF64.intersects(leftBbox, b[0], b[1], b[2], b[3])
              }
            }
          : () => {}
    } else if (rightMode === 'bufArr' || rightMode === 'bufF64') {
      const { boxes: rightBoxes } = rightMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxF64.expandByBoxBuf(leftBbox, rightBoxes, off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxF64.intersectsWithBoxBuf(leftBbox, rightBoxes, off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxF64.expand(
                  leftBbox,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxF64.intersects(
                  leftBbox,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : () => {}
    } else {
      throw new Error('unknown rightMode')
    }
  } else if (leftMode === 'objArr') {
    const { boxes: leftBoxes } = new BoxObjArr(N)
    if (rightMode === 'objArr') {
      const { boxes: rightBoxes } = new BoxObjArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.expandByBox(leftBoxes[i], rightBoxes[i])
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.intersectsWithBox(leftBoxes[i], rightBoxes[i])
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.expand(leftBoxes[i], b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.intersects(leftBoxes[i], b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : () => {}
    } else if (rightMode === 'arrArr') {
      const { boxes: rightBoxes } = new BoxArrArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.expandByBoxBuf(leftBoxes[i], rightBoxes[i], 0)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxObj.intersectsWithBoxBuf(leftBoxes[i], rightBoxes[i], 0)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.expand(leftBoxes[i], b[0], b[1], b[2], b[3])
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxObj.intersects(leftBoxes[i], b[0], b[1], b[2], b[3])
              }
            }
          : () => {}
    } else if (rightMode === 'bufArr' || rightMode === 'bufF64') {
      const { boxes: rightBoxes } = rightMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.expandByBoxBuf(leftBoxes[i], rightBoxes, off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.intersectsWithBoxBuf(leftBoxes[i], rightBoxes, off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.expand(
                  leftBoxes[i],
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxObj.intersects(
                  leftBoxes[i],
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : () => {}
    } else {
      throw new Error('unknown rightMode')
    }
  } else if (leftMode === 'arrArr') {
    const { boxes: leftBoxes } = new BoxArrArr(N)
    if (rightMode === 'objArr') {
      const { boxes: rightBoxes } = new BoxObjArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxArr.expandByBox(leftBoxes[i], rightBoxes[i])
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0; i < C; ++i) {
                BoxArr.intersectsWithBox(leftBoxes[i], rightBoxes[i])
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxArr.expand(leftBoxes[i], b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0; i < C; ++i) {
                const b = rightBoxes[i]
                BoxArr.intersects(leftBoxes[i], b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : () => {}
    } else if (rightMode === 'arrArr') {
      const { boxes: rightBoxes } = new BoxArrArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.expandByBoxBuf(leftBoxes[i], rightBoxes[i], off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.intersectsWithBoxBuf(leftBoxes[i], rightBoxes[i], off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                const b = rightBoxes[i]
                BoxArr.expand(leftBoxes[i], b[0], b[1], b[2], b[3])
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                const b = rightBoxes[i]
                BoxArr.intersects(leftBoxes[i], b[0], b[1], b[2], b[3])
              }
            }
          : () => {}
    } else if (rightMode === 'bufArr' || rightMode === 'bufF64') {
      const { boxes: rightBoxes } = rightMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.expandByBoxBuf(leftBoxes[i], rightBoxes, off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.intersectsWithBoxBuf(leftBoxes[i], rightBoxes, off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.expand(
                  leftBoxes[i],
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxArr.intersects(
                  leftBoxes[i],
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : () => {}
    } else {
      throw new Error('unknown rightMode')
    }
  } else if (leftMode === 'bufArr' || leftMode === 'bufF64') {
    const { boxes: leftBoxes } = leftMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
    if (rightMode === 'objArr') {
      const { boxes: rightBoxes } = new BoxObjArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.expandByBox(leftBoxes, off, rightBoxes[i])
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.intersectsWithBox(leftBoxes, off, rightBoxes[i])
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                const b = rightBoxes[i]
                BoxBuf.expand(leftBoxes, off, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                const b = rightBoxes[i]
                BoxBuf.intersects(leftBoxes, off, b.minX, b.minY, b.maxX, b.maxY)
              }
            }
          : () => {}
    } else if (rightMode === 'arrArr') {
      const { boxes: rightBoxes } = new BoxArrArr(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.expandByBoxBuf(leftBoxes, off, rightBoxes[i], 0)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.intersectsWithBoxBuf(leftBoxes, off, rightBoxes[i], 0)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                const b = rightBoxes[i]
                BoxBuf.expand(leftBoxes, off, b[0], b[1], b[2], b[3])
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                const b = rightBoxes[i]
                BoxBuf.intersects(leftBoxes, off, b[0], b[1], b[2], b[3])
              }
            }
          : () => {}
    } else if (rightMode === 'bufArr' || rightMode === 'bufF64') {
      const { boxes: rightBoxes } = rightMode === 'bufArr' ? new BufArr(N) : new BufF64(N)
      cb =
        opMode === 'expand'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.expandByBoxBuf(leftBoxes, off, rightBoxes, off)
              }
            }
          : opMode === 'intersect'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.intersectsWithBoxBuf(leftBoxes, off, rightBoxes, off)
              }
            }
          : opMode === 'expand_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.expand(
                  leftBoxes,
                  off,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : opMode === 'intersect_flat'
          ? () => {
              for (let i = 0, off = 0; i < C; ++i, off += 4) {
                BoxBuf.intersects(
                  leftBoxes,
                  off,
                  rightBoxes[off],
                  rightBoxes[off + 1],
                  rightBoxes[off + 2],
                  rightBoxes[off + 3]
                )
              }
            }
          : () => {}
    } else {
      throw new Error('unknown rightMode')
    }
  } else {
    throw new Error('unknown leftMode')
  }

  const t = getTime(cb, runCount)
  console.log(`Box ${leftMode} - ${rightMode} - ${opMode} :  ${t} ms.`)
}
