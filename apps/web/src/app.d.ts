declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_PROTOCOL: string;
      NEXT_PUBLIC_API_HOST: string;
      NEXT_PUBLIC_API_PORT: string;
      NEXT_PUBLIC_SITE_URL: string;
    }
  }
}
export {};
