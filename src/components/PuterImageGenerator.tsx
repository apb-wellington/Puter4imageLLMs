"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    puter?: {
      ai: {
        txt2img: (
          prompt: string,
          options?: Record<string, unknown>,
        ) => Promise<HTMLImageElement>;
      };
    };
  }
}

const DEFAULT_MODEL = "gemini-3-pro-image-preview";

const PuterImageGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = React.useState("");
  const [model, setModel] = React.useState(DEFAULT_MODEL);
  const [token, setToken] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  React.useEffect(() => {
    if (window.puter?.ai?.txt2img) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const extractError = (unknownError: unknown) => {
    if (typeof unknownError === "string") {
      return unknownError;
    }
    if (unknownError instanceof Error) {
      return unknownError.message;
    }
    try {
      return JSON.stringify(unknownError);
    } catch {
      return "Falha inesperada";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setError("O prompt é obrigatório.");
      toast({
        title: "Prompt faltando",
        description: "Digite um prompt para começar.",
      });
      return;
    }

    if (!window.puter?.ai?.txt2img) {
      setError("Não foi possível carregar o SDK do Puter.");
      toast({
        title: "SDK indisponível",
        description: "Recarregue a página para tentar novamente.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const options: Record<string, unknown> = {
        model: model || DEFAULT_MODEL,
      };

      const imageElement = await window.puter.ai.txt2img(prompt, options);
      setImageSrc(imageElement.src);
      toast({
        title: "Imagem pronta!",
        description: "O Puter retornou uma nova imagem.",
      });
    } catch (err) {
      const message = extractError(err);
      setError(message);
      toast({
        title: "Erro",
        description: "Não foi possível gerar a imagem. Veja os detalhes abaixo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-4xl space-y-6 rounded-[32px] border border-slate-800/60 bg-slate-900/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.6)]">
      <div className="flex flex-col gap-1">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Puter4imageLLMs
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Gerar imagens com Puter
        </h2>
        <p className="text-sm text-slate-400">
          Prompt e modelo vão direto para o puter.ai.txt2img; o token fica apenas
          como campo extra por enquanto.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-200">Prompt</Label>
          <Textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Descreva o que você quer ver."
            className="min-h-[140px] rounded-2xl border border-slate-700 bg-slate-950/40 text-base text-white focus:border-cyan-400 focus:ring-0"
            required
          />
          <p className="text-xs text-slate-400">
            Sem prompt não há geração.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-200">Modelo</Label>
            <Input
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder={DEFAULT_MODEL}
              className="rounded-2xl border border-slate-700 bg-slate-950/40 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-0"
            />
            <p className="text-xs text-slate-400">
              Qualquer modelo válido do Puter, como gemini-2.5-flash-image-preview.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-200">Token (opcional)</Label>
            <Input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Campo pronto para token"
              className="rounded-2xl border border-slate-700 bg-slate-950/40 text-white focus:border-cyan-400 focus:ring-0"
            />
            <p className="text-xs text-slate-400">
              O valor não é usado hoje; mantenha limpo ou deixe em branco.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500/90 px-6 py-4 text-lg font-semibold text-white transition hover:bg-cyan-400"
            disabled={isLoading || !scriptLoaded}
          >
            {scriptLoaded ? (isLoading ? "Gerando..." : "Gerar imagem") : "Carregando Puter..."}
          </Button>
          {!scriptLoaded && (
            <p className="text-center text-xs text-slate-400">
              Aguarde enquanto o script oficial carrega.
            </p>
          )}
        </div>
      </form>

      <div className="rounded-3xl border border-slate-800/80 bg-slate-950/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Pré-visualização
        </p>
        <div className="mt-3 min-h-[240px] rounded-2xl border border-dashed border-slate-800/70 bg-slate-950/50 p-6">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Resultado gerado pelo Puter"
              className="h-80 w-full rounded-2xl border border-slate-700/80 object-contain shadow-[0_10px_40px_rgba(15,23,42,0.65)]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-sm text-slate-400">
              <p>Sem imagem gerada ainda.</p>
              <p>Envie um prompt e clique em gerar.</p>
            </div>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="rounded-2xl border border-transparent bg-red-500/10 px-5 py-4 text-sm text-red-200"
      >
        {error ? (
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
            {error}
          </pre>
        ) : (
          <p className="text-slate-500">
            Erros aparecem aqui sem filtros.
          </p>
        )}
      </div>
    </section>
  );
};

export default PuterImageGenerator;