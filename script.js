document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 1. Galerie Initialisierung (Rein visuell)
    function initGallery() {
        if (!galleryGrid || typeof projects === 'undefined') return;

        galleryGrid.innerHTML = projects.map(p => `
            <div class="project-card ${p.category}">
                <div class="card-image"><img src="${p.previewImage}" alt="${p.title}"></div>
                <div class="card-info">
                    <h3>${p.title}</h3>
                    <span>${p.category.toUpperCase()}</span>
                </div>
            </div>
        `).join('');
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

    // 3. Mobile Nav Logik (Hamburger & Auto-Close)
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    initGallery();
});