const productId = 5; // Dinamik alacaksan URL'den vs. çek
fetch(`api/get-images.php?id=${productId}`)
  .then(res => res.json())
  .then(images => {
    const container = document.querySelector(".thumbs-container"); // Nereye ekleyeceksen
    container.innerHTML = ""; // Önce temizle

    images.forEach(img => {
      const imageTag = document.createElement("img");
      imageTag.src = img;
      imageTag.alt = "Thumb";
      imageTag.classList.add("product-thumb");
      container.appendChild(imageTag);
    });
  });
