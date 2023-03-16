import { forEachIJ } from '../Utils'

//--------------------------------------------------------------------------------------------------
export class BufArr {
  readonly boxes: number[] = []
  readonly N
  constructor(N: number) {
    this.N = N
    const b: number[] = (this.boxes = [])
    forEachIJ(N, (i, j) => {
      b.push(i + 0.1, j - 0.2, i + 1 + 0.3, j + 1 - 0.4)
    })
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
