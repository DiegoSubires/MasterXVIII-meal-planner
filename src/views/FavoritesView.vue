<script setup lang="ts">
import { useMealStore } from '../stores/mealStore'

const mealStore = useMealStore()
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-slate-800">Mis Platos Favoritos</h1>

    <div
      v-if="mealStore.favorites.length === 0"
      class="bg-blue-50 p-8 rounded-xl text-center border-2 border-dashed border-blue-200"
    >
      <p class="text-blue-600">Aún no tienes platos marcados como favoritos.</p>
    </div>

    <ul class="grid gap-3">
      <li
        v-for="fav in mealStore.favorites"
        :key="fav"
        class="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border-l-4 border-yellow-400"
      >
        <span class="font-medium text-slate-700">{{ fav }}</span>
        <button
          @click="mealStore.toggleFavorite(fav)"
          class="text-red-500 hover:bg-red-50 px-3 py-1 rounded transition"
        >
          Quitar
        </button>
      </li>
    </ul>
  </div>
</template>
