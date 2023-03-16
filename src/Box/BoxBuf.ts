import type { Buf } from "../Utils"
import type { ConstBoxObj } from "./BoxObj"


export const BoxBuf = {
  reset(box: Buf, boxOff:number) {
    box[boxOff    ] = Infinity
    box[boxOff + 1] = Infinity
    box[boxOff + 2] = -Infinity
    box[boxOff + 3] = -Infinity
  },
  //------------------------------------------------------------------------------------------------
  intersects(box: Buf, boxOff:number, minX: number, minY: number, maxX: number, maxY: number): boolean {
    return maxX >= box[boxOff] && maxY >= box[boxOff + 1] && minX <= box[boxOff + 2] && minY <= box[boxOff + 3]
  },

  //------------------------------------------------------------------------------------------------
  expand(box: Buf, boxOff:number, minX: number, minY: number, maxX: number, maxY: number): void {
    if (minX < box[boxOff    ]) { box[boxOff    ] = minX }
    if (minY < box[boxOff + 1]) { box[boxOff + 1] = minY }
    if (maxX > box[boxOff + 2]) { box[boxOff + 2] = maxX }
    if (maxY > box[boxOff + 3]) { box[boxOff + 3] = maxY }
  },

  //------------------------------------------------------------------------------------------------
  intersectsWithBox(box: Buf, boxOff:number, other: ConstBoxObj): boolean {
    const { minX, minY, maxX, maxY } = other
    return maxX >= box[boxOff] && maxY >= box[boxOff + 1] && minX <= box[boxOff + 2] && minY <= box[boxOff + 3]
  },

  //------------------------------------------------------------------------------------------------
  expandByBox(box: Buf, boxOff:number, other: ConstBoxObj): void {
    const { minX, minY, maxX, maxY } = other
    if (minX < box[boxOff    ]) { box[boxOff    ] = minX }
    if (minY < box[boxOff + 1]) { box[boxOff + 1] = minY }
    if (maxX > box[boxOff + 2]) { box[boxOff + 2] = maxX }
    if (maxY > box[boxOff + 3]) { box[boxOff + 3] = maxY }
  },

  //------------------------------------------------------------------------------------------------
  intersectsWithBoxBuf(box: Buf, boxOff:number, buf: Buf, off: number): boolean {
    const minX = buf[off]
    const minY = buf[off+1]
    const maxX = buf[off+2]
    const maxY = buf[off+3]
    return maxX >= box[boxOff] && maxY >= box[boxOff + 1] && minX <= box[boxOff + 2] && minY <= box[boxOff + 3]
  },


  //------------------------------------------------------------------------------------------------
  expandByBoxBuf(box: Buf, boxOff:number, buf: Buf, off: number): void {
    const minX = buf[off++]
    const minY = buf[off++]
    const maxX = buf[off++]
    const maxY = buf[off]
    if (minX < box[boxOff    ]) { box[boxOff    ] = minX }
    if (maxX > box[boxOff + 1]) { box[boxOff + 1] = maxX }
    if (minY < box[boxOff + 2]) { box[boxOff + 2] = minY }
    if (maxY > box[boxOff + 3]) { box[boxOff + 3] = maxY }
  }
}