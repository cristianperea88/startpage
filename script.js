/* ============================================
   STARTPAGE - SCRIPT PRINCIPAL
   ============================================ */

// ============================================
// FUNCIÓN: MOSTRAR RELOJ DIGITAL
// ============================================
function mostrarReloj() {
    const contenedorReloj = document.querySelector("#clockContainer");
    const contenedorFecha = document.querySelector("#dateContainer");
    const fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let ampm;

    // Determinar AM o PM
    if (horas >= 12) {
        ampm = "pm";
    } else {
        ampm = "am";
    }

    // Convertir formato de 24 horas a 12 horas
    if (horas > 12) {
        horas = horas - 12;
    }
    
    // Manejar caso especial de medianoche (00:00)
    if (horas === 0) {
        horas = 12;
    }

    // Agregar cero delante si es menor a 10
    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    
    // Actualizar el contenido del reloj
    contenedorReloj.innerHTML = `[${horas}:${minutos}]${ampm}`;
    
    // Actualizar la fecha
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    
    contenedorFecha.innerHTML = `${diaSemana}, ${dia} de ${mes} ${año}`;
}


// ============================================
// FUNCIÓN: MOSTRAR RELOJ DIGITAL
// ============================================
function mostrarReloj() {
    const contenedorReloj = document.querySelector("#clockContainer");
    const contenedorFecha = document.querySelector("#dateContainer");
    const fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let ampm;

    // Determinar AM o PM
    if (horas >= 12) {
        ampm = "pm";
    } else {
        ampm = "am";
    }

    // Convertir formato de 24 horas a 12 horas
    if (horas > 12) {
        horas = horas - 12;
    }
    
    // Manejar caso especial de medianoche (00:00)
    if (horas === 0) {
        horas = 12;
    }

    // Agregar cero delante si es menor a 10
    if (horas < 10) {
        horas = "0" + horas;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    
    // Actualizar el contenido del reloj
    contenedorReloj.innerHTML = `[${horas}:${minutos}]${ampm}`;
    
    // Actualizar la fecha
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    
    contenedorFecha.innerHTML = `${diaSemana}, ${dia} de ${mes} ${año}`;
}
// ============================================
// FUNCIÓN: CARGAR PREFERENCIA DEL USUARIO
// ============================================
function cargarPreferencia(clave, valorPorDefecto = null) {
    const valor = localStorage.getItem(clave);
    return valor !== null ? valor : valorPorDefecto;
}

// ============================================
// FUNCIÓN: CONFIGURAR RELOJ
// ============================================
function configurarReloj() {
    // Mostrar reloj y actualizar cada segundo
    mostrarReloj();
    setInterval(mostrarReloj, 1000);
}

// ============================================
// FUNCIÓN: CONFIGURAR OPCIONES GENERALES
// ============================================
function configurarGeneral() {
    const body = document.body;

    const fondoGuardado = cargarPreferencia("generalBackground");
    body.style.backgroundImage = fondoGuardado
        ? `url(${fondoGuardado})`
        : "url('assets/wallpaper.jpg')";
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
function inicializar() {
    configurarReloj();
    configurarGeneral();
    console.log("✅ Startpage inicializado correctamente");
}

// ============================================
// EJECUTAR AL CARGAR LA PÁGINA
// ============================================
window.onload = inicializar;
