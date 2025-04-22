function includeHTML() {
    document.querySelectorAll('[id]').forEach(el => {
      fetch(el.id + ".html")
        .then(response => response.text())
        .then(data => {
          el.innerHTML = data;
        });
    });
  }
  
  window.addEventListener('DOMContentLoaded', includeHTML);