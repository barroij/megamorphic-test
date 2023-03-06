export interface Box {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export type ConstBox = Readonly<Box>;

export const Box = {
  //------------------------------------------------------------------------------------------------
  new(): Box {
    return {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    };
  },

  //------------------------------------------------------------------------------------------------
  setFromBox(box: Box, other: ConstBox): void {
    Box.set(box, other.minX, other.minY, other.maxX, other.maxY);
  },

  //------------------------------------------------------------------------------------------------
  set(box: Box, minX: number, minY: number, maxX: number, maxY: number): void {
    box.minX = minX;
    box.minY = minY;
    box.maxX = maxX;
    box.maxY = maxY;
  },

  //------------------------------------------------------------------------------------------------
  expandByBox(box: Box, other: ConstBox): void {
    if (other.minX < box.minX) { box.minX = other.minX }
    if (other.minY < box.minY) { box.minY = other.minY }
    if (other.maxX > box.maxX) { box.maxX = other.maxX }
    if (other.maxY > box.maxY) { box.maxY = other.maxY }
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
};
