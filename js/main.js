const container = document.getElementById('news-container');
const apiKey = '3aa99be2ffcc4c5e9e31ae85b2a989e6';

fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    container.innerHTML = '';

    if (data.articles.length === 0) {
      container.innerHTML = '<p>No news found.</p>';
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
        saved.push(article);
        localStorage.setItem('savedNews', JSON.stringify(saved));
        alert('Article saved!');
      });

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching news:', error);
    container.innerHTML = 'Failed to load news.';
  });


