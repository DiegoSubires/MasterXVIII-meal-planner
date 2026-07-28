# 🍽️ Meal Planner App — Vue 3 + Pinia + Tailwind CSS

Aplicación web interactiva para la planificación y organización del menú semanal de comidas, desarrollada como práctica para el módulo de **Vue 3**.

---

## 🎯 Enfoque y Arquitectura de la Solución

El objetivo principal ha sido construir una herramienta intuitiva, fluida y con un acabado profesional. Se ha optado por la sintaxis moderna de **Composition API (`<script setup lang="ts">`)** junto con **TypeScript** para asegurar un código mantenible y fuertemente tipado.

### 🏛️ Decisiones de Diseño y Estado Global

- **Pinia Store (`mealStore.ts`)**: Se centraliza la lógica de negocio, el catálogo predefinido de platos, la gestión de favoritos y las métricas computadas (porcentaje de organización semanal).
- **Persistencia Automatizada**: Integración de `pinia-plugin-persistedstate` para sincronizar el estado del plan y los favoritos directamente con `localStorage` sin necesidad de _watchers_ manuales.
- **Componentación y Rutas**: Uso de `vue-router` organizando la navegación en 4 vistas clave (Plan Semanal, Vista por Categorías, Favoritos y Configuración).

---

## 🖼️ Gestión de Imágenes e Integración con Cloudinary

En lugar de utilizar imágenes estáticas pesadas almacenadas en la carpeta `public` o URLs aleatorias de rendimiento inestable (_picsum_):

- Se alojaron los activos de los platos en una infraestructura CDN optimizada mediante **Cloudinary**.
- Se obtienen imágenes en formatos ligeros (`.webp`, `.avif`, `.jpg`) optimizados para web, garantizando una carga rápida y una tasa de respuesta ágil en la vista de tarjetas.

---

## ✨ Funcionalidades Implementadas

### 🔹 Requisitos Básicos Cumplidos

- [x] Formulario para añadir platos especificando día y tipo de comida con limpieza automática tras la inserción.
- [x] Panel de organización semanal por tarjetas de días.
- [x] Opción para eliminar platos individuales del plan.
- [x] Gestión de estado con Pinia y enrutamiento modular con Vue Router.
- [x] Interfaz adaptable y cuidada con Tailwind CSS.

### 🚀 Mejoras y Funcionalidades Extra Añadidas

- [x] **Persistencia del Estado**: Guardado automático en el navegador.
- [x] **Clasificación por Tipo de Comida**: Soporte para _Desayuno, Brunch, Almuerzo, Merienda y Cena_.
- [x] **Filtros Dinámicos**: Filtrado visual en tiempo real dentro del cuadrante semanal.
- [x] **Modo "Comer fuera de casa"**: Opción para deshabilitar la selección de plato e indicar salidas a restaurantes/eventos.
- [x] **Indicador de Cobertura Semanal**: Barra de progreso dinámico computada en base a los días cubiertos.
- [x] **Herramienta de Exportación**: En la vista de _Configuración_ se puede generar un resumen en formato de texto plano formateado e incluirlo al portapapeles con un solo clic (ideal para imprimir o enviar por mensajería).
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
