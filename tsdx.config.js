// tsdx.config.js is NOT transpiled with TypeScript or Babel, so use plain Es6/Node.js!
/*
 * TsdxOptions {
 *   // path to file
 *   input: string;
 *   // Name of package
 *   name: string;
 *   // JS target
 *   target: 'node' | 'browser';
 *   // Module format
 *   format: 'cjs' | 'umd' | 'esm' | 'system';
 *   // Environment
 *   env: 'development' | 'production';
 *   // Path to tsconfig file
 *   tsconfig?: string;
 *   // Is error extraction running?
 *   extractErrors?: boolean;
 *   // Is minifying?
 *   minify?: boolean;
 *   // Is this the very first rollup config (and thus should one-off metadata be extracted)?
 *   writeMeta?: boolean;
 *   // Only transpile, do not type check (makes compilation faster)
 *   transpileOnly?: boolean;
 * }
 */

const combinations = new Set()

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    const {target, format, env} = options
    const combination = `${target} ${format} ${env}`
    if (!combinations.has(combination)) {
      console.log(combination)
      combinations.add(combination)
    }
    return config; // always return a config.
  },
};