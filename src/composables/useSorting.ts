import { computed } from 'vue'

export function useSorting(fields: string[]) {
  const sortOptions = computed(() =>
    fields.flatMap(field => [
      { title: `${field} ASC`, value: `${field}_ASC` },
      { title: `${field} DESC`, value: `${field}_DESC` },
    ])
  )

  const sortItems = <T extends { [key: string]: any }>(items: T[], sortOrder: string) => {
    const [field, direction] = sortOrder.split('_')
    return [...items].sort((a, b) => {
      const valueA = typeof a[field.toLowerCase()] === 'string' ?
        (a[field.toLowerCase()] as string).toLowerCase() :
        a[field.toLowerCase()]
      const valueB = typeof b[field.toLowerCase()] === 'string' ?
        (b[field.toLowerCase()] as string).toLowerCase() :
        b[field.toLowerCase()]

      if (field.toLowerCase() === 'date') {
        const dateA = new Date(valueA).getTime()
        const dateB = new Date(valueB).getTime()
        return direction === 'ASC' ? dateA - dateB : dateB - dateA
      } else {
        if (valueA < valueB) return direction === 'ASC' ? -1 : 1
        if (valueA > valueB) return direction === 'ASC' ? 1 : -1
        return 0
      }
    })
  }

  return {
    sortOptions,
    sortItems,
  }
}
