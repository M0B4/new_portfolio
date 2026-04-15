// Projekt-Daten für das Modal
const projectData = [{
        title: "Wacken Tour 2026",
        category: "Apparel",
        desc: "Exklusives T-Shirt Design für die Mainstage. Fokus auf industrielle Typografie und handgezeichnete Illustrationen.",
        meta: "Kunde: Wacken Open Air | Medium: 5-Farben Siebdruck"
    },
    {
        title: "Void Ritual Poster",
        category: "Print",
        desc: "Limitiertes Gig-Poster für die Europa-Tour. Gedruckt auf 300g ungestrichenem Papier für eine raue Haptik.",
        meta: "Auflage: 100 Stück | Format: A2 Siebdruck"
    },
    {
        title: "Iron Forge Identity",
        category: "Branding",
        desc: "Ganzheitliches Corporate Design für eine Metal-Schmiede. Logo, Typografie und Web-Assets.",
        meta: "Umfang: Brand Guide, Social Media, Web"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.modal-close');

    // --- Filter Logik ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktiven Button stylen
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    // Kleiner Delay für Fade-In Effekt
                    setTimeout(() => project.style.opacity = '1', 10);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 400);
                }
            });
        });
    });

    // --- Modal Logik ---
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const id = project.getAttribute('data-id');
            const data = projectData[id];
            const imgSrc = project.querySelector('img').src;

            // Modal füllen
            document.getElementById('modalImg').src = imgSrc;
            document.getElementById('modalTitle').innerText = data.title;
            document.getElementById('modalCat').innerText = data.category;
            document.getElementById('modalDesc').innerText = data.desc;
            document.getElementById('modalMeta').innerText = data.meta;

            // Modal anzeigen
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Scrollen verhindern
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Schließen bei Klick außerhalb des Modals
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // --- Simple Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Transmission received. Stay heavy!');
            contactForm.reset();
        });
    }
});