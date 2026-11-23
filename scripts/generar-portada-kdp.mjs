import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const RAIZ = process.cwd();
const SALIDA_DIR = path.join(RAIZ, 'public', 'libro');
const SALIDA = path.join(SALIDA_DIR, 'diccionario-ia-kdp-portada.pdf');

// KDP Cover dimensions for 140 pages, white paper, 6" x 9"
const PAGES = 140;
const SPINE_WIDTH_IN = PAGES * 0.002252; // 0.31528"
const BLEED = 0.125 * 72; // 9pt
const TRIM_W = 6 * 72; // 432pt
const TRIM_H = 9 * 72; // 648pt
const SPINE_W = SPINE_WIDTH_IN * 72; // 22.7pt
const TOTAL_W = BLEED + TRIM_W + SPINE_W + TRIM_W + BLEED;
const TOTAL_H = TRIM_H + BLEED * 2;

fs.mkdirSync(SALIDA_DIR, { recursive: true });

const doc = new PDFDocument({
  size: [TOTAL_W, TOTAL_H],
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  autoFirstPage: false,
  info: {
    Title: 'Diccionario de IA para tu negocio - Portada',
    Author: 'Roberto Páramos Domínguez',
    Creator: 'Chess AI Agency',
    Producer: 'JRedition',
  },
});

doc.pipe(fs.createWriteStream(SALIDA));

doc.addPage();

// Register fonts
doc.registerFont('Heading', 'C:/Windows/Fonts/segoeui.ttf');
doc.registerFont('Heading-Bold', 'C:/Windows/Fonts/segoeuib.ttf');
doc.registerFont('Body', 'C:/Windows/Fonts/georgia.ttf');
doc.registerFont('Body-Italic', 'C:/Windows/Fonts/georgiai.ttf');

// Background
doc.rect(0, 0, TOTAL_W, TOTAL_H).fill('#1a1a2e');

// Bleed lines (guides, not printed)
// Back cover (left): x from BLEED to BLEED+TRIM_W
const backX = BLEED;
const spineX = BLEED + TRIM_W;
const frontX = spineX + SPINE_W;

// Back cover
doc.rect(backX, BLEED, TRIM_W, TRIM_H).fill('#1a1a2e');
// Back cover text
doc.fillColor('#ffffff').font('Heading-Bold').fontSize(14).text('ENTIENDE LA IA', backX + 30, BLEED + 60, { width: TRIM_W - 60 });
doc.font('Heading-Bold').fontSize(14).fillColor('#d4af37').text('ANTES DE COMPRARLA', backX + 30, BLEED + 80, { width: TRIM_W - 60 });
doc.font('Body').fontSize(10).fillColor('#dcd8ff').text(
  '100 términos de inteligencia artificial explicados en español, con ejemplos reales de negocio y sin jerga innecesaria.',
  backX + 30, BLEED + 120, { width: TRIM_W - 60, lineGap: 3 },
);
doc.font('Body').fontSize(9).fillColor('#b9b5e8').text(
  'La IA no es magia ni amenaza: es una herramienta. Este diccionario te da el vocabulario para decidir con criterio.',
  backX + 30, BLEED + 200, { width: TRIM_W - 60, lineGap: 3 },
);
doc.font('Heading-Bold').fontSize(10).fillColor('#d4af37').text('¿Quieres que lo revisemos contigo?', backX + 30, BLEED + 290);
doc.font('Body').fontSize(9).fillColor('#b9b5e8').text('Solicita un diagnóstico gratuito en agency.ajedrezpremium.com', backX + 30, BLEED + 310, { width: TRIM_W - 60 });
// Barcode area (bottom right of back cover)
doc.rect(backX + TRIM_W - 160, BLEED + TRIM_H - 70, 150, 60).fill('#ffffff');
doc.font('Body').fontSize(7).fillColor('#000000').text('ISBN: [pendiente KDP]', backX + TRIM_W - 155, BLEED + TRIM_H - 45, { width: 140, align: 'center' });

// Spine
doc.rect(spineX, BLEED, SPINE_W, TRIM_H).fill('#2c2878');
// Spine text (vertical, centered)
doc.save();
doc.translate(spineX + SPINE_W / 2, BLEED + TRIM_H / 2);
doc.rotate(-90);
doc.font('Heading-Bold').fontSize(9).fillColor('#ffffff').text('Diccionario de IA para tu negocio', -TRIM_H / 2 + 20, -SPINE_W / 2, { width: TRIM_H - 40, align: 'center' });
doc.font('Body').fontSize(7).fillColor('#dcd8ff').text('Roberto Páramos Domínguez', -TRIM_H / 2 + 20, SPINE_W / 2 - 10, { width: TRIM_H - 40, align: 'center' });
doc.restore();

// Front cover
doc.rect(frontX, BLEED, TRIM_W, TRIM_H).fill('#2c2878');
// Gold accent bar
doc.rect(frontX, BLEED, 12, TRIM_H).fill('#d4af37');
// Grid pattern
for (let gx = frontX; gx < frontX + TRIM_W; gx += 30) {
  doc.moveTo(gx, BLEED).lineTo(gx, BLEED + TRIM_H).strokeColor('#ffffff06').lineWidth(0.5).stroke();
}
for (let gy = BLEED; gy < BLEED + TRIM_H; gy += 30) {
  doc.moveTo(frontX, gy).lineTo(frontX + TRIM_W, gy).strokeColor('#ffffff06').lineWidth(0.5).stroke();
}

doc.fillColor('#ffffff').font('Heading-Bold').fontSize(10).text('JREDITION', frontX + 40, BLEED + 60, { characterSpacing: 3 });
doc.rect(frontX + 40, BLEED + 78, 50, 2).fill('#d4af37');

doc.font('Heading-Bold').fontSize(44).fillColor('#ffffff').text('Diccionario', frontX + 40, BLEED + 140);
doc.font('Heading-Bold').fontSize(44).fillColor('#d4af37').text('de IA', frontX + 40, BLEED + 190);

doc.font('Heading').fontSize(22).fillColor('#ffffff').text('para tu negocio', frontX + 40, BLEED + 255);

doc.font('Body').fontSize(12).fillColor('#e8e4ff').text(
  '100 términos explicados en español,\ncon ejemplos reales y sin jerga innecesaria.',
  frontX + 40, BLEED + 310, { lineGap: 4 },
);

doc.rect(frontX + 40, BLEED + 380, 200, 1).fill('#8f8ad8');
doc.font('Heading-Bold').fontSize(10).fillColor('#ffffff').text('EDICIÓN 2026', frontX + 40, BLEED + 395, { characterSpacing: 1.5 });
doc.font('Heading').fontSize(10).fillColor('#b9b5e8').text('100 términos · 8 bloques · checklist final', frontX + 40, BLEED + 415);

doc.font('Body').fontSize(11).fillColor('#ffffff').text('Roberto Páramos Domínguez', frontX + 40, BLEED + TRIM_H - 80);

doc.end();

await new Promise((resolve, reject) => {
  doc.on('end', resolve);
  doc.on('error', reject);
});

const stats = fs.statSync(SALIDA);
console.log(`✅ Portada KDP generada: public/libro/diccionario-ia-kdp-portada.pdf (${(stats.size / 1024).toFixed(0)} KB)`);
console.log(`   Dimensiones: ${TOTAL_W.toFixed(1)} x ${TOTAL_H.toFixed(1)} pt (${(TOTAL_W/72).toFixed(2)}" x ${(TOTAL_H/72).toFixed(2)}")`);
console.log(`   Spine: ${SPINE_WIDTH_IN.toFixed(4)}" (${SPINE_W.toFixed(1)} pt) para ${PAGES} páginas`);