"use client";

import { useEffect } from "react";
import { PortfolioTheme, PortfolioTypography } from "@/data/portfolio";

interface Props {
  theme?: PortfolioTheme;
  typography?: PortfolioTypography;
}

// Convert hex color to rgb string "r, g, b"
function hexToRgb(hex: string): string {
  const sanitized = hex.replace("#", "");
  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16);
    const g = parseInt(sanitized[1] + sanitized[1], 16);
    const b = parseInt(sanitized[2] + sanitized[2], 16);
    return `${r}, ${g}, ${b}`;
  }
  if (sanitized.length === 6) {
    const r = parseInt(sanitized.substring(0, 2), 16);
    const g = parseInt(sanitized.substring(2, 4), 16);
    const b = parseInt(sanitized.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "0, 242, 254";
}

export default function ThemeAndFontSync({ theme, typography }: Props) {
  useEffect(() => {
    // 1. Determine active theme & typography (checking localStorage for live unsaved preview overrides)
    let activeTheme = theme;
    let activeTypography = typography;

    try {
      const stored = localStorage.getItem("portfolio_preview_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.theme) activeTheme = parsed.theme;
        if (parsed.typography) activeTypography = parsed.typography;
      }
    } catch {
      // ignore JSON parse error
    }

    const root = document.documentElement;

    // 2. Apply theme colors to CSS variables
    if (activeTheme) {
      if (activeTheme.backgroundColor) {
        root.style.setProperty("--background", activeTheme.backgroundColor);
        document.body.style.backgroundColor = activeTheme.backgroundColor;
      }
      if (activeTheme.cardColor) {
        root.style.setProperty("--card-bg", activeTheme.cardColor);
      }
      if (activeTheme.primaryColor) {
        root.style.setProperty("--accent-cyan", activeTheme.primaryColor);
        root.style.setProperty("--primary-rgb", hexToRgb(activeTheme.primaryColor));
      }
      if (activeTheme.secondaryColor) {
        root.style.setProperty("--accent-violet", activeTheme.secondaryColor);
        root.style.setProperty("--secondary-rgb", hexToRgb(activeTheme.secondaryColor));
      }
      if (activeTheme.accentColor) {
        root.style.setProperty("--accent-emerald", activeTheme.accentColor);
      }
    }

    // 3. Apply typography settings
    if (activeTypography) {
      const fontHeading = activeTypography.headingFont || "Plus Jakarta Sans";
      const fontBody = activeTypography.bodyFont || "Plus Jakarta Sans";
      const fontMono = activeTypography.monoFont || "JetBrains Mono";

      // Dynamically load Google Font if not a system font
      const fontsToLoad = [fontHeading, fontBody, fontMono].filter(
        (f) => !["System", "system-ui", "monospace"].includes(f)
      );
      
      const uniqueFonts = Array.from(new Set(fontsToLoad));
      if (uniqueFonts.length > 0) {
        const fontFamiliesParam = uniqueFonts
          .map((f) => `family=${f.replace(/ /g, "+")}:wght@300;400;500;600;700;800`)
          .join("&");
        const linkId = "dynamic-portfolio-google-fonts";
        let linkEl = document.getElementById(linkId) as HTMLLinkElement | null;
        if (!linkEl) {
          linkEl = document.createElement("link");
          linkEl.id = linkId;
          linkEl.rel = "stylesheet";
          document.head.appendChild(linkEl);
        }
        linkEl.href = `https://fonts.googleapis.com/css2?${fontFamiliesParam}&display=swap`;
      }

      root.style.setProperty(
        "--font-sans-main",
        `'${fontBody}', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
      );
      root.style.setProperty(
        "--font-heading-main",
        `'${fontHeading}', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
      );
      root.style.setProperty(
        "--font-mono-main",
        `'${fontMono}', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
      );

      if (activeTypography.letterSpacing === "tight") {
        document.body.style.letterSpacing = "-0.025em";
      } else if (activeTypography.letterSpacing === "wide") {
        document.body.style.letterSpacing = "0.035em";
      } else {
        document.body.style.letterSpacing = "-0.01em";
      }
    }
  }, [theme, typography]);

  return null;
}
