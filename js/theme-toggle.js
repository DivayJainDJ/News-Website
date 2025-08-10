window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-theme');
    if (!toggleBtn) return;  
  
   
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
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  });
  