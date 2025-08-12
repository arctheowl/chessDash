# Chess Dashboard Theme System

The Chess Dashboard now includes a comprehensive theme system that allows users to switch between different visual themes. The theme switcher is located in the top-right corner of both the main dashboard and demo pages.

## Available Themes

### 1. Purple Night (Default)
- **Description**: Current dark theme with purple accents
- **Colors**: Purple gradient with dark background
- **Best for**: Modern, elegant look with good contrast

### 2. Ocean Blue
- **Description**: Deep blue ocean theme
- **Colors**: Blue gradient with dark background
- **Best for**: Calm, professional appearance

### 3. Emerald Forest
- **Description**: Green forest theme
- **Colors**: Green gradient with dark background
- **Best for**: Natural, growth-focused aesthetic

### 4. Sunset Orange
- **Description**: Warm orange sunset theme
- **Colors**: Orange gradient with dark background
- **Best for**: Energetic, warm feeling

### 5. Rose Pink
- **Description**: Elegant pink theme
- **Colors**: Pink gradient with dark background
- **Best for**: Sophisticated, modern look

### 6. Classic Light
- **Description**: Clean light theme
- **Colors**: Light gray background with dark text
- **Best for**: Traditional, clean appearance

### 7. Midnight Dark
- **Description**: Pure dark theme
- **Colors**: Black background with light text
- **Best for**: Minimalist, high contrast

## How to Use

1. **Access Theme Switcher**: Click the palette icon in the top-right corner of the dashboard
2. **Select Theme**: Choose from the dropdown menu of available themes
3. **Automatic Save**: Your theme preference is automatically saved to localStorage
4. **Persistent**: The selected theme will be remembered across browser sessions

## Theme Components

The theme system affects all major components:

- **Background**: Dynamic gradient backgrounds
- **Cards**: Glassmorphism effects with theme colors
- **Text**: Primary, secondary, and muted text colors
- **Icons**: Theme-colored icons throughout the interface
- **Charts**: Rating charts adapt to the selected theme
- **Buttons**: Interactive elements use theme colors
- **Borders**: Subtle borders match the theme

## Technical Implementation

### Theme Structure
Each theme defines:
- Primary, secondary, and accent colors
- Background and surface colors
- Text colors (primary, secondary, muted)
- Border colors
- Gradient configurations

### Files Involved
- `src/lib/themes.ts` - Theme definitions
- `src/lib/ThemeContext.tsx` - React context for theme state
- `src/lib/themeUtils.ts` - Utility functions for theme classes
- `src/components/ThemeSwitcher.tsx` - Theme selection component

### Usage in Components
```typescript
import { useTheme } from '@/lib/ThemeContext';
import { getThemeClasses } from '@/lib/themeUtils';

function MyComponent() {
  const { currentTheme } = useTheme();
  const themeClasses = getThemeClasses(currentTheme);
  
  return (
    <div className={themeClasses.card}>
      <h1 className={themeClasses.textPrimary}>Title</h1>
    </div>
  );
}
```

## Customization

To add a new theme:

1. Add the theme definition to `src/lib/themes.ts`
2. Update the color mapping in `src/lib/themeUtils.ts` if needed
3. Test the theme across all components

The theme system is designed to be easily extensible and maintainable.
