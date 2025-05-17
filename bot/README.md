# :pencil: Tabla de Contenido

- [Introducción](#introduction)
- [Características](#features)
- [Configuración](#setup)

# Introducción

Tele MicroLearn Connect es un bot que conecta instructores con estudiantes. Podemos utilizarlo ingresando a:

```
https://t.me/telemicrolearnconnect
```

# Características

Tele MicroLearn Connect recibe un mensaje con un link y un destinatario y se encarga de hacerle llegar ese mensaje.

# Configuración

> [!NOTE]
>
> - Se necesita una cuenta de telegram antes de poder configurar el bot.
> - Se recomienda hacer uso de https://web.telegram.org/

1. Ingresar a [BotFather](https://t.me/BotFather) y crear una nuevo bot con el comando `/newbot`. Tomar nota del bot token.
2. Instalar los requirements de este proyecto:

```bash
python3 -m pip install --no-cache-dir -r requirements.txt
```

3. Copiar .env.template y renombrarlo ".env". Luego reemplazar la variable BOT_TOKEN por el valor que anotamos en el paso anterior.
4. Crear el directorio _images_ en la raíz del directorio:

```bash
mkdir images
```

5. Lanzar el bot:

```bash
python3 main.py
```

# Despliegue - Docker

> [!NOTE]
> Se debe haber configurado el entorno antes de realizar el despliegue.

En una terminal correr:

```bash
./deploy.sh [nombre-del-container]
```
