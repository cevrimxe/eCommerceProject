document.addEventListener('DOMContentLoaded', function() {
    get_orders();
  });
  /*   
order_id,
order_date,
total,
  */
  function get_orders() {
    fetch('../../backend/api/order/get_orders.php')
      .then(response => response.json())
      .then(data =>
      {
        console.log("ORDER DATA:", data);
        
        let num_of_orders = data.orders.length;
        console.log("NUM OF ORDERS: ", num_of_orders);
        let html_alt = ``;
        let siparisler_alt = document.getElementById("siparis-kapsayici-id");

        let html = ``;
        let siparisler = document.querySelector("#siarisler-tablo-id tbody");;

        for (let i=0; i < num_of_orders; ++i)
        {
          html_alt +=
          `
    <div class="siparis-karti">
        <div class="siparis-bilgi">
        <div class="durum-etiket">DEVAM EDİYOR</div>
        <div class="siparis-id">Sipariş No: #${data.orders[i].order_id}</div>
        <div class="siparis-detay">${data.orders[i].order_date} • 2 Ürün</div>
        <div class="siparis-fiyat">$${data.orders[i].total} USD</div>
        </div>
        <button class="detay-ok" aria-label="Detayları Gör">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        </button>
    </div>
          `;

          html += 
          `
            <tr>
              <td>#${data.orders[i].order_id || 'N/A'}</td>
              <td class="durum-devam">DEVAM EDIYOR</td>
              <td>${data.orders[i].order_date || 'Tarih Yok'}</td>
              <td>$${Number(data.orders[i].total || 0).toFixed(2)} (${num_of_orders || '?'} Ürün)</td>
              <td><a href="/siparis-detayi?id=${data.orders[i].order_id || ''}">Detayları Gör</a></td>
            </tr>
          `
        }
        siparisler_alt.innerHTML = html_alt;
        siparisler.innerHTML = html;

      })
      .catch(error => {
        console.error('Error fetching get_orders.php:', error);
      });
  }