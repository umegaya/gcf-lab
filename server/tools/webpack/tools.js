const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.CONFIG_NAME == "prod" ? 'production' : 'development',
  module: {
    rules: [
        { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  externals: [nodeExternals()],
  entry: {
    "Migration.ts": "./database/Migration.ts"
  },
  devtool: false,
  target: 'node',
  output: {
    filename: 'migration.js',
    path: path.resolve(path.join(__dirname, '..', 'deploy')),
    libraryTarget: 'commonjs',
  },
};
