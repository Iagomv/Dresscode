export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getBadgeVariant = (type, value) => {
  const variants = {
    priority: {
      HIGH: 'danger',
      MEDIUM: 'warning',
      LOW: 'success',
    },
    status: {
      OPEN: 'primary',
      IN_PROGRESS: 'warning',
      CLOSED: 'success',
    },
  }
  return variants[type][value] || 'secondary'
}
///STATS colors
export const COLORS = ['#00E396', '#775DD0', '#FF4560', '#FEB019', '#008FFB']
export const priorityColors = {
  HIGH: '#FF4560',
  MEDIUM: '#FEB019',
  LOW: '#00E396',
}
export const statusColors = {
  OPEN: '#00E396',
  IN_PROGRESS: '#775DD0',
  CLOSED: '#FF4560',
}
