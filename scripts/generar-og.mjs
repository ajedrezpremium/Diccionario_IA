import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const RAIZ = process.cwd();
const SALIDA = path.join(RAIZ, 'public', 'og');
const INDICE = JSON.parse(
  fs.readFileSync(path.join(RAIZ, 'src', 'data', 'indice-terminos.json'), 'utf8'),
);

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

fs.mkdirSync(SALIDA, { recursive: true });

const xml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const envolver = (texto, maximo) => {
  const palabras = String(texto).split(/\s+/);
  const lineas = [];
  let actual = '';
  for (const palabra of palabras) {
    if (!actual) actual = palabra;
    else if (`${actual} ${palabra}`.length <= maximo) actual += ` ${palabra}`;
    else {
      lineas.push(actual);
      actual = palabra;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
};

const svg = ({ kicker, titulo, subtitulo, pie }) => {
  const tamTitulo = titulo.length > 34 ? 58 : titulo.length > 20 ? 70 : 82;
  const lineasTitulo = envolver(titulo, tamTitulo >= 70 ? 20 : 26).slice(0, 3);
  const lineasSub = envolver(subtitulo, 54).slice(0, 3);

  const tituloSvg = lineasTitulo
    .map(
      (linea, i) =>
        `<tspan x="80" dy="${i === 0 ? 0 : tamTitulo * 1.02}">${xml(linea)}</tspan>`,
    )
    .join('');

  const subSvg = lineasSub
    .map((linea, i) => `<tspan x="80" dy="${i === 0 ? 0 : 36}">${xml(linea)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="fondo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#241f66"/>
      <stop offset="55%" stop-color="#3f3aa8"/>
      <stop offset="100%" stop-color="#6d4bb5"/>
    </linearGradient>
    <pattern id="rejilla" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#fondo)"/>
  <rect width="1200" height="630" fill="url(#rejilla)"/>
  <circle cx="1090" cy="90" r="210" fill="#f0b46a" fill-opacity="0.12"/>
  <circle cx="1160" cy="560" r="150" fill="#ffffff" fill-opacity="0.06"/>
  <rect x="0" y="0" width="14" height="630" fill="#f0b46a"/>

  <text x="80" y="86" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="3.2" fill="#dcd8ff">${xml(kicker)}</text>
  <rect x="80" y="112" width="64" height="4" fill="#f0b46a"/>

  <text x="80" y="245" font-family="Georgia, 'Times New Roman', serif" font-size="${tamTitulo}" font-weight="700" fill="#ffffff">${tituloSvg}</text>

  <text x="80" y="${lineasTitulo.length > 1 ? 245 + lineasTitulo.length * tamTitulo * 1.02 + 42 : 330}" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#e7e4ff">${subSvg}</text>

  <rect x="80" y="524" width="1040" height="1" fill="#ffffff" fill-opacity="0.22"/>
  <text x="80" y="570" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#cfcbf5">${xml(pie)}</text>
  <text x="1120" y="570" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff">Diccionario IA</text>
</svg>`;
};

const generar = async (nombre, datos) => {
  await sharp(Buffer.from(svg(datos), 'utf8'))
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(SALIDA, `${nombre}.png`));
};

await generar('portada', {
  kicker: 'CHESS AI AGENCY · EDICIÓN 10',
  titulo: 'Diccionario de IA para tu negocio',
  subtitulo: `${INDICE.length} términos explicados en español, con ejemplos reales y sin jerga.`,
  pie: 'Gratis en diccionario.ajedrezpremium.com/libro',
});

await generar('default', {
  kicker: 'GLOSARIO DE INTELIGENCIA ARTIFICIAL',
  titulo: 'La IA, explicada sin humo',
  subtitulo: `${INDICE.length} términos en español para pymes y profesionales que no programan.`,
  pie: 'diccionario.ajedrezpremium.com',
});

for (const t of INDICE) {
  await generar(t.slug, {
    kicker: `DICCIONARIO IA · ${CATEGORIAS[t.categoria].toUpperCase()}`,
    titulo: t.termino,
    subtitulo: t.definicionCorta,
    pie: `diccionario.ajedrezpremium.com/que-es/${t.slug}`,
  });
}

console.log(`✅ ${INDICE.length + 2} imágenes Open Graph generadas en public/og/`);
