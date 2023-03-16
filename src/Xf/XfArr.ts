import { makeXfArr } from '../Utils'
import { VecArr, VecObj } from './Vec'

export type XfArr = number[]

export type ConstXfArr = ReadonlyArray<number>

export const XfArr = {
  newForceDouble: makeXfArr,
  identity: [1, 0, 0, 1, 0, 0] as ConstXfArr,

  //------------------------------------------------------------------------------------------------
  new(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfArr {
    return [Xx, Xy, Yx, Yy, Tx, Ty] as XfArr
  },

  compose(xf_out: XfArr, parent: ConstXfArr, child: ConstXfArr): XfArr {
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
    const [ parent_Xx, parent_Xy, parent_Yx, parent_Yy, parent_Tx, parent_Ty ] = parent // prettier-ignore
    const [  child_Xx,  child_Xy,  child_Yx,  child_Yy,  child_Tx,  child_Ty ] = child // prettier-ignore
    xf_out[0] = parent_Xx * child_Xx + parent_Yx * child_Xy
    xf_out[1] = parent_Xy * child_Xx + parent_Yy * child_Xy
    xf_out[2] = parent_Xx * child_Yx + parent_Yx * child_Yy
    xf_out[3] = parent_Xy * child_Yx + parent_Yy * child_Yy
    xf_out[4] = parent_Xx * child_Tx + parent_Yx * child_Ty + parent_Tx
    xf_out[5] = parent_Xy * child_Tx + parent_Yy * child_Ty + parent_Ty
    return xf_out
  },

  transformBuf(xf: ConstXfArr, positions2d: number[] | Float64Array): void {
    const [Xx, Xy, Yx, Yy, Tx, Ty] = xf
    const len = positions2d.length
    for (let off = 0; off < len; off += 2) {
      const Vx = positions2d[off]
      const Vy = positions2d[off + 1]
      positions2d[off]     = Xx * Vx + Yx * Vy + Tx // prettier-ignore
      positions2d[off + 1] = Xy * Vx + Yy * Vy + Ty
    }
  },

  transformArrVecObj(xf: ConstXfArr, vecs: Array<VecObj>): void {
    const [Xx, Xy, Yx, Yy, Tx, Ty] = xf
    const len = vecs.length
    for (let i = 0; i < len; ++i) {
      const vec = vecs[i]
      const { x, y } = vec
      vec.x = Xx * x + Yx * y + Tx
      vec.y = Xy * x + Yy * y + Ty
    }
  },

  transformArrVecArr(xf: ConstXfArr, vecs: Array<VecArr>): void {
    const [Xx, Xy, Yx, Yy, Tx, Ty] = xf
    const len = vecs.length
    for (let i = 0; i < len; ++i) {
      const vec = vecs[i]
      const [x, y] = vec
      vec[0] = Xx * x + Yx * y + Tx
      vec[1] = Xy * x + Yy * y + Ty
    }
  },
}
