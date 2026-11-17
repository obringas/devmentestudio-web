#!/usr/bin/env node
// Genera docs/db-schema.md (esquema compacto de SQL Server) ejecutando .ai/tools/sql/db-schema.sql con sqlcmd.
// Solo lectura sobre catálogos del sistema; nunca vuelca datos. Regenerar tras cada cambio de esquema (70-docs-close §1).
// Uso:
//   node .ai/tools/db-schema.js --server <host[\instancia]> --db <base> [--schemas ledger,dbo] [--out docs/db-schema.md]
//                               [--user <usuario>]   (la contraseña SOLO por variable de entorno DBSCHEMA_PASSWORD; sin --user usa autenticación de Windows)
//                               [--sqlcmd <ruta>]    (por defecto "sqlcmd" en el PATH)
//   Huella externa: --out <SIDECAR>\docs\db-schema.md
// Requiere sqlcmd (ODBC o Go) y SQL Server 2017+.
'use strict';
const { spawnSync } = require('child_process');
const fs = require('fs'), path = require('path');

const argv = process.argv.slice(2);
const get = (k, d = null) => { const i = argv.indexOf(k); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : d; };
const server = get('--server'), db = get('--db'), schemas = get('--schemas', ''), user = get('--user');
const out = path.resolve(get('--out', path.join('docs', 'db-schema.md')));
const sqlcmd = get('--sqlcmd', 'sqlcmd');
if (!server || !db) { console.error('Uso: db-schema.js --server <host> --db <base> [--schemas a,b] [--out docs/db-schema.md] [--user u]'); process.exit(2); }

const sqlFile = path.join(__dirname, 'sql', 'db-schema.sql');
const args = ['-S', server, '-d', db, '-i', sqlFile, '-f', '65001', '-y', '0', '-b'];
const env = { ...process.env, SCHEMAS: schemas };
if (user) {
  const pwd = process.env.DBSCHEMA_PASSWORD;
  if (!pwd) { console.error('Falta DBSCHEMA_PASSWORD en el entorno (nunca se pasa por argumento ni se escribe en docs).'); process.exit(2); }
  env.SQLCMDPASSWORD = pwd;
  args.push('-U', user);
} else args.push('-E');

const t0 = Date.now();
// sqlcmd toma $(SCHEMAS) del entorno; evita diferencias de comillas en listas con comas en Windows.
const res = spawnSync(sqlcmd, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env });
if (res.error) { console.error(`No se pudo ejecutar ${sqlcmd}: ${res.error.message}. Instalá sqlcmd o pasá --sqlcmd <ruta>.`); process.exit(2); }
if (res.status !== 0) {
  const err = (res.stderr || res.stdout || '').split(process.env.DBSCHEMA_PASSWORD || '\x00').join('***').trim().split(/\r?\n/).slice(0, 10).join('\n');
  console.error(`sqlcmd terminó con código ${res.status}:\n${err}`); process.exit(res.status || 1);
}

let text = res.stdout.split(process.env.DBSCHEMA_PASSWORD || '\x00').join('***').replace(/\r\n/g, '\n').split('\n').map(l => l.replace(/\s+$/, '')).join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
if (!/^# Esquema de base de datos/.test(text)) { console.error('La salida no tiene el formato esperado; revisá la conexión y la versión de SQL Server (requiere 2017+).'); console.error(text.slice(0, 400)); process.exit(1); }

// Resguardo: ningún valor que parezca secreto (no debería haber; los DEFAULT son expresiones)
if (/(password|pwd|secret|token)\s*=/i.test(text)) console.error('AVISO: la salida contiene algo que parece una credencial; revisá los DEFAULT antes de commitear.');

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text, 'utf8');
const tables = (text.match(/^## (?!Vistas|Procedimientos|Funciones)/gm) || []).length;
const bytes = Buffer.byteLength(text, 'utf8');
console.log(`db-schema: ${tables} tablas · ${Math.round(bytes / 1024)} KB · ≈${Math.round(bytes / 3.7)} tokens · ${((Date.now() - t0) / 1000).toFixed(1)} s → ${out}`);
console.log('Siguiente: node .ai/tools/regen-index.js --write-doc-index  (agrega el índice propio y la línea en INDEX.md)');
