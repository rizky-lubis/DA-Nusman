/* Admin CMS — Dhinakara Adventure */
(function () {
  "use strict";

  var CMS_KEY = "da_cms_data";
  var PASS_KEY = "da_cms_pass";
  var SESSION_KEY = "da_cms_session";
  var DEFAULT_PASS = "dhinakara";

  var DEFAULT_STRUKTUR = window.DATA && DATA.struktur
    ? JSON.parse(JSON.stringify(DATA.struktur))
    : {
        periode: "2025 / 2026",
        catatan: "Badan Pengurus Harian (BPH) · masa jabatan 1 tahun",
        roles: [],
      };

  var TITLES = {
    dashboard: "Dashboard",
    news: "Berita",
    events: "Agenda",
    gallery: "Galeri",
    divisions: "Divisi",
    struktur: "Struktur",
    hero: "Hero",
    site: "Identitas",
    settings: "Pengaturan",
  };

  var IMG_MAX_EDGE = 1400;
  var IMG_QUALITY = 0.78;
  var IMG_MAX_BYTES = 2.5 * 1024 * 1024;

  var state = null;

  function $(id) {
    return document.getElementById(id);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getPass() {
    return localStorage.getItem(PASS_KEY) || DEFAULT_PASS;
  }

  function toast(msg, isError) {
    var el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle("error", !!isError);
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.add("hidden");
    }, 3200);
  }

  function loadState() {
    var base = window.DATA ? clone(DATA) : {};
    try {
      var raw = localStorage.getItem(CMS_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        Object.keys(saved).forEach(function (k) {
          if (k === "struktur") return;
          base[k] = saved[k];
        });
        if (
          saved.struktur &&
          Array.isArray(saved.struktur.roles) &&
          saved.struktur.roles.length > 0
        ) {
          base.struktur = saved.struktur;
        }
      }
    } catch (e) {}
    if (!base.struktur || !Array.isArray(base.struktur.roles) || !base.struktur.roles.length) {
      base.struktur = clone(DEFAULT_STRUKTUR);
    }
    return base;
  }

  function syncStrukturFromDom() {
    if (!state.struktur) state.struktur = clone(DEFAULT_STRUKTUR);
    var periode = $("struktur-periode");
    var catatan = $("struktur-catatan");
    if (periode) state.struktur.periode = periode.value;
    if (catatan) state.struktur.catatan = catatan.value;
    document.querySelectorAll("#list-struktur .struktur-card").forEach(function (card) {
      var idx = Number(card.getAttribute("data-index"));
      if (isNaN(idx) || !state.struktur.roles[idx]) return;
      card.querySelectorAll("[data-key]").forEach(function (inp) {
        state.struktur.roles[idx][inp.getAttribute("data-key")] = inp.value;
      });
      state.struktur.roles[idx].level = Number(state.struktur.roles[idx].level) || 3;
    });
  }

  function persistable() {
    return {
      site: state.site,
      news: state.news,
      events: state.events,
      gallery: state.gallery,
      struktur: state.struktur,
      heroSlides: state.heroSlides,
      visi: state.visi,
      misi: state.misi,
      timeline: state.timeline,
      divisions: state.divisions,
      diksar: state.diksar,
      dikjut: state.dikjut,
      keanggotaan: state.keanggotaan,
    };
  }

  function saveLocal() {
    try {
      localStorage.setItem(CMS_KEY, JSON.stringify(persistable()));
      toast("Perubahan disimpan. Refresh halaman situs untuk melihat.");
    } catch (err) {
      toast(
        "Gagal menyimpan: penyimpanan penuh. Kurangi ukuran/jumlah foto, lalu coba lagi.",
        true
      );
    }
  }

  function exportDataJs() {
    var payload = persistable();
    /* Merge onto full DATA so export stays complete */
    var full = window.DATA ? clone(DATA) : {};
    Object.keys(payload).forEach(function (k) {
      if (payload[k] !== undefined) full[k] = payload[k];
    });
    var body =
      "/* =========================================================================\n" +
      "   DHINAKARA ADVENTURE — Pusat Data Konten (publik)\n" +
      "   Diekspor dari Admin CMS · " +
      new Date().toISOString().slice(0, 10) +
      "\n" +
      "   ========================================================================= */\n\n" +
      "var DATA = " +
      JSON.stringify(full, null, 2) +
      ";\n";
    var blob = new Blob([body], { type: "application/javascript;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    a.click();
    URL.revokeObjectURL(url);
    toast("File data.js diunduh. Ganti js/data.js di hosting.");
  }

  function showApp() {
    $("login-screen").classList.add("hidden");
    $("app").classList.remove("hidden");
    state = loadState();
    renderAll();
  }

  function showLogin() {
    $("login-screen").classList.remove("hidden");
    $("app").classList.add("hidden");
    sessionStorage.removeItem(SESSION_KEY);
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function field(label, key, value, type) {
    type = type || "text";
    if (type === "textarea") {
      return (
        "<label>" +
        label +
        '<textarea data-key="' +
        key +
        '" rows="3">' +
        escapeHtml(value) +
        "</textarea></label>"
      );
    }
    return (
      "<label>" +
      label +
      '<input type="' +
      type +
      '" data-key="' +
      key +
      '" value="' +
      escapeHtml(value) +
      '"></label>'
    );
  }

  function imageField(label, key, value) {
    var src = value || "";
    var hasImg = !!src;
    return (
      '<div class="img-field" data-img-key="' +
      key +
      '">' +
      '<span class="img-field-label">' +
      label +
      "</span>" +
      '<div class="img-preview' +
      (hasImg ? "" : " is-empty") +
      '">' +
      (hasImg
        ? '<img src="' + escapeHtml(src) + '" alt="Preview">'
        : "<span>Belum ada foto</span>") +
      "</div>" +
      '<div class="img-actions">' +
      '<label class="btn btn-ghost btn-sm img-upload-btn">' +
      "Pilih foto" +
      '<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden data-upload="' +
      key +
      '">' +
      "</label>" +
      '<button type="button" class="btn btn-ghost btn-sm" data-clear-img="' +
      key +
      '"' +
      (hasImg ? "" : " disabled") +
      ">Hapus foto</button>" +
      "</div>" +
      "<label>Atau tempel URL gambar" +
      '<input type="url" data-key="' +
      key +
      '" value="' +
      escapeHtml(src) +
      '" placeholder="https://… atau hasil upload">' +
      '<span class="field-hint">Upload dari perangkat lebih mudah. URL tetap didukung.</span>' +
      "</label>" +
      "</div>"
    );
  }

  function compressImageFile(file) {
    return new Promise(function (resolve, reject) {
      if (!file || !file.type || file.type.indexOf("image/") !== 0) {
        reject(new Error("File harus berupa gambar (JPG, PNG, WebP, GIF)."));
        return;
      }
      if (file.size > IMG_MAX_BYTES) {
        reject(new Error("Ukuran file maksimal 2,5 MB. Kompres dulu atau pilih foto lain."));
        return;
      }
      var reader = new FileReader();
      reader.onerror = function () {
        reject(new Error("Gagal membaca file."));
      };
      reader.onload = function () {
        var img = new Image();
        img.onerror = function () {
          reject(new Error("File gambar tidak valid."));
        };
        img.onload = function () {
          var w = img.naturalWidth || img.width;
          var h = img.naturalHeight || img.height;
          var scale = Math.min(1, IMG_MAX_EDGE / Math.max(w, h));
          var tw = Math.max(1, Math.round(w * scale));
          var th = Math.max(1, Math.round(h * scale));
          var canvas = document.createElement("canvas");
          canvas.width = tw;
          canvas.height = th;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, tw, th);
          var outType = file.type === "image/png" ? "image/png" : "image/jpeg";
          var dataUrl = canvas.toDataURL(outType, IMG_QUALITY);
          resolve(dataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function setImagePreview(fieldEl, src) {
    if (!fieldEl) return;
    var preview = fieldEl.querySelector(".img-preview");
    var clearBtn = fieldEl.querySelector("[data-clear-img]");
    var input = fieldEl.querySelector("input[data-key]");
    if (input) input.value = src || "";
    if (preview) {
      if (src) {
        preview.classList.remove("is-empty");
        preview.innerHTML = '<img src="' + src + '" alt="Preview">';
      } else {
        preview.classList.add("is-empty");
        preview.innerHTML = "<span>Belum ada foto</span>";
      }
    }
    if (clearBtn) clearBtn.disabled = !src;
  }

  function bindImageFields(card, obj) {
    if (!card || !obj) return;
    card.querySelectorAll(".img-field").forEach(function (fieldEl) {
      var key = fieldEl.getAttribute("data-img-key");
      var fileInput = fieldEl.querySelector("input[data-upload]");
      var clearBtn = fieldEl.querySelector("[data-clear-img]");
      var urlInput = fieldEl.querySelector("input[data-key]");

      if (fileInput && !fileInput._bound) {
        fileInput._bound = true;
        fileInput.addEventListener("change", function () {
          var file = fileInput.files && fileInput.files[0];
          fileInput.value = "";
          if (!file) return;
          toast("Mengompres foto…");
          compressImageFile(file)
            .then(function (dataUrl) {
              obj[key] = dataUrl;
              setImagePreview(fieldEl, dataUrl);
              toast("Foto berhasil diunggah.");
            })
            .catch(function (err) {
              toast(err.message || "Gagal mengunggah foto.", true);
            });
        });
      }

      if (clearBtn && !clearBtn._bound) {
        clearBtn._bound = true;
        clearBtn.addEventListener("click", function () {
          obj[key] = "";
          setImagePreview(fieldEl, "");
        });
      }

      if (urlInput && !urlInput._boundImg) {
        urlInput._boundImg = true;
        urlInput.addEventListener("input", function () {
          obj[key] = urlInput.value;
          setImagePreview(fieldEl, urlInput.value.trim());
        });
        urlInput.addEventListener("change", function () {
          obj[key] = urlInput.value;
          setImagePreview(fieldEl, urlInput.value.trim());
        });
      }
    });
  }

  function readFields(card, obj) {
    card.querySelectorAll("[data-key]").forEach(function (inp) {
      obj[inp.getAttribute("data-key")] = inp.value;
    });
  }

  function updateStats() {
    $("stat-news").textContent = (state.news || []).length;
    $("stat-events").textContent = (state.events || []).length;
    $("stat-gallery").textContent = (state.gallery || []).length;
    $("stat-struktur").textContent =
      (state.struktur && state.struktur.roles ? state.struktur.roles.length : 0);
  }

  function renderNews() {
    var box = $("list-news");
    box.innerHTML = "";
    (state.news || []).forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML =
        '<div class="item-card-head"><strong>Berita #' +
        (i + 1) +
        '</strong><div class="item-actions">' +
        '<button type="button" class="btn btn-ghost btn-sm" data-up="news" data-i="' +
        i +
        '">↑</button>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-down="news" data-i="' +
        i +
        '">↓</button>' +
        '<button type="button" class="btn btn-danger btn-sm" data-del="news" data-i="' +
        i +
        '">Hapus</button></div></div>' +
        '<div class="form-grid form-grid-2">' +
        field("Judul", "title", item.title) +
        field("Kategori", "category", item.category) +
        field("Tanggal", "date", item.date) +
        field("Lokasi", "location", item.location) +
        field("Link", "link", item.link || "kegiatan.html") +
        "</div>" +
        imageField("Foto berita", "image", item.image) +
        field("Ringkasan", "excerpt", item.excerpt, "textarea");
      box.appendChild(card);
      card.addEventListener("change", function () {
        readFields(card, state.news[i]);
      });
      card.addEventListener("input", function () {
        readFields(card, state.news[i]);
      });
      bindImageFields(card, state.news[i]);
    });
  }

  function renderEvents() {
    var box = $("list-events");
    box.innerHTML = "";
    (state.events || []).forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML =
        '<div class="item-card-head"><strong>Agenda #' +
        (i + 1) +
        '</strong><div class="item-actions">' +
        '<button type="button" class="btn btn-danger btn-sm" data-del="events" data-i="' +
        i +
        '">Hapus</button></div></div>' +
        '<div class="form-grid form-grid-2">' +
        field("Tanggal", "date", item.date) +
        field("Judul", "title", item.title) +
        field("Kategori", "category", item.category) +
        field("Lokasi", "location", item.location) +
        field("Status", "status", item.status || "mendaftar") +
        "</div>";
      box.appendChild(card);
      card.addEventListener("change", function () {
        readFields(card, state.events[i]);
      });
      card.addEventListener("input", function () {
        readFields(card, state.events[i]);
      });
    });
  }

  function renderGallery() {
    var box = $("list-gallery");
    box.innerHTML = "";
    (state.gallery || []).forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML =
        '<div class="item-card-head"><strong>Foto #' +
        (i + 1) +
        '</strong><div class="item-actions">' +
        '<button type="button" class="btn btn-danger btn-sm" data-del="gallery" data-i="' +
        i +
        '">Hapus</button></div></div>' +
        imageField("Foto galeri", "src", item.src) +
        '<div class="form-grid form-grid-2">' +
        field("Kategori", "category", item.category) +
        field("Caption", "caption", item.caption) +
        "</div>";
      box.appendChild(card);
      card.addEventListener("change", function () {
        readFields(card, state.gallery[i]);
      });
      card.addEventListener("input", function () {
        readFields(card, state.gallery[i]);
      });
      bindImageFields(card, state.gallery[i]);
    });
  }

  function renderDivisions() {
    var box = $("list-divisions");
    if (!box) return;
    box.innerHTML = "";
    (state.divisions || []).forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML =
        '<div class="item-card-head"><strong>' +
        escapeHtml(item.name || "Divisi") +
        "</strong></div>" +
        '<div class="form-grid form-grid-2">' +
        field("Nama divisi", "name", item.name) +
        field("Deskripsi", "desc", item.desc) +
        "</div>" +
        imageField("Foto divisi", "image", item.image);
      box.appendChild(card);
      card.addEventListener("change", function () {
        readFields(card, state.divisions[i]);
      });
      card.addEventListener("input", function () {
        readFields(card, state.divisions[i]);
      });
      bindImageFields(card, state.divisions[i]);
    });
  }

  function renderStruktur() {
    if (!state.struktur) {
      state.struktur = { periode: "", catatan: "", roles: [] };
    }
    $("struktur-periode").value = state.struktur.periode || "";
    $("struktur-catatan").value = state.struktur.catatan || "";
    var box = $("list-struktur");
    box.innerHTML = "";

    var levelLabel = {
      1: { title: "Pimpinan (paling atas di bagan)", badge: "Baris 1 · Ketua" },
      2: { title: "Pengurus inti", badge: "Baris 2" },
      3: { title: "Bidang pendukung", badge: "Baris 3" },
    };

    var roles = state.struktur.roles || [];
    var sorted = roles
      .map(function (r, i) {
        return { r: r, i: i };
      })
      .sort(function (a, b) {
        return (a.r.level || 3) - (b.r.level || 3);
      });

    var lastLevel = null;
    sorted.forEach(function (entry) {
      var item = entry.r;
      var i = entry.i;
      var lv = Number(item.level) || 3;
      if (lv !== lastLevel) {
        lastLevel = lv;
        var head = document.createElement("div");
        head.className = "struktur-group-label";
        head.textContent = (levelLabel[lv] && levelLabel[lv].title) || "Lainnya";
        box.appendChild(head);
      }

      var card = document.createElement("div");
      card.className = "item-card struktur-card";
      card.setAttribute("data-index", String(i));
      var badge =
        (levelLabel[lv] && levelLabel[lv].badge) || "Baris " + lv;
      card.innerHTML =
        '<div class="item-card-head">' +
        '<div class="struktur-card-title">' +
        '<span class="struktur-badge">' +
        escapeHtml(badge) +
        "</span>" +
        "<strong>" +
        escapeHtml(item.role || "Jabatan") +
        "</strong>" +
        "</div></div>" +
        '<div class="form-grid form-grid-2">' +
        '<label>Nama jabatan (tampil di bagan)' +
        '<input type="text" data-key="role" value="' +
        escapeHtml(item.role || "") +
        '">' +
        '<span class="field-hint">Biasanya tidak perlu diubah.</span></label>' +
        '<label>Nama pengurus' +
        '<input type="text" data-key="name" value="' +
        escapeHtml(item.name || "") +
        '" placeholder="Contoh: Ahmad Fauzan">' +
        '<span class="field-hint">Kosongkan jika nama belum ingin ditampilkan.</span></label>' +
        '<label>Posisi di bagan' +
        '<select data-key="level">' +
        '<option value="1"' +
        (lv === 1 ? " selected" : "") +
        ">Baris 1 — paling atas (Ketua)</option>" +
        '<option value="2"' +
        (lv === 2 ? " selected" : "") +
        ">Baris 2 — pengurus inti</option>" +
        '<option value="3"' +
        (lv === 3 ? " selected" : "") +
        ">Baris 3 — bidang pendukung</option>" +
        "</select>" +
        '<span class="field-hint">Menentukan letak kotak di bagan Profil.</span></label>' +
        '<label>Tugas singkat (opsional)' +
        '<input type="text" data-key="desc" value="' +
        escapeHtml(item.desc || "") +
        '" placeholder="Contoh: Memimpin UKM dan mewakili organisasi.">' +
        '<span class="field-hint">Teks kecil di bawah nama.</span></label>' +
        "</div>" +
        imageField("Foto pengurus (opsional)", "photo", item.photo || "");
      box.appendChild(card);
      card.addEventListener("change", function (ev) {
        readFields(card, state.struktur.roles[i]);
        state.struktur.roles[i].level = Number(state.struktur.roles[i].level) || 3;
        if (ev.target && ev.target.getAttribute("data-key") === "level") {
          renderStruktur();
        }
      });
      card.addEventListener("input", function () {
        readFields(card, state.struktur.roles[i]);
        state.struktur.roles[i].level = Number(state.struktur.roles[i].level) || 3;
      });
      bindImageFields(card, state.struktur.roles[i]);
    });
  }

  function renderHero() {
    var box = $("list-hero");
    box.innerHTML = "";
    (state.heroSlides || []).forEach(function (item, i) {
      var card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML =
        '<div class="item-card-head"><strong>Slide #' +
        (i + 1) +
        '</strong><div class="item-actions">' +
        '<button type="button" class="btn btn-danger btn-sm" data-del="hero" data-i="' +
        i +
        '">Hapus</button></div></div>' +
        imageField("Foto slide", "src", item.src) +
        '<div class="form-grid form-grid-2">' +
        field("Label", "label", item.label || "") +
        field("Alt text", "alt", item.alt || "") +
        "</div>";
      box.appendChild(card);
      card.addEventListener("change", function () {
        readFields(card, state.heroSlides[i]);
      });
      card.addEventListener("input", function () {
        readFields(card, state.heroSlides[i]);
      });
      bindImageFields(card, state.heroSlides[i]);
    });
  }

  function renderSite() {
    var s = state.site || {};
    $("site-name").value = s.name || "";
    $("site-university").value = s.university || "";
    $("site-tagline").value = s.tagline || "";
    $("site-ig").value = (s.socials && s.socials.instagram) || "";
    $("site-ig-label").value = (s.socials && s.socials.instagramLabel) || "";
    $("site-addr3").value = s.addressLine3 || "";
    $("site-desc").value = s.description || "";
  }

  function syncSiteFromForm() {
    if (!state.site) state.site = {};
    if (!state.site.socials) state.site.socials = {};
    state.site.name = $("site-name").value;
    state.site.university = $("site-university").value;
    state.site.tagline = $("site-tagline").value;
    state.site.socials.instagram = $("site-ig").value;
    state.site.socials.instagramLabel = $("site-ig-label").value;
    state.site.addressLine3 = $("site-addr3").value;
    state.site.description = $("site-desc").value;
  }

  function renderAll() {
    updateStats();
    renderNews();
    renderEvents();
    renderGallery();
    renderDivisions();
    renderStruktur();
    renderHero();
    renderSite();
  }

  function moveItem(arr, i, dir) {
    var j = i + dir;
    if (j < 0 || j >= arr.length) return;
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-tab]");
    if (t && t.classList.contains("nav-item")) {
      var tab = t.getAttribute("data-tab");
      document.querySelectorAll(".nav-item").forEach(function (n) {
        n.classList.toggle("active", n === t);
      });
      document.querySelectorAll(".panel").forEach(function (p) {
        p.classList.toggle("active", p.id === "tab-" + tab);
      });
      $("page-title").textContent = TITLES[tab] || tab;
      return;
    }

    var add = e.target.closest("[data-add]");
    if (add) {
      var kind = add.getAttribute("data-add");
      if (kind === "news") {
        state.news = state.news || [];
        state.news.unshift({
          title: "Judul berita baru",
          category: "Gunung Hutan",
          date: "2026",
          location: "UNM",
          image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80&auto=format&fit=crop",
          excerpt: "Ringkasan singkat kegiatan.",
          link: "kegiatan.html",
        });
        renderNews();
      } else if (kind === "events") {
        state.events = state.events || [];
        state.events.push({
          date: "TBA",
          title: "Agenda baru",
          category: "Umum",
          location: "Sekretariat",
          status: "mendaftar",
        });
        renderEvents();
      } else if (kind === "gallery") {
        state.gallery = state.gallery || [];
        state.gallery.push({
          src:
            "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1000&q=80&auto=format&fit=crop",
          category: "Gunung Hutan",
          caption: "Caption foto",
        });
        renderGallery();
      } else if (kind === "hero") {
        state.heroSlides = state.heroSlides || [];
        state.heroSlides.push({
          src:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80&auto=format&fit=crop",
          alt: "Slide baru",
          label: "Label",
        });
        renderHero();
      }
      updateStats();
      return;
    }

    var del = e.target.closest("[data-del]");
    if (del) {
      var di = Number(del.getAttribute("data-i"));
      var dk = del.getAttribute("data-del");
      if (dk === "news") {
        state.news.splice(di, 1);
        renderNews();
      } else if (dk === "events") {
        state.events.splice(di, 1);
        renderEvents();
      } else if (dk === "gallery") {
        state.gallery.splice(di, 1);
        renderGallery();
      } else if (dk === "hero") {
        state.heroSlides.splice(di, 1);
        renderHero();
      }
      updateStats();
      return;
    }

    var up = e.target.closest("[data-up]");
    if (up) {
      moveItem(state.news, Number(up.getAttribute("data-i")), -1);
      renderNews();
      return;
    }
    var down = e.target.closest("[data-down]");
    if (down) {
      moveItem(state.news, Number(down.getAttribute("data-i")), 1);
      renderNews();
    }
  });

  $("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var pass = $("login-pass").value;
    if (pass === getPass()) {
      sessionStorage.setItem(SESSION_KEY, "1");
      showApp();
    } else {
      toast("Kata sandi salah.", true);
    }
  });

  $("btn-logout").addEventListener("click", showLogin);
  var logoutMobile = $("btn-logout-mobile");
  if (logoutMobile) logoutMobile.addEventListener("click", showLogin);

  $("btn-save").addEventListener("click", function () {
    syncSiteFromForm();
    syncStrukturFromDom();
    saveLocal();
  });

  $("btn-export").addEventListener("click", function () {
    syncSiteFromForm();
    syncStrukturFromDom();
    saveLocal();
    exportDataJs();
  });

  $("btn-pass").addEventListener("click", function () {
    var a = $("new-pass").value;
    var b = $("new-pass2").value;
    if (a.length < 6) {
      toast("Kata sandi minimal 6 karakter.", true);
      return;
    }
    if (a !== b) {
      toast("Ulangan kata sandi tidak sama.", true);
      return;
    }
    localStorage.setItem(PASS_KEY, a);
    $("new-pass").value = "";
    $("new-pass2").value = "";
    toast("Kata sandi diganti.");
  });

  $("btn-reset").addEventListener("click", function () {
    if (!confirm("Reset semua perubahan admin ke data bawaan js/data.js?")) return;
    localStorage.removeItem(CMS_KEY);
    state = loadState();
    renderAll();
    toast("Sudah direset ke data bawaan.");
  });

  var restoreBtn = $("btn-restore-struktur");
  if (restoreBtn) {
    restoreBtn.addEventListener("click", function () {
      if (!confirm("Pulihkan struktur ke contoh bawaan (7 jabatan BPH)?")) return;
      state.struktur = clone(DEFAULT_STRUKTUR);
      renderStruktur();
      updateStats();
      toast("Struktur contoh dipulihkan. Klik Simpan perubahan.");
    });
  }

  ["struktur-periode", "struktur-catatan"].forEach(function (id) {
    var el = $(id);
    if (el) {
      el.addEventListener("change", syncStrukturFromDom);
      el.addEventListener("input", function () {
        if (!state.struktur) state.struktur = clone(DEFAULT_STRUKTUR);
        state.struktur.periode = $("struktur-periode").value;
        state.struktur.catatan = $("struktur-catatan").value;
      });
    }
  });

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    showApp();
  }
})();
