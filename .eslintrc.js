module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['src/core/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@features/*',
              '@/features/*',
              'src/features/*',
              '../features/*',
              '../../features/*',
              '../../../features/*',
              '../../../../features/*',
            ],
          },
        ],
      },
    },
    {
      files: ['src/shared/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@features/*',
              '@/features/*',
              'src/features/*',
              '../features/*',
              '../../features/*',
              '../../../features/*',
              '../../../../features/*',
              '@core/*',
              '@/core/*',
              'src/core/*',
              '../core/*',
              '../../core/*',
              '../../../core/*',
              '../../../../core/*',
            ],
          },
        ],
      },
    },
  ],
};