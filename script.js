document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Obtener los datos del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // Deshabilitar botón temporalmente para dar efecto de procesamiento
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

            setTimeout(() => {
                // Generar respuesta automática visible para el cliente
                formResponse.className = 'form-response success';
                formResponse.innerHTML = `
                    <div class="auto-reply">
                        <i class="fa-solid fa-circle-check"></i>
                        <div>
                            <h4>¡Mensaje recibido con éxito!</h4>
                            <p>Gracias <strong>${name}</strong>. Se ha registrado tu consulta desde <em>${email}</em>.</p>
                            <small><i class="fa-solid fa-robot"></i> Confirmación automática: Tu mensaje ha sido canalizado al contenedor de evidencias de Seguridad Informática.</small>
                        </div>
                    </div>
                `;

                // Limpiar el formulario
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensaje';
            }, 1000);
        });
    }
});