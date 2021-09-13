const config = require('./config')
const {rollup,} = require("rollup")
const resolve = require('rollup-plugin-node-resolve')
const ts = require('rollup-plugin-typescript2')
const {terser} = require('rollup-plugin-terser')


function build(inputOptions, outputOptions) {
    rollup(inputOptions).then((bundle) => {
        bundle.generate(outputOptions).then(async ({code, map,}) => {
            await bundle.write(outputOptions);
        });
    });
}

const input = {
    input: config.input,
    external: ['vue'],
}

const output = {
    name: 'SinterCompositions',
    file: './lib/index.js',
    format: 'umd',
    banner: config.banner,
    globals: {
        vue: 'Vue'
    }
}

build({
    ...input, plugins: [
        resolve(config.extensions),
        ts(),
        terser()
    ],
}, output)




