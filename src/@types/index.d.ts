declare namespace NodeJS {
  export interface ProcessEnv {
    APP_SECRET: string
    NODE_ENV: string
    APP_API_URL: string
    PORT: string

    PG_DATABASE: string
    PG_HOST: string
    PG_PORT: number
    PG_USERNAME: string
    PG_PASSWORD: string

    MONGO_HOST: string
    MONGO_PORT: number
    MONGO_DATABASE: string
  }
}
