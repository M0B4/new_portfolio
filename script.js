// script.js

// Die Variable 'projectData' kommt jetzt automatisch aus der data.js!

const gallery = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGallery(filter = 'all') {
    if (!gallery) return;
    gallery.innerHTML = '';

    const filtered = filter === 'all' ?
        projectData :
        projectData.filter(p => p.category === filter);

    filtered.forEach(project => {
        const card = document.createElement('a');
        card.href = `detail.html?id=${project.id}`;
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
        gallery.appendChild(card);
    });
}

// Filter Logik
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        renderGallery(category);
    });
});

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
});