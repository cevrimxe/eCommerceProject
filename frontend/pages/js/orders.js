document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost/eCommerceProject/backend/api/order/get_all_orders.php")
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById("orderTable");
        tbody.innerHTML = "";
  
        if (Array.isArray(data)) {
          data.forEach(order => {
            const row = `<tr>
              <td>${order.order_id}</td>
              <td>${order.user}</td>
              <td>${order.total} ₺</td>
              <td>${order.status}</td>
              <td>${order.order_date}</td>
              <td>
                <button class="viewDetails" onclick="viewOrderDetails(${order.order_id})">Details</button>
                <button class="changeStatus" onclick="changeOrderStatus(${order.order_id}, '${order.status}')">Change Status</button>
              </td>
            </tr>`;
            tbody.innerHTML += row;
          });
        } else {
          tbody.innerHTML = `<tr><td colspan="6">${data.message}</td></tr>`;
        }
      });
  });
  
  function viewOrderDetails(orderId) {
    fetch(`http://localhost/eCommerceProject/backend/api/order/get_ordersbyid.php?id=${orderId}`)
      .then(res => res.json())
      .then(data => {
        const modal = document.getElementById("orderDetailsModal");
        const content = document.getElementById("orderDetailsContent");
        content.innerHTML = "";
  
        if (data.items && Array.isArray(data.items)) {
          data.items.forEach(item => {
            content.innerHTML += `<p><strong>Product id: ${item.product_id}</strong> - Quantity: ${item.quantity}, Price: ${item.unit_price} ₺, Total: ${item.total} ₺</p>`;
          });
        } else {
          content.innerHTML = `<p>${data.message}</p>`;
        }
  
        // User Address Display
        if (data.user_address) {
          content.innerHTML += `
            <h3>Shipping Address</h3>
            <p><strong>Address:</strong> ${data.user_address.address}</p>
            <p><strong>City:</strong> ${data.user_address.city}</p>
            <p><strong>Postal Code:</strong> ${data.user_address.postal_code}</p>
            <p><strong>Country:</strong> ${data.user_address.country}</p>
          `;
        }
  
        // Order Details Display
        content.innerHTML += `
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Order Date:</strong> ${data.order_date}</p>
          <p><strong>Total:</strong> ${data.total} ₺</p>
        `;
  
        modal.style.display = "block";
      });
  }
  
  function closeOrderDetails() {
    document.getElementById("orderDetailsModal").style.display = "none";
  }
  
  function changeOrderStatus(orderId, currentStatus) {
    const newStatus = prompt("Enter new status (Pending / Shipped / Cancelled):", currentStatus);
    if (!newStatus || newStatus === currentStatus) return;
  
    // URL'de orderId'yi gönderiyoruz ve body'de sadece status var.
    fetch(`http://localhost/eCommerceProject/backend/api/order/put_ordersbyid.php?id=${orderId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      location.reload(); // Sayfayı yenileyerek güncel veriyi göster
    });
  }
  