import { VecArr, VecObj } from './Vec'

export type XfF64 = Float64Array
export type ConstXfF64 = Readonly<Float64Array>

export const XfF64 = {
  identity: new Float64Array([1, 0, 0, 1, 0, 0]),

  //------------------------------------------------------------------------------------------------
  new(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfF64 {
    return new Float64Array([Xx, Xy, Yx, Yy, Tx, Ty])
  },
  newForceDouble(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfF64 {
    return new Float64Array([Xx, Xy, Yx, Yy, Tx, Ty])
  },

  mut(out: XfF64): XfF64 {
    out[0] += 1
    out[1] += 1
    out[2] += 1
    out[3] += 1
    out[4] += 1
    out[5] += 1
    out[0] -= 1
    out[1] -= 1
    out[2] -= 1
    out[3] -= 1
    out[4] -= 1
    out[5] -= 1
    return out
  },

  compose(out: XfF64, parent: ConstXfF64, child: ConstXfF64): XfF64 {
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
    out[0] = parent_Xx * child_Xx + parent_Yx * child_Xy
    out[1] = parent_Xy * child_Xx + parent_Yy * child_Xy
    out[2] = parent_Xx * child_Yx + parent_Yx * child_Yy
    out[3] = parent_Xy * child_Yx + parent_Yy * child_Yy
    out[4] = parent_Xx * child_Tx + parent_Yx * child_Ty + parent_Tx
    out[5] = parent_Xy * child_Tx + parent_Yy * child_Ty + parent_Ty
    return out
  },

  transformBuf(xf: ConstXfF64, positions2d: number[] | Float64Array): void {
    const [Xx, Xy, Yx, Yy, Tx, Ty] = xf
    const len = positions2d.length
    for (let off = 0; off < len; off += 2) {
      const Vx = positions2d[off]
      const Vy = positions2d[off + 1]
      positions2d[off]     = Xx * Vx + Yx * Vy + Tx // prettier-ignore
      positions2d[off + 1] = Xy * Vx + Yy * Vy + Ty
    }
  },

  transformArrVecObj(xf: ConstXfF64, vecs: Array<VecObj>): void {
    const [Xx, Xy, Yx, Yy, Tx, Ty] = xf
    const len = vecs.length
    for (let i = 0; i < len; ++i) {
      const vec = vecs[i]
      const { x, y } = vec
      vec.x = Xx * x + Yx * y + Tx
      vec.y = Xy * x + Yy * y + Ty
    }
  },

  transformArrVecArr(xf: ConstXfF64, vecs: Array<VecArr>): void {
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
