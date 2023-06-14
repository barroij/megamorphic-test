import { test_Box } from './Box/TestBox'
import { v8natives } from './v8natives'
import { test_Mat } from './Xf/TestXf'
import { XfCls } from './Xf/XfCls'
import { XfCls2 } from './Xf/XfCls2'
import { XfObj } from './Xf/XfObj'

/* enum TestEnum {
  TOTO,
  TATA
 }

 enum TestEnum2 {
  TOTO = "TOTO",
  TATA = "TATA"
 }*/
export function main() {
  const args = process.argv.slice(2)
  if (args[0] === 'box') {
    test_Box()
  } else if (args[0] === 'xf') {
    test_Mat()
  } else if (args[0] === 'test') {
    // const xfarr = XfArr.new(1, 0, 0, 1, 0, 0)
    //console.log(v8natives.debugPrint(xfarr))
    function createOneAfterMany<T>(
      f: (Xx: number, Xy: number, Yx: number, Yy: number, Tx: number, Ty: number) => T
    ): T {
      const xf0 = f(1, 0, 0, 1, 0, 0)
      const xf1 = xf0 && f(1, 0, 0, 1, 0, 0)
      const xf2 = xf1 && f(1, 0, 0, 1, 0, 0)
      const xf3 = xf2 && f(1, 0, 0, 1, 0, 0)
      const xf4 = xf3 && f(1, 0, 0, 1, 0, 0)
      const xf5 = xf4 && f(1, 0, 0, 1, 0, 0)
      const xf6 = xf5 && f(1, 0, 0, 1, 0, 0)
      if (xf6) {
        return f(1, 0, 0, 1, 0, 0)
      }
      throw new Error('')
    }

    function getAllPropertyNames(obj: any): string[] {
      const props: string[] = []

      do {
        Object.getOwnPropertyNames(obj).forEach(function(prop) {
          if (props.indexOf(prop) === -1) {
            props.push(prop)
          }
        })
      } while ((obj = Object.getPrototypeOf(obj)))

      return props
    }

    function getAllKeys(obj:object): (string | symbol)[] {
      let keys: (string | symbol)[] = [];
      // if primitive (primitives still have keys) skip the first iteration
      if (!(obj instanceof Object)) {
          obj = Object.getPrototypeOf(obj)
      }
      while (obj) {
          keys = keys.concat(Reflect.ownKeys(obj));
          obj = Object.getPrototypeOf(obj);
      }
      return keys;
  }

    const xfCls = createOneAfterMany(XfCls.new)
    const xfCls2 = createOneAfterMany(XfCls2.new)
    const xfObj = createOneAfterMany(XfObj.new)

    console.log(`---------------------------------------------------------------------`)
    console.log(`getAllPropertyNames(xfCls) = ${getAllPropertyNames(xfCls)}`)
    console.log(`getAllPropertyNames(xfCls2) = ${getAllPropertyNames(xfCls2)}`)
    console.log(`getAllPropertyNames(xfObj) = ${getAllPropertyNames(xfObj)}`)
    console.log(`---------------------------------------------------------------------`)
    console.log(`getAllKeys(xfCls) = ${getAllKeys(xfCls)}`)
    console.log(`getAllKeys(xfCls2) = ${getAllKeys(xfCls2)}`)
    console.log(`getAllKeys(xfObj) = ${getAllKeys(xfObj)}`)
    console.log(`---------------------------------------------------------------------`)
    console.log(`haveSameMap(xfCls, xfCls2 = ${v8natives.haveSameMap(xfCls, xfCls2)}`)
    console.log(`haveSameMap(xfCls, xfObj) = ${v8natives.haveSameMap(xfCls, xfObj)}`)
    console.log(`haveSameMap(xfCls2, xfObj) = ${v8natives.haveSameMap(xfCls2, xfObj)}`)

    v8natives.debugPrint(xfCls)
    v8natives.debugPrint(xfCls2)
    v8natives.debugPrint(xfObj)

    console.log(
      '--------------------------------------- mut ---------------------------------------'
    )
    XfCls.mut(xfCls)
    XfCls2.mut(xfCls2)
    XfObj.mut(xfObj)

    console.log(`haveSameMap(xfCls, xfCls2 = ${v8natives.haveSameMap(xfCls, xfCls2)}`)
    console.log(`haveSameMap(xfCls, xfObj) = ${v8natives.haveSameMap(xfCls, xfObj)}`)
    console.log(`haveSameMap(xfCls2, xfObj) = ${v8natives.haveSameMap(xfCls2, xfObj)}`)

    v8natives.debugPrint(xfCls)
    v8natives.debugPrint(xfCls2)
    v8natives.debugPrint(xfObj)
    // v8natives.debugPrint(xfCls)
    //console.log(v8natives.debugPrint(xfCls))
    XfCls.mut(xfCls)
    // const str = v8natives.debugPrint(xfCls) as any
    // console.log(str === xfCls)
    // console.log(eval("%DebugPrint(xfCls)"))

    //const dbg1_lines = dbg1.split('\n')
    //console.log(dbg1_lines)
    /*
    console.log("------- XfObj.new ------ ")
    const xfObj = XfObj.new(1, 0, 0, 1, 0, 0)
    const xfObj2 = XfObj.new(1, 2, 3, 4, 5, 6)
    xfObj.Xx = 0
    console.log(v8natives.haveSameMap(xfObj, xfObj2))
    console.log(v8natives.debugPrint(xfObj))
    console.log(v8natives.debugPrint(xfObj2))
    console.log("------- XfObj.mut(xfObj) ------ ")
    XfObj.mut(xfObj)
    console.log(v8natives.haveSameMap(xfObj, xfObj2))
    console.log(v8natives.debugPrint(xfObj))
    console.log(v8natives.debugPrint(xfObj2))
*/
    // v8natives.debugPrint(TestEnum)
    // v8natives.debugPrint(TestEnum2)

    console.log(` ------------------------------------------------- `)

    const arr1 = [-0]
    arr1.length = 2096
    v8natives.debugPrint(arr1)
    const arr2 = arr1.slice()
    v8natives.debugPrint(arr2)
  } else {
    throw new Error('Unknow command' + args[0])
  }
}
