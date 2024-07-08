export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_BASE_URL: string;
      SECRET: string;
      NEXTAUTH_SECRET: string;
    }
  }
}
