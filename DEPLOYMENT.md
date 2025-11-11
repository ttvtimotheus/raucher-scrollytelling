# Deployment Guide

## Quick Deploy Checklist

Before deploying to production:

- [ ] Replace placeholder videos in `static/video/`
- [ ] Replace Lottie animations in `static/lottie/`
- [ ] Update real data in `src/lib/data/`
- [ ] Add favicon.png (32x32 or 64x64 px)
- [ ] Test on mobile devices
- [ ] Test with screen reader
- [ ] Test with reduced motion enabled
- [ ] Run `pnpm test` and ensure all pass
- [ ] Run `pnpm build` locally to verify build
- [ ] Check Lighthouse score (target > 90)

## Netlify Deployment

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
pnpm build
```

3. **Deploy:**
```bash
netlify deploy --prod
```

**Netlify Configuration:**

Create `netlify.toml` in project root:

```toml
[build]
  command = "pnpm build"
  publish = ".svelte-kit/output"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

Vercel auto-detects SvelteKit and configures build settings.

## Static Hosting (Cloudflare Pages, GitHub Pages, etc.)

1. **Update adapter in `svelte.config.js`:**
```javascript
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    })
  }
};
```

2. **Add prerender to routes:**

In `src/routes/+page.js`:
```javascript
export const prerender = true;
```

3. **Build:**
```bash
pnpm build
```

4. **Upload `build/` directory to your host**

## Performance Optimization

### Image Optimization

Use WebP format for images:
```bash
cwebp input.png -q 80 -o output.webp
```

### Video Optimization

Compress videos for web:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k output.mp4
```

### Bundle Analysis

Add to `package.json`:
```json
"analyze": "vite-bundle-visualizer"
```

Then run:
```bash
pnpm add -D vite-bundle-visualizer
pnpm analyze
```

## Environment Variables

For production, set environment variables in your hosting platform:

- **Netlify:** Site Settings → Environment Variables
- **Vercel:** Project Settings → Environment Variables
- **Cloudflare:** Pages → Settings → Environment Variables

## CDN Configuration

Recommended cache headers:

```
# Static assets (videos, images, fonts)
Cache-Control: public, max-age=31536000, immutable

# HTML
Cache-Control: public, max-age=0, must-revalidate

# CSS/JS
Cache-Control: public, max-age=31536000, immutable
```

## Monitoring

Set up monitoring for:
- **Uptime:** UptimeRobot, Pingdom
- **Performance:** Google Analytics, Vercel Analytics
- **Errors:** Sentry

## Security Headers

Add security headers in your hosting platform:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Post-Deployment Testing

After deployment:

1. Test on multiple devices (iOS, Android, Desktop)
2. Run Lighthouse in incognito mode
3. Test with slow 3G connection
4. Verify all videos load correctly
5. Check chart interactions
6. Test scroll performance
7. Verify reduced motion mode works

## Rollback Plan

Keep previous deployment accessible:

- **Netlify:** Deploy Previews are kept
- **Vercel:** All deployments are accessible via unique URLs
- **Manual:** Keep previous `build/` folder as backup

## Analytics Setup

### Google Analytics 4

Add to `src/app.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-friendly alternative)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Troubleshooting

### Build fails on hosting platform

- Verify Node.js version matches (>= 18)
- Check pnpm version
- Ensure all dependencies in `package.json`
- Review build logs for specific errors

### Videos not loading in production

- Check MIME types are correct
- Verify CORS headers if using CDN
- Ensure video files are in `static/` directory

### Styles missing after deployment

- Check Vite build output
- Verify SCSS compilation
- Clear CDN cache

## Cost Estimation

Typical hosting costs:

- **Netlify:** Free tier for most use cases
- **Vercel:** Free tier sufficient for moderate traffic
- **Cloudflare Pages:** Free tier generous
- **Custom domain:** $10-15/year

Bandwidth estimate for 1000 monthly visitors:
- ~2GB with optimized assets
- Free on most platforms
