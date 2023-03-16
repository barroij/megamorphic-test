import type { Buf } from "../Utils"

export const XfBuf = {
  compose(out:Buf, out_off:number, parent:Buf, parent_off:number, child:Buf, child_off:number) {
    const parent_Xx = parent[parent_off++]
    const parent_Xy = parent[parent_off++]
    const parent_Yx = parent[parent_off++]
    const parent_Yy = parent[parent_off++]
    const parent_Tx = parent[parent_off++]
    const parent_Ty = parent[parent_off++]
    const child_Xx = child[child_off++]
    const child_Xy = child[child_off++]
    const child_Yx = child[child_off++]
    const child_Yy = child[child_off++]
    const child_Tx = child[child_off++]
    const child_Ty = child[child_off++]
    out[out_off++] = parent_Xx * child_Xx + parent_Yx * child_Xy
    out[out_off++] = parent_Xy * child_Xx + parent_Yy * child_Xy
    out[out_off++] = parent_Xx * child_Yx + parent_Yx * child_Yy
    out[out_off++] = parent_Xy * child_Yx + parent_Yy * child_Yy
    out[out_off++] = parent_Xx * child_Tx + parent_Yx * child_Ty + parent_Tx
    out[out_off++] = parent_Xy * child_Tx + parent_Yy * child_Ty + parent_Ty
  }
}