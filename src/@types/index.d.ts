declare namespace NodeJS {
  export interface ProcessEnv {
    APP_SECRET: string
    NODE_ENV: string
    APP_API_URL: string
    PORT: string
  }
}
