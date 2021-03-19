"use strict";

const { json } = require("express");
const fs = require("fs");
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient("mongodb://localhost:27017", {useUnifiedTopology: true});

const dbName = "personal_website";
const skillsCollName = "skills";
const globalInfoCollName = "globalInfo";


function connectToDB() {
    return mongoClient.connect();
}


function globalInfo(mongoObj) {
    let db = null;
    let globalInfoColl = null;

    db = mongoObj.db(dbName);
    globalInfoColl = db.collection(globalInfoCollName);
    console.log(`Deleting all docs in ${globalInfoCollName} collection...`);

    return globalInfoColl.deleteMany({}).then((delResults)=>{

        console.log(`Collection Name: ${globalInfoCollName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/baseContent.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting global info data...`);
        return globalInfoColl.insertOne(jsonData);

    }).then((insertResults)=>{

        console.log(`Collection Name: ${globalInfoCollName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    });
}


function initSkillsList(mongoObj) {
    let db = null;
    let skillsColl = null;

    db = mongoObj.db(dbName);
    skillsColl = db.collection(skillsCollName);
    console.log(`Deleting all docs in ${skillsCollName} collection...`);

    return skillsColl.deleteMany({}).then((delResults)=>{

        console.log(`Collection Name: ${skillsCollName}, Deleted Docs: ${delResults.deletedCount}` );
        let rawData = fs.readFileSync("./initial_db_data/skills.json");
        let jsonData = JSON.parse(rawData);
        console.log(`Inserting skills data...`);
        return skillsColl.insertMany(jsonData);

    }).then((insertResults)=>{

        console.log(`Collection Name: ${skillsCollName}, Inserted Docs: ${insertResults.insertedCount}`);

    }).catch((err)=>{

        console.log(err);
        process.exit();

    });

}

let run = async () => {
    let mongoObj = await connectToDB();
    await globalInfo(mongoObj);
    await initSkillsList(mongoObj);
    mongoClient.close();
}

run();