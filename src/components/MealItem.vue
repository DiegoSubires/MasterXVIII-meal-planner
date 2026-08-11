<script setup lang="ts">
import { useMealStore, type Meal } from '../stores/mealStore'

defineProps<{
  meal: Meal
}>()

const emit = defineEmits<{
  (e: 'edit', meal: Meal): void
}>()

const mealStore = useMealStore()
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden group">
    <img :src="meal.image" class="w-full h-20 object-cover" loading="lazy" />
    <div class="p-2">
      <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
        {{ meal.type }} <span v-if="meal.isEatOut" class="text-purple-600">(Fuera)</span>
      </div>
      <div class="flex justify-between items-start gap-1">
        <p class="text-xs font-semibold text-slate-700 line-clamp-2">{{ meal.name }}</p>
        <div class="flex items-center gap-1.5 shrink-0">
          <button
            @click="mealStore.toggleFavorite(meal.name)"
            class="text-xs transition hover:scale-110"
            :class="
              mealStore.favorites.includes(meal.name)
                ? 'text-yellow-500'
                : 'text-slate-300 hover:text-yellow-400'
            "
          >
            ★
          </button>

          <button
            @click="emit('edit', meal)"
            title="Editar plato"
            class="text-slate-300 hover:text-amber-500 text-xs transition hover:scale-110"
          >
            ✏️
          </button>

          <button
            @click="mealStore.removeMeal(meal.id)"
            class="text-slate-300 hover:text-red-500 text-xs transition"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
