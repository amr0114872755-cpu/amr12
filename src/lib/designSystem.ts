/**
 * ============================================================================
 * COMPLETE DESIGN SYSTEM - PRODUCTION READY
 * ============================================================================
 *
 * A comprehensive, reusable design system that reproduces the Quranic
 * application's visual style and atmospheric design language.
 *
 * Features:
 * - Dark theme with neon emerald accents
 * - Glassmorphism effects
 * - Advanced shadow and blur techniques
 * - Responsive typography
 * - Comprehensive component library
 * - Production-optimized CSS
 */

// ============================================================================
// 1. COLOR SYSTEM
// ============================================================================

const designSystem = {
  colors: {
    // Primary Emerald Colors (Main Brand)
    emerald: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBFBDA',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#145231',
      950: '#092E20',
      primary: '#10B981',    // Main brand color
      dark: '#065F46',       // Dark variant
      light: '#D1FAE5',      // Light variant
      neon: '#10B981',       // Neon glow
    },

    // Accent Colors
    accents: {
      teal: '#14B8A6',
      cyan: '#06B6D4',
      gold: '#FBBF24',
      rose: '#FB7185',
      purple: '#A855F7',
      blue: '#3B82F6',
    },

    // Background Colors
    background: {
      darkest: '#030A06',    // Main bg (nearly black with green tint)
      dark: '#0A0F0A',       // Secondary bg
      lighter: '#0F1410',    // Tertiary bg
      card: 'rgba(6, 20, 10, 0.7)',
      glass: 'rgba(6, 20, 10, 0.6)',
    },

    // Text Colors
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E7EB',
      tertiary: '#9CA3AF',
      muted: '#4B5563',
    },

    // Semantic Colors
    semantic: {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#06B6D4',
    },
  },

  // ============================================================================
  // 2. SHADOW SYSTEM
  // ============================================================================
  shadows: {
    // Layered card shadows for depth
    card: [
      '0 4px 6px rgba(0, 0, 0, 0.1)',
      '0 10px 15px rgba(0, 0, 0, 0.2)',
      '0 20px 25px rgba(0, 0, 0, 0.3)',
    ].join(', '),

    // Deep shadow for featured elements
    deep: '0 20px 50px rgba(0, 0, 0, 0.5)',

    // Neon glow effects
    neonEmerald: [
      '0 0 10px rgba(16, 185, 129, 0.4)',
      '0 0 20px rgba(16, 185, 129, 0.2)',
      '0 0 40px rgba(16, 185, 129, 0.1)',
    ].join(', '),

    neonTeal: [
      '0 0 10px rgba(20, 184, 166, 0.4)',
      '0 0 20px rgba(20, 184, 166, 0.2)',
      '0 0 40px rgba(20, 184, 166, 0.1)',
    ].join(', '),

    // Icon glow (interactive)
    iconGlow: '0 0 8px rgba(16, 185, 129, 0.6), 0 0 16px rgba(16, 185, 129, 0.3)',

    // Inset highlight (glass effect)
    insetHighlight: 'inset 0 1px 0 rgba(16, 185, 129, 0.08)',
  },

  // ============================================================================
  // 3. BLUR VALUES
  // ============================================================================
  blur: {
    glass: '20px',      // Main containers
    card: '16px',       // Card elements
    overlay: '10px',    // Secondary elements
    text: '2px',        // Typography enhancement
  },

  // ============================================================================
  // 4. BORDER SYSTEM
  // ============================================================================
  borders: {
    // Main container borders (subtle)
    container: '1px solid rgba(16, 185, 129, 0.15)',

    // Interactive hover borders (brightens)
    interactive: '1px solid rgba(16, 185, 129, 0.4)',

    // Accent borders
    accent: '1px solid rgba(16, 185, 129, 0.2)',

    // Radius values
    radius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },
  },

  // ============================================================================
  // 5. SPACING SYSTEM (8px base unit)
  // ============================================================================
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
  },

  // ============================================================================
  // 6. TYPOGRAPHY SYSTEM
  // ============================================================================
  typography: {
    fonts: {
      heading: "'Amiri', serif",        // Arabic serif
      body: "'Cairo', 'Tajawal', sans-serif", // Arabic sans-serif
    },

    sizes: {
      h1: { desktop: '48px', mobile: '32px', weight: 700 },
      h2: { desktop: '36px', mobile: '24px', weight: 700 },
      h3: { desktop: '28px', mobile: '20px', weight: 600 },
      h4: { desktop: '24px', mobile: '18px', weight: 600 },
      body: { desktop: '16px', mobile: '14px', weight: 400 },
      small: { desktop: '14px', mobile: '12px', weight: 400 },
      tiny: { desktop: '12px', mobile: '11px', weight: 400 },
    },

    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // ============================================================================
  // 7. RESPONSIVE BREAKPOINTS
  // ============================================================================
  breakpoints: {
    mobile: '0px',
    tablet: '640px',
    desktop: '1024px',
    wide: '1280px',
    ultraWide: '1536px',
  },

  // ============================================================================
  // 8. ANIMATION SETTINGS
  // ============================================================================
  animations: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
    },

    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
      custom: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design easing
    },
  },
};

// ============================================================================
// TAILWIND CSS CONFIGURATION
// ============================================================================

module.exports = {
  theme: {
    extend: {
      colors: {
        emerald: designSystem.colors.emerald,
        'dark-bg': designSystem.colors.background.darkest,
      },

      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
      },

      boxShadow: {
        'neon-emerald': designSystem.shadows.neonEmerald,
        'neon-teal': designSystem.shadows.neonTeal,
        'icon-glow': designSystem.shadows.iconGlow,
        'card-depth': designSystem.shadows.card,
      },

      borderRadius: {
        '2xl': designSystem.borders.radius.lg,
        '3xl': designSystem.borders.radius.xl,
      },

      spacing: designSystem.spacing,

      fontSize: {
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.6' }],
        '2xl': ['24px', { lineHeight: '1.6' }],
        '3xl': ['28px', { lineHeight: '1.2' }],
        '4xl': ['36px', { lineHeight: '1.2' }],
        '5xl': ['48px', { lineHeight: '1.2' }],
      },
    },
  },

  plugins: [],
};

// ============================================================================
// CSS LAYER UTILITIES
// ============================================================================

const cssUtilities = `
@layer utilities {
  /* =========================================================
     GLASS EFFECTS
     ======================================================= */

  .glass {
    @apply bg-black/60 backdrop-blur-[20px];
    border: 1px solid rgba(16, 185, 129, 0.15);
  }

  .glass-card {
    @apply bg-black/70 backdrop-blur-[16px];
    border: 1px solid rgba(16, 185, 129, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(16, 185, 129, 0.08);
  }

  .glass-hover {
    @apply transition-all duration-200;
  }

  .glass-hover:hover {
    @apply backdrop-blur-[24px];
    border-color: rgba(16, 185, 129, 0.3);
  }

  /* =========================================================
     NEON GLOW EFFECTS
     ======================================================= */

  .neon-emerald {
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.4),
                0 0 20px rgba(16, 185, 129, 0.2),
                0 0 40px rgba(16, 185, 129, 0.1);
  }

  .neon-emerald-hover:hover {
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.6),
                0 0 30px rgba(16, 185, 129, 0.3),
                0 0 60px rgba(16, 185, 129, 0.15);
  }

  .neon-teal {
    box-shadow: 0 0 10px rgba(20, 184, 166, 0.4),
                0 0 20px rgba(20, 184, 166, 0.2),
                0 0 40px rgba(20, 184, 166, 0.1);
  }

  /* =========================================================
     CARD STYLES
     ======================================================= */

  .card-base {
    @apply rounded-2xl border border-emerald-900/40 p-6
           transition-all duration-200;
  }

  .card-interactive {
    @apply card-base cursor-pointer hover:border-emerald-700/60
           hover:scale-105 hover:shadow-lg;
  }

  .card-depth {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
                0 10px 15px rgba(0, 0, 0, 0.2),
                0 20px 25px rgba(0, 0, 0, 0.3);
  }

  /* =========================================================
     GRADIENT TEXT
     ======================================================= */

  .gradient-text {
    @apply bg-gradient-to-r from-emerald-400 to-teal-400
           bg-clip-text text-transparent;
  }

  .gradient-text-gold {
    @apply bg-gradient-to-r from-yellow-400 to-yellow-300
           bg-clip-text text-transparent;
  }

  /* =========================================================
     BACKDROP EFFECTS
     ======================================================= */

  .backdrop-glass {
    background: rgba(6, 20, 10, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .backdrop-glass-dark {
    background: rgba(3, 10, 6, 0.8);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }

  /* =========================================================
     BUTTON STYLES
     ======================================================= */

  .btn-primary {
    @apply px-6 py-3 rounded-xl font-medium transition-all
           duration-200 text-emerald-400 bg-emerald-900/40
           border border-emerald-700/40 hover:bg-emerald-900/60
           hover:border-emerald-600 hover:shadow-lg;
  }

  .btn-secondary {
    @apply px-6 py-3 rounded-xl font-medium transition-all
           duration-200 text-gray-400 bg-white/5 border border-white/10
           hover:bg-white/10 hover:border-white/20;
  }

  /* =========================================================
     TEXT UTILITIES
     ======================================================= */

  .text-neon-emerald {
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.8),
                 0 0 20px rgba(16, 185, 129, 0.4);
  }

  .text-shadow-sm {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .text-shadow-md {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
}
`;

// ============================================================================
// PRODUCTION-READY COMPONENT EXAMPLES
// ============================================================================

const componentExamples = {
  // Glass Card with Icon
  glassCard: `
    <div className="group glass rounded-2xl border border-emerald-900/40 p-6
                    hover:border-emerald-700/60 transition-all cursor-pointer
                    hover:scale-105 hover:shadow-lg">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center
                      bg-emerald-900/40">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">Title</h3>
      <p className="mt-2 text-sm text-gray-400">Description</p>
    </div>
  `,

  // Neon Glow Button
  neonButton: `
    <button className="px-6 py-3 rounded-xl font-medium
                       text-emerald-400 bg-emerald-900/40
                       border border-emerald-700/40
                       hover:bg-emerald-900/60 hover:border-emerald-600
                       transition-all duration-200
                       hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
      Click Me
    </button>
  `,

  // Hero Section
  heroSection: `
    <section className="relative min-h-screen flex items-center
                        justify-center px-4 overflow-hidden">
      <div className="absolute inset-0
                      bg-[radial-gradient(ellipse_at_50%_-20%,
                          rgba(16,185,129,0.1)_0%,transparent_80%)]
                      pointer-events-none" />
      <motion.div className="relative z-10 text-center space-y-6
                             max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Heading
        </h1>
        <p className="text-xl text-gray-400">Subheading</p>
      </motion.div>
    </section>
  `,

  // Feature Grid
  featureGrid: `
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="glass rounded-2xl border border-emerald-900/40 p-5
                     hover:border-emerald-700/60 transition-all
                     hover:scale-105 h-full"
        >
          {/* Content */}
        </motion.div>
      ))}
    </div>
  `,
};

export { designSystem, cssUtilities, componentExamples };
