// Terminos nuevos 108-120
export default [





  {
    t: 'Seudonimización', full: 'Seudonimización', slug: 'seudonimizacion', cat: 'seguridad-y-etica', nivel: 'intermedio',
    def: 'Proceso de sustituir los identificadores de un dato por otros artificiales, de modo que la persona solo pueda reidentificarse con información adicional guardada por separado.',
    sin: ['Pseudonymization'], rel: ['privacidad', 'rgpd', 'datos-sinteticos', 'gobernanza-de-datos'],
    p1: 'Borrar el nombre no basta: una fecha, un código postal y un puesto pueden identificar a alguien. Hay que considerar el riesgo de reidentificación.',
    p2: 'La seudonimización no es anonimización si se puede revertir con una clave.',
    analogia: 'Difuminar una cara en una foto: si el resto permite reconocer a la persona, no está anonimizada.',
    ejemplo: 'Un hospital elimina identificadores, agrupa edades por rangos y revisa combinaciones sensibles.',
    negocio: 'Si vas a usar datos para entrenar, minimiza y anonimiza antes de sacarlos de tu entorno.',
    errores: 'Confundir seudonimizar con anonimizar o creer que con borrar el nombre ya es suficiente.',
    faq: [['¿Es irreversible?', 'Una anonimización fuerte sí. Si se puede revertir, es seudonimización.'], ['¿Puedo usar IA?', 'Puede ayudar a detectar datos, pero requiere revisión humana.']],
  },


  {
    t: 'Sesgo de confirmación', full: 'Sesgo de confirmación', slug: 'sesgo-confirmacion', cat: 'seguridad-y-etica', nivel: 'intermedio',
    def: 'Tendencia a favorecer información que confirma lo que ya se cree e ignorar la que lo contradice, también en sistemas de IA.',
    sin: ['Confirmation bias'], rel: ['sesgo', 'curacion-de-datos', 'evaluacion-de-prompts', 'auditoria-de-algoritmos'],
    p1: 'Puede aparecer al elegir datos de entrenamiento, al redactar prompts o al interpretar resultados. El modelo no «quiere» confirmar nada, pero aprende de lo que le mostramos.',
    p2: 'Se combate con datos diversos, preguntas contrarias y evaluación por personas distintas a las que diseñaron el sistema.',
    analogia: 'Buscar solo noticias que dan la razón y ignorar el resto.',
    ejemplo: 'Un equipo entrena un clasificador solo con clientes satisfechos y luego se sorprende de que no detecta quejas.',
    negocio: 'Incluye casos contrarios en tus pruebas. Si todos los ejemplos coinciden, el modelo no aprenderá a distinguir.',
    errores: 'Creer que el modelo es neutral por ser una máquina o usar siempre los mismos ejemplos.',
    faq: [['¿Se elimina?', 'No del todo, pero se reduce con datos variados y revisión externa.'], ['¿Afecta al prompt?', 'Sí si el prompt da por hecho la respuesta.']],
  },
  {
    t: 'Explicabilidad', full: 'Explicabilidad', slug: 'explicabilidad', cat: 'seguridad-y-etica', nivel: 'intermedio',
    def: 'Capacidad de un sistema de IA para justificar por qué dio una respuesta o tomó una decisión de forma comprensible.',
    sin: ['Explainability', 'Interpretabilidad'], rel: ['transparencia-algoritmica', 'auditoria-de-algoritmos', 'ia-act', 'explicacion'],
    p1: 'No es lo mismo que precisión. Un modelo puede acertar sin que se pueda explicar por qué. En decisiones sobre personas, la explicación es tan importante como el acierto.',
    p2: 'Las técnicas van desde resaltar qué partes del texto pesaron más hasta modelos más simples e interpretables.',
    analogia: 'Un médico que no solo dice el diagnóstico, sino en qué síntomas se basó.',
    ejemplo: 'Un sistema de crédito indica qué factores —ingresos, historial, deuda— llevaron a una decisión.',
    negocio: 'Si tu agente toca decisiones sensibles, exige explicaciones y registro. Es requisito del AI Act en alto riesgo.',
    errores: 'Creer que mostrar la cadena de pensamiento del modelo es una explicación fiable.',
    faq: [['¿Igual que transparencia?', 'La transparencia informa del sistema; la explicabilidad justifica una decisión concreta.'], ['¿Siempre es posible?', 'En modelos complejos solo de forma aproximada.']],
  },
  {
    t: 'Derecho a la explicación', full: 'Derecho a la explicación', slug: 'derecho-a-la-explicacion', cat: 'seguridad-y-etica', nivel: 'intermedio',
    def: 'Derecho de una persona a recibir una explicación clara cuando una decisión automatizada afecta a sus intereses.',
    sin: ['Right to explanation'], rel: ['rgpd', 'ia-act', 'explicabilidad', 'human-in-the-loop'],
    p1: 'El RGPD y el AI Act exigen información sobre la lógica de las decisiones automatizadas y la posibilidad de impugnarlas ante una persona.',
    p2: 'En la práctica implica poder decir qué datos se usaron, qué criterios pesaron y cómo pedir una revisión humana.',
    analogia: 'No basta con que el semáforo esté en rojo: debes saber por qué y a quién reclamar.',
    ejemplo: 'Una entidad informa al solicitante de qué variables influyeron y le ofrece una revisión humana.',
    negocio: 'Diseña el flujo de salida: explicación, registro y vía de reclamación. No es opcional en alto riesgo.',
    errores: 'Dar una explicación genérica que no permita entender ni impugnar la decisión.',
    faq: [['¿Afecta a mi chatbot?', 'Si solo informa, no. Si decide sobre crédito, empleo o servicios, sí.'], ['¿Qué debo entregar?', 'Criterios, datos relevantes y vía de revisión humana.']],
  },
  {
    t: 'Evaluación de sesgos', full: 'Evaluación de sesgos', slug: 'evaluacion-de-sesgos', cat: 'seguridad-y-etica', nivel: 'avanzado',
    def: 'Proceso de medir si un sistema de IA produce resultados distintos e injustos entre grupos de personas.',
    sin: ['Bias evaluation', 'Pruebas de equidad'], rel: ['sesgo', 'auditoria-de-algoritmos', 'ia-act', 'calidad-de-datos'],
    p1: 'Consiste en dividir los resultados por colectivo y comparar tasas de error, falsos positivos y decisiones. Una precisión global alta puede esconder fallos graves en un grupo pequeño.',
    p2: 'Requiere datos con etiquetas de grupo —tratados con cuidado y base legal— y umbrales de alerta definidos antes de medir.',
    analogia: 'Un test que funciona bien en general pero que falla sistemáticamente a quienes llevan gafas.',
    ejemplo: 'Un sistema de detección revisa sus tasas por franja de edad y corrige el umbral antes de desplegarse.',
    negocio: 'Mide por grupo antes de lanzar. Es la única forma de detectar un sesgo que no se ve en el promedio.',
    errores: 'Mirar solo la precisión global o medir sin suficiente muestra por grupo.',
    faq: [['¿Qué métricas?', 'Tasa de acierto, falsos positivos y falsos negativos por grupo.'], ['¿Es legal tratar datos de grupo?', 'Solo con base jurídica y de forma agregada y segura.']],
  },
  {
    t: 'Datos personales', full: 'Datos personales', slug: 'datos-personales', cat: 'seguridad-y-etica', nivel: 'basico',
    def: 'Cualquier información que permite identificar o hacer identificable a una persona, directa o indirectamente.',
    sin: ['Datos de carácter personal', 'Personal data'], rel: ['rgpd', 'privacidad', 'anonimizacion', 'gobernanza-de-datos'],
    p1: 'Incluye nombre, email, IP, voz, imágenes o identificadores. El RGPD los protege y exige base legal para tratarlos.',
    p2: 'En IA, un texto aparentemente anónimo puede contener datos personales. Por eso hay que revisar entradas y salidas del modelo.',
    analogia: 'Una dirección puede parecer inocua, pero si va con el nombre deja de ser anónima.',
    ejemplo: 'Un asistente de soporte evita pedir el DNI en el chat y usa un identificador opaco de ticket.',
    negocio: 'Minimiza: pide solo lo que necesitas y no lo envíes a un proveedor sin contrato y garantías.',
    errores: 'Creer que sin nombre ya no es dato personal o pegar conversaciones con clientes en herramientas públicas.',
    faq: [['¿La IP es dato personal?', 'Sí, en la UE se considera identificable.'], ['¿Y una imagen?', 'Sí si permite reconocer a la persona.']],
  },
];
