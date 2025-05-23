# :pencil: Tabla de Contenido

- [Introducción](#introduction)
- [Características](#features)
- [Configuración](#setup)
- [Ejecutar Bot Localmente](#execute_bot)
- [Despliegue - Docker](#docker_deployment)
- [Referencias](#references)

# Introducción <a name = "introduction"></a>

Platform Connect es un bot que conecta instructores con estudiantes. Podemos utilizarlo ingresando a:

```
https://t.me/platform_connect_bot
```

# Características <a name = "features"></a>

El bot recibe un mensaje con un link y un destinatario y se encarga de hacerle llegar ese mensaje.

# Configuración <a name = "setup"></a>

> [!NOTE]
>
> - Se necesita una cuenta de telegram antes de poder configurar el bot.
> - Se recomienda hacer uso de https://web.telegram.org/
> - Debemos acceder al BotFather para poder realizar cualquier modificación a nuestros bots.
> - Recordar eliminar un bot si no lo tenemos actualmente en uso.

1. Ingresar a [BotFather](https://t.me/BotFather) y crear una nuevo bot con el comando `/newbot`. Tomar nota del bot token.
2. Copiar .env.template y renombrarlo ".env". Luego reemplazar la variable BOT_TOKEN por el valor que anotamos en el paso anterior.

# Ejecutar Bot Localmente <a name = "execute_bot"></a>

> [!NOTE]
> Se debe haber configurado el entorno antes de realizar la ejecución del bot.

1. Crear el directorio "images" en la raíz del directorio:

```bash
mkdir images
```

2. Instalar los requirements de este proyecto:

```bash
python3 -m pip install --no-cache-dir -r requirements.txt
```

3. Lanzar el bot:

```bash
python3 main.py
```

## Revisar datos en DB Local

- El bot utiliza sqlite3 para registrar a los usuarios.

```bash
docker exec -it $CONTAINER_NAME bash
# docker exec -it telegram_bot bash
sqlite3 data/bot.db
```

```sql
SELECT * FROM users;
.exit
```

# Despliegue - Docker <a name = "docker_deployment"></a>

> [!NOTE]
> Se debe haber configurado el entorno antes de realizar el despliegue.

En una terminal ejecutar:

```bash
docker compose up -d --build
```

Para detener el container:

```bash
docker compose down
```

# Referencias <a name = "references"></a>

- https://core.telegram.org/bots
- https://core.telegram.org/bots/api
- https://github.com/tjtanjin/tele-qr
- https://dev.to/tjtanjin/how-to-dockerize-a-telegram-bot-a-step-by-step-guide-37ol
