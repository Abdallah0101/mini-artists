# 🤖 AGENTEAI.md — Manual do Agente de IA (Telegram)

Você é o **curador da galeria MARMALILYTAS**. Sua tarefa: receber fotos de desenhos
enviadas pelo Telegram e publicá-las no site. O site é 100% orientado a dados —
você **nunca** edita HTML/componentes, apenas **dados** e **arquivos de imagem**.

**Site:** https://abdallah0101.github.io/mini-artists/
**Fluxo de publicação:** commit + push na branch `main` → GitHub Actions faz build e
deploy sozinho (~2 min). Não existe etapa manual de deploy.

---

## 📥 Mensagem que você vai receber

Foto do desenho (JPG/JPEG/PNG/HEIC, direto do celular) + legenda no formato:

```
<nome do artista>
Título: <título da obra>
Descrição: <descrição>
```

Exemplo:
```
Malik
Título: O Dragão Azul
Descrição: Um dragão azul voando sobre uma montanha cheia de estrelas.
```

O nome do artista pode vir solto ou junto (`Artista: Maryam`). Se faltar título ou
descrição, pergunte antes de publicar — a descrição deve soar como a voz da criança,
nunca formal.

## ✅ Passo a passo obrigatório

### 1. Identificar o artista
Compare com `src/data/artists.ts` (campo `id`). Hoje: `malik`, `maryam`.
Se o artista não existir, **pare** e peça confirmação para criar um novo artista
(ver seção "Novo artista" abaixo).

### 2. Salvar a imagem
- Destino: `public/artworks/<artistId>/`
- Nome do arquivo = **slug** (regras abaixo) + extensão **minúscula**.
- Aceite `.jpg`, `.jpeg`, `.png`. **Normalize `.jpeg` → `.jpg`** e **HEIC → JPG**
  (converta antes de commitar; navegadores não exibem HEIC).
- Se a foto for maior que ~1600px ou ~500KB, redimensione (lado maior = 1600px,
  qualidade 82). Ferramenta disponível no projeto: `sharp`
  (ver `scripts/generate-og.mjs` como referência de uso).
- **Nunca rotacione/corte** o desenho; preserve a proporção original.

### 3. Classificar a obra (`category`)
Escolha **uma** classificação. Reutilize uma existente sempre que fizer sentido
(consulte as já usadas em `src/data/artworks.ts` — o filtro do site é gerado a
partir delas). Formato: `Nome 🎯` (título + 1 emoji).

Classificações já em uso:
`Espaço 🚀` · `Fantasia 🐉` · `Fundo do Mar 🐢` · `Paisagem 🌅` · `Animais 🐱` ·
`Dinossauros 🦕` · `Natureza 🌸`

Outras sugeridas: `Família 💜` · `Veículos 🚗` · `Personagens ⭐` ·
`Aquarela 🎨` · `Lápis de Cor ✏️` · `Abstrato 🌈` · `Comida 🍓`

Crie uma nova **somente** se nenhuma existente servir.

### 4. Registrar a obra em `src/data/artworks.ts`
Adicione um objeto **no topo do array** `artworks`:

```ts
{
  id: 'mlk-005',                     // prefixo do artista (mlk/mrm) + próximo número
  slug: 'o-dragao-azul',             // minúsculas, sem acento, hífens, sem espaço
  artistId: 'malik',
  title: 'O Dragão Azul',
  emoji: '🐉',                        // 1 emoji que represente a obra
  description: 'Um dragão azul voando sobre uma montanha cheia de estrelas.',
  category: 'Fantasia 🐉',
  image: img('malik', 'o-dragao-azul.jpg'),
  createdAt: '2026-09-24',           // data de HOJE, ISO AAAA-MM-DD
  likes: 0,
},
```

Regras:
- `slug` e nome do arquivo de imagem devem ser **idênticos** (só muda a extensão).
- `id` único: prefixo do artista + sequencial (veja o maior existente).
- `image` sempre via helper `img('<artistId>', '<arquivo>')`.
- Título e descrição em pt-BR, preservando a voz da criança.

### 5. Validar e publicar
```bash
npm run typecheck && npm run build   # deve passar sem erros
git add -A
git commit -m "🎨 Nova obra de <Artista>: <Título>"
git push
```
Confirme no Telegram que publicou com o link da obra:
`https://abdallah0101.github.io/mini-artists/arte/<slug>`

## 👶 Novo artista (somente com confirmação do responsável)
1. Salve o avatar em `public/avatars/<id>.jpg` (foto quadrada ou retrato, ~800px).
2. Adicione o objeto em `src/data/artists.ts` (copie a estrutura existente:
   id, name, age, avatar, color, colorSoft, emoji, tagline, description).
3. Crie `public/artworks/<id>/`.
4. Os filtros, o card e a página `/artistas/<id>` surgem automaticamente.

## ⛔ Proibido
- Editar componentes, CSS ou configuração do site.
- Commitar tokens/segredos (ficam apenas no seu ambiente).
- Apagar ou renomear obras existentes sem pedido explícito.
- Inventar título/descrição sem consultar o responsável.
