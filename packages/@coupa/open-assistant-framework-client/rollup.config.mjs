import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { externals } from "rollup-plugin-node-externals";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/** @type {import('rollup').RollupOptions} */
export default {
  input: "./src/index.js",
  plugins: [
    externals({ deps: true, packagePath: "./package.json" }),
    nodeResolve({ extensions }),
    commonjs(),
    babel({
      rootMode: "upward",
      extensions,
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
  output: [
    {
      format: "cjs",
      file: "dist/index.cjs.js",
    },
    {
      format: "esm",
      file: "dist/index.esm.js",
    },
  ],
};
