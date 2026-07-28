<script setup lang="ts">
import { ref } from 'vue'
import { useMealStore } from '../stores/mealStore'

const mealStore = useMealStore()
const exportedText = ref('')

const exportMenu = () => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  let text = '📅 MI PLANIFICACIÓN SEMANAL DE COMIDAS 📅\n\n'

  days.forEach((day) => {
    const dayMeals = mealStore.meals.filter((m) => m.day === day)
    text += `🔹 ${day.toUpperCase()}:\n`

    if (dayMeals.length === 0) {
      text += '  (Sin planificar)\n'
    } else {
      dayMeals.forEach((m) => {
        text += `  - [${m.type}]: ${m.name}\n`
      })
    }
    text += '\n'
  })

  exportedText.value = text
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(exportedText.value)
  alert('¡Menú copiado al portapapeles con éxito!')
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-slate-800 mb-6">⚙️ Configuración y Herramientas</h1>

    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <div>
        <h2 class="text-base font-bold text-slate-700 mb-2">Exportar Menú Semanal</h2>
        <p class="text-sm text-slate-500 mb-4">
          Genera un informe en texto plano limpio optimizado para imprimir o compartir con tu
          familia.
        </p>

        <button
          @click="exportMenu"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          📋 Generar Texto
        </button>
      </div>

      <div v-if="exportedText" class="space-y-3">
        <textarea
          v-model="exportedText"
          rows="10"
          class="w-full p-3 font-mono text-xs border rounded-lg bg-slate-50 border-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>

        <button
          @click="copyToClipboard"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition"
        >
          ✂️ Copiar Texto Opcional
        </button>
      </div>
    </div>
  </div>
</template>
