const r = await fetch('https://diccionario.ajedrezpremium.com/');
const t = await r.text();
const metas = [...t.matchAll(/<meta\s+[^>]*>/g)].map(m => m[0]).filter(m => /og:|twitter:|description|title/i.test(m));
console.log(r.status);
console.log(metas.join('\n'));
