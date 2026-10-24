// Language switch: the page's language, or the visitor's, remembered between visits.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var preferred = (navigator.language || "es").toLowerCase().indexOf("es") === 0 ? "es" : "en";

  // Screenshots exist per language: assets/screenshots/… (Spanish) and assets/screenshots/en/…
  var shotBase = "assets/screenshots/";
  function localizeScreenshots(lang) {
    document.querySelectorAll('img[src*="' + shotBase + '"], source[srcset*="' + shotBase + '"]').forEach(function (element) {
      var attribute = element.tagName === "IMG" ? "src" : "srcset";
      if (!element.dataset.esPath) element.dataset.esPath = element.getAttribute(attribute);
      var path = element.dataset.esPath;
      element.setAttribute(attribute, lang === "es" ? path : path.replace(shotBase, shotBase + lang + "/"));
    });
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    localizeScreenshots(lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    var description = root.getAttribute("data-description-" + lang);
    var descriptionMeta = document.querySelector('meta[name="description"]');
    if (description && descriptionMeta) descriptionMeta.content = description;
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

  // Appearance: automatic (the device's), light or dark.
  var darkSources = document.querySelectorAll('source[media="(prefers-color-scheme: dark)"]');
  var themeMetas = document.querySelectorAll('meta[name="theme-color"]');

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      root.setAttribute("data-theme", theme);
    } else {
      theme = "auto";
      root.removeAttribute("data-theme");
    }
    // Screenshots have a dark version chosen by <source media>; force it when the mode is forced.
    darkSources.forEach(function (source) {
      source.media = theme === "auto" ? "(prefers-color-scheme: dark)" : theme === "dark" ? "all" : "not all";
    });
    // Browser bar color: each tag keeps its own in automatic mode, both follow a forced one.
    themeMetas.forEach(function (meta) {
      var own = meta.hasAttribute("data-dark") ? "#13100E" : "#F6F1EA";
      meta.content = theme === "auto" ? own : theme === "dark" ? "#13100E" : "#F6F1EA";
    });
    document.querySelectorAll(".theme-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.theme === theme));
    });
  }

  var storedTheme = null;
  try { storedTheme = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(storedTheme);

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".theme-switch button");
    if (!button) return;
    applyTheme(button.dataset.theme);
    try { localStorage.setItem("theme", button.dataset.theme); } catch (e) {}
  });

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
