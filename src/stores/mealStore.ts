import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type MealType = 'Desayuno' | 'Brunch' | 'Almuerzo' | 'Merienda' | 'Cena'

export interface Meal {
  id: string
  name: string
  day: string
  type: MealType
  image?: string
  isEatOut?: boolean
}

export const AVAILABLE_DISHES = [
  {
    name: 'Lentejas estofadas',
    image:
      'https://res.cloudinary.com/pabxov0y/image/upload/v1785141437/Lentejas_estofadas_rx62ah.jpg',
  },
  {
    name: 'Tortilla de patatas',
    image:
      'https://res.cloudinary.com/pabxov0y/image/upload/v1785141437/Tortilla_de_patatas_irhch7.jpg',
  },
  {
    name: 'Pescado a la plancha',
    image:
      'https://res.cloudinary.com/pabxov0y/image/upload/v1785141436/Pescado_a_la_plancha_gxszew.avif',
  },
  {
    name: 'Ensalada César',
    image:
      'https://res.cloudinary.com/pabxov0y/image/upload/v1785141436/Ensalada_C%C3%A9sar_r5spme.jpg',
  },
  {
    name: 'Pasta al pesto',
    image: 'https://res.cloudinary.com/pabxov0y/image/upload/v1785141437/Pasta_al_pesto_stvoz4.jpg',
  },
  {
    name: 'Pizza artesana',
    image: 'https://res.cloudinary.com/pabxov0y/image/upload/v1785141436/Pizza_artesana_w0rvsf.jpg',
  },
  {
    name: 'Yogur con avena',
    image:
      'https://res.cloudinary.com/pabxov0y/image/upload/v1785141436/Yogur_con_avena_lnuatp.jpg',
  },
  {
    name: 'Tostada con aguacate',
    image:
      'https://res.cloudinary.com/pabxov0y/image/upload/v1785141436/Tostada_con_aguacate_hyjbxk.webp',
  },
]

export const DEFAULT_MEAL_IMAGES: Record<MealType, string> = {
  Desayuno: 'https://res.cloudinary.com/pabxov0y/image/upload/v1782987473/cld-sample-4.jpg',
  Brunch: 'https://res.cloudinary.com/pabxov0y/image/upload/v1786431865/Brunch_trvxgu.jpg',
  Almuerzo: 'https://res.cloudinary.com/pabxov0y/image/upload/v1786431864/Almuerzo_sdd1sh.jpg',
  Merienda: 'https://res.cloudinary.com/pabxov0y/image/upload/v1786431864/Merienda_xokhaq.jpg',
  Cena: 'https://res.cloudinary.com/pabxov0y/image/upload/v1786431864/Cenas_kwjac6.jpg',
}

export const useMealStore = defineStore(
  'mealStore',
  () => {
    const meals = ref<Meal[]>([])
    const favorites = ref<string[]>(['Lentejas estofadas', 'Tortilla de patatas'])

    // Acciones
    const addMeal = (
      name: string,
      day: string,
      type: MealType,
      image?: string,
      isEatOut = false,
    ) => {
      const finalImage = image || DEFAULT_MEAL_IMAGES[type]

      meals.value.push({
        id: crypto.randomUUID(),
        name: isEatOut ? 'Comida fuera de casa' : name,
        day,
        type,
        image: finalImage,
        isEatOut, // Ahora se guarda la propiedad isEatOut en la entidad
      })
    }

    const updateMeal = (id: string, name: string, day: string, type: MealType, image?: string) => {
      const mealIndex = meals.value.findIndex((m) => m.id === id)
      if (mealIndex === -1) return

      const existingMeal = meals.value[mealIndex]

      if (!existingMeal) return

      meals.value[mealIndex] = {
        id: existingMeal.id,
        name,
        day,
        type,
        image: image || DEFAULT_MEAL_IMAGES[type],
        isEatOut: existingMeal.isEatOut,
      }
    }

    const removeMeal = (id: string) => {
      meals.value = meals.value.filter((m) => m.id !== id)
    }

    const toggleFavorite = (name: string) => {
      if (favorites.value.includes(name)) {
        favorites.value = favorites.value.filter((f) => f !== name)
      } else {
        favorites.value.push(name)
      }
    }

    const clearPlan = () => {
      meals.value = []
    }

    // Getters
    const totalMeals = computed(() => meals.value.length)

    const plannedMealsProgressCount = computed(() => {
      const coreTypes: MealType[] = ['Desayuno', 'Almuerzo', 'Cena']

      const coveredSlots = new Set<string>()

      meals.value.forEach((m) => {
        if (coreTypes.includes(m.type) || m.isEatOut) {
          coveredSlots.add(`${m.day}-${m.type}`)
        }
      })

      return coveredSlots.size
    })

    return {
      meals,
      favorites,
      addMeal,
      updateMeal,
      removeMeal,
      toggleFavorite,
      clearPlan,
      totalMeals,
      plannedMealsProgressCount,
    }
  },
  {
    persist: true,
  },
)
