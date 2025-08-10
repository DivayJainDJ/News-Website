const container = document.getElementById('news-container');


let saved = JSON.parse(localStorage.getItem('savedNews')) || [];


if (saved.length === 0) {
  container.innerHTML = '<p>No saved articles yet.</p>';
} else {
  container.innerHTML = ''; 

  saved.forEach((article, index) => {
    const card = document.createElement('div');
    card.className = 'news-card';

    card.innerHTML = `
      <img src="${article.urlToImage || ''}" alt="news image">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
      <button class="remove-btn">Remove</button>
    `;

    const removeBtn = card.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      saved.splice(index, 1);
      localStorage.setItem('savedNews', JSON.stringify(saved));
      card.remove();  
    });

    container.appendChild(card);
  });
}
