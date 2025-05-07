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

        let html = ``;
        let siparisler = document.querySelector("#siarisler-tablo-id tbody");;

        for (let i=0; i < num_of_orders; ++i)
        {

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
        siparisler.innerHTML = html;

      })
      .catch(error => {
        console.error('Error fetching get_orders.php:', error);
      });
  }