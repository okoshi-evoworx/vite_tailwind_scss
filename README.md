# Vite-SCSS-Tailwind/biome-prettier-stylelint

## Command
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
│   │   │   ├─ base/：html, bodyなどのスタイル
│   │   │   ├─ mixin/：SCSSの@mixin, @function
│   │   │   └─ variable/：CSS変数
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ object/
│   │   │  ├─ component/：UIコンポーネント（再利用可能な最小単位）
│   │   │  └─ project/：コンポーネントの組み合わせ（ページ単位のパーツ）
│   │   ├─ layout/：レイアウト（共通ヘッダー・フッターなど）
│   │   ├─ styles.scss
│   │   └─ tailwind.css ※拡張子注意
│   ├─ js/
│   │   ├─ modules/
│   │   └─ main.js
│   └─ img/
├─ .browserslistrc
├─ .editorconfig
├─ .gitignore
├─ .markuplintrc
├─ .node-version
├─ .prettierignore
├─ .prettierrc
├─ .stylelintignore
├─ .stylelintrc.cjs
├─ biome.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
```

## Breakpoint
| tailwind | scss | css |
|:--- | :---   | :--- |
|     | @mixin _sm {} |  @media (width < 400px) {} |
| sm: | @mixin sm {} |  @media (width >= 400px) {} |
|     | @mixin _md {} |  @media (width < 800px) {} |
| md: | @mixin md {} |  @media (width >= 800px) {} |
|     | @mixin _lg {} |  @media (width < 1200px) {} |
| lg: | @mixin lg {} |  @media (width >= 1200px) {} |
|     | @mixin _xl {} |  @media (width < 1600px) {} |
| xl: | @mixin xl {} |  @media (width >= 1600px) {} |
|     | @mixin sm_md {} |  @media (400px <= width > 800px) {} |
|     | @mixin sm_lg {} |  @media (400px <= width > 1200px) {} |
|     | @mixin sm_xl {} |  @media (400px <= width > 1600px) {} |
|     | @mixin md_lg {} |  @media (800px <= width > 1200px) {} |
|     | @mixin md_xl {} |  @media (800px <= width > 1600px) {} |
|     | @mixin lg_xl {} |  @media (1200px <= width > 1600px) {} |

## Tailwind
### config
`src/css/tailwind.css` にて `@theme` を設定してください。  
変数については[Default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variable-reference) を参考にしてください。

### Editor setup
Prettierはpackageに含めていないので、classの整形はVSCodeの[Tailwind CSS IntelliSence](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)を使用してください。