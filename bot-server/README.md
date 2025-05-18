# :pencil: Tabla de Contenido

- [Introducción](#introduction)
- [Características](#features)
- [Configuración](#setup)
- [Ejecutar Bot Localmente](#execute_bot)
- [Despliegue - Docker](#docker_deployment)
- [Referencias](#references)

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

# Despliegue - Docker <a name = "docker_deployment"></a>

> [!NOTE]
> Se debe haber configurado el entorno antes de realizar el despliegue.

En una terminal correr:

```bash
cd scripts/
chmod +x ./docker_deploy.sh
./docker_deploy.sh [nombre-del-container]
# Ejemplo: `./docker_deploy.sh telegram_bot_server`
```
