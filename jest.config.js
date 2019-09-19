module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "\\.tests\\.ts$"
  ]
};