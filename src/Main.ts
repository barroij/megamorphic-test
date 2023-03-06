import { Shapes } from './Shapes'
import { Shapes2 } from './Shapes2'
import { Shapes3 } from './Shapes3'

export function main() {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  const boxCount = 1000
  const runCount = 100

  //------------------------------------
  if (process.argv.includes('obj')) {
    const t0 = performance.now()

    const shapes = new Shapes(boxCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      shapes.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)
  }
  //------------------------------------
  else if (process.argv.includes('obj2')) {
    const t0 = performance.now()

    const shapes = new Shapes2(boxCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      shapes.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)
  }
  //------------------------------------
  else if (process.argv.includes('soa')) {
    const t0 = performance.now()

    const shapes = new Shapes3(boxCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      shapes.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)
  }
  //
  else {
    throw new Error('must pass argument obj,obj2,soa')
  }
}
