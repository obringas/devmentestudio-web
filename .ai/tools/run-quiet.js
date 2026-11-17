#!/usr/bin/env node
// Ejecuta un comando de build/test/lint y devuelve SOLO lo que el agente necesita: resultado, conteos y errores con archivo:línea.
// La salida completa se guarda en un log fuera del repo (temp del sistema) por si hace falta mirarla.
// Uso:  node .ai/tools/run-quiet.js [--max-fail 20] [--tail 25] [--log-dir <dir>] [--timeout 900000] -- <comando y argumentos>
//   node .ai/tools/run-quiet.js -- dotnet test
//   node .ai/tools/run-quiet.js -- dotnet build -c Release
//   node .ai/tools/run-quiet.js -- npx ng build --configuration production
//   node .ai/tools/run-quiet.js -- npm test -- --watch=false
//   node .ai/tools/run-quiet.js -- npx eslint src
// Código de salida: el del comando. El agente NO abre el log salvo que el resumen no alcance para decidir.
'use strict';
const { spawn, spawnSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');

async function main() {
// ---------- argumentos ----------
const argv = process.argv.slice(2);
const sep = argv.indexOf('--');
if (sep < 0 || sep === argv.length - 1) { console.error('Uso: run-quiet.js [opciones] -- <comando>'); process.exit(2); }
const opts = { maxFail: 20, tail: 25, logDir: null, timeout: 900000 };
for (let i = 0; i < sep; i++) {
  if (argv[i] === '--max-fail') opts.maxFail = +argv[++i];
  else if (argv[i] === '--tail') opts.tail = +argv[++i];
  else if (argv[i] === '--log-dir') opts.logDir = argv[++i];
  else if (argv[i] === '--timeout') opts.timeout = Number(argv[++i]);
}
if (!Number.isSafeInteger(opts.timeout) || opts.timeout <= 0) { console.error('--timeout requiere milisegundos enteros positivos.'); process.exit(2); }
const cmdParts = argv.slice(sep + 1);
const cmdLine = cmdParts.join(' ');

// ---------- ejecución ----------
const t0 = Date.now();
const res = await new Promise((resolve) => {
  const child = spawn(cmdLine, { shell: true, detached: process.platform !== 'win32', windowsHide: true,
    env: { ...process.env, DOTNET_CLI_UI_LANGUAGE: 'en', NO_COLOR: '1', FORCE_COLOR: '0', CI: process.env.CI || '1' } });
  const stdout = [], stderr = []; let error = null, size = 0;
  const kill = () => {
    if (!child.pid) return;
    if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true });
    else { try { process.kill(-child.pid, 'SIGKILL'); } catch (_) {} }
    child.kill('SIGKILL');
  };
  const timer = setTimeout(() => { error = Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' }); kill(); }, opts.timeout);
  const capture = (target) => (chunk) => {
    size += chunk.length;
    if (size > 256 * 1024 * 1024) { error = new Error('La salida supera 256 MB.'); kill(); }
    else target.push(chunk);
  };
  child.stdout.on('data', capture(stdout)); child.stderr.on('data', capture(stderr));
  child.on('error', (err) => { error = err; });
  child.on('close', (status) => { clearTimeout(timer); resolve({ status, error, stdout: Buffer.concat(stdout).toString('utf8'), stderr: Buffer.concat(stderr).toString('utf8') }); });
});
if (res.error) {
  if (res.error.code === 'ETIMEDOUT') { console.error(`TIMEOUT: ${opts.timeout} ms · ${cmdLine}`); process.exit(124); }
  console.error(`SPAWN ERROR: ${res.error.message}`); process.exit(127);
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);
const raw = (res.stdout || '') + (res.stderr ? '\n' + res.stderr : '');
const out = raw.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');            // sin ANSI
const lines = out.split(/\r?\n/);
const exit = res.status === null ? 1 : res.status;

// ---------- log completo fuera del repo ----------
const repoName = path.basename(process.cwd());
const logDir = opts.logDir || path.join(os.tmpdir(), 'ai-protocol', repoName);
fs.mkdirSync(logDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
const slug = cmdParts.slice(0, 2).join('-').replace(/[^a-z0-9.-]+/gi, '_').slice(0, 40);
const logPath = path.join(logDir, `${stamp}-${slug}.log`);
fs.writeFileSync(logPath, `$ ${cmdLine}\n# exit ${exit} · ${secs}s\n\n${out}`, 'utf8');
const logKb = Math.round(Buffer.byteLength(out, 'utf8') / 1024);

// ---------- helpers ----------
const uniq = (arr) => [...new Set(arr)];
const num = (s) => (s || '0').trim().replace(/^[^\d]+|[^\d]+$/g, '').replace(/[.,](?=\d{3}\b)/g, '') || '0';
const fmt = (n) => Number(n).toLocaleString('es-AR');
const take = (arr, n) => arr.slice(0, n);
const report = [];
const head = (what) => report.push(`run-quiet · ${cmdLine} · exit ${exit} · ${secs} s · log ${logPath} (${logKb} KB)${what ? ' · ' + what : ''}`);

// ---------- detectores ----------
const text = out;
const is = {
  dotnetTest: /\b(Passed!|Failed!|Total tests:|Test Run (Successful|Failed)|test summary:)/i.test(text) && /dotnet\s+test|Test Run|\[xUnit|NUnit|MSTest|Microsoft\.Testing/i.test(text + cmdLine),
  dotnetBuild: /Build (succeeded|FAILED)\.?|\berror (CS|MSB|NU|NETSDK)\d+/i.test(text),
  ngBuild: /Application bundle generation (complete|failed)|Browser application bundle|Initial total|✘ \[ERROR\]|error TS\d+/.test(text) || /\bng\s+build/.test(cmdLine),
  jest: /Tests:\s+.*\btotal\b|Test Suites:/.test(text),
  karma: /Executed \d+ of \d+/.test(text),
  vitest: /Test Files\s+\d+/.test(text),
  eslint: /✖ \d+ problems?/.test(text) || /\beslint\b/.test(cmdLine),
};

// ---------- dotnet build ----------
if (is.dotnetBuild && !is.dotnetTest) {
  const errs = uniq(lines.filter(l => /:\s*error\s+[A-Z]+\d+\s*:/.test(l)).map(l => l.replace(/\s*\[[^\]]*\]\s*$/, '').trim()));
  const warns = uniq(lines.filter(l => /:\s*warning\s+[A-Z]+\d+\s*:/.test(l))).length;
  const ok = /Build succeeded/i.test(text) && errs.length === 0 && exit === 0;
  head(ok ? `BUILD OK · ${warns} warning(s)` : `BUILD FAILED · ${errs.length} error(es) · ${warns} warning(s)`);
  for (const e of take(errs, opts.maxFail)) report.push(`  ${e}`);
  if (errs.length > opts.maxFail) report.push(`  … ${errs.length - opts.maxFail} error(es) más en el log`);
  finish();
}

// ---------- dotnet test ----------
function parseDotnetTest() {
  let passed = 0, failed = 0, skipped = 0, total = 0;
  const m1 = /Failed:\s*([\d.,]+),\s*Passed:\s*([\d.,]+),\s*Skipped:\s*([\d.,]+),\s*Total:\s*([\d.,]+)/g; let m;
  while ((m = m1.exec(text))) { failed += +num(m[1]); passed += +num(m[2]); skipped += +num(m[3]); total += +num(m[4]); }
  if (!total) { const m2 = /Total tests:\s*([\d.,]+)[\s\S]*?Passed:\s*([\d.,]+)[\s\S]*?Failed:\s*([\d.,]+)(?:[\s\S]*?Skipped:\s*([\d.,]+))?/.exec(text); if (m2) { total = +num(m2[1]); passed = +num(m2[2]); failed = +num(m2[3]); skipped = +num(m2[4]); } }
  if (!total) { const m3 = /total:\s*([\d.,]+)[\s\S]*?failed:\s*([\d.,]+)[\s\S]*?succeeded:\s*([\d.,]+)[\s\S]*?skipped:\s*([\d.,]+)/i.exec(text); if (m3) { total = +num(m3[1]); failed = +num(m3[2]); passed = +num(m3[3]); skipped = +num(m3[4]); } }
  // tests fallidos: "  Failed Nombre [12 ms]" seguido de "Error Message:" y "Stack Trace:"
  const fails = [];
  for (let i = 0; i < lines.length; i++) {
    const f = /^\s*(?:\[FAIL\]\s*)?Failed\s+(\S.*?)\s*(\[[^\]]*\])?\s*$/.exec(lines[i]) || /^\s*✗\s+(.+)$/.exec(lines[i]);
    if (!f) continue;
    const name = f[1].trim(); const detail = [];
    for (let j = i + 1; j < Math.min(lines.length, i + 40); j++) {
      const t = lines[j].trim();
      if (/^(Failed|Passed|Skipped)\s+\S/.test(t) || /^Test Run|^Passed!|^Failed!|^Total tests/.test(t)) break;
      if (!t || /^(Error Message|Stack Trace):?$/.test(t)) continue;
      if (/^at\s/.test(t)) { const loc = /in\s+(.+?):line\s+(\d+)/.exec(t); if (loc && detail.filter(d => d.startsWith('  at')).length < 2) detail.push(`  at ${path.basename(loc[1])}:${loc[2]}`); continue; }
      if (detail.filter(d => !d.startsWith('  at')).length < 3) detail.push(`  ${t.slice(0, 160)}`);
    }
    fails.push({ name, detail });
  }
  return { passed, failed, skipped, total, fails };
}
if (is.dotnetTest) {
  const r = parseDotnetTest();
  const buildErrs = uniq(lines.filter(l => /:\s*error\s+[A-Z]+\d+\s*:/.test(l)).map(l => l.replace(/\s*\[[^\]]*\]\s*$/, '').trim()));
  if (buildErrs.length) { head(`BUILD FAILED antes de los tests · ${buildErrs.length} error(es)`); for (const e of take(buildErrs, opts.maxFail)) report.push(`  ${e}`); finish(); }
  const ok = r.failed === 0 && exit === 0 && r.total > 0;
  head(ok ? `TESTS OK · ${fmt(r.passed)} passed · ${fmt(r.skipped)} skipped · total ${fmt(r.total)}` : `TESTS FAILED · ${fmt(r.failed)} failed · ${fmt(r.passed)} passed · ${fmt(r.skipped)} skipped · total ${fmt(r.total)}`);
  const uniqFails = []; const seen = new Set();
  for (const f of r.fails) if (!seen.has(f.name)) { seen.add(f.name); uniqFails.push(f); }
  for (const f of take(uniqFails, opts.maxFail)) { report.push(`FAIL ${f.name}`); for (const d of f.detail) report.push(d); }
  if (uniqFails.length > opts.maxFail) report.push(`… ${uniqFails.length - opts.maxFail} test(s) fallido(s) más en el log`);
  if (!ok && uniqFails.length === 0) tailLines();
  finish();
}

// ---------- Angular build / TypeScript ----------
if (is.ngBuild) {
  const errs = uniq(lines.filter(l => /✘ \[ERROR\]|error TS\d+|^Error:|^\s*Error:\s/.test(l)).map(l => l.replace(/^\s*✘ \[ERROR\]\s*/, '').trim()));
  const locs = uniq(lines.filter(l => /^\s*(src|projects|apps|libs)\/[^\s:]+\.(ts|html|scss|css):\d+:\d+/.test(l)).map(l => l.trim()));
  const warns = lines.filter(l => /▲ \[WARNING\]|warning TS\d+|^Warning:/.test(l)).length;
  const size = (lines.find(l => /Initial total/i.test(l)) || '').replace(/\s+/g, ' ').trim();
  const ok = exit === 0 && errs.length === 0;
  head(ok ? `BUILD OK · ${warns} warning(s)${size ? ' · ' + size : ''}` : `BUILD FAILED · ${errs.length} error(es) · ${warns} warning(s)`);
  for (const e of take(errs, opts.maxFail)) report.push(`  ${e}`);
  for (const l of take(locs, opts.maxFail)) report.push(`  ${l}`);
  if (!ok && errs.length === 0) tailLines();
  finish();
}

// ---------- Jest / Vitest ----------
if (is.jest || is.vitest) {
  const m = /Tests:\s+(?:(\d+) failed, )?(?:(\d+) skipped, )?(?:(\d+) passed, )?(\d+) total/.exec(text);
  const failed = m ? +(m[1] || 0) : 0, passed = m ? +(m[3] || 0) : 0, total = m ? +m[4] : 0;
  const fails = uniq(lines.filter(l => /^\s*●\s+\S/.test(l) && !/●\s+Test suite failed to run/.test(l)).map(l => l.replace(/^\s*●\s+/, '').trim()));
  const ok = exit === 0 && failed === 0;
  head(ok ? `TESTS OK · ${fmt(passed)} passed · total ${fmt(total)}` : `TESTS FAILED · ${fmt(failed)} failed · ${fmt(passed)} passed · total ${fmt(total)}`);
  for (const f of take(fails, opts.maxFail)) {
    report.push(`FAIL ${f}`);
    const idx = lines.findIndex(l => l.includes(f));
    if (idx >= 0) { const d = lines.slice(idx + 1, idx + 15).map(s => s.trim()).filter(s => /expect|Expected|Received|Error|at .*\.(ts|js):\d+/.test(s)).slice(0, 3); for (const x of d) report.push(`  ${x.slice(0, 160)}`); }
  }
  if (!ok && fails.length === 0) tailLines();
  finish();
}

// ---------- Karma ----------
if (is.karma) {
  const m = /Executed (\d+) of (\d+)\s+(SUCCESS|\((\d+) FAILED\)|FAILED)?/.exec(text);
  const fails = uniq(lines.filter(l => /\bFAILED$/.test(l) && !/Executed/.test(l)).map(l => l.trim()));
  const ok = exit === 0 && !/FAILED/.test(text);
  head(ok ? `TESTS OK · ${m ? m[1] + ' de ' + m[2] : ''}` : `TESTS FAILED · ${fails.length} fallido(s)${m ? ' · ejecutados ' + m[1] + ' de ' + m[2] : ''}`);
  for (const f of take(fails, opts.maxFail)) report.push(`FAIL ${f}`);
  if (!ok && fails.length === 0) tailLines();
  finish();
}

// ---------- ESLint ----------
if (is.eslint) {
  const m = /✖ (\d+) problems? \((\d+) errors?, (\d+) warnings?\)/.exec(text);
  const errs = lines.filter(l => /^\s+\d+:\d+\s+error\s/.test(l)).map(l => l.trim());
  let file = ''; const located = [];
  for (const l of lines) { if (/^\S.*\.(ts|js|html)$/.test(l.trim())) file = l.trim(); else if (/^\s+\d+:\d+\s+error\s/.test(l)) located.push(`${file}:${l.trim().replace(/\s+/g, ' ')}`); }
  const ok = exit === 0;
  head(ok ? `LINT OK${m ? ' · ' + m[3] + ' warning(s)' : ''}` : `LINT FAILED · ${m ? m[2] : errs.length} error(es)${m ? ' · ' + m[3] + ' warning(s)' : ''}`);
  for (const e of take(located, opts.maxFail)) report.push(`  ${e}`);
  finish();
}

// ---------- genérico ----------
head(exit === 0 ? 'OK' : 'FAILED');
if (exit !== 0) tailLines();
finish();

function tailLines() {
  const nonEmpty = lines.filter(l => l.trim());
  report.push(`  (sin formato reconocido; últimas ${Math.min(opts.tail, nonEmpty.length)} líneas)`);
  for (const l of nonEmpty.slice(-opts.tail)) report.push(`  ${l.slice(0, 200)}`);
}
function finish() {
  console.log(report.join('\n'));
  process.exit(exit);
}
}
main().catch((error) => { console.error(`SPAWN ERROR: ${error.message}`); process.exitCode = 127; });
