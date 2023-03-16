// the implementation using dummyArrayLen() settled after many tries, so not change it unless you test correctly
// see v8nativesHoleyArray.test.ts
const _emptyArray: any[] = []
const _dummyArrayLen: any[] = []
//--------------------------------------------------------------------------------------------------
function dummyArrayLen<T>(length: number): T[] {
  // because setting _dummyArrayLen.length = 0 creates holey array for some reason...
  if (length === 0) {
    return _emptyArray
  }
  _dummyArrayLen.length = length
  return _dummyArrayLen
}

type AnyFunction = (...args: any[]) => any
type AnythingButNumber = null | string | Record<string, any> | AnyFunction | any[]
type ArrayAllocLength<V> = V extends AnythingButNumber
  ? number
  : 'you should provide a type different from number'
export function arrayAlloc<T = number>(length: ArrayAllocLength<T>, initValue?: T): T[] {
  if (length === 0) {
    return [] // not necessary, but faster than calling Array.from(dummyArrayLen(0))
  }
  const arr = Array.from(dummyArrayLen(length as number)) as T[]
  if (initValue !== undefined) {
    arr.fill(initValue)
    // COMMENTED BECAUSE arr.fill(initValue) is better, but maybe fill is not available everywhere
    // for (let i = 0; i < length; ++i) {
    //   arr[i] = initValue
    // }
  }
  return arr
}
