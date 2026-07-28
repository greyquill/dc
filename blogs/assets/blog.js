/* Greyquill blog — shared behavior (blog screens only). Self-contained, no CDNs.
   1) light/dark toggle: persists the reader's choice, defaults to the OS setting.
   2) share bar: wires LinkedIn / X / Facebook / Email / Copy-link at runtime from
      the page's canonical URL and title. No third-party scripts, no trackers. */
(function () {
  var KEY = "gq-blog-theme";
  var root = document.documentElement;

  /* ---- theme ---- */
  function preferred() {
    try {
      var s = localStorage.getItem(KEY);
      if (s === "light" || s === "dark") return s;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", preferred());

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        try { localStorage.setItem(KEY, next); } catch (e) {}
        root.setAttribute("data-theme", next);
      });
    }

    /* ---- share ---- */
    var canonical = document.querySelector('link[rel="canonical"]');
    var url = (canonical && canonical.href) || window.location.href;
    var og = document.querySelector('meta[property="og:title"]');
    var title = (og && og.content) || document.title.replace(/\s+—\s+Greyquill$/, "");
    var u = encodeURIComponent(url);
    var t = encodeURIComponent(title);
    var targets = {
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + u,
      x: "https://twitter.com/intent/tweet?url=" + u + "&text=" + t,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + u,
      email: "mailto:?subject=" + t + "&body=" + u
    };
    Object.keys(targets).forEach(function (name) {
      var el = document.querySelector('[data-share="' + name + '"]');
      if (el) el.setAttribute("href", targets[name]);
    });

    var copyBtn = document.querySelector('[data-share="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        copyText(url, copyBtn, "share__btn--copied");
      });
    }

    /* ---- component: YouTube embed (click-to-load facade) ---- */
    var PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    document.querySelectorAll(".video[data-yt]").forEach(function (box) {
      var id = box.getAttribute("data-yt");
      var title = box.getAttribute("data-title") || "Video";
      var poster = box.getAttribute("data-poster");
      if (poster) box.style.backgroundImage = "url('" + poster + "')";
      var btn = document.createElement("button");
      btn.className = "video__play";
      btn.type = "button";
      btn.setAttribute("aria-label", "Play video: " + title);
      btn.innerHTML = PLAY;
      box.appendChild(btn);
      btn.addEventListener("click", function () {
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
        f.title = title;
        f.allow = "autoplay; encrypted-media; picture-in-picture";
        f.setAttribute("allowfullscreen", "");
        f.loading = "lazy";
        box.innerHTML = "";
        box.style.backgroundImage = "";
        box.appendChild(f);
      });
    });

    /* ---- component: copy button on code blocks ---- */
    document.querySelectorAll(".code__copy").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var block = btn.closest(".code");
        var pre = block && block.querySelector("pre");
        if (pre) copyText(pre.innerText, btn, "code__copy--copied");
      });
    });
  });

  function copyText(text, el, cls) {
    function done() {
      el.classList.add(cls);
      setTimeout(function () { el.classList.remove(cls); }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  }
})();
