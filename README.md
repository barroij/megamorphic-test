# README

- bench:   `cross-env MEGAMORPHIC_TEST_MODE=obj1 yarn bench`
- log-opt: `cross-env MEGAMORPHIC_TEST_MODE=obj1 yarn log-opt`
- log-ic:  `cross-env MEGAMORPHIC_TEST_MODE=obj1 yarn log-ic`

# version of v8 is used by node

`node -v`
`node -e "console.log(process.versions['v8'])"`

ex:
```
node version: v19.7.0
v8 version:   10.8.168.25-node.11
```

# version of v8 is used by chrome

visit the chrome://version/ page

ex:
```
Google Chrome:   110.0.5481.178
JavaScript:	     V8 11.0.226.16
```

# v8 flags

`node --v8-options > v8options.txt`

alternatively:

https://github.com/v8/v8/blob/master/src/flags/flag-definitions.h

ex:
```c++
DEFINE_BOOL(trace_opt, false, "trace optimized compilation")
DEFINE_BOOL(trace_opt_verbose, false,
            "extra verbose optimized compilation tracing")
DEFINE_IMPLICATION(trace_opt_verbose, trace_opt)
DEFINE_BOOL(trace_opt_stats, false, "trace optimized compilation statistics")
DEFINE_BOOL(trace_deopt, false, "trace deoptimization")
DEFINE_BOOL(log_deopt, false, "log deoptimization")
DEFINE_BOOL(trace_deopt_verbose, false, "extra verbose deoptimization tracing")
DEFINE_IMPLICATION(trace_deopt_verbose, trace_deopt)
DEFINE_BOOL(trace_file_names, false,
            "include file names in trace-opt/trace-deopt output")
DEFINE_BOOL(always_opt, false, "always try to optimize functions")
DEFINE_IMPLICATION(always_opt, opt)
DEFINE_BOOL(always_osr, false, "always try to OSR functions")
DEFINE_BOOL(prepare_always_opt, false, "prepare for turning on always opt")
```

# v8-deopt-viewer

https://github.com/andrewiggins/v8-deopt-viewer

to manually pas the same v8 flags as v8-deopt-viewer, see
https://github.com/andrewiggins/v8-deopt-viewer/blob/master/packages/v8-deopt-generate-log/src/index.js


`--log-ic --logfile=xxx --no-logfile-per-isolate`

and optionally: `--log-maps`


