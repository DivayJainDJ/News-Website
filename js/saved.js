const container = document.getElementById('news-container');

function createSavedCard(article, index) {
  const card = document.createElement('div');
  card.className = 'news-card';

  card.innerHTML = `
    <img src="${article.urlToImage || ''}" alt="news image">
    <div class="news-card-content">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <div class="card-actions">
        <a href="${article.url}" target="_blank" class="read-more">Read More</a>
        <button class="remove-btn">Remove</button>
      </div>
    </div>
  `;
  
  return card;
}

function removeArticle(index, cardElement) {
  let savedArticles = JSON.parse(localStorage.getItem('savedNews')) || [];
  savedArticles.splice(index, 1);
  localStorage.setItem('savedNews', JSON.stringify(savedArticles));
  cardElement.remove();
  
  if (savedArticles.length === 0) {
    container.innerHTML = '<div class="loading">No saved articles.</div>';
  }
  
  console.log('Article removed');
}

function loadSavedArticles() {
  container.innerHTML = '<div class="loading">Loading saved articles...</div>';
  
  let savedArticles = JSON.parse(localStorage.getItem('savedNews')) || [];

  container.innerHTML = '';

  if (savedArticles.length === 0) {
    container.innerHTML = '<div class="loading">No saved articles yet.</div>';
    return;
  }

  for (let i = 0; i < savedArticles.length; i++) {
    const article = savedArticles[i];
    const card = createSavedCard(article, i);
    
    const removeButton = card.querySelector('.remove-btn');
    removeButton.addEventListener('click', function() {
      const confirmRemove = confirm('Are you sure you want to remove this article?');
      
      if (confirmRemove) {
        removeArticle(i, card);
      }
    });

    container.appendChild(card);
  }
}

loadSavedArticles();