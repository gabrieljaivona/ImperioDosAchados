# Império Dos Achados

Site público de ofertas e cupons de afiliados (pt-BR). O front só lê do banco e exibe; a inteligência (scraping, links de afiliado, cálculo de desconto) fica no repositório irmão `BotImperioDosAchados`, que envia os dados por POST para a API deste site.

```
BotImperioDosAchados ──POST /api/ofertas (Bearer)──▶ Next.js ──Prisma──▶ PostgreSQL
```

## Stack

Next.js 16.1.4 (App Router, versão fixa) · React 19 · TypeScript · Tailwind v4 · next-themes · Prisma 6 + PostgreSQL · Zod 4 · lucide-react · ESLint 9

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (dev) ou configure no painel da Hostinger.

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | Conexão PostgreSQL |
| `SITE_API_TOKEN` | Token Bearer exigido pela API (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública (sitemap, robots, Open Graph) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel (só carrega após aceite de cookies) |
| `NEXT_PUBLIC_VIP_GROUP_URL` | Link do grupo VIP |

> As variáveis `NEXT_PUBLIC_*` são embutidas **no build**. Defina-as antes de rodar `npm run build`; alterá-las depois exige novo build.

## Desenvolvimento

```bash
npm install            # roda prisma generate (postinstall)
npx prisma migrate dev # aplica migrations no banco local
npm run dev
```

Scripts: `dev`, `build` (`prisma generate && next build --webpack`), `start`, `lint`, `migrate` (`prisma migrate deploy`).

## Deploy na Hostinger

1. Crie o banco PostgreSQL e anote a string de conexão.
2. Crie a aplicação Node.js apontando para este repositório (branch `main`).
3. Configure as variáveis de ambiente acima (inclusive as `NEXT_PUBLIC_*`, antes do build).
4. Instale as dependências: `npm install` (gera o Prisma Client).
5. Aplique as migrations: `npm run migrate`.
6. Compile: `npm run build`.
7. Inicie: `npm run start`.
8. Aponte o bot para `https://SEU_DOMINIO/api/ofertas` com o mesmo `SITE_API_TOKEN`.

> **Versão do Next.js:** mantenha `next` fixo em `16.1.4` (sem `^`). A 16.4.3 falha na Hostinger com `GLIBC_2.29 not found` (binário do SWC exige glibc mais novo que o do servidor). O build usa webpack pelo mesmo motivo de compatibilidade. Só atualize após confirmar o glibc do servidor.

A cada deploy com mudança em `prisma/`, rode `npm run migrate` antes de reiniciar.

## API: `POST /api/ofertas`

Autenticação por `Authorization: Bearer <SITE_API_TOKEN>`. Limites: corpo ≤ 16 KB (413), 60 req/min por IP (429), JSON inválido (400), payload inválido (422). Com `code` no corpo é **cupom**; senão, **produto**. O upsert é idempotente.

Produto:

```bash
curl -X POST https://SEU_DOMINIO/api/ofertas \
  -H "Authorization: Bearer $SITE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "store": "Mercado Livre",
    "itemId": "MLB123456",
    "title": "Fone Bluetooth",
    "image": "https://http2.mlstatic.com/exemplo.jpg",
    "price": 89.9,
    "originalPrice": 149.9,
    "discountPercentage": 40,
    "affiliateLink": "https://mercadolivre.com/sec/abc123"
  }'
```

Cupom:

```bash
curl -X POST https://SEU_DOMINIO/api/ofertas \
  -H "Authorization: Bearer $SITE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "store": "Shopee",
    "title": "10% off na primeira compra",
    "discount": "10%",
    "code": "ACHADOS10",
    "link": "https://s.shopee.com.br/abc",
    "expiresAt": "2026-12-31T23:59:59Z"
  }'
```

Resposta: `{ "ok": true, "type": "product" | "coupon", "id": "..." }`.

## Rotas

`/` (relâmpago + destaques) · `/produtos` (até 100 ofertas, busca e filtro por loja) · `/cupons` · `/sobre` · `/privacidade` · `/termos` · `/sitemap.xml` · `/robots.txt`
