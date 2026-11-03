// The Studio map: the tools behind the projects, and how honest each claim is.
// status: "shipped"  = used in a finished project on this site 
//         "inuse"    = used for real work that isn't public
//         "learning" = practice has started
//         "planned"  = in the stack, not used yet
// projects: slugs from data/projects.js, plus "portfolio" for this site itself
//           and "other" for real work that has no project page here.
// To add a tool, copy one line and change it. Keep every claim backed by real work.
window.STUDIO = {
  intro: "One director, five layers, an AI team, and a human sign-off on every release. Scroll to open it up.",

  layers: [
    { id: "think", n: "01", name: "Think", color: "#ff8a7a",
      line: "Strategy, research and code with AI partners. Direction stays human; the tools widen what can be tried." },
    { id: "organize", n: "02", name: "Organize", color: "#f5bd5c",
      line: "Plain Markdown files, owned outright, so every tool reads the same memory." },
    { id: "create", n: "03", name: "Create", color: "#4fd6c4",
      line: "Stills, 3D and motion. Generated scenes are studies; the source art is original." },
    { id: "systemize", n: "04", name: "Systemize", color: "#a693ff",
      line: "Code that turns one good result into something repeatable." },
    { id: "prove", n: "05", name: "Finish + Prove", color: "#8fe0b8",
      line: "Render, check, checksum and ship. Nothing counts until it's tested." },
  ],

  tools: [
    // Think
    { name: "Claude Code", short: "CC", layer: "think", status: "shipped", what: "Builds and reviews with sub-agents; the lead for strategy, routing and handoffs.", projects: ["strategy-council", "mphs-class-of-2008", "ai-operating-system", "portfolio"] },
    { name: "Codex", short: "Cx", layer: "think", status: "shipped", what: "Local production and verification on bounded tasks.", projects: ["esaie-hq", "living-brain", "portfolio"] },
    { name: "ChatGPT", short: "GP", layer: "think", status: "shipped", what: "Strategy, writing and image generation.", projects: ["esaie-hq"] },
    { name: "Gemini", short: "Ge", layer: "think", status: "inuse", what: "Visual interpretation and research, used on work outside the projects shown here.", projects: ["other"] },
    { name: "REA", short: "RE", layer: "think", status: "learning", what: "Reverse-engineering practice: static evidence first, findings kept apart from guesses.", projects: ["other"] },
    { name: "Ghidra", short: "Gh", layer: "think", status: "learning", what: "Static analysis practice inside the REA setup.", projects: ["other"] },

    // Organize
    { name: "Obsidian", short: "Ob", layer: "organize", status: "shipped", what: "The private knowledge base, and the backend of ESAIE HQ.", projects: ["esaie-hq", "living-brain"] },
    { name: "Markdown", short: "Md", layer: "organize", status: "shipped", what: "The file format that keeps notes, rules and handoffs portable.", projects: ["esaie-hq", "living-brain"] },
    { name: "VS Code", short: "VS", layer: "organize", status: "inuse", what: "The everyday workspace: AI tools run inside it, and everything they build gets inspected there.", projects: ["other"] },
    { name: "Notion", short: "No", layer: "organize", status: "inuse", what: "Planning pages and briefs outside the projects shown here.", projects: ["other"] },

    // Create
    { name: "Meshy", short: "Me", layer: "create", status: "shipped", what: "Turned a portrait photo set into a 3D sculpture.", projects: ["stouze-portrait-site"] },
    { name: "Blender", short: "Bl", layer: "create", status: "shipped", what: "Cleaned up and prepared the 3D likeness.", projects: ["stouze-portrait-site"] },
    { name: "HyperFrames", short: "HF", layer: "create", status: "shipped", what: "Made the project videos on this site, written as HTML and rendered to MP4.", projects: ["stouze-portrait-site", "strategy-council", "mphs-class-of-2008", "living-brain"] },
    { name: "Midjourney", short: "Mj", layer: "create", status: "inuse", what: "Art-direction stills for private studies.", projects: ["other"] },
    { name: "Higgsfield API", short: "Hg", layer: "create", status: "shipped", what: "Pay-as-you-go image and video models; ran Seedance 2.5 in the three-model test.", projects: ["video-model-test", "other"] },
    { name: "Kling", short: "Kl", layer: "create", status: "shipped", what: "Video generation; Kling 4.0 won the three-model test.", projects: ["video-model-test", "other"] },
    { name: "Runway", short: "Rw", layer: "create", status: "inuse", what: "Video generation and edits for motion studies. Its video models need a paid plan, so it sat out the three-model test.", projects: ["other"] },
    { name: "ComfyUI", short: "Cf", layer: "create", status: "inuse", what: "Generative image pipelines built as node graphs, end to end, outside the projects shown here.", projects: ["other"] },

    // Systemize
    { name: "HTML, CSS, JavaScript", short: "JS", layer: "systemize", status: "shipped", what: "Every interface here, this site included.", projects: ["esaie-hq", "stouze-portrait-site", "strategy-council", "mphs-class-of-2008", "portfolio"] },
    { name: "Node.js", short: "Nd", layer: "systemize", status: "shipped", what: "Local servers and data tools behind the apps.", projects: ["esaie-hq", "strategy-council", "mphs-class-of-2008", "living-brain"] },
    { name: "PostgreSQL", short: "PG", layer: "systemize", status: "inuse", what: "The database behind the MPHS committee site: roles, the money ledger and backups.", projects: ["mphs-class-of-2008", "other"] },
    { name: "Python", short: "Py", layer: "systemize", status: "shipped", what: "Helper scripts, like the one that cuts and builds each project video.", projects: ["stouze-portrait-site", "strategy-council", "mphs-class-of-2008", "living-brain"] },
    { name: "3D graph (3d-force-graph)", short: "3G", layer: "systemize", status: "shipped", what: "The moving 3D map of the knowledge wiki.", projects: ["living-brain"] },
    { name: "model-viewer", short: "mv", layer: "systemize", status: "shipped", what: "Shows the 3D sculpture in the browser.", projects: ["stouze-portrait-site"] },
    { name: "n8n", short: "n8", layer: "systemize", status: "planned", what: "Automation canvas. First workflow, with a human review step, is on the roadmap.", projects: [] },
    { name: "Remotion", short: "Rm", layer: "systemize", status: "shipped", what: "Motion graphics as code. Rendered the making-of title cards and the three-model comparison.", projects: ["ai-operating-system", "video-model-test"] },
    { name: "Antigravity", short: "Ag", layer: "systemize", status: "inuse", what: "Google's agent workspace, used for build experiments outside the projects here.", projects: ["other"] },
    { name: "NumPy", short: "Np", layer: "systemize", status: "shipped", what: "Scored a 7-minute screen recording second by second and picked the moments for the making-of film.", projects: ["ai-operating-system"] },

    // Finish + Prove
    { name: "Headless Chrome", short: "Ch", layer: "prove", status: "shipped", what: "Recorded the real screen footage in the project videos, and checks pages.", projects: ["stouze-portrait-site", "strategy-council", "mphs-class-of-2008", "living-brain", "portfolio"] },
    { name: "FFmpeg", short: "FF", layer: "prove", status: "shipped", what: "Cuts, encodes and checks every video file.", projects: ["stouze-portrait-site", "strategy-council", "mphs-class-of-2008", "living-brain", "ai-operating-system", "video-model-test"] },
    { name: "SHA-256 checksums", short: "#", layer: "prove", status: "inuse", what: "Proves files are unchanged, like checking the approved brand files before the three-model test.", projects: ["other"] },
    { name: "Cloudflare Pages", short: "CF", layer: "prove", status: "shipped", what: "Hosts this site for free.", projects: ["stouze-portrait-site", "portfolio"] },
    { name: "Render + Neon", short: "RN", layer: "prove", status: "inuse", what: "Hosting and database prepared for the MPHS committee site, with scripted launch checks.", projects: ["mphs-class-of-2008", "other"] },
    { name: "DaVinci Resolve", short: "DV", layer: "prove", status: "shipped", what: "Cut and exported the making-of film.", projects: ["ai-operating-system"] },
    { name: "OBS Studio", short: "OB", layer: "prove", status: "shipped", what: "Recorded the build session behind the making-of film.", projects: ["ai-operating-system"] },
  ],

  // Extra columns in the proof chart that aren't project pages.
  extraColumns: [{ slug: "portfolio", title: "This site" }, { slug: "other", title: "Other projects" }],

  workflows: [
    { name: "Creative production", note: "Ran for the 3D portrait and the project videos.",
      steps: [["Client", "Brief and source art"], ["create", "Generate or sculpt"], ["systemize", "Assemble in code"], ["prove", "Render and check"], ["Sign-off", "Approve or hold"]] },
    { name: "Claude Code ↔ Codex", note: "How this section was made.",
      steps: [["Client", "The goal"], ["think", "Claude Code plans"], ["think", "Codex gathers evidence"], ["systemize", "Build"], ["prove", "Test"], ["Sign-off", "Final approval"]] },
    { name: "Automation build", note: "Running as a local prototype in ESAIE HQ. Nothing is connected to live accounts yet.",
      steps: [["organize", "Markdown in"], ["systemize", "Local app"], ["think", "AI drafts"], ["Review", "Human approval"], ["prove", "Documented output"]] },
  ],

  roadmap: [
    { name: "Finish layer", status: "done", what: "One real recording in OBS and one real edit in DaVinci: the making-of film." },
    { name: "Motion system", status: "progress", what: "HyperFrames is producing the project videos. Next: make it a reusable kit." },
    { name: "Automation proof", status: "progress", what: "ESAIE HQ runs locally. Next: one workflow with a human review gate." },
    { name: "A short film", status: "held", what: "On hold until rights and credits are cleared." },
    { name: "Next tool", status: "next", what: "n8n is in the stack. It joins the chart once it ships real work." },
  ],

  choosing: "No new monthly subscription until a side-by-side test earns it. Existing credits get used first, experiments stay pay-as-you-go, and a tool stays only once it has shipped real work.",
};
