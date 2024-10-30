// Clase que representa una Cabina
class Cabina {
    constructor(id, capacidadMaxima) {
        this.id = id;
        this.capacidadMaxima = capacidadMaxima;
        this.pasajeros = [];
        this.enMovimiento = false;
        this.ubicacionActual = 'estacionBase'; // estacionBase o estacionCima
    }

    estaDisponible() {
        return !this.enMovimiento && this.pasajeros.length < this.capacidadMaxima;
    }

    estaLlena() {
        return this.pasajeros.length >= this.capacidadMaxima;
    }

    agregarPasajero(pasajero) {
        if (this.estaLlena()) {
            throw new Error('La cabina está llena');
        }
        this.pasajeros.push(pasajero);
    }

    removerPasajero(pasajeroId) {
        const index = this.pasajeros.findIndex(p => p.id === pasajeroId);
        if (index === -1) {
            throw new Error('Pasajero no encontrado');
        }
        return this.pasajeros.splice(index, 1)[0];
    }

    iniciarMovimiento() {
        if (this.enMovimiento) {
            throw new Error('La cabina ya está en movimiento');
        }
        this.enMovimiento = true;
    }

    detenerMovimiento() {
        if (!this.enMovimiento) {
            throw new Error('La cabina ya está detenida');
        }
        this.enMovimiento = false;
    }

    cambiarUbicacion() {
        this.ubicacionActual = this.ubicacionActual === 'estacionBase' ? 'estacionCima' : 'estacionBase';
    }
}

// Clase que representa un Usuario
class Usuario {
    constructor(id, nombre, edad) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
    }
}

// Clase principal del Sistema de Teleférico
class SistemaTeleferico {
    constructor() {
        this.cabinas = new Map();
        this.usuarios = new Map();
    }

    crearCabina(id, capacidadMaxima) {
        if (this.cabinas.has(id)) {
            throw new Error('Ya existe una cabina con ese ID');
        }
        const cabina = new Cabina(id, capacidadMaxima);
        this.cabinas.set(id, cabina);
        return cabina;
    }

    eliminarCabina(id) {
        if (!this.cabinas.has(id)) {
            throw new Error('Cabina no encontrada');
        }
        const cabina = this.cabinas.get(id);
        if (cabina.pasajeros.length > 0) {
            throw new Error('No se puede eliminar una cabina con pasajeros');
        }
        this.cabinas.delete(id);
    }

    registrarUsuario(id, nombre, edad) {
        if (this.usuarios.has(id)) {
            throw new Error('Ya existe un usuario con ese ID');
        }
        const usuario = new Usuario(id, nombre, edad);
        this.usuarios.set(id, usuario);
        return usuario;
    }

    // Método que usa lambda para encontrar cabinas disponibles
    encontrarCabinaDisponible = (ubicacion) => {
        const cabinasEnUbicacion = Array.from(this.cabinas.values())
            .filter(cabina => cabina.ubicacionActual === ubicacion);

        if (cabinasEnUbicacion.length === 0) {
            throw new Error('No hay cabinas en esta ubicación');
        }

        const cabinaDisponible = cabinasEnUbicacion.find(cabina => cabina.estaDisponible());
        
        if (!cabinaDisponible) {
            // Verificamos si hay al menos una cabina llena
            if (cabinasEnUbicacion.some(cabina => cabina.estaLlena())) {
                throw new Error('La cabina está llena');
            }
            throw new Error('No hay cabinas disponibles');
        }

        return cabinaDisponible;
    }

    // Método para solicitar viaje
    solicitarViaje(usuarioId, ubicacionDestino) {
        const usuario = this.usuarios.get(usuarioId);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const ubicacionOrigen = ubicacionDestino === 'estacionCima' ? 'estacionBase' : 'estacionCima';
        const cabinaDisponible = this.encontrarCabinaDisponible(ubicacionOrigen);
        cabinaDisponible.agregarPasajero(usuario);
        return cabinaDisponible;
    }

    // Método para iniciar viaje de una cabina
    iniciarViaje(cabinaId) {
        const cabina = this.cabinas.get(cabinaId);
        if (!cabina) {
            throw new Error('Cabina no encontrada');
        }

        cabina.iniciarMovimiento();
        // Simulación del viaje
        setTimeout(() => {
            cabina.detenerMovimiento();
            cabina.cambiarUbicacion();
        }, 5000); // 5 segundos de viaje simulado
    }
}

module.exports = {
    Cabina,
    Usuario,
    SistemaTeleferico
};