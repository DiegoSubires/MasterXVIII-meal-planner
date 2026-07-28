<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMealStore, AVAILABLE_DISHES, type MealType } from '../stores/mealStore'

const mealStore = useMealStore()

const selectedDishIndex = ref('')
const selectedDay = ref('')
const selectedType = ref<MealType>('Almuerzo')
const isEatOut = ref(false)
const activeFilter = ref<'Todos' | MealType>('Todos')

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const allMealTypes: MealType[] = ['Desayuno', 'Brunch', 'Almuerzo', 'Merienda', 'Cena']

const cronologicalTypes: MealType[] = ['Desayuno', 'Brunch', 'Almuerzo', 'Merienda', 'Cena']

const addNewMeal = () => {
  if (!selectedDay.value) return

  if (isEatOut.value) {
    mealStore.addMeal(
      'Comida fuera de casa',
      selectedDay.value,
      selectedType.value,
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      true,
    )
    resetForm()
    return
  }

  if (selectedDishIndex.value !== '') {
    const dish = AVAILABLE_DISHES[Number(selectedDishIndex.value)]
    if (dish) {
      mealStore.addMeal(dish.name, selectedDay.value, selectedType.value, dish.image, false)
      resetForm()
    }
  }
}

const resetForm = () => {
  selectedDishIndex.value = ''
  selectedDay.value = ''
  isEatOut.value = false
}

const productivityPercentage = computed(() => Math.round((mealStore.plannedDaysCount / 7) * 100))
</script>

<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto">
    <section class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Planificador Semanal</h1>
          <p class="text-sm text-slate-500">
            Progreso basado en las comidas principales obligatorias.
          </p>
        </div>
        <button
          @click="mealStore.clearPlan"
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
          >{{ productivityPercentage }}% ({{ mealStore.plannedDaysCount }}/7 días)</span
        >
      </div>
    </section>

    <section class="bg-white p-4 rounded-xl shadow-md mb-6 border border-slate-100">
      <h2 class="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
        Completar plan semanal de comidas
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:flex gap-3 items-center">
        <select
          v-model="selectedDishIndex"
          :disabled="isEatOut"
          class="w-full lg:flex-1 border border-slate-200 p-2.5 rounded-lg bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-slate-50"
        >
          <option value="" disabled>¿Qué vamos a comer?</option>
          <option v-for="(dish, index) in AVAILABLE_DISHES" :key="index" :value="index">
            {{ dish.name }}
          </option>
        </select>

        <select
          v-model="selectedDay"
          class="w-full lg:w-44 border border-slate-200 p-2.5 rounded-lg bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>Selecciona día</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>

        <select
          v-model="selectedType"
          class="w-full lg:w-44 border border-slate-200 p-2.5 rounded-lg bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option v-for="type in allMealTypes" :key="type" :value="type">{{ type }}</option>
        </select>

        <label
          class="flex items-center gap-2 px-2 cursor-pointer select-none text-slate-700 text-sm py-2"
        >
          <input
            type="checkbox"
            v-model="isEatOut"
            class="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>Comer fuera</span>
        </label>

        <button
          @click="addNewMeal"
          class="w-full lg:w-auto bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Asignar
        </button>
      </div>
    </section>

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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
      <div
        v-for="day in days"
        :key="day"
        class="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col"
      >
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
            <div
              v-for="meal in mealStore.meals.filter((m) => m.day === day && m.type === type)"
              :key="meal.id"
              class="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden group"
            >
              <img :src="meal.image" class="w-full h-20 object-cover" loading="lazy" />
              <div class="p-2">
                <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  {{ type }} <span v-if="meal.isEatOut" class="text-purple-600">(Fuera)</span>
                </div>
                <div class="flex justify-between items-start gap-1">
                  <p class="text-xs font-semibold text-slate-700 line-clamp-2">{{ meal.name }}</p>
                  <div class="flex items-center gap-1">
                    <button
                      @click="mealStore.toggleFavorite(meal.name)"
                      class="text-xs"
                      :class="
                        mealStore.favorites.includes(meal.name)
                          ? 'text-yellow-500'
                          : 'text-slate-300'
                      "
                    >
                      ★
                    </button>
                    <button
                      @click="mealStore.removeMeal(meal.id)"
                      class="text-slate-300 hover:text-red-500 text-xs"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
