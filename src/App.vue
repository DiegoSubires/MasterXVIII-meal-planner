<template>
  <header class="bg-blue-600 p-4 text-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
      <div class="flex flex-wrap gap-4 md:gap-6 text-sm">
        <router-link
          to="/"
          class="hover:text-blue-200 transition font-bold"
          active-class="text-blue-200"
          >📅 Plan Semanal</router-link
        >
        <router-link
          to="/categorias"
          class="hover:text-blue-200 transition font-bold"
          active-class="text-blue-200"
          >🗂️ Vista por Categoría</router-link
        >
        <router-link
          to="/favoritos"
          class="hover:text-blue-200 transition font-bold"
          active-class="text-blue-200"
          >⭐ Favoritos</router-link
        >
        <router-link
          to="/configuracion"
          class="hover:text-blue-200 transition font-bold"
          active-class="text-blue-200"
          >⚙️ Configuración</router-link
        >
      </div>
    </nav>
  </header>

  <main class="bg-slate-100 min-h-screen">
    <router-view />
  </main>
</template>
