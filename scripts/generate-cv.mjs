import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataModule = await import("../src/data/cv.ts");
const data = dataModule.default;

const COLORS = {
  accent: "#ff3b3b",
  medio: "#ff7676",
  claro: "#fff5f5",
  oscuro: "#0a0a0a",
  fondo: "#1a1a2e",
  white: "#ffffff",
  lightGray: "#e0e0e0",
  textDark: "#1a1a2e",
  textGray: "#666666",
};

const MARGIN = 50;
const PAGE_WIDTH = 595.28;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
const BOTTOM_MARGIN = 50;

let pageNum = 0;

const doc = new PDFDocument({
  size: "A4",
  margin: MARGIN,
  info: {
    Title: "CV - Marcos F. Zingaretti",
    Author: "Marcos F. Zingaretti",
    Subject: "Curriculum Vitae - Full Stack Web Developer",
    Keywords: "Web Developer, Full Stack, React, Astro, TypeScript, Node.js",
  },
});

const outputPath = path.join(__dirname, "../public/CV_Marcos_Zingaretti.pdf");
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

function addFooter() {
  const savedY = doc.y;
  const ph = doc.page.height;
  const fy = ph - BOTTOM_MARGIN - 30;
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textGray);
  doc.text(
    "CV - Marcos F. Zingaretti | Full Stack Web Developer | " + new Date().getFullYear(),
    MARGIN,
    fy,
    { width: CONTENT_WIDTH, align: "center" },
  );
  doc.text("Pagina " + pageNum, MARGIN, fy + 11, { width: CONTENT_WIDTH, align: "center" });
  doc
    .moveTo(MARGIN, fy - 8)
    .lineTo(PAGE_WIDTH - MARGIN, fy - 8)
    .strokeColor(COLORS.lightGray)
    .lineWidth(0.5)
    .stroke();
  doc.y = savedY;
}

doc.on("pageAdded", () => {
  pageNum++;
  addFooter();
});

pageNum = 1;
addFooter();

function addSectionLine(y) {
  doc
    .moveTo(MARGIN, y)
    .lineTo(PAGE_WIDTH - MARGIN, y)
    .strokeColor(COLORS.accent)
    .lineWidth(1)
    .stroke();
  return y + 10;
}

function addSectionHeader(text, y) {
  y = addSectionLine(y || doc.y + 5);
  doc.font("Helvetica-Bold").fontSize(15).fillColor(COLORS.accent);
  doc.text(text, MARGIN, y, { width: CONTENT_WIDTH });
  return doc.y + 4;
}

function checkPageBreak(needed) {
  if (doc.y + needed > doc.page.height - BOTTOM_MARGIN) {
    doc.addPage();
  }
  return doc.y;
}

// ==================== HEADER ====================
doc.rect(0, 0, PAGE_WIDTH, 130).fill(COLORS.fondo);

doc.font("Helvetica-Bold").fontSize(26).fillColor(COLORS.white);
doc.text("MARCOS F. ZINGARETTI", MARGIN, 35, { width: CONTENT_WIDTH });

doc.font("Helvetica").fontSize(13).fillColor(COLORS.medio);
doc.text("Full Stack Web Developer", MARGIN, 68, { width: CONTENT_WIDTH });

doc.font("Helvetica").fontSize(8.5).fillColor(COLORS.claro);
const contactItems = ["Cordoba, Argentina", "github.com/marcoszingaretti"];
let cx = MARGIN;
contactItems.forEach((item) => {
  const w = doc.widthOfString(item) + 20;
  doc.text(item, cx, 95, { continued: true });
  cx += w;
});

doc
  .moveTo(MARGIN, 120)
  .lineTo(PAGE_WIDTH - MARGIN, 120)
  .strokeColor(COLORS.accent)
  .lineWidth(2)
  .stroke();

doc.y = 140;

// ==================== PERFIL PROFESIONAL ====================
doc.y = addSectionHeader("PERFIL PROFESIONAL");

data.sobreMi.forEach((p, i) => {
  doc.y = checkPageBreak(60);
  doc.font("Helvetica").fontSize(10).fillColor(COLORS.textDark);
  doc.text(p, MARGIN, doc.y, {
    width: CONTENT_WIDTH,
    lineGap: 3,
    paragraphGap: i < data.sobreMi.length - 1 ? 8 : 12,
  });
});

// ==================== EXPERIENCIA ====================
doc.y = checkPageBreak(80);
doc.y = addSectionHeader("EXPERIENCIA");

data.experiencias.forEach((exp, i) => {
  doc.y = checkPageBreak(80);
  if (i > 0) {
    doc
      .moveTo(MARGIN, doc.y)
      .lineTo(PAGE_WIDTH - MARGIN, doc.y)
      .strokeColor(COLORS.lightGray)
      .lineWidth(0.5)
      .stroke();
    doc.y += 8;
  }
  const py = doc.y;
  doc.font("Helvetica").fontSize(9).fillColor(COLORS.textGray);
  doc.text(exp.fecha, MARGIN, py);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(COLORS.textDark);
  doc.text(exp.titulo, MARGIN + 80, py, { width: CONTENT_WIDTH - 80 });
  doc.y = py + 16;
  doc.font("Helvetica").fontSize(10).fillColor(COLORS.textDark);
  doc.text(exp.descripcion, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2, paragraphGap: 8 });
});

// ==================== PROYECTOS ====================
doc.y = checkPageBreak(80);
doc.y = addSectionHeader("PROYECTOS");

data.proyectos.forEach((proy, i) => {
  doc.y = checkPageBreak(100);
  if (i > 0) {
    doc
      .moveTo(MARGIN, doc.y)
      .lineTo(PAGE_WIDTH - MARGIN, doc.y)
      .strokeColor(COLORS.lightGray)
      .lineWidth(0.5)
      .stroke();
    doc.y += 8;
  }
  doc.font("Helvetica-Bold").fontSize(11).fillColor(COLORS.accent);
  doc.text(proy.nombre, MARGIN, doc.y);
  doc.y += 14;
  if (proy.tecnologias?.length) {
    doc.font("Helvetica-Oblique").fontSize(9).fillColor(COLORS.textGray);
    doc.text("Tecnologias: " + proy.tecnologias.join(", "), MARGIN, doc.y, {
      width: CONTENT_WIDTH,
    });
    doc.y += 12;
  }
  doc.font("Helvetica").fontSize(10).fillColor(COLORS.textDark);
  doc.text(proy.descripcion, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2, paragraphGap: 4 });
  if (proy.descripcionLarga) {
    doc.font("Helvetica").fontSize(9).fillColor(COLORS.textGray);
    doc.text(proy.descripcionLarga, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 2,
      paragraphGap: 4,
    });
  }
  if (proy.enlace) {
    doc.y += 4;
    doc.font("Helvetica").fontSize(9).fillColor(COLORS.accent);
    doc.text(proy.enlace, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      link: proy.enlace,
      underline: true,
    });
    doc.y += 12;
  }
});

// ==================== EDUCACION ====================
doc.y = checkPageBreak(80);
doc.y = addSectionHeader("EDUCACION");

data.experiencias
  .filter((e) =>
    /estudio|curso|tecnico|tecnica|programa|bootcamp|formalizaci\xF3n|formalizacion/i.test(
      e.titulo,
    ),
  )
  .forEach((edu, i) => {
    doc.y = checkPageBreak(60);
    if (i > 0) {
      doc
        .moveTo(MARGIN, doc.y)
        .lineTo(PAGE_WIDTH - MARGIN, doc.y)
        .strokeColor(COLORS.lightGray)
        .lineWidth(0.5)
        .stroke();
      doc.y += 8;
    }
    const py = doc.y;
    doc.font("Helvetica").fontSize(9).fillColor(COLORS.textGray);
    doc.text(edu.fecha, MARGIN, py);
    doc.font("Helvetica-Bold").fontSize(11).fillColor(COLORS.textDark);
    doc.text(edu.titulo, MARGIN + 80, py, { width: CONTENT_WIDTH - 80 });
    doc.y = py + 16;
    doc.font("Helvetica").fontSize(10).fillColor(COLORS.textDark);
    doc.text(edu.descripcion, MARGIN, doc.y, { width: CONTENT_WIDTH, lineGap: 2, paragraphGap: 8 });
  });

// ==================== IDIOMAS ====================
doc.y = checkPageBreak(40);
doc.y = addSectionHeader("IDIOMAS");
doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.textDark);
doc.text("Espanol - Nativo", MARGIN, doc.y);
doc.y += 16;
doc.text("Ingles - Tecnico / Profesional (B2-C1)", MARGIN, doc.y);

const totalPageCount = pageNum;

doc.on("end", () => {
  const stats = fs.statSync(outputPath);
  console.log("OK: CV generado en " + outputPath);
  console.log("Tamano: " + (stats.size / 1024).toFixed(1) + " KB");
  console.log("Paginas: " + totalPageCount);
});

doc.end();
