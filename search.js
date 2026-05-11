(function () {
  const INDEX = [
    // about
    { title: 'about', snippet: 'electrical engineering student, University of Pennsylvania, mathematics, data science, control theory, communications', section: 'about', page: 'index.html' },

    // engineering
    { title: 'embedded systems project', snippet: 'embedded systems, C, PCB design, hardware', section: 'engineering', page: 'engineering_projects.html' },
    { title: 'control theory project', snippet: 'control theory, MATLAB, systems', section: 'engineering', page: 'engineering_projects.html' },
    { title: 'RF / communications project', snippet: 'RF, radio frequency, communications, Python, signal processing', section: 'engineering', page: 'engineering_projects.html' },

    // research
    { title: 'signal processing research', snippet: 'signal processing research project, 2024', section: 'research', page: 'research.html' },
    { title: 'controls research', snippet: 'controls, ongoing research project', section: 'research', page: 'research.html' },

    // creative
    { title: 'Bloomers Sketch Comedy', snippet: 'sketch comedy, lighting, set design, theatre', section: 'creative', page: 'creative.html' },
    { title: 'design / illustration', snippet: 'creative project, design, illustration, art', section: 'creative', page: 'creative.html' },
    { title: 'music', snippet: 'creative project, music, audio', section: 'creative', page: 'creative.html' },

    // photo gallery
    { title: 'Booz Allen presentation', snippet: 'top 5 project presentation at Booz Allen Hamilton', section: 'photo gallery', page: 'photo_gallery.html' },
    { title: 'SWE corporate dinner', snippet: 'SWE co-director, Society of Women Engineers corporate dinner', section: 'photo gallery', page: 'photo_gallery.html' },
    { title: 'Penn EWB', snippet: 'Penn Engineers Without Borders, president, new member introduction', section: 'photo gallery', page: 'photo_gallery.html' },
    { title: 'Penn SWE conference', snippet: 'Penn SWE conference, Society of Women Engineers', section: 'photo gallery', page: 'photo_gallery.html' },
    { title: 'Bloomers set & lights', snippet: 'running lights for Bloomers Sketch Comedy, building set', section: 'photo gallery', page: 'photo_gallery.html' },
    { title: 'SWE GEARS Day', snippet: 'panelist and EE workshop instructor at SWE GEARS Day', section: 'photo gallery', page: 'photo_gallery.html' },
  ];

  function search(query) {
    const q = query.toLowerCase().trim();
    if (q.length < 2) return [];
    return INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'search-wrapper';
    searchBox.parentNode.insertBefore(wrapper, searchBox);
    wrapper.appendChild(searchBox);

    const resultsEl = document.createElement('div');
    resultsEl.className = 'search-results';
    wrapper.appendChild(resultsEl);

    function showResults(items) {
      if (items.length === 0) {
        resultsEl.innerHTML = '<div class="search-no-results">no results</div>';
      } else {
        resultsEl.innerHTML = items.map(item =>
          `<div class="search-result-item" data-page="${item.page}">
            <div class="search-result-title">${item.title}</div>
            <div class="search-result-meta">${item.section}</div>
          </div>`
        ).join('');
        resultsEl.querySelectorAll('.search-result-item').forEach(el => {
          el.addEventListener('click', () => { window.location.href = el.dataset.page; });
        });
      }
      resultsEl.classList.add('open');
    }

    function hideResults() {
      resultsEl.classList.remove('open');
    }

    searchBox.addEventListener('input', () => {
      const q = searchBox.value;
      if (q.trim().length < 2) { hideResults(); return; }
      showResults(search(q));
    });

    searchBox.addEventListener('keydown', e => {
      if (e.key === 'Escape') { hideResults(); searchBox.blur(); }
    });

    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) hideResults();
    });
  });
})();
