# 60 — Seguridad

> Se carga cuando la tarea toca autenticación, autorización, secretos, entradas externas, datos personales, archivos, SQL directo o cualquier superficie expuesta. Las reglas 1-3 aplican **siempre**, aunque no se cargue este archivo.

---

## 1. Secretos y configuración sensible

- **Nunca** en código, docs, tests, ejemplos, logs ni commits: passwords, tokens, API keys, cadenas de conexión reales, certificados, URLs internas productivas.
- En `appsettings`/`environment` solo **nombres** de claves y placeholders (`"ConnectionStrings:Principal": "<desde user-secrets / Key Vault>"`).
- Secretos por ambiente: user-secrets (dev), variables de entorno / Azure Key Vault / variable groups del pipeline (resto).
- Si encontrás un secreto en el repo: **no lo copies a ningún lado**, no lo "arregles" moviéndolo; avisá de inmediato y registralo en `08-known-issues.md` como `[CRÍTICO]` sin reproducir el valor. El secreto se considera comprometido y debe rotarse.
- Al documentar en `/docs`, revisá dos veces que no se filtren valores de configuración.
- `check-context.js` escanea el diff staged y los archivos de config/docs rastreados buscando cadenas de conexión con contraseña, claves, tokens y llaves privadas, y **falla** si encuentra uno (los placeholders `<…>`, `${…}`, `process.env…` no cuentan). Un hallazgo no se "arregla" borrando la línea del diff: el valor ya se considera comprometido y hay que avisar.

---

## 2. Autenticación y autorización

- Autenticación y autorización se deciden **en el servidor**. Flags del cliente (`esAdmin`, `rol` en el body, guards de Angular) son UX, no seguridad.
- Mínimo privilegio: cada endpoint declara qué rol/permiso requiere. Sin endpoints "abiertos por ahora".
- Verificar **ownership/alcance**: que el usuario pueda ver *un* cliente no significa que pueda ver *ese* cliente. Filtrar por tenant/sucursal/usuario en la consulta, no después.
- IDs predecibles (enteros secuenciales) en URLs públicas → siempre con control de acceso por recurso. Considerar GUIDs para recursos expuestos externamente.
- Tokens: vida corta, refresh seguro, revocación posible. Nunca en query string ni en logs. En el navegador, preferir cookies `HttpOnly`/`Secure`/`SameSite` o el mecanismo documentado del proyecto; nunca secretos en `localStorage`.
- El usuario de aplicación contra SQL Server tiene solo los permisos que necesita (sin `db_owner`, sin `sysadmin`); `INSERT` únicamente sobre tablas de auditoría.

---

## 3. Entradas externas

Toda entrada que cruza un límite (HTTP, formulario, archivo, cola, otro sistema) es **hostil hasta que se valide**.

- Validar tipo, rango, longitud, formato y pertenencia (que el ID referenciado exista y sea accesible).
- Listas blancas sobre listas negras.
- **SQL**: siempre parametrizado (EF, `sp_executesql`, Dapper con parámetros). Nunca concatenar. Ver `21-data-sqlserver.md`.
- **Mass assignment / over-posting**: DTOs de entrada explícitos con solo los campos editables; nunca bindear la entidad directamente.
- **Archivos**: validar extensión **y** contenido (magic bytes), tamaño máximo, nombre saneado; guardar fuera del webroot o en storage dedicado; nunca ejecutar ni servir con el content-type del cliente.
- **Deserialización**: tipos conocidos; sin `TypeNameHandling.All` ni equivalentes.
- **Path traversal**: nunca construir rutas con entrada del usuario sin normalizar y verificar que queda dentro del directorio permitido.
- Límites de tamaño de request y de paginación para evitar DoS trivial.

---

## 4. Salidas y exposición de datos

- Devolver solo lo necesario (DTOs de salida). Nunca exponer entidades completas, hashes, campos internos, flags de sistema.
- Errores al cliente: mensaje genérico + código de correlación. Stack traces, SQL, rutas internas y versiones solo en logs.
- Encabezados de seguridad en la API/host (HSTS, `X-Content-Type-Options`, CSP cuando aplique) según lo que el proyecto ya configure.
- CORS: orígenes explícitos; nunca `*` con credenciales.

---

## 5. Frontend (Angular)

- No desactivar sanitización. `bypassSecurityTrust*` solo con revisión documentada y contenido controlado por nosotros.
- Sin `innerHTML` con contenido no confiable. Sin `eval`, sin `new Function`.
- Nada sensible en el bundle: claves, URLs internas, lógica de autorización "real".
- Storage del navegador solo para datos no sensibles y necesarios para UX.
- Enlaces externos con `rel="noopener noreferrer"`.

---

## 6. Logging y datos personales

- No loguear tokens, passwords, cadenas de conexión, datos personales (DNI/CUIT, email, teléfono, dirección), datos financieros ni payloads completos.
- Enmascarar cuando haga falta trazar (`***1234`).
- Datos personales: mínimo necesario, propósito claro, acceso restringido, retención definida. Si la tarea agrega datos personales nuevos, registralo en `02-architecture.md`.
- Logs de auditoría (quién hizo qué y cuándo) son inmutables para la aplicación.

---

## 7. Dependencias

- Antes de agregar un paquete: mantenimiento activo, licencia compatible, vulnerabilidades conocidas (`dotnet list package --vulnerable`, `npm audit`), tamaño, solapamiento con lo existente.
- Versiones fijadas por lockfile / `Directory.Packages.props`. Sin rangos abiertos nuevos.
- Vulnerabilidad detectada en dependencia existente → registrar en `08-known-issues.md` con severidad; no actualizar mayor sin análisis de compatibilidad.

---

## 8. Checklist

- [ ] Ningún secreto ni valor productivo en código, docs, tests ni logs.
- [ ] Cada endpoint nuevo declara auth/permiso y verifica alcance del recurso.
- [ ] Entradas validadas en el límite; SQL parametrizado; DTOs de entrada explícitos.
- [ ] Salidas acotadas; errores sin detalle técnico al cliente.
- [ ] Sin `bypassSecurityTrust*`, `innerHTML` inseguro ni secretos en el bundle.
- [ ] Logs sin datos sensibles; datos personales nuevos documentados.
- [ ] Dependencias nuevas auditadas y justificadas.
