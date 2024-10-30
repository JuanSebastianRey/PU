# Sistema de Control de Teleférico 🚠

## Descripción
Sistema desarrollado en Node.js para la gestión y control de un teleférico, incluyendo la administración de cabinas, usuarios y viajes. El sistema permite controlar múltiples cabinas, gestionar pasajeros y coordinar viajes entre estaciones.

## Características 🌟
- Gestión de cabinas (creación, eliminación, control de movimiento)
- Registro y control de usuarios
- Sistema de reserva de viajes
- Control de capacidad de cabinas
- Monitoreo de estado de las cabinas
- Sistema de pruebas unitarias completo

## Requisitos Previos 📋
- Node.js (versión 12.0 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación 🔧

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd sistema-teleferico
```

2. Instalar dependencias:
```bash
npm install
```

## Estructura del Proyecto 📁
```
sistema-teleferico/
├── src/
│   ├── sistema-teleferico.js    # Código principal del sistema
│   └── teleferico.test.js       # Pruebas unitarias
├── package.json                 # Configuración del proyecto
└── README.md                    # Este archivo
```

## Uso 💻

### Inicializar el Sistema
```javascript
const { SistemaTeleferico } = require('./src/sistema-teleferico');
const sistema = new SistemaTeleferico();
```

### Crear una Cabina
```javascript
// Crear una cabina con ID 1 y capacidad para 8 pasajeros
const cabina = sistema.crearCabina(1, 8);
```

### Registrar un Usuario
```javascript
// Registrar un usuario con ID 1, nombre "Juan" y edad 25
const usuario = sistema.registrarUsuario(1, "Juan", 25);
```

### Solicitar un Viaje
```javascript
// Solicitar viaje para el usuario con ID 1 hacia la estación cima
const viaje = sistema.solicitarViaje(1, 'estacionCima');
```

## Ejemplos de Uso 📝

### Ejemplo Completo
```javascript
// Inicializar el sistema
const sistema = new SistemaTeleferico();

// Crear cabinas
sistema.crearCabina(1, 8);
sistema.crearCabina(2, 8);

// Registrar usuarios
sistema.registrarUsuario(1, "Juan", 25);
sistema.registrarUsuario(2, "Ana", 30);

// Solicitar viajes
const viaje1 = sistema.solicitarViaje(1, 'estacionCima');
const viaje2 = sistema.solicitarViaje(2, 'estacionCima');

// Iniciar viaje
sistema.iniciarViaje(1);
```

## Pruebas 🧪

El sistema incluye un conjunto completo de pruebas unitarias utilizando Jest.

### Ejecutar Pruebas
```bash
npm test
```

### Tipos de Pruebas Incluidas
- Pruebas de creación de cabinas
- Pruebas de registro de usuarios
- Pruebas de solicitud de viajes
- Pruebas de límites de capacidad
- Pruebas de manejo de errores

## Manejo de Errores 🚨

El sistema incluye manejo de errores para situaciones comunes:

```javascript
try {
    sistema.crearCabina(1, 8);
    sistema.crearCabina(1, 8); // Lanzará error por ID duplicado
} catch (error) {
    console.error(error.message);
}
```

## Documentación de la API 📚

### Clase SistemaTeleferico

#### Métodos Principales

`crearCabina(id, capacidadMaxima)`
- **Parámetros**: 
  - `id`: Número único de identificación
  - `capacidadMaxima`: Número máximo de pasajeros
- **Retorna**: Objeto Cabina
- **Lanza**: Error si el ID ya existe

`registrarUsuario(id, nombre, edad)`
- **Parámetros**:
  - `id`: Número único de identificación
  - `nombre`: Nombre del usuario
  - `edad`: Edad del usuario
- **Retorna**: Objeto Usuario
- **Lanza**: Error si el ID ya existe

`solicitarViaje(usuarioId, ubicacionDestino)`
- **Parámetros**:
  - `usuarioId`: ID del usuario
  - `ubicacionDestino`: 'estacionBase' o 'estacionCima'
- **Retorna**: Objeto Cabina asignada
- **Lanza**: Error si no hay cabinas disponibles o la cabina está llena