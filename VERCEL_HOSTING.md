# Hosting Susan's Market on Vercel

Follow these steps to host your application on Vercel for your customers to access.

## 1. Prepare Your Repository
Ensure your code is pushed to a GitHub, GitLab, or Bitbucket repository.

## 2. Connect to Vercel
1.  Log in to [Vercel](https://vercel.com).
2.  Click **"Add New..."** and select **"Project"**.
3.  Import your repository.

## 3. Configure Project Settings
Vercel should automatically detect the **Vite** framework. Ensure the following settings:
*   **Framework Preset:** Vite
*   **Build Command:** `npm run build`
*   **Output Directory:** `dist`

## 4. Set Environment Variables
This is the most critical step. Go to the **Environment Variables** section in your Vercel project settings and add the following keys (copy values from your `firebase-applet-config.json` and AI Studio settings):

### Firebase Configuration
*   `VITE_FIREBASE_API_KEY`: Your Firebase API Key
*   `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase Auth Domain
*   `VITE_FIREBASE_PROJECT_ID`: Your Firebase Project ID
*   `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase Storage Bucket
*   `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase Messaging Sender ID
*   `VITE_FIREBASE_APP_ID`: Your Firebase App ID
*   `VITE_FIREBASE_MEASUREMENT_ID`: Your Firebase Measurement ID
*   `VITE_FIREBASE_DATABASE_ID`: Your Firestore Database ID (usually `(default)`)

### Gemini AI Configuration
*   `VITE_GEMINI_API_KEY`: Your Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## 5. Deploy
Click **"Deploy"**. Vercel will build your application and provide you with a production URL (e.g., `https://susans-market.vercel.app`).

## 6. Update Firebase Authorized Domains
After deployment, you **MUST** add your new Vercel domain to the authorized domains in your Firebase Console:
1.  Go to **Firebase Console** > **Authentication** > **Settings** > **Authorized Domains**.
2.  Add your Vercel domain (e.g., `susans-market.vercel.app`).

## 7. Update Gemini API Key Restrictions (Optional but Recommended)
In the [Google Cloud Console](https://console.cloud.google.com/apis/credentials), you should restrict your Gemini API key to only be usable from your Vercel domain to prevent unauthorized use.

---

### Why these changes were made:
*   **Environment Variables**: We moved the Firebase configuration from a static JSON file to environment variables. This is more secure and is the standard way to handle secrets in production environments like Vercel.
*   **Vercel Configuration**: We added a `vercel.json` file to handle Single Page Application (SPA) routing, ensuring that page refreshes on sub-routes work correctly.
*   **Build Optimization**: We updated `vite.config.ts` to correctly inject the Gemini API key during the build process.
