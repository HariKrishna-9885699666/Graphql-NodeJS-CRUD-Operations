const express = require("express");
const reflectMetadata = require("reflect-metadata");
import { graphqlHTTP } from "express-graphql";
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const winston = require("winston");
import { DataSource } from "typeorm";
const { port, nodeEnviroment, allowedOrigins } = require("./config/config");
import { schema } from "./Schema/index";
import { Employees } from "./Entities/Employees";

const main = async () => {
  const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Employees],
    synchronize: false,
    logging: true,
  })

  AppDataSource.initialize()
  .then(() => {
      console.log('Connected to SQL database.')
  })
  .catch((error) => {
    console.log('error', error)
  })

  const app = express();

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  // adding logging library
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
  });

  // adding Helmet to enhance your API's security
  app.use(helmet());

  // using bodyParser to parse JSON bodies into JS objects
  app.use(bodyParser.json());

  // enabling CORS for all requests
  app.use(
    cors({
      origin: function (origin: string, callback: Function) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
      allowedHeaders: "*",
      exposedHeaders: "*",
    })
  );

  // adding morgan to log HTTP requests
  app.use(morgan("combined"));

  // parse requests of content-type: application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
};

main().catch((err) => {
  console.log(err);
});