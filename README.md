# Angela

Aplicación de estudio para el EXANI-II, hecha a la medida como proyecto
personal. Incluye guías de estudio, exámenes por materia, mapas
conceptuales interactivos, seguimiento de progreso y una sección
especial con contraseña.

## Stack técnico

- **React 18** + **TypeScript**
- **Vite** como bundler y servidor de desarrollo
- **React Router** para el enrutamiento
- **Tailwind CSS v4** para estilos
- **Framer Motion** (`motion/react`) para animaciones
- **sql.js** (SQLite compilado a WebAssembly) como respaldo de
  almacenamiento, con `localStorage` como fuente principal
- Componentes de interfaz basados en **shadcn/ui** (ver
  [ATTRIBUTIONS.md](./ATTRIBUTIONS.md))

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución local

```bash
# Instalar dependencias
npm install

# Copiar el archivo de variables de entorno y poner la contraseña real
cp .env.example .env
# (edita .env y reemplaza el valor de VITE_SECRET_DOOR_PASSWORD)

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

El servidor de desarrollo queda disponible en `http://localhost:5173`
por defecto.

## Estructura del proyecto

```
src/app/
├── pages/              # Una página por ruta (Welcome, MainMenu, Quiz, etc.)
├── components/         # Componentes reutilizables de la aplicación
│   └── ui/              # Componentes base de interfaz (shadcn/ui)
├── data/                # Preguntas de examen, guías de estudio, mapas
│                          conceptuales por defecto, diálogos, etc.
└── lib/                 # Utilidades (acceso a la base de datos SQLite, etc.)

public/
└── carta-especial/      # Sitio estático independiente (HTML/CSS/JS)
                           servido bajo /carta-especial
```

## Rutas principales

| Ruta                     | Página           | Descripción                              |
|--------------------------|------------------|-------------------------------------------|
| `/`                      | `Welcome`        | Pantalla de bienvenida                    |
| `/menu`                  | `MainMenu`       | Selección de materia                      |
| `/quiz/:subject`         | `Quiz`           | Examen de una materia                     |
| `/final-result`          | `FinalResult`    | Resultado final del examen                |
| `/progress`              | `Progress`       | Seguimiento de progreso                   |
| `/study/:subject`        | `StudyResources` | Recursos de estudio por materia           |
| `/guide/:subject`        | `StudyGuide`     | Guía de estudio por materia               |
| `/concept-map/:subject`  | `ConceptMap`     | Mapa conceptual interactivo               |
| `/carta`                 | `Letter`         | Acceso con contraseña a la carta especial |

## Persistencia de datos

El progreso del examen y los mapas conceptuales se guardan primero en
`localStorage` (inmediato y confiable) y, en segundo plano, también en
una base de datos SQLite en el navegador (`sql.js`) como respaldo.

## Licencia

Proyecto de uso personal, no distribuido públicamente.
