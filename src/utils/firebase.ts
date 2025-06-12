//https://firebase.google.com/docs/web/modular-upgrade?hl=ko&_gl=1*b6mkwb*_up*MQ..*_ga*MTI4MDk1ODE5My4xNzQ5NzMwNzUw*_ga_CW55HF8NVT*czE3NDk3MzA3NTAkbzEkZzAkdDE3NDk3MzA3NTAkajYwJGwwJGgw

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
