# Deploying your Django Backend to Render

This guide outlines the step-by-step instructions to deploy your Django backend to Render and connect it with your Next.js frontend.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Step 1: Commit and Push to GitHub](#step-1-commit-and-push-to-github)
3. [Step 2: Create a PostgreSQL Database](#step-2-create-a-postgresql-database)
4. [Step 3: Deploy the Web Service on Render](#step-3-deploy-the-web-service-on-render)
5. [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
6. [Step 5: Connect your Next.js Frontend](#step-5-connect-your-nextjs-frontend)
7. [Troubleshooting & Logs](#troubleshooting--logs)

---

## 1. Prerequisites
We have configured your backend to be production-ready by:
* Downgrading the Python target in [pyproject.toml](file:///D:/CODING/Task%20manager/task-manager/backend/pyproject.toml) and [.python-version](file:///D:/CODING/Task%20manager/task-manager/backend/.python-version) to `3.12` (Render's latest fully supported stable Python runtime).
* Adding production dependencies: `gunicorn` (production WSGI server), `dj-database-url` (parses database connections), `psycopg[binary]` (PostgreSQL adapter), and `whitenoise` (static file serving).
* Creating [build.sh](file:///D:/CODING/Task%20manager/task-manager/backend/build.sh) in the `backend` folder to compile assets, run migrations, and install dependencies.
* Configuring [settings.py](file:///D:/CODING/Task%20manager/task-manager/backend/config/settings.py) to read production settings securely from environment variables.

---

## Step 1: Commit and Push to GitHub
Render connects directly to your Git repository to automate deployments.

1. Open your terminal at the project root (`task-manager`).
2. Add and commit all files:
   ```bash
   git add .
   git commit -m "Configure Django backend for Render deployment"
   ```
3. Push the changes to GitHub (e.g., `git push origin main`).

---

## Step 2: Create a PostgreSQL Database
SQLite database files are ephemeral on Render's free tier and reset every time the container restarts (at least once a day). We need a persistent PostgreSQL database.

> [!TIP]
> You can create a database directly on Render, or use free-tier database hosting like **Supabase**, **Neon**, or **Aiven**.

### Option A: Render PostgreSQL (Quickest)
1. Go to the [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** in the top right and select **PostgreSQL**.
3. Fill out the details:
   - **Name**: `task-manager-db`
   - **Region**: Select the region closest to you (or same as your Web Service).
   - **Instance Type**: Select **Free** (or a paid tier if preferred).
4. Click **Create Database**.
5. Once active, copy the **Internal Database URL** (if your backend is also on Render) or **External Database URL** (required for external access or testing). You will need this for the next step.

---

## Step 3: Deploy the Web Service on Render
Now we will set up the application container that runs your Django REST API.

1. In the Render Dashboard, click **New +** and select **Web Service**.
2. Select **Build and deploy from a Git repository**.
3. Choose your repository (or connect your GitHub account).
4. Configure the service:
   - **Name**: `task-manager-backend`
   - **Region**: (Same as your PostgreSQL database)
   - **Branch**: `main` (or whichever branch you push to)
   - **Root Directory**: `backend` *(Crucial: this makes Render run commands inside the backend folder)*
   - **Language**: `Python`
   - **Build Command**: `chmod a+x build.sh && ./build.sh`
   - **Start Command**: `gunicorn config.wsgi:application`
   - **Instance Type**: Select **Free**
5. Click **Create Web Service**.

---

## Step 4: Configure Environment Variables
While the web service is building, we need to supply the settings it reads from the environment.

1. Go to your Web Service page on Render and click the **Environment** tab.
2. Click **Add Environment Variable** and add the following keys:

| Key | Value | Description |
| :--- | :--- | :--- |
| `PYTHON_VERSION` | `3.12` | Forces Render to use Python 3.12 runtime. |
| `SECRET_KEY` | *(Generate a long random string)* | Secure key for Django cryptographic signing. |
| `DEBUG` | `False` | Disables debug mode for security in production. |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1,task-manager-backend.onrender.com` | Replace with your actual Render service URL (shown at the top of the Render page). |
| `DATABASE_URL` | *(Your PostgreSQL Connection URL)* | Paste the database connection string from Step 2. |
| `CORS_ALLOW_ALL_ORIGINS` | `True` | Allows any frontend to request the backend (or configure specific ones via `CORS_ALLOWED_ORIGINS`). |

3. Click **Save Changes**. Render will automatically trigger a rebuild with the new variables active.

---

## Step 5: Connect your Next.js Frontend
Once the backend successfully deploys, Render will provide you with a public URL (e.g. `https://task-manager-backend.onrender.com`).

To hook it up to your frontend:
1. In your frontend hosting platform (like Vercel or Netlify) or locally:
2. Set the environment variable:
   ```env
   BACKEND_API_URL=https://task-manager-backend.onrender.com
   ```
3. Because the frontend Next.js application rewrites `/api/:path*` to `BACKEND_API_URL/api/:path*` (as seen in [next.config.ts](file:///D:/CODING/Task%20manager/task-manager/frontend/next.config.ts)), the frontend will now route all server requests to your newly deployed backend!

---

## Troubleshooting & Logs
* **Deploy Fails during Build**: Go to **Events** or **Logs** in your Render dashboard. Ensure your dependencies install successfully.
* **Database Connection Errors**: Double check the `DATABASE_URL`. If using Render PostgreSQL, ensure you copy the correct URL.
* **Static Assets Not Loading**: Since we configured **WhiteNoise**, Django serves its own CSS and JS. Verify that `collectstatic` runs successfully inside the build logs.
* **CORS Errors**: If the frontend complains about CORS, verify `CORS_ALLOW_ALL_ORIGINS` is set to `True` or that `CORS_ALLOWED_ORIGINS` includes your frontend URL.
