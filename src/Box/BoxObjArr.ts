import { arrayAlloc } from '../ArrayUtils'
import { forEachIJ } from '../Utils'
import { BoxObj } from './BoxObj'

//--------------------------------------------------------------------------------------------------
export class BoxObjArr {
  readonly boxes: BoxObj[] = []
  readonly N
  constructor(N: number) {
    this.N = N
    this.boxes = arrayAlloc<BoxObj>(N * N)
    let k = 0
    forEachIJ(N, (_i, _j) => {
      this.boxes[k++] = BoxObj.new()
    })
    this.reset(0)
  }

  reset(seed: number) {
    const { boxes, N } = this
    let k = 0
    forEachIJ(N, (i, j) => {
      const b = boxes[k++]
      b.minX = seed + i + 0.1
      b.minY = seed + j - 0.2
      b.maxX = seed + i + 1 + 0.3
      b.maxY = seed + j + 1 - 0.4
    })
  }
}
