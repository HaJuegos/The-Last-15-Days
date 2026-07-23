# Guía de repositorio.

¡Hola! Si te interesa mejorar el código de este proyecto o compilarlo. Para evitar problemas de compatibilidad, se utiliza el entorno Dockerfile que automáticamente instala todo lo necesario de este repositorio para el ambiente que lo requiere.

> Nota: El DockerFile esta orientado a Windows.

## Requisitos Previos

1. Instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Activar los **Contenedores de Windows**. Haz clic derecho sobre el icono de Docker en la bandeja del sistema (junto al reloj) y selecciona la opción `Switch to Windows containers...`. Si no haces esto, la construcción fallará porque la imagen base requiere el kernel de Windows.

## Instrucciones de Ejecución

Abre tu terminal de PowerShell y sigue estos pasos:

### 1. Clonar el repositorio

```powershell
git clone https://github.com/HaJuegos/The-Last-15-Days.git
cd The-Last-15-Days
```

### 2. Construir la imagen

Este proceso descargará la imagen de Windows Server Core y ejecutará las instalaciones necesarias como Git, NodeJS, VSCode y, finalmente, los comandos de las dependencias NPM.

```powershell
docker build -t tl15d-proyecto
```

### 3. Iniciar el entorno

Para entrar al contenedor y comenzar a trabajar, ejecuta el contenedor en modo interactivo. Y dentro de este mismo ya estará todo listo y las dependencias preparadas.

```powershell
docker run -it tl15d-proyecto
```

Y listo. Si gustas hacer un Pull Request o un Fork, eres más que bienvenido.
