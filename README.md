# Veneth Portfolio Website

A modern, animated portfolio website built with React, featuring:
- Smooth scroll animations with Lenis
- GSAP scroll-triggered animations
- MagicBento interactive service cards
- ScrollStack project showcase
- Dark/Light theme toggle
- Responsive design

## Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder there

### Option 2: GitHub + Netlify (Recommended)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

**Step 2: Connect to Netlify**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Authorize → Select your repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Commands

```bash
npm install     # Install dependencies
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
```
