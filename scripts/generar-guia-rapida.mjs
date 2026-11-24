import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const RAIZ = process.cwd();
const SALIDA_DIR = path.join(RAIZ, 'public', 'libro');
const SALIDA = path.join(SALIDA_DIR, 'guia-rapida-ia-20-terminos.pdf');

const modulos = [
  '01-fundamentos.mjs', '02-modelos.mjs', '03-agentes.mjs', '04-herramientas.mjs',
  '05-datos.mjs', '06-prompting.mjs', '07-seguridad.mjs', '08-negocio.mjs', '09-extra.mjs', '10-nuevos.mjs', '11-final.mjs'
];
const todos = [];
for (const m of modulos) {
  const { default: lote } = await import(`./contenido/${m}`);
  todos.push(...lote);
}
// 20 términos esenciales (los "destacados")
const terminos = todos.filter((t) => t.destacado).slice(0, 20);

fs.mkdirSync(SALIDA_DIR, { recursive: true });

const BLUE = '#2c2878';
const GOLD = '#f0b46a';
const TINTA = '#1f2430';
const GRIS = '#5b6170';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 50, left: 56, right: 56 },
  bufferPages: true,
  info: {
    Title: 'Guía rápida de IA para tu negocio - 20 términos esenciales',
    Author: 'Chess AI Agency',
    Subject: 'Introducción gratuita a la inteligencia artificial para pymes',
  },
});
doc.pipe(fs.createWriteStream(SALIDA));

const ANCHO = 595.28 - 112;

// Portada
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BLUE);
doc.rect(0, 0, 14, doc.page.height).fill(GOLD);
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(11).text('CHESS AI AGENCY', 56, 62, { characterSpacing: 2 });
const logoGuia = path.join(RAIZ, 'scripts', 'img-bw', 'logo-bw.png');
doc.image(logoGuia, 56, 82, { width: 40 });
doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD).text('Estrategia · Innovación · Ejecución', 104, 92, { characterSpacing: 0.5 });
doc.font('Helvetica').fontSize(9).fillColor('#dcd8ff').text('agency.ajedrezpremium.com', 104, 106);
doc.rect(56, 124, 60, 3).fill(GOLD);
doc.font('Helvetica-Bold').fontSize(52).fillColor('#ffffff').text('Guía rápida', 56, 195);
doc.font('Helvetica-Bold').fontSize(52).fillColor(GOLD).text('de IA', 56, 253);
doc.font('Helvetica').fontSize(24).fillColor('#dcd8ff').text('para tu negocio', 56, 325);
doc.font('Helvetica').fontSize(13).fillColor('#ffffff').text(
  '20 términos esenciales explicados en español,\ncon ejemplos reales y sin jerga innecesaria.',
  56, 385, { lineGap: 6 },
);
doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text('EDICIÓN GRATUITA · 2026', 56, 470, { characterSpacing: 1.5 });

// Intro (página 2)
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Esta guía es solo el principio');
doc.moveDown(0.6);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text(
  'Aquí tienes 20 términos esenciales para empezar a entender la IA aplicada a tu negocio. Es una selección breve: suficiente para tomar decisiones informadas, no para profundizar en cada concepto.',
  { lineGap: 4 },
);
doc.moveDown(0.5);
doc.text(
  'Si quieres el Diccionario completo —120 términos, 8 bloques, ejemplos, errores frecuentes, FAQ, índice alfabético y checklist de automatización— búscalo en Amazon en formato tapa blanda o ebook.',
  { lineGap: 4 },
);
doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text('Cómo usar esta guía');
doc.moveDown(0.3);
for (const [a, b] of [
  ['Empieza por', 'Inteligencia artificial, Machine learning y LLM.'],
  ['Sigue con', 'Prompt, RAG y Agente de IA para ver cómo se aplica.'],
  ['No olvides', 'Alucinación, Prompt injection y RGPD para usarla con seguridad.'],
]) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(TINTA).text(a, { continued: true });
  doc.font('Times-Roman').fontSize(10).fillColor(GRIS).text(`  ${b}`, { lineGap: 3 });
  doc.moveDown(0.2);
}


// ---------- Infografía: resumen visual al cierre de cada ficha ----------
const recortar = (texto, max) => {
  const limpio = String(texto || '').replace(/\s+/g, ' ').trim();
  if (limpio.length <= max) return limpio;
  const corte = limpio.slice(0, max);
  return corte.slice(0, corte.lastIndexOf(' ')) + '…';
};

const dibujarIcono = (tipo, cx, cy) => {
  doc.save().strokeColor('#ffffff').fillColor('#ffffff').lineWidth(1.1);
  if (tipo === 'idea') {
    doc.circle(cx, cy + 1, 4.6).stroke();
    for (const [dx, dy] of [[-7, -6], [0, -8], [7, -6]]) {
      doc.moveTo(cx + dx, cy + dy).lineTo(cx + dx * 0.7, cy + dy * 0.6).stroke();
    }
  } else if (tipo === 'uso') {
    doc.rect(cx - 5, cy - 5, 10, 10).stroke();
    doc.circle(cx, cy, 2).fill();
  } else {
    doc.moveTo(cx, cy - 6).lineTo(cx + 6, cy + 5).lineTo(cx - 6, cy + 5).closePath().stroke();
    doc.moveTo(cx, cy - 2).lineTo(cx, cy + 1).stroke();
    doc.circle(cx, cy + 3.2, 0.8).fill();
  }
  doc.restore();
};

const microInfografia = (t) => {
  const x0 = 56;
  const y0 = 548;
  const alto = 146;
  const anchoCol = (ANCHO - 2 * 12 - 28) / 3;
  const cy = y0 + 46;

  doc.roundedRect(x0, y0, ANCHO, alto, 8).fill('#f3f1fb');
  doc.rect(x0, y0, 4, alto).fill(GOLD);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(BLUE)
    .text('RESUMEN EN 10 SEGUNDOS', x0 + 14, y0 + 11, { characterSpacing: 1.4 });
  doc.moveTo(x0 + 30, cy).lineTo(x0 + ANCHO - 16, cy).lineWidth(1).strokeColor('#d8d3f0').stroke();

  const columnas = [
    { tipo: 'idea', color: BLUE, titulo: 'EN UNA FRASE', texto: recortar(t.def, 92) },
    { tipo: 'uso', color: '#5b52b5', titulo: 'PARA QUÉ SIRVE', texto: recortar(t.negocio, 92) },
    { tipo: 'aviso', color: '#d2954a', titulo: 'OJO CON…', texto: recortar(t.errores || t.def, 92) },
  ];
  columnas.forEach((c, i) => {
    const x = x0 + 14 + i * (anchoCol + 12);
    doc.circle(x + 11, cy, 11).fill(c.color);
    dibujarIcono(c.tipo, x + 11, cy);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(BLUE)
      .text(c.titulo, x + 28, cy - 5, { width: anchoCol - 26 });
    doc.font('Helvetica').fontSize(8.5).fillColor(TINTA)
      .text(c.texto, x, cy + 18, { width: anchoCol + 14, lineGap: 3 });
  });
};

// Fichas
for (const t of terminos) {
  doc.addPage();
  doc.font('Helvetica-Bold').fontSize(9).fillColor(GRIS).text('DICCIONARIO RÁPIDO DE IA', { characterSpacing: 1.2 });
  doc.moveDown(0.2);
  doc.font('Helvetica-Bold').fontSize(24).fillColor(TINTA).text(t.t, { lineGap: 2 });
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(9).fillColor(GRIS).text(`${t.full}`, { lineGap: 2 });
  doc.moveDown(0.4);

  doc.font('Times-Italic').fontSize(12).fillColor(TINTA).text(t.def, { lineGap: 3 });
  doc.moveDown(0.6);

  const seccion = (titulo, texto) => {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(BLUE).text(titulo);
    doc.moveDown(0.1);
    doc.font('Times-Roman').fontSize(10.5).fillColor(TINTA).text(texto, { lineGap: 3.5, align: 'justify' });
    doc.moveDown(0.5);
  };
  seccion('En qué consiste', `${t.p1}\n\n${t.p2}`);
  seccion('Una analogía', `«${t.analogia}»`);
  seccion('Ejemplo de negocio', t.ejemplo);
  seccion('Cómo aplicarlo', t.negocio);
  microInfografia(t);
}

// ---------- Mapa visual de los 20 términos ----------
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('El mapa de los 20 términos');
doc.moveDown(0.2);
doc.font('Helvetica').fontSize(10).fillColor(GRIS).text('Cómo encaja cada pieza, de la idea al control', { lineGap: 3 });

const ETAPAS = [
  { titulo: 'BASE', cats: ['fundamentos'], color: BLUE },
  { titulo: 'LENGUAJE', cats: ['modelos', 'prompting'], color: '#4b45a8' },
  { titulo: 'CONOCIMIENTO', cats: ['datos-y-conocimiento'], color: '#5b52b5' },
  { titulo: 'ACCIÓN', cats: ['agentes', 'herramientas-desarrollo'], color: '#6d4bb5' },
  { titulo: 'CONTROL', cats: ['seguridad-y-etica'], color: '#8a4fa8' },
];
let my = 168;
const mx = 56;
const anchoCaja = ANCHO - 40;
ETAPAS.forEach((etapa, i) => {
  const nombres = terminos.filter((t) => etapa.cats.includes(t.cat)).map((t) => t.t);
  const altoCaja = 74;
  if (i < ETAPAS.length - 1) {
    doc.moveTo(mx + 13, my + 26).lineTo(mx + 13, my + 26 + 22)
      .lineWidth(2).strokeColor('#d8d3f0').stroke();
  }
  doc.roundedRect(mx, my, 26, 26, 13).fill(etapa.color);
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#ffffff')
    .text(String(i + 1), mx + 7, my + 6, { width: 12, align: 'center' });
  doc.font('Helvetica-Bold').fontSize(11).fillColor(etapa.color).text(etapa.titulo, mx + 38, my + 6);
  doc.roundedRect(mx + 38, my + 26, anchoCaja - 38, altoCaja, 6).fill('#f3f1fb');
  doc.font('Helvetica').fontSize(9.5).fillColor(TINTA)
    .text(nombres.join('   ·   '), mx + 50, my + 40, { width: anchoCaja - 62, lineGap: 4 });
  my += altoCaja + 40;
});
doc.font('Helvetica-Oblique').fontSize(9).fillColor(GRIS)
  .text('De la base al control: así se conectan los 20 términos de esta guía.', mx, my + 4);

// Cierre + checklist + CTA Amazon
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Antes de dar el siguiente paso');
doc.moveDown(0.5);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text('Diez preguntas para decidir si la IA encaja en tu negocio:', { lineGap: 4 });
doc.moveDown(0.6);
const preguntas = [
  '¿Qué tarea concreta quiero mejorar?',
  '¿Cuánto cuesta ahora, con números?',
  '¿Qué datos necesito y dónde están?',
  '¿Qué significa que funcione?',
  '¿Qué pasa si el sistema se equivoca?',
  '¿Qué decisiones requieren aprobación humana?',
  '¿Dónde se procesan los datos?',
  '¿Cuánto cuesta al mes?',
  '¿Cómo lo apago si falla?',
  '¿Quién es el responsable interno?',
];
for (const [i, p] of preguntas.entries()) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor(BLUE).text(`${String(i + 1).padStart(2, '0')}`, { continued: true });
  doc.font('Times-Roman').fontSize(11).fillColor(TINTA).text(`  ${p}`, { lineGap: 4 });
  doc.moveDown(0.3);
}
doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('¿Quieres los 120 términos completos?');
doc.moveDown(0.3);
doc.font('Times-Roman').fontSize(10.5).fillColor(GRIS).text(
  'El Diccionario de IA para tu negocio está disponible en Amazon: tapa blanda (14,99 €) y ebook (6,99 €). Incluye 120 términos, ejemplos, errores frecuentes, FAQ, índice y checklist ampliado.',
  { lineGap: 4 },
);
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10).fillColor(BLUE).text('Busca «Diccionario de IA para tu negocio» en Amazon', { lineGap: 3 });
doc.moveDown(0.8);
doc.font('Helvetica').fontSize(9).fillColor('#888').text('Chess AI Agency · agency.ajedrezpremium.com', { lineGap: 3 });

// ---------- Sobre Chess AI Agency (del libro, pág. 115) ----------
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Sobre Chess AI Agency');
doc.moveDown(0.15);
doc.font('Helvetica').fontSize(9).fillColor(GRIS).text('Agencia de IA aplicada al ajedrez, los deportes y los negocios', { lineGap: 2 });
doc.moveDown(0.5);
doc.font('Times-Roman').fontSize(10).fillColor(TINTA).text('Somos un equipo especializado en IA aplicada al ajedrez, los deportes y los negocios. Trabajamos desde septiembre de 2025 con un enfoque práctico: soluciones reales, sin adornos y con resultados medibles.', { lineGap: 3, align: 'justify' });
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(BLUE).text('Misión');
doc.moveDown(0.1);
doc.font('Times-Roman').fontSize(9.5).fillColor(TINTA).text('Democratizar la IA de élite para el ecosistema ajedrecístico y deportivo: agentes autónomos, plataformas inteligentes y soluciones empresariales reales.', { lineGap: 3, align: 'justify' });
doc.moveDown(0.3);
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(BLUE).text('En cifras');
doc.moveDown(0.1);
doc.font('Times-Roman').fontSize(9.5).fillColor(TINTA).text('30 proyectos en marcha · 14 meses de trayectoria · 3 idiomas · agente IA 24/7. Casos: ChessOrganizers.com (95 % automatización, 200+ torneos/año), Football AI (99,2 % precisión) y Chess AI Premium (50+ academias).', { lineGap: 3, align: 'justify' });
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(BLUE).text('web: agency.ajedrezpremium.com   ·   contacto: chessagencyai@gmail.com');

// ---------- Contraportada ----------
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BLUE);
for (let gx = 0; gx < doc.page.width; gx += 40) doc.moveTo(gx, 0).lineTo(gx, doc.page.height).strokeColor('#ffffff08').lineWidth(0.5).stroke();
for (let gy = 0; gy < doc.page.height; gy += 40) doc.moveTo(0, gy).lineTo(doc.page.width, gy).strokeColor('#ffffff08').lineWidth(0.5).stroke();
doc.rect(0, 0, 14, doc.page.height).fill(GOLD);
const logoContra = path.join(RAIZ, 'scripts', 'img-bw', 'logo-bw.png');
doc.image(logoContra, 56, 120, { width: 60 });
doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD).text('Estrategia · Innovación · Ejecución', 126, 135);
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(14).text('ENTIENDE LA IA ANTES DE COMPRARLA', 56, 200, { characterSpacing: 1.5 });
doc.font('Helvetica').fontSize(12).fillColor('#dcd8ff').text('20 términos · guía gratuita · checklist inicial', 56, 240);
doc.font('Times-Roman').fontSize(11).fillColor('#ffffff').text('La IA no es magia ni amenaza: es una herramienta. Esta guía te da el vocabulario para empezar a decidir con criterio.', 56, 300, { width: 483, lineGap: 4 });
doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD).text('¿Quieres los 120 términos completos?', 56, 380);
doc.font('Helvetica').fontSize(10).fillColor('#b9b5e8').text('Búscalo en Amazon: tapa blanda 14,99 € · ebook 6,99 €', 56, 405);
doc.font('Helvetica').fontSize(9).fillColor('#8f8ad8').text('agency.ajedrezpremium.com · chessagencyai@gmail.com', 56, doc.page.height - 80);

doc.end();
await new Promise((resolve, reject) => {
  doc.on('end', resolve);
  doc.on('error', reject);
});
const stats = fs.statSync(SALIDA);
console.log(`✅ Guía rápida generada: public/libro/guia-rapida-ia-20-terminos.pdf (${(stats.size / 1024).toFixed(0)} KB, ${terminos.length} términos)`);