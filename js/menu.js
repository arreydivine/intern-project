// Mobile menu: adds a menu button to the navbar on small screens.
// To use it, add this line before </body> on every page:
//   <script src="js/menu.js"></script>
(function () {
  const navbar = document.querySelector(".navbar");
  const nav = navbar ? navbar.querySelector("nav") : null;
  if (!navbar || !nav) { return; }

  // Load the menu styles (so pages only need one extra line)
  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "css/menu.css";
  document.head.appendChild(styles);

  // Create the menu button and put it just before the links
  nav.id = "main-nav";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "menu-toggle";
  button.setAttribute("aria-label", "Open menu");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "main-nav");
  button.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
  nav.parentNode.insertBefore(button, nav);

  function setOpen(open) {
    navbar.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  // Open or close when the button is clicked
  button.addEventListener("click", function () {
    setOpen(!navbar.classList.contains("menu-open"));
  });

  // Close after choosing a link
  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") { setOpen(false); }
  });

  // Close with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { setOpen(false); }
  });

  // Close when the screen becomes wide again
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 700) { setOpen(false); }
  });
})();