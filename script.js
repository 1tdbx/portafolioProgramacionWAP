document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formResponse.className = 'form-response success';
                    formResponse.innerHTML = `
                        <div class="auto-reply">
                            <i class="fa-solid fa-circle-check"></i>
                            <div>
                                <h4>¡Mensaje transmitido con éxito!</h4>
                                <p>Gracias <strong>${name}</strong>. El mensaje ha sido enviado a la bandeja principal.</p>
                                <small><i class="fa-solid fa-robot"></i> Notificación enviada desde <em>${email}</em>.</small>
                            </div>
                        </div>
                    `;
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar');
                }
            } catch (error) {
                formResponse.className = 'form-response error';
                formResponse.innerHTML = `<p><i class="fa-solid fa-triangle-exclamation"></i> Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.</p>`;
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensaje';
            }
        });
    }
});