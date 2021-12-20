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
    Route.get("user_email/:email", "UserController.userEmail")
    Route.post("update_client", "UserController.updateClient")
    Route.get("validate_email/:email", "UserController.validateEmail")
    Route.get("email_send_app/:email", "UserController.recuperacionapp")
    Route.get("paises", "PaisController.index")
    Route.get("pais/:id", "PaisController.paisById")
    Route.get("estados/:id", "EstadoController.index")
    Route.get("estado/:id", "EstadoController.estadoById")
    Route.get("ciudades/:id", "CiudadController.index")
    Route.get("ciudad/:id", "CiudadController.ciudadById")
    Route.get("question_security", "SecurityController.index")
    Route.get("question_security/:id", "SecurityController.show")
    Route.put("password_edit/:id", "UserController.changePassword")

    Route.get('obtener_logo', 'UploadController.getLogo')
    Route.get('company_img/:file', 'UploadController.getFileByDirectoryCompany')
    Route.get('perfil_img/:file', 'UploadController.getFileByDirectoryPerfil')
    Route.get('archivo/:id/:file', 'UploadController.getarchivo')
    Route.get('file_pdf/:file', 'UploadController.getFileByDirectoryPdf')
  })
  );
  addPrefixToGroup(
    Route.group(() => {
      // Insertar rutas con protección de autenticación aquí
    Route.get("user_logueado", "UserController.userLogueado") // metodo para obtener informacion del usuario que esta logueado
    Route.get("user", "UserController.index")
    Route.get("user_consultor/:id", "UserController.userConsultor")
    Route.get("user_cliente/:id", "UserController.userCliente")
    Route.get('datauser/:id', 'UserController.userById')
    Route.post("register_user", "UserController.registerUser")
    Route.put("datos_edit/:id", "UserController.updateUser")
    Route.delete("user/:id", "UserController.destroy")

    Route.post('perfil_imagen/:user_id', 'UploadController.newImagen')
    Route.post('perfil_company/:company_id', 'UploadController.newImagenCompany')
    Route.post('generate_pdf', 'UploadController.generatePdf')

    Route.get("contratos", "ContratoController.index")
    Route.get("contratos/:id", "ContratoController.contratosByCompany")
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
    
    Route.get('equipo', 'EquipoController.index')
    Route.get('equipo/:id', 'EquipoController.show')
    Route.get('equipo_consultor', 'EquipoController.equipos_consultor')
    Route.get('equipo_cliente', 'EquipoController.equipos_cliente')
    Route.post("equipo", "EquipoController.store")
    Route.put("equipo/:id", "EquipoController.update")
    Route.put("asignar_equipo/:id", "EquipoController.asignarEquipo")
    Route.delete("equipo/:id", "EquipoController.destroy")

    Route.get('departments', 'DepartmentController.index2')
    Route.get('departments/:id', 'DepartmentController.index')
    Route.post('register_department', 'DepartmentController.store')
    Route.delete("departments/:id", "DepartmentController.destroy")

    Route.get('areas', 'AreaController.index')
    Route.get("areas/:id", "AreaController.show")
    Route.post('register_area', 'AreaController.store')
    Route.delete("areas/:id", "AreaController.destroy")
    
    Route.get('charges', 'ChargeController.index')
    Route.get("cargos/:id", "ChargeController.show")
    Route.post('register_charge', 'ChargeController.store')
    Route.delete("charges/:id", "ChargeController.destroy")

    Route.get("categorias/:id", "CategoriaController.show")
    Route.get("categorias_departamento/:id", "CategoriaController.categoriesDepartment")
    Route.get("categorias", "CategoriaController.index")
    Route.post("categoria", "CategoriaController.store")
    Route.delete("categorias/:id", "CategoriaController.destroy")

    Route.get('conocimientos', 'ConocimientoController.index')
    Route.get("conocimientos/:id", "ConocimientoController.show")
    Route.get('conocimiento/:id', 'ConocimientoController.conocimientoById')
    Route.post('conocimientos', 'ConocimientoController.store')
    Route.post('edit_archivos_conocimiento/:id', 'ConocimientoController.editArchivos')
    Route.put("edit_conocimiento/:id", "ConocimientoController.update")

    Route.get("companys", "CompanyController.index")
    Route.get("empresas", "CompanyController.index2")
    Route.get("empresas_user", "CompanyController.indexuser")
    Route.get("companys_by_company/:id", "CompanyController.companysByCompany")
    Route.get("companys/:id", "CompanyController.companysByCompany")
    Route.get("company/:id", "CompanyController.show")
    Route.post("register_company", "CompanyController.store")
    Route.put("update_company/:id", "CompanyController.update")
    Route.put("update_enable/:id", "CompanyController.updateEnable")
    Route.delete("companys/:id", "CompanyController.destroy")

    Route.get("solicitud/:id", "SolicitudController.show")
    Route.get("solicitudes_cliente/:id", "SolicitudController.solicitudesCliente")
    Route.put("solicitudes_consultor/:id", "SolicitudController.solicitudesConsultor")
    Route.get("solicitudes_company/:id", "SolicitudController.solicitudesCompany")
    Route.get("solicitudes/:id", "SolicitudController.index")
    Route.get("solicitudes_by_consultor", "SolicitudController.solicitudesByConsultor")
    Route.get("solicitudes_history", "SolicitudController.sltHistory")
    Route.post("register_solicitud", "SolicitudController.store")
    Route.put("status_solicitud/:id", "SolicitudController.update")

    Route.post("register_hito", "HitoController.store")
    Route.get("hitos_by_company/:id", "HitoController.show")
    Route.get("history_hitos/:id", "HitoController.history")

    Route.get("rating/:id", "RatingController.show")
    Route.post("register_rating", "RatingController.store")

    Route.get("gestion", "ManageController.index")

    Route.get("notifications", "NotificationController.index")
    Route.post("register_notification", "NotificationController.store")
    Route.put("update_notification/:id", "NotificationController.update")

  }).middleware("auth")
);
