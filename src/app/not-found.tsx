import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-imperio-gold">404</h1>
      <p className="text-imperio-muted">Essa página não existe ou foi removida.</p>
      <Link
        href="/"
        className="inline-block rounded-md bg-imperio-action px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
