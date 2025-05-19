# :pencil: Tabla de Contenido

- [Introducción](#introduction)
- [Características](#features)
- [Configuración](#setup)
- [Ejecutar Bot Localmente](#execute_bot)
- [Despliegue - Docker](#docker_deployment)

# Introducción <a name = "introduction"></a>

Este server es el punto de contacto para poder comunicarnos con el bot generado.

# Configuración <a name = "setup"></a>

Copiar .env.template y renombrarlo ".env". Luego reemplazar la variable BOT_TOKEN por el valor que utilizamos para el bot.

# Ejecutar Bot Localmente <a name = "execute_bot"></a>

> [!NOTE]
> Se debe haber configurado el entorno antes de realizar la ejecución del bot.

1. Instalar los requirements de este proyecto:

```bash
python3 -m pip install --no-cache-dir -r requirements.txt
```

2. Lanzar el bot server:

```bash
python3 main.py
```

## Revisar datos en DB Local

- El bot utiliza sqlite3 para registrar a los usuarios.

```bash
docker exec -it $CONTAINER_NAME bash
# docker exec -it telegram_bot bash
sqlite3 data/bot-server.db
```

```sql
SELECT * FROM bots;
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

## Prueba

En una terminal ejecutar:

```bash
curl -X POST http://localhost:9020/send-message \
 -H "Content-Type: application/json" \
 -d '{"chat_id": "<telegram_chat_id>", "message": "Hola, esto es un mensaje de prueba desde cURL!"}'
```
