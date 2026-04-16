document.addEventListener('DOMContentLoaded', () => {

    const galleryGrid = document.querySelector('.gallery-grid');
    const overlay = document.querySelector('.project-overlay');
    const overlayContent = document.querySelector('.overlay-content');
    const closeBtn = document.querySelector('.close-overlay');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // --- 1. INITIALISIERUNG DER GALERIE ---
    // Diese Funktion baut die Projektkarten beim Laden der Seite zusammen
    function initGallery() {
        if (!galleryGrid || typeof projects === 'undefined') return;

        galleryGrid.innerHTML = projects.map(project => `
            <div class="project-card ${project.category}" data-id="${project.id}">
                <div class="card-image">
                    <img src="${project.previewImage}" alt="${project.title}">
                </div>
                <div class="card-info">
                    <h3>${project.title}</h3>
                    <span>${project.category.replace('-', ' ').toUpperCase()}</span>
                </div>
            </div>
        `).join('');

        // Event-Listener für die neu erstellten Karten hinzufügen
        attachCardListeners();
    }

    // --- 2. FILTER LOGIK ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktiven Button-Style umschalten
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    // Kleiner Fade-In Effekt
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. OVERLAY / MODAL LOGIK ---
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
        // Generiere das HTML für die Detailansicht (Unterprojekte/Bilder)
        const imagesHTML = data.images.map(img => `
            <div class="sub-card">
                <img src="${img}" alt="${data.title}">
            </div>
        `).join('');

        overlayContent.innerHTML = `
            <div class="container">
                <h2 class="section-title">${data.title}</h2>
                <p style="margin-bottom: 3rem; color: var(--text-secondary); max-width: 800px; font-size: 1.1rem;">
                    ${data.description}
                </p>
                <div class="sub-project-grid">
                    ${imagesHTML}
                </div>
            </div>
        `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Scrollen der Hauptseite verhindern
    }

    // Schließen Funktionen
    closeBtn.addEventListener('click', closeOverlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
    });

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // --- 4. MOBILE NAVIGATION ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Menü schließen wenn ein Link geklickt wird
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Escape-Taste schließt das Overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });

    // Start der Galerie
    initGallery();
});