export const themes = {
  gym: {
    id: 'gym',
    name: 'Gym / Fitness',
    accent: '#00ff88',
    accentSecondary: '#ff3366',
    glow: 'rgba(0, 255, 136, 0.4)',
    glowSecondary: 'rgba(255, 51, 102, 0.4)',
    vibe: 'aggressive-motion',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(255, 51, 102, 0.1) 100%)',
    motion: {
      animationSpeed: 'fast',
      hoverScale: 1.05,
      transitionDuration: 200
    }
  },
  dental: {
    id: 'dental',
    name: 'Dental / Healthcare',
    accent: '#00d4ff',
    accentSecondary: '#0099cc',
    glow: 'rgba(0, 212, 255, 0.4)',
    glowSecondary: 'rgba(0, 153, 204, 0.4)',
    vibe: 'gentle-fade',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2a4a 50%, #0a1628 100%)',
    cardGradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 153, 204, 0.08) 100%)',
    motion: {
      animationSpeed: 'slow',
      hoverScale: 1.02,
      transitionDuration: 400
    }
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate',
    accent: '#d4af37',
    accentSecondary: '#f4d03f',
    glow: 'rgba(212, 175, 55, 0.4)',
    glowSecondary: 'rgba(244, 208, 63, 0.4)',
    vibe: 'parallax-editorial',
    gradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1815 50%, #0f0f0f 100%)',
    cardGradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(244, 208, 63, 0.08) 100%)',
    motion: {
      animationSpeed: 'medium',
      hoverScale: 1.03,
      transitionDuration: 300
    }
  }
}

export const ThemeFactory = {
  getTheme(themeId) {
    return themes[themeId] || themes.gym
  },
  
  getAllThemes() {
    return Object.values(themes)
  },
  
  getThemeByVibe(vibe) {
    return Object.values(themes).find(t => t.vibe === vibe)
  },
  
  interpolateThemes(theme1, theme2, progress) {
    const lerp = (a, b, t) => {
      const parseHex = (hex) => parseInt(hex.replace('#', ''), 16)
      const r1 = (parseHex(a) >> 16) & 255, g1 = (parseHex(a) >> 8) & 255, b1 = parseHex(a) & 255
      const r2 = (parseHex(b) >> 16) & 255, g2 = (parseHex(b) >> 8) & 255, b2 = parseHex(b) & 255
      const r = Math.round(r1 + (r2 - r1) * t)
      const g = Math.round(g1 + (g2 - g1) * t)
      const bl = Math.round(b1 + (b2 - b1) * t)
      return `#${((r << 16) | (g << 8) | bl).toString(16).padStart(6, '0')}`
    }
    
    return {
      ...theme1,
      accent: lerp(theme1.accent, theme2.accent, progress),
      accentSecondary: lerp(theme1.accentSecondary, theme2.accentSecondary, progress),
      glow: `rgba(${theme1.accent.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, ${0.4 * (1 - progress)})`,
      glowSecondary: `rgba(${theme2.accent.slice(1).match(/.{2}/g).map(x => parseInt(x, 16)).join(', ')}, ${0.4 * progress})`
    }
  }
}

export default ThemeFactory
