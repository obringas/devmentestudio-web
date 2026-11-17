#!/usr/bin/env node
// Regenera docs/INDEX.md (árbol de secciones) y docs/INDEX-anexos.md a partir de los encabezados reales.
// Uso:  node .ai/tools/regen-index.js [--root <repo>] [--docs <carpeta>] [--write-doc-index]
//   --write-doc-index  inserta/actualiza la tabla índice propia (entre <!-- INDEX:start --> y <!-- INDEX:end -->)
//                      en los docs con más de 25 secciones y en DESIGN.md.
// El agente NUNCA escribe INDEX.md a mano: corre este script. Sale con código 1 si el índice excede los topes.
'use strict';
const L = require('./lib');
const { LIMITS, CANONICAL, INDEX_FILES, fs, path } = L;

const args = L.resolveArgs(process.argv.slice(2));
const ROOT = args.root, DOCS = args.docs;
if (!L.exists(DOCS)) { console.error(`No existe la carpeta docs: ${DOCS}`); process.exit(2); }

const out = [];
const warnings = [];

out.push('# INDEX — Árbol de contexto');
out.push('');
out.push('> Generado por `node .ai/tools/regen-index.js`. **No editar a mano**: regenerar al cerrar cada tarea que cambie una sección.');
out.push('> Una línea por sección `##` (ancla + resumen ≤ 80). Leer el índice, abrir **solo la sección** necesaria por ancla, nunca el archivo entero.');
out.push(`> Topes: ≤ ${LIMITS.indexLines} líneas, ≤ ${LIMITS.indexBytes / 1024} KB. Docs no canónicos en \`INDEX-anexos.md\`. Docs con > ${LIMITS.ownIndexThreshold} secciones: una línea acá + índice propio.`);
out.push('');
out.push('```text');
out.push('docs/');

// ---- docs canónicos ----
const canon = CANONICAL.filter(f => L.exists(path.join(DOCS, f)));
const designPath = path.join(ROOT, 'DESIGN.md');
const hasDesign = L.exists(designPath);
const entries = canon.map(f => ({ name: f, file: path.join(DOCS, f) }));
if (hasDesign) entries.push({ name: 'DESIGN.md', file: designPath, root: true });

function docIndexBlock(secs) {
  const rows = ['<!-- INDEX:start -->', '| Sección | Resumen |', '|---|---|'];
  for (const s of secs) rows.push(`| [${L.truncate(s.title, 60)}](#${s.anchor}) | ${L.truncate(s.summary || '', LIMITS.summaryChars)} |`);
  rows.push('<!-- INDEX:end -->');
  return rows.join('\n');
}

function ensureDocIndex(file, secs) {
  if (!args.write) return false;
  let md = L.read(file);
  const block = docIndexBlock(secs);
  if (/<!-- INDEX:start -->[\s\S]*?<!-- INDEX:end -->/.test(md)) {
    md = md.replace(/<!-- INDEX:start -->[\s\S]*?<!-- INDEX:end -->/, block);
  } else {
    // después del H1 y de las líneas de cita (>) que lo siguen
    const ls = md.split(/\r?\n/); let i = 0;
    while (i < ls.length && !/^#\s/.test(ls[i])) i++;
    i++; while (i < ls.length && (/^>/.test(ls[i]) || ls[i].trim() === '')) i++;
    ls.splice(i, 0, '', block, '');
    md = ls.join('\n');
  }
  fs.writeFileSync(file, md, 'utf8');
  return true;
}

const anexoFamilies = new Map(); // familia -> [{path, summary}]
const modules = [];

entries.forEach((e) => {
  const md = L.read(e.file);
  const secs = L.sections(md);
  const label = e.root ? `${e.name}` : e.name;
  if (e.name === '07-changelog.md') {
    out.push(`├─ ${label} log compacto · 1 línea por cambio; detalle en changelog/`);
    return;
  }
  if (e.name === '09-working-state.md') {
    const st = /\*\*Estado:\*\*\s*([^\n]*)/.exec(md); const tarea = /\*\*Pedido original:\*\*\s*([^\n]*)/.exec(md);
    out.push(`├─ ${label} ${L.truncate(L.stripMd((st ? st[1] : '') + ' · ' + (tarea ? tarea[1] : 'sin tarea')), LIMITS.summaryChars)}`);
    return;
  }
  if (secs.length > LIMITS.ownIndexThreshold || e.root) {
    const hasOwn = /<!-- INDEX:start -->/.test(md);
    const wrote = ensureDocIndex(e.file, secs);
    const note = secs.length > LIMITS.ownIndexThreshold ? `${secs.length} secciones · índice propio${hasOwn || wrote ? '' : ' [FALTA: correr con --write-doc-index]'}` : `${secs.length} secciones · leer por ancla, nunca entero`;
    if (!hasOwn && !wrote && secs.length > LIMITS.ownIndexThreshold) warnings.push(`${e.name}: ${secs.length} secciones y sin índice propio. Correr con --write-doc-index.`);
    out.push(`├─ ${label} ${note}`);
    return;
  }
  out.push(`├─ ${label}`);
  secs.forEach((s, i) => {
    const conn = i === secs.length - 1 ? '└─' : '├─';
    out.push(`│  ${conn} #${s.anchor} ${L.truncate(s.summary || s.title, LIMITS.summaryChars)}`);
  });
});

// ---- no canónicos → anexos ----
const all = L.walk(DOCS).filter(p => /\.md$/i.test(p));
for (const p of all) {
  const r = L.rel(DOCS, p);
  const base = path.basename(p);
  if (CANONICAL.includes(base) && !r.includes('/')) continue;
  if (INDEX_FILES.includes(base) && !r.includes('/')) continue;
  if (r.startsWith('changelog/')) continue; // detalle del changelog: nunca se indexa
  const fam = r.includes('/') ? r.split('/')[0] : 'otros';
  const md = L.read(p);
  const summary = L.truncate(L.h1(md) || L.firstPara(md) || base, LIMITS.summaryChars);
  if (!anexoFamilies.has(fam)) anexoFamilies.set(fam, []);
  anexoFamilies.get(fam).push({ path: r, summary });
}

// ---- módulos con AGENTS.md propio ----
for (const p of L.walk(ROOT)) {
  if (path.basename(p) !== 'AGENTS.md') continue;
  if (path.dirname(p) === ROOT) continue;
  const r = L.rel(ROOT, p);
  if (r.startsWith('.ai/')) continue;
  const md = L.read(p);
  modules.push({ path: r, summary: L.truncate(L.firstPara(md.replace(/^#.*$/m, '')) || L.h1(md), LIMITS.summaryChars), lines: md.split(/\r?\n/).length });
}

if (anexoFamilies.size) {
  out.push(`└─ anexos → INDEX-anexos.md`);
  const fams = [...anexoFamilies.keys()].sort();
  fams.forEach((f, i) => {
    const conn = i === fams.length - 1 ? '└─' : '├─';
    out.push(`   ${conn} ${f} (${anexoFamilies.get(f).length}) #${L.slug(f)}`);
  });
} else {
  // cerrar el árbol: convertir el último ├─ de primer nivel en └─
  for (let i = out.length - 1; i >= 0; i--) if (out[i].startsWith('├─ ')) { out[i] = '└─ ' + out[i].slice(3); break; }
}
out.push('```');

if (modules.length) {
  out.push('');
  out.push('## Módulos con contexto propio');
  out.push('');
  out.push('```text');
  modules.forEach((m, i) => out.push(`${i === modules.length - 1 ? '└─' : '├─'} ${m.path} ${m.summary}${m.lines > LIMITS.moduleAgentsLines ? ` [EXCEDE ${LIMITS.moduleAgentsLines} líneas: ${m.lines}]` : ''}`));
  out.push('```');
}

const indexText = out.join('\n') + '\n';
fs.writeFileSync(path.join(DOCS, 'INDEX.md'), indexText, 'utf8');

// ---- INDEX-anexos.md ----
if (anexoFamilies.size) {
  const a = ['# INDEX-anexos — Documentos no canónicos', '',
    '> Generado por `node .ai/tools/regen-index.js`. Se abre **solo** cuando `INDEX.md` lo señala o la tarea lo pide. No se lee en la orientación de la sesión.', ''];
  for (const f of [...anexoFamilies.keys()].sort()) {
    a.push(`## ${f}`); a.push('');
    for (const d of anexoFamilies.get(f).sort((x, y) => x.path.localeCompare(y.path))) a.push(`${d.path} ${d.summary}`);
    a.push('');
  }
  fs.writeFileSync(path.join(DOCS, 'INDEX-anexos.md'), a.join('\n'), 'utf8');
}

// ---- reporte y topes ----
const nLines = indexText.split('\n').length - 1, nBytes = Buffer.byteLength(indexText, 'utf8');
const longLines = indexText.split('\n').filter(l => l.length > LIMITS.indexLineChars).length;
console.log(`INDEX.md: ${nLines} líneas · ${nBytes} bytes · ≈${L.tokens(nBytes)} tokens · canónicos ${entries.length} · anexos ${[...anexoFamilies.values()].reduce((n, v) => n + v.length, 0)} en ${anexoFamilies.size} familias · módulos ${modules.length}`);
for (const w of warnings) console.log(`AVISO: ${w}`);
let fail = false;
if (nLines > LIMITS.indexLines) { console.error(`ERROR: INDEX.md supera ${LIMITS.indexLines} líneas (${nLines}).`); fail = true; }
if (nBytes > LIMITS.indexBytes) { console.error(`ERROR: INDEX.md supera ${LIMITS.indexBytes} bytes (${nBytes}).`); fail = true; }
if (longLines) { console.error(`ERROR: ${longLines} líneas superan ${LIMITS.indexLineChars} caracteres.`); fail = true; }
process.exit(fail ? 1 : 0);
