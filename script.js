document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Hamburger Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Galerie rendern
    function renderGallery(filter = 'all') {
        if (!gallery) return;
        gallery.innerHTML = '';
        const filtered = filter === 'all' ? projectData : projectData.filter(p => p.category === filter);

        filtered.forEach(p => {
            const card = document.createElement('a');
            card.href = `detail.html?id=${p.id}`;
            card.className = 'project-card';
            card.innerHTML = `
                <div class="card-image"><img src="${p.thumbnail}" alt="${p.title}"></div>
                <div class="card-info"><h3>${p.title}</h3><span>${p.category}</span></div>
            `;
            gallery.appendChild(card);
        });
    }

    // Filter Event
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });

    renderGallery();
});