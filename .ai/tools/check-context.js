#!/usr/bin/env node
// Verifica los topes de contexto del protocolo y estima el costo de orientación. Sale con 1 si algo falla.
// Uso:  node .ai/tools/check-context.js [--root <repo>] [--docs <carpeta>] [--json] [--history <n> (default 10)]
//       Modo huella externa (protocolo en sidecar, repo sin rastros):
//       node <sidecar>/.ai/tools/check-context.js --root <sidecar> --docs <sidecar>/docs --mode externa --code <repo>
// Se corre al cerrar cada tarea (70-docs-close §4) y en CI / pre-commit. La salida se pega en la entrega.
'use strict';
const L = require('./lib');
const { LIMITS, CANONICAL, fs, path } = L;

let args;
try { args = L.resolveArgs(process.argv.slice(2)); }
catch (e) { console.error(`ERROR: ${e.message}`); process.exit(1); }
const ROOT = args.root, DOCS = args.docs;
const errors = [], warns = [], rows = [];
const P = (...p) => path.join(...p);

function row(name, file, extra = '') {
  const b = L.bytes(file); rows.push({ name, lines: L.lines(file), bytes: b, tokens: L.tokens(b), extra });
  return b;
}

// 1. AGENTS.md raíz
const agents = P(ROOT, 'AGENTS.md');
if (!L.exists(agents)) errors.push('Falta AGENTS.md en la raíz.');
else {
  const b = row('AGENTS.md', agents);
  if (b > LIMITS.agentsBytes) errors.push(`AGENTS.md supera ${LIMITS.agentsBytes} bytes (${b}).`);
  const md = L.read(agents);
  const profile = (md.split(/^## 0\.[^\n]*\n/m)[1] || '').split(/^## /m)[0];
  const field = (name, raw = false) => {
    const line = profile.split(/\r?\n/).find(l => /^\|/.test(l) && L.stripMd(l.split('|')[1]).split(' (')[0] === name);
    return line ? (raw ? line.split('|')[2] : L.stripMd(line.split('|')[2])) : '';
  };
  const footprintCell = field('Huella', true);
  const footprints = L.stripMd(footprintCell).match(/\b(completa|externa)\b/gi) || [];
  const footprint = footprints.length ? footprints[footprints.length - 1].toLowerCase() : '';
  if (!footprint) errors.push(`AGENTS.md §0: Huella debe ser completa o externa. Celda: ${L.truncate(footprintCell.trim(), 60)}`);
  const code = field('Código');
  if (footprint === 'externa' && (!code || /\[PENDIENTE[^\]]*\]|^No aplica$/i.test(code))) errors.push('AGENTS.md §0: Código es obligatorio con Huella externa (no vacío, [PENDIENTE] ni No aplica).');
  if (/\[PENDIENTE[^\]]*\]/.test(profile)) warns.push('AGENTS.md §0 tiene [PENDIENTE] sin completar.');
  const version = /^Versión del protocolo:\*\*\s*(\d+)\.(\d+)/m.exec(md.replace(/^\s*(?:>\s*)?\*\*/gm, ''));
  if (!version || Number(version[1]) < 5 || (Number(version[1]) === 5 && Number(version[2]) < 2)) warns.push('AGENTS.md no es v5.2+; actualizar desde el template.');
}

// 2. INDEX.md
const index = P(DOCS, 'INDEX.md');
if (!L.exists(index)) errors.push('Falta docs/INDEX.md. Correr: node .ai/tools/regen-index.js');
else {
  const b = row('docs/INDEX.md', index);
  const txt = L.read(index); const ls = txt.split(/\r?\n/);
  const nLines = L.lines(index);
  if (nLines > LIMITS.indexLines) errors.push(`INDEX.md supera ${LIMITS.indexLines} líneas (${nLines}).`);
  if (b > LIMITS.indexBytes) errors.push(`INDEX.md supera ${LIMITS.indexBytes} bytes (${b}).`);
  const links = ls.filter(l => /\]\(/.test(l)).length;
  if (links) errors.push(`INDEX.md contiene ${links} líneas con enlaces Markdown: formato prohibido. Regenerar con regen-index.js.`);
  const long = ls.filter(l => l.length > LIMITS.indexLineChars).length;
  if (long) errors.push(`INDEX.md: ${long} líneas superan ${LIMITS.indexLineChars} caracteres.`);
  if (!/Generado por `node \.ai\/tools\/regen-index\.js`/.test(txt)) warns.push('INDEX.md no fue generado por regen-index.js (o se editó la cabecera).');
  // anclas existentes
  let cur = null, broken = 0;
  for (const l of ls) {
    const f = /^├─ (\S+\.md)/.exec(l) || /^└─ (\S+\.md)/.exec(l);
    if (f) { cur = f[1] === 'DESIGN.md' ? P(ROOT, 'DESIGN.md') : P(DOCS, f[1]); continue; }
    const a = /^│\s+[├└]─ #(\S+)/.exec(l);
    if (a && cur && L.exists(cur)) { const anchors = new Set(L.sections(L.read(cur)).map(s => s.anchor)); if (!anchors.has(a[1])) broken++; }
  }
  if (broken) errors.push(`INDEX.md: ${broken} anclas no existen en su documento. Regenerar.`);
}

// 3. 05, 09, 07, docs grandes, anexos
const ai = P(DOCS, '05-ai-rules.md');
if (L.exists(ai)) { const b = row('docs/05-ai-rules.md', ai); if (b > LIMITS.aiRulesBytes) errors.push(`05-ai-rules.md supera ${LIMITS.aiRulesBytes} bytes (${b}): mover detalle a docs/anexos/ y dejar regla + enlace.`); }
const ws = P(DOCS, '09-working-state.md');
if (!L.exists(ws)) errors.push('Falta docs/09-working-state.md.');
else { row('docs/09-working-state.md', ws); const n = L.lines(ws); if (n > LIMITS.workingStateLines) errors.push(`09-working-state.md supera ${LIMITS.workingStateLines} líneas (${n}).`); }
const cl = P(DOCS, '07-changelog.md');
if (L.exists(cl)) {
  const ls = L.read(cl).split(/\r?\n/).filter(l => /^\d{4}-\d{2}-\d{2}/.test(l));
  const aligned = ls.filter(l => /\S {3,}\S/.test(l)).length;
  const noSep = ls.filter(l => !/ · /.test(l)).length;
  if (aligned) warns.push(`07-changelog.md: ${aligned}/${ls.length} líneas con columnas alineadas (espacios); usar " · " sin alinear.`);
  if (noSep) warns.push(`07-changelog.md: ${noSep}/${ls.length} líneas sin separador " · ".`);
  const noDetail = ls.filter(l => !/→changelog\//.test(l)).length;
  if (noDetail) warns.push(`07-changelog.md: ${noDetail} líneas sin →changelog/<detalle>.`);
  row('docs/07-changelog.md', cl, `${ls.length} cambios`);
}
for (const f of CANONICAL) {
  const p = P(DOCS, f); if (!L.exists(p) || ['07-changelog.md', '09-working-state.md', 'README.md'].includes(f)) continue;
  const md = L.read(p); const n = L.sections(md).length;
  if (n > LIMITS.ownIndexThreshold && !/<!-- INDEX:start -->/.test(md)) errors.push(`${f}: ${n} secciones sin índice propio. Correr regen-index.js --write-doc-index.`);
  if (L.bytes(p) > 25 * 1024) warns.push(`${f}: ${Math.round(L.bytes(p) / 1024)} KB; partir o mover anexos (70-docs-close §3). Mientras tanto, leer solo por ancla.`);
}
const design = P(ROOT, 'DESIGN.md');
if (L.exists(design)) { row('DESIGN.md', design, 'solo por ancla'); if (!/<!-- INDEX:start -->/.test(L.read(design))) errors.push('DESIGN.md sin índice propio. Correr regen-index.js --write-doc-index.'); }
const nonCanon = L.walk(DOCS).filter(p => /\.md$/i.test(p)).filter(p => { const r = L.rel(DOCS, p); const b = path.basename(p); return !(CANONICAL.includes(b) && !r.includes('/')) && !/^INDEX(-anexos)?\.md$/.test(b) && !r.startsWith('changelog/'); });
if (nonCanon.length && !L.exists(P(DOCS, 'INDEX-anexos.md'))) errors.push(`${nonCanon.length} docs no canónicos sin INDEX-anexos.md. Correr regen-index.js.`);

// 4. módulos
for (const p of L.walk(ROOT)) {
  if (path.basename(p) !== 'AGENTS.md' || path.dirname(p) === ROOT) continue;
  const r = L.rel(ROOT, p); if (r.startsWith('.ai/')) continue;
  const n = L.lines(p); if (n > LIMITS.moduleAgentsLines) errors.push(`${r}: ${n} líneas; tope ${LIMITS.moduleAgentsLines}. Mover detalle a /docs.`);
}

// 5. .prettierignore (solo en modo completa: en externa no debe existir el del template en el repo)
const pi = P(ROOT, '.prettierignore');
if (args.mode === 'completa' && L.exists(P(ROOT, 'package.json'))) {
  if (!L.exists(pi)) warns.push('Sin .prettierignore: Prettier va a alinear tablas de AGENTS.md y docs/ (cuesta tokens). Copiar el del template.');
  else { const t = L.read(pi); for (const need of ['AGENTS.md', 'docs', '.ai']) if (!t.split(/\r?\n/).some(l => l.trim().startsWith(need))) warns.push(`.prettierignore no excluye ${need}.`); }
}

// 5b. Modo huella externa: detector de rastros en el repositorio de la organización
if (args.mode === 'externa') {
  const { execFileSync } = require('child_process');
  const CODE = args.code;
  if (!CODE || !L.exists(CODE)) errors.push('Modo externa requiere --code <ruta del repo>.');
  else {
    const git = (...a) => { try { return execFileSync('git', a, { cwd: CODE, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }); } catch (_) { return ''; } };
    const tracked = git('ls-files').split(/\r?\n/).filter(Boolean);
    const staged = git('diff', '--cached', '--name-only').split(/\r?\n/).filter(Boolean);
    const untracked = git('ls-files', '--others', '--exclude-standard').split(/\r?\n/).filter(Boolean);
    const hits = (list, label) => { for (const f of list) if (L.FORBIDDEN_PATHS.some(rx => rx.test(f))) errors.push(`HUELLA (${label}): ${f} no puede estar en el repo.`); };
    hits(tracked, 'rastreado'); hits(staged, 'staged'); hits(untracked, 'sin rastrear en el working copy');
    const added = (txt) => txt.split(/\r?\n/).filter(l => /^\+/.test(l) && !/^\+\+\+/.test(l) && L.AI_MARKERS.test(l));
    const diffHits = added(git('diff', '--cached'));
    if (diffHits.length) errors.push(`HUELLA (diff staged): ${diffHits.length} línea(s) con marcadores de IA.`);
    const branch = git('branch', '--show-current').trim();
    if (L.AI_MARKERS.test(branch)) errors.push(`HUELLA (rama actual): ${branch} contiene marcadores de IA.`);
    if (args.history === 0) warns.push('historial no auditado (--history 0); el working copy y el diff staged sí se revisaron');
    else {
      rows.push({ name: 'HUELLA · historial', lines: '', bytes: '', tokens: '', extra: `se auditan contenido, mensajes y autores de los últimos ${args.history} commits` });
      const recentHits = added(git('log', '-p', '-n', String(args.history), '--format=', '--', '.'));
      if (recentHits.length) errors.push(`HUELLA (historial, últimos ${args.history} commits, contenido): ${recentHits.length} línea(s) con marcadores de IA; no se corrigen sin reescribir el historial.`);
      const log = git('log', '-n', String(args.history), '--format=%B%n%an <%ae>');
      const logHits = log.split(/\r?\n/).filter(l => L.AI_MARKERS.test(l));
      if (logHits.length) errors.push(`HUELLA (historial, mensajes/autores de los últimos ${args.history} commits): ${logHits.length} línea(s); no se corrigen sin reescribir el historial.`);
    }
    const repoDocs = tracked.filter(f => /^docs\//.test(f));
    for (const f of repoDocs) { try { const t = L.read(P(CODE, f)); if (L.AI_MARKERS.test(t)) errors.push(`HUELLA (docs del repo): ${f} menciona IA o el protocolo.`); } catch (_) {} }
    rows.push({ name: `HUELLA · ${CODE}`, lines: '', bytes: tracked.length, tokens: '', extra: `${tracked.length} archivos rastreados · ${staged.length} staged · modo externa` });
  }
}

// 5c. Secretos: en el diff staged y en archivos de config/docs rastreados del repo (ambos modos). Valores redactados.
{
  const { execFileSync } = require('child_process');
  const REPO = args.mode === 'externa' ? args.code : ROOT;
  const git = (...a) => { try { return execFileSync('git', a, { cwd: REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }); } catch (_) { return ''; } };
  const isPlaceholder = (m, file, pattern, line) => {
    const v = m[2] || m[0];
    const contextValue = pattern.context ? line.slice(m.index + m[1].length).replace(/^[\s:="']+/, '') : v;
    const valueAt = m.index + m[0].lastIndexOf(v), before = line.slice(0, valueAt);
    const wrapped = before.endsWith('<') && line[valueAt + v.length] === '>';
    // Las contraseñas literales de las fixtures no se aceptan en código o config de la aplicación.
    const fixture = /(?:^|\/)tests?\//i.test(file) && /^(secreto|secret)$/i.test(v);
    return L.SECRET_PLACEHOLDER.test(v) || L.SECRET_PLACEHOLDER.test(contextValue) || wrapped || /process\.env(?:\.|\[["'])$/.test(before) || fixture;
  };
  const findings = [];
  const scanText = (label, txt, onlyAdded) => {
    const ls = txt.split(/\r?\n/);
    let file = label;
    for (let i = 0; i < ls.length; i++) {
      let l = ls[i];
      if (onlyAdded && /^\+\+\+ b\//.test(l)) { file = l.slice(6); continue; }
      if (onlyAdded) { if (!/^\+/.test(l) || /^\+\+\+/.test(l)) continue; l = l.slice(1); }
      for (const p of L.SECRET_PATTERNS) { const m = p.rx.exec(l); if (m && !isPlaceholder(m, file, p, l)) { findings.push(`${label}${onlyAdded ? '' : ':' + (i + 1)} · ${p.name} · [REDACTADO]`); break; } }
    }
  };
  if (REPO && L.exists(REPO)) {
    scanText('diff staged', git('diff', '--cached'), true);
    const tracked = git('ls-files').split(/\r?\n/).filter(f => f && L.SECRET_SCAN_FILES.test(f) && !/(^|\/)(bin|obj|node_modules|dist|\.ai)\//.test(f) && !/^(AGENTS|CLAUDE|GEMINI)\.md$/.test(f));
    for (const f of tracked) { try { const st = fs.statSync(P(REPO, f)); if (st.size > 2 * 1024 * 1024) continue; scanText(f, L.read(P(REPO, f)), false); } catch (_) {} }
  }
  // Modo externa: también el sidecar (docs del protocolo) porque viaja a otras máquinas
  if (args.mode === 'externa') for (const f of L.walk(DOCS).filter(p => /\.md$/.test(p))) scanText(L.rel(ROOT, f), L.read(f), false);
  for (const f of findings.slice(0, 30)) errors.push(`SECRETO: ${f}`);
  if (findings.length > 30) errors.push(`SECRETO: … ${findings.length - 30} hallazgo(s) más.`);
}

// 6. orientación
const orient = L.tokens(L.bytes(agents) + L.bytes(index) + L.bytes(ws));
rows.push({ name: 'ORIENTACIÓN (AGENTS + INDEX + 09)', lines: '', bytes: L.bytes(agents) + L.bytes(index) + L.bytes(ws), tokens: orient, extra: `tope ${LIMITS.orientationTokens}` });
if (orient > LIMITS.orientationTokens) errors.push(`Orientación ≈ ${orient} tokens; tope ${LIMITS.orientationTokens}.`);

// salida
if (args.json) { console.log(JSON.stringify({ rows, warns, errors }, null, 2)); }
else {
  console.log('Archivo | líneas | bytes | ≈tokens | nota');
  for (const r of rows) console.log(`${r.name} | ${r.lines} | ${r.bytes} | ${r.tokens} | ${r.extra || ''}`);
  for (const w of warns) console.log(`AVISO: ${w}`);
  for (const e of errors) console.log(`ERROR: ${e}`);
  console.log(errors.length ? `check-context: ${errors.length} error(es), ${warns.length} aviso(s).` : `check-context: OK (${warns.length} aviso(s)).`);
}
process.exit(errors.length ? 1 : 0);
