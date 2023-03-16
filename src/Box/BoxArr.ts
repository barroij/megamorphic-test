import type { Buf } from "../Utils"
import type { ConstBoxObj } from "./BoxObj"

export type BoxArr = number[]
export type ConstBoxArr = Readonly<BoxArr>
export const BoxArr = {
  //------------------------------------------------------------------------------------------------
  new(): BoxArr {
    return [Infinity, Infinity, -Infinity, -Infinity]
  },

  reset(box: BoxArr) {
    box[0] = Infinity
    box[1] = Infinity
    box[2] = -Infinity
    box[3] = -Infinity
  },
  //------------------------------------------------------------------------------------------------
  intersects(box: BoxArr, minX: number, minY: number, maxX: number, maxY: number): boolean {
    return maxX >= box[0] && maxY >= box[1] && minX <= box[2] && minY <= box[3]
  },

  //------------------------------------------------------------------------------------------------
  expand(box: BoxArr, minX: number, minY: number, maxX: number, maxY: number): void {
      if (minX < box[0]) { box[0] = minX }
      if (minY < box[1]) { box[1] = minY }
      if (maxX > box[2]) { box[2] = maxX }
      if (maxY > box[3]) { box[3] = maxY }
  }, // prettier-ignore

  //------------------------------------------------------------------------------------------------
  intersectsWithBox(box: BoxArr, other: ConstBoxObj): boolean {
    const { minX, minY, maxX, maxY } = other
    return maxX >= box[0] && maxY >= box[1] && minX <= box[2] && minY <= box[3]
  },

  //------------------------------------------------------------------------------------------------
  expandByBox(box: BoxArr, other: ConstBoxObj): void {
      const { minX, minY, maxX, maxY } = other
      if (minX < box[0]) { box[0] = minX }
      if (minY < box[1]) { box[1] = minY }
      if (maxX > box[2]) { box[2] = maxX }
      if (maxY > box[3]) { box[3] = maxY }
  }, // prettier-ignore

  //------------------------------------------------------------------------------------------------
  intersectsWithBoxBuf(box: BoxArr, buf: Buf, off: number): boolean {
    const minX = buf[off  ]
    const minY = buf[off+1]
    const maxX = buf[off+2]
    const maxY = buf[off+3]
    return maxX >= box[0] && maxY >= box[1] && minX <= box[2] && minY <= box[3]
  },

  //------------------------------------------------------------------------------------------------
  expandByBoxBuf(box: BoxArr, buf: Buf, off: number): void {
      const minX = buf[off]
      const minY = buf[off+1]
      const maxX = buf[off+2]
      const maxY = buf[off+3]
      if (minX < box[0]) { box[0] = minX }
      if (maxX > box[1]) { box[1] = maxX }
      if (minY < box[2]) { box[2] = minY }
      if (maxY > box[3]) { box[3] = maxY }
  } // prettier-ignore
}
