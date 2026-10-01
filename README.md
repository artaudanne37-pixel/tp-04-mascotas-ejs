Trabajo práctico 04
Descripción

En este trabajo hice una aplicación web de mascotas en adopción usando Node.js, Express y EJS.

La aplicación permite ver las mascotas que están registradas, ver sus datos y también agregar nuevas mascotas desde un formulario.

Instalación

Primero hay que instalar las dependencias del proyecto con:

npm install
Ejecución

Para iniciar la aplicación se utiliza:

npm start

Después se puede entrar desde el navegador a:

http://localhost:3000

También se puede comprobar la sintaxis de los archivos con:

npm run check
Páginas y rutas

Las rutas principales de la aplicación son:

/ → página de inicio.
/mascotas → muestra el catálogo de mascotas.
/mascotas/nueva → muestra el formulario para registrar una mascota.
/mascotas/:id → muestra el detalle de una mascota.
POST /mascotas → recibe los datos del formulario y registra una nueva mascota.

Si se busca una mascota que no existe, se muestra una página de error.

Estructura de vistas

Las vistas están dentro de la carpeta views.

inicio.ejs → página de inicio.
mascotas/lista.ejs → catálogo de mascotas.
mascotas/detalle.ejs → detalle de una mascota.
mascotas/nueva.ejs → formulario para registrar mascotas.
no-encontrado.ejs → página que se muestra cuando no se encuentra una mascota.
layouts/main.ejs → layout principal de la aplicación.
partials/encabezado.ejs → encabezado y navegación.
partials/pie.ejs → pie de página.

El layout se usa para tener una estructura común en las páginas y los parciales permiten reutilizar el encabezado y el pie.

Recursos estáticos

Los recursos estáticos están dentro de la carpeta public.

css/estilos.css → estilos de la página.
img/mascota.svg → imagen utilizada en la aplicación.
js/app.js → archivo JavaScript del lado del cliente.

Estos archivos se pueden utilizar desde las páginas gracias a express.static().

Formulario

El formulario permite ingresar el nombre, la especie, la edad, el estado y la descripción de una mascota.

Los datos se envían mediante POST a /mascotas. El servidor valida los datos y, si hay algún error, muestra un mensaje y mantiene los valores que se habían ingresado.

Si los datos son correctos, se agrega la mascota y se vuelve al catálogo.

Persistencia de los datos

Las mascotas que aparecen inicialmente se cargan desde datos/mascotas.json.

Las mascotas nuevas que se agregan desde el formulario quedan guardadas solamente en memoria. No se modifican los datos del archivo JSON.

Por este motivo, las mascotas nuevas desaparecen cuando se reinicia el servidor.