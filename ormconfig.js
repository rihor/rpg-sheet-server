const isProduction = process.env.NODE_ENV === "production"
const rootFolder = isProduction ? "build" : "src"

const entitiesFolder = `./${rootFolder}/modules/**/infra/typeorm/entities/*.ts`

console.log("Is looking for entities at: ", entitiesFolder)

module.exports = [
  {
    name: "default",
    type: "postgres",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    entities: [entitiesFolder],
    migrations: [`./${rootFolder}/shared/infra/typeorm/migrations/*.ts`],
    cli: {
      migrationsDir: `./${rootFolder}/shared/infra/typeorm/migrations/`,
    },
    ...(isProduction && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    // ssl: {
    //   rejectUnauthorized: !isProduction,
    // },
  },
  {
    name: "mongo",
    type: "mongodb",
    url: process.env.MONGO_URL,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
    entities: [`./${rootFolder}/modules/**/infra/typeorm/schemas/*.ts`],
  },
]
