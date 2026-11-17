// Utilidades compartidas por regen-index.js y check-context.js. Sin dependencias. Node >= 16.
'use strict';
const fs = require('fs');
const path = require('path');

const LIMITS = {
  indexLines: 150,
  indexBytes: 12 * 1024,
  indexLineChars: 160,
  summaryChars: 80,
  ownIndexThreshold: 25,     // > N secciones ## → una línea en INDEX + índice propio en el doc
  aiRulesBytes: 6 * 1024,    // docs/05-ai-rules.md
  workingStateLines: 60,     // docs/09-working-state.md
  moduleAgentsLines: 40,     // <modulo>/AGENTS.md
  agentsBytes: 11 * 1024,    // orientación total ≤ 6k tokens: AGENTS ≤ 3k + INDEX ≤ 3k + 09 ≤ 0,5k
  orientationTokens: 6000,   // AGENTS + INDEX + 09
  bytesPerToken: 3.7,
};

const CANONICAL = ['README.md', '00-repo-map.md', '01-context.md', '02-architecture.md', '03-setup.md',
  '04-conventions.md', '05-ai-rules.md', '06-decisions.md', '07-changelog.md', '08-known-issues.md', '09-working-state.md', 'db-schema.md'];
const INDEX_FILES = ['INDEX.md', 'INDEX-anexos.md'];
// Modo huella externa: lo que nunca puede aparecer en el repositorio de la organización.
const FORBIDDEN_PATHS = [/^AGENTS\.md$/i, /^CLAUDE(\.local)?\.md$/i, /^GEMINI\.md$/i, /(^|\/)\.ai\//, /(^|\/)\.claude\//, /(^|\/)\.codex\//, /(^|\/)\.gemini\//,
  /(^|\/)\.cursor(rules|\/)/, /copilot-instructions\.md$/i, /^DESIGN\.md$/, /^PRODUCT\.md$/, /(^|\/)docs\/INDEX(-anexos)?\.md$/, /(^|\/)docs\/09-working-state\.md$/,
  /(^|\/)docs\/05-ai-rules\.md$/, /(^|\/)docs\/changelog\//, /(^|\/)\.impeccable\//];
const AI_MARKERS = /(?:\b|(?=\.ai\/rules))(Claude|Codex|Gemini|Copilot|ChatGPT|OpenAI|Anthropic|Co-Authored-By|Generated with|AI[- ]generated|agente IA|agentes IA|asistido por IA|AI-assisted|prompt de IA|LLM|prompt engineering|\.ai\/rules|ai-protocol|working-state|regen-index|check-context)\b/i;

// Secretos: patrones que nunca deberían aparecer en código, docs ni config versionada. Los valores se redactan al reportar.
const SECRET_PATTERNS = [
  { name: 'cadena de conexión con contraseña', rx: /(Server|Data Source)\s*=[^;\n]+;[^\n]*(?:Password|Pwd)\s*=\s*([^;\s"']{3,})/i },
  { name: 'password/secret/token asignado', rx: /\b(password|passwd|pwd|secret|client_secret|api[_-]?key|apikey|access[_-]?token|auth[_-]?token|private[_-]?key)\b\s*["']?\s*[:=]\s*["']?([^\s"',;<>{}$\[\]|]{8,})/i },
  { name: 'clave de Azure Storage', rx: /AccountKey\s*=\s*[A-Za-z0-9+/=]{40,}/ },
  { name: 'token JWT', rx: /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/ },
  { name: 'clave privada', rx: /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { name: 'PAT de Azure DevOps / GitHub', rx: /\b(ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/ },
  { name: 'PAT con contexto de credencial', rx: /\b(pat|token|secret|key|auth)\b[^\r\n]{0,40}?\b([A-Za-z0-9]{40,})\b/i, context: true },
  { name: 'AWS access key', rx: /\bAKIA[0-9A-Z]{16}\b/ },
];
const SECRET_PLACEHOLDER = /^(process\.env|Environment\.|builder\.Configuration|configuration\[|_config|\$env:|os\.environ|Get-|\$\(|<[^>]*>|\*{3,}|x{3,}|tu[-_]|\+QUOTENAME\(@|\[PENDIENTE[^\]]*\]|\$\{[^}]*\}|\{\{[^}]*\}\}|%[A-Z_]+%|your[-_]|changeme|placeholder|example|dummy|secret-name|from[-_ ]?(user-secrets|keyvault|env)|[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\()/i;
const SECRET_SCAN_FILES = /\.(md|json|xml|config|yml|yaml|env|ini|txt|cs|ts|js|sql|ps1|sh|csproj|props|targets)$|^\.env/i;

const IGNORE_DIRS = new Set(['node_modules', 'bin', 'obj', 'dist', '.git', '.angular', 'coverage', 'TestResults', '.vs', '.idea']);

function read(p) { return fs.readFileSync(p, 'utf8'); }
function exists(p) { return fs.existsSync(p); }
function bytes(p) { return exists(p) ? fs.statSync(p).size : 0; }
function tokens(b) { return Math.round(b / LIMITS.bytesPerToken); }
function lines(p) {
  if (!exists(p)) return 0;
  const text = read(p);
  return text ? text.split(/\r?\n/).length - (text.endsWith('\n') ? 1 : 0) : 0;
}
function rel(root, p) { return path.relative(root, p).split(path.sep).join('/'); }

// Slug estilo GitHub: minúsculas, sin acentos ni puntuación, espacios → guiones.
function slug(text) {
  return text.trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[`*~[\]()<>{}|\\'"!?¡¿.,:;#@$%^&+=/]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function stripMd(s) {
  return s.replace(/`([^`]*)`/g, '$1').replace(/\*\*([^*]*)\*\*/g, '$1').replace(/\*([^*]*)\*/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/^(?:[>\-*|]\s*|\d+\.\s+)+/, '').replace(/\|/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(s, n) { return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…'; }

// Secciones ## de un markdown (ignora bloques ``` y encabezados dentro de ellos).
function sections(md) {
  const out = []; let inCode = false; const ls = md.split(/\r?\n/);
  for (let i = 0; i < ls.length; i++) {
    const l = ls[i];
    if (/^\s*```/.test(l)) { inCode = !inCode; continue; }
    if (inCode) continue;
    const m = /^##\s+(.+?)\s*#*\s*$/.exec(l);
    if (!m) continue;
    let summary = '';
    for (let j = i + 1; j < ls.length; j++) {
      const t = ls[j].trim();
      if (!t || /^```/.test(t) || /^<!--/.test(t) || /^#{1,6}\s/.test(t)) { if (/^#{1,6}\s/.test(t)) break; continue; }
      if (/^\|/.test(t)) continue;                 // filas de tabla: no sirven como resumen
      summary = stripMd(t); break;
    }
    out.push({ title: m[1].trim(), anchor: slug(m[1]), summary });
  }
  // Anclas duplicadas: GitHub agrega -1, -2…
  const seen = new Map();
  for (const s of out) { const base = s.anchor; const n = seen.get(base) || 0; if (n) s.anchor = `${base}-${n}`; seen.set(base, n + 1); }
  return out;
}

function h1(md) { const m = /^#\s+(.+)$/m.exec(md); return m ? stripMd(m[1]) : ''; }
function firstPara(md) {
  for (const l of md.split(/\r?\n/)) { const t = l.trim(); if (t && !/^#/.test(t) && !/^```/.test(t) && !/^<!--/.test(t)) return stripMd(t); }
  return '';
}

function walk(dir, out = []) {
  if (!exists(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

// Resuelve raíz del repo y carpeta docs: acepta --root y --docs; por defecto cwd y <root>/docs.
function resolveArgs(argv) {
  const args = { root: process.cwd(), docs: null, write: false, fix: false, strict: false, json: false, mode: 'completa', code: null, sidecar: null, history: 10 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root') args.root = path.resolve(argv[++i]);
    else if (a === '--docs') args.docs = path.resolve(argv[++i]);
    else if (a === '--write-doc-index') args.write = true;
    else if (a === '--fix') args.fix = true;
    else if (a === '--strict') args.strict = true;
    else if (a === '--json') args.json = true;
    else if (a === '--mode') args.mode = argv[++i];
    else if (a === '--code') args.code = path.resolve(argv[++i]);
    else if (a === '--sidecar') args.sidecar = path.resolve(argv[++i]);
    else if (a === '--history') {
      const n = argv[++i];
      if (!/^\d+$/.test(n || '') || !Number.isSafeInteger(Number(n))) throw new Error('--history requiere un entero no negativo.');
      args.history = Number(n);
    }
  }
  if (!args.docs) args.docs = path.join(args.root, 'docs');
  return args;
}

module.exports = { LIMITS, CANONICAL, INDEX_FILES, IGNORE_DIRS, FORBIDDEN_PATHS, AI_MARKERS, SECRET_PATTERNS, SECRET_PLACEHOLDER, SECRET_SCAN_FILES, read, exists, bytes, tokens, lines, rel, slug, stripMd, truncate, sections, h1, firstPara, walk, resolveArgs, fs, path };
