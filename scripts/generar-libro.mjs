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

const BLOQUES = {
  fundamentos: { nombre: 'Fundamentos', color: '#3f3aa8', descripcion: 'Las piezas básicas de la IA: qué es, cómo aprende y qué significa cada concepto.' },
  modelos: { nombre: 'Modelos y lenguaje', color: '#6d4bb5', descripcion: 'Cómo funcionan los modelos que escriben, razonan y generan imágenes.' },
  agentes: { nombre: 'Agentes y automatización', color: '#2c2878', descripcion: 'La IA que no solo responde: usa herramientas, recuerda y ejecuta.' },
  'herramientas-desarrollo': { nombre: 'Herramientas y desarrollo', color: '#0f766e', descripcion: 'APIs, SDKs, despliegue y observabilidad para hablar con tu proveedor.' },
  'datos-y-conocimiento': { nombre: 'Datos y conocimiento', color: '#a34d06', descripcion: 'Cómo se prepara y conecta la información para que la IA responda.' },
  prompting: { nombre: 'Prompting', color: '#b42318', descripcion: 'Técnicas para pedir mejor: instrucciones, ejemplos, estructura.' },
  'seguridad-y-etica': { nombre: 'Seguridad, ética y legal', color: '#1f2430', descripcion: 'Riesgos, normativa europea y buenas prácticas.' },
  negocio: { nombre: 'Negocio y aplicación', color: '#3f3aa8', descripcion: 'Cómo se mide, presupuesta e implanta la IA para generar retorno.' },
};

const ORDEN_BLOQUES = Object.keys(BLOQUES);

const terminos = [];
for (const modulo of modulos) {
  const { default: lote } = await import(`./contenido/${modulo}`);
  terminos.push(...lote);
}

fs.mkdirSync(SALIDA_DIR, { recursive: true });

const TINTA = '#1f2430';
const GRIS = '#5b6170';
const LINEA = '#d9d5cc';
const AZUL = '#3f3aa8';
const ANCHO = 595.28 - 56 - 56;

let paginaActual = 1;
const paginasBloque = {};
const paginasTermino = {};
const paginasSeparador = new Set();
let paginaTOC = null;
let paginaIndice = null;

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 56, bottom: 40, left: 56, right: 56 },
  bufferPages: true,
  info: {
    Title: 'Diccionario de IA para tu negocio',
    Author: 'Chess AI Agency',
    Subject: '100 términos de inteligencia artificial explicados en español',
    Keywords: 'IA, inteligencia artificial, glosario, pymes, español',
  },
});

doc.pipe(fs.createWriteStream(SALIDA));

function nuevaPagina() {
  if (paginaActual > 1) {
    const esSeparador = paginasSeparador.has(paginaActual);
    const color = esSeparador ? '#ffffff99' : '#9a9a9a';
    const _sx = doc.x, _sy = doc.y;
    doc.font('Helvetica').fontSize(8).fillColor(color).text(
      String(paginaActual),
      doc.page.width - 40,
      doc.page.height - 50,
    );
    doc.x = _sx;
    doc.y = _sy;
  }
  doc.addPage();
  paginaActual++;
}

// ---------- Portada ----------
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#2c2878');
for (let gx = 0; gx < doc.page.width; gx += 40) {
  doc.moveTo(gx, 0).lineTo(gx, doc.page.height).strokeColor('#ffffff0a').lineWidth(0.5).stroke();
}
for (let gy = 0; gy < doc.page.height; gy += 40) {
  doc.moveTo(0, gy).lineTo(doc.page.width, gy).strokeColor('#ffffff0a').lineWidth(0.5).stroke();
}
doc.rect(0, 0, 14, doc.page.height).fill('#f0b46a');

doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(11).text('CHESS AI AGENCY', 56, 90, { characterSpacing: 2 });
doc.rect(56, 112, 60, 3).fill('#f0b46a');

doc.font('Helvetica-Bold').fontSize(58).fillColor('#ffffff').text('Diccionario', 56, 180);
doc.font('Helvetica-Bold').fontSize(58).fillColor('#f0b46a').text('de IA', 56, 242);
doc.font('Helvetica').fontSize(28).fillColor('#ffffff').text('para tu negocio', 56, 320);

doc.font('Helvetica').fontSize(13).fillColor('#ffffff').text(
  '100 términos explicados en español, con ejemplos reales\ny sin jerga innecesaria. Para pymes, autónomos\ny profesionales que no programan.',
  56, 390, { lineGap: 6 },
);

doc.rect(56, 500, 220, 1).fill('#8f8ad8');
doc.font('Helvetica-Bold').fontSize(10).fillColor('#ffffff').text('EDICIÓN 2026', 56, 515, { characterSpacing: 1.5 });
doc.font('Helvetica').fontSize(10).fillColor('#b9b5e8').text('100 términos · 8 bloques · checklist final', 56, 540);

const logoPath = path.join(RAIZ, 'scripts', 'img-bw', 'logo-bw.png');
doc.image(logoPath, 56, 560, { width: 50 });
doc.font('Helvetica-Bold').fontSize(9).fillColor('#d4af37').text('Estrategia · Innovación · Ejecución', 116, 575, { characterSpacing: 0.5 });

doc.font('Helvetica').fontSize(9).fillColor('#8f8ad8').text('agency.ajedrezpremium.com', 56, doc.page.height - 60);

// ---------- Créditos ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Antes de empezar');
doc.moveDown(0.8);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text(
  'Este libro reúne los 100 términos del Diccionario IA, un glosario público escrito para que puedas entender qué te están vendiendo, qué necesitas de verdad y qué puedes ignorar sin remordimientos.',
  { lineGap: 4 },
);
doc.moveDown(0.6);
doc.text(
  'Cada ficha sigue la misma estructura: definición en una frase, explicación sencilla, una analogía, un ejemplo de negocio, aplicación práctica, errores frecuentes y preguntas frecuentes. No es un manual técnico ni un curso. Es un vocabulario común para tomar mejores decisiones.',
  { lineGap: 4 },
);
doc.moveDown(0.6);
doc.text(
  'La IA cambia rápido. Si encuentras un término desactualizado o falta uno, escríbenos desde la web. La siguiente edición se construye también con tus preguntas.',
  { lineGap: 4 },
);

doc.moveDown(1.2);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('Quién lo escribe');
doc.moveDown(0.4);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text(
  'Chess AI Agency es una agencia que diseña e integra agentes de IA permanentes en webs y procesos de pymes. El diccionario nace de lo que aprendemos en proyectos reales: atención al cliente, cualificación de leads, documentación interna y tareas repetitivas que alguien hacía a mano.',
  { lineGap: 4 },
);
doc.moveDown(0.4);
doc.text(
  'No escribimos desde la barrera. Cada término se contrasta con lo que vemos en clientes: qué funciona, qué se rompe y qué sale caro.',
  { lineGap: 4 },
);

doc.moveDown(1.2);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('Cómo leerlo');
doc.moveDown(0.4);
const recorridos = [
  ['Principiante', 'Fundamentos y Modelos. Empieza por «Inteligencia artificial», «Token» y «LLM».'],
  ['Aplicar IA', 'Agentes, Datos y Negocio. Busca la tarea que más tiempo te roba.'],
  ['Riesgo', 'Seguridad, ética y legal. Antes de automatizar, hay que cumplir.'],
  ['Consulta', 'Usa el índice alfabético del final para encontrar cualquier palabra.'],
];
for (const [titulo, desc] of recorridos) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(AZUL).text(titulo, { continued: true });
  doc.font('Times-Roman').fontSize(10.5).fillColor(GRIS).text(`  ${desc}`, { lineGap: 3 });
  doc.moveDown(0.3);
}

doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text('Niveles de dificultad');
doc.moveDown(0.3);
const niveles = [
  ['Básico', 'Conceptos que conviene entender antes de comprar nada.'],
  ['Intermedio', 'Términos que aparecen al implantar o evaluar una solución.'],
  ['Avanzado', 'Detalles técnicos para hablar con tu proveedor sin que te vendan humo.'],
];
for (const [nombre, desc] of niveles) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(TINTA).text(nombre, { continued: true });
  doc.font('Times-Roman').fontSize(10).fillColor(GRIS).text(`  ${desc}`, { lineGap: 3 });
  doc.moveDown(0.2);
}

// ---------- Índice de contenidos ----------
nuevaPagina();
paginaTOC = paginaActual;
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Contenido');
doc.moveDown(0.3);
doc.font('Times-Roman').fontSize(10).fillColor(GRIS).text('Haz clic en cualquier entrada para ir a esa página.', { lineGap: 3 });
doc.moveDown(0.8);

// ---------- Separador + fichas por bloque ----------
for (const bloqueSlug of ORDEN_BLOQUES) {
  const bloque = BLOQUES[bloqueSlug];
  const lista = terminos.filter((t) => t.cat === bloqueSlug);

  // Section separator page
  nuevaPagina();
  paginasBloque[bloqueSlug] = paginaActual;
  paginasSeparador.add(paginaActual);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill(bloque.color);
  doc.rect(0, 0, 14, doc.page.height).fill('#ffffff33');
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(12).text('BLOQUE', 56, 120, { characterSpacing: 2 });
  doc.font('Helvetica-Bold').fontSize(52).fillColor('#ffffff').text(bloque.nombre, 56, 170, { width: ANCHO });
  doc.font('Helvetica').fontSize(14).fillColor('#e8e4ff').text(bloque.descripcion, 56, doc.y + 16, { width: ANCHO, lineGap: 4 });
  doc.font('Helvetica').fontSize(10).fillColor('#b9b5e8').text(`${lista.length} términos en este bloque`, 56, doc.page.height - 100);
  doc.font('Helvetica').fontSize(8.5).fillColor('#dcd8ff').text(lista.map((t) => t.t).join(' · '), 56, doc.page.height - 75, { width: ANCHO, lineGap: 2 });

  // Fichas
  for (const t of lista) {
    nuevaPagina();
    paginasTermino[t.slug] = paginaActual;
    doc.addNamedDestination(t.slug, 'XYZ', 0, doc.page.margins.top, null);

    // Header
    doc.font('Helvetica-Bold').fontSize(10).fillColor(bloque.color).text(bloque.nombre.toUpperCase(), { characterSpacing: 1.2 });
    doc.moveDown(0.2);
    doc.font('Helvetica-Bold').fontSize(22).fillColor(TINTA).text(t.t, { lineGap: 2 });
    doc.moveDown(0.15);
    const nivelNombre = t.nivel === 'basico' ? 'Básico' : t.nivel === 'intermedio' ? 'Intermedio' : 'Avanzado';
    doc.font('Helvetica').fontSize(9).fillColor(GRIS).text(`Nivel: ${nivelNombre}  ·  Ficha ${terminos.indexOf(t) + 1} de ${terminos.length}`, { lineGap: 2 });
    doc.moveDown(0.4);

    // "En una frase" box
    doc.font('Times-Italic').fontSize(12);
    const defTextHeight = doc.heightOfString(t.def, { width: ANCHO - 24, lineGap: 2 });
    const defHeight = defTextHeight + 34;
    const defY = doc.y;
    doc.rect(doc.x, defY, ANCHO, defHeight).fill('#ece9ff');
    doc.rect(doc.x, defY, 4, defHeight).fill(bloque.color);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(bloque.color).text('EN UNA FRASE', doc.x + 12, defY + 6, { characterSpacing: 1, lineBreak: false });
    doc.y = defY + 18;
    doc.x += 12;
    doc.font('Times-Italic').fontSize(12).fillColor(TINTA).text(t.def, { width: ANCHO - 24, lineGap: 2 });
    doc.x -= 12;
    doc.y = defY + defHeight + 6;
    doc.moveDown(0.3);

    // body sections
    const escribirSeccion = (titulo, texto) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(bloque.color).text(titulo);
      doc.moveDown(0.15);
      doc.font('Times-Roman').fontSize(10.5).fillColor(TINTA).text(texto, { lineGap: 3.5, align: 'justify' });
      doc.moveDown(0.6);
    };

    escribirSeccion('En qué consiste', `${t.p1}\n\n${t.p2}`);
    // Analogía (destacada, flow-based)
    doc.font('Helvetica-Bold').fontSize(11).fillColor(bloque.color).text('Una analogía');
    doc.moveDown(0.1);
    doc.font('Times-Italic').fontSize(10.5);
    const analogTextHeight = doc.heightOfString(t.analogia, { width: ANCHO - 20, lineGap: 3 });
    const analogHeight = analogTextHeight + 22;
    const analogY = doc.y;
    doc.rect(doc.x, analogY, ANCHO, analogHeight).fill('#faf8f4');
    doc.rect(doc.x, analogY, 3, analogHeight).fill(bloque.color);
    doc.y = analogY + 8;
    doc.x += 10;
    doc.font('Times-Italic').fontSize(10.5).fillColor(TINTA).text(t.analogia, { width: ANCHO - 20, lineGap: 3 });
    doc.x -= 10;
    doc.y = analogY + analogHeight + 6;
    doc.moveDown(0.3);

    escribirSeccion('Ejemplo real de negocio', t.ejemplo);

    escribirSeccion('Cómo aplicarlo en tu pyme', t.negocio);

    escribirSeccion('Errores frecuentes', t.errores);
    // FAQ
    if (Array.isArray(t.faq) && t.faq.length) {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(bloque.color).text('Preguntas frecuentes');
      doc.moveDown(0.2);
      for (const [p, r] of t.faq) {
        doc.font('Helvetica-Bold').fontSize(9.5).fillColor(TINTA).text(p, { lineGap: 2 });
        doc.font('Times-Roman').fontSize(9.5).fillColor(GRIS).text(r, { lineGap: 3 });
        doc.moveDown(0.35);
      }
      doc.moveDown(0.2);
    }

    // Related terms
    if (Array.isArray(t.rel) && t.rel.length) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor(GRIS).text('Términos relacionados: ', { continued: true });
      const relTerms = t.rel.map((s) => terminos.find((x) => x.slug === s)?.t).filter(Boolean);
      doc.font('Times-Roman').fontSize(9).fillColor(AZUL).text(relTerms.join(', '), { lineGap: 2 });
      doc.moveDown(0.4);
    }

  }
}

// ---------- Checklist final ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Checklist antes de automatizar');
doc.moveDown(0.6);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text(
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
  doc.font('Helvetica-Bold').fontSize(11).fillColor(AZUL).text(`${String(i + 1).padStart(2, '0')}`, { continued: true });
  doc.font('Times-Roman').fontSize(11).fillColor(TINTA).text(`  ${p}`, { lineGap: 4 });
  doc.moveDown(0.3);
  doc.rect(doc.x, doc.y, ANCHO, 0.5).fill(LINEA);
  doc.moveDown(0.6);
}

doc.moveDown(1.2);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('¿Quieres que lo revisemos contigo?');
doc.moveDown(0.3);
doc.font('Times-Roman').fontSize(10.5).fillColor(GRIS).text('Chess AI Agency · agency.ajedrezpremium.com · diccionario-ia-livid.vercel.app', { lineGap: 3 });

// ---------- Índice alfabético ----------
nuevaPagina();
paginaIndice = paginaActual;
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Índice alfabético');
doc.moveDown(0.5);
doc.font('Times-Roman').fontSize(10).fillColor(GRIS).text('Haz clic en cualquier término para ir a su ficha.', { lineGap: 3 });
doc.moveDown(1);

const terminosOrdenados = [...terminos].sort((a, b) => a.t.localeCompare(b.t, 'es'));
const letras = [...new Set(terminosOrdenados.map((t) => t.t.charAt(0).toUpperCase()))].sort();

for (const letra of letras) {
  doc.font('Helvetica-Bold').fontSize(14).fillColor(AZUL).text(letra);
  doc.moveDown(0.2);
  const delaletra = terminosOrdenados.filter((t) => t.t.charAt(0).toUpperCase() === letra);
  for (const t of delaletra) {
    const pagina = paginasTermino[t.slug];
    doc.font('Times-Roman').fontSize(9.5).fillColor(TINTA).text(t.t, { continued: true });
    doc.font('Helvetica').fontSize(9).fillColor(GRIS).text(`  ${BLOQUES[t.cat].nombre}`, { continued: true });
    doc.font('Helvetica-Bold').fontSize(9).fillColor(AZUL).text(`  ${pagina}`, { goTo: t.slug, lineGap: 2 });
  }
  doc.moveDown(0.4);
}

// ---------- Para seguir leyendo ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Para seguir leyendo');
doc.moveDown(0.6);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text('Siglas y acrónimos que aparecen en el glosario:', { lineGap: 4 });
doc.moveDown(0.8);

const siglas = [
  ['AGI', 'Inteligencia artificial general.'],
  ['API', 'Interfaz de programación de aplicaciones.'],
  ['CLI', 'Interfaz de línea de comandos.'],
  ['CoT', 'Chain of thought (cadena de pensamiento).'],
  ['ETL', 'Extract, Transform, Load.'],
  ['GPU', 'Unidad de procesamiento gráfico.'],
  ['IA', 'Inteligencia artificial.'],
  ['JSON', 'JavaScript Object Notation.'],
  ['LLM', 'Large Language Model.'],
  ['MCP', 'Model Context Protocol.'],
  ['ML', 'Machine learning (aprendizaje automático).'],
  ['MoE', 'Mixture of Experts (mezcla de expertos).'],
  ['PoC', 'Proof of concept (prueba de concepto).'],
  ['RAG', 'Retrieval-Augmented Generation.'],
  ['RGPD', 'Reglamento General de Protección de Datos.'],
  ['ROI', 'Return on investment (retorno de la inversión).'],
  ['SDK', 'Software Development Kit.'],
  ['SQL', 'Structured Query Language.'],
];
for (const [sigla, desc] of siglas) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(AZUL).text(sigla, { continued: true });
  doc.font('Times-Roman').fontSize(10).fillColor(TINTA).text(`  ${desc}`, { lineGap: 3 });
  doc.moveDown(0.15);
}

// ---------- Sobre Chess AI Agency ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(24).text('Sobre Chess AI Agency');
doc.moveDown(0.6);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text(
  'Chess AI Agency es una agencia que diseña e integra agentes de IA permanentes en webs y procesos de pymes. El diccionario nace de lo que aprendemos en proyectos reales.',
  { lineGap: 4 },
);
doc.moveDown(0.6);
doc.text(
  'Servicios: diagnóstico de procesos, implantación de agentes de atención y cualificación, formación para equipos y mantenimiento continuo.',
  { lineGap: 4 },
);
doc.moveDown(0.6);
doc.text('Contacto: agency.ajedrezpremium.com', { lineGap: 4 });

// ---------- Contraportada ----------
nuevaPagina();
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#2c2878');
for (let gx = 0; gx < doc.page.width; gx += 40) {
  doc.moveTo(gx, 0).lineTo(gx, doc.page.height).strokeColor('#ffffff08').lineWidth(0.5).stroke();
}
for (let gy = 0; gy < doc.page.height; gy += 40) {
  doc.moveTo(0, gy).lineTo(doc.page.width, gy).strokeColor('#ffffff08').lineWidth(0.5).stroke();
}
doc.rect(0, 0, 14, doc.page.height).fill('#f0b46a');
const logoPath2 = path.join(RAIZ, 'scripts', 'img-bw', 'logo-bw.png');
doc.image(logoPath2, 56, 120, { width: 60 });
doc.font('Helvetica-Bold').fontSize(9).fillColor('#d4af37').text('Estrategia · Innovación · Ejecución', 126, 135, { characterSpacing: 0.5 });

doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(14).text('ENTIENDE LA IA ANTES DE COMPRARLA', 56, 200, { characterSpacing: 1.5 });
doc.font('Helvetica').fontSize(12).fillColor('#dcd8ff').text('100 términos · 8 bloques · checklist final', 56, 240);
doc.font('Times-Roman').fontSize(11).fillColor('#ffffff').text(
  'La IA no es magia ni amenaza: es una herramienta. Este diccionario te da el vocabulario para decidir con criterio.',
  56, 300, { width: ANCHO, lineGap: 4 },
);
doc.font('Helvetica-Bold').fontSize(11).fillColor('#f0b46a').text('¿Quieres que lo revisemos contigo?', 56, 380);
doc.font('Helvetica').fontSize(10).fillColor('#b9b5e8').text('Solicita un diagnóstico gratuito en agency.ajedrezpremium.com', 56, 405);
doc.font('Helvetica').fontSize(9).fillColor('#8f8ad8').text('agency.ajedrezpremium.com · diccionario-ia-livid.vercel.app', 56, doc.page.height - 60);

// (Sin relleno: se eliminan las páginas en blanco)

// (footer numbering moved to end of document)

// ---------- Bookmarks (outline) ----------
for (const slug of ORDEN_BLOQUES) {
  const bloque = BLOQUES[slug];
  const pageNum = paginasBloque[slug];
  if (!pageNum) continue;
  const blockOutline = doc.outline.addItem(bloque.nombre, { pageNumber: pageNum - 1 });
  const lista = terminos.filter((t) => t.cat === slug);
  for (const t of lista) {
    const tp = paginasTermino[t.slug];
    if (tp) blockOutline.addItem(t.t, { pageNumber: tp - 1 });
  }
}

// ---------- TOC: redraw with actual page numbers ----------
doc.switchToPage(paginaTOC - 1);
doc.y = 120;
for (const slug of ORDEN_BLOQUES) {
  const bloque = BLOQUES[slug];
  const pageNum = paginasBloque[slug];
  doc.font('Helvetica-Bold').fontSize(13).fillColor(bloque.color).text(bloque.nombre, 56, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(11).fillColor(GRIS).text(`  ···  ${pageNum}`, { goTo: slug, lineGap: 4 });
  doc.moveDown(0.5);
}
doc.moveDown(1);
doc.font('Times-Roman').fontSize(9).fillColor('#888').text(
  'Los números de página de cada término aparecen en el índice alfabético del final.',
  { lineGap: 2 },
);

doc.end();

await new Promise((resolve, reject) => {
  doc.on('end', resolve);
  doc.on('error', reject);
});

const stats = fs.statSync(SALIDA);
console.log(`✅ Libro generado: public/libro/diccionario-ia.pdf (${(stats.size / 1024).toFixed(0)} KB, ${paginaActual} páginas)`);
console.log(`   Bloques: ${Object.keys(paginasBloque).length}, Términos: ${Object.keys(paginasTermino).length}`);
console.log(`   Bookmarks: ${8 + 100}, Índice clickeable: ${Object.keys(paginasTermino).length}`);
