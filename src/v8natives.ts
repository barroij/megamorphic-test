/// <reference types="./v8natives" />
import v8_natives from 'v8-natives' // v8_natives = {} on browser because "browser": { "v8-natives": false } in package.json

// https://github.com/Nathanaela/v8-natives

// v8natives
//
// to use v8natives we must use
// - on chrome:   chrome --js-flags="--allow-natives-syntax"
// - on node:     node --allow-natives-syntax
//
// - when invoking jest via CRA react-scripts:
//    1.   node node_modules/react-scripts/bin/react-scripts --allow-natives-syntax --expose-gc test -t=base
//    2.        node_modules/.bin/react-scripts              --allow-natives-syntax --expose-gc test -t=base
//
// 'v8-natives' does not work with CRA/Webpack/typescript
// SyntaxError: client/node_modules/v8-natives/lib\v8-native-calls.js: Unexpected token (41:13)
// that's why we put "browser": { "v8-natives": false } in the package.json
// to remove 'v8-natives' from the bundle on browser

// https://github.com/v8/v8/blob/master/src/runtime/runtime.h

type Func = (...args: any[]) => void

type Obj = Record<string, any>

enum OptimizationStatus {
  Optimized = 1,
  UnOptimized = 2,
  AlwaysOptimized = 3,
  NeverOptimized = 4,
  Unknown = 5,
  MaybeOptimized = 6
}

interface V8natives {
  //------------------------------------------------------------------------------------------------
  // Helper Commands

  helpers: {
    /// This will automatically call the function once, call the optimizeOnNextCall; call the function again, and then call printStatus on the function.
    ///
    /// You can also do: testOptimization([func1, func2, func3]) this is so that if you have func1 which called func2 & func3 you can see if all three get optimized.
    /// It will automatically call func1, set the optimization flag on all three funcs, and then call func1 and then printStatus on all three funcs.
    testOptimization(func: Func | Func[]): void

    /// Prints the function optimization results to the console
    printStatus(func: Func): void

    /// Runs a func in a loop count times. This will automatically set the optimization flag; run it count times,
    /// run garbageCollection start the time; run func for count times; and then return the total time taken.
    benchmark(count: number, func: Func): void
  }

  window: {
    /// [Browser ONLY]; this will wait until the v8 namespace is loaded properly and then call your callback.
    waitForV8(func: Func): void
  }

  //------------------------------------------------------------------------------------------------
  // General Commands

  /// Is the Native Support mode enabled (i.e. true = uses real wrapper; false = use dummy wrapper)
  isNative(): boolean

  /// Gets the string name of a function
  /// returns %GetFunctionName(func)
  functionGetName(func: Func): string

  /// Gets the string name of a function
  /// returns %GetFunctionName(func)
  getFunctionName(func: Func): string

  /// returns %DebugPrint(obj)
  debugPrint(obj: Obj): string

  /// returns %DebugTrace(obj)
  debugTrace(): any

  // returns %TraceEnter()
  traceEnter(): any

  /// returns %TraceExit(value)
  traceExit(value: any): any

  //------------------------------------------------------------------------------------------------
  // Memory Commands

  // This command no longer works
  // in a browser use: window.performance.memory (with the --enable-precise-memory-info flag)
  // in node use: process.memoryUsage()
  //getHeapUsage(): any

  /// Force a full Garbage Collection
  collectGarbage(): void

  //------------------------------------------------------------------------------------------------
  // Optimization Commands

  /// Tells v8 to optimizes the function the next time you call it
  /// returns %OptimizeFunctionOnNextCall(fun)
  optimizeFunctionOnNextCall(func: Func): void

  /// De-optimize a function
  /// returns %DeoptimizeFunction(fun)
  deoptimizeFunction(func: Func): any

  /// TODO find what this does
  /// returns %DeoptimizeNow()
  deoptimizeNow(): void

  /// Never Optimize a function
  /// returns %NeverOptimizeFunction(func)
  neverOptimizeFunction(func: Func): void

  /// Get the functions optimization status
  /// returns %GetOptimizationStatus(func)
  getOptimizationStatus(func: Func): OptimizationStatus

  /// no idea what this does
  /// returns %ClearFunctionFeedback(fun);
  ClearFunctionFeedback(func: Func): void

  /// returns %CompileOptimized_Concurrent(func) or %CompileOptimized_NotConcurrent(func)
  CompileOptimized(func: Func, concurrent: boolean): any

  //------------------------------------------------------------------------------------------------
  // Variable/Object information Commands

  /// returns %HasFastProperties(obj)
  hasFastProperties(obj: Obj): boolean

  /// returns %HasFastPackedElements(obj)
  hasFastPackedElements(obj: Obj): boolean

  /// returns %HasSmiElements(obj)
  HasSmiElements(obj: Obj): boolean

  /// returns %HasDoubleElements(obj)
  hasDoubleElements(obj: Obj): boolean

  /// returns %HasDictionaryElements(obj)
  hasDictionaryElements(obj: Obj): boolean

  /// returns %HasHoleyElements(obj)
  HasHoleyElements(obj: Obj): boolean

  /// returns %HasSmiOrObjectElements(obj)
  hasSmiOrObjectElements(obj: Obj): boolean // not in doc

  /// returns %HasSloppyArgumentsElements(obj)
  hasSloppyArgumentsElements(obj: Obj): boolean

  /// returns %HaveSameMap(obj1, obj2)
  haveSameMap(obj1: Obj, obj2: Obj): boolean

  /// returns %IsSmi(Obj)
  isSmi(obj: Obj): boolean

  /// returns %IsValidSmi(Obj)
  isValidSmi(obj: Obj): boolean
}

export const v8natives: V8natives = v8_natives

// To try to interpret what v8natives returns:
// v8 elements-kind.h
// https://chromium.googlesource.com/v8/v8/+/roll/src/elements-kind.h
//
