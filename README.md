<p align="center">
    Trabajo Final de Grado - UP
    <br>
    1C - 2025
    <br>
</p>

# :pencil: Table of Contents

- [Acerca De](#about)
- [Aplicaciones Utilizadas](#applications)
- [Levantar el proyecto ](#run_project)
- [Autor](#author)
- [Reconocimientos](#acknowledgement)

# :information_source: Acerca De <a name = "about"></a>

- Repositorio que contiene la implementación de la materia Trabajo Final de Grado de la Universidad de Palermo.

# :hammer: Aplicaciones Utilizadas <a name = "applications"></a>

> [!NOTE]  
> La implementación fue desarrollada en macOS Sequoia 15 con arquitectura intel (x64).
> Tecnologías utilizadas: .NET 9 y React.

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

## Base de Datos

1. https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#installing-mongodb-8.0-edition-edition

2. [mongodb-compass](https://formulae.brew.sh/cask/mongodb-compass#default)

```bash
brew install --cask mongodb-compass
```

3. `brew unlink node`

4. `brew link --overwrite node@22`

## Sobre cada app

- Client: App React + Typescript creada con https://vite.dev/guide/
- Server: App .NET WebAPI creada con Jetbrains Rider.

## Recursos

- https://learn.microsoft.com/en-us/training/paths/aspnet-core-minimal-api/
- https://learn.microsoft.com/en-us/aspnet/core/fundamentals/openapi/overview?view=aspnetcore-9.0&preserve-view=true
- https://medium.com/@vosarat1995/making-your-openapi-swagger-docs-ui-awesome-in-net-9-67fbde6b71b5
- https://dev.to/extinctsion/no-swagger-in-net-9-heres-what-you-need-to-know-2103

## Paquetes npm

Recomiendo utilizar la versión de npm que viene incluído en la versión de nodejs LTS para instalar los paquetes que se encuentran en el archivo package.json y que pueden ser instalados localmente al proyecto con el comando:

```
npm install
```

## Visual Studio Code Extensions

- [dsznajder.es7-react-js-snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Google Chrome Extensions

- https://react.dev/learn/react-developer-tools

# :hammer: Levantar el proyecto <a name = "run_project"></a>

## ¿Cómo levantar el proyecto?

# :speech_balloon: Autor <a name = "author"></a>

- [@andresbiso](https://github.com/andresbiso)

# :tada: Reconocimientos <a name = "acknowledgement"></a>

- https://github.com/jrabuc -> Profesor y Tutor de la materia
- https://github.com/github/gitignore
- https://gist.github.com/rxaviers/7360908 -> github emojis
