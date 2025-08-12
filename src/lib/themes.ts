export interface Theme {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
    gradient: {
      from: string;
      via: string;
      to: string;
    };
  };
}

export const themes: Theme[] = [
  {
    name: 'Purple Night',
    description: 'Current dark theme with purple accents',
    colors: {
      primary: 'purple-600',
      secondary: 'purple-500',
      accent: 'purple-400',
      background: 'slate-900',
      surface: 'white/10',
      text: {
        primary: 'white',
        secondary: 'gray-300',
        muted: 'gray-400',
      },
      border: 'white/20',
      gradient: {
        from: 'slate-900',
        via: 'purple-900',
        to: 'slate-900',
      },
    },
  },
  {
    name: 'Ocean Blue',
    description: 'Deep blue ocean theme',
    colors: {
      primary: 'blue-600',
      secondary: 'blue-500',
      accent: 'blue-400',
      background: 'slate-900',
      surface: 'white/10',
      text: {
        primary: 'white',
        secondary: 'gray-300',
        muted: 'gray-400',
      },
      border: 'white/20',
      gradient: {
        from: 'slate-900',
        via: 'blue-900',
        to: 'slate-900',
      },
    },
  },
  {
    name: 'Emerald Forest',
    description: 'Green forest theme',
    colors: {
      primary: 'emerald-600',
      secondary: 'emerald-500',
      accent: 'emerald-400',
      background: 'slate-900',
      surface: 'white/10',
      text: {
        primary: 'white',
        secondary: 'gray-300',
        muted: 'gray-400',
      },
      border: 'white/20',
      gradient: {
        from: 'slate-900',
        via: 'emerald-900',
        to: 'slate-900',
      },
    },
  },
  {
    name: 'Sunset Orange',
    description: 'Warm orange sunset theme',
    colors: {
      primary: 'orange-600',
      secondary: 'orange-500',
      accent: 'orange-400',
      background: 'slate-900',
      surface: 'white/10',
      text: {
        primary: 'white',
        secondary: 'gray-300',
        muted: 'gray-400',
      },
      border: 'white/20',
      gradient: {
        from: 'slate-900',
        via: 'orange-900',
        to: 'slate-900',
      },
    },
  },
  {
    name: 'Rose Pink',
    description: 'Elegant pink theme',
    colors: {
      primary: 'rose-600',
      secondary: 'rose-500',
      accent: 'rose-400',
      background: 'slate-900',
      surface: 'white/10',
      text: {
        primary: 'white',
        secondary: 'gray-300',
        muted: 'gray-400',
      },
      border: 'white/20',
      gradient: {
        from: 'slate-900',
        via: 'rose-900',
        to: 'slate-900',
      },
    },
  },
  {
    name: 'Classic Light',
    description: 'Clean light theme',
    colors: {
      primary: 'gray-800',
      secondary: 'gray-700',
      accent: 'gray-600',
      background: 'gray-50',
      surface: 'white',
      text: {
        primary: 'gray-900',
        secondary: 'gray-700',
        muted: 'gray-500',
      },
      border: 'gray-200',
      gradient: {
        from: 'gray-50',
        via: 'gray-100',
        to: 'gray-50',
      },
    },
  },
  {
    name: 'Midnight Dark',
    description: 'Pure dark theme',
    colors: {
      primary: 'gray-300',
      secondary: 'gray-400',
      accent: 'gray-500',
      background: 'black',
      surface: 'gray-900',
      text: {
        primary: 'white',
        secondary: 'gray-300',
        muted: 'gray-500',
      },
      border: 'gray-800',
      gradient: {
        from: 'black',
        via: 'gray-900',
        to: 'black',
      },
    },
  },
];

export const defaultTheme = themes[0];
