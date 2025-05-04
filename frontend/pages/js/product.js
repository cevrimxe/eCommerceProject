document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const productData = {
    product_name: formData.get("product_name"),
    price: parseFloat(formData.get("price")),
    description: formData.get("description"),
    stock: parseInt(formData.get("stock")),
    category_id: parseInt(formData.get("category_id")),
  };

  // 1. Ürünü ekle
  try {
    const response = await fetch("http://localhost/eCommerceProject/backend/api/products/add_product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Product added:", result.message);

      // 2. product_id'yi alıp resmi yükle
      const newProductId = result.product_id;
      const imageFile = form.querySelector('input[type="file"]').files[0];

      if (imageFile && newProductId) {
        const imageFormData = new FormData();
        imageFormData.append("product_id", newProductId);
        imageFormData.append("image", imageFile);

        const imageRes = await fetch("http://localhost/eCommerceProject/backend/api/products/upload_product_image.php", {
          method: "POST",
          body: imageFormData,
        });

        const imageResult = await imageRes.json();

        if (imageRes.ok) {
          console.log("Image uploaded:", imageResult.message);
          alert("Ürün ve görsel başarıyla eklendi!");
          form.reset(); // Formu temizle
        } else {
          console.error("Image upload failed:", imageResult.message);
          alert("Ürün eklendi ama görsel yüklenemedi.");
        }
      }
    } else {
      console.error("Product add failed:", result.message);
      alert("Ürün eklenemedi: " + result.message);
    }
  } catch (err) {
    console.error("Request failed:", err);
    alert("Bir hata oluştu.");
  }
});


  
  function loadProducts() {
    fetch("http://localhost/eCommerceProject/backend/api/products/get_products.php")
      .then((res) => res.json())
      .then((products) => {
        const table = document.getElementById("productTable");
        table.innerHTML = "";
        products.forEach((p) => {
          const row = `<tr>
            <td>${p.product_name}</td>
            <td>${p.price} ₺</td>
            <td>
              <strong>Category:</strong> ${p.category_name}<br/>
              <strong>Stock:</strong> ${p.stock}<br/>
              <strong>Description:</strong> ${p.description}
            </td>
            <td>
              <button class="edit" onclick="editProduct(${p.product_id})">Edit</button>
              <button class="delete" onclick="deleteProduct(${p.product_id})">Delete</button>
            </td>
          </tr>`;
          table.innerHTML += row;
        });
      })
      .catch((err) => {
        console.error("Error while loading products:", err);
      });
  }
  
  function deleteProduct(id) {
    fetch(`http://localhost/eCommerceProject/backend/api/products/delete_product.php?id=${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        loadProducts();
      });
  }
  
  function editProduct(id) {
    // Buraya düzenleme formunu açma ve veri doldurma işlemi gelecek
    alert("Düzenle işlemi yapılacak ürün ID: " + id);
  }
  
  // Sayfa yüklendiğinde ürünleri getir
  loadProducts();
  
  function loadCategories() {
    fetch("http://localhost/eCommerceProject/backend/api/products/get_categories.php")
      .then(res => res.json())
      .then(categories => {
        const select = document.querySelector('select[name="category_id"]');
        select.innerHTML = '<option value="">Select Category</option>'; // varsayılan
        categories.forEach(cat => {
          const option = document.createElement("option");
          option.value = cat.category_id;
          option.textContent = cat.category_name;
          select.appendChild(option);
        });
      })
      .catch(err => {
        console.error("Error loading categories:", err);
      });
  }
  
  // Sayfa yüklendiğinde kategorileri getir
  document.addEventListener("DOMContentLoaded", loadCategories);
  