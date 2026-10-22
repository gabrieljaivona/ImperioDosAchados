# CLAUDE.md

Contexto de projeto para o Claude Code trabalhar no repositório **ImperioDosAchados**.

## Visão geral

Site público **"Império Dos Achados"** — agregador de ofertas e cupons de afiliados em pt-BR. O front é **"burro"**: só lê do banco e exibe. Toda a inteligência (scraping, links de afiliado, cálculo de desconto) fica no repositório irmão **`BotImperioDosAchados`** (`/home/reaper/Repositorios/`), que envia os dados por POST para a API deste site. **Não existe página de detalhe `/oferta/[slug]`**: o clique no card vai direto ao link de afiliado.

## Arquitetura

```
BotImperioDosAchados (Python) ──POST /api/ofertas (Bearer)──▶ Next.js (Hostinger) ──Prisma──▶ PostgreSQL
```

- **Hospedagem:** Hostinger (app Next.js + banco PostgreSQL).
- **Banco:** PostgreSQL via Prisma (`prisma/schema.prisma`, client em `src/lib/db.ts`).
- **Env vars** (ver `.env.example`): `DATABASE_URL`, `SITE_API_TOKEN`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_VIP_GROUP_URL`.

### Modelos

- `Product`: `store` (String livre), `externalId`, `title`, `image`, `price`, `originalPrice?`, `discountPercentage` (já calculado pelo bot), `rating?`, `affiliateLink`, `featured`. Único: `(store, externalId)`.
- `Coupon`: `store` (String livre), `title`, `discount`, `code`, `link`, `expiresAt?`. Único: `(store, code)`.

`store` é **texto livre** (não enum) para o bot poder enviar lojas novas sem quebrar a API. O Zod normaliza para slug (sem acento/espaço, minúsculas: "Mercado Livre" → `mercadolivre`). `src/lib/stores.ts` tem cores/labels das lojas conhecidas e fallback para as desconhecidas; os filtros de loja nas páginas são gerados a partir dos dados.

### API: `POST /api/ofertas`

Arquivo: `src/app/api/ofertas/route.ts`; validação em `src/lib/ingest-schemas.ts`.

- Auth: header `Authorization: Bearer <SITE_API_TOKEN>` (401 se ausente/errado).
- Limites: corpo ≤ 16 KB (413), 60 req/min por IP (429), JSON inválido (400), payload inválido (422).
- Tipo inferido pelo corpo: com `code` → **cupom**; senão → **produto**. Upsert idempotente pelas chaves únicas acima.
- Produto: `store, title, image(https), price, discountPercentage(0-100), affiliateLink(https)`; opcionais `itemId, originalPrice, rating, featured`. Sem `itemId`, usa `affiliateLink` como `externalId`.
- Cupom: `store, title, discount, code, link(https)`; opcional `expiresAt` (ISO 8601).
- Resposta: `{ ok: true, type: "product" | "coupon", id }`.

## Rotas do site

Todas leem do Prisma em tempo real (`force-dynamic`):

- `/` — Ofertas Relâmpago (maior `discountPercentage`, 4) e Destaques da Semana (mais recentes, 8).
- `/produtos` — todas as ofertas (mais recentes), busca e filtro por loja.
- `/cupons` — cupons não expirados (`expiresAt` nulo ou futuro), filtro por loja.
- `/sobre`, `/api/ofertas`.

Camada de dados: `src/lib/products.ts` (`getProducts`, `getFeaturedProducts`, `getFlashProducts`) e `src/lib/coupons.ts` (`getCoupons`). Não há mais mocks/JSON estáticos.

## Stack

Next.js 16.1.4 (App Router), React 19.2.3, TypeScript strict (alias `@/*` → `src/*`), Tailwind v4 (CSS-first em `src/app/globals.css`, sem `tailwind.config`), next-themes (`data-theme` no `<html>`), lucide-react, Prisma 6 + PostgreSQL, Zod 4, ESLint 9. Sem framework de testes.

```
npm run dev | build | start | lint
npx prisma migrate dev     # desenvolvimento (precisa de DATABASE_URL)
npx prisma migrate deploy  # produção
```

## Convenções

- Componentes com hooks/estado: `"use client"`. Libs de dados: `import "server-only"`.
- Páginas lendo o banco exportam `dynamic = "force-dynamic"` (o build não depende do banco).
- Idioma de conteúdo e metadata: pt-BR.
- Não calcular desconto/preço no front; apenas exibir o que o bot enviou.
