window.addEventListener('DOMContentLoaded', () => {
    console.log('theme-toggle.js loaded');
    const toggleBtn = document.getElementById('toggle-theme');
    
    if (!toggleBtn) {
      console.log('Toggle button NOT found');
      return;
    }
    console.log('Toggle button found');
  
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
  
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
      } else {
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
      }
    });
  });
  