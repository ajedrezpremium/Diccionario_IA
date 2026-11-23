import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const RAIZ = process.cwd();
const SALIDA_DIR = path.join(RAIZ, 'public', 'libro');
const SALIDA = path.join(SALIDA_DIR, 'diccionario-ia-kdp.pdf');

// KDP 6" x 9" (15.24 x 22.86 cm)
const PAGE_W = 7 * 72; // 504
const PAGE_H = 10 * 72; // 720
const MARGIN = 50; // 0.69"
const ANCHO = PAGE_W - MARGIN * 2; // 404

const modulos = [
  '01-fundamentos.mjs', '02-modelos.mjs', '03-agentes.mjs', '04-herramientas.mjs',
  '05-datos.mjs', '06-prompting.mjs', '07-seguridad.mjs', '08-negocio.mjs',
];

const BLOQUES = {
  fundamentos: { nombre: 'Fundamentos', descripcion: 'Las piezas básicas de la IA: qué es, cómo aprende y qué significa cada concepto.' },
  modelos: { nombre: 'Modelos y lenguaje', descripcion: 'Cómo funcionan los modelos que escriben, razonan y generan imágenes.' },
  agentes: { nombre: 'Agentes y automatización', descripcion: 'La IA que no solo responde: usa herramientas, recuerda y ejecuta.' },
  'herramientas-desarrollo': { nombre: 'Herramientas y desarrollo', descripcion: 'APIs, SDKs, despliegue y observabilidad para hablar con tu proveedor.' },
  'datos-y-conocimiento': { nombre: 'Datos y conocimiento', descripcion: 'Cómo se prepara y conecta la información para que la IA responda.' },
  prompting: { nombre: 'Prompting', descripcion: 'Técnicas para pedir mejor: instrucciones, ejemplos, estructura.' },
  'seguridad-y-etica': { nombre: 'Seguridad, ética y legal', descripcion: 'Riesgos, normativa europea y buenas prácticas.' },
  negocio: { nombre: 'Negocio y aplicación', descripcion: 'Cómo se mide, presupuesta e implanta la IA para generar retorno.' },
};
const ORDEN_BLOQUES = Object.keys(BLOQUES);

const terminos = [];
for (const modulo of modulos) {
  const { default: lote } = await import(`./contenido/${modulo}`);
  terminos.push(...lote);
}

fs.mkdirSync(SALIDA_DIR, { recursive: true });

// Register embedded fonts
const FONT_DIR = path.join(RAIZ, 'scripts', 'fonts');
const FONTS = {
  body: path.join(FONT_DIR, 'georgia.ttf'),
  bodyBold: path.join(FONT_DIR, 'georgiab.ttf'),
  bodyItalic: path.join(FONT_DIR, 'georgiai.ttf'),
  bodyBoldItalic: path.join(FONT_DIR, 'georgiaz.ttf'),
  heading: path.join(FONT_DIR, 'segoeui.ttf'),
  headingBold: path.join(FONT_DIR, 'segoeuib.ttf'),
  headingItalic: path.join(FONT_DIR, 'segoeuii.ttf'),
  mono: path.join(FONT_DIR, 'consola.ttf'),
};

const doc = new PDFDocument({
  size: [PAGE_W, PAGE_H],
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  bufferPages: true,
  autoFirstPage: false,
  info: {
    Title: 'Diccionario de IA para tu negocio',
    Author: 'Roberto Páramos Domínguez',
    Subject: '100 términos de inteligencia artificial explicados en español',
    Keywords: 'IA, inteligencia artificial, glosario, pymes, español, Amazon KDP',
    Creator: 'Chess AI Agency',
    Producer: 'JRedition',
  },
});

doc.registerFont('Body', FONTS.body);
doc.registerFont('Body-Bold', FONTS.bodyBold);
doc.registerFont('Body-Italic', FONTS.bodyItalic);
doc.registerFont('Body-BoldItalic', FONTS.bodyBoldItalic);
doc.registerFont('Heading', FONTS.heading);
doc.registerFont('Heading-Bold', FONTS.headingBold);
doc.registerFont('Heading-Italic', FONTS.headingItalic);
doc.registerFont('Mono', FONTS.mono);

doc.pipe(fs.createWriteStream(SALIDA));

let paginaActual = 0;
const paginasBloque = {};
const paginasTermino = {};

function nuevaPagina() {
  if (paginaActual > 0) {
    // footer number on current page (skip first page = cover)
    const _sx = doc.x, _sy = doc.y;
    doc.x = doc.page.width - MARGIN - 20;
    doc.y = doc.page.height - 64;
    doc.font('Body').fontSize(8).fillColor('#888888').text(
      String(paginaActual),
      { lineBreak: false },
    );
    doc.x = _sx;
    doc.y = _sy;
  }
  doc.addPage();
  paginaActual++;
}

// ---------- Portada ----------
doc.addPage();
paginaActual = 1;
doc.rect(0, 0, PAGE_W, PAGE_H).fill('#1a1a2e');
doc.rect(0, 0, 12, PAGE_H).fill('#d4af37');

doc.fillColor('#ffffff').font('Heading-Bold').fontSize(10).text('JREDITION', MARGIN, 80, { characterSpacing: 3 });
doc.rect(MARGIN, 98, 40, 2).fill('#d4af37');

doc.font('Heading-Bold').fontSize(42).fillColor('#ffffff').text('Diccionario', MARGIN, 200);
doc.font('Heading-Bold').fontSize(42).fillColor('#d4af37').text('de IA', MARGIN, 248);

doc.font('Heading').fontSize(20).fillColor('#e8e4ff').text('para tu negocio', MARGIN, 310);

doc.font('Body').fontSize(12).fillColor('#ffffff').text(
  '100 términos explicados en español, con ejemplos reales\ny sin jerga innecesaria. Para pymes, autónomos\ny profesionales que no programan.',
  MARGIN, 370, { lineGap: 5 },
);

doc.rect(MARGIN, 470, 180, 1).fill('#8f8ad8');
doc.font('Heading-Bold').fontSize(10).fillColor('#ffffff').text('EDICIÓN 2026', MARGIN, 485, { characterSpacing: 1.5 });
doc.font('Heading').fontSize(10).fillColor('#b9b5e8').text('100 términos · 8 bloques · checklist final', MARGIN, 505);

doc.font('Body').fontSize(10).fillColor('#8f8ad8').text('Roberto Páramos Domínguez', MARGIN, PAGE_H - 80);
doc.font('Body').fontSize(8).fillColor('#8f8ad8').text('agency.ajedrezpremium.com', MARGIN, PAGE_H - 60);

// ---------- Página de créditos ----------
nuevaPagina();
doc.fillColor('#000000').font('Heading-Bold').fontSize(22).text('Antes de empezar');
doc.moveDown(0.6);
doc.font('Body').fontSize(11).fillColor('#333333').text(
  'Este libro reúne los 100 términos del Diccionario IA, un glosario público escrito para que puedas entender qué te están vendiendo, qué necesitas de verdad y qué puedes ignorar sin remordimientos.',
  { lineGap: 4 },
);
doc.moveDown(0.5);
doc.text(
  'Cada ficha sigue la misma estructura: definición en una frase, explicación sencilla, una analogía, un ejemplo de negocio, aplicación práctica, errores frecuentes y preguntas frecuentes.',
  { lineGap: 4 },
);

doc.moveDown(1);
doc.font('Heading-Bold').fontSize(13).fillColor('#000000').text('Quién lo escribe');
doc.moveDown(0.3);
doc.font('Body').fontSize(11).fillColor('#333333').text(
  'Roberto Páramos Domínguez es el autor de este libro y fundador de Chess AI Agency, una agencia que diseña e integra agentes de IA permanentes en webs y procesos de pymes. El diccionario nace de lo que aprendemos en proyectos reales.',
  { lineGap: 4 },
);

doc.moveDown(1);
doc.font('Heading-Bold').fontSize(13).fillColor('#000000').text('Cómo leerlo');
doc.moveDown(0.3);
const recorridos = [
  ['Principiante', 'Fundamentos y Modelos. Empieza por «Inteligencia artificial», «Token» y «LLM».'],
  ['Aplicar IA', 'Agentes, Datos y Negocio. Busca la tarea que más tiempo te roba.'],
  ['Riesgo', 'Seguridad, ética y legal. Antes de automatizar, hay que cumplir.'],
  ['Consulta', 'Usa el índice alfabético del final para encontrar cualquier palabra.'],
];
for (const [titulo, desc] of recorridos) {
  doc.font('Heading-Bold').fontSize(10.5).fillColor('#333333').text(titulo, { continued: true });
  doc.font('Body').fontSize(10.5).fillColor('#555555').text(`  ${desc}`, { lineGap: 3 });
  doc.moveDown(0.3);
}

doc.moveDown(0.8);
doc.font('Heading-Bold').fontSize(11).fillColor('#000000').text('Niveles de dificultad');
doc.moveDown(0.3);
const niveles = [
  ['Básico', 'Conceptos que conviene entender antes de comprar nada.'],
  ['Intermedio', 'Términos que aparecen al implantar o evaluar una solución.'],
  ['Avanzado', 'Detalles técnicos para hablar con tu proveedor sin que te vendan humo.'],
];
for (const [nombre, desc] of niveles) {
  doc.font('Heading-Bold').fontSize(10).fillColor('#000000').text(nombre, { continued: true });
  doc.font('Body').fontSize(10).fillColor('#555555').text(`  ${desc}`, { lineGap: 3 });
  doc.moveDown(0.2);
}

// Copyright page
nuevaPagina();
doc.font('Body').fontSize(9).fillColor('#555555').text('Diccionario de IA para tu negocio', { align: 'center' });
doc.moveDown(0.3);
doc.text('© 2026 Roberto Páramos Domínguez', { align: 'center' });
doc.moveDown(0.2);
doc.text('Publicado por JRedition', { align: 'center' });
doc.moveDown(0.2);
doc.text('Todos los derechos reservados.', { align: 'center' });
doc.moveDown(1);
doc.text('Ninguna parte de esta publicación puede ser reproducida, almacenada o transmitida en ninguna forma ni por ningún medio sin el permiso previo por escrito del autor, excepto breves citas para reseñas o estudios.', { align: 'center', lineGap: 3 });
doc.moveDown(1);
doc.text('Las marcas y nombres de terceros mencionados pertenecen a sus titulares.', { align: 'center', lineGap: 3 });
doc.moveDown(1);
doc.text('ISBN: [pendiente de asignación KDP]', { align: 'center' });

// ---------- Índice de contenidos ----------
nuevaPagina();
const paginaTOC = paginaActual;
doc.fillColor('#000000').font('Heading-Bold').fontSize(22).text('Contenido');
doc.moveDown(0.3);
doc.font('Body').fontSize(10).fillColor('#555555').text('Haz clic en cualquier entrada para ir a esa página.', { lineGap: 3 });
doc.moveDown(0.8);

// ---------- Separador + fichas por bloque ----------
for (const bloqueSlug of ORDEN_BLOQUES) {
  const bloque = BLOQUES[bloqueSlug];
  const lista = terminos.filter((t) => t.cat === bloqueSlug);

  nuevaPagina();
  paginasBloque[bloqueSlug] = paginaActual;

  // Section separator (B&W)
  doc.rect(0, 0, PAGE_W, PAGE_H).fill('#f5f5f5');
  doc.rect(0, 0, 8, PAGE_H).fill('#333333');
  doc.fillColor('#000000').font('Heading-Bold').fontSize(11).text('BLOQUE', MARGIN, 100, { characterSpacing: 2 });
  doc.font('Heading-Bold').fontSize(36).fillColor('#000000').text(bloque.nombre, MARGIN, 140, { width: ANCHO });
  doc.font('Body').fontSize(12).fillColor('#333333').text(bloque.descripcion, MARGIN, doc.y + 12, { width: ANCHO, lineGap: 4 });
  doc.font('Body').fontSize(10).fillColor('#555555').text(`${lista.length} términos en este bloque`, MARGIN, PAGE_H - 90);
  doc.font('Body').fontSize(8.5).fillColor('#777777').text(lista.map((t) => t.t).join(' · '), MARGIN, PAGE_H - 70, { width: ANCHO, lineGap: 2 });

  // Fichas
  for (const t of lista) {
    nuevaPagina();
    paginasTermino[t.slug] = paginaActual;
    doc.addNamedDestination(t.slug, 'XYZ', 0, MARGIN, null);

    // Header
    doc.font('Heading-Bold').fontSize(9).fillColor('#555555').text(bloque.nombre.toUpperCase(), { characterSpacing: 1.2 });
    doc.moveDown(0.15);
    doc.font('Heading-Bold').fontSize(18).fillColor('#000000').text(t.t, { lineGap: 2 });
    doc.moveDown(0.1);
    const nivelNombre = t.nivel === 'basico' ? 'Básico' : t.nivel === 'intermedio' ? 'Intermedio' : 'Avanzado';
    doc.font('Body').fontSize(8.5).fillColor('#555555').text(`Nivel: ${nivelNombre}  ·  Ficha ${terminos.indexOf(t) + 1} de ${terminos.length}`, { lineGap: 2 });
    doc.moveDown(0.3);

    // "En una frase" box
    doc.font('Body-Italic').fontSize(11);
    const defTextHeight = doc.heightOfString(t.def, { width: ANCHO - 20, lineGap: 2 });
    const defHeight = defTextHeight + 30;
    const defY = doc.y;
    doc.rect(MARGIN, defY, ANCHO, defHeight).fill('#f0f0f0');
    doc.rect(MARGIN, defY, 3, defHeight).fill('#333333');
    doc.font('Heading-Bold').fontSize(8).fillColor('#333333').text('EN UNA FRASE', MARGIN + 10, defY + 5, { characterSpacing: 1, lineBreak: false });
    doc.y = defY + 16;
    doc.x = MARGIN + 10;
    doc.font('Body-Italic').fontSize(11).fillColor('#000000').text(t.def, { width: ANCHO - 20, lineGap: 2 });
    doc.x = MARGIN;
    doc.y = defY + defHeight + 6;
    doc.moveDown(0.2);

    // body sections
    const escribirSeccion = (titulo, texto) => {
      doc.font('Heading-Bold').fontSize(11).fillColor('#000000').text(titulo);
      doc.moveDown(0.1);
      doc.font('Body').fontSize(10.5).fillColor('#000000').text(texto, { lineGap: 3.5, align: 'justify' });
      doc.moveDown(0.4);
    };

    escribirSeccion('En qué consiste', `${t.p1}\n\n${t.p2}`);

    // Analogía (destacada)
    doc.font('Heading-Bold').fontSize(11).fillColor('#000000').text('Una analogía');
    doc.moveDown(0.1);
    doc.font('Body-Italic').fontSize(10.5);
    const analogTextHeight = doc.heightOfString(t.analogia, { width: ANCHO - 20, lineGap: 3 });
    const analogHeight = analogTextHeight + 20;
    const analogY = doc.y;
    doc.rect(MARGIN, analogY, ANCHO, analogHeight).fill('#f5f5f5');
    doc.rect(MARGIN, analogY, 3, analogHeight).fill('#333333');
    doc.y = analogY + 7;
    doc.x = MARGIN + 10;
    doc.font('Body-Italic').fontSize(10.5).fillColor('#000000').text(t.analogia, { width: ANCHO - 20, lineGap: 3 });
    doc.x = MARGIN;
    doc.y = analogY + analogHeight + 6;
    doc.moveDown(0.2);

    escribirSeccion('Ejemplo real de negocio', t.ejemplo);
    escribirSeccion('Cómo aplicarlo en tu pyme', t.negocio);
    escribirSeccion('Errores frecuentes', t.errores);

    // FAQ
    if (Array.isArray(t.faq) && t.faq.length) {
      doc.font('Heading-Bold').fontSize(11).fillColor('#000000').text('Preguntas frecuentes');
      doc.moveDown(0.15);
      for (const [p, r] of t.faq) {
        doc.font('Heading-Bold').fontSize(9.5).fillColor('#000000').text(p, { lineGap: 2 });
        doc.font('Body').fontSize(9.5).fillColor('#333333').text(r, { lineGap: 3 });
        doc.moveDown(0.3);
      }
      doc.moveDown(0.1);
    }

    // Related terms
    if (Array.isArray(t.rel) && t.rel.length) {
      doc.font('Heading-Bold').fontSize(9).fillColor('#555555').text('Términos relacionados: ', { continued: true });
      const relTerms = t.rel.map((s) => terminos.find((x) => x.slug === s)?.t).filter(Boolean);
      doc.font('Body').fontSize(9).fillColor('#333333').text(relTerms.join(', '), { lineGap: 2 });
      doc.moveDown(0.3);
    }
  }
}

// ---------- Checklist final ----------
nuevaPagina();
doc.fillColor('#000000').font('Heading-Bold').fontSize(22).text('Checklist antes de automatizar');
doc.moveDown(0.5);
doc.font('Body').fontSize(11).fillColor('#333333').text(
  'Una página para llevar a la próxima reunión. Si no puedes responder estas preguntas, todavía no es un proyecto: es una idea.',
  { lineGap: 4 },
);
doc.moveDown(0.8);

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
  doc.font('Heading-Bold').fontSize(11).fillColor('#333333').text(`${String(i + 1).padStart(2, '0')}`, { continued: true });
  doc.font('Body').fontSize(11).fillColor('#000000').text(`  ${p}`, { lineGap: 4 });
  doc.moveDown(0.3);
  doc.rect(MARGIN, doc.y, ANCHO, 0.5).fill('#cccccc');
  doc.moveDown(0.5);
}

doc.moveDown(1);
doc.font('Heading-Bold').fontSize(13).fillColor('#000000').text('¿Quieres que lo revisemos contigo?');
doc.moveDown(0.3);
doc.font('Body').fontSize(10).fillColor('#555555').text('Chess AI Agency · agency.ajedrezpremium.com', { lineGap: 3 });

// ---------- Índice alfabético ----------
nuevaPagina();
doc.fillColor('#000000').font('Heading-Bold').fontSize(20).text('Índice alfabético');
doc.moveDown(0.4);
doc.font('Body').fontSize(9).fillColor('#555555').text('Haz clic en cualquier término para ir a su ficha.', { lineGap: 3 });
doc.moveDown(0.8);

const terminosOrdenados = [...terminos].sort((a, b) => a.t.localeCompare(b.t, 'es'));
const letras = [...new Set(terminosOrdenados.map((t) => t.t.charAt(0).toUpperCase()))].sort();

for (const letra of letras) {
  doc.font('Heading-Bold').fontSize(13).fillColor('#333333').text(letra);
  doc.moveDown(0.15);
  const delaletra = terminosOrdenados.filter((t) => t.t.charAt(0).toUpperCase() === letra);
  for (const t of delaletra) {
    const pagina = paginasTermino[t.slug];
    doc.font('Body').fontSize(9.5).fillColor('#000000').text(t.t, { continued: true });
    doc.font('Body').fontSize(8.5).fillColor('#777777').text(`  ${BLOQUES[t.cat].nombre}`, { continued: true });
    doc.font('Heading-Bold').fontSize(9).fillColor('#333333').text(`  ${pagina}`, { goTo: t.slug, lineGap: 2 });
  }
  doc.moveDown(0.3);
}

// ---------- Sobre el autor ----------
nuevaPagina();
doc.fillColor('#000000').font('Heading-Bold').fontSize(20).text('Sobre el autor');
doc.moveDown(0.5);
doc.font('Body').fontSize(11).fillColor('#333333').text(
  'Roberto Páramos Domínguez es autor de 16 libros y fundador de Chess AI Agency, una agencia que diseña e integra agentes de IA permanentes en webs y procesos de pymes. El diccionario nace de lo que aprendemos en proyectos reales.',
  { lineGap: 4 },
);
doc.moveDown(0.5);
doc.text('Servicios: diagnóstico de procesos, implantación de agentes de atención y cualificación, formación para equipos y mantenimiento continuo.', { lineGap: 4 });
doc.moveDown(0.5);
doc.text('Contacto: agency.ajedrezpremium.com', { lineGap: 4 });

// ---------- Contraportada ----------
nuevaPagina();
doc.rect(0, 0, PAGE_W, PAGE_H).fill('#1a1a2e');
doc.rect(0, 0, 8, PAGE_H).fill('#d4af37');
doc.fillColor('#ffffff').font('Heading-Bold').fontSize(12).text('ENTIENDE LA IA ANTES DE COMPRARLA', MARGIN, 200, { characterSpacing: 1.5 });
doc.font('Heading').fontSize(11).fillColor('#dcd8ff').text('100 términos · 8 bloques · checklist final', MARGIN, 230);
doc.font('Body').fontSize(10).fillColor('#ffffff').text(
  'La IA no es magia ni amenaza: es una herramienta. Este diccionario te da el vocabulario para decidir con criterio.',
  MARGIN, 290, { width: ANCHO, lineGap: 4 },
);
doc.font('Heading-Bold').fontSize(11).fillColor('#d4af37').text('¿Quieres que lo revisemos contigo?', MARGIN, 360);
doc.font('Body').fontSize(9).fillColor('#b9b5e8').text('Solicita un diagnóstico gratuito en agency.ajedrezpremium.com', MARGIN, 385);
doc.font('Body').fontSize(8).fillColor('#8f8ad8').text('JRedition · agency.ajedrezpremium.com', MARGIN, PAGE_H - 60);

// ---------- Relleno para impresión (múltiplo de 4) ----------
const paginasAntesRelleno = doc.bufferedPageRange().count;
const faltantes = (4 - (paginasAntesRelleno % 4)) % 4;
for (let i = 0; i < faltantes; i++) {
  doc.addPage();
}

doc.end();

await new Promise((resolve, reject) => {
  doc.on('end', resolve);
  doc.on('error', reject);
});

const stats = fs.statSync(SALIDA);
console.log(`✅ Libro KDP generado: public/libro/diccionario-ia-kdp.pdf (${(stats.size / 1024).toFixed(0)} KB)`);
console.log(`   Autor: Roberto Páramos Domínguez | Editorial: JRedition`);
console.log(`   Formato: 6" x 9" | Márgenes: 0.75" | Fuente: Georgia (incrustada)`);