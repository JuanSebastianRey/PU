const { Cabina, Usuario, SistemaTeleferico } = require('./sistema-teleferico');

describe('Sistema Teleférico', () => {
    let sistema;

    beforeEach(() => {
        sistema = new SistemaTeleferico();
    });

    // Pruebas para Creación de Cabinas
    describe('Gestión de Cabinas', () => {
        /**
         * ID: TC001
         * Tipo: Positivo
         * Descripción: Crear una nueva cabina con valores válidos
         * Pasos: 
         *  1. Crear una nueva cabina con ID y capacidad específicos
         *  2. Verificar que la cabina fue creada correctamente
         * Datos de prueba: ID=1, capacidadMaxima=8
         * Resultado esperado: Cabina creada exitosamente
         */
        test('debe crear una nueva cabina correctamente', () => {
            const cabina = sistema.crearCabina(1, 8);
            expect(cabina.id).toBe(1);
            expect(cabina.capacidadMaxima).toBe(8);
            expect(sistema.cabinas.size).toBe(1);
        });

        /**
         * ID: TC002
         * Tipo: Negativo
         * Descripción: Intentar crear una cabina con ID duplicado
         * Pasos:
         *  1. Crear una primera cabina con ID específico
         *  2. Intentar crear una segunda cabina con el mismo ID
         * Datos de prueba: ID=1, capacidadMaxima=8
         * Resultado esperado: Error indicando ID duplicado
         */
        test('debe lanzar error al crear cabina con ID duplicado', () => {
            sistema.crearCabina(1, 8);
            expect(() => sistema.crearCabina(1, 8)).toThrow('Ya existe una cabina con ese ID');
        });
    });

    // Pruebas para Gestión de Usuarios
    describe('Gestión de Usuarios', () => {
        /**
         * ID: TC003
         * Tipo: Positivo
         * Descripción: Registrar un nuevo usuario
         * Pasos:
         *  1. Registrar un nuevo usuario con datos válidos
         *  2. Verificar que el usuario fue registrado correctamente
         * Datos de prueba: ID=1, nombre="Juan", edad=25
         * Resultado esperado: Usuario registrado exitosamente
         */
        test('debe registrar un nuevo usuario correctamente', () => {
            const usuario = sistema.registrarUsuario(1, "Juan", 25);
            expect(usuario.nombre).toBe("Juan");
            expect(sistema.usuarios.size).toBe(1);
        });
    });

    // Pruebas para Solicitud de Viajes
    describe('Solicitud de Viajes', () => {
        /**
         * ID: TC004
         * Tipo: Positivo
         * Descripción: Solicitar un viaje válido
         * Pasos:
         *  1. Crear una cabina disponible
         *  2. Registrar un usuario
         *  3. Solicitar un viaje
         * Datos de prueba: 
         *  - Cabina: ID=1, capacidadMaxima=8
         *  - Usuario: ID=1, nombre="Juan", edad=25
         * Resultado esperado: Viaje asignado correctamente
         */
        test('debe asignar viaje correctamente', () => {
            sistema.crearCabina(1, 8);
            sistema.registrarUsuario(1, "Juan", 25);
            const cabina = sistema.solicitarViaje(1, 'estacionCima');
            expect(cabina.pasajeros.length).toBe(1);
        });

        /**
         * ID: TC005
         * Tipo: Límite
         * Descripción: Intentar agregar pasajeros a una cabina llena
         * Pasos:
         *  1. Crear una cabina con capacidad 2
         *  2. Registrar 3 usuarios
         *  3. Intentar agregar todos los usuarios
         * Datos de prueba:
         *  - Cabina: ID=1, capacidadMaxima=2
         *  - Usuarios: 3 usuarios diferentes
         * Resultado esperado: Error al intentar agregar el tercer usuario
         */
        test('debe rechazar pasajeros cuando la cabina está llena', () => {
            const cabina = sistema.crearCabina(1, 2);
            sistema.registrarUsuario(1, "Juan", 25);
            sistema.registrarUsuario(2, "Ana", 30);
            sistema.registrarUsuario(3, "Pedro", 28);
            
            sistema.solicitarViaje(1, 'estacionCima');
            sistema.solicitarViaje(2, 'estacionCima');
            expect(() => sistema.solicitarViaje(3, 'estacionCima')).toThrow('La cabina está llena');
        });
    });
});