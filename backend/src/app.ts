"use strict";

import dotenv from "dotenv";
dotenv.config()

import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import path from "path";
import { MongoClient } from "mongodb";

import restAPI from "./routes/restAPI";

const client = new MongoClient("mongodb://localhost:27017", {useUnifiedTopology: true});

const port = process.env.PORT;
const dbName = process.env.DBNAME;
const app = express();

app.use(morgan("dev"));

// custom middleware
app.use((req: Request, res: Response, next: NextFunction)=>{
    next();
});

app.use("/api/v1", restAPI);

app.get("/", (req: Request, res: Response)=>{
    res.send("/");
});


app.use(function(req: Request, res: Response, next: NextFunction) {
    const error = { 
        message: "not found",
        errorCode: 404
    };

    next(error);
    
});

app.use((err: any, req: Request, res: Response, next: NextFunction)=>{
    res.sendFile(path.join(__dirname+'/../views/404.html'));
})


Promise.all([client.connect()]).then((appsObjs:any)=>{
    app.locals.dbConnection = appsObjs[0].db(dbName);

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });

}).catch((err)=>{
    console.log(err)
})
