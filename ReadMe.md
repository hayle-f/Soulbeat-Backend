# SoulBeat - Backend

## 📄 Descripción
Backend para la aplicación **SoulBeat** construido con **Node.js**, **Express** y **MongoDB (Mongoose)**.  
Se encarga de:

- CRUD completo de auriculares y manejo de variantes.
- Autenticación y autorización (login, registro, roles, permisos).
- Validaciones de datos y manejo centralizado de errores.
- Subida de imágenes para productos.
- Inicialización de roles y permisos.

---

## ⚙️ Estructura del proyecto

### Configuración y servidor

| Archivo | Funcionalidad |
|---------|---------------|
| `.env` | Variables de entorno (conexión DB, JWT, puerto). |
| `config/dbConfig.js` | Conexión a MongoDB. |
| `server.js` | Punto de entrada: configura Express, middlewares y rutas. |

### Rutas

| Archivo | Funcionalidad |
|---------|---------------|
| `routes/authRoutes.js` | Login, registro y gestión de usuarios. |
| `routes/soulbeatRoutes.js` | CRUD de auriculares y filtros públicos. |
| `routes/colorsRoutes.js` | Gestión de colores de productos. |
| `routes/uploadRoutes.js` | Subida de imágenes. |

### Controladores

| Archivo | Funcionalidad |
|---------|---------------|
| `controllers/authController.js` | Lógica de login, registro y JWT. |
| `controllers/aurisController.js` | CRUD de auriculares, filtros y variantes. |

### Middleware

| Archivo | Funcionalidad |
|---------|---------------|
| `middleware/authMiddleware.js` | Verificación de JWT. |
| `middleware/adminMiddleware.js` | Validación de rol admin. |
| `middleware/globalErrorHandler.js` | Manejo centralizado de errores. |
| `middleware/handleValidationsErrors.js` | Captura errores de validación. |
| `middleware/parseParams.js` | Parseo de parámetros de rutas. |

### Modelos (MongoDB/Mongoose)

| Archivo | Funcionalidad |
|---------|---------------|
| `models/auricularModel.js` | Esquema de auriculares. |
| `models/userModel.js` | Esquema de usuarios. |
| `models/roleModel.js` | Esquema de roles. |
| `models/permissionModel.js` | Esquema de permisos. |

### Repositorios

| Archivo | Funcionalidad |
|---------|---------------|
| `repositories/IRepository.js` | Interfaz genérica. |
| `repositories/AuricularRepository.js` | Repositorio de auriculares. |

### Servicios

| Archivo | Funcionalidad |
|---------|---------------|
| `services/authService.js` | Lógica de autenticación y JWT. |
| `services/aurisService.js` | Lógica de negocio de auriculares. |

### Validaciones

| Archivo | Funcionalidad |
|---------|---------------|
| `validations/authValidations.js` | Validaciones de login y registro. |
| `validations/aurisValidations.js` | Validaciones de creación/edición de auriculares. |

### Scripts

| Archivo | Funcionalidad |
|---------|---------------|
| `scripts/createAdmin.js` | Crear usuario admin inicial. |
| `scripts/initializeRolesAndPermissions.js` | Inicializar roles y permisos en DB. |

### Utilidades

| Archivo | Funcionalidad |
|---------|---------------|
| `utils/colors.js` | Funciones para manejar colores. |
| `utils/customErrors.js` | Clases de errores personalizadas. |
| `utils/decodeJWT.js` | Decodificar tokens JWT. |
| `utils/normalizers.js` | Normalización de datos. |

---

### 🔗 Link del backend en Render
[https://soulbeat-backend.onrender.com/](https://soulbeat-backend.onrender.com/)

Este backend es consumido por el frontend [SoulBeat Front](https://github.com/hayle-f/soulbeat-front), que permite mostrar productos, gestionar favoritos y carrito, y administrar productos desde el panel de administración.

### 🔐 Acceso de demostración (Administrador)
Estas credenciales se proporcionan **solo con fines de demostración**:

- **Email:** admin@soulbeat.com  
- **Contraseña:** AdminPass1234
