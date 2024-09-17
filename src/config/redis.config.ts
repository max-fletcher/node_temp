import { getEnvVar } from "../utils/common.utils"

const port = Number(getEnvVar('REDIS_PORT'))
const host = getEnvVar('REDIS_HOST')
const username = getEnvVar('REDIS_USERNAME')
const password = getEnvVar('REDIS_PASSWORD')
const db = Number(getEnvVar('REDIS_DB'))

export const redisConfig = {
  port: port ?? 6379, // Redis port
  host: host ?? "127.0.0.1", // Redis host
  username: username ?? "default", // needs Redis >= 6
  password: password ?? "my-top-secret",
  db: db ?? 0, // Defaults to 0
}

// export const redisConfig = {
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   username: "default", // needs Redis >= 6
//   password: "my-top-secret",
//   db: 0, // Defaults to 0
// }