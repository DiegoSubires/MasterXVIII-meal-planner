<script setup lang="ts">
import { ref, watch } from 'vue'
import { AVAILABLE_DISHES, type MealType, type Meal } from '../stores/mealStore'

const props = defineProps<{
  editingMeal: Meal | null
}>()

const emit = defineEmits<{
  (e: 'save', data: { name: string; day: string; type: MealType; isEatOut: boolean }): void
  (e: 'cancel'): void
}>()

const customDishName = ref('')
const selectedDay = ref('')
const selectedType = ref<MealType>('Almuerzo')
const isEatOut = ref(false)

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const allMealTypes: MealType[] = ['Desayuno', 'Brunch', 'Almuerzo', 'Merienda', 'Cena']

const resetForm = () => {
  customDishName.value = ''
  selectedDay.value = ''
  isEatOut.value = false
}

watch(
  () => props.editingMeal,
  (newMeal) => {
    if (newMeal) {
      customDishName.value = newMeal.name
      selectedDay.value = newMeal.day
      selectedType.value = newMeal.type
      isEatOut.value = newMeal.isEatOut || false
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const onSelectPresetDish = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const index = Number(select.value)
  if (!isNaN(index) && AVAILABLE_DISHES[index]) {
    customDishName.value = AVAILABLE_DISHES[index].name
  }
  select.value = ''
}

const handleSubmit = () => {
  if (!selectedDay.value) return
  emit('save', {
    name: customDishName.value,
    day: selectedDay.value,
    type: selectedType.value,
    isEatOut: isEatOut.value,
  })
  resetForm()
}
</script>

<template>
  <section class="bg-white p-4 rounded-xl shadow-md mb-6 border border-slate-100">
    <h2
      class="text-sm font-semibold uppercase tracking-wider mb-3"
      :class="editingMeal ? 'text-amber-600' : 'text-blue-600'"
    >
      {{ editingMeal ? '✏️ Editando plato del plan' : 'Completar plan semanal de comidas' }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:flex gap-3 items-center">
      <input
        type="text"
        v-model="customDishName"
        :disabled="isEatOut"
        placeholder="Escribe un plato (ej. Macarrones...)"
        class="w-full lg:flex-1 border border-slate-200 p-2.5 rounded-lg bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-slate-50"
      />

      <select
        @change="onSelectPresetDish"
        :disabled="isEatOut"
        class="w-full lg:w-56 border border-slate-200 p-2.5 rounded-lg bg-slate-50 text-slate-600 text-sm outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-slate-50"
      >
        <option value="" selected disabled>✨ O elige de nuestro catálogo...</option>
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

      <div class="flex gap-2 w-full lg:w-auto">
        <button
          @click="handleSubmit"
          class="w-full lg:w-auto font-medium px-6 py-2.5 rounded-lg transition text-white"
          :class="editingMeal ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'"
        >
          {{ editingMeal ? 'Guardar' : '➕ Asignar' }}
        </button>

        <button
          v-if="editingMeal"
          @click="emit('cancel')"
          class="bg-slate-100 text-slate-600 font-medium px-4 py-2.5 rounded-lg hover:bg-slate-200 transition text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  </section>
</template>
