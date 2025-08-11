const container = document.getElementById('news-container');
const apiKey = '3aa99be2ffcc4c5e9e31ae85b2a989e6';

function createNewsCard(article) {
  const card = document.createElement('div');
  card.className = 'news-card';


  card.innerHTML = `
    <img src="${article.urlToImage || ''}" alt="news image">
    <div class="news-card-content">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <div class="card-actions">
        <a href="${article.url}" target="_blank" class="read-more">Read More</a>
        <button class="save-btn">Save</button>
      </div>
    </div>
  `;
  
  return card;
}

function showSavedMessage(button) {
  const originalText = button.textContent;
  button.textContent = 'Saved!';
  button.style.background = '#27ae60';
  
  setTimeout(function() {
    button.textContent = originalText;
    button.style.background = '';
  }, 2000);
}

function loadNews() {
  container.innerHTML = '<div class="loading">Loading news...</div>';
  
  fetch('/.netlify/functions/fetchNews')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      container.innerHTML = '';

      if (data.articles.length === 0) {
        container.innerHTML = '<div class="loading">No news found.</div>';
        return;
      }

      data.articles.forEach(function(article) {
        const card = createNewsCard(article);
        
        const saveButton = card.querySelector('.save-btn');
        saveButton.addEventListener('click', function() {
          let savedArticles = JSON.parse(localStorage.getItem('savedNews')) || [];
          savedArticles.push(article);
          localStorage.setItem('savedNews', JSON.stringify(savedArticles));
          showSavedMessage(saveButton);
          console.log('Article saved!');
        });

        container.appendChild(card);
      });
    })
    .catch(function(error) {
      console.error('Error loading news:', error);
      container.innerHTML = '<div class="loading">Failed to load news. Please try again.</div>';
    });
}

loadNews();