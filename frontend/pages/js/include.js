function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file + ".html")
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;
        console.log("header.html yüklendi!"); // header.html yüklendi mi?

        // Header yüklendikten sonra butonları kontrol et ve işlemi başlat
        const profileBtn = document.querySelector("#profile-btn");
        const cartBtn = document.querySelector("#cart-btn");

        // Profil Butonu
        if (profileBtn) {
          console.log("profile-btn elemanı bulundu!"); // Profil butonu bulundu mu?

          profileBtn.addEventListener("click", function (e) {
            console.log("Profile butonuna tıklandı!"); // Butona tıklanıp tıklanmadığını kontrol et
            e.preventDefault();

            fetch("http://localhost/eCommerceProject/backend/api/auth/me.php", {
              method: "GET",
              credentials: "include",
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Not logged in");
                }
                return res.json();
              })
              .then((data) => {
                console.log("Kullanıcı Giriş Yaptı:", data);
                window.location.href = "dashboard_order_history.html"; // Giriş yaptıysa profile sayfasına git
              })
              .catch((err) => {
                console.error("Kullanıcı Giriş Yapmamış:", err);
                window.location.href = "signin.html"; // Giriş yapmadıysa signin sayfasına git
              });
          });
        } else {
          console.error("Profile butonu bulunamadı!"); // Eğer profil butonu bulunamazsa hata mesajı
        }

        // Cart Butonu
        if (cartBtn) {
          console.log("cart-btn elemanı bulundu!"); // Cart butonu bulundu mu?

          cartBtn.addEventListener("click", function (e) {
            console.log("Cart butonuna tıklandı!"); // Butona tıklanıp tıklanmadığını kontrol et
            e.preventDefault();

            fetch("http://localhost/eCommerceProject/backend/api/auth/me.php", {
              method: "GET",
              credentials: "include",
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Not logged in");
                }
                return res.json();
              })
              .then((data) => {
                console.log("Kullanıcı Giriş Yaptı:", data);
                window.location.href = "cart.html"; // Giriş yaptıysa cart sayfasına git
              })
              .catch((err) => {
                console.error("Kullanıcı Giriş Yapmamış:", err);
                window.location.href = "signin.html"; // Giriş yapmadıysa signin sayfasına git
              });
          });
        } else {
          console.error("Cart butonu bulunamadı!"); // Eğer cart butonu bulunamazsa hata mesajı
        }
      });
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);
