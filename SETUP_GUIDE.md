# How to Push Your React Project & Go Live

Follow these steps **exactly** to upload your Grievance System React app and make it live.

---

## STEP 1: Prepare your local React project

Open your project folder in terminal/VS Code terminal.

Add this line to your `package.json` (just below `"private": true`):

```json
"homepage": "https://Anshumanpandey003.github.io/Mtech_project_2026",
```

Also add these two lines in the `"scripts"` section:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```

---

## STEP 2: Install gh-pages package

```bash
npm install --save-dev gh-pages
```

---

## STEP 3: Push your code to GitHub

```bash
# Initialize git (only if not done already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Grievance Redressal System"

# Connect to your GitHub repo
git remote add origin https://github.com/Anshumanpandey003/Mtech_project_2026.git

# Push to main branch
git branch -M main
git push -u origin main
```

> NOTE: If remote already exists, skip the `git remote add` line.

---

## STEP 4: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your React app
2. Create a `gh-pages` branch automatically
3. Push the built files there

---

## STEP 5: Enable GitHub Pages (Do this ONCE)

1. Go to: https://github.com/Anshumanpandey003/Mtech_project_2026/settings/pages
2. Under **Branch**, select `gh-pages` from dropdown
3. Click **Save**

---

## STEP 6: Your app is live!

After 2-3 minutes, visit:
https://Anshumanpandey003.github.io/Mtech_project_2026

---

## Future Updates

Every time you make changes:
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
npm run deploy
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` will also auto-deploy whenever you push to `main`.

---

## Alternative: Deploy on Vercel (Easiest)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **Add New > Project**
4. Import `Mtech_project_2026` repo
5. Click **Deploy** — done! Live URL auto-generated.
