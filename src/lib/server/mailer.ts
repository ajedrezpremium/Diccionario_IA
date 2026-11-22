import { SITE, urlAbsoluta } from '../site';

function plantillaLibro(): string {
  const enlace = urlAbsoluta(SITE.pdf);
  return `<div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#17181d;line-height:1.6">
  <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#5d616b;margin:0 0 8px">Diccionario IA · ${SITE.version}</p>
  <h1 style="font-family:Georgia,serif;font-size:26px;line-height:1.25;margin:0 0 16px">Tu libro ya está listo</h1>
  <p>Gracias por pedir el <strong>Diccionario de IA para tu negocio</strong>. Dentro encontrarás los 100 términos explicados en español, con ejemplos reales y una guía para detectar qué puedes automatizar primero.</p>
  <p style="margin:24px 0">
    <a href="${enlace}" style="background:#3f3aa8;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;display:inline-block">Descargar el PDF</a>
  </p>
  <p style="font-size:14px;color:#5d616b">Si el botón no funciona, copia este enlace:<br><a href="${enlace}" style="color:#3f3aa8">${enlace}</a></p>
  <hr style="border:none;border-top:1px solid #e2ddd2;margin:24px 0">
  <p style="font-size:14px;color:#5d616b">¿Quieres aplicar esto a tu negocio? Responde a este correo y lo vemos. Sin compromiso.</p>
  <p style="font-size:13px;color:#5d616b">Roberto Páramos · Chess AI Agency<br>${SITE.agencyUrl}</p>
  <p style="font-size:12px;color:#8a8f99">Recibes este correo porque solicitaste el libro en ${SITE.url}. Puedes darte de baja respondiendo con la palabra BAJA.</p>
</div>`;
}

export async function enviarLibroPorEmail(email: string): Promise<{ ok: boolean; motivo?: string }> {
  const usuario = process.env.GMAIL_USER || '';
  const password = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_API_KEY || '';
  if (!usuario || !password) return { ok: false, motivo: 'gmail_no_configurado' };

  try {
    const nodemailer = (await import('nodemailer')).default;
    const transporte = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: usuario, pass: password },
    });

    await transporte.sendMail({
      from: `"${process.env.GMAIL_FROM_NAME || SITE.name}" <${usuario}>`,
      to: email,
      subject: 'Tu Diccionario de IA en PDF (100 términos)',
      text: `Gracias por pedir el Diccionario de IA. Descárgalo aquí: ${urlAbsoluta(SITE.pdf)}\n\n¿Quieres aplicarlo a tu negocio? Responde a este correo.\n\nChess AI Agency · ${SITE.agencyUrl}`,
      html: plantillaLibro(),
    });

    return { ok: true };
  } catch (error) {
    console.error('[mailer] error al enviar el libro', error);
    return { ok: false, motivo: 'error_envio' };
  }
}

export async function avisarNuevoLead(email: string, origen: string): Promise<void> {
  const usuario = process.env.GMAIL_USER || '';
  const password = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_API_KEY || '';
  const destino = process.env.LEADS_NOTIFY_EMAIL || usuario;
  if (!usuario || !password || !destino) return;

  try {
    const nodemailer = (await import('nodemailer')).default;
    const transporte = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: usuario, pass: password },
    });

    await transporte.sendMail({
      from: `"${SITE.name}" <${usuario}>`,
      to: destino,
      subject: `Nuevo lead en el diccionario: ${email}`,
      text: `Email: ${email}\nOrigen: ${origen}\nFecha: ${new Date().toISOString()}\n\nConsentimiento RGPD registrado.`,
    });
  } catch (error) {
    console.error('[mailer] no se pudo avisar del lead', error);
  }
}
