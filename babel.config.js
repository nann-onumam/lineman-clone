// D:\Desktop\LinemanClone\babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // เพิ่มส่วน plugins เข้าไปด้านล่างนี้ครับ
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@core': './src/core',
          '@features': './src/features',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};