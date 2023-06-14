import type { XfObj } from "./XfObj"

interface XfCls2_ {
  Xx: number
  Xy: number
  Yx: number
  Yy: number
  Tx: number
  Ty: number
}

// make typescript happy with old style constructor function of javascript
// https://stackoverflow.com/a/49799592
interface XfCls2_Constructor {
  new(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfCls2_,
  prototype: XfCls2_
}

const XfCls2_ = function XfCls2_(this:XfCls2_,
    Xx: number,
    Xy: number,
    Yx: number,
    Yy: number,
    Tx: number,
    Ty: number
  ): XfObj {
    this.Xx = Xx
    this.Xy = Xy
    this.Yx = Yx
    this.Yy = Yy
    this.Tx = Tx
    this.Ty = Ty
    return this
  } as Function as XfCls2_Constructor

export const XfCls2 = {
  newForceDouble(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number):XfCls2_ {
    return new XfCls2_(-0 + Xx, -0 + Xy, -0 + Yx, -0 + Yy, -0 + Tx, -0 + Ty)
  },

  //------------------------------------------------------------------------------------------------
  new(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number): XfCls2_ {
    return new XfCls2_(Xx, Xy, Yx, Yy, Tx, Ty)
  },

  mut(out: XfCls2_): XfCls2_ {
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

  compose(out: XfCls2_, parent: Readonly<XfCls2_>, child: Readonly<XfCls2_>): XfCls2_ {
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
