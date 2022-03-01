"use strict";

import express from "express";
const router = express.Router();

import { Request, Response } from "express";

interface SkillObj {
    skill: string;
    level: number;
}

interface ExperienceObj {
    accomplishments: Array<string>;
    exp_id: number;
    location: string;
    name: string;
    title: string;
    years: string;
}

interface EducationObj {
    primaryDescription: string;
    secondaryDescription: string;
    year: string;
}

interface PreviewsObj {
    filename: string;
    groupingNumber: number;
}

interface ProjectUrlsObj {
    type: string;
    url: string;
}

interface ProjectObj {
    builtWith: Array<string>;
    description: string;
    enabled: boolean;
    id: number;
    layouttype: number;
    name: string;
    points: Array<string>;
    previews: Array<PreviewsObj>
    priority: number;
    role: string;
    urls: Array<ProjectUrlsObj>
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
        res.status(200).send(globalInfoFound);
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
        skillsFound.push(skillObj);

    }).then((results:any)=>{
        console.log(skillsFound);
        res.send(skillsFound);
    }).catch((err: any)=>{
        console.log(err);
    });

});


router.get("/profile/experience", (req: Request, res: Response) =>{

    let collection = req.app.locals.dbConnection.collection("experience");
    let experienceFound: Array<any> = [];

    collection.find({}).forEach((experienceItem: any) => {
        
        let experienceObj: ExperienceObj = {
            accomplishments: experienceItem.accomplishments,
            exp_id: experienceItem.exp_id,
            location: experienceItem.location,
            name: experienceItem.name,
            title: experienceItem.title,
            years: experienceItem.years
        }
        experienceFound.push(experienceObj);
    
    }).then((results:any)=>{
        console.log(experienceFound);
        res.send(experienceFound);
    }).catch((err: any) => {
        console.log(err);
    })
});


router.get("/profile/education", (req: Request, res: Response) => {
    
    let collection = req.app.locals.dbConnection.collection("education");
    let educationFound: Array<any> = [];
    
    collection.find({}).forEach((educationItem: any) => {

        let educationObj: EducationObj = {
            primaryDescription: educationItem.primaryDescription,
            secondaryDescription: educationItem.secondaryDescription,
            year: educationItem.year
        }
        educationFound.push(educationObj);

    }).then((results:any) => {
        console.log(educationFound);
        res.send(educationFound);
    }).catch((err: any) => {
        console.log(err);
    });

});


router.get("/projects", (req: Request, res: Response) => {

    let collection = req.app.locals.dbConnection.collection("projects");
    let projectsFound: Array<any> = [];

    collection.find({}).forEach((projectItem: any) => {
        let projectsObj: ProjectObj = {
            builtWith: projectItem.builtwith,
            description: projectItem.description,
            enabled: projectItem.enabled,
            id: projectItem.id,
            layouttype: projectItem.layouttype,
            name: projectItem.name,
            points: projectItem.points,
            previews: projectItem.previews,
            priority: projectItem.priority,
            role: projectItem.role,
            urls: projectItem.urls
        }
        projectsFound.push(projectsObj);

    }).then((results: any) => {
        let finalProjectsObj = {
            "projects": projectsFound
        }
        res.send(finalProjectsObj);
    }).catch((err: any) => {
        console.log(err);
    })

});


router.get("/projects/filters", (req: Request, res: Response) => {

    let collection = req.app.locals.dbConnection.collection("filters");
    let filtersFound: Array<any> = [];
    let numberOfFilters = 0;
    let responseObj = {
        "filters" : filtersFound,
        "message" : "success",
        "total filters" : numberOfFilters
    }

    let cursorObj = collection.find();

    Promise.all([cursorObj.toArray(), cursorObj.count()]).then((resultsArr)=>{
        let mappedFilters = resultsArr[0].map((filterItem: any) => {
            return [filterItem.id, filterItem.filter_tag]   
        })

        responseObj.filters = mappedFilters;
        responseObj["total filters"] = resultsArr[1];
        res.send(responseObj);
    }).catch((err: any) => {
        console.log(err);
    });

})


export default router;