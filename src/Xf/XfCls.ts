import type { XfObj } from "./XfObj"

class XfCls_ implements XfObj {
  Xx: number
  Xy: number
  Yx: number
  Yy: number
  Tx: number
  Ty: number

  constructor(
    Xx: number,
    Xy: number,
    Yx: number,
    Yy: number,
    Tx: number,
    Ty: number
  ) {
    this.Xx = Xx
    this.Xy = Xy
    this.Yx = Yx
    this.Yy = Yy
    this.Tx = Tx
    this.Ty = Ty
  }
}

export const XfCls = {
  newForceDouble(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number):XfCls_ {
    return new XfCls_(-0 + Xx, -0 + Xy, -0 + Yx, -0 + Yy, -0 + Tx, -0 + Ty)
  },

  //------------------------------------------------------------------------------------------------
  new(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfCls_ {
    return new XfCls_(Xx, Xy, Yx, Yy, Tx, Ty)
  },

  mut(out: XfCls_): XfCls_ {
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

  compose(out: XfCls_, parent: Readonly<XfCls_>, child: Readonly<XfCls_>): XfCls_ {
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
  }
}
