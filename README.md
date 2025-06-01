<p align="center">
    Trabajo Final de Grado - UP
    <br>
    1C - 2025
    <br>
</p>

# :pencil: Tabla de Contenido

- [Acerca De](#about)
- [Aplicaciones Utilizadas](#applications)
- [Levantar el proyecto ](#run_project)
- [Autor](#author)
- [Reconocimientos](#acknowledgement)

# :information_source: Acerca De <a name = "about"></a>

- Repositorio que contiene la implementación de la materia Trabajo Final de Grado de la Universidad de Palermo.

> [!NOTE]
> El paper de esta implementación se encuentra en el siguiente repositorio de código: https://github.com/andresbiso/2025_1C_TFG_PAPER

## Arquitectura Propuesta

<p align="center">
  <img src="docs/diagrama_arquitectura.png?raw=true" width="350" title="diagrama de arquitectura">
</p>

# :hammer: Aplicaciones Utilizadas <a name = "applications"></a>

> [!NOTE]
>
> - La implementación fue desarrollada en macOS Sequoia 15 con arquitectura intel (x64).
> - Tecnologías utilizadas: NodeJs, Python y React.

## macOS

> [!WARNING]  
> Instalar primero los paquetes que no son cask.

Recomiendo utilizar [homebrew](https://brew.sh/) para instalar estos paquetes:

- [node](https://formulae.brew.sh/formula/node@22)

```bash
brew install node@22
```

- [visual-studio-code](https://formulae.brew.sh/cask/visual-studio-code#default)

```bash
brew install --cask visual-studio-code
```

- [google-chrome](https://formulae.brew.sh/cask/google-chrome#default)

```bash
brew install --cask google-chrome
```

- [docker](https://formulae.brew.sh/cask/docker#default)

```bash
brew install --cask docker
```

- [telegram](https://formulae.brew.sh/cask/telegram#default)

```bash
brew install --cask telegram
```

- [postman](https://formulae.brew.sh/cask/postman#default)

```bash
brew install --cask postman
```

## MongoDB Compass

1. [mongodb-compass](https://formulae.brew.sh/cask/mongodb-compass#default)

```bash
brew install --cask mongodb-compass
```

2. `brew unlink node`

3. `brew link --overwrite node@22`

4. Revisar puerto de mongo en docker-compose.yaml

5. Abrir MongoDB Compass -> "New Connection"

6. `mongodb://root:example@localhost:27017/`

> ![NOTE]
> 27017 es el puerto por defecto de mongo

## Sobre cada app

- Bot: Python
- Bot Server: Python + Flask
- Client: App React + Typescript
- Server: App Nodejs + Express

> [!NOTE]
>
> - Servicios: DiceBear, MongoDB, Mongo Express, MinIO (API + WebUI), Mailpit (SMTP + WebUI).
> - Estos servicios, el bot y el bot server fueron configurados para ser ejecutados dentro de containers de docker.
> - El client fue generado con la guía: https://vite.dev/guide/

## Visual Studio Code Extensions

- Ver "recommendations" en `.vscode/extensions.json`.

## Google Chrome Extensions

- https://react.dev/learn/react-developer-tools

# :hammer: Levantar el proyecto <a name = "run_project"></a>

## ¿Cómo levantar el proyecto?

1. Instalar paquetes npm en el directorio Client y Server:

```bash
npm install
```

> ![NOTE]
> Recomiendo utilizar la versión de npm que viene incluído en la versión de nodejs LTS para instalar los paquetes que se encuentran en el archivo package.json.

2. Levantar los servicios con docker compose.

3. Ir a carpeta Client:

```bash
npm run dev
```

3. Ir a carpeta Server:

```bash
npm run start
```

## ¿Cómo usar docker compose?

> ![NOTE]
> Ejecutar estos comandos en el directorio que contiene docker-compose.yml.

Levantar todos los servicios:

```bash
docker compose up
# Starts the containers in the foreground, meaning you'll see all the logs and output on your terminal.
# If you close the terminal or interrupt the process (e.g., with Ctrl+C), the containers will stop.
```

Levantar todos los servicios (detached mode):

```bash
docker compose up -d
# Starts the containers in detached mode, meaning they run in the background.
# Your terminal is freed up, and you won't see the logs directly.
# The containers will keep running even if you close the terminal.
```

Ver los logs de los containers:

```bash
docker compose logs
docker compose log <container-name>
```

Detener todos los servicios (preservando volúmenes):

```bash
docker compose down
```

Detener todos los servicios (sin preservar volúmenes):

```bash
docker compose down -v
```

Detener todos los servicios (sin preservar imágenes o volúmenes):

```bash
docker compose down --rmi all -v
```

Listar containers en ejecución:

```bash
docker ps
```

Acceder a la shell de un container en ejecución (reemplazar <container_name> con el nombre del container):

```bash
docker exec -it <container_name> bash
```

### Pruebas

1.

```bash
# Acceder a container de mongodb
docker exec -it mongo bash
```

2. En un navegador ir a http://localhost:8025 y verificar si está corriendo el mail server.

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
  auth: {
    user: '', // Mailpit doesn't require auth
    pass: '',
  },
});

const mailOptions = {
  from: 'test@example.com',
  to: 'user@example.com',
  subject: 'Testing MailHog',
  text: 'Hello! This is a test email.',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.error(err);
  else console.log('Email sent:', info);
});
```

## Servicios

- **Client**: [http://localhost:8083](http://localhost:8083)
- **Server**: [http://localhost:8082](http://localhost:8082)
- **DiceBear**: [http://localhost:3000](http://localhost:3000)
- **MongoDB**: `mongodb://localhost:27017/` (Database connection)
- **Mongo Express**: [http://localhost:8081](http://localhost:8081) (Web UI for MongoDB)
- **MinIO API**: [http://localhost:9000](http://localhost:9000)
- **MinIO Web UI**: [http://localhost:9001](http://localhost:9001)
- **Mailpit Web UI**: [http://localhost:8025](http://localhost:8025)
- **Mailpit SMTP**: `smtp://localhost:1025` (For sending emails)

# :speech_balloon: Autor <a name = "author"></a>

- [@andresbiso](https://github.com/andresbiso)

# :tada: Reconocimientos <a name = "acknowledgement"></a>

- https://github.com/jrabuc -> Profesor y Tutor de la materia
- https://github.com/github/gitignore
- https://gist.github.com/rxaviers/7360908 -> github emojis
