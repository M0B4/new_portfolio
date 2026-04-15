// Projekt-Daten für das Modal
const projectData = [{
        id: 0,
        title: "Wacken Open Air 2026",
        category: "branding",
        client: "Wacken",
        thumbnail: "images/woa/woa_26_main.webp", // Das Bild für die Galerie
        desc: "Ganzheitliche Betreuung der Merch-Linie. Von der ersten Skizze bis zum fertigen Siebdruck.",
        // Hier liegen die einzelnen Unterprojekte:
        collection: [
            { img: "wacken-shirt-1.jpg", title: "Main Stage Shirt" },
            { img: "wacken-poster.jpg", title: "Limited Festival Poster" },
            { img: "wacken-band.jpg", title: "Official Wristband Design" }
        ]
    },
    {
        id: 1,
        title: "DLRG Prototyping",
        category: "3d-print",
        client: "DLRG",
        thumbnail: "dlrg-3d.jpg",
        desc: "Entwicklung und 3D-Druck von funktionalen Gehäuseteilen für Rettungsausrüstung.",
        collection: [
            { img: "dlrg-model-1.jpg", title: "Gehäuse-Prototyp" },
            { img: "dlrg-model-2.jpg", title: "Detailansicht Mechanik" }
        ]
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