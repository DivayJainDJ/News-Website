window.addEventListener('DOMContentLoaded', function() {
    console.log('Theme toggle loaded');
    
    
    const themeButton = document.getElementById('toggle-theme');
    
    
    if (!themeButton) {
      console.log('Theme button not found');
      return;
    }
    
    
    function getSavedTheme() {
      try {
        return localStorage.getItem('newstheme') || 'dark';
      } catch (error) {
        console.log('LocalStorage not available, using default theme');
        return 'dark';
      }
    }
    
     
    function saveTheme(theme) {
      try {
        localStorage.setItem('newstheme', theme);
      } catch (error) {
        console.log('Could not save theme');
      }
    }
    
    
    const savedTheme = getSavedTheme();
    
    
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeButton.textContent = '☀️'; 
    } else {
      document.body.classList.remove('light-mode');
      themeButton.textContent = '🌙';
    }
    
   
    themeButton.addEventListener('click', function() {
      console.log('Theme button clicked');
      
     
      document.body.classList.toggle('light-mode');
      
     
      if (document.body.classList.contains('light-mode')) {
    
        saveTheme('light');
        themeButton.textContent = '☀️';
        console.log('Changed to light mode');
      } else {
  
        saveTheme('dark');
        themeButton.textContent = '🌙';
        console.log('Changed to dark mode');
      }
    });
    
  
    themeButton.addEventListener('touchstart', function(e) {
   
      e.preventDefault();
     
      themeButton.click();
    });
  });