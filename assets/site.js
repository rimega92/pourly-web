// Language switch: the page's language, or the visitor's, remembered between visits.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var preferred = (navigator.language || "es").toLowerCase().indexOf("es") === 0 ? "es" : "en";

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll(".lang-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });
  }

  apply(stored === "es" || stored === "en" ? stored : preferred);

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".lang-switch button");
    if (!button) return;
    apply(button.dataset.lang);
    try { localStorage.setItem("lang", button.dataset.lang); } catch (e) {}
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
