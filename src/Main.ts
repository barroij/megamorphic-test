import { test_Box } from './Box/TestBox'
import { makeXfArr, makeXfObj } from './Utils'
import { v8natives } from './v8natives'
import { test_Mat } from './Xf/TestXf'
import { XfArr } from './Xf/XfArr'
import { XfObj } from './Xf/XfObj'

export function main() {
  const args = process.argv.slice(2)
  if (args[0] === 'box') {
    test_Box()
  } else if (args[0] === 'xf') {
    test_Mat()
  } else if (args[0] === 'test') {
    const xf = makeXfObj(1, 0, 0, 1, 0, 0)
    const xf2 = makeXfArr(1, 0, 0, 1, 0, 0)

    console.log(v8natives.haveSameMap(XfObj.identity, xf))
    console.log(v8natives.haveSameMap(XfArr.identity, xf2))

    console.log(v8natives.debugPrint(XfArr.identity))
    console.log(v8natives.debugPrint(xf2))
  } else {
    throw new Error('Unknow command' + args[0])
  }
}
