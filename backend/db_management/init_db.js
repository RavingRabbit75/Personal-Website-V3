"use strict";

const fs = require("fs");
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient("mongodb://localhost:27017", {useUnifiedTopology: true});

const dbName = "personal_website";
const skillsCollName = "skills";
const globalInfoCollName = "globalInfo";
const educationCollName = "education";
const experienceCollName = "experience";
const projectsCollName = "projects";
const filtersCollName = "filters";

function connectToDB() {
    return mongoClient.connect();
}


function initGlobalInfo(mongoObj, collName) {
    let db = null;
    let globalInfoColl = null;

    db = mongoObj.db(dbName);
    globalInfoColl = db.collection(collName);
    console.log(`Deleting all docs in ${collName} collection...`);

    return globalInfoColl.deleteMany({}).then((delResults)=>{

        console.log(`Collection Name: ${collName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/baseContent.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting global info data...`);
        return globalInfoColl.insertOne(jsonData);

    }).then((insertResults)=>{

        console.log(`Collection Name: ${collName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    });
}


function initSkillsList(mongoObj, collName) {
    let db = null;
    let skillsColl = null;

    db = mongoObj.db(dbName);
    skillsColl = db.collection(collName);
    console.log(`Deleting all docs in ${collName} collection...`);

    return skillsColl.deleteMany({}).then((delResults)=>{

        console.log(`Collection Name: ${collName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/skills.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting skills data...`);
        return skillsColl.insertMany(jsonData);

    }).then((insertResults)=>{

        console.log(`Collection Name: ${collName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    });

}


function initEducationInfo(mongoObj, collName) {
    let db = null;
    let educationColl = null;

    db = mongoObj.db(dbName);
    educationColl = db.collection(collName);
    console.log(`Deleting all docs in ${collName} collection...`);

    return educationColl.deleteMany({}).then((delResults)=>{

        console.log(`Collection Name: ${collName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/education.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting education data ...`);
        return educationColl.insertMany(jsonData);

    }).then((insertResults)=>{

        console.log(`Collection Name: ${collName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();
    
    });

}

function initExperienceInfo(mongoObj, collName) {
    let db = null;
    let experienceColl = null;

    db = mongoObj.db(dbName);
    experienceColl = db.collection(collName);
    console.log(`Deleting all docs in ${collName} collection...`);

    return experienceColl.deleteMany({}).then((delResults)=>{
        console.log(`Collection Name: ${collName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/experience.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting experience data ...`);
        return experienceColl.insertMany(jsonData);

    }).then((insertResults)=>{
        
        console.log(`Collection Name: ${collName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    });

}


function initProjectsInfo(mongoObj, collName) {
    let db = null;
    let projectsColl = null;

    db = mongoObj.db(dbName);
    projectsColl = db.collection(collName);
    console.log(`Deleting all docs in ${collName} collection...`);

    return projectsColl.deleteMany({}).then((delResults)=>{
        console.log(`Collection Name: ${collName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/projects.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting projects data ...`);
        return projectsColl.insertMany(jsonData);

    }).then((insertResults)=>{

        console.log(`Collection Name: ${collName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    });

}

function initFiltersInfo(mongoObj, collName) {
    let db = null;
    let filtersColl = null;

    db = mongoObj.db(dbName);
    filtersColl = db.collection(collName);
    console.log(`Deleting all docs in ${collName} collection...`);

    return filtersColl.deleteMany({}).then((delResults)=>{
        console.log(`Collection Name: ${collName}, Deleted Docs: ${delResults.deletedCount}`);
        let rawData = fs.readFileSync("./initial_db_data/filters.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting filter data ...`);
        return filtersColl.insertMany(jsonData);
    }).then((insertResults)=>{

        console.log(`Collection Name: ${collName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    })
}


let run = async () => {
    let mongoObj = await connectToDB();
    await initGlobalInfo(mongoObj, globalInfoCollName);
    await initSkillsList(mongoObj, skillsCollName);
    await initEducationInfo(mongoObj, educationCollName);
    await initExperienceInfo(mongoObj, experienceCollName);
    await initProjectsInfo(mongoObj, projectsCollName);
    await initFiltersInfo(mongoObj, filtersCollName)
    mongoClient.close();
}

run();