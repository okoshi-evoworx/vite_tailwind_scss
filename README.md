# Vite-Tailwind-SCSS/biome-prettier-stylelint

## Command
### 各ツールのバージョン確認
```
npx npm-check-updates
```
※`package.json`への適用は `npx npm-check-updates -u`

### init：初期設定
```
npm i
```

### development：開発
```
npm run dev
```

### build：納品データ作成
```
npm run build
```

### check：コードチェック
```
npm run check
```

| npm script | command | |
| :-- | :-- | :-- |
| `npm run check:js` | `biome check src/**/*.js` | jsチェック(lint/format/import) |
| `npm run check:html` | `markuplint **/*.html` | htmlチェック |
| `npm run check:css` | `stylelint src/css/**/*.{css,scss}` | cssチェック |

### fix：コード修正
```
npm run fix
```

| npm script | command | |
| :-- | :-- | :-- |
| `npm run fix:js` | `biome check --write src/js/**/*.js` | js修正(lint/format/import) |
| `npm run fix:css` | `stylelint src/css/**/*.{css,scss}` | css修正 |

### test：@axe-core/playwrightによるアクセシビリティチェック
`npm run build`実行後に
```
npm run test
```

## Directory
```
├─ dist/
│   ├─ css/
│   │   ├─ tailwind.css
│   │   └─ styles.css
│   ├─ js/
│   │   └─ main.js
│   ├─ img/
│   └─ index.html
├─ public/：静的ファイル
├─ src/
│   ├─ css/
│   │   ├─ foundation/
│   │   │   ├─ mixin/：SCSSの@mixin, @function
│   │   │   └─ variable/：CSS変数
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ object/
│   │   │  ├─ component/：UIコンポーネント（再利用可能な最小単位）
│   │   │  ├─ page/：コンポーネントの組み合わせ（ページ単位のパーツ）
│   │   │  └─ utility/：ユーティリティ（Skip to Content等）
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ styles.scss
│   │   └─ tailwind.css ※拡張子注意
│   ├─ js/
│   │   ├─ modules/
│   │   └─ main.js
│   └─ img/
├─ tests/
│   └─ axe.spec.js：@axe-core/playwright設定ファイル
├─ .browserslistrc
├─ .editorconfig
├─ .gitignore
├─ .markuplintrc
├─ .node-version
├─ .stylelintignore
├─ .stylelintrc.cjs
├─ biome.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ playwright.config.js
├─ README.md
└─ vite.config.js
```

## Breakpoint
| tailwind | scss | css |
|:--- | :---   | :--- |
|     | @mixin under_sm {} |  @media (width < 400px) {} |
| sm: | @mixin sm {} |  @media (width >= 400px) {} |
|     | @mixin under_md {} |  @media (width < 800px) {} |
| md: | @mixin md {} |  @media (width >= 800px) {} |
|     | @mixin under_lg {} |  @media (width < 1200px) {} |
| lg: | @mixin lg {} |  @media (width >= 1200px) {} |
|     | @mixin under_xl {} |  @media (width < 1600px) {} |
| xl: | @mixin xl {} |  @media (width >= 1600px) {} |
|     | @mixin sm_md {} |  @media (400px <= width > 800px) {} |
|     | @mixin sm_lg {} |  @media (400px <= width > 1200px) {} |
|     | @mixin sm_xl {} |  @media (400px <= width > 1600px) {} |
|     | @mixin md_lg {} |  @media (800px <= width > 1200px) {} |
|     | @mixin md_xl {} |  @media (800px <= width > 1600px) {} |
|     | @mixin lg_xl {} |  @media (1200px <= width > 1600px) {} |
| landscape: | @mixin landscape {} |  @media (orientation: landscape) {} |
| portrait: | @mixin portrait {} |  @media (orientation: portrait) {} |
| motion-reduce: | @mixin reduce {} |  @media (prefers-reduced-motion: reduce) {} |
|                | @mixin not_reduce {} |  @media (prefers-reduced-motion: no-preferene) {} |
| dark: | @mixin dark {} |  @media (prefers-color-scheme: dark) {} |
|       | @mixin light {} |  @media (prefers-color-scheme: light) {} |

## SCSS
リセットCSSはTailwindに依存しています。Tailwindを使用しない場合は `src/css/styles.scss` の `@import 'node_modules/modern-normalize/modern-normalize.css';` を有効化してください。

[FLOCSS](https://github.com/hiloki/flocss)のようにFoundation / Layout / Object に分けていますが、Componentの誤用が多く見られるため、Projectsではなくページ内で使用するコンポーネントの組み合わせということで `page` というディレクトリを用意しています。

ただし、`src/css/page/_p-top.scss` に全部書くのではなく、見通しを良くするために `src/css/page/top/_p-top-◯◯.scss` のようにブロックを細分化して設計してください。

設計については [BEM](https://getbem.com/introduction/) や [rscss](https://rstacruz.github.io/rscss/) を参考にしてください。

## Tailwind
### config
`src/css/tailwind.css` にて `@theme` を設定してください。  
変数については[Default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variable-reference) を参考にしてください。  
※拡張子はscssではなくcssにしています。（ビルド時の警告抑制）

### Editor setup
Prettierはpackageに含めていないので、classの整形はVSCodeの[Tailwind CSS IntelliSence](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)を使用してください。