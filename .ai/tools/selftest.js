#!/usr/bin/env node
// Pruebas aisladas del protocolo. Sin dependencias ni acceso a servidores. Node >= 16.
'use strict';
const fs = require('fs'), path = require('path'), os = require('os');
const { spawnSync } = require('child_process');
const L = require('./lib');
const base = path.join(os.tmpdir(), `proto-selftest-${process.pid}`);
const root = path.join(base, 'protocol'), docs = path.join(root, 'docs'), code = path.join(base, 'code');
let passed = 0, failed = 0, skipped = 0, created = false;
const gitAvailable = !spawnSync('git', ['--version'], { stdio: 'ignore' }).error;
const assert = (ok, message) => { if (!ok) throw new Error(message); };
const run = (tool, args = [], env = process.env) => {
  const r = spawnSync(process.execPath, [path.join(__dirname, tool), '--root', root, ...args], { encoding: 'utf8', env, timeout: 20000 });
  assert(!r.error, `${tool}: ${r.error && r.error.message}`);
  return { status: r.status, output: (r.stdout || '') + (r.stderr || '') };
};
const git = (...args) => {
  const r = spawnSync('git', args, { cwd: code, encoding: 'utf8' });
  assert(!r.error && r.status === 0, `git ${args[0]} falló`);
  return r.stdout;
};
const check = (args = []) => run('check-context.js', args);
const external = (args = []) => check(['--mode', 'externa', '--code', code, ...args]);
const replaceFile = (file, text, fn) => {
  const old = fs.existsSync(file) ? fs.readFileSync(file) : null;
  try { fs.writeFileSync(file, text); fn(); }
  finally { if (old === null) fs.unlinkSync(file); else fs.writeFileSync(file, old); }
};
const reject = (r, cause) => assert(r.status === 1 && r.output.includes(cause), `se esperaba exit 1 y causa ${cause}`);
function test(name, fn, needsGit = false) {
  if (needsGit && !gitAvailable) { skipped++; console.log(`SKIP ${name} (git no disponible)`); return; }
  try { fn(); passed++; console.log(`PASS ${name}`); }
  catch (e) { failed++; console.log(`FAIL ${name}: ${e.message}`); }
}
function copyDocs(source, target) {
  fs.mkdirSync(target);
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name), to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDocs(from, to); else fs.copyFileSync(from, to);
  }
}

try {
  fs.mkdirSync(base); created = true;
  fs.mkdirSync(root); fs.mkdirSync(code);
  copyDocs(path.join(__dirname, '..', 'templates', 'docs'), docs);
  const agents = '# Fixture\n> **Versión del protocolo:** 5.7.0\n## 0. Perfil del proyecto\n| Campo | Valor |\n|---|---|\n| **Huella** | `completa` |\n| Código (solo `externa`) | No aplica |\n## 1. Rol\nFixture canónico.\n';
  const agentsFile = path.join(root, 'AGENTS.md'), index = path.join(docs, 'INDEX.md');
  fs.writeFileSync(agentsFile, agents);
  if (gitAvailable) {
    git('-c', 'init.templateDir=', 'init', '-q'); git('symbolic-ref', 'HEAD', 'refs/heads/main');
    git('config', 'user.name', 'Fixture'); git('config', 'user.email', 'fixture@example.invalid');
    git('config', 'commit.gpgsign', 'false'); git('config', 'core.hooksPath', path.join(base, 'hooks'));
    fs.mkdirSync(path.join(base, 'hooks'));
  } else console.log('AVISO: git no disponible; los casos 9-10 se omiten.');

  test('1 regen-index sin enlaces, alineación ni excesos', () => {
    assert(run('regen-index.js').status === 0, 'regen-index falló');
    const txt = fs.readFileSync(index, 'utf8');
    assert(!txt.includes('](') && L.lines(index) <= 150 && Buffer.byteLength(txt) <= 12 * 1024, 'índice fuera de formato/tope');
    assert(txt.split('\n').every(l => l.length <= 160 && !/^│  [├└]─ #\S+ {2,}/.test(l)), 'línea larga o columnas alineadas');
  });
  test('2 check-context canónico y versiones numéricas', () => {
    assert(check().status === 0, 'fixture canónico rechazado');
    for (const version of ['5.2', '5.10', '6.0']) replaceFile(agentsFile, agents.replace('5.7.0', version), () => {
      const r = check(); assert(r.status === 0 && !r.output.includes('no es v5.2+'), `versión ${version} rechazada`);
    });
    replaceFile(agentsFile, agents.replace('5.7.0', '5.1'), () => assert(check().output.includes('no es v5.2+'), 'falta aviso de versión vieja'));
  });
  test('3 INDEX de 151 líneas', () => {
    for (const end of ['', '\n']) replaceFile(index, Array(151).fill('línea').join('\n') + end, () => reject(check(), 'INDEX.md supera 150 líneas (151)'));
  });
  test('4 INDEX con enlaces Markdown', () => {
    replaceFile(index, '[texto](https://example.invalid)\n', () => reject(check(), 'enlaces Markdown'));
  });
  test('5 05-ai-rules mayor a 6 KB', () => {
    replaceFile(path.join(docs, '05-ai-rules.md'), 'x'.repeat(7 * 1024), () => reject(check(), '05-ai-rules.md supera 6144 bytes'));
  });
  test('6 Huella pendiente/inválida y Código externo obligatorio', () => {
    for (const value of ['[PENDIENTE]', 'otra', '']) replaceFile(agentsFile, agents.replace('`completa`', value), () => reject(check(), 'Huella debe ser completa o externa'));
    for (const value of ['', '[PENDIENTE]', 'No aplica']) replaceFile(agentsFile, agents.replace('`completa`', '`externa`').replace('No aplica', value), () => reject(check(), 'Código es obligatorio'));
    replaceFile(agentsFile, agents.replace('`completa`', '`externa`').replace('No aplica', code), () => assert(check().status === 0, 'Código válido rechazado'));
  });
  test('7 secreto detectado con valor redactado', () => {
    const value = 'fixture' + 'Ab9'.repeat(18), file = path.join(docs, 'credential.md');
    for (const text of [`Server=localhost;Database=fixture;Password=${value};`, `pat: ${value}`, 'ghp_' + 'A'.repeat(36), `apiKey = "${value}"`]) {
      replaceFile(file, text, () => {
        const r = external(['--history', '0']); reject(r, 'SECRETO:');
        assert(r.output.includes('[REDACTADO]') && !r.output.includes(value) && !r.output.includes('A'.repeat(36)), 'salida sin redacción completa');
      });
    }
  });
  test('8 placeholders, hashes y window.prompt permitidos', () => {
    const hash = 'a'.repeat(52);
    replaceFile(path.join(docs, 'credential.md'), `Password=process.env.DB_PASSWORD\nPassword=<valor>\ntoken = process.env.${hash}\ntoken = <${hash}>\n<ghp_${hash}>\nprocess.env.ghp_${hash}\nhash: ${hash}\nwindow.prompt('Nombre');\nconst apiKey = getApiKey();\napiKey: config.getSecret('nombre')\nclient_secret = vault.read(path)\n`, () => {
      const r = external(['--history', '0']); assert(r.status === 0 && !r.output.includes('SECRETO:'), 'falso positivo de secreto');
    });
    assert(!L.AI_MARKERS.test('window.prompt("Nombre")') && L.AI_MARKERS.test('prompt de IA') && L.AI_MARKERS.test('AI-assisted') && L.AI_MARKERS.test('.ai/rules'), 'marcadores incorrectos');
  });
  test('9 externa: archivo prohibido y diff staged con historial omitido', () => {
    replaceFile(path.join(code, 'AGENTS.md'), '# Fixture', () => reject(external(['--history', '0']), 'HUELLA'));
    fs.writeFileSync(path.join(code, 'app.js'), '// AI-assisted\n'); git('add', '--', 'app.js');
    const r = external(['--history', '0']); reject(r, 'HUELLA (diff staged)');
    assert(r.output.includes('AVISO: historial no auditado (--history 0); el working copy y el diff staged sí se revisaron'), 'falta aviso de historial omitido');
    fs.writeFileSync(path.join(code, 'app.js'), 'window.prompt("Nombre");\n'); git('add', '--', 'app.js');
    assert(external(['--history', '0']).status === 0, 'window.prompt bloqueado en diff staged');
  }, true);
  test('10 externa: rama e historial explícito y acotado', () => {
    git('checkout', '-q', '-b', 'feature/ai-protocol-fix');
    reject(external(['--history', '0']), 'HUELLA (rama actual)');
    git('checkout', '-q', '-b', 'feature/normal'); git('commit', '-q', '-m', 'AI-assisted fixture');
    git('commit', '-q', '--allow-empty', '-m', 'fixture limpio');
    const history = external(['--history', '2']); reject(history, 'HUELLA (historial');
    assert(history.output.includes('no se corrigen sin reescribir el historial'), 'diagnóstico de historial ambiguo');
    assert(external(['--history', '1']).status === 0 && external(['--history', '0']).status === 0, 'historial sin acotar');
  }, true);
  test('11 Huella completada al estilo de la semilla (A/B/C)', () => {
    const legend = '`completa` (…) · `externa` (…) → **`';
    const fixtures = [
      { name: 'A', footprint: 'completa', code: 'No aplica' },
      { name: 'B', footprint: 'externa', code: 'C:\\repo' },
      { name: 'C', footprint: 'externa', code: '[PENDIENTE]' },
    ];
    for (const fixture of fixtures) {
      const md = agents.replace('`completa`', legend + fixture.footprint + '`**').replace('No aplica', fixture.code);
      replaceFile(agentsFile, md, () => {
        const r = check();
        assert(!r.output.includes('Huella debe ser'), `variante ${fixture.name}: Huella rechazada`);
        if (fixture.name === 'C') reject(r, 'Código es obligatorio');
        else assert(r.status === 0, `variante ${fixture.name}: se esperaba exit 0`);
      });
    }
  });
} catch (e) { failed++; console.log(`FAIL preparación: ${e.message}`); }
finally {
  if (created) { try { fs.rmSync(base, { recursive: true, force: true }); } catch (e) { failed++; console.log(`FAIL limpieza: ${e.message}`); } }
}
console.log(`selftest: ${passed} PASS · ${failed} FAIL · ${skipped} SKIP`);
process.exitCode = failed ? 1 : 0;
