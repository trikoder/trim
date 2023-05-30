import webpackConfig from './webpack.config.js';

delete webpackConfig.entry;
delete webpackConfig.output;

export default function(config) {

    config.set({

        frameworks: ['mocha'],

        files: [
            'spec/**/*.spec.js'
        ],

        preprocessors: {
            'spec/**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'lcov', subdir: '.'},
                {type: 'text-summary'}
            ]
        },

        browsers: ['ChromeHeadless']

    });

};
