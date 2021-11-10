'use-strict';

module.exports = {
    // babel: {
    //     plugins: [
    //         [
    //             'babel-plugin-root-import',
    //             {
    //                 rootPathSuffix: 'src/',
    //                 rootPathPrefix: '#/',
    //             },
    //         ],
    //     ],
    // },
    postcss: {
        plugins: [
            require('@fullhuman/postcss-purgecss')({
                content: ['./**/*.html'],
            }),
        ],
    },
};
