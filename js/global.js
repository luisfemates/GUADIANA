document.addEventListener('DOMContentLoaded', () => {

    // 0.FORZAR VISTA DE ESCRITORIO EN MÓVILES (En un solo lugar)
(function() {
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
        metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        document.head.appendChild(metaViewport);
    }
    // Asigna el ancho fijo de PC (puedes cambiar 1200 por 980 si lo ves muy alejado)
    metaViewport.content = 'width=980';
})();

    // 1. Detección segura de subcarpetas (/eso/, /bach/, /extra/)
    const path = window.location.pathname.replace(/\\/g, '/');
    const isSubfolder = /\/(eso|bach|extra)\/[^\/]+$/i.test(path);
    const root = isSubfolder ? '../' : './';

    // 2. Inyectar Cabecera de forma automática al inicio del <body>
    const headerHTML = `
        <header class="header-education">
            <div class="main-header">
                <div class="header-container">
                    <a href="${root}index.html" class="logo">
                        <div class="logo-icon">∑</div>
                        <div>
                            <div class="brand-name">Matemáticas - Luis Felipe <span class="brand-tag">ESO & Bach</span></div>
                            <div class="brand-sub">IES GUADIANA</div>
                        </div>
                    </a>
                    
                    <div class="header-actions">
                        <a href="${root}index.html" class="btn-header btn-fill">
                            <span>🏠</span> Inicio / Menú
                        </a>
                    </div>
                </div>
            </div>
        </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 3. DATOS DEL MENÚ (Estructura JSON/Array)
    const menuData = [
    {
        "id": "eso-1-2",
        "title": "1º y 2º de ESO",
        "icon": "📐",
        "topics": [
            {
                "title": "Números enteros",
                "url": "eso/enteros.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Fracciones y decimales",
                "url": "eso/fracciones.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Proporcionalidad",
                "url": "eso/proporcionalidad.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Áreas y Perímetros",
                "url": "eso/geometria-plana.html",
                "tag": "Geometría",
                "tagClass": "tag-geo"
            }
        ]
    },
    {
        "id": "eso-3-4",
        "title": "3º y 4º de ESO",
        "icon": "📊",
        "topics": [
            {
                "title": "Polinomios",
                "url": "eso/polinomios.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Ecuaciones de 2º Grado",
                "url": "eso/ecuaciones.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Funciones lineales",
                "url": "eso/funciones.html",
                "tag": "Análisis",
                "tagClass": "tag-ana"
            },
            {
                "title": "Trigonometría inicial",
                "url": "eso/trigonometria.html",
                "tag": "Geometría",
                "tagClass": "tag-geo"
            }
        ]
    },
    {
        "id": "bach-1",
        "title": "1º de Bachillerato",
        "icon": "✏️",
        "topics": [
            {
                "title": "Trigonometría",
                "url": "bach/trigonometria.html",
                "tag": "Geometría",
                "tagClass": "tag-geo"
            },
            {
                "title": "Límites y continuidad",
                "url": "bach/limites.html",
                "tag": "Análisis",
                "tagClass": "tag-ana"
            },
            {
                "title": "Iniciación a Derivadas",
                "url": "bach/derivadas.html",
                "tag": "Análisis",
                "tagClass": "tag-ana"
            },
            {
                "title": "Vectores en el plano",
                "url": "bach/vectores.html",
                "tag": "Geometría",
                "tagClass": "tag-geo"
            }
        ]
    },
    {
        "id": "bach-2",
        "title": "2º Bachillerato / PAU",
        "icon": "🎓",
        "topics": [
            {
                "title": "Matrices y Determinantes",
                "url": "bach/matrices.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Sistemas de Ecuaciones",
                "url": "bach/sistemas-gauss.html",
                "tag": "Álgebra",
                "tagClass": "tag-alg"
            },
            {
                "title": "Cálculo Integral",
                "url": "bach/integrales.html",
                "tag": "Análisis",
                "tagClass": "tag-ana"
            },
            {
                "title": "Geometría en el Espacio",
                "url": "bach/geometria-3d.html",
                "tag": "Geometría",
                "tagClass": "tag-geo"
            }
        ]
    },
    {
        "id": "extra",
        "title": "Exámenes y Fórmulas",
        "icon": "📝",
        "topics": [
            {
                "title": "Formulario PAU Completo",
                "url": "extra/formulario.html"
            },
            {
                "title": "Modelos de Examen Resueltos",
                "url": "extra/examenes-resueltos.html"
            }
        ]
    }
];

    // 4. Inyectar la barra lateral (Sidebar) mediante mapeo dinámico
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        const groupsHTML = menuData.map(group => {
            // Verificar si la página actual pertenece a este grupo para auto-desplegarlo
            const hasActivePage = group.topics.some(topic => path.endsWith(topic.url));
            const isOpenAttribute = hasActivePage ? 'open' : '';

            const topicsHTML = group.topics.map(topic => {
                const isActive = path.endsWith(topic.url);
                const activeClass = isActive ? 'class="active-topic"' : '';
                const tagSpan = topic.tag 
                    ? `<span class="tag-micro ${topic.tagClass}">${topic.tag}</span>` 
                    : '';

                return `
                    <li>
                        <a href="${root}${topic.url}" ${activeClass}>
                            <span>${topic.title}</span>
                            ${tagSpan}
                        </a>
                    </li>
                `;
            }).join('');

            return `
                <div class="menu-group">
                    <details ${isOpenAttribute}>
                        <summary>
                            <span class="summary-title"><span>${group.icon}</span> ${group.title}</span>
                        </summary>
                        <ul class="topic-links">
                            ${topicsHTML}
                        </ul>
                    </details>
                </div>
            `;
        }).join('');

        const sidebarHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <span>📚</span> Índice de Unidades
                </div>
                ${groupsHTML}
            </aside>
        `;
        sidebarContainer.innerHTML = sidebarHTML;
    }

    // 5. Inyectar Pie de página (Footer) al final del <body>
    const footerHTML = `
        <footer style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); font-size: 0.85rem; border-top: 1px solid var(--border); margin-top: 3rem;">
            <p>© Luis Felipe Del Río López</p>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // 6. Cargar KaTeX dinámicamente
    const katexCSS = document.createElement('link');
    katexCSS.rel = 'stylesheet';
    katexCSS.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
    document.head.appendChild(katexCSS);

    const katexJS = document.createElement('script');
    katexJS.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
    katexJS.onload = () => {
        const renderJS = document.createElement('script');
        renderJS.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js';
        renderJS.onload = () => {
            if (window.renderMathInElement) {
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError: false
                });
            }
        };
        document.head.appendChild(renderJS);
    };
    document.head.appendChild(katexJS);
});
