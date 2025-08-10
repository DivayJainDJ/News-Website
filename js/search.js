
const container = document.getElementById('news-container');
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const apiKey = '3aa99be2ffcc4c5e9e31ae85b2a989e6';


function createNewsCard(article) {
  const card = document.createElement('div');
  card.className = 'news-card';

  card.innerHTML = `
    <img src="${article.urlToImage || ''}" alt="news image">
    <h3>${article.title}</h3>
    <p>${article.description || 'No description available.'}</p>
    <a href="${article.url}" target="_blank" class="read-more">Read More</a>
    <button class="save-btn">Save</button>
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

// Function to search for news
function searchNews(keyword) {
  // Show searching message
  container.innerHTML = '<div class="loading">Searching...</div>';

  // Fetch search results from API
  fetch(`/.netlify/functions/fetchNews?query=${encodeURIComponent(keyword)}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
    
      container.innerHTML = '';

      if (data.articles.length === 0) {
        container.innerHTML = `<div class="loading">No news found for "${keyword}".</div>`;
        return;
      }

     
      data.articles.forEach(function(article) {
        const card = createNewsCard(article);
        
      
        const saveButton = card.querySelector('.save-btn');
        saveButton.addEventListener('click', function() {
          
          // Get saved articles
          let savedArticles = JSON.parse(localStorage.getItem('savedNews')) || [];

          // Check if article is already saved
          let alreadySaved = false;
          for (let i = 0; i < savedArticles.length; i++) {
            if (savedArticles[i].url === article.url) {
              alreadySaved = true;
              break;
            }
          }

          if (!alreadySaved) {
          
            savedArticles.push(article);
            localStorage.setItem('savedNews', JSON.stringify(savedArticles));
            showSavedMessage(saveButton);
          } else {
          
            saveButton.textContent = 'Already Saved';
            setTimeout(function() {
              saveButton.textContent = 'Save';
            }, 2000);
          }
        });

  
        container.appendChild(card);
      });
    })
    .catch(function(error) {
      console.error('Search error:', error);
      container.innerHTML = '<div class="loading">Search failed. Please try again.</div>';
    });
}


searchButton.addEventListener('click', function() {
  const keyword = searchInput.value.trim();


  if (keyword === '') {
    container.innerHTML = '<div class="search-prompt">Please enter a keyword to search.</div>';
    return;
  }

 
  searchNews(keyword);
});


searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});
