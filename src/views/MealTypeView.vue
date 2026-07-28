<script setup lang="ts">
import { useMealStore, type MealType } from '../stores/mealStore'

const mealStore = useMealStore()
const categories: MealType[] = ['Desayuno', 'Brunch', 'Almuerzo', 'Merienda', 'Cena']
</script>

<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold text-slate-800 mb-6">Menú Organizado por Tipo de Comida</h1>

    <div class="space-y-8">
      <section
        v-for="cat in categories"
        :key="cat"
        class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
      >
        <h2
          class="text-lg font-bold text-slate-700 border-b pb-2 mb-4 flex justify-between items-center"
        >
          <span>{{ cat }}s</span>
          <span class="text-xs bg-slate-100 px-2.5 py-1 rounded-full text-slate-500">
            {{ mealStore.meals.filter((m) => m.type === cat).length }} platos
          </span>
        </h2>

        <div
          v-if="mealStore.meals.filter((m) => m.type === cat).length === 0"
          class="text-sm text-slate-400 italic py-4"
        >
          No hay platos asignados a esta categoría para ningún día.
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="meal in mealStore.meals.filter((m) => m.type === cat)"
            :key="meal.id"
            class="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <img :src="meal.image" class="w-full h-28 object-cover" />
            <div class="p-3">
              <span
                class="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase mb-1 inline-block"
              >
                {{ meal.day }}
              </span>
              <p class="text-sm font-bold text-slate-700 mb-2">{{ meal.name }}</p>

              <div class="flex justify-between items-center border-t pt-2 mt-2">
                <button
                  @click="mealStore.toggleFavorite(meal.name)"
                  class="flex items-center gap-1 text-xs font-medium transition"
                  :class="
                    mealStore.favorites.includes(meal.name) ? 'text-yellow-600' : 'text-slate-400'
                  "
                >
                  <span>{{
                    mealStore.favorites.includes(meal.name) ? '★ Favorito' : '☆ Marcar favorito'
                  }}</span>
                </button>
                <button
                  @click="mealStore.removeMeal(meal.id)"
                  class="text-xs text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
