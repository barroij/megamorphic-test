import { Cls } from './Cls'
import { Objs1 } from './Objs1'
import { Objs2 } from './Objs2'
import { Soa } from './Soa'

function logTimes(t0: number, t1: number, t2: number, t3: number) {
  console.log(`init          ${(t1 - t0).toFixed(0)} milliseconds.`)
  console.log(`computeBigBox ${(t3 - t2).toFixed(0)} milliseconds.`)
}

export function main() {
  const N = 1000
  const runCount = 100

  let mode: string = 'obj1'
  let classCount = 5

  if (process.env.MEGAMORPHIC_TEST_MODE) {
    mode = process.env.MEGAMORPHIC_TEST_MODE
  }
  if (process.env.MEGAMORPHIC_TEST_CLASSCOUNT) {
    classCount = Number.parseInt(process.env.MEGAMORPHIC_TEST_CLASSCOUNT)
  }

  const args = process.argv.slice(2)
  if (args[0]) {
    mode = args[0]
  }
  if (args[1]) {
    classCount = Number.parseInt(args[1])
  }

  if (Number.isNaN(classCount)) {
    throw new Error(`must pass classCount in [1..5], classCount=${classCount}`)
  }

  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  console.log(`mode=${mode}`)
  console.log(`classCount=${classCount}`)

  //------------------------------------
  if (mode === 'obj1') {
    const t0 = performance.now()
    const objs = new Objs1(N, classCount)
    const t1 = performance.now()

    // warm up
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    // bench
    const t2 = performance.now()
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }
    const t3 = performance.now()

    logTimes(t0, t1, t2, t3)

    // COMMENTED BECAUSE printStatus() does not give reliable results
    //v8natives.helpers.printStatus(Objs1.prototype.computeBigBox)
    //v8natives.helpers.printStatus(Box.expandByBox)
  }
  //------------------------------------
  else if (mode === 'obj2') {
    const t0 = performance.now()
    const objs = new Objs2(N, classCount)
    const t1 = performance.now()

    // warm up
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    // bench
    const t2 = performance.now()
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }
    const t3 = performance.now()

    logTimes(t0, t1, t2, t3)

    // COMMENTED BECAUSE printStatus() does not give reliable results
    //v8natives.helpers.printStatus(Objs2.prototype.computeBigBox)
    //v8natives.helpers.printStatus(Box.expandByBox)
  }
  //------------------------------------
  else if (mode === 'soa') {
    const t0 = performance.now()
    const objs = new Soa(N, classCount)
    const t1 = performance.now()

    // warm up
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    // bench
    const t2 = performance.now()
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }
    const t3 = performance.now()

    logTimes(t0, t1, t2, t3)

    // COMMENTED BECAUSE printStatus() does not give reliable results
    //v8natives.helpers.printStatus(Soa.prototype.computeBigBox)
    //v8natives.helpers.printStatus(Box.expandByBoxBuf)
  }
  //------------------------------------
  else if (mode === 'cls') {
    const t0 = performance.now()
    const objs = new Cls(N, classCount)
    const t1 = performance.now()

    // warm up
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }

    // bench
    const t2 = performance.now()
    for (let i = 0; i < runCount; ++i) {
      objs.computeBigBox()
    }
    const t3 = performance.now()

    logTimes(t0, t1, t2, t3)

    // COMMENTED BECAUSE printStatus() does not give reliable results
    //v8natives.helpers.printStatus(Cls.prototype.computeBigBox)
    //v8natives.helpers.printStatus(BoxCls.prototype.expandByBox)
  }
  //
  else {
    throw new Error('must pass argument obj1,obj2,soa,cls')
  }
}
