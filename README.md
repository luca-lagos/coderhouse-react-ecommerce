# Mayte Unofficial Ecommerce
## Proyecto final de React Js - Coderhouse 2023

![Home](https://res.cloudinary.com/lucalagos/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1687476191/mayte-home_lflugu.jpg?_s=public-apps)

### Descripcion

El proyecto consiste en el diseño y desarrollo de un ecommerce de una tienda de moda ficticia llamada "Mayte", donde se puedan vender productos de las distintas categorias manejadas por la mencionada.

![Logo](https://res.cloudinary.com/lucalagos/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1687476191/mayte-logo_zvjr8n.jpg?_s=public-apps)

### Caracteristicas

La aplicacion posee las siguientes funcionalidades:

* Registro y autenticacion de usuario, tanto de forma tradicional como por su cuenta de Google.
* Reseteo de contraseña en el caso de que el usuario haya olvidado la mencionada de su cuenta.
* Visualizacion inicial de todos los productos y filtrado de los mismos por categoria.
* Visualizacion del producto detallado con eleccion de cantidad y agregado al carrito de compras.
* Acceso al carrito de compras con la opciones de eliminar cada uno individualmente y finalizar la orden de compra (siempre y cuando el usuario haya iniciado sesion).
* Acceso, para el usuario logueado, al panel de los datos personales de su cuenta con las opciones de editar los mismos y cambiar su contraseña.
* Acceso, para el usuario logueado, al panel de sus ordenes generadas con la opcion de visualizarlas en detalle de forma individual.

### Tecnologias

* **Editor de codigo:** Visual Studio Code.
* **Libreria JavaScript:** React Js.
* **Biblioteca UI:** Material UI.
* **Plataforma BaaS (Backend as a Service):** Google Firebase.
* **Gestor de dependencias:** Yarn.
* **Despliegue:** Netlify.


### Librerias externas

* React router.
* Tiny color 2.

### Justificacion de tecnologias y librerias externas

* **Material UI:** es una potente biblioteca de componentes UI para React, el cual proporciona componentes estilizados y listos para su uso, ademas de ser utilizado bajo el esquema "Mobile First". Se utilizo principalmente para experimentar y darle un diseño responsivo muy atractivo y que se acerque a un diseño nativo de aplicaciones moviles, ya que la mayoria de los usuarios que utilizaran la aplicacion seguramente accedan desde un dispositivo movil (smartphone o tablet).

* **React router:** es una libreria muy popular de React que nos permite definir las rutas de navegacion de nuestra aplicacion. En el caso de mi ecommerce, permite que mi aplicacion funcione como una SPA, navegando de pagina en pagina sin necesidad de recargar.

* **Tiny color 2:** es una libreria externa que permite la manipulacion y conversion de los colores de los elementos de los componentes. Se utilizo con una sola finalidad: tanto en el componente de filtrado como en la vista de detalles del producto, cambiar el color del texto que especifica el color de la prenda dependiendo de si este es claro u oscuro.

### Despliegue de aplicacion

[Mayte Unofficial Ecommerce](https://mayte.netlify.app/)

### Guia de compilacion

Dependencias necesarias:

* Node Js.
* Npm (para instalar Yarn).
* Yarn.

Comandos para desplegar la aplicacion localmente:

```bash
  //Clonar el repositorio
  git clone https://github.com/luca-lagos/mayte-ecommerce-coderhouse.git
  
  //Instalar todas las dependencias necesarias
  yarn install
  
  //Desplegar localmente la aplicacion
  yarn dev
```

### Demostracion de proyecto

A traves del siguiente [video](https://drive.google.com/file/d/1xUxd-t7L474W_q2BrtYK96KhH874zuqD/view?usp=sharing), podra visualizar la navegabilidad de la aplicacion.

### 🚀 Sobre mi

Si deseas saber mas de mi, pueden ver mi [portafolio](https://luca-lagos.vercel.app/) a traves de este enlace. Agradezco tu tiempo y que te deseo un buen dia :).
