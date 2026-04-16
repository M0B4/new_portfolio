document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENTE AUS DEM HTML HOLEN ---
    const galleryGrid = document.querySelector('.gallery-grid');
    const overlay = document.querySelector('.project-overlay');
    const overlayContent = document.querySelector('.overlay-content');
    const closeBtn = document.querySelector('.close-overlay');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    console.log("DOM geladen. Starte Initialisierung...");

    // --- 2. INITIALISIERUNG DER GALERIE ---
    function initGallery() {
        // Prüfen, ob die Datenquelle 'projects' überhaupt existiert
        if (typeof projects === 'undefined') {
            console.error("FEHLER: 'projects' ist nicht definiert. Check deine data.js!");
            return;
        }

        console.log("Daten gefunden. Anzahl der Projekte:", projects.length);

        if (!galleryGrid) {
            console.error("FEHLER: Container '.gallery-grid' wurde im HTML nicht gefunden!");
            return;
        }

        // Falls das Array leer ist, zeigen wir eine kleine Meldung
        if (projects.length === 0) {
            galleryGrid.innerHTML = "<p>Keine Projekte in der data.js gefunden.</p>";
            return;
        }

        // Projekte ins HTML schreiben
        galleryGrid.innerHTML = projects.map(project => `
            <div class="project-card ${project.category}" data-id="${project.id}">
                <div class="card-image">
                    <img src="${project.previewImage}" alt="${project.title}" ">
                </div>
                <div class="card-info">
                    <h3>${project.title}</h3>
                    <span>${project.category.replace('-', ' ').toUpperCase()}</span>
                </div>
            </div>
        `).join('');

        console.log("Galerie erfolgreich befüllt.");
        attachCardListeners();
    }

    // --- 3. FILTER LOGIK ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.display = 'none';
                }
            });
            console.log("Filter angewendet:", filterValue);
        });
    });

    // --- 4. OVERLAY / MODAL LOGIK ---
    function attachCardListeners() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-id');
                const projectData = projects.find(p => p.id === projectId);

                if (projectData) {
                    openOverlay(projectData);
                }
            });
        });
    }

    function openOverlay(data) {
        const imagesHTML = data.images.map(img => `
            <div class="sub-card">
                <img src="${img}" alt="${data.title}" ">
            </div>
        `).join('');

        overlayContent.innerHTML = `
            <div class="container">
                <h2 class="section-title">${data.title}</h2>
                <p style="margin-bottom: 3rem; color: var(--text-secondary); max-width: 800px;">
                    ${data.description}
                </p>
                <div class="sub-project-grid">
                    ${imagesHTML}
                </div>
            </div>
        `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
    });

    // --- 5. MOBILE NAVIGATION ---
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- START ---
    initGallery();
});