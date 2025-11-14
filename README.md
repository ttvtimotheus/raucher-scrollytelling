# Wie du zum Raucher wurdest

A production-grade scrollytelling experience in Next.js recreating "Wie du zum Raucher wurdest" in The Pudding style. This interactive piece takes users through seven decades of tobacco advertising and its impact.

## Features

- **Scroll-driven animations** using GSAP ScrollTrigger
- **Interactive D3.js charts** with accessible fallbacks
- **Video loops** with lazy loading and IntersectionObserver
- **Birth year personalization** for contextual hints
- **Fully accessible** with ARIA labels, screen reader support, and reduced motion mode
- **Mobile-first** responsive design with Tailwind CSS
- **German language** throughout

## Tech Stack

- **Next.js 14** with App Router and TypeScript
- **React 18** for UI components
- **Tailwind CSS** for styling
- **GSAP** with ScrollTrigger for scroll orchestration
- **D3.js** (v7) for data visualization
- **Lottie Web** for animation morphs
- **pnpm** for package management

## Project Structure

```
raucher-scrollytelling/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main scrollytelling page
│   ├── globals.css             # Global Tailwind styles
│   └── daten/
│       └── page.tsx            # Data and methodology page
├── components/
│   ├── AudioManager.tsx        # Background audio controller
│   ├── BirthYearControl.tsx    # Birth year input
│   ├── ChartWrapper.tsx        # D3 chart renderer
│   ├── DecadeSection.tsx       # Decade content section
│   ├── HeroCowboy.tsx          # Hero section
│   ├── Interlude.tsx           # Interstitial sections
│   ├── NarrativeBridge.tsx     # Narrative transitions
│   ├── QuizMoment.tsx          # Interactive quiz
│   └── VideoLooper.tsx         # Lazy-loaded video
├── lib/
│   ├── charts/                 # D3 chart implementations
│   │   ├── chart1950.ts
│   │   ├── chart1970.ts
│   │   ├── chart1990.ts
│   │   ├── chart2000.ts
│   │   ├── chart2010.ts
│   │   └── worldDeaths.ts
│   ├── context/
│   │   └── BirthYearContext.tsx # Birth year state
│   ├── data/
│   │   ├── decades.ts          # Decade metadata
│   │   └── *.json              # Chart data
│   └── gsap/
│       └── scrollOrchestrator.ts # GSAP helpers
├── public/
│   ├── audio/                  # Audio files
│   ├── video/                  # Video files
│   └── lottie/                 # Lottie animations
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

Install pnpm if you haven't:
```bash
npm install -g pnpm
```

### Installation

1. **Clone or navigate to the project:**
```bash
cd raucher-scrollytelling
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Run the development server:**
```bash
pnpm dev
```

4. **Open your browser:**
Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Running Tests

```bash
pnpm test
```

### Linting and Formatting

```bash
# Check formatting
pnpm lint

# Auto-format code
pnpm format

# Type checking
pnpm check
```

## Replacing Assets

### Videos

Place your video files in `static/video/` with these names:

1. **cowboy_loop.mp4** and **cowboy_loop.webm**
   - 5-10 second loop
   - Sepia graded cowboy/Marlboro man aesthetic
   - 1920x1080 minimum
   - Keep under 5MB

2. **mtv_90s.mp4** and **mtv_90s.webm**
   - MTV/90s grunge clips
   - Fast cuts, youth culture

3. **tiktok_vapes.mp4** and **tiktok_vapes.webm**
   - Modern social media vaping clips
   - Bright, colorful

**Video optimization:**
```bash
# Using FFmpeg to create optimized MP4
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k cowboy_loop.mp4

# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 cowboy_loop.webm
```

### Lottie Animations

Replace placeholder files in `static/lottie/`:

1. **title_morph.json** - Title formation animation
2. **lipstick_to_glow.json** - Lipstick morphing to cigarette glow

Export from After Effects using the Bodymovin plugin or create in LottieFiles.

### Data

Replace stub data in `src/lib/data/`:

1. **series1950.json** - Consumption and deaths data
2. **series1970.json** - Adult smoking rates
3. **series1990.json** - Teen smoking rates
4. **series2000.json** - Ad spend and smoking rates
5. **series2010.json** - Vaping vs cigarette usage
6. **deaths_world.geojson** - World tobacco deaths by country

**Data format examples:**

```json
// series1950.json
{
  "data": [
    { "year": 1950, "consumption": 1800, "deaths": 15 },
    ...
  ]
}

// series1970.json
{
  "data": [
    { "year": 1960, "percent": 55 },
    ...
  ]
}
```

Use CSV to JSON converters if you have CSV data sources.

## Key Features Explained

### Scroll Orchestration

GSAP ScrollTrigger powers the scroll-driven animations. Each decade section:
- Pins the narrative on desktop
- Scrubs chart animations based on scroll progress
- Syncs video playback to scroll position
- Controls Lottie frame progression

### Charts

D3.js charts are:
- **Responsive** with viewBox SVG
- **Accessible** with ARIA labels and descriptions
- **Animated** via scroll progress (0-1)
- **Themeable** using SCSS tokens

Each chart exports:
- `init(container, data)` - Initialize chart
- `update(progress)` - Update based on scroll (0-1)
- `destroy()` - Cleanup

### Accessibility

- **ARIA labels** on all interactive elements
- **Screen reader** support with descriptive text
- **Keyboard navigation** fully supported
- **Reduced motion** mode disables complex animations
- **High contrast** theme via CSS variables
- **Data page** with full text explanations

### Personalization

Users can input their birth year to see:
- Contextual hints for their generation
- Relevant annotations on charts
- Timeline markers

Birth year is stored in a Svelte store and persists during the session.

## Performance Optimization

- **Lazy loading** videos with IntersectionObserver
- **Code splitting** by route
- **Deferred chart initialization** until visible
- **Optimized assets** (compressed images, videos)
- **Minimal dependencies**

**Target metrics:**
- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## Customization

### Colors

Edit `src/lib/styles/tokens.scss`:

```scss
$color-accent: #ff6b6b;          // Primary accent
$color-bg-dark: #0a0a0a;         // Dark background
$color-text-primary: #f5f5f5;    // Primary text
```

### Typography

Change font families in `tokens.scss`:

```scss
$font-family-base: -apple-system, ...;
$font-family-display: 'Georgia', ...;
```

### Content

Edit narrative text in `src/lib/data/decades.ts`:

```typescript
export const decades: DecadeSection[] = [
  {
    id: 'decade-1950',
    title: 'Your Title',
    narrative: ['Paragraph 1', 'Paragraph 2'],
    chartExplainer: 'What the chart shows...',
    ...
  }
]
```

## Deployment

### Netlify

```bash
pnpm build
# Upload .svelte-kit/output directory
```

### Vercel

```bash
vercel
```

### Static Hosting

Build with static adapter:

```bash
# Change svelte.config.js adapter
import adapter from '@sveltejs/adapter-static';

pnpm build
# Deploy .svelte-kit/output to any static host
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Troubleshooting

### Videos not loading

- Ensure both MP4 and WebM formats exist
- Check file paths match videoSlug in components
- Verify video codecs (H.264 for MP4, VP9 for WebM)

### Charts not animating

- Check browser console for D3 errors
- Verify data format matches chart expectations
- Ensure ScrollTrigger is initialized in layout

### Build errors

- Run `pnpm install` again
- Clear `.svelte-kit` folder and rebuild
- Check Node.js version (>= 18)

## Contributing

When extending:
1. Follow existing component patterns
2. Keep visible German text without dash punctuation
3. Add ARIA labels to new interactive elements
4. Test on mobile and with reduced motion enabled
5. Update this README with new features

## License

This project is for educational and demonstration purposes.

## Credits

- Inspired by [The Pudding](https://pudding.cool)
- Data visualization patterns from D3 Observable
- Scroll techniques from GSAP ScrollTrigger examples

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [D3.js Documentation](https://d3js.org/)
- [Lottie Files](https://lottiefiles.com/)
- [The Pudding Process](https://pudding.cool/process/)

---

**Built with ❤️ using SvelteKit, D3.js, and GSAP**
