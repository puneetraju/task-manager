// eslint.config.mjs
// @ts-ignore
import js from '@eslint/js';
import next from'C:\Users\punee\Desktop\task-manager\node_modules\@next\eslint-plugin-next\dist\index.js'

export default [
  js.configs.recommended, // Use ESLint's recommended rules
  next.configs.recommended, // Use Next.js's recommended rules
  {
    rules: {
      // Add any custom rules here
    },
  },
];