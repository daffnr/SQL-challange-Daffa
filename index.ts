import express, { Request, Response, Application, NextFunction } from "express";
import { productRouter } from "./src/router/studentRouter.ts";
import db from "./src/config/server.ts"

const app: Application = express()
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api", productRouter);



db.getConnection((err, connection) => {
    if (err) {
        return console.log(err);
    }
    console.log("Success Connection", connection.threadId);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

