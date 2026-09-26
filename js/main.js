/* Dhinakara Adventure — render konten + interaksi */

(function () {
  "use strict";

  var CMS_KEY = "da_cms_data";

  function applyCmsOverride() {
    try {
      var raw = localStorage.getItem(CMS_KEY);
      if (!raw || !window.DATA) return;
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;
      var fileStruktur = DATA.struktur ? JSON.parse(JSON.stringify(DATA.struktur)) : null;
      Object.keys(saved).forEach(function (key) {
        if (key === "struktur") return;
        DATA[key] = saved[key];
      });
      /* Struktur: pakai CMS hanya jika ada jabatan; kalau kosong jangan timpa data bawaan */
      if (
        saved.struktur &&
        Array.isArray(saved.struktur.roles) &&
        saved.struktur.roles.length > 0
      ) {
        DATA.struktur = saved.struktur;
      } else if (fileStruktur) {
        DATA.struktur = fileStruktur;
      }
    } catch (e) {
      /* ignore corrupt override */
    }
  }
  applyCmsOverride();

  var navbar = document.getElementById("navbar");
  function onScrollNav() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollNav);
  onScrollNav();

  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuIconOpen = document.getElementById("menu-icon-open");
  var menuIconClose = document.getElementById("menu-icon-close");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var isOpen = !mobileMenu.classList.contains("hidden");
      isOpen = !isOpen;
      mobileMenu.classList.toggle("hidden", !isOpen);
      menuBtn.setAttribute("aria-expanded", isOpen);
      if (menuIconOpen) menuIconOpen.classList.toggle("hidden", isOpen);
      if (menuIconClose) menuIconClose.classList.toggle("hidden", !isOpen);
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        if (menuIconOpen) menuIconOpen.classList.remove("hidden");
        if (menuIconClose) menuIconClose.classList.add("hidden");
      });
    });
  }

  var toTop = document.getElementById("back-to-top");
  function onToTop() {
    if (toTop) toTop.classList.toggle("visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onToTop);
  onToTop();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function renderStats() {
    var box = document.getElementById("render-stats");
    if (!box || !window.DATA) return;
    var isLog = box.classList.contains("log-strip-track");
    var isClub =
      box.classList.contains("club-facts-row") ||
      box.classList.contains("clean-facts");
    DATA.stats.forEach(function (s) {
      var item = document.createElement("div");
      if (isClub) {
        item.className = "clean-fact";
        item.innerHTML =
          '<span class="stat-num clean-fact-num" data-target="' +
          s.value +
          '" data-suffix="' +
          s.suffix +
          '">0</span>' +
          '<span class="clean-fact-label">' +
          s.label +
          "</span>";
      } else if (isLog) {
        item.className = "log-item";
        item.innerHTML =
          '<span class="stat-num log-num" data-target="' +
          s.value +
          '" data-suffix="' +
          s.suffix +
          '">0</span>' +
          '<span class="log-label">' +
          s.label +
          "</span>";
      } else {
        item.className = "stat-item";
        item.innerHTML =
          '<div class="stat-num" data-target="' +
          s.value +
          '" data-suffix="' +
          s.suffix +
          '">0</div>' +
          '<div class="stat-label">' +
          s.label +
          "</div>";
      }
      box.appendChild(item);
    });
    var counted = {};
    var nums = box.querySelectorAll(".stat-num");
    function run() {
      nums.forEach(function (el, i) {
        if (counted[i]) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 40) {
          counted[i] = true;
          var target = parseInt(el.dataset.target, 10);
          var suf = el.dataset.suffix || "";
          var start = null;
          var dur = 1000;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            el.textContent = Math.floor(p * target) + suf;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target + suf;
          }
          requestAnimationFrame(step);
        }
      });
    }
    window.addEventListener("scroll", run);
    run();
  }

  function newsCard(n) {
    return (
      '<article class="news-card news-filter-item" data-category="' +
      n.category +
      '">' +
      '<div class="relative overflow-hidden">' +
      '<img src="' +
      n.image +
      '" alt="' +
      n.title +
      '" loading="lazy">' +
      '<span class="chip absolute left-3 top-3">' +
      n.category +
      "</span>" +
      "</div>" +
      '<div class="body">' +
      '<div class="news-meta">' +
      n.date +
      " · " +
      n.location +
      "</div>" +
      "<h3>" +
      n.title +
      "</h3>" +
      "<p>" +
      n.excerpt +
      "</p>" +
      '<a href="' +
      n.link +
      '" class="more">Baca selengkapnya →</a>' +
      "</div></article>"
    );
  }

  function renderNewsHome() {
    var box = document.getElementById("render-news");
    if (!box || !window.DATA) return;
    var isDispatch = box.classList.contains("dispatch-list");
    var isClub = box.classList.contains("club-news-list");
    DATA.news.slice(0, isClub ? 4 : 3).forEach(function (n, i) {
      var w = document.createElement("div");
      w.setAttribute("data-aos", "fade-up");
      w.setAttribute("data-aos-delay", String(i * 60));
      if (isClub) {
        w.className = "club-news-item";
        w.innerHTML =
          '<a href="' +
          n.link +
          '">' +
          '<span class="club-news-date">' +
          n.date +
          "</span>" +
          '<span class="club-news-title">' +
          n.title +
          "</span>" +
          '<span class="club-news-cat">' +
          n.category +
          "</span></a>";
      } else if (isDispatch) {
        w.className = "dispatch-row";
        w.innerHTML =
          '<a href="' +
          n.link +
          '" class="dispatch-thumb"><img src="' +
          n.image +
          '" alt="" loading="lazy"></a>' +
          '<div class="dispatch-body">' +
          '<div class="news-meta">' +
          n.date +
          " · " +
          n.category +
          "</div>" +
          "<h3><a href=\"" +
          n.link +
          '">' +
          n.title +
          "</a></h3>" +
          "<p>" +
          n.excerpt +
          "</p>" +
          "</div>";
      } else {
        w.innerHTML = newsCard(n);
      }
      box.appendChild(w);
    });
  }

  function renderNewsAll() {
    var box = document.getElementById("render-news-all");
    if (!box || !window.DATA) return;
    DATA.news.forEach(function (n) {
      box.innerHTML += newsCard(n);
    });
  }

  function badge(s) {
    var cls = { terbuka: "green", mendaftar: "yellow", full: "black", selesai: "gray" }[s] || "gray";
    var txt = { terbuka: "Terbuka", mendaftar: "Mendaftar", full: "Penuh", selesai: "Selesai" }[s] || s;
    return '<span class="badge ' + cls + '">' + txt + "</span>";
  }

  function renderEvents() {
    var box = document.getElementById("render-events");
    if (!box || !window.DATA) return;
    var isClub = box.classList.contains("club-agenda");
    DATA.events.forEach(function (e, i) {
      var parts = e.date.split(" ");
      var day = parts[0];
      var rest = parts.slice(1).join(" ");
      var row = document.createElement("div");
      row.setAttribute("data-aos", "fade-up");
      row.setAttribute("data-aos-delay", String(i * 40));
      if (isClub) {
        row.className = "club-agenda-item";
        row.innerHTML =
          '<div class="club-agenda-date"><strong>' +
          day +
          "</strong><span>" +
          rest +
          "</span></div>" +
          "<div>" +
          "<h3>" +
          e.title +
          "</h3>" +
          '<p>' +
          e.location +
          " · " +
          e.category +
          "</p></div>";
      } else {
        row.className = "event-row";
        row.innerHTML =
          '<div class="event-date">' +
          day +
          "<small>" +
          rest +
          "</small></div>" +
          "<div>" +
          '<h3 class="font-display text-lg font-semibold tracking-tight">' +
          e.title +
          "</h3>" +
          '<div class="news-meta mt-1">' +
          e.location +
          " · " +
          e.category +
          "</div></div>" +
          '<div class="flex items-center gap-4">' +
          badge(e.status) +
          '<a href="' +
          (e.category === "Dikjut" ? "dikjut.html" : "diksar.html") +
          '" class="text-sm font-semibold text-forest hover:underline">Daftar →</a>' +
          "</div>";
      }
      box.appendChild(row);
    });
  }

  function renderTestimonials() {
    var box = document.getElementById("testimonial-grid");
    if (!box || !window.DATA) return;
    DATA.testimonials.forEach(function (t, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String((i % 3) * 70));
      el.innerHTML =
        '<figure class="quote">' +
        "<blockquote>“" +
        t.text +
        "”</blockquote>" +
        "<figcaption class=\"mt-5\">" +
        '<div class="font-semibold text-ink">' +
        t.name +
        "</div>" +
        '<div class="sign mt-1">' +
        t.role +
        "</div></figcaption></figure>";
      box.appendChild(el);
    });
  }

  function renderPengurus() {
    var box = document.getElementById("render-pengurus");
    if (!box || !window.DATA) return;
    DATA.pengurus.forEach(function (p, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String((i % 4) * 60));
      el.className = "person-card";
      el.innerHTML =
        '<img src="' +
        p.image +
        '" alt="' +
        p.name +
        '">' +
        "<h3>" +
        p.name +
        "</h3>" +
        '<div class="role">' +
        p.role +
        "</div>";
      box.appendChild(el);
    });
  }

  function renderStruktur() {
    var box = document.getElementById("render-struktur");
    if (!box || !window.DATA) return;

    var struktur = DATA.struktur;
    if (!struktur || !Array.isArray(struktur.roles) || !struktur.roles.length) {
      box.innerHTML =
        '<p class="org-empty">Struktur kepengurusan belum diisi. Lengkapi lewat Admin → Struktur.</p>';
      return;
    }

    var note = document.getElementById("struktur-note");
    if (note) {
      note.textContent =
        struktur.catatan ||
        "Badan Pengurus Harian (BPH) Dhinakara Adventure.";
    }

    var periodeEl = document.getElementById("struktur-periode-badge");
    if (periodeEl) {
      if (struktur.periode) {
        periodeEl.textContent = struktur.periode;
        periodeEl.hidden = false;
      } else {
        periodeEl.hidden = true;
      }
    }

    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    var byLevel = { 1: [], 2: [], 3: [] };
    struktur.roles.forEach(function (r) {
      var lv = Number(r.level) || 3;
      if (!byLevel[lv]) byLevel[lv] = [];
      byLevel[lv].push(r);
    });

    function personHtml(r, lead) {
      var name = (r.name || "").trim();
      var photo = (r.photo || "").trim();
      return (
        '<div class="org-person' +
        (lead ? " is-lead" : "") +
        '">' +
        (photo
          ? '<img class="org-photo" src="' +
            esc(photo) +
            '" alt="' +
            esc(name || r.role) +
            '" loading="lazy">'
          : "") +
        '<p class="org-role">' +
        esc(r.role) +
        "</p>" +
        '<p class="org-name">' +
        (name ? esc(name) : '<span class="org-name-empty">Belum diisi</span>') +
        "</p>" +
        (r.desc ? '<p class="org-desc">' + esc(r.desc) + "</p>" : "") +
        "</div>"
      );
    }

    var html = '<div class="org-tree">';

    if (byLevel[1] && byLevel[1].length) {
      html += '<div class="org-tier org-tier-lead">';
      byLevel[1].forEach(function (r) {
        html += personHtml(r, true);
      });
      html += "</div>";
    }

    if (byLevel[2] && byLevel[2].length) {
      html += '<div class="org-branch" aria-hidden="true"></div>';
      html += '<div class="org-tier org-tier-core">';
      byLevel[2].forEach(function (r) {
        html += personHtml(r, false);
      });
      html += "</div>";
    }

    if (byLevel[3] && byLevel[3].length) {
      html += '<div class="org-branch" aria-hidden="true"></div>';
      html += '<div class="org-tier org-tier-fields">';
      byLevel[3].forEach(function (r) {
        html += personHtml(r, false);
      });
      html += "</div>";
    }

    html += "</div>";
    box.innerHTML = html;
  }

  function renderGallery() {
    var box = document.getElementById("render-gallery");
    if (!box || !window.DATA) return;
    DATA.gallery.forEach(function (g, i) {
      var el = document.createElement("div");
      el.className = "gallery-item";
      el.setAttribute("data-category", g.category);
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String((i % 3) * 60));
      el.innerHTML =
        '<a href="' +
        g.src +
        '" class="glightbox" data-gallery="dhinakara">' +
        '<img src="' +
        g.src +
        '" alt="' +
        g.caption +
        '" loading="lazy">' +
        '<div class="gallery-overlay"><span>' +
        g.caption +
        " · " +
        g.category +
        "</span></div></a>";
      box.appendChild(el);
    });
    initLightbox();
  }

  function renderHomeGallery() {
    var box = document.getElementById("render-gallery-home");
    if (!box || !window.DATA || !DATA.gallery) return;
    var isFilm = box.classList.contains("filmstrip");
    var isClub = box.classList.contains("club-gallery");
    DATA.gallery.slice(0, isClub ? 6 : 6).forEach(function (g, i) {
      var el = document.createElement("div");
      if (isClub) {
        el.className = "club-gal-item";
      } else if (isFilm) {
        el.className = "film-frame";
      } else {
        el.className = "gallery-item";
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-delay", String((i % 3) * 70));
      }
      el.innerHTML =
        '<a href="' +
        g.src +
        '" class="glightbox" data-gallery="dhinakara-home">' +
        '<img src="' +
        g.src +
        '" alt="' +
        g.caption +
        '" loading="lazy">' +
        (isClub
          ? ""
          : isFilm
            ? '<span class="film-cap">' + g.category + "</span>"
            : '<div class="gallery-overlay"><span>' +
              g.caption +
              " · " +
              g.category +
              "</span></div>") +
        "</a>";
      box.appendChild(el);
    });
    initLightbox();
  }

  var lightboxReady = false;
  function initLightbox() {
    if (lightboxReady || !window.GLightbox) return;
    if (!document.querySelector(".glightbox")) return;
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
    });
    lightboxReady = true;
  }

  function initHeroSlideshow() {
    var root = document.getElementById("hero-slides");
    var dots = document.getElementById("hero-dots");
    var label = document.getElementById("hero-label");
    if (!root || !window.DATA || !DATA.heroSlides || !DATA.heroSlides.length) return;

    var slides = DATA.heroSlides;
    var i = 0;
    var timer = null;
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var INTERVAL = 5600;

    slides.forEach(function (s, idx) {
      var slide = document.createElement("div");
      slide.className = "hero-slide" + (idx === 0 ? " is-active" : "");
      slide.setAttribute("aria-hidden", idx === 0 ? "false" : "true");
      slide.innerHTML =
        '<img src="' +
        s.src +
        '" alt="' +
        (s.alt || "") +
        '"' +
        (idx === 0 ? "" : ' loading="lazy"') +
        ">";
      root.appendChild(slide);

      if (dots) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "hero-dot" + (idx === 0 ? " is-active" : "");
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-label", "Slide " + (idx + 1) + ": " + (s.label || ""));
        btn.addEventListener("click", function () {
          go(idx, true);
        });
        dots.appendChild(btn);
      }
    });

    if (label) label.textContent = slides[0].label || "";

    function go(next, user) {
      var nodes = root.querySelectorAll(".hero-slide");
      var dotNodes = dots ? dots.querySelectorAll(".hero-dot") : [];
      nodes[i].classList.remove("is-active");
      nodes[i].setAttribute("aria-hidden", "true");
      if (dotNodes[i]) dotNodes[i].classList.remove("is-active");
      i = (next + slides.length) % slides.length;
      nodes[i].classList.add("is-active");
      nodes[i].setAttribute("aria-hidden", "false");
      if (dotNodes[i]) dotNodes[i].classList.add("is-active");
      if (label) label.textContent = slides[i].label || "";
      if (user) restart();
    }

    function next() {
      go(i + 1, false);
    }

    function restart() {
      if (reduced || slides.length < 2) return;
      clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    if (!reduced && slides.length > 1) {
      timer = setInterval(next, INTERVAL);
      var hero = document.getElementById("hero");
      if (hero) {
        hero.addEventListener("mouseenter", function () {
          clearInterval(timer);
        });
        hero.addEventListener("mouseleave", restart);
      }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) clearInterval(timer);
        else restart();
      });
    }
  }

  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function initFilter(containerId, btnSel, itemSel) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var btns = document.querySelectorAll(btnSel);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) {
          x.classList.remove("active");
        });
        b.classList.add("active");
        var f = b.dataset.filter;
        container.querySelectorAll(itemSel).forEach(function (it) {
          var cat = it.dataset.category;
          it.style.display = f === "all" || cat === f ? "" : "none";
        });
      });
    });
  }

  function renderTimeline() {
    var box = document.getElementById("render-timeline");
    if (!box || !window.DATA) return;
    DATA.timeline.forEach(function (t, i) {
      var el = document.createElement("div");
      el.className = "timeline-item";
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 40));
      el.innerHTML =
        '<div class="year">' +
        t.year +
        "</div>" +
        '<p class="mt-2 text-[15px] text-muted leading-relaxed max-w-2xl">' +
        t.text +
        "</p>";
      box.appendChild(el);
    });
  }

  function renderValues() {
    var box = document.getElementById("render-values");
    if (!box || !window.DATA) return;
    DATA.values.forEach(function (v, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 60));
      el.className = "value-block";
      el.innerHTML =
        '<div class="num">0' +
        (i + 1) +
        "</div>" +
        "<h3>" +
        v.title +
        "</h3>" +
        "<p>" +
        v.desc +
        "</p>";
      box.appendChild(el);
    });
  }

  function renderVisi() {
    var el = document.getElementById("render-visi");
    if (!el || !window.DATA || !DATA.visi) return;
    el.textContent = DATA.visi;
  }

  function renderList(id, items, numbered) {
    var box = document.getElementById(id);
    if (!box || !items) return;
    items.forEach(function (text, i) {
      var li = document.createElement("li");
      li.setAttribute("data-aos", "fade-up");
      li.setAttribute("data-aos-delay", String(i * 35));
      li.innerHTML =
        '<span class="tick">' +
        (numbered ? i + 1 : "✓") +
        "</span><span>" +
        text +
        "</span>";
      box.appendChild(li);
    });
  }

  function renderLambang() {
    var box = document.getElementById("render-lambang");
    if (!box || !window.DATA || !DATA.lambangArti) return;
    DATA.lambangArti.forEach(function (item, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 40));
      el.className = "value-block";
      el.innerHTML =
        "<h3>" + item.title + "</h3><p>" + item.desc + "</p>";
      box.appendChild(el);
    });
  }

  function renderKeanggotaan() {
    var box = document.getElementById("render-keanggotaan");
    if (!box || !window.DATA || !DATA.keanggotaan) return;
    DATA.keanggotaan.jenis.forEach(function (item, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 50));
      el.className = "step-card";
      el.innerHTML =
        '<div class="step">Jenjang 0' +
        (i + 1) +
        "</div><h3>" +
        item.title +
        "</h3><p>" +
        item.desc +
        "</p>";
      box.appendChild(el);
    });
  }

  function renderCampuses() {
    var box = document.getElementById("render-campuses");
    if (!box || !window.DATA || !DATA.site.campuses) return;
    DATA.site.campuses.forEach(function (c, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 60));
      el.className = "step-card";
      el.innerHTML =
        '<div class="step">' +
        c.role +
        "</div><h3>" +
        c.name +
        "</h3><p>" +
        c.address +
        "</p>";
      box.appendChild(el);
    });
  }

  function renderSkills() {
    var box = document.getElementById("render-skills");
    if (!box || !window.DATA) return;
    var done = false;
    DATA.skills.forEach(function (s) {
      var el = document.createElement("div");
      el.className = "skill-row";
      el.innerHTML =
        '<div class="top"><span>' +
        s.label +
        '</span><span class="skill-val text-forest">0%</span></div>' +
        '<div class="skill-track"><div class="skill-fill"></div></div>';
      box.appendChild(el);
    });
    function fill() {
      if (done) return;
      var r = box.getBoundingClientRect();
      if (r.top > window.innerHeight - 80) return;
      done = true;
      var bars = box.querySelectorAll(".skill-fill");
      var vals = box.querySelectorAll(".skill-val");
      DATA.skills.forEach(function (s, i) {
        setTimeout(function () {
          bars[i].style.width = s.pct + "%";
          var c = 0;
          var t = s.pct;
          var int = setInterval(function () {
            c += 2;
            vals[i].textContent = Math.min(c, t) + "%";
            if (c >= t) clearInterval(int);
          }, 16);
        }, i * 120);
      });
    }
    window.addEventListener("scroll", fill);
    fill();
  }

  function renderDiksar() {
    var box = document.getElementById("render-diksar-alur");
    if (!box || !window.DATA || !window.DATA.diksar) return;
    DATA.diksar.alur.forEach(function (a, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 50));
      el.className = "step-card";
      el.innerHTML =
        '<div class="step">Langkah ' +
        a.step +
        "</div>" +
        "<h3>" +
        a.title +
        "</h3>" +
        "<p>" +
        a.desc +
        "</p>";
      box.appendChild(el);
    });
    var ben = document.getElementById("render-diksar-benefit");
    if (ben) {
      DATA.diksar.benefit.forEach(function (b) {
        var el = document.createElement("li");
        el.innerHTML =
          '<span class="tick">✓</span><span class="font-semibold">' + b + "</span>";
        ben.appendChild(el);
      });
    }
    var syarat = document.getElementById("render-diksar-syarat");
    if (syarat) {
      DATA.diksar.syarat.forEach(function (s, i) {
        var el = document.createElement("li");
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-delay", String(i * 40));
        el.innerHTML =
          '<span class="tick">' + (i + 1) + "</span><span>" + s + "</span>";
        syarat.appendChild(el);
      });
    }
  }

  function renderDikjut() {
    var box = document.getElementById("render-dikjut-alur");
    if (!box || !window.DATA || !window.DATA.dikjut) return;
    DATA.dikjut.alur.forEach(function (a, i) {
      var el = document.createElement("div");
      el.setAttribute("data-aos", "fade-up");
      el.setAttribute("data-aos-delay", String(i * 50));
      el.className = "step-card";
      el.innerHTML =
        '<div class="step">Langkah ' +
        a.step +
        "</div>" +
        "<h3>" +
        a.title +
        "</h3>" +
        "<p>" +
        a.desc +
        "</p>";
      box.appendChild(el);
    });
    var ben = document.getElementById("render-dikjut-benefit");
    if (ben) {
      DATA.dikjut.benefit.forEach(function (b) {
        var el = document.createElement("li");
        el.innerHTML =
          '<span class="tick">✓</span><span class="font-semibold">' + b + "</span>";
        ben.appendChild(el);
      });
    }
    var syarat = document.getElementById("render-dikjut-syarat");
    if (syarat) {
      DATA.dikjut.syarat.forEach(function (s, i) {
        var el = document.createElement("li");
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-delay", String(i * 40));
        el.innerHTML =
          '<span class="tick">' + (i + 1) + "</span><span>" + s + "</span>";
        syarat.appendChild(el);
      });
    }
  }

  function renderDivisions() {
    var box = document.getElementById("render-divisions");
    if (!box || !window.DATA) return;
    var list = DATA.divisions || [];
    box.innerHTML = list
      .map(function (d) {
        var name = typeof d === "string" ? d : d.name;
        return "<li>" + name + "</li>";
      })
      .join("");
  }

  function renderDivisionsCards() {
    var box = document.getElementById("render-divisions-cards");
    if (!box || !window.DATA) return;
    var isTrail = box.classList.contains("trail-scroll");
    var isClub = box.classList.contains("club-div-grid");
    DATA.divisions.forEach(function (d, i) {
      var name = typeof d === "string" ? d : d.name;
      var desc = typeof d === "string" ? "" : d.desc || "";
      var img =
        typeof d === "string"
          ? ""
          : d.image ||
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&auto=format&fit=crop";
      var el = document.createElement(isClub ? "article" : "a");
      if (!isClub) el.href = "profil.html";
      if (isClub) {
        el.className = "clean-div";
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-delay", String(i * 70));
        el.innerHTML =
          '<img src="' +
          img +
          '" alt="' +
          name +
          '" loading="lazy">' +
          "<h3>" +
          name +
          "</h3><p>" +
          desc +
          "</p>";
      } else if (isTrail) {
        el.className = "trail-card";
        el.innerHTML =
          '<img src="' +
          img +
          '" alt="' +
          name +
          '" loading="lazy">' +
          '<div class="panel-body">' +
          '<div class="panel-num">0' +
          (i + 1) +
          "</div><h3>" +
          name +
          "</h3><p>" +
          desc +
          "</p></div>";
      } else {
        el.className = "division-panel";
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-delay", String(i * 90));
        el.innerHTML =
          '<img src="' +
          img +
          '" alt="' +
          name +
          '" loading="lazy">' +
          '<div class="panel-body">' +
          '<div class="panel-num">Divisi 0' +
          (i + 1) +
          "</div><h3>" +
          name +
          "</h3><p>" +
          desc +
          "</p></div>";
      }
      box.appendChild(el);
    });
  }

  function initAOS() {
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 60,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
    }
  }

  if (window.DATA) {
    initHeroSlideshow();
    renderStats();
    renderNewsHome();
    renderNewsAll();
    renderEvents();
    renderTestimonials();
    renderPengurus();
    renderStruktur();
    renderGallery();
    renderHomeGallery();
    renderTimeline();
    renderValues();
    renderVisi();
    renderList("render-misi", DATA.misi, true);
    renderList("render-tujuan", DATA.tujuan, true);
    renderList("render-fungsi", DATA.fungsi, true);
    renderList("render-prinsip", DATA.prinsip, true);
    renderLambang();
    renderKeanggotaan();
    renderCampuses();
    renderSkills();
    renderDiksar();
    renderDikjut();
    renderDivisions();
    renderDivisionsCards();
    initFilter("render-gallery", ".filter-gallery", ".gallery-item");
    initFilter("render-news-all", ".filter-news", ".news-filter-item");
  }

  initScrollProgress();

  window.addEventListener("load", initAOS);
  setTimeout(initAOS, 120);

  function wireForm(formEl, buildMessage) {
    if (!formEl || !window.DATA || !DATA.site.whatsapp) return;
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = formEl.querySelector("button[type='submit']");
      var orig = btn ? btn.textContent : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Menyiapkan...";
      }
      window.open(
        "https://wa.me/" + DATA.site.whatsapp + "?text=" + encodeURIComponent(buildMessage()),
        "_blank"
      );
      if (btn) {
        btn.textContent = "Terbuka di WhatsApp";
        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = orig;
        }, 3500);
      }
    });
  }

  wireForm(document.getElementById("diksar-form"), function () {
    var g = function (id) {
      var e = document.getElementById(id);
      return e ? e.value.trim() : "";
    };
    return (
      "Halo Admin Dhinakara Adventure, saya ingin mendaftar Diksar.\n\n" +
      "Nama: " +
      g("d-nama") +
      "\nNIM: " +
      g("d-nim") +
      "\nFakultas/Prodi: " +
      g("d-prodi") +
      "\nAngkatan: " +
      g("d-angkatan") +
      "\nKampus: " +
      g("d-kampus") +
      "\nNo. HP: " +
      g("d-wa") +
      "\nAlasan: " +
      g("d-alasan")
    );
  });

  wireForm(document.getElementById("dikjut-form"), function () {
    var g = function (id) {
      var e = document.getElementById(id);
      return e ? e.value.trim() : "";
    };
    return (
      "Halo Admin Dhinakara Adventure, saya ingin mendaftar Dikjut (Pendidikan Lanjut).\n\n" +
      "Nama: " +
      g("j-nama") +
      "\nNIM: " +
      g("j-nim") +
      "\nNama rimba/lapangan: " +
      g("j-rimba") +
      "\nAngkatan Diksar: " +
      g("j-angkatan") +
      "\nKampus: " +
      g("j-kampus") +
      "\nNo. HP: " +
      g("j-wa") +
      "\nAlasan: " +
      g("j-alasan")
    );
  });

  wireForm(document.getElementById("kontak-form"), function () {
    var g = function (id) {
      var e = document.getElementById(id);
      return e ? e.value.trim() : "";
    };
    return (
      "Halo Dhinakara Adventure,\nNama: " +
      g("k-nama") +
      "\nEmail: " +
      g("k-email") +
      "\nPesan: " +
      g("k-pesan")
    );
  });

  function bindContacts() {
    if (!window.DATA) return;
    var s = DATA.site;
    function set(id, fn) {
      var e = document.getElementById(id);
      if (e) fn(e, s);
    }
    set("contact-address", function (e, site) {
      e.innerHTML =
        site.addressLine1 + "<br>" + site.addressLine2 + "<br>" + site.addressLine3;
    });
    set("contact-card-address", function (e, site) {
      e.innerHTML =
        site.addressLine1 + "<br>" + site.addressLine2 + "<br>" + site.addressLine3;
    });
    // Email & telepon tidak ditampilkan di situs publik
    ["contact-email", "contact-card-email", "contact-phone", "contact-card-phone"].forEach(
      function (id) {
        var el = document.getElementById(id);
        if (el) {
          var wrap = el.closest(".contact-block") || el.closest("li");
          if (wrap) wrap.style.display = "none";
          else el.style.display = "none";
        }
      }
    );
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
      a.style.display = "none";
    });
    var ig = document.getElementById("social-ig");
    if (ig && s.socials.instagram) ig.href = s.socials.instagram;
    var tt = document.getElementById("social-tt");
    if (tt) {
      if (s.socials.tiktok) tt.href = s.socials.tiktok;
      else tt.style.display = "none";
    }
  }
  bindContacts();
})();
