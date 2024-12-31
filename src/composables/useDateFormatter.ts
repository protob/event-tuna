export function useDateFormatter() {
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString(undefined, options)
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid Date'
    }
  }

  const formatEventDate = (dateString: string, endDateString?: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      const startDate = new Date(dateString);
      if (isNaN(startDate.getTime())) {
        return 'Invalid Date';
      }

      if (endDateString) {
        const endDate = new Date(endDateString);
        if (isNaN(endDate.getTime())) {
          return 'Invalid Date';
        }
        return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
      }
      return startDate.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting event date:', error);
      return 'Invalid Date';
    }
  };


  return {
    formatDate,
    formatEventDate,
  }
}
