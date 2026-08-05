# lca-cfp-page-preview

パーソルクロステクノロジー LCA/CFP サービス LP（プロトタイプ）

---

## 🚀 起動方法

### 1. リポジトリを取得して起動

```powershell
git clone https://github.com/Takii-252/lca-cfp-page-preview.git
cd lca-cfp-page-preview
npm install
npm run dev
```

### 2. ブラウザで開く

```
http://localhost:5173/lca-cfp-page-preview/
```

### 3. 停止

ターミナルで `Ctrl + C`

---

## 💡 毎回楽に起動するには

VSCodeで `lca-cfp-page-preview` フォルダを直接開く  
→ ターミナルが自動的にそのフォルダから始まるので `npm run dev` だけでOK

---

## 📁 ファイル構成

| ファイル         | 役割                             |
| ---------------- | -------------------------------- |
| `src/App.jsx`    | メインコード（全コンポーネント） |
| `src/App.css`    | スタイル                         |
| `public/`        | 画像・SVGなどの静的ファイル      |
| `index.html`     | HTMLのエントリーポイント         |
| `vite.config.js` | Vite設定                         |
