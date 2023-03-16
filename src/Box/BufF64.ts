import { forEachIJ } from '../Utils'

//--------------------------------------------------------------------------------------------------
export class BufF64 {
  readonly boxes: Float64Array
  readonly N
  constructor(N: number) {
    this.N = N
    this.boxes = new Float64Array(4 * N * N)
    this.reset()
  }

  reset() {
    const { boxes, N } = this
    let k = 0
    forEachIJ(N, (i, j) => {
      boxes[k++] = i + 0.1
      boxes[k++] = j - 0.2
      boxes[k++] = i + 1 + 0.3
      boxes[k++] = j + 1 - 0.4
    })
  }
}
