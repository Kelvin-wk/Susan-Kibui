# 🚀 Free Hosting Guide for Susan's Market

## Option 1: Vercel (Recommended)
1. Push your code to a **GitHub** repository.
2. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New"** > **"Project"**.
4. Import your `susans-market` repository.
5. In **Environment Variables**, add:
   - Key: `API_KEY`
   - Value: `your_gemini_api_key_here`
6. Click **Deploy**. Vercel will give you a free `vercel.app` URL.

## Option 2: Netlify
1. Push your code to **GitHub**.
2. Go to [Netlify.com](https://netlify.com) and log in.
3. Click **"Add new site"** > **"Import an existing project"**.
4. Select GitHub and pick your repo.
5. In **Site Settings** > **Environment Variables**, add your `API_KEY`.
6. Set the Build Command to `npm run build` and Publish Directory to `dist`.
7. Click **Deploy**.

## Why this is better than Fedora for "Free":
- **Zero Cost**: No electricity or hardware maintenance.
- **Auto-Update**: Every time you `git push`, your site updates automatically.
- **Global Speed**: Your site is served from CDN nodes worldwide.
- **Security**: HTTPS is handled for you automatically.