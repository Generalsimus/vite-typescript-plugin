# [Vite Typescript Plugin](https://www.npmjs.com/package/vite-typescript-plugin)

[![npm version][npm-version-src]][npm-version-href]
[![npm href][standard-js-src]][standard-js-href]

### vite.config
```js
import { defineConfig } from 'vite'
import { createTsPlugin } from "vite-typescript-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createTsPlugin({
      name,              // plugin name 
      compilerOptions,   // ts.CompilerOptions 
      tsConfigPath       // tsConfig file name
      test,              // file test regexp 
      transforms,        // ts.CustomTransformers
    })
  ],
}) 
```



## License

MIT

<!-- Refs -->
[standard-js-src]: https://img.shields.io/badge/license-MIT-brightgreen?&style=flat-square
[standard-js-href]: https://github.com/Generalsimus/KIX/blob/master/LICENSE

[npm-version-src]: https://img.shields.io/npm/v/vite-typescript-plugin?&style=flat-square
[npm-version-href]: https://www.npmjs.com/package/vite-typescript-plugin



 
