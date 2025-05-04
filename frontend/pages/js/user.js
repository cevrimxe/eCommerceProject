function loadUsers() {
    fetch("http://localhost/eCommerceProject/backend/api/user/get_users.php")
      .then((res) => res.json())
      .then((users) => {
        const table = document.getElementById("userTable");
        table.innerHTML = "";
        users.forEach((u) => {
          const row = `<tr>
            <td>${u.first_name} ${u.last_name}</td>
            <td>${u.email}</td>
            <td>${u.usercode}</td>
            <td>${u.phone}</td>
            <td>
              <button class="edit" onclick="editUser(${u.user_id})">Düzenle</button>
              <button class="delete" onclick="deleteUser(${u.user_id})">Sil</button>
            </td>
          </tr>`;
          table.innerHTML += row;
        });
      });
  }
  
  function deleteUser(id) {
    fetch(`http://localhost/eCommerceProject/backend/api/user/delete_users.php?id=${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        loadUsers();
      });
  }
  
  function editUser(id) {
    // Backend'den kullanıcı bilgilerini al
    fetch(`http://localhost/eCommerceProject/backend/api/user/get_userbyid.php?id=${id}`)
      .then(res => res.json())
      .then(user => {
        // Eğer kullanıcı bulunursa, formu doldur
        if (user) {
          document.getElementById("user_id").value = user.user_id;
          document.getElementById("user_firstname").value = user.first_name;
          document.getElementById("user_lastname").value = user.last_name;
          document.getElementById("user_email").value = user.email;
          document.getElementById("user_phone").value = user.phone;
          document.getElementById("user_role").value = user.usercode == 2 ? 'admin' : 'user';
          
          // Gösterdiğin düzenleme formunu aktif et
          document.getElementById("editUserFormContainer").style.display = "block";
        }
      })
      .catch(err => console.error("User fetch failed:", err));
}

// Kullanıcıyı güncelleme işlemi
document.getElementById("editUserFormContainer").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // user_role değerini admin/user yerine 2/1 olarak değiştirme
  let userRole = formData.get("user_role");
  userRole = userRole === 'admin' ? 2 : 1;  // Eğer 'admin' ise 2, 'user' ise 1

  const userData = {
    user_id: formData.get("user_id"),
    first_name: formData.get("user_firstname"),
    last_name: formData.get("user_lastname"),
    email: formData.get("user_email"),
    phone: formData.get("user_phone"),
    usercode: userRole // Burada userRole kullanıyoruz
  };

  const userId = formData.get("user_id"); // user_id'yi formdan alıyoruz
  console.log(userData);
  console.log(JSON.stringify(userData));

  try {
    const response = await fetch(`http://localhost/eCommerceProject/backend/api/user/put_user.php?id=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Kullanıcı başarıyla güncellendi!");
      document.getElementById("editUserFormContainer").style.display = "none";
      loadUsers(); // Kullanıcı listelerini yeniden yükle
    } else {
      alert("Kullanıcı güncellenemedi: " + result.message);
    }
  } catch (err) {
    console.error("Update failed:", err);
    alert("Bir hata oluştu.");
  }
});


  
  
  // Sayfa yüklendiğinde kullanıcıları getir
  loadUsers();
  