module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@": "./src",
        '@core': './src/core',
        '@config': './src/config',
        '@utils': './src/utils',
        '@generated': './src/generated',
        "@entities": "./src/entities",
        "@services": "./src/services",
        "@repositories": "./src/repositories",
        "@providers": "./src/providers",
        "@useCases": "./src/useCases",
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
