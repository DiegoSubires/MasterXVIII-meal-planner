# 🍽️ Meal Planner App — Vue 3 + Pinia + Tailwind CSS

Aplicación web interactiva para la planificación y organización del menú semanal de comidas, desarrollada como práctica para el módulo de **Vue 3**.

---

## 🎯 Enfoque y Arquitectura de la Solución

El objetivo principal ha sido construir una herramienta intuitiva, fluida y con un acabado profesional. Se ha optado por la sintaxis moderna de **Composition API (`<script setup lang="ts">`)** junto con **TypeScript** para asegurar un código mantenible y fuertemente tipado.

### 🏛️ Decisiones de Diseño y Estado Global

- **Pinia Store (`mealStore.ts`)**: Se centraliza la lógica de negocio pura, el catálogo predefinido de platos, la gestión de favoritos y las métricas computadas de cobertura semanal.
- **Separación de Capas e Inmutabilidad**: Siguiendo buenas prácticas de desarrollo, la store maneja el estado sin efectos secundarios visuales (como alertas o confirmaciones nativas). La interacción con el usuario queda delegada estrictamente a la capa de la vista.
- **Persistencia Automatizada**: Integración de `pinia-plugin-persistedstate` para sincronizar el estado del plan, las ediciones y los favoritos directamente con `localStorage` de manera robusta.

### ⚛️ Arquitectura Atómica Desacoplada (Decoupled Atomic Architecture)

Para evitar el antipatrón de _componentes orquesta_ monolíticos, la vista principal `WeeklyPlan.vue` se ha aligerado drásticamente (pasando de más de 200 líneas a una vista orquestadora declarativa de alto nivel). El flujo se ha distribuido en componentes especializados basados en **Props** y comunicación mediante **Eventos (`$emit`)**:

1. **`MealForm.vue` (Organismo)**: Controla de forma aislada los estados reactivos de la inserción de platos, la selección del catálogo integrado y el flujo dinámico de conmutación al **Modo Edición**.
2. **`DayCard.vue` (Molécula)**: Actúa como contenedor estructural de las columnas de cada día de la semana, aplicando los filtros cronológicos y propagando las acciones hacia las entidades correspondientes.
3. **`MealItem.vue` (Átomo)**: Unidad mínima de presentación que encapsula la renderización de la tarjeta del plato, las directivas de estilo condicionales y los disparadores de mutación (`toggleFavorite`, `removeMeal` y el evento `@edit`).

---

## 🖼️ Gestión de Imágenes e Integración con Cloudinary

En lugar de utilizar imágenes estáticas pesadas almacenadas en la carpeta `public` o URLs aleatorias de rendimiento inestable (_picsum_):

- Se alojaron los activos de los platos en una infraestructura CDN optimizada mediante **Cloudinary**.
- Se obtienen imágenes en formatos ligeros (`.webp`, `.avif`, `.jpg`) optimizados para web, garantizando una carga rápida y una tasa de respuesta ágil en la vista de tarjetas.

---

## ✨ Funcionalidades Implementadas

### 🔹 Requisitos Básicos y Correcciones Críticas Cumplidos

- [x] **Componentización Avanzada**: Estructura modular real basada en subcomponentes reactivos reutilizables en lugar de vistas masivas de un solo archivo.
- [x] **Formulario Reactivo**: Asignación de platos especificando día y tipo de comida con limpieza automática tras la inserción.
- [x] **Sistema Completo de Edición**: Botón dinámico (✏️) por cada plato que habilita la modificación en caliente de cualquier parámetro (nombre, día o franja horaria) con persistencia inmediata.
- [x] **Consistencia de Datos**: Corrección de bugs críticos de persistencia en la propiedad `isEatOut`, asegurando que el estado de las comidas fuera de casa se salve adecuadamente en el almacenamiento local y no genere código muerto.
- [x] **Control de Flujo Limpio**: El botón para vaciar el plan delega la confirmación a la interfaz y el vaciado interno a la store, erradicando efectos secundarios colaterales.

### 🚀 Mejoras y Funcionalidades Extra Añadidas

- [x] **Persistencia del Estado**: Guardado automático en el navegador frente a recargas.
- [x] **Clasificación por Tipo de Comida**: Soporte para _Desayuno, Brunch, Almuerzo, Merienda y Cena_.
- [x] **Filtros Dinámicos**: Filtrado visual en tiempo real en todo el cuadrante semanal.
- [x] **Modo "Comer fuera de casa"**: Opción para deshabilitar la selección de plato e indicar salidas a restaurantes/eventos sin romper las métricas.
- [x] **Indicador de Cobertura Semanal**: Barra de progreso dinámico computada en tiempo real eliminando fallos numéricos (`NaN%`), calculada en base a las 21 comidas principales obligatorias.
- [x] **Herramienta de Exportación**: En la vista de _Configuración_ se puede generar un resumen en formato de texto plano formateado e incluirlo al portapapeles con un solo clic.
- [x] **Gestor de Favoritos**: Marcación rápida mediante estrellas y vista dedicada.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: Vue 3 (Composition API + Script Setup)
- **Lenguaje**: TypeScript
- **Gestión de Estado**: Pinia
- **Persistencia**: `pinia-plugin-persistedstate`
- **Estilos**: Tailwind CSS v4 + Sass
- **Bundler & Tooling**: Vite, ESLint, Oxlint, Prettier
- **CDN Multimedia**: Cloudinary

---

## 💻 Instrucciones de Instalación y Ejecución

```sh
# 1. Clonar el repositorio e instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build

# 4. Ejecutar linters de código
npm run lint
```
