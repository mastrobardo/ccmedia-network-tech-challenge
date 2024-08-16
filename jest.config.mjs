export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
