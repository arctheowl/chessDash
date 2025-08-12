import { Theme } from './themes';

// Predefined Tailwind classes for each theme
const themeClassMap = {
  'Purple Night': {
    bgGradient: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    surface: 'bg-white/10',
    surfaceHover: 'hover:bg-white/20',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-white/20',
    buttonPrimary: 'bg-purple-600 hover:bg-purple-700 text-white',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    card: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    iconPrimary: 'text-purple-400',
    iconSecondary: 'text-purple-500',
    iconAccent: 'text-purple-300',
  },
  'Ocean Blue': {
    bgGradient: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    surface: 'bg-white/10',
    surfaceHover: 'hover:bg-white/20',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-white/20',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    card: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    iconPrimary: 'text-blue-400',
    iconSecondary: 'text-blue-500',
    iconAccent: 'text-blue-300',
  },
  'Emerald Forest': {
    bgGradient: 'bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900',
    surface: 'bg-white/10',
    surfaceHover: 'hover:bg-white/20',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-white/20',
    buttonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    card: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    iconPrimary: 'text-emerald-400',
    iconSecondary: 'text-emerald-500',
    iconAccent: 'text-emerald-300',
  },
  'Sunset Orange': {
    bgGradient: 'bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900',
    surface: 'bg-white/10',
    surfaceHover: 'hover:bg-white/20',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-white/20',
    buttonPrimary: 'bg-orange-600 hover:bg-orange-700 text-white',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    card: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    iconPrimary: 'text-orange-400',
    iconSecondary: 'text-orange-500',
    iconAccent: 'text-orange-300',
  },
  'Rose Pink': {
    bgGradient: 'bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900',
    surface: 'bg-white/10',
    surfaceHover: 'hover:bg-white/20',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    border: 'border-white/20',
    buttonPrimary: 'bg-rose-600 hover:bg-rose-700 text-white',
    buttonSecondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    card: 'bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20',
    iconPrimary: 'text-rose-400',
    iconSecondary: 'text-rose-500',
    iconAccent: 'text-rose-300',
  },
  'Classic Light': {
    bgGradient: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50',
    surface: 'bg-white',
    surfaceHover: 'hover:bg-gray-50',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-700',
    textMuted: 'text-gray-500',
    border: 'border-gray-200',
    buttonPrimary: 'bg-gray-800 hover:bg-gray-700 text-white',
    buttonSecondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200',
    card: 'bg-white backdrop-blur-lg rounded-2xl border border-gray-200',
    iconPrimary: 'text-gray-800',
    iconSecondary: 'text-gray-700',
    iconAccent: 'text-gray-600',
  },
  'Midnight Dark': {
    bgGradient: 'bg-gradient-to-br from-black via-gray-900 to-black',
    surface: 'bg-gray-900',
    surfaceHover: 'hover:bg-gray-800',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-500',
    border: 'border-gray-800',
    buttonPrimary: 'bg-gray-300 hover:bg-gray-400 text-black',
    buttonSecondary: 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-800',
    card: 'bg-gray-900 backdrop-blur-lg rounded-2xl border border-gray-800',
    iconPrimary: 'text-gray-300',
    iconSecondary: 'text-gray-400',
    iconAccent: 'text-gray-500',
  },
};

// Avatar gradient classes
const avatarGradients = {
  'Purple Night': 'bg-gradient-to-br from-purple-500 to-blue-600',
  'Ocean Blue': 'bg-gradient-to-br from-blue-500 to-cyan-600',
  'Emerald Forest': 'bg-gradient-to-br from-emerald-500 to-green-600',
  'Sunset Orange': 'bg-gradient-to-br from-orange-500 to-red-600',
  'Rose Pink': 'bg-gradient-to-br from-rose-500 to-pink-600',
  'Classic Light': 'bg-gradient-to-br from-gray-600 to-gray-700',
  'Midnight Dark': 'bg-gradient-to-br from-gray-400 to-gray-500',
};

// Title badge classes
const titleBadgeClasses = {
  'Purple Night': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  'Ocean Blue': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  'Emerald Forest': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  'Sunset Orange': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  'Rose Pink': 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  'Classic Light': 'bg-gray-800/20 text-gray-600 border border-gray-800/30',
  'Midnight Dark': 'bg-gray-300/20 text-gray-500 border border-gray-300/30',
};

export function getThemeClasses(theme: Theme) {
  return themeClassMap[theme.name as keyof typeof themeClassMap] || themeClassMap['Purple Night'];
}

export function getIconColorClass(theme: Theme, type: 'primary' | 'secondary' | 'accent' = 'primary') {
  const classes = getThemeClasses(theme);
  const colorMap = {
    primary: classes.iconPrimary,
    secondary: classes.iconSecondary,
    accent: classes.iconAccent,
  };
  return colorMap[type];
}

export function getGradientClass(theme: Theme) {
  return getThemeClasses(theme).bgGradient;
}

export function getAvatarGradientClass(theme: Theme) {
  return avatarGradients[theme.name as keyof typeof avatarGradients] || avatarGradients['Purple Night'];
}

export function getTitleBadgeClass(theme: Theme) {
  return titleBadgeClasses[theme.name as keyof typeof titleBadgeClasses] || titleBadgeClasses['Purple Night'];
}

export function getThemeColorHex(theme: Theme, colorType: 'primary' | 'secondary' | 'accent' = 'primary') {
  const colorMap: Record<string, Record<string, string>> = {
    primary: {
      'purple-600': '#8b5cf6',
      'blue-600': '#2563eb',
      'emerald-600': '#059669',
      'orange-600': '#ea580c',
      'rose-600': '#e11d48',
      'gray-800': '#1f2937',
      'gray-300': '#d1d5db',
    },
    secondary: {
      'purple-500': '#a855f7',
      'blue-500': '#3b82f6',
      'emerald-500': '#10b981',
      'orange-500': '#f97316',
      'rose-500': '#f43f5e',
      'gray-700': '#374151',
      'gray-400': '#9ca3af',
    },
    accent: {
      'purple-400': '#c084fc',
      'blue-400': '#60a5fa',
      'emerald-400': '#34d399',
      'orange-400': '#fb923c',
      'rose-400': '#fb7185',
      'gray-600': '#4b5563',
      'gray-500': '#6b7280',
    }
  };
  
  const colorKey = theme.colors[colorType];
  return colorMap[colorType][colorKey] || colorMap.primary['purple-600'];
}
