"use strict";

import dotenv from "dotenv";
dotenv.config()

import express from "express";
import { Request, Response } from "express";
import { MongoClient } from "mongodb";

import restAPI from "./routes/restAPI";

const client = new MongoClient("mongodb://localhost:27017", {useUnifiedTopology: true});

const port = process.env.PORT;
const dbName = process.env.DBNAME;
const app = express();


app.use("/api/v1", restAPI);

app.get("/", (req: Request, res: Response)=>{
    res.send("/");
});


Promise.all([client.connect()]).then((appsObjs:any)=>{
    app.locals.dbConnection = appsObjs[0].db(dbName);

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });

}).catch((err)=>{
    console.log(err)
})
