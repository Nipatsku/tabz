const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { 
            '@text-color': 'rgba(1, 0, 0, .65)'
        }
    })
)