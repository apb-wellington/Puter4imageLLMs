"use client";

import PuterImageGenerator from "@/components/PuterImageGenerator";
import { MadeWithDyad } from "@/components/made-with-dyad";

const highlights = [
  {
    title: "Prompt obrigatório",
    description: "Campo amplo para descrever exatamente a cena que quer ver.",
  },
  {
    title: "Modelos à vontade",
    description: "Altere o modelo em tempo real sem tocar no código.",
  },
  {
    title: "Erro transparente",
    description: "Qualquer falha aparece pura, para entender o que ocorreu.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 lg:py-16">
        <section className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.7)]">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Puter4imageLLMs
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Interface estática otimizada para GitHub Pages
          </h1>
          <p className="text-lg text-slate-300">
            Gere imagens direto do navegador via puter.ai.txt2img e troque modelos,
            prompt e token sem backend — é 100% client-side e pronta para deploy no GitHub Pages.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 text-sm text-slate-200"
              >
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <PuterImageGenerator />

        <footer className="flex flex-col items-center gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 px-6 py-4 text-xs text-slate-400">
          <MadeWithDyad />
          <p>Pronto para publicação imediata no GitHub Pages.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;