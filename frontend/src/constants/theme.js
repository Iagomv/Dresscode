export const FONT_FAMILY = "'EB Garamond', serif"
export const STUDENT_THEME = {
  palette: {
    primary: { main: '#8B4513' }, // Marrón cuero
    secondary: { main: '#D2691E' }, // Chocolate
    background: {
      default: '#F5F5DC', // Beige
      paper: '#FFF8E1', // Amarillo claro
    },
  },
  typography: {
    fontFamily: '"Merriweather", serif',
    h1: { fontFamily: '"Cinzel", serif' },
  },
  textures: 'url("textura-papel-antiguo.jpg")',
}
export const MINIMALIST_THEME = {
  palette: {
    primary: { main: '#2C3E50' }, // Azul oscuro
    secondary: { main: '#7F8C8D' }, // Gris
    background: {
      default: '#ECF0F1', // Gris claro
      paper: '#FFFFFF', // Blanco
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: { fontWeight: 300, letterSpacing: '2px' },
  },
  decorations: 'líneas geométricas sutiles',
}
export const VIBRANT_THEME = {
  palette: {
    primary: { main: '#E74C3C' }, // Rojo vibrante
    secondary: { main: '#F39C12' }, // Naranja
    background: {
      default: '#FFFFFF',
      paper: '#F9F9F9',
    },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    h1: { color: '#2C3E50', fontWeight: 800 },
  },
  patterns: 'patrones geométricos coloridos',
}
export const COLORS = {
  primary: '#5a3921',
  secondary: '#8c7b6b',
  text: '#333',
  background: '#fff',
  border: '#e0d6c2',
  muted: '#6c757d',
}

export const SPACING = {
  small: '0.5rem',
  medium: '1rem',
  large: '2rem',
  xlarge: '4rem',
}

export const BREAKPOINTS = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
}

export const FONTSIZE = {
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
}

export const ROLE_VARIANTS = {
  ADMIN: 'danger',
  TEACHER: 'primary',
  STUDENT: 'secondary',
}

export const EVENT_STATUS_VARIANTS = {
  DRAFT: 'secondary',
  PUBLISHED: 'success',
  CANCELLED: 'danger',
  ARCHIVED: 'warning',
}

export const EVENT_CATEGORY_VARIANTS = {
  PUBLIC: 'success',
  PRIVATE: 'warning',
}
export const CLOTHING_ITEM = {
  STATE_VARIANTS: {
    NEW: 'success',
    USED: 'warning',
  },
  AVAILABILITY_VARIANTS: {
    AVAILABLE: 'success',
    UNAVAILABLE: 'danger',
    SOLD: 'secondary',
    LOST: 'danger',
    RESERVED: 'info',
  },
}

export const LOAN = {
  STATE_VARIANTS: {
    ACTIVE: 'success',
    PENDING: 'warning',
    REJECTED: 'danger',
    RETURNED: 'success',
    EXPIRED: 'info',
  },
}
