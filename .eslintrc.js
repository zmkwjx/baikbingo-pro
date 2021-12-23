module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  globals: {
    defineProps: "readonly"
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ], // 添加 prettier 插件,
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    strict: 0,
    quotes: [1, "double"],
    camelcase: 0,
    "vue/multi-word-component-names": 0,
    "no-empty": "warn",
    "comma-spacing": [2, { before: false, after: true }],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "max-len": [2, { code: 300 }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "vue/no-multiple-template-root": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "no-param-reassign": [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: [
          "res", // for Express responses
          "item", // for Express responses
          "request",
          "state" // for vuex state 解决assignment to property of function parameter ‘state‘
        ]
      }
    ],
    "no-underscore-dangle": ["error", { allow: ["__retryCount"] }],
    "import/prefer-default-export": 0,
    "no-continue": 0
  },
  settings: {
    "import/extensions": [".js", ".jsx", "ts", "tsx", ".vue", ".d.ts"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".d.ts"] // 配置文件扩展名
      },
      // 配置alias
      alias: {
        map: [
          ["@", "./src"],
          ["@types", "./src/types"]
        ],
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx", ".vue"]
      }
    }
  }
};
