import type { Buf } from "../Utils"
import type { ConstBoxObj } from "./BoxObj"

export type BoxF64 = Float64Array
export type ConstBoxF64 = Readonly<BoxF64>
export const BoxF64 = {
  //------------------------------------------------------------------------------------------------
  new(): BoxF64 {
    return new Float64Array([Infinity, Infinity, -Infinity, -Infinity])
  },

  reset(box: BoxF64) {
    box[0] = Infinity
    box[1] = Infinity
    box[2] = -Infinity
    box[3] = -Infinity
  },

  //------------------------------------------------------------------------------------------------
  intersects(box: BoxF64, minX: number, minY: number, maxX: number, maxY: number): boolean {
    return maxX >= box[0] && maxY >= box[1] && minX <= box[2] && minY <= box[3]
  },

  //------------------------------------------------------------------------------------------------
  expand(box: BoxF64, minX: number, minY: number, maxX: number, maxY: number): void {
      if (minX < box[0]) { box[0] = minX }
      if (minY < box[1]) { box[1] = minY }
      if (maxX > box[2]) { box[2] = maxX }
      if (maxY > box[3]) { box[3] = maxY }
  },

  //------------------------------------------------------------------------------------------------
  intersectsWithBox(box: BoxF64, other: ConstBoxObj): boolean {
    const { minX, minY, maxX, maxY } = other
    return maxX >= box[0] && maxY >= box[1] && minX <= box[2] && minY <= box[3]
  },

  //------------------------------------------------------------------------------------------------
  expandByBox(box: BoxF64, other: ConstBoxObj): void {
      const { minX, minY, maxX, maxY } = other
      if (minX < box[0]) { box[0] = minX }
      if (minY < box[1]) { box[1] = minY }
      if (maxX > box[2]) { box[2] = maxX }
      if (maxY > box[3]) { box[3] = maxY }
  },

  //------------------------------------------------------------------------------------------------
  intersectsWithBoxBuf(box: BoxF64, buf: Buf, off: number): boolean {
    const minX = buf[off  ]
    const minY = buf[off+1]
    const maxX = buf[off+2]
    const maxY = buf[off+3]
    return maxX >= box[0] && maxY >= box[1] && minX <= box[2] && minY <= box[3]
  },

  //------------------------------------------------------------------------------------------------
  expandByBoxBuf(box: BoxF64, buf: Buf, off: number): void {
      const minX = buf[off  ]
      const minY = buf[off+1]
      const maxX = buf[off+2]
      const maxY = buf[off+3]
      if (minX < box[0]) { box[0] = minX }
      if (maxX > box[1]) { box[1] = maxX }
      if (minY < box[2]) { box[2] = minY }
      if (maxY > box[3]) { box[3] = maxY }
  }
}
