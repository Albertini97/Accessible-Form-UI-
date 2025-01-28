document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const progressBar = document.querySelector('.progress');
    const checklistItems = document.querySelectorAll('.checklist li');

    // Función para mostrar/ocultar la contraseña
    togglePasswordButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        confirmPasswordInput.setAttribute('type', type);
        this.setAttribute('aria-label', type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });

    // Función para validar el correo electrónico
    emailInput.addEventListener('input', function() {
        if (emailInput.validity.valid) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
        }
        updateProgress();
    });

    // Función para actualizar la barra de progreso y la lista de requisitos
    function updateProgress() {
        let completed = 0;
        const total = checklistItems.length;

        // Verificar cada requisito
        checklistItems.forEach((item, index) => {
            switch(index) {
                case 0:
                    if (document.getElementById('fullname').value.trim() !== '') {
                        completed++;
                        item.style.textDecoration = 'line-through';
                    } else {
                        item.style.textDecoration = 'none';
                    }
                    break;
                case 1:
                    if (emailInput.validity.valid) {
                        completed++;
                        item.style.textDecoration = 'line-through';
                    } else {
                        item.style.textDecoration = 'none';
                    }
                    break;
                case 2:
                    if (passwordInput.value.trim() !== '') {
                        completed++;
                        item.style.textDecoration = 'line-through';
                    } else {
                        item.style.textDecoration = 'none';
                    }
                    break;
                case 3:
                    if (confirmPasswordInput.value.trim() !== '' && confirmPasswordInput.value === passwordInput.value) {
                        completed++;
                        item.style.textDecoration = 'line-through';
                    } else {
                        item.style.textDecoration = 'none';
                    }
                    break;
            }
        });

        // Actualizar la barra de progreso
        const progressPercentage = (completed / total) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Escuchar cambios en los campos del formulario
    document.getElementById('fullname').addEventListener('input', updateProgress);
    passwordInput.addEventListener('input', updateProgress);
    confirmPasswordInput.addEventListener('input', updateProgress);
});