import { Box } from './Box'
import { Objs1, v8info_obj1 } from './Objs1'
import { Objs2, v8info_obj2 } from './Objs2'
import { Soa } from './Soa'
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
  if (mode === 'obj1') {
    v8info_obj1()

    const t0 = performance.now()

    const objs = new Objs1(N, classCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)

    v8natives.helpers.printStatus(Objs1.prototype.computeBigBox)
    v8natives.helpers.printStatus(Box.expandByBox)
  }
  //------------------------------------
  else if (mode === 'obj2') {
    v8info_obj2()

    const t0 = performance.now()

    const objs = new Objs2(N, classCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)

    v8natives.helpers.printStatus(Objs2.prototype.computeBigBox)
    v8natives.helpers.printStatus(Box.expandByBox)
  }
  //------------------------------------
  else if (mode === 'soa') {
    const t0 = performance.now()

    const objs = new Soa(N, classCount)

    const t1 = performance.now()

    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    const t2 = performance.now()
    console.log(`init          ${t1 - t0} milliseconds.`)
    console.log(`computeBigBox ${t2 - t1} milliseconds.`)

    v8natives.helpers.printStatus(Soa.prototype.computeBigBox)
    v8natives.helpers.printStatus(Box.expandByBoxBuf)
  }
  //
  else {
    throw new Error('must pass argument obj1,obj2,soa')
  }
}
