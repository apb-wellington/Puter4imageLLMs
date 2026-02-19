# Puter4imageLLMs

Projeto simples que gera imagens com o SDK `puter.ai.txt2img` direto no navegador, pronto para deploy estático (por exemplo, GitHub Pages) e sem backend.

## Como usar

1. Instale as dependências: `npm install`
2. Rode o servidor de desenvolvimento: `npm run dev`
3. Abra http://localhost:5173 (ou a porta indicada pelo Vite) para usar a interface.
4. Preencha o prompt, escolha um modelo e clique em **Gerar imagem**. O campo *token* permanece opcional e pode ser preenchido se necessário no futuro.

## Deploy

- Execute `npm run build` para gerar os arquivos estáticos.
- Os arquivos ficam em `dist`; faça o upload para o repositório ou serviço de hospedagem estática desejado (GitHub Pages funciona bem com esse setup).

## Estrutura relevante

- `src/pages/Index.tsx`: página principal com a interface minimalista.
- `src/components/PuterImageGenerator.tsx`: formulário controlado que carrega o SDK oficial via script.
- `src/components/ui/*`: biblioteca shadcn para componentes estilizados (botões, inputs, toasts etc.).
- `src/App.tsx`: configura o React Router com a rota padrão e o fallback 404.

## Notas

- Não há backend nem armazenamento de tokens.
- Os erros aparecem diretamente em tela para facilitar a inspeção.
- Use o toast para notificações rápidas; o app já inclui `sonner` e o hook de toasts shadcn.