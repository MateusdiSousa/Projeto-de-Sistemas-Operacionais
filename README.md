<div align="center">

# ADS04_ISO200

Repositório para apresentar o projeto desenvolvido para a disciplina Sistemas Operacionais II.

## <a href="https://www.linkedin.com/in/fabiano-sabha-8661b4/" target="Sabha"> Professor Fabiano Sabha Walczak </a>



</div>

# :rocket: Tecnologias Utilizadas

Para o desenvolvimento deste projeto foram utilizadas as seguintes ferramentas e tecnologias:

<table>
  <thead>
    <th>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="Alt text" title="TypeScript" style="display: inline-block; margin: 0 auto; width: 60px">
    </th>
    <th>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="Alt text" title="React" style="display: inline-block; margin: 0 auto; width: 60px"></th>
    <th>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" alt="Alt text" title="NestJs" style="display: inline-block; margin: 0 auto; width: 60px" />
    <th>
        <img src="https://www.debian.org/logos/openlogo-nd.svg" alt="Alt text" title="Debian" style="display: inline-block; margin: 0 auto; width: 60px">
    </th>
    <th>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" alt="Alt text" title="React" style="display: inline-block; margin: 0 auto; width: 60px" />
    </th>
    <th>
        <img src="https://github.com/apiFatec/API-3-Semestre-Ionic/assets/112169639/8f7699b6-4ee3-4bfb-a761-f79faa45049d" alt="Alt text" title="Tailwind" style="display: inline-block; margin: 0 auto; width: 60px">
    </th>
    <th>
        <img src="https://img.daisyui.com/images/daisyui-logo/daisyui-logotype.svg" alt="Alt text" title="React" style="display: inline-block; margin: 0 auto; width: 60px">
    </th>
  </thead>

  <tbody>
    <td>Typescript</td>
    <td>React</td>
    <td>NestJs</td>
    <td>Debian</td>
    <td>MySQL</td>
    <td>Tailwind</td>
    <td>DaisyUI</td>
  </tbody>
</table>

# :rocket: Relatório do Projeto de Sistemas Operacionais II

## 1. Introdução

Nesta relatório explicarei o passo-a-passo para a realização do projeto de Sistemas Operacionais II, atendendo os requisitos obrigatórios e hospedando a aplicação web em uma instância EC2 da AWS com o Debian, utilizando o acesso via SSH 

## 2. Configuração da Máquina Virtual na AWS

Para começar, criei uma instância elegível para o nível gratuito da AWS utilizando o sistema operacional Debian. A configuração inicial envolveu os seguintes passos:

**1. Criação da Instância:**
   - Através do console da AWS, criei uma nova instância EC2 selecionando o sistema operacional Debian.

**2. Configuração de Acesso:**
   - Configurei a segurança da instância para permitir acessos SSH e HTTP.
   - Gereci as chaves SSH para garantir a segurança do acesso remoto.
  
**3. Grupo de segurança:**
    <p>Nas configurações do grupo de segurança permiti o acesso as seguintes portas:</p>
    <ul>
        <li>3000: Porta que será utilizada pelo backend</li>
        <li>3306: Porta que será utilizada pelo banco de dados (no nosso caso o mysql)</li>
    </ul>

## 3. Instalação de Serviços Essenciais

Com a instância configurada e acessível, instalei os seguintes serviços necessários:

**1. Servidor WWW – Apache:**
   ```bash
   sudo apt update
   sudo apt install apache2
   ```
   - Verifiquei o funcionamento acessando o endereço IPv4 público da instância.

**2. Servidor de Banco de Dados – MySQL/MariaDB:**
   ```bash
   sudo apt install default-mysql-server
   ```
   - Instalei o MySQL.
   
   ```bash
   sudo mysql -u root

   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'senha-de-root';

   CREATE DATABASE nome-do-banco
   ```
   - Acessei o mysql de dados e adicionei uma senha para o usuário root e criei um banco de dados que será utilizado.

**3. Outros Serviços:**
   - **HTOP:** Para monitoramento de recursos.
     ```bash
     sudo apt install htop
     ```
   - **Net Tools:** Para ferramentas de rede essenciais.
     ```bash
     sudo apt install net-tools
     ```
   - **Git:** Para controle de versão e deploy da aplicação.
     ```bash
     sudo apt install git
     ```
   - **NodeJs:** Para rodar o javascript no backend.
     ```bash
     sudo apt install nodejs
     ```
   - **npm:** Para o gerenciamento de pacotes do nodejs.
     ```bash
     sudo apt install npm
     ```
   - **NestJs:** Para utilizar os comandos do NestJs no terminal
     ```bash
     npm i -g @nestjs/cli
     ```

## :rocket: 4. Rodando o Projeto

### 3.1 Clonar o projeto
```cmd
git clone https://github.com/MateusdiSousa/Projeto-de-Sistemas-Operacionais.git
```

### 3.2 Frontend
```cmd
sudo nano Projeto-de-Sistemas-Operacionais/frontend/src/services/api.tsx
```
- E certificar que a url da variável do api esteja correspondente com a url pública instância:
```cmd
import axios from "axios";

const api = axios.create({baseURL : 'http://IPv4-público-da-instância:3000/'});

export default api
```
- Logo em seguida instale as dependências do frontend.
```cmd
cd Projeto-de-Sistemas-Operacionais/frontend
npm install
nano node_modules/jwt-decode/build/esm/index.d.ts
```
Adicione o seguinte campo:

```
export interface JwtPayload {
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    role?: any;
}

```
Libere o módulo de reescrita
```
a2enmod rewrite
```

após isso realize o build
```
npm run build
```

- Após isso você deverá configurar o apache retornar a página do frontend

```cmd
sudo mv Projeto-de-Sistemas-Operacionais/frontend/dist /var/www/
sudo nano /etc/apache2/sites-available/000-default.conf
```
- Edite o arquivo para que fique dessa forma:
```cmd
    <VirtualHost *:80>
      ServerAdmin webmaster@localhost
      DocumentRoot /var/www/html/seu-app-react/build

      <Directory /var/www/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # Ativando a reescrita
        RewriteEngine On

        # Se o arquivo solicitado não existir, redireciona para o index.html
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ /index.html [L]
    </Directory>
  </VirtualHost>

```

Logo após isso crie o arquivo .htaccess na pasta /var/www/dist
```cmd
    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Se o arquivo solicitado não existir, redireciona para o index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ /index.html [L]
</IfModule>
```

### 3.3 Backend
- para rodar o backend do projeto, você deve usar os comandos: 

```cmd
cd Projeto-de-Sistemas-Operacionais/backend
npm install
npm install --save @nestjs/typeorm typeorm mysql2

```

- depois você deve criar o arquivo .env: 
```cmd
sudo touch .env
```
- E configurar com as seguintes informações
```cmd
sudo nano .env
```
```cmd
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua-senha
DATABASE=nome-do-banco-de-dados
TOKEN_JWT=coloque-qualquer-coisa
```

- Então na raiz do backend execute o seguinte comando 

```cmd
nest start
```

### 3.4 Load Balancer

- Instale o nginx
  ```cmd
  sudo apt install nginx
  ```
- Crie um arquivo de configuração na pasta /etc/nginx/conf.d/loadbalancer.conf

```cmd
upstream frontend{
	server ip_publico1;
	server ip_publico2;
	server ip_publico3;
}

server {
	listen 80;
	

	location / {
		proxy_pass http://frontend;
	        proxy_set_header Host $host;
	        proxy_set_header X-Real-IP $remote_addr;
	        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        proxy_set_header X-Forwarded-Proto $scheme;
	}

	        location ~* \.(css|js|png|jpg|jpeg|gif|ico)$ {
                proxy_pass http://frontend;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
            }
}

```

- reinicie o nginx com o seguinte comando:
  ```cmd
  systemctl restart ngnix.service
  ```


