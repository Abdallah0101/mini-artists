# 🎨 Mini Artists — Galeria de Arte Infantil

> Uma pequena galeria digital da imaginação das crianças.
> Cada desenho é uma obra de arte.

Galeria permanente dos desenhos de **Malik (5 anos)** e **Mnaryam (10 anos)** —
construída para crescer: novos artistas e novas obras entram apenas mexendo em **dados**,
sem tocar no HTML.

**Stack:** React 18 + TypeScript + Vite · CSS puro · React Router · GitHub Pages (Actions)

---

## 🚀 Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run typecheck  # checa os tipos
```

## 🖼️ Como adicionar um novo desenho

1. Salve a imagem em `public/artworks/<artista>/minha-obra.jpg` (ou `.png` / `.svg`).
2. Adicione um item no array de `src/data/artworks.ts`:

```ts
{
  id: 'mlk-005',                    // único
  slug: 'o-dragao-azul',            // vira a URL: /arte/o-dragao-azul
  artistId: 'malik',                // precisa existir em artists.ts
  title: 'O Dragão Azul',
  emoji: '🐉',
  description: 'Um dragão azul voando sobre uma montanha cheia de estrelas.',
  image: `${base}artworks/malik/o-dragao-azul.jpg`,
  createdAt: '2026-09-24',          // ISO: AAAA-MM-DD
  likes: 0,
},
```

Pronto: o card, a página `/arte/<slug>`, os filtros e os contadores aparecem sozinhos.

## 👶 Como adicionar um novo artista (ex.: Ilyaas, Tasnim)

1. Coloque o avatar em `public/avatars/<id>.jpg`.
2. Adicione um item no array de `src/data/artists.ts` (nome, idade, cor, descrição...).
3. Crie a pasta `public/artworks/<id>/`.

Os filtros da galeria, a página `/artistas/<id>`, os cards e as cores são gerados
automaticamente. **Nenhum nome de criança está escrito direto no HTML.**

## 🤖 Fluxo do AI Agent (Telegram → site)

```
Telegram → AI Agent → recebe imagem + "Malik / Título / Descrição"
        → salva a imagem em public/artworks/malik/
        → adiciona a entrada em src/data/artworks.ts
        → git push → GitHub Actions → build → GitHub Pages
        → o desenho aparece no site automaticamente
```

O Agent só precisa editar **dados** (`artworks.ts` + pasta de imagens) e commitar.

## 🔐 Segurança

Nenhum segredo vive no frontend: Telegram Bot Token e GitHub Token ficam apenas no
ambiente do AI Agent / GitHub Actions (Secrets). Este repositório é público e seguro.

## ☁️ Deploy

Push na branch `main` dispara `.github/workflows/deploy.yml`:
build do Vite (com `BASE_PATH=/<repo>/`), cópia de `index.html` → `404.html`
(para as rotas da SPA funcionarem) e publicação no GitHub Pages.

Para regenerar a imagem de compartilhamento (`og-image.png`):

```bash
node scripts/generate-og.mjs
```

---

Feito com 💜 para guardar a infância para sempre.
