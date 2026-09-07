# DEMO FacilApp — Consultorio / citas

Copia aislada. **No es la cuenta de Bienestarte ni de ninguna terapeuta.**

Banner: `DEMO FacilApp — datos de prueba, no es una cuenta real`

| Campo | Valor |
|-------|--------|
| Admin | `demo@facilapp.do` |
| Clave | `Demo1234!` |
| Origen (solo código) | [Themachine1914/bienestarte-integral](https://github.com/Themachine1914/bienestarte-integral) |

El repo de la cliente **no se tocó**.

## Qué se sembró

Al abrir la app (localStorage, claves `fa_demo_consultorio_*`):

- 8 pacientes inventados (Ana Pérez Demo, Luis Gómez Demo, …) con 809/829/849
- 8 citas semilla (pendiente / confirmada / completada) en RD$
- Profesional ficticia: Dra. Ana Demo
- Sin cuentas bancarias reales

**No** se copiaron: `.env`, `.firebaserc`, fotos `orlandia-*.jpg`, cuentas de Instagram, CODOPSI/exequátur reales, ni números de banco.

## Bloqueos

- No anular/rechazar citas semilla
- Pagos y comprobantes desactivados
- Settings no guardan cuentas bancarias
- `localStorage` distinto al de la app de producción

## Correr local

```bash
cp .env.example .env
npm install
npm run dev
```

Abre la URL de Vite. Entra a `/admin/login` con `demo@facilapp.do` / `Demo1234!`.

Sin Firebase la demo funciona en el navegador. Si configuras Firebase, usa un proyecto **nuevo**.

## GitHub / Vercel

El token de esta sesión no puede crear repos (403). Crea `facilapp-demo-consultorio` a mano y despliega en un proyecto Vercel nuevo.

`VITE_FACILAPP_WHATSAPP` = número FacilApp para **Personaliza esta demo**.
