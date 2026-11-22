const FECHA = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatearFecha(fecha: Date | string): string {
  const d = fecha instanceof Date ? fecha : new Date(fecha);
  if (Number.isNaN(d.getTime())) return '';
  return FECHA.format(d);
}

export function minutosLectura(texto: string): number {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(2, Math.round(palabras / 220));
}
