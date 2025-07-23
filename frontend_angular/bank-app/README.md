# Aplicación de Gestión de Productos Financieros

Creado por Christian Cattani

## Descripción

Esta aplicación web desarrollada con Angular permite la gestión completa de productos financieros bancarios. Implementa un CRUD (Crear, Leer, Actualizar, Eliminar) completo con validaciones avanzadas y una interfaz de usuario moderna e intuitiva.

## Características

- **Listado de productos financieros**: Visualización de productos con paginación
- **Búsqueda de productos**: Filtrado en tiempo real
- **Control de registros por página**: Selector para mostrar 5, 10 o 20 registros
- **Formulario de creación/edición**: Con validaciones en tiempo real
- **Eliminación de productos**: Mediante confirmación modal
- **Validaciones avanzadas**: 
  - ID único (verificación con el backend)
  - Fechas de liberación y revisión (con cálculo automático)
  - Campos requeridos con longitudes mínimas y máximas
- **Notificaciones**: Sistema de notificaciones para feedback al usuario
- **Responsive Design**: Adaptación a diferentes tamaños de pantalla
- **Manejo de errores**: Interceptores HTTP para manejo de errores

## Mejoras Implementadas

1. **Sistema de notificaciones**: Componente reutilizable para mostrar mensajes de éxito, error, información y advertencia
2. **Interceptor HTTP**: Manejo centralizado de errores en peticiones HTTP
3. **Guardias de navegación**: Prevención de pérdida de datos al abandonar formularios sin guardar
4. **Mejora en el menú desplegable**: Implementación robusta para evitar problemas de interacción
5. **Visualización de logos**: Fallback a primera letra del nombre cuando no hay logo
6. **Validación avanzada de formularios**: Mensajes específicos para cada tipo de error
7. **Botones contextuales**: Cambios en texto y comportamiento según el contexto
8. **Carga asíncrona de módulos**: Implementación de lazy loading para mejor rendimiento
9. **Estructura optimizada del proyecto**: Organización modular según buenas prácticas
10. **Implementación CORS**: Configuración del backend para permitir peticiones desde el frontend

## Estructura de Carpetas

```
bank-app/
├── src/
│   ├── app/
│   │   ├── core/                     # Servicios y modelos principales
│   │   │   ├── guards/               # Guardias de navegación
│   │   │   ├── interceptors/         # Interceptores HTTP
│   │   │   ├── models/               # Interfaces y modelos
│   │   │   └── services/             # Servicios (API, notificaciones)
│   │   │       └── validators/       # Validadores personalizados
│   │   │
│   │   ├── features/                 # Módulos de funcionalidades
│   │   │   └── products/             # Módulo de productos
│   │   │       ├── components/       # Componentes específicos
│   │   │       │   ├── product-list/
│   │   │       │   ├── product-form/
│   │   │       │   └── product-delete-modal/
│   │   │       └── products.module.ts
│   │   │
│   │   ├── shared/                   # Elementos compartidos
│   │   │   ├── components/           # Componentes reutilizables
│   │   │   │   ├── loading/
│   │   │   │   ├── error-message/
│   │   │   │   └── notification/
│   │   │   ├── directives/           # Directivas personalizadas
│   │   │   └── pipes/                # Pipes personalizados
│   │   │
│   │   ├── app.component.ts          # Componente principal
│   │   ├── app.routes.ts             # Configuración de rutas
│   │   └── app.config.ts             # Configuración de la aplicación
│   │
│   ├── assets/                       # Recursos estáticos
│   │   ├── images/
│   │   └── styles/                   # Estilos globales
│   │
│   ├── environments/                 # Configuraciones por entorno
│   └── styles.scss                   # Estilos globales
│
├── jest.config.js                    # Configuración de pruebas
├── package.json                      # Dependencias y scripts
└── tsconfig.json                     # Configuración de TypeScript
```

## Guía de Instalación

### Requisitos Previos

- Node.js 14.x o superior
- Angular CLI 14.x o superior
- Backend de productos financieros corriendo en http://localhost:3002

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd frontend_angular/bank-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el backend**
   ```bash
   # En una terminal separada, navegar al directorio del backend
   cd ../../repo-interview-main
   npm install
   npm run start:dev
   ```

4. **Iniciar la aplicación Angular**
   ```bash
   # Volver al directorio de la aplicación Angular
   cd ../frontend_angular/bank-app
   npm start
   ```

5. **Acceder a la aplicación**
   - Abrir el navegador en http://localhost:4200

### Ejecución de Pruebas

```bash
# Ejecutar pruebas unitarias
npm test

# Generar informe de cobertura
npm run test:coverage
```

## Tecnologías Utilizadas

- **Angular 14+**: Framework principal
- **TypeScript 4.8+**: Lenguaje de programación
- **SCSS**: Preprocesador CSS
- **Jest**: Framework de pruebas unitarias
- **RxJS**: Biblioteca para programación reactiva
- **Angular Router**: Gestión de rutas y navegación

## Buenas Prácticas Implementadas

- **Clean Code**: Nomenclatura clara y descriptiva
- **SOLID**: Principios de diseño de software orientado a objetos
- **DRY (Don't Repeat Yourself)**: Código modular y reutilizable
- **Lazy Loading**: Carga bajo demanda de módulos
- **Reactive Forms**: Formularios reactivos con validaciones avanzadas
- **Manejo de Errores**: Tratamiento centralizado de errores
- **Tipado estricto**: Uso extensivo de interfaces para mayor seguridad

## Pendientes/Mejoras Futuras

- Implementación de pruebas e2e con Cypress
- Dockerización de la aplicación
- Implementación de i18n para múltiples idiomas
- Implementación de temas claros/oscuros
- Integración con sistemas de autenticación
