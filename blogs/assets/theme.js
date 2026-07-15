/* Greyquill blog — light/dark toggle. Shared, local, self-contained.
   Blog screens only. Persists the reader's choice; defaults to the OS setting.
   A tiny inline twin of the read step also runs in <head> to prevent a flash. */
(function () {
  var KEY = "gq-blog-theme";
  var root = document.documentElement;

  function preferred() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function apply(theme) { root.setAttribute("data-theme", theme); }

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  });
})();
