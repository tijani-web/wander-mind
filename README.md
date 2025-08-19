# Wandermind

**Wandermind** – Mindful Escapes & AI Companionship. A web app to track moods, journal thoughts, explore calming activities, and interact with an empathetic AI companion.

[Live Link](https://wandermind-app.vercel.app)

---

## Features

- **AI Companion Chat** – Talk to a compassionate AI that listens, reflects, and responds thoughtfully.
- **Mood Tracker** – Record, track, and visualize your moods over time.
- **Journaling** – Keep private journal entries with Firebase-secured storage.
- **Mindful Escapes** – Browse, save, and revisit calming activities.
- **Secure Authentication** – Sign up, log in, and reset passwords securely using Firebase.

---

## Tech Stack

- **Frontend**: React 19, React Router v7, Framer Motion  
- **API Backend**: Node.js, Express  
- **Database & Auth**: Firebase Firestore & Authentication  
- **AI Integration**: OpenAI GPT-4o-mini  
- **Deployment**: Vercel  

---

## Getting Started

Follow these steps to run Wandermind locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/tijani-web/wander-mind.git
   cd wander-mind
   Install dependencies
2. **Install dependencies**
   npm install
3. **Set up environment variables**
   Create a .env file in the root of the project with your keys:
   OPENAI_API_KEY=your_openai_api_key_here
   FIREBASE_API_KEY=your_firebase_api_key_here
   FIREBASE_PROJECT_ID=your_project_id_here
   FIREBASE_AUTH_DOMAIN=your_project_auth_domain_here
   FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   FIREBASE_APP_ID=your_app_id_here

   [Important: Do not commit .env to GitHub. It's already in .gitignore.]
4. **Run locally**
   npm run dev
