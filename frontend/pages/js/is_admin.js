document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost/eCommerceProject/backend/api/auth/me.php")
      .then(response => response.json())
      .then(data => {
        if (data.usercode !== 2) {
          window.location.href = "../pages/404.html";
        } else {
          // Admin paneline yönlendirme
          console.log("Admin paneline yönlendiriliyor...");
          document.body.style.display = "block";
        }
      })
      .catch(error => {
        console.error("Error checking admin status:", error);
        window.location.href = "../pages/404.html";
      });
  });
  