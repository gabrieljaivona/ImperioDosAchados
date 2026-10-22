import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { couponSchema, productSchema } from "@/lib/ingest-schemas";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT = 60; // requisições por janela, por IP
const RATE_WINDOW_MS = 60_000;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

function isAuthorized(req: NextRequest) {
  const expected = process.env.SITE_API_TOKEN;
  if (!expected) return false;

  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return timingSafeEqual(sha256(token), sha256(expected));
}

function fail(status: number, error: string, details?: unknown) {
  return NextResponse.json({ ok: false, error, details }, { status });
}

/**
 * Recebe ofertas e cupons do bot. O tipo é inferido pelo corpo:
 * `code` presente → cupom; caso contrário → produto.
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return fail(401, "Não autorizado");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) return fail(429, "Muitas requisições");

  const raw = await req.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
    return fail(413, "Corpo grande demais");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "JSON inválido");
  }

  const isCoupon =
    typeof body === "object" && body !== null && "code" in body;

  if (isCoupon) {
    const parsed = couponSchema.safeParse(body);
    if (!parsed.success) return fail(422, "Payload inválido", parsed.error.issues);

    const { expiresAt, ...rest } = parsed.data;
    const data = { ...rest, expiresAt: expiresAt ? new Date(expiresAt) : null };
    const coupon = await prisma.coupon.upsert({
      where: { store_code: { store: data.store, code: data.code } },
      create: data,
      update: data,
    });
    return NextResponse.json({ ok: true, type: "coupon", id: coupon.id });
  }

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return fail(422, "Payload inválido", parsed.error.issues);

  const { itemId, ...rest } = parsed.data;
  const data = { ...rest, externalId: itemId ?? rest.affiliateLink };
  const product = await prisma.product.upsert({
    where: { store_externalId: { store: data.store, externalId: data.externalId } },
    create: data,
    update: data,
  });
  return NextResponse.json({ ok: true, type: "product", id: product.id });
}
