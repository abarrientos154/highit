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
    Route.get("paises", "PaisController.index")

    Route.get('obtener_logo', 'UploadController.getLogo')
    Route.get('company_img/:file', 'UploadController.getFileByDirectoryCompany')
    Route.get('perfil_img/:file', 'UploadController.getFileByDirectoryPerfil')

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

    Route.get("contratos", "ContratoController.index")
    Route.get("contratos_by_company/:id", "ContratoController.contratosByCompany")
    Route.post("contrato", "ContratoController.store")
    Route.delete("contratos/:id", "ContratoController.destroy")
    Route.put("contrato/:id", "ContratoController.update")

    Route.post("sla", "SlaController.store")
    Route.get("sla", "SlaController.index")
    Route.get("sla_by_contrato/:id", "SlaController.show")
    Route.get("sla_by_company/:id", "SlaController.slaByCompany")
    Route.delete("sla/:id", "SlaController.destroy")
    Route.get("sla_filter", "SlaController.filterByContracts")

    Route.post("register_user", "UserController.User_register")
    Route.get("user", "UserController.index")
    Route.delete("user/:id", "UserController.destroy")
    Route.get('datauser/:id', 'UserController.userById')
    Route.put("datos_edit/:id", "UserController.Updateuser")

    Route.post("register_user2", "UserController.User_register2")
    Route.get("user2", "UserController.index2")
    Route.delete("user2/:id", "UserController.destroy2")
    Route.put("datos_edit2/:id", "UserController.Updateuser")

    Route.put("password_edit/:id", "UserController.changePassword")
    Route.post('perfil_imagen/:user_id', 'UploadController.newimagen')

    Route.post("equipo", "EquipoController.store")
    Route.get('equipo', 'EquipoController.index')
    Route.delete("equipo/:id", "EquipoController.destroy")
    Route.get('equipo/:id', 'EquipoController.show')
    Route.put("equipo/:id", "EquipoController.update")

    Route.get('departments/:id', 'DepartmentController.index')
    Route.post('register_department', 'DepartmentController.store')
    Route.delete("delete_department/:id", "DepartmentController.destroy")

    Route.get('areas', 'AreaController.index')
    Route.post('register_area', 'AreaController.store')
    Route.delete("delete_area/:id", "AreaController.destroy")
    Route.get("areas/:id", "AreaController.show")
    Route.get("cargos/:id", "ChargeController.show")

    Route.get('charges', 'ChargeController.index')
    Route.post('register_charge', 'ChargeController.store')
    Route.delete("delete_charge/:id", "ChargeController.destroy")

    Route.post("categoria", "CategoriaController.store")
    Route.get("categorias/:id", "CategoriaController.show")
    Route.get("categorias", "CategoriaController.index")

    Route.get('equipo_consultor', 'EquipoController.equipos_consultor')

    Route.get("companys", "CompanyController.index")
    Route.get("empresas", "CompanyController.index2")
    Route.get("companys_by_company/:id", "CompanyController.companysByCompany")
    Route.get("company/:id", "CompanyController.show")
    Route.post("register_company", "CompanyController.store")
    Route.put("update_company/:id", "CompanyController.update")
    Route.delete("delete_company/:id", "CompanyController.destroy")

    Route.put("solicitudes_cliente/:id", "SolicitudController.solicitudesCliente")
    Route.put("solicitudes_consultor/:id", "SolicitudController.solicitudesConsultor")
    Route.put("solicitudes_company/:id", "SolicitudController.solicitudesCompany")
    Route.post("solicitudes_by_consultor", "SolicitudController.solicitudesByConsultor")
    Route.put("status_solicitud/:id", "SolicitudController.update")
    Route.post("register_solicitud", "SolicitudController.store")
    
    Route.post("register_hito", "HitoController.store")
    Route.get("hitos_by_company/:id", "HitoController.show")
  }).middleware("auth")
);
