const webpackConfig = require('./webpack.config.js');

delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = function(config) {

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