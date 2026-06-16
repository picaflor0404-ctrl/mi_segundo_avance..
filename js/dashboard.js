// ===== DASHBOARD - PANEL DE CONTROL =====

// Cargar datos del LocalStorage y mostrar en el dashboard
function actualizarDashboard() {
    // Obtener clientes
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const horarios = JSON.parse(localStorage.getItem('horarios')) || [];

    // Actualizar métricas
    document.getElementById('totalClientes').textContent = clientes.length;
    document.getElementById('totalHorarios').textContent = horarios.length;

    const activos = clientes.filter(c => c.estado === 'activo').length;
    document.getElementById('clientesActivos').textContent = activos;

    const ocupados = horarios.length;
    document.getElementById('horariosOcupados').textContent = ocupados;

    // Mostrar últimos 5 clientes
    const ultimos = clientes.slice(-5).reverse();
    const contenedor = document.getElementById('ultimosClientes');

    if (ultimos.length === 0) {
        contenedor.innerHTML = '<p>No hay clientes registrados aún.</p>';
    } else {
        let html = `<table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>`;
        ultimos.forEach(c => {
            const color = c.estado === 'activo' ? 'green' : 'red';
            html += `<tr>
                <td>${c.nombre}</td>
                <td>${c.email}</td>
                <td><span style="color:${color}; font-weight:bold;">${c.estado}</span></td>
            </tr>`;
        });
        html += `</tbody></table>`;
        contenedor.innerHTML = html;
    }
}

// Escuchar cambios en el LocalStorage (cuando se actualiza desde otra pestaña)
window.addEventListener('storage', function(e) {
    if (e.key === 'clientes' || e.key === 'horarios') {
        actualizarDashboard();
    }
});

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', actualizarDashboard);