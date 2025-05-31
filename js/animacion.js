document.addEventListener("DOMContentLoaded", () => {
    const profesiones = [
        "Analista Programador",
        "Desarrollador Frontend",
        "Apasionado por la tecnología",
        "Me encanta la electrónica",
        "Actualmente trabajando como Jefe de Bodega",
        "Administro 3 bodegas de la marca HP",
    ];
    let i = 0;

    function cambiarProfesion() {
        document.getElementById("profesion").textContent = profesiones[i];
        i = (i + 1) % profesiones.length;
    }
    setInterval(cambiarProfesion, 2200);

    const contactoBtn = document.getElementById("contactoBtn");
    const contactoModal = document.getElementById("contactoModal");
    const cerrarModal = document.getElementById("cerrarModal");

    contactoBtn.addEventListener("click", () => {
        contactoModal.style.display = "flex";
    });

    cerrarModal.addEventListener("click", () => {
        contactoModal.style.display = "none";
    });

    contactoModal.addEventListener("click", (e) => {
        if (e.target === contactoModal) {
            contactoModal.style.display = "none";
        }
    });
});
