import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Genera Reels animados (1080x1920, mp4) para Instagram con la identidad del sitio.
 * Renderiza los frames con Chromium (animación en JS) y los une con ffmpeg.
 *
 * Uso:
 *   npm run generate-reels
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public/Images/Instagram/reels");
const DEBUG_PORT = Number(process.env.CHROME_PORT || 9366);
const FPS = 30;

const data = (await import("../src/data/cv.ts")).default;
const ph = JSON.parse(
  readFileSync(path.join(ROOT, "node_modules/@iconify-json/ph/icons.json"), "utf8"),
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const readB64 = (rel) => readFileSync(path.join(ROOT, rel)).toString("base64");
const fontB64 = readB64(
  "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
);
const selfieB64 = readB64("src/assets/selfie.webp");
const projectImg = (name) => readB64(`public/Images/paginas/${name}.webp`);

// Recorte de la selfie a plano medio (cara, hombros y pecho) para la tarjeta del reel personal.
const portraitB64 = (
  await sharp(path.join(ROOT, "src/assets/selfie.webp"))
    .extract({ left: 149, top: 45, width: 300, height: 375 })
    .resize(720, 900, { fit: "cover" })
    .sharpen({ sigma: 0.8 })
    .webp({ quality: 92 })
    .toBuffer()
).toString("base64");

function icon(name, size, color) {
  const def = ph.icons[name];
  if (!def) return "";
  const w = def.width || ph.width || 256;
  const h = def.height || ph.height || 256;
  return `<svg viewBox="0 0 ${w} ${h}" width="${size}" height="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg">${def.body}</svg>`;
}

const CSS = `
  * { margin:0; padding:0; box-sizing:border-box; }
  @font-face { font-family:"Manrope"; src:url(data:font/woff2;base64,${fontB64}) format("woff2"); font-weight:200 800; font-style:normal; font-display:block; }
  html, body { background:#000; width:1080px; height:1920px; overflow:hidden; }
  .stage { position:relative; width:1080px; height:1920px; overflow:hidden; background:#000; font-family:"Manrope", system-ui, sans-serif; color:#ededed; }
  .glow { position:absolute; border-radius:9999px; filter:blur(190px); z-index:0; }
  .g1 { width:960px; height:960px; background:#ff3b3b; opacity:.22; left:-300px; top:-280px; }
  .g2 { width:820px; height:820px; background:#ff7676; opacity:.14; right:-280px; bottom:-260px; }
  .brand { position:absolute; top:120px; left:80px; display:flex; align-items:center; gap:22px; font-size:36px; font-weight:700; z-index:5; }
  .brand .badge { display:grid; place-items:center; width:80px; height:80px; border-radius:9999px; background:#ff3b3b; color:#fff; font-weight:800; font-size:36px; }
  .beats { position:absolute; inset:0; z-index:2; }
  .beat { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:0 84px; text-align:center; will-change:transform,opacity; }
  .huge { font-size:120px; font-weight:800; line-height:1.02; letter-spacing:-0.03em; }
  .big { font-size:92px; font-weight:800; line-height:1.05; letter-spacing:-0.03em; }
  .mid { font-size:60px; font-weight:700; line-height:1.15; letter-spacing:-0.02em; }
  .beat p { font-size:42px; color:rgba(237,237,237,.7); margin-top:30px; line-height:1.35; }
  .grad { background:linear-gradient(95deg,#ffffff,#9b9b9b); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .accent { color:#ff3b3b; }
  .count { font-size:260px; font-weight:800; color:#ff3b3b; letter-spacing:-0.04em; line-height:1; }
  .shot { width:100%; border-radius:30px; overflow:hidden; border:1px solid #313131; background:#181818; box-shadow:0 30px 80px rgba(0,0,0,.5); }
  .shot img { width:100%; display:block; }
  .selfie { width:420px; height:420px; border-radius:9999px; overflow:hidden; border:8px solid #ff3b3b; margin-bottom:44px; box-shadow:0 0 0 22px rgba(255,59,59,.12); }
  .selfie img { width:100%; height:100%; object-fit:cover; filter:saturate(.92) brightness(.98); }
  .ico { width:150px; height:150px; border-radius:36px; background:#1f1f1f; display:grid; place-items:center; margin-bottom:44px; border:1px solid #313131; }
  .foot { position:absolute; bottom:120px; left:0; right:0; text-align:center; font-size:34px; color:rgba(237,237,237,.6); letter-spacing:1px; z-index:5; }
  .persist { position:absolute; inset:0; z-index:1; display:flex; justify-content:center; align-items:flex-start; padding-top:240px; }
  .persist .portrait { width:720px; height:900px; border-radius:48px; overflow:hidden; border:6px solid #ff3b3b; box-shadow:0 40px 90px rgba(0,0,0,.55), 0 0 0 24px rgba(255,59,59,.10); }
  .persist .portrait img { width:100%; height:100%; object-fit:cover; object-position:50% 50%; transform-origin:50% 40%; will-change:transform; }
  .stage.has-persist .beat { justify-content:flex-end; padding-bottom:300px; }
  /* --- Capas de pantalla (reel de escritorio) --- */
  .screen { position:absolute; left:60px; right:60px; top:260px; height:602px; opacity:0; will-change:transform,opacity; }
  .browser { width:100%; height:100%; border-radius:28px; overflow:hidden; border:1px solid #313131; background:#111111; box-shadow:0 40px 90px rgba(0,0,0,.6); }
  .browser .bar { height:62px; display:flex; align-items:center; gap:12px; padding:0 26px; background:#181818; border-bottom:1px solid #313131; }
  .browser .dot { width:12px; height:12px; border-radius:9999px; background:#313131; }
  .browser .url { margin-left:18px; font-size:21px; color:#9b9b9b; }
  .browser img { width:100%; height:calc(100% - 62px); object-fit:cover; object-position:50% 40%; }
  .chaos { left:0; right:0; top:0; height:1180px; }
  .sheet { position:absolute; left:-30px; top:140px; width:1140px; border-collapse:collapse; background:#ffffff; color:#202020; font-size:17px; box-shadow:0 40px 90px rgba(0,0,0,.6); transform:rotate(-2deg); }
  .sheet th { background:#1f7a4d; color:#ffffff; font-weight:700; padding:10px 12px; text-align:left; font-size:16px; }
  .sheet td { border:1px solid #d9d9d9; padding:9px 12px; white-space:nowrap; }
  .sheet td.bad { background:#ffe0e0; color:#c1121f; font-weight:700; }
  .sheet td.zero { color:#a0a0a0; }
  .chatstack { position:absolute; right:70px; bottom:0; width:520px; display:flex; flex-direction:column; gap:16px; }
  .bubble { position:relative; background:#1f1f1f; border:1px solid #313131; border-radius:22px; padding:16px 20px; font-size:25px; color:#ededed; box-shadow:0 18px 40px rgba(0,0,0,.45); }
  .bubble .who { font-size:18px; color:#9b9b9b; margin-bottom:6px; }
  .bubble .pill { position:absolute; top:-8px; right:-8px; min-width:34px; height:34px; border-radius:9999px; background:#ff3b3b; color:#ffffff; font-size:19px; font-weight:700; display:grid; place-items:center; padding:0 8px; }
  .chips { position:absolute; left:60px; right:60px; top:890px; display:flex; gap:14px; justify-content:center; }
  .chip { background:#1f1f1f; border:1px solid #313131; border-radius:9999px; padding:14px 26px; font-size:26px; color:#ededed; opacity:0; }
  .veil { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.86) 58%, #000000 100%); opacity:0; }
  .stage.has-orden .beat { justify-content:flex-end; padding-bottom:480px; }
  .kicker { font-size:30px; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#ff7676; margin-bottom:20px; }
  .beat p.cta2 { font-size:34px; color:#ff7676; margin-top:16px; letter-spacing:.02em; }
`;

const RENDER_SCRIPT = `
const clamp=function(x,a,b){return Math.min(b,Math.max(a,x));};
const eo=function(t){return 1-Math.pow(1-t,3);};
const ei=function(t){return t*t;};
function render(t){
  var beats=document.querySelectorAll('.beat');
  for(var k=0;k<beats.length;k++){
    var el=beats[k];
    var i=parseFloat(el.dataset.in), o=parseFloat(el.dataset.out);
    var enter=clamp((t-i)/0.45,0,1);
    var exit=clamp((t-(o-0.35))/0.35,0,1);
    var op=enter*(1-exit);
    var y=(1-eo(enter))*80 + ei(exit)*-70;
    var sc=0.94+0.06*eo(enter)-0.05*exit;
    el.style.opacity=String(op);
    el.style.transform='translateY('+y.toFixed(1)+'px) scale('+sc.toFixed(3)+')';
    var c=el.querySelector('[data-count]');
    if(c){var target=parseFloat(c.dataset.count);var p=clamp((t-i)/0.8,0,1);c.textContent=String(Math.round(target*eo(p)));}
  }
  var g1=document.querySelector('.g1'),g2=document.querySelector('.g2');
  if(g1)g1.style.transform='translate('+(Math.sin(t*0.5)*70).toFixed(1)+'px,'+(Math.cos(t*0.45)*50).toFixed(1)+'px)';
  if(g2)g2.style.transform='translate('+(Math.cos(t*0.55)*60).toFixed(1)+'px,'+(Math.sin(t*0.5)*70).toFixed(1)+'px)';
  var por=document.querySelector('.persist img');
  if(por){
    var grow=1+Math.min(t,12)*0.006;
    por.style.transform='scale('+grow.toFixed(4)+')';
    por.style.opacity=String(clamp(t/0.6,0,1));
  }
  if(window.sceneMotion) window.sceneMotion(t);
}
window.render=render; render(0);
`;

const beat = (inT, outT, html) => ({ in: inT, out: outT, html });

function sceneHtml(beats, persist = "", motion = "", theme = "") {
  const beatsHtml = beats
    .map((b) => `<div class="beat" data-in="${b.in}" data-out="${b.out}">${b.html}</div>`)
    .join("");
  return `<!doctype html><html lang="es"><head><meta charset="utf-8" /><style>${CSS}</style></head><body>
    <div class="stage${persist ? " has-persist" : ""}${theme ? " " + theme : ""}">
      <div class="glow g1"></div><div class="glow g2"></div>
      <div class="brand"><span class="badge">MZ</span> Marcos Zingaretti</div>
      ${persist ? `<div class="persist">${persist}</div>` : ""}
      <div class="beats">${beatsHtml}</div>
      <div class="foot">marcoszinga.vercel.app</div>
    </div>
    <script>${RENDER_SCRIPT}${motion ? `window.sceneMotion=function(t){${motion}};render(0);` : ""}</script>
  </body></html>`;
}

const serviceIcon = (s) => (s.icono.startsWith("ph:") ? s.icono.slice(3) : s.icono);

/* ------------------- Maquetas del reel de escritorio ------------------- */

// Planilla desordenada: datos sueltos, celdas sin dato y saldos en rojo.
const sheetHtml = (() => {
  const cols = ["Cliente", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Saldo"];
  const names = [
    "Gómez",
    "Pérez",
    "López",
    "Ruiz",
    "Díaz",
    "Sosa",
    "Molina",
    "Ferreyra",
    "Acosta",
    "Benitez",
    "Castro",
  ];
  let seed = 42;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let html = `<table class="sheet"><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>`;
  for (let r = 0; r < 11; r++) {
    html += "<tr>";
    for (let c = 0; c < cols.length; c++) {
      if (c === 0) {
        html += `<td>${names[r]}</td>`;
      } else if (c === cols.length - 1) {
        html += `<td class="${rnd() > 0.55 ? "bad" : ""}">${Math.round(rnd() * 900000)}</td>`;
      } else {
        const v = rnd();
        html +=
          v < 0.08
            ? `<td class="bad">S/D</td>`
            : v < 0.16
              ? `<td class="zero">0</td>`
              : `<td>${Math.round(rnd() * 95000)}</td>`;
      }
    }
    html += "</tr>";
  }
  return html + "</tbody></table>";
})();

// Mensajes apilados y sin responder.
const chatHtml = [
  { who: "Cliente", text: "¿Me pasás el presupuesto?", n: 3 },
  { who: "Proveedor", text: "Te adjunto el comprobante", n: 1 },
  { who: "Equipo", text: "¿Llega hoy el pedido?", n: 5 },
  { who: "Cliente", text: "No encuentro la planilla", n: 2 },
]
  .map(
    (c) =>
      `<div class="bubble"><span class="pill">${c.n}</span><div class="who">${c.who}</div>${c.text}</div>`,
  )
  .join("");

const ordenMotion = `
  var chaos=document.querySelector('.chaos'),web=document.querySelector('.web'),sys=document.querySelector('.sys'),veil=document.querySelector('.veil');
  if(chaos){
    var chOut=clamp((t-3.6)/0.8,0,1);
    chaos.style.opacity=String(clamp(t/0.4,0,1)*(1-chOut));
    chaos.style.transform='scale('+(1.04+Math.min(t,4)*0.025).toFixed(3)+') translate('+(t*7).toFixed(1)+'px,'+(-t*9).toFixed(1)+'px)';
  }
  if(web){
    var wIn=clamp((t-4.0)/0.9,0,1),wOut=clamp((t-10.8)/0.7,0,1);
    web.style.opacity=String(wIn*(1-wOut));
    web.style.transform='scale('+(1.08-clamp((t-4)/7,0,1)*0.06).toFixed(3)+')';
    var wi=web.querySelector('img');
    if(wi) wi.style.objectPosition='50% '+(36+clamp((t-4)/7,0,1)*16).toFixed(1)+'%';
  }
  if(sys){
    var sIn=clamp((t-11.0)/0.9,0,1);
    var sOut=clamp((t-17.8)/1.0,0,1);
    sys.style.opacity=String(sIn*(1-sOut));
    sys.style.transform='scale('+(1.06-clamp((t-11)/7,0,1)*0.05).toFixed(3)+')';
  }
  if(veil) veil.style.opacity=String(clamp((t-17.6)/0.9,0,1));
  ['.c1','.c2','.c3'].forEach(function(sel,i){
    var el=document.querySelector(sel);
    if(!el)return;
    var p=clamp((t-(13.3+i*0.6))/0.45,0,1);
    var gone=1-clamp((t-17.8)/0.8,0,1);
    el.style.opacity=String(p*gone);
    el.style.transform='translateY('+((1-p)*24).toFixed(1)+'px)';
  });
`;

const scenes = [
  {
    name: "reel-1-presentacion",
    duration: 7.2,
    beats: [
      beat(0.2, 1.7, `<div class="big grad">Tu web debería traerte clientes</div>`),
      beat(
        1.7,
        3.1,
        `<div class="big"><span class="accent">Webs rápidas</span><br />y optimizadas</div>`,
      ),
      beat(3.1, 4.5, `<div class="big">Sistemas que<br />ordenan tu negocio</div>`),
      beat(
        4.5,
        5.7,
        `<div class="selfie"><img src="data:image/webp;base64,${selfieB64}" alt="" /></div><div class="mid">Soy Marcos, desarrollador web</div>`,
      ),
      beat(5.7, 7.2, `<div class="big grad">Hablemos</div><p>Presupuesto sin costo</p>`),
    ],
  },
  {
    name: "reel-2-proyectos",
    duration: 9.6,
    beats: [
      beat(0.2, 1.2, `<div class="big accent">Proyectos reales</div>`),
      ...data.proyectos
        .slice(0, 6)
        .map((p, i) =>
          beat(
            1.2 + i * 1.15,
            1.2 + i * 1.15 + 1.15,
            `<div class="shot"><img src="data:image/webp;base64,${projectImg(p.imagen)}" alt="" /></div><div class="mid" style="margin-top:34px">${p.nombre}</div>`,
          ),
        ),
      beat(8.1, 9.6, `<div class="big grad">6 sistemas<br />en producción</div>`),
    ],
  },
  {
    name: "reel-3-servicios",
    duration: 7.8,
    beats: [
      beat(0.2, 1.3, `<div class="big accent">Lo que hago</div>`),
      ...data.servicios.map((s, i) =>
        beat(
          1.3 + i * 1.7,
          1.3 + i * 1.7 + 1.7,
          `<div class="ico">${icon(serviceIcon(s), 74, "#ff3b3b")}</div><div class="mid">${s.nombre}</div><p>${s.descripcion}</p>`,
        ),
      ),
      beat(6.4, 7.8, `<div class="big grad">Hablemos</div><p>marcoszinga.vercel.app</p>`),
    ],
  },
  {
    name: "reel-4-resultados",
    duration: 6.8,
    beats: [
      beat(0.2, 1.2, `<div class="big">Trabajo entregado,<br />no promesas</div>`),
      beat(1.2, 2.6, `<div class="count" data-count="6">0</div><p>sistemas en producción</p>`),
      beat(2.6, 4.0, `<div class="count" data-count="24">0</div><p>horas para responderte</p>`),
      beat(4.0, 5.4, `<div class="big accent">2 a 8</div><p>semanas según el proyecto</p>`),
      beat(5.4, 6.8, `<div class="big grad">Contame tu idea</div>`),
    ],
  },
  {
    name: "reel-5-cta",
    duration: 6.2,
    beats: [
      beat(0.2, 1.7, `<div class="big grad">¿Tu web te<br />trae clientes?</div>`),
      beat(1.7, 3.1, `<div class="big">Te ayudo a cambiarlo</div>`),
      beat(3.1, 4.6, `<div class="mid">Consulta inicial sin costo</div><p>Sin compromiso</p>`),
      beat(4.6, 6.2, `<div class="big accent">Hablemos</div><p>marcoszinga.vercel.app</p>`),
    ],
  },
  {
    name: "reel-6-sobre-mi",
    duration: 8.8,
    persist: `<div class="portrait"><img src="data:image/webp;base64,${portraitB64}" alt="" /></div>`,
    beats: [
      beat(0.2, 2.0, `<div class="huge grad">Soy Marcos</div><p>Desarrollador web full stack</p>`),
      beat(2.0, 3.8, `<div class="big">Webs y sistemas<br />para negocios reales</div>`),
      beat(
        3.8,
        5.6,
        `<div class="big"><span class="accent">6</span> sistemas<br />en producción</div><p>24 h para responderte</p>`,
      ),
      beat(5.6, 7.0, `<div class="big accent">2 a 8</div><p>semanas según el proyecto</p>`),
      beat(7.0, 8.8, `<div class="big grad">Contame tu idea</div><p>Presupuesto sin costo</p>`),
    ],
  },
  {
    name: "reel-7-orden",
    duration: 25,
    theme: "has-orden",
    motion: ordenMotion,
    persist: `
      <div class="screen chaos">${sheetHtml}<div class="chatstack">${chatHtml}</div></div>
      <div class="screen web"><div class="browser"><div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url">espartagym.com</span></div><img src="data:image/webp;base64,${projectImg("espartagym")}" alt="" /></div></div>
      <div class="screen sys"><div class="browser"><div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="url">kuramedical.com.ar</span></div><img src="data:image/webp;base64,${projectImg("kura")}" alt="" /></div></div>
      <div class="chips"><span class="chip c1">Clientes</span><span class="chip c2">Movimientos</span><span class="chip c3">Documentos</span></div>
      <div class="veil"></div>
    `,
    beats: [
      beat(0.2, 2.1, `<div class="big">Tres planillas.<br />Papeles. Mensajes.</div>`),
      beat(2.1, 4.0, `<div class="huge grad">Necesita orden</div>`),
      beat(
        4.0,
        6.0,
        `<div class="big">Dos piezas conectadas</div><p>para no depender de tu memoria</p>`,
      ),
      beat(
        6.0,
        11.0,
        `<div class="kicker">Primero</div><div class="big">Una web clara</div><p>que filtre curiosos y traiga consultas</p>`,
      ),
      beat(
        11.0,
        18.0,
        `<div class="kicker">Segundo</div><div class="big">Todo en un solo lugar</div><p>clientes, movimientos y documentos</p>`,
      ),
      beat(
        18.0,
        25.0,
        `<div class="huge accent">Mandá ORDEN</div><p>y vemos qué resolver primero</p><p class="cta2">wa.me/5493584406950</p>`,
      ),
    ],
  },
];

/* ----------------------------- Render ----------------------------- */

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
  ].filter(Boolean);
  for (const c of candidates) {
    if (c.includes("/") && spawnSync(c, ["--version"]).status === 0) return c;
    const w = spawnSync("which", [c], { encoding: "utf8" });
    if (w.status === 0 && w.stdout.trim()) return w.stdout.trim();
  }
  return null;
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener("message", (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? reject(new Error(m.error.message)) : resolve(m.result);
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
      const r = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (r.ok) return;
    } catch {
      /* arrancando */
    }
    await sleep(150);
  }
  throw new Error("Chromium no respondió");
}

function encodeMp4(out, totalFrames, getFrame) {
  return new Promise((resolve, reject) => {
    const ff = spawn(
      "ffmpeg",
      [
        "-y",
        "-f",
        "image2pipe",
        "-framerate",
        String(FPS),
        "-i",
        "-",
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-crf",
        "20",
        "-preset",
        "medium",
        "-movflags",
        "+faststart",
        out,
      ],
      { stdio: ["pipe", "ignore", "pipe"] },
    );
    let err = "";
    ff.stderr.on("data", (d) => (err += d));
    ff.on("close", (code) => (code === 0 ? resolve() : reject(new Error(err.slice(-600)))));
    (async () => {
      for (let i = 0; i < totalFrames; i++) {
        const buf = await getFrame(i);
        if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
      }
      ff.stdin.end();
    })().catch(reject);
  });
}

const chromePath = findChrome();
if (!chromePath) {
  console.error("No encontré Chromium. Definí CHROME_PATH.");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
for (const stale of ["reel-presentacion.mp4", "reel-proyectos.mp4"]) {
  rmSync(path.join(OUT, stale), { force: true });
}

// Uso: node scripts/generate-instagram-reels.mjs [nombre...]
// Con nombres, renderiza solo esos reels y no regenera el completo.
const only = process.argv.slice(2);
const selected = only.length ? scenes.filter((s) => only.includes(s.name)) : scenes;
if (!selected.length) {
  console.error(`No encontré escenas: ${only.join(", ")}`);
  console.error(`Disponibles: ${scenes.map((s) => s.name).join(", ")}`);
  process.exit(1);
}

const workDir = mkdtempSync(path.join(tmpdir(), "ig-reels-"));
const profileDir = mkdtempSync(path.join(tmpdir(), "ig-reels-profile-"));
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

try {
  await waitForBrowser();
  const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  const page = list.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });
  const cdp = new CDP(ws);
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1080,
    height: 1920,
    deviceScaleFactor: 1,
    mobile: false,
  });

  console.log(`Generando ${selected.length} reels (${FPS} fps):\n`);

  for (const scene of selected) {
    const file = path.join(workDir, `${scene.name}.html`);
    writeFileSync(file, sceneHtml(scene.beats, scene.persist, scene.motion, scene.theme));
    await cdp.send("Page.navigate", { url: `file://${file}` });
    await sleep(500);
    await cdp.send("Runtime.evaluate", {
      expression:
        "Promise.all([document.fonts.ready, ...[...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))])",
      awaitPromise: true,
    });

    const frames = Math.round(scene.duration * FPS);
    const out = path.join(OUT, `${scene.name}.mp4`);
    await encodeMp4(out, frames, async (i) => {
      const t = i / FPS;
      await cdp.send("Runtime.evaluate", { expression: `render(${t})` });
      const { data: b64 } = await cdp.send("Page.captureScreenshot", {
        format: "jpeg",
        quality: 88,
      });
      return Buffer.from(b64, "base64");
    });
    console.log(`  ✓ ${scene.name}.mp4  (${scene.duration}s, ${frames} frames)`);
  }

  // Unir todos los reels en uno solo (solo en la corrida completa)
  if (only.length) {
    console.log("Modo filtrado: no se regenera reel-completo.mp4");
  } else {
    const listFile = path.join(workDir, "concat.txt");
    writeFileSync(
      listFile,
      scenes.map((s) => `file '${path.join(OUT, `${s.name}.mp4`)}'`).join("\n") + "\n",
    );
    const combined = path.join(OUT, "reel-completo.mp4");
    const total = scenes.reduce((acc, s) => acc + s.duration, 0).toFixed(1);
    const concatRes = spawnSync(
      "ffmpeg",
      ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", combined],
      { encoding: "utf8" },
    );
    if (concatRes.status === 0) {
      console.log(`  ✓ reel-completo.mp4  (${total}s, todos juntos)`);
    } else {
      console.error(`  ✗ No se pudo unir: ${concatRes.stderr?.slice(-400)}`);
    }
  }

  ws.close();
} finally {
  chrome.kill("SIGKILL");
  rmSync(workDir, { recursive: true, force: true });
  rmSync(profileDir, { recursive: true, force: true });
}
