# Pedido de tarea — plantilla

> Cómo pedirle una tarea a un agente para que arranque bien y no gaste vueltas (ni tokens) en aclaraciones. Cinco campos; dos minutos. Si el agente recibe un pedido sin esto, lo completa preguntando **una sola vez** (`00-core.md §1`).
> Es el mismo contrato que usaría un orquestador para despachar trabajo a otro agente.

```text
QUÉ        <una frase en imperativo: qué tiene que existir o cambiar cuando termine>
DÓNDE      <módulo, carpeta, archivo o tabla; anclas del INDEX si las sabés: 02#base-de-datos, db-schema#ledgercuenta>
TERMINADO  <criterio observable: "GET /cuentas/{id}/saldo devuelve el saldo a fecha y hay test que lo prueba">
NO TOCAR   <lo que queda fuera de alcance aunque parezca relacionado; "nada" si no hay>
CONTEXTO   <AB#, ADR, issue, decisión ya tomada, restricción de negocio; o "ninguno">
```

Reglas:

- **QUÉ** describe el resultado, no la solución. "Que el saldo se calcule desde los movimientos" y no "agregá un método que sume la tabla X".
- **TERMINADO** tiene que poder verificarse sin interpretar: un endpoint que responde, un test que pasa, una pantalla que muestra algo concreto, un script que corre dos veces sin error.
- **NO TOCAR** evita el "aproveché para…". Si no lo escribís, el agente igual tiene prohibido ampliar alcance, pero decirlo ahorra la pregunta.
- **CONTEXTO** es lo que el agente no puede deducir del código: por qué, para quién, qué se decidió antes. Un `AB#` o un `ADR-NNN` alcanzan si ahí está escrito.
- Tipo de tarea (`00-core.md §1`): si no es obvio, decilo: "consulta", "diagnóstico", "implementación", "refactor", "cambio de esquema".

Ejemplos:

```text
QUÉ        Exponer el saldo de una cuenta a una fecha dada.
DÓNDE      Backend, módulo ledger; tabla ledger.movimiento (db-schema#ledgermovimiento); controller de cuentas.
TERMINADO  GET /api/cuentas/{id}/saldo?fecha=YYYY-MM-DD devuelve {saldo, fecha}; test de integración con 3 movimientos y una fecha intermedia; run-quiet en OK.
NO TOCAR   cc_saldos (espejo, solo lectura); el cálculo no se cachea.
CONTEXTO   ADR-038 (saldo se construye desde movimientos, no desde cc_saldos). AB#1402.
```

```text
QUÉ        Diagnóstico: por qué el listado de clientes tarda > 5 s con el filtro de provincia.
DÓNDE      Frontend features/clientes; backend endpoint GET /api/clientes.
TERMINADO  Causa raíz identificada con evidencia (query, plan o traza) y propuesta de corrección; sin cambios de código.
NO TOCAR   Nada todavía: es diagnóstico.
CONTEXTO   Empezó después del despliegue del 2026-10-02 (changelog).
```

```text
QUÉ        Pantalla de alta de talonario.
DÓNDE      Frontend features/talonarios; API ya existe (POST /api/talonarios, ver OpenAPI).
TERMINADO  Formulario reactivo tipado con validaciones espejo del backend, estados carga/error/éxito, accesible por teclado, Impeccable critique sin hallazgos altos; run-quiet de lint y tests en OK.
NO TOCAR   El listado existente ni el design system (usar tokens actuales).
CONTEXTO   Prioridad: el usuario carga 30 talonarios seguidos → foco automático, Enter para confirmar, no cerrar el formulario al guardar.
```
