import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Império Dos Achados trata seus dados.",
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-bold text-imperio-gold">Política de Privacidade</h1>
      <p className="text-imperio-text">
        O Império Dos Achados não exige cadastro e não coleta dados pessoais
        diretamente. Esta página explica o que acontece quando você navega pelo
        site, em conformidade com a LGPD (Lei nº 13.709/2018).
      </p>
      <h2 className="text-lg font-semibold text-imperio-text">Cookies e Meta Pixel</h2>
      <p className="text-imperio-muted">
        Se você aceitar, carregamos o Meta Pixel (Facebook), que registra
        visualizações de página e cliques no convite do grupo VIP para medir
        e melhorar nossos anúncios. Sem o seu consentimento, o Pixel não é
        carregado. Você pode limpar os dados do site no navegador para rever sua
        escolha.
      </p>
      <h2 className="text-lg font-semibold text-imperio-text">Links de afiliados</h2>
      <p className="text-imperio-muted">
        Ao clicar em uma oferta, você é levado ao site da loja parceira, que
        possui sua própria política de privacidade e pode usar cookies de
        afiliado para registrar a origem da compra.
      </p>
      <h2 className="text-lg font-semibold text-imperio-text">Seus direitos</h2>
      <p className="text-imperio-muted">
        Você pode solicitar acesso, correção ou exclusão de dados que porventura
        tenhamos sobre você, pelos canais de contato do site.
      </p>
    </div>
  );
}
