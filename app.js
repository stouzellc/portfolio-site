// Fills the pages from data/site.js and data/projects.js. You shouldn't need to edit this file.
(function () {
  const site = window.SITE || {};
  const projects = (window.PROJECTS || []).filter((p) => p.show !== false);
  let viewer; // set by setupViewer(); declared here because the pages render below

  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    }
    for (const kid of kids) if (kid) n.append(kid);
    return n;
  };

  document.querySelectorAll("[data-site]").forEach((n) => {
    const v = site[n.dataset.site];
    if (typeof v === "string" && v) n.textContent = v;
  });
  document.querySelectorAll("#year").forEach((n) => (n.textContent = new Date().getFullYear()));

  // The giant name fills the width of its column, whatever the font and screen.
  const fit = () => document.querySelectorAll(".fit").forEach((n) => {
    n.style.fontSize = "";
    const room = n.parentElement.clientWidth - parseFloat(getComputedStyle(n.parentElement).paddingLeft) - parseFloat(getComputedStyle(n.parentElement).paddingRight);
    const size = parseFloat(getComputedStyle(n).fontSize);
    if (n.scrollWidth) n.style.fontSize = `${Math.floor(size * room / n.scrollWidth * 0.98)}px`;
  });
  fit();
  addEventListener("resize", fit);
  if (document.fonts) document.fonts.ready.then(fit);

  if (document.body.dataset.page === "home") home();
  else if (document.body.dataset.page === "project") projectPage();

  function home() {
    const grid = document.getElementById("project-grid");
    projects.forEach((p, i) => {
      const href = `project.html?p=${encodeURIComponent(p.slug)}`;
      const card = el("article", { class: "card" },
        el("a", { class: "card-img", href, tabindex: "-1", "aria-hidden": "true" },
          p.cover ? el("img", { src: p.cover, alt: "", loading: "lazy", width: "1440", height: "900" }) : el("span", { class: "card-blank", text: p.title })),
        el("div", { class: "card-body" },
          el("p", { class: "card-n", text: [String(i + 1).padStart(2, "0"), p.video ? "Video" : "", p.year].filter(Boolean).join(" · ") }),
          el("h3", {}, el("a", { href, text: p.title })),
          el("p", { class: "card-role", text: p.tagline })));
      grid.append(card);
    });

    const rows = (id, items) => {
      const list = document.getElementById(id);
      for (const [name, note] of items || []) list.append(el("li", {}, el("span", { class: "row-name", text: name }), el("span", { text: note })));
    };
    rows("skills", site.skills);
    rows("toolkit", site.toolkit);
    document.getElementById("toolkit").append(el("li", {}, el("a", { href: "studio.html", text: "See all 35 tools →" })));
    // Work log: types each line, holds, then starts again. Still visitors get every line at once.
    const log = document.getElementById("worklog");
    if (log) {
      const lines = site.worklog || [];
      const row = ([k, v]) => el("li", {}, el("span", { class: "wl-k", text: k }), el("span", { class: "wl-v", text: v }));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) lines.forEach((l) => log.append(row(l)));
      else {
        const type = async () => {
          for (;;) {
            log.textContent = "";
            for (const [k, v] of lines) {
              const li = row([k, ""]);
              li.classList.add("typing");
              log.append(li);
              const out = li.querySelector(".wl-v");
              for (let i = 1; i <= v.length; i++) { out.textContent = v.slice(0, i); await new Promise((r) => setTimeout(r, 28)); }
              li.classList.remove("typing");
              await new Promise((r) => setTimeout(r, 450));
            }
            await new Promise((r) => setTimeout(r, 4000));
          }
        };
        type();
      }
    }

    // Tool names twice over, so the strip loops without a seam.
    const ticker = document.getElementById("ticker");
    if (ticker) for (let r = 0; r < 2; r++) for (const t of site.ticker || []) ticker.append(el("span", { text: t }));

    // The layer stack leans toward the pointer.
    const band = document.querySelector(".studio-band");
    const tilt = band && band.querySelector(".disc-tilt");
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      band.addEventListener("pointermove", (e) => {
        const r = band.getBoundingClientRect();
        tilt.style.setProperty("--tx", `${((e.clientX - r.left) / r.width - .5) * 24}deg`);
        tilt.style.setProperty("--ty", `${((e.clientY - r.top) / r.height - .5) * -18}deg`);
      });
      band.addEventListener("pointerleave", () => { tilt.style.removeProperty("--tx"); tilt.style.removeProperty("--ty"); });
    }

    if (site.email) document.getElementById("email-btn").href = `mailto:${site.email}`;

    const about = document.getElementById("about-text");
    for (const para of site.about || []) about.append(el("p", { text: para }));

    const list = document.getElementById("contact-links");
    const links = [
      site.email && { label: site.email, href: `mailto:${site.email}`, kind: "Email" },
      site.linkedin && { label: site.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: site.linkedin, kind: "LinkedIn" },
      site.github && { label: site.github.replace(/^https?:\/\/(www\.)?/, ""), href: site.github, kind: "GitHub" },
    ].filter(Boolean);
    for (const l of links) {
      const a = el("a", { href: l.href, text: l.label });
      if (!l.href.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
      list.append(el("li", {}, el("span", { class: "kind", text: l.kind }), a));
    }

    const intro = document.querySelector('[data-site="intro"]');
    if (intro && !site.intro) intro.remove();
  }

  function projectPage() {
    const slug = new URLSearchParams(location.search).get("p");
    const p = projects.find((x) => x.slug === slug);
    const body = document.getElementById("project-body");
    body.textContent = "";
    if (!p) {
      body.append(el("h1", { text: "Project not found" }), el("p", {}, el("a", { href: "./#projects", text: "See all projects" })));
      return;
    }
    document.title = `${p.title} · ${site.name || ""}`;
    document.querySelector('meta[name="description"]').setAttribute("content", p.tagline);

    body.append(
      el("p", { class: "eyebrow", text: [p.year, p.status].filter(Boolean).join(" · ") }),
      el("h1", { text: p.title }),
      el("p", { class: "lede", text: p.tagline }));

    const facts = el("dl", { class: "facts" },
      el("div", {}, el("dt", { text: "Ownership" }), el("dd", { text: p.role })),
      (p.tools || []).length ? el("div", {}, el("dt", { text: "Tools" }), el("dd", {}, el("ul", { class: "chips" }, ...p.tools.map((t) => el("li", { text: t }))))) : null);
    body.append(facts);

    // With a video, it leads the page and every screenshot moves to the gallery below.
    const shots = (p.images || []);
    if (p.video) body.append(videoFigure(p.video));
    else if (shots[0]) body.append(figure(shots[0], "lead"));
    if (p.system) body.append(systemMap(p.system));
    const gallery = p.video ? shots : shots.slice(1);

    const story = el("div", { class: "prose" });
    for (const para of p.summary || []) story.append(el("p", { text: para }));
    if ((p.built || []).length) story.append(el("h2", { text: "What it delivers" }), el("ul", {}, ...p.built.map((b) => el("li", { text: b }))));
    body.append(story);

    if (gallery.length) {
      body.append(el("h2", { class: "section-h small", text: "Screenshots" }));
      body.append(el("div", { class: "shots" }, ...gallery.map((s) => figure(s))));
    }

    if (p.note || (p.links || []).length) {
      const box = el("aside", { class: "note" });
      if (p.note) box.append(el("p", { text: p.note }));
      if ((p.links || []).length) box.append(el("ul", { class: "plain" }, ...p.links.map((l) => el("li", {}, el("a", { href: l.url, target: "_blank", rel: "noopener", text: l.label })))));
      body.append(box);
    }

    const i = projects.indexOf(p);
    const next = projects[(i + 1) % projects.length];
    if (next && next !== p) body.append(el("p", { class: "next" }, el("a", { href: `project.html?p=${encodeURIComponent(next.slug)}`, text: `Next project: ${next.title} →` })));

    setupViewer();
  }

  // A project's working system: counts, the path a job takes (a light runs along it), and its parts.
  // A chain step written as a list of pairs shows those tools side by side in one step.
  function systemMap(sys) {
    const wrap = el("section", { class: "sys", "aria-label": sys.title || "How it works" });
    if ((sys.counts || []).length) wrap.append(el("ul", { class: "sys-counts" }, ...sys.counts.map(([n, label]) => el("li", {}, el("strong", { text: n }), el("span", { text: label })))));
    if (sys.title) wrap.append(el("h2", { class: "section-h small", text: sys.title }));
    if ((sys.chain || []).length) {
      const chain = el("ol", { class: "sys-chain" });
      chain.style.setProperty("--n", sys.chain.length);
      sys.chain.forEach((step, i) => {
        const pairs = Array.isArray(step[0]) ? step : [step];
        const node = el("li", { class: pairs.length > 1 ? "sys-node sys-pair" : "sys-node" },
          ...pairs.map(([name, what]) => el("p", {}, el("strong", { text: name }), el("span", { text: what }))));
        node.style.setProperty("--i", i);
        chain.append(node);
      });
      wrap.append(chain);
    }
    if (sys.chainNote) wrap.append(el("p", { class: "sys-note", text: sys.chainNote }));
    if ((sys.parts || []).length) wrap.append(el("ul", { class: "sys-parts" }, ...sys.parts.map((x) =>
      el("li", {}, el("h3", { text: x.name }), el("p", { text: x.what }), el("p", { class: "sys-where", text: `${x.whereLabel || sys.whereLabel || "Runs in"} ${x.where}` })))));
    return wrap;
  }

  function figure(s, extra = "") {
    const btn = el("button", { type: "button", class: "shot-btn", "aria-label": `Enlarge: ${s.alt}` },
      el("img", { src: s.src, alt: s.alt, loading: extra === "lead" ? "eager" : "lazy" }));
    btn.addEventListener("click", () => openViewer(s));
    return el("figure", { class: ["shot", extra, s.phone ? "phone" : ""].filter(Boolean).join(" ") }, btn, s.caption ? el("figcaption", { text: s.caption }) : null);
  }

  // Muted clip that plays while on screen. Visitors who ask for reduced motion get the
  // poster and the controls instead of autoplay.
  function videoFigure(v) {
    const video = el("video", { src: v.src, poster: v.poster, preload: "metadata", controls: "", playsinline: "", "aria-label": v.alt || "" });
    video.muted = true;
    video.loop = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still && "IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      }, { threshold: 0.4 }).observe(video);
    }
    return el("figure", { class: "shot lead video" }, video, v.caption ? el("figcaption", { text: v.caption }) : null);
  }

  function setupViewer() {
    viewer = document.getElementById("viewer");
    viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
    viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });
  }
  function openViewer(s) {
    if (!viewer || !viewer.showModal) return window.open(s.src, "_blank");
    viewer.querySelector("img").src = s.src;
    viewer.querySelector("img").alt = s.alt;
    viewer.querySelector(".viewer-cap").textContent = s.caption || "";
    viewer.classList.toggle("phone", !!s.phone);
    viewer.showModal();
  }
})();
