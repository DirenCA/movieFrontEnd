module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!axios/.*)'
  ]
}
