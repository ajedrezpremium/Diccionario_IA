import { SITE, urlAbsoluta } from './site';

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.agency,
    url: SITE.agencyUrl,
    founder: { '@type': 'Person', name: SITE.author },
    description:
      'Agencia especializada en agentes de inteligencia artificial permanentes para pymes.',
    sameAs: [SITE.agencyUrl],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'es',
    description: SITE.description,
    publisher: { '@type': 'Organization', name: SITE.agency, url: SITE.agencyUrl },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function definedTermSetJsonLd(
  terminos: Array<{ termino: string; slug: string; definicionCorta: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: `${SITE.name} — Glosario de inteligencia artificial`,
    url: SITE.url,
    inLanguage: 'es',
    description: SITE.description,
    hasDefinedTerm: terminos.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.termino,
      description: t.definicionCorta,
      url: urlAbsoluta(`/que-es/${t.slug}`),
    })),
  };
}

export function definedTermJsonLd(t: {
  termino: string;
  definicionCorta: string;
  slug: string;
  sinonimos?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.termino,
    description: t.definicionCorta,
    url: urlAbsoluta(`/que-es/${t.slug}`),
    inLanguage: 'es',
    ...(t.sinonimos?.length ? { alternateName: t.sinonimos } : {}),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `${SITE.name} — Glosario de IA`,
      url: SITE.url,
    },
  };
}

export function faqJsonLd(faq: Array<{ p: string; r: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: urlAbsoluta(item.path),
    })),
  };
}

export function articleJsonLd(t: {
  termino: string;
  slug: string;
  definicionCorta: string;
  actualizado: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Qué es ${t.termino} en IA`,
    description: t.definicionCorta,
    dateModified: t.actualizado.toISOString(),
    inLanguage: 'es',
    mainEntityOfPage: urlAbsoluta(`/que-es/${t.slug}`),
    author: { '@type': 'Person', name: SITE.author },
    publisher: { '@type': 'Organization', name: SITE.agency },
  };
}
