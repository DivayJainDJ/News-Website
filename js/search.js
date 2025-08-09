const container = document.getElementById('news-container');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const apiKey = '3aa99be2ffcc4c5e9e31ae85b2a989e6';

searchBtn.addEventListener('click', () => {
  const keyword = searchInput.value.trim();

  if (keyword === '') {
    container.innerHTML = '<p>Please enter a keyword.</p>';
    return;
  }

  container.innerHTML = 'Searching...';

  fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      container.innerHTML = '';

      if (data.articles.length === 0) {
        container.innerHTML = '<p>No news found for this keyword.</p>';
        return;
      }

      data.articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';

        card.innerHTML = `
          <img src="${article.urlToImage || ''}" alt="news image">
          <h3>${article.title}</h3>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <button class="save-btn">Save</button>
        `;

        const saveBtn = card.querySelector('.save-btn');
        saveBtn.addEventListener('click', () => {
          let saved = JSON.parse(localStorage.getItem('savedNews')) || [];

          // Optional: Avoid duplicates
          if (!saved.some(item => item.url === article.url)) {
            saved.push(article);
            localStorage.setItem('savedNews', JSON.stringify(saved));
            alert('Article saved!');
          } else {
            alert('Article already saved.');
          }
        });

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      container.innerHTML = 'Failed to load news.';
    });
});

