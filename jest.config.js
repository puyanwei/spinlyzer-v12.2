const nextJest = require(`next/jest`);
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: `.`,
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: [`node_modules`, `<rootDir>/`],
  testEnvironment: `jest-environment-jsdom`,
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  testMatch: [`<rootDir>/src/tests/**/*.test.[jt]s?(x)`],
  rootDir: `.`,
};

module.exports = createJestConfig(customJestConfig);
