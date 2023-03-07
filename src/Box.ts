export type Box = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export type ConstBox = Readonly<Box>

export const Box = {
  //------------------------------------------------------------------------------------------------
  new(): Box {
    return {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    }
  },

  //------------------------------------------------------------------------------------------------
  expandByBox(box: Box, other: ConstBox): void {
    const { minX, minY, maxX, maxY } = other
    if (minX < box.minX) { box.minX = minX }
    if (minY < box.minY) { box.minY = minY }
    if (maxX > box.maxX) { box.maxX = maxX }
    if (maxY > box.maxY) { box.maxY = maxY }
  }, // prettier-ignore

  //------------------------------------------------------------------------------------------------
  expandByBoxBuf(box: Box, buf: number[], off: number): void {
    const minX = buf[off++]
    const minY = buf[off++]
    const maxX = buf[off++]
    const maxY = buf[off]
    if (minX < box.minX) { box.minX = minX }
    if (maxX > box.maxX) { box.maxX = maxX }
    if (minY < box.minY) { box.minY = minY }
    if (maxY > box.maxY) { box.maxY = maxY }
  } // prettier-ignore
}
