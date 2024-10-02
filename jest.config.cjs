module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@testing-library/react-hooks$': '<rootDir>/node_modules/@testing-library/react-hooks',
  },
};
