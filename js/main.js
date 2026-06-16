// ===== SCRIPT PRINCIPAL =====
// Este archivo se ejecuta en la página principal (index.html)

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏋️ FitLife Gym - Página principal cargada');

    // Puedes agregar aquí animaciones o interacciones adicionales
    // Por ejemplo, un efecto de fade-in para las tarjetas
    const cards = document.querySelectorAll('.servicio-card, .testimonio-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===== FUNCIONES GLOBALES =====
// Función para actualizar el dashboard (se usa desde otras páginas)
function actualizarDashboardGlobal() {
    // Esta función se puede llamar desde otros JS
    console.log('📊 Actualizando dashboard...');
}