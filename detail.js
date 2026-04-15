document.addEventListener('DOMContentLoaded', () => {
    // 1. ID aus der URL holen
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    // 2. Daten für diese ID finden
    const project = projectData.find(p => p.id === projectId);

    if (!project) {
        window.location.href = 'index.html'; // Zurück, falls ID falsch
        return;
    }

    // 3. Seite befüllen
    document.title = `${project.title} | Visual Noise`;
    document.getElementById('detailTitle').innerText = project.title;
    document.getElementById('detailCat').innerText = project.category;
    document.getElementById('detailDesc').innerText = project.description;
    document.getElementById('detailMeta').innerText = project.details;

    // Hero Background
    document.getElementById('detailHero').style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('${project.heroImage}')`;

    // 4. Sub-Projekte laden (Die eigentlichen Arbeiten)
    const grid = document.getElementById('subProjectGrid');
    grid.innerHTML = project.subProjects.map(sub => `
        <div class="sub-card">
            <img src="${sub.img}" alt="${sub.title}" class="zoom-img">
            <div class="sub-info">
                <h4>${sub.title}</h4>
            </div>
        </div>
    `).join('');
});