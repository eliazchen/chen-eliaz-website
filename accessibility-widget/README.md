# Accessibility Widget

A standalone React + Tailwind CSS accessibility widget that provides:
- Font size control (80% - 150%)
- High contrast mode
- Link highlighting
- Readable font mode
- Settings persist in localStorage

## Requirements

- React 18+
- Tailwind CSS
- lucide-react (`npm install lucide-react`)

## Setup

1. Copy `AccessibilityWidget.tsx` into your components directory
2. Add the contents of `accessibility.css` to your global stylesheet
3. Import and use the component in your layout:

```tsx
import AccessibilityWidget from "./components/AccessibilityWidget";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <AccessibilityWidget />
    </>
  );
}
```

## Customization

- Edit the `labels` object in the component to change text/language
- Replace `bg-blue-600` / `bg-green-600` with your brand colors
- Adjust font size range by changing the 80/150 limits
