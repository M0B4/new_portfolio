document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const project = projectData.find(p => p.id === projectId);

    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('detailTitle').innerText = project.title;
    document.getElementById('detailCat').innerText = project.category;
    document.getElementById('detailDesc').innerText = project.description;
    document.getElementById('detailMeta').innerText = project.details;
    document.getElementById('detailHero').style.backgroundImage = `linear-gradient(rgba(5,5,5,0.7), rgba(5,5,5,1)), url('${project.heroImage}')`;

    const grid = document.getElementById('subProjectGrid');
    grid.innerHTML = project.subProjects.map(sub => `
        <div class="sub-card">
            <img src="${sub.img}" alt="${sub.title}">
            <h4 style="margin-top: 1rem; font-family: 'Oswald';">${sub.title}</h4>
        </div>
    `).join('');
});