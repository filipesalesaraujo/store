# Store

## Descrição

Este projeto utiliza várias tecnologias modernas, incluindo **Next.js**, **TypeScript**, **Tailwind CSS**, **Shadcn/UI**, **NextAuth.js**, **ESLint**, **Vercel** e **Firebase**. Cada uma dessas tecnologias desempenha um papel crucial na criação de uma experiência de usuário rica e eficiente. Para mais detalhes sobre como cada tecnologia é usada neste projeto, consulte as seções correspondentes abaixo.


## 📚 Tecnologias Utilizadas

- [🔮 Next.js](#nextjs)
- [🔥 Firebase](#firebase)
- [📝 TypeScript](#typescript)
- [🎨 Tailwind CSS](#tailwind-css)
- [🔧 Shadcn/UI](#shadcnui)
- [🔐 NextAuth.js](#nextauthjs)
- [🧹 ESLint](#eslint)
- [☁️ Vercel](#vercel)

## 🔮 Next.js

Next.js é um framework de desenvolvimento web baseado em React que permite funcionalidades como renderização do lado do servidor e geração de sites estáticos para aplicações web baseadas em React. Ele é usado neste projeto pelos seguintes motivos:

- **Renderização do lado do servidor**: Next.js permite a renderização do lado do servidor, o que pode melhorar o tempo de carregamento da página e a otimização para mecanismos de busca.

- **Geração de sites estáticos**: Next.js suporta a geração de sites estáticos, o que pode resultar em páginas de alta performance que podem ser facilmente hospedadas em qualquer serviço de hospedagem de sites estáticos.

- **Roteamento baseado em sistema de arquivos**: Next.js usa um sistema de roteamento baseado em sistema de arquivos, o que torna a criação de rotas em sua aplicação web uma tarefa simples.

- **Suporte para TypeScript**: Next.js tem suporte embutido para TypeScript, o que permite que você aproveite todos os benefícios do TypeScript em seu projeto Next.js.

- **Hot Code Reloading**: Next.js recarrega automaticamente a página quando detecta qualquer alteração nos arquivos do seu projeto.

### Configuração do Next.js

O projeto está configurado para usar Next.js através do arquivo `next.config.js`. Este arquivo contém as configurações do Next.js para o projeto.

### Uso do Next.js

Para usar Next.js, simplesmente crie arquivos `.js` (ou `.ts` para TypeScript) na pasta `pages`. Cada arquivo corresponderá a uma rota baseada em seu nome de arquivo.

### Scripts

O projeto inclui os seguintes scripts relacionados ao Next.js:

- `dev`: Inicia o servidor de desenvolvimento Next.js.
- `build`: Cria uma versão de produção do projeto.
- `start`: Inicia o servidor de produção Next.js.


## 🔥 Firebase

Firebase é uma plataforma de desenvolvimento de aplicativos que fornece uma variedade de serviços. Este projeto utiliza especificamente o Firestore Database e o Firebase Storage.

- **Firestore Database**: Firestore é um banco de dados NoSQL que permite armazenar e sincronizar dados em tempo real entre usuários e dispositivos. Ele é usado neste projeto para armazenar e recuperar dados necessários para as funcionalidades do aplicativo.

- **Firebase Storage**: Firebase Storage é um serviço que permite fazer upload e download de arquivos. Este projeto usa o Firebase Storage para armazenar arquivos como imagens e documentos.

### Configuração do Firebase

O projeto está configurado para usar Firebase através do arquivo `firebase.config.js`. Este arquivo contém as configurações do Firebase para o projeto.

### Uso do Firebase

Para usar o Firestore, você pode fazer referência à instância do Firestore em seu código e usar os métodos fornecidos pelo SDK do Firebase para interagir com o banco de dados.

Para usar o Firebase Storage, você pode fazer referência à instância do Storage em seu código e usar os métodos fornecidos pelo SDK do Firebase para fazer upload e download de arquivos.


## 📝 TypeScript

TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft que é um superconjunto sintático estrito de JavaScript e adiciona tipagem estática. É usado neste projeto pelos seguintes motivos:

- **Tipagem estática**: TypeScript permite a definição de tipos para suas variáveis e parâmetros de função, o que pode ajudar a prevenir muitos erros comuns em JavaScript.

- **Ferramentas de desenvolvimento aprimoradas**: A tipagem estática permite que ferramentas de desenvolvimento forneçam um ambiente de codificação mais rico, com recursos como autocompletar, navegação para definição, refatoração e muito mais.

- **Compatibilidade com JavaScript**: TypeScript é um superconjunto de JavaScript, o que significa que qualquer código JavaScript válido é também um código TypeScript válido. Isso torna mais fácil a migração de um projeto JavaScript existente para TypeScript.

- **Suporte para recursos mais recentes de JavaScript**: TypeScript suporta recursos mais recentes de JavaScript que podem não ser suportados por todos os navegadores.

- **Interfaces e tipos**: TypeScript permite a definição de interfaces e tipos que podem ser usados para garantir a consistência em todo o código.

- **Suporte para módulos e namespaces**: TypeScript suporta módulos e namespaces, o que pode ajudar a organizar e modularizar o código.

### Configuração do TypeScript

O projeto está configurado para usar TypeScript através do arquivo `tsconfig.json`. Este arquivo contém as configurações do compilador TypeScript para o projeto.

### Uso do TypeScript

Para usar TypeScript, simplesmente use a extensão `.ts` ou `.tsx` (para arquivos que contêm JSX) em vez de `.js` ao criar arquivos. O TypeScript será automaticamente compilado para JavaScript quando o projeto for construído.

### Verificação de Tipo

Para verificar os tipos em seu projeto, você pode usar o comando `tsc --noEmit`. Este comando irá verificar os tipos em seu projeto sem emitir arquivos de saída.

### Linting

ESLint é usado para linting do código TypeScript. As regras de linting são configuradas no arquivo `.eslintrc`.

### Scripts

O projeto inclui os seguintes scripts relacionados ao TypeScript:

- `type-check`: Executa a verificação de tipo no projeto.
- `type-check:watch`: Executa a verificação de tipo no projeto em modo de observação.


## 🔧 Shadcn/UI

Shadcn/UI é uma biblioteca de componentes de interface do usuário para React. Ela fornece uma coleção de componentes pré-construídos que você pode usar para acelerar o desenvolvimento da interface do usuário. Ela é usada neste projeto pelos seguintes motivos:

- **Componentes pré-construídos**: Shadcn/UI fornece uma variedade de componentes de interface do usuário pré-construídos que você pode usar em seu aplicativo.

- **Personalização**: Shadcn/UI permite que você personalize os componentes para se adequar à estética do seu projeto.

- **Facilidade de uso**: Shadcn/UI é fácil de usar e tem uma curva de aprendizado suave, o que ajuda a acelerar o desenvolvimento.

- **Compatibilidade com React**: Como Shadcn/UI é construído para React, ele se integra bem com qualquer projeto React.

### Configuração do Shadcn/UI

O projeto está configurado para usar Shadcn/UI através da instalação do pacote `shadcn/ui`.

### Uso do Shadcn/UI

Para usar Shadcn/UI, você pode importar qualquer componente Shadcn/UI em seus arquivos de componente e usá-los como qualquer outro componente React.


## 🎨 Tailwind CSS

Tailwind CSS é um framework de CSS de baixo nível que permite a criação de designs personalizados sem sair do seu HTML. Ele é usado neste projeto pelos seguintes motivos:

- **Utilitários em vez de componentes pré-definidos**: Tailwind CSS fornece utilitários de baixo nível que permitem construir designs personalizados sem nunca sair do seu HTML.

- **Responsividade out-of-the-box**: Tailwind CSS inclui um sistema de grid flexível e responsivo que permite a construção de layouts responsivos com facilidade.

- **Customizável**: Tailwind CSS é altamente customizável, permitindo que você defina suas próprias cores, espaçamentos, tamanhos de fonte e muito mais.

- **Otimizado para produção**: Na produção, Tailwind CSS remove todo o CSS não utilizado, resultando em arquivos CSS menores e mais eficientes.

### Configuração do Tailwind CSS

O projeto está configurado para usar Tailwind CSS através do arquivo `tailwind.config.js`. Este arquivo contém as configurações do Tailwind CSS para o projeto.

### Uso do Tailwind CSS

Para usar Tailwind CSS, simplesmente adicione as classes utilitárias do Tailwind CSS ao seu HTML. Por exemplo, para aplicar padding, você pode usar a classe `p-4`.

### Purge CSS

Na produção, Tailwind CSS usa PurgeCSS para remover todo o CSS não utilizado. As configurações do PurgeCSS estão definidas no arquivo `tailwind.config.js`.


## 🔐 NextAuth.js

NextAuth.js é uma biblioteca de autenticação completa e fácil de usar para Next.js.

#### Uso do NextAuth.js

Neste projeto, estamos usando o NextAuth.js para simplificar o processo de autenticação. Em particular, estamos usando o provedor de credenciais do NextAuth.js. O provedor de credenciais é uma opção de autenticação que permite aos usuários fazer login com um nome de usuário / e-mail e senha. Este método de autenticação é útil quando você deseja implementar uma autenticação tradicional baseada em nome de usuário e senha.

#### Configuração

O projeto está configurado para usar NextAuth.js através do arquivo `route.ts` no diretório `\app\api\auth\[...nextauth]`. Este arquivo contém as configurações do NextAuth.js para o projeto, incluindo a configuração do provedor de credenciais.

#### Scripts

Para usar NextAuth.js, você pode importar a função `useSession` em seus componentes para acessar a sessão do usuário. Você também pode usar a função `getSession` em funções do lado do servidor para acessar a sessão do usuário.


## 🧹 ESLint

ESLint é uma ferramenta de linting para JavaScript e TypeScript.

#### Uso

Ele é usado neste projeto para garantir que o código siga as diretrizes de estilo e para identificar possíveis problemas. O ESLint ajuda a manter a qualidade do código, evitando erros comuns e forçando um estilo de código consistente.

#### Configuração

A configuração do ESLint para este projeto está no arquivo `.eslintrc.json` na raiz do projeto. Este arquivo contém as regras e configurações do ESLint para o projeto.


## ☁️ Vercel

A Vercel é uma plataforma de hospedagem em nuvem para sites estáticos e aplicações JavaScript.

#### Uso

Neste projeto, estamos usando a Vercel para hospedar nosso aplicativo Next.js. A Vercel é uma escolha popular para projetos Next.js devido à sua integração perfeita e recursos de implantação automática.

#### Scripts

O script `lint` no arquivo `package.json` pode ser usado para executar o ESLint em todo o projeto. Este script verifica todos os arquivos JavaScript e TypeScript no projeto e relata quaisquer problemas encontrados.


## 📜 Scripts

### `dev`

Inicia o servidor de desenvolvimento Next.js. Use este script durante o desenvolvimento para ver as alterações em tempo real.

### `build`

Cria a versão de produção do aplicativo. Este script deve ser executado antes de implantar o aplicativo.

### `start`

Inicia o servidor de produção Next.js. Use este script para iniciar o aplicativo em um ambiente de produção.

### `lint`

Executa o linter no código. Use este script para verificar se o código segue as diretrizes de estilo e para identificar possíveis problemas.

## 📦 Dependências

### `@firebase/firestore`

Permite a interação com o Firestore, o banco de dados NoSQL do Firebase.

### `@firebase/storage`

Permite a interação com o Firebase Storage, usado para armazenar e servir arquivos de usuário.

### `@radix-ui/react-dialog`

Fornece componentes para criar diálogos.

### `@radix-ui/react-label`

Fornece componentes para criar rótulos.

### `@radix-ui/react-menubar`

Fornece componentes para criar barras de menu.

### `@radix-ui/react-navigation-menu`

Fornece componentes para criar menus de navegação.

### `@radix-ui/react-slot`

Fornece componentes para criar slots.

### `class-variance-authority`

Fornece funcionalidades para gerenciar a autoridade de variância de classe.

### `clsx`

Permite a concatenação condicional de nomes de classes.

### `firebase`

Permite a interação com o Firebase, uma plataforma de desenvolvimento de aplicativos.

### `lucide-react`

Fornece ícones para o projeto.

### `next`

É o framework de desenvolvimento web usado para criar o projeto.

### `next-auth`

Fornece funcionalidades de autenticação para o projeto.

### `react`

É a biblioteca de UI usada para criar a interface do usuário do projeto.

### `react-dom`

Permite a renderização do DOM.

### `react-icons`

Fornece ícones para o projeto.

### `tailwind-merge`

Permite a combinação de classes Tailwind.

### `tailwindcss-animate`

Fornece funcionalidades de animação com Tailwind CSS.

### `vaul`

Fornece funcionalidades de gerenciamento de estado.

## Dependências de Desenvolvimento

### `@types/node`

Fornece tipos TypeScript para Node.js.

### `@types/react`

Fornece tipos TypeScript para React.

### `@types/react-dom`

Fornece tipos TypeScript para ReactDOM.

### `autoprefixer`

Adiciona automaticamente prefixos de fornecedor a CSS.

### `eslint`

Fornece funcionalidades de linting.

### `eslint-config-next`

Fornece uma configuração ESLint para Next.js.

### `postcss`

Fornece funcionalidades de processamento de CSS.

### `tailwindcss`

Fornece utilitários de estilo.

### `typescript`

Fornece suporte a TypeScript.