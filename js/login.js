document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
  
      if (!name && !email && !mobile) {
        alert("Please enter Name, Email, or Mobile.");
        return;
      }
  
      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email format.");
        return;
      }
  
      if (mobile && !/^[0-9]{10}$/.test(mobile)) {
        alert("Invalid mobile number. Must be 10 digits.");
        return;
      }
  
      const userData = { name, email, mobile };
      localStorage.setItem("userLoginData", JSON.stringify(userData));
  
      alert("Login successful!");
      window.location.href = "index.html";
    });
  });
  