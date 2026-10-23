"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-imperio-gold">Algo deu errado</h1>
      <p className="text-imperio-muted">
        Não foi possível carregar esta página agora. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-imperio-action px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Tentar novamente
      </button>
    </div>
  );
}
