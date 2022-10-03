let envPath = ".env";

if (process.env.NODE_ENV !== "production") {
  envPath += "." + process.env.NODE_ENV;
}

require("dotenv").config({
  path: envPath,
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    logging: true,
    port: 8889,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: true,
  },
  nodeEnviroment: process.env.NODE_ENV,
  port: process.env.PORT,
  allowedOrigins: [
    process.env.CORS_ORIGIN1
  ],
};