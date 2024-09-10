# Data Insights API

### **Descrição do Projeto: Sistema de Upload e Análise de Dados Financeiros**

O sistema permitirá que os usuários façam o upload de arquivos Excel (XLSX) contendo dados financeiros, como despesas, receitas ou dados de vendas, e visualizem gráficos e tabelas interativas com base nesses dados no front-end. Além disso, os dados serão armazenados no banco de dados para consultas futuras, e o usuário poderá gerar PDFs contendo resumos ou gráficos dos dados analisados.

### **Funcionalidades Detalhadas**:

1. **Upload de Arquivo Excel**:
    - O usuário pode fazer upload de um arquivo Excel com dados financeiros ou de vendas.
    - O sistema validará o formato e a estrutura das colunas (datas, valores, categorias etc.) do arquivo Excel.
2. **Visualização de Gráficos e Tabelas**:
    - Os dados do arquivo serão analisados e transformados em gráficos e tabelas no front-end.
    - Serão usados gráficos de barras, linhas ou pizza, e bibliotecas como `Chart.js` ou `D3.js`.
    - Os gráficos e tabelas serão interativos, permitindo que o usuário aplique filtros por data, categoria, tipo de transação (receita ou despesa), entre outros.
3. **Salvamento no Banco de Dados**:
    - Os dados extraídos do arquivo Excel serão salvos no banco de dados (MongoDB ou PostgreSQL), permitindo que o usuário acesse esses dados posteriormente, sem a necessidade de fazer um novo upload.
    - As tabelas no banco de dados armazenarão informações sobre datas, categorias, tipo de transação e valor total.
4. **Geração de PDFs**:
    - O usuário poderá gerar PDFs a partir de um período ou uma categoria de dados específicos.
    - Os PDFs podem conter gráficos e tabelas, gerados a partir dos dados filtrados, que poderão ser baixados ou enviados por e-mail.
    - Os gráficos no PDF podem ser capturados diretamente do front-end ou gerados no back-end.
5. **Histórico de Uploads**:
    - O sistema manterá um histórico dos uploads feitos pelo usuário, permitindo que ele acesse novamente os gráficos e tabelas gerados anteriormente.

### **Fluxo de Trabalho**:

1. O usuário faz o upload de um arquivo Excel.
2. O sistema processa os dados e exibe gráficos e tabelas no front-end.
3. Os dados são armazenados no banco de dados.
4. O usuário visualiza gráficos e tabelas interativas com filtros.
5. O usuário pode gerar um PDF contendo gráficos e tabelas resumidos.

### **Tecnologias Utilizadas**:

- **Back-end**:
    - Node.js com `Fastify`.
    - Manipulação de Excel com `xlsx` ou `exceljs`.
    - Geração de PDFs com `pdfkit` ou `puppeteer`.
    - Banco de dados: `PostgreSQL / Knex`
- **Front-end**:
    - Framework: React.
    - Gráficos: `Chart.js` ou `D3.js` para visualização.
    - Design: Tailwind CSS.
- **Armazenamento de Arquivos** (opcional):
    - AWS S3 ou Google Cloud Storage para armazenar os arquivos Excel originais.
- **Autenticação**:
    - Login com `JWT` ou `OAuth` (Google Login, por exemplo) para gerenciamento de usuários e segurança.

### **Campos para Enviar nas Planilhas (XLSX ou CSV)**:

Os arquivos enviados pelo usuário devem conter as seguintes colunas:

1. **Data**: Data da transação.
2. **Categoria**: Tipo de despesa ou receita.
3. **Descrição**: Breve descrição da transação.
4. **Tipo de Transação**: Receita ou despesa.
5. **Valor**: Valor financeiro da transação.
6. **Método de Pagamento**: (opcional) Ex.: cartão de crédito, transferência.
7. **Status**: (opcional) Ex.: paga, pendente.
8. **Cliente/Fornecedor**: (opcional) Nome do cliente ou fornecedor.
9. **Número da Nota Fiscal**: (opcional) Número da nota fiscal relacionada.
10. **Responsável**: (opcional) Pessoa ou equipe responsável.

### **Campos para Mostrar na Tela (Front-end)**:

Os dados extraídos da planilha serão exibidos em uma tabela interativa, com os seguintes campos:

1. **Data da Transação**.
2. **Categoria**.
3. **Descrição**.
4. **Tipo de Transação**: Receita ou despesa.
5. **Valor (R$)**.
6. **Método de Pagamento** (opcional).
7. **Cliente/Fornecedor** (opcional).
8. **Status** (opcional).
9. **Responsável** (opcional).
10. **Ações**: Ex.: gerar PDF, editar ou excluir.

### **Filtros para Visualização**:

1. **Filtro por Data**.
2. **Filtro por Categoria**.
3. **Filtro por Tipo de Transação**.
4. **Filtro por Status**.
5. **Filtro por Cliente/Fornecedor** (opcional).

### **Geração de PDFs**:

Os PDFs gerados podem conter:

1. **Resumo Financeiro**: Total de receitas, despesas e saldo.
2. **Gráficos**: Distribuição de receitas e despesas por categorias.
3. **Detalhamento por Data**: Lista de transações filtradas por data.
4. **Tabelas**: Resumo categorizado das transações.

### **Processamento Assíncrono de Arquivos Grandes**:

- Para melhorar a experiência do usuário, arquivos grandes podem ser processados de forma assíncrona utilizando **filas** (Bull, RabbitMQ ou AWS SQS).
- O upload é rápido e o processamento ocorre em segundo plano.
- O usuário é notificado quando o processamento é concluído.

### **Geração Assíncrona de PDFs**:

- PDFs podem ser gerados de forma assíncrona, utilizando filas para evitar que a geração de relatórios impacte a performance do sistema.
- O usuário pode solicitar a geração e continuar utilizando o sistema enquanto o PDF é gerado em segundo plano.

### **Ferramentas Utilizadas**:

- **Filas**: Bull, RabbitMQ, ou AWS SQS.
- **Monitoramento**: Bull Board para monitorar o status das filas, ou Prometheus/Grafana para monitoramento avançado.

### Material de apoio:

- [Filas na AWS para Processamento Assíncrono com Lambda e SQS](https://www.youtube.com/live/Cwg8iiAMSSs)
- [Serviço de geração de relatórios assíncrono com Serverless Framework](https://www.youtube.com/live/DzMEmd4hsRA)


## User module
- SignIn
- SignUp
- FindByEmail

- ResetPassword
  - Send a link to the user email to reset the password *
  - https://supabase.com/docs/reference/javascript/auth-signout
