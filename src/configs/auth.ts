const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || "no_secret",
    expiresIn: "1d",
  },
}

export default authConfig
