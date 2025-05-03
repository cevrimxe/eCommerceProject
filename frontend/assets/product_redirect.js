document.addEventListener('DOMContentLoaded', () => {
    const shopNowBtns = document.querySelectorAll('.shop-btn');
  
    shopNowBtns.forEach(button => {
      button.addEventListener('click', function () {
        console.log("Shop Now butonuna tıklandı!");
  
        const container = this.closest('.product-card') || 
                  this.closest('.deal-card') || 
                  this.closest('.card') || 
                  this.closest('.hero');
  
        // ID'yi al
        const productId = container?.getAttribute('data-id') || 'default';
  
        // Yönlendirme URL'si
        let url = '';
        if (productId === 'default') {
          url = 'shoppage.html';
        } else {
          url = `productdetail.html?id=${productId}`;
        }
  
        console.log("Yönlendirileceği URL:", url);
        window.location.href = url;
      });
    });
  });
  