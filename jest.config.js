module.exports = {
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "\\\\node_modules\\\\",
        "<rootDir>/src/core/data/database/migrations",
    ],
    roots: ["<rootDir>/tests"],
    testEnvironment: "node",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
};
