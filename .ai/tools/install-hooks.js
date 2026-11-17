#!/usr/bin/env node
// Instala .git/hooks/pre-commit que corre check-context.js. Idempotente. Uso: node .ai/tools/install-hooks.js
'use strict';
const fs = require('fs'), path = require('path');
// Modo huella externa: node <sidecar>/.ai/tools/install-hooks.js --code <repo> --sidecar <sidecar>
const argv = process.argv.slice(2); const get = (k) => { const i = argv.indexOf(k); return i >= 0 ? path.resolve(argv[i + 1]) : null; };
const code = get('--code'), sidecar = get('--sidecar');
const root = code || process.cwd();
const hooksDir = path.join(root, '.git', 'hooks');
if (!fs.existsSync(path.join(root, '.git'))) { console.error('No es la raíz de un repositorio git.'); process.exit(2); }
const cmd = sidecar
  ? `node "${path.join(sidecar, '.ai', 'tools', 'check-context.js').replace(/\\/g, '/')}" --root "${sidecar.replace(/\\/g, '/')}" --docs "${path.join(sidecar, 'docs').replace(/\\/g, '/')}" --mode externa --code "${root.replace(/\\/g, '/')}"`
  : 'node .ai/tools/check-context.js';
fs.mkdirSync(hooksDir, { recursive: true });
const hook = path.join(hooksDir, 'pre-commit');
const marker = '# ai-protocol:check-context';
const body = `#!/bin/sh\n${marker}\n${cmd} || { echo "pre-commit: control del protocolo falló (ver arriba). Corregir antes de commitear."; exit 1; }\n`;
if (fs.existsSync(hook)) {
  const cur = fs.readFileSync(hook, 'utf8');
  if (cur.includes(marker)) console.log('pre-commit ya instalado.');
  else fs.writeFileSync(hook, cur.replace(/\s*$/, '\n') + `\n${marker}\n${cmd} || exit 1\n`, 'utf8');
} else { fs.writeFileSync(hook, body, 'utf8'); console.log(`pre-commit instalado en ${path.relative(root, hook)}.`); }
try { fs.chmodSync(hook, 0o755); } catch (_) {}

// Modo huella externa: segunda red. .git/info/exclude es local (nunca se commitea, no deja rastro) e impide que git add tome
// por error un archivo del protocolo si alguien lo copia dentro del repo.
if (sidecar) {
  const infoDir = path.join(root, '.git', 'info'); fs.mkdirSync(infoDir, { recursive: true });
  const exclude = path.join(infoDir, 'exclude');
  const marker2 = '# ai-protocol:exclude';
  const names = ['AGENTS.md', 'CLAUDE.md', 'CLAUDE.local.md', 'GEMINI.md', '.ai/', '.claude/', '.codex/', '.gemini/', '.cursor/', '.cursorrules', 'copilot-instructions.md', 'DESIGN.md', 'PRODUCT.md', '.impeccable/', 'docs/INDEX.md', 'docs/INDEX-anexos.md', 'docs/09-working-state.md', 'docs/05-ai-rules.md', 'docs/changelog/', 'docs/db-schema.md'];
  const cur = fs.existsSync(exclude) ? fs.readFileSync(exclude, 'utf8') : '';
  if (!cur.includes(marker2)) {
    fs.writeFileSync(exclude, cur.replace(/\s*$/, '\n') + `\n${marker2}\n${names.join('\n')}\n`, 'utf8');
    console.log(`.git/info/exclude actualizado (${names.length} patrones; local, no versionado).`);
  } else console.log('.git/info/exclude ya tenía los patrones.');
  console.log(`Patrones aplicados en .git/info/exclude:\n${names.join('\n')}`);
  console.log('Revisá que ninguno tape documentación legítima del repo.');
}
