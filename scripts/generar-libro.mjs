import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const RAIZ = process.cwd();
const SALIDA_DIR = path.join(RAIZ, 'public', 'libro');
const SALIDA = path.join(SALIDA_DIR, 'diccionario-ia.pdf');

const modulos = [
  '01-fundamentos.mjs','02-modelos.mjs','03-agentes.mjs','04-herramientas.mjs',
  '05-datos.mjs','06-prompting.mjs','07-seguridad.mjs','08-negocio.mjs', '09-extra.mjs', '10-nuevos.mjs', '11-final.mjs'
];
const BLOQUES = {
  fundamentos: { nombre: 'Fundamentos', descripcion: 'Las piezas básicas de la IA: qué es, cómo aprende y qué significa cada concepto.' },
  modelos: { nombre: 'Modelos y lenguaje', descripcion: 'Cómo funcionan los modelos que escriben, razonan y generan imágenes.' },
  agentes: { nombre: 'Agentes y automatización', descripcion: 'La IA que no solo responde: usa herramientas, recuerda y ejecuta.' },
  'herramientas-desarrollo': { nombre: 'Herramientas y desarrollo', descripcion: 'APIs, SDKs, despliegue y observabilidad.' },
  'datos-y-conocimiento': { nombre: 'Datos y conocimiento', descripcion: 'Cómo se prepara y conecta la información para que la IA responda.' },
  prompting: { nombre: 'Prompting', descripcion: 'Técnicas para pedir mejor: instrucciones, ejemplos, estructura.' },
  'seguridad-y-etica': { nombre: 'Seguridad, ética y legal', descripcion: 'Riesgos, normativa europea y buenas prácticas.' },
  negocio: { nombre: 'Negocio y aplicación', descripcion: 'Cómo se mide, presupuesta e implanta la IA para generar retorno.' },
};
const ORDEN = Object.keys(BLOQUES);
const terminos = [];
for (const m of modulos) { const { default: l } = await import(`./contenido/${m}`); terminos.push(...l); }

fs.mkdirSync(SALIDA_DIR, { recursive: true });

const AZUL = '#3f3aa8';
const TINTA = '#1f2430';
const GRIS = '#5b6170';
const LINEA = '#d9d5cc';
const MARGEN_IZQ = 28;
const MARGEN_DER = 40;
const ANCHO = 595.28 - MARGEN_IZQ - MARGEN_DER;

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 56, bottom: 40, left: MARGEN_IZQ, right: MARGEN_DER },
  bufferPages: true,
  info: { Title: 'Diccionario de IA para tu negocio', Author: 'Chess AI Agency', Subject: '120 términos de inteligencia artificial explicados en español' },
});
doc.pipe(fs.createWriteStream(SALIDA));

let paginaActual = 1;
const paginasBloque = {};
const paginasTermino = {};
const paginasSeparador = new Set();

function nuevaPagina() {
  if (paginaActual > 1) {
    const esSeparador = paginasSeparador.has(paginaActual);
    const color = esSeparador ? '#ffffff99' : '#9a9a9a';
    const _sx = doc.x, _sy = doc.y;
    doc.font('Helvetica').fontSize(8).fillColor(color).text(String(paginaActual), doc.page.width - 40, doc.page.height - 50);
    doc.x = _sx; doc.y = _sy;
  }
  doc.addPage();
  paginaActual++;
}

// Caja destacada: dibuja fondo y escribe texto con MISMA fuente/tamaño usados para medir.
function cajaDestacada({ etiqueta, texto, fondo, colorBarra, fontSize, anchoTexto, padding, altoExtra, colorTexto }) {
  // medir con la fuente correcta ya activa
  doc.font('Times-Italic').fontSize(fontSize);
  const textH = doc.heightOfString(texto, { width: anchoTexto, lineGap: 2 });
  const alto = textH + altoExtra;
  const y = doc.y;
  const x = doc.x;
  doc.rect(x, y, ANCHO, alto).fill(fondo);
  doc.rect(x, y, 3, alto).fill(colorBarra);
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colorBarra).text(etiqueta, x + padding, y + 5, { characterSpacing: 1, lineBreak: false });
  doc.y = y + 5 + 12;
  const _x = doc.x;
  doc.x = x + padding;
  doc.font('Times-Italic').fontSize(fontSize).fillColor(colorTexto).text(texto, { width: anchoTexto, lineGap: 2 });
  doc.x = _x;
  doc.y = y + alto + 6;
  return alto;
}

// ---------- Portada ----------
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#2c2878');
for (let gx = 0; gx < doc.page.width; gx += 40) doc.moveTo(gx, 0).lineTo(gx, doc.page.height).strokeColor('#ffffff0a').lineWidth(0.5).stroke();
for (let gy = 0; gy < doc.page.height; gy += 40) doc.moveTo(0, gy).lineTo(doc.page.width, gy).strokeColor('#ffffff0a').lineWidth(0.5).stroke();
doc.rect(0, 0, 14, doc.page.height).fill('#f0b46a');
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(11).text('CHESS AI AGENCY', MARGEN_IZQ, 90, { characterSpacing: 2 });
doc.rect(MARGEN_IZQ, 112, 60, 3).fill('#f0b46a');
doc.font('Helvetica-Bold').fontSize(58).fillColor('#ffffff').text('Diccionario', MARGEN_IZQ, 180);
doc.font('Helvetica-Bold').fontSize(58).fillColor('#f0b46a').text('de IA', MARGEN_IZQ, 242);
doc.font('Helvetica').fontSize(28).fillColor('#ffffff').text('para tu negocio', MARGEN_IZQ, 320);
doc.font('Helvetica').fontSize(13).fillColor('#ffffff').text('120 términos explicados en español, con ejemplos reales\ny sin jerga innecesaria. Para pymes, autónomos\ny profesionales que no programan.', MARGEN_IZQ, 390, { lineGap: 6 });
doc.rect(MARGEN_IZQ, 500, 220, 1).fill('#8f8ad8');
doc.font('Helvetica-Bold').fontSize(10).fillColor('#ffffff').text('EDICIÓN 2026', MARGEN_IZQ, 515, { characterSpacing: 1.5 });
doc.font('Helvetica').fontSize(10).fillColor('#b9b5e8').text('120 términos · 8 bloques · checklist final', MARGEN_IZQ, 540);
const logoPortada = path.join(RAIZ, 'scripts', 'img-bw', 'logo-bw.png');
doc.image(logoPortada, MARGEN_IZQ, 560, { width: 50 });
doc.font('Helvetica-Bold').fontSize(9).fillColor('#d4af37').text('Estrategia · Innovación · Ejecución', MARGEN_IZQ + 60, 575, { characterSpacing: 0.5 });
doc.font('Helvetica').fontSize(9).fillColor('#8f8ad8').text('agency.ajedrezpremium.com', MARGEN_IZQ, doc.page.height - 60);

// ---------- Créditos ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Antes de empezar');
doc.moveDown(0.6);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text('Este libro reúne los 120 términos del Diccionario IA, un glosario público escrito para que puedas entender qué te están vendiendo, qué necesitas de verdad y qué puedes ignorar sin remordimientos.', { lineGap: 4 });
doc.moveDown(0.5);
doc.text('Cada ficha sigue la misma estructura: definición en una frase, explicación sencilla, una analogía, un ejemplo de negocio, aplicación práctica, errores frecuentes y preguntas frecuentes.', { lineGap: 4 });
doc.moveDown(0.5);
doc.text('La IA cambia rápido. Si encuentras un término desactualizado o falta uno, escríbenos desde la web.', { lineGap: 4 });
doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('Quién lo escribe');
doc.moveDown(0.3);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text('Chess AI Agency es una agencia que diseña e integra agentes de IA permanentes en webs y procesos de pymes. El diccionario nace de lo que aprendemos en proyectos reales.', { lineGap: 4 });
doc.moveDown(0.4);
doc.text('No escribimos desde la barrera. Cada término se contrasta con lo que vemos en clientes: qué funciona, qué se rompe y qué sale caro.', { lineGap: 4 });
doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('Cómo leerlo');
doc.moveDown(0.3);
for (const [a, b] of [
  ['Principiante', 'Fundamentos y Modelos. Empieza por «Inteligencia artificial», «Token» y «LLM».'],
  ['Aplicar IA', 'Agentes, Datos y Negocio. Busca la tarea que más tiempo te roba.'],
  ['Riesgo', 'Seguridad, ética y legal. Antes de automatizar, hay que cumplir.'],
  ['Consulta', 'Usa el índice alfabético del final para encontrar cualquier palabra.'],
]) {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(AZUL).text(a, { continued: true });
  doc.font('Times-Roman').fontSize(10.5).fillColor(GRIS).text(`  ${b}`, { lineGap: 3 });
  doc.moveDown(0.3);
}
doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text('Niveles de dificultad');
doc.moveDown(0.3);
for (const [a, b] of [
  ['Básico', 'Conceptos que conviene entender antes de comprar nada.'],
  ['Intermedio', 'Términos que aparecen al implantar o evaluar una solución.'],
  ['Avanzado', 'Detalles técnicos para hablar con tu proveedor sin que te vendan humo.'],
]) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(TINTA).text(a, { continued: true });
  doc.font('Times-Roman').fontSize(10).fillColor(GRIS).text(`  ${b}`, { lineGap: 3 });
  doc.moveDown(0.2);
}

// ---------- Copyright ----------
nuevaPagina();
doc.font('Times-Roman').fontSize(9).fillColor(GRIS);
doc.text('Diccionario de IA para tu negocio', { align: 'center' });
doc.moveDown(0.3);
doc.text('© 2026 Roberto Páramos Domínguez', { align: 'center' });
doc.moveDown(0.2);
doc.text('Publicado por JRedition', { align: 'center' });
doc.moveDown(0.2);
doc.text('Todos los derechos reservados.', { align: 'center' });
doc.moveDown(1);
doc.text('Ninguna parte de esta publicación puede ser reproducida, almacenada o transmitida sin permiso previo por escrito del autor, excepto breves citas para reseñas o estudios.', { align: 'center', lineGap: 3 });
doc.moveDown(1);
doc.text('Las marcas y nombres de terceros mencionados pertenecen a sus titulares.', { align: 'center', lineGap: 3 });
doc.moveDown(1);
doc.text('ISBN: [pendiente de asignación KDP]', { align: 'center' });

// ---------- Índice de contenidos ----------
nuevaPagina();
const paginaTOC = paginaActual;
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Contenido');
doc.moveDown(0.3);
doc.font('Times-Roman').fontSize(10).fillColor(GRIS).text('Haz clic en cualquier entrada para ir a esa página.', { lineGap: 3 });
doc.moveDown(0.8);

// ---------- Bloques y fichas ----------
for (const slug of ORDEN) {
  const bloque = BLOQUES[slug];
  const lista = terminos.filter((t) => t.cat === slug);
  nuevaPagina();
  paginasBloque[slug] = paginaActual;
  paginasSeparador.add(paginaActual);
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f5f5f5');
  doc.rect(0, 0, 8, doc.page.height).fill('#333333');
  doc.fillColor('#000000').font('Helvetica-Bold').fontSize(11).text('BLOQUE', MARGEN_IZQ, 100, { characterSpacing: 2 });
  doc.font('Helvetica-Bold').fontSize(38).fillColor('#000000').text(bloque.nombre, MARGEN_IZQ, 140, { width: ANCHO });
  doc.font('Helvetica').fontSize(12).fillColor('#333333').text(bloque.descripcion, MARGEN_IZQ, doc.y + 12, { width: ANCHO, lineGap: 4 });
  doc.font('Helvetica').fontSize(10).fillColor('#555555').text(`${lista.length} términos en este bloque`, MARGEN_IZQ, doc.page.height - 90);
  doc.font('Helvetica').fontSize(8).fillColor('#777777').text(lista.map((t) => t.t).join(' · '), MARGEN_IZQ, doc.page.height - 70, { width: ANCHO, lineGap: 2 });

  for (const t of lista) {
    nuevaPagina();
    paginasTermino[t.slug] = paginaActual;
    doc.addNamedDestination(t.slug, 'XYZ', 0, MARGEN_IZQ, null);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GRIS).text(bloque.nombre.toUpperCase(), { characterSpacing: 1.2 });
    doc.moveDown(0.2);
    doc.font('Helvetica-Bold').fontSize(22).fillColor(TINTA).text(t.t, { lineGap: 2 });
    doc.moveDown(0.15);
    const nivel = t.nivel === 'basico' ? 'Básico' : t.nivel === 'intermedio' ? 'Intermedio' : 'Avanzado';
    doc.font('Helvetica').fontSize(9).fillColor(GRIS).text(`Nivel: ${nivel}  ·  Ficha ${terminos.indexOf(t) + 1} de ${terminos.length}`, { lineGap: 2 });
    doc.moveDown(0.35);

    // EN UNA FRASE — fuente 10.5, caja más estrecha
    cajaDestacada({
      etiqueta: 'EN UNA FRASE', texto: t.def,
      fondo: '#ece9ff', colorBarra: AZUL, colorTexto: TINTA,
      fontSize: 10.5, anchoTexto: ANCHO - 26, padding: 13, altoExtra: 30,
    });
    doc.moveDown(0.3);

    const seccion = (titulo, texto) => {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text(titulo);
      doc.moveDown(0.1);
      doc.font('Times-Roman').fontSize(10.5).fillColor(TINTA).text(texto, { lineGap: 3.5, align: 'justify' });
      doc.moveDown(0.55);
    };
    seccion('En qué consiste', `${t.p1}\n\n${t.p2}`);

    // UNA ANALOGÍA — fuente 10, caja más estrecha
    doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text('Una analogía');
    doc.moveDown(0.1);
    cajaDestacada({
      etiqueta: '', texto: t.analogia,
      fondo: '#faf8f4', colorBarra: '#a34d06', colorTexto: TINTA,
      fontSize: 10, anchoTexto: ANCHO - 26, padding: 13, altoExtra: 20,
    });
    // la caja sin etiqueta deja hueco arriba; lo compensamos moviendo hacia arriba
    doc.moveDown(0.3);

    seccion('Ejemplo real de negocio', t.ejemplo);
    seccion('Cómo aplicarlo en tu pyme', t.negocio);
    seccion('Errores frecuentes', t.errores);

    if (Array.isArray(t.faq) && t.faq.length) {
      doc.font('Helvetica-Bold').fontSize(11).fillColor(TINTA).text('Preguntas frecuentes');
      doc.moveDown(0.15);
      for (const [p, r] of t.faq) {
        doc.font('Helvetica-Bold').fontSize(9.5).fillColor(TINTA).text(p, { lineGap: 2 });
        doc.font('Times-Roman').fontSize(9.5).fillColor(GRIS).text(r, { lineGap: 3 });
        doc.moveDown(0.3);
      }
      doc.moveDown(0.1);
    }
    if (Array.isArray(t.rel) && t.rel.length) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor(GRIS).text('Términos relacionados: ', { continued: true });
      const rel = t.rel.map((s) => terminos.find((x) => x.slug === s)?.t).filter(Boolean);
      doc.font('Times-Roman').fontSize(9).fillColor(AZUL).text(rel.join(', '), { lineGap: 2 });
      doc.moveDown(0.3);
    }
  }
}

// ---------- Checklist ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Checklist antes de automatizar');
doc.moveDown(0.5);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text('Diez preguntas para decidir si la IA encaja en tu negocio:', { lineGap: 4 });
doc.moveDown(0.7);
const preguntas = [
  '¿Qué tarea concreta quiero mejorar?','¿Cuánto cuesta ahora, con números?','¿Qué datos necesito y dónde están?',
  '¿Qué significa que funcione?','¿Qué pasa si el sistema se equivoca?','¿Qué decisiones requieren aprobación humana?',
  '¿Dónde se procesan los datos?','¿Cuánto cuesta al mes?','¿Cómo lo apago si falla?','¿Quién es el responsable interno?',
];
for (const [i, p] of preguntas.entries()) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor(AZUL).text(`${String(i + 1).padStart(2, '0')}`, { continued: true });
  doc.font('Times-Roman').fontSize(11).fillColor(TINTA).text(`  ${p}`, { lineGap: 4 });
  doc.moveDown(0.35);
  doc.rect(doc.x, doc.y, ANCHO, 0.5).fill(LINEA);
  doc.moveDown(0.5);
}
doc.moveDown(1);
doc.font('Helvetica-Bold').fontSize(13).fillColor(TINTA).text('¿Quieres los 120 términos completos?');
doc.moveDown(0.3);
doc.font('Times-Roman').fontSize(10.5).fillColor(GRIS).text('El Diccionario de IA para tu negocio está disponible en Amazon: tapa blanda (14,99 €) y ebook (6,99 €).', { lineGap: 4 });
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(10).fillColor(AZUL).text('Busca «Diccionario de IA para tu negocio» en Amazon');

// ---------- Índice alfabético ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(20).text('Índice alfabético');
doc.moveDown(0.4);
doc.font('Times-Roman').fontSize(9).fillColor(GRIS).text('Haz clic en cualquier término para ir a su ficha.', { lineGap: 3 });
doc.moveDown(0.8);
const ordenados = [...terminos].sort((a, b) => a.t.localeCompare(b.t, 'es'));
const letras = [...new Set(ordenados.map((t) => t.t.charAt(0).toUpperCase()))].sort();
for (const letra of letras) {
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#333333').text(letra);
  doc.moveDown(0.15);
  for (const t of ordenados.filter((x) => x.t.charAt(0).toUpperCase() === letra)) {
    doc.font('Times-Roman').fontSize(9.5).fillColor(TINTA).text(t.t, { continued: true });
    doc.font('Helvetica').fontSize(8.5).fillColor('#777777').text(`  ${BLOQUES[t.cat].nombre}`, { continued: true });
    doc.font('Helvetica-Bold').fontSize(9).fillColor(AZUL).text(`  ${paginasTermino[t.slug]}`, { goTo: t.slug, lineGap: 2 });
  }
  doc.moveDown(0.3);
}

// ---------- Para seguir leyendo ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(20).text('Para seguir leyendo');
doc.moveDown(0.6);
doc.font('Times-Roman').fontSize(11).fillColor(GRIS).text('Siglas y acrónimos que aparecen en el glosario:', { lineGap: 4 });
doc.moveDown(0.8);
for (const [a, b] of [
  ['AGI','Inteligencia artificial general.'],['API','Interfaz de programación de aplicaciones.'],
  ['CLI','Interfaz de línea de comandos.'],['CoT','Chain of thought (cadena de pensamiento).'],
  ['ETL','Extract, Transform, Load.'],['GPU','Unidad de procesamiento gráfico.'],['IA','Inteligencia artificial.'],
  ['JSON','JavaScript Object Notation.'],['LLM','Large Language Model.'],['MCP','Model Context Protocol.'],
  ['ML','Machine learning (aprendizaje automático).'],['MoE','Mixture of Experts (mezcla de expertos).'],
  ['PoC','Proof of concept (prueba de concepto).'],['RAG','Retrieval-Augmented Generation.'],
  ['RGPD','Reglamento General de Protección de Datos.'],['ROI','Return on investment (retorno de la inversión).'],
  ['SDK','Software Development Kit.'],['SQL','Structured Query Language.'],
]) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor(AZUL).text(a, { continued: true });
  doc.font('Times-Roman').fontSize(10).fillColor(TINTA).text(`  ${b}`, { lineGap: 3 });
  doc.moveDown(0.15);
}

// ---------- Sobre Chess AI Agency ----------
nuevaPagina();
doc.fillColor(TINTA).font('Helvetica-Bold').fontSize(22).text('Sobre Chess AI Agency');
doc.moveDown(0.15);
doc.font('Helvetica').fontSize(9).fillColor(GRIS).text('Agencia de IA aplicada al ajedrez, los deportes y los negocios', { lineGap: 2 });
doc.moveDown(0.5);
doc.font('Times-Roman').fontSize(10).fillColor(TINTA).text('Somos un equipo especializado en IA aplicada al ajedrez, los deportes y los negocios. Trabajamos desde septiembre de 2025 con un enfoque práctico: soluciones reales, sin adornos y con resultados medibles.', { lineGap: 3, align: 'justify' });
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(AZUL).text('Misión');
doc.moveDown(0.1);
doc.font('Times-Roman').fontSize(9.5).fillColor(TINTA).text('Democratizar la IA de élite para el ecosistema ajedrecístico y deportivo: agentes autónomos, plataformas inteligentes y soluciones empresariales reales.', { lineGap: 3, align: 'justify' });
doc.moveDown(0.3);
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(AZUL).text('En cifras');
doc.moveDown(0.1);
doc.font('Times-Roman').fontSize(9.5).fillColor(TINTA).text('30 proyectos en marcha · 14 meses de trayectoria · 3 idiomas · agente IA 24/7. Casos: ChessOrganizers.com (95 % automatización, 200+ torneos/año), Football AI (99,2 % precisión) y Chess AI Premium (50+ academias).', { lineGap: 3, align: 'justify' });
doc.moveDown(0.4);
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(AZUL).text('web: agency.ajedrezpremium.com   ·   contacto: chessagencyai@gmail.com');

// ---------- Contraportada ----------
nuevaPagina();
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#2c2878');
for (let gx = 0; gx < doc.page.width; gx += 40) doc.moveTo(gx, 0).lineTo(gx, doc.page.height).strokeColor('#ffffff08').lineWidth(0.5).stroke();
for (let gy = 0; gy < doc.page.height; gy += 40) doc.moveTo(0, gy).lineTo(doc.page.width, gy).strokeColor('#ffffff08').lineWidth(0.5).stroke();
doc.rect(0, 0, 14, doc.page.height).fill('#f0b46a');
const logoContra = path.join(RAIZ, 'scripts', 'img-bw', 'logo-bw.png');
doc.image(logoContra, MARGEN_IZQ, 120, { width: 60 });
doc.font('Helvetica-Bold').fontSize(9).fillColor('#d4af37').text('Estrategia · Innovación · Ejecución', MARGEN_IZQ + 70, 135);
doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(14).text('ENTIENDE LA IA ANTES DE COMPRARLA', MARGEN_IZQ, 200, { characterSpacing: 1.5 });
doc.font('Helvetica').fontSize(12).fillColor('#dcd8ff').text('120 términos · 8 bloques · checklist final', MARGEN_IZQ, 240);
doc.font('Times-Roman').fontSize(11).fillColor('#ffffff').text('La IA no es magia ni amenaza: es una herramienta. Este diccionario te da el vocabulario para decidir con criterio.', MARGEN_IZQ, 300, { width: ANCHO, lineGap: 4 });
doc.font('Helvetica-Bold').fontSize(11).fillColor('#f0b46a').text('¿Quieres que lo revisemos contigo?', MARGEN_IZQ, 380);
doc.font('Helvetica').fontSize(10).fillColor('#b9b5e8').text('Solicita un diagnóstico gratuito en agency.ajedrezpremium.com', MARGEN_IZQ, 405);
doc.font('Helvetica').fontSize(9).fillColor('#8f8ad8').text('agency.ajedrezpremium.com · diccionario.ajedrezpremium.com', MARGEN_IZQ, doc.page.height - 60);

// TOC with page numbers (antes de cerrar el documento)
doc.switchToPage(paginaTOC - 1);
doc.y = 120;
for (const slug of ORDEN) {
  const bloque = BLOQUES[slug];
  doc.font('Helvetica-Bold').fontSize(13).fillColor(AZUL).text(bloque.nombre, MARGEN_IZQ, doc.y, { continued: true });
  doc.font('Helvetica').fontSize(11).fillColor(GRIS).text(`  ···  ${paginasBloque[slug]}`, { goTo: slug, lineGap: 4 });
  doc.moveDown(0.5);
}
doc.moveDown(1);
doc.font('Times-Roman').fontSize(9).fillColor('#888').text('Los números de página de cada término aparecen en el índice alfabético del final.');

doc.end();
await new Promise((resolve, reject) => { doc.on('end', resolve); doc.on('error', reject); });

const stats = fs.statSync(SALIDA);
console.log(`✅ Libro generado: public/libro/diccionario-ia.pdf (${(stats.size / 1024).toFixed(0)} KB, ${paginaActual} páginas)`);
