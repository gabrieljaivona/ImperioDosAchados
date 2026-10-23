export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Carregando"
      className="flex min-h-[40vh] items-center justify-center"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-imperio-bronze border-t-imperio-action" />
    </div>
  );
}
