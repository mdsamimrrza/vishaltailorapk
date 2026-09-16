// Metro configuration.
// Windows can hit "EMFILE: too many open files" when Metro resolves modules
// (expo-router's require.context + the large asset set) with too many
// parallel workers — cap workers to keep file handles in check.
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.maxWorkers = 2;

// Production optimizations
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_fnames: true,
    mangle: true,
    toplevel: true,
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log", "console.info", "console.debug", "console.warn"],
      passes: 3,
      unsafe: true,
      unsafe_comps: true,
      unsafe_Function: true,
      unsafe_math: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true,
    },
    output: {
      ascii_only: true,
    },
  },
  inlineRequires: true,
  unstable_allowRequireContext: true,
  enableBabelRCTLookup: false,
};

config.serializer = {
  ...config.serializer,
  createModuleIdFactory: () => () => Math.random().toString(36).slice(2),
};

module.exports = config;
