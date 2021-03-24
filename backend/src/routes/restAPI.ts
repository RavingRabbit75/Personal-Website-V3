"use strict";

import express from "express";
const router = express.Router();

import { Request, Response } from "express";

interface SkillObj {
    skill: string;
    level: number;
}

interface GlobalIconObj {
    filename_footer: string,
    filename_footer_over: string,
    filename_header: string,
    link: string
}

interface GlobalInfoObj {
    global_description: {
        desc1: string,
        desc2: string
    }
    global_icons: Array<GlobalIconObj>;
}

router.get("/globalinfo", (req: Request, res: Response)=>{

    let collection = req.app.locals.dbConnection.collection("globalInfo");
    let globalInfoFound = {};

    collection.find({}).forEach((info: any)=>{
        let globalInfoObj: GlobalInfoObj = {
            global_description: {
                desc1: info.headerSelfDescription[0],
                desc2: info.headerSelfDescription[1]
            },
            global_icons: info.global_icons
        };
        globalInfoFound = globalInfoObj;

    }).then((results:any)=>{
        res.send(globalInfoFound);
    }).catch((err: any)=>{
        console.log(err);
    });

});


router.get("/profile/skills", (req: Request, res: Response)=>{

    let collection = req.app.locals.dbConnection.collection("skills");
    let skillsFound: Array<any> = [];

    collection.find({}).forEach((skillItem: any) => {

        let skillObj: SkillObj = {
            skill: skillItem.skill,
            level: skillItem.level
        }
        skillsFound.push(
            skillObj
        );

    }).then((results:any)=>{
        console.log(skillsFound)
        res.send(skillsFound);
    }).catch((err: any)=>{
        console.log(err);
    });

});


export default router;