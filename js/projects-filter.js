// Projects Filter - Load from JSON, filter by category, render dynamically

document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.getElementById('projectsGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if(!projectsGrid) return;

  let allProjects = [];

  // Fetch projects from JSON
  fetch('portfolio/projects.json')
    .then(response => {
      if(!response.ok) throw new Error('Failed to load projects');
      return response.json();
    })
    .then(data => {
      allProjects = data;
      renderProjects(allProjects);
      setupFilterButtons();
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      projectsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">Could not load projects. Please refresh the page.</p>';
    });

  // Render projects to the grid
  function renderProjects(projects) {
    if(projects.length === 0) {
      projectsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No projects found in this category.</p>';
      return;
    }

    projectsGrid.innerHTML = projects.map(project => `
      <article class="project-card reveal">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="meta">
          <strong>Tools:</strong> ${project.tools}<br>
          <strong>Focus:</strong> ${project.focus}
        </div>
        <div class="proj-actions">
          ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener">Live Demo</a>` : ''}
        </div>
      </article>
    `).join('');

    // Re-trigger reveal animations for newly rendered elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });
  }

  // Setup filter buttons
  function setupFilterButtons() {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filter = button.dataset.filter;
        let filtered = allProjects;

        if(filter !== 'all') {
          filtered = allProjects.filter(project => 
            project.category === filter || 
            (project.tags && project.tags.includes(filter))
          );
        }

        renderProjects(filtered);
      });
    });
  }
});
