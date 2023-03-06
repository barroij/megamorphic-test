import { Box } from './Box'
import { Shapes, v8info_obj } from './Shapes'
import { Shapes2, v8info_obj2 } from './Shapes2'
import { Shapes3 } from './Shapes3'
import { v8natives } from './v8natives'

export function main() {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  const N = 1000
  const runCount = 100

  const mode = process.argv[2]
  const classCount = Number.parseInt(process.argv[3])
  if (classCount === Number.NaN) {
    throw new Error('must pass classCount in [1..5]')
  }

  //------------------------------------
  if (mode === 'obj') {
    v8info_obj()

    const t0 = performance.now()

    const shapes = new Shapes(N, classCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      shapes.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)

    v8natives.helpers.printStatus(Shapes.prototype.computeBigBox)
    v8natives.helpers.printStatus(Box.expandByBox)
  }
  //------------------------------------
  else if (mode === 'obj2') {
    v8info_obj2()

    const t0 = performance.now()

    const shapes = new Shapes2(N, classCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      shapes.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)

    v8natives.helpers.printStatus(Shapes2.prototype.computeBigBox)
    v8natives.helpers.printStatus(Box.expandByBox)
  }
  //------------------------------------
  else if (mode === 'soa') {
    const t0 = performance.now()

    const shapes = new Shapes3(N, classCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      shapes.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)

    v8natives.helpers.printStatus(Shapes3.prototype.computeBigBox)
    v8natives.helpers.printStatus(Box.expandByBoxBuf)
  }
  //
  else {
    throw new Error('must pass argument obj,obj2,soa')
  }
}
