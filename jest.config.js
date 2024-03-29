module.exports = {
  preset: "ts-jest",

  verbose: true,

  // 测试运行环境
  testEnvironment: "node",

  // 指定Jest使用jest-circus的运行器，解决beforeAll在报错的情况下，还会继续往下运行的问题
  // 详见：https://github.com/facebook/jest/issues/2713
  testRunner: "jest-circus/runner",

  // 根目录
  rootDir: __dirname,

  // 限定 test 目录下的测试用例文件，避免把配置文件 config.test.ts 误当作测试用例文件
  testMatch: [
    "<rootDir>/test/**/*.test.ts",
    "<rootDir>/test/**/*.test_advance.ts",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/test/fixtures",
  ],

  // 以.ts .tsx结尾的文件，统一使用ts-jest转换成js
  transform: {
    "^.+\\.tsx?$": require.resolve("ts-jest"),
  },
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
    "^@root/(.*)$": "<rootDir>/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
};
