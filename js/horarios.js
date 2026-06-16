// ===== CRUD DE HORARIOS =====

let horarios = [];
let clientes = [];
let editandoIdHorario = null;

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
    cargarHorarios();
    cargarClientesParaSelect();
    mostrarHorarios();
});

// ===== FUNCIONES CRUD =====

function cargarHorarios() {
    const data = localStorage.getItem('horarios');
    horarios = data ? JSON.parse(data) : [];
}

function cargarClientesParaSelect() {
    const data = localStorage.getItem('clientes');
    clientes = data ? JSON.parse(data) : [];
    const select = document.getElementById('cliente');
    select.innerHTML = '<option value="">Seleccione un cliente...</option>';
    clientes.forEach((c, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = c.nombre;
        select.appendChild(option);
    });
}

function guardarHorarios() {
    localStorage.setItem('horarios', JSON.stringify(horarios));
}

function mostrarHorarios() {
    const tbody = document.getElementById('cuerpoTablaHorarios');

    if (horarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay horarios registrados</td></tr>`;
        return;
    }

    let html = '';
    horarios.forEach((h, index) => {
        const id = index + 1;
        const nombreCliente = clientes[h.clienteIndex] ? clientes[h.clienteIndex].nombre : '⚠️ Cliente eliminado';
        html += `<tr>
            <td>${id}</td>
            <td>${nombreCliente}</td>
            <td>${h.dia}</td>
            <td>${h.hora}</td>
            <td>${h.entrenador}</td>
            <td>
                <button class="btn-editar" onclick="editarHorario(${index})">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarHorario(${index})">🗑️ Eliminar</button>
            </td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

// ===== AGREGAR / ACTUALIZAR HORARIO =====
document.getElementById('horarioForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const clienteIndex = parseInt(document.getElementById('cliente').value);
    const dia = document.getElementById('dia').value;
    const hora = document.getElementById('hora').value;
    const entrenador = document.getElementById('entrenador').value.trim();

    if (isNaN(clienteIndex) || !dia || !hora || !entrenador) {
        alert('⚠️ Todos los campos son obligatorios');
        return;
    }

    const horario = { clienteIndex, dia, hora, entrenador };

    if (editandoIdHorario !== null) {
        // Editar horario existente
        horarios[editandoIdHorario] = horario;
        editandoIdHorario = null;
        document.getElementById('formTitleHorario').textContent = 'Agregar Nuevo Horario';
        document.getElementById('btnCancelarHorario').style.display = 'none';
        document.getElementById('btnGuardarHorario').textContent = 'Guardar Horario';
    } else {
        // Agregar nuevo horario
        horarios.push(horario);
    }

    guardarHorarios();
    mostrarHorarios();
    this.reset();
});

// ===== EDITAR HORARIO =====
function editarHorario(index) {
    const h = horarios[index];
    document.getElementById('horarioId').value = index;
    document.getElementById('cliente').value = h.clienteIndex;
    document.getElementById('dia').value = h.dia;
    document.getElementById('hora').value = h.hora;
    document.getElementById('entrenador').value = h.entrenador;

    editandoIdHorario = index;
    document.getElementById('formTitleHorario').textContent = '✏️ Editar Horario';
    document.getElementById('btnCancelarHorario').style.display = 'inline-block';
    document.getElementById('btnGuardarHorario').textContent = 'Actualizar Horario';
}

// ===== CANCELAR EDICIÓN =====
document.getElementById('btnCancelarHorario').addEventListener('click', function() {
    document.getElementById('horarioForm').reset();
    editandoIdHorario = null;
    document.getElementById('formTitleHorario').textContent = 'Agregar Nuevo Horario';
    this.style.display = 'none';
    document.getElementById('btnGuardarHorario').textContent = 'Guardar Horario';
});

// ===== ELIMINAR HORARIO =====
function eliminarHorario(index) {
    if (confirm('⚠️ ¿Estás seguro de eliminar este horario?')) {
        horarios.splice(index, 1);
        guardarHorarios();
        mostrarHorarios();
    }
}