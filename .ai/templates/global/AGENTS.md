# Instrucción global para Codex (copiar a $env:USERPROFILE\.codex\AGENTS.md)

Antes de cualquier acción en un repositorio, verificá si existe `E:\ProgramacionNet\.ai-sidecar\<nombre de la carpeta raíz del repo>\AGENTS.md`.
- Si existe: leelo y seguí ese protocolo. Es un proyecto en **modo huella externa**: toda la memoria y las reglas viven en esa carpeta sidecar; en el repositorio solo se escribe código. No crees ni modifiques archivos del protocolo dentro del repo.
- Si no existe y el repo tiene su propio `AGENTS.md`: seguí ese.
- Si no existe nada: trabajá normalmente.
