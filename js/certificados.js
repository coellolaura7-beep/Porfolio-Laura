/*
 * CERTIFICACIONES
 * ───────────────
 * Las tarjetas y las fichas de detalle se generan a partir de esta lista.
 *
 * CÓMO AÑADIR EL DOCUMENTO ORIGINAL DE UNA CERTIFICACIÓN
 *  1. Copia el archivo en la carpeta «certificates/» con un nombre descriptivo,
 *     por ejemplo «microbiologia-leche.pdf» o «prevencion-riesgos-laborales.jpg».
 *  2. Rellena su campo «documento»:
 *       documento: { archivo: 'certificates/microbiologia-leche.pdf', tipo: 'pdf' },
 *     Para imágenes (JPG, PNG o WebP) usa  tipo: 'imagen'.
 *  3. Completa «entidad», «fecha» y «duracion» con lo que figure en el documento.
 *     Lo que quede en null aparece como «Pendiente de confirmar».
 *
 * CÓMO AÑADIR UNA CERTIFICACIÓN NUEVA
 *  Copia uno de los bloques { ... } de la lista y cambia su «id» (sin espacios
 *  ni tildes; se usa en el enlace directo: index.html#certificado-<id>).
 */
const CERTIFICADOS = [
  {
    id: 'microbiologia-leche',
    titulo: 'Microbiología de la Leche',
    subtitulo: null,
    area: 'Microbiología y productos lácteos',
    resumen:
      'Análisis microbiológico de la leche y los productos lácteos, con atención a los microorganismos relevantes para su calidad y seguridad.',
    descripcion:
      'Formación especializada en el análisis microbiológico de la leche y los productos lácteos, con especial atención a la detección y el control de microorganismos relevantes para la calidad y la seguridad alimentaria.',
    // Temario del curso, si se conoce. Vacío = no se muestra.
    contenidos: [],
    competencias: [
      'Microbiología láctea',
      'Técnicas de cultivo microbiológico',
      'Procedimientos asépticos',
      'Interpretación de resultados analíticos',
      'Higiene y seguridad alimentaria',
      'Control microbiológico de muestras',
    ],
    entidad: 'Aula de Produtos Lácteos, Lugo',
    fuenteEntidad: 'según el CV',
    fecha: 'Abril de 2024',
    duracion: '1 mes',
    documento: null,
  },
  {
    id: 'higiene-appcc-industria-lactea',
    titulo: 'Higiene y APPCC en la Industria Láctea',
    subtitulo: null,
    area: 'Seguridad alimentaria',
    resumen:
      'Higiene en la industria láctea y sistema APPCC (Análisis de Peligros y Puntos de Control Crítico) para garantizar la seguridad de los productos.',
    descripcion:
      'Formación sobre las prácticas de higiene en la industria láctea y el sistema APPCC (Análisis de Peligros y Puntos de Control Crítico), orientado a identificar los peligros para la seguridad alimentaria y a controlarlos en los puntos críticos del proceso.',
    contenidos: [],
    competencias: [
      'Prácticas de higiene en la industria láctea',
      'Sistema APPCC',
      'Identificación de peligros alimentarios',
      'Puntos de control crítico',
      'Seguridad alimentaria',
    ],
    entidad: 'Aula de Produtos Lácteos, Lugo',
    fuenteEntidad: null,
    fecha: 'Abril de 2024',
    duracion: null,
    documento: null,
  },
  {
    id: 'prevencion-riesgos-laborales',
    titulo: 'Prevención de Riesgos Laborales',
    subtitulo: 'Aplicada al entorno de laboratorio industrial',
    area: 'Seguridad laboral',
    resumen:
      'Prevención de riesgos y medidas de seguridad en el laboratorio industrial, entendidas como parte del procedimiento de trabajo y del control de calidad.',
    descripcion:
      'Formación orientada a la prevención de riesgos y la aplicación de medidas de seguridad en entornos de laboratorio industrial, integrando la seguridad como parte fundamental de los procedimientos de trabajo y del control de calidad.',
    contenidos: [],
    competencias: [
      'Identificación de riesgos laborales',
      'Uso adecuado de equipos de protección individual',
      'Aplicación de protocolos de prevención',
      'Seguridad industrial',
      'Buenas prácticas de trabajo en laboratorio',
      'Cultura de prevención y seguridad',
    ],
    entidad: 'IES Lucus Augusti, Lugo',
    fuenteEntidad: 'según el CV',
    fecha: 'Septiembre de 2023 – junio de 2025',
    duracion: '2 meses',
    documento: null,
  },
]
