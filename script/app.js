// ========================================
// Configuración inicial
// ========================================
const DEFAULT_BOOKMARKS = [
  // Búsqueda / IA
  { href: "https://google.com/", title: "Google", category: "IA / Búsqueda" },
  { href: "https://chatgpt.com/", title: "ChatGPT", category: "IA / Búsqueda", color: "white" },
  { href: "https://gemini.google.com/", title: "Gemini", category: "IA / Búsqueda" },
  { href: "https://claude.ai/new", title: "Claude", category: "IA / Búsqueda" },
  { href: "https://www.meta.ai/", title: "Meta_IA", category: "IA / Búsqueda", color: "white" },
  { href: "https://copilot.microsoft.com/", title: "Copilot", category: "IA / Búsqueda", color: "white" },
  { href: "https://notebooklm.google.com/notebook/", title: "NotebookLM", category: "IA / Búsqueda", color: "white" },

    // Organización / universi
  { href: "https://www.virtualunimayor.edu.co/login/index.php", title: "Virtual_Unimayor", category: "Universidad" },
  { href: "https://campus2.unimayor.edu.co/CampusConsultaNotas/Inicio/wfInicio.aspx", title: "Campus_Unimayor", category: "Universidad" },
  { href: "https://www.notion.so/", title: "Notion", category: "Universidad" },
  { href: "https://calendar.notion.so/", title: "Calendar", category: "Universidad" },
  { href: "https://drive.google.com/drive/", title: "Drive", category: "Universidad" },
  { href: "https://www.canva.com/", title: "Canva", category: "Universidad", color: "white" },
  { href: "https://es.overleaf.com", title: "Overleaf", category: "Universidad", color: "white" },

  // Redes sociales
  { href: "https://mail.google.com/mail/u/1/?pli=1#inbox", title: "Gmail", category: "Redes Sociales" },
  { href: "https://outlook.live.com/mail/0/", title: "Outlook", category: "Redes Sociales" },
  { href: "https://web.whatsapp.com/", title: "WhatsApp", category: "Redes Sociales" },
  { href: "https://web.telegram.org/a/", title: "Telegram", category: "Redes Sociales" },
  { href: "https://www.instagram.com/", title: "Instagram", category: "Redes Sociales" },
  { href: "https://www.facebook.com/", title: "Facebook", category: "Redes Sociales" },
  { href: "https://www.reddit.com/", title: "Reddit", category: "Redes Sociales" },


  // Productividad / herramientas
  { href: "https://github.com/cristianperea88", title: "GitHub", category: "Productividad", color: "white" },
  { href: "https://onedrive.live.com/?view=1", title: "OneDrive", category: "Productividad" },
  { href: "https://www.terabox.com/main?category=all", title: "TeraBox", category: "Productividad" },
  { href: "https://www.pdf24.org/", title: "PDF24", category: "Productividad", color: "white" },
  { href: "https://www.ilovepdf.com/es", title: "iLovePDF", category: "Productividad", color: "white" },
  { href: "https://www.iloveimg.com/es", title: "iLoveIMG", category: "Productividad", color: "white" },
  { href: "https://pinterest.com/", title: "Pinterest", category: "Productividad" },
];

const THEMES = ['light', 'dark'];

// ========================================
// Bookmarks
// ========================================
const getStoredBookmarks = () => {
  try {
    const stored = localStorage.getItem('bookmarks');
    return stored ? JSON.parse(stored) : DEFAULT_BOOKMARKS;
  } catch {
    return DEFAULT_BOOKMARKS;
  }
};

const generateBookmarks = () => {
  const container = document.getElementById('bookmarks');
  container.innerHTML = '';

  const bookmarks = getStoredBookmarks();

  // Agrupar por categoría
  const categories = {};
  bookmarks.forEach(bookmark => {
    if (!bookmark.href || !bookmark.title) return;
    const cat = bookmark.category || 'Sin Categoría';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(bookmark);
  });

  const categoryNames = Object.keys(categories);

  categoryNames.forEach((categoryName, index) => {
    const section = document.createElement('div');
    section.className = 'bookmark-section';

    const color = RAINBOW_COLORS[index % RAINBOW_COLORS.length];

    // Título con color
    const title = document.createElement('h2');
    title.textContent = categoryName;
    title.style.color = color;          // color arcoíris
    title.style.textAlign = 'center';   // centrado horizontal
    title.style.marginBottom = '16px';  // separa del listado
    
    section.appendChild(title);

    const ul = document.createElement('ul');
    categories[categoryName].forEach(bookmark => {
      const li = document.createElement('li');
      // Generar nombre de archivo del logo
const logoFileName = bookmark.title.toLowerCase().replace(/\s+/g, '') + '.svg';
const logoPath = `icon/${logoFileName}`;

li.innerHTML = `
  <a href="${bookmark.href}" class="bookmark-link" target="_blank" rel="noopener noreferrer">
    <img src="${logoPath}" alt="${bookmark.title} logo" width="24" height="24" style="border-radius:4px;">
    <span>${bookmark.title}</span>
  </a>
`;


      ul.appendChild(li);

      // Tomamos el link y le agregamos el hover dinámico
      const link = li.querySelector('a');
      const originalBg = getComputedStyle(link).backgroundColor;

      link.addEventListener('mouseover', () => {
        link.style.backgroundColor = color + '33'; // color semi-transparente
      });

      link.addEventListener('mouseout', () => {
        link.style.backgroundColor = originalBg;
      });
    });

    section.appendChild(ul);
    container.appendChild(section);
  });
};


const RAINBOW_COLORS = [
  '#F35044', // rojo
  '#E5AA1F', // amarillo
  '#2EA873', // verde
  '#4DB2D1', // azul
  '#8A87D9', // morado
  '#EB6A14', // naranja
  '#2EA873'  // turquesa
];



// ========================================
// Tema
// ========================================
const getStoredTheme = () => localStorage.getItem('theme') || 'light';

const loadTheme = () => {
  const theme = getStoredTheme();
  THEMES.forEach(t => document.documentElement.classList.remove(`${t}-mode`));
  if (theme !== 'light') document.documentElement.classList.add(`${theme}-mode`);
  
};

// ========================================
// Inicialización
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  generateBookmarks();
});

// ========================================
// Cambio de tema
// ========================================
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  document.documentElement.classList.remove(`${currentTheme}-mode`);
  document.documentElement.classList.add(`${newTheme}-mode`);
  localStorage.setItem('theme', newTheme);

  // Cambiar ícono
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Inicializa ícono al cargar
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  generateBookmarks();
  const savedTheme = localStorage.getItem('theme') || 'light';
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
});



const terminalInput = document.getElementById('terminal-input');

  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // evita que el formulario haga submit por defecto
      const query = terminalInput.value.trim();
      if (query) {
        // Redirige a Google con la búsqueda
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, '_blank'); // abre en nueva pestaña
        terminalInput.value = ''; // limpia la terminal
      }
    }
  });


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
    contenedorReloj.innerHTML = `${horas}:${minutos} ${ampm}`;
    
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
        : "url('icons/wallpaper.jpeg')";
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