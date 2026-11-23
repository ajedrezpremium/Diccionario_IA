// Terminos extra (101-120) para ampliar el glosario a 120
export default [












  {
    t: 'Gobernanza de datos', full: 'Gobernanza de datos', slug: 'gobernanza-de-datos', cat: 'datos-y-conocimiento', nivel: 'avanzado',
    def: 'Conjunto de reglas, responsables y procesos que garantizan que los datos sean correctos, accesibles y usados de forma lícita.',
    sin: ['Data governance'], rel: ['calidad-de-datos', 'rgpd', 'etl', 'soberania-del-dato'],
    p1: 'Define quién puede ver, cambiar o borrar cada dato, quién responde si hay errores y cómo se documenta el origen. Sin gobernanza, la IA amplifica el desorden.',
    p2: 'No es solo documentación: incluye permisos, trazas, políticas de retención y un responsable claro por conjunto de datos.',
    analogia: 'El reglamento de una biblioteca: quién presta libros, quién los cataloga y qué pasa si se pierden.',
    ejemplo: 'Una aseguradora nombra un responsable por cada dato sensible y documenta de dónde viene y cuánto se conserva.',
    negocio: 'Antes de conectar un agente a tus sistemas, define quién responde por cada dato. Es requisito previo al RGPD.',
    errores: 'Creer que es papeleo opcional o no asignar responsables.',
    faq: [['¿Por dónde empiezo?', 'Por un inventario de datos y un responsable por conjunto.'], ['¿Es lo mismo que RGPD?', 'No: el RGPD es legal; la gobernanza es la práctica que lo hace posible.']],
  },
  {
    t: 'Linaje de datos', full: 'Linaje de datos', slug: 'linaje-de-datos', cat: 'datos-y-conocimiento', nivel: 'avanzado',
    def: 'Registro de dónde viene cada dato, qué transformaciones ha sufrido y en qué informes o modelos se ha usado.',
    sin: ['Data lineage'], rel: ['gobernanza-de-datos', 'etl', 'calidad-de-datos', 'explicabilidad'],
    p1: 'Permite responder «¿de dónde sale este número?» y «a qué afecta si lo cambio?». Es esencial cuando un modelo toma decisiones y hay que justificarlas.',
    p2: 'Se documenta en cada paso del ETL y se conserva con el modelo. Sin linaje, depurar un error puede llevar días.',
    analogia: 'El recibo de una receta: sabes de dónde vino cada ingrediente y quién lo tocó.',
    ejemplo: 'Un banco detecta un dato mal cargado y, gracias al linaje, sabe qué 12 informes y 3 modelos hay que recalcular.',
    negocio: 'Exige linaje en cualquier sistema que alimente decisiones automáticas. Es tu seguro ante auditorías.',
    errores: 'No documentar transformaciones o confiar en la memoria del equipo.',
    faq: [['¿Es obligatorio?', 'No por ley en general, pero es necesario para cumplir bien con el RGPD y auditar modelos.'], ['¿Qué herramienta uso?', 'Desde un simple documento de flujos hasta herramientas dedicadas de catálogo.']],
  },
  {
    t: 'Feature store', full: 'Feature store', slug: 'feature-store', cat: 'datos-y-conocimiento', nivel: 'avanzado',
    def: 'Repositorio centralizado de variables —features— calculadas y validadas que se reutilizan en modelos y análisis.',
    sin: ['Feature store', 'Almacén de características'], rel: ['machine-learning', 'gobernanza-de-datos', 'calidad-de-datos', 'inferencia'],
    p1: 'En lugar de calcular la misma variable en cada proyecto, se define una vez, se valida y se reutiliza. Evita que entrenamiento e inferencia usen definiciones distintas.',
    p2: 'Es más habitual en empresas grandes, pero el principio sirve a cualquier pyme: una métrica, una definición, un dueño.',
    analogia: 'Una báscula compartida en toda la empresa: todos pesan igual y nadie discute el número.',
    ejemplo: 'Una aseguradora define «cliente con riesgo» una sola vez y la usan el modelo de precios y el de retención.',
    negocio: 'Si dos equipos calculan lo mismo de forma distinta, para primero. Ese es el mayor ahorro del feature store.',
    errores: 'Creer que hace falta una herramienta cara o duplicar definiciones entre equipos.',
    faq: [['¿Cuándo merece la pena?', 'Cuando varios modelos comparten variables o hay discrepancias.'], ['¿Es solo para grandes?', 'No: la idea de «una métrica, una definición» aplica a cualquier tamaño.']],
  },
  {
    t: 'Datos maestros', full: 'Datos maestros', slug: 'datos-maestros', cat: 'datos-y-conocimiento', nivel: 'intermedio',
    def: 'Datos esenciales y compartidos que describen entidades clave del negocio, como clientes, productos o empleados.',
    sin: ['Master data'], rel: ['gobernanza-de-datos', 'calidad-de-datos', 'base-de-datos-relacional', 'etl'],
    p1: 'Son los datos que todos los sistemas necesitan y que deben coincidir: el mismo cliente en el CRM, la factura y la web. Si divergen, todo lo demás falla.',
    p2: 'Gobernar los datos maestros —un solo registro por entidad, un responsable— es previo a cualquier proyecto de IA fiable.',
    analogia: 'El padrón municipal: una sola ficha por persona, usada por todos los departamentos.',
    ejemplo: 'Una cadena de tiendas unifica su catálogo de productos antes de lanzar un recomendador. Antes había 4 nombres para el mismo artículo.',
    negocio: 'Invierte primero en datos maestros limpios. Es la base que más rentabilidad da a medio plazo.',
    errores: 'Tener el mismo cliente repetido en varios sistemas o no nombrar un responsable.',
    faq: [['¿Diferencia con datos transaccionales?', 'Los maestros describen entidades; los transaccionales registran eventos (ventas, citas).'], ['¿Por dónde empezar?', 'Por clientes y productos, que suelen ser los que más duplicados tienen.']],
  },
  {
    t: 'Metadatos', full: 'Metadatos', slug: 'metadatos', cat: 'datos-y-conocimiento', nivel: 'intermedio',
    def: 'Datos que describen a otros datos: origen, formato, significado, fecha de actualización y responsable.',
    sin: ['Metadata'], rel: ['gobernanza-de-datos', 'linaje-de-datos', 'curacion-de-datos', 'rag'],
    p1: 'Sin metadatos, una tabla es solo un montón de números. Con ellos sabes qué significa cada columna, de dónde viene y quién responde por ella.',
    p2: 'En RAG, los metadatos —título, sección, documento de origen— permiten citar la fuente y filtrar fragmentos por permisos.',
    analogia: 'La ficha de una biblioteca: no es el libro, pero te dice de qué va, quién lo escribió y dónde está.',
    ejemplo: 'Un buscador interno muestra el documento y la sección de donde salió cada fragmento, gracias a los metadatos indexados.',
    negocio: 'Exige metadatos mínimos en todo dato que alimente un modelo. Es la diferencia entre una respuesta y una respuesta verificable.',
    errores: 'No documentar el origen o no actualizar la fecha de modificación.',
    faq: [['¿Qué metadatos mínimos?', 'Origen, significado, fecha y responsable.'], ['¿Ayudan al RAG?', 'Mucho: permiten citar fuentes y filtrar por permisos.']],
  },
  {
    t: 'Datos abiertos', full: 'Datos abiertos', slug: 'datos-abiertos', cat: 'datos-y-conocimiento', nivel: 'basico',
    def: 'Datos que cualquiera puede usar, reutilizar y redistribuir libremente, respetando las condiciones de su licencia.',
    sin: ['Open data'], rel: ['gobernanza-de-datos', 'privacidad', 'soberania-del-dato', 'copyright-ia'],
    p1: 'Muchos gobiernos y organismos publican datos abiertos: estadísticas, mapas, presupuestos. Son una fuente gratuita para enriquecer proyectos de IA.',
    p2: '«Abierto» no significa «sin condiciones». Hay que revisar la licencia, citar la fuente y no mezclar datos personales sin base legal.',
    analogia: 'Una fuente pública de agua: puedes beber, pero hay normas de uso y hay que cuidar el grifo.',
    ejemplo: 'Una agencia usa datos abiertos de meteorología y tráfico para mejorar un modelo de logística local.',
    negocio: 'Úsalos para complementar tus datos propios. Son baratos, pero nunca sustituyen el conocimiento de tu cliente.',
    errores: 'Asumir que no hay licencia o mezclarlos con datos personales sin revisar.',
    faq: [['¿Dónde los encuentro?', 'En los portales de datos abiertos de administraciones y organismos internacionales.'], ['¿Puedo vender un producto con ellos?', 'Depende de la licencia. Revisa las condiciones de reutilización.']],
  },

  {
    t: 'Auditoría de algoritmos', full: 'Auditoría de algoritmos', slug: 'auditoria-de-algoritmos', cat: 'seguridad-y-etica', nivel: 'avanzado',
    def: 'Revisión sistemática de un sistema de IA para comprobar su precisión, sesgos, cumplimiento normativo y trazabilidad.',
    sin: ['AI audit', 'Auditoría de IA'], rel: ['sesgo', 'ia-act', 'explicabilidad', 'evaluacion-de-prompts'],
    p1: 'No basta con probar que funciona una vez. La auditoría revisa con qué datos se probó, en qué colectivos falla más, qué decisiones toma y si se puede explicar.',
    p2: 'Incluye métricas por grupo, pruebas de estrés, revisión de permisos y documentación de cambios. Es obligatoria en ciertos usos de alto riesgo del AI Act.',
    analogia: 'La revisión técnica de un ascensor: no basta con que suba, hay que comprobar frenos, límites y mantenimiento.',
    ejemplo: 'Una entidad revisa su modelo de cribado y detecta que falla más en cierto colectivo. Ajusta datos y umbrales antes de seguir.',
    negocio: 'Audita antes de escalar. Detectar un sesgo en piloto cuesta poco; hacerlo con clientes cuesta reputación.',
    errores: 'Auditar solo el día del lanzamiento o mirar solo la precisión global.',
    faq: [['¿Es obligatorio?', 'En sistemas de alto riesgo según el AI Act; recomendable en cualquier decisión que afecte a personas.'], ['¿Qué se revisa?', 'Datos, métricas por grupo, sesgos, explicabilidad, permisos y trazas.']],
  },

];
