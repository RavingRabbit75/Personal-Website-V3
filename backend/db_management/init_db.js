"use strict";

const fs = require("fs");
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient("mongodb://localhost:27017", {useUnifiedTopology: true});

const dbName = "personal_website";
const skillsCollName = "skills";


let initSkillsList = function() {
    let db = null;
    let skillsColl = null;

    return mongoClient.connect().then((mongoObj)=>{

        db = mongoObj.db(dbName);
        skillsColl = db.collection(skillsCollName);
        console.log(`Deleting all docs in ${skillsCollName} collection...`)
        return skillsColl.deleteMany({});

    }).then((delResults)=>{

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
    await initSkillsList();
    mongoClient.close();
}

run();