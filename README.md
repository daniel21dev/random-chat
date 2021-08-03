# Random chat
Random chat es una aplicación de servidor que expone una graphql api, donde los usuarios pueden registrarse, publicar y obtener/leer mensajes aleatorios y anonimos escritos por otros usuarios.

### Instalación
Para instalar y correr esta aplicación debes de tener docker y docker-compose ya instalados.

1. Dentro del proyecto ejecutar "docker-compose build".
2. ejecutar "docker-compose up".
3. asegurarse que tanto prisma como mongo y random-chat_app ( imagen de esta app) esten ejecutandose correctamente.

La app corre por default en el puerto 4000 ( se puede cambiar en src/Server.ts , ademas se tiene que cambiar en el archivo de docker-compose.yml ).

#Info

Esta aplicación fue creada usando:
- typescript como lenguaje de programación.
- graphql como lenguaje de consultas ( graphql api ).
- apollo como servidor de graphql.
- express para servir archivos estaticos.
- mongodb como base de datos.
- prisma1 como ORM.
- Docker y docker-compose para ejecutar la aplicacion en cualquier entorno.
