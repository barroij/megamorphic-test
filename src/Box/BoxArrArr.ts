import { forEachIJ } from '../Utils'
import { BoxArr } from './BoxArr'

//--------------------------------------------------------------------------------------------------
export class BoxArrArr {
  readonly boxes: BoxArr[] = []
  readonly N
  constructor(N: number) {
    this.N = N
    this.boxes = []
    forEachIJ(N, (_i, _j) => {
      this.boxes.push(BoxArr.new())
    })
    this.reset()
  }

  reset() {
    const { boxes, N } = this
    let k = 0
    forEachIJ(N, (i, j) => {
      const b = boxes[k++]
      b[0] = i + 0.1
      b[1] = j - 0.2
      b[2] = i + 1 + 0.3
      b[3] = j + 1 - 0.4
    })
  }
}
