import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const RAIZ = process.cwd();
const SALIDA_DIR = path.join(RAIZ, 'public', 'libro');
const SALIDA = path.join(SALIDA_DIR, 'diccionario-ia.pdf');

const modulos = [
  '01-fundamentos.mjs',
  '02-modelos.mjs',
  '03-agentes.mjs',
  '04-herramientas.mjs',
  '05-datos.mjs',
  '06-prompting.mjs',
  '07-seguridad.mjs',
  '08-negocio.mjs',
];

const CATEGORIAS = {
  fundamentos: 'Fundamentos',
  modelos: 'Modelos y lenguaje',
  agentes: 'Agentes y automatización',
  'herramientas-desarrollo': 'Herramientas y desarrollo',
  'datos-y-conocimiento': 'Datos y conocimiento',
  prompting: 'Prompting',
  'seguridad-y-etica': 'Seguridad, ética y legal',
  negocio: 'Negocio y aplicación',
};

const terminos = [];
for (const modulo of modulos) {
  const { default: lote } = await import(`./contenido/${modulo}`);
  terminos.push(...lote);
}

fs.mkdirSync(SALIDA_DIR, { recursive: true });

const AZUL = '#3f3aa8';
const AZUL_OSCURO = '#2c2878';
const TINTA = '#1f2430';
const GRIS = '#5b6170';
const LINEA = '#d9d5cc';
const PAPEL = '#faf8f4';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 36, left: 56, right: 56 },
  bufferPages: true,
  info: {
    Title: 'Diccionario de IA para tu negocio',
    Author: 'Chess AI Agency',
    Subject: '100 términos de inteligencia artificial explicados en español',
    Keywords: 'IA, inteligencia artificial, glosario, pymes, español',
  },
});

doc.pipe(fs.createWriteStream(SALIDA));

const ancho = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function salto(minimo = 90) {
  if (doc.y > doc.page.height - doc.page.margins.bottom - minimo) doc.addPage();
}

// ---------- Portada ----------
doc.rect(0, 0, doc.page.width, doc.page.height).fill(AZUL_OSCURO);
doc.rect(0, 0, 18, doc.page.height).fill('#6d4bb5');
doc.rect(56, 120, 54, 4).fill('#f0b46a');

doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(12).text('CHESS AI AGENCY', 56, 96, {
  characterSpacing: 2,
});

doc.font('Helvetica-Bold').fontSize(64).fillColor('#ffffff').text('Diccionario', 56, 190);
doc.font('Helvetica-Bold').fontSize(64).fillColor('#f0b46a').text('de IA', 56, 258);

doc
  .font('Helvetica')
  .fontSize(22)
  .fillColor('#dcd8ff')
  .text('para tu negocio', 56, 350);

doc
  .font('Helvetica')
  .fontSize(13)
  .fillColor('#ffffff')
  .text(
    '100 términos explicados en español, con ejemplos reales\ny sin jerga innecesaria. Para pymes, autónomos\ny profesionales que no programan.',
    56,
    420,
    { lineGap: 6 },
  );

doc.rect(56, 540, 200, 1).fill('#8f8ad8');
doc
  .font('Helvetica-Bold')
  .fontSize(11)
  .fillColor('#ffffff')
  .text('EDICIÓN 10 · 2026', 56, 560, { characterSpacing: 1.5 });

doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor('#b9b5e8')
  .text('diccionario-ia.vercel.app', 56, doc.page.height - 80);

// ---------- Créditos ----------
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Antes de empezar');
doc.moveDown(1);
doc.font('Helvetica').fontSize(11).fillColor(GRIS);
doc.text(
  'Este libro reúne los 100 términos del Diccionario IA, un glosario público escrito para que puedas entender qué te están vendiendo, qué necesitas de verdad y qué puedes ignorar sin remordimientos.',
  { lineGap: 4 },
);
doc.moveDown(0.8);
doc.text(
  'Cada ficha sigue la misma estructura: definición en una frase, explicación sencilla, una analogía, un ejemplo de negocio, aplicación práctica y errores frecuentes. No es un manual técnico ni un curso. Es un vocabulario común para tomar mejores decisiones.',
  { lineGap: 4 },
);
doc.moveDown(0.8);
doc.text(
  'La IA cambia rápido. Si encuentras un término desactualizado o falta uno, escríbenos desde la web. La siguiente edición se construye también con tus preguntas.',
  { lineGap: 4 },
);
doc.moveDown(1.5);
doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text('Cómo leerlo');
doc.moveDown(0.4);
doc.font('Helvetica').fontSize(11).fillColor(GRIS);
doc.text('• Si empiezas de cero: Fundamentos y Modelos.', { lineGap: 3 });
doc.text('• Si quieres aplicar IA: Agentes, Datos y Negocio.', { lineGap: 3 });
doc.text('• Si te preocupa el riesgo: Seguridad, ética y legal.', { lineGap: 3 });
doc.text('• Si buscas una palabra: usa el índice alfabético del final.', { lineGap: 3 });

// ---------- Índice por categorías ----------
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Contenido');
doc.moveDown(1);

for (const [slug, nombre] of Object.entries(CATEGORIAS)) {
  const lista = terminos.filter((t) => t.cat === slug);
  salto(80);
  doc.font('Helvetica-Bold').fontSize(13).fillColor(AZUL).text(`${nombre} (${lista.length})`);
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(9.5).fillColor(GRIS);
  doc.text(lista.map((t) => t.t).join(' · '), { lineGap: 2 });
  doc.moveDown(0.8);
}

// ---------- Términos ----------
for (const [i, t] of terminos.entries()) {
  doc.addPage();

  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(AZUL)
    .text(CATEGORIAS[t.cat].toUpperCase(), { characterSpacing: 1.2 });
  doc.moveDown(0.4);

  doc.font('Helvetica-Bold').fontSize(26).fillColor(TINTA).text(t.t, { lineGap: 2 });
  doc.moveDown(0.35);

  doc
    .font('Helvetica-Oblique')
    .fontSize(12.5)
    .fillColor(GRIS)
    .text(t.def, { lineGap: 3 });

  doc.moveDown(0.7);
  doc.rect(doc.x, doc.y, ancho, 1).fill(LINEA);
  doc.moveDown(0.9);

  const bloque = (titulo, texto, cursiva = false) => {
    salto(80);
    doc.font('Helvetica-Bold').fontSize(11).fillColor(AZUL).text(titulo);
    doc.moveDown(0.25);
    doc
      .font(cursiva ? 'Helvetica-Oblique' : 'Helvetica')
      .fontSize(10.5)
      .fillColor(TINTA)
      .text(texto, { lineGap: 3.5, align: 'justify' });
    doc.moveDown(0.7);
  };

  bloque('En qué consiste', `${t.p1}\n\n${t.p2}`);
  bloque('Una analogía', t.analogia, true);
  bloque('Ejemplo real de negocio', t.ejemplo);
  bloque('Cómo aplicarlo en tu pyme', t.negocio);
  bloque('Errores frecuentes', t.errores);

  if (Array.isArray(t.faq) && t.faq.length) {
    salto(90);
    doc.font('Helvetica-Bold').fontSize(11).fillColor(AZUL).text('Preguntas frecuentes');
    doc.moveDown(0.3);
    for (const [p, r] of t.faq) {
      doc.font('Helvetica-Bold').fontSize(9.8).fillColor(TINTA).text(p, { lineGap: 2 });
      doc.font('Helvetica').fontSize(9.8).fillColor(GRIS).text(r, { lineGap: 3 });
      doc.moveDown(0.45);
    }
  }

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor('#9a9a9a')
    .text(`${i + 1} / ${terminos.length}`, { align: 'right' });
}

// ---------- Checklist final ----------
doc.addPage();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Checklist antes de automatizar');
doc.moveDown(0.6);
doc
  .font('Helvetica')
  .fontSize(11)
  .fillColor(GRIS)
  .text(
    'Una página para llevar a la próxima reunión. Si no puedes responder estas preguntas, todavía no es un proyecto: es una idea.',
    { lineGap: 4 },
  );
doc.moveDown(1);

const preguntas = [
  '¿Qué tarea concreta quiero mejorar y quién la hace hoy?',
  '¿Cuánto tiempo o dinero cuesta ahora, con números?',
  '¿Qué datos necesito y dónde están? ¿Son fiables?',
  '¿Qué significa que funcione? Métrica y umbral.',
  '¿Qué pasa si el sistema se equivoca? ¿Quién lo revisa?',
  '¿Qué decisiones requieren aprobación humana?',
  '¿Dónde se procesan los datos y con qué proveedor?',
  '¿Cuánto cuesta al mes en uso, mantenimiento y revisión?',
  '¿Cómo lo apago si falla o si cambia la normativa?',
  '¿Quién es el responsable interno del proyecto?',
];

for (const [i, p] of preguntas.entries()) {
  salto(40);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(AZUL).text(`${String(i + 1).padStart(2, '0')}`, {
    continued: true,
  });
  doc.font('Helvetica').fontSize(11).fillColor(TINTA).text(`  ${p}`, { lineGap: 4 });
  doc.moveDown(0.5);
  doc.rect(doc.x, doc.y, ancho, 0.5).fill(LINEA);
  doc.moveDown(0.6);
}

doc.moveDown(1.5);
doc
  .font('Helvetica-Bold')
  .fontSize(13)
  .fillColor(TINTA)
  .text('¿Quieres que lo revisemos contigo?');
doc.moveDown(0.3);
doc
  .font('Helvetica')
  .fontSize(10.5)
  .fillColor(GRIS)
  .text('Chess AI Agency · chessaiagency.com · diccionario-ia.vercel.app', { lineGap: 3 });

// ---------- Numeración ----------
const rango = doc.bufferedPageRange();
for (let i = 0; i < rango.count; i += 1) {
  doc.switchToPage(rango.start + i);
  if (i === 0) continue;
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor('#9a9a9a')
    .text(`Diccionario de IA · ${i + 1}`, 56, doc.page.height - 48, {
      width: ancho,
      align: 'center',
      lineBreak: false,
    });
}

const terminado = new Promise((resolve, reject) => {
  doc.on('end', resolve);
  doc.on('error', reject);
});

doc.end();
await terminado;

const stats = fs.statSync(SALIDA);
console.log(`✅ Libro generado: public/libro/diccionario-ia.pdf (${(stats.size / 1024).toFixed(0)} KB)`);
