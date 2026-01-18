const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const main = document.getElementById("main-content");
const links = document.querySelectorAll(".navLink");

// Toggle sidebar (mobile)
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtn.textContent = sidebar.classList.contains("open") ? "✖" : "☰";
});

// 🔹 Central funktion för att ladda sidor
async function loadPage(page) {
  try {
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) throw new Error("404");
    const html = await res.text();
    main.innerHTML = html;
  } catch (err) {
    main.innerHTML = "<p>Kunde inte ladda sidan.</p>";
  }
}

// Nav-klick
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);

    // Stäng sidebar på mobile efter klick (UX++)
    sidebar.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// 🔹 Ladda startsida automatiskt
window.addEventListener("DOMContentLoaded", () => {
  loadPage("om-mig");
});
