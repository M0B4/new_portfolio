/**
 * PURE METAL PORTFOLIO - CORE SCRIPT
 * Feature: Data-Driven Gallery & Multi-Image Modal System
 */

// 1. DATASET: Hier fügst du deine Kunden und Projekte hinzu
const projectData = [{
        id: 0,
        title: "Wacken Open Air 2026",
        client: "Wacken",
        category: "branding",
        thumbnail: "images/woa/woa_26_main.webp",
        desc: "Ganzheitliche Betreuung der Merch-Linie für die 'Harder & Louder' Stage. Fokus auf okkulte Symbolik und verwitterte Texturen.",
        meta: "Technik: 5-Farben Siebdruck, Vektorgrafik",
        collection: [
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop", // Erstes Bild (Main)
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop", // Shirt-Detail
            "https://images.unsplash.com/photo-1514525253344-9914ef2b7d3c?q=80&w=1000&auto=format&fit=crop" // Wristband
        ]
    },
    {
        id: 1,
        title: "DLRG Search & Rescue",
        client: "DLRG",
        category: "3d-print",
        thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop",
        desc: "Entwicklung von funktionalen Gehäuse-Prototypen für maritime Rettungssensoren. Maximale Stabilität bei minimalem Gewicht.",
        meta: "Material: Carbon-verstärktes PETG | Druckzeit: 48h",
        collection: [
            "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        title: "Void Ritual Poster",
        client: "Independent",
        category: "print",
        thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
        desc: "Limitiertes Tour-Poster für die 'Occult Noise' Tour. Handgezeichnete Illustration kombiniert mit industrieller Typografie.",
        meta: "Papier: 300g Rough Charcoal | Auflage: 50 Stück",
        collection: [
            "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
        ]
    }
];

// 2. DOM ELEMENTS
const gallery = document.getElementById('gallery');
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCat = document.getElementById('modalCat');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');
const closeModalBtn = document.querySelector('.modal-close');
const filterBtns = document.querySelectorAll('.filter-btn');

/**
 * RENDER GALLERY
 * Erstellt die HTML-Karten basierend auf dem projectData Array
 */
function renderGallery(filter = 'all') {
    gallery.innerHTML = ''; // Clear gallery

    const filteredProjects = filter === 'all' ?
        projectData :
        projectData.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
            </div>
            <div class="card-info">
                <h3>${project.title}</h3>
                <span>${project.category}</span>
            </div>
        `;
        card.addEventListener('click', () => openModal(project.id));
        gallery.appendChild(card);
    });
}

/**
 * MODAL LOGIC
 */
function openModal(id) {
    const project = projectData.find(p => p.id === id);
    if (!project) return;

    // Standard-Inhalte setzen
    modalImg.src = project.thumbnail;
    modalTitle.innerText = project.title;
    modalCat.innerText = project.category;
    modalDesc.innerText = project.desc;

    // Meta-Infos & Collection Thumbnails
    modalMeta.innerHTML = ''; // Reset meta

    // Falls es eine Kollektion gibt: Thumbnails zum Wechseln erstellen
    if (project.collection && project.collection.length > 1) {
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'modal-thumbnails';
        // Style-Hinweis: Diese Klasse müsste in der style.css definiert werden (siehe unten)

        project.collection.forEach(imgUrl => {
            const thumb = document.createElement('img');
            thumb.src = imgUrl;
            thumb.className = 'mini-thumb';
            thumb.addEventListener('click', () => {
                modalImg.src = imgUrl;
                // Aktives Thumbnail markieren
                document.querySelectorAll('.mini-thumb').forEach(t => t.style.borderColor = '#252525');
                thumb.style.borderColor = '#8b0000';
            });
            thumbContainer.appendChild(thumb);
        });

        modalMeta.appendChild(thumbContainer);
    }

    // Zusätzliche Text-Meta hinzufügen
    const metaText = document.createElement('p');
    metaText.style.marginTop = '1rem';
    metaText.style.fontSize = '0.75rem';
    metaText.style.color = '#666';
    metaText.innerText = project.meta;
    modalMeta.appendChild(metaText);

    // Anzeigen
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Scroll-Lock
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Scroll-Unlock
}

/**
 * FILTER LOGIC
 */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // UI Update
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Gallery Update
        const filter = btn.getAttribute('data-filter');
        renderGallery(filter);
    });
});

/**
 * SMOOTH SCROLLING für Anker-Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// EVENT LISTENERS
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
});