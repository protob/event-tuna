export function useDateFormatter() {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatEventDate = (event: { date: string; category: string; endDate?: string }) => {
    const startDate = new Date(event.date)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }

    if (event.category === 'Festival' && event.endDate) {
      const endDate = new Date(event.endDate)
      return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`
    } else {
      return startDate.toLocaleDateString(undefined, options)
    }
  }

  return {
    formatDate,
    formatEventDate,
  }
}
