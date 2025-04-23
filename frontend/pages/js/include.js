function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file + ".html")
      .then(response => response.text())
      .then(data => {
        el.innerHTML = data;
      });
  });
}

window.addEventListener('DOMContentLoaded', includeHTML);