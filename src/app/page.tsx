import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6 bg-imperio-bg transition-colors">
      
      <div className="absolute top-4 right-4">
        {/* Usamos o componente normalmente */}
        <ThemeToggle />
      </div>

      <h1 className="text-4xl font-bold tracking-widest text-imperio-text uppercase">
        Império dos <span className="text-imperio-gold">Achados</span>
      </h1>

      {/* Card de Teste */}
      <div className="bg-imperio-surface border border-imperio-bronze rounded-xl p-6 max-w-sm w-full shadow-lg">
        <div className="h-40 w-full bg-zinc-200/10 rounded-lg mb-4 flex items-center justify-center text-imperio-muted">
          Foto do Produto
        </div>
        
        <h2 className="text-xl font-semibold text-imperio-text mb-2">
          Teclado Mecânico
        </h2>
        
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
             <span className="text-imperio-muted text-sm line-through">R$ 250,00</span>
             <span className="text-imperio-action text-2xl font-bold">R$ 150,00</span>
          </div>
          
          <button className="bg-imperio-action text-white dark:text-black font-bold py-2 px-4 rounded hover:brightness-110 cursor-pointer">
            Comprar
          </button>
        </div>
      </div>

    </main>
  );
}