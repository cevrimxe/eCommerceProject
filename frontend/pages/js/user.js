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
    // Buraya kullanıcı düzenleme işlemleri gelecek
    alert("Düzenlenecek kullanıcı ID: " + id);
  }
  
  // Sayfa yüklendiğinde kullanıcıları getir
  loadUsers();
  