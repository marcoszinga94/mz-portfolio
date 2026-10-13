import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Genera imágenes de marca para el Perfil de Negocio de Google (y GSC),
 * con la identidad del sitio: fondo oscuro, acento rojo y tipografía Manrope.
 *
 * Uso:
 *   npm run generate-google-images
 *   node scripts/generate-google-images.mjs --only=logo
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/Images/GSC");
const DEBUG_PORT = Number(process.env.CHROME_PORT || 9344);

const data = (await import("../src/data/cv.ts")).default;
const ph = JSON.parse(
  readFileSync(path.join(ROOT, "node_modules/@iconify-json/ph/icons.json"), "utf8"),
);

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readB64(rel) {
  return readFileSync(path.join(ROOT, rel)).toString("base64");
}

const fontB64 = readB64(
  "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
);
const selfieB64 = readB64("src/assets/selfie.webp");

function icon(name, size, color) {
  const def = ph.icons[name];
  if (!def) return "";
  const w = def.width || ph.width || 256;
  const h = def.height || ph.height || 256;
  return `<svg viewBox="0 0 ${w} ${h}" width="${size}" height="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg">${def.body}</svg>`;
}

const BASE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @font-face {
    font-family: "Manrope";
    src: url(data:font/woff2;base64,${fontB64}) format("woff2");
    font-weight: 200 800;
    font-style: normal;
    font-display: block;
  }
  html, body { background: #000; }
  body {
    font-family: "Manrope", system-ui, sans-serif;
    color: #ededed;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .canvas { position: relative; overflow: hidden; background: #000; }
  .aurora { position: absolute; border-radius: 9999px; filter: blur(150px); }
  .badge {
    display: grid; place-items: center; border-radius: 9999px;
    background: #ff3b3b; color: #fff; font-weight: 800; letter-spacing: -0.02em;
  }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 22px; font-weight: 600; color: rgba(237,237,237,0.72);
  }
  .eyebrow .dot { width: 10px; height: 10px; border-radius: 9999px; background: #ff3b3b; }
  h2.title { font-size: 52px; font-weight: 800; letter-spacing: -0.02em; }
  .subtitle { font-size: 24px; color: rgba(237,237,237,0.6); margin-top: 12px; }
`;

function html(inner, extraCss = "") {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8" /><style>${BASE_CSS}${extraCss}</style></head><body>${inner}</body></html>`;
}

/* ----------------------------- Plantillas ----------------------------- */

const templates = [];

// Logo 720x720
templates.push({
  name: "logo",
  format: "png",
  width: 720,
  height: 720,
  html: html(
    `<div class="canvas" style="width:720px;height:720px">
      <div class="aurora" style="width:560px;height:560px;background:#ff3b3b;left:-160px;top:-200px;opacity:.20"></div>
      <div class="aurora" style="width:460px;height:460px;background:#ff7676;right:-180px;bottom:-180px;opacity:.12"></div>
      <div class="logo-wrap">
        <div class="avatar"><img src="data:image/webp;base64,${selfieB64}" alt="" /></div>
        <div class="logo-name">Marcos Zingaretti</div>
        <div class="logo-sub">DESARROLLO WEB Y SOFTWARE</div>
      </div>
    </div>`,
    `
      .logo-wrap { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px; }
      .avatar { width:400px; height:400px; border-radius:9999px; overflow:hidden; border:6px solid #ff3b3b; box-shadow:0 0 0 16px rgba(255,59,59,.14); }
      .avatar img { width:100%; height:100%; object-fit:cover; object-position:center; filter:saturate(.92) brightness(.98); }
      .logo-name { font-size:52px; font-weight:700; }
      .logo-sub { font-size:20px; font-weight:600; letter-spacing:4px; color:rgba(237,237,237,.5); }
    `,
  ),
});

// Portada 1024x576
templates.push({
  name: "portada",
  format: "jpeg",
  width: 1024,
  height: 576,
  html: html(
    `<div class="canvas" style="width:1024px;height:576px">
      <div class="aurora" style="width:620px;height:620px;background:#ff3b3b;left:-220px;top:-260px;opacity:.22"></div>
      <div class="aurora" style="width:520px;height:520px;background:#ff7676;right:-200px;bottom:-220px;opacity:.14"></div>
      <div class="cover">
        <div class="eyebrow"><span class="dot"></span> La Carlota · Córdoba · Argentina</div>
        <h1>Desarrollo web y software a medida</h1>
        <p>Webs, sistemas y plataformas para negocios que quieren vender más.</p>
        <div class="brandline">
          <div class="badge" style="width:48px;height:48px;font-size:22px">MZ</div>
          <div class="brandtext"><strong>Marcos F. Zingaretti</strong><span>Desarrollador web full stack</span></div>
        </div>
      </div>
    </div>`,
    `
      .cover { position:absolute; inset:0; padding:72px; display:flex; flex-direction:column; justify-content:center; gap:24px; }
      .cover h1 { font-size:60px; font-weight:800; line-height:1.03; letter-spacing:-0.03em; max-width:840px;
        background:linear-gradient(90deg,#ffffff,#9b9b9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .cover p { font-size:24px; color:rgba(237,237,237,0.68); max-width:680px; margin-top:4px; }
      .brandline { display:flex; align-items:center; gap:16px; margin-top:20px; }
      .brandtext { display:flex; flex-direction:column; }
      .brandtext strong { font-size:22px; font-weight:700; }
      .brandtext span { font-size:16px; color:rgba(237,237,237,0.55); }
    `,
  ),
});

// Servicios 1200x900
const serviceIcons = ["ph:storefront", "ph:devices", "ph:headset"];
templates.push({
  name: "servicios",
  format: "jpeg",
  width: 1200,
  height: 900,
  html: html(
    `<div class="canvas" style="width:1200px;height:900px;padding:80px;display:flex;flex-direction:column">
      <div class="aurora" style="width:640px;height:640px;background:#ff3b3b;left:-240px;top:-280px;opacity:.18"></div>
      <div class="aurora" style="width:520px;height:520px;background:#ff7676;right:-200px;bottom:-240px;opacity:.12"></div>
      <div>
        <h2 class="title">Servicios</h2>
        <p class="subtitle">Soluciones digitales a medida, de la idea al soporte continuo.</p>
      </div>
      <div class="cards">
        ${data.servicios
          .map((s, i) => {
            const ic = s.icono.startsWith("ph:") ? s.icono.slice(3) : s.icono;
            return `<div class="card">
              <div class="icon">${icon(ic, 34, "#ff3b3b")}</div>
              <h3>${s.nombre}</h3>
              <ul>${s.caracteristicas
                .slice(0, 3)
                .map((c) => `<li>${icon("check", 20, "#ff3b3b")}<span>${c}</span></li>`)
                .join("")}</ul>
            </div>`;
          })
          .join("")}
      </div>
    </div>`,
    `
      .cards { display:flex; gap:26px; margin-top:52px; flex:1; }
      .card { flex:1; background:#181818; border:1px solid #313131; border-radius:24px; padding:36px; display:flex; flex-direction:column; }
      .icon { width:64px; height:64px; border-radius:16px; background:#1f1f1f; display:grid; place-items:center; }
      .card h3 { font-size:26px; font-weight:700; margin-top:28px; line-height:1.2; }
      .card ul { list-style:none; margin-top:24px; display:flex; flex-direction:column; gap:16px; }
      .card li { display:flex; gap:12px; align-items:flex-start; font-size:18px; color:rgba(237,237,237,0.72); line-height:1.35; }
      .card li svg { flex-shrink:0; margin-top:4px; }
    `,
  ),
});

// Proyectos 1200x900
const proyectos = data.proyectos.slice(0, 6);
templates.push({
  name: "proyectos",
  format: "jpeg",
  width: 1200,
  height: 900,
  html: html(
    `<div class="canvas" style="width:1200px;height:900px;padding:72px;display:flex;flex-direction:column">
      <div class="aurora" style="width:640px;height:640px;background:#ff3b3b;right:-260px;top:-280px;opacity:.16"></div>
      <div>
        <h2 class="title">Proyectos reales en producción</h2>
        <p class="subtitle">Clínicas, gimnasios, agro y gestión.</p>
      </div>
      <div class="grid">
        ${proyectos
          .map((p) => {
            const b64 = readB64(`public/Images/paginas/${p.imagen}.webp`);
            return `<div class="pcard">
              <img src="data:image/webp;base64,${b64}" alt="" />
              <div class="plabel">${p.nombre}</div>
            </div>`;
          })
          .join("")}
      </div>
    </div>`,
    `
      .grid { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:repeat(2,1fr); gap:22px; margin-top:44px; flex:1; }
      .pcard { position:relative; border-radius:16px; overflow:hidden; border:1px solid #313131; background:#181818; }
      .pcard img { width:100%; height:100%; object-fit:cover; object-position:top center; }
      .plabel { position:absolute; left:0; right:0; bottom:0; padding:14px 18px; font-size:20px; font-weight:700;
        background:linear-gradient(to top, rgba(0,0,0,.92), rgba(0,0,0,0)); }
    `,
  ),
});

// Resultados 1200x900
templates.push({
  name: "resultados",
  format: "jpeg",
  width: 1200,
  height: 900,
  html: html(
    `<div class="canvas" style="width:1200px;height:900px;padding:80px;display:flex;flex-direction:column;justify-content:center">
      <div class="aurora" style="width:660px;height:660px;background:#ff3b3b;left:50%;top:44%;transform:translate(-50%,-50%);opacity:.16"></div>
      <div style="text-align:center">
        <h2 class="title">Trabajo entregado, no promesas</h2>
        <p class="subtitle">Proyectos reales que ya están funcionando.</p>
      </div>
      <div class="metrics">
        ${data.metricas
          .map(
            (m) => `<div class="metric">
              <div class="value">${m.valor}</div>
              <div class="label">${m.etiqueta}</div>
            </div>`,
          )
          .join("")}
      </div>
    </div>`,
    `
      .metrics { display:flex; gap:26px; margin-top:64px; }
      .metric { flex:1; background:#181818; border:1px solid #313131; border-radius:24px; padding:56px 24px; text-align:center; }
      .metric .value { font-size:86px; font-weight:800; color:#ff3b3b; letter-spacing:-0.03em; }
      .metric .label { font-size:20px; color:rgba(237,237,237,0.7); margin-top:14px; }
    `,
  ),
});

// Foto personal 1200x900
templates.push({
  name: "marcos",
  format: "jpeg",
  width: 1200,
  height: 900,
  html: html(
    `<div class="canvas" style="width:1200px;height:900px;padding:80px;display:flex;gap:60px;align-items:center">
      <div class="aurora" style="width:620px;height:620px;background:#ff3b3b;left:-260px;top:-260px;opacity:.18"></div>
      <div class="aurora" style="width:520px;height:520px;background:#ff7676;right:-200px;bottom:-240px;opacity:.12"></div>
      <div class="photo"><img src="data:image/webp;base64,${selfieB64}" alt="" /></div>
      <div class="about">
        <div class="eyebrow"><span class="dot"></span> La Carlota · Córdoba</div>
        <h2 class="about-title">Hola, soy Marcos</h2>
        <p>Desarrollador web full stack. Diseño y desarrollo webs y sistemas a medida para negocios que quieren vender más y ordenar su operación.</p>
        <div class="tags">
          <span>Web</span><span>Sistemas a medida</span><span>Mantenimiento</span>
        </div>
      </div>
    </div>`,
    `
      .photo { width:470px; height:600px; border-radius:28px; overflow:hidden; border:1px solid #313131; flex-shrink:0; }
      .photo img { width:100%; height:100%; object-fit:cover; filter:saturate(.9) brightness(.97); }
      .about { display:flex; flex-direction:column; gap:22px; }
      .about-title { font-size:58px; font-weight:800; letter-spacing:-0.03em;
        background:linear-gradient(90deg,#ffffff,#9b9b9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .about p { font-size:24px; line-height:1.45; color:rgba(237,237,237,0.72); }
      .tags { display:flex; flex-wrap:wrap; gap:12px; margin-top:8px; }
      .tags span { font-size:18px; font-weight:600; color:#ededed; border:1px solid #313131; background:#181818; border-radius:9999px; padding:10px 20px; }
    `,
  ),
});

// Open Graph 1200x630 (reemplaza public/Images/og-image.jpg)
templates.push({
  name: "og-image",
  format: "jpeg",
  scale: 1,
  width: 1200,
  height: 630,
  out: path.join(ROOT, "public/Images/og-image.jpg"),
  html: html(
    `<div class="canvas" style="width:1200px;height:630px">
      <div class="aurora" style="width:640px;height:640px;background:#ff3b3b;left:-240px;top:-280px;opacity:.22"></div>
      <div class="aurora" style="width:520px;height:520px;background:#ff7676;right:-200px;bottom:-240px;opacity:.14"></div>
      <div class="og">
        <div class="og-left">
          <div class="eyebrow"><span class="dot"></span> La Carlota · Córdoba · Argentina</div>
          <h1>Webs y sistemas a medida que convierten visitas en clientes</h1>
          <p>Desarrollo web y software a medida para negocios.</p>
          <div class="brandline"><strong>Marcos F. Zingaretti</strong><span>Desarrollador web full stack</span></div>
        </div>
        <div class="og-photo"><img src="data:image/webp;base64,${selfieB64}" alt="" /></div>
      </div>
    </div>`,
    `
      .og { position:absolute; inset:0; padding:64px 72px; display:flex; align-items:center; gap:44px; }
      .og-left { flex:1; display:flex; flex-direction:column; gap:20px; }
      .og-left h1 { font-size:46px; font-weight:800; line-height:1.07; letter-spacing:-0.03em;
        background:linear-gradient(90deg,#ffffff,#9b9b9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .og-left p { font-size:22px; color:rgba(237,237,237,0.68); }
      .brandline { display:flex; flex-direction:column; margin-top:6px; }
      .brandline strong { font-size:22px; font-weight:700; }
      .brandline span { font-size:17px; color:rgba(237,237,237,0.55); }
      .og-photo { width:330px; height:440px; border-radius:28px; overflow:hidden; border:1px solid #313131; flex-shrink:0; }
      .og-photo img { width:100%; height:100%; object-fit:cover; object-position:center; filter:saturate(.9) brightness(.97); }
    `,
  ),
});

/* ----------------------------- Render ----------------------------- */

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (candidate.includes("/") && spawnSync(candidate, ["--version"]).status === 0)
      return candidate;
    const which = spawnSync("which", [candidate], { encoding: "utf8" });
    if (which.status === 0 && which.stdout.trim()) return which.stdout.trim();
  }
  return null;
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function waitForBrowser() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (res.ok) return;
    } catch {
      /* arrancando */
    }
    await sleep(150);
  }
  throw new Error("Chromium no respondió");
}

const chromePath = findChrome();
if (!chromePath) {
  console.error("No encontré Chromium. Definí CHROME_PATH.");
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const workDir = mkdtempSync(path.join(tmpdir(), "gbp-images-"));
const profileDir = mkdtempSync(path.join(tmpdir(), "gbp-profile-"));

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "ignore"] },
);

const toRender = only ? templates.filter((t) => t.name === only) : templates;

try {
  await waitForBrowser();
  const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  const page = list.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });

  const cdp = new CDP(ws);
  await cdp.send("Page.enable");

  console.log(`Generando ${toRender.length} imagen(es) en public/Images/GSC/\n`);

  for (const t of toRender) {
    const file = path.join(workDir, `${t.name}.html`);
    writeFileSync(file, t.html);
    const scale = t.scale ?? 2;
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: t.width,
      height: t.height,
      deviceScaleFactor: scale,
      mobile: false,
    });
    await cdp.send("Page.navigate", { url: `file://${file}` });
    await sleep(500);
    await cdp.send("Runtime.evaluate", {
      expression:
        "Promise.all([document.fonts.ready, ...[...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))])",
      awaitPromise: true,
    });
    await sleep(300);

    const params = { format: t.format, captureBeyondViewport: false };
    if (t.format === "jpeg") params.quality = 90;
    const { data: b64 } = await cdp.send("Page.captureScreenshot", params);

    const ext = t.format === "jpeg" ? "jpg" : "png";
    const out = t.out ?? path.join(OUT_DIR, `${t.name}.${ext}`);
    writeFileSync(out, Buffer.from(b64, "base64"));
    console.log(`  ✓ ${path.relative(ROOT, out)}  (${t.width * scale}x${t.height * scale})`);
  }

  ws.close();
} finally {
  chrome.kill("SIGKILL");
  rmSync(workDir, { recursive: true, force: true });
  rmSync(profileDir, { recursive: true, force: true });
}
