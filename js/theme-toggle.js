
window.addEventListener('DOMContentLoaded', function() {
    console.log('Theme toggle loaded');
    
   
    const themeButton = document.getElementById('toggle-theme');
    
    
    if (!themeButton) {
      console.log('Theme button not found');
      return;
    }
    
   
    const savedTheme = localStorage.getItem('theme');
    
   
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeButton.textContent = '☀️'; 
    } else {
      document.body.classList.remove('light-mode');
      themeButton.textContent = '🌙';
    }
    
    
    themeButton.addEventListener('click', function() {
      
     
      document.body.classList.toggle('light-mode');
      
     
      if (document.body.classList.contains('light-mode')) {
        
        localStorage.setItem('theme', 'light');
        themeButton.textContent = '☀️';
        console.log('Changed to light mode');
      } else {
        
        localStorage.setItem('theme', 'dark');
        themeButton.textContent = '🌙';
        console.log('Changed to dark mode');
      }
    });
  });