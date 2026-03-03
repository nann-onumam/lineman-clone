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
    {
      files: ['src/features/**/components/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            custom: {
              regex: 'Props$',
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ['src/features/**/screens/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'function',
            modifiers: ['exported'],
            format: ['PascalCase'],
            custom: {
              regex: 'Screen$',
              match: true,
            },
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            custom: {
              regex: 'Props$',
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ['src/features/**/hooks/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'function',
            modifiers: ['exported'],
            format: ['camelCase'],
            custom: {
              regex: '^use[A-Z]',
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ['src/core/models/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '(Item|Model)$',
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ['src/shared/constants/**/*.{ts,tsx,js,jsx}'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['UPPER_CASE'],
          },
        ],
      },
    },
  ],
};