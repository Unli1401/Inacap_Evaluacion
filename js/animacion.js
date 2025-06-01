document.addEventListener("DOMContentLoaded", () => {
    const profesiones = [
        "Analista Programador.",
        "Desarrollador Frontend.",
        "Tengo conocimientos en:",
        "<i> HTML,</i>",
        "<i>CSS,</i>",
        "<i>JavaScript,</i>",
        "<i>MySQL,</i>",
        "<i>Python,</i>",
        "<i>SQL,</i>",
        "<i>Excel Avanzado.</i>",
        "Me encanta la electrónica y la programación.",
        "Actualmente trabajando como Jefe de Bodega.",
        "Administro 3 bodegas de la marca HP.",
        "Aficionado a la Formula 1.",
        "Aficionado a la música.",
        "Apasionado por la tecnología."
        
      
        
    ];
    let i = 0;

    function cambiarProfesion() {
        /*document.getElementById("profesion").textContent = profesiones[i];*/
        document.getElementById("profesion").innerHTML = profesiones[i];
        i = (i + 1) % profesiones.length;
    }
    setInterval(cambiarProfesion, 1200);

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
