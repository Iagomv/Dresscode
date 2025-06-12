const statusColors = {
  ADMIN: '#4caf50',
  STUDENT: '#2196f3',
  VOLUNTEER: '#ff9800',
  ACTIVE: '#66bb6a',
  INACTIVE: '#ef5350',
  PENDING: '#ffb300',
  APPROVED: '#4caf50',
  RETURNED: '#90a4ae',
  PLANNED: '#29b6f6',
  COMPLETED: '#66bb6a',
  CANCELLED: '#ef5350',
  WORKSHOP: '#ab47bc',
  SEMINAR: '#5c6bc0',
  OUTREACH: '#26a69a',
  TEACHER: '#8e24aa',
  EXPIRED: '#e53935',
  PUBLISHED: '#43a047',
  DRAFT: '#fbc02d',
  ARCHIVED: '#757575',
  PUBLIC: '#1e88e5',
  PRIVATE: '#e65100',
}

export function mapToChartData(obj, t, translationKeyPrefix = '') {
  if (!obj) return []

  return Object.entries(obj).map(([name, value]) => {
    const key = name.toLowerCase()
    const translationKey = translationKeyPrefix ? `${translationKeyPrefix}.${key}` : name
    const translatedName = t(translationKey)

    const colorKey = name.toUpperCase()
    const fill = statusColors[colorKey] || stringToColor(name)

    if (!statusColors[colorKey]) {
      console.warn(`No color mapped for key: "${name}"`)
    }

    return {
      name: translatedName,
      value,
      fill,
    }
  })
}
// Basic hash to color function
function stringToColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += value.toString(16).padStart(2, '0')
  }
  return color
}
