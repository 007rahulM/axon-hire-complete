// backend/jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testTimeout: 30000,     // each test gets 30s (AI routes are slow)
  testPathPattern: 'tests',  // only run files inside /tests/
};