// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_KEY: string;
    NEXT_PUBLIC_AUTH_DOMAIN: string;
    NEXT_PUBLIC_PROJECT_ID: string;
    NEXT_PUBLIC_STORAGE_BUCKET: string;
    NEXT_PUBLIC_MESSAGING_SENDER_ID: string;
    NEXT_PUBLIC_APP_ID: string;
    NEXT_PUBLIC_MEASUREMENT_ID: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL: string;
    NEXT_PUBLIC_FIREBASE_PRIVATE_KEY: string;
  }
}