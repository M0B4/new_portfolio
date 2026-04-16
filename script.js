document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HAMBURGER MENU LOGIC ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Schließen beim Klick auf einen Link (wichtig für Single Page)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });


    // --- 2. FILTER LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktiven Button stylen
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- 3. PROJECT OVERLAY (MODAL) LOGIC ---
    const overlay = document.querySelector('.project-overlay');
    const closeBtn = document.querySelector('.close-overlay');
    const overlayContent = document.querySelector('.overlay-content'); // Container im Modal

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            // ID oder Name des Projekts aus einem Data-Attribut holen
            const projectId = card.getAttribute('data-id');
            const projectData = projects.find(p => p.id === projectId); // Sucht in deiner data.js

            if (projectData) {
                renderProjectDetails(projectData);
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Scrollen verhindern
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Scrollen wieder erlauben
    });

    // Schließen bei Klick außerhalb des Contents
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });


    // --- 4. RENDER FUNCTION (Inhalt ins Modal schreiben) ---
    function renderProjectDetails(data) {
        // Hier wird das HTML für das Detail-Grid dynamisch generiert
        let imagesHTML = data.images.map(img => `
            <div class="sub-card">
                <img src="${img}" alt="${data.title}">
            </div>
        `).join('');

        overlayContent.innerHTML = `
            <div class="container">
                <h2 class="section-title">${data.title}</h2>
                <p style="margin-bottom: 2rem; color: var(--text-secondary); max-width: 800px;">
                    ${data.description}
                </p>
                <div class="sub-project-grid">
                    ${imagesHTML}
                </div>
            </div>
        `;
    }
});