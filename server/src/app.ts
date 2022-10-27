import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import { connectDb } from "./config/db";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
