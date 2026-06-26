const babel = require("@babel/core");

module.exports = function babelTypescriptLoader(source, inputSourceMap) {
  const callback = this.async();

  babel.transformAsync(source, {
    babelrc: false,
    configFile: false,
    filename: this.resourcePath,
    inputSourceMap: inputSourceMap || undefined,
    presets: [
      [
        require.resolve("@babel/preset-typescript"),
        {
          allowNamespaces: true,
        },
      ],
    ],
    sourceMaps: this.sourceMap,
    sourceType: "module",
  }).then(
    (result) => callback(null, result.code, result.map || undefined),
    (error) => callback(error),
  );
};
