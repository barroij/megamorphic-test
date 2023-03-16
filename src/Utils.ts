export type Buf = number[] | Float64Array

export function getTime(cb: () => void, runCount: number): string {
  const run = () => {
    for (let i = 0; i < runCount; ++i) {
      cb()
    }
  }

  run() // warm up
  const gc = (globalThis as any).gc
  gc?.()
  const t2 = performance.now()
  run() // bench
  const t3 = performance.now()

  return `${(t3 - t2).toFixed(0)}`
}

export function forEachIJ(N: number, ijCb: (i: number, j: number) => void) {
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      ijCb(i, j)
    }
  }
}

export function makeVec(x: number, y: number) {
  return { x: -0 + x, y: -0 + y }
}

export function makeXfObj(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number) {
  return {
    Xx: -0 + Xx,
    Xy: -0 + Xy,
    Yx: -0 + Yx,
    Yy: -0 + Yy,
    Tx: -0 + Tx,
    Ty: -0 + Ty,
  }
}

export function makeXfArr(Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number) {
  return [-0 + Xx, -0 + Xy, -0 + Yx, -0 + Yy, -0 + Tx, -0 + Ty]
}
