// Builds the Studio map page from data/studio.js and data/projects.js. You shouldn't need to edit this file.
(function () {
  const S = window.STUDIO;
  if (!S) return;
  const projects = (window.PROJECTS || []).filter((p) => p.show !== false);
  const layers = S.layers;
  const layerOf = Object.fromEntries(layers.map((l) => [l.id, l]));
  const STATUS = {
    shipped: { label: "Shipped", hint: "used in finished work shown here" },
    inuse: { label: "In use", hint: "real work that isn't public" },
    learning: { label: "Learning", hint: "practice has started" },
    planned: { label: "Planned", hint: "in the stack, not used yet" },
  };
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  // Colors go through the CSSOM because the site's security policy blocks style="" attributes.
  const tint = (n, color) => { n.style.setProperty("--c", color); return n; };
  const statusBadge = (s) => el("span", { class: `badge s-${s}`, text: STATUS[s].label });

  document.getElementById("studio-intro").textContent = S.intro;

  // Tally: how many tools sit at each stage.
  const tally = document.getElementById("tally");
  for (const [key, s] of Object.entries(STATUS)) {
    const count = S.tools.filter((t) => t.status === key).length;
    tally.append(el("div", { class: `tally-item s-${key}` },
      el("span", { class: "tally-n", text: String(count) }),
      el("span", { class: "tally-l", text: s.label }),
      el("span", { class: "tally-h", text: s.hint })));
  }

  // The engine: five plates stacked in 3D, top layer first in the data.
  const iso = document.getElementById("iso");
  const stack = [...layers].reverse(); // bottom plate first
  stack.forEach((l, i) => {
    const tools = S.tools.filter((t) => t.layer === l.id);
    const plate = tint(el("div", { class: "plate", "data-layer": l.id },
      el("span", { class: "plate-label", text: `${l.n} ${l.name}` }),
      el("div", { class: "tiles" }, ...tools.map((t, k) => {
        const tile = el("span", { class: `tile s-${t.status}`, text: t.short });
        tile.style.setProperty("--k", k); // staggers the pop-up when the plate lights
        return tile;
      }))), l.color);
    plate.style.setProperty("--i", i);
    iso.append(plate);
  });
  const you = el("div", { class: "you-chip", "data-layer": "you" }, el("span", { text: "Sign-off" }), el("small", { text: "human" }));
  you.style.setProperty("--i", stack.length);
  iso.append(el("div", { class: "beam" }), el("div", { class: "beam b2" }), you);

  const steps = document.getElementById("engine-steps");
  const shipped = S.tools.filter((t) => t.status === "shipped").length;
  steps.append(el("li", { class: "step", "data-step": "closed" },
    el("p", { class: "step-n", text: "00" }),
    el("h2", { text: "One director. One stack." }),
    el("p", { text: `${S.tools.length} tools across five layers, ${shipped} of them proven in shipped work. Keep scrolling and the stack opens one layer at a time.` })));
  for (const l of layers) {
    const tools = S.tools.filter((t) => t.layer === l.id);
    steps.append(tint(el("li", { class: "step", "data-step": l.id },
      el("p", { class: "step-n", text: l.n }),
      el("h2", { text: l.name }),
      el("p", { text: l.line }),
      el("ul", { class: "toolchips" }, ...tools.map((t) =>
        el("li", { class: `s-${t.status}`, title: t.what }, el("span", { class: "dot" }), el("span", { text: t.name }), el("em", { text: STATUS[t.status].label }))))), l.color));
  }
  steps.append(el("li", { class: "step", "data-step": "you" },
    el("p", { class: "step-n", text: "06" }),
    el("h2", { text: "Every release gets a human sign-off." }),
    el("p", { text: "The AI team drafts, builds and checks. Direction is set up front, anything without cleared rights is held, and nothing goes out without approval. No tool on this page does that job." })));

  const engine = document.querySelector(".engine");
  const setStep = (id) => {
    engine.dataset.step = id;
    for (const li of steps.children) li.classList.toggle("on", li.dataset.step === id);
  };
  setStep("closed");
  if (!still && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setStep(e.target.dataset.step);
    }, { rootMargin: matchMedia("(max-width: 860px)").matches ? "-72% 0px -18% 0px" : "-45% 0px -45% 0px" }); // phones: the card at the bottom of the screen
    for (const li of steps.children) io.observe(li);
  } else {
    engine.classList.add("still");
    setStep("you");
  }

  // Proof chart: tools down the side, projects across the top.
  const columns = [...projects.map((p) => ({ slug: p.slug, title: p.title, href: `project.html?p=${encodeURIComponent(p.slug)}` })), ...(S.extraColumns || [])];
  const matrix = document.getElementById("matrix");
  matrix.append(el("caption", { class: "sr", text: "Which tools were used in which projects" }));
  matrix.append(el("thead", {}, el("tr", {}, el("th", { scope: "col", text: "Tool" }),
    ...columns.map((c) => el("th", { scope: "col" }, c.href ? el("a", { href: c.href, text: c.title }) : el("span", { text: c.title }))))));
  const tbody = el("tbody");
  for (const l of layers) {
    tbody.append(tint(el("tr", { class: "layer-row" }, el("th", { scope: "rowgroup", colspan: String(columns.length + 1), text: `${l.n} ${l.name}` })), l.color));
    for (const t of S.tools.filter((x) => x.layer === l.id && x.status !== "planned")) {
      const row = tint(el("tr", { "data-status": t.status },
        el("th", { scope: "row" }, el("span", { class: "tool-name", text: t.name }), statusBadge(t.status), el("span", { class: "tool-what", text: t.what })),
        ...columns.map((c) => {
          const used = t.projects.includes(c.slug);
          return el("td", {}, used ? el("span", { class: "hit", role: "img", "aria-label": `Used in ${c.title}` }) : el("span", { class: "sr", text: "–" }));
        })), l.color);
      tbody.append(row);
    }
  }
  matrix.append(tbody);

  const filters = document.getElementById("filters");
  const options = [["all", "All"], ...Object.entries(STATUS).filter(([k]) => k !== "planned").map(([k, s]) => [k, s.label])];
  for (const [key, label] of options) {
    const b = el("button", { type: "button", class: `filter s-${key}`, "aria-pressed": key === "all" ? "true" : "false", text: label });
    b.addEventListener("click", () => {
      for (const x of filters.children) x.setAttribute("aria-pressed", String(x === b));
      for (const tr of tbody.querySelectorAll("tr[data-status]")) tr.hidden = key !== "all" && tr.dataset.status !== key;
      for (const tr of tbody.querySelectorAll(".layer-row")) {
        let n = tr.nextElementSibling, any = false;
        while (n && !n.classList.contains("layer-row")) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        tr.hidden = !any;
      }
    });
    filters.append(b);
  }

  // Workflows: chains of steps colored by layer, with a light that runs along each one.
  const flows = document.getElementById("flows");
  for (const w of S.workflows) {
    const chain = el("ol", { class: "chain" }, ...w.steps.map(([layer, label]) => {
      const l = layerOf[layer];
      const node = el("li", { class: l ? "node" : "node you" }, el("span", { class: "node-l", text: l ? l.name : layer }), el("span", { text: label }));
      return l ? tint(node, l.color) : node;
    }));
    flows.append(el("article", { class: "flow" }, el("h3", { text: w.name }), el("p", { class: "flow-note", text: w.note }), el("div", { class: "chain-wrap" }, chain, el("span", { class: "runner", "aria-hidden": "true" }))));
  }

  const road = document.getElementById("road");
  const ROAD = { progress: "In progress", held: "On hold", done: "Done", next: "Next" };
  S.roadmap.forEach((r, i) => road.append(el("article", { class: `road-step r-${r.status}` },
    el("span", { class: "road-n", text: String(i + 1).padStart(2, "0") }),
    el("h3", { text: r.name }),
    el("span", { class: "road-s", text: ROAD[r.status] || r.status }),
    el("p", { text: r.what }))));
  document.getElementById("choosing").textContent = S.choosing;
})();
