const projectData = [{
        id: 0,
        title: "Wacken 2026",
        category: "branding",
        thumbnail: "images/woa/woa_26_main.webp", // Dieses Bild erscheint in der Galerie
        desc: "Komplettes Merch-Paket für das Wacken 2026.",
        collection: [
            "images/wacken-shirt.jpg",
            "images/wacken-poster.jpg",
            "images/wacken-wristband.jpg"
        ]
    },
    {
        id: 1,
        title: "DLRG 3D-Druck",
        category: "3d-print",
        thumbnail: "images/dlrg-cover.jpg",
        desc: "Technische Prototypen für Rettungsausrüstung.",
        collection: ["images/dlrg-detail-1.jpg"]
    }
];

// Funktion, um die Galerie beim Laden der Seite zu bauen
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = projectData.map(project => `
        <div class="project-card" data-category="${project.category}" onclick="openModal(${project.id})">
            <div class="card-image">
                <img src="${project.thumbnail}" alt="${project.title}">
            </div>
            <div class="card-info">
                <h3>${project.title}</h3>
                <span>${project.category}</span>
            </div>
        </div>
    `).join('');
}

// Modal öffnen und Kollektion anzeigen
function openModal(id) {
    const project = projectData[id];
    const modal = document.getElementById('projectModal');

    // Hauptbild im Modal ist das erste aus der Kollektion oder das Thumbnail
    document.getElementById('modalImg').src = project.collection[0] || project.thumbnail;
    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalDesc').innerText = project.desc;

    // Wenn es mehrere Bilder gibt, erstelle eine kleine Thumbnail-Leiste im Modal
    const metaContainer = document.getElementById('modalMeta');
    if (project.collection.length > 1) {
        metaContainer.innerHTML = project.collection.map(img => `
            <img src="${img}" onclick="document.getElementById('modalImg').src='${img}'" 
                 style="width:60px; height:60px; object-fit:cover; cursor:pointer; border:1px solid #252525;">
        `).join('');
    } else {
        metaContainer.innerHTML = "";
    }

    modal.classList.add('active');
}

// Initialer Aufruf
document.addEventListener('DOMContentLoaded', renderGallery);