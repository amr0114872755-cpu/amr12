#!/usr/bin/env node
/**
 * 🎨 QUICK REFERENCE - Design System Cheat Sheet
 * Copy and paste ready snippets for instant use
 */

// ============================================================================
// COLOR QUICK REFERENCE
// ============================================================================

const COLORS = {
  // Primary
  emerald: '#10B981',
  emeraldDark: '#065F46',

  // Background
  bg: '#030A06',
  bgDark: '#0A0F0A',

  // Accents
  teal: '#14B8A6',
  cyan: '#06B6D4',
  gold: '#FBBF24',
  rose: '#FB7185',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#E5E7EB',
  textMuted: '#9CA3AF',
};

// ============================================================================
// TAILWIND CLASS SNIPPETS - Copy & Paste
// ============================================================================

const TailwindSnippets = {
  // Glass Cards
  glassCard: 'glass rounded-2xl border border-emerald-900/40 p-6 hover:border-emerald-700/60 transition-all cursor-pointer hover:scale-105 hover:shadow-lg',

  // Neon Glow
  neonGlow: 'neon-emerald shadow-[0_0_10px_rgba(16,185,129,0.4),0_0_20px_rgba(16,185,129,0.2),0_0_40px_rgba(16,185,129,0.1)]',

  // Primary Button
  btnPrimary: 'px-6 py-3 rounded-xl font-medium text-emerald-400 bg-emerald-900/40 border border-emerald-700/40 hover:bg-emerald-900/60 hover:shadow-lg transition-all duration-200',

  // Hero Section
  heroSection: 'relative min-h-screen flex items-center justify-center px-4 overflow-hidden',

  // Feature Grid
  featureGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',

  // Icon Container
  iconContainer: 'w-12 h-12 rounded-lg flex items-center justify-center bg-emerald-900/40',
};

// ============================================================================
// SHADOW VALUES - Copy & Paste
// ============================================================================

const ShadowValues = {
  // Layered card shadow
  card: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.2), 0 20px 25px rgba(0, 0, 0, 0.3)',

  // Deep shadow for hero
  deep: '0 20px 50px rgba(0, 0, 0, 0.5)',

  // Neon emerald glow
  neonEmerald: '0 0 10px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2), 0 0 40px rgba(16, 185, 129, 0.1)',

  // On hover (intensified)
  neonEmeraldHover: '0 0 15px rgba(16, 185, 129, 0.6), 0 0 30px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.15)',
};

// ============================================================================
// GLASS EFFECT - Copy & Paste HTML/JSX
// ============================================================================

const GlassEffect = {
  container: `
    <div className="glass rounded-3xl border border-emerald-900/40 p-6 md:p-8">
      {/* Content */}
    </div>
  `,

  card: `
    <div className="glass-card rounded-2xl border border-emerald-900/40 p-6
                    hover:border-emerald-700/60 transition-all">
      {/* Content */}
    </div>
  `,

  featureCard: `
    <div className="group glass rounded-2xl border border-emerald-900/40 p-6
                    hover:border-emerald-700/60 hover:scale-105
                    transition-all cursor-pointer h-full">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center
                      bg-emerald-900/40">
        <Icon className="w-6 h-6 text-emerald-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">Title</h3>
      <p className="mt-2 text-sm text-gray-400">Description</p>
    </div>
  `,
};

// ============================================================================
// NEON GLOW BUTTONS - Copy & Paste
// ============================================================================

const NeonButtons = {
  primary: `
    <button className="px-6 py-3 rounded-xl font-medium
                       text-emerald-400 bg-emerald-900/40
                       border border-emerald-700/40
                       hover:bg-emerald-900/60
                       hover:border-emerald-600
                       hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]
                       transition-all duration-200">
      Click Me
    </button>
  `,

  secondary: `
    <button className="px-6 py-3 rounded-xl font-medium
                       text-gray-400 bg-white/5
                       border border-white/10
                       hover:bg-white/10
                       hover:border-white/20
                       transition-all duration-200">
      Secondary
    </button>
  `,
};

// ============================================================================
// HERO SECTION - Copy & Paste
// ============================================================================

const HeroTemplate = `
  <section className="relative min-h-screen flex items-center justify-center
                      px-4 overflow-hidden">
    {/* Gradient overlay */}
    <div className="absolute inset-0
                    bg-[radial-gradient(ellipse_at_50%_-20%,
                        rgba(16,185,129,0.1)_0%,transparent_80%)]
                    pointer-events-none" />

    {/* Content */}
    <div className="relative z-10 text-center space-y-6 max-w-2xl">
      <h1 className="text-5xl md:text-7xl font-bold text-white">
        Main Heading
      </h1>
      <p className="text-xl text-gray-400">
        Subheading
      </p>
      <button className="px-8 py-3 rounded-xl font-medium
                         text-emerald-400 bg-emerald-900/40
                         border border-emerald-700/40
                         hover:bg-emerald-900/60
                         transition-all duration-200">
        Call to Action
      </button>
    </div>
  </section>
`;

// ============================================================================
// RESPONSIVE GRID - Copy & Paste
// ============================================================================

const ResponsiveGrids = {
  twoToFour: `
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(item => (
        <div key={item.id} className="glass rounded-2xl border border-emerald-900/40 p-6">
          {/* Content */}
        </div>
      ))}
    </div>
  `,

  oneToThree: `
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item.id} className="glass-card rounded-2xl p-6">
          {/* Content */}
        </div>
      ))}
    </div>
  `,
};

// ============================================================================
// TYPOGRAPHY CLASSES - Copy & Paste
// ============================================================================

const Typography = {
  h1: 'text-5xl md:text-7xl font-bold text-white font-amiri',
  h2: 'text-4xl md:text-5xl font-bold text-white font-amiri',
  h3: 'text-3xl md:text-4xl font-bold text-white font-amiri',

  bodyLarge: 'text-lg text-gray-300 font-cairo',
  bodyNormal: 'text-base text-gray-400 font-cairo',
  bodySmall: 'text-sm text-gray-500 font-cairo',
  bodyTiny: 'text-xs text-gray-600 font-cairo',

  label: 'text-sm font-medium text-gray-400 font-cairo',
  caption: 'text-xs text-gray-500 font-cairo',
};

// ============================================================================
// SPACING CLASSES - Copy & Paste
// ============================================================================

const Spacing = {
  containerPaddingMobile: 'px-4 py-6',
  containerPaddingTablet: 'px-6 py-8',
  containerPaddingDesktop: 'px-8 py-12',

  sectionSpacingSmall: 'py-12',
  sectionSpacingMedium: 'py-16',
  sectionSpacingLarge: 'py-20',

  cardSpacing: 'p-6 gap-4',
  iconSpacing: 'w-12 h-12',
};

// ============================================================================
// ANIMATION CLASSES - Copy & Paste
// ============================================================================

const Animations = {
  fadeIn: 'transition-all duration-200',
  fadeInSlow: 'transition-all duration-300',
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverGlow: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-200',
};

// ============================================================================
// QUICK START EXAMPLE
// ============================================================================

const QuickStartExample = `
// 1. Import in your component
import { designSystem } from '@/lib/designSystem';

// 2. Use colors
const bgColor = designSystem.colors.emerald.primary;

// 3. Use Tailwind classes
<div className="glass rounded-2xl border border-emerald-900/40 p-6">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <p className="text-gray-400">Content here</p>
</div>

// 4. Use components
<button className="px-6 py-3 rounded-xl
                   text-emerald-400 bg-emerald-900/40
                   border border-emerald-700/40
                   hover:bg-emerald-900/60
                   transition-all duration-200">
  Click Me
</button>
`;

// ============================================================================
// BROWSER DEVTOOLS SNIPPETS
// ============================================================================

const DevtoolsColors = `
// Paste in Console to extract exact colors used:

const styles = getComputedStyle(document.querySelector('.glass'));
console.log('Background:', styles.backgroundColor);
console.log('Border:', styles.borderColor);
console.log('Box Shadow:', styles.boxShadow);
`;

// ============================================================================
// Export all snippets
// ============================================================================

module.exports = {
  COLORS,
  TailwindSnippets,
  ShadowValues,
  GlassEffect,
  NeonButtons,
  HeroTemplate,
  ResponsiveGrids,
  Typography,
  Spacing,
  Animations,
  QuickStartExample,
  DevtoolsColors,
};

/**
 * USAGE:
 * 1. Open this file in your editor
 * 2. Find the snippet you need
 * 3. Copy the code
 * 4. Paste into your component
 * 5. Customize as needed
 *
 * For more details, see: DESIGN_SYSTEM.md
 */
