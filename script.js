document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se recargue por completo

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Mostrar estado de carga en el botón
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITIENDO...';

            try {
                // Envío real mediante Fetch API al endpoint de Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Si Formspree recibe el mensaje correctamente
                    formResponse.classList.remove('hidden');
                    formResponse.className = 'form-response success';
                    formResponse.innerHTML = `
                        <div class="auto-reply">
                            <i class="fa-solid fa-circle-check"></i>
                            <div>
                                <h4>¡MENSAJE TRANSMITIDO CON ÉXITO!</h4>
                                p>Gracias <strong>${name}</strong>. Tu paquete de datos ha sido enviado a la bandeja de entrada.</p>
                                <small><i class="fa-solid fa-robot"></i> Confirmación desde <em>${email}</em>.</small>
                            </div>
                        </div>
                    `;
                    contactForm.reset();
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                formResponse.classList.remove('hidden');
                formResponse.className = 'form-response error';
                formResponse.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i> Error de transmisión. Revisa la conexión e inténtalo de nuevo.</p>`;
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensaje';
            }
        });
    }
});