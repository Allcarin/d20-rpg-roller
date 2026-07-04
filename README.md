# D20 RPG Roller

Mini aplicativo web de rolagem de dados para RPG, criado em React + Vite e pronto para hospedagem estatica.

## Recursos

- D20 como dado principal na primeira experiencia.
- Seletores para D4, D6, D8, D10, D12, D20 e D100.
- Multiplas rolagens de 1 a 12 dados.
- Modificador numerico para testes comuns de RPG.
- Animacao visual leve enquanto os dados rolam.
- Historico das ultimas rolagens.
- Build com caminhos relativos para funcionar em GitHub Pages.

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar build

```bash
npm run build
```

O resultado fica em `dist/`.

## Publicar no GitHub Pages

1. Crie um repositorio no GitHub e envie estes arquivos.
2. No repositorio, abra `Settings > Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions`.
4. Faca push para a branch principal.

O workflow de deploy ja esta em `.github/workflows/deploy.yml`.
