
# Projeto Gráfico de PIB do Brasil utilizando API IBGE

Este projeto exibe gráficos interativos do PIB do Brasil por ano ,PIB per capita e uma tabela com todos os dados, utilizando a API do IBGEdisponível em: https://servicodados.ibge.gov.br/api/docs/agregados?versao=3#api-Variaveis-agregadosAgregadoVariaveisVariavelGet. A aplicação é desenvolvida em React, com estilização usando Tailwind CSS.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da interface.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **CSS personalizado**: Para funcionalidades específicas, como transições de estado usando Context API.
- **Recharts**: Biblioteca para gráficos interativos.
- **Axios**: Para requisições HTTP à API de dados.
- **Vite**: Ferramenta de build e desenvolvimento rápido.

## Funcionalidades

1. **Gráfico interativo**: 
- Exibe PIB por ano ou PIB per capita.
- Permite alternar entre os tipos de dados com caixas de seleção.

2. **Tabela de dados**: 
- Lista todos os anos disponíveis e seus respectivos valores de PIB e PIB per capita.
- Permite visualização detalhada de todos os dados da API.

3. **Transições de estado**: 
- Implementadas com **Context API** e CSS personalizado, garantindo uma experiência suave ao alternar entre telas e filtros.

## Instalação

1. Clone o repositório:
   
    git clone https://github.com/adcleisson/pib-brasil-ibge.git
   
    cd nome-do-repositorio

2. Instale as dependencias:

    npm install

3.Execute a aplicação em modo de desenvolvimento:

    npm run dev

4.Acesse no navegador:

    http://localhost:5173

## Decisões de Design

- Utilizei React com componentes funcionais e hooks (useState, useEffect) para gerenciamento de estado e chamadas à API.

-    O Tailwind CSS foi escolhido para criar layouts rápidos e responsivos.

  -  CSS personalizado foi utilizado para melhorar transições de estado e animações com Context API.

   - Recharts permite gráficos dinâmicos e interativos facilmente integráveis com React.

   - Implementamos duas telas: uma com o gráfico e outra com a tabela de dados, facilitando a navegação e análise das informações.

## Deploy

- O projeto está disponível online em:
    https://adcleisson.github.io/pib-brasil-ibge

## Qualquer dúvida ou sugestão pode ser aberta na seção de Issues do repositório.
