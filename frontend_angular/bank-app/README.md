# Aplicación de Gestión de Productos Financieros Bancarios

Creado por Christian Cattani

## Descripción

Esta aplicación permite administrar productos financieros de un banco mediante una interfaz web desarrollada con Angular. Proporciona funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) completas, con un diseño intuitivo y moderno que sigue las especificaciones del ejercicio técnico.

## Características Principales

- **Listado de productos financieros** (F1): Vista principal con tabla de productos
- **Búsqueda por texto** (F2): Filtrado en tiempo real de productos 
- **Selector de registros por página** (F3): Opción de mostrar 5, 10 o 20 registros
- **Formulario de registro/edición** (F4/F5): Con validaciones completas según requerimientos
- **Funcionalidad de eliminación** (F6): Con modal de confirmación
- **Sistema de notificaciones**: Feedback visual al usuario sobre operaciones
- **Manejo de errores**: Visualización de errores en formularios y operaciones
- **Diseño responsive**: Adaptación a diferentes dispositivos

## Tecnologías Utilizadas

- Angular 14+
- TypeScript 4.8+
- SCSS para estilos
- Jest para pruebas unitarias
- RxJS para programación reactiva

## Estructura del Proyecto

```
bank-app/
├── src/
│   ├── app/
│   │   ├── core/                # Núcleo de la aplicación
│   │   │   ├── guards/          # Protección de rutas
│   │   │   ├── interceptors/    # Interceptores HTTP
│   │   │   ├── models/          # Interfaces y modelos
│   │   │   └── services/        # Servicios y lógica de negocio
│   │   │
│   │   ├── features/            # Módulos de funcionalidades
│   │   │   └── products/        # Gestión de productos
│   │   │
│   │   ├── shared/              # Componentes y utilidades compartidas
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   ├── directives/      # Directivas personalizadas
│   │   │   └── pipes/           # Pipes para transformación de datos
│   │   │
│   │   └── app.*               # Componente principal y configuración
│   │
│   ├── assets/                  # Recursos estáticos
│   └── styles.scss              # Estilos globales
│
└── tests/                       # Pruebas unitarias
```

## Guía de Instalación y Ejecución

### Requisitos Previos

- Node.js 14.x o superior
- Angular CLI 14.x o superior
- Backend de productos financieros (incluido en repo-interview-main)

### Instalación

1. **Configurar el backend**

   ```bash
   cd /ruta/al/repo-interview-main
   npm install
   npm run start:dev
   ```

   El backend estará disponible en http://localhost:3002

2. **Instalar y ejecutar el frontend**

   ```bash
   cd /ruta/al/frontend_angular/bank-app
   npm install
   npm start
   ```

   La aplicación estará disponible en http://localhost:4200

### Ejecución de Pruebas

```bash
npm test
npm run test:coverage
```

## Buenas Prácticas Implementadas

- **Arquitectura modular**: Separación clara de responsabilidades
- **Principios SOLID**: Diseño orientado a objetos mantenible
- **Clean Code**: Código legible y bien estructurado
- **Lazy Loading**: Carga optimizada de módulos
- **Manejo de errores**: Tratamiento centralizado de excepciones
- **Pruebas unitarias**: Cobertura superior al 70%

## Mejoras Realizadas

1. **Sistema de notificaciones**: Feedback visual para acciones del usuario
2. **Corrección CORS**: Configuración para conectar frontend y backend
3. **Manejo de menús desplegables**: Mejora en la interacción de los menús
4. **Visualización de logos**: Mostrar inicial del nombre cuando no hay logo
5. **Mejora en la UI/UX**: Botones contextuales e indicadores visuales claros
6. **Prevención de pérdida de datos**: Confirmación al abandonar formularios con cambios

## Licencia

Este proyecto es parte de un ejercicio técnico y no está destinado para uso en producción.
