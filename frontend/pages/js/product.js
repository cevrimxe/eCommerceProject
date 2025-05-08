document.getElementById("productForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const productId = formData.get("product_id"); // Güncelleme mi kontrol et

  const productData = {
    product_name: formData.get("product_name"),
    price: parseFloat(formData.get("price")),
    description: formData.get("description"),
    stock: parseInt(formData.get("stock")),
    category_id: parseInt(formData.get("category_id")),
    is_best_deal: formData.has("is_best_deal"),
    discount: parseInt(formData.get("discount")) || 0, // Varsayılan değer 0
  };

  if (productId) {
    productData.product_id = parseInt(productId);
  }

  const endpoint = productId
    ? "http://localhost/eCommerceProject/backend/api/products/put_product.php"
    : "http://localhost/eCommerceProject/backend/api/products/add_product.php";

    const method = productId ? "PUT" : "POST";

  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log(productId ? "Product updated:" : "Product added:", result.message);

      const imageFile = form.querySelector('input[type="file"]').files[0];
      const finalProductId = productId || result.product_id;

      if (imageFile && finalProductId) {
        const imageFormData = new FormData();
        imageFormData.append("product_id", finalProductId);
        imageFormData.append("image", imageFile);

        const imageRes = await fetch("http://localhost/eCommerceProject/backend/api/products/upload_product_image.php", {
          method: "POST",
          body: imageFormData,
        });

        const imageResult = await imageRes.json();

        if (imageRes.ok) {
          console.log("Image uploaded:", imageResult.message);
          alert(productId ? "Ürün ve görsel güncellendi!" : "Ürün ve görsel eklendi!");
        } else {
          console.warn("Image upload failed:", imageResult.message);
          alert("Ürün işlem tamam ama görsel yüklenemedi.");
        }
      } else {
        alert(productId ? "Ürün güncellendi!" : "Ürün eklendi!");
      }

      form.reset();
      form.querySelector('button[type="submit"]').textContent = "Add";
      form.querySelector('[name="product_id"]')?.remove();
      loadProducts();
    } else {
      alert("İşlem başarısız: " + result.message);
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
              <strong>Discount:</strong> ${p.discount}%
            </td>
            <td>
            <input type="radio" name="bestDeal-${p.product_id}" value="yes" ${p.is_best_deal ? 'checked' : ''} onclick="updateBestDeal(${p.product_id}, true)">
            <label for="bestDeal-${p.product_id}">Yes</label>

            <input type="radio" name="bestDeal-${p.product_id}" value="no" ${!p.is_best_deal ? 'checked' : ''} onclick="updateBestDeal(${p.product_id}, false)">
            <label for="bestDeal-${p.product_id}">No</label>

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
    const isConfirmed = confirm("Are you sure you want to delete this product?");

    if (isConfirmed) {
      // Eğer onaylandıysa, silme işlemini yap
      fetch(`http://localhost/eCommerceProject/backend/api/products/delete_product.php?id=${id}`, {
          method: "DELETE"
      })
      .then((res) => res.json())
      .then((data) => {
          alert(data.message);  // Kullanıcıya mesaj göster
          loadProducts();  // Ürünleri tekrar yükle
      })
      .catch((err) => {
          console.error("Error while deleting product:", err);
      });
    } else {
      console.log("Product deletion cancelled.");
    }
  }
  
  function editProduct(id) {
    


    fetch(`http://localhost/eCommerceProject/backend/api/products/get_product.php?id=${id}`)
      .then(res => res.json())
      .then(product => {
        const form = document.getElementById("productForm");
  
        // Form alanlarını doldur
        form.querySelector('[name="product_name"]').value = product.product_name;
        form.querySelector('[name="price"]').value = product.price;
        form.querySelector('[name="description"]').value = product.description;
        form.querySelector('[name="stock"]').value = product.stock;
        form.querySelector('[name="category_id"]').value = product.category_id;
  
        // Gizli bir input ile güncellenecek ID’yi ekle (varsa güncelle, yoksa oluştur)
        let hiddenId = form.querySelector('[name="product_id"]');
        if (!hiddenId) {
          hiddenId = document.createElement("input");
          hiddenId.type = "hidden";
          hiddenId.name = "product_id";
          form.appendChild(hiddenId);
        }
        hiddenId.value = product.product_id;
  
        // Submit butonunun metnini değiştir
        form.querySelector('button[type="submit"]').textContent = "Update";
      });
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

  function updateBestDeal(productId, isBestDeal) {
    fetch("http://localhost/eCommerceProject/backend/api/products/put_best_deal.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId, is_best_deal: isBestDeal })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Best Deal durumu başarıyla güncellendi!");
      } else {
        alert("Bir hata oluştu!");
      }
    })
    .catch((err) => {
      console.error("Error while updating Best Deal:", err);
      alert("Bir hata oluştu!");
    });
  }

  
  // Sayfa yüklendiğinde kategorileri getir
  document.addEventListener("DOMContentLoaded", loadCategories);
  