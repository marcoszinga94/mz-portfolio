import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Genera las capturas de los proyectos a partir de su `enlace` en src/data/cv.ts.
 *
 * Usa Chromium headless (del sistema) vía CDP, sin dependencias externas, y guarda
 * cada captura como WebP en public/Images/paginas/<imagen>.webp.
 *
 * Uso:
 *   npm run generate-shots            # todos los proyectos
 *   node scripts/generate-project-shots.mjs --only=elsocorro
 *   CHROME_PATH=/usr/bin/chromium npm run generate-shots
 */

const dataModule = await import("../src/data/cv.ts");
const data = dataModule.default;

const OUT_DIR = path.resolve(process.cwd(), "public/Images/paginas");
const VIEWPORT = { width: 1200, height: 675 };
const SETTLE_MS = Number(process.env.SHOT_SETTLE_MS || 2200);
const LOAD_TIMEOUT_MS = 30000;
const DEBUG_PORT = Number(process.env.CHROME_PORT || 9333);
const UA =
  process.env.SHOT_UA ||
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36";

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : null;

const proyectos = only ? data.proyectos.filter((p) => p.imagen === only) : data.proyectos;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.includes("/") && spawnSync(candidate, ["--version"]).status === 0) {
      return candidate;
    }
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
    this.listeners = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method) {
        this.listeners.get(msg.method)?.forEach((cb) => cb(msg.params));
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

  once(method, timeoutMs = LOAD_TIMEOUT_MS) {
    return new Promise((resolve, reject) => {
      const cbs = this.listeners.get(method) ?? new Set();
      this.listeners.set(method, cbs);
      const cb = (params) => {
        clearTimeout(timer);
        cbs.delete(cb);
        resolve(params);
      };
      cbs.add(cb);
      const timer = setTimeout(() => {
        cbs.delete(cb);
        reject(new Error(`Timeout esperando ${method}`));
      }, timeoutMs);
    });
  }
}

async function waitForBrowser() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (res.ok) return;
    } catch {
      // todavía arrancando
    }
    await sleep(150);
  }
  throw new Error("Chromium no respondió en el puerto de debug");
}

async function getPageTarget() {
  const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  const page = list.find((t) => t.type === "page");
  if (!page) throw new Error("No hay pestaña disponible en Chromium");
  return page.webSocketDebuggerUrl;
}

const chromePath = findChrome();
if (!chromePath) {
  console.error("✖ No encontré Chromium. Definí la variable CHROME_PATH apuntando al ejecutable.");
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
const profileDir = mkdtempSync(path.join(tmpdir(), "shots-profile-"));
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
    "--disable-extensions",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "ignore"] },
);

let ok = 0;
let failed = 0;

try {
  await waitForBrowser();
  const wsUrl = await getPageTarget();
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve);
    ws.addEventListener("error", reject);
  });

  const cdp = new CDP(ws);
  await cdp.send("Page.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    ...VIEWPORT,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Emulation.setUserAgentOverride", { userAgent: UA });

  console.log(`→ Generando ${proyectos.length} captura(s) con ${path.basename(chromePath)}\n`);

  for (const proyecto of proyectos) {
    const outFile = path.join(OUT_DIR, `${proyecto.imagen}.webp`);
    process.stdout.write(`  • ${proyecto.nombre.padEnd(14)} ${proyecto.enlace} … `);
    try {
      const loaded = cdp.once("Page.loadEventFired");
      await cdp.send("Page.navigate", { url: proyecto.enlace });
      await loaded.catch(() => {});
      await sleep(SETTLE_MS);
      await cdp.send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" }).catch(() => {});

      const { data: base64 } = await cdp.send("Page.captureScreenshot", {
        format: "webp",
        quality: 78,
      });
      writeFileSync(outFile, Buffer.from(base64, "base64"));
      ok++;
      console.log("ok");
    } catch (error) {
      failed++;
      console.log(`falló (${error.message}) — se conserva la imagen actual`);
    }
  }

  ws.close();
} finally {
  chrome.kill("SIGKILL");
  rmSync(profileDir, { recursive: true, force: true });
}

console.log(`\n${ok} actualizada(s), ${failed} con error.`);
if (failed > 0 && ok === 0) process.exit(1);
