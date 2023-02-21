module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'dotenv-import',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      ['module-resolver', {
        'alias': {
          '@api': './api',
          '@components': './components',
          '@screens': './screens',
          '@hooks': './hooks',
          '@assets': './assets',
          '@utils': './utils',
          '@context': './context',
          '@navigation': './navigation',
          '@types': './types.ts',
        },
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ]
      }],
    ],
  };
};