// ===== CRUD DE CLIENTES =====

let clientes = [];
let editandoId = null;

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
    mostrarClientes();
});

// ===== FUNCIONES CRUD =====

// Obtener clientes de LocalStorage
function cargarClientes() {
    const data = localStorage.getItem('clientes');
    clientes = data ? JSON.parse(data) : [];
}

// Guardar clientes en LocalStorage
function guardarClientes() {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Mostrar clientes en la tabla
function mostrarClientes() {
    const tbody = document.getElementById('cuerpoTabla');

    if (clientes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay clientes registrados</td></tr>`;
        return;
    }

    let html = '';
    clientes.forEach((cliente, index) => {
        const id = index + 1;
        const color = cliente.estado === 'activo' ? 'green' : 'red';
        html += `<tr>
            <td>${id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td><span style="color:${color}; font-weight:bold;">${cliente.estado}</span></td>
            <td>
                <button class="btn-editar" onclick="editarCliente(${index})">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarCliente(${index})">🗑️ Eliminar</button>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

// ===== AGREGAR / ACTUALIZAR CLIENTE =====
document.getElementById('clienteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const estado = document.getElementById('estado').value;

    if (!nombre || !email || !telefono) {
        alert('⚠️ Todos los campos son obligatorios');
        return;
    }

    const cliente = { nombre, email, telefono, estado };

    if (editandoId !== null) {
        // Editar cliente existente
        clientes[editandoId] = cliente;
        editandoId = null;
        document.getElementById('formTitle').textContent = 'Agregar Nuevo Cliente';
        document.getElementById('btnCancelar').style.display = 'none';
        document.getElementById('btnGuardar').textContent = 'Guardar Cliente';
    } else {
        // Agregar nuevo cliente
        clientes.push(cliente);
    }

    guardarClientes();
    mostrarClientes();
    this.reset();
});

// ===== EDITAR CLIENTE =====
function editarCliente(index) {
    const cliente = clientes[index];
    document.getElementById('clienteId').value = index;
    document.getElementById('nombre').value = cliente.nombre;
    document.getElementById('email').value = cliente.email;
    document.getElementById('telefono').value = cliente.telefono;
    document.getElementById('estado').value = cliente.estado;

    editandoId = index;
    document.getElementById('formTitle').textContent = '✏️ Editar Cliente';
    document.getElementById('btnCancelar').style.display = 'inline-block';
    document.getElementById('btnGuardar').textContent = 'Actualizar Cliente';
}

// ===== CANCELAR EDICIÓN =====
document.getElementById('btnCancelar').addEventListener('click', function() {
    document.getElementById('clienteForm').reset();
    editandoId = null;
    document.getElementById('formTitle').textContent = 'Agregar Nuevo Cliente';
    this.style.display = 'none';
    document.getElementById('btnGuardar').textContent = 'Guardar Cliente';
});

// ===== ELIMINAR CLIENTE =====
function eliminarCliente(index) {
    if (confirm('⚠️ ¿Estás seguro de eliminar este cliente?')) {
        clientes.splice(index, 1);
        guardarClientes();
        mostrarClientes();
    }
}