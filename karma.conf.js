// Karma configuration
module.exports = function (config) {
    config.set({
        frameworks: ["karma-typescript", "mocha", "chai"],
        files: [
            { pattern: "src/**/*.tsx" }
        ],

        preprocessors: {
            "src/**/*.tsx": ["karma-typescript"]
        },
        port: 8081,
        browsers: ["jsdom"],
        reporters: ["mocha", "karma-typescript"],
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity,
        // reporter options
        mochaReporter: {
            output: 'full'
        },
        karmaTypescriptConfig: {
            coverageOptions: {
                instrumentation: true,
                exclude: /\.(d|spec|test)\.ts/i,
                threshold: {
                    file: {
                        statements: -100,
                        branches: 0,
                        functions: 0,
                        lines: 0,
                    }
                }
            },
            reports: {
                "html": "coverage",
                "text-summary": ""
            }
        }
    })
}