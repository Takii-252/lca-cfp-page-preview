// ===== main.jsx = 電源ボタン（CDN版の root.render と同じ） =====
// このファイルは基本的に触らなくてOK。

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// ↓ App.jsx が export した App を借りてくる（import と export はセット）
import App from './App.jsx'

// ↓ CDN版と同じ電源ボタン。root という箱に App を表示する。
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
