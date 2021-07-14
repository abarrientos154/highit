'use strict'

/*
|--------------------------------------------------------------------------
| Routes
  Existen 2 grupos de rutas: Las que necesitan autenticación del usuario y las que no. TOMAR MUY EN CUENTA ESTO
  Dentro del grupo de las que necesitan autenticación se debe especificar el middleware para verificar si el
  usuario(autenticado) tiene el permiso para acceder a esa ruta. Ejemplo: .middleware('verifyPermission:1')
  El número 1 indica el permiso que debe tener para acceder a esa ruta
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");
  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login");
    Route.post("update_client", "UserController.updateClient")
    Route.get("validate_email/:email", "UserController.validateEmail")
    Route.get("email_send_app/:email", "UserController.recuperacionapp")

    Route.post("user_by_rol", "UserController.userByRol") // metodo para obtener usuarios segun el rol
    Route.get("user_by_id/:id", "UserController.userById") // metodo para obtener informacion del usuario por id del mismo

    Route.get('perfil_img/:file', 'UploadController.getFileByDirectoryPerfil')
    Route.get('obtener_logo', 'UploadController.getLogo')
  })
  );
  addPrefixToGroup(
    Route.group(() => {
      // Insertar rutas con protección de autenticación aquí
    Route.get("user_info", "UserController.userInfo") // metodo para obtener informacion del usuario que esta logueado
    Route.get("user_logueado", "UserController.userLogueado")
    Route.get("all_user", "UserController.allUser") // metodo para obtener informacion del usuario que esta logueado
    Route.post("user_by_status", "UserController.userByStatus") // metodo para obtener proveedores pendientes
    Route.put("update_status/:id", "UserController.userStatus") // metodo para bloquear o desbloquear usuarios

  }).middleware("auth")
);
