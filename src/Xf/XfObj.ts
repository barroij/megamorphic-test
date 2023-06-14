import { makeXfObj } from '../Utils'
import { VecArr, VecObj } from './Vec'

export type XfObj = {
  Xx: number
  Xy: number
  Yx: number
  Yy: number
  Tx: number
  Ty: number
}

export type ConstXfObj = Readonly<XfObj>

export const XfObj = {
  newForceDouble: makeXfObj,

  identity: { Xx: 1, Xy: 0, Yx: 0, Yy: 1, Tx: 0, Ty: 0 } as ConstXfObj,
  //------------------------------------------------------------------------------------------------
  new(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfObj {
    return { Xx, Xy, Yx, Yy, Tx, Ty } as XfObj
  },

  mut(out: XfObj): XfObj {
    out.Xx += 1
    out.Xy += 1
    out.Yx += 1
    out.Yy += 1
    out.Tx += 1
    out.Ty += 1
    out.Xx -= 1
    out.Xy -= 1
    out.Yx -= 1
    out.Yy -= 1
    out.Tx -= 1
    out.Ty -= 1
    return out
  },

  compose(out: XfObj, parent: ConstXfObj, child: ConstXfObj): XfObj {
    /*
         parent        child            out
      | Xx Yx Tx | * | Xx Yx Tx | = | Xx Yx Tx |     (col major convention)
      | Xy Yy Ty |   | Xy Yy Ty |   | Xy Yy Ty |
      |  0  0  1 |   |  0  0  1 |   |  0  0  1 |

         child         parent           out
      [ Xx Xy  0 ] * [ Xx Xy  0 ] = [ Xx Xy  0 ]     (row major convention)
      [ Yx Yy  0 ]   [ Yx Yy  0 ]   [ Yx Yy  0 ]
      [ Tx Ty  1 ]   [ Tx Ty  1 ]   [ Tx Ty  1 ]
    */
    const { Xx: parent_Xx, Xy: parent_Xy, Yx: parent_Yx, Yy: parent_Yy, Tx: parent_Tx, Ty: parent_Ty } = parent // prettier-ignore
    const { Xx:  child_Xx, Xy:  child_Xy, Yx:  child_Yx, Yy:  child_Yy, Tx:  child_Tx, Ty:  child_Ty } = child // prettier-ignore
    out.Xx = parent_Xx * child_Xx + parent_Yx * child_Xy
    out.Xy = parent_Xy * child_Xx + parent_Yy * child_Xy
    out.Yx = parent_Xx * child_Yx + parent_Yx * child_Yy
    out.Yy = parent_Xy * child_Yx + parent_Yy * child_Yy
    out.Tx = parent_Xx * child_Tx + parent_Yx * child_Ty + parent_Tx
    out.Ty = parent_Xy * child_Tx + parent_Yy * child_Ty + parent_Ty
    return out
  },

  transformBuf(xf: ConstXfObj, positions2d: number[] | Float64Array): void {
    const { Xx, Xy, Yx, Yy, Tx, Ty } = xf
    const len = positions2d.length
    for (let off = 0; off < len; off += 2) {
      const Vx = positions2d[off]
      const Vy = positions2d[off + 1]
      positions2d[off]     = Xx * Vx + Yx * Vy + Tx // prettier-ignore
      positions2d[off + 1] = Xy * Vx + Yy * Vy + Ty
    }
  },

  transformArrVecObj(xf: ConstXfObj, vecs: Array<VecObj>): void {
    const { Xx, Xy, Yx, Yy, Tx, Ty } = xf
    const len = vecs.length
    for (let i = 0; i < len; ++i) {
      const vec = vecs[i]
      const { x, y } = vec
      vec.x = Xx * x + Yx * y + Tx
      vec.y = Xy * x + Yy * y + Ty
    }
  },

  transformArrVecArr(xf: ConstXfObj, vecs: Array<VecArr>): void {
    const { Xx, Xy, Yx, Yy, Tx, Ty } = xf
    const len = vecs.length
    for (let i = 0; i < len; ++i) {
      const vec = vecs[i]
      const [x, y] = vec
      vec[0] = Xx * x + Yx * y + Tx
      vec[1] = Xy * x + Yy * y + Ty
    }
  },
}
