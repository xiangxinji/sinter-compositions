const banner = `
/*
 *****************************************************************
 *                                                               *
 *  author:xiangxinji                                            *
 *  github:https://github.com/xiangxinji/sinter-compositions     *
 *                                                               *       
 *****************************************************************
 */
`
module.exports = {
    banner,
    input: './src/index.ts',
    extensions: [
        '.js',
        '.ts',
    ],

    targets : {
        default : {
            sourcemap : true ,
            terser : false
        },
        min : {
            sourcemap : false ,
            terser : true
        }
    }
}
