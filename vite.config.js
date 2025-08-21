import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import path from 'path';

/*
<!-- [dev]  [/dev] -->
で囲まれたコメントをビルド時に削除

【例】
<!-- [dev] <script>
GoogleTagManagerのコード
</script> [/dev] -->

↓

<script>
GoogleTagManagerのコード
</script>

 */
const devCommentReplace = () => {
  let isBuild = false
  return {
    name: 'dev-comment-replace',
    config(config, { command }) {
      // command が 'build' なら isBuild フラグを true に設定
      isBuild = command === 'build'
    },
    transformIndexHtml(html) {
      if (isBuild) {
        return html.replace(/<!--\s\[dev\]\s/g, '').replace(/\s\[\/dev\]\s-->/g, '')
      }
      return html
    },
  }
}

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        tailwindcss(),
        sassGlobImports(),
        devCommentReplace(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
              additionalData: `
                @use "sass:math";
                @use "@/css/foundation/mixin" as *;
                @use "@/css/foundation/variable" as *;
              `,
              logger: {
                  warn(message, options) {
                  if (message.includes('@import rules are deprecated')) return
                  console.warn(`Warning: ${message}`)
                  },
              },
            },
        },
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist())// extend browserslist-config-baseline
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        assetsInlineLimit: 0,
        cssMinify: false, // 'lightningcss',
        cssCodeSplit: true,
        rollupOptions: {
          input: [
            'index.html',
            'src/css/tailwind.css',
            'src/css/styles.scss'
          ],
          output: {
                entryFileNames: `js/main.js`,
                chunkFileNames: `js/[name].js`,
                assetFileNames: (assetInfo) => {
                  // https://rollupjs.org/configuration-options/#output-assetfilenames
                  const { name } = assetInfo;

                  // 拡張子抽出
                  const extType = name.split('.').pop();

                  // CSS
                  if (extType === 'css') {
                    return `css/[name][extname]`;
                  }

                  // 画像
                  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'];
                  if (imageExtensions.includes(extType)) {
                    return `img/[name][extname]`;
                  }

                  // フォント
                  const fontExtensions = ['eot', 'otf', 'ttf', 'woff', 'woff2'];
                  if (fontExtensions.includes(extType)) {
                    return `font/[name][extname]`;
                  }

                  // その他のアセット
                  return "assets/[name][extname]";
                },
            },
        },
    },
})