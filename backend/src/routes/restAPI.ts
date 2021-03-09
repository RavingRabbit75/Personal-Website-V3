"use strict";

import express from "express";
const router = express.Router();

import { Request, Response } from "express";

router.get("/skills", (req: Request, res: Response)=>{
    let collection = req.app.locals.dbConnection.collection("skills");
    let skillsFound: Array<any> = [];

    collection.find({}).forEach((skillItem: any) => {
        skillsFound.push(skillItem);
    }).then((results:any)=>{
        res.send(skillsFound);
    }).catch((err: any)=>{
        console.log(err);
    });

});


export default router;