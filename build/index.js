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


Object.keys(config.targets).forEach(target => {
    const targetEnv = config.targets[target]
    const input = {
        input: config.input,
        external: ['vue'],
        plugins: [
            resolve(config.extensions),
            ts(),
        ]
    }
    const output = {
        name: 'SinterCompositions',
        format: 'esm',
        banner: config.banner,
        sourcemap: targetEnv.sourcemap || false,
        globals: {
            vue: 'Vue'
        }
    }
    if (target === 'default') {
        output.file = './lib/index.js'
    } else output.file = './lib/index.' + target + '.js'
    if (targetEnv.terser) {
        input.plugins.push(terser())
    }
    build(input, output)
})






