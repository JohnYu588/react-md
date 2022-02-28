{
  "sourceMaps": true,
  "exclude": [".*__tests__"],
  "env": {
    "path": "."
  },
  "module": {
    "type": "commonjs"
  },
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": false
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    }
  }
}
