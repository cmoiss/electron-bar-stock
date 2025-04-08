# 🍻 BarStock - Sistema de Gerenciamento de Estoque para Bar

![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![image](https://github.com/user-attachments/assets/c74cb22e-ef40-4ab3-b8ae-761e8f39a69f)

O BarStock é um projeto voluntário de um sistema desktop para gerenciamento de estoque de bar, desenvolvido com Electron JS (frontend) e Spring Boot (backend).

## 📋 Funcionalidades

- Cadastro de produtos (bebidas)
- Controle de entradas e saídas do estoque
- Alertas de produtos com baixo estoque
- Relatórios de movimentação
- Gestão de categorias de produtos
- Administração de estoque interno e externo
- Variação de volume e unidades por pack

## 🛠 Tecnologias Utilizadas

### Frontend
- **Electron JS** - Framework para aplicações desktop multiplataforma
- **Tailwind CSS** - Para estilização

### Backend
- **Spring Boot** - Framework Java para construção da API
- **JPA/Hibernate** - Persistência de dados
- **Banco de dados** - H2Database com persistência em disco

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v22 ou superior)
- Java JDK (v21 ou superior)
- Maven

### Backend (Spring Boot)
1. Clone o repositório:
   ```bash
   git clone https://github.com/cmoiss/api-de-controle-de-estoque.git
   cd api-de-controle-de-estoque/
   ```

2. Configure o arquivo application.properties com as credenciais do seu banco de dados.

3. Execute o projeto:
    ```bash
    mvn spring-boot:run
    ```

A API estará disponível em http://localhost:8080.

### Frontend (Electron)
1. Acesse a pasta do frontend:

    ```bash
    git clone https://github.com/cmoiss/electron-bar-stock.git
    cd electron-bar-stock/
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Execute em modo de desenvolvimento:
    ```bash
    npm start
    ```

4. Para construir o aplicativo:
    ```bash
    npm run build
    ```

## 📄 Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## ✉️ Contato
Caio Souza - [Linkedin](https://www.linkedin.com/in/caiomoises/) - [Email](ocaiomoises@gmail.com)

Link do Projeto: https://github.com/cmoiss/electron-bar-stock