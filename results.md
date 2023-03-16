
# node v16.15.1

```
$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js obj1 5
NODE_ENV=production
init          105 milliseconds.
computeBigBoxObj 1649 milliseconds.
 computeBigBoxObj is Function, Optimized, TurboFanned
 expandByBox is Function, Optimized, TurboFanned

$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js obj2 5
NODE_ENV=production
init          104 milliseconds.
computeBigBoxObj 1605 milliseconds.
 computeBigBoxObj is Function, Optimized, TurboFanned
 expandByBox is Function, Optimized, TurboFanned

$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js cls 5
NODE_ENV=production
init          1026 milliseconds.
computeBigBoxObj 1614 milliseconds.
 computeBigBoxObj is Function, Optimized, TurboFanned
 expandByBox is Function, Optimized, TurboFanned

$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js soa 5
NODE_ENV=production
init          130 milliseconds.
computeBigBoxObj 256 milliseconds.
 computeBigBoxObj is Function, Optimized, TurboFanned
 expandByBoxBuf is Function, Optimized, TurboFanned
```


# node v19.7.0

```
$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js obj1 5
NODE_ENV=production
init          106 milliseconds.
computeBigBoxObj 1698 milliseconds.
 computeBigBoxObj is Function, Optimized, Interpreted
 expandByBox is Function

$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js obj2 5
NODE_ENV=production
init          100 milliseconds.
computeBigBoxObj 1691 milliseconds.
 computeBigBoxObj is Function, Optimized, Interpreted
 expandByBox is Function

$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js cls 5
NODE_ENV=production
init          187 milliseconds.
computeBigBoxObj 1731 milliseconds.
 computeBigBoxObj is Function, Optimized, Interpreted
 expandByBox is Function

$ cross-env NODE_ENV=production node --allow-natives-syntax tsc-out/esnext/index.js soa 5
NODE_ENV=production
init          187 milliseconds.
computeBigBoxObj 252 milliseconds.
 computeBigBoxObj is Function, Optimized, Interpreted
 expandByBoxBuf is Function
```

# node v19.7.0 vs v16.15.1

the big differences of `v19.7.0` vs `v16.15.1`
- the init time of `cls` is much faster
  - probably thanks to https://v8.dev/blog/faster-class-features
- expandByBox is `Function` instead of `Function, Optimized, TurboFanned`

