export type CategoriaSlug =
  | 'fundamentos'
  | 'modelos'
  | 'agentes'
  | 'herramientas-desarrollo'
  | 'datos-y-conocimiento'
  | 'prompting'
  | 'seguridad-y-etica'
  | 'negocio';

export interface Categoria {
  slug: CategoriaSlug;
  nombre: string;
  descripcion: string;
  cta: string;
  numero: string;
}

export const CATEGORIAS: Record<CategoriaSlug, Categoria> = {
  fundamentos: {
    slug: 'fundamentos',
    nombre: 'Fundamentos',
    descripcion:
      'Las piezas básicas de la inteligencia artificial: qué es, cómo aprende y qué significa cada concepto que aparece en todas partes.',
    cta: 'Entender la base te permite distinguir una moda de una herramienta útil. Si quieres saber qué encaja en tu negocio, lo vemos juntos.',
    numero: '01',
  },
  modelos: {
    slug: 'modelos',
    nombre: 'Modelos y modelos de lenguaje',
    descripcion:
      'Cómo funcionan los modelos que escriben, razonan y generan imágenes, y qué parámetros cambian de verdad el resultado.',
    cta: 'Elegir el modelo adecuado ahorra coste y mejora la calidad. En Chess AI Agency hacemos esa comparación con tus casos reales.',
    numero: '02',
  },
  agentes: {
    slug: 'agentes',
    nombre: 'Agentes y automatización',
    descripcion:
      'La IA que no solo responde: usa herramientas, recuerda, planifica y ejecuta tareas dentro de tus sistemas.',
    cta: 'Un agente bien diseñado atiende, cualifica y deriva sin quemar a tu equipo. Diseñamos e integramos agentes permanentes para pymes.',
    numero: '03',
  },
  'herramientas-desarrollo': {
    slug: 'herramientas-desarrollo',
    nombre: 'Herramientas y desarrollo',
    descripcion:
      'APIs, SDKs, despliegue y observabilidad: el vocabulario técnico que necesitas para hablar con tu proveedor sin que te vendan humo.',
    cta: 'No necesitas programar para contratar bien. Te ayudamos a definir el alcance técnico y a evitar dependencias innecesarias.',
    numero: '04',
  },
  'datos-y-conocimiento': {
    slug: 'datos-y-conocimiento',
    nombre: 'Datos y conocimiento',
    descripcion:
      'Cómo se prepara, se busca y se conecta la información para que la IA responda con el conocimiento de tu empresa.',
    cta: 'La IA no adivina: recupera. Si tus datos están ordenados, tu agente responde mejor. Podemos revisar tu caso.',
    numero: '05',
  },
  prompting: {
    slug: 'prompting',
    nombre: 'Prompting',
    descripcion:
      'Técnicas para pedir mejor: instrucciones claras, ejemplos, estructura y evaluación de resultados.',
    cta: 'Un buen prompt es procesos, no trucos. Formamos a tu equipo para que use la IA con criterio.',
    numero: '06',
  },
  'seguridad-y-etica': {
    slug: 'seguridad-y-etica',
    nombre: 'Seguridad, ética y legal',
    descripcion:
      'Riesgos reales, normativa europea y buenas prácticas para usar IA sin exponer datos ni comprometer tu reputación.',
    cta: 'Antes de automatizar, hay que cumplir. Revisamos riesgos, datos y obligaciones del AI Act contigo.',
    numero: '07',
  },
  negocio: {
    slug: 'negocio',
    nombre: 'Negocio y aplicación práctica',
    descripcion:
      'Cómo se mide, se presupuesta y se implanta la IA para que genere retorno de verdad, no una demo bonita.',
    cta: 'La IA solo vale si mejora un número: horas, leads, margen o errores. Hablemos de tu número.',
    numero: '08',
  },
};

export const ORDEN_CATEGORIAS = Object.keys(CATEGORIAS) as CategoriaSlug[];

export const NIVELES = {
  basico: { nombre: 'Básico', clase: 'nivel-basico' },
  intermedio: { nombre: 'Intermedio', clase: 'nivel-intermedio' },
  avanzado: { nombre: 'Avanzado', clase: 'nivel-avanzado' },
} as const;
