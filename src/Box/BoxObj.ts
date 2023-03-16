export type BoxObj = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export type ConstBoxObj = Readonly<BoxObj>

export const BoxObj = {
  //------------------------------------------------------------------------------------------------
  new(): BoxObj {
    const b = {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    }
    //Object.seal(b)
    return b
  },

  reset(box: BoxObj) {
    box.minX = Infinity
    box.minY = Infinity
    box.maxX = -Infinity
    box.maxY = -Infinity
  },

  //------------------------------------------------------------------------------------------------
  intersects(box: BoxObj, minX: number, minY: number, maxX: number, maxY: number): boolean {
    return maxX >= box.minX && minX <= box.maxX && maxY >= box.minY && minY <= box.maxY
  },

  //------------------------------------------------------------------------------------------------
  expand(box: BoxObj, minX: number, minY: number, maxX: number, maxY: number): void {
    if (minX < box.minX) { box.minX = minX }
    if (minY < box.minY) { box.minY = minY }
    if (maxX > box.maxX) { box.maxX = maxX }
    if (maxY > box.maxY) { box.maxY = maxY }
  }, // prettier-ignore

  //------------------------------------------------------------------------------------------------
  intersectsWithBox(box1: BoxObj, other: ConstBoxObj): boolean {
    const { minX, minY, maxX, maxY } = other
    return maxX >= box1.minX && minX <= box1.maxX && maxY >= box1.minY && minY <= box1.maxY
  },

  //------------------------------------------------------------------------------------------------
  expandByBox(box: BoxObj, other: ConstBoxObj): void {
    const { minX, minY, maxX, maxY } = other
    if (minX < box.minX) { box.minX = minX }
    if (minY < box.minY) { box.minY = minY }
    if (maxX > box.maxX) { box.maxX = maxX }
    if (maxY > box.maxY) { box.maxY = maxY }
  }, // prettier-ignore

  //------------------------------------------------------------------------------------------------
  intersectsWithBoxBuf(box1: BoxObj, buf: number[] | Float64Array, off: number): boolean {
    const minX = buf[off]
    const minY = buf[off + 1]
    const maxX = buf[off + 2]
    const maxY = buf[off + 3]
    return maxX >= box1.minX && minX <= box1.maxX && maxY >= box1.minY && minY <= box1.maxY
  },

  //------------------------------------------------------------------------------------------------
  expandByBoxBuf(box: BoxObj, buf: number[] | Float64Array, off: number): void {
    const minX = buf[off]
    const minY = buf[off+1]
    const maxX = buf[off+2]
    const maxY = buf[off+3]
    if (minX < box.minX) { box.minX = minX }
    if (maxX > box.maxX) { box.maxX = maxX }
    if (minY < box.minY) { box.minY = minY }
    if (maxY > box.maxY) { box.maxY = maxY }
  } // prettier-ignore
}
