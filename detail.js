// detail.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. ID aus der URL holen (z.B. ?id=wacken)
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    // 2. Das passende Projekt in der data.js finden
    const project = projectData.find(p => p.id === projectId);

    // Falls kein Projekt gefunden wurde, zurück zur Startseite
    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    // 3. Inhalte in die Seite schreiben
    document.title = `${project.title} | Visual Noise`;
    document.getElementById('detailTitle').innerText = project.title;
    document.getElementById('detailCat').innerText = project.category;
    document.getElementById('detailDesc').innerText = project.description;
    document.getElementById('detailMeta').innerText = project.details;

    // Hero-Hintergrund setzen
    const hero = document.getElementById('detailHero');
    if (hero) {
        hero.style.backgroundImage = `linear-gradient(rgba(5,5,5,0.7), rgba(5,5,5,1)), url('${project.heroImage}')`;
    }

    // 4. Sub-Projekte (die eigentlichen Bilder) laden
    const grid = document.getElementById('subProjectGrid');
    if (grid && project.subProjects) {
        grid.innerHTML = project.subProjects.map(sub => `
            <div class="sub-card">
                <div class="sub-card-img">
                    <img src="${sub.img}" alt="${sub.title}" loading="lazy">
                </div>
                <div class="sub-card-info">
                    <h4>${sub.title}</h4>
                </div>
            </div>
        `).join('');
    }
});