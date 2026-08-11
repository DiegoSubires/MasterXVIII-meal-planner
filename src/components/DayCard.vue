<script setup lang="ts">
import type { Meal, MealType } from '../stores/mealStore'
import MealItem from './MealItem.vue'

defineProps<{
  day: string
  meals: Meal[]
  activeFilter: 'Todos' | MealType
}>()

const emit = defineEmits<{
  (e: 'edit', meal: Meal): void
}>()

const cronologicalTypes: MealType[] = ['Desayuno', 'Brunch', 'Almuerzo', 'Merienda', 'Cena']
</script>

<template>
  <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col">
    <h3
      class="font-bold text-slate-800 border-b border-slate-200 mb-3 pb-1.5 uppercase text-xs tracking-wider text-center bg-slate-200/50 rounded p-1"
    >
      {{ day }}
    </h3>

    <div class="space-y-4 flex-1">
      <div
        v-for="type in cronologicalTypes.filter(
          (t) => activeFilter === 'Todos' || t === activeFilter,
        )"
        :key="type"
        class="space-y-1.5"
      >
        <!-- Renderizado modularizado del plato -->
        <MealItem
          v-for="meal in meals.filter((m) => m.type === type)"
          :key="meal.id"
          :meal="meal"
          @edit="emit('edit', $event)"
        />
      </div>
    </div>
  </div>
</template>
