document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('form-tarea');
    const listaTareas = document.getElementById('lista-tareas');
    const modal = document.getElementById('modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalFecha = document.getElementById('modal-fecha');
    const modalCategoria = document.getElementById('modal-categoria');

    // Cargar tareas desde localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    mostrarTareas();

    // Evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const titulo = document.getElementById('titulo').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const categoria = document.getElementById('categoria').value;
        
        // Validación individualizada
        const errores = [];
        if (!titulo) errores.push('El título es obligatorio');
        if (!fecha) errores.push('Selecciona una fecha');
        if (!hora) errores.push('Selecciona una hora');
        
        if (errores.length > 0) {
            mostrarErrores(errores);
            return;
        }
        
        // Verificar duplicados
        const tareaDuplicada = tareas.some(tarea => 
            tarea.titulo.toLowerCase() === titulo.toLowerCase() && 
            tarea.fecha === fecha && 
            tarea.hora === hora
        );
        
        if (tareaDuplicada) {
            mostrarErrores(['⚠️ Ya existe una tarea con el mismo título, fecha y hora']);
            return;
        }
        
        // Crear nueva tarea
        const nuevaTarea = {
            id: Date.now(),
            titulo,
            descripcion,
            fecha,
            hora,
            categoria
        };
        
        // Agregar y actualizar
        tareas.push(nuevaTarea);
        guardarTareas();
        mostrarTareas();
        mostrarModalConfirmacion(nuevaTarea);
        form.reset();
    });

    // Mostrar tareas en el DOM
    function mostrarTareas() {
        listaTareas.innerHTML = '';
        
        tareas.forEach(tarea => {
            const tareaElement = document.createElement('div');
            tareaElement.className = 'tarea';
            tareaElement.innerHTML = `
                <div class="tarea-titulo" contenteditable="true">${tarea.titulo}</div>
                <div class="tarea-descripcion" contenteditable="true">${tarea.descripcion}</div>
                <div class="tarea-fecha">
                    <span>📅 ${formatearFecha(tarea.fecha)}</span>
                    <span>⏰ ${tarea.hora}</span>
                </div>
                <div class="categoria categoria-${tarea.categoria}">${tarea.categoria.toUpperCase()}</div>
                <button class="btn-eliminar" data-id="${tarea.id}">Eliminar</button>
            `;
            listaTareas.appendChild(tareaElement);
        });
        
        // Eventos para edición
        document.querySelectorAll('[contenteditable="true"]').forEach(element => {
            element.addEventListener('blur', function() {
                const id = parseInt(this.closest('.tarea').querySelector('.btn-eliminar').dataset.id);
                const campo = this.classList.contains('tarea-titulo') ? 'titulo' : 'descripcion';
                
                tareas = tareas.map(tarea => 
                    tarea.id === id ? { ...tarea, [campo]: this.textContent } : tarea
                );
                guardarTareas();
            });
        });
        
        // Eventos para eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                tareas = tareas.filter(tarea => tarea.id !== id);
                guardarTareas();
                mostrarTareas();
            });
        });
    }

    // Mostrar errores mejorados
    function mostrarErrores(errores) {
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = '';
        
        errores.forEach(error => {
            const errorItem = document.createElement('div');
            errorItem.className = 'error-item';
            errorItem.textContent = error;
            errorContainer.appendChild(errorItem);
        });
        
        setTimeout(() => errorContainer.innerHTML = '', 5000);
    }

    // Mostrar modal de confirmación
    function mostrarModalConfirmacion(tarea) {
        modalTitulo.textContent = tarea.titulo;
        modalFecha.textContent = `${formatearFecha(tarea.fecha)} a las ${tarea.hora}`;
        modalCategoria.textContent = tarea.categoria.toUpperCase();
        
        modal.style.display = 'flex';
        
        setTimeout(() => {
            modal.style.opacity = '0';
            setTimeout(() => modal.style.display = 'none', 300);
        }, 5000);
    }

    // Nuevo: mostrar el toast
    mostrarToast(`✅ Tarea '${nuevaTarea.titulo}' registrada para ${formatearFecha(nuevaTarea.fecha)} a las ${nuevaTarea.hora}`);

    // Formatear fecha
    function formatearFecha(fechaStr) {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
    }

    // Guardar en localStorage
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
});

// Mostrar toast
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.add('mostrar');

    setTimeout(() => {
        toast.classList.remove('mostrar');
    }, 4000);
}
