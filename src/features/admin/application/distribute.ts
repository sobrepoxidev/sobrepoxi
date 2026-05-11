export const formatModifiedDate = (dateString: string): string => {
  const now = new Date();
  const modifiedDate = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = { 
    timeZone: 'America/Costa_Rica',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true 
  };
  
  const timeFormatter = new Intl.DateTimeFormat('es-CR', options);
  const timeString = timeFormatter.format(modifiedDate).toLowerCase();
  
  const diffInMs = now.getTime() - modifiedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  
  if (diffInDays === 0) {
    return `Hoy a las ${timeString}`;
  } 
  else if (diffInDays === 1) {
    return `Ayer a las ${timeString}`;
  } 
  else if (diffInDays < 7) {
    const dayFormatter = new Intl.DateTimeFormat('es-CR', { 
      weekday: 'long',
      timeZone: 'America/Costa_Rica'
    });
    const dayName = dayFormatter.format(modifiedDate);
    return `El ${dayName.charAt(0).toUpperCase() + dayName.slice(1)} a las ${timeString}`;
  } 
  else if (diffInWeeks === 1) {
    return 'La semana pasada';
  } 
  else if (diffInWeeks < 4) {
    return `Hace ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
  } 
  else {
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) {
      return 'Hace 1 mes';
    } else if (diffInMonths < 12) {
      return `Hace ${diffInMonths} meses`;
    } else {
      const diffInYears = Math.floor(diffInMonths / 12);
      return `Hace ${diffInYears} año${diffInYears > 1 ? 's' : ''}`;
    }
  }
};

export const formatDate = formatModifiedDate;
