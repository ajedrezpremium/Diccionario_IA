import fs from 'node:fs';
import path from 'node:path';

const RAIZ = process.cwd();
const SALIDA_DIR = path.join(RAIZ, 'public', 'libro');
const SALIDA = path.join(SALIDA_DIR, 'diccionario-ia-ebook.html');

const modulos = [
  '01-fundamentos.mjs', '02-modelos.mjs', '03-agentes.mjs', '04-herramientas.mjs',
  '05-datos.mjs', '06-prompting.mjs', '07-seguridad.mjs', '08-negocio.mjs', '09-extra.mjs', '10-nuevos.mjs', '11-final.mjs'
];

const BLOQUES = {
  fundamentos: 'Fundamentos',
  modelos: 'Modelos y lenguaje',
  agentes: 'Agentes y automatización',
  'herramientas-desarrollo': 'Herramientas y desarrollo',
  'datos-y-conocimiento': 'Datos y conocimiento',
  prompting: 'Prompting',
  'seguridad-y-etica': 'Seguridad, ética y legal',
  negocio: 'Negocio y aplicación',
};
const ORDEN_BLOQUES = Object.keys(BLOQUES);

const terminos = [];
for (const modulo of modulos) {
  const { default: lote } = await import(`./contenido/${modulo}`);
  terminos.push(...lote);
}

fs.mkdirSync(SALIDA_DIR, { recursive: true });

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Build fichas HTML
let fichasHtml = '';
for (const slug of ORDEN_BLOQUES) {
  const nombre = BLOQUES[slug];
  const lista = terminos.filter((t) => t.cat === slug);
  fichasHtml += '\n<div class="bloque-titulo">\n';
  fichasHtml += '  <h2>' + esc(nombre) + '</h2>\n';
  fichasHtml += '  <p>' + lista.length + ' términos en este bloque</p>\n';
  fichasHtml += '</div>\n';

  for (const t of lista) {
    fichasHtml += '\n<div class="ficha">\n';
    fichasHtml += '  <h2 class="ficha-titulo">' + esc(t.t) + '</h2>\n';
    const nivelNombre = t.nivel === 'basico' ? 'Básico' : t.nivel === 'intermedio' ? 'Intermedio' : 'Avanzado';
    fichasHtml += '  <p class="nivel">Nivel: ' + nivelNombre + ' · Ficha ' + (terminos.indexOf(t) + 1) + ' de ' + terminos.length + '</p>\n';
    fichasHtml += '  <div class="definicion">' + esc(t.def) + '</div>\n';
    fichasHtml += '  <div class="seccion"><h3>En qué consiste</h3><p>' + esc(t.p1) + '</p><p>' + esc(t.p2) + '</p></div>\n';
    fichasHtml += '  <div class="seccion analogia"><h3>Una analogía</h3><p>' + esc(t.analogia) + '</p></div>\n';
    fichasHtml += '  <div class="seccion"><h3>Ejemplo real de negocio</h3><p>' + esc(t.ejemplo) + '</p></div>\n';
    fichasHtml += '  <div class="seccion"><h3>Cómo aplicarlo en tu pyme</h3><p>' + esc(t.negocio) + '</p></div>\n';
    fichasHtml += '  <div class="seccion"><h3>Errores frecuentes</h3><p>' + esc(t.errores) + '</p></div>\n';
    if (Array.isArray(t.faq) && t.faq.length) {
      fichasHtml += '  <div class="faq"><h3>Preguntas frecuentes</h3><dl>\n';
      for (const [p, r] of t.faq) {
        fichasHtml += '    <dt>' + esc(p) + '</dt><dd>' + esc(r) + '</dd>\n';
      }
      fichasHtml += '  </dl></div>\n';
    }
    if (Array.isArray(t.rel) && t.rel.length) {
      const relTerms = t.rel.map((s) => terminos.find((x) => x.slug === s)?.t).filter(Boolean);
      fichasHtml += '  <p class="relacionados">Términos relacionados: ' + relTerms.map((n) => esc(n)).join(', ') + '</p>\n';
    }
    fichasHtml += '</div>\n';
  }
}

// Build TOC
let tocHtml = '';
for (const slug of ORDEN_BLOQUES) {
  const nombre = BLOQUES[slug];
  const lista = terminos.filter((t) => t.cat === slug);
  tocHtml += '    <li><strong>' + esc(nombre) + '</strong> (' + lista.length + ' términos)</li>\n';
  tocHtml += '    <li style="font-size:0.85em;color:#555;margin-left:1em">' + lista.map((t) => esc(t.t)).join(' · ') + '</li>\n';
}

// Build alphabetical index
const letras = [...new Set(terminos.map((t) => t.t.charAt(0).toUpperCase()))].sort();
let indiceHtml = '';
for (const letra of letras) {
  indiceHtml += '  <div class="letra">' + letra + '</div>\n';
  const delaletra = terminos.filter((t) => t.t.charAt(0).toUpperCase() === letra).sort((a, b) => a.t.localeCompare(b.t, 'es'));
  for (const t of delaletra) {
    indiceHtml += '  <div class="termino"><a href="https://diccionario-ia-livid.vercel.app/que-es/' + t.slug + '">' + esc(t.t) + '</a> <span class="bloque">' + esc(BLOQUES[t.cat]) + '</span></div>\n';
  }
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Diccionario de IA para tu negocio</title>
<meta name="author" content="Roberto Páramos Domínguez">
<style>
  body { font-family: Georgia, serif; font-size: 1em; line-height: 1.6; color: #1a1a1a; margin: 1em; }
  h1 { font-family: "Segoe UI", Arial, sans-serif; font-size: 2em; color: #2c2878; margin: 1.5em 0 0.5em; page-break-before: always; }
  h2 { font-family: "Segoe UI", Arial, sans-serif; font-size: 1.4em; color: #3f3aa8; margin: 1.2em 0 0.4em; }
  h3 { font-family: "Segoe UI", Arial, sans-serif; font-size: 1.1em; color: #3f3aa8; margin: 1em 0 0.3em; }
  .portada { text-align: center; page-break-after: always; }
  .portada h1 { font-size: 2.5em; page-break-before: auto; }
  .portada .subtitulo { font-size: 1.2em; color: #555; margin: 0.5em 0 2em; }
  .portada .autor { font-size: 1.1em; margin-top: 2em; }
  .portada .editorial { font-size: 0.9em; color: #888; margin-top: 0.5em; }
  .bloque-titulo { background: #ece9ff; padding: 0.8em 1em; border-left: 4px solid #3f3aa8; margin: 2em 0 1em; page-break-before: always; }
  .bloque-titulo h2 { margin: 0; color: #3f3aa8; }
  .bloque-titulo p { margin: 0.3em 0 0; font-size: 0.9em; color: #555; }
  .ficha { margin: 1.5em 0; page-break-inside: avoid; }
  .ficha-titulo { font-family: "Segoe UI", Arial, sans-serif; font-size: 1.3em; color: #1a1a1a; margin: 0 0 0.2em; }
  .nivel { font-size: 0.8em; color: #777; margin-bottom: 0.5em; }
  .definicion { background: #f5f5f5; border-left: 3px solid #3f3aa8; padding: 0.6em 1em; margin: 0.8em 0; font-style: italic; }
  .seccion { margin: 1em 0; }
  .seccion h3 { color: #3f3aa8; }
  .analogia { background: #faf8f4; border-left: 3px solid #a34d06; padding: 0.6em 1em; margin: 0.8em 0; font-style: italic; }
  .faq { margin: 1em 0; }
  .faq dt { font-weight: bold; margin-top: 0.5em; }
  .faq dd { margin: 0.2em 0 0.5em 1em; color: #333; }
  .relacionados { font-size: 0.85em; color: #555; margin-top: 0.8em; }
  .relacionados a { color: #3f3aa8; text-decoration: none; }
  .toc { page-break-after: always; }
  .toc ul { list-style: none; padding: 0; }
  .toc li { margin: 0.3em 0; }
  .toc a { color: #3f3aa8; text-decoration: none; }
  .checklist { page-break-before: always; }
  .checklist li { margin: 0.5em 0; }
  .indice { page-break-before: always; }
  .indice .letra { font-size: 1.3em; color: #3f3aa8; margin: 0.8em 0 0.3em; font-weight: bold; }
  .indice .termino { margin: 0.15em 0; }
  .indice .termino a { color: #1a1a1a; text-decoration: none; }
  .indice .bloque { font-size: 0.8em; color: #777; }
  .contraportada { page-break-before: always; text-align: center; padding: 3em 1em; background: #2c2878; color: #fff; }
  .contraportada h1 { color: #fff; page-break-before: auto; }
  .contraportada p { color: #dcd8ff; }
  .autor-box { page-break-before: always; }
</style>
</head>
<body>

<div class="portada">
  <h1>Diccionario de IA</h1>
  <p class="subtitulo">para tu negocio</p>
  <p>100 términos explicados en español, con ejemplos reales y sin jerga innecesaria.</p>
  <p>Para pymes, autónomos y profesionales que no programan.</p>
  <p class="autor">Roberto Páramos Domínguez</p>
  <p class="editorial">JRedition · Edición 2026</p>
</div>

<div class="toc">
  <h1>Contenido</h1>
  <ul>
${tocHtml}
  </ul>
</div>

${fichasHtml}

<div class="checklist">
  <h1>Checklist antes de automatizar</h1>
  <p>Una página para llevar a la próxima reunión. Si no puedes responder estas preguntas, todavía no es un proyecto: es una idea.</p>
  <ol>
    <li>¿Qué tarea concreta quiero mejorar y quién la hace hoy?</li>
    <li>¿Cuánto tiempo o dinero cuesta ahora, con números?</li>
    <li>¿Qué datos necesito y dónde están? ¿Son fiables?</li>
    <li>¿Qué significa que funcione? Métrica y umbral.</li>
    <li>¿Qué pasa si el sistema se equivoca? ¿Quién lo revisa?</li>
    <li>¿Qué decisiones requieren aprobación humana?</li>
    <li>¿Dónde se procesan los datos y con qué proveedor?</li>
    <li>¿Cuánto cuesta al mes en uso, mantenimiento y revisión?</li>
    <li>¿Cómo lo apago si falla o si cambia la normativa?</li>
    <li>¿Quién es el responsable interno del proyecto?</li>
  </ol>
</div>

<div class="indice">
  <h1>Índice alfabético</h1>
  <p>Haz clic en cualquier término para ir a su ficha.</p>
${indiceHtml}
</div>

<div class="autor-box">
  <h1>Sobre el autor</h1>
  <p>Roberto Páramos Domínguez es autor de 16 libros y fundador de Chess AI Agency, una agencia que diseña e integra agentes de IA permanentes en webs y procesos de pymes. El diccionario nace de lo que aprendemos en proyectos reales.</p>
  <p>Servicios: diagnóstico de procesos, implantación de agentes de atención y cualificación, formación para equipos y mantenimiento continuo.</p>
  <p>Contacto: agency.ajedrezpremium.com</p>
</div>

<div class="contraportada">
  <h1>ENTIENDE LA IA ANTES DE COMPRARLA</h1>
  <p>100 términos · 8 bloques · checklist final</p>
  <p>La IA no es magia ni amenaza: es una herramienta. Este diccionario te da el vocabulario para decidir con criterio.</p>
  <p><strong>¿Quieres que lo revisemos contigo?</strong></p>
  <p>Solicita un diagnóstico gratuito en agency.ajedrezpremium.com</p>
  <p>JRedition · agency.ajedrezpremium.com · diccionario-ia-livid.vercel.app</p>
</div>

</body>
</html>`;

fs.writeFileSync(SALIDA, html, 'utf8');
console.log(`✅ Ebook HTML generado: public/libro/diccionario-ia-ebook.html (${(html.length / 1024).toFixed(0)} KB)`);