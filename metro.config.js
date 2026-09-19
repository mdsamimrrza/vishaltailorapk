// Metro configuration.
// Windows can hit "EMFILE: too many open files" when Metro resolves modules
// (expo-router's require.context + the large asset set) with too many
// parallel workers — cap workers to keep file handles in check.
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.maxWorkers = 2;

// Minifier config. NOTE: a previous "aggressive" version of this block
// (toplevel mangle, unsafe_* optimizations, and a random
// createModuleIdFactory) produced corrupt release bundles that crashed
// instantly with "Requiring unknown module ..." — do not re-add those.
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_fnames: true,
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"],
    },
    output: {
      ascii_only: true,
    },
  },
  inlineRequires: true,
  unstable_allowRequireContext: true,
};

module.exports = config;
