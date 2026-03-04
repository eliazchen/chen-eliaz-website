"use client";

import { useState, useEffect } from "react";
import {
  Accessibility,
  Plus,
  Minus,
  X,
  RotateCcw,
  Type,
  Eye,
  Link2,
  Moon,
} from "lucide-react";

// ============================================================
// Standalone Accessibility Widget (React + Tailwind CSS)
//
// Dependencies:
//   npm install lucide-react
//
// Usage:
//   import AccessibilityWidget from "./AccessibilityWidget";
//   // Place in your layout: <AccessibilityWidget />
//
// Don't forget to add the CSS from accessibility.css to your
// global stylesheet.
// ============================================================

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
};

// Customize these labels for your language
const labels = {
  openMenu: "Open accessibility menu",
  closeMenu: "Close accessibility menu",
  title: "Accessibility Settings",
  fontSize: "Text Size",
  decrease: "Decrease",
  increase: "Increase",
  decreaseText: "Decrease text",
  increaseText: "Increase text",
  highContrast: "High Contrast",
  highlightLinks: "Highlight Links",
  readableFont: "Readable Font",
  reset: "Reset Settings",
  footer: "Accessibility per Israeli law",
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const html = document.documentElement;
    const body = document.body;

    html.style.fontSize = `${newSettings.fontSize}%`;

    body.classList.toggle("high-contrast", newSettings.highContrast);
    body.classList.toggle("highlight-links", newSettings.highlightLinks);
    body.classList.toggle("readable-font", newSettings.readableFont);
  };

  const updateSettings = (newSettings: AccessibilitySettings) => {
    setSettings(newSettings);
    localStorage.setItem(
      "accessibility-settings",
      JSON.stringify(newSettings)
    );
    applySettings(newSettings);
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      updateSettings({ ...settings, fontSize: settings.fontSize + 10 });
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSettings({ ...settings, fontSize: settings.fontSize - 10 });
    }
  };

  const resetSettings = () => {
    updateSettings(defaultSettings);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/50"
        aria-label={isOpen ? labels.closeMenu : labels.openMenu}
        aria-expanded={isOpen}
        title={labels.title}
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          id="accessibility-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-panel-title"
          className="fixed bottom-24 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 w-72 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5" aria-hidden="true" />
              <span id="accessibility-panel-title" className="font-bold">
                {labels.title}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
              aria-label={labels.closeMenu}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options */}
          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
                <Type className="w-4 h-4" />
                <span>
                  {labels.fontSize} ({settings.fontSize}%)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={decreaseFontSize}
                  className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors"
                  aria-label={labels.decreaseText}
                >
                  <Minus className="w-4 h-4" />
                  <span className="text-sm">{labels.decrease}</span>
                </button>
                <button
                  onClick={increaseFontSize}
                  className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors"
                  aria-label={labels.increaseText}
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">{labels.increase}</span>
                </button>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-2">
              <button
                onClick={() =>
                  updateSettings({
                    ...settings,
                    highContrast: !settings.highContrast,
                  })
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  settings.highContrast
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                aria-pressed={settings.highContrast}
              >
                <Moon className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {labels.highContrast}
                </span>
              </button>

              <button
                onClick={() =>
                  updateSettings({
                    ...settings,
                    highlightLinks: !settings.highlightLinks,
                  })
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  settings.highlightLinks
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                aria-pressed={settings.highlightLinks}
              >
                <Link2 className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {labels.highlightLinks}
                </span>
              </button>

              <button
                onClick={() =>
                  updateSettings({
                    ...settings,
                    readableFont: !settings.readableFont,
                  })
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  settings.readableFont
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                aria-pressed={settings.readableFont}
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {labels.readableFont}
                </span>
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">{labels.reset}</span>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 text-center text-xs text-gray-500 border-t">
            {labels.footer}
          </div>
        </div>
      )}
    </>
  );
}
