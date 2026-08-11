<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMealStore, AVAILABLE_DISHES, type MealType, type Meal } from '../stores/mealStore'
import MealForm from '../components/MealForm.vue'
import DayCard from '../components/DayCard.vue'

const mealStore = useMealStore()
const activeFilter = ref<'Todos' | MealType>('Todos')
const editingMeal = ref<Meal | null>(null)

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const allMealTypes: MealType[] = ['Desayuno', 'Brunch', 'Almuerzo', 'Merienda', 'Cena']

const productivityPercentage = computed(() => {
  return Math.round((mealStore.plannedMealsProgressCount / 21) * 100)
})

const handleSaveMeal = (formData: {
  name: string
  day: string
  type: MealType
  isEatOut: boolean
}) => {
  const trimmedName = formData.isEatOut ? 'Comida fuera de casa' : formData.name.trim()

  const matchedDish = !formData.isEatOut
    ? AVAILABLE_DISHES.find((d) => d.name.toLowerCase() === trimmedName.toLowerCase())
    : null

  const finalImage = formData.isEatOut
    ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80'
    : matchedDish?.image

  if (editingMeal.value) {
    mealStore.updateMeal(editingMeal.value.id, trimmedName, formData.day, formData.type, finalImage)
    editingMeal.value = null
  } else {
    mealStore.addMeal(trimmedName, formData.day, formData.type, finalImage, formData.isEatOut)
  }
}

const handleClearPlan = () => {
  if (confirm('¿Vaciar todo el plan semanal?')) {
    mealStore.clearPlan()
  }
}
</script>

<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto">
    <!-- BARRA DE PROGRESO SEMANAL -->
    <section class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Planificador Semanal</h1>
          <p class="text-sm text-slate-500">
            Progreso basado en las comidas principales obligatorias.
          </p>
        </div>
        <button
          @click="handleClearPlan"
          class="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          🗑️ Vaciar Plan
        </button>
      </div>
      <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
          :style="{ width: `${productivityPercentage}%` }"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-slate-500 mt-1">
        <span>Organización de la semana</span>
        <span class="font-bold text-slate-700"
          >{{ productivityPercentage }}% ({{ mealStore.plannedMealsProgressCount }}/21 comidas
          principales)</span
        >
      </div>
    </section>

    <!-- FORMULARIO SUBCOMPONETIZADO -->
    <MealForm :editing-meal="editingMeal" @save="handleSaveMeal" @cancel="editingMeal = null" />

    <!-- FILTROS CRONOLÓGICOS -->
    <div class="flex flex-wrap gap-2 mb-6 items-center">
      <span class="text-xs font-bold text-slate-400 uppercase mr-2">Filtros:</span>
      <button
        @click="activeFilter = 'Todos'"
        class="px-3 py-1 rounded-full text-xs font-medium"
        :class="
          activeFilter === 'Todos' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 shadow-sm'
        "
      >
        Todos
      </button>
      <button
        v-for="type in allMealTypes"
        :key="type"
        @click="activeFilter = type"
        class="px-3 py-1 rounded-full text-xs font-medium"
        :class="
          activeFilter === type ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 shadow-sm'
        "
      >
        {{ type }}
      </button>
    </div>

    <!-- CUADRANTE SEMANAL SUBCOMPONETIZADO -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
      <DayCard
        v-for="day in days"
        :key="day"
        :day="day"
        :meals="mealStore.meals.filter((m) => m.day === day)"
        :active-filter="activeFilter"
        @edit="editingMeal = $event"
      />
    </div>
  </div>
</template>
