document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const overlay = document.querySelector('.project-overlay');
    const overlayContent = document.querySelector('.overlay-content');
    const closeBtn = document.querySelector('.close-overlay');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // 1. Initialisierung der Galerie
    function initGallery() {
        if (!galleryGrid || typeof projects === 'undefined') return;

        galleryGrid.innerHTML = projects.map(p => `
            <div class="project-card ${p.category}" data-id="${p.id}">
                <div class="card-image"><img src="${p.previewImage}" alt="${p.title}"></div>
                <div class="card-info">
                    <h3>${p.title}</h3>
                    <span>${p.category.replace('-', ' ').toUpperCase()}</span>
                </div>
            </div>
        `).join('');

        attachListeners();
    }

    // 2. Filter Logik
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-filter');

            document.querySelectorAll('.project-card').forEach(card => {
                card.style.display = (val === 'all' || card.classList.contains(val)) ? 'block' : 'none';
            });
        });
    });

    // 3. Overlay Logik
    function attachListeners() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const data = projects.find(p => p.id === card.getAttribute('data-id'));
                if (data) openOverlay(data);
            });
        });
    }

    function openOverlay(data) {
        const imgs = data.images.map(img => `<div class="sub-card"><img src="${img}"></div>`).join('');
        overlayContent.innerHTML = `
            <div class="container">
                <h2 class="section-title">${data.title}</h2>
                <p style="margin-bottom:3rem; color:var(--text-secondary); max-width:800px; font-size:1.1rem;">${data.description}</p>
                <div class="sub-project-grid">${imgs}</div>
            </div>
        `;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // 4. Mobile Nav Logik (Hamburger & Auto-Close)
    if (hamburger && navLinks) {
        // Öffnen/Schließen per Klick auf den Hamburger
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // NEU: Menü schließen, wenn ein Link geklickt wird
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    initGallery();
});